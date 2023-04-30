import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

interface MetadataImage {
  src: string;
  alt: string;
  isPlaceholder?: boolean;
  fallbackReason?: string;
}

interface OpenGraphMeta {
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface TwitterMeta {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface AEOMeta {
  // Basic AEO (Answer Engine Optimization)
  contentType?: string;
  primaryTopic?: string;
  semanticKeywords?: string[];
  questionAnswerPairs?: Array<{
    question: string;
    answer: string;
    relevanceScore?: number;
  }>;
  authoritySignals?: {
    lastUpdated?: string;
    contentDepth?: string;
    expertise?: string;
  };

  // AEO Enhancements
  tldr?: string;
  keyTakeaways?: string[];

  // GEO/AIO (2025 CRITICAL - AI Overview Optimization)
  summary?: string;
  relatedTopics?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  targetAudience?: string;
  authorBio?: string;
  sources?: Array<{
    title: string;
    url: string;
    description: string;
  }>;
  tableOfContents?: Array<{
    heading: string;
    anchor: string;
  }>;
  entities?: {
    people: string[];
    organizations: string[];
    places: string[];
    topics: string[];
  };

  // Legacy fields (for backwards compatibility)
  entityMentions?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  contextualInfo?: {
    parentOrganization?: string;
    denomination?: string;
    serviceArea?: string;
    established?: string;
  };
}

interface LocalSEO {
  address?: string;
  coordinates?: { lat: number; lng: number };
  phone?: string;
  hours?: string;
}

interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  image?: MetadataImage;
  openGraph?: OpenGraphMeta;
  twitter?: TwitterMeta;
  aeo?: AEOMeta;
  localSEO?: LocalSEO;
  schemaType?: string;
  structuredData?: any;
  siteName?: string;
  siteDomain?: string;
  hreflang?: string;
  viewport?: string;
  charset?: string;
}

interface PageData {
  isHome: boolean;
  order: number;
  meta: PageMeta;
}

interface SiteMetadata {
  pages: Record<string, PageData> | PageData[];
  name?: string;
  siteConfig?: {
    name: string;
    description: string;
    domain: string;
    defaultImage: string;
  };
}

/**
 * Helper function to find a page in both array and object metadata structures
 */
function findPageData(metadata: SiteMetadata, pagePath: string): PageData | null {
  if (Array.isArray(metadata.pages)) {
    // New array structure
    if (pagePath === '/') {
      return metadata.pages.find((page: any) => page.isHome) || null;
    } else {
      const pageName = pagePath.replace('/', '');
      return metadata.pages.find((page: any) =>
        page.slug === pageName ||
        page.title?.toLowerCase() === pageName.replace(/-/g, ' ') ||
        page.displayTitle?.toLowerCase() === pageName.replace(/-/g, ' ')
      ) || null;
    }
  } else {
    // Old object structure
    return metadata.pages[pagePath] || null;
  }
}

/**
 * Helper function to get site configuration from metadata
 */
function getSiteConfig(metadata: SiteMetadata): any {
  return {
    name: metadata.name || metadata.siteConfig?.name || 'Your Website',
    description: metadata.siteConfig?.description || 'Website description',
    domain: metadata.siteConfig?.domain || '',
    defaultImage: metadata.siteConfig?.defaultImage || '/placeholder.webp'
  };
}

/**
 * Loads metadata from _metadata.json file
 * Tries both client-side fetch and server-side fs.readFile
 */
async function loadMetadata(): Promise<SiteMetadata | null> {
  try {
    // Check if we're on the server (Node.js environment)
    if (typeof window === 'undefined') {
      // Server-side: read from file system
      const publicPath = path.join(process.cwd(), 'public', '_metadata.json');
      if (fs.existsSync(publicPath)) {
        const content = fs.readFileSync(publicPath, 'utf-8');
        return JSON.parse(content);
      }

      // Fallback to root directory
      const rootPath = path.join(process.cwd(), '_metadata.json');
      if (fs.existsSync(rootPath)) {
        const content = fs.readFileSync(rootPath, 'utf-8');
        return JSON.parse(content);
      }
    } else {
      // Client-side: fetch from public directory
      const response = await fetch('/_metadata.json');
      if (response.ok) {
        return await response.json();
      }
    }

    console.warn('⚠️ _metadata.json not found');
    return null;
  } catch (error) {
    console.error('❌ Error loading _metadata.json:', error);
    return null;
  }
}

/**
 * Generates default metadata for pages without metadata
 */
function getDefaultMetadata(pagePath: string, siteConfig?: any): Metadata {
  const pageName = pagePath === '/' ? 'Home' :
    pagePath.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Page';

  const siteName = siteConfig?.name || 'Your Website';
  const defaultTitle = pagePath === '/' ? siteName : `${pageName} | ${siteName}`;
  const defaultDescription = `${pageName} page for ${siteName}`;
  const defaultImage = siteConfig?.defaultImage || '/placeholder.webp';

  return {
    title: defaultTitle,
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultImage],
      type: 'website',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultImage],
    },
    robots: 'index,follow',
  };
}

