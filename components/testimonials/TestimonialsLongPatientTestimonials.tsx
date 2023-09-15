// Generated page-specific component for patient-testimonials
// This component is isolated - changes here only affect the patient-testimonials page
// JSON-DRIVEN TestimonialsLong Template
'use client';

import React, { useState } from 'react';
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

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'testimonials-long'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function TestimonialsLongPatientTestimonialsPatientTestimonials(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'testimonials-long',
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
      console.error('TestimonialsLong: pageSlug is required when previewContent is not provided');
      return null;
    }
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`TestimonialsLong: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // Extract content with standardized field names and defaults
  const {
    headline = 'What Our Customers Are Saying',
    description = 'Hear from those who have experienced our service firsthand',
    testimonials = [
      {
        body: 'This service has completely transformed how we work. The attention to detail and customer support is exceptional. Every interaction has been professional and the results speak for themselves.',
        author: {
          name: 'Sarah Johnson',
          role: 'CEO, Tech Solutions',
          imageUrl: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png'
        }
      },
      {
        body: 'I highly recommend this to anyone looking for quality and reliability. The team goes above and beyond to ensure satisfaction and delivers consistent excellence.',
        author: {
          name: 'Michael Chen',
          role: 'Product Manager',
          imageUrl: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png'
        }
      },
      {
        body: 'Outstanding experience from start to finish. They truly understand customer needs and provide solutions that make a real difference in our operations.',
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
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For testimonial text and subtitle
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For author roles and placeholder text
  const activeColor = getPrimaryButtonColor({ theme: currentTheme }); // For active pagination dots
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

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    if (testimonials.length === 0) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Function to render author avatar - image or placeholder
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
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover"
          unoptimized
          priority={index === currentSlide}
        />
      </div>
    );
  };

  return (
    <section 
      className="py-24 transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          {headline && (
            <h2
              className={`text-4xl font-manrope font-bold text-center mb-4 transition-colors duration-200 ${getEditableClasses()}`}
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
            </h2>
          )}
          {description && (
            <p
              className={`text-lg text-center max-w-2xl mx-auto transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: bodyTextColor,
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
            </p>
          )}
        </div>

        <div className="relative pb-16">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                // Handle both correct and incorrect testimonial structures with fallbacks
                const testimonialBody = testimonial.body || testimonial.content || 'Share your experience with us';
                const authorName = testimonial.author?.name || testimonial.name || 'Anonymous';
                const authorRole = testimonial.author?.role || testimonial.role || 'Customer';
                const authorImageUrl = testimonial.author?.imageUrl || (typeof testimonial.image === "object" ? testimonial.image.src : testimonial.image) || null;
                
                return (
                  <div key={testimonial.id || index} className="w-full flex-shrink-0">
                    <div 
                      className="rounded-2xl py-8 px-8 max-w-xl mx-auto lg:max-w-3xl lg:py-11 lg:px-12 xl:max-w-5xl transition-colors duration-200"
                      style={{ backgroundColor: cardBackground }}
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                          {renderAuthorAvatar({ name: authorName, imageUrl: authorImageUrl }, index)}
                        </div>
                        <div className="block">
                          <h5
                            className={`text-lg font-semibold mb-1 transition-colors duration-200 ${getEditableClasses()}`}
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
                          </h5>
                          {authorRole && (
                            <span
                              className={`text-sm transition-colors duration-200 ${getEditableClasses()}`}
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
                            </span>
                          )}
                        </div>
                      </div>
                      <p
                        className={`text-base leading-7 mb-8 transition-colors duration-200 ${getEditableClasses()}`}
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
                      >
                        {testimonialBody}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: index === currentSlide ? activeColor : metaTextColor + '40'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


