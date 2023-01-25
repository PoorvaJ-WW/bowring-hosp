// JSON-DRIVEN HeroWithImageBackground Template - Simple Direct Editing
'use client';

import React, { useState } from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily,
  normalizeImageData,
  normalizeCTAData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
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
  
  return page.components?.find((c: any) => c.id === componentId);
};

export default function HeroWithImageBackground(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-with-image-background',
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
    console.error(`HeroWithImageBackground: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content properties with fallbacks
  const {
    headline = 'Your Headline Here',
    subheadline = 'Your compelling subheadline goes here to explain your product or service',
    description = 'Your detailed description goes here to provide more context and information',
    cta_primary = { text: 'Get Started', href: '#' },
    cta_secondary = { text: 'Learn More', href: '#' },
    announcement = { text: 'Announcing our new feature', href: '#', link_text: 'Learn more' },
    image = { src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png', alt: 'Hero background' },
    stats = [
      { value: '15+', label: 'Years Experience' },
      { value: '500+', label: 'Projects Completed' },
      { value: '98%', label: 'Client Satisfaction' }
    ],
    overlayOpacity = 0.4,
    overlayColor = 'black'
  } = content;

  // Color and style helpers - use dark theme colors for text on background images
  const containerBackgroundColor = '#000000';
  const headlineColor = currentTheme?.colors?.text?.primary?.dark || '#FFFFFF';
  const subheadlineColor = currentTheme?.colors?.text?.primary?.dark || 'rgba(255, 255, 255, 0.9)';
  const descriptionColor = currentTheme?.colors?.text?.primary?.dark || 'rgba(255, 255, 255, 0.9)';
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const secondaryButtonColor = getSecondaryButtonColor({ theme: currentTheme });

  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);

  const getAnnouncementStyle = () => ({
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#FFFFFF',
    fontFamily: getFontFamily(currentTheme, 'body'),
  });

  const imageData = normalizeImageData(image, 'hero-with-image-background');
  const backgroundImageUrl = imageData.src || 'https://pagedone.io/asset/uploads/1710221348.png';

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat transition-colors duration-200"
      style={{
        backgroundImage: !imageError && backgroundImageUrl ? `url('${backgroundImageUrl}')` : 'none',
        backgroundColor: containerBackgroundColor,
      }}
    >
      {/* Background controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        {/* Background Image edit button */}
        <div
          className={`w-12 h-12 bg-blue-600 ${getEditableClasses().replace('hover:opacity-80', 'hover:bg-blue-700')} rounded-lg flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-white`}
          {...getEditableProps((e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'image.src', imageData.src, 'Background Image', 'image');
          }, "Edit background image")}
        >
          <svg className="w-6 h-6 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Overlay Opacity edit button */}
        <div
          className={`w-12 h-12 bg-purple-600 ${getEditableClasses().replace('hover:opacity-80', 'hover:bg-purple-700')} rounded-lg flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-white`}
          {...getEditableProps((e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'overlayOpacity', overlayOpacity.toString(), 'Overlay Opacity (0-1)');
          }, "Edit overlay opacity")}
        >
          <svg className="w-6 h-6 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>

        {/* Overlay Color edit button */}
        <div
          className={`w-12 h-12 bg-indigo-600 ${getEditableClasses().replace('hover:opacity-80', 'hover:bg-indigo-700')} rounded-lg flex items-center justify-center transition-all duration-200 shadow-xl border-2 border-white`}
          {...getEditableProps((e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'overlayColor', overlayColor, 'Overlay Color');
          }, "Edit overlay color")}
        >
          <svg className="w-6 h-6 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
      </div>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 z-10 transition-opacity duration-200"
        style={{ 
          backgroundColor: overlayColor, 
          opacity: overlayOpacity 
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-8 lg:px-24">
        <div className="text-center max-w-4xl mx-auto">
          {announcement && (
            <div className="mb-8">
              <div
                className={`inline-block rounded-full px-4 py-2 text-sm leading-6 transition-colors duration-200 ${getEditableClasses()}`}
                style={getAnnouncementStyle()}
                {...getEditableProps((e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'announcement.text', announcement?.text || '', 'Announcement Text');
                }, "Click to edit announcement")}
              >
                {announcement?.text || ''}{' '}
                {announcement?.href && (
                  <a
                    href={announcement?.href || '#'}
                    className={`whitespace-nowrap font-semibold underline ${getEditableClasses()}`}
                    {...getEditableProps((e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'announcement.link_text', announcement?.link_text || 'Learn more', 'Announcement Link Text');
                    }, "Click to edit link text")}
                  >
                    {announcement?.link_text || 'Learn more'}
                  </a>
                )}
              </div>
            </div>
          )}

          <h1
            className={`font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: headlineColor,
              fontFamily: getFontFamily(currentTheme, 'heading'),
            }}
            {...getEditableProps((e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'headline', headline, 'Headline');
            }, "Click to edit headline")}
          >
            {headline}
          </h1>

          <p
            className={`text-lg font-normal mb-8 max-w-2xl mx-auto transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: subheadlineColor,
              fontFamily: getFontFamily(currentTheme, 'body'),
            }}
            {...getEditableProps((e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'Subheadline');
            }, "Click to edit subheadline")}
          >
            {subheadline}
          </p>

          {(cta_primary || cta_secondary) && (
            <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta_primary && (
                <div className="rounded-md shadow">
                  <a
                    href={primaryCTA.link}
                    className={`rounded-md px-6 py-3 text-base font-semibold shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      backgroundColor: primaryButtonBackground,
                      color: primaryButtonText,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                      outlineColor: primaryButtonBackground,
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
                    className={`text-base font-semibold leading-6 underline hover:no-underline transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: secondaryButtonColor,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                    }}
                    {...getEditableProps((e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Link Text');
                    }, "Click to edit link text")}
                  >
                    {secondaryCTA.text}
                  </a>
                </div>
              )}
            </div>
          )}

          {description && (
            <div className="mt-16">
              <p
                className={`text-base font-normal max-w-2xl mx-auto mb-8 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: descriptionColor,
                  fontFamily: getFontFamily(currentTheme, 'body'),
                }}
                {...getEditableProps((e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'description', description, 'Description');
                }, "Click to edit description")}
              >
                {description}
              </p>
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
              {stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <h4
                    className={`font-semibold text-4xl leading-snug mb-2 transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: headlineColor,
                      fontFamily: getFontFamily(currentTheme, 'heading'),
                    }}
                    {...getEditableProps((e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `stats.${index}.value`, stat.value, `Stat ${index + 1} Value`);
                    }, "Click to edit stat value")}
                  >
                    {stat.value}
                  </h4>
                  <p
                    className={`text-base font-normal whitespace-nowrap transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: descriptionColor,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                    }}
                    {...getEditableProps((e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `stats.${index}.label`, stat.label, `Stat ${index + 1} Label`);
                    }, "Click to edit stat label")}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}