// Generated page-specific component for cookie-policy
// This component is isolated - changes here only affect the cookie-policy page
// JSON-DRIVEN ContentLegal Template - Legal Content with AI Editing
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
  getDescriptionColor
} from '@/utils/colorUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';

// Helper function to get component content from metadata
const getComponentContent = (pageSlug: string, componentId: string) => {
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;

  return page.components?.find((c: any) =>
    c.id === componentId || c.type === 'content-legal'
  );
};

interface Props {
  pageSlug?: string;
  componentId?: string;
  theme?: any;
  backgroundType?: 'primary' | 'secondary';
  previewContent?: any; // For preview mode during component swap
}

export default function ContentLegalCookiePolicyCookiePolicy(props: Props) {
  const { pageSlug = 'legal', componentId = 'content-legal', theme: propTheme, backgroundType, previewContent } = props;
  const { theme: contextTheme } = useTheme();

  // Use theme from props (editor) or context
  const currentTheme = propTheme || contextTheme;

  // Get content from preview or JSON metadata
  let content = previewContent;

  if (!content && pageSlug) {
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};
  }

  if (!content || Object.keys(content).length === 0) {
    console.error(`ContentLegal: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Extract content with standardized field names and fallbacks
  const {
    title = 'Legal Information',
    lastUpdated = 'January 22, 2025',
    sections = [
      {
        id: 'terms',
        title: '1. Terms of Service',
        subsections: [
          {
            title: '1.1 Acceptance of Terms',
            content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
          },
          {
            title: '1.2 Use License',
            content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
            list: [
              'Modify or copy the materials',
              'Use the materials for any commercial purpose or for any public display',
              'Attempt to reverse engineer any software contained on the website',
              'Remove any copyright or other proprietary notations from the materials'
            ]
          },
          {
            title: '1.3 Disclaimer',
            content: 'The materials on our website are provided on an \'as is\' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
          },
          {
            title: '1.4 Limitations',
            content: 'In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.'
          }
        ]
      },
      {
        id: 'privacy',
        title: '2. Privacy Policy',
        subsections: [
          {
            title: '2.1 Information We Collect',
            content: 'We collect several types of information from and about users of our website, including:',
            list: [
              'Personal information that you provide by filling in forms on our website',
              'Information about your internet connection, the equipment you use to access our website, and usage details',
              'Details of transactions you carry out through our website'
            ]
          },
          {
            title: '2.2 How We Use Your Information',
            content: 'We use information that we collect about you or that you provide to us, including any personal information:',
            list: [
              'To present our website and its contents to you',
              'To provide you with information, products, or services that you request',
              'To fulfill any other purpose for which you provide it',
              'To notify you about changes to our website or any products or services',
              'To improve our website and customer service'
            ]
          },
          {
            title: '2.3 Data Security',
            content: 'We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website, you are responsible for keeping this password confidential.'
          },
          {
            title: '2.4 Your Rights',
            content: 'You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data. To exercise these rights, please contact us using the information provided below.'
          }
        ]
      },
      {
        id: 'cookies',
        title: '3. Cookie Policy',
        subsections: [
          {
            title: '3.1 What Are Cookies',
            content: 'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.'
          },
          {
            title: '3.2 How We Use Cookies',
            content: 'We use cookies for the following purposes:',
            list: [
              'Essential cookies: These are required for the operation of our website',
              'Analytics cookies: These help us understand how visitors interact with our website',
              'Preference cookies: These enable our website to remember your choices'
            ]
          },
          {
            title: '3.3 Managing Cookies',
            content: 'Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.'
          }
        ]
      },
      {
        id: 'acceptable-use',
        title: '4. Acceptable Use Policy',
        subsections: [
          {
            title: '4.1 Prohibited Uses',
            content: 'You may use our website only for lawful purposes. You agree not to use our website:',
            list: [
              'In any way that violates any applicable federal, state, local, or international law or regulation',
              'To transmit, or procure the sending of, any advertising or promotional material without our prior written consent',
              'To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity',
              'To engage in any other conduct that restricts or inhibits anyone\'s use or enjoyment of the website'
            ]
          },
          {
            title: '4.2 User Contributions',
            content: 'Any content you post to the site will be considered non-confidential and non-proprietary. By providing any user contribution, you grant us the right to use, reproduce, modify, and display such content in connection with our business.'
          }
        ]
      },
      {
        id: 'contact',
        title: '5. Contact Information',
        subsections: [
          {
            content: 'If you have any questions about these legal terms, please contact us at legal@example.com.\n\nOur mailing address is 123 Legal Street, Suite 100, City, State 12345.\n\nYou can also reach us by phone at (555) 123-4567 during business hours.'
          }
        ]
      }
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

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: containerBgColor }}
    >
      {/* Header */}
      <header
        className="border-b transition-colors duration-200"
        style={{
          borderColor: subtitleColor + '20',
          backgroundColor: containerBgColor === currentTheme?.colors?.background ? currentTheme?.colors?.card : containerBgColor
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <h1
            className={`text-3xl font-bold transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: titleColor,
              fontFamily: getFontFamily(currentTheme, 'heading')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'title', title, 'Page Title');
              },
              "Click to edit page title"
            )}
          >
            {title}
          </h1>
          <p
            className={`mt-2 text-sm transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: subtitleColor,
              fontFamily: getFontFamily(currentTheme, 'body')
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'lastUpdated', lastUpdated, 'Last Updated Date');
              },
              "Click to edit last updated date"
            )}
          >
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {sections.map((section: any, sectionIndex: number) => (
          <section
            key={section.id || sectionIndex}
            id={section.id}
            className={`scroll-mt-8 ${sectionIndex < sections.length - 1 ? 'mb-16' : ''}`}
          >
            <h2
              className={`mb-6 text-2xl font-bold transition-colors duration-200 ${getEditableClasses()}`}
              style={{
                color: titleColor,
                fontFamily: getFontFamily(currentTheme, 'heading')
              }}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, `sections.${sectionIndex}.title`, section.title, 'Section Title');
                },
                "Click to edit section title"
              )}
            >
              {section.title}
            </h2>

            <div className="space-y-6 leading-relaxed">
              {section.subsections?.map((subsection: any, subIndex: number) => (
                <div key={subIndex}>
                  {subsection.title && (
                    <h3
                      className={`mb-3 text-xl font-semibold transition-colors duration-200 ${getEditableClasses()}`}
                      style={{
                        color: titleColor,
                        fontFamily: getFontFamily(currentTheme, 'heading')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `sections.${sectionIndex}.subsections.${subIndex}.title`, subsection.title, 'Subsection Title');
                        },
                        "Click to edit subsection title"
                      )}
                    >
                      {subsection.title}
                    </h3>
                  )}

                  {subsection.content && (
                    <p
                      className={`transition-colors duration-200 ${subsection.list ? 'mb-3' : ''} ${getEditableClasses()} whitespace-pre-line`}
                      style={{
                        color: descriptionColor,
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `sections.${sectionIndex}.subsections.${subIndex}.content`, subsection.content, 'Content');
                        },
                        "Click to edit content"
                      )}
                    >
                      {subsection.content}
                    </p>
                  )}

                  {subsection.list && (
                    <ul
                      className="ml-6 list-disc space-y-2"
                      style={{
                        color: descriptionColor,
                        fontFamily: getFontFamily(currentTheme, 'body')
                      }}
                    >
                      {subsection.list.map((item: string, itemIndex: number) => (
                        <li
                          key={itemIndex}
                          className={`transition-colors duration-200 ${getEditableClasses()}`}
                          {...getEditableProps(
                            (e) => {
                              e.stopPropagation();
                              editWithAI(pageSlug, componentId, `sections.${sectionIndex}.subsections.${subIndex}.list.${itemIndex}`, item, 'List Item');
                            },
                            "Click to edit list item"
                          )}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

