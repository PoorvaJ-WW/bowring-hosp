// Generated page-specific component for services-and-facilities
// This component is isolated - changes here only affect the services-and-facilities page
// Generated page-specific component for artisanal-bakes
// This component is isolated - changes here only affect the artisanal-bakes page
//app/components/website/components/features/FeatureBigImageNameDetail.tsx
// JSON-DRIVEN FeatureBigImageNameDetail Template - Simple Direct Editing
'use client';

import React from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeImageData
} from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getFeatureNameColor,
  getFeatureDescriptionColor,
  getFeatureCardBackgroundColor,
  getMetaTextColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;

  return page.components?.find((c: any) =>
    c.id === componentId || c.type === 'feature-big-image-name-detail'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureBigImageNameDetailServicesAndFacilities(props: Props) {
  const { pageSlug, componentId = 'feature-big-image-name-detail', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureBigImageNameDetail: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureBigImageNameDetail: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = 'Discover Our Features',
    subheadline = 'Why Choose Us',
    description = 'Explore our comprehensive features designed to help you succeed',
    features = [
      {
        title: 'Feature 1',
        description: 'Description for feature 1 that highlights its key benefits',
        image: {
          src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          alt: 'Feature 1'
        }
      },
      {
        title: 'Feature 2',
        description: 'Description for feature 2 that highlights its key benefits',
        image: {
          src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          alt: 'Feature 2'
        }
      },
      {
        title: 'Feature 3',
        description: 'Description for feature 3 that highlights its key benefits',
        image: {
          src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          alt: 'Feature 3'
        }
      }
    ],
    styles = {}
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Use color utilities from colorUtils
  const containerBackgroundColor = styles.container?.backgroundColor || getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = styles.title?.color || getTitleColor({ theme: currentTheme });
  const subtitleColor = styles.subtitle?.color || getSubtitleColor({ theme: currentTheme });
  const descriptionColor = styles.description?.color || getDescriptionColor({ theme: currentTheme });
  const featureNameColor = styles.featureName?.color || getFeatureNameColor({ theme: currentTheme });
  const featureDescriptionColor = styles.featureDescription?.color || getFeatureDescriptionColor({ theme: currentTheme });
  const featureCardBackgroundColor = styles.featureCard?.backgroundColor || getFeatureCardBackgroundColor({ theme: currentTheme });
  const borderColor = currentTheme?.neutral || '#e5e7eb';

  return (
    <div
      className="relative py-16 sm:py-24 transition-colors duration-200 overflow-hidden"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${titleColor}20 0%, transparent 70%)`,
            animationDuration: '10s'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${subtitleColor}20 0%, transparent 70%)`,
            animationDuration: '12s',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Header Section with enhanced styling */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          {subheadline && (
            <div className="relative inline-block">
              <h2
                className={`text-base font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: subtitleColor,
                  fontFamily: styles.subtitle?.fontFamily || getFontFamily(currentTheme, 'heading')
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
              </h2>
              {/* Decorative underline */}
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full"
                style={{ backgroundColor: subtitleColor, opacity: 0.5 }}
              />
            </div>
          )}

          {headline && (
            <h1
              className={`mt-6 text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: titleColor,
                fontFamily: styles.title?.fontFamily || getFontFamily(currentTheme, 'heading'),
                textShadow: `0 0 40px ${titleColor}15`
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
          )}

          {description && (
            <p
              className={`mt-6 text-lg leading-8 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: styles.description?.fontFamily || getFontFamily(currentTheme, 'body'),
                opacity: 0.9
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
          )}
        </div>

        {/* Features Grid with enhanced cards */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{
                backgroundColor: featureCardBackgroundColor,
                boxShadow: `0 4px 6px -1px ${borderColor}40, 0 2px 4px -1px ${borderColor}30`
              }}
            >
              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 left-0 w-20 h-20 opacity-20 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${titleColor}60 0%, transparent 100%)`
                }}
              />

              {/* Feature Image with overlay effects */}
              <div className="relative overflow-hidden">
                <div
                  className={`relative aspect-[3/4] w-full bg-gray-200 sm:aspect-auto sm:h-96 ${getEditableClasses()}`}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.image.src`, normalizeImageData(feature.image).src, `Feature ${index + 1} Image`, 'image');
                    },
                    "Click to edit feature image"
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${titleColor}80 100%)`
                    }}
                  />
                  
                  <Image
                    src={normalizeImageData(feature.image).src}
                    alt={normalizeImageData(feature.image).alt}
                    className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Floating badge number */}
                <div 
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-20 backdrop-blur-sm"
                  style={{
                    backgroundColor: `${featureCardBackgroundColor}90`,
                    color: titleColor,
                    border: `2px solid ${titleColor}40`
                  }}
                >
                  {index + 1}
                </div>
              </div>

              {/* Feature Details with enhanced spacing */}
              <div className="flex flex-1 flex-col space-y-3 p-6">
                <h3
                  className={`text-lg font-medium transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: featureNameColor,
                    fontFamily: styles.featureName?.fontFamily || getFontFamily(currentTheme, 'heading')
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.title`, feature.title, `Feature ${index + 1} Title`);
                    },
                    "Click to edit feature title"
                  )}
                >
                  {feature.title}
                </h3>

                {/* Decorative divider */}
                <div 
                  className="w-12 h-0.5 rounded-full"
                  style={{ 
                    backgroundColor: titleColor,
                    opacity: 0.3
                  }}
                />

                <p
                  className={`text-sm flex-1 leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: featureDescriptionColor,
                    fontFamily: styles.featureDescription?.fontFamily || getFontFamily(currentTheme, 'body'),
                    opacity: 0.9
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.description`, feature.description, `Feature ${index + 1} Description`);
                    },
                    "Click to edit feature description"
                  )}
                >
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div 
                className="h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ 
                  background: `linear-gradient(90deg, ${titleColor} 0%, ${subtitleColor} 100%)`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
