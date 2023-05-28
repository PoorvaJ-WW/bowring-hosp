// Generated page-specific component for emergency-services
// This component is isolated - changes here only affect the emergency-services page
// JSON-DRIVEN HeroAngledImage Template - Simple Direct Editing
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

  return page.components?.find((c: any) =>
    c.id === componentId || c.type === 'hero-angled-image'
  );
};

export default function HeroAngledImageEmergencyServicesEmergencyServices(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-angled-image',
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

    if (!content || Object.keys(content).length === 0) {
      console.error(`HeroAngledImage: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }
  
  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here',
    cta_primary = { text: 'Get Started', href: '#' },
    cta_secondary = { text: 'Learn More', href: '#' },
    announcement = null,
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
  
  // Normalize data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);
  const normalizedImage = normalizeImageData(image, 'hero-angled-image');

  // Extract image src as string (handle both string and object formats)
  const imageSrc = typeof image === 'string' ? image : image.src;
  const imageAlt = typeof image === 'object' ? image.alt : 'Hero image';

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
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              style={{ fill: containerBackgroundColor }}
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {announcement && (
                  <div className="hidden sm:flex">
                    <div
                      className={`relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-colors duration-200 ${getEditableClasses()}`}
                      style={getAnnouncementStyle()}
                      {...getEditableProps((e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, 'announcement.text', announcement?.text || '', 'Announcement');
                      }, "Click to edit announcement")}
                    >
                      {announcement?.text || ''}{' '}
                      <a 
                        href={announcement?.link || '#'} 
                        className={`whitespace-nowrap font-semibold transition-colors duration-200 ${getEditableClasses()}`}
                        style={{ color: primaryButtonBackground }}
                        {...getEditableProps((e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'announcement.link_text', announcement?.link_text || 'Learn More', 'Announcement Link');
                        }, "Click to edit link text")}
                      >
                        {announcement?.link_text || 'Learn More'} <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                )}

                <h1
                  className={`text-pretty text-5xl font-semibold tracking-tight sm:text-7xl transition-colors duration-200 ${getEditableClasses()}`}
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
                  className={`mt-8 text-pretty text-lg font-medium sm:text-xl/8 transition-colors duration-200 ${getEditableClasses()}`}
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
                
                <div className="mt-10 flex items-center gap-x-6">
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
                        className={`text-sm font-semibold leading-6 transition-colors duration-200 ${getEditableClasses()}`}
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
        </div>

        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">

          {image && !imageError ? (
            <div
              className={`aspect-[3/2] w-full h-full relative transition-opacity duration-200 ${getEditableClasses()}`}
              {...getEditableProps((e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Hero Image', 'image');
              }, "Click to edit hero image")}
            >
              <Image
                alt={imageAlt}
                src={imageSrc}
                fill
                style={{ objectFit: 'cover' }}
                priority
                onError={() => setImageError(true)}
                className="lg:aspect-auto lg:h-full lg:w-full"
              />
            </div>
          ) : (
            <div
              className={`aspect-[3/2] w-full h-full flex items-center justify-center transition-colors duration-200 ${getEditableClasses()}`}
              style={{ backgroundColor: containerBackgroundColor }}
              {...getEditableProps((e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'image.src', '', 'Hero Image', 'image');
              }, "Click to add hero image")}
            >
              <span style={{ color: subheadlineColor }}>Click to add hero image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
