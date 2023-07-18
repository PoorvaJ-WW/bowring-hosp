// Generated page-specific component for medical-college
// This component is isolated - changes here only affect the medical-college page
// JSON-DRIVEN HeroWithImage Template - Simple Direct Editing
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
    c.id === componentId || c.type === 'hero-with-image'
  );
};

export default function HeroWithImageMedicalCollegeMedicalCollege(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-with-image',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;

  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Initialize state at the top level before any conditional returns
  const [imageError, setImageError] = useState(false);

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
    console.error(`HeroWithImage: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here to explain your product or service',
    cta_primary = { text: 'Get Started', link: '#' },
    cta_secondary = { text: 'Learn More', link: '#' },
    announcement = { text: 'Announcing our new feature', link: '#', link_text: 'Learn More' },
    image = { src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png', alt: 'Hero image' },
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

  // Normalize data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);
  const normalizedImage = normalizeImageData(image);

  const getAnnouncementStyle = () => {
    return {
      backgroundColor: getFeatureCardBackgroundColor({ theme: currentTheme }),
      color: getSecondaryTextColor({ theme: currentTheme }),
      fontFamily: getFontFamily(currentTheme, 'body'),
    };
  };

  return (
    <div
      className="relative transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-8 pb-16 sm:pb-24 lg:col-span-7 lg:px-0 lg:pt-16 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            {announcement && (
              <div className="hidden sm:flex">
                <div
                  className={`relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 ${getEditableClasses()}`}
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
                    {announcement?.link_text || 'Learn More'} <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            )}

            <h1
              className={`mt-10 text-pretty text-5xl font-semibold tracking-tight sm:text-7xl ${getEditableClasses()}`}
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
                    className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${getEditableClasses()}`}
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
                    className={`text-sm font-semibold leading-6 ${getEditableClasses()}`}
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

        <div className="relative lg:col-span-5 lg:-mt-8 lg:flex lg:items-center xl:col-span-6">
          <div className="relative w-full max-w-lg rounded-2xl shadow-xl overflow-hidden mx-auto lg:mx-0 group">
            {!imageError ? (
              <div
                className={`relative ${getEditableClasses()}`}
                style={{ aspectRatio: '4/3' }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Hero Image', 'image');
                  },
                  "Click to edit hero image"
                )}
              >
                <Image
                  src={normalizedImage.src}
                  alt={normalizedImage.alt}
                  fill
                  priority
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${getEditableClasses()}`}
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: containerBackgroundColor,
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', '', 'Hero Image', 'image');
                  },
                  "Click to add image"
                )}
              >
                <span style={{ color: subheadlineColor }}>Click to add image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
