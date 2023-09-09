// JSON-DRIVEN TeamFullWidthWithImages Template - Simple Direct Editing
'use client';

import { type FC } from 'react';
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
    c.id === componentId || c.type === 'team-full-width-with-images'
  );
};

export default function TeamFullWidthWithImages(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'team-full-width-with-images',
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
      console.error('TeamFullWidthWithImages: pageSlug is required when previewContent is not provided');
      return null;
    }
    const componentData = getComponentContent(pageSlug, componentId);
    content = componentData?.content || {};

    if (!content || Object.keys(content).length === 0) {
      console.error(`TeamFullWidthWithImages: content not found for ${pageSlug}/${componentId}`);
      return null;
    }
  }

  // Extract content with standardized field names and defaults
  const {
    headline = 'Our Leadership Team',
    description = 'Meet the leaders driving our mission forward',
    members = [
      {
        name: 'Team Member 1',
        role: 'Position',
        bio: 'Brief biography highlighting experience and expertise',
        image: {
          src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          alt: 'Team Member 1'
        }
      },
      {
        name: 'Team Member 2',
        role: 'Position',
        bio: 'Brief biography highlighting experience and expertise',
        image: {
          src: 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png',
          alt: 'Team Member 2'
        }
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
  const headingColor = getTitleColor({ theme: currentTheme }); // For title and member names
  const bodyTextColor = getDescriptionColor({ theme: currentTheme }); // For subtitle, member roles, and bios
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme }); // For social links and placeholder text
  const linkColor = getPrimaryButtonColor({ theme: currentTheme }); // For social link hover state
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  return (
    <div 
      className="py-24 sm:py-32 transition-colors duration-200"
      style={{ backgroundColor: containerBackground }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2
            className={`text-3xl font-semibold tracking-tight text-balance sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: headingColor,
              fontFamily: headingFont
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'headline', headline, 'Headline');
              },
              "Click to edit headline"
            )}
          >
            {headline}
          </h2>
          <p
            className={`mt-6 text-lg/8 transition-colors duration-200 ${getEditableClasses()}`}
            style={{
              color: bodyTextColor,
              fontFamily: bodyFont
            }}
            {...getEditableProps(
              (e) => {
                e.stopPropagation();
                editWithAI(pageSlug, componentId, 'description', description, 'Description');
              },
              "Click to edit description"
            )}
          >
            {description}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
        >
          {members.map((member: any, index: number) => {
            const normalizedImage = normalizeImageData(member.image, `team-member-${index}`);
            const memberName = member.name || 'Team Member';
            const memberRole = member.role || 'Team Member';
            const memberBio = member.bio || '';
            const imageUrl = normalizedImage?.src || 'https://storage.googleapis.com/site-media-asia-01/common/placeholder-image.png';

            return (
              <li key={member.name || `member-${index}`} className="flex flex-col gap-6 xl:flex-row">
                <div className="rounded-md shadow">
                  <div
                    className={`transition-opacity duration-200 ${getEditableClasses()}`}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `members.${index}.image.src`, normalizedImage?.src || '', `Member ${index + 1} Image`, 'image');
                      },
                      normalizedImage?.src ? "Click to edit image" : "Click to add image"
                    )}
                  >
                    <img
                      src={imageUrl}
                      alt={normalizedImage?.alt || memberName}
                      className="aspect-4/5 w-52 flex-none rounded-2xl object-cover"
                    />
                  </div>
                  {false && (
                    <div
                      className={`aspect-4/5 w-52 flex-none rounded-2xl bg-gray-100 flex items-center justify-center ${getEditableClasses()}`}
                      {...getEditableProps(
                        (e) => {
                          e.stopPropagation();
                          editWithAI(pageSlug, componentId, `members.${index}.image.src`, '', `Member ${index + 1} Image`, 'image');
                        },
                        "Click to add image"
                      )}
                    >
                      <span style={{ color: metaTextColor }}>Add Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-auto">
                  <h3
                    className={`text-lg/8 font-semibold tracking-tight transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: headingColor,
                      fontFamily: headingFont
                    }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `members.${index}.name`, member.name, `Member ${index + 1} Name`);
                      },
                      `Click to edit member ${index + 1} name`
                    )}
                  >
                    {memberName}
                  </h3>
                  <p
                    className={`text-base/7 transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: bodyTextColor,
                      fontFamily: bodyFont
                    }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `members.${index}.role`, member.role || '', `Member ${index + 1} Role`);
                      },
                      `Click to edit member ${index + 1} role`
                    )}
                  >
                    {memberRole}
                  </p>
                  {memberBio && (
                  <p
                    className={`mt-6 text-base/7 transition-colors duration-200 ${getEditableClasses()}`}
                    style={{
                      color: bodyTextColor,
                      fontFamily: bodyFont
                    }}
                    {...getEditableProps(
                      (e) => {
                        e.stopPropagation();
                        editWithAI(pageSlug, componentId, `members.${index}.bio`, member.bio, `Member ${index + 1} Bio`);
                      },
                      `Click to edit member ${index + 1} bio`
                    )}
                  >
                    {memberBio}
                  </p>
                  )}
                  {/* Social links section */}
                  <ul role="list" className="mt-6 flex gap-x-6">
                    {member.xUrl && (
                      <li>
                        <a
                          href={member.xUrl}
                          className="transition-colors duration-200 hover:opacity-75"
                          style={{ color: metaTextColor }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = linkColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = metaTextColor;
                          }}
                        >
                          <span className="sr-only">X</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                            <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                          </svg>
                        </a>
                      </li>
                    )}
                    {member.linkedinUrl && (
                      <li>
                        <a
                          href={member.linkedinUrl}
                          className="transition-colors duration-200 hover:opacity-75"
                          style={{ color: metaTextColor }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = linkColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = metaTextColor;
                          }}
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5">
                            <path
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

