// Generated page-specific component for diagnostic-services
// This component is isolated - changes here only affect the diagnostic-services page
// JSON-DRIVEN CTATwoColumnsWithPhoto Template - Simple Direct Editing
'use client';

import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
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
  getAccentColor,
  getFeatureCardBackgroundColor,
  getBorderColor
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
    c.id === componentId || c.type === 'cta-two-columns-with-photo'
  );
};

export default function CTATwoColumnsWithPhotoDiagnosticServicesDiagnosticServices(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'cta-two-columns-with-photo',
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
    console.error(`CTATwoColumnsWithPhoto: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Standardized field names with comprehensive fallbacks
  const {
    headline = 'Join our team',
    subheadline = 'Build your career with us',
    description = 'Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.',
    benefits = [
      'Competitive salaries',
      'Flexible work hours',
      '30 days of paid vacation',
      'Annual team retreats',
      'Benefits for you and your family',
      'A great work environment'
    ],
    cta_primary = { text: 'See our job postings', href: '#' },
    cta_secondary = null,
    image = {
      src: 'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      alt: 'Team photo'
    }
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Color helpers using standardized color utilities
  const backgroundColor = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const cardBackgroundColor = getFeatureCardBackgroundColor({ theme: currentTheme });
  const headlineColor = getTitleColor({ theme: currentTheme });
  const subheadlineColor = getDescriptionColor({ theme: currentTheme });
  const descriptionColor = getDescriptionColor({ theme: currentTheme });
  const benefitsColor = getDescriptionColor({ theme: currentTheme });
  const benefitsIconColor = getPrimaryButtonColor({ theme: currentTheme });
  const primaryLinkColor = getPrimaryButtonColor({ theme: currentTheme });
  const primaryLinkHover = getAccentColor({ theme: currentTheme });
  const secondaryLinkColor = getDescriptionColor({ theme: currentTheme });
  const ringColor = getBorderColor({ theme: currentTheme });

  // Normalize CTA data
  const primaryCTA = normalizeCTAData(cta_primary);
  const secondaryCTA = cta_secondary ? normalizeCTAData(cta_secondary) : null;

  return (
    <div 
      className="overflow-hidden py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div 
            className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16 shadow-lg ring-1 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20 transition-colors duration-200"
            style={{ 
              backgroundColor: cardBackgroundColor,
              '--tw-ring-color': ringColor,
            } as React.CSSProperties & { '--tw-ring-color': string }}
          >
            <img
              alt={image.alt || 'Team photo'}
              src={image.src}
              className="h-96 w-full flex-none rounded-2xl object-cover lg:aspect-square lg:h-auto lg:max-w-sm cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={(e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'image.src', image.src, 'Team Photo', 'image');
              }}
              title="Click to edit image"
            />
            <div className="w-full flex-auto">
              {subheadline && (
                <p
                  className="text-base/7 font-semibold transition-colors duration-200 cursor-pointer hover:opacity-80 mb-2"
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
                className="text-4xl font-semibold tracking-tight text-pretty sm:text-5xl transition-colors duration-200 cursor-pointer hover:opacity-80"
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
                  className="mt-6 text-lg/8 text-pretty transition-colors duration-200 cursor-pointer hover:opacity-80"
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

              {benefits && benefits.length > 0 && (
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 sm:grid-cols-2"
                >
                  {benefits.map((benefit: string | { text: string }, index: number) => {
                    const benefitText = typeof benefit === 'string' ? benefit : benefit.text;
                    const benefitKey = typeof benefit === 'string' ? benefit : benefit.text;

                    return (
                      <li
                        key={benefitKey}
                        className="flex gap-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `benefits.${index}`, benefitText, `Benefit ${index + 1}`);
                        }}
                        title="Click to edit benefit"
                      >
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="h-7 w-5 flex-none transition-colors duration-200"
                          style={{ color: benefitsIconColor }}
                        />
                        <span
                          style={{
                            color: benefitsColor,
                            fontFamily: getFontFamily(currentTheme, 'body')
                          }}
                        >
                          {benefitText}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-10 flex gap-x-6">
                {cta_primary && (
                  <a
                    href={primaryCTA.link}
                    className="text-sm/6 font-semibold transition-colors duration-200 cursor-pointer"
                    style={{
                      color: primaryLinkColor,
                      fontFamily: getFontFamily(currentTheme, 'body')
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = primaryLinkHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = primaryLinkColor;
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_primary.text', primaryCTA.text, 'CTA Link Text');
                    }}
                    title="Click to edit link text"
                  >
                    {primaryCTA.text}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}

                {secondaryCTA && (
                  <a
                    href={secondaryCTA.link}
                    className="text-sm/6 font-semibold transition-colors duration-200 cursor-pointer"
                    style={{
                      color: secondaryLinkColor,
                      fontFamily: getFontFamily(currentTheme, 'body')
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      editWithAI(pageSlug, componentId, 'cta_secondary.text', secondaryCTA.text, 'Secondary Link Text');
                    }}
                    title="Click to edit secondary link text"
                  >
                    {secondaryCTA.text}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-1318/752 w-329.5 flex-none bg-linear-to-r from-[#9fd6fc] to-[#8680fd] opacity-50"
          />
        </div>
      </div>
    </div>
  );
}

