// Generated page-specific component for art-centre
// This component is isolated - changes here only affect the art-centre page
//app/components/website/components/features/FeatureCentered2x2Grid.tsx
// JSON-DRIVEN FeatureCentered2x2Grid Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import { CheckCircle, LucideIcon } from 'lucide-react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as SolidHeroIcons from '@heroicons/react/24/solid';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { IconData } from '@/types/feature';
import { 
  getFontFamily,
  resolveIconComponent
} from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getFeatureNameColor,
  getFeatureDescriptionColor,
  getIconColor
} from '@/utils/colorUtils';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-centered-2x2-grid'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureCentered2x2GridArtCentreArtCentre(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'feature-centered-2x2-grid',
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
      console.error(`FeatureCentered2x2Grid: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = 'Our Features',
    subheadline = 'Everything you need',
    description = 'Comprehensive features designed to help you succeed',
    features = [
      {
        title: 'Feature 1',
        description: 'Description for feature 1',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 2',
        description: 'Description for feature 2',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 3',
        description: 'Description for feature 3',
        icon: 'CheckCircle'
      },
      {
        title: 'Feature 4',
        description: 'Description for feature 4',
        icon: 'CheckCircle'
      }
    ],
    gridLayout = { columns: 2, gap: '2rem' }
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
  const containerBgColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const subtitleColor = getSubtitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const featureNameColor = getFeatureNameColor({ theme: currentTheme });
  const featureDescriptionColor = getFeatureDescriptionColor({ theme: currentTheme });
  const iconColor = getIconColor({ theme: currentTheme });

  return (
    <div 
      className="py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2
            className={`text-base font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
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
          </h2>
          <p
            className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 ${getEditableClasses()}`}
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
          </p>
          <p
            className={`mt-6 text-lg leading-8 transition-colors duration-200 ${getEditableClasses()}`}
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

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl 
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
            style={{ gap: gridLayout.gap }}
          >
            {features.map((feature, index) => {
              const IconComponent = resolveIcon(feature.icon);
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className="flex-shrink-0 rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: titleColor,
                      width: '2.5rem',
                      height: '2.5rem',
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <IconComponent
                        className="h-6 w-6 transition-colors duration-200"
                        style={{
                          color: iconColor
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <dt
                      className={`text-base font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
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
                    </dt>
                    <dd
                      className={`mt-2 text-base leading-7 transition-colors duration-200 ${getEditableClasses()}`}
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
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};
