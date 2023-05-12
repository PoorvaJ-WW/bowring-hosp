import { NextRequest, NextResponse } from 'next/server';
import { getEvents } from '@/lib/events';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const orderBy = searchParams.get('orderBy') as 'startDate' | 'createdAt' | 'displayOrder' || 'startDate';
    const categoriesParam = searchParams.get('categories');
    const showPastEvents = searchParams.get('showPastEvents') === 'true';
    const slug = searchParams.get('slug');
    
    let events;

    if (categoriesParam) {
      const categories = categoriesParam.split(',').filter(Boolean);
      // Use getEvents with categories parameter
      events = await getEvents(limit, orderBy, showPastEvents, categories);
    } else {
      events = await getEvents(limit, orderBy, showPastEvents);
    }
    
    // If slug is provided, filter to find that specific event
    if (slug) {
      events = events.filter(event => event.slug === slug);
    }
    
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error('Error in events API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}