import { NextRequest, NextResponse } from 'next/server';
import { getPodcasts, getPodcastsByCategories, getPodcastBySlug } from '@/lib/podcasts';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const orderBy = searchParams.get('orderBy') as 'createdAt' | 'displayOrder' || 'createdAt';
    const categoriesParam = searchParams.get('categories');
    const slug = searchParams.get('slug');

    let podcasts;

    // If slug is provided, fetch single podcast
    if (slug) {
      const podcast = await getPodcastBySlug(slug);
      podcasts = podcast ? [podcast] : [];
    }
    // If categories are provided, filter by categories
    else if (categoriesParam) {
      const categories = categoriesParam.split(',').filter(Boolean);
      podcasts = await getPodcastsByCategories(categories, limit);
    }
    // Otherwise, get all podcasts
    else {
      podcasts = await getPodcasts(limit, orderBy);
    }

    return NextResponse.json({ success: true, podcasts });
  } catch (error) {
    console.error('Error in podcasts API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch podcasts' },
      { status: 500 }
    );
  }
}
