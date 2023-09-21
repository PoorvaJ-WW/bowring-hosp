// Generated page-specific component for departments-and-specialties
// This component is isolated - changes here only affect the departments-and-specialties page
// JSON-DRIVEN FeatureListCard Template - Simple Direct Editing
'use client';

import React from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily } from '@/utils/themeUtils';
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
  getAccentColor
} from '@/utils/colorUtils';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'feature-list-card'
  );
};

interface Props {
  pageSlug?: string;         // Optional for preview
  componentId?: string;      // Optional - defaults to component type
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function FeatureListCardDepartmentsAndSpecialtiesDepartmentsAndSpecialties(props: Props) {
  const { pageSlug, componentId = 'feature-list-card', theme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = theme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('FeatureListCard: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`FeatureListCard: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  const {
    headline = "What sets us apart from others",
    subheadline = "Our Features",
    description = "We provide all the advantages that can simplify all your financial transactions without any further requirements",
    features = [
      {
        title: "Events",
        description: "Experience the value of our events, which are designed to provide you with the knowledge, resources, and connections you need to succeed.",
        icon: "chart",
        link: { text: "Read more", url: "#" }
      },
      {
        title: "Coaching",
        description: "Our focus on coaching ensures that you have access to the support and resources you need to succeed, no matter where you are in your journey.",
        icon: "clipboard",
        link: { text: "Read more", url: "#" }
      },
      {
        title: "Result",
        description: "Experience the value of our platform's performance and trackable results, which help you make informed decisions and optimize your business strategy.",
        icon: "document",
        link: { text: "Read more", url: "#" }
      }
    ],
    backgroundType: contentBackgroundType = 'primary',
    customBackgroundColor,
    cardBackgroundColor,
    iconBackgroundColor,
    styles = {}
  } = content;

  // Override backgroundType with prop if provided
  const finalBackgroundType = backgroundType || contentBackgroundType || 'primary';
  const finalContent = {
    ...content,
    backgroundType: finalBackgroundType
  };

  // Use color utilities from colorUtils
  const backgroundColor = finalBackgroundType === 'custom'
    ? customBackgroundColor
    : getContainerBackgroundColor({ theme: currentTheme, content: finalContent });

  const defaultCardBgColor = cardBackgroundColor || getFeatureCardBackgroundColor({ theme: currentTheme });
  const defaultIconBgColor = iconBackgroundColor || getAccentColor({ theme: currentTheme }) + '20';

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          {subheadline && (
            <p
              className={`text-base font-semibold leading-7 mb-2 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: styles.subheadline?.color || getSubtitleColor({ theme: currentTheme }),
                fontFamily: styles.subheadline?.fontFamily || getFontFamily(currentTheme, 'heading'),
                fontSize: styles.subheadline?.fontSize
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
            className={`text-3xl text-center font-bold mb-5 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: styles.title?.color || getTitleColor({ theme: currentTheme }),
              fontFamily: styles.title?.fontFamily || getFontFamily(currentTheme, 'heading'),
              fontSize: styles.title?.fontSize
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
              className={`text-lg font-normal leading-7 lg:max-w-2xl lg:mx-auto transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: styles.description?.color || getDescriptionColor({ theme: currentTheme }),
                fontFamily: styles.description?.fontFamily || getFontFamily(currentTheme, 'body'),
                fontSize: styles.description?.fontSize
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
        <div className="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-md:max-w-md max-md:mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative w-full rounded-2xl transition-all duration-500 py-16 px-9 md:w-2/5 xl:w-1/3"
              style={{ backgroundColor: defaultCardBgColor }}
            >
              <div 
                className="rounded-full flex justify-center items-center mb-6 w-16 h-16 mx-auto"
                style={{ backgroundColor: defaultIconBgColor }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M4.27745 25.6663V10.9295C4.27745 9.57301 5.14801 8.47336 6.2219 8.47336H6.70801C7.78189 8.47336 8.65245 9.57301 8.65245 10.9295V25.6663M12.0552 25.6663V4.78915C12.0552 3.43266 12.9258 2.33301 13.9997 2.33301H14.4858C15.5597 2.33301 16.4302 3.43266 16.4302 4.78915V25.6663M19.833 25.6663V15.8418C19.833 14.4853 20.7036 13.3856 21.7775 13.3856H22.2636C23.3374 13.3856 24.208 14.4853 24.208 15.8418V25.6663M19.833 25.6663H2.33301M19.833 25.6663H24.208M24.208 25.6663H25.6663" 
                    stroke={getAccentColor({ theme: currentTheme })} 
                    strokeWidth="1.6" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h4
                className={`text-xl font-medium mb-3 capitalize transition-all duration-500 text-center ${getEditableClasses()}`}
                style={{
                  color: styles.featureTitle?.color || getFeatureNameColor({ theme: currentTheme }),
                  fontFamily: styles.featureTitle?.fontFamily || getFontFamily(currentTheme, 'heading'),
                  fontSize: styles.featureTitle?.fontSize
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
                className={`text-sm font-normal transition-all duration-500 leading-5 text-center mb-6 ${getEditableClasses()}`}
                style={{
                  color: styles.featureDescription?.color || getFeatureDescriptionColor({ theme: currentTheme }),
                  fontFamily: styles.featureDescription?.fontFamily || getFontFamily(currentTheme, 'body'),
                  fontSize: styles.featureDescription?.fontSize
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
              {feature.link && (
                <a 
                  href={feature.link.url}
                  className="group flex justify-center items-center gap-2 text-sm font-semibold transition-all duration-500"
                  style={{
                    color: styles.link?.color || getAccentColor({ theme: currentTheme }),
                    fontFamily: styles.link?.fontFamily || getFontFamily(currentTheme, 'body')
                  }}
                >
                  {feature.link.text}
                  <svg 
                    className="transition-all duration-500 group-hover:translate-x-1" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 18 18" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M2.25 9L14.25 9M10.5 13.5L14.4697 9.53033C14.7197 9.28033 14.8447 9.15533 14.8447 9C14.8447 8.84467 14.7197 8.71967 14.4697 8.46967L10.5 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
