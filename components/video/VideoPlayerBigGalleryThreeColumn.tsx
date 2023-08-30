// JSON-DRIVEN VideoPlayerBigGalleryThreeColumn Template - Three Column Layout
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Maximize2, Youtube, ChevronDown, ChevronLeft, ChevronRight, X, Search, Filter, X as ClearIcon, ArrowUpDown } from 'lucide-react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  getCurrentBackgroundType,
  getCustomBackgroundColor
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getSecondaryBackgroundColor,
  getFeatureCardBackgroundColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { fetchPlaylistVideos, transformToVideoItems } from '@/lib/playlist';
import { getVideoSlug } from '@/lib/videoUtils';

// Types for playlist video
interface PlaylistVideo {
  id: string;
  duration: string;
  category?: string;
  categories?: string[];
  [key: string]: any;
}

// The website ID - this gets replaced during site generation  
// The website ID - this gets replaced during site generation
const WEBSITE_ID = 'bowring-and-lady-cur-2kgs-3-24-hth';

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
  isPreview?: boolean;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'video-player-big-gallery-three-column'
  );
};

interface Video {
  id: string;
  title: string;
  description: string;
  excerpt?: string;
  videoId: string;
  thumbnail: string;
  duration?: string;
  category?: string;
  categories?: string[];
  slug?: string;
}

