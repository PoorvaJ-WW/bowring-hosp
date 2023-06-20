// Client-side analytics hook
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track in production or when analytics is enabled
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
      return;
    }

    // Track pageview with a slight delay to ensure page is loaded
    const timer = setTimeout(() => {
      trackPageview(pathname);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const trackPageview = async (page: string) => {
    try {
      await fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });
    } catch (error) {
      // Silently fail - analytics should not break the site
      console.debug('Analytics tracking failed:', error);
    }
  };

  const trackEvent = async (event: string, data?: any) => {
    try {
      await fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          data,
          page: pathname,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.debug('Event tracking failed:', error);
    }
  };

  return { trackEvent, trackPageview };
}

// Analytics utility functions
export const analytics = {
  // Track specific events
  trackButtonClick: (buttonName: string) => {
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'button_click',
          data: { buttonName },
          page: window.location.pathname,
        }),
      }).catch(() => {}); // Silent fail
    }
  },

  trackFormSubmission: (formName: string) => {
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'form_submission',
          data: { formName },
          page: window.location.pathname,
        }),
      }).catch(() => {});
    }
  },

  trackDownload: (fileName: string) => {
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'download',
          data: { fileName },
          page: window.location.pathname,
        }),
      }).catch(() => {});
    }
  },
};