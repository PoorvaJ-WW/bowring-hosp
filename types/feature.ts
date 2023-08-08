
// src/types/feature.ts
import { Theme } from './theme';
import { CustomColors } from './common';
import { LucideIcon } from 'lucide-react';

export interface IconData {
  name: string;
  style: 'outline' | 'solid';
  Icon: LucideIcon;
}

export interface Feature {
  title: string;
  description: string;
  icon?: IconData | string;
  price?: string;
  name?: string;
}

export interface FeatureContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Feature[];
  backgroundType?: 'primary' | 'secondary';
}

export interface BaseFeatureContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Feature[];
  backgroundType?: 'primary' | 'secondary';
}

// Base props interface
export interface BaseFeatureProps {
  content: BaseFeatureContent;
  theme: Theme;
}

// Specific content interface for FeatureCentered2x2Grid
export interface FeatureCentered2x2GridContent extends BaseFeatureContent {
  gridLayout?: {
    columns: 2;
    gap: string;
  };
}

// Props interface for FeatureCentered2x2Grid
export interface FeatureCentered2x2GridProps extends BaseFeatureProps {
  content: FeatureCentered2x2GridContent;
}

// Specific content interface for FeatureSimpleThreeColumn
export interface FeatureSimpleThreeColumnContent extends BaseFeatureContent {
  columnLayout?: {
    columns: 3;
    spacing: string;
  };
}

// Props interface for FeatureSimpleThreeColumn
export interface FeatureSimpleThreeColumnProps extends BaseFeatureProps {
  content: FeatureSimpleThreeColumnContent;
}


export interface FeatureWithImage extends Feature {
  image: {
    src: string;
    alt: string;
  };
  link?: string;
}

export interface FeatureImageThreeColumnContent extends BaseFeatureContent {
  features: FeatureWithImage[];
  columnLayout?: {
    columns: 3;
    spacing: string;
  };
}

export interface FeatureImageThreeColumnProps extends BaseFeatureProps {
  content: FeatureImageThreeColumnContent;
}

// FeatureWithPic component types
export interface FeatureWithPicContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  image?: {
    src: string;
    alt: string;
  };
  backgroundType?: 'primary' | 'secondary';
}

// FeatureWithHover component types
export interface FeatureWithHoverContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  backgroundType?: 'primary' | 'secondary';
}

// FeatureWithBorderLayout component types
export interface FeatureWithBorderLayoutContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  backgroundType?: 'primary' | 'secondary';
}

// FeatureSplitWithImage component types
export interface FeatureSplitWithImageContent {
  headline: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  image?: {
    src: string;
    alt: string;
  };
  backgroundType?: 'primary' | 'secondary';
}

// FeatureListCard component types
export interface FeatureListCardContent {
  headline: string;
  subheadline?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: {
      text: string;
      url: string;
    };
  }>;
  backgroundType?: 'primary' | 'secondary';
}
