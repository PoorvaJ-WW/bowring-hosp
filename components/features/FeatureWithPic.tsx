// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// JSON-DRIVEN FeatureWithPic Template - Simple Direct Editing
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
  getFeatureDescriptionColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-with-pic'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureWithPicHomeHome(props: Props) {
  const { pageSlug, componentId = 'feature-with-pic', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureWithPic: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureWithPic: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = 'Powerful Features',
    subheadline = 'Features',
    description = 'Discover how our comprehensive features can transform your business and help you achieve your goals',
    features = [
      {
        title: 'Feature 1',
        description: 'Description for feature 1 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 2',
        description: 'Description for feature 2 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 3',
        description: 'Description for feature 3 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      }
    ]
  } = content;
  
  // Extract and normalize image
  const image = normalizeImageData(content.image);
  
  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Use color utilities from colorUtils
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const subtitleColor = getSubtitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const featureNameColor = getFeatureNameColor({ theme: currentTheme });
  const featureDescriptionColor = getFeatureDescriptionColor({ theme: currentTheme });

  return (
    <section 
      className="relative py-24 overflow-hidden transition-colors duration-200"
      style={{ backgroundColor }}
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${titleColor} 1px, transparent 1px), linear-gradient(90deg, ${titleColor} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div 
              className="h-px w-12"
              style={{ backgroundColor: subtitleColor, opacity: 0.4 }}
            />
            <span
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: subtitleColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
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
            </span>
            <div 
              className="h-px w-12"
              style={{ backgroundColor: subtitleColor, opacity: 0.4 }}
            />
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: titleColor,
              fontFamily: getFontFamily(currentTheme, 'heading')
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

          {description && (
            <p
              className={`text-lg leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body'),
                opacity: 0.85
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="sticky top-8">
              {/* Image container with unique frame design */}
              <div className="relative group">
                {/* Corner decorations */}
                <div 
                  className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl transition-all duration-300 group-hover:w-20 group-hover:h-20"
                  style={{ borderColor: subtitleColor, opacity: 0.6 }}
                />
                <div 
                  className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl transition-all duration-300 group-hover:w-20 group-hover:h-20"
                  style={{ borderColor: titleColor, opacity: 0.6 }}
                />

                <div
                  className={`relative overflow-hidden rounded-2xl ${getEditableClasses()}`}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, 'image.src', image.src, 'Feature Image', 'image');
                    },
                    "Click to edit feature image"
                  )}
                >
                  {/* Animated border */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                      background: `linear-gradient(45deg, ${subtitleColor}00, ${subtitleColor}40, ${titleColor}40, ${titleColor}00)`,
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 3s ease infinite'
                    }}
                  />

                  <div 
                    className="relative"
                    style={{ aspectRatio: '4/5' }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || 'Feature image'}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Features in cards */}
          <div className="order-1 lg:order-2 space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Feature card with modern design */}
                <div 
                  className="relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl"
                  style={{
                    backgroundColor: `${titleColor}08`,
                    borderLeft: `4px solid ${subtitleColor}`,
                  }}
                >
                  {/* Number badge */}
                  <div 
                    className="absolute -left-3 top-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: subtitleColor,
                      color: backgroundColor,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="pl-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6"
                        style={{
                          backgroundColor: `${subtitleColor}20`,
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path 
                            d="M10 14.7875L12.6544 17.4419C13.0707 17.8582 13.2789 18.0664 13.5376 18.0665C13.7963 18.0666 14.0047 17.8586 14.4214 17.4427L20.625 11.25M12.5 27.5H17.5C22.214 27.5 24.5711 27.5 26.0355 26.0355C27.5 24.5711 27.5 22.214 27.5 17.5V12.5C27.5 7.78595 27.5 5.42893 26.0355 3.96447C24.5711 2.5 22.214 2.5 17.5 2.5H12.5C7.78595 2.5 5.42893 2.5 3.96447 3.96447C2.5 5.42893 2.5 7.78595 2.5 12.5V17.5C2.5 22.214 2.5 24.5711 3.96447 26.0355C5.42893 27.5 7.78595 27.5 12.5 27.5Z" 
                            stroke={subtitleColor} 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <h4
                          className={`text-xl font-semibold mb-2 transition-colors duration-200 ${getEditableClasses()}`}
                          style={{
                            color: featureNameColor,
                            fontFamily: getFontFamily(currentTheme, 'heading')
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
                        </h4>
                        <p
                          className={`text-base leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                          style={{
                            color: featureDescriptionColor,
                            fontFamily: getFontFamily(currentTheme, 'body'),
                            opacity: 0.85
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
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(180deg, ${subtitleColor}, ${titleColor})`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
};