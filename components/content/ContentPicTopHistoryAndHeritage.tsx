// Generated page-specific component for history-and-heritage
// This component is isolated - changes here only affect the history-and-heritage page
// Generated page-specific component for the-cime-saturno
// This component is isolated - changes here only affect the the-cime-saturno page
// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// JSON-DRIVEN ContentPicTop Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily, 
  normalizeImageData, 
  normalizeStatsData
} from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getAccentColor,
  getBorderColor
} from '@/utils/colorUtils';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'content-pic-top'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentPicTopHistoryAndHeritage(props: Props) {
  const { pageSlug = 'home', componentId = 'content-pic-top', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from preview or JSON metadata
  let content = previewContent;

  if (!content && pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }

  if (!content || Object.keys(content).length === 0) {
    console.error(`ContentPicTop: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Our Impact',
    subheadline = 'Making a difference',
    description = 'We are committed to excellence and innovation in everything we do.',
    image = {
      src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
      alt: 'Content Image'
    },
    stats = [
      { value: '100+', label: 'Projects' },
      { value: '50K+', label: 'Users' },
      { value: '98%', label: 'Satisfaction' },
      { value: '24/7', label: 'Support' }
    ]
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Use color utilities from colorUtils
  const containerBgColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const subtitleColor = getSubtitleColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const accentColor = getAccentColor({ theme: currentTheme });
  const borderColor = getBorderColor({ theme: currentTheme });
  const normalizedImage = normalizeImageData(image);

  return (
    <section 
      className="relative py-24 overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div 
          style={{
            backgroundImage: `radial-gradient(circle, ${titleColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative w-full max-w-7xl px-4 md:px-5 lg:px-8 mx-auto">
        <div className="flex flex-col gap-16">
          {/* Image Section with dramatic effects */}
          <div className="relative group">
            {/* Decorative corner brackets */}
            <div 
              className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 rounded-tl-3xl transition-all duration-500 group-hover:w-24 group-hover:h-24 z-10"
              style={{ borderColor: accentColor, opacity: 0.6 }}
            />
            <div 
              className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 rounded-br-3xl transition-all duration-500 group-hover:w-24 group-hover:h-24 z-10"
              style={{ borderColor: subtitleColor, opacity: 0.6 }}
            />

            {/* Floating glow effect */}
            <div 
              className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundColor: accentColor }}
            />

            <div
              className={`relative overflow-hidden rounded-3xl ${getEditableClasses()}`}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image', normalizedImage, 'Image');
                },
                "Click to edit image"
              )}
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}60 0%, ${subtitleColor}60 100%)`
                }}
              />

              <div className="relative" style={{ aspectRatio: '21/9' }}>
                <Image
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  src={normalizedImage.src}
                  alt={normalizedImage.alt || 'Content Image'}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div className="flex flex-col gap-6">
              {/* Decorative accent bar */}
              <div 
                className="w-16 h-1.5 rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, ${accentColor}, ${subtitleColor})`
                }}
              />

              <div className="flex flex-col gap-4">
                <h6
                  className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: subtitleColor,
                    fontFamily: getFontFamily(currentTheme, 'heading')
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
                </h6>

                <h2
                  className={`text-4xl sm:text-5xl font-bold leading-tight transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: titleColor,
                    fontFamily: getFontFamily(currentTheme, 'heading'),
                    textShadow: `0 0 40px ${titleColor}10`
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
                </h2>
              </div>

              {description && (
                <p
                  className={`text-lg leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: descriptionColor,
                    fontFamily: getFontFamily(currentTheme, 'body'),
                    opacity: 0.9
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, 'description', description, 'Description');
                    },
                    "Click to edit description"
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats?.map((stat, index) => {
                const normalizedStat = normalizeStatsData(stat);
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    {/* Hover glow */}
                    <div 
                      className="absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundColor: accentColor }}
                    />

                    {/* Card */}
                    <div
                      className="relative p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 flex flex-col items-center text-center"
                      style={{ 
                        backgroundColor: `${accentColor}08`,
                        border: `2px solid ${borderColor}40`,
                        boxShadow: `0 4px 6px -1px ${titleColor}10`
                      }}
                    >
                      {/* Top accent line */}
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-full"
                        style={{ backgroundColor: accentColor }}
                      />

                      {/* Stat Value */}
                      <h4
                        className={`text-3xl sm:text-4xl font-black mb-2 transition-all duration-300 group-hover:scale-110 ${getEditableClasses()}`}
                        style={{
                          color: accentColor,
                          fontFamily: getFontFamily(currentTheme, 'heading'),
                          background: `linear-gradient(135deg, ${accentColor}, ${subtitleColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                        {...getEditableProps(
                          (e) => {
                            e.stopPropagation();
                            editWithAI(pageSlug, componentId, `stats.${index}.value`, normalizedStat.value, 'Stat Value');
                          },
                          "Click to edit stat value"
                        )}
                      >
                        {normalizedStat.value}
                      </h4>

                      {/* Divider */}
                      <div 
                        className="w-8 h-0.5 mb-2 rounded-full"
                        style={{ backgroundColor: accentColor, opacity: 0.3 }}
                      />

                      {/* Stat Label */}
                      <h6
                        className={`text-sm font-semibold transition-colors duration-200 ${getEditableClasses()}`}
                        style={{
                          color: titleColor,
                          fontFamily: getFontFamily(currentTheme, 'body')
                        }}
                        {...getEditableProps(
                          (e) => {
                            e.stopPropagation();
                            editWithAI(pageSlug, componentId, `stats.${index}.label`, normalizedStat.label, 'Stat Label');
                          },
                          "Click to edit stat label"
                        )}
                      >
                        {normalizedStat.label}
                      </h6>

                      {/* Bottom gradient indicator on hover */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, ${accentColor}, ${subtitleColor})`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
