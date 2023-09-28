// SERVER-SIDE ONLY - Uses Firebase Admin SDK
// This file should ONLY be imported in server components or API routes
// For client components, use lib/videoUtils.ts for transformations

import { connection } from 'next/server';
import { getAdminDb } from './firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// The website ID - this gets replaced during site generation
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name for videos/playlists
export const VIDEOS_COLLECTION = 'user_playlists';

export interface Video {
  id: string;
  userId: string;
  websiteId: string;
  title: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  url: string;
  videoId?: string; // YouTube/Vimeo ID
  thumbnail?: string;
  customThumbnailUrl?: string;
  useCustomThumbnail?: boolean;
  category?: string;
  categories?: string[];
  tags?: string[];
  duration?: string;
  order?: number;
  createdAt: string;
  publishedAt?: string;
  published: boolean;
  displayOrder?: number;
  views?: number;
  isListed?: boolean;
  lastModified?: string;
  altText?: string;

  // Basic SEO fields
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];

  // Advanced AEO fields
  faqSection?: Array<{
    question: string;
    answer: string;
  }>;
  keyTakeaways?: string[];
  tldr?: string;
  transcript?: string;

  // AIO (AI Overview/Optimization) - 2025 Critical
  summary?: string;
  relatedTopics?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  contentType?: string;
  targetAudience?: string;
  watchTime?: string;
  authorBio?: string;
  sources?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  tableOfContents?: Array<{
    heading: string;
    timestamp: string;
    anchor?: string;
  }>;

  // Schema & Technical SEO
  schemaType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;

  // Social Media
  socialMedia?: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };

  // Video-specific metadata
  contentRating?: string;
  language?: string;
  subtitles?: Array<{
    language: string;
    url: string;
  }>;
  channelTitle?: string;
  viewCount?: string;

  // Additional metadata
  author?: {
    name?: string;
    avatar?: string;
  };
  chapters?: Array<{
    title: string;
    timestamp: string;
  }>;

  // AI
  enableAISEO?: boolean;
}

/**
 * Helper function to convert Firestore document to Video object
 * Explicitly maps all fields to avoid Timestamp serialization issues
 */
function convertDocToVideo(doc: any): Video {
  const data = doc.data();

  return {
    id: doc.id,
    userId: data.userId,
    websiteId: data.websiteId,
    title: data.title,
    slug: data.slug || doc.id,
    description: data.description,
    excerpt: data.excerpt,
    url: data.url,
    videoId: data.videoId || extractVideoId(data.url),
    thumbnail: data.thumbnail || (data.videoId ?
      `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg` :
      undefined),
    customThumbnailUrl: data.customThumbnailUrl,
    useCustomThumbnail: data.useCustomThumbnail,
    category: data.category || data.categories?.[0] || 'General',
    categories: data.categories || [data.category || 'General'],
    tags: data.tags,
    duration: data.duration,
    order: data.order,
    createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
    publishedAt: data.publishedAt?.toDate?.()?.toISOString() || data.publishedAt,
    published: data.published,
    displayOrder: data.displayOrder,
    views: data.views,
    isListed: data.isListed,
    lastModified: data.lastModified?.toDate?.()?.toISOString() || data.lastModified,
    altText: data.altText,

    // SEO fields
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    focusKeyword: data.focusKeyword,
    secondaryKeywords: data.secondaryKeywords,

    // AEO fields
    faqSection: data.faqSection,
    keyTakeaways: data.keyTakeaways,
    tldr: data.tldr,
    transcript: data.transcript,

    // AIO fields
    summary: data.summary,
    relatedTopics: data.relatedTopics,
    prerequisites: data.prerequisites,
    learningOutcomes: data.learningOutcomes,
    contentType: data.contentType,
    targetAudience: data.targetAudience,
    watchTime: data.watchTime,
    authorBio: data.authorBio,
    sources: data.sources,
    tableOfContents: data.tableOfContents,

    // Schema & Technical SEO
    schemaType: data.schemaType,
    canonicalUrl: data.canonicalUrl,
    noIndex: data.noIndex,
    noFollow: data.noFollow,

    // Social Media
    socialMedia: data.socialMedia,

    // Video-specific metadata
    contentRating: data.contentRating,
    language: data.language,
    subtitles: data.subtitles,
    channelTitle: data.channelTitle,
    viewCount: data.viewCount,

    // Additional metadata
    author: data.author,
    chapters: data.chapters,

    // AI
    enableAISEO: data.enableAISEO,
  };
}

