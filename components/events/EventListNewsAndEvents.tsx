// Generated page-specific component for news-and-events
// This component is isolated - changes here only affect the news-and-events page
// JSON-DRIVEN EventList Template - Simple Direct Editing
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import metadata from '@/_metadata.json';
import { EventListProps } from '@/types/event';
import { formatEventDate, formatEventTime } from '@/lib/eventUtils';
import { getFontFamily } from '@/utils/themeUtils';
import {
  getTitleColor,
  getSubtitleColor,
  getContainerBackgroundColor,
  getDescriptionColor,
  getSecondaryTextColor,
  getPrimaryButtonColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  pageSlug?: string;
  componentId?: string;
  events?: any[];
  theme?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => c.id === componentId || c.type === 'event-list');
};

export default function EventListNewsAndEventsNewsAndEvents(props: Props) {
  const { pageSlug = 'events', componentId = 'event-list', events = [], theme: propTheme } = props;
  const { theme: contextTheme } = useTheme();
  
  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;
  
  // Get content from JSON metadata only if pageSlug is provided
  let content = {};
  if (pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }


  // Extract content values with defaults
  const {
    title = "Our Upcoming Events",
    description = "Join us for meaningful experiences and community gatherings. From workshops to celebrations, discover events that inspire and connect.",
    maxItems = 12,
    loadMoreIncrement = 6,
    orderBy = 'createdAt',
    showFilter = true,
    categories,
    showPastEvents = false,
    className = '',
  } = content;

  // State for events if they're not provided directly
  const [loadedEvents, setLoadedEvents] = useState(events);
  const [loading, setLoading] = useState(events.length === 0);
  const [error, setError] = useState<string | null>(null);

  // State for filtering and pagination
  const [visibleCount, setVisibleCount] = useState(maxItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  // Theme-based colors using standardized color utilities
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content });
  const titleColor = getTitleColor({ theme: currentTheme });
  const subtitleColor = getSubtitleColor({ theme: currentTheme });
  const bodyTextColor = getDescriptionColor({ theme: currentTheme });
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme });
  const buttonColor = getPrimaryButtonColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  // Always fetch events with current category filtering
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        params.set('limit', '1000');
        params.set('orderBy', orderBy);
        params.set('showPastEvents', showPastEvents.toString());
        if (categories && categories.length > 0) {
          params.set('categories', categories.join(','));
        }

        // Fetch from API route instead of direct function call
        const response = await fetch(`/api/events?${params.toString()}`);
        const data = await response.json();

        if (data.success && data.events) {
          setLoadedEvents(data.events);
        } else {
          throw new Error(data.error || 'Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [orderBy, categories, showPastEvents]); // Removed maxItems - fetch all for filtering

  // Filter events based on search term
  const filteredEvents = loadedEvents.filter(event => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      event.name?.toLowerCase().includes(searchLower) ||
      event.excerpt?.toLowerCase().includes(searchLower) ||
      event.description?.toLowerCase().includes(searchLower) ||
      event.location?.toLowerCase().includes(searchLower) ||
      event.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
    );
  });

  // Sort events based on selected sort option
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b[orderBy as keyof typeof b] || b.createdAt).getTime() - new Date(a[orderBy as keyof typeof a] || a.createdAt).getTime();
      case 'oldest':
        return new Date(a[orderBy as keyof typeof a] || a.createdAt).getTime() - new Date(b[orderBy as keyof typeof b] || b.createdAt).getTime();
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Apply pagination - slice based on visibleCount
  const displayEvents = sortedEvents.slice(0, visibleCount);
  const hasMore = visibleCount < sortedEvents.length;

  // Reset visibleCount when search or sort changes
  useEffect(() => {
    setVisibleCount(maxItems);
  }, [searchTerm, sortBy, maxItems]);

  // Load More handler
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreIncrement, sortedEvents.length));
  };

  // Clear filters handler
  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setVisibleCount(maxItems);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { backgroundColor: '#10B981', color: '#FFFFFF' };
      case 'ongoing':
        return { backgroundColor: '#F59E0B', color: '#FFFFFF' };
      case 'completed':
        return { backgroundColor: '#6B7280', color: '#FFFFFF' };
      default:
        return { backgroundColor: metaTextColor, color: '#FFFFFF' };
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`py-24 lg:pb-36 ${className}`} style={{ backgroundColor }}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
                 style={{ borderColor: metaTextColor }}></div>
            <p
              className="text-lg font-medium"
              style={{ color: metaTextColor, fontFamily: bodyFont }}
            >
              Loading events...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`py-24 lg:pb-36 ${className}`} style={{ backgroundColor }}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2" style={{ color: titleColor, fontFamily: headingFont }}>
              Error Loading Events
            </h3>
            <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (displayEvents.length === 0) {
    return (
      <div className={`py-24 lg:pb-36 ${className}`} style={{ backgroundColor }}>
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2" style={{ color: titleColor, fontFamily: headingFont }}>
              No events yet
            </h3>
            <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
              Check back soon for upcoming events!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const featuredEvent = displayEvents[0];
  const sideEvents = displayEvents.slice(1, 4);

  return (
    <div className={`py-24 lg:pb-36 ${className}`} style={{ backgroundColor }}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:justify-between mb-12">
          <div className="block">
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-200 max-sm:text-center lg:text-start text-center ${getEditableClasses()}`}
              style={{ color: titleColor, fontFamily: headingFont }}
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
              className={`text-xl max-w-2xl transition-colors duration-200 max-sm:text-center lg:text-start text-center ${getEditableClasses()}`}
              style={{ color: subtitleColor, fontFamily: bodyFont }}
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
          </div>
          <Link
            href="/events"
            className="rounded-full whitespace-nowrap shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] py-2.5 px-10 text-white text-base font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: buttonColor, fontFamily: bodyFont }}
          >
            View All
          </Link>
        </div>

        {/* Filter UI - only show if showFilter is true AND there are 5 or more events */}
        {showFilter && loadedEvents.length >= 5 && (
          <div className="mb-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-colors"
                  style={{
                    backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                    borderColor: currentTheme.mode === 'light' ? '#D1D5DB' : '#374151',
                    color: bodyTextColor,
                    fontFamily: bodyFont
                  }}
                />
              </div>

              {/* Sort Dropdown */}
              <div className="sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-colors"
                  style={{
                    backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                    borderColor: currentTheme.mode === 'light' ? '#D1D5DB' : '#374151',
                    color: bodyTextColor,
                    fontFamily: bodyFont
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>

              {/* Clear Button */}
              {(searchTerm || sortBy !== 'newest') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg border transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: currentTheme.mode === 'light' ? '#F3F4F6' : '#374151',
                    borderColor: currentTheme.mode === 'light' ? '#D1D5DB' : '#4B5563',
                    color: bodyTextColor,
                    fontFamily: bodyFont
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count */}
            <p
              className="text-sm"
              style={{ color: metaTextColor, fontFamily: bodyFont }}
            >
              Showing {displayEvents.length} of {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl mx-auto lg:max-w-full">
          {/* Featured Event */}
          {featuredEvent && (
            <div className="w-full h-full flex flex-col gap-6">
              <div className="relative">
                <img 
                  src={featuredEvent.image || 'https://pagedone.io/asset/uploads/1722665021.png'} 
                  alt={featuredEvent.name} 
                  className="rounded-2xl lg:h-full h-auto object-cover w-full"
                />
                {featuredEvent.status && (
                  <div className="absolute top-4 left-4">
                    <span 
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide"
                      style={getStatusColor(featuredEvent.status)}
                    >
                      {featuredEvent.status}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h4 
                  className="text-3xl font-semibold leading-snug mb-4"
                  style={{ color: titleColor, fontFamily: headingFont }}
                >
                  <Link 
                    href={`/events/${featuredEvent.slug}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {featuredEvent.name}
                  </Link>
                </h4>
                <p
                  className="text-sm font-medium mb-7"
                  style={{ color: bodyTextColor, fontFamily: bodyFont }}
                >
                  {featuredEvent.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: metaTextColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 4h6m-7 2h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span
                        className="text-base font-normal"
                        style={{ color: metaTextColor, fontFamily: bodyFont }}
                      >
                        {formatEventDate(featuredEvent.startDate)}
                        {featuredEvent.startTime && ` at ${formatEventTime(featuredEvent.startTime)}`}
                      </span>
                    </div>
                  </div>
                  {featuredEvent.categories && featuredEvent.categories.length > 0 && (
                    <p
                      className="text-base font-normal"
                      style={{ color: metaTextColor, fontFamily: bodyFont }}
                    >
                      {featuredEvent.categories[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Side Events */}
          <div className="w-full h-full flex flex-col gap-7">
            {sideEvents.map((event, index) => (
              <div key={event.id} className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-gray-200">
                <div className="relative">
                  <img 
                    src={event.image || 'https://pagedone.io/asset/uploads/1722665070.png'} 
                    alt={event.name} 
                    className="rounded-xl sm:w-32 sm:h-24 w-full h-auto object-cover"
                  />
                  {event.status && (
                    <div className="absolute top-2 left-2">
                      <span 
                        className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium uppercase tracking-wide"
                        style={getStatusColor(event.status)}
                      >
                        {event.status}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 
                    className="text-xl font-semibold leading-7 mb-3"
                    style={{ color: titleColor, fontFamily: headingFont }}
                  >
                    <Link 
                      href={`/events/${event.slug}`}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {event.name}
                    </Link>
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: metaTextColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m-6 4h6m-7 2h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span
                        className="text-sm font-normal"
                        style={{ color: metaTextColor, fontFamily: bodyFont }}
                      >
                        {formatEventDate(event.startDate)}
                        {event.startTime && ` at ${formatEventTime(event.startTime)}`}
                      </span>
                    </div>
                    {event.categories && event.categories.length > 0 && (
                      <p
                        className="text-sm font-normal"
                        style={{ color: metaTextColor, fontFamily: bodyFont }}
                      >
                        {event.categories[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-lg font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: currentTheme.colors?.primary || '#3B82F6',
                color: '#FFFFFF',
                fontFamily: bodyFont
              }}
            >
              Load More ({sortedEvents.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

