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

/**
 * Extract hashtags from blog content
 */
export function extractHashtags(content: string): string[] {
  if (!content) return [];
  const matches = content.match(/#[a-zA-Z0-9_]+/g);
  return matches ? [...new Set(matches.map(tag => tag.toLowerCase()))] : [];
}

/**
 * Calculate word count from blog content
 */
export function getWordCount(content: string): number {
  if (!content) return 0;
  const text = content.replace(/<[^>]*>/g, '');
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  return 'Just now';
}

const blogCache = new Map<string, { data: unknown; timestamp: number }>();
export function getCachedBlog(key: string, ttlMs: number = 300000): unknown | null {
  const cached = blogCache.get(key);
  if (cached && Date.now() - cached.timestamp < ttlMs) return cached.data;
  return null;
}

export function setCachedBlog(key: string, data: unknown): void {
  blogCache.set(key, { data, timestamp: Date.now() });
}

export function buildBlogUrl(baseUrl: string, slug: string): string {
  return baseUrl.replace(/\/$/, '') + '/blog/' + slug;
}

export function generateBlogShareUrl(slug: string, platform: string): string {
  const url = encodeURIComponent('https://example.com/blog/' + slug);
  if (platform === 'twitter') return 'https://twitter.com/intent/tweet?url=' + url;
  if (platform === 'facebook') return 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  return url;
}

export function trackBlogView(postId: string, userId?: string): { event: string; timestamp: number; postId: string } {
  return { event: 'blog_view', timestamp: Date.now(), postId };
}

export function calculateBlogEngagement(views: number, shares: number, comments: number): number {
  return Math.round((shares * 2 + comments * 3) / (views || 1) * 100);
}

export function generateBlogMetaDescription(content: string, maxLength: number = 160): string {
  const text = content.replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function generateBlogKeywords(title: string, tags: string[]): string {
  const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  return [...new Set([...titleWords, ...tags])].join(', ');
}
