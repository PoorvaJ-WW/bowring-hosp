import { NextRequest, NextResponse } from 'next/server';
import { getGalleryImages, getGalleryCategories, getGalleryCategoriesWithCounts } from '@/lib/gallery';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const limitParam = searchParams.get('limit');
    const categoriesParam = searchParams.get('categories');
    const orderField = searchParams.get('orderField') || 'order';

    const limit = limitParam ? parseInt(limitParam, 10) : 100;
    const categories = categoriesParam ? categoriesParam.split(',') : undefined;

    switch (action) {
      case 'categories':
        const categoriesList = await getGalleryCategories();
        return NextResponse.json({ categories: categoriesList });

      case 'categoriesWithCounts':
        const categoriesWithCounts = await getGalleryCategoriesWithCounts();
        return NextResponse.json({ categories: categoriesWithCounts });

      default:
        // Get gallery images
        const images = await getGalleryImages(limit, orderField, categories);
        return NextResponse.json({ images });
    }
  } catch (error) {
    console.error('Error in gallery API:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery data' }, { status: 500 });
  }
}