/**
 * Main function to generate Next.js Metadata from _metadata.json
 * This is used by Next.js pages for dynamic metadata generation
 */
export async function generateMetadata(pagePath: string): Promise<Metadata> {
  // Metadata generation happens during Next.js build
  const metadata = await loadMetadata();
  if (!metadata) {
    console.warn(`⚠️ Using default metadata for ${pagePath}`);
    return getDefaultMetadata(pagePath);
  }

  const pageData = findPageData(metadata, pagePath);
  if (!pageData?.meta) {
    console.warn(`⚠️ No metadata found for ${pagePath}, using defaults`);
    return getDefaultMetadata(pagePath, getSiteConfig(metadata));
  }

  const meta = pageData.meta;
  const siteConfig = getSiteConfig(metadata);

  // Build comprehensive metadata object
  const nextMetadata: Metadata = {
    title: meta.title,
    description: meta.description,

    // Keywords (if available from enhanced SEO)
    keywords: meta.keywords?.join(', '),

    // OpenGraph - use enhanced if available, otherwise basic
    openGraph: {
      title: meta.openGraph?.title || meta.title,
      description: meta.openGraph?.description || meta.description,
      images: [
        {
          url: meta.openGraph?.imageUrl || meta.image?.src || siteConfig?.defaultImage || '/placeholder.webp',
          alt: meta.openGraph?.imageAlt || meta.image?.alt || 'Page Image',
        }
      ],
      type: 'website',
      siteName: meta.siteName || siteConfig?.name || 'Your Website',
      url: meta.siteDomain ? `https://${meta.siteDomain}${meta.canonical || pagePath}` :
           (siteConfig?.domain ? `https://${siteConfig.domain}${meta.canonical || pagePath}` : undefined),
    },

    // Twitter - use enhanced if available, otherwise fallback
    twitter: {
      card: (meta.twitter?.card as any) || 'summary_large_image',
      title: meta.twitter?.title || meta.openGraph?.title || meta.title,
      description: meta.twitter?.description || meta.openGraph?.description || meta.description,
      images: [
        meta.twitter?.image || meta.openGraph?.imageUrl || meta.image?.src || siteConfig?.defaultImage || '/placeholder.webp'
      ],
    },

    // Technical SEO (if enhanced)
    robots: meta.robots || 'index,follow',

    // Additional meta tags
    other: {},
  };

  // Add canonical URL if available
  if (meta.canonical) {
    nextMetadata.alternates = {
      canonical: meta.canonical,
    };
  }

  // Add hreflang if available
  if (meta.hreflang) {
    nextMetadata.other!['hreflang'] = meta.hreflang;
  }

  // Add structured data if available (from enhanced SEO)
  if (meta.structuredData) {
    const scriptContent = JSON.stringify(meta.structuredData);
    // Next.js will properly inject this as a script tag
    nextMetadata.other!['application/ld+json'] = scriptContent;
  }

  // Add AEO-specific meta tags if available (from enhanced SEO)
  if (meta.aeo) {
    if (meta.aeo.contentType) {
      nextMetadata.other!['content-type'] = meta.aeo.contentType;
    }
    if (meta.aeo.primaryTopic) {
      nextMetadata.other!['topic'] = meta.aeo.primaryTopic;
    }
    if (meta.aeo.semanticKeywords) {
      nextMetadata.other!['semantic-keywords'] = meta.aeo.semanticKeywords.join(', ');
    }
  }

  // Metadata generated successfully
  return nextMetadata;
}

