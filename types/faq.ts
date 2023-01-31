import { Theme } from './theme';
import { CustomColors } from './common';

export interface FaqItem {
  question: string;
  answer: string;
  id?: string | number;
}

export interface FaqContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  faqs?: FaqItem[];
  backgroundType?: 'primary' | 'secondary';
  customColors?: CustomColors;
  styles?: {
    container?: { backgroundColor?: string };
    headline?: { fontFamily?: string; color?: string };
    subheadline?: { fontFamily?: string; color?: string };
    description?: { fontFamily?: string; color?: string };
    question?: { fontFamily?: string; color?: string };
    answer?: { fontFamily?: string; color?: string };
    accordion?: { borderColor?: string; backgroundColor?: string };
  };
}

// Base props interface
export interface BaseFaqProps {
  content: FaqContent;
  theme: Theme;
}

// Existing FAQ component
export interface FaqThreeColumnCenterContent extends FaqContent {
  // Inherits all base properties
}

// New FAQ components
export interface FaqTwoColumnsCenterContent extends FaqContent {
  // Inherits all base properties
}

export interface FaqTwoColumnsContent extends FaqContent {
  // Inherits all base properties
}

export interface FaqSideBySideContent extends FaqContent {
  // Inherits all base properties
}

export interface FaqOffsetContent extends FaqContent {
  // Inherits all base properties
}

export interface FaqThreeColumnCenterProps extends BaseFaqProps {
  content: FaqThreeColumnCenterContent;
}

export interface FaqTwoColumnsCenterProps extends BaseFaqProps {
  content: FaqTwoColumnsCenterContent;
}

export interface FaqTwoColumnsProps extends BaseFaqProps {
  content: FaqTwoColumnsContent;
}

export interface FaqSideBySideProps extends BaseFaqProps {
  content: FaqSideBySideContent;
}

export interface FaqOffsetProps extends BaseFaqProps {
  content: FaqOffsetContent;
}

export interface FaqProps extends BaseFaqProps {
  content: FaqContent;
}