// Generated page-specific component for medical-college
// This component is isolated - changes here only affect the medical-college page
// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// JSON-DRIVEN StatsWithDescription Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
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
  getFeatureCardBackgroundColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
}

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'stats-with-description'
  );
};

export default function StatsWithDescriptionMedicalCollege(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'stats-with-description',
    theme: propTheme,
    backgroundType
  } = props;
  const { theme: contextTheme } = useTheme();
  
  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from JSON metadata
  const componentData = getComponentContent(pageSlug, componentId);
  const content = componentData?.content || {};

  if (!content || Object.keys(content).length === 0) {
    console.error(`StatsWithDescription: content not found for ${pageSlug}/${componentId}`);
    return null;
  }
  
  // Extract content with proper defaults
  const {
    headline = 'Our Impact',
    subheadline = 'Key Achievements',
    description = 'Discover the numbers that define our commitment to excellence and our dedication to serving you better every day.',
    stats = [
      { value: '1M+', label: 'Happy customers', description: 'Users trust our platform daily' },
      { value: '150+', label: 'Global team', description: 'Dedicated professionals worldwide' },
      { value: '99.9%', label: 'Uptime', description: 'Reliable service you can count on' }
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
  const accentColor = getAccentColor({ theme: currentTheme });
  const cardBackgroundColor = getFeatureCardBackgroundColor({ theme: currentTheme });

  return (
    <section
      className="relative py-20 overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial gradient circles */}
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${accentColor}60 0%, transparent 70%)`,
            animationDuration: '8s'
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${subtitleColor}60 0%, transparent 70%)`,
            animationDuration: '10s',
            animationDelay: '2s'
          }}
        />
        
        {/* Dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, ${titleColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          {subheadline && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="h-px w-12"
                style={{ backgroundColor: subtitleColor, opacity: 0.5 }}
              />
              <p
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 ${getEditableClasses()}`}
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
              <div 
                className="h-px w-12"
                style={{ backgroundColor: subtitleColor, opacity: 0.5 }}
              />
            </div>
          )}
          
          <h2
            className={`text-4xl sm:text-5xl font-bold transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: titleColor,
              fontFamily: getFontFamily(currentTheme, 'heading'),
              textShadow: `0 0 40px ${titleColor}10`
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
              className={`mt-6 text-lg leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: descriptionColor,
                fontFamily: getFontFamily(currentTheme, 'body'),
                opacity: 0.9
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.slice(0, 3).map((stat: any, index: number) => {
            const statValue = stat.value || '0';
            const statLabel = stat.label || 'Stat';
            const statDescription = stat.description || '';

            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Animated background glow */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Main card */}
                <div
                  className="relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{ 
                    backgroundColor: cardBackgroundColor,
                    border: `1px solid ${accentColor}20`,
                    boxShadow: `0 4px 6px -1px ${titleColor}10`
                  }}
                >
                  {/* Top decorative element */}
                  <div 
                    className="absolute top-0 left-8 w-16 h-1 rounded-b-full"
                    style={{ 
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`
                    }}
                  />

                  {/* Corner accent */}
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(225deg, ${accentColor} 0%, transparent 70%)`,
                      borderRadius: '0 24px 0 0'
                    }}
                  />

                  {/* Stat number with enhanced styling */}
                  <div className="mb-4">
                    <div
                      className={`text-5xl sm:text-6xl font-black transition-all duration-300 group-hover:scale-110 inline-block ${getEditableClasses()}`}
                      style={{
                        color: accentColor,
                        fontFamily: getFontFamily(currentTheme, 'heading'),
                        textShadow: `0 0 30px ${accentColor}40`,
                        background: `linear-gradient(135deg, ${accentColor}, ${subtitleColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `stats.${index}.value`, stat.value || '', `Stat ${index + 1} Value`);
                        },
                        `Click to edit stat ${index + 1} value`
                      )}
                    >
                      {statValue}
                    </div>
                  </div>

                  {/* Divider line */}
                  <div 
                    className="w-12 h-0.5 mb-4 rounded-full"
                    style={{ backgroundColor: accentColor, opacity: 0.3 }}
                  />

                  {/* Label */}
                  <h4
                    className={`text-xl font-bold mb-2 transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: titleColor,
                      fontFamily: getFontFamily(currentTheme, 'heading')
                    }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `stats.${index}.label`, stat.label || '', `Stat ${index + 1} Label`);
                      },
                      `Click to edit stat ${index + 1} label`
                    )}
                  >
                    {statLabel}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: descriptionColor,
                      fontFamily: getFontFamily(currentTheme, 'body'),
                      opacity: 0.8
                    }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `stats.${index}.description`, stat.description, `Stat ${index + 1} Description`);
                      },
                      `Click to edit stat ${index + 1} description`
                    )}
                  >
                    {statDescription}
                  </p>

                  {/* Bottom indicator that appears on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, ${subtitleColor})`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.15;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
