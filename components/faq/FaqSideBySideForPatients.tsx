// Generated page-specific component for for-patients
// This component is isolated - changes here only affect the for-patients page
// JSON-DRIVEN FaqSideBySide Template - Simple Direct Editing
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
    c.id === componentId || c.type === 'faq-side-by-side'
  );
};

export default function FaqSideBySideForPatientsForPatients(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'faq-side-by-side',
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
    console.error(`FaqSideBySide: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    headline = 'Frequently asked questions',
    subheadline = 'Support',
    description,
    faqs = [
      {
        question: "What's the best thing about Switzerland?",
        answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
      },
      {
        question: 'How do you make holy water?',
        answer: 'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.'
      },
      {
        question: 'What do you call someone with no body and no nose?',
        answer: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.'
      },
      {
        question: 'Why do you never see elephants hiding in trees?',
        answer: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
      },
      {
        question: "Why can't you hear a pterodactyl go to the bathroom?",
        answer: 'Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.'
      },
      {
        question: 'Why did the invisible man turn down the job offer?',
        answer: "He couldn't see himself doing it. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet perspiciatis officiis corrupti tenetur. Temporibus ut voluptatibus, perferendis sed unde rerum deserunt eius."
      }
    ]
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headingColor = getTitleColor({ theme: currentTheme }); // For main title and questions
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For answers
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For dividers
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  return (
    <div
      className="transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        {subheadline && (
          <p
            className="text-base font-semibold leading-7 transition-colors duration-200 cursor-pointer hover:opacity-80"
            style={{
              color: metaTextColor,
              fontFamily: headingFont
            }}
            onClick={(e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'FAQ Subheadline');
            }}
            title="Click to edit FAQ subheadline"
          >
            {subheadline}
          </p>
        )}

        <h2
          className={`text-4xl font-semibold tracking-tight sm:text-5xl transition-colors duration-200 cursor-pointer hover:opacity-80 ${subheadline ? 'mt-2' : ''}`}
          style={{
            color: headingColor,
            fontFamily: headingFont
          }}
          onClick={(e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'headline', headline, 'FAQ Headline');
          }}
          title="Click to edit FAQ headline"
        >
          {headline}
        </h2>

        {description && (
          <p
            className="mt-6 text-base/7 transition-colors duration-200 cursor-pointer hover:opacity-80"
            style={{
              color: bodyTextColor,
              fontFamily: bodyFont
            }}
            onClick={(e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'description', description, 'FAQ Description');
            }}
            title="Click to edit FAQ description"
          >
            {description}
          </p>
        )}
        
        <dl 
          className="mt-20 divide-y"
          style={{ 
            borderColor: metaTextColor + '1A' // 10% opacity for divide color
          }}
        >
          {faqs.map((faq: any, index: number) => (
            <div key={faq.question || index} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt 
                className="text-base/7 font-semibold lg:col-span-5 transition-colors duration-200 cursor-pointer hover:opacity-80"
                style={{
                  color: headingColor,
                  fontFamily: headingFont
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, `faqs.${index}.question`, faq.question, `FAQ ${index + 1} Question`);
                }}
                title={`Click to edit FAQ ${index + 1} question`}
              >
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p 
                  className="text-base/7 transition-colors duration-200 cursor-pointer hover:opacity-80"
                  style={{
                    color: bodyTextColor,
                    fontFamily: bodyFont
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, `faqs.${index}.answer`, faq.answer, `FAQ ${index + 1} Answer`);
                  }}
                  title={`Click to edit FAQ ${index + 1} answer`}
                >
                  {faq.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
