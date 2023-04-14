// //src/types/website.ts
// import { Theme } from './theme';
// import { Component } from './component';

// export interface Page {
//   showInNavbar: boolean;
//   slug: string;
//   title: string;
//   components: Component[];
//   isHome: boolean;
//   order: number;
//   meta: {
//     title: string;
//     description: string;
//   };
//   _id: {
//     $oid: string;
//   };
// }

// export interface WhatsAppSettings {
//   enabled: boolean;
//   phoneNumber: string;
//   welcomeMessage?: string;
// }

// export interface AnalyticsSettings {
//   enabled: boolean;
//   createdAt?: Date;
//   lastSynced?: Date;
// }

// export interface SharedComponents {
//   header?: Component;
//   footer?: Component;
//   _id?: {
//     $oid: string;
//   };
// }

// export interface DeploymentMetadata {
//   deploymentId: string;
//   timestamp: number;
//   projectDir: string;
//   deployUrl?: string;
//   localUrl?: string;
// }

// export interface WebsiteData {
//   name: string;
//   uid?: string;
//   websiteId: string;
//   siteName: string;
//   pages: Page[];
//   theme: Theme;
//   sharedComponents?: SharedComponents;
//   whatsapp?: WhatsAppSettings;
//   analytics?: AnalyticsSettings;
//   status?: 'draft' | 'published';
//   lastModified?: {
//     $date: string;
//   };
//   createdAt?: {
//     $date: string;
//   };
//   __v?: number;
//   deploymentId?: string;
// }

//src/types/website.ts

import { Theme } from './theme';
import { Component } from './component';

export interface Page {
  showInNavbar: boolean;
  slug: string;
  title: string;
  components: Component[];
  isHome: boolean;
  order: number;
  meta: {
    title: string;
    description: string;
  };
  _id: {
    $oid: string;
  };
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  welcomeMessage?: string;
}

export interface ChatbotSettings {
  enabled: boolean;
  apiEndpoint?: string;
  primaryColor?: string;
  secondaryColor?: string;
  chatbotName?: string;
  initialMessage?: string;
  placeholder?: string;
}

export interface AnalyticsSettings {
  enabled: boolean;
  createdAt?: Date;
  lastSynced?: Date;
}

export interface SharedComponents {
  header?: Component;
  footer?: Component;
  _id?: {
    $oid: string;
  };
}

export interface DeploymentMetadata {
  deploymentId: string;
  timestamp: number;
  projectDir: string;
  deployUrl?: string;
  localUrl?: string;
}

// Homepage features and settings interfaces
export interface HomepageFeature {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
}

export interface HomepageSettings {
  headline?: string;
  subheadline?: string;
  features?: HomepageFeature[];
  backgroundImage?: string;
}

export interface WebsiteData {
  name: string;
  uid?: string;
  websiteId: string;
  siteName: string;
  pages: Page[];
  theme: Theme;
  sharedComponents?: SharedComponents;
  whatsapp?: WhatsAppSettings;
  chatbot?: ChatbotSettings;
  analytics?: AnalyticsSettings;
  status?: 'draft' | 'published';
  lastModified?: {
    $date: string;
  };
  createdAt?: {
    $date: string;
  };
  __v?: number;
  deploymentId?: string;
  url?: string;
  description?: string;
  homepage?: HomepageSettings; // Homepage specific settings
}

export interface WebsiteComponent {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

export interface WebsitePage {
  id: string;
  name: string;
  path: string;
  components: WebsiteComponent[];
}

export interface Website {
  id?: string;
  name: string;
  description?: string;
  theme?: Partial<Theme>;
  pages: WebsitePage[];
  content?: WebsiteComponent[]; // For backward compatibility
  sitemap?: Record<string, unknown>;
  metadata?: {
    title?: string;
    description?: string;
    favicon?: string;
    ogImage?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}