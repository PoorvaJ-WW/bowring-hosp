import { NextRequest, NextResponse } from 'next/server';
// Server-side only import - uses Firebase Admin SDK
export const dynamic = 'force-dynamic';
import { getPosts, getPostsByCategories, getPostBySlug } from '@/lib/posts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const orderBy = searchParams.get('orderBy') as 'publishedAt' | 'createdAt' | 'displayOrder' || 'createdAt';
    const categoriesParam = searchParams.get('categories');
    const slug = searchParams.get('slug');

    let posts;

    // Handle single post by slug
    if (slug) {
      const post = await getPostBySlug(slug);
      posts = post ? [post] : [];
    } else if (categoriesParam) {
      const categories = categoriesParam.split(',').filter(Boolean);
      posts = await getPostsByCategories(categories, limit);
    } else {
      posts = await getPosts(limit, orderBy);
    }

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
