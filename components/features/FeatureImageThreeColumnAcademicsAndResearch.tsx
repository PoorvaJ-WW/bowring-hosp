// Generated page-specific component for academics-and-research
// This component is isolated - changes here only affect the academics-and-research page
//app/components/website/components/features/FeatureImageThreeColumn.tsx
// JSON-DRIVEN FeatureImageThreeColumn Template - Simple Direct Editing
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  getFeatureCardBackgroundColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-image-three-column'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureImageThreeColumnAcademicsAndResearchAcademicsAndResearch(props: Props) {
  const { pageSlug, componentId = 'feature-image-three-column', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureImageThreeColumn: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureImageThreeColumn: content not found for ${pageSlug}/${componentId}`);
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

  const FeatureContent = ({ feature, index }: { feature: typeof features[0], index: number }) => {
    return (
      <div className="flex flex-1 flex-col p-6">
        <dt
          className={`text-lg font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
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
        </dt>

        <dd 
          className="mt-2 flex flex-auto flex-col text-base leading-7 transition-colors duration-200"
          style={{ 
            color: featureDescriptionColor,
            fontFamily: styles.featureDescription?.fontFamily || getFontFamily(currentTheme, 'body')
          }}
        >
          <p
            className={`flex-auto ${getEditableClasses()}`}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, `features.${index}.description`, feature.description, `Feature ${index + 1} Description`);
              },
              "Click to edit feature description"
            )}
          >{feature.description}</p>
          
          {feature.link && (
            <p className="mt-4">
              <Link 
                href={feature.link} 
                className="text-sm font-semibold leading-6 transition-colors duration-200"
                style={{ color: featureNameColor }}
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </p>
          )}
        </dd>
      </div>
    );
  };

  return (
    <div 
      className="py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {subheadline && (
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
          )}

          {headline && (
            <p
              className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: titleColor,
                fontFamily: styles.title?.fontFamily || getFontFamily(currentTheme, 'heading')
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
          )}
          
          {description && (
            <p
              className={`mt-6 text-lg leading-8 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: styles.description?.fontFamily || getFontFamily(currentTheme, 'body')
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
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex flex-col rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg duration-200"
                style={{ backgroundColor: featureCardBackgroundColor }}
              >
                <div className="flex-shrink-0">
                  {feature.image && (
                    <div
                      className={`h-48 w-full object-cover relative transition-opacity duration-200 ${getEditableClasses()}`}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `features.${idx}.image.src`, normalizeImageData(feature.image).src, `Feature ${idx + 1} Image`, 'image');
                        },
                        "Click to edit feature image"
                      )}
                    >
                      <Image
                        src={normalizeImageData(feature.image).src}
                        alt={normalizeImageData(feature.image).alt}
                        className="h-48 w-full object-cover"
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                </div>
                <FeatureContent feature={feature} index={idx} />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};


