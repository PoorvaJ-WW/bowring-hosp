// Generated page-specific component for infrastructure
// This component is isolated - changes here only affect the infrastructure page
// JSON-DRIVEN HeroImageTop Template
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
  getTitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getPrimaryButtonTextColor,
  getSecondaryTextColor,
  getFeatureCardBackgroundColor
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
  
  return page.components?.find((c: any) => c.id === componentId || c.type === 'hero-image-top');
};

export default function HeroImageTopInfrastructureInfrastructure(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'hero-image-top',
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
    console.error(`HeroImageTop: content not found for ${pageSlug}/${componentId}`);
    return null;
  }


  // Extract content properties
  const {
    headline = 'Your Headline Here',
    description = 'Your compelling description text goes here to explain your product or service in detail',
    cta_primary = { text: 'Explore More', href: '#' },
    cta_secondary = null,
    announcement = 'New Feature',
    image = { src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png', alt: 'Hero showcase' },
    stats = [
      { value: '15+', label: 'Years Experience' },
      { value: '500+', label: 'Projects Completed' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Support Available' }
    ],
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color and style helpers using standardized color utilities
  const containerBackgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const primaryButtonBackground = getPrimaryButtonColor({ theme: currentTheme });
  const primaryButtonText = getPrimaryButtonTextColor({ theme: currentTheme });
  const announcementBackground = getFeatureCardBackgroundColor({ theme: currentTheme });
  const announcementColor = getSecondaryTextColor({ theme: currentTheme });
  const statsValueColor = getTitleColor({ theme: currentTheme });
  const statsLabelColor = getSecondaryTextColor({ theme: currentTheme });

  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = normalizeCTAData(cta_secondary);

  const getAnnouncementStyle = () => ({
    backgroundColor: announcementBackground,
    color: announcementColor,
    fontFamily: getFontFamily(currentTheme, 'body'),
  });

  const imageData = normalizeImageData(image, 'hero-image-top');
  const imageSrc = imageData.src;

  return (
    <div 
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: containerBackgroundColor }}
    >
      {/* Hero Section */}
      <section className="w-full pt-10 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex-col justify-start items-start xl:gap-20 lg:gap-14 gap-12 inline-flex">
            {/* Hero Image */}
            <div className="relative w-full group">

              {!imageError ? (
                <img
                  className="lg:h-auto md:h-[460px] h-[400px] w-full rounded-3xl object-cover transition-opacity duration-200"
                  src={imageSrc}
                  alt={imageData.alt}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className={`lg:h-auto md:h-[460px] h-[400px] w-full rounded-3xl bg-gray-100 flex items-center justify-center ${getEditableClasses()}`}
                  {...getEditableProps((e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', '', 'Image', 'image');
                  }, "Click to add image")}
                >
                  <span className="text-gray-500">Click to add image</span>
                </div>
              )}
            </div>

            {/* Content Grid */}
            <div className="w-full justify-start lg:items-start items-center xl:gap-10 gap-8 grid lg:grid-cols-2 grid-cols-1">
              {/* Left Column - Heading */}
              <div className="w-full flex-col justify-start lg:items-start items-center gap-5 inline-flex">
                {announcement && (
                  <div
                    className={`px-2.5 py-0.5 rounded-full justify-start items-center gap-1.5 flex transition-colors duration-200 ${getEditableClasses()}`}
                    style={getAnnouncementStyle()}
                    {...getEditableProps((e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, 'announcement.text', announcement || '', 'Announcement');
                    }, "Click to edit announcement")}
                  >
                    <span className="text-center text-xs font-medium leading-normal">
                      {announcement}
                    </span>
                  </div>
                )}
                <h1
                  className={`text-5xl font-bold font-sans leading-snug lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
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
              </div>

              {/* Right Column - Description & CTA */}
              <div className="w-full h-full flex-col justify-between lg:items-start items-center inline-flex lg:gap-0 gap-5">
                <p
                  className={`text-base font-normal leading-relaxed lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
                  {...getEditableProps((e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'description', description, 'Description');
                  }, "Click to edit description")}
                  style={{
                    color: descriptionColor,
                    fontFamily: getFontFamily(currentTheme, 'body'),
                  }}
                >
                  {description}
                </p>
                {cta_primary && (
                  <div className="rounded-md shadow">
                    <button
                      className={`sm:w-fit w-full px-5 py-2.5 hover:opacity-90 transition-all duration-700 ease-in-out rounded-full shadow-sm justify-center items-center flex ${getEditableClasses()}`}
                      style={{
                        backgroundColor: primaryButtonBackground,
                        color: primaryButtonText,
                        fontFamily: getFontFamily(currentTheme, 'body'),
                      }}
                      {...getEditableProps((e) => {
                        e.preventDefault();
                        editWithAI(pageSlug, componentId, 'cta_primary.text', primaryCTA.text, 'Primary Button Text');
                      }, "Click to edit button text")}
                    >
                      <span className="px-2 py-px text-base font-semibold leading-relaxed">
                        {primaryCTA.text}
                      </span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Section */}
            {stats && stats.length > 0 && (
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat: any, index: number) => (
                  <div key={index} className="text-center">
                    <div
                      className={`text-3xl font-bold transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: statsValueColor,
                        fontFamily: getFontFamily(currentTheme, 'heading'),
                      }}
                      {...getEditableProps((e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `stats.${index}.value`, stat.value, `Stat ${index + 1} Value`);
                      }, "Click to edit stat value")}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm mt-1 transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: statsLabelColor,
                        fontFamily: getFontFamily(currentTheme, 'body'),
                      }}
                      {...getEditableProps((e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `stats.${index}.label`, stat.label, `Stat ${index + 1} Label`);
                      }, "Click to edit stat label")}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
