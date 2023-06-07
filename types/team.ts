import { ComponentProps } from './component';
import { ImageContent } from './image';

// Team member interface
export interface TeamMember {
  name?: string;
  role?: string;
  bio?: string;
  image?: ImageContent;
  xUrl?: string;
  linkedinUrl?: string;
}

// Team Full Width With Images Component
export interface TeamFullWidthWithImagesContent {
  headline?: string;
  description?: string;
  members?: TeamMember[];
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
}

export interface TeamFullWidthWithImagesProps extends ComponentProps<TeamFullWidthWithImagesContent> {}

// Team With Large Images Component
export interface TeamWithLargeImagesContent {
  headline?: string;
  description?: string;
  members?: TeamMember[];
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
}

export interface TeamWithLargeImagesProps extends ComponentProps<TeamWithLargeImagesContent> {}

// Union type for all team component content
export type TeamComponentContent = 
  | TeamFullWidthWithImagesContent
  | TeamWithLargeImagesContent;