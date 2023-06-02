import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { WEBSITE_ID } from '@/lib/blog';

// Secret token for authorization - uses global prefix + content type + website ID
// Format: john1010-jesus-ws-blogs-{WEBSITE_ID}
const REVALIDATE_SECRET = `john1010-jesus-ws-blogs-${WEBSITE_ID}`;

/**
 * Next.js 15 On-Demand Revalidation API
 * This endpoint allows the main dashboard to trigger cache revalidation
 * when blog content is updated, deleted, or published
 *
 * Usage from dashboard:
 * POST /api/revalidate-blog
 * Headers: { Authorization: 'Bearer <REVALIDATE_SECRET>' }
 * Body: { websiteId, paths?, tags?, reason }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== REVALIDATE_SECRET) {
      console.error('❌ Unauthorized revalidation attempt');
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { websiteId, paths, tags, reason } = body;

    console.log(`🔄 Revalidation request received:`, {
      websiteId,
      paths,
      tags,
      reason,
      timestamp: new Date().toISOString()
    });

    const results = {
      paths: [] as string[],
      tags: [] as string[],
      errors: [] as string[]
    };

    // Revalidate specified paths
    const pathsToRevalidate = paths || ['/blog', '/', '/blog/[slug]'];

    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path, 'page');
        results.paths.push(path);
        console.log(`✅ Revalidated path: ${path}`);
      } catch (error) {
        const errorMsg = `Failed to revalidate ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        results.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Revalidate cache tags (Next.js 15 unstable_cache tags)
    const tagsToRevalidate = tags || ['blog-posts', `website-${websiteId}`];

    for (const tag of tagsToRevalidate) {
      try {
        revalidateTag(tag);
        results.tags.push(tag);
        console.log(`✅ Revalidated tag: ${tag}`);
      } catch (error) {
        const errorMsg = `Failed to revalidate tag ${tag}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        results.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    const success = results.errors.length === 0;

    return NextResponse.json({
      success,
      revalidated: {
        paths: results.paths,
        tags: results.tags
      },
      errors: results.errors.length > 0 ? results.errors : undefined,
      message: success
        ? `✅ Cache revalidation completed successfully. ${reason || ''}`
        : '⚠️ Cache revalidation completed with errors',
      timestamp: new Date().toISOString(),
      reason
    }, {
      status: success ? 200 : 207 // 207 = Multi-Status (partial success)
    });

  } catch (error) {
    console.error('❌ Revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate cache',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
