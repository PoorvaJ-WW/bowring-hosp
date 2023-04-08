// Generated page-specific component for blood-bank
// This component is isolated - changes here only affect the blood-bank page
// JSON-DRIVEN CTASplitWithImage Template - Simple Direct Editing
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
  getSubtitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getPrimaryButtonTextColor,
  getAccentColor
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
    c.id === componentId || c.type === 'cta-split-with-image'
  );
};

export default function CTASplitWithImageBloodBankBloodBank(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'cta-split-with-image',
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

  if (!content || Object.keys(content).length === 0) {
    console.error(`CTASplitWithImage: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Standardized field names with comprehensive fallbacks
  const {
    headline = 'We\'re here to help',
    subheadline = 'Award winning support',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.',
    cta_primary = { text: 'Visit the help center', href: '#' },
    image = {
      src: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply',
      alt: 'CTA Background'
    }
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color helpers using standardized color utilities
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const imageOverlayColor = getPrimaryButtonColor({ theme: currentTheme });
  const subheadlineColor = getSubtitleColor({ theme: currentTheme });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const primaryButtonHover = getAccentColor({ theme: currentTheme });

  // Normalize CTA data
  const primaryCTA = normalizeCTAData(cta_primary);

  return (
    <div 
      className="relative transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div 
        className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2 transition-colors duration-200"
        style={{ backgroundColor: imageOverlayColor }}
      >
        <img
          alt={image.alt || 'CTA Background'}
          src={image.src}
          className={`size-full object-cover transition-opacity duration-200 ${getEditableClasses()}`}
          {...getEditableProps(
            (e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'image.src', image.src, 'Background Image', 'image');
            },
            "Click to edit background image"
          )}
        />
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 w-231.5 transform-gpu blur-[118px]"
        >
          <path
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pr-0 lg:pl-24 xl:pl-32">
          {subheadline && (
            <h2
              className={`text-base/7 font-semibold transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: subheadlineColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'CTA Subheadline');
                },
                "Click to edit subheadline"
              )}
            >
              {subheadline}
            </h2>
          )}

          <p
            className={`mt-2 text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: headlineColor,
              fontFamily: getFontFamily(currentTheme, 'heading')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'CTA Headline');
              },
              "Click to edit headline"
            )}
          >
            {headline}
          </p>

          {description && (
            <p
              className={`mt-6 text-base/7 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body')
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'description', description, 'CTA Description');
                },
                "Click to edit description"
              )}
            >
              {description}
            </p>
          )}
          
          {cta_primary && (
            <div className="mt-8">
              <a
                href={primaryCTA.link}
                className={`inline-flex rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 ${getEditableClasses()}`}
                style={{
                  backgroundColor: primaryButtonBackground,
                  color: primaryButtonText,
                  fontFamily: getFontFamily(currentTheme, 'body'),
                  outlineColor: primaryButtonBackground
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryButtonHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = primaryButtonBackground;
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
        </div>
      </div>
    </div>
  );
}
