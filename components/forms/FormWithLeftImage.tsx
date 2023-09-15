// JSON-DRIVEN FormWithLeftImage Template - Simple Direct Editing
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily, normalizeImageData } from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getAccentColor
} from '@/utils/colorUtils';

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
    c.id === componentId || c.type === 'form-with-left-image'
  );
};

export default function FormWithLeftImage(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'form-with-left-image',
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
    console.error(`FormWithLeftImage: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    formName = 'Contact Form',
    formId = componentId, // Fallback to componentId if formId not provided
    eyebrow = 'Contact',
    title = "Let's Get in Touch",
    subtitle = 'our dedicated team is ready to support you.',
    image = {
      src: 'https://pagedone.io/asset/uploads/1759223307.png',
      alt: 'Contact illustration'
    },
    fields = [
      { name: 'first-name', label: 'First Name', type: 'text', required: true, gridCols: 1 },
      { name: 'last-name', label: 'Last Name', type: 'text', required: true, gridCols: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1 },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: false, gridCols: 1 },
      { name: 'message', label: 'Message', type: 'textarea', required: true, gridCols: 2, rows: 6 }
    ],
    submitButtonText = 'Send Your Message',
    successMessage = 'Thank you! Your message has been sent successfully.',
    styles = {}
  } = content;

  // Override backgroundType with prop if provided
  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme utilities using standardized color functions
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const eyebrowColor = getAccentColor({ theme: currentTheme });
  const subtitleColor = getDescriptionColor({ theme: currentTheme });
  const buttonBg = getPrimaryButtonColor({ theme: currentTheme });
  const buttonHoverBg = getAccentColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

  const normalizedImage = normalizeImageData(image);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [altchaVerified, setAltchaVerified] = useState(false);
  const altchaRef = useRef<any>(null);

  // Form values state for conditional rendering
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Load ALTCHA widget script
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="altcha"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/altcha@2.2.4/dist/altcha.min.js';
      script.type = 'module';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Listen for ALTCHA verification events
  useEffect(() => {
    const handleStateChange = (ev: any) => {
      if (ev.detail?.state === 'verified') {
        setAltchaVerified(true);
      } else if (ev.detail?.state === 'unverified' || ev.detail?.state === 'error') {
        setAltchaVerified(false);
      }
    };

    const timeoutId = setTimeout(() => {
      const widget = altchaRef.current || document.querySelector('altcha-widget');
      if (widget) {
        widget.addEventListener('statechange', handleStateChange);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      const widget = altchaRef.current || document.querySelector('altcha-widget');
      if (widget) {
        widget.removeEventListener('statechange', handleStateChange);
      }
    };
  }, []);

  // Handle form field changes for conditional rendering
  const handleFieldChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Check if a field should be displayed based on conditional logic
  const shouldDisplayField = (field: any): boolean => {
    if (!field.conditionalOn) return true;

    const { field: dependentField, value: expectedValue } = field.conditionalOn;
    return formValues[dependentField] === expectedValue;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      const data: Record<string, any> = {};

      // Convert FormData to plain object
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Honeypot check - if the hidden field is filled, it's a bot
      if (data['website']) {
        console.log('Bot detected via honeypot');
        setSubmitStatus('success');
        setSubmitMessage(successMessage);
        formElement.reset();
        return;
      }

      // Remove honeypot field from data
      delete data['website'];

      // Get websiteId from metadata
      const websiteId = (metadata as any).websiteId || 'unknown';

      // Submit to API
      const response = await fetch('/api/form-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          websiteId,
          formId: formId,
          formName: formName,
          formType: 'form-with-left-image',
          formData: data,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(successMessage);
        formElement.reset();
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative w-full transition-colors duration-200" style={{ backgroundColor: containerBackground }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-full md:col-span-5 lg:col-span-5 flex flex-col gap-10">
            <div>
              <h6
                className={`text-base font-medium leading-7 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: eyebrowColor,
                  fontFamily: headingFont
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'eyebrow', eyebrow, 'Form Eyebrow');
                  },
                  "Click to edit form eyebrow"
                )}
              >
                {eyebrow}
              </h6>
              <h2
                className={`font-bold text-4xl leading-10 pt-5 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: titleColor,
                  fontFamily: headingFont
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'title', title, 'Form Title');
                  },
                  "Click to edit form title"
                )}
              >
                {title}
              </h2>
              <p
                className={`text-lg font-normal leading-7 pt-3 transition-colors duration-200 ${getEditableClasses()}`}
                style={{
                  color: subtitleColor,
                  fontFamily: bodyFont
                }}
                {...getEditableProps(
                  (e) => {
                    e.stopPropagation();
                    editWithAI(pageSlug, componentId, 'subtitle', subtitle, 'Form Subtitle');
                  },
                  "Click to edit form subtitle"
                )}
              >
                {subtitle}
              </p>
            </div>
            <div
              className={`relative ${getEditableClasses()}`}
              {...getEditableProps(
                (e) => {
                  e.stopPropagation();
                  editWithAI(pageSlug, componentId, 'image.src', normalizedImage.src, 'Form Image', 'image');
                },
                "Click to edit form image"
              )}
            >
              <Image
                src={normalizedImage.src}
                alt={normalizedImage.alt}
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          <div className="col-span-full md:col-span-7 lg:col-span-7 p-8 rounded-2xl border transition-colors duration-200" style={{ borderColor: titleColor + '20' }}>
            {/* Success/Error Messages */}
            {submitStatus !== 'idle' && (
              <div className={`mb-6 px-4 py-3 rounded-md ${
                submitStatus === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${
                  submitStatus === 'success' ? 'text-green-800' : 'text-red-800'
                }`} style={{ fontFamily: bodyFont }}>
                  {submitMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Honeypot field - hidden from users, but bots will fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0
                }}
                aria-hidden="true"
              />

              {fields.map((field: any) => {
                // Check if field should be displayed based on conditional logic
                if (!shouldDisplayField(field)) {
                  return null;
                }

                const colSpanClass = field.gridCols === 2 ? 'col-span-full' : '';

                // Radio buttons
                if (field.type === 'radio') {
                  return (
                    <div key={field.name} className={colSpanClass}>
                      <label
                        className="block text-sm font-semibold mb-3"
                        style={{ color: titleColor, fontFamily: headingFont }}
                      >
                        {field.label}
                      </label>
                      <div className="flex flex-col gap-3">
                        {field.options?.map((option: any) => (
                          <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name={field.name}
                              value={option.value}
                              required={field.required}
                              onChange={(e) => handleFieldChange(field.name, e.target.value)}
                              className="w-4 h-4 border-gray-300 focus:ring-2 transition-all duration-200"
                              style={{
                                accentColor: buttonBg,
                                '--tw-ring-color': buttonBg
                              } as React.CSSProperties}
                            />
                            <span
                              className="text-sm"
                              style={{ color: subtitleColor, fontFamily: bodyFont }}
                            >
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {field.helperText && (
                        <p className="mt-2 text-xs" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                          {field.helperText}
                        </p>
                      )}
                    </div>
                  );
                }

                // Select dropdown
                if (field.type === 'select') {
                  return (
                    <div key={field.name} className={colSpanClass}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-semibold mb-2"
                        style={{ color: titleColor, fontFamily: headingFont }}
                      >
                        {field.label}
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full py-2.5 px-4 rounded-lg shadow-sm border outline-none focus:border-2 transition-all duration-500"
                        style={{
                          borderColor: titleColor + '30',
                          color: titleColor,
                          fontFamily: bodyFont
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = buttonBg;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = titleColor + '30';
                        }}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                // Number input
                if (field.type === 'number') {
                  return (
                    <div key={field.name} className={colSpanClass}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-semibold mb-2"
                        style={{ color: titleColor, fontFamily: headingFont }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={field.min}
                        max={field.max}
                        required={field.required}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full py-2.5 px-4 rounded-lg shadow-sm border outline-none focus:border-2 transition-all duration-500"
                        placeholder={field.label}
                        style={{
                          borderColor: titleColor + '30',
                          color: titleColor,
                          fontFamily: bodyFont
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = buttonBg;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = titleColor + '30';
                        }}
                      />
                      {field.helperText && (
                        <p className="mt-2 text-xs" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                          {field.helperText}
                        </p>
                      )}
                    </div>
                  );
                }

                // Dynamic group (family members)
                if (field.type === 'dynamic-group') {
                  const count = parseInt(formValues[field.countField] || '0');
                  if (count === 0 || !shouldDisplayField(field)) {
                    return null;
                  }

                  return (
                    <div key={field.name} className={colSpanClass}>
                      <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: titleColor, fontFamily: headingFont }}
                      >
                        {field.label}
                      </h3>
                      {Array.from({ length: count }).map((_, memberIndex) => (
                        <div key={memberIndex} className="mb-6 p-4 border border-gray-200 rounded-md">
                          <h4
                            className="text-sm font-semibold mb-3"
                            style={{ color: titleColor, fontFamily: headingFont }}
                          >
                            Family Member {memberIndex + 1}
                          </h4>
                          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            {field.groupFields?.map((groupField: any) => {
                              const fieldName = `${field.name}[${memberIndex}][${groupField.name}]`;
                              const colSpan = groupField.gridCols === 2 ? 'sm:col-span-2' : '';

                              if (groupField.type === 'select') {
                                return (
                                  <div key={fieldName} className={colSpan}>
                                    <label
                                      htmlFor={fieldName}
                                      className="block text-sm font-medium mb-1"
                                      style={{ color: subtitleColor, fontFamily: bodyFont }}
                                    >
                                      {groupField.label}
                                    </label>
                                    <select
                                      id={fieldName}
                                      name={fieldName}
                                      required={groupField.required}
                                      className="block w-full rounded-md bg-white px-3 py-2 text-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                                      style={{
                                        color: '#1f2937',
                                        outlineColor: 'rgb(209 213 219)',
                                        '--tw-ring-color': buttonBg
                                      } as React.CSSProperties}
                                    >
                                      <option value="">Select {groupField.label}</option>
                                      {groupField.options?.map((option: any) => (
                                        <option key={option.value} value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                );
                              }

                              return (
                                <div key={fieldName} className={colSpan}>
                                  <label
                                    htmlFor={fieldName}
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: subtitleColor, fontFamily: bodyFont }}
                                  >
                                    {groupField.label}
                                  </label>
                                  <input
                                    id={fieldName}
                                    name={fieldName}
                                    type={groupField.type}
                                    min={groupField.min}
                                    max={groupField.max}
                                    required={groupField.required}
                                    className="block w-full rounded-md bg-white px-3 py-2 text-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                                    style={{
                                      color: '#1f2937',
                                      outlineColor: 'rgb(209 213 219)',
                                      '--tw-ring-color': buttonBg
                                    } as React.CSSProperties}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                // Textarea
                if (field.type === 'textarea') {
                  return (
                    <div key={field.name} className={colSpanClass}>
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={field.rows || 6}
                        required={field.required}
                        className="w-full resize-none py-2.5 px-4 rounded-lg shadow-sm border outline-none focus:border-2 transition-all duration-500"
                        placeholder={field.label}
                        style={{
                          borderColor: titleColor + '30',
                          color: titleColor,
                          fontFamily: bodyFont,
                          '--focus-border-color': buttonBg
                        } as React.CSSProperties}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = buttonBg;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = titleColor + '30';
                        }}
                      />
                      {field.helperText && (
                        <p className="mt-2 text-xs" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                          {field.helperText}
                        </p>
                      )}
                    </div>
                  );
                }

                // Default text/email/tel/number inputs
                return (
                  <div key={field.name} className={colSpanClass}>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      min={field.type === 'number' ? field.min : undefined}
                      max={field.type === 'number' ? field.max : undefined}
                      required={field.required}
                      autoComplete={field.name}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full py-2.5 px-4 rounded-lg shadow-sm border outline-none focus:border-2 transition-all duration-500"
                      placeholder={field.label}
                      style={{
                        borderColor: titleColor + '30',
                        color: titleColor,
                        fontFamily: bodyFont
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = buttonBg;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = titleColor + '30';
                      }}
                    />
                    {field.helperText && (
                      <p className="mt-2 text-xs" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                        {field.helperText}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Altcha Verification */}
              <div className="pt-6 col-span-full">
                <altcha-widget
                  ref={altchaRef}
                  challengeurl="/api/altcha/challenge"
                  hidefooter="false"
                  hidelogo="false"
                  name="altcha"
                  style={{
                    '--altcha-color-base': buttonBg,
                    '--altcha-color-text': subtitleColor,
                  } as any}
                />
              </div>

              <div className="pt-12 col-span-full">
                <button
                  type="submit"
                  disabled={isSubmitting || !altchaVerified}
                  className="rounded-xl px-5 py-2.5 text-white text-base font-semibold leading-7 shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: (isSubmitting || !altchaVerified) ? '#9CA3AF' : buttonBg,
                    fontFamily: headingFont,
                    outlineColor: buttonBg,
                    opacity: (isSubmitting || !altchaVerified) ? '0.5' : '1'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && altchaVerified) {
                      e.currentTarget.style.backgroundColor = buttonHoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting && altchaVerified) {
                      e.currentTarget.style.backgroundColor = buttonBg;
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : !altchaVerified ? 'Complete verification first' : submitButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
