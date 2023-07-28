// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// Generated page-specific component for home
// This component is isolated - changes here only affect the home page
// JSON-DRIVEN ContactSplitWithMap Template - Simple Direct Editing
'use client';

import React from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import {
  getFontFamily,
  normalizeImageData,
  getContentField,
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
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'contact-split-with-map'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
}

export default function ContactSplitWithMapHome(props: Props) {
  const { pageSlug = 'contact', componentId = 'contact-split-with-map', theme: propTheme, backgroundType } = props;
  const { theme: contextTheme } = useTheme();
  
  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from JSON metadata
  if (!pageSlug) {
    console.error('ContactSplitWithMap: pageSlug is required');
    return null;
  }

  const componentData = getComponentContent(pageSlug, componentId);
  const content = componentData?.content || {};

  if (!content || Object.keys(content).length === 0) {
    console.error(`ContactSplitWithMap: content not found for ${pageSlug}/${componentId}`);
    return null;
  }
  
  
  if (!currentTheme) {
    console.error('ContactSplitWithMap: theme is undefined');
    // Create a default theme to prevent the component from crashing
    const defaultTheme = { 
      mode: 'light', 
      colors: {
        primary: { light: '#4F46E5', dark: '#6366F1' },
        background: {
          primary: { light: '#FFFFFF', dark: '#1A1A1A' },
          secondary: { light: '#F9FAFB', dark: '#111827' }
        },
        text: {
          primary: { light: '#111827', dark: '#F9FAFB' },
          secondary: { light: '#6B7280', dark: '#9CA3AF' }
        }
      },
      fonts: {
        heading: 'system-ui, sans-serif',
        body: 'system-ui, sans-serif'
      }
    };
    // Use the default theme
    Object.assign(currentTheme || {}, defaultTheme);
  }

  // From this point, we can safely assume theme and theme.colors exist
  
  const {
    headline = 'Get in touch',
    subheadline = 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    address = '123 Main Street, Suite 100, City, State 12345',
    phone = '+1 (555) 123-4567',
    phoneHours = 'Mon-Fri 9am to 5pm',
    email = 'contact@example.com',
    mapUrl = 'https://maps.app.goo.gl/coi5z48z8o5SZqdXA',
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const headingColor = getTitleColor({ theme: currentTheme }); // For main title and address headings
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For main description and contact text
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For map placeholder text
  const iconColor = getPrimaryButtonColor({ theme: currentTheme }); // For contact icons
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');
  
  const currentBackgroundType = getCurrentBackgroundType(content);
  const customBackgroundColor = getCustomBackgroundColor(content, currentTheme);

  // Use the provided map URL directly
  const getValidMapUrl = (): string | null => {
    return mapUrl || null;
  };

  const renderMap = () => {
    const validMapUrl = getValidMapUrl();
    if (!validMapUrl) {
      return (
        <div
          className={`w-full h-full bg-gray-100 flex items-center justify-center text-center p-4 hover:bg-gray-200 transition-colors duration-200 ${getEditableClasses()}`}
          {...getEditableProps(
            (e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'mapUrl', '', 'Map URL (Google Maps embed URL)');
            },
            "Click to add a custom map URL"
          )}
        >
          <div>
            <p className="mb-2" style={{ color: metaTextColor, fontFamily: bodyFont }}>Map not available</p>
            <p className="text-sm" style={{ color: metaTextColor, fontFamily: bodyFont }}>
              Click to add a map URL
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="relative w-full h-full group">
        <iframe
          key={validMapUrl}
          src={validMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Location Map"
        />
        <div
          className={`absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-5 transition-all duration-200 flex items-center justify-center ${getEditableClasses()}`}
          {...getEditableProps(
            (e) => {
              e.stopPropagation();
              editWithAI(pageSlug, componentId, 'mapUrl', mapUrl || validMapUrl, 'Map URL (Google Maps embed URL)');
            },
            "Click to edit map location"
          )}
        >
          <div className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 px-4 py-2 rounded-lg text-sm transition-opacity duration-200 pointer-events-none" style={{ color: bodyTextColor }}>
            ✏️ Click to edit map location
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative isolate transition-colors duration-200" 
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Contact Information */}
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            {/* Pattern removed so the background color is visible */}
            <h2
              className={`text-pretty text-4xl font-semibold tracking-tight sm:text-5xl contact-headline transition-colors duration-200 ${getEditableClasses()}`}
              data-contact-field="headline"
              style={{
                color: headingColor,
                fontFamily: headingFont,
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'headline', headline, 'Contact Headline');
                },
                "Click to edit contact headline"
              )}
            >
              {headline}
            </h2>

            <p
              className={`mt-6 text-lg/8 contact-subheadline transition-colors duration-200 ${getEditableClasses()}`}
              data-contact-field="subheadline"
              style={{
                color: bodyTextColor,
                fontFamily: bodyFont,
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'subheadline', subheadline, 'Contact Subheadline');
                },
                "Click to edit contact subheadline"
              )}
            >
              {subheadline}
            </p>

            <dl className="mt-10 space-y-4 text-base/7" style={{ color: bodyTextColor, fontFamily: bodyFont }}>
              {address && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon className="h-7 w-6" style={{ color: iconColor }} aria-hidden="true" />
                  </dt>
                  <dd>
                    <span
                      className={`contact-address transition-colors duration-200 ${getEditableClasses()}`}
                      data-contact-field="address"
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'address', address, 'Address');
                        },
                        "Click to edit address"
                      )}
                    >
                      {address}
                    </span>
                  </dd>
                </div>
              )}

              {phone && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon className="h-7 w-6" style={{ color: iconColor }} aria-hidden="true" />
                  </dt>
                  <dd>
                    <a
                      href={`tel:${phone}`}
                      className={`hover:text-gray-900 contact-phone transition-colors duration-200 ${getEditableClasses()}`}
                      data-contact-field="phone"
                      {...getEditableProps(
                        (e: React.MouseEvent) => {
                          e.preventDefault();
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'phone', phone, 'Phone Number');
                        },
                        "Click to edit phone number"
                      )}
                    >
                      {phone}
                    </a>
                    {phoneHours && (
                      <>
                        <br />
                        <span
                          className={`contact-phone-hours transition-colors duration-200 ${getEditableClasses()}`}
                          data-contact-field="phoneHours"
                          {...getEditableProps(
                            (e: React.MouseEvent) => {
                              e.stopPropagation();
                              editWithAI(pageSlug, componentId, 'phoneHours', phoneHours, 'Phone Hours');
                            },
                            "Click to edit phone hours"
                          )}
                        >
                          {phoneHours}
                        </span>
                      </>
                    )}
                  </dd>
                </div>
              )}

              {email && (
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon className="h-7 w-6" style={{ color: iconColor }} aria-hidden="true" />
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${email}`}
                      className={`hover:text-gray-900 contact-email transition-colors duration-200 ${getEditableClasses()}`}
                      data-contact-field="email"
                      {...getEditableProps(
                        (e: React.MouseEvent) => {
                          e.preventDefault();
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, 'email', email, 'Email Address');
                        },
                        "Click to edit email address"
                      )}
                    >
                      {email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="relative h-full">
          <div className="absolute inset-0">
            {renderMap()}
          </div>
        </div>
      </div>
    </div>
  );
};



