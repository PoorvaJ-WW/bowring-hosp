// Generated page-specific component for admissions
// This component is isolated - changes here only affect the admissions page
'use client';

import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import metadata from '@/_metadata.json';
import {
  getFontFamily,
  getCurrentBackgroundType,
  getCustomBackgroundColor
} from '@/utils/themeUtils';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getDescriptionColor,
  getSecondaryTextColor,
  getPrimaryButtonColor
} from '@/utils/colorUtils';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'contact-simple-two-column'
  );
};

export default function ContactSimpleTwoColumnAdmissionsAdmissions({
  pageSlug,
  componentId,
  theme,
  backgroundType
}: {
  pageSlug: string;
  componentId: string;
  theme: any;
  backgroundType?: 'primary' | 'secondary';
}) {
  const { theme: contextTheme } = useTheme();
  const currentTheme = theme || contextTheme;
  
  const componentData = getComponentContent(pageSlug, componentId);
  const content = componentData?.content || {};

  const {
    columns = [
      {
        title: 'Sales Support',
        description: 'Get help with product inquiries, pricing, and sales questions.',
        phone: '+1 (555) 123-4567',
        phoneHours: 'Mon-Fri 8am to 6pm PST',
        email: 'sales@example.com'
      },
      {
        title: 'Technical Support',
        description: 'Get assistance with technical issues, troubleshooting, and product setup.',
        phone: '+1 (555) 123-4567',
        phoneHours: 'Mon-Fri 8am to 6pm PST',
        email: 'support@example.com'
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
  const headingColor = getTitleColor({ theme: currentTheme }); // For section titles
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For descriptions and contact info
  const iconColor = getPrimaryButtonColor({ theme: currentTheme }); // For contact icons
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  return (
    <div 
      className="transition-colors duration-200" 
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
          {columns.map((column: any, index: number) => (
            <div key={index} className={index > 0 ? "mt-12 sm:mt-16 md:mt-0" : ""}>
              <h2
                className={`text-2xl font-bold sm:text-3xl sm:tracking-tight transition-opacity duration-200 ${getEditableClasses()}`}
                style={{
                  color: headingColor,
                  fontFamily: headingFont,
                }}
                {...getEditableProps(
                  () => editWithAI(`columns[${index}].title`, column.title, pageSlug, componentId),
                  "Click to edit column title"
                )}
              >
                {column.title}
              </h2>
              <div className="mt-3">
                <p
                  className={`text-lg transition-opacity duration-200 ${getEditableClasses()}`}
                  style={{
                    color: bodyTextColor,
                    fontFamily: bodyFont,
                  }}
                  {...getEditableProps(
                    () => editWithAI(`columns[${index}].description`, column.description, pageSlug, componentId),
                    "Click to edit column description"
                  )}
                >
                  {column.description}
                </p>
              </div>
              <div className="mt-9">
                {column.phone && (
                  <div className="flex">
                    <div className="shrink-0">
                      <PhoneIcon aria-hidden="true" className="size-6" style={{ color: iconColor }} />
                    </div>
                    <div className="ml-3 text-base" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                      <p
                        className={`transition-opacity duration-200 ${getEditableClasses()}`}
                        {...getEditableProps(
                          () => editWithAI(`columns[${index}].phone`, column.phone, pageSlug, componentId),
                          "Click to edit phone number"
                        )}
                      >
                        <a href={`tel:${column.phone}`}>{column.phone}</a>
                      </p>
                      {column.phoneHours && (
                        <p
                          className={`mt-1 transition-opacity duration-200 ${getEditableClasses()}`}
                          {...getEditableProps(
                            () => editWithAI(`columns[${index}].phoneHours`, column.phoneHours, pageSlug, componentId),
                            "Click to edit phone hours"
                          )}
                        >
                          {column.phoneHours}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {column.email && (
                  <div className={`${column.phone ? 'mt-6' : ''} flex`}>
                    <div className="shrink-0">
                      <EnvelopeIcon aria-hidden="true" className="size-6" style={{ color: iconColor }} />
                    </div>
                    <div className="ml-3 text-base" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
                      <p
                        className={`transition-opacity duration-200 ${getEditableClasses()}`}
                        {...getEditableProps(
                          () => editWithAI(`columns[${index}].email`, column.email, pageSlug, componentId),
                          "Click to edit email"
                        )}
                      >
                        <a href={`mailto:${column.email}`}>{column.email}</a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

