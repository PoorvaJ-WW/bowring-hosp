// Generated page-specific component for infrastructure
// This component is isolated - changes here only affect the infrastructure page
// JSON-DRIVEN FeatureSplitWithImage Template - Simple Direct Editing
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily
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
  getBorderColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-split-with-image'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureSplitWithImageInfrastructureInfrastructure(props: Props) {
  const { pageSlug, componentId = 'feature-split-with-image', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureSplitWithImage: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureSplitWithImage: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = 'Powerful Features That Drive Results',
    description = 'Discover how our comprehensive features can help transform your business and achieve your goals',
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
      },
      {
        title: 'Feature 4',
        description: 'Description for feature 4 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      }
    ],
    image = {
      src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
      alt: 'Feature image'
    }
  } = content;
  
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
  const defaultBorderColor = getBorderColor({ theme: currentTheme });

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-6 lg:flex-row lg:justify-between">
          <div className="w-full max-w-lg lg:max-w-full lg:w-1/2">
            <div 
              className="pb-8 lg:pb-14 mb-8 lg:mb-14 grid gap-8"
              style={{ 
                borderBottom: `1px solid ${defaultBorderColor}` 
              }}
            >
              <h2
                className={`text-4xl text-center font-bold leading-[3.25rem] lg:text-left transition-colors duration-200 ${getEditableClasses()}`}
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
              <p
                className={`text-base font-normal transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: descriptionColor,
                  fontFamily: getFontFamily(currentTheme, 'body')
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
            <div className="flex flex-wrap justify-center items-center gap-y-12 lg:justify-between">
              {features.map((feature, index) => (
                <div key={index} className="w-full lg:w-2/4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" 
                          stroke={subtitleColor} 
                          strokeWidth="1.6" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="block">
                      <h4
                        className={`mb-3 text-base font-medium transition-colors duration-200 ${getEditableClasses()}`}
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
                        className={`text-xs font-normal leading-6 transition-colors duration-200 ${getEditableClasses()}`}
                        style={{
                          color: featureDescriptionColor,
                          fontFamily: getFontFamily(currentTheme, 'body')
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
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-14">
            <div
              className={`transition-opacity duration-200 ${getEditableClasses()}`}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image.src', image.src, 'Feature Image', 'image');
                },
                "Click to edit feature image"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={450}
                className="mx-auto lg:mx-0 lg:w-full rounded-3xl object-cover"
                style={{ borderRadius: '24px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


