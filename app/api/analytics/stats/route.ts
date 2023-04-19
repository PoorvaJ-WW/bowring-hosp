// API Route: /api/analytics/stats
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { collection, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d'; // 1d, 7d, 30d
    const websiteId = process.env.NEXT_PUBLIC_SITE_ID;

    if (!websiteId) {
      return NextResponse.json({ error: 'Website ID not found' }, { status: 400 });
    }

    // Calculate date range
    const now = new Date();
    const daysBack = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : 30;
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    // Query analytics data
    const analyticsRef = collection(db, 'analytics');
    const q = query(
      analyticsRef,
      where('websiteId', '==', websiteId),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc'),
      limit(1000) // Limit to prevent large queries
    );

    const querySnapshot = await getDocs(q);
    const analyticsData: any[] = [];

    querySnapshot.forEach((doc) => {
      analyticsData.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || doc.data().timestamp,
      });
    });

    // Process analytics data
    const stats = processAnalyticsData(analyticsData, timeframe);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}

function processAnalyticsData(data: any[], timeframe: string) {
  const totalPageviews = data.length;
  const uniqueVisitors = new Set(data.map(d => d.sessionId)).size;

  // Top pages
  const pageCount: { [key: string]: number } = {};
  data.forEach(d => {
    pageCount[d.page] = (pageCount[d.page] || 0) + 1;
  });
  const topPages = Object.entries(pageCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  // Top referrers
  const referrerCount: { [key: string]: number } = {};
  data.forEach(d => {
    if (d.referrer && d.referrer !== '') {
      const domain = extractDomain(d.referrer);
      referrerCount[domain] = (referrerCount[domain] || 0) + 1;
    }
  });
  const topReferrers = Object.entries(referrerCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }));

  // Daily breakdown
  const dailyData: { [key: string]: { pageviews: number, visitors: Set<string> } } = {};
  data.forEach(d => {
    const date = new Date(d.timestamp).toISOString().split('T')[0];
    if (!dailyData[date]) {
      dailyData[date] = { pageviews: 0, visitors: new Set() };
    }
    dailyData[date].pageviews++;
    dailyData[date].visitors.add(d.sessionId);
  });

  const dailyStats = Object.entries(dailyData)
    .map(([date, stats]) => ({
      date,
      pageviews: stats.pageviews,
      uniqueVisitors: stats.visitors.size,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalPageviews,
    uniqueVisitors,
    topPages,
    topReferrers,
    dailyStats,
    timeframe,
    dataPoints: data.length,
  };
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}