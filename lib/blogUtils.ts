// lib/blogUtils.ts
// Client-safe blog utility functions
// These can be safely imported in both client and server components

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
 * Generate excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength: number = 150): string {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Generate a slug from blog title
 */
export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Calculate estimated reading time for blog content
 * Assumes average reading speed of 200 words per minute
 */
export function calculateBlogReadingTime(content: string): { minutes: number; text: string } {
  if (!content) return { minutes: 0, text: '0 min read' };

  // Remove HTML tags and count words
  const text = content.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time (200 words per minute)
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    minutes,
    text: minutes === 1 ? '1 min read' : `${minutes} min read`
  };
}

/**
 * Check if blog post is recent (within last N days)
 */
export function isRecentPost(dateString: string, daysThreshold: number = 7): boolean {
  if (!dateString) return false;

  const postDate = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - postDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= daysThreshold && diffDays >= 0;
}
