// CLIENT-SAFE UTILITIES - Can be imported anywhere
// No Firebase imports - just pure utility functions

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format video duration for display
 */
export function formatDuration(duration?: string): string {
  if (!duration) return '';

  // If duration is in seconds
  if (/^\d+$/.test(duration)) {
    const seconds = parseInt(duration);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Return as-is if already formatted
  return duration;
}

/**
 * Generate slug from title (with safety check)
 */
export function generateVideoSlug(title?: string): string {
  if (!title) return '';

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get the best available slug for a video
 * Prioritizes: existing slug > generated from title > video ID
 */
export function getVideoSlug(video: {
  slug?: string;
  title?: string;
  headline?: string;
  id: string;
}): string {
  // 1. Use existing slug if available
  if (video.slug) {
    return video.slug;
  }

  // 2. Generate from title or headline if available
  const title = video.title || video.headline;
  if (title) {
    return generateVideoSlug(title);
  }

  // 3. Fallback to video ID
  return video.id;
}

/**
 * Extract video ID from various video URL formats
 */
export function extractVideoId(url: string): string | null {
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

/**
 * Get video platform from URL
 */
export function getVideoPlatform(url: string): 'youtube' | 'vimeo' | 'unknown' {
  if (!url) return 'unknown';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }

  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }

  return 'unknown';
}

/**
 * Get video thumbnail URL
 */
export function getVideoThumbnail(videoId?: string, url?: string, existingThumbnail?: string): string {
  // Use existing thumbnail if available
  if (existingThumbnail) return existingThumbnail;

  // Generate thumbnail based on video ID and platform
  if (videoId && url) {
    const platform = getVideoPlatform(url);

    if (platform === 'youtube') {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }

    if (platform === 'vimeo') {
      // Vimeo thumbnails require API access, return placeholder
      return '/images/video-placeholder.jpg';
    }
  }

  return '/images/video-placeholder.jpg';
}

/**
 * Format view count
 */
export function formatViewCount(views: number): string {
  if (views < 1000) return views.toString();
  if (views < 1000000) return `${(views / 1000).toFixed(1)}K`;
  return `${(views / 1000000).toFixed(1)}M`;
}

/**
 * Calculate reading time for transcript
 */
export function calculateReadingTime(text?: string): number {
  if (!text) return 0;

  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Sort videos by different criteria
 */
export function sortVideos<T extends { publishedAt?: string; title: string; views?: number }>(
  videos: T[],
  sortBy: 'newest' | 'oldest' | 'alphabetical' | 'popular' = 'newest'
): T[] {
  const sorted = [...videos];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });

    case 'oldest':
      return sorted.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateA - dateB;
      });

    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'popular':
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));

    default:
      return sorted;
  }
}

/**
 * Filter videos by search term
 */
export function filterVideos<T extends { title: string; description?: string; categories?: string[]; tags?: string[] }>(
  videos: T[],
  searchTerm: string
): T[] {
  if (!searchTerm) return videos;

  const search = searchTerm.toLowerCase();

  return videos.filter(video => {
    // Search in title
    if (video.title.toLowerCase().includes(search)) return true;

    // Search in description
    if (video.description?.toLowerCase().includes(search)) return true;

    // Search in categories
    if (video.categories?.some(cat => cat.toLowerCase().includes(search))) return true;

    // Search in tags
    if (video.tags?.some(tag => tag.toLowerCase().includes(search))) return true;

    return false;
  });
}

/**
 * Group videos by category
 */
export function groupVideosByCategory<T extends { categories?: string[]; category?: string }>(
  videos: T[]
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  videos.forEach(video => {
    const categories = video.categories || [video.category || 'Uncategorized'];

    categories.forEach(category => {
      const existing = grouped.get(category) || [];
      existing.push(video);
      grouped.set(category, existing);
    });
  });

  return grouped;
}

/**
 * Format duration in human-readable format (e.g., "1h 30m" or "45m 30s")
 */
export function formatDurationHuman(duration?: string): string {
  if (!duration) return '';

  // If duration is in seconds (numeric string)
  if (/^\d+$/.test(duration)) {
    const totalSeconds = parseInt(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    if (minutes > 0) {
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    }
    return `${seconds}s`;
  }

  // If already in HH:MM:SS or MM:SS format, convert to human readable
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return duration;
}

/**
 * Get unique video tags from a list of videos
 */
export function getVideoTags(videos: Array<{ tags?: string[] }>): string[] {
  const tags = new Set<string>();

  videos.forEach(video => {
    if (video.tags) {
      video.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}