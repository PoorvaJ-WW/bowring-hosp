// Generated page-specific component for blood-bank
// This component is isolated - changes here only affect the blood-bank page
// JSON-DRIVEN TestimonialsOffWhiteGrid Template - Simple Direct Editing
'use client';

import React from 'react';
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
  getDescriptionColor,
  getSecondaryTextColor,
  getPrimaryButtonColor
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
    c.id === componentId || c.type === 'testimonials-off-white-grid'
  );
};

export default function TestimonialsOffWhiteGridBloodBankBloodBank(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'testimonials-off-white-grid',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content - either from preview or metadata
  let content;
  if (previewContent) {
    content = previewContent;
  } else {
    if (!pageSlug) {
      console.error('TestimonialsOffWhiteGrid: pageSlug is required when previewContent is not provided');
      return null;
    }
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`TestimonialsOffWhiteGrid: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // Extract content with standardized field names and defaults
  const {
    headline = 'What Our Customers Are Saying',
    description = 'Hear from those who have experienced our service firsthand',
    testimonials = [
      {
        body: 'This service has completely transformed how we work. The attention to detail and customer support is exceptional.',
        author: {
          name: 'Sarah Johnson',
          role: 'CEO, Tech Solutions',
          imageUrl: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png'
        }
      },
      {
        body: 'I highly recommend this to anyone looking for quality and reliability. The team goes above and beyond.',
        author: {
          name: 'Michael Chen',
          role: 'Product Manager',
          imageUrl: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png'
        }
      },
      {
        body: 'Outstanding experience from start to finish. They truly understand customer needs.',
        author: {
          name: 'Emily Rodriguez',
          role: 'Business Owner',
          imageUrl: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png'
        }
      }
    ]
  } = content;

  // Fallback placeholder image
  const PLACEHOLDER_IMAGE = 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png';

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const cardBackground = getSecondaryTextColor({ theme: currentTheme }) + '0A'; // Very light background for cards
  const headingColor = getTitleColor({ theme: currentTheme }); // For title and author names
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For testimonial text
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For subtitle, author roles, and placeholder text
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  // Helper function to extract text from string or object with text/href
  const getTextContent = (content: any): string => {
    if (typeof content === 'string') {
      return content;
    }
    if (typeof content === 'object' && content !== null && content.text) {
      return content.text;
    }
    return '';
  };

  // Function to render author avatar - image, initials, or placeholder
  const renderAuthorAvatar = (author: { name?: string; imageUrl?: string }, index: number) => {
    const imageUrl = author.imageUrl || PLACEHOLDER_IMAGE;

    return (
      <div
        className={`relative group transition-opacity duration-200 ${getEditableClasses()}`}
        {...getEditableProps(
          (e?: React.MouseEvent) => {
            e?.stopPropagation();
            editWithAI(pageSlug, componentId, `testimonials.${index}.author.imageUrl`, author.imageUrl || '', 'Author Image', 'image');
          },
          author.imageUrl ? "Click to edit author image" : "Click to add author image"
        )}
      >
        <Image
          src={imageUrl}
          alt={getTextContent(author.name) || 'User'}
          width={40}
          height={40}
          className="object-cover rounded-full"
          unoptimized
          priority={index < 3}
        />
      </div>
    );
  };

  return (
    <section 
      className="py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-base/7 font-semibold transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: metaTextColor,
              fontFamily: bodyFont
            }}
            {...getEditableProps(
              (e?: React.MouseEvent) => {
                e?.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'Description');
              },
              "Click to edit description"
            )}
          >
            {description}
          </h2>
          <p
            className={`mt-2 text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: headingColor,
              fontFamily: headingFont
            }}
            {...getEditableProps(
              (e?: React.MouseEvent) => {
                e?.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'Headline');
              },
              "Click to edit headline"
            )}
          >
            {headline}
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {testimonials.slice(0, 6).map((testimonial: any, index: number) => {
              // Handle both correct and incorrect testimonial structures with fallbacks
              const testimonialBody = testimonial.body || testimonial.content || 'Share your experience with us';
              const authorName = testimonial.author?.name || testimonial.author || 'Anonymous';
              const authorRole = testimonial.author?.role || testimonial.title || 'Customer';
              const authorImageUrl = testimonial.author?.imageUrl || null;
              
              return (
              <div
                key={testimonial.id || index}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure
                  className="rounded-2xl p-8 text-sm/6 transition-colors duration-200"
                  style={{ backgroundColor: cardBackground }}
                >
                  <blockquote>
                    <p
                      className={`testimonial-body transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: bodyTextColor,
                        fontFamily: bodyFont
                      }}
                      {...getEditableProps(
                        (e?: React.MouseEvent) => {
                          e?.stopPropagation();
                          editWithAI(pageSlug, componentId, `testimonials.${index}.body`, testimonialBody, `Testimonial ${index + 1}`);
                        },
                        `Click to edit testimonial ${index + 1}`
                      )}
                    >{`"${testimonialBody}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      {renderAuthorAvatar({ name: authorName, imageUrl: authorImageUrl }, index)}
                    </div>
                    <div>
                      <div
                        className={`font-semibold testimonial-author-name transition-colors duration-200 ${getEditableClasses()}`}
                        style={{
                          color: headingColor,
                          fontFamily: bodyFont
                        }}
                        {...getEditableProps(
                          (e?: React.MouseEvent) => {
                            e?.stopPropagation();
                            editWithAI(pageSlug, componentId, `testimonials.${index}.author.name`, authorName, `Author ${index + 1} Name`);
                          },
                          `Click to edit author ${index + 1} name`
                        )}
                      >
                        {getTextContent(authorName)}
                      </div>
                      {authorRole && (
                        <div
                          className={`testimonial-author-role transition-colors duration-200 ${getEditableClasses()}`}
                          style={{
                            color: metaTextColor,
                            fontFamily: bodyFont
                          }}
                          {...getEditableProps(
                            (e?: React.MouseEvent) => {
                              e?.stopPropagation();
                              editWithAI(pageSlug, componentId, `testimonials.${index}.author.role`, authorRole, `Author ${index + 1} Role`);
                            },
                            `Click to edit author ${index + 1} role`
                          )}
                        >
                          {authorRole}
                        </div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
