// types/posts.ts
export interface UserPost {
  // Core fields
  id: string;                    // Firestore document ID
  userId: string;                // Firebase Auth UID
  websiteId: string;             // Reference to websites collection
  title: string;                 // Post title
  content: string;               // Post content
  excerpt: string;               // Brief description
  slug: string;                  // URL-friendly identifier
  imageUrl: string;              // Preview image URL
  featuredImageUrl?: string;     // Featured image (SEO optimized)
  imageAlt: string;              // Image alt text
  tags: string[];                // Array of tag strings
  categories: string[];          // Array of category strings
  aspectRatio: 'landscape' | 'portrait' | 'square';  // Image layout
  displayOrder: number;          // Sort order
  published: boolean;            // Publication status
  publishedAt?: string;          // ISO timestamp when published
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  lastModified?: string;         // ISO timestamp
  pdfUrl?: string;              // Optional PDF file URL
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: number;
  readingTime?: number;
  wordCount?: number;
  views?: number;

  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;

  // AEO (Answer Engine Optimization) fields
  tldr?: string; // Too Long; Didn't Read summary
  keyTakeaways?: string[]; // Bullet points of main ideas
  faqSection?: Array<{
    question: string;
    answer: string;
  }>;

  // Schema.org structured data
  schemaType?: 'Article' | 'NewsArticle' | 'BlogPosting' | 'CreativeWork';

  // Social Media optimization
  socialMedia?: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };

  // Related content
  relatedPosts?: string[]; // Array of post IDs

  // AI SEO enablement
  enableAISEO?: boolean;

  // Legacy compatibility
  metaTitle?: string; // Maps to seoTitle
  metaDescription?: string; // Maps to seoDescription
  image?: string; // Maps to featuredImageUrl
}

export interface PostsProps {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
}