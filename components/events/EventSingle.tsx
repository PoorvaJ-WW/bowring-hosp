// JSON-DRIVEN EventSingle Template - Dynamic Single Event Page
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { formatEventDate, formatEventTime } from '@/lib/eventUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getSecondaryTextColor,
  getPrimaryButtonColor
} from '@/utils/colorUtils';
import { getFontFamily } from '@/utils/themeUtils';
import { 
  Calendar, 
  Clock,
  MapPin, 
  Share2, 
  Heart, 
  ExternalLink,
  DollarSign,
  Globe
} from 'lucide-react';

interface Props {
  pageSlug?: string;
  componentId?: string;
  event?: any; // Event data passed from parent (optional)
  eventId?: string; // Event ID for fetching
  eventSlug?: string; // Event slug for fetching  
  theme?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => c.id === componentId || c.type === 'event-single');
};

export default function EventSingle(props: Props) {
  const { pageSlug = 'event-single', componentId = 'event-single', event: propEvent, eventId, eventSlug, theme: propTheme } = props;
  const { theme: contextTheme } = useTheme();
  const searchParams = useSearchParams();
  
  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;
  
  // State for event data and loading
  const [event, setEvent] = useState(propEvent || null);
  const [loading, setLoading] = useState(!propEvent);
  const [isInterested, setIsInterested] = useState(false);

  // Get content from JSON metadata only if pageSlug is provided
  let content = {};
  if (pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }

  // Load event data if not provided as prop
  useEffect(() => {
    if (propEvent) {
      setEvent(propEvent);
      setLoading(false);
      return;
    }

    const loadEvent = async () => {
      try {
        setLoading(true);

        // Get event ID or slug from props or URL params
        const id = eventId || searchParams?.get('id');
        const slug = eventSlug || searchParams?.get('slug');

        let foundEvent = null;

        if (slug) {
          // Try to fetch by slug first using API route
          const response = await fetch(`/api/events/${slug}`);
          const data = await response.json();
          if (data.success && data.event) {
            foundEvent = data.event;
          }
        } else if (id) {
          // Fallback to searching by ID - fetch events and find by ID
          const params = new URLSearchParams();
          params.set('limit', '100');
          const response = await fetch(`/api/events?${params.toString()}`);
          const data = await response.json();
          if (data.success && data.events) {
            foundEvent = data.events.find((e: any) => e.id === id);
          }
        } else {
          // If no identifier, get the first available event
          const params = new URLSearchParams();
          params.set('limit', '1');
          const response = await fetch(`/api/events?${params.toString()}`);
          const data = await response.json();
          if (data.success && data.events && data.events.length > 0) {
            foundEvent = data.events[0];
          }
        }

        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          console.warn('Event not found');
          setEvent(null);
        }
      } catch (error) {
        console.error('Error loading event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [propEvent, eventId, eventSlug, searchParams]);

  // Theme-based colors using standardized color utilities
  const { theme } = useTheme();
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content });
  const titleColor = getTitleColor({ theme: currentTheme });
  const bodyTextColor = getDescriptionColor({ theme: currentTheme });
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme });
  const buttonColor = getPrimaryButtonColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
                 style={{ borderColor: metaTextColor }}></div>
            <p className="text-lg font-medium" style={{ color: metaTextColor, fontFamily: bodyFont }}>
              Loading event...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no event found
  if (!event) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: titleColor, fontFamily: headingFont }}>
              Event not found
            </h2>
            <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
              The event you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }


  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: event.name,
      text: event.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could add toast notification here
  };



  return (
    <article className="min-h-screen py-12" style={{ backgroundColor }}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button
            className="hover:underline bg-transparent border-none cursor-pointer"
            style={{ color: metaTextColor, fontFamily: bodyFont }}
            onClick={() => window.history.back()}
          >
            ← Back to Events
          </button>
        </nav>

        {/* Event Hero Image */}
        {event.image && (
          <div className="mb-8">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        )}

        {/* Event Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-6">
            {/* Title and Status */}
            <div>
              {(event.venueType === 'online' || event.venueType === 'both') && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-700">
                    <Globe className="w-3 h-3 mr-1" />
                    {event.venueType === 'both' ? 'Hybrid Event' : 'Online Event'}
                  </span>
                </div>
              )}

              <h1 className="text-4xl font-bold mb-4" style={{ color: titleColor, fontFamily: headingFont }}>
                {event.name}
              </h1>

              <p className="text-lg mb-4" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                {event.excerpt}
              </p>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: buttonColor,
                      color: '#fff',
                      fontFamily: bodyFont
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose max-w-none">
              <div
                className="leading-relaxed"
                style={{ color: bodyTextColor, fontFamily: bodyFont }}
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button 
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share Event
              </button>
            </div>
          </div>

          {/* Event Details Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-8 rounded-lg shadow-lg border p-6 space-y-4" style={{
              backgroundColor: backgroundColor,
              borderColor: buttonColor + '20'
            }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: titleColor, fontFamily: headingFont }}>Event Details</h3>

              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5" style={{ color: metaTextColor }} />
                <div>
                  <div className="font-medium" style={{ color: titleColor, fontFamily: headingFont }}>{formatEventDate(event.startDate)}</div>
                  <div className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                    {event.startTime && formatEventTime(event.startTime)}
                    {event.endTime && ` - ${formatEventTime(event.endTime)}`}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: metaTextColor }} />
                <div>
                  <div className="font-medium" style={{ color: titleColor, fontFamily: headingFont }}>{event.location}</div>
                  {event.locationMapUrl && (
                    <a 
                      href={event.locationMapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      View on Map
                    </a>
                  )}
                </div>
              </div>

              {/* Price */}
              {event.price && (
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5" style={{ color: metaTextColor }} />
                  <div>
                    <div className="font-medium" style={{ color: titleColor, fontFamily: headingFont }}>
                      {event.price}
                    </div>
                    <div className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                      {event.price.toLowerCase() === 'free' ? '' : 'Per person'}
                    </div>
                  </div>
                </div>
              )}

              {/* Registration */}
              {event.registrationUrl && (
                <div className="pt-4 border-t">
                  <a 
                    href={event.registrationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
                    style={{ backgroundColor: buttonColor, fontFamily: bodyFont }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Register Now
                  </a>
                </div>
              )}

              {/* Payment Link */}
              {event.paymentLink && (
                <div className="pt-2">
                  <a 
                    href={event.paymentLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg border hover:opacity-80 transition-opacity duration-200"
                    style={{
                      backgroundColor: backgroundColor,
                      borderColor: buttonColor,
                      color: buttonColor,
                      fontFamily: bodyFont
                    }}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Buy Tickets
                  </a>
                </div>
              )}

              {/* Online Link for Virtual Events */}
              {event.onlineLink && (event.venueType === 'online' || event.venueType === 'both') && (
                <div className="pt-4 border-t">
                  <a 
                    href={event.onlineLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Join Online
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </article>
  );
}