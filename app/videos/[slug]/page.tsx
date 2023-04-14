// app/videos/[slug]/page.tsx
// SERVER COMPONENT - Fetches data server-side with Firebase Admin SDK
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVideoBySlug, getVideos, getRelatedVideos } from '../../../lib/videosServer';
import VideoDetailClient from '../../../components/video/VideoDetailClient';
import Script from 'next/script';

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Server component that fetches video data and passes it to client component
 * This follows the exact pattern used by blog posts for optimal performance
 */
export default async function VideoPage({ params }: VideoPageProps) {
  const { slug } = await params;

  try {
    // Fetch video by slug using Firebase Admin SDK (server-side)
    const video = await getVideoBySlug(slug);

    if (!video) {
      notFound();
    }

    // Fetch related videos from the same categories
    const relatedVideos = await getRelatedVideos(
      video.id,
      video.categories,
      4
    );

    // Generate comprehensive VideoObject structured data for SEO/AEO
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': video.schemaType || 'VideoObject',
      name: video.seoTitle || video.title,
      description: video.seoDescription || video.description || video.excerpt,
      thumbnailUrl: video.useCustomThumbnail && video.customThumbnailUrl
        ? [video.customThumbnailUrl, video.thumbnail].filter(Boolean)
        : video.thumbnail,
      uploadDate: video.publishedAt || video.createdAt,
      datePublished: video.publishedAt || video.createdAt,
      dateModified: video.lastModified || video.createdAt,
      duration: video.duration,
      contentUrl: video.url,
      embedUrl: video.videoId ?
        (video.url?.includes('youtube') ? `https://www.youtube.com/embed/${video.videoId}` :
         video.url?.includes('vimeo') ? `https://player.vimeo.com/video/${video.videoId}` :
         video.url) : video.url,
      author: video.author ? {
        '@type': 'Person',
        name: video.author.name,
        image: video.author.avatar
      } : video.channelTitle ? {
        '@type': 'Person',
        name: video.channelTitle
      } : undefined,
      keywords: [
        video.focusKeyword,
        ...(video.secondaryKeywords || []),
        ...(video.tags || []),
        ...(video.categories || [])
      ].filter(Boolean).join(', '),
      interactionStatistic: video.views || video.viewCount ? {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: video.views || parseInt(video.viewCount || '0')
      } : undefined,
      transcript: video.transcript,
      contentRating: video.contentRating,
      inLanguage: video.language || 'en',
      ...(video.subtitles && video.subtitles.length > 0 ? {
        caption: video.subtitles.map(sub => ({
          '@type': 'MediaObject',
          encodingFormat: 'text/vtt',
          contentUrl: sub.url,
          inLanguage: sub.language
        }))
      } : {}),
      // AIO (AI Overview/Optimization) - 2025 Critical for AI Engines
      ...(video.summary ? { abstract: video.summary } : {}),
      ...(video.contentType ? { genre: video.contentType } : {}),
      ...(video.targetAudience ? {
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: video.targetAudience
        }
      } : {}),
      ...(video.watchTime ? { timeRequired: video.watchTime } : {}),
      ...(video.learningOutcomes && video.learningOutcomes.length > 0 ? {
        teaches: video.learningOutcomes.join(', ')
      } : {}),
      ...(video.prerequisites && video.prerequisites.length > 0 ? {
        coursePrerequisites: video.prerequisites.join(', ')
      } : {}),
      ...(video.relatedTopics && video.relatedTopics.length > 0 ? {
        about: video.relatedTopics.map(topic => ({
          '@type': 'Thing',
          name: topic
        }))
      } : {}),
      ...(video.authorBio ? {
        creator: {
          '@type': 'Person',
          name: video.author?.name || video.channelTitle,
          description: video.authorBio
        }
      } : {}),
      ...(video.sources && video.sources.length > 0 ? {
        citation: video.sources.map(source => ({
          '@type': 'CreativeWork',
          name: source.title,
          url: source.url,
          ...(source.description ? { description: source.description } : {})
        }))
      } : {}),
    };

    // Add FAQ schema if available (for AEO)
    const faqSchema = video.faqSection && video.faqSection.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: video.faqSection.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : null;

    return (
      <>
        {/* JSON-LD Structured Data for Video SEO/AEO */}
        <Script
          id="video-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {/* JSON-LD FAQ Schema for AEO (if available) */}
        {faqSchema && (
          <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
        )}
        {/* Pass server-fetched data to client component */}
        <VideoDetailClient video={video} relatedVideos={relatedVideos} />
      </>
    );
  } catch (error) {
    console.error('❌ Error fetching video:', error);
    notFound();
  }
}

