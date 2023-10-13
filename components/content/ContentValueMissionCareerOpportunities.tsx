// Generated page-specific component for career-opportunities
// This component is isolated - changes here only affect the career-opportunities page
// JSON-DRIVEN ContentValueMission Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily, 
  normalizeImageData
} from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor
} from '@/utils/colorUtils';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'content-value-mission'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentValueMissionCareerOpportunitiesCareerOpportunities(props: Props) {
  const { pageSlug = 'home', componentId = 'content-value-mission', theme: propTheme, backgroundType, previewContent } = props;
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
    console.error(`ContentValueMission: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Our Mission & Values',
    subheadline = 'What drives us forward',
    description = 'We are dedicated to making a positive impact in our community and beyond. We uphold the highest standards of integrity, strive for excellence in everything we do, and embrace innovation to create meaningful solutions.',
    image = {
      src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
      alt: 'Content Image'
    }
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
  const normalizedImage = normalizeImageData(image);

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-16 gap-12 inline-flex">
          {/* Header */}
          <div className="w-full flex-col justify-start items-center gap-4 flex">
            <h2
              className={`text-center text-4xl font-bold leading-normal transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: titleColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
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
            <p
              className={`text-center text-lg font-normal leading-relaxed max-w-4xl transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body')
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
          </div>

          {/* Main Content - Image with Description */}
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
            {/* Image */}
            <div className="w-full">
              <div
                className={`transition-opacity duration-200 ${getEditableClasses()}`}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Content Image', 'image');
                  },
                  "Click to edit image"
                )}
              >
                <Image
                  className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                  src={normalizedImage.src}
                  alt={normalizedImage.alt || 'Content Image'}
                  width={600}
                  height={500}
                />
              </div>
            </div>

            {/* Description Content */}
            <div className="w-full">
              <p
                className={`text-base font-normal leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: descriptionColor,
                  fontFamily: getFontFamily(currentTheme, 'body')
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
