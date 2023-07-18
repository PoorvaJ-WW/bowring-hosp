// Generated page-specific component for about
// This component is isolated - changes here only affect the about page
// JSON-DRIVEN ContentShort Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily, 
  normalizeImageData
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'content-short'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentShortAboutAbout(props: Props) {
  const { pageSlug = 'home', componentId = 'content-short', theme: propTheme, backgroundType, previewContent } = props;
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
    console.error(`ContentShort: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Our Story',
    subheadline = 'Discover who we are and what we stand for',
    description = 'We are dedicated to serving our community with excellence and compassion. Our journey began with a simple vision: to make a positive impact in the lives of those we serve.',
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
      className="py-16 px-4 transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold mb-4 transition-colors duration-200 ${getEditableClasses()}`}
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
            className={`text-xl max-w-2xl mx-auto transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: subtitleColor,
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
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p
              className={`text-base leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
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
          <div className="relative">
            
            {normalizedImage?.src ? (
              <img
                src={normalizedImage.src}
                alt={normalizedImage.alt || 'Content Image'}
                className={`rounded-lg h-90 w-full object-cover transition-opacity duration-200 ${getEditableClasses()}`}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Content Image', 'image');
                  },
                  "Click to edit image"
                )}
              />
            ) : (
              <div
                className={`rounded-lg h-90 flex items-center justify-center transition-colors duration-200 ${getEditableClasses()}`}
                style={{ backgroundColor: subtitleColor + '10' }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'image.src', '', 'Content Image', 'image');
                  },
                  "Click to add image"
                )}
              >
                <span 
                  className="transition-colors duration-200"
                  style={{ color: subtitleColor }}
                >
                  Content Image
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
