// lib/blog.ts - Server-side blog data fetching
//
// ⚠️  WARNING: This file uses firebase-admin and should ONLY be imported in:
//     - API routes (app/api/**/route.ts)
//     - Server Components (async page.tsx without 'use client')
//
// ❌ NEVER import this in Client Components ('use client')
//    Use @/lib/blogUtils instead for client-safe utilities
//    Use /api/blog route for fetching blog data from client
//
// See lib/README.md for full documentation

import { headers } from 'next/headers';
import { getAdminDb } from './firebase-admin';
import type { BlogPost } from '@/types/blog';

// The website ID - this should match what's in Firestore
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name matching the site-generator
export const BLOG_COLLECTION = 'user_blogs';

/**
 * Get all published blog posts for this website using Admin SDK
 */
export async function getBlogPosts(
  limitCount: number = 10,
  orderField: string = 'publishedAt',
  categories?: string[]
): Promise<BlogPost[]> {
  try {
    // Next.js 16 requires accessing headers/cookies before using new Date() in Server Components
    await headers();

    const db = await getAdminDb();
    const now = new Date().toISOString();

    console.log('Fetching blog posts with Admin SDK:', {
      websiteId: WEBSITE_ID,
      collection: BLOG_COLLECTION,
      categories,
      orderField,
      limitCount
    });

    let query = db.collection(BLOG_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true)
      .where('publishedAt', '<=', now);

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      query = query.where('categories', 'array-contains-any', categories);
    }

    // Add ordering and limit
    query = query.orderBy(orderField, 'desc').limit(limitCount);

    const querySnapshot = await query.get();
    const posts: BlogPost[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data,
        categories: data.categories || [],
        tags: data.tags || [],
      } as BlogPost);
    });

    console.log('Blog posts fetched successfully:', posts.length);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts with Admin SDK:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug using Admin SDK
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Next.js 16 requires accessing headers/cookies before using new Date() in Server Components
    await headers();

    const db = await getAdminDb();
    const now = new Date().toISOString();

    const querySnapshot = await db.collection(BLOG_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('slug', '==', slug)
      .where('published', '==', true)
      .where('publishedAt', '<=', now)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      categories: data.categories || [],
      tags: data.tags || [],
    } as BlogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug with Admin SDK:', error);
    return null;
  }
}

/**
 * Get blog posts by categories using Admin SDK
 */
export async function getBlogPostsByCategories(
  categories: string[],
  limitCount: number = 10
): Promise<BlogPost[]> {
  if (categories.length === 0) {
    return getBlogPosts(limitCount);
  }

  return getBlogPosts(limitCount, 'publishedAt', categories);
}

/**
 * Get all unique categories for this website
 */
export async function getBlogCategories(): Promise<string[]> {
  try {
    console.log('🔍 getBlogCategories: Fetching posts to extract categories...');

    // Fetch posts using getBlogPosts (which handles credentials properly)
    // Use high limit to get all posts
    const posts = await getBlogPosts(10000);
    console.log('🔍 getBlogCategories: Got', posts.length, 'posts');

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
    console.log('🔍 getBlogCategories: Final unique categories:', finalCategories);
    return finalCategories;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

/**
 * Get all unique tags for this website
 */
export async function getBlogTags(): Promise<string[]> {
  try {
    const posts = await getBlogPosts(100); // Get more posts to collect all tags
    const tagsSet = new Set<string>();

    posts.forEach(post => {
      post.tags.forEach((tag: string) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}

// Note: Utility functions (formatDate, generateExcerpt, generateBlogSlug)
// have been moved to lib/blogUtils.ts for client-side use