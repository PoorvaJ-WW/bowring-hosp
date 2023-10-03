import { db } from './firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc, QuerySnapshot, DocumentData } from 'firebase/firestore';

export interface PlaylistVideo {
  // Required fields
  id: string;                    // Firestore document ID
  userId: string;                // Firebase Auth UID
  websiteId: string;             // Reference to websites collection
  title: string;                 // Video title
  description: string;           // Video description
  altText: string;               // Accessibility description
  url: string;                   // YouTube watch URL
  embedUrl: string;              // YouTube embed URL
  videoId: string;               // YouTube video ID
  thumbnailUrl: string;          // Video thumbnail URL
  categories: string[];          // Array of category strings
  tags: string[];                // Array of tag strings
  platform: string;             // "youtube", "vimeo", etc.
  playlist: string;              // Playlist name/category
  order: number;                 // Display order
  createdAt: string;             // ISO timestamp
  published: boolean;            // Publication status

  // Optional fields
  excerpt?: string;              // Brief video summary/excerpt
  duration?: string;             // Video duration
  channelTitle?: string;         // YouTube channel name
  publishedAt?: string;          // Video publish date
  viewCount?: string;            // View count
}

export interface PlaylistFetchOptions {
  websiteId: string;
  categories?: string[];
  limit?: number;
  published?: boolean;
}

export interface SingleVideoFetchOptions {
  websiteId: string;
  slug: string;
  published?: boolean;
}

/**
 * Fetch playlist videos from Firestore
 */
export async function fetchPlaylistVideos(options: PlaylistFetchOptions): Promise<PlaylistVideo[]> {
  try {
    const { websiteId, categories, limit = 50, published = true } = options;

    console.log('🎥 Fetching playlist videos for website:', websiteId, 'categories:', categories);

    // Build query with categories filtering
    let playlistQuery = query(
      collection(db, 'user_playlists'),
      where('websiteId', '==', websiteId)
    );

    // Add categories filter if specified (using array-contains-any for multiple categories)
    if (categories && categories.length > 0) {
      playlistQuery = query(
        collection(db, 'user_playlists'),
        where('websiteId', '==', websiteId),
        where('categories', 'array-contains-any', categories)
      );
    }

    // Add ordering - without orderBy to avoid composite index requirements initially
    // Note: You may want to add orderBy back later with proper Firestore indexes

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(playlistQuery);
    const videos: PlaylistVideo[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Debug: Log the actual categories data
      console.log(`Video "${data.title}" categories:`, {
        categories: data.categories,
        categoryType: typeof data.categories,
        isArray: Array.isArray(data.categories)
      });

      videos.push({
        id: doc.id,
        userId: data.userId || '',
        websiteId: data.websiteId || '',
        title: data.title || '',
        description: data.description || '',
        excerpt: data.excerpt || '',
        altText: data.altText || '',
        url: data.url || '',
        embedUrl: data.embedUrl || '',
        videoId: data.videoId || '',
        thumbnailUrl: data.thumbnailUrl || '',
        categories: data.categories || [],
        tags: data.tags || [],
        platform: data.platform || 'youtube',
        playlist: data.playlist || 'general',
        order: data.order || 0,
        createdAt: data.createdAt || '',
        published: data.published !== undefined ? data.published : true,
        duration: data.duration || '',
        channelTitle: data.channelTitle || '',
        publishedAt: data.publishedAt || '',
        viewCount: data.viewCount || '',
      });
    });

    // Apply limit if specified
    const limitedVideos = limit > 0 ? videos.slice(0, limit) : videos;
    
    console.log(`🎥 Found ${limitedVideos.length} playlist videos`);
    return limitedVideos;
  } catch (error) {
    console.error('❌ Error fetching playlist videos:', error);
    return [];
  }
}

/**
 * Get unique categories for a website's playlist
 */
export async function fetchPlaylistCategories(websiteId: string): Promise<string[]> {
  try {
    console.log('🔍 fetchPlaylistCategories: Fetching all videos to extract categories...');

    // Fetch ALL videos to get complete category list (using high limit)
    const videos = await fetchPlaylistVideos({ websiteId, limit: 10000 });
    console.log('🔍 fetchPlaylistCategories: Got', videos.length, 'videos');

    const categoriesSet = new Set<string>();

    videos.forEach((video, index) => {
      console.log(`🔍 Video ${index + 1} "${video.title}" categories:`, video.categories);
      if (video.categories && Array.isArray(video.categories)) {
        video.categories.forEach(category => {
          if (category && category.trim()) {
            categoriesSet.add(category.trim());
          }
        });
      }
    });

    const finalCategories = Array.from(categoriesSet).sort();
    console.log('🔍 fetchPlaylistCategories: Final unique categories:', finalCategories);
    return finalCategories;
  } catch (error) {
    console.error('❌ Error fetching playlist categories:', error);
    return [];
  }
}

/**
 * Fetch a single video by slug from Firestore
 */
export async function fetchSingleVideo(options: SingleVideoFetchOptions): Promise<PlaylistVideo | null> {
  try {
    const { websiteId, slug, published = true } = options;
    
    console.log('🎥 Fetching single video for website:', websiteId, 'slug:', slug);
    
    // Build query to find video by slug
    const videoQuery = query(
      collection(db, 'user_playlists'),
      where('websiteId', '==', websiteId),
      where('published', '==', published),
      where('slug', '==', slug)
    );

    const querySnapshot = await getDocs(videoQuery);
    
    if (querySnapshot.empty) {
      console.log('🎥 No video found with slug:', slug);
      return null;
    }

    // Get the first matching document
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    const video: PlaylistVideo = {
      id: doc.id,
      userId: data.userId || '',
      websiteId: data.websiteId || '',
      title: data.title || '',
      description: data.description || '',
      excerpt: data.excerpt || '',
      altText: data.altText || '',
      url: data.url || '',
      embedUrl: data.embedUrl || '',
      videoId: data.videoId || '',
      thumbnailUrl: data.thumbnailUrl || '',
      categories: data.categories || [],
      tags: data.tags || [],
      platform: data.platform || 'youtube',
      playlist: data.playlist || 'general',
      order: data.order || 0,
      createdAt: data.createdAt || '',
      published: data.published !== undefined ? data.published : true,
      duration: data.duration || '',
      channelTitle: data.channelTitle || '',
      publishedAt: data.publishedAt || '',
      viewCount: data.viewCount || '',
    };

    console.log('🎥 Found video:', video.title);
    return video;
  } catch (error) {
    console.error('❌ Error fetching single video:', error);
    return null;
  }
}

/**
 * Transform playlist videos to Video format for components
 */
export function transformToVideoItems(videos: PlaylistVideo[]): Array<{
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  src: string;
  description: string;
  excerpt?: string;
  videoId?: string;
}> {
  return videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      duration: video.duration || '0:00',
      thumbnail: video.thumbnailUrl,
      src: video.url,
      description: video.description,
      excerpt: video.excerpt || video.description || '',
      videoId: video.videoId,
    };
  });
}

/**
 * Transform single playlist video to Video format for single video components
 */
export function transformToVideoItem(video: PlaylistVideo): {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  videoId: string;
  thumbnail: string;
  duration: string;
} {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    excerpt: video.excerpt || video.description || '',
    videoId: video.videoId,
    thumbnail: video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    duration: video.duration || '0:00',
  };
}