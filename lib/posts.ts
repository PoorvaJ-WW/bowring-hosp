// lib/posts.ts
// Server-side post functions using Firebase Admin SDK
//
// ⚠️  WARNING: This file uses firebase-admin and should ONLY be imported in:
//     - API routes (app/api/**/route.ts)
//     - Server Components (async page.tsx without 'use client')
//
// ❌ NEVER import this in Client Components ('use client')
//    Use @/lib/postUtils instead for client-safe utilities
//    Use @/types/posts for type imports
//
// See lib/README.md for full documentation

import { getAdminDb } from './firebase-admin';
import type { UserPost } from '@/types/posts';

// The website ID - this should match what's in Firestore
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name matching the site-generator
export const POSTS_COLLECTION = 'user_posts';

/**
 * Get all published posts for this website using Admin SDK
 */
export async function getPosts(
  limitCount: number = 50,
  orderField: string = 'publishedAt',
  categories?: string[]
): Promise<UserPost[]> {
  try {
    const db = await getAdminDb();
    const now = new Date();

    console.log('Fetching posts with Admin SDK:', {
      websiteId: WEBSITE_ID,
      collection: POSTS_COLLECTION,
      categories,
      orderField,
      limitCount
    });

    let query = db.collection(POSTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true);

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      query = query.where('categories', 'array-contains-any', categories);
    }

    // Fetch all matching posts without date filtering
    const querySnapshot = await query.get();

    let posts: UserPost[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Get effective publish date for filtering and sorting
      let effectiveDate: Date | null = null;
      if (data.publishedAt) {
        if (data.publishedAt.toDate) {
          effectiveDate = data.publishedAt.toDate();
        } else if (typeof data.publishedAt === 'string') {
          effectiveDate = new Date(data.publishedAt);
        }
      } else if (data.createdAt) {
        if (data.createdAt.toDate) {
          effectiveDate = data.createdAt.toDate();
        } else if (typeof data.createdAt === 'string') {
          effectiveDate = new Date(data.createdAt);
        }
      }

      // Only include posts with valid dates that are not in the future
      if (effectiveDate && effectiveDate <= now) {
        posts.push({
          id: doc.id,
          ...data,
          categories: data.categories || [],
          tags: data.tags || [],
          publishedAt: data.publishedAt || data.createdAt || '',
          _sortDate: effectiveDate, // Temporary field for sorting
        } as any);
      }
    });

    // Sort by the requested field
    posts.sort((a: any, b: any) => {
      let aValue, bValue;

      if (orderField === 'publishedAt' || orderField === 'createdAt') {
        aValue = a._sortDate;
        bValue = b._sortDate;
      } else if (orderField === 'displayOrder') {
        aValue = a.displayOrder || 999999;
        bValue = b.displayOrder || 999999;
        return aValue - bValue; // Ascending for display order
      } else {
        aValue = a[orderField];
        bValue = b[orderField];
      }

      // Descending order (newest first)
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    });

    // Apply limit and remove temporary sort field
    const limitedPosts = posts.slice(0, limitCount).map((post: any) => {
      const { _sortDate, ...cleanPost } = post;
      return cleanPost as UserPost;
    });

    console.log('Posts fetched successfully:', limitedPosts.length);
    return limitedPosts;
  } catch (error) {
    console.error('Error fetching posts with Admin SDK:', error);
    return [];
  }
}

/**
 * Get a single post by slug using Admin SDK
 */
export async function getPostBySlug(slug: string): Promise<UserPost | null> {
  try {
    const db = await getAdminDb();
    const now = new Date();

    const querySnapshot = await db.collection(POSTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('slug', '==', slug)
      .where('published', '==', true)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Check effective publish date
    let effectiveDate: Date | null = null;
    if (data.publishedAt) {
      if (data.publishedAt.toDate) {
        effectiveDate = data.publishedAt.toDate();
      } else if (typeof data.publishedAt === 'string') {
        effectiveDate = new Date(data.publishedAt);
      }
    } else if (data.createdAt) {
      if (data.createdAt.toDate) {
        effectiveDate = data.createdAt.toDate();
      } else if (typeof data.createdAt === 'string') {
        effectiveDate = new Date(data.createdAt);
      }
    }

    // Only return if effective date is in the past
    if (effectiveDate && effectiveDate > now) {
      return null;
    }

    return {
      id: doc.id,
      ...data,
      categories: data.categories || [],
      tags: data.tags || [],
      publishedAt: data.publishedAt || data.createdAt || '',
    } as UserPost;
  } catch (error) {
    console.error('Error fetching post by slug with Admin SDK:', error);
    return null;
  }
}

/**
 * Get posts by categories using Admin SDK
 */
export async function getPostsByCategories(
  categories: string[],
  limitCount: number = 50
): Promise<UserPost[]> {
  if (categories.length === 0) {
    return getPosts(limitCount);
  }

  return getPosts(limitCount, 'publishedAt', categories);
}

/**
 * Get all unique categories for this website
 */
export async function getPostCategories(): Promise<string[]> {
  try {
    console.log('🔍 getPostCategories: Fetching posts to extract categories...');

    // Fetch posts using getPosts (which handles credentials properly)
    // Use high limit to get all posts
    const posts = await getPosts(10000, 'publishedAt');
    console.log('🔍 getPostCategories: Got', posts.length, 'posts');

    const categoriesSet = new Set<string>();

    posts.forEach((post, index) => {
      console.log(`🔍 Post ${index + 1} "${post.title}" categories:`, post.categories);
      if (post.categories) {
        post.categories.forEach((category: string) => {
          if (category && category.trim()) {
            categoriesSet.add(category.trim());
          }
        });
      }
    });

    const finalCategories = Array.from(categoriesSet).sort();
    console.log('🔍 getPostCategories: Final unique categories:', finalCategories);
    return finalCategories;
  } catch (error) {
    console.error('Error fetching post categories:', error);
    return [];
  }
}

/**
 * Get all unique tags for this website
 */
export async function getPostTags(): Promise<string[]> {
  try {
    const posts = await getPosts(100, 'publishedAt'); // Use publishedAt to match Firestore index
    const tagsSet = new Set<string>();

    posts.forEach(post => {
      post.tags.forEach((tag: string) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching post tags:', error);
    return [];
  }
}

// Note: Utility functions (formatDate, generateExcerpt, generatePostSlug, transformToPostItems)
// have been moved to lib/postUtils.ts for client-side use
// This prevents firebase-admin from being bundled in client components
