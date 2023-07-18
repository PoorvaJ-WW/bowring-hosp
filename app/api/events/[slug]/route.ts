import { NextRequest, NextResponse } from 'next/server';
import { getEventBySlug, getRelatedEvents } from '@/lib/events';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Event slug is required' },
        { status: 400 }
      );
    }

    const event = await getEventBySlug(slug);
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get related events based on categories and tags
    const relatedEvents = await getRelatedEvents(
      event.id, 
      event.categories || [], 
      event.tags || [], 
      3
    );
    
    return NextResponse.json({ 
      success: true, 
      event,
      relatedEvents
    });
  } catch (error) {
    console.error('Error in event detail API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}