export default function VideoPlayerBigGalleryThreeColumn(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'video-player-big-gallery-three-column',
    theme: propTheme,
    backgroundType,
    previewContent,
    isPreview = false
  } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`VideoPlayerBigGalleryThreeColumn: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // State for dynamic videos and UI
  const [galleryVideos, setGalleryVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState(15); // Better default for 3-column layout
  const [playingThumbnail, setPlayingThumbnail] = useState<string | null>(null);
  
  // Enhanced search, filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'loadMore' | 'pagination'>('loadMore');

  // Extract all standardized content fields
  const {
    headline = 'Video Gallery',
    subtitle,
    description = 'Explore our comprehensive collection of videos covering various topics and interests.',
    featuredVideoTitle = 'Featured Video',
    featuredVideoDescription = 'Discover our highlighted content selected just for you.',
    galleryTitle = 'More Videos',
    categories = [],
    maxItems = 15,
    loadMoreIncrement = 9,
    orderBy = 'publishedAt' as 'publishedAt' | 'createdAt',
    showFilter = true,
    showFeatured = true,
    enableSorting = true,
    enablePagination = false,
    videosPerPage = 12,
    styles = {}
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Filter and sort videos based on search, category, and sort option
  const filteredVideos = galleryVideos.filter(video => {
    const matchesSearch = searchTerm === '' ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (video.category && video.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === '' || video.category === selectedCategory;

    // Additional filtering: if component has specific categories configured, only show videos that match
    const matchesComponentCategories = categories.length === 0 ||
      categories.includes('all') ||
      categories.includes('All Videos') ||
      categories.includes('General') ||
      // Check if video's categories array has any overlap with selected categories
      (video.categories && video.categories.some(videoCat =>
        categories.some(selectedCat =>
          selectedCat.toLowerCase() === videoCat.toLowerCase() ||
          selectedCat === 'all' ||
          selectedCat === 'All Videos' ||
          selectedCat === 'General'
        )
      )) ||
      // Fallback to single category field
      (video.category && categories.some(cat =>
        cat.toLowerCase() === video.category.toLowerCase() ||
        cat === 'all' ||
        cat === 'All Videos' ||
        cat === 'General'
      ));

    return matchesSearch && matchesCategory && matchesComponentCategories;
  });

  // Sort videos
  const sortedVideos = filteredVideos.slice().sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'oldest':
        return parseInt(a.id) - parseInt(b.id);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  const videos = sortedVideos;
  const featuredVideo = selectedVideo;

  // Color helpers using standardized utilities
  const containerBackgroundColor = styles?.container?.backgroundColor || getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const galleryBackgroundColor = styles?.gallery?.backgroundColor || getSecondaryBackgroundColor({ theme: currentTheme });
  const headlineColor = styles?.title?.color || getTitleColor({ theme: currentTheme });
  const subtitleColor = styles?.subtitle?.color || getSubtitleColor({ theme: currentTheme });
  const bodyTextColor = styles?.description?.color || getDescriptionColor({ theme: currentTheme });
  const cardBackgroundColor = styles?.card?.backgroundColor || getFeatureCardBackgroundColor({ theme: currentTheme });
  const primaryColor = getPrimaryButtonColor({ theme: currentTheme });
  
  const currentBackgroundType = getCurrentBackgroundType(content);
  const customBackgroundColor = getCustomBackgroundColor(content, currentTheme);

  // Load gallery videos from Firestore - always dynamic
  useEffect(() => {
    const loadGalleryVideos = async () => {
      // In preview mode, show placeholder videos with placeholder images
      if (isPreview) {
        const placeholderVideos: Video[] = Array.from({ length: 12 }, (_, i) => ({
          id: `preview-${i + 1}`,
          title: `Sample Video ${i + 1}`,
          description: `This is a sample video description for preview purposes. Video ${i + 1} showcases different content in a three-column layout.`,
          excerpt: `Sample excerpt for video ${i + 1} - A brief summary of the content.`,
          videoId: 'dQw4w9WgXcQ',
          thumbnail: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          duration: `${Math.floor(Math.random() * 10) + 3}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
          category: 'general',
          categories: ['general', 'preview'],
          slug: `sample-video-${i + 1}`
        }));

        setGalleryVideos(placeholderVideos);
        setAvailableCategories(['general', 'preview']);

        // Set first video as selected if showFeatured is true
        if (showFeatured && placeholderVideos.length > 0) {
          setSelectedVideo(placeholderVideos[0]);
        }

        setLoading(false);
        return; // Exit early - no Firestore fetch in preview mode
      }

      try {
        setLoading(true);
        setError(null);

        console.log('🎥 Loading gallery videos for website:', WEBSITE_ID);

        // Only fetch from Firestore if WEBSITE_ID is properly set (not the placeholder)
        if (WEBSITE_ID && WEBSITE_ID !== '{{WEBSITE_ID}}') {
          // Fetch videos from Firestore
          const videos = await fetchPlaylistVideos({
            websiteId: WEBSITE_ID,
            categories: categories.length > 0 ? categories : undefined, // Pass categories array if specified
            published: true
          });
        
        // Debug: Log raw video data
        console.log('🔍 Raw videos from Firestore (3-col):', videos.map(v => ({
          id: v.id,
          title: v.title,
          duration: v.duration,
          categories: v.categories
        })));

        // Transform to component format
        const transformedVideos = transformToVideoItems(videos);

        console.log('🔍 Transformed videos (3-col):', transformedVideos.map(v => ({
          id: v.id,
          title: v.title,
          duration: v.duration,
          videoId: v.videoId
        })));
        
        // Enhance videos with proper duration formatting and category
        const enhancedVideos = await Promise.all(
          transformedVideos.map(async (video: any) => {
            const originalVideo = videos.find((v: PlaylistVideo) => v.id === video.id);
            let duration = video.duration;

            // If no duration or invalid duration, try to get it from the stored data
            if (!duration || duration === '0:00' || duration === '00:00') {
              duration = originalVideo?.duration || undefined;
            }

            // Extract categories from Firestore
            let videoCategories: string[] = [];
            let primaryCategory = 'general';

            // Since categories is already an array in Firestore schema
            if (originalVideo?.categories && Array.isArray(originalVideo.categories)) {
              videoCategories = originalVideo.categories;
              primaryCategory = videoCategories[0] || 'general';
            }

            const enhanced = {
              ...video,
              excerpt: video.excerpt || video.description || '',
              duration: duration && duration !== '0:00' && duration !== '00:00' ? duration : undefined,
              category: primaryCategory,
              categories: videoCategories
            };

            console.log(`🔍 Enhanced video (3-col): ${enhanced.title}, Duration: ${enhanced.duration}, Categories:`, videoCategories);
            return enhanced;
          })
        );
        
          setGalleryVideos(enhancedVideos);

          // Set first video as selected if none selected
          if (enhancedVideos.length > 0 && !selectedVideo) {
            setSelectedVideo(enhancedVideos[0]);
          }

          console.log(`🎥 Loaded ${enhancedVideos.length} gallery videos (3-col)`);

          // Final debug: Show what durations we ended up with
          console.log('🔍 Final video durations (3-col):', enhancedVideos.map(v => ({
            title: v.title,
            duration: v.duration,
            hasValidDuration: !!(v.duration && v.duration !== '0:00' && v.duration !== '00:00')
          })));
        } else {
          console.log('🎥 WEBSITE_ID not set, using empty video list');
          setGalleryVideos([]);
          setSelectedVideo(null);
        }
        
      } catch (error) {
        console.error('❌ Error loading gallery videos:', error);
        setError('Failed to load videos');
        setGalleryVideos([]);
        setSelectedVideo(null);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryVideos();
    setVisibleVideos(maxItems);
  }, [categories, showFeatured, maxItems, isPreview]);

  const openYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openFullscreen = (video: Video) => {
    setSelectedVideo(video);
    setIsFullscreen(true);
  };

  const playInThumbnail = (videoId: string) => {
    setPlayingThumbnail(videoId);
  };

  // Clear all filters and reset pagination
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('newest');
    setCurrentPage(1);
    setVisibleVideos(maxItems);
  };

  // Reset to first page when filters change
  const resetPagination = () => {
    setCurrentPage(1);
    setVisibleVideos(maxItems);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    resetPagination();
  };
  
  // Handle category filter change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    resetPagination();
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical');
    resetPagination();
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'loadMore' ? 'pagination' : 'loadMore');
    resetPagination();
  };

  const loadMoreVideos = () => {
    setVisibleVideos((prev) => Math.min(prev + loadMoreIncrement, videos.length - (showFeatured && featuredVideo ? 1 : 0)));
  };

  // Pagination calculations
  const galleryVideoCount = videos.length - (showFeatured && featuredVideo ? 1 : 0); // Exclude featured video from count if showFeatured is true
  const totalPages = Math.ceil(galleryVideoCount / videosPerPage);

  // Get videos for current view mode
  const getDisplayVideos = () => {
    const videosToDisplay = videos.filter(video =>
      showFeatured ? video.id !== featuredVideo?.id : true
    );

    if (viewMode === 'pagination') {
      const startIndex = (currentPage - 1) * videosPerPage;
      const endIndex = startIndex + videosPerPage;
      return videosToDisplay.slice(startIndex, endIndex);
    } else {
      return videosToDisplay.slice(0, visibleVideos);
    }
  };

  const displayVideos = getDisplayVideos();
  const hasMoreVideos = viewMode === 'loadMore' && visibleVideos < galleryVideoCount;

  // Pagination navigation
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of video section
    document.querySelector('[data-video-grid]')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      {/* Featured Video Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto"> {/* Full width for 3-column */}
          {/* Section Header */}
          <div className="text-center mb-12">
            {subtitle && (
              <h2 
                className="text-base font-semibold leading-7 mb-2 transition-colors duration-200 cursor-pointer hover:opacity-80"
                style={{
                  color: subtitleColor,
                  fontFamily: getFontFamily(currentTheme, 'heading')
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'subtitle', subtitle, 'Gallery Subtitle');
                }}
                title="Click to edit gallery subtitle"
              >
                {subtitle}
              </h2>
            )}
            
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-200 cursor-pointer hover:opacity-80"
              style={{
                color: headlineColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
              }}
              onClick={(e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'Gallery  Headline');
              }}
              title="Click to edit gallery headline"
            >
              {headline}
            </h1>
            
            <p 
              className="text-lg leading-relaxed max-w-3xl mx-auto transition-colors duration-200 cursor-pointer hover:opacity-80"
              style={{
                color: bodyTextColor,
                fontFamily: getFontFamily(currentTheme, 'body')
              }}
              onClick={(e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'Gallery Description');
              }}
              title="Click to edit gallery description"
            >
              {description}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div 
                className="text-lg"
                style={{ color: bodyTextColor, fontFamily: getFontFamily(currentTheme, 'body') }}
              >
                Loading videos...
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-lg text-red-500">Failed to load videos</div>
            </div>
          ) : videos.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div
                className="text-lg text-center"
                style={{ color: bodyTextColor, fontFamily: getFontFamily(currentTheme, 'body') }}
              >
                <div className="mb-2">No videos available</div>
                <div className="text-sm opacity-70">Videos will appear here when added to your collection</div>
              </div>
            </div>
          ) : showFeatured && featuredVideo ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Featured Video Info */}
              <div className="order-2 lg:order-1">
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 transition-colors duration-200 cursor-pointer hover:opacity-80"
                  style={{
                    color: headlineColor,
                    fontFamily: getFontFamily(currentTheme, 'heading')
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'featuredVideo Title', featuredVideo?.title || '', 'Featured Video Title');
                  }}
                  title="Click to edit featured video title"
                >
                  {featuredVideo?.title || 'No Video Selected'}
                </h2>
                <p 
                  className="text-lg leading-relaxed mb-8 transition-colors duration-200 cursor-pointer hover:opacity-80"
                  style={{
                    color: bodyTextColor,
                    fontFamily: getFontFamily(currentTheme, 'body')
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'featuredVideoDescription', featuredVideo?.description || '', 'Featured Video Description');
                  }}
                  title="Click to edit featured video description"
                >
                  {featuredVideo?.description || 'Select a video from the gallery to see details'}
                </p>
                {featuredVideo && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => openYouTube(featuredVideo.videoId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Youtube className="w-5 h-5" />
                      Watch on YouTube
                    </button>
                    <button 
                      onClick={() => openFullscreen(featuredVideo)}
                      className="border-2 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      <Maximize2 className="w-5 h-5" />
                      Fullscreen
                    </button>
                  </div>
                )}
              </div>

              {/* Featured Video Player */}
              <div className="order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                  <div className="aspect-video relative">
                    {featuredVideo ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${featuredVideo.videoId}?enablejsapi=1&rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={featuredVideo.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <div className="text-gray-400 text-center">
                          <div className="text-xl mb-2">No Video Selected</div>
                          <div className="text-sm">Select a video from the gallery below</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Video Grid Section */}
      {(showFeatured ? videos.length > 1 : videos.length > 0) && (
      <section
        className={`${showFeatured ? 'py-12' : 'py-6'} px-4 sm:px-6 lg:px-8 transition-colors duration-200`}
        style={{ backgroundColor: galleryBackgroundColor }}
      >
        <div className="max-w-7xl mx-auto"> {/* Full width container */}
          {showFeatured && (
            <h2
              className="text-2xl sm:text-3xl font-bold mb-8 text-center transition-colors duration-200 cursor-pointer hover:opacity-80"
              style={{
                color: headlineColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
              }}
              onClick={(e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'gallery Headline', galleryTitle, 'Gallery Section  Headline');
              }}
              title="Click to edit gallery section headline"
            >
              {galleryTitle}
            </h2>
          )}

          {/* Enhanced Search, Filter and Controls */}
          {showFilter && galleryVideos.length >= 3 && (
            <div className={`${showFeatured ? 'mb-8' : 'mb-4'} space-y-6`}>
              {/* Search and Sort Controls */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
                {/* Search Input */}
                <div className="relative w-full max-w-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: bodyTextColor }} />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:shadow-lg transition-all duration-300 placeholder-gray-400"
                    style={{ 
                      backgroundColor: cardBackgroundColor,
                      color: headlineColor,
                      borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151'
                    }}
                  />
                </div>

                {/* Controls Row */}
                <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                  {/* Sort Dropdown */}
                  {enableSorting && (
                    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-4 shadow-sm border-2 border-gray-200"
                         style={{ 
                           backgroundColor: cardBackgroundColor,
                           borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151'
                         }}>
                      <ArrowUpDown className="w-4 h-4" style={{ color: bodyTextColor }} />
                      <span className="text-sm font-medium whitespace-nowrap"
                            style={{ color: bodyTextColor, fontFamily: getFontFamily(currentTheme, 'body') }}>
                        Sort:
                      </span>
                      <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="bg-transparent focus:outline-none text-sm font-medium min-w-[120px]"
                        style={{ color: headlineColor, fontFamily: getFontFamily(currentTheme, 'body') }}
                      >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="alphabetical">A-Z</option>
                      </select>
                    </div>
                  )}

                  {/* Category Filter */}
                  {availableCategories.length > 1 && (
                    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-4 shadow-sm border-2 border-gray-200"
                         style={{
                           backgroundColor: cardBackgroundColor,
                           borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151'
                         }}>
                      <Filter className="w-4 h-4" style={{ color: bodyTextColor }} />
                      <span className="text-sm font-medium whitespace-nowrap"
                            style={{ color: bodyTextColor, fontFamily: getFontFamily(currentTheme, 'body') }}>
                        Category:
                      </span>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="bg-transparent focus:outline-none text-sm font-medium min-w-[100px]"
                        style={{ color: headlineColor, fontFamily: getFontFamily(currentTheme, 'body') }}
                      >
                        <option value="">All</option>
                        {availableCategories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* View Mode Toggle */}
                  {enablePagination && galleryVideoCount > videosPerPage && (
                    <button
                      onClick={toggleViewMode}
                      className="px-4 py-4 text-sm font-medium rounded-lg border-2 border-gray-200 transition-all duration-200"
                      style={{ 
                        backgroundColor: cardBackgroundColor,
                        color: headlineColor,
                        borderColor: currentTheme.mode === 'light' ? '#E5E7EB' : '#374151',
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                    >
                      {viewMode === 'loadMore' ? 'Switch to Pages' : 'Switch to Load More'}
                    </button>
                  )}

                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory || sortBy !== 'newest') && (
                    <button
                      onClick={clearFilters}
                      className="px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200 border-2 border-transparent"
                      style={{ 
                        backgroundColor: currentTheme.mode === 'light' ? '#F3F4F6' : '#374151',
                        color: bodyTextColor,
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
              
              {/* Results Summary */}
              <div className="text-center text-sm" style={{ color: bodyTextColor, fontFamily: getFontFamily(currentTheme, 'body') }}>
                {viewMode === 'pagination' ? (
                  galleryVideoCount === 0 ? (
                    'No videos found'
                  ) : (
                    `Page ${currentPage} of ${totalPages} • ${galleryVideoCount} total ${galleryVideoCount === 1 ? 'video' : 'videos'}`
                  )
                ) : (
                  galleryVideoCount === 0 ? (
                    'No videos found'
                  ) : (
                    `${Math.min(visibleVideos, galleryVideoCount)} of ${galleryVideoCount} ${galleryVideoCount === 1 ? 'video' : 'videos'}`
                  )
                )}
                {videos.length !== galleryVideos.length && ` • Filtered from ${galleryVideos.length} total`}
              </div>
            </div>
          )}

          {/* Video Grid - THREE COLUMN LAYOUT - Exclude featured video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" data-video-grid> {/* 3-column max with balanced gaps */}
            {displayVideos.map((video, index) => (
              <Link
                key={video.id}
                href={`/videos/${getVideoSlug(video)}`}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-black">
                  {playingThumbnail === video.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    />
                  ) : (
                    <>
                      <img
                        src={video.thumbnail || '/placeholder.svg'}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay Controls */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playInThumbnail(video.videoId);
                            }}
                            className="text-white p-3 rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: primaryColor }}
                            title="Play here"
                          >
                            <Play className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openFullscreen(video);
                            }}
                            className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all"
                            title="Fullscreen"
                          >
                            <Maximize2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openYouTube(video.videoId);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all"
                            title="YouTube"
                          >
                            <Youtube className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      {video.duration && video.duration !== '0:00' && video.duration !== '00:00' && (
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Video Info - Balanced for 3-column layout */}
                <div className="p-4"> {/* Standard padding for 3-column */}
                  <h3
                    className="font-semibold mb-2 line-clamp-2 transition-colors duration-200 cursor-pointer hover:opacity-80"
                    style={{
                      color: headlineColor,
                      fontFamily: getFontFamily(currentTheme, 'heading')
                    }}
                    onClick={(e) => {
                      // Allow editWithAI to work in edit mode
                      if (e.currentTarget.hasAttribute('data-editable')) {
                        e.preventDefault();
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `video-${video.id}-title`, video.title, 'Video Title');
                      }
                    }}
                    title="Click to view video details"
                  >
                    {video.title}
                  </h3>
                  <div
                    className="text-sm line-clamp-2" // Standard size for 3-column
                    style={{
                      color: bodyTextColor,
                      fontFamily: getFontFamily(currentTheme, 'body')
                    }}
                    dangerouslySetInnerHTML={{ __html: video.excerpt || '' }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button or Pagination */}
          {viewMode === 'loadMore' ? (
            hasMoreVideos && (
              <div className="text-center">
                <button 
                  onClick={loadMoreVideos}
                  className="min-w-[200px] px-6 py-3 rounded-lg font-medium transition-colors duration-200 border-2 hover:bg-gray-50 flex items-center justify-center gap-2 mx-auto"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  <ChevronDown className="w-5 h-5" />
                  Load More Videos ({galleryVideoCount - visibleVideos} remaining)
                </button>
              </div>
            )
          ) : (
            /* Pagination Controls */
            totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    borderColor: currentPage === 1 ? '#E5E7EB' : primaryColor,
                    color: currentPage === 1 ? '#9CA3AF' : primaryColor
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first, last, current, and 2 pages around current
                      return page === 1 || 
                             page === totalPages || 
                             Math.abs(page - currentPage) <= 2;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && (
                            <span className="px-3 py-2 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => goToPage(page)}
                            className="px-3 py-2 rounded-lg border-2 transition-all duration-200 min-w-[40px]"
                            style={{
                              borderColor: page === currentPage ? primaryColor : '#E5E7EB',
                              backgroundColor: page === currentPage ? primaryColor : 'transparent',
                              color: page === currentPage ? '#FFFFFF' : headlineColor
                            }}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    borderColor: currentPage === totalPages ? '#E5E7EB' : primaryColor,
                    color: currentPage === totalPages ? '#9CA3AF' : primaryColor
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )
          )}
        </div>
      </section>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors text-xl"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?enablejsapi=1&rel=0&modestbranding=1&autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selectedVideo.title}
            />
          </div>
        </div>
      )}
    </div>
  );
}