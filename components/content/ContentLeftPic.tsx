// Generated page-specific component for espresso-based-classics
// This component is isolated - changes here only affect the espresso-based-classics page
// JSON-DRIVEN ContentLeftPic Template - Beautiful Modern Design
'use client';

import { type FC } from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeImageData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;

  return page.components?.find((c: any) =>
    c.id === componentId || c.type === 'content-left-pic'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentLeftPicEspressoBasedClassicsEspressoBasedClassics(props: Props) {
  const { pageSlug = 'home', componentId = 'content-left-pic', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from preview or JSON metadata
  let content = previewContent;

  if (!content && pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }

  if (!content || Object.keys(content).length === 0) {
    console.error(`ContentLeftPic: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Client Testimonial',
    description = '"I always feel like I\'m in a safe space that\'s judgement-free during my sessions with Dominique and I genuinely appreciate all of the advice she gives. She\'s helped me find realistic ways to cope with my anxiety while shining a light into my past to address various behavioral patterns that I\'ve developed. I highly recommend her to anyone who\'s going through anything, no matter how small it may seem, as she has taught me that no problem is too small to address when it comes to healing your mind, body, and soul."',
    attribution = '- N.E.',
    image = {
      src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
      alt: 'Client testimonial'
    }
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Use color utilities from colorUtils
  const containerBgColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const subtitleColor = getSubtitleColor({ theme: currentTheme });
  const normalizedImage = normalizeImageData(image);

  return (
    <section
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient orbs */}
        <div 
          className="absolute -top-48 -left-48 w-96 h-96 rounded-full blur-3xl opacity-10 transition-colors duration-200"
          style={{ backgroundColor: titleColor }}
        />
        <div 
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10 transition-colors duration-200"
          style={{ backgroundColor: subtitleColor }}
        />
        <div 
          className="absolute -bottom-32 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-200"
          style={{ backgroundColor: titleColor }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Section - Takes up 5 columns */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md group">
              {/* Animated gradient border effect */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-40 blur-lg group-hover:opacity-60 transition-all duration-500 animate-pulse"
                style={{ 
                  background: `linear-gradient(135deg, ${subtitleColor}40, ${titleColor}40, ${subtitleColor}40)`
                }}
              />
              
              {/* Decorative corner accents */}
              <div 
                className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 rounded-tl-2xl transition-all duration-300 group-hover:w-24 group-hover:h-24 group-hover:-top-5 group-hover:-left-5"
                style={{ borderColor: titleColor }}
              />
              <div 
                className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 rounded-br-2xl transition-all duration-300 group-hover:w-24 group-hover:h-24 group-hover:-bottom-5 group-hover:-right-5"
                style={{ borderColor: subtitleColor }}
              />

              {/* Main image container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                {/* Inner shadow overlay for depth */}
                <div className="absolute inset-0 shadow-inner pointer-events-none z-10" />
                
                {normalizedImage?.src ? (
                  <img
                    src={normalizedImage.src}
                    alt={normalizedImage.alt || 'Content Image'}
                    className={`w-full h-auto object-cover aspect-square transition-all duration-500 group-hover:scale-105 ${getEditableClasses()}`}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Content Image', 'image');
                      },
                      "Click to edit image"
                    )}
                  />
                ) : (
                  <div
                    className={`w-full h-auto aspect-square flex items-center justify-center transition-colors duration-200 ${getEditableClasses()}`}
                    style={{ backgroundColor: subtitleColor + '10' }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, 'image.src', '', 'Content Image', 'image');
                      },
                      "Click to add image"
                    )}
                  >
                    <span
                      className="text-lg font-medium transition-colors duration-200"
                      style={{ color: subtitleColor }}
                    >
                      Content Image
                    </span>
                  </div>
                )}
                
                {/* Decorative shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none transform -translate-x-full group-hover:translate-x-full" 
                  style={{ transitionProperty: 'opacity, transform', transitionDuration: '500ms' }}
                />
              </div>
            </div>
          </div>

          {/* Content Section - Takes up 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            {/* Decorative line above heading */}
            <div className="flex items-center gap-4">
              <div 
                className="h-1 w-16 rounded-full transition-all duration-300 hover:w-24"
                style={{ backgroundColor: titleColor }}
              />
              <div 
                className="h-1 w-8 rounded-full transition-colors duration-200"
                style={{ backgroundColor: subtitleColor + '60' }}
              />
            </div>

            {/* Heading with enhanced styling */}
            <div className="space-y-2">
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-200 hover:translate-x-1 ${getEditableClasses()}`}
                style={{
                  color: titleColor,
                  fontFamily: getFontFamily(currentTheme, 'heading'),
                  textShadow: `0 2px 20px ${titleColor}15`
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
              </h2>
              
              {/* Subtle underline decoration */}
              <div 
                className="h-1 w-24 rounded-full transition-all duration-300"
                style={{ backgroundColor: subtitleColor }}
              />
            </div>

            {/* Quote/Description with enhanced styling */}
            <div className="relative">
              {/* Large decorative quote mark */}
              <div 
                className="absolute -top-4 -left-2 text-8xl font-serif leading-none opacity-10 transition-colors duration-200"
                style={{ color: titleColor }}
              >
                "
              </div>
              
              <div className="relative pl-8">
                <p
                  className={`text-base sm:text-lg lg:text-xl leading-relaxed transition-all duration-200 ${getEditableClasses()}`}
                  style={{
                    color: descriptionColor,
                    fontFamily: getFontFamily(currentTheme, 'body'),
                    textShadow: `0 1px 10px ${descriptionColor}10`
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, 'description', description, 'Description');
                    },
                    "Click to edit description"
                  )}
                >
                  {description}
                </p>
              </div>
              
              {/* Closing quote mark */}
              <div 
                className="absolute -bottom-8 right-4 text-8xl font-serif leading-none opacity-10 transition-colors duration-200"
                style={{ color: titleColor }}
              >
                "
              </div>
            </div>

            {/* Decorative elements at bottom */}
            <div className="flex items-center gap-2 pt-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === 2 ? '32px' : '8px',
                    backgroundColor: i === 2 ? titleColor : subtitleColor + '40',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom keyframe animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}