// //src/types/cta.ts
// import { Theme } from './theme';

// export interface CTAButton {
//     text: string;
//     link: string;
//   }
  
//   export interface CTAStyles {
//     container?: {
//       backgroundColor?: string;
//     };
//     title?: {
//       color?: string;
//       fontFamily?: string;
//     };
//     description?: {
//       color?: string;
//       fontFamily?: string;
//     };
//     cta_primary?: {
//       backgroundColor?: string;
//       color?: string;
//       fontFamily?: string;
//     };
//     cta_secondary?: {
//       color?: string;
//       fontFamily?: string;
//     };
//   }
  
//   export interface CTAContent {
//     title: string;
//     description: string;
//     cta_primary: CTAButton;
//     cta_secondary: CTAButton;
//     styles?: CTAStyles;
//   }
  
//   export interface CTAProps {
//     content: CTAContent;
//     theme: Theme;
//   }

// src/types/cta.ts
import { Theme } from './theme';
import { CustomColors } from './common';

export interface CTAButton {
  text: string;
  link?: string;
  url?: string;

}

export interface CTAContent {
  headline: string;
  subheadline?: string;
  description: string;
  cta_primary: CTAButton;
  cta_secondary?: CTAButton;
  customColors?: CustomColors;
  backgroundType?: 'primary' | 'secondary';
  background_color?: string;
}

export interface CTAProps {
  content: CTAContent;
  theme: Theme;
}