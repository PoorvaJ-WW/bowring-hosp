// SERVER-FIRST GalleryGrid Template
// Receives server-fetched images as props - NO client-side fetching!
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily } from '@/utils/themeUtils';
import { Search, ArrowUpDown, ChevronDown } from 'lucide-react';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getSecondaryTextColor,
  getErrorColor
} from '@/utils/colorUtils';

interface GalleryImage {
  id: string;
  url?: string;
  src?: string;
  title?: string;
  alt?: string;
  description?: string;
  caption?: string;
  tags?: string[];
  createdAt?: string;
  publishedAt?: string;
  aspectRatio?: string;
  image?: {
    src: string;
    alt: string;
  };
}

interface Props {
  // SERVER-PROVIDED DATA
  galleryImages?: GalleryImage[];  // Images fetched on the server

  // Component configuration
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  content?: any;
  maxImages?: number;
}

export default function GalleryGrid(props: Props) {
  const {
    galleryImages = [],  // USE SERVER-PROVIDED IMAGES
    pageSlug = 'gallery',
    componentId = 'gallery-grid',
    theme: propTheme,
    content = {},
    maxImages = 12
  } = props;

  const { theme: contextTheme } = useTheme();
  const currentTheme = propTheme || contextTheme;

  // State for UI interactions only - NOT for data fetching!
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [visibleCount, setVisibleCount] = useState(maxImages);

  // Extract content configuration
  const {
    title = 'Our Gallery',
    subtitle = 'Explore our collection',
    showFilter = true,
    loadMoreIncrement = 6
  } = content;

  // Default placeholder items for when no server images are available
  const placeholderUrl = 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png';
  const defaultItems: GalleryImage[] = [
    { id: 'default-1', image: { src: placeholderUrl, alt: 'Gallery image 1' }, aspectRatio: 'square' },
    { id: 'default-2', image: { src: placeholderUrl, alt: 'Gallery image 2' }, aspectRatio: 'square' },
    { id: 'default-3', image: { src: placeholderUrl, alt: 'Gallery image 3' }, aspectRatio: 'square' },
    { id: 'default-4', image: { src: placeholderUrl, alt: 'Gallery image 4' }, aspectRatio: 'square' },
    { id: 'default-5', image: { src: placeholderUrl, alt: 'Gallery image 5' }, aspectRatio: 'wide' },
    { id: 'default-6', image: { src: placeholderUrl, alt: 'Gallery image 6' }, aspectRatio: 'square' },
    { id: 'default-7', image: { src: placeholderUrl, alt: 'Gallery image 7' }, aspectRatio: 'square' }
  ];

  // Normalize gallery items to handle different formats
  const normalizeGalleryItems = (items: GalleryImage[]): GalleryImage[] => {
    return items.map(item => ({
      ...item,
      image: item.image || {
        src: item.url || item.src || placeholderUrl,
        alt: item.alt || item.title || 'Gallery image'
      }
    }));
  };

  // Use server-provided images or fallback to placeholders
  const allGalleryItems = galleryImages.length > 0
    ? normalizeGalleryItems(galleryImages)
    : defaultItems;

  // Filter gallery items based on search term (client-side filtering of server data)
  const filteredItems = allGalleryItems.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      item.image?.alt?.toLowerCase().includes(searchLower) ||
      item.title?.toLowerCase().includes(searchLower) ||
      item.caption?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Sort gallery items (client-side sorting of server data)
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedAt || b.createdAt || 0).getTime() -
               new Date(a.publishedAt || a.createdAt || 0).getTime();
      case 'oldest':
        return new Date(a.publishedAt || a.createdAt || 0).getTime() -
               new Date(b.publishedAt || b.createdAt || 0).getTime();
      case 'alphabetical':
        return (a.title || a.image?.alt || '').localeCompare(b.title || b.image?.alt || '');
      default:
        return 0;
    }
  });

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(maxImages);
  }, [searchTerm, sortBy, maxImages]);

  // Apply pagination (client-side pagination of server data)
  const displayItems = sortedItems.slice(0, visibleCount);
  const hasMore = visibleCount < sortedItems.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreIncrement, sortedItems.length));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setVisibleCount(maxImages);
  };

  // Theme colors
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content });
  const headingColor = getTitleColor({ theme: currentTheme });
  const bodyTextColor = getDescriptionColor({ theme: currentTheme });
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme });
  const errorColor = getErrorColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  // Lightbox handlers
  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // Render the specific grid layout
  const renderGalleryLayout = () => {
    if (displayItems.length === 0) return null;

    const firstRow = displayItems.slice(0, 4);
    const mainImage = displayItems[4] || displayItems[0];
    const sideImages = displayItems.slice(5, 7);

    return (
      <div className="mt-16 lg:gap-8 md:gap-5 gap-8">
        {/* First Row - 4 equal columns */}
        <div className="grid md:grid-cols-4 grid-cols-1 lg:gap-8 md:gap-5 gap-8">
          {firstRow.map((item) => (
            <div key={item.id} className="group object-cover overflow-hidden rounded-2xl lg:max-w-[280px] w-full h-64">
              <img
                src={item.image?.src || placeholderUrl}
                alt={item.image?.alt || 'Gallery image'}
                className="gallery-image lg:max-w-[280px] w-full h-64 object-cover group-hover:scale-105 ease-in-out transition-all relative duration-500 rounded-2xl cursor-pointer"
                onClick={() => openLightbox(item.image?.src || placeholderUrl)}
                loading="lazy"
                style={{ height: '-webkit-fill-available' }}
              />
            </div>
          ))}
        </div>

        {/* Second Row - Main image (9 cols) + 2 side images (3 cols) */}
        {displayItems.length > 4 && (
          <div className="grid md:grid-cols-12 grid-cols-1 lg:gap-8 md:gap-5 gap-8 lg:my-8 md:my-5 my-8">
            <div className="md:col-span-9 col-span-1 group object-cover overflow-hidden rounded-2xl lg:max-w-[904px] w-full md:h-[544px] h-64">
              <img
                src={mainImage.image?.src || placeholderUrl}
                alt={mainImage.image?.alt || 'Gallery image'}
                className="gallery-image lg:max-w-[904px] w-full md:h-[544px] h-64 object-cover group-hover:scale-105 ease-in-out transition-all relative duration-500 rounded-2xl cursor-pointer"
                onClick={() => openLightbox(mainImage.image?.src || placeholderUrl)}
                loading="lazy"
                style={{ height: '-webkit-fill-available' }}
              />
            </div>
            <div className="md:col-span-3 col-span-1 grid lg:gap-8 md:gap-5 gap-8">
              {sideImages.map((item) => (
                <div key={item.id} className="group object-cover overflow-hidden rounded-2xl lg:max-w-[280px] w-full h-64">
                  <img
                    src={item.image?.src || placeholderUrl}
                    alt={item.image?.alt || 'Gallery image'}
                    className="gallery-image lg:max-w-[280px] w-full h-64 object-cover group-hover:scale-105 ease-in-out transition-all relative duration-500 rounded-2xl cursor-pointer"
                    onClick={() => openLightbox(item.image?.src || placeholderUrl)}
                    loading="lazy"
                    style={{ height: '-webkit-fill-available' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        .lightbox {
          display: ${lightboxOpen ? 'flex' : 'none'};
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.8);
          align-items: center;
          justify-content: center;
        }
        .lightbox-image {
          display: block;
          margin: auto;
          max-width: 90%;
          max-height: 90%;
        }
        .close {
          color: #fff;
          font-size: 3em;
          position: absolute;
          top: 20px;
          right: 30px;
          cursor: pointer;
        }
      `}</style>

      <section
        className="py-24 transition-colors duration-200"
        style={{ backgroundColor: containerBackground }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid gap-2.5">
            <h2
              className="w-full text-center text-4xl font-bold leading-normal transition-colors duration-200"
              style={{
                color: headingColor,
                fontFamily: headingFont
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="w-full text-center text-lg font-normal leading-8 transition-colors duration-200"
                style={{
                  color: bodyTextColor,
                  fontFamily: bodyFont
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Filter UI - only show if enabled and have enough images */}
          {showFilter && allGalleryItems.length >= 5 && (
            <div className="mt-12 mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search gallery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors"
                    style={{
                      borderColor: currentTheme.mode === 'light' ? '#D1D5DB' : '#374151',
                      backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                      color: bodyTextColor,
                      fontFamily: bodyFont
                    }}
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} style={{ color: bodyTextColor }} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors"
                    style={{
                      borderColor: currentTheme.mode === 'light' ? '#D1D5DB' : '#374151',
                      backgroundColor: currentTheme.mode === 'light' ? '#FFFFFF' : '#1F2937',
                      color: bodyTextColor,
                      fontFamily: bodyFont
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>

                  {/* Clear Button */}
                  {(searchTerm || sortBy !== 'newest') && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm rounded-lg hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: currentTheme.mode === 'light' ? '#F3F4F6' : '#374151',
                        color: bodyTextColor,
                        fontFamily: bodyFont
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results Count */}
              {(searchTerm || sortBy !== 'newest') && (
                <div className="text-sm text-center" style={{ color: metaTextColor, fontFamily: bodyFont }}>
                  Showing {displayItems.length} of {sortedItems.length} image{sortedItems.length !== 1 ? 's' : ''}
                  {sortedItems.length !== allGalleryItems.length && ` (filtered from ${allGalleryItems.length} total)`}
                </div>
              )}
            </div>
          )}

          {/* Gallery Layout */}
          {renderGalleryLayout()}

          {/* Empty State */}
          {displayItems.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                No images found matching your criteria.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-lg font-medium transition-all hover:opacity-90 flex items-center justify-center gap-2 mx-auto"
                style={{
                  backgroundColor: headingColor,
                  color: containerBackground,
                  fontFamily: bodyFont
                }}
              >
                <ChevronDown className="w-5 h-5" />
                Load More ({sortedItems.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {/* Lightbox */}
          {lightboxOpen && (
            <div className="lightbox" onClick={handleLightboxClick}>
              <span className="close" onClick={closeLightbox}>&times;</span>
              <img
                src={lightboxImage}
                alt="Gallery image"
                className="lightbox-image"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}