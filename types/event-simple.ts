// Simplified Event Type - Mirror of Blog Structure
// This makes events behave exactly like blogs with minimal date fields

export interface SimpleEvent {
  // Core fields (same as BlogPost)
  id: string;
  userId: string;
  websiteId: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  tags: string[];
  categories: string[];
  createdAt: string;
  published: boolean;
  displayOrder?: number;
  author?: {
    name: string;
    avatar?: string;
  };
  views?: number;

  // Minimal event-specific fields (simplified)
  eventDate: string; // Single date field instead of startDate/endDate
  eventTime?: string; // Optional single time field
  location?: string; // Single location field instead of venue/location split
  
  // Remove all complex fields:
  // - No status calculation (derive from eventDate if needed)
  // - No registrationUrl, maxAttendees, currentAttendees
  // - No isOnline, registrationRequired, price, currency
  // - No startDate/endDate split
  // - No organizer complexity
}

export interface SimpleEventCardProps {
  event?: SimpleEvent;
  className?: string;
  theme?: any;
  slug?: string;
  content?: any;
}

export interface SimpleEventListProps {
  events?: SimpleEvent[];
  className?: string;
  theme?: any;
  orderBy?: 'createdAt' | 'displayOrder'; // Remove 'startDate' complexity
  categories?: string[];
  maxEvents?: number;
  content?: any;
}

export interface SimpleEventsSectionProps {
  title?: string;
  description?: string;
  categories?: string[];
  maxEvents?: number;
  orderBy?: 'createdAt' | 'displayOrder';
  className?: string;
  showTitle?: boolean;
  events?: SimpleEvent[];
  theme?: any;
  content?: any;
}

export interface SimpleEventPostPageProps {
  event: SimpleEvent;
  relatedEvents?: SimpleEvent[];
}