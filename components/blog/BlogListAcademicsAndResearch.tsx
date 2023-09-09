// Generated page-specific component for academics-and-research
// This component is isolated - changes here only affect the academics-and-research page
// JSON-DRIVEN BlogList Template - Simple Direct Editing
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import metadata from '@/_metadata.json';
import { BlogListProps } from '@/types/blog';
import { formatDate } from '@/lib/blogUtils';
import { getFontFamily } from '@/utils/themeUtils';
import { getContainerBackgroundColor, getTitleColor, getDescriptionColor, getSecondaryTextColor } from '@/utils/colorUtils';
import { useTheme } from '@/context/ThemeContext';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// ISR: Content is static until manually revalidated via API
// No automatic revalidation - only when blog content changes

interface Props {
  pageSlug?: string;
  componentId?: string;
  posts?: any[];
  theme?: any;
  previewContent?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;

  return page.components?.find((c: any) => c.id === componentId || c.type === 'blog-list');
};

export default function BlogListAcademicsAndResearchAcademicsAndResearch(props: Props) {
  const { pageSlug = 'blog', componentId = 'blog-list', posts = [], theme: propTheme, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get the blog page slug from routing config for consistent links
  const blogPageSlug = (metadata as any).routing?.blogPage || 'blog';

  // Get content from JSON metadata or preview content
  const componentData = getComponentContent(pageSlug, componentId);
  const content = previewContent || componentData?.content || {};

  if (!content || Object.keys(content).length === 0) {
    console.error(`BlogList: content not found for ${pageSlug}/${componentId}`);
    return null;
  }


  // Extract content values with defaults
  const {
    title = "From the blog",
    description = "Discover insights and wisdom for your journey.",
    maxItems = 12,
    loadMoreIncrement = 6,
    categories,
    orderBy = 'publishedAt',
    showFilter = true,
    className = '',
  } = content;

  // State for posts if they're not provided directly
  const [loadedPosts, setLoadedPosts] = useState(posts);
  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState<string | null>(null);

  // State for filtering and pagination
  const [visibleCount, setVisibleCount] = useState(maxItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  // Theme utilities using standardized color functions
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content });
  const headingColor = getTitleColor({ theme: currentTheme }); // For section title and article titles
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For article content and author names
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For dates, reading time, author role
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  // Always fetch posts with current category filtering
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        params.set('limit', maxItems.toString());
        params.set('orderBy', orderBy);
        if (categories && categories.length > 0) {
          params.set('categories', categories.join(','));
        }

        // Fetch from API route instead of direct function call
        const response = await fetch(`/api/blog?${params.toString()}`);
        const data = await response.json();

        if (data.success && data.posts) {
          setLoadedPosts(data.posts);
          setError(null);
        } else {
          throw new Error(data.error || 'Failed to fetch posts');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [maxItems, categories, orderBy]); // Removed 'posts' dependency - always fetch with current filters

  // Filter posts based on search
  const filteredPosts = loadedPosts.filter(post => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      post.title?.toLowerCase().includes(searchLower) ||
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
      post.author?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b[orderBy] || b.createdAt).getTime() - new Date(a[orderBy] || a.createdAt).getTime();
      case 'oldest':
        return new Date(a[orderBy] || a.createdAt).getTime() - new Date(b[orderBy] || b.createdAt).getTime();
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Limit visible posts
  const displayPosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;

  // Load more handler
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreIncrement, sortedPosts.length));
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setVisibleCount(maxItems);
  };

  // Show loading state
  if (loading) {
    return (
      <div 
        className={`text-center py-24 ${className}`}
        style={{ backgroundColor }}
      >
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto"
               style={{ borderColor: metaTextColor }}></div>
        </div>
        <p
          className="text-lg font-medium"
          style={{ color: metaTextColor, fontFamily: bodyFont }}
        >
          Loading blog posts...
        </p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div 
        className={`text-center py-24 ${className}`}
        style={{ backgroundColor }}
      >
        <div className="mb-4" style={{ color: metaTextColor }}>
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3
          className="text-lg font-medium mb-2"
          style={{ color: bodyTextColor, fontFamily: headingFont }}
        >
          Error Loading Posts
        </h3>
        <p
          style={{ color: metaTextColor, fontFamily: bodyFont }}
        >
          {error}
        </p>
      </div>
    );
  }

  // Show empty state
  if (displayPosts.length === 0) {
    return (
      <div 
        className={`text-center py-12 ${className}`}
        style={{ backgroundColor }}
      >
        <div className="mb-4" style={{ color: metaTextColor }}>
          <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3
          className="text-lg font-medium mb-2"
          style={{ color: bodyTextColor, fontFamily: headingFont }}
        >
          No blog posts yet
        </h3>
        <p
          style={{ color: metaTextColor, fontFamily: bodyFont }}
        >
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`py-24 sm:py-32 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2
            className={`text-4xl font-semibold tracking-tight text-pretty sm:text-5xl ${getEditableClasses()}`}
            style={{ color: headingColor, fontFamily: headingFont }}
            {...getEditableProps(
              (e?: React.MouseEvent) => {
                e?.stopPropagation();
                editWithAI(pageSlug, componentId, 'title', title, 'Section Title');
              },
              "Click to edit section title"
            )}
          >
            {title}
          </h2>
          <p
            className={`mt-2 text-lg/8 ${getEditableClasses()}`}
            style={{ color: bodyTextColor, fontFamily: bodyFont }}
            {...getEditableProps(
              (e?: React.MouseEvent) => {
                e?.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'Section Description');
              },
              "Click to edit section description"
            )}
          >
            {description}
          </p>

          {/* Filter UI - Only show if showFilter is true and 5+ posts */}
          {showFilter && loadedPosts.length >= 5 && (
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="search"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setVisibleCount(maxItems);
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{
                      borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151',
                      backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                      color: headingColor,
                      fontFamily: bodyFont
                    }}
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical');
                      setVisibleCount(maxItems);
                    }}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0"
                    style={{
                      borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151',
                      backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                      color: headingColor,
                      fontFamily: bodyFont
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">A-Z</option>
                  </select>

                  {/* Clear Filters */}
                  {(searchTerm || sortBy !== 'newest') && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm rounded-lg hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: currentTheme.mode === 'light' ? '#F3F4F6' : '#374151',
                        color: bodyTextColor,
                        fontFamily: bodyFont
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              {(searchTerm || sortBy !== 'newest') && (
                <div className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                  Showing {displayPosts.length} of {sortedPosts.length} posts
                  {sortedPosts.length !== loadedPosts.length && ` (filtered from ${loadedPosts.length} total)`}
                </div>
              )}
            </div>
          )}

          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {displayPosts.map((post) => (
              <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                  {post.featuredImageUrl ? (
                    <img
                      alt={post.title}
                      src={post.featuredImageUrl}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 size-full rounded-2xl bg-gray-50 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.publishedAt}
                      style={{ color: metaTextColor, fontFamily: bodyFont }}
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <span 
                        className="relative z-10 rounded-full px-3 py-1.5 font-medium hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: currentTheme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                          color: metaTextColor,
                          fontFamily: bodyFont
                        }}
                      >
                        {post.tags[0]}
                      </span>
                    )}
                    {post.readingTime && (
                      <span
                        style={{ color: metaTextColor, fontFamily: bodyFont }}
                      >
                        {post.readingTime} min read
                      </span>
                    )}
                  </div>
                  <div className="group relative max-w-xl">
                    <h3
                      className="mt-3 text-lg/6 font-semibold group-hover:opacity-80 transition-opacity"
                      style={{ color: headingColor, fontFamily: headingFont }}
                    >
                      <Link href={`/${blogPageSlug}/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p
                      className="mt-5 text-sm/6"
                      style={{ color: bodyTextColor, fontFamily: bodyFont }}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                  {post.author && (
                    <div 
                      className="mt-6 flex border-t pt-6"
                      style={{ borderColor: currentTheme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="relative flex items-center gap-x-4">
                        {post.author?.avatar ? (
                          <img 
                            alt={post.author?.name || 'Author'} 
                            src={post.author?.avatar} 
                            className="size-10 rounded-full" 
                            style={{ backgroundColor: currentTheme.mode === 'light' ? '#F9FAFB' : '#374151' }}
                          />
                        ) : (
                          <div 
                            className="size-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentTheme.mode === 'light' ? '#F9FAFB' : '#374151' }}
                          >
                            <span
                              className="text-sm font-medium"
                              style={{ color: metaTextColor, fontFamily: bodyFont }}
                            >
                              {post.author?.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                        )}
                        <div className="text-sm/6">
                          <p
                            className="font-semibold"
                            style={{ color: bodyTextColor, fontFamily: bodyFont }}
                          >
                            {post.author?.name || 'Anonymous'}
                          </p>
                          <p
                            style={{ color: metaTextColor, fontFamily: bodyFont }}
                          >
                            Author
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: headingColor,
                  color: backgroundColor,
                  fontFamily: bodyFont
                }}
              >
                Load More ({sortedPosts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
