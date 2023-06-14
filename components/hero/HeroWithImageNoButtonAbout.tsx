// Generated page-specific component for about
// This component is isolated - changes here only affect the about page
// JSON-DRIVEN HeroWithImageNoButton Template - Enhanced Hero section without CTA buttons
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeImageData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;

  return page.components?.find((c: any) =>
    c.id === componentId || c.type === 'hero-with-image-no-button'
  );
};

export default function HeroWithImageNoButtonAboutAbout(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-with-image-no-button',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;

  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Initialize state at the top level before any conditional returns
  const [imageError, setImageError] = useState(false);

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }
  
  // Content validation
  if (!content || Object.keys(content).length === 0) {
    console.error(`HeroWithImageNoButton: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here to explain your product or service',
    image = { src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png', alt: 'Hero image' },
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color and style helpers using standardized color utilities
  const containerBackgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const subheadlineColor = getDescriptionColor({ theme: currentTheme });

  // Normalize data
  const normalizedImage = normalizeImageData(image);

  return (
    <div
      className="relative overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div 
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${headlineColor}15 0%, transparent 70%)`,
            animationDuration: '8s'
          }}
        />
        <div 
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${subheadlineColor}15 0%, transparent 70%)`,
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center min-h-[85vh] lg:min-h-[90vh]">
          {/* Image side - appears first on mobile */}
          <div className="relative lg:h-full px-6 pt-12 pb-8 lg:py-0 lg:px-8 lg:order-2">
            <div className="relative h-full min-h-[300px] lg:min-h-full flex items-center justify-center">
              {/* Image container with dramatic styling */}
              <div className="relative w-full max-w-2xl mx-auto group perspective-1000">
                {/* Decorative border elements that match image proportions */}
                <div 
                  className="absolute -inset-4 border-2 rounded-3xl opacity-30 pointer-events-none"
                  style={{ borderColor: headlineColor }}
                />
                <div 
                  className="absolute -inset-6 border border-dashed rounded-3xl opacity-20 pointer-events-none"
                  style={{ borderColor: subheadlineColor }}
                />

                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1"
                  style={{
                    boxShadow: `0 25px 50px -12px ${headlineColor}40, 0 0 100px ${headlineColor}10`
                  }}
                >
                  {!imageError ? (
                    <div
                      className={`relative ${getEditableClasses()}`}
                      style={{ aspectRatio: '4/3' }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Hero Image', 'image');
                        },
                        "Click to edit hero image"
                      )}
                    >
                      {/* Gradient overlay on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10"
                        style={{
                          background: `linear-gradient(135deg, ${headlineColor}80 0%, ${subheadlineColor}80 100%)`
                        }}
                      />
                      
                      <Image
                        src={normalizedImage.src}
                        alt={normalizedImage.alt}
                        fill
                        priority
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${getEditableClasses()}`}
                      style={{
                        aspectRatio: '4/3',
                        backgroundColor: containerBackgroundColor,
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'image.src', '', 'Hero Image', 'image');
                        },
                        "Click to add image"
                      )}
                    >
                      <span 
                        className="text-lg font-medium"
                        style={{ color: subheadlineColor, opacity: 0.6 }}
                      >
                        Click to add image
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating accent elements */}
                <div 
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl pointer-events-none animate-pulse"
                  style={{ 
                    backgroundColor: headlineColor,
                    opacity: 0.15,
                    animationDuration: '6s'
                  }}
                />
                <div 
                  className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-2xl pointer-events-none animate-pulse"
                  style={{ 
                    backgroundColor: subheadlineColor,
                    opacity: 0.12,
                    animationDuration: '8s',
                    animationDelay: '1s'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content side - appears second on mobile */}
          <div className="px-6 pb-12 lg:py-32 lg:px-8 relative z-10 lg:order-1">
            <div className="mx-auto max-w-xl lg:max-w-none">
              {/* Decorative element */}
              <div 
                className="w-20 h-1 mb-8 rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${headlineColor} 0%, transparent 100%)`
                }}
              />
              
              <h1
                className={`text-balance text-5xl font-semibold tracking-tight sm:text-7xl ${getEditableClasses()}`}
                style={{
                  color: headlineColor,
                  fontFamily: getFontFamily(currentTheme, 'heading'),
                  textShadow: `0 0 60px ${headlineColor}20`,
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'headline', headline, 'Headline');
                  },
                  "Click to edit headline"
                )}
              >
                {headline}
              </h1>

              <p
                className={`mt-8 text-pretty text-lg font-medium sm:text-xl/8 ${getEditableClasses()}`}
                style={{
                  color: subheadlineColor,
                  fontFamily: getFontFamily(currentTheme, 'body'),
                  opacity: 0.9,
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'Subheadline');
                  },
                  "Click to edit subheadline"
                )}
              >
                {subheadline}
              </p>

              {/* Decorative stats or dots */}
              <div className="mt-16 flex gap-8 items-center">
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: headlineColor,
                        opacity: 0.6 - (i * 0.2)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
