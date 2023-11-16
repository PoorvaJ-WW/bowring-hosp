// lib/postUtils.ts
// Client-safe post utility functions
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
 * Generate a slug from post title
 */
export function generatePostSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Transform database posts to display format
 * Ensures all required fields are present for component rendering
 */
export function transformToPostItems(posts: any[]): any[] {
  return posts.map(post => ({
    id: post.id,
    title: post.title || 'Untitled',
    slug: post.slug || generatePostSlug(post.title || 'untitled'),
    excerpt: post.excerpt || generateExcerpt(post.content || '', 150),
    content: post.content || '',
    imageUrl: post.imageUrl || post.featuredImageUrl || '/placeholder.svg',
    imageAlt: post.imageAlt || post.title || 'Post image',
    author: post.author || { name: 'Anonymous' },
    date: post.publishedAt || post.createdAt || new Date().toISOString(),
    categories: post.categories || [],
    tags: post.tags || [],
    published: post.published ?? true,
    ...post // Spread remaining fields
  }));
}
