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
