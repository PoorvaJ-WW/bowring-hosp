// API Route for on-demand revalidation of video pages
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Website ID for authentication
const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';
const REVALIDATE_SECRET = `john1010-jesus-ws-videos-${WEBSITE_ID}`;

/**
 * POST /api/revalidate-videos
 *
 * Trigger on-demand cache invalidation when video content changes
 *
 * Headers:
 * - Authorization: Bearer john1010-jesus-ws-videos-{WEBSITE_ID}
 *
 * Body:
 * {
 *   "websiteId": "site123",
 *   "paths": ["/videos", "/", "/videos/[slug]"],  // Optional specific paths
 *   "tags": ["videos", "website-site123"],        // Optional cache tags
 *   "reason": "Video published"                   // Optional reason for logging
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    if (token !== REVALIDATE_SECRET) {
      console.error('Invalid revalidation token');
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { websiteId, paths, tags, reason } = body;

    // Verify website ID matches
    if (websiteId && websiteId !== WEBSITE_ID) {
      console.error('Website ID mismatch:', { expected: WEBSITE_ID, received: websiteId });
      return NextResponse.json(
        { success: false, error: 'Website ID mismatch' },
        { status: 400 }
      );
    }

    const revalidated = {
      paths: [] as string[],
      tags: [] as string[]
    };

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        try {
          revalidatePath(path);
          revalidated.paths.push(path);
        } catch (error) {
          console.error(`Failed to revalidate path: ${path}`, error);
        }
      }
    } else {
      // Default paths to revalidate
      const defaultPaths = [
        '/videos',           // Videos listing page
        '/',                 // Homepage (if it shows videos)
        '/videos/[slug]'     // All video detail pages
      ];

      for (const path of defaultPaths) {
        try {
          revalidatePath(path);
          revalidated.paths.push(path);
        } catch (error) {
          console.error(`Failed to revalidate path: ${path}`, error);
        }
      }
    }

    // Revalidate cache tags
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        try {
          revalidateTag(tag);
          revalidated.tags.push(tag);
        } catch (error) {
          console.error(`Failed to revalidate tag: ${tag}`, error);
        }
      }
    } else {
      // Default tags to revalidate
      const defaultTags = [
        'videos',                    // All video-related content
        `website-${WEBSITE_ID}`      // All content for this website
      ];

      for (const tag of defaultTags) {
        try {
          revalidateTag(tag);
          revalidated.tags.push(tag);
        } catch (error) {
          console.error(`Failed to revalidate tag: ${tag}`, error);
        }
      }
    }

    // Log the revalidation
    console.log('✅ Video cache revalidated:', {
      websiteId: WEBSITE_ID,
      revalidated,
      reason: reason || 'Manual revalidation',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
      reason: reason || 'Manual revalidation'
    });

  } catch (error) {
    console.error('Error in video revalidation API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to revalidate videos',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}