// JSON-DRIVEN BlogSingle Template - Simple Direct Editing
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import metadata from '@/_metadata.json';
import { formatDate } from '@/lib/blogUtils';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily } from '@/utils/themeUtils';
import { getContainerBackgroundColor, getTitleColor, getDescriptionColor, getSecondaryTextColor, getPrimaryButtonColor } from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Import DOMPurify for sanitization
let DOMPurify: any;
if (typeof window !== 'undefined') {
  import('dompurify').then((module) => {
    DOMPurify = module.default;
  }).catch(err => console.error('Error loading DOMPurify:', err));
}

interface Props {
  pageSlug?: string;
  componentId?: string;
  post?: any; // Post data passed from parent (optional)
  postId?: string; // Post ID for fetching
  postSlug?: string; // Post slug for fetching
  relatedPosts?: any[];
  theme?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => c.id === componentId || c.type === 'blog-single');
};

export default function BlogSingle(props: Props) {
  const { pageSlug = 'blog', componentId = 'blog-single', post: propPost, postId, postSlug, relatedPosts = [], theme: propTheme } = props;
  const { theme: contextTheme } = useTheme();
  const searchParams = useSearchParams();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get the blog page slug from routing config for consistent links
  const blogPageSlug = (metadata as any).routing?.blogPage || 'blog';

  // State for post data and loading
  const [post, setPost] = useState(propPost || null);
  const [loading, setLoading] = useState(!propPost);
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  
  // Get content from JSON metadata only if pageSlug is provided
  let content = {};
  if (pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }

  // Theme utilities using standardized color functions
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content });
  const headingColor = getTitleColor({ theme: currentTheme }); // For article title and headings
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For article content and author names
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For dates, reading time, breadcrumbs
  const linkColor = getPrimaryButtonColor({ theme: currentTheme }); // For links
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');
  
  // Load post data if not provided as prop
  useEffect(() => {
    if (propPost) {
      setPost(propPost);
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        
        // Get post ID or slug from props or URL params
        const id = postId || searchParams?.get('id');
        const slug = postSlug || searchParams?.get('slug');
        
        let foundPost = null;

        if (slug) {
          // Try to fetch by slug first using API route
          const response = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`);
          const data = await response.json();
          if (data.success && data.posts && data.posts.length > 0) {
            foundPost = data.posts[0];
          }
        } else if (id) {
          // Fallback to searching by ID using API route
          const response = await fetch('/api/blog?limit=100');
          const data = await response.json();
          if (data.success && data.posts) {
            foundPost = data.posts.find((p: any) => p.id === id);
          }
        }
        // Remove default fallback - if no slug or id, don't show any post

        if (foundPost) {
          setPost(foundPost);
        } else {
          console.warn('Blog post not found');
          setPost(null);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [propPost, postId, postSlug, searchParams]);
  
  // Sanitize HTML content
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sanitizeContent = () => {
        if (!post || !post.content) {
          setSanitizedContent('<p>No content available for this post.</p>');
          return;
        }
        
        if (DOMPurify) {
          const sanitized = DOMPurify.sanitize(post.content, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
          });
          setSanitizedContent(sanitized);
        } else {
          setTimeout(sanitizeContent, 100);
        }
      };
      
      sanitizeContent();
    }
  }, [post?.content]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
               style={{ borderColor: metaTextColor }}></div>
          <p className="text-lg font-medium" style={{ color: metaTextColor, fontFamily: bodyFont }}>
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if no post found
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: headingColor, fontFamily: headingFont }}>
            Post not found
          </h2>
          <p style={{ color: metaTextColor, fontFamily: bodyFont }}>
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor }} className="min-h-screen">
      {/* Hero Image */}
      {(post.featuredImageUrl || post.imageUrl) && (
        <div className="w-full max-w-4xl mx-auto px-6 pt-8">
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src={post.featuredImageUrl || post.imageUrl || 'https://storage.googleapis.com/sites-images-asia-01/WS1.webp'}
              alt={post.title}
              className="w-full h-auto object-contain bg-gray-50"
              style={{ maxHeight: '70vh' }}
              onError={(e) => {
                console.log('Image failed to load:', post.featuredImageUrl || post.imageUrl);
                (e.target as HTMLImageElement).src = 'https://storage.googleapis.com/sites-images-asia-01/WS1.webp';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', post.featuredImageUrl || post.imageUrl);
              }}
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* Article Header */}
        <header className="mb-12">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline"
                  style={{ color: linkColor }}
                >
                  Home
                </Link>
              </li>
              <li>
                <span style={{ color: metaTextColor }}>/</span>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:underline"
                  style={{ color: linkColor }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <span style={{ color: metaTextColor }}>/</span>
              </li>
              <li>
                <span style={{ color: metaTextColor }}>{post.title}</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            style={{ color: headingColor, fontFamily: headingFont }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="text-xl leading-8 mb-8"
              style={{ color: bodyTextColor, fontFamily: bodyFont }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b" style={{ borderColor: metaTextColor + '30' }}>
            {/* Author */}
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                    {post.author.name}
                  </p>
                </div>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                Published on {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                  {post.readingTime} min read
                </span>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: linkColor + '20',
                      color: linkColor
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div className="mt-12">
          <div
            className="max-w-none leading-relaxed"
            style={{
              color: bodyTextColor,
              fontSize: '1.125rem',
              lineHeight: '1.75',
              fontFamily: bodyFont
            }}
          >
            <div
              style={{
                color: bodyTextColor
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizedContent?.replace(
                  /<([^>]+)>/g,
                  (match, tag) => {
                    if (tag.startsWith('h1') || tag.startsWith('h2') || tag.startsWith('h3') || tag.startsWith('h4') || tag.startsWith('h5') || tag.startsWith('h6')) {
                      return `<${tag} style="color: ${headingColor}; font-family: ${headingFont}; font-weight: bold; margin: 1.5rem 0 1rem 0;">`;
                    }
                    if (tag.startsWith('p')) {
                      return `<${tag} style="color: ${bodyTextColor}; font-family: ${bodyFont}; margin-bottom: 1rem;">`;
                    }
                    if (tag.startsWith('a')) {
                      return `<${tag} style="color: ${linkColor}; text-decoration: underline;">`;
                    }
                    if (tag.startsWith('li')) {
                      return `<${tag} style="color: ${bodyTextColor}; font-family: ${bodyFont};">`;
                    }
                    if (tag.startsWith('blockquote')) {
                      return `<${tag} style="color: ${bodyTextColor}; font-family: ${bodyFont}; border-left: 4px solid ${linkColor}; padding-left: 1rem; font-style: italic;">`;
                    }
                    return match;
                  }
                ) || sanitizedContent
              }}
            />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <aside className="mt-16 pt-12 border-t" style={{ borderColor: metaTextColor + '30' }}>
            <h3
              className={`text-2xl font-bold mb-8 ${getEditableClasses()}`}
              style={{ color: headingColor, fontFamily: headingFont }}
              {...getEditableProps(
                (e?: React.MouseEvent) => {
                  e?.stopPropagation();
                  editWithAI(pageSlug, componentId, 'relatedTitle', 'Related Articles', 'Related Articles Title');
                },
                "Click to edit related articles title"
              )}
            >
              Related Articles
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/${blogPageSlug}/${relatedPost.slug}`}
                  className="group block hover:scale-105 transition-transform duration-200"
                >
                  <article className="h-full">
                    {relatedPost.featuredImageUrl && (
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedPost.featuredImageUrl}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h4
                      className="font-semibold text-lg mb-2 group-hover:underline"
                      style={{ color: headingColor, fontFamily: headingFont }}
                    >
                      {relatedPost.title}
                    </h4>
                    {relatedPost.excerpt && (
                      <p
                        className="text-sm line-clamp-3"
                        style={{ color: bodyTextColor, fontFamily: bodyFont }}
                      >
                        {relatedPost.excerpt}
                      </p>
                    )}
                    <time
                      className="text-xs mt-2 block"
                      style={{ color: metaTextColor, fontFamily: bodyFont }}
                    >
                      {formatDate(relatedPost.publishedAt)}
                    </time>
                  </article>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* Back to Blog */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: metaTextColor + '30' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium hover:underline"
            style={{ color: linkColor, fontFamily: bodyFont }}
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}