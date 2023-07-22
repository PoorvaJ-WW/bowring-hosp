import { ComponentProps } from './component';

export interface Podcast {
  id: string;
  title: string;
  duration: string;
  podcastUrl: string;
  description: string;
  speaker?: string;
  categories?: string[];
}

export interface BasePodcastContent {
  title?: string;
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
    title?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    description?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    podcastTitle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    podcastDescription?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    speaker?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
    };
  };
}

export interface PodcastPlayerSingleContent extends BasePodcastContent {
  podcastId?: string; // Direct podcast ID for single podcast
  podcastSlug?: string; // Firestore podcast slug for dynamic loading
  // Podcast player options
  autoplay?: boolean;
  showControls?: boolean;
}


export interface PodcastPlayerBigGalleryContent extends BasePodcastContent {
  subtitle?: string;
  galleryTitle?: string;
  featuredPodcastTitle?: string;
  featuredPodcastDescription?: string;
  // Dynamic podcast options - always enabled
  dynamic?: boolean; // Always true - podcast is always dynamic
  categories?: string[]; // Filter by categories (plural for consistency)
  limit?: number; // Limit number of podcast files to show initially
  loadMoreCount?: number; // Number of podcast files to load when "Load More" is clicked
}

export interface PodcastPlayerBigGalleryTwoColumnContent extends BasePodcastContent {
  subtitle?: string;
  galleryTitle?: string;
  featuredPodcastTitle?: string;
  featuredPodcastDescription?: string;
  // Dynamic podcast options - always enabled
  dynamic?: boolean; // Always true - podcast is always dynamic
  categories?: string[]; // Filter by categories (plural for consistency)
  limit?: number; // Limit number of podcast files to show initially
  loadMoreCount?: number; // Number of podcast files to load when "Load More" is clicked
}

export interface PodcastPlayerBigGalleryThreeColumnContent extends BasePodcastContent {
  subtitle?: string;
  galleryTitle?: string;
  featuredPodcastTitle?: string;
  featuredPodcastDescription?: string;
  // Dynamic podcast options - always enabled
  dynamic?: boolean; // Always true - podcast is always dynamic
  categories?: string[]; // Filter by categories (plural for consistency)
  limit?: number; // Limit number of podcast files to show initially
  loadMoreCount?: number; // Number of podcast files to load when "Load More" is clicked
}

// Union type for all podcast component content
export type PodcastContent =
  | PodcastPlayerSingleContent
  | PodcastPlayerBigGalleryContent
  | PodcastPlayerBigGalleryTwoColumnContent
  | PodcastPlayerBigGalleryThreeColumnContent;

export interface PodcastPlayerSingleProps extends ComponentProps<PodcastPlayerSingleContent> {}


export interface PodcastPlayerBigGalleryProps extends ComponentProps<PodcastPlayerBigGalleryContent> {}

export interface PodcastPlayerBigGalleryTwoColumnProps extends ComponentProps<PodcastPlayerBigGalleryTwoColumnContent> {}

export interface PodcastPlayerBigGalleryThreeColumnProps extends ComponentProps<PodcastPlayerBigGalleryThreeColumnContent> {}

// Base interface for other podcast components
export interface BasePodcastProps<T = any> extends ComponentProps<T> {}

// Union type for all podcast component types
export type PodcastComponentType =
  | 'podcast-player-single'
  | 'podcast-player-big-gallery'
  | 'podcast-player-big-gallery-two-column'
  | 'podcast-player-big-gallery-three-column';