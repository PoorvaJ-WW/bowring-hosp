// lib/types/contact.ts

import { Theme } from './theme';
import { CustomColors } from './common';

// Contact option for ContactSimpleCentered
export interface ContactOption {
  icon: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  phoneHours?: string;
}

// Column for ContactSimpleTwoColumn
export interface ContactColumn {
  title: string;
  description: string;
  phone?: string;
  phoneHours?: string;
  email?: string;
}

export interface ContactContent {
  // Common fields (ContactSplitWithMap and ContactSimpleCentered)
  headline?: string;
  subheadline?: string;

  // ContactSplitWithMap specific
  address?: string;
  phone?: string;
  phoneHours?: string;
  email?: string;
  mapUrl?: string;

  // ContactSimpleCentered specific
  contactOptions?: ContactOption[];

  // ContactSimpleTwoColumn specific
  columns?: ContactColumn[];

  // Common fields
  backgroundType?: 'primary' | 'secondary';
  customColors?: CustomColors;
}

export interface ContactProps {
  content: ContactContent;
  theme: Theme;
}