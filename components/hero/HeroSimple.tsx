// JSON-DRIVEN HeroSimple Template - Simple Direct Editing
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
  getPrimaryButtonColor,
  getPrimaryButtonTextColor,
  getSecondaryButtonColor,
  getSecondaryButtonTextColor,
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

  return page.components?.find((c: any) => c.id === componentId || c.type === 'hero-simple');
};

export default function HeroSimple(props: Props) {
  const { pageSlug, componentId = 'hero-simple', theme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = theme || contextTheme;

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('HeroSimple: pageSlug is required');
      return null;
    }

    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`HeroSimple: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
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
  const subheadlineColor = getSubtitleColor({ theme: currentTheme });

  // Button color helpers
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const secondaryButtonBackground = getSecondaryButtonColor({ theme: currentTheme });
  const secondaryButtonText = getSecondaryButtonTextColor({ theme: currentTheme });

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
      className="relative overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      {/* BEGIN: Dotted Pattern Background */}
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full"
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            className="absolute right-full translate-x-1/4 translate-y-1/4 transform lg:translate-x-1/2"
          >
            <defs>
              <pattern
                id="pattern-right"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#pattern-right)" />
          </svg>
          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            className="absolute left-full -translate-x-1/4 -translate-y-3/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
          >
            <defs>
              <pattern
                id="pattern-left"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#pattern-left)" />
          </svg>
        </div>
      </div>
      {/* END: Dotted Pattern Background */}

      <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="text-center">
          {announcement && (
            <div className="hidden sm:flex justify-center mb-8">
              <div
                className={`relative rounded-full px-3 py-1 text-sm leading-6 transition-colors duration-200 ${getEditableClasses()}`}
                style={getAnnouncementStyle()}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'announcement.text', announcement?.text || '', 'Announcement Text');
                  },
                  "Click to edit announcement"
                )}
              >
                {announcement?.text || ''}{' '}
                <a
                  href={announcement?.link || '#'}
                  className={`whitespace-nowrap font-semibold ${getEditableClasses()}`}
                  style={{ color: primaryButtonBackground }}
                  {...getEditableProps(
                    (e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'announcement.link_text', announcement?.link_text || 'Learn More', 'Announcement Link Text');
                    },
                    "Click to edit link text"
                  )}
                >
                  {announcement?.link_text || 'Learn More'}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          )}

          <h1
            className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: headlineColor,
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
          </h1>

          <p
            className={`mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: subheadlineColor,
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

          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            {cta_primary && (
              <div className="rounded-md shadow">
                <a
                  href={primaryCTA.link}
                  className={`flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium hover:opacity-90 md:px-10 md:py-4 md:text-lg transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    backgroundColor: primaryButtonBackground,
                    color: primaryButtonText,
                    fontFamily: getFontFamily(currentTheme, 'body'),
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
              <div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
                <a
                  href={secondaryCTA.link}
                  className={`flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium hover:opacity-90 md:px-10 md:py-4 md:text-lg transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    backgroundColor: secondaryButtonBackground,
                    color: secondaryButtonText,
                    fontFamily: getFontFamily(currentTheme, 'body'),
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Button Text');
                    },
                    "Click to edit button text"
                  )}
                >
                  {secondaryCTA.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