/**
 * Generate static params for all videos (Static Generation with ISR)
 */
export async function generateStaticParams() {
  try {
    // Fetch all videos for static generation
    const videos = await getVideos(100);

    // Next.js 16: Must return at least one result
    if (videos.length === 0) {
      return [{ slug: 'placeholder' }];
    }

    return videos.map((video) => ({
      slug: video.slug || video.id,
    }));
  } catch (error) {
    console.error('❌ Error generating static params for videos:', error);
    return [{ slug: 'placeholder' }];
  }
}

/**
 * Generate comprehensive metadata for SEO/AEO (Server-side)
 */
export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const video = await getVideoBySlug(slug);

    if (!video) {
      return {
        title: 'Video Not Found',
        description: 'The requested video could not be found.',
      };
    }

    // Use SEO-optimized fields with fallbacks
    const title = video.seoTitle || video.title;
    const description = video.seoDescription || video.description || video.excerpt || '';

    // Build comprehensive keywords
    const keywords = [
      video.focusKeyword,
      ...(video.secondaryKeywords || []),
      ...(video.tags || []),
      ...(video.categories || [])
    ].filter(Boolean);

    // Determine the best thumbnail to use
    const thumbnailUrl = video.useCustomThumbnail && video.customThumbnailUrl
      ? video.customThumbnailUrl
      : video.thumbnail;

    // Base metadata with comprehensive SEO/AEO fields
    const metadata: any = {
      title,
      description,
      keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
      authors: video.author
        ? [{ name: video.author.name }]
        : video.channelTitle
        ? [{ name: video.channelTitle }]
        : undefined,

      // Canonical URL
      alternates: {
        canonical: video.canonicalUrl || `/videos/${slug}`
      },

      // Robots directives
      robots: {
        index: !video.noIndex,
        follow: !video.noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
        googleBot: {
          index: !video.noIndex,
          follow: !video.noFollow,
        }
      },

      // Open Graph with comprehensive video-specific fields
      openGraph: {
        title: video.socialMedia?.ogTitle || title,
        description: video.socialMedia?.ogDescription || description,
        type: 'video.other',
        videos: video.url ? [{
          url: video.url,
          secureUrl: video.url?.startsWith('https') ? video.url : undefined,
          type: video.url?.includes('youtube') || video.url?.includes('vimeo')
            ? 'text/html'
            : 'video/mp4',
          width: 1920,
          height: 1080
        }] : [],
        images: thumbnailUrl ? [{
          url: video.socialMedia?.ogImage || thumbnailUrl,
          width: 1200,
          height: 630,
          alt: video.altText || title
        }] : [],
        siteName: 'Video Library',
        locale: video.language ? `${video.language}_${video.language.toUpperCase()}` : 'en_US',
        publishedTime: video.publishedAt || video.createdAt,
        modifiedTime: video.lastModified || video.createdAt,
        tags: video.tags,
      },

      // Twitter Card with player
      twitter: {
        card: video.socialMedia?.twitterCard || 'player',
        title: video.socialMedia?.twitterTitle || title,
        description: video.socialMedia?.twitterDescription || description,
        images: thumbnailUrl ? [video.socialMedia?.twitterImage || thumbnailUrl] : [],
        player: video.url,
        playerWidth: 1920,
        playerHeight: 1080,
      },

      // Additional metadata for enhanced SEO/AEO
      other: {
        // Video-specific metadata
        'video:duration': video.duration,
        'video:release_date': video.publishedAt || video.createdAt,
        'video:tag': video.tags?.join(', '),
        'video:channel': video.channelTitle,
        'video:views': video.views || video.viewCount,
        'video:rating': video.contentRating,

        // Article-style metadata
        'article:published_time': video.publishedAt || video.createdAt,
        'article:modified_time': video.lastModified || video.createdAt,
        'article:author': video.author?.name || video.channelTitle,
        'article:section': video.categories?.[0],
        'article:tag': video.tags?.join(', '),

        // Advanced AEO metadata
        ...(video.tldr ? { 'tldr': video.tldr } : {}),
        ...(video.keyTakeaways && video.keyTakeaways.length > 0 ? {
          'key-takeaways': video.keyTakeaways.join(' | ')
        } : {}),

        // Language and accessibility
        'content-language': video.language || 'en',
        ...(video.subtitles && video.subtitles.length > 0 ? {
          'subtitles-available': video.subtitles.map(s => s.language).join(', ')
        } : {}),
      }
    };

    return metadata;
  } catch (error) {
    console.error('❌ Error generating video metadata:', error);
    return {
      title: 'Video Not Found',
      description: 'The requested video could not be found.',
    };
  }
}