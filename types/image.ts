// src/types/image.ts
export interface ImageAttribution {
    photographer: string;
    photographerUrl: string;
    unsplashUrl: string;
  }
  
  export interface ImageContent {
    src: string;
    alt: string;
    attribution?: ImageAttribution;
    temporary?: boolean;
    fileName?: string | null;
  }