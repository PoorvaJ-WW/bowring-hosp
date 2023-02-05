// CLIENT COMPONENT - Receives server-fetched data as props
// No client-side data fetching - all data comes from server
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Youtube, Maximize2, X, Clock, Calendar, Eye, Tag, Share2, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { formatDate } from '@/lib/videoUtils';
import type { Video } from '@/lib/videosServer';

// Import DOMPurify for sanitization
let DOMPurify: any;
if (typeof window !== 'undefined') {
  import('dompurify').then((module) => {
    DOMPurify = module.default;
  }).catch(err => console.error('Error loading DOMPurify:', err));
}

interface VideoDetailClientProps {
  video: Video;
  relatedVideos?: Video[];
}

export default function VideoDetailClient({ video, relatedVideos = [] }: VideoDetailClientProps) {
  const { theme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sanitizedDescription, setSanitizedDescription] = useState<string>('');

  // Sanitize HTML content
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sanitizeContent = () => {
        const description = video.seoDescription || video.description;

        if (!description) {
          setSanitizedDescription('No description available.');
          return;
        }

        if (DOMPurify) {
          const sanitized = DOMPurify.sanitize(description, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
          });
          setSanitizedDescription(sanitized);
        } else {
          setTimeout(sanitizeContent, 100);
        }
      };

      sanitizeContent();
    }
  }, [video.description, video.seoDescription]);

  // Extract video platform
  const isYouTube = video.url?.includes('youtube') || video.url?.includes('youtu.be');
  const isVimeo = video.url?.includes('vimeo');

  // Get embed URL
  const getEmbedUrl = () => {
    if (video.videoId) {
      if (isYouTube) {
        return `https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`;
      }
      if (isVimeo) {
        return `https://player.vimeo.com/video/${video.videoId}`;
      }
    }
    return video.url;
  };

  // Share video
  const shareVideo = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Open in platform
  const openInPlatform = () => {
    window.open(video.url, '_blank');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background.primary[theme.mode] }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-6" style={{ fontFamily: theme.fonts.body }}>
              <Link href="/" className="hover:underline transition-colors" style={{ color: theme.colors.text.secondary[theme.mode] }}>
                Home
              </Link>
              <ChevronRight className="w-4 h-4" style={{ color: theme.colors.text.secondary[theme.mode] }} />
              <Link href="/videos" className="hover:underline transition-colors" style={{ color: theme.colors.text.secondary[theme.mode] }}>
                Videos
              </Link>
              <ChevronRight className="w-4 h-4" style={{ color: theme.colors.text.secondary[theme.mode] }} />
              <span className="font-medium truncate" style={{ color: theme.colors.text.primary[theme.mode] }}>{video.title}</span>
            </nav>

            {/* Video Player */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black mb-6">
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl()}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              </div>

              {/* Player Controls Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={openInPlatform}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
                  title={`Watch on ${isYouTube ? 'YouTube' : isVimeo ? 'Vimeo' : 'Platform'}`}
                >
                  <Youtube className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg transition-all"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                {video.seoTitle || video.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
                {video.publishedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                )}
                {video.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                )}
                {video.views !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                )}
              </div>

              {/* Categories/Tags */}
              <div className="flex flex-wrap gap-2">
                {video.categories?.map((category) => (
                  <Link
                    key={category}
                    href={`/videos?category=${encodeURIComponent(category)}`}
                    className="px-3 py-1 rounded-full text-sm hover:opacity-80 transition-colors"
                    style={{
                      backgroundColor: theme.colors.primary[theme.mode] + '20',
                      color: theme.colors.primary[theme.mode],
                      fontFamily: theme.fonts.body
                    }}
                  >
                    {category}
                  </Link>
                ))}
                {video.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    style={{
                      backgroundColor: theme.colors.text.secondary[theme.mode] + '20',
                      color: theme.colors.text.secondary[theme.mode],
                      fontFamily: theme.fonts.body
                    }}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* TLDR (Too Long; Didn't Read) */}
              {video.tldr && (
                <div className="p-4 rounded-xl border-l-4 mb-6" style={{
                  backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20',
                  borderColor: theme.colors.primary[theme.mode]
                }}>
                  <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.colors.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                    TL;DR
                  </h3>
                  <p className="text-base" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>
                    {video.tldr}
                  </p>
                </div>
              )}

              {/* Key Takeaways */}
              {video.keyTakeaways && video.keyTakeaways.length > 0 && (
                <div className="mb-6 p-6 rounded-xl" style={{ backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {video.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex gap-3" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{
                          backgroundColor: theme.colors.primary[theme.mode],
                          color: 'white'
                        }}>
                          {index + 1}
                        </span>
                        <span className="flex-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="max-w-none" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body, fontSize: '1.125rem', lineHeight: '1.75' }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizedDescription?.replace(
                      /<([^>]+)>/g,
                      (match, tag) => {
                        if (tag.startsWith('h1') || tag.startsWith('h2') || tag.startsWith('h3') || tag.startsWith('h4') || tag.startsWith('h5') || tag.startsWith('h6')) {
                          return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.heading}; font-weight: bold; margin: 1.5rem 0 1rem 0;">`;
                        }
                        if (tag.startsWith('p')) {
                          return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body}; margin-bottom: 1rem;">`;
                        }
                        if (tag.startsWith('a')) {
                          return `<${tag} style="color: ${theme.colors.primary[theme.mode]}; text-decoration: underline;">`;
                        }
                        if (tag.startsWith('li')) {
                          return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body};">`;
                        }
                        if (tag.startsWith('blockquote')) {
                          return `<${tag} style="color: ${theme.colors.text.primary[theme.mode]}; font-family: ${theme.fonts.body}; border-left: 4px solid ${theme.colors.primary[theme.mode]}; padding-left: 1rem; font-style: italic;">`;
                        }
                        return match;
                      }
                    ) || sanitizedDescription
                  }}
                />
              </div>

              {/* FAQ Section for AEO */}
              {video.faqSection && video.faqSection.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-6" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {video.faqSection.map((faq, index) => (
                      <div key={index} className="p-6 rounded-xl" style={{ backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20' }}>
                        <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                          {faq.question}
                        </h3>
                        <p className="leading-relaxed" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transcript Section */}
              {video.transcript && (
                <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20' }}>
                  <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>Transcript</h2>
                  <div className="max-w-none">
                    <p className="whitespace-pre-wrap" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>{video.transcript}</p>
                  </div>
                </div>
              )}

              {/* Chapters Section */}
              {video.chapters && video.chapters.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>Video Chapters</h2>
                  <div className="space-y-2">
                    {video.chapters.map((chapter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg hover:opacity-80 transition-colors cursor-pointer"
                        style={{ backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20' }}
                      >
                        <span className="text-sm font-mono" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
                          {chapter.timestamp}
                        </span>
                        <span style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.body }}>{chapter.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Button */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={shareVideo}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary[theme.mode],
                    color: 'white',
                    fontFamily: theme.fonts.body
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>Related Videos</h2>

            {relatedVideos.length > 0 ? (
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    href={`/videos/${relatedVideo.slug || relatedVideo.id}`}
                    className="group flex gap-3 p-3 rounded-lg hover:opacity-80 transition-all"
                    style={{ backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20' }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden bg-black">
                      {relatedVideo.thumbnail ? (
                        <img
                          src={relatedVideo.thumbnail}
                          alt={relatedVideo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white/50" />
                        </div>
                      )}
                      {relatedVideo.duration && (
                        <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-1 rounded">
                          {relatedVideo.duration}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 transition-colors" style={{ color: theme.colors.text.primary[theme.mode], fontFamily: theme.fonts.heading }}>
                        {relatedVideo.title}
                      </h3>
                      {relatedVideo.publishedAt && (
                        <p className="text-xs mt-1" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
                          {formatDate(relatedVideo.publishedAt)}
                        </p>
                      )}
                      {relatedVideo.views !== undefined && (
                        <p className="text-xs" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>
                          {relatedVideo.views.toLocaleString()} views
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: theme.colors.text.secondary[theme.mode], fontFamily: theme.fonts.body }}>No related videos found</p>
            )}

            {/* View All Videos */}
            <div className="mt-6">
              <Link
                href="/videos"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
                style={{
                  backgroundColor: theme.colors.background.secondary?.[theme.mode] || theme.colors.text.secondary[theme.mode] + '20',
                  color: theme.colors.text.primary[theme.mode],
                  fontFamily: theme.fonts.body
                }}
              >
                View All Videos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <iframe
              src={`${getEmbedUrl()}${isYouTube ? '&autoplay=1' : '?autoplay=1'}`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}