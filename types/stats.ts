

// //src/types/stats.ts
// import { Theme } from './theme';
// import { CustomColors } from './common';

// export interface StatItem {
//   label: string;
//   value: string;
// }

// export interface StatsStyles {
//   container?: {
//     backgroundColor?: string;
//   };
//   title?: {
//     color?: string;
//     fontFamily?: string;
//   };
//   description?: {
//     color?: string;
//     fontFamily?: string;
//   };
//   statsContainer?: {
//     backgroundColor?: string;
//   };
//   statLabel?: {
//     color?: string;
//     fontFamily?: string;
//   };
//   statValue?: {
//     color?: string;
//     fontFamily?: string;
//   };
// }

// export interface StatsContent {
//   title: string;
//   description: string;
//   stats: StatItem[];
//   styles?: StatsStyles;
//   customColors?: CustomColors;
// }

// export interface StatsProps {
//   content: StatsContent;
//   theme: Theme;
// }


// src/types/stats.ts
import { Theme } from './theme';
import { CustomColors } from './common';

export interface StatItem {
  label: string;
  value: string;
  description?: string;
}

export interface StatsStyles {
  container?: {
    backgroundColor?: string;
  };
  headline?: {
    color?: string;
    fontFamily?: string;
  };
  subheadline?: {
    color?: string;
    fontFamily?: string;
  };
  description?: {
    color?: string;
    fontFamily?: string;
  };
  statsContainer?: {
    backgroundColor?: string;
    borderColor?: string;  // Added to support custom border colors
  };
  statLabel?: {
    color?: string;
    fontFamily?: string;
  };
  statValue?: {
    color?: string;
    fontFamily?: string;
  };
  statDescription?: {
    color?: string;
    fontFamily?: string;
  };
  button?: {  // Added to support add button styling in edit mode
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
  };
}

export interface StatsContent {
  headline: string;
  subheadline?: string;
  description?: string;
  stats: StatItem[];
  styles?: StatsStyles;
  customColors?: CustomColors;
  backgroundType?: 'primary' | 'secondary';  // Added to support theme background type
}

// Added to support edit mode handlers
export interface StatsEditHandlers {
  headline?: (value: string) => void;
  subheadline?: (value: string) => void;
  description?: (value: string) => void;
  stats?: {
    add: () => void;
    update: (index: number, field: string, value: string) => void;
  };
}

export interface StatsProps {
  content: StatsContent;
  theme: Theme;
  onEdit?: StatsEditHandlers;  // Added to support edit mode
  styles?: StatsStyles;  // Added to support style overrides
}

import { ComponentProps } from './component';

export interface StatsWithDescriptionContent {
  headline?: string;
  subheadline?: string;
  description?: string;
  stats?: StatItem[];
  backgroundType?: 'primary' | 'secondary' | 'custom';
  customBackgroundColor?: string;
  styles?: StatsStyles;
}

export interface StatsWithDescriptionProps extends ComponentProps<StatsWithDescriptionContent> {}