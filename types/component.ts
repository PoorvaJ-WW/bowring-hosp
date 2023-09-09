//src/types/component.ts
import { HeaderContent } from './header';
import { FooterContent } from './footer';
import { HeroContent } from './hero';
import { FeatureContent, FeatureWithPicContent, FeatureWithHoverContent, FeatureWithBorderLayoutContent, FeatureSplitWithImageContent, FeatureListCardContent } from './feature';
import { CTAContent } from './cta';
import { StatsContent, StatsWithDescriptionContent } from './stats';
import { TestimonialContent, TestimonialsLongContent, TestimonialsBasicCardContent } from './testimonials';
import { ContactContent } from './contact';
import { ContentComponentContent } from './content';
import { FaqContent } from './faq';
import { TeamComponentContent } from './team';
import { GalleryComponentContent } from './gallery';
import { VideoComponentContent } from './video';
import { BlogPost } from './blog';
import { Event } from './event';
import { UserPost } from './posts';
import { NavigationItem, Logo } from './common';

// Define the base content type
export type ComponentContent = 
  | HeaderContent 
  | FooterContent
  | HeroContent 
  | FeatureContent 
  | FeatureWithPicContent
  | FeatureWithHoverContent
  | FeatureWithBorderLayoutContent
  | FeatureSplitWithImageContent
  | FeatureListCardContent
  | CTAContent 
  | StatsContent 
  | StatsWithDescriptionContent
  | TestimonialContent
  | TestimonialsLongContent
  | TestimonialsBasicCardContent 
  | ContactContent
  | ContentComponentContent
  | FaqContent
  | TeamComponentContent
  | GalleryComponentContent
  | VideoComponentContent
  | BlogPost
  | Event
  | UserPost;

// All possible component types
export type ComponentType =
  | 'blog-list'
  | 'blog-section'
  | 'contact-split-with-map'
  | 'contact-simple-two-column'
  | 'contact-simple-centered'
  | 'content-basic-button'
  | 'content-pic-top'
  | 'content-short'
  | 'content-left-pic'
  | 'content-message'
  | 'content-value-mission'
  | 'content-with-list'
  | 'content-legal'
  | 'cta-simple-centered'
  | 'cta-simple-centered-on-brand'
  | 'cta-split-with-image'
  | 'cta-two-columns-with-photo'
  | 'cta-with-image-tiles'
  | 'cta-with-overlapping-image'
  | 'enhanced-left-aligned-nav-header'
  | 'event-card'
  | 'event-list'
  | 'events-section'
  | 'faq-three-column-center'
  | 'faq-two-columns-center'
  | 'faq-two-columns'
  | 'faq-side-by-side'
  | 'faq-offset'
  | 'form-centered'
  | 'form-with-left-image'
  | 'form-split-with-image'
  | 'form-split-with-map'
  | 'feature-centered-2x2-grid'
  | 'feature-image-three-column'
  | 'feature-big-image-name-detail'
  | 'feature-list-card'
  | 'feature-simple-three-column'
  | 'feature-split-with-image'
  | 'feature-with-border-layout'
  | 'feature-with-hover'
  | 'feature-with-pic'
  | 'gallery-grid'
  | 'gallery-masonry'
  | 'hero-angled-image'
  | 'hero-simple'
  | 'hero-simple-centered'
  | 'hero-split-with-image'
  | 'hero-with-image'
  | 'hero-with-image-no-button'
  | 'hero-with-image-background'
  | 'hero-image-top'
  | 'hero-with-split-info'
  | 'hero-with-image-bottom'
  | 'hero-banner'
  | 'hero-center-with-bottom-image'
  | 'hero-simple-centered-with-background'
  | 'hero-with-image-tiles'
  | 'hero-three-top-image'
  | 'hero-background-big-font'
  | 'left-aligned-nav-header'
  | 'stats-simple-in-card'
  | 'stats-with-description'
  | 'team-full-width-with-images'
  | 'team-with-large-images'
  | 'testimonials-basic-card'
  | 'testimonials-long'
  | 'testimonials-off-white-grid'
  | 'three-column-footer'
  | 'video-player-single'
  | 'posts-pinterest-masonry'
  | 'posts-magazine-masonry'
  | 'posts-polaroid'
  | 'posts-masonry'
  | 'posts-border-three-column'
  | 'posts-one-masonry'
  | 'blog-single'
  | 'event-single';
  
// Base component interface with generic content type
export interface BaseComponent<T = Record<string, unknown>> {
  id: string;
  type: ComponentType;
  content: T;
  _id?: {
    $oid: string;
  };
}

