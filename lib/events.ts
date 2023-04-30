// lib/events.ts
// Server-side event functions using Firebase Admin SDK
//
// ⚠️  WARNING: This file uses firebase-admin and should ONLY be imported in:
//     - API routes (app/api/**/route.ts)
//     - Server Components (async page.tsx without 'use client')
//
// ❌ NEVER import this in Client Components ('use client')
//    Use @/types/event for type imports
//
// See lib/README.md for full documentation

import { getAdminDb } from './firebase-admin';
import type { Event } from '@/types/event';

// The website ID - this should match what's in Firestore
export const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

// Collection name matching the site-generator
export const EVENTS_COLLECTION = 'user_events';
console.log('Using events collection name:', EVENTS_COLLECTION);

/**
 * Determine event status based on start and end dates
 */
function determineEventStatus(startDate: string, endDate?: string): 'upcoming' | 'ongoing' | 'past' {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;

  if (now < start) {
    return 'upcoming';
  } else if (now >= start && now <= end) {
    return 'ongoing';
  } else {
    return 'past';
  }
}

/**
 * Get all published events for this website using Admin SDK
 */
export async function getEvents(
  limitCount: number = 100,
  orderField: 'startDate' | 'createdAt' | 'displayOrder' = 'createdAt',
  showPastEvents: boolean = true,
  categories?: string[]
): Promise<Event[]> {
  try {
    const db = await getAdminDb();

    console.log('Fetching events with Admin SDK:', {
      websiteId: WEBSITE_ID,
      collection: EVENTS_COLLECTION,
      categories,
      orderField,
      limitCount
    });

    let query = db.collection(EVENTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('published', '==', true);

    // Add category filtering if specified
    if (categories && categories.length > 0) {
      query = query.where('categories', 'array-contains-any', categories);
    }

    const querySnapshot = await query.get();

    let events: Event[] = [];

    // Helper function to recursively convert ALL Firestore Timestamps to ISO strings
    const convertFirestoreData = (obj: any): any => {
      if (!obj) return obj;

      // Handle Firestore Timestamp objects
      if (obj && typeof obj === 'object' && obj.toDate) {
        return obj.toDate().toISOString();
      }

      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map(item => convertFirestoreData(item));
      }

      // Handle plain objects
      if (typeof obj === 'object' && obj.constructor === Object) {
        const converted: any = {};
        for (const key in obj) {
          converted[key] = convertFirestoreData(obj[key]);
        }
        return converted;
      }

      // Return primitives as-is
      return obj;
    };

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Debug: Log the actual categories data
      console.log(`Event "${data.name}" categories:`, {
        categories: data.categories,
        categoryType: typeof data.categories,
        isArray: Array.isArray(data.categories)
      });

      // Convert ALL Firestore Timestamps recursively (handles nested objects)
      const convertedData = convertFirestoreData(data);

      events.push({
        id: doc.id,
        ...convertedData,
        categories: convertedData.categories || [],
        tags: convertedData.tags || [],
        status: convertedData.startDate ? determineEventStatus(convertedData.startDate, convertedData.endDate) : 'upcoming',
      } as Event);
    });

    // Filter out past events if requested
    if (!showPastEvents) {
      events = events.filter(event => event.status !== 'past');
    }

    // Sort by the requested field
    events.sort((a: any, b: any) => {
      let aValue, bValue;

      if (orderField === 'startDate') {
        aValue = new Date(a.startDate || a.createdAt);
        bValue = new Date(b.startDate || b.createdAt);
      } else if (orderField === 'createdAt') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else if (orderField === 'displayOrder') {
        aValue = a.displayOrder || 999999;
        bValue = b.displayOrder || 999999;
        return aValue - bValue; // Ascending for display order
      } else {
        aValue = a[orderField];
        bValue = b[orderField];
      }

      // Descending order (newest/soonest first)
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    });

    // Apply limit
    const limitedEvents = events.slice(0, limitCount);

    console.log('Events fetched successfully:', limitedEvents.length);

    // Debug: Log unique categories found
    const allCategories = new Set();
    limitedEvents.forEach(event => {
      if (event.categories && Array.isArray(event.categories)) {
        event.categories.forEach(cat => allCategories.add(cat));
      }
    });
    console.log('All unique categories in fetched events:', Array.from(allCategories));

    return limitedEvents;
  } catch (error) {
    console.error('Error fetching events with Admin SDK:', error);
    return [];
  }
}

