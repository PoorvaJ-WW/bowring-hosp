// API Route: /api/analytics/pageview
import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { page, userAgent, referrer } = await request.json();

    // Get website ID from environment variable (set during deployment)
    const websiteId = process.env.NEXT_PUBLIC_SITE_ID;

    if (!websiteId) {
      console.warn('Analytics: Website ID not found');
      return NextResponse.json({ success: false, error: 'Website ID missing' });
    }

    // Get client IP (respecting privacy)
    const ip = request.ip ||
               request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Create analytics record
    const analyticsData = {
      websiteId,
      page: page || '/',
      hashedIP: hashIP(ip), // Hash IP for privacy
      userAgent: userAgent || '',
      referrer: referrer || '',
      timestamp: new Date(),
      sessionId: generateSessionId(ip, userAgent),
      country: request.geo?.country || 'unknown',
      city: request.geo?.city || 'unknown',
    };

    // Store in Firestore
    await addDoc(collection(db, 'analytics'), analyticsData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    // Don't fail the request if analytics fails
    return NextResponse.json({ success: false, error: 'Analytics failed' });
  }
}

// Hash IP for privacy compliance
function hashIP(ip: string): string {
  if (typeof window !== 'undefined') return 'client-side';

  try {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
  } catch {
    return 'hash-unavailable';
  }
}

// Generate session ID
function generateSessionId(ip: string, userAgent: string): string {
  try {
    const crypto = require('crypto');
    const seed = `${hashIP(ip)}-${userAgent}-${Math.floor(Date.now() / (1000 * 60 * 30))}`; // 30min sessions
    return crypto.createHash('md5').update(seed).digest('hex');
  } catch {
    return `session-${Date.now()}`;
  }
}