// lib/podcastUtils.ts - Client-safe podcast utilities
// These functions can be imported in both server and client components

/**
 * Generate a URL-friendly slug from podcast title
 */
export function generatePodcastSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Format duration from seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number | string): string {
  const sec = typeof seconds === 'string' ? parseInt(seconds) : seconds;

  if (isNaN(sec)) return '00:00';

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size from bytes to human-readable format
 */
export function formatFileSize(bytes: number | string): string {
  const size = typeof bytes === 'string' ? parseInt(bytes) : bytes;

  if (isNaN(size) || size === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

/**
 * Format podcast date for display
 */
export function formatPodcastDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculate total duration from array of episodes
 */
export function calculateTotalDuration(episodes: Array<{ duration?: number | string }>): string {
  let totalSeconds = 0;

  episodes.forEach(episode => {
    if (episode.duration) {
      const sec = typeof episode.duration === 'string'
        ? parseInt(episode.duration)
        : episode.duration;
      if (!isNaN(sec)) totalSeconds += sec;
    }
  });

  return formatDuration(totalSeconds);
}

/**
 * Get episode count text
 */
export function getEpisodeCountText(count: number): string {
  if (count === 0) return 'No episodes';
  if (count === 1) return '1 episode';
  return `${count} episodes`;
}

/**
 * Sort episodes by date
 */
export function sortEpisodesByDate(episodes: Array<{ publishedAt?: string; date?: string }>, order: 'newest' | 'oldest' = 'newest'): Array<{ publishedAt?: string; date?: string }> {
  return [...episodes].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.date || 0).getTime();
    const dateB = new Date(b.publishedAt || b.date || 0).getTime();
    return order === 'newest' ? dateB - dateA : dateA - dateB;
  });
}

const podcastCache = new Map<string, { data: unknown; timestamp: number }>();
export function getCachedPodcast(key: string, ttlMs: number = 300000): unknown | null {
  const cached = podcastCache.get(key);
  if (cached && Date.now() - cached.timestamp < ttlMs) return cached.data;
  return null;
}

export function setCachedPodcast(key: string, data: unknown): void {
  podcastCache.set(key, { data, timestamp: Date.now() });
}

export function buildPodcastUrl(baseUrl: string, episodeSlug: string): string {
  return baseUrl.replace(/\/$/, '') + '/podcast/' + episodeSlug;
}

export function generatePodcastFeedUrl(baseUrl: string): string {
  return baseUrl.replace(/\/$/, '') + '/podcast/feed.xml';
}

export function trackPodcastListen(episodeId: string, listenTime: number): { event: string; timestamp: number; episodeId: string } {
  return { event: 'podcast_listen', timestamp: Date.now(), episodeId };
}

export function calculatePodcastCompletionRate(started: number, completed: number): number {
  return started > 0 ? Math.round((completed / started) * 100) : 0;
}
