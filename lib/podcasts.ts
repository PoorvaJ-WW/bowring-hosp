// lib/podcastsUtils.ts - Server-side podcast data fetching
//
// ⚠️  WARNING: This file uses firebase-admin and should ONLY be imported in:
//     - API routes (app/api/**/route.ts)
//     - Server Components (async page.tsx without 'use client')
//
// ❌ NEVER import this in Client Components ('use client')
//    Use @/types/podcast for type imports
//
// See lib/README.md for full documentation

import { getAdminDb } from './firebase-admin';

// The website ID - this will be replaced during site generation
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name matching the site-generator
export const PODCASTS_COLLECTION = 'user_podcasts';

export interface Podcast {
  id: string;
  userId: string;
  websiteId: string;
  title: string;
  description: string;
  audioUrl: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  speaker?: string;
  duration?: string;
  fileSize?: string;
  metaTitle?: string;
  metaDescription?: string;
  transcription?: string;
  categories: string[];
  tags: string[];
  published: boolean;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
  displayOrder?: number;
  slug?: string;
}

/**
 * Get all published podcasts for this website with category filtering
 */
export async function getPodcasts(
  limitCount: number = 10,
  orderByField: 'createdAt' | 'displayOrder' = 'createdAt',
  categories?: string[]
): Promise<Podcast[]> {
  try {
    const db = await getAdminDb();
    let query = db.collection(PODCASTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true);

    // Add categories filter if specified
    if (categories && categories.length > 0) {
      query = query.where('categories', 'array-contains-any', categories);
    }

    // Add ordering and limit
    query = query.orderBy(orderByField, 'desc').limit(limitCount);

    console.log('Fetching podcasts with query:', {
      websiteId: WEBSITE_ID,
      collection: PODCASTS_COLLECTION,
      categories,
      limitCount,
      orderBy: orderByField
    });

    const snapshot = await query.get();
    const podcasts: Podcast[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Convert Firestore Timestamps to ISO strings for serialization
      const convertTimestamp = (timestamp: any): string => {
        if (!timestamp) return '';
        if (timestamp.toDate) return timestamp.toDate().toISOString();
        if (typeof timestamp === 'string') return timestamp;
        return '';
      };

      podcasts.push({
        id: doc.id,
        ...data,
        categories: data.categories || [],
        tags: data.tags || [],
        createdAt: convertTimestamp(data.createdAt),
        publishedAt: convertTimestamp(data.publishedAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Podcast);
    });

    console.log('Podcasts fetched successfully:', podcasts.length);

    return podcasts;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return [];
  }
}

/**
 * Get a single podcast by slug
 */
export async function getPodcastBySlug(slug: string): Promise<Podcast | null> {
  try {
    const db = await getAdminDb();
    const snapshot = await db.collection(PODCASTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('slug', '==', slug)
      .where('published', '==', true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Convert Firestore Timestamps to ISO strings for serialization
    const convertTimestamp = (timestamp: any): string => {
      if (!timestamp) return '';
      if (timestamp.toDate) return timestamp.toDate().toISOString();
      if (typeof timestamp === 'string') return timestamp;
      return '';
    };

    return {
      id: doc.id,
      ...data,
      categories: data.categories || [],
      tags: data.tags || [],
      createdAt: convertTimestamp(data.createdAt),
      publishedAt: convertTimestamp(data.publishedAt),
      updatedAt: convertTimestamp(data.updatedAt),
    } as Podcast;
  } catch (error) {
    console.error('Error fetching podcast by slug:', error);
    return null;
  }
}

/**
 * Get podcasts by categories using the standardized getPodcasts function
 */
export async function getPodcastsByCategories(
  categories: string[],
  limitCount: number = 10
): Promise<Podcast[]> {
  return getPodcasts(limitCount, 'createdAt', categories);
}

/**
 * Get all unique categories for this website
 */
export async function getPodcastCategories(): Promise<string[]> {
  try {
    console.log('🔍 getPodcastCategories: Fetching podcasts to extract categories...');

    // Fetch podcasts using getPodcasts (which handles credentials properly)
    // Use high limit to get all podcasts
    const podcasts = await getPodcasts(10000, 'createdAt', undefined);
    console.log('🔍 getPodcastCategories: Got', podcasts.length, 'podcasts');

    const categoriesSet = new Set<string>();

    podcasts.forEach((podcast, index) => {
      console.log(`🔍 Podcast ${index + 1} "${podcast.title}" categories:`, podcast.categories);
      if (podcast.categories && Array.isArray(podcast.categories)) {
        podcast.categories.forEach((category: string) => {
          if (category && category.trim()) {
            categoriesSet.add(category.trim());
          }
        });
      }
    });

    const finalCategories = Array.from(categoriesSet).sort();
    console.log('🔍 getPodcastCategories: Final unique categories:', finalCategories);
    return finalCategories;
  } catch (error) {
    console.error('Error fetching podcast categories:', error);
    return [];
  }
}

/**
 * Get all unique tags for this website
 */
export async function getPodcastTags(): Promise<string[]> {
  try {
    const podcasts = await getPodcasts(100);
    const tagsSet = new Set<string>();

    podcasts.forEach(podcast => {
      podcast.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching podcast tags:', error);
    return [];
  }
}
