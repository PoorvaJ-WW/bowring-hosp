// Generated page-specific component for admissions
// This component is isolated - changes here only affect the admissions page
// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// JSON-DRIVEN ContentWithList Template - Simple Direct Editing
'use client';
import { type FC } from 'react';
import Image from 'next/image';
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
  getDescriptionColor,
  getAccentColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'content-with-list'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentWithListAdmissions(props: Props) {
  const { pageSlug = 'home', componentId = 'content-with-list', theme: propTheme, backgroundType, previewContent } = props;
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
    console.error(`ContentWithList: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    headline = 'Our Services',
    subheadline = 'What we offer',
    items = [
      { title: 'Service One', description: 'High-quality service tailored to your needs.' },
      { title: 'Service Two', description: 'Professional solutions delivered with excellence.' },
      { title: 'Service Three', description: 'Innovative approaches to modern challenges.' }
    ],
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
  const accentColor = getAccentColor({ theme: currentTheme });
  const normalizedImage = normalizeImageData(image);

  return (
    <section 
      className="py-24 relative transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-start gap-12 grid lg:grid-cols-2 grid-cols-1">
          {/* Content Section */}
          <div className="w-full flex-col justify-start items-start gap-9 inline-flex">
            <div className="w-full flex-col justify-start lg:items-start items-center gap-3.5 flex">
              <span
                className={`text-base font-medium leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
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
              </span>
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
            </div>
            <div className="w-full flex-col justify-start items-start lg:gap-8 gap-6 flex">
              {items.map((item, index) => (
                <div key={index} className="w-full justify-start items-start lg:gap-6 gap-4 inline-flex group">
                  <div className="justify-start items-start gap-2.5 flex flex-shrink-0">
                    <div 
                      className="w-[60px] h-[60px] flex items-center justify-center rounded-full group-hover:opacity-90 transition-all duration-300 shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      <h3 
                        className="text-white text-2xl font-bold leading-normal transition-colors duration-200"
                        style={{
                          fontFamily: getFontFamily(currentTheme, 'heading')
                        }}
                      >
                        {index + 1}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-3 inline-flex flex-1">
                    <h4
                      className={`text-xl font-semibold leading-7 group-hover:opacity-90 transition-all duration-300 ${getEditableClasses()}`}
                      style={{
                        color: titleColor,
                        fontFamily: getFontFamily(currentTheme, 'heading')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `items.${index}.title`, item.title, `Item ${index + 1} Title`);
                        },
                        `Click to edit item ${index + 1} title`
                      )}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-base font-normal leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: descriptionColor,
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `items.${index}.description`, item.description, `Item ${index + 1} Description`);
                        },
                        `Click to edit item ${index + 1} description`
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center items-start lg:sticky lg:top-8">
            <div className="relative w-full max-w-lg">
              
              {normalizedImage?.src ? (
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
                    className="w-full h-auto rounded-3xl object-cover shadow-2xl"
                    src={normalizedImage.src}
                    alt={normalizedImage.alt || 'Content illustration'}
                    width={500}
                    height={600}
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-[600px] rounded-3xl flex items-center justify-center shadow-2xl transition-colors duration-200 ${getEditableClasses()}`}
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
                    className="text-lg transition-colors duration-200"
                    style={{ color: subtitleColor }}
                  >
                    Content Image
                  </span>
                </div>
              )}
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-60"
                style={{ backgroundColor: subtitleColor + '33' }}
              ></div>
              <div 
                className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full opacity-40"
                style={{ backgroundColor: subtitleColor + '26' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
