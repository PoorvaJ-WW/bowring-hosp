// Generated page-specific component for gallery
// This component is isolated - changes here only affect the gallery page
// JSON-DRIVEN CTASimpleCentered Template - Simple Direct Editing
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
  getSecondaryButtonColor
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
    c.id === componentId || c.type === 'cta-simple-centered'
  );
};

export default function CTASimpleCenteredGalleryGallery(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'cta-simple-centered',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from preview or JSON metadata
  const componentData = previewContent ? { content: previewContent } : getComponentContent(pageSlug, componentId);
  const content = componentData?.content || {};

  // Standardized field names with comprehensive fallbacks
  const {
    headline = 'Ready to get started?',
    subheadline = 'Start today',
    description = 'Start your journey with us today and experience the difference.',
    cta_primary = { text: 'Get started', href: '#' },
    cta_secondary = { text: 'Learn more', href: '#' }
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color helpers using standardized color utilities
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const subheadlineColor = getDescriptionColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const secondaryButtonColor = getSecondaryButtonColor({ theme: currentTheme });

  // Normalize CTA data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);

  return (
    <div 
      className="relative py-16 sm:py-24 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-2xl text-center">
        {subheadline && (
          <p
            className={`text-base/7 font-semibold transition-colors duration-200 mb-2 ${getEditableClasses()}`}
            style={{
              color: subheadlineColor,
              fontFamily: getFontFamily(currentTheme, 'body')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'CTA Subheadline');
              },
              "Click to edit CTA subheadline"
            )}
          >
            {subheadline}
          </p>
        )}

        <h2
          className={`text-balance text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
          style={{
            color: headlineColor,
            fontFamily: getFontFamily(currentTheme, 'heading')
          }}
          {...getEditableProps(
            (e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'headline', headline, 'CTA Headline');
            },
            "Click to edit CTA headline"
          )}
        >
          {headline}
        </h2>

        {description && (
          <p
            className={`mx-auto mt-6 max-w-xl text-pretty text-lg/8 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: descriptionColor,
              fontFamily: getFontFamily(currentTheme, 'body')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'CTA Description');
              },
              "Click to edit CTA description"
            )}
          >
            {description}
          </p>
        )}
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {cta_primary && (
            <div className="rounded-md shadow">
              <a
                href={primaryCTA.link}
                className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  backgroundColor: primaryButtonBackground,
                  color: primaryButtonText,
                  fontFamily: getFontFamily(currentTheme, 'body'),
                  outlineColor: primaryButtonBackground
                }}
                {...getEditableProps(
                  (e) => {
                    e.preventDefault();
                    editWithAI(pageSlug, componentId, 'cta_primary.text', primaryCTA.text, 'Primary Button Text');
                  },
                  "Click to edit button text"
                )}
              >
                {primaryCTA.text}
              </a>
            </div>
          )}

          {cta_secondary && (
            <div className="rounded-md shadow">
              <a
                href={secondaryCTA.link}
                className={`text-sm font-semibold leading-6 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: secondaryButtonColor,
                  fontFamily: getFontFamily(currentTheme, 'body')
                }}
                {...getEditableProps(
                  (e) => {
                    e.preventDefault();
                    editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Link Text');
                  },
                  "Click to edit link text"
                )}
              >
                {secondaryCTA.text} <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