/**
 * Get all published videos for this website (Server-side with Admin SDK)
 */
export async function getVideos(
  limitCount: number = 10,
  orderByField: 'publishedAt' | 'createdAt' | 'displayOrder' = 'publishedAt',
  categories?: string[]
): Promise<Video[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries (which use randomBytes)
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const db = await getAdminDb();
    const videosRef = db.collection(VIDEOS_COLLECTION);

    let query = videosRef
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true);

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      // Use array-contains-any for categories array field
      query = query.where('categories', 'array-contains-any', categories);
    }

    // Add publishedAt <= now filter
    const now = Timestamp.now();
    query = query.where('publishedAt', '<=', now);

    // Add ordering
    if (orderByField === 'displayOrder') {
      query = query.orderBy('displayOrder', 'asc');
    } else if (orderByField === 'publishedAt') {
      query = query.orderBy('publishedAt', 'desc');
    } else {
      query = query.orderBy('createdAt', 'desc');
    }

    query = query.limit(limitCount);

    const querySnapshot = await query.get();

    return querySnapshot.docs.map(doc => convertDocToVideo(doc));
  } catch (error) {
    console.error('❌ Error fetching videos:', error);
    return [];
  }
}

/**
 * Get a single video by slug (Server-side with Admin SDK)
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries (which use randomBytes)
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const db = await getAdminDb();
    const videosRef = db.collection(VIDEOS_COLLECTION);

    // First try to find by slug field
    let query = videosRef
      .where('websiteId', '==', WEBSITE_ID)
      .where('slug', '==', slug)
      .where('published', '==', true)
      .limit(1);

    let querySnapshot = await query.get();

    // If not found by slug, try by ID (fallback)
    if (querySnapshot.empty) {
      query = videosRef
        .where('websiteId', '==', WEBSITE_ID)
        .where('published', '==', true)
        .limit(100); // Get more to search through IDs

      querySnapshot = await query.get();

      const doc = querySnapshot.docs.find(d => d.id === slug);
      if (!doc) {
        return null;
      }

      return convertDocToVideo(doc);
    }

    const doc = querySnapshot.docs[0];
    return convertDocToVideo(doc);
  } catch (error) {
    console.error('❌ Error fetching video by slug:', error);
    return null;
  }
}

/**
 * Get videos by categories (Server-side with Admin SDK)
 */
export async function getVideosByCategories(
  categories: string[],
  limitCount: number = 10
): Promise<Video[]> {
  return getVideos(limitCount, 'publishedAt', categories);
}

/**
 * Get related videos (Server-side with Admin SDK)
 */
export async function getRelatedVideos(
  currentVideoId: string,
  categories?: string[],
  limitCount: number = 4
): Promise<Video[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    // Get videos from same categories
    const videos = await getVideos(limitCount + 1, 'publishedAt', categories);

    // Filter out current video
    return videos
      .filter(v => v.id !== currentVideoId)
      .slice(0, limitCount);
  } catch (error) {
    console.error('❌ Error fetching related videos:', error);
    return [];
  }
}

/**
 * Get all unique categories (Server-side with Admin SDK)
 */
export async function getVideoCategories(): Promise<string[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const videos = await getVideos(100);
    const categoriesSet = new Set<string>();

    videos.forEach(video => {
      if (video.categories) {
        video.categories.forEach(cat => categoriesSet.add(cat));
      } else if (video.category) {
        categoriesSet.add(video.category);
      }
    });

    return Array.from(categoriesSet).sort();
  } catch (error) {
    console.error('❌ Error fetching video categories:', error);
    return [];
  }
}

/**
 * Get video tags (Server-side with Admin SDK)
 */
export async function getVideoTags(): Promise<string[]> {
  try {
    // Next.js 16: Access dynamic data before Firestore queries
    try {
      await connection();
    } catch (e) {
      // Static context - ignore error
    }

    const videos = await getVideos(100);
    const tagsSet = new Set<string>();

    videos.forEach(video => {
      if (video.tags) {
        video.tags.forEach(tag => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('❌ Error fetching video tags:', error);
    return [];
  }
}

/**
 * Extract video ID from various video URL formats
 */
function extractVideoId(url: string): string | null {
  if (!url) return null;

  // YouTube URL patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) return youtubeMatch[1];

  // Vimeo URL patterns
  const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) return vimeoMatch[1];

  return null;
}