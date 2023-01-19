
// src/types/hero.ts
import { Theme } from './theme';
import { ImageContent, ImageAttribution } from './image';
import { CustomColors } from './common';

export interface CTAButton {
  text: string;
  link?: string;
  url?: string;
}


export interface Announcement {
  text: string;
  link_text?: string;
  link?: string;
  url?: string;
}

export interface ComponentStyles {
  container?: {
    backgroundColor?: string;
  };
  title?: {
    color?: string;
    fontFamily?: string;
  };
  description?: {
    color?: string;
    fontFamily?: string;
  };
  headline?: {
    color?: string;
    fontFamily?: string;
  };
  subheadline?: {
    color?: string;
    fontFamily?: string;
  };
  cta_primary?: {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
  };
  cta_secondary?: {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
  };
  announcement?: {
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    ring?: string;
  };
}

export interface BaseHeroContent {
  title?: string;
  description?: string;
  headline?: string;
  subheadline?: string;
  cta_primary?: CTAButton;
  cta_secondary?: CTAButton;
  announcement?: Announcement;
  styles?: ComponentStyles;
  customColors?: CustomColors;
  backgroundType?: 'primary' | 'secondary';
  background_color?: string;

}

export interface HeroSplitWithImageContent extends BaseHeroContent {
  image: ImageContent;
}

export interface HeroAngledImageContent extends BaseHeroContent {
  image: ImageContent;
}

export interface HeroWithImageContent extends BaseHeroContent {
  image: ImageContent;
}

export interface HeroWithImageNoButtonContent extends BaseHeroContent {
  image: ImageContent;
}

export interface HeroWithImageBackgroundContent extends BaseHeroContent {
  image: ImageContent;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  overlayOpacity?: number;
}

export interface HeroImageTopContent extends BaseHeroContent {
  image: ImageContent;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  overlayOpacity?: number;
}

export interface HeroWithSplitInfoContent extends BaseHeroContent {
  image: ImageContent;
  infoCards: Array<{
    value: string;
    description: string;
  }>;
  infoBoxBackground?: string;
}

export interface HeroWithImageBottomContent extends BaseHeroContent {
  image: ImageContent;
}

export interface HeroBannerContent extends BaseHeroContent {
  image: ImageContent;
  mobileImage?: ImageContent;
  showImageBorder?: boolean;
}

export interface HeroSimpleContent extends BaseHeroContent {
  image?: never;
}

export type HeroContent = 
  | HeroSplitWithImageContent 
  | HeroSimpleContent
  | HeroAngledImageContent
  | HeroWithImageContent
  | HeroWithImageNoButtonContent
  | HeroWithImageBackgroundContent
  | HeroImageTopContent
  | HeroWithSplitInfoContent
  | HeroWithImageBottomContent
  | HeroBannerContent;

export interface HeroProps {
  content: HeroContent;
  theme: Theme;
}