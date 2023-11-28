// Generated page-specific component for departments-and-specialties
// This component is isolated - changes here only affect the departments-and-specialties page
// JSON-DRIVEN HeroSimpleCentered Template - Simple Direct Editing
'use client';

import React from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeCTAData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getPrimaryButtonTextColor,
  getSecondaryButtonColor,
  getFeatureCardBackgroundColor,
  getSecondaryTextColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'hero-simple-centered'
  );
};

export default function HeroSimpleCenteredDepartmentsAndSpecialtiesDepartmentsAndSpecialties(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-simple-centered',
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
  }
  
  // Content validation
  if (!content || Object.keys(content).length === 0) {
    console.error(`HeroSimpleCentered: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here to explain your product or service',
    cta_primary = { text: 'Get Started', link: '#' },
    cta_secondary = { text: 'Learn More', link: '#' },
    announcement = { text: 'Announcing our new feature', link: '#', link_text: 'Learn More' },
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color and style helpers using standardized color utilities
  const containerBackgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const subheadlineColor = getDescriptionColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const secondaryButtonColor = getSecondaryButtonColor({ theme: currentTheme });

  // Normalize CTA data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);

  const getAnnouncementStyle = () => {
    return {
      backgroundColor: getFeatureCardBackgroundColor({ theme: currentTheme }),
      color: getSecondaryTextColor({ theme: currentTheme }),
      fontFamily: getFontFamily(currentTheme, 'body'),
    };
  };

  return (
    <div 
      className="relative isolate px-6 pt-14 lg:px-8"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        {announcement && (
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div
              className={`relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 ${getEditableClasses()}`}
              style={getAnnouncementStyle()}
              {...getEditableProps((e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'announcement.text', announcement.text, 'Announcement Text');
              }, "Click to edit announcement")}
            >
              {announcement.text}{' '}
              <a 
                href={announcement.link}
                className={`whitespace-nowrap font-semibold ${getEditableClasses()}`}
                style={{ color: primaryButtonBackground }}
                {...getEditableProps((e) => {
                  e.preventDefault();
                  editWithAI(pageSlug, componentId, 'announcement.link_text', announcement.link_text, 'Announcement Link Text');
                }, "Click to edit link text")}
              >
                {announcement.link_text} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        )}
        <div className="text-center">
          <h1
            className={`text-4xl font-bold tracking-tight sm:text-6xl ${getEditableClasses()}`}
            style={{
              color: headlineColor,
              fontFamily: getFontFamily(currentTheme, 'heading')
            }}
            {...getEditableProps((e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'headline', headline, 'Headline');
            }, "Click to edit headline")}
          >
            {headline}
          </h1>
          <p
            className={`mt-6 text-lg leading-8 ${getEditableClasses()}`}
            style={{
              color: subheadlineColor,
              fontFamily: getFontFamily(currentTheme, 'body')
            }}
            {...getEditableProps((e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'Subheadline');
            }, "Click to edit subheadline")}
          >
            {subheadline}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {cta_primary && (
              <div className="rounded-md shadow">
                <a
                  href={primaryCTA.link}
                  className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${getEditableClasses()}`}
                  style={{
                    backgroundColor: primaryButtonBackground,
                    color: primaryButtonText,
                    fontFamily: getFontFamily(currentTheme, 'body'),
                    outlineColor: primaryButtonBackground
                  }}
                  {...getEditableProps((e) => {
                    e.preventDefault();
                    editWithAI(pageSlug, componentId, 'cta_primary.text', primaryCTA.text, 'Primary Button Text');
                  }, "Click to edit button text")}
                >
                  {primaryCTA.text}
                </a>
              </div>
            )}
            {cta_secondary && (
              <div className="rounded-md shadow">
                <a
                  href={secondaryCTA.link}
                  className={`text-sm font-semibold leading-6 ${getEditableClasses()}`}
                  style={{
                    color: secondaryButtonColor,
                    fontFamily: getFontFamily(currentTheme, 'body')
                  }}
                  {...getEditableProps((e) => {
                    e.preventDefault();
                    editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Link Text');
                  }, "Click to edit link text")}
                >
                  {secondaryCTA.text} <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
