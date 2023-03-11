import { collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import { db } from './firebase';

// The website ID - this should match what's in Firestore
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';
console.log('Using website ID:', WEBSITE_ID);

// Collection name for videos/playlists
export const VIDEOS_COLLECTION = 'user_playlists';
console.log('Using collection name:', VIDEOS_COLLECTION);

export interface Video {
  id: string;
  userId: string;
  websiteId: string;
  title: string;
  slug?: string; // URL-friendly slug for the video
  description?: string;
  excerpt?: string; // HTML excerpt field from Firestore
  url: string;
  thumbnail?: string;
  category: string; // Convert from playlist to category
  categories?: string[]; // Support for multiple categories
  tags?: string[];
  duration?: string;
  order?: number;
  createdAt: string;
  published: boolean;
  displayOrder?: number;
  views?: number;
  isListed?: boolean; // Equivalent to published for videos
}

/**
 * Get all published videos for this website with enhanced filtering and ordering
 */
export async function getVideos(
  limitCount: number = 10, 
  orderByField: 'createdAt' | 'order' | 'displayOrder' = 'createdAt',
  categories?: string[],
  showUnlistedVideos?: boolean
): Promise<Video[]> {
  try {
    const videosRef = collection(db, VIDEOS_COLLECTION);
    
    // Build base query - must include published=true for security rules
    let q = query(
      videosRef,
      where('websiteId', '==', WEBSITE_ID),
      where('published', '==', true)
    );

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      // Support both single category field and categories array
      q = query(q, where('category', 'in', categories));
    }

    // Filter out unlisted videos if specified
    if (!showUnlistedVideos) {
      q = query(q, where('isListed', '==', true));
    }

    // Add ordering
    try {
      if (orderByField === 'displayOrder') {
        q = query(q, orderBy('displayOrder', 'asc'), orderBy('createdAt', 'desc'));
      } else if (orderByField === 'order') {
        q = query(q, orderBy('order', 'asc'));
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }
    } catch (orderError) {
      console.error('Error adding orderBy to query (likely missing index):', orderError);
    }

    q = query(q, limit(limitCount));

    // Execute query and get results
    const querySnapshot = await getDocs(q);
    
    const videos: Video[] = [];

    // Process each document
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      videos.push({
        id: doc.id,
        ...data,
        // Ensure category field exists and convert to categories array
        category: data.category || data.playlist || 'General',
        categories: data.categories || [data.category || data.playlist || 'General'],
        tags: data.tags || [],
        isListed: data.isListed !== false, // Default to true if not specified
      } as Video);
    });

    // Manual sorting if using displayOrder
    if (orderByField === 'displayOrder') {
      videos.sort((a, b) => {
        const orderA = a.displayOrder ?? 999999;
        const orderB = b.displayOrder ?? 999999;
        if (orderA !== orderB) return orderA - orderB;
        // If display orders are equal, sort by creation date
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

/**
 * Get a single video by ID
 */
export async function getVideoById(videoId: string): Promise<Video | null> {
  try {
    const videosRef = collection(db, VIDEOS_COLLECTION);
    const q = query(
      videosRef,
      where('websiteId', '==', WEBSITE_ID),
      where('published', '==', true),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    const video = querySnapshot.docs.find(doc => doc.id === videoId);
    if (!video) {
      return null;
    }

    const data = video.data();
    return {
      id: video.id,
      ...data,
      category: data.category || data.playlist || 'General',
      categories: data.categories || [data.category || data.playlist || 'General'],
      tags: data.tags || [],
      isListed: data.isListed !== false,
    } as Video;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    return null;
  }
}

/**
 * Get a single video by slug
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const videosRef = collection(db, VIDEOS_COLLECTION);
    const q = query(
      videosRef,
      where('websiteId', '==', WEBSITE_ID),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const video = querySnapshot.docs[0];
    const data = video.data();
    return {
      id: video.id,
      ...data,
      category: data.category || data.playlist || 'General',
      categories: data.categories || [data.category || data.playlist || 'General'],
      tags: data.tags || [],
      isListed: data.isListed !== false,
    } as Video;
  } catch (error) {
    console.error('Error fetching video by slug:', error);
    return null;
  }
}

/**
 * Get videos by categories
 */
export async function getVideosByCategories(
  categories: string[], 
  limitCount: number = 10,
  orderByField: 'createdAt' | 'order' | 'displayOrder' = 'createdAt',
  showUnlistedVideos?: boolean
): Promise<Video[]> {
  return getVideos(limitCount, orderByField, categories, showUnlistedVideos);
}

/**
 * Get all unique categories for this website
 */
export async function getVideoCategories(): Promise<string[]> {
  try {
    const videos = await getVideos(100); // Get more videos to collect all categories
    const categoriesSet = new Set<string>();

    videos.forEach(video => {
      // Support both category and categories fields
      if (video.category) {
        categoriesSet.add(video.category);
      }
      if (video.categories) {
        video.categories.forEach(category => categoriesSet.add(category));
      }
    });

    return Array.from(categoriesSet).sort();
  } catch (error) {
    console.error('Error fetching video categories:', error);
    return [];
  }
}

/**
 * Get video categories with counts
 */
export async function getVideoCategoriesWithCounts(): Promise<Array<{ name: string; count: number }>> {
  try {
    const videos = await getVideos(100); // Get more videos to collect all categories
    const categoriesMap = new Map<string, number>();

    videos.forEach(video => {
      // Support both category and categories fields
      const videoCategories = video.categories || [video.category];
      videoCategories.forEach(category => {
        if (category) {
          categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
        }
      });
    });

    const categories = Array.from(categoriesMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Add "All Videos" option at the beginning
    return [{ name: 'All Videos', count: videos.length }, ...categories];
  } catch (error) {
    console.error('Error fetching video categories with counts:', error);
    return [{ name: 'All Videos', count: 0 }];
  }
}

/**
 * Format video duration for display
 */
export function formatDuration(duration?: string): string {
  if (!duration) return '';
  
  // If duration is in seconds
  if (/^\d+$/.test(duration)) {
    const seconds = parseInt(duration);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  // Return as-is if already formatted
  return duration;
}

/**
 * Extract video ID from various video URL formats
 */
export function extractVideoId(url: string): string | null {
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