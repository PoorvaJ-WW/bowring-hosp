// Generated page-specific component for patient-care
// This component is isolated - changes here only affect the patient-care page
// JSON-DRIVEN FeatureWithBorderLayout Template - Simple Direct Editing
'use client';

import React from 'react';
import { CheckCircle, LucideIcon } from 'lucide-react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as SolidHeroIcons from '@heroicons/react/24/solid';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily,
  resolveIconComponent
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

// Define the types locally
interface IconData {
  name: string;
  style?: 'outline' | 'solid';
}

interface FeatureItem {
  title: string;
  description: string;
  icon?: string | IconData;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-with-border-layout'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureWithBorderLayoutPatientCarePatientCare(props: Props) {
  const { pageSlug, componentId = 'feature-with-border-layout', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureWithBorderLayout: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureWithBorderLayout: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // Provide default values for required properties
  const {
    headline = 'Discover Our Comprehensive Features',
    subheadline = 'Everything You Need',
    description = 'Explore our powerful features designed to help you succeed and achieve your business goals',
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
      },
      {
        title: 'Feature 5',
        description: 'Description for feature 5 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 6',
        description: 'Description for feature 6 highlighting its key benefits and value proposition',
        icon: 'CheckCircle'
      }
    ]
  } = content;

  // Create icon resolver using the utility function
  const resolveIcon = (iconProp: string | IconData | undefined): LucideIcon => {
    return resolveIconComponent(
      iconProp,
      { outline: HeroIcons, solid: SolidHeroIcons },
      CheckCircle
    );
  };

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
        <div className="mb-14 text-center">
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
            className={`text-4xl text-center font-bold leading-[3.25rem] mb-5 max-w-full lg:max-w-3xl lg:mx-auto transition-colors duration-200 ${getEditableClasses()}`}
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
              className={`text-lg font-normal leading-[1.8rem] lg:max-w-3xl lg:mx-auto transition-colors duration-200 ${getEditableClasses()}`}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {features.map((feature, index) => {
            const isLastRow = index >= features.length - (features.length % 3 === 0 ? 3 : features.length % 3);
            const isLastInRow = (index + 1) % 3 === 0 || index === features.length - 1;
            const isLastInMdRow = (index + 1) % 2 === 0 || index === features.length - 1;
            const IconComponent = feature.icon ? resolveIcon(feature.icon) : CheckCircle;
            const iconName = typeof feature.icon === 'string' ? feature.icon : feature.icon?.name || 'CheckCircle';

            return (
              <div
                key={index}
                className={`relative w-full bg-transparent p-5 text-center transition-all duration-500 xl:p-10 ${
                  !isLastRow ? 'border-b' : ''
                } ${
                  !isLastInRow ? 'xl:border-r lg:border-r' : ''
                } ${
                  !isLastInMdRow ? 'md:border-r' : ''
                } ${
                  !isLastRow ? 'md:border-b' : ''
                }`}
                style={{
                  borderColor: defaultBorderColor,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderTop: 'none',
                  borderLeft: 'none'
                }}
              >
                <div
                  className={`flex justify-center items-center mx-auto mb-5 w-10 h-10 transition-all duration-500 ${getEditableClasses()}`}
                  {...getEditableProps(
                    (e: React.MouseEvent) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.icon`, iconName, `Feature ${index + 1} Icon`, 'icon');
                    },
                    "Click to edit icon"
                  )}
                >
                  {IconComponent && (
                    <IconComponent
                      className="h-10 w-10 transition-colors duration-200"
                      style={{ color: titleColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h4
                  className={`text-lg font-medium leading-7 mb-3 capitalize transition-all duration-500 ${getEditableClasses()}`}
                  style={{
                    color: featureNameColor,
                    fontFamily: getFontFamily(currentTheme, 'heading')
                  }}
                  {...getEditableProps(
                    (e: React.MouseEvent) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.title`, feature.title, `Feature ${index + 1} Title`);
                    },
                    "Click to edit feature title"
                  )}
                >
                  {feature.title}
                </h4>
                <p
                  className={`text-sm font-normal transition-all duration-500 leading-[1.4rem] ${getEditableClasses()}`}
                  style={{
                    color: featureDescriptionColor,
                    fontFamily: getFontFamily(currentTheme, 'body')
                  }}
                  {...getEditableProps(
                    (e: React.MouseEvent) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.description`, feature.description, `Feature ${index + 1} Description`);
                    },
                    "Click to edit feature description"
                  )}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


