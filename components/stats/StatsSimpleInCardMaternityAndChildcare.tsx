// Generated page-specific component for maternity-and-childcare
// This component is isolated - changes here only affect the maternity-and-childcare page
// JSON-DRIVEN StatsSimpleInCard Template - Simple Direct Editing
'use client';

import React from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import {
  getFontFamily
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getAccentColor,
  getFeatureCardBackgroundColor,
  getBorderColor
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
    c.id === componentId || c.type === 'stats-simple-in-card'
  );
};

export default function StatsSimpleInCardMaternityAndChildcareMaternityAndChildcare(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'stats-simple-in-card',
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
    console.error(`StatsSimpleInCard: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with proper defaults
  const {
    headline = 'Trusted by thousands worldwide',
    subheadline = 'Our Impact',
    description = 'Our platform serves millions of users globally with excellence.',
    stats = [
      { value: '100M+', label: 'Users worldwide' },
      { value: '50K+', label: 'Active businesses' },
      { value: '99.9%', label: 'Uptime guarantee' },
      { value: '24/7', label: 'Customer support' }
    ]
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
  const statsContainerBgColor = getFeatureCardBackgroundColor({ theme: currentTheme });
  const statValueColor = getAccentColor({ theme: currentTheme });
  const borderColor = getBorderColor({ theme: currentTheme });

  return (
    <div
      className="pt-12 sm:pt-16 transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {subheadline && (
            <p
              className={`text-base font-semibold leading-7 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: subtitleColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'Stats Subheadline');
                },
                "Click to edit stats subheadline"
              )}
            >
              {subheadline}
            </p>
          )}
          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 ${getEditableClasses()} ${subheadline ? 'mt-2' : ''}`}
            style={{
              color: titleColor,
              fontFamily: getFontFamily(currentTheme, 'heading')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'Stats Headline');
              },
              "Click to edit stats headline"
            )}
          >
            {headline}
          </h2>
          {description && (
            <p
              className={`mt-3 text-xl sm:mt-4 transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body')
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'description', description, 'Stats Description');
                },
                "Click to edit stats description"
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <div
        className="mt-10 pb-12 sm:pb-16 transition-colors duration-200"
        style={{ backgroundColor: statsContainerBgColor }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 h-1/2 transition-colors duration-200"
            style={{ backgroundColor: containerBgColor }}
          />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl
                className="rounded-lg shadow-lg sm:grid sm:grid-cols-4 transition-colors duration-200"
                style={{ backgroundColor: statsContainerBgColor }}
              >
                {stats.map((stat: any, index: number) => (
                  <div
                    key={index}
                    className={`
                      flex flex-col p-6 text-center
                      ${index === 0 ? 'border-b sm:border-0 sm:border-r' : ''}
                      ${index === 1 || index === 2 ? 'border-t border-b sm:border-0 sm:border-l sm:border-r' : ''}
                      ${index === 3 ? 'border-t sm:border-0 sm:border-l' : ''}
                    `}
                    style={{ borderColor: borderColor }}
                  >
                    <dt
                      className={`order-2 mt-2 text-lg/6 font-medium stat-label transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: descriptionColor,
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `stats.${index}.label`, stat.label, `Stat ${index + 1} Label`);
                        },
                        `Click to edit stat ${index + 1} label`
                      )}
                    >
                      {stat.label}
                    </dt>
                    <dd
                      className={`order-1 text-5xl font-bold tracking-tight stat-value transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: statValueColor,
                        fontFamily: getFontFamily(currentTheme, 'heading')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `stats.${index}.value`, stat.value, `Stat ${index + 1} Value`);
                        },
                        `Click to edit stat ${index + 1} value`
                      )}
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
