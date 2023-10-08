// types/blog.ts
export interface BlogPost {
  // Core fields
  id: string;
  userId: string;
  websiteId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  featuredImageUrl?: string;
  tags: string[];
  categories: string[];
  createdAt: string;
  published: boolean;
  publishedAt?: string;
  lastModified?: string;
  displayOrder?: number;
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
  schemaType?: 'BlogPosting' | 'Article' | 'NewsArticle' | 'TechArticle';

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
  relatedPosts?: string[]; // Array of blog post IDs

  // AI SEO enablement
  enableAISEO?: boolean;

  // Legacy compatibility
  metaTitle?: string; // Maps to seoTitle
  metaDescription?: string; // Maps to seoDescription
  image?: string; // Maps to featuredImageUrl
}

export interface BlogListProps {
  posts?: BlogPost[];
  className?: string;
  theme?: any;
  orderBy?: 'createdAt' | 'displayOrder'; // Order by creation date or custom order
  categories?: string[]; // Filter by categories
  maxPosts?: number; // Limit number of posts to display
  content?: any; // Optional: Content data for configuration
}

export interface BlogsSectionProps {
  title?: string;
  description?: string;
  categories?: string[]; // Filter by specific categories
  maxPosts?: number; // Limit number of posts
  orderBy?: 'createdAt' | 'displayOrder'; // Ordering preference
  className?: string;
  showTitle?: boolean; // Whether to show the section title
  posts?: BlogPost[]; // Allow posts to be passed from parent
  theme?: any; // Add theme prop
  content?: any; // Add content prop for compatibility
}

export interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}