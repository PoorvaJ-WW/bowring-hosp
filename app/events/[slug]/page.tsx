// app/events/[slug]/page.tsx
// SERVER COMPONENT - Fetches data on server, passes to client component for themed UI
import { notFound } from 'next/navigation';
import { getEventBySlug, getEvents } from '../../../lib/events';
import EventDetailClient from './EventDetailClient';
import Script from 'next/script';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  try {
    // Fetch event by slug directly - more efficient
    // getEventBySlug already uses the WEBSITE_ID constant from lib/eventsUtils.ts
    const event = await getEventBySlug(slug);

    if (!event) {
      notFound();
    }

    // Generate comprehensive structured data for SEO + AEO + AIO (2025 Critical)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': event.schemaType || 'Event',
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),

      // Location
      ...(event.location ? {
        location: {
          '@type': event.venueType === 'online' ? 'VirtualLocation' : 'Place',
          name: event.location,
          ...(event.locationMapUrl ? { url: event.locationMapUrl } : {}),
          ...(event.venueType === 'online' && event.onlineLink ? { url: event.onlineLink } : {})
        }
      } : {}),

      // Images
      ...(event.image ? { image: event.image } : {}),

      // Organizer (Enhanced)
      organizer: (event.organizer && event.organizer.name) ? {
        '@type': 'Organization',
        name: event.organizer.name,
        ...(event.organizer.email ? { email: event.organizer.email } : {}),
        ...(event.organizer.website ? { url: event.organizer.website } : {})
      } : { '@type': 'Organization', name: event.author || 'Event Organizer' },

      // Event Status & Mode
      eventStatus: event.status === 'past' ? 'https://schema.org/EventPostponed' : 'https://schema.org/EventScheduled',
      eventAttendanceMode: event.venueType === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : event.venueType === 'both'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',

      // Pricing
      ...(event.price ? {
        offers: {
          '@type': 'Offer',
          price: event.price === 'Free' ? '0' : event.price.replace(/[^0-9.]/g, ''),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          ...(event.registrationUrl ? { url: event.registrationUrl } : {})
        }
      } : {}),

      // Capacity
      ...(event.capacity ? { maximumAttendeeCapacity: event.capacity } : {}),
      ...(event.attendees ? { attendeeCount: event.attendees } : {}),

      // AEO (Answer Engine Optimization)
      ...(event.tldr ? { abstract: event.tldr } : {}),

      // AIO (AI Overview/Optimization) - 2025 CRITICAL for AI Engines
      ...(event.summary ? { about: event.summary } : {}),
      ...(event.contentType ? { genre: event.contentType } : {}),
      ...(event.targetAudience ? {
        audience: {
          '@type': 'Audience',
          audienceType: event.targetAudience
        }
      } : {}),

      // Speakers/Performers (AIO)
      ...(event.speakers && event.speakers.length > 0 ? {
        performer: event.speakers.map(speaker => ({
          '@type': 'Person',
          name: speaker.name,
          ...(speaker.title ? { jobTitle: speaker.title } : {}),
          ...(speaker.bio ? { description: speaker.bio } : {}),
          ...(speaker.photo ? { image: speaker.photo } : {})
        }))
      } : {}),

      // Agenda/Schedule (AIO)
      ...(event.agenda && event.agenda.length > 0 ? {
        subEvent: event.agenda.map(item => ({
          '@type': 'Event',
          name: item.title,
          ...(item.description ? { description: item.description } : {}),
          startDate: `${event.startDate}T${item.time}`
        }))
      } : {}),

      // Learning Outcomes (AIO)
      ...(event.learningOutcomes && event.learningOutcomes.length > 0 ? {
        teaches: event.learningOutcomes.join(', ')
      } : {}),

      // Keywords (SEO + AIO)
      ...(event.focusKeyword || event.secondaryKeywords ? {
        keywords: [event.focusKeyword, ...(event.secondaryKeywords || [])].filter(Boolean).join(', ')
      } : {}),

      // FAQ (AEO + AIO)
      ...(event.faqSection && event.faqSection.length > 0 ? {
        mainEntity: event.faqSection.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      } : {}),

      // 🔥 MISSING GEO/AIO FIELDS - NOW ADDED!

      // Key Takeaways (AEO + AIO)
      ...(event.keyTakeaways && event.keyTakeaways.length > 0 ? {
        educationalUse: event.keyTakeaways.join(', ')
      } : {}),

      // Prerequisites (AIO)
      ...(event.prerequisites && event.prerequisites.length > 0 ? {
        competencyRequired: event.prerequisites.join(', ')
      } : {}),

      // Related Topics (GEO + AIO - semantic connections)
      ...(event.relatedTopics && event.relatedTopics.length > 0 ? {
        about: event.relatedTopics.map(topic => ({
          '@type': 'Thing',
          name: topic
        }))
      } : {}),

      // Organizer Bio (AIO - expertise)
      ...(event.organizerBio && event.organizer && event.organizer.name ? {
        organizer: {
          '@type': 'Organization',
          name: event.organizer.name,
          description: event.organizerBio,
          ...(event.organizer.email ? { email: event.organizer.email } : {}),
          ...(event.organizer.website ? { url: event.organizer.website } : {})
        }
      } : {}),

      // Sources/Citations (AIO - credibility)
      ...(event.sources && event.sources.length > 0 ? {
        citation: event.sources.map(source => ({
          '@type': 'CreativeWork',
          name: source.title,
          url: source.url,
          ...(source.description ? { description: source.description } : {})
        }))
      } : {}),

      // Table of Contents (AIO - structured navigation)
      ...(event.tableOfContents && event.tableOfContents.length > 0 ? {
        hasPart: event.tableOfContents.map(item => ({
          '@type': 'WebPageElement',
          name: item.heading,
          ...(item.anchor ? { url: `#${item.anchor}` } : {}),
          ...(item.time ? { temporalCoverage: item.time } : {})
        }))
      } : {})
    };

    // Fetch related events for "More Events" section
    const allEvents = await getEvents(10, 'startDate');
    const relatedEvents = allEvents
      .filter(e => e.id !== event.id)
      .slice(0, 3);

    return (
      <>
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="event-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {/* Pass server-fetched data to client component for themed UI */}
        <EventDetailClient
          event={event}
          relatedEvents={relatedEvents}
        />
      </>
    );
  } catch (error) {
    console.error('❌ Error fetching event:', error);
    notFound();
  }
}

