// src/types/footer.ts
import { NavigationItem } from './common';

export interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterContent {
  columns: FooterColumn[];
  social?: SocialLink[];
  copyright?: string;
}

export interface FooterProps {
  content: FooterContent;
  theme: any;
  id?: string;
  key?: string;
  'data-page'?: string;
  'data-component-type'?: string;
  'data-instance-number'?: string | number;
  'data-unique-id'?: string;
  'data-original-type'?: string;
}