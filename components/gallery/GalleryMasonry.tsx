// SERVER-FIRST GalleryMasonry Template
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

export default function GalleryMasonry(props: Props) {
  const {
    galleryImages = [],  // USE SERVER-PROVIDED IMAGES
    pageSlug = 'gallery',
    componentId = 'gallery-masonry',
    theme: propTheme,
    content = {},
    maxImages = 20
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
    title = 'Gallery Collection',
    subtitle = 'Browse our visual stories',
    showFilter = true,
    loadMoreIncrement = 6,
    columns = { mobile: 1, tablet: 2, desktop: 3 }
  } = content;

  // Normalize columns object: handle 'default' as alias for 'desktop'
  const normalizedColumns = {
    mobile: columns.mobile || (columns as any).default || 1,
    tablet: columns.tablet || (columns as any).default || 2,
    desktop: columns.desktop || (columns as any).default || 3
  };

  // Default placeholder items for when no server images are available
  const placeholderUrl = 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png';
  const defaultItems: GalleryImage[] = [
    { id: 'default-1', image: { src: placeholderUrl, alt: 'Gallery image 1' }, aspectRatio: 'square', createdAt: new Date().toISOString() },
    { id: 'default-2', image: { src: placeholderUrl, alt: 'Gallery image 2' }, aspectRatio: 'square', createdAt: new Date().toISOString() },
    { id: 'default-3', image: { src: placeholderUrl, alt: 'Gallery image 3' }, aspectRatio: 'square', createdAt: new Date().toISOString() },
    { id: 'default-4', image: { src: placeholderUrl, alt: 'Gallery image 4' }, aspectRatio: 'square', createdAt: new Date().toISOString() },
    { id: 'default-5', image: { src: placeholderUrl, alt: 'Gallery image 5' }, aspectRatio: 'wide', createdAt: new Date().toISOString() },
    { id: 'default-6', image: { src: placeholderUrl, alt: 'Gallery image 6' }, aspectRatio: 'square', createdAt: new Date().toISOString() },
    { id: 'default-7', image: { src: placeholderUrl, alt: 'Gallery image 7' }, aspectRatio: 'square', createdAt: new Date().toISOString() }
  ];

  // Normalize gallery items to handle different formats
  const normalizeGalleryItems = (items: GalleryImage[]): GalleryImage[] => {
    return items.map(item => ({
      ...item,
      // Support multiple possible field names
      url: item.url || item.src || (item as any).imageUrl,
      src: item.src || item.url || (item as any).imageUrl,
      title: item.title || (item as any).name || '',
      alt: item.alt || (item as any).altText || item.title || 'Gallery image',
      description: item.description || item.caption || (item as any).description || '',
      caption: item.caption || item.description || '',
      tags: item.tags || [],
      categories: (item as any).categories || [],
      createdAt: item.createdAt || (item as any).createdAt || new Date().toISOString(),
      publishedAt: item.publishedAt || (item as any).publishedAt || item.createdAt,
      image: item.image || {
        src: item.url || item.src || (item as any).imageUrl || placeholderUrl,
        alt: item.alt || (item as any).altText || item.title || 'Gallery image'
      }
    }));
  };

  // Use server-provided images or fallback to placeholders
  const allGalleryItems = galleryImages && galleryImages.length > 0
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

  // Distribute images into columns for masonry effect
  const distributeImages = () => {
    // Use normalized columns (handles 'default' key and SSR safety)
    const safeColumns = normalizedColumns || { mobile: 1, tablet: 2, desktop: 3 };

    // Determine number of columns based on viewport
    const cols = typeof window !== 'undefined'
      ? (window.innerWidth < 640 ? safeColumns.mobile :
         window.innerWidth < 1024 ? safeColumns.tablet :
         safeColumns.desktop)
      : safeColumns.desktop;

    const columnArrays: GalleryImage[][] = Array.from({ length: cols || 3 }, () => []);

    displayItems.forEach((image, index) => {
      const columnIndex = index % cols;
      columnArrays[columnIndex].push(image);
    });

    return columnArrays;
  };

  const columnArrays = displayItems.length > 0 ? distributeImages() : [];

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

          {/* Masonry Gallery Layout */}
          {displayItems.length > 0 && (
            <div className="mt-16">
              <div className="flex gap-4">
                {columnArrays.map((column, colIndex) => (
                  <div key={colIndex} className="flex-1 space-y-4">
                    {column.map((item) => (
                      <div
                        key={item.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => openLightbox(item.image?.src || placeholderUrl)}
                      >
                        <img
                          src={item.image?.src || placeholderUrl}
                          alt={item.image?.alt || 'Gallery image'}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        {(item.title || item.description) && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              {item.title && <h3 className="text-white font-semibold">{item.title}</h3>}
                              {item.description && (
                                <p className="text-white/80 text-sm mt-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

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