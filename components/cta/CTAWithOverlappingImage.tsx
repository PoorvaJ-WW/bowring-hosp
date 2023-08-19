// JSON-DRIVEN CTAWithOverlappingImage Template - Simple Direct Editing
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
  getFeatureCardBackgroundColor,
  getAccentColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';

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
    c.id === componentId || c.type === 'cta-with-overlapping-image'
  );
};

export default function CTAWithOverlappingImage(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'cta-with-overlapping-image',
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
    console.error(`CTAWithOverlappingImage: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Standardized field names with comprehensive fallbacks
  const {
    headline = 'Join our team',
    subheadline = 'Build something great',
    description = 'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.',
    cta_primary = { text: 'Explore open positions', href: '#' },
    cta_secondary = null,
    image = {
      src: 'https://images.unsplash.com/photo-1507207611509-ec012433ff52?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80',
      alt: 'Team collaboration'
    }
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color helpers using standardized color utilities
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const topBackgroundColor = getFeatureCardBackgroundColor({ theme: currentTheme });
  const ctaBackgroundColor = getPrimaryButtonColor({ theme: currentTheme });
  const headlineColor = getPrimaryButtonTextColor({ theme: currentTheme });
  const subheadlineColor = getPrimaryButtonTextColor({ theme: currentTheme });
  const descriptionColor = getPrimaryButtonTextColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonTextColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonHover = getFeatureCardBackgroundColor({ theme: currentTheme });
  const secondaryButtonBackground = getFeatureCardBackgroundColor({ theme: currentTheme });
  const secondaryButtonText = getPrimaryButtonColor({ theme: currentTheme });
  const patternColor = getPrimaryButtonColor({ theme: currentTheme });

  // Normalize CTA data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = cta_secondary ? normalizeCTAData(cta_secondary) : null;

  return (
    <div 
      className="relative py-16 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div 
        aria-hidden="true" 
        className="absolute inset-x-0 top-0 hidden h-1/2 lg:block transition-colors duration-200" 
        style={{ backgroundColor: topBackgroundColor }}
      />
      <div className="mx-auto max-w-7xl lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div 
              aria-hidden="true" 
              className="absolute inset-x-0 h-1/2 lg:hidden transition-colors duration-200" 
              style={{ backgroundColor: topBackgroundColor }}
            />
            <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:p-0">
              <img
                alt={image.alt || 'Team collaboration'}
                src={image.src}
                className="relative aspect-10/6 w-full rounded-3xl object-cover shadow-2xl sm:aspect-2/1 lg:aspect-square cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image.src', image.src, 'Team Image', 'image');
                }}
                title="Click to edit image"
              />
            </div>
          </div>

          <div 
            className="relative lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl transition-colors duration-200"
            style={{ backgroundColor: ctaBackgroundColor }}
          >
            <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block">
              <svg
                fill="none"
                width={404}
                height={384}
                viewBox="0 0 404 384"
                aria-hidden="true"
                className="absolute bottom-full left-full -translate-x-2/3 translate-y-1/3 transform xl:top-0 xl:bottom-auto xl:translate-y-0"
              >
                <defs>
                  <pattern
                    x={0}
                    y={0}
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect 
                      x={0} 
                      y={0} 
                      fill="currentColor" 
                      width={4} 
                      height={4} 
                      className="transition-colors duration-200" 
                      style={{ color: patternColor }}
                    />
                  </pattern>
                </defs>
                <rect fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" width={404} height={384} />
              </svg>
              <svg
                fill="none"
                width={404}
                height={384}
                viewBox="0 0 404 384"
                aria-hidden="true"
                className="absolute top-full -translate-x-1/3 -translate-y-1/3 transform xl:-translate-y-1/2"
              >
                <defs>
                  <pattern
                    x={0}
                    y={0}
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d-2"
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect 
                      x={0} 
                      y={0} 
                      fill="currentColor" 
                      width={4} 
                      height={4} 
                      className="transition-colors duration-200" 
                      style={{ color: patternColor }}
                    />
                  </pattern>
                </defs>
                <rect fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d-2)" width={404} height={384} />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md space-y-6 px-6 py-12 sm:max-w-3xl sm:py-16 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              {subheadline && (
                <p
                  className="text-base/7 font-semibold transition-colors duration-200 cursor-pointer hover:opacity-80"
                  style={{
                    color: subheadlineColor,
                    fontFamily: getFontFamily(currentTheme, 'body')
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'CTA Subheadline');
                  }}
                  title="Click to edit subheadline"
                >
                  {subheadline}
                </p>
              )}

              <h2
                id="join-heading"
                className="text-3xl font-bold tracking-tight transition-colors duration-200 cursor-pointer hover:opacity-80"
                style={{
                  color: headlineColor,
                  fontFamily: getFontFamily(currentTheme, 'heading')
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'headline', headline, 'CTA Headline');
                }}
                title="Click to edit headline"
              >
                {headline}
              </h2>

              {description && (
                <p
                  className="text-lg transition-colors duration-200 cursor-pointer hover:opacity-80"
                  style={{
                    color: descriptionColor,
                    fontFamily: getFontFamily(currentTheme, 'body')
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'description', description, 'CTA Description');
                  }}
                  title="Click to edit description"
                >
                  {description}
                </p>
              )}

              <div className="flex gap-x-4">
                {cta_primary && (
                  <a
                    href={primaryCTA.link}
                    className="block w-full rounded-md border border-transparent px-5 py-3 text-center text-base font-medium shadow-md sm:inline-block sm:w-auto transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: primaryButtonBackground,
                      color: primaryButtonText,
                      fontFamily: getFontFamily(currentTheme, 'body')
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = primaryButtonHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = primaryButtonBackground;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_primary.text', primaryCTA.text, 'Primary Button Text');
                    }}
                    title="Click to edit button text"
                  >
                    {primaryCTA.text}
                  </a>
                )}

                {secondaryCTA && (
                  <a
                    href={secondaryCTA.link}
                    className="block w-full rounded-md border border-transparent px-5 py-3 text-center text-base font-medium shadow-md sm:inline-block sm:w-auto transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: secondaryButtonBackground,
                      color: secondaryButtonText,
                      fontFamily: getFontFamily(currentTheme, 'body')
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Button Text');
                    }}
                    title="Click to edit secondary button text"
                  >
                    {secondaryCTA.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}