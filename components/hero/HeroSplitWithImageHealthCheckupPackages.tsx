// Generated page-specific component for health-checkup-packages
// This component is isolated - changes here only affect the health-checkup-packages page
// JSON-DRIVEN HeroSplitWithImage Template - Simple Direct Editing
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeImageData,
  normalizeCTAData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
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
  
  return page.components?.find((c: any) => c.id === componentId || c.type === 'hero-split-with-image');
};

export default function HeroSplitWithImageHealthCheckupPackagesHealthCheckupPackages(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-split-with-image',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  const [imageError, setImageError] = useState(false);

  // Use preview content if provided, otherwise get from metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }
  
  if (!content || Object.keys(content).length === 0) {
    console.error(`HeroSplitWithImage: content not found for ${pageSlug}/${componentId}`);
    return null;
  }
  
  // Extract content properties with fallbacks
  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here to explain your product or service',
    cta_primary = { text: 'Get Started', href: '#' },
    cta_secondary = { text: 'Learn More', href: '#' },
    announcement = { text: 'Announcing our new feature', href: '#', link_text: 'Learn more' },
    image = { src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png', alt: 'Hero image' },
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color and style helpers
  const containerBackgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const subheadlineColor = getSubtitleColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const secondaryButtonColor = getSecondaryButtonColor({ theme: currentTheme });

  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);

  const getAnnouncementStyle = () => ({
    backgroundColor: getFeatureCardBackgroundColor({ theme: currentTheme }),
    color: getSecondaryTextColor({ theme: currentTheme }),
    fontFamily: getFontFamily(currentTheme, 'body'),
  });

  const imageData = normalizeImageData(image, 'hero-split-with-image');

  return (
    <div
      className="relative transition-colors duration-200"
      style={{
        backgroundColor: containerBackgroundColor,
      }}
    >
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-8 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-20 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            {announcement && (
              <div className="hidden sm:flex">
                <div
                  className={`relative rounded-full px-3 py-1 text-sm leading-6 transition-colors duration-200 ring-1 ring-gray-900/10 hover:ring-gray-900/20 ${getEditableClasses()}`}
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
                  {announcement?.href && (
                    <a
                      href={announcement?.href || '#'}
                      className={`whitespace-nowrap font-semibold ${getEditableClasses()}`}
                      style={{ color: primaryButtonBackground }}
                      {...getEditableProps(
                        (e) => {
                          e.preventDefault();
                          editWithAI(pageSlug, componentId, 'announcement.link_text', announcement?.link_text || 'Learn more', 'Announcement Link Text');
                        },
                        "Click to edit link text"
                      )}
                    >
                      {announcement?.link_text || 'Learn more'}{' '}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <h1
              className={`mt-24 text-pretty text-5xl font-semibold tracking-tight sm:mt-10 sm:text-7xl transition-colors duration-200 ${getEditableClasses()}`}
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
              className={`mt-8 text-pretty text-lg font-medium sm:text-xl/8 ${getEditableClasses()}`}
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

            <div className="mt-10 flex items-center gap-x-6">
              {cta_primary && (
                <div className="rounded-md shadow">
                  <a
                    href={primaryCTA.link}
                    className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 hover:opacity-90 ${getEditableClasses()}`}
                    style={{
                      backgroundColor: primaryButtonBackground,
                      color: primaryButtonText,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                      outlineColor: primaryButtonBackground,
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
                      fontFamily: getFontFamily(currentTheme, 'body'),
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

        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">

          {!imageError ? (
            <div
              className={`aspect-[3/2] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full transition-opacity duration-200 ${getEditableClasses()}`}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image.src', imageData.src, 'Hero Image', 'image');
                },
                "Click to edit hero image"
              )}
            >
              <Image
                alt={imageData.alt}
                src={imageData.src}
                fill
                priority
                onError={() => setImageError(true)}
                className="aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                style={{
                  backgroundColor: containerBackgroundColor,
                }}
              />
            </div>
          ) : (
            <div
              className={`aspect-[3/2] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full bg-gray-100 flex items-center justify-center transition-opacity duration-200 ${getEditableClasses()}`}
              style={{
                backgroundColor: containerBackgroundColor,
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image.src', '', 'Hero Image', 'image');
                },
                "Click to add hero image"
              )}
            >
              <span style={{ color: subheadlineColor }}>
                Click to add hero image
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
