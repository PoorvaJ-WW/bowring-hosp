// types/event.ts

export interface Event {
  // Core identifiers
  id: string;
  userId: string;
  websiteId: string;
  slug: string;
  
  // Basic information
  name: string;
  description: string;
  excerpt: string;
  
  // SEO metadata
  metaTitle: string;
  metaDescription: string;
  
  // Content and organization
  tags: string[];
  categories: string[];
  image?: string;
  
  // Date and time
  startDate: string; // ISO date string (YYYY-MM-DD)
  endDate?: string; // ISO date string for multi-day events
  startTime?: string; // Time in HH:MM format
  endTime?: string; // Time in HH:MM format
  
  // Location and venue
  location: string;
  locationMapUrl?: string;
  venueType: 'offline' | 'online' | 'both';
  onlineLink?: string; // Required when venueType is 'online' or 'both'
  
  // Registration and pricing
  price?: string; // Can be "Free", "$50", "From $25", etc.
  registrationUrl?: string;
  paymentLink?: string;
  
  // System fields
  createdAt: string;
  published: boolean;
  displayOrder?: number;
  
  // Computed fields
  status?: 'upcoming' | 'ongoing' | 'past';
}

export interface EventsSectionProps {
  title?: string;
  description?: string;
  events?: Event[];
  className?: string;
  theme?: any;
  maxEvents?: number;
  category?: string; // Filter by specific category
  showPastEvents?: boolean;
  showTitle?: boolean;
  content?: any;
  [key: string]: any; // For editableProps
}

export interface EventListProps {
  events: Event[];
  showPagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  theme?: any;
}

export interface EventCardProps {
  event: Event;
  className?: string;
  showExcerpt?: boolean;
  theme?: any;
}