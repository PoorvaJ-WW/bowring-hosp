
// src/types/testimonials.ts
import { Theme } from './theme';
import { CustomColors } from './common';

export interface Author {
  name: string;
  role?: string;
  imageUrl: string;
}

export interface Testimonial {
  body: string;
  author: Author;
}

export interface TestimonialContent {
  subtitle: string;
  title: string;
  testimonials: Testimonial[];
  customColors?: CustomColors;
  backgroundType?: 'primary' | 'secondary';
}

export interface TestimonialProps {
  content: TestimonialContent;
  theme: Theme;
}