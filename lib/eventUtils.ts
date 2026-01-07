// lib/eventUtils.ts - Client-safe event utilities
// These functions can be imported in both server and client components

/**
 * Format date for display
 */
export function formatEventDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format time for display
 */
export function formatEventTime(timeString: string): string {
  if (!timeString) return '';

  // Assuming timeString is in HH:MM format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Generate a URL-friendly slug from event name
 */
export function generateEventSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Get the status of an event based on its date
 * Returns 'upcoming', 'today', or 'past'
 */
export function getEventStatus(eventDate: string): 'upcoming' | 'today' | 'past' {
  if (!eventDate) return 'past';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);

  const diffTime = event.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays > 0) return 'upcoming';
  return 'past';
}

/**
 * Get a human-readable relative date string
 * e.g., "Tomorrow", "In 3 days", "Yesterday", "2 days ago"
 */
export function getRelativeEventDate(eventDate: string): string {
  if (!eventDate) return '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);

  const diffTime = event.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  // For dates beyond a week, return the formatted date
  return formatEventDate(eventDate);
}

/**
 * Sort events by date
 */
export function sortEventsByDate(events: Array<{ date?: string; eventDate?: string }>, order: 'asc' | 'desc' = 'asc'): Array<{ date?: string; eventDate?: string }> {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date || a.eventDate || 0).getTime();
    const dateB = new Date(b.date || b.eventDate || 0).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}

const eventCache = new Map<string, { data: unknown; timestamp: number }>();
export function getCachedEvent(key: string, ttlMs: number = 300000): unknown | null {
  const cached = eventCache.get(key);
  if (cached && Date.now() - cached.timestamp < ttlMs) return cached.data;
  return null;
}

export function setCachedEvent(key: string, data: unknown): void {
  eventCache.set(key, { data, timestamp: Date.now() });
}
