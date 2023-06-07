// Generated page-specific component for for-visitors
// This component is isolated - changes here only affect the for-visitors page
// JSON-DRIVEN FaqThreeColumnCenter Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily } from '@/utils/themeUtils';
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
    c.id === componentId || c.type === 'faq-three-column-center'
  );
};

export default function FaqThreeColumnCenterForVisitorsForVisitors(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'faq-three-column-center',
    theme: propTheme,
    backgroundType,
    previewContent
  } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from JSON metadata or use preview content
  const componentData = !previewContent ? getComponentContent(pageSlug, componentId) : null;
  const content = previewContent || componentData?.content || {};

  if (!previewContent && (!content || Object.keys(content).length === 0)) {
    console.error(`FaqThreeColumnCenter: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    headline = 'Frequently asked questions',
    subheadline = 'Support',
    description = "Have a different question and can't find the answer you're looking for? Reach out to our support team by sending us an email and we'll get back to you as soon as we can.",
    faqs = []
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headingColor = getTitleColor({ theme: currentTheme }); // For main title and questions
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For main description and answers
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For subtitle
  const linkColor = getPrimaryButtonColor({ theme: currentTheme }); // For links in description
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  return (
    <div 
      className="py-16 sm:py-24 transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {subheadline && (
            <h2
              className={`text-base font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: metaTextColor,
                fontFamily: headingFont
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'FAQ Subheadline');
                },
                "Click to edit FAQ subheadline"
              )}
            >
              {subheadline}
            </h2>
          )}

          <h2
            className={`text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200 ${getEditableClasses()} ${subheadline ? 'mt-2' : ''}`}
            style={{
              color: headingColor,
              fontFamily: headingFont
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'FAQ Headline');
              },
              "Click to edit FAQ headline"
            )}
          >
            {headline}
          </h2>

          {description && (
            <p
              className={`mt-6 text-base/7 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: bodyTextColor,
                fontFamily: bodyFont
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'description', description, 'FAQ Description');
                },
                "Click to edit FAQ description"
              )}
            >
              {description.includes('sending us an email') ? (
                <>
                  {description.split('sending us an email')[0]}
                  <a 
                    href="#" 
                    className="font-semibold hover:opacity-80 transition-opacity duration-200"
                    style={{ color: linkColor }}
                  >
                    sending us an email
                  </a>
                  {description.split('sending us an email')[1]}
                </>
              ) : (
                description
              )}
            </p>
          )}
        </div>
        
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq: any, index: number) => (
              <div key={faq.question || index}>
                <dt
                  className={`text-base/7 font-semibold transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: headingColor,
                    fontFamily: headingFont
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `faqs.${index}.question`, faq.question, `FAQ ${index + 1} Question`);
                    },
                    `Click to edit FAQ ${index + 1} question`
                  )}
                >
                  {faq.question}
                </dt>
                <dd
                  className={`mt-2 text-base/7 transition-colors duration-200 ${getEditableClasses()}`}
                  style={{
                    color: bodyTextColor,
                    fontFamily: bodyFont
                  }}
                  {...getEditableProps(
                    (e) => {
                      e.stopPropagation();
                      editWithAI(pageSlug, componentId, `faqs.${index}.answer`, faq.answer, `FAQ ${index + 1} Answer`);
                    },
                    `Click to edit FAQ ${index + 1} answer`
                  )}
                >
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
