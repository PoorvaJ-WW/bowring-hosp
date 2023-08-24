// lib/gallery.ts - Server-side gallery data fetching
//
// ⚠️  WARNING: This file uses firebase-admin and should ONLY be imported in:
//     - API routes (app/api/**/route.ts)
//     - Server Components (async page.tsx without 'use client')
//
// ❌ NEVER import this in Client Components ('use client')
//    Use @/lib/galleryUtils instead for client-safe utilities
//    Use /api/gallery route for fetching gallery data from client
//
// See lib/README.md for full documentation

import { connection } from 'next/server';
import { getAdminDb } from './firebase-admin';
import type { GalleryImage } from '@/types/gallery';

// The website ID - this should match what's in Firestore
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name matching the site-generator
export const GALLERY_COLLECTION = 'user_galleries';

/**
 * Get all published gallery images for this website using Admin SDK
 */
export async function getGalleryImages(
  limitCount: number = 100,
  orderField: string = 'order',
  categories?: string[]
): Promise<GalleryImage[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries (which use randomBytes)
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const db = await getAdminDb();

    console.log('Fetching gallery images with Admin SDK:', {
      websiteId: WEBSITE_ID,
      collection: GALLERY_COLLECTION,
      categories,
      orderField,
      limitCount
    });

    let query = db.collection(GALLERY_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true);

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      query = query.where('categories', 'array-contains-any', categories);
    }

    // Add ordering
    if (orderField === 'order') {
      query = query.orderBy('order', 'asc').orderBy('createdAt', 'desc');
    } else {
      query = query.orderBy(orderField, 'desc');
    }

    // Add limit
    query = query.limit(limitCount);

    const querySnapshot = await query.get();
    const images: GalleryImage[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      images.push({
        id: doc.id,
        userId: data.userId,
        websiteId: data.websiteId,
        imageUrl: data.imageUrl,
        title: data.title || '',
        altText: data.altText || '',
        categories: data.categories || [],
        order: data.order || 0,
        createdAt: data.createdAt,
        published: data.published || false,
        // Optional metadata fields
        caption: data.caption,
        description: data.description,
        tags: data.tags,
        publishedAt: data.publishedAt,
        fileName: data.fileName,
        size: data.size,
        contentType: data.contentType,
        websiteName: data.websiteName,
      } as GalleryImage);
    });

    console.log('Gallery images fetched successfully:', images.length);
    return images;
  } catch (error) {
    console.error('Error fetching gallery images with Admin SDK:', error);
    return [];
  }
}

/**
 * Get gallery images by categories using Admin SDK
 */
export async function getGalleryImagesByCategories(
  categories: string[],
  limitCount: number = 100
): Promise<GalleryImage[]> {
  return getGalleryImages(limitCount, 'order', categories);
}

/**
 * Get unique categories for this website's gallery using Admin SDK
 */
export async function getGalleryCategories(): Promise<string[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    console.log('Fetching gallery categories with Admin SDK');

    // Fetch images to extract categories
    const images = await getGalleryImages(200, 'order');
    const categoriesSet = new Set<string>();

    images.forEach((image) => {
      if (image.categories && Array.isArray(image.categories)) {
        image.categories.forEach(category => {
          if (category && category.trim()) {
            categoriesSet.add(category.trim());
          }
        });
      }
    });

    const categories = Array.from(categoriesSet).sort();
    console.log('Gallery categories fetched:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    return [];
  }
}

/**
 * Get gallery categories with counts using Admin SDK
 */
export async function getGalleryCategoriesWithCounts(): Promise<Array<{ name: string; count: number }>> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const images = await getGalleryImages(200, 'order');
    const categoriesMap = new Map<string, number>();

    images.forEach((image) => {
      if (image.categories && Array.isArray(image.categories)) {
        image.categories.forEach(category => {
          if (category && category.trim()) {
            const cat = category.trim();
            categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
          }
        });
      }
    });

    const categories = Array.from(categoriesMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Add "All Images" option at the beginning
    return [{ name: 'All Images', count: images.length }, ...categories];
  } catch (error) {
    console.error('Error fetching gallery categories with counts:', error);
    return [{ name: 'All Images', count: 0 }];
  }
}