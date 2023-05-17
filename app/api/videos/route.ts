// API Route for videos - Uses Firebase Admin SDK
import { NextRequest, NextResponse } from 'next/server';
import { getVideos, getVideoBySlug, getVideoCategories } from '../../../lib/videosServer';

/**
 * GET /api/videos
 *
 * Query Parameters:
 * - limit: Number of videos to fetch (default: 10)
 * - orderBy: 'publishedAt' | 'createdAt' | 'displayOrder' (default: 'publishedAt')
 * - categories: Comma-separated list of categories to filter by
 * - slug: Specific video slug to fetch
 * - action: 'categories' to get all unique categories
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    // If action is 'categories', return all unique categories
    if (action === 'categories') {
      const categories = await getVideoCategories();
      return NextResponse.json({
        success: true,
        categories
      });
    }

    // If slug is provided, fetch single video
    const slug = searchParams.get('slug');
    if (slug) {
      const video = await getVideoBySlug(slug);

      if (!video) {
        return NextResponse.json(
          { success: false, error: 'Video not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        video
      });
    }

    // Parse query parameters for listing
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const orderBy = (searchParams.get('orderBy') || 'publishedAt') as 'publishedAt' | 'createdAt' | 'displayOrder';
    const categoriesParam = searchParams.get('categories');

    // Parse categories (comma-separated string to array)
    const categories = categoriesParam ? categoriesParam.split(',').map(c => c.trim()) : undefined;

    // Fetch videos with filters
    const videos = await getVideos(limit, orderBy, categories);

    return NextResponse.json({
      success: true,
      videos,
      count: videos.length
    });

  } catch (error) {
    console.error('Error in videos API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch videos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS request for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}