/**
 * Get a single event by slug using Admin SDK
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const db = await getAdminDb();

    const querySnapshot = await db.collection(EVENTS_COLLECTION)
      .where('websiteId', '==', WEBSITE_ID)
      .where('slug', '==', slug)
      .where('published', '==', true)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Helper function to recursively convert ALL Firestore Timestamps to ISO strings
    const convertFirestoreData = (obj: any): any => {
      if (!obj) return obj;

      // Handle Firestore Timestamp objects
      if (obj && typeof obj === 'object' && obj.toDate) {
        return obj.toDate().toISOString();
      }

      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map(item => convertFirestoreData(item));
      }

      // Handle plain objects
      if (typeof obj === 'object' && obj.constructor === Object) {
        const converted: any = {};
        for (const key in obj) {
          converted[key] = convertFirestoreData(obj[key]);
        }
        return converted;
      }

      // Return primitives as-is
      return obj;
    };

    // Convert ALL Firestore Timestamps recursively (handles nested objects)
    const convertedData = convertFirestoreData(data);

    return {
      id: doc.id,
      ...convertedData,
      categories: convertedData.categories || [],
      tags: convertedData.tags || [],
      status: convertedData.startDate ? determineEventStatus(convertedData.startDate, convertedData.endDate) : 'upcoming',
    } as Event;
  } catch (error) {
    console.error('Error fetching event by slug with Admin SDK:', error);
    return null;
  }
}

/**
 * Get events by categories using Admin SDK
 */
export async function getEventsByCategories(
  categories: string[],
  limitCount: number = 100,
  showPastEvents: boolean = true
): Promise<Event[]> {
  if (categories.length === 0) {
    return getEvents(limitCount, 'startDate', showPastEvents);
  }

  return getEvents(limitCount, 'startDate', showPastEvents, categories);
}

/**
 * Get all unique categories for this website
 */
export async function getEventCategories(): Promise<string[]> {
  try {
    console.log('🔍 getEventCategories: Fetching events to extract categories...');

    // Fetch events using getEvents (which handles credentials properly)
    const events = await getEvents(10000, 'createdAt');
    console.log('🔍 getEventCategories: Got', events.length, 'events');

    const categoriesSet = new Set<string>();

    events.forEach((event, index) => {
      console.log(`🔍 Event ${index + 1} "${event.name}" categories:`, event.categories);
      if (event.categories) {
        event.categories.forEach((category: string) => {
          if (category && category.trim()) {
            categoriesSet.add(category.trim());
          }
        });
      }
    });

    const finalCategories = Array.from(categoriesSet).sort();
    console.log('🔍 getEventCategories: Final unique categories:', finalCategories);
    return finalCategories;
  } catch (error) {
    console.error('Error fetching event categories:', error);
    return [];
  }
}

/**
 * Get all unique tags for this website
 */
export async function getEventTags(): Promise<string[]> {
  try {
    const events = await getEvents(100, 'createdAt');
    const tagsSet = new Set<string>();

    events.forEach(event => {
      event.tags.forEach((tag: string) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching event tags:', error);
    return [];
  }
}

/**
 * Get upcoming events (events that haven't ended yet)
 */
export async function getUpcomingEvents(limitCount: number = 10): Promise<Event[]> {
  const events = await getEvents(limitCount, 'startDate', false);
  return events.filter(event => event.status === 'upcoming' || event.status === 'ongoing');
}

/**
 * Get past events
 */
export async function getPastEvents(limitCount: number = 10): Promise<Event[]> {
  const events = await getEvents(limitCount * 2, 'startDate', true); // Fetch more to ensure enough past events
  return events.filter(event => event.status === 'past').slice(0, limitCount);
}

/**
 * Get related events based on categories and tags
 */
export async function getRelatedEvents(
  eventId: string,
  categories: string[] = [],
  tags: string[] = [],
  limitCount: number = 3
): Promise<Event[]> {
  try {
    // First try to get events with matching categories
    let relatedEvents: Event[] = [];

    if (categories.length > 0) {
      relatedEvents = await getEventsByCategories(categories, limitCount * 2, true);
    } else {
      relatedEvents = await getEvents(limitCount * 2, 'startDate', true);
    }

    // Filter out the current event
    relatedEvents = relatedEvents.filter(event => event.id !== eventId);

    // Sort by relevance (events with more matching tags/categories first)
    relatedEvents.sort((a, b) => {
      const aMatchingTags = a.tags.filter(tag => tags.includes(tag)).length;
      const bMatchingTags = b.tags.filter(tag => tags.includes(tag)).length;
      const aMatchingCategories = a.categories.filter(cat => categories.includes(cat)).length;
      const bMatchingCategories = b.categories.filter(cat => categories.includes(cat)).length;

      const aScore = aMatchingTags + aMatchingCategories * 2;
      const bScore = bMatchingTags + bMatchingCategories * 2;

      return bScore - aScore;
    });

    return relatedEvents.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching related events:', error);
    return [];
  }
}

// Note: Utility functions (formatDate, formatTime, generateEventSlug, etc.)
// should be created in lib/eventUtils.ts for client-side use
// This prevents firebase-admin from being bundled in client components