/**
 * Utility function to get page metadata without Next.js Metadata format
 * Used by SEO dialog and other components
 */
export async function getPageMetadata(pagePath: string): Promise<PageMeta | null> {
  const metadata = await loadMetadata();
  if (!metadata) {
    return null;
  }
  const pageData = findPageData(metadata, pagePath);
  return pageData?.meta || null;
}

/**
 * Utility function to update page metadata
 * Used by SEO dialog to save enhanced metadata
 */
export async function updatePageMetadata(pagePath: string, newMeta: Partial<PageMeta>): Promise<boolean> {
  try {
    // This function is only used on the server (in API routes)
    if (typeof window !== 'undefined') {
      console.error('❌ updatePageMetadata can only be called on the server');
      return false;
    }

    const metadata = await loadMetadata();
    if (!metadata) {
      console.error('❌ Cannot update metadata: _metadata.json not found');
      return false;
    }

    // Find and ensure page exists
    const pageData = findPageData(metadata, pagePath);
    if (!pageData) {
      console.error(`❌ Page ${pagePath} not found in metadata`);
      return false;
    }

    // Deep merge the metadata while preserving existing fields
    pageData.meta = {
      ...pageData.meta,
      ...newMeta,
      // Handle nested objects properly
      image: newMeta.image ? { ...pageData.meta.image, ...newMeta.image } : pageData.meta.image,
      openGraph: newMeta.openGraph ? { ...pageData.meta.openGraph, ...newMeta.openGraph } : pageData.meta.openGraph,
      twitter: newMeta.twitter ? { ...pageData.meta.twitter, ...newMeta.twitter } : pageData.meta.twitter,
      aeo: newMeta.aeo ? { ...pageData.meta.aeo, ...newMeta.aeo } : pageData.meta.aeo,
      localSEO: newMeta.localSEO ? { ...pageData.meta.localSEO, ...newMeta.localSEO } : pageData.meta.localSEO,
    };

    // Write back to file
    const publicPath = path.join(process.cwd(), 'public', '_metadata.json');
    fs.writeFileSync(publicPath, JSON.stringify(metadata, null, 2));

    console.log(`✅ Updated metadata for ${pagePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating metadata for ${pagePath}:`, error);
    return false;
  }
}

/**
 * Get all available page paths from metadata
 * Used by SEO dialog for page selection
 */
export async function getAllPagePaths(): Promise<string[]> {
  const metadata = await loadMetadata();
  if (!metadata) {
    return [];
  }

  if (Array.isArray(metadata.pages)) {
    // New array structure - convert to paths
    return metadata.pages.map((page: any) => {
      if (page.isHome) return '/';
      return `/${page.slug}`;
    });
  } else {
    // Old object structure
    return Object.keys(metadata.pages);
  }
}

/**
 * Check if a page has enhanced SEO metadata
 * Used by SEO dialog to determine if page has been SEO-optimized
 */
export async function hasEnhancedSEO(pagePath: string): Promise<boolean> {
  const meta = await getPageMetadata(pagePath);
  if (!meta) return false;

  // Check if page has enhanced SEO fields beyond basic
  return !!(meta.keywords || meta.openGraph || meta.twitter || meta.aeo || meta.structuredData);
}

/**
 * Viewport configuration for Next.js 15+
 * Separate export required by Next.js App Router
 */
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export type { PageMeta, SiteMetadata, MetadataImage, OpenGraphMeta, TwitterMeta, AEOMeta, LocalSEO };