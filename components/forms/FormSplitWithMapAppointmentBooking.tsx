// Generated page-specific component for appointment-booking
// This component is isolated - changes here only affect the appointment-booking page
// JSON-DRIVEN FormSplitWithMap Template - Simple Direct Editing
'use client';

import { useState, useEffect, useRef } from 'react';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { getFontFamily } from '@/utils/themeUtils';
import { editWithAI } from '@/utils/simpleEditorWithAI';
import { getEditableClasses, getEditableProps } from '@/utils/environment';
import {
  getContainerBackgroundColor,
  getTitleColor,
  getSubtitleColor,
  getDescriptionColor,
  getPrimaryButtonColor,
  getAccentColor,
  getSecondaryTextColor
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
    c.id === componentId || c.type === 'form-split-with-map'
  );
};

export default function FormSplitWithMapAppointmentBookingAppointmentBooking(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'form-split-with-map',
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
    console.error(`FormSplitWithMap: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    formName = 'Contact Form',
    formId = componentId, // Fallback to componentId if formId not provided
    title = "Let's work together",
    subtitle = 'Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu sed ut tincidunt magna.',
    mapUrl = '',
    address = '',
    fields = [
      { name: 'first-name', label: 'First name', type: 'text', required: true, gridCols: 1 },
      { name: 'last-name', label: 'Last name', type: 'text', required: true, gridCols: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 2 },
      { name: 'company', label: 'Company', type: 'text', required: false, gridCols: 2 },
      { name: 'phone', label: 'Phone', type: 'tel', required: false, gridCols: 2, helperText: 'Optional' },
      { name: 'message', label: 'How can we help you?', type: 'textarea', required: true, gridCols: 2, rows: 4, helperText: 'Max 500 characters' }
    ],
    submitButtonText = 'Send message',
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
  const subtitleColor = getDescriptionColor({ theme: currentTheme });
  const metaTextColor = getSecondaryTextColor({ theme: currentTheme });
  const textPrimaryColor = currentTheme?.colors?.text?.primary || titleColor; // Text color for input fields
  const buttonBg = getPrimaryButtonColor({ theme: currentTheme });
  const buttonHoverBg = getAccentColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');

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
      script.src = 'https://cdn.jsdelivr.net/npm/altcha@0.5.0/dist/altcha.min.js';
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

      // Get ALTCHA payload for verification (optional - graceful degradation)
      const altchaPayload = data['altcha'];

      // Remove altcha from form data
      delete data['altcha'];

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
          formType: 'form-split-with-map',
          formData: data,
          altchaPayload,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      console.log('Form submission response status:', response.status);
      console.log('Form submission response ok:', response.ok);

      const result = await response.json();
      console.log('Form submission result:', result);

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(successMessage);
        formElement.reset();
      } else {
        console.error('Form submission failed:', {
          status: response.status,
          error: result.error,
          details: result.details
        });
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

  // Generate a valid map URL either from the provided mapUrl or by constructing one from the address
  const getValidMapUrl = (): string | null => {
    if (mapUrl) return mapUrl;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return null;
    try {
      if (!address || address.trim() === '') return null;
      const encodedAddress = encodeURIComponent(address.trim());
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}&zoom=16`;
    } catch (error) {
      console.error('Error generating map URL:', error);
      return null;
    }
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
              {!address || address.trim() === '' ? 'Please provide a complete address or click to add custom map URL' : 'Error loading map - click to add custom map URL'}
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
          <div className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 px-4 py-2 rounded-lg text-sm transition-opacity duration-200 pointer-events-none" style={{ color: subtitleColor }}>
            ✏️ Click to edit map location
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative transition-colors duration-200" style={{ backgroundColor: containerBackground }}>
      <div className="lg:absolute lg:inset-0 lg:left-1/2">
        <div className="h-64 w-full sm:h-80 lg:absolute lg:h-full relative">
          {renderMap()}
        </div>
      </div>
      <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2
              className={`text-4xl font-semibold tracking-tight text-pretty sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
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
              className={`mt-2 text-lg/8 transition-colors duration-200 ${getEditableClasses()}`}
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

            {/* Success/Error Messages */}
            {submitStatus !== 'idle' && (
              <div className={`mt-8 px-4 py-3 rounded-md ${
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

            <form onSubmit={handleSubmit} className="mt-16">
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

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {fields.map((field: any) => {
                  // Check if field should be displayed based on conditional logic
                  if (!shouldDisplayField(field)) {
                    return null;
                  }

                  const colSpanClass = field.gridCols === 2 ? 'sm:col-span-2' : '';

                  // Radio buttons
                  if (field.type === 'radio') {
                    return (
                      <div key={field.name} className={colSpanClass}>
                        <label
                          className="block text-sm/6 font-semibold mb-3"
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
                          className="block text-sm/6 font-semibold"
                          style={{ color: titleColor, fontFamily: headingFont }}
                        >
                          {field.label}
                        </label>
                        <div className="mt-2.5">
                          <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                            style={{
                              color: textPrimaryColor,
                              outlineColor: 'rgb(209 213 219)',
                              '--tw-ring-color': buttonBg
                            } as React.CSSProperties}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option: any) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  }

                  // Number input
                  if (field.type === 'number') {
                    return (
                      <div key={field.name} className={colSpanClass}>
                        <label
                          htmlFor={field.name}
                          className="block text-sm/6 font-semibold"
                          style={{ color: titleColor, fontFamily: headingFont }}
                        >
                          {field.label}
                        </label>
                        <div className="mt-2.5">
                          <input
                            id={field.name}
                            name={field.name}
                            type="number"
                            min={field.min}
                            max={field.max}
                            required={field.required}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                            style={{
                              color: textPrimaryColor,
                              outlineColor: 'rgb(209 213 219)',
                              '--tw-ring-color': buttonBg
                            } as React.CSSProperties}
                          />
                        </div>
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
                        <div className="flex justify-between text-sm/6">
                          <label
                            htmlFor={field.name}
                            className="block text-sm/6 font-semibold"
                            style={{ color: titleColor, fontFamily: headingFont }}
                          >
                            {field.label}
                          </label>
                          {field.helperText && (
                            <p id={`${field.name}-description`} className="text-gray-400">
                              {field.helperText}
                            </p>
                          )}
                        </div>
                        <div className="mt-2.5">
                          <textarea
                            id={field.name}
                            name={field.name}
                            rows={field.rows || 4}
                            required={field.required}
                            aria-describedby={field.helperText ? `${field.name}-description` : undefined}
                            className="block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                            style={{
                              backgroundColor: 'white',
                              color: textPrimaryColor,
                              outlineColor: 'rgb(209 213 219)',
                              '--tw-ring-color': buttonBg
                            } as React.CSSProperties}
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    );
                  }

                  // Default text/email/tel inputs
                  if (field.helperText) {
                    return (
                      <div key={field.name} className={colSpanClass}>
                        <div className="flex justify-between text-sm/6">
                          <label
                            htmlFor={field.name}
                            className="block font-semibold"
                            style={{ color: titleColor, fontFamily: headingFont }}
                          >
                            {field.label}
                          </label>
                          <p id={`${field.name}-description`} className="text-gray-400">
                            {field.helperText}
                          </p>
                        </div>
                        <div className="mt-2.5">
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            min={field.type === 'number' ? field.min : undefined}
                            max={field.type === 'number' ? field.max : undefined}
                            autoComplete={field.name}
                            required={field.required}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            aria-describedby={`${field.name}-description`}
                            className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                            style={{
                              color: textPrimaryColor,
                              outlineColor: 'rgb(209 213 219)',
                              '--tw-ring-color': buttonBg
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className={colSpanClass}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm/6 font-semibold"
                        style={{ color: titleColor, fontFamily: headingFont }}
                      >
                        {field.label}
                      </label>
                      <div className="mt-2.5">
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          min={field.type === 'number' ? field.min : undefined}
                          max={field.type === 'number' ? field.max : undefined}
                          autoComplete={field.name}
                          required={field.required}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                          style={{
                            color: textPrimaryColor,
                            outlineColor: 'rgb(209 213 219)',
                            '--tw-ring-color': buttonBg
                          } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ALTCHA verification widget - optional, graceful degradation */}
              <div className="mt-8">
                <altcha-widget
                  ref={altchaRef}
                  challengeurl="/api/altcha/challenge"
                  hidefooter="false"
                  hidelogo="false"
                  name="altcha"
                  auto="onsubmit"
                  style={{
                    '--altcha-color-base': buttonBg,
                    '--altcha-color-text': subtitleColor,
                  } as any}
                />
              </div>

              <div className="mt-10 flex justify-end border-t pt-8" style={{ borderColor: titleColor + '10' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || !altchaVerified}
                  className="rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: (isSubmitting || !altchaVerified) ? '#9CA3AF' : buttonBg,
                    color: '#ffffff',
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
    </div>
  );
}

