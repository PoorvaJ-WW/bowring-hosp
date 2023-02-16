// JSON-DRIVEN TestimonialsBasicCard Template
'use client';

import React, { useState, useEffect } from 'react';
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
    c.id === componentId || c.type === 'testimonials-basic-card'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any;
}

export default function TestimonialsBasicCard(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'testimonials-basic-card',
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
      console.error('TestimonialsBasicCard: pageSlug is required when previewContent is not provided');
      return null;
    }
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`TestimonialsBasicCard: content not found for ${pageSlug}/${componentId}`);
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
  const secondaryBackground = getSecondaryTextColor({ theme: currentTheme }) + '0A'; // Very light background
  const headingColor = getTitleColor({ theme: currentTheme }); // For title and author names
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For testimonial text and subtitle
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For author roles and placeholder text
  const buttonColor = getPrimaryButtonColor({ theme: currentTheme }); // For navigation buttons
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow >= testimonials.length ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, testimonials.length - slidesToShow) : prevIndex - 1));
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const visible = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  // Function to render author avatar - either image or initials
  const renderAuthorAvatar = (author: { name?: string; imageUrl?: string }, index: number) => {
    if (!author.imageUrl) {
      // Fallback to initials when no image URL is provided
      return (
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${getEditableClasses()}`}
          style={{ backgroundColor: secondaryBackground }}
          {...getEditableProps(
            (e?: React.MouseEvent) => {
              e?.stopPropagation();
              editWithAI(pageSlug, componentId, `testimonials.${index}.author.imageUrl`, '', 'Author Image', 'image');
            },
            "Click to add author image"
          )}
        >
          <span className="text-sm font-medium" style={{ color: metaTextColor }}>
            {author.name ? getTextContent(author.name).charAt(0) : '?'}
          </span>
        </div>
      );
    }
    
    return (
      <div
        className={`relative group transition-opacity duration-200 ${getEditableClasses()}`}
        {...getEditableProps(
          (e?: React.MouseEvent) => {
            e?.stopPropagation();
            editWithAI(pageSlug, componentId, `testimonials.${index}.author.imageUrl`, author.imageUrl, 'Author Image', 'image');
          },
          "Click to edit author image"
        )}
      >
        <Image
          src={author.imageUrl || PLACEHOLDER_IMAGE}
          alt={getTextContent(author.name) || 'User'}
          width={48}
          height={48}
          className="object-cover rounded-full"
          unoptimized
          priority={index < 3}
        />
      </div>
    );
  };

  return (
    <section 
      className="py-24 relative h-full transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div 
        className="absolute h-[440px] w-full top-0 -z-10 transition-colors duration-200"
        style={{ backgroundColor: secondaryBackground }}
      ></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full justify-between items-center gap-10 flex lg:flex-row flex-col lg:mb-16 mb-10">
          <div className="flex-col justify-start lg:items-start items-center lg:gap-6 gap-3 inline-flex">
            {headline && (
              <h2
                className={`text-4xl font-bold font-manrope leading-normal lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
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
              <h5
                className={`lg:max-w-lg w-full text-lg font-normal leading-relaxed lg:text-start text-center transition-colors duration-200 ${getEditableClasses()}`}
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
              </h5>
            )}
          </div>
          {testimonials.length > slidesToShow && (
            <div className="justify-start items-start gap-6 flex">
              <button
                onClick={prevSlide}
                className="group w-[52px] h-[52px] justify-center items-center flex shadow-xs border hover:border-transparent bg-transparent rounded-full transition-all duration-700 ease-in-out"
                style={{
                  borderColor: buttonColor
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg className="w-6 h-6 group-hover:text-white transition-all duration-700 ease-in-out" style={{ color: buttonColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="group w-[52px] h-[52px] justify-center items-center flex shadow-xs border hover:border-transparent bg-transparent rounded-full transition-all duration-700 ease-in-out"
                style={{
                  borderColor: buttonColor
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = buttonColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg className="w-6 h-6 group-hover:text-white transition-all duration-700 ease-in-out" style={{ color: buttonColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out gap-7">
            {getVisibleTestimonials().map((testimonial, index) => {
              // Handle both correct and incorrect testimonial structures with fallbacks
              const testimonialBody = testimonial.body || testimonial.content || 'Share your experience with us';
              const authorName = testimonial.author?.name || testimonial.name || 'Anonymous';
              const authorRole = testimonial.author?.role || testimonial.role || 'Customer';
              const authorImageUrl = testimonial.author?.imageUrl || (typeof testimonial.image === "object" ? testimonial.image.src : testimonial.image) || null;
              
              return (
                <div
                  key={testimonial.id || index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <div 
                    className="p-6 bg-white rounded-2xl shadow-[0px_15px_40px_-4px_rgba(16,_24,_40,_0.04)] flex-col justify-start items-start inline-flex w-full transition-colors duration-200"
                    style={{ backgroundColor: containerBackground }}
                  >
                    <div className="flex-col justify-center items-start gap-6 flex w-full">
                      <div className="justify-start items-center gap-3 inline-flex">
                        <div className="justify-start items-start flex">
                          <div className="justify-start items-start gap-2.5 flex">
                            {renderAuthorAvatar({ name: authorName, imageUrl: authorImageUrl }, index)}
                          </div>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                          <h6
                            className={`text-base font-medium leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
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
                          </h6>
                          {authorRole && (
                            <span
                              className={`text-xs font-normal leading-normal transition-colors duration-200 ${getEditableClasses()}`}
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
                        className={`text-base font-normal leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

