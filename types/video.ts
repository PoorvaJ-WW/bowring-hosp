import { ComponentProps } from './component';

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  src: string;
  description: string;
  videoId?: string; // YouTube video ID
}

export interface BaseVideoContent {
  headline?: string;
  subtitle?: string;
  description?: string;
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customColors?: {
    primary: { light: string; dark: string };
    secondary: { light: string; dark: string };
  };
  styles?: {
    container?: {
      backgroundColor?: string;
    };
    headline?: {
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
    videoTitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    videoDescription?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
  };
}

export interface VideoPlayerSingleContent extends BaseVideoContent {
  videoId?: string; // YouTube video ID (fallback)
  videoSlug?: string; // Firestore video slug for dynamic loading
  // YouTube embed options
  autoplay?: boolean;
  modestBranding?: boolean;
  showRelated?: boolean;
}

export interface VideoPlayerBigGalleryContent extends BaseVideoContent {
  galleryTitle?: string;
  featuredVideoTitle?: string;
  featuredVideoDescription?: string;
  // Dynamic video options - always enabled
  dynamic?: boolean; // Always true - videos are always dynamic
  category?: string; // Filter by category
  limit?: number; // Limit number of videos to show initially
  loadMoreCount?: number; // Number of videos to load when "Load More" is clicked
}

export interface VideoPlayerBigGalleryTwoColumnContent extends BaseVideoContent {
  galleryTitle?: string;
  featuredVideoTitle?: string;
  featuredVideoDescription?: string;
  // Dynamic video options - always enabled
  dynamic?: boolean; // Always true - videos are always dynamic
  category?: string; // Filter by category
  limit?: number; // Limit number of videos to show initially
  loadMoreCount?: number; // Number of videos to load when "Load More" is clicked
}

export interface VideoPlayerBigGalleryThreeColumnContent extends BaseVideoContent {
  galleryTitle?: string;
  featuredVideoTitle?: string;
  featuredVideoDescription?: string;
  // Dynamic video options - always enabled
  dynamic?: boolean; // Always true - videos are always dynamic
  category?: string; // Filter by category
  limit?: number; // Limit number of videos to show initially
  loadMoreCount?: number; // Number of videos to load when "Load More" is clicked
}

// Union type for all video component content
export type VideoContent =
  | VideoPlayerSingleContent
  | VideoPlayerBigGalleryContent
  | VideoPlayerBigGalleryTwoColumnContent
  | VideoPlayerBigGalleryThreeColumnContent;

export interface VideoPlayerSingleProps extends ComponentProps<VideoPlayerSingleContent> {}

export interface VideoPlayerBigGalleryProps extends ComponentProps<VideoPlayerBigGalleryContent> {}

export interface VideoPlayerBigGalleryTwoColumnProps extends ComponentProps<VideoPlayerBigGalleryTwoColumnContent> {}

export interface VideoPlayerBigGalleryThreeColumnProps extends ComponentProps<VideoPlayerBigGalleryThreeColumnContent> {}

// Base interface for other video components
export interface BaseVideoProps<T = any> extends ComponentProps<T> {}

// Union type for all video component types
export type VideoComponentType =
  | 'video-player-single'
  | 'video-player-big-gallery'
  | 'video-player-big-gallery-two-column'
  | 'video-player-big-gallery-three-column';