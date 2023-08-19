// app/events/[slug]/EventDetailClient.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../../../context/ThemeContext';
import { getFontFamily } from '../../../utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getSecondaryTextColor,
  getPrimaryButtonColor
} from '../../../utils/colorUtils';
import { Calendar, MapPin, Clock, Users, Share2, Heart } from 'lucide-react';

interface EventDetailClientProps {
  event: any;
  relatedEvents?: any[];
}

export default function EventDetailClient({ event, relatedEvents = [] }: EventDetailClientProps) {
  const { theme } = useTheme();

  // Theme utilities using standardized color functions - PRESERVING ORIGINAL STYLING!
  const backgroundColor = getContainerBackgroundColor({ theme, content: {} });
  const headingColor = getTitleColor({ theme });
  const bodyTextColor = getDescriptionColor({ theme });
  const metaTextColor = getSecondaryTextColor({ theme });
  const linkColor = getPrimaryButtonColor({ theme });
  const headingFont = getFontFamily(theme, 'heading');
  const bodyFont = getFontFamily(theme, 'body');

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Share functionality - with proper browser environment checks
  const handleShare = async () => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      console.log('Share functionality only available in browser');
      return;
    }

    const shareData = {
      title: event.name,
      text: event.excerpt,
      url: window.location.href,
    };

    try {
      // Check if native sharing is available
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(window.location.href);
        // Could add a toast notification here
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback: try clipboard if share failed
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch (clipErr) {
          console.error('Error copying to clipboard:', clipErr);
        }
      }
    }
  };

  // No loading needed - data is already provided!
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: headingColor, fontFamily: headingFont }}>
            Event not found
          </h2>
          <p style={{ color: metaTextColor, fontFamily: bodyFont }}>
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor }} className="min-h-screen">
      {/* Hero Image */}
      {event.image && (
        <div className="w-full max-w-4xl mx-auto px-6 pt-8">
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '60vh' }}
            />
          </div>
        </div>
      )}

      {/* Event Content */}
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* Event Header */}
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
                  href="/events"
                  className="hover:underline"
                  style={{ color: linkColor }}
                >
                  Events
                </Link>
              </li>
              <li>
                <span style={{ color: metaTextColor }}>/</span>
              </li>
              <li>
                <span style={{ color: metaTextColor }}>{event.name}</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            style={{ color: headingColor, fontFamily: headingFont }}
          >
            {event.name}
          </h1>

          {/* Excerpt */}
          {event.excerpt && (
            <p
              className="text-xl leading-8 mb-8"
              style={{ color: bodyTextColor, fontFamily: bodyFont }}
            >
              {event.excerpt}
            </p>
          )}

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6 p-6 rounded-lg border" style={{ borderColor: metaTextColor + '30' }}>
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-1" style={{ color: linkColor }} />
              <div>
                <p className="font-semibold mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                  Date & Time
                </p>
                <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                  {formatDate(event.startDate)}
                </p>
                <p className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                  {formatTime(event.startDate)}{event.endDate ? ` - ${formatTime(event.endDate)}` : ''}
                </p>
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" style={{ color: linkColor }} />
                <div>
                  <p className="font-semibold mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                    Location
                  </p>
                  <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                    {event.location}
                  </p>
                  {event.address && (
                    <p className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                      {event.address}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Duration */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-1" style={{ color: linkColor }} />
              <div>
                <p className="font-semibold mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                  Duration
                </p>
                <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                  {event.duration || 'TBD'}
                </p>
              </div>
            </div>

            {/* Capacity */}
            {event.capacity && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-1" style={{ color: linkColor }} />
                <div>
                  <p className="font-semibold mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                    Capacity
                  </p>
                  <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                    {event.capacity} attendees
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: linkColor,
                  color: 'white'
                }}
              >
                Register Now
              </a>
            )}
            <button
              onClick={handleShare}
              className="px-6 py-3 rounded-lg border font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: linkColor, color: linkColor }}
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Share
            </button>
          </div>
        </header>

        {/* Event Description */}
        <div className="mt-12">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: headingColor, fontFamily: headingFont }}
          >
            About This Event
          </h2>
          <div
            className="prose prose-lg max-w-none"
            style={{ color: bodyTextColor, fontFamily: bodyFont }}
            dangerouslySetInnerHTML={{ __html: event.description || '' }}
          />
        </div>

        {/* 🔥 GEO/AIO CONTENT - Now displaying ALL rich content! */}

        {/* Key Takeaways (AEO + AIO) */}
        {event.keyTakeaways && event.keyTakeaways.length > 0 && (
          <div className="mt-12 p-6 rounded-lg border" style={{ borderColor: linkColor + '30', backgroundColor: linkColor + '05' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: headingColor, fontFamily: headingFont }}>
              🎯 Key Takeaways
            </h3>
            <ul className="space-y-2">
              {event.keyTakeaways.map((takeaway: string, index: number) => (
                <li key={index} className="flex items-start gap-2" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                  <span style={{ color: linkColor }}>✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Outcomes (AIO) */}
        {event.learningOutcomes && event.learningOutcomes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: headingColor, fontFamily: headingFont }}>
              📚 What You'll Learn
            </h3>
            <ul className="space-y-2">
              {event.learningOutcomes.map((outcome: string, index: number) => (
                <li key={index} className="flex items-start gap-2" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                  <span style={{ color: linkColor }}>→</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prerequisites (AIO) */}
        {event.prerequisites && event.prerequisites.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: headingColor, fontFamily: headingFont }}>
              📋 Prerequisites
            </h3>
            <ul className="space-y-2">
              {event.prerequisites.map((prereq: string, index: number) => (
                <li key={index} className="flex items-start gap-2" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                  <span style={{ color: metaTextColor }}>•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Speakers (AIO) */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: headingColor, fontFamily: headingFont }}>
              🎤 Speakers
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {event.speakers.map((speaker: any, index: number) => (
                <div key={index} className="p-4 rounded-lg border" style={{ borderColor: metaTextColor + '30' }}>
                  {speaker.photo && (
                    <img src={speaker.photo} alt={speaker.name} className="w-20 h-20 rounded-full mb-4 object-cover" />
                  )}
                  <h4 className="font-bold text-lg mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                    {speaker.name}
                  </h4>
                  {speaker.title && (
                    <p className="text-sm mb-2" style={{ color: linkColor, fontFamily: bodyFont }}>
                      {speaker.title}
                    </p>
                  )}
                  {speaker.bio && (
                    <p className="text-sm" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                      {speaker.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agenda/Schedule (AIO) */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: headingColor, fontFamily: headingFont }}>
              📅 Agenda
            </h3>
            <div className="space-y-4">
              {event.agenda.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border" style={{ borderColor: metaTextColor + '30' }}>
                  <div className="flex-shrink-0 w-20">
                    <span className="font-mono font-semibold" style={{ color: linkColor }}>
                      {item.time}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold mb-1" style={{ color: headingColor, fontFamily: headingFont }}>
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-sm" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section (AEO + AIO) */}
        {event.faqSection && event.faqSection.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6" style={{ color: headingColor, fontFamily: headingFont }}>
              ❓ Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {event.faqSection.map((faq: any, index: number) => (
                <details key={index} className="p-4 rounded-lg border" style={{ borderColor: metaTextColor + '30' }}>
                  <summary className="font-semibold cursor-pointer" style={{ color: headingColor, fontFamily: headingFont }}>
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Sources/References (AIO - Credibility) */}
        {event.sources && event.sources.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4" style={{ color: headingColor, fontFamily: headingFont }}>
              📚 References & Sources
            </h3>
            <ul className="space-y-2">
              {event.sources.map((source: any, index: number) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: linkColor, fontFamily: bodyFont }}
                  >
                    {source.title}
                  </a>
                  {source.description && (
                    <p className="text-sm mt-1" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                      {source.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag: string, index: number) => (
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
          </div>
        )}

        {/* Related Events */}
        {relatedEvents && relatedEvents.length > 0 && (
          <aside className="mt-16 pt-12 border-t" style={{ borderColor: metaTextColor + '30' }}>
            <h3
              className="text-2xl font-bold mb-8"
              style={{ color: headingColor, fontFamily: headingFont }}
            >
              More Events
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {relatedEvents.map((relatedEvent: any) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.slug || relatedEvent.id}`}
                  className="group block hover:scale-105 transition-transform duration-200"
                >
                  <article className="h-full">
                    {relatedEvent.image && (
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={relatedEvent.image}
                          alt={relatedEvent.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h4
                      className="font-semibold text-lg mb-2 group-hover:underline"
                      style={{ color: headingColor, fontFamily: headingFont }}
                    >
                      {relatedEvent.name}
                    </h4>
                    <p
                      className="text-sm mb-2"
                      style={{ color: metaTextColor, fontFamily: bodyFont }}
                    >
                      {formatDate(relatedEvent.startDate)}
                    </p>
                    {relatedEvent.location && (
                      <p
                        className="text-sm"
                        style={{ color: metaTextColor, fontFamily: bodyFont }}
                      >
                        📍 {relatedEvent.location}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* Back to Events */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: metaTextColor + '30' }}>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-medium hover:underline"
            style={{ color: linkColor, fontFamily: bodyFont }}
          >
            ← Back to all events
          </Link>
        </div>
      </article>
    </div>
  );
}