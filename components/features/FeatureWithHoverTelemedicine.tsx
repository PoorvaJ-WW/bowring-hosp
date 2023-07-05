// Generated page-specific component for telemedicine
// This component is isolated - changes here only affect the telemedicine page
// JSON-DRIVEN FeatureWithHover Template - Simple Direct Editing
'use client';

import React from 'react';
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
  getAccentColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-with-hover'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureWithHoverTelemedicineTelemedicine(props: Props) {
  const { pageSlug, componentId = 'feature-with-hover', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureWithHover: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureWithHover: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = 'Discover Our Features',
    subheadline = 'Why Choose Us',
    description = 'Explore the powerful features that make our solution stand out',
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
  const defaultHoverColor = getAccentColor({ theme: currentTheme });

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-14 text-center">
          {subheadline && (
            <p
              className={`text-base font-semibold leading-7 mb-2 transition-colors duration-200 ${getEditableClasses()}`}
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
            </p>
          )}
          <h2
            className={`text-4xl text-center font-bold leading-[3.25rem] mb-5 lg:max-w-3xl lg:mx-auto transition-colors duration-200 ${getEditableClasses()}`}
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
              className={`text-lg font-normal leading-[1.8rem] max-w-lg md:max-w-3xl mx-auto transition-colors duration-200 ${getEditableClasses()}`}
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
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8 mx-auto max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-full">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative w-full bg-transparent rounded-2xl p-4 md:p-6 transition-all duration-500 md:h-72 xl:p-8 hover:bg-opacity-90"
              style={{
                '--hover-bg-color': defaultHoverColor,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = defaultHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div 
                className="rounded-2xl flex justify-center items-center mb-3 md:mb-5 w-14 md:w-20 h-14 md:h-20 transition-all duration-500 group-hover:bg-white"
                style={{
                  backgroundColor: subtitleColor + '20'
                }}
              >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z" 
                    stroke={subtitleColor} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4
                className={`text-lg font-semibold leading-7 mb-3 capitalize transition-all duration-500 group-hover:text-white ${getEditableClasses()}`}
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
                className={`text-sm font-normal transition-all duration-500 leading-[1.3rem] group-hover:text-white ${getEditableClasses()}`}
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
          ))}
        </div>
      </div>
    </section>
  );
};


