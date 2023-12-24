// app/home/[slug]/page.tsx
// SERVER COMPONENT - Fetches data on server, passes to client component for themed UI
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogPostBySlug } from '../../../lib/blog';
import BlogDetailClient from './BlogDetailClient';
import Script from 'next/script';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    // Fetch blog post by slug directly - more efficient like podcast pattern
    // getBlogPostBySlug already uses the WEBSITE_ID constant from lib/blog.ts
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      notFound();
    }

    // Generate structured data for SEO/AEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': post.schemaType || 'BlogPosting',
      headline: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      image: post.featuredImageUrl || post.imageUrl,
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.lastModified || post.createdAt,
      author: post.author ? {
        '@type': 'Person',
        name: post.author.name,
        image: post.author.avatar
      } : undefined,
      keywords: [
        post.focusKeyword,
        ...(post.secondaryKeywords || []),
        ...(post.tags || [])
      ].filter(Boolean).join(', '),
      wordCount: post.wordCount,
      timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
      articleBody: post.tldr || post.excerpt,
      // AIO (AI Overview/Optimization) - 2025 Critical for AI Engines
      ...(post.summary ? { abstract: post.summary } : {}),
      ...(post.contentType ? { genre: post.contentType } : {}),
      ...(post.targetAudience ? {
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: post.targetAudience
        }
      } : {}),
      ...(post.learningOutcomes && post.learningOutcomes.length > 0 ? {
        teaches: post.learningOutcomes.join(', ')
      } : {}),
      ...(post.prerequisites && post.prerequisites.length > 0 ? {
        coursePrerequisites: post.prerequisites.join(', ')
      } : {}),
      ...(post.relatedTopics && post.relatedTopics.length > 0 ? {
        about: post.relatedTopics.map((topic: string) => ({
          '@type': 'Thing',
          name: topic
        }))
      } : {}),
      ...(post.authorBio ? {
        author: {
          '@type': 'Person',
          name: post.author?.name || 'Anonymous',
          description: post.authorBio
        }
      } : {}),
      ...(post.sources && post.sources.length > 0 ? {
        citation: post.sources.map((source: any) => ({
          '@type': 'CreativeWork',
          name: source.title,
          url: source.url,
          ...(source.description ? { description: source.description } : {})
        }))
      } : {}),
    };

    // Add FAQ structured data if available
    const faqSchema = post.faqSection && post.faqSection.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqSection.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : null;

    // Fetch related posts for the blog detail page
    const relatedPosts = await getBlogPosts(6);
    const filteredRelated = relatedPosts
      .filter(p => p.slug !== post.slug)
      .slice(0, 3);

    return (
      <>
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="blog-post-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {faqSchema && (
          <Script
            id="blog-faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
        )}
        {/* Pass server-fetched data to client component for themed UI */}
        <BlogDetailClient
          post={post}
          relatedPosts={filteredRelated}
          pageSlug="home"
        />
      </>
    );
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    notFound();
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    // getBlogPosts already uses the WEBSITE_ID constant from lib/blog.ts
    const posts = await getBlogPosts(100);

    // Next.js 16: Must return at least one result
    if (posts.length === 0) {
      return [{ slug: 'placeholder' }];
    }

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('❌ Error generating static params for blog posts:', error);
    return [{ slug: 'placeholder' }];
  }
}

// Generate metadata for SEO with comprehensive SEO/AEO fields
export async function generateMetadata({ params }: BlogPageProps) {
  try {
    const { slug } = await params;

    // getBlogPostBySlug already uses the WEBSITE_ID constant from lib/blog.ts
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    // Use SEO-optimized fields with fallbacks
    const title = post.seoTitle || post.metaTitle || post.title;
    const description = post.seoDescription || post.metaDescription || post.excerpt;
    const image = post.featuredImageUrl || post.imageUrl || post.image;

    // Build comprehensive keywords
    const keywords = [
      post.focusKeyword,
      ...(post.secondaryKeywords || []),
      ...(post.tags || [])
    ].filter(Boolean);

    // Base metadata
    const metadata: any = {
      title,
      description,
      keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
      authors: post.author?.name ? [{ name: post.author.name }] : undefined,

      // Canonical URL
      alternates: post.canonicalUrl ? {
        canonical: post.canonicalUrl
      } : undefined,

      // Robots directives
      robots: {
        index: !post.noIndex,
        follow: !post.noFollow,
        googleBot: {
          index: !post.noIndex,
          follow: !post.noFollow,
        }
      },

      // Open Graph
      openGraph: {
        title: post.socialMedia?.ogTitle || title,
        description: post.socialMedia?.ogDescription || description,
        type: 'article',
        images: post.socialMedia?.ogImage || image ? [post.socialMedia?.ogImage || image] : [],
        publishedTime: post.publishedAt || post.createdAt,
        modifiedTime: post.lastModified,
        authors: post.author?.name ? [post.author.name] : undefined,
        tags: post.tags,
      },

      // Twitter Card
      twitter: {
        card: post.socialMedia?.twitterCard || 'summary_large_image',
        title: post.socialMedia?.twitterTitle || title,
        description: post.socialMedia?.twitterDescription || description,
        images: post.socialMedia?.twitterImage || image ? [post.socialMedia?.twitterImage || image] : [],
      },

      // Additional metadata for enhanced SEO/AEO
      other: {
        'article:published_time': post.publishedAt || post.createdAt,
        'article:modified_time': post.lastModified,
        'article:author': post.author?.name,
        'article:section': post.categories?.[0],
        'article:tag': post.tags?.join(', '),
        // Advanced AEO metadata
        ...(post.tldr ? { 'tldr': post.tldr } : {}),
        ...(post.keyTakeaways && post.keyTakeaways.length > 0 ? {
          'key-takeaways': post.keyTakeaways.join(' | ')
        } : {}),
      }
    };

    return metadata;
  } catch (error) {
    console.error('❌ Error generating blog post metadata:', error);
    return {
      title: 'Post Not Found',
    };
  }
}