// Generate static params for all events
export async function generateStaticParams() {
  try {
    const events = await getEvents(100);

    // Next.js 16: Must return at least one result
    if (events.length === 0) {
      return [{ slug: 'placeholder' }];
    }

    return events.map((event) => ({
      slug: event.slug || event.id,
    }));
  } catch (error) {
    console.error('❌ Error generating static params for events:', error);
    return [{ slug: 'placeholder' }];
  }
}

// Generate metadata for SEO - USING PROPER SEO FIELDS!
export async function generateMetadata({ params }: EventPageProps) {
  try {
    const { slug } = await params;

    // getEventBySlug already uses the WEBSITE_ID constant from lib/eventsUtils.ts
    const event = await getEventBySlug(slug);

    if (!event) {
      return {
        title: 'Event Not Found',
      };
    }

    // Use proper SEO fields (priority: seoTitle > metaTitle > name)
    const title = event.seoTitle || event.metaTitle || event.name;
    const description = event.seoDescription || event.metaDescription || event.excerpt;
    const image = event.image;

    // Use social media fields if provided
    const ogTitle = event.socialMedia?.ogTitle || title;
    const ogDescription = event.socialMedia?.ogDescription || description;
    const ogImage = event.socialMedia?.ogImage || image;
    const twitterTitle = event.socialMedia?.twitterTitle || title;
    const twitterDescription = event.socialMedia?.twitterDescription || description;
    const twitterImage = event.socialMedia?.twitterImage || image;

    // Build custom meta tags object for ALL GEO/AIO fields
    const customMeta: Record<string, string> = {};

    // AEO Fields
    if (event.tldr) customMeta['event:tldr'] = event.tldr;
    if (event.keyTakeaways && event.keyTakeaways.length > 0) {
      customMeta['event:key-takeaways'] = event.keyTakeaways.join(' | ');
    }

    // AIO/GEO Fields (2025 Critical for AI Engines)
    if (event.summary) customMeta['event:summary'] = event.summary;
    if (event.contentType) customMeta['event:content-type'] = event.contentType;
    if (event.targetAudience) customMeta['event:target-audience'] = event.targetAudience;
    if (event.organizerBio) customMeta['event:organizer-bio'] = event.organizerBio;

    if (event.relatedTopics && event.relatedTopics.length > 0) {
      customMeta['event:related-topics'] = event.relatedTopics.join(', ');
    }
    if (event.prerequisites && event.prerequisites.length > 0) {
      customMeta['event:prerequisites'] = event.prerequisites.join(' | ');
    }
    if (event.learningOutcomes && event.learningOutcomes.length > 0) {
      customMeta['event:learning-outcomes'] = event.learningOutcomes.join(' | ');
    }

    // Speakers (formatted for meta tag)
    if (event.speakers && event.speakers.length > 0) {
      customMeta['event:speakers'] = event.speakers.map((s: any) => s.name).join(', ');
      customMeta['event:speakers-count'] = event.speakers.length.toString();
    }

    // Agenda (formatted for meta tag)
    if (event.agenda && event.agenda.length > 0) {
      customMeta['event:agenda'] = event.agenda.map((a: any) => `${a.time}: ${a.title}`).join(' | ');
    }

    // FAQ (formatted for meta tag) - FULL Q&A exposure for AEO!
    if (event.faqSection && event.faqSection.length > 0) {
      customMeta['event:faq-count'] = event.faqSection.length.toString();

      // 🔥 CRITICAL: Expose ALL questions AND answers for Answer Engine Optimization
      const allFaqQuestions = event.faqSection.map((faq: any) => faq.question).join(' | ');
      const allFaqAnswers = event.faqSection.map((faq: any) => faq.answer).join(' | ');
      const allFaqPairs = event.faqSection.map((faq: any) => `Q: ${faq.question} A: ${faq.answer}`).join(' || ');

      customMeta['event:faq-questions'] = allFaqQuestions;
      customMeta['event:faq-answers'] = allFaqAnswers;
      customMeta['event:faq-full'] = allFaqPairs; // Complete Q&A pairs
    }

    // Sources (formatted for meta tag)
    if (event.sources && event.sources.length > 0) {
      customMeta['event:sources'] = event.sources.map((s: any) => s.title).join(', ');
      customMeta['event:sources-count'] = event.sources.length.toString();
    }

    // Table of Contents
    if (event.tableOfContents && event.tableOfContents.length > 0) {
      customMeta['event:table-of-contents'] = event.tableOfContents.map((t: any) => t.heading).join(' | ');
    }

    return {
      title: title,
      description: description,
      keywords: [event.focusKeyword, ...(event.secondaryKeywords || [])].filter(Boolean).join(', '),
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: event.socialMedia?.ogType || 'website',
        images: ogImage ? [ogImage] : [],
      },
      twitter: {
        card: event.socialMedia?.twitterCard || 'summary_large_image',
        title: twitterTitle,
        description: twitterDescription,
        images: twitterImage ? [twitterImage] : [],
      },
      alternates: event.canonicalUrl ? {
        canonical: event.canonicalUrl
      } : undefined,
      robots: {
        index: !event.noIndex,
        follow: !event.noFollow,
      },
      // 🔥 CRITICAL: Expose ALL GEO/AIO fields as custom meta tags for AI crawlers!
      // This ensures Perplexity, ChatGPT, Claude, and other AI bots can see our rich content
      other: customMeta
    };
  } catch (error) {
    console.error('❌ Error generating event metadata:', error);
    return {
      title: 'Event Not Found',
    };
  }
}