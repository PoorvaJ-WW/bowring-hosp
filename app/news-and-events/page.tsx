import { NewsAndEventsView } from '@/views/index';
import { generateMetadata as getPageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getEvents } from '@/lib/events';

// Dynamic metadata generation from _metadata.json
export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata('/news-and-events');
}

// Server Component - fetches data before rendering
// NO 'use client' directive - this runs on the server!
export default async function Page() {
  // Pre-fetch blog posts on the server
  const blogPosts = await getBlogPosts(50, 'publishedAt');
  // Pre-fetch events on the server
  const events = await getEvents(50, 'startDate');

  // Pass server-fetched data to the view
  // The view will receive data instantly - no loading spinners!
  return <NewsAndEventsView blogPosts={blogPosts} events={events} />;
}