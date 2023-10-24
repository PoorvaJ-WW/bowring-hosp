import { ComponentProps } from './component';
import { ImageContent } from './image';

export interface ContentShortContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentShortProps extends ComponentProps<ContentShortContent> {}

// Add more content component types here as you create them
export interface ContentLongContent {
  title?: string;
  subtitle?: string;
  sections?: Array<{
    title: string;
    content: string;
    image?: ImageContent;
  }>;
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
}

export interface ContentLongProps extends ComponentProps<ContentLongContent> {}

export interface ContentWithSidebarContent {
  title?: string;
  subtitle?: string;
  mainContent?: string;
  sidebar?: {
    title?: string;
    items?: Array<{
      title: string;
      description: string;
      link?: string;
    }>;
  };
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
}

export interface ContentWithSidebarProps extends ComponentProps<ContentWithSidebarContent> {}

export interface ContentWithListContent {
  headline?: string;
  subheadline?: string;
  items?: Array<{
    title: string;
    description: string;
  }>;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentWithListProps extends ComponentProps<ContentWithListContent> {}

export interface ContentMessageContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentMessageProps extends ComponentProps<ContentMessageContent> {}

export interface ContentValueMissionContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentValueMissionProps extends ComponentProps<ContentValueMissionContent> {}

export interface ContentPicTopContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentPicTopProps extends ComponentProps<ContentPicTopContent> {}

export interface ContentBasicButtonContent {
  headline?: string;
  description?: string;
  cta_primary?: {
    text: string;
    href: string;
  };
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentBasicButtonProps extends ComponentProps<ContentBasicButtonContent> {}

export interface ContentLeftPicContent {
  headline?: string;
  description?: string;
  attribution?: string;
  image?: ImageContent;
  backgroundType?: 'primary' | 'secondary' | 'custom';
}

export interface ContentLeftPicProps extends ComponentProps<ContentLeftPicContent> {}

// Union type for all content component content types
export type ContentComponentContent =
  | ContentShortContent
  | ContentMessageContent
  | ContentWithListContent
  | ContentValueMissionContent
  | ContentPicTopContent
  | ContentBasicButtonContent
  | ContentLeftPicContent
  | ContentLongContent
  | ContentWithSidebarContent;

// Union type for all content component props
export type ContentComponentProps =
  | ContentShortProps
  | ContentMessageProps
  | ContentWithListProps
  | ContentValueMissionProps
  | ContentPicTopProps
  | ContentBasicButtonProps
  | ContentLeftPicProps
  | ContentLongProps
  | ContentWithSidebarProps;