// Component props interface that includes unique identification attributes
export interface ComponentProps<T = Record<string, unknown>> {
  content: T;
  theme: any;
  id?: string;
  'data-page'?: string;
  'data-component-type'?: string;
  'data-unique-id'?: string; // Unique ID for AI editor to target specific components
  'data-original-type'?: string; // Original component type for reference
  'data-instance-number'?: number; // Instance number for components used multiple times on same page
  [key: string]: any; // Allow for additional props
}

// Editable component props interface for editing functionality
export interface EditableComponentProps {
  id?: string;
  'data-page'?: string;
  'data-component-type'?: string;
  'data-unique-id'?: string;
  'data-original-type'?: string;
  'data-instance-number'?: number;
}

// Component interface with specific content types
export interface Component extends BaseComponent<ComponentContent> {
  type: ComponentType;
}

// Component data interface for API/DB operations
export interface ComponentData extends BaseComponent {
  _id?: {
    $oid: string;
  };
}

// Type guards and helper functions
export function isNavigationItem(item: unknown): item is NavigationItem {
  if (!item || typeof item !== 'object') return false;
  const nav = item as Partial<NavigationItem>;
  return (
    typeof nav.name === 'string' &&
    typeof nav.text === 'string' &&
    typeof nav.href === 'string' &&
    typeof nav.link === 'string'
  );
}

export function isLogo(logo: unknown): logo is Logo {
  if (!logo || typeof logo !== 'object') return false;
  const l = logo as Partial<Logo>;
  return (
    typeof l.src === 'string' &&
    typeof l.alt === 'string' &&
    (l.type === undefined || typeof l.type === 'string') &&
    (l.mode === undefined || typeof l.mode === 'string')
  );
}

interface HeaderLogoStructure {
  light: Logo;
  dark: Logo;
}

export function isHeaderLogoStructure(logo: unknown): logo is HeaderLogoStructure {
  if (!logo || typeof logo !== 'object') return false;
  const l = logo as Partial<HeaderLogoStructure>;
  return (
    l.light !== undefined &&
    l.dark !== undefined &&
    isLogo(l.light) &&
    isLogo(l.dark)
  );
}

export function isHeaderContent(content: unknown): content is HeaderContent {
  if (!content || typeof content !== 'object') return false;
  const c = content as Partial<HeaderContent>;
  
  return (
    Array.isArray(c.navigation) &&
    c.navigation.every(isNavigationItem) &&
    isHeaderLogoStructure(c.logo) &&
    (c.mobile_menu === undefined || typeof c.mobile_menu === 'boolean')
  );
}

export function transformNavigationItems(items: unknown[]): NavigationItem[] {
  return items.map(item => {
    if (typeof item === 'string') {
      return {
        name: item,
        text: item,
        href: item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`,
        link: item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`
      };
    }

    if (typeof item === 'object' && item !== null && 'name' in item) {
      const navItem = item as Partial<NavigationItem>;
      return {
        name: navItem.name || 'Page',
        text: navItem.text || navItem.name || 'Page',
        href: navItem.href || '/',
        link: navItem.link || navItem.href || '/'
      };
    }

    return {
      name: 'Page',
      text: 'Page',
      href: '/',
      link: '/'
    };
  });
}

export function isComponent(component: unknown): component is Component {
  if (!component || typeof component !== 'object') return false;
  const c = component as Partial<Component>;
  return (
    typeof c.id === 'string' &&
    typeof c.type === 'string' &&
    c.content !== undefined &&
    typeof c.content === 'object' &&
    (!c._id || (typeof c._id === 'object' && typeof c._id.$oid === 'string'))
  );
}

export function isHeaderComponent(component: Component): component is Component & { content: HeaderContent } {
  return component.type.includes('header') && isHeaderContent(component.content);
}

export function getComponentPath(type: ComponentType): string {
  if (type.startsWith('hero-')) return `hero/${type}`;
  if (type.startsWith('feature-')) return `features/${type}`;
  if (type.startsWith('cta-')) return `cta/${type}`;
  if (type.startsWith('stats-')) return `stats/${type}`;
  if (type.startsWith('content-')) return `content/${type}`;
  if (type.startsWith('faq-')) return `faq/${type}`;
  if (type.startsWith('form-')) return `forms/${type}`;
  if (type.startsWith('team-')) return `team/${type}`;
  if (type.includes('carousel') || type.startsWith('gallery-')) return `gallery/${type}`;
  if (type.startsWith('video-')) return `video/${type}`;
  if (type.includes('header')) return `header/${type}`;
  if (type.includes('footer')) return `footer/${type}`;
  return type;
}