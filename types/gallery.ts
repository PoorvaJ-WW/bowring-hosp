import { ComponentProps } from './component';
import { ImageContent } from './image';

// Database gallery image structure
export interface GalleryImage {
  id: string;
  userId: string;
  websiteId: string;
  imageUrl: string;
  title: string;
  altText: string;
  categories: string[];
  order: number;
  createdAt: string;
  published: boolean;
  // Optional metadata fields
  caption?: string;
  description?: string;
  tags?: string[];
  publishedAt?: string;
  fileName?: string;
  size?: number;
  contentType?: string;
  websiteName?: string;
}

export interface GalleryItem {
  id?: string | number;
  title?: string;
  description?: string;
  image?: ImageContent;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'video';
  colSpan?: number;
  backgroundColor?: string;
}

export interface SimpleCarouselContent {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: GalleryItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
  styles?: {
    container?: {
      backgroundColor?: string;
    };
    title?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    subtitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    description?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    itemTitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    itemDescription?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    text?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    secondaryText?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    accent?: {
      color?: string;
    };
  };
}

export interface SimpleCarouselProps extends ComponentProps<SimpleCarouselContent> {}

export interface GalleryGridContent {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
  // Dynamic gallery options - always enabled
  dynamic?: boolean; // Always true - galleries are always dynamic
  categories?: string[]; // Filter by categories (plural for consistency)
  limit?: number; // Limit number of images
  styles?: {
    container?: {
      backgroundColor?: string;
    };
    title?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    subtitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    itemTitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
  };
}

export interface GalleryGridProps extends ComponentProps<GalleryGridContent> {}

// Base interface for other gallery components
export interface BaseGalleryProps<T = any> extends ComponentProps<T> {}

// Union type for all gallery component content
export type GalleryComponentContent = SimpleCarouselContent | GalleryGridContent;

// Union type for all gallery component types
export type GalleryComponentType = 'simple-carousel' | 'gallery-grid';