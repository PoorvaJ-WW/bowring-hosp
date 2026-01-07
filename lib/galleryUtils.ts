// lib/galleryUtils.ts
// Client-safe gallery utility functions
// These can be safely imported in both client and server components

import type { GalleryImage } from '@/types/gallery';

/**
 * Transform gallery images to GalleryItem format for components
 * Provides multiple format properties for compatibility
 */
export function transformToGalleryItems(images: GalleryImage[]): Array<{
  id: string;
  url?: string;
  src?: string;
  title?: string;
  alt?: string;
  description?: string;
  caption?: string;
  tags?: string[];
  categories?: string[];
  createdAt?: string;
  publishedAt?: string;
  aspectRatio?: string;
  image?: {
    src: string;
    alt: string;
  };
}> {
  return images.map((image, index) => ({
    id: image.id,
    // Provide multiple properties for compatibility
    url: image.imageUrl,
    src: image.imageUrl,
    title: image.title || '',
    alt: image.altText || image.title || 'Gallery image',
    description: image.description || image.caption || '',
    caption: image.caption || '',
    tags: image.tags || [],
    categories: image.categories || [],
    createdAt: image.createdAt,
    publishedAt: image.publishedAt || image.createdAt,
    aspectRatio: determineAspectRatio(index),
    // Also provide nested image object for compatibility
    image: {
      src: image.imageUrl,
      alt: image.altText || image.title || 'Gallery image'
    }
  }));
}

/**
 * Determine aspect ratio based on image index or other logic
 * You can enhance this to be more sophisticated
 */
export function determineAspectRatio(index: number): 'square' | 'wide' | 'tall' | 'video' {
  // Simple pattern: every 5th image is wide, others are square
  return index % 5 === 1 ? 'wide' : 'square';
}

/**
 * Determine column span based on image index or other logic
 * You can enhance this to be more sophisticated
 */
export function determineColSpan(index: number): number | undefined {
  // Simple pattern: every 5th image spans 2 columns
  return index % 5 === 1 ? 2 : undefined;
}

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
 * Generate a slug from gallery image title
 */
export function generateGallerySlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Filter gallery images by categories
 */
export function filterByCategories(images: any[], categories: string[]): any[] {
  if (!categories || categories.length === 0) return images;

  return images.filter(image =>
    image.categories?.some((cat: string) => categories.includes(cat))
  );
}

/**
 * Sort gallery images
 */
export function sortGalleryImages(
  images: any[],
  sortBy: 'newest' | 'oldest' | 'alphabetical' = 'newest'
): any[] {
  const sorted = [...images];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) =>
        new Date(b.publishedAt || b.createdAt || 0).getTime() -
        new Date(a.publishedAt || a.createdAt || 0).getTime()
      );

    case 'oldest':
      return sorted.sort((a, b) =>
        new Date(a.publishedAt || a.createdAt || 0).getTime() -
        new Date(b.publishedAt || b.createdAt || 0).getTime()
      );

    case 'alphabetical':
      return sorted.sort((a, b) =>
        (a.title || a.alt || '').localeCompare(b.title || b.alt || '')
      );

    default:
      return sorted;
  }
}

/**
 * Search gallery images
 */
export function searchGalleryImages(images: any[], searchTerm: string): any[] {
  if (!searchTerm) return images;

  const searchLower = searchTerm.toLowerCase();

  return images.filter(image =>
    image.title?.toLowerCase().includes(searchLower) ||
    image.alt?.toLowerCase().includes(searchLower) ||
    image.description?.toLowerCase().includes(searchLower) ||
    image.caption?.toLowerCase().includes(searchLower) ||
    image.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
    image.categories?.some((cat: string) => cat.toLowerCase().includes(searchLower))
  );
}

/**
 * Get unique categories from gallery images
 */
export function getGalleryCategories(images: any[]): string[] {
  const categories = new Set<string>();

  images.forEach(image => {
    if (image.categories) {
      image.categories.forEach((cat: string) => categories.add(cat));
    }
  });

  return Array.from(categories).sort();
}

/**
 * Get unique tags from gallery images
 */
export function getGalleryTags(images: any[]): string[] {
  const tags = new Set<string>();

  images.forEach(image => {
    if (image.tags) {
      image.tags.forEach((tag: string) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Group gallery images by year
 */
export function groupByYear(images: any[]): Map<string, any[]> {
  const grouped = new Map<string, any[]>();

  images.forEach(image => {
    const date = new Date(image.publishedAt || image.createdAt || Date.now());
    const year = date.getFullYear().toString();
    const existing = grouped.get(year) || [];
    existing.push(image);
    grouped.set(year, existing);
  });

  return grouped;
}

/**
 * Get image count by category
 */
export function getImageCountByCategory(images: any[]): Map<string, number> {
  const counts = new Map<string, number>();

  images.forEach(image => {
    if (image.categories) {
      image.categories.forEach((cat: string) => {
        counts.set(cat, (counts.get(cat) || 0) + 1);
      });
    }
  });

  return counts;
}

/**
 * Shuffle gallery images
 */
export function shuffleImages<T>(images: T[]): T[] {
  const shuffled = [...images];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
const galleryCache = new Map<string, { data: unknown; timestamp: number }>();
export function getCachedGallery(key: string, ttlMs: number = 300000): unknown | null {
  const cached = galleryCache.get(key);
  if (cached && Date.now() - cached.timestamp < ttlMs) return cached.data;
  return null;
}

export function setCachedGallery(key: string, data: unknown): void {
  galleryCache.set(key, { data, timestamp: Date.now() });
}
