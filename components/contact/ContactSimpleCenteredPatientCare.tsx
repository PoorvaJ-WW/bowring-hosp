// Generated page-specific component for patient-care
// This component is isolated - changes here only affect the patient-care page
'use client';

import React from 'react';
import { BugAntIcon, ChatBubbleLeftRightIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
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
    c.id === componentId || c.type === 'contact-simple-centered'
  );
};

export default function ContactSimpleCenteredPatientCarePatientCare({
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
    headline = 'Contact sales',
    subheadline = 'Get in touch with our team for any questions or support needs.',
    contactOptions = [
      {
        icon: 'ChatBubbleLeftRightIcon',
        title: 'Sales support',
        description: 'Get help with product inquiries, pricing information, and sales questions from our dedicated sales team.',
        email: 'sales@example.com',
        phone: '+1 (555) 123-4567',
        phoneHours: 'Mon-Fri 9am to 5pm'
      },
      {
        icon: 'BugAntIcon',
        title: 'Bug reports',
        description: 'Found a bug or issue? Report it to our development team and help us improve our products.',
        email: 'bugs@example.com',
        phone: ''
      },
      {
        icon: 'ComputerDesktopIcon',
        title: 'Technical support',
        description: 'Need technical assistance? Our support team is here to help you resolve any technical issues.',
        email: 'support@example.com',
        phone: '+1 (555) 789-0123',
        phoneHours: 'Mon-Fri 8am to 8pm'
      }
    ]
  } = content;

  const options = contactOptions;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headingColor = getTitleColor({ theme: currentTheme }); // For main title and option titles
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For main description and option descriptions
  const linkColor = getPrimaryButtonColor({ theme: currentTheme }); // For icon backgrounds and link text
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIcon,
      'BugAntIcon': BugAntIcon,
      'ComputerDesktopIcon': ComputerDesktopIcon,
    };
    return iconMap[iconName] || ChatBubbleLeftRightIcon;
  };

  return (
    <div 
      className="isolate px-6 py-24 sm:py-32 lg:px-8 transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2
          className={`text-4xl font-semibold tracking-tight text-balance sm:text-5xl transition-opacity duration-200 ${getEditableClasses()}`}
          style={{
            color: headingColor,
            fontFamily: headingFont,
          }}
          {...getEditableProps(
            () => editWithAI('headline', headline, pageSlug, componentId),
            "Click to edit contact headline"
          )}
        >
          {headline}
        </h2>
        <p
          className={`mt-2 text-lg/8 transition-opacity duration-200 ${getEditableClasses()}`}
          style={{
            color: bodyTextColor,
            fontFamily: bodyFont,
          }}
          {...getEditableProps(
            () => editWithAI('subheadline', subheadline, pageSlug, componentId),
            "Click to edit contact subheadline"
          )}
        >
          {subheadline}
        </p>
      </div>
      
      <div className="mx-auto mt-20 max-w-lg space-y-16">
        {options.map((option: any, index: number) => {
          const IconComponent = getIcon(option.icon);
          
          return (
            <div key={index} className="flex gap-x-6">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: linkColor }}
              >
                <IconComponent aria-hidden="true" className="size-6 text-white" />
              </div>
              <div>
                <h3
                  className={`text-base/7 font-semibold transition-opacity duration-200 ${getEditableClasses()}`}
                  style={{
                    color: headingColor,
                    fontFamily: headingFont,
                  }}
                  {...getEditableProps(
                    () => editWithAI(`contactOptions[${index}].title`, option.title, pageSlug, componentId),
                    "Click to edit contact option title"
                  )}
                >
                  {option.title}
                </h3>
                <p
                  className={`mt-2 text-base/7 transition-opacity duration-200 ${getEditableClasses()}`}
                  style={{
                    color: bodyTextColor,
                    fontFamily: bodyFont,
                  }}
                  {...getEditableProps(
                    () => editWithAI(`contactOptions[${index}].description`, option.description, pageSlug, componentId),
                    "Click to edit contact option description"
                  )}
                >
                  {option.description}
                </p>
                <div className="mt-4 space-y-1">
                  {option.email && (
                    <p className="text-sm/6">
                      <a
                        href={`mailto:${option.email}`}
                        className={`font-semibold hover:underline transition-opacity duration-200 ${getEditableClasses()}`}
                        style={{ color: linkColor, fontFamily: bodyFont }}
                        {...getEditableProps(
                          (e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            editWithAI(`contactOptions[${index}].email`, option.email, pageSlug, componentId);
                          },
                          "Click to edit email"
                        )}
                      >
                        {option.email}
                      </a>
                    </p>
                  )}
                  {option.phone && (
                    <p className="text-sm/6">
                      <a
                        href={`tel:${option.phone}`}
                        className={`font-semibold hover:underline transition-opacity duration-200 ${getEditableClasses()}`}
                        style={{ color: linkColor, fontFamily: bodyFont }}
                        {...getEditableProps(
                          (e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            editWithAI(`contactOptions[${index}].phone`, option.phone, pageSlug, componentId);
                          },
                          "Click to edit phone"
                        )}
                      >
                        {option.phone}
                      </a>
                      {option.phoneHours && (
                        <>
                          <br />
                          <span
                            className={`text-sm transition-opacity duration-200 ${getEditableClasses()}`}
                            style={{ color: bodyTextColor, fontFamily: bodyFont }}
                            {...getEditableProps(
                              (e: React.MouseEvent) => {
                                e.stopPropagation();
                                editWithAI(`contactOptions[${index}].phoneHours`, option.phoneHours, pageSlug, componentId);
                              },
                              "Click to edit phone hours"
                            )}
                          >
                            {option.phoneHours}
                          </span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

