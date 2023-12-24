// Generated page-specific component for mass-schedule
// This component is isolated - changes here only affect the mass-schedule page
// JSON-DRIVEN ContentBasicButton Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getFontFamily, 
  normalizeImageData, 
  normalizeCTAData
} from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getPrimaryButtonTextColor
} from '@/utils/colorUtils';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'content-basic-button'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentBasicButtonMassScheduleMassSchedule(props: Props) {
  const { pageSlug = 'home', componentId = 'content-basic-button', theme: propTheme, backgroundType, previewContent } = props;
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
    console.error(`ContentBasicButton: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Take Action Today',
    description = 'Join us in making a difference. Learn more about how you can get involved.',
    cta_primary = { text: 'Get Started', href: '#' },
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
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const buttonBgColor = getPrimaryButtonColor({ theme: currentTheme });
  const buttonTextColor = getPrimaryButtonTextColor({ theme: currentTheme });
  const normalizedImage = normalizeImageData(image);
  const normalizedButton = normalizeCTAData(cta_primary);

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
              <h2
                className={`text-4xl font-bold leading-normal lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
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
                className={`text-base font-normal leading-relaxed lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
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
            <button
              className={`sm:w-fit w-full px-3.5 py-2 rounded-lg shadow-sm justify-center items-center flex transition-all duration-200 ease-in-out hover:opacity-90 ${getEditableClasses()}`}
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
              onClick={(e) => {
                if (normalizedButton.href && normalizedButton.href !== '#') {
                  window.location.href = normalizedButton.href;
                }
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'cta_primary.text', normalizedButton.text, 'Button Text');
                },
                "Click to edit button text"
              )}
            >
              <span className="px-1.5 text-sm font-medium leading-6">
                {normalizedButton.text}
              </span>
            </button>
          </div>
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
                className="lg:mx-0 mx-auto h-full rounded-3xl object-cover w-full"
                src={normalizedImage.src}
                alt={normalizedImage.alt || 'Content Image'}
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};