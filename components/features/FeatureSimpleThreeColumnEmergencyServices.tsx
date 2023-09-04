// Generated page-specific component for emergency-services
// This component is isolated - changes here only affect the emergency-services page
//app/components/website/components/features/FeatureSimpleThreeColumn.tsx
// JSON-DRIVEN FeatureSimpleThreeColumn Template - Simple Direct Editing
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
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getFeatureNameColor,
  getFeatureDescriptionColor,
  getIconColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

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
    c.id === componentId || c.type === 'feature-simple-three-column'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureSimpleThreeColumnEmergencyServicesEmergencyServices(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'feature-simple-three-column',
    theme: propTheme,
    backgroundType,
    previewContent
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
      console.error(`FeatureSimpleThreeColumn: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // Provide default values for required properties
  const {
    headline = 'Discover Our Features',
    subheadline = 'Everything You Need',
    description = 'Comprehensive features designed to help you succeed and achieve your goals',
    features = [
      {
        title: 'Feature 1',
        description: 'Description for feature 1 highlighting its key benefits and value',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 2',
        description: 'Description for feature 2 highlighting its key benefits and value',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 3',
        description: 'Description for feature 3 highlighting its key benefits and value',
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
  const iconColor = getIconColor({ theme: currentTheme });

  return (
    <div 
      className="bg-white py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: titleColor,
              fontFamily: getFontFamily(currentTheme, 'heading'),
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
            className={`mt-2 text-lg leading-8 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: subtitleColor,
              fontFamily: getFontFamily(currentTheme, 'body'),
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
          
          {description && (
            <p
              className="mt-6 text-lg leading-8 transition-colors duration-200 cursor-pointer hover:opacity-80"
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body'),
              }}
              onClick={(e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'Description');
              }}
              title="Click to edit description"
            >
              {description}
            </p>
          )}
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon ? resolveIcon(feature.icon) : null;
              return (
                <div key={index} className="text-left">
                  <div className="flex items-center">
                    {IconComponent && (
                      <IconComponent 
                        className="h-8 w-8 transition-colors duration-200 mr-2"
                        style={{ color: iconColor }}
                        aria-hidden="true"
                      />
                    )}
                    
                    <dt
                      className="text-base font-semibold leading-7 transition-colors duration-200 feature-title cursor-pointer hover:opacity-80"
                      style={{
                        color: featureNameColor,
                        fontFamily: getFontFamily(currentTheme, 'heading'),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `features.${index}.title`, feature.title, `Feature ${index + 1} Title`);
                      }}
                      title="Click to edit feature title"
                    >
                      {feature.title}
                    </dt>
                  </div>
                  
                  <dd
                    className="mt-4 text-base leading-7 transition-colors duration-200 feature-description cursor-pointer hover:opacity-80"
                    style={{
                      color: featureDescriptionColor,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `features.${index}.description`, feature.description, `Feature ${index + 1} Description`);
                    }}
                    title="Click to edit feature description"
                  >
                    {feature.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};
