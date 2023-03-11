// app/home/[slug]/BlogDetailClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '../../../lib/blogUtils';
import { useTheme } from '../../../context/ThemeContext';

// Import DOMPurify for sanitization
let DOMPurify: any;
if (typeof window !== 'undefined') {
  import('dompurify').then((module) => {
    DOMPurify = module.default;
  }).catch(err => console.error('Error loading DOMPurify:', err));
}

interface BlogDetailClientProps {
  post: any;
  relatedPosts?: any[];
  pageSlug: string;
}

export default function BlogDetailClient({ post, relatedPosts = [], pageSlug }: BlogDetailClientProps) {
  const { theme } = useTheme();
  const [sanitizedContent, setSanitizedContent] = useState<string>('');

  // Sanitize HTML content on client
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

  // No loading needed - data is already provided!
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.colors.background.primary[theme.mode] }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>
            Post not found
          </h2>
          <p style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.colors.background.primary[theme.mode] }} className="min-h-screen">
      {/* Hero Image - ORIGINAL STYLING PRESERVED */}
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
            />
          </div>
        </div>
      )}

      {/* Article Content - ORIGINAL THEME-AWARE STYLING */}
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
                  style={{ color: theme.colors.primary[theme.mode] }}
                >
                  Home
                </Link>
              </li>
              <li>
                <span style={{ color: theme.colors.text.secondary[theme.mode] }}>/</span>
              </li>
              <li>
                <Link
                  href={`/${pageSlug}`}
                  className="hover:underline"
                  style={{ color: theme.colors.primary[theme.mode] }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <span style={{ color: theme.colors.text.secondary[theme.mode] }}>/</span>
              </li>
              <li>
                <span style={{ color: theme.colors.text.secondary[theme.mode] }}>{post.title}</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="text-xl leading-8 mb-8"
              style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b" style={{ borderColor: theme.colors.text.secondary[theme.mode] + '30' }}>
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
                  <p className="font-medium" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>
                    {post.author.name}
                  </p>
                </div>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
                Published on {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
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
                      backgroundColor: theme.colors.primary[theme.mode] + '20',
                      color: theme.colors.primary[theme.mode]
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Body - WITH THEME-AWARE STYLING */}
        <div className="mt-12">
          <div
            className="max-w-none leading-relaxed"
            style={{
              color: theme.colors.text.primary[theme.mode],
              fontSize: '1.125rem',
              lineHeight: '1.75',
              fontFamily: theme.fonts.body
            }}
          >
            <div
              style={{ color: theme.colors.text.primary[theme.mode] }}
              dangerouslySetInnerHTML={{
                __html: sanitizedContent?.replace(
                  /<([^>]+)>/g,
                  (match, tag) => {
                    // Apply theme colors to HTML tags
                    if (tag.startsWith('h1') || tag.startsWith('h2') || tag.startsWith('h3') ||
                        tag.startsWith('h4') || tag.startsWith('h5') || tag.startsWith('h6')) {
                      return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.heading}; font-weight: bold; margin: 1.5rem 0 1rem 0;">`;
                    }
                    if (tag.startsWith('p')) {
                      return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body}; margin-bottom: 1rem;">`;
                    }
                    if (tag.startsWith('a')) {
                      return `<${tag} style="color: ${theme.colors.primary[theme.mode]}; text-decoration: underline;">`;
                    }
                    if (tag.startsWith('li')) {
                      return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body};">`;
                    }
                    if (tag.startsWith('blockquote')) {
                      return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body}; border-left: 4px solid ${theme.colors.primary[theme.mode]}; padding-left: 1rem; font-style: italic;">`;
                    }
                    return match;
                  }
                ) || sanitizedContent
              }}
            />
          </div>
        </div>

        {/* Related Posts - WITH THEME COLORS */}
        {relatedPosts && relatedPosts.length > 0 && (
          <aside className="mt-16 pt-12 border-t" style={{ borderColor: theme.colors.text.secondary[theme.mode] + '30' }}>
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}
            >
              Related Articles
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/${pageSlug}/${relatedPost.slug}`}
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
                      style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}
                    >
                      {relatedPost.title}
                    </h4>
                    {relatedPost.excerpt && (
                      <p
                        className="text-sm line-clamp-3"
                        style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}
                      >
                        {relatedPost.excerpt}
                      </p>
                    )}
                    <time
                      className="text-xs mt-2 block"
                      style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}
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
        <div className="mt-16 pt-8 border-t" style={{ borderColor: theme.colors.text.secondary[theme.mode] + '30' }}>
          <Link
            href={`/${pageSlug}`}
            className="inline-flex items-center gap-2 font-medium hover:underline"
            style={{ color: theme.colors.primary[theme.mode], fontFamily: theme.fonts.body }}
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}