import { NextRequest, NextResponse } from 'next/server';
// Server-side only import - uses Firebase Admin SDK
export const dynamic = 'force-dynamic';
import { getBlogPosts, getBlogPostsByCategories, getBlogPostBySlug } from '@/lib/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const orderBy = searchParams.get('orderBy') as 'createdAt' | 'publishedAt' | 'displayOrder' || 'publishedAt';
    const categoriesParam = searchParams.get('categories');
    const slug = searchParams.get('slug');
    
    let posts;

    // Handle single post by slug
    if (slug) {
      const post = await getBlogPostBySlug(slug);
      posts = post ? [post] : [];
    } else if (categoriesParam) {
      const categories = categoriesParam.split(',').filter(Boolean);
      posts = await getBlogPostsByCategories(categories, limit);
    } else {
      posts = await getBlogPosts(limit, orderBy);
    }
    
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}