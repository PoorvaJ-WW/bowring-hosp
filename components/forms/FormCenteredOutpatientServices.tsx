// Generated page-specific component for outpatient-services
// This component is isolated - changes here only affect the outpatient-services page
// JSON-DRIVEN FormCentered Template - Complete with all features
'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
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
    c.id === componentId || c.type === 'form-centered'
  );
};

// Success/Error Modal Component
function StatusModal({ 
  isOpen, 
  onClose, 
  message,
  isError = false,
  theme 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  message: string;
  isError?: boolean;
  theme: any;
}) {
  const primaryColor = theme?.colors?.primary?.[theme?.mode] || '#9e2621';
  const errorColor = '#DC2626';
  const accentColor = isError ? errorColor : primaryColor;
  const textColor = theme?.colors?.text?.primary?.[theme?.mode] || '#171717';
  const bgColor = theme?.colors?.background?.primary?.[theme?.mode] || '#fffdfa';
  const headingFont = getFontFamily(theme, 'heading');
  const bodyFont = getFontFamily(theme, 'body');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all"
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor + '15' }}
          >
            {isError ? (
              <svg className="w-8 h-8" fill="none" stroke={accentColor} strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke={accentColor} strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <h3 
          className="text-2xl font-bold text-center mb-3"
          style={{ color: textColor, fontFamily: headingFont }}
        >
          {isError ? 'Submission Failed' : 'Message Sent Successfully!'}
        </h3>
        <p 
          className="text-center mb-8"
          style={{ color: textColor, opacity: 0.8, fontFamily: bodyFont }}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-md px-4 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          style={{ backgroundColor: accentColor, fontFamily: headingFont }}
        >
          {isError ? 'Try Again' : 'Close'}
        </button>
      </div>
    </div>
  );
}

export default function FormCenteredOutpatientServicesOutpatientServices(props: Props) {
  const {
    pageSlug = 'home',
    componentId = 'form-centered',
    theme: propTheme,
    backgroundType
  } = props;
  const { theme: contextTheme } = useTheme();
  const currentTheme = propTheme || contextTheme;

  const componentData = getComponentContent(pageSlug, componentId);
  const content = componentData?.content || {};

  if (!content || Object.keys(content).length === 0) {
    console.error(`FormCentered: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  const {
    formName = 'Contact Form',
    formId = componentId,
    title = 'Contact sales',
    subtitle = 'Aute magna irure deserunt veniam aliqua magna enim voluptate.',
    fields = [],
    submitButtonText = "Let's talk",
    successMessage = 'Thank you! Your message has been sent successfully.',
    privacyText = 'By selecting this, you agree to our',
    privacyLinkText = 'privacy policy',
    privacyLinkUrl = '#',
    showPrivacyCheckbox = true,
  } = content;

  const finalContent = {
    ...content,
    backgroundType: backgroundType || content.backgroundType || 'primary'
  };

  // Theme colors
  const containerBackground = getContainerBackgroundColor({ theme: currentTheme, content: finalContent });
  const titleColor = getTitleColor({ theme: currentTheme });
  const subtitleColor = getDescriptionColor({ theme: currentTheme });
  const buttonBg = getPrimaryButtonColor({ theme: currentTheme });
  const buttonHoverBg = getAccentColor({ theme: currentTheme });
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'body');
  
  // Input field colors - theme aware
  const inputBgColor = currentTheme?.colors?.background?.secondary?.[currentTheme?.mode] || 
                       (currentTheme?.mode === 'dark' ? '#252B4F' : '#ffffff');
  const inputTextColor = currentTheme?.colors?.text?.primary?.[currentTheme?.mode] || 
                         (currentTheme?.mode === 'dark' ? '#F8F6FF' : '#171717');
  const inputBorderColor = currentTheme?.colors?.text?.primary?.[currentTheme?.mode] + '20' || 
                           (currentTheme?.mode === 'dark' ? 'rgba(248, 246, 255, 0.1)' : 'rgba(23, 23, 23, 0.1)');
  const placeholderColor = currentTheme?.colors?.text?.primary?.[currentTheme?.mode] + '60' || 
                           (currentTheme?.mode === 'dark' ? 'rgba(248, 246, 255, 0.4)' : 'rgba(23, 23, 23, 0.4)');

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [altchaVerified, setAltchaVerified] = useState(false);
  const altchaRef = useRef<any>(null);
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

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  // Check if field should be displayed based on conditionalOn
  const shouldDisplayField = (field: any): boolean => {
    if (!field.conditionalOn) return true;
    const { field: dependentField, value: expectedValue } = field.conditionalOn;
    return formValues[dependentField] === expectedValue;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!altchaVerified) {
      setModalMessage('Please complete the verification first.');
      setIsError(true);
      setShowModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      const data: Record<string, any> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Honeypot check
      if (data['website']) {
        setModalMessage(successMessage);
        setIsError(false);
        setShowModal(true);
        formElement.reset();
        setFormValues({});
        if (altchaRef.current) {
          altchaRef.current.reset();
        }
        setAltchaVerified(false);
        return;
      }
      delete data['website'];

      const websiteId = (metadata as any).websiteId || 'unknown';

      const response = await fetch('/api/form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteId,
          formId,
          formName,
          formType: 'form-centered',
          formData: data,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setModalMessage(successMessage);
        setIsError(false);
        setShowModal(true);
        formElement.reset();
        setFormValues({});
        if (altchaRef.current) {
          altchaRef.current.reset();
        }
        setAltchaVerified(false);
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setModalMessage('There was an error submitting the form. Please try again.');
      setIsError(true);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8" style={{ backgroundColor: containerBackground }}>
      <StatusModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        isError={isError}
        theme={currentTheme}
      />

      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={`text-4xl font-semibold tracking-tight text-balance sm:text-5xl transition-colors duration-200 ${getEditableClasses()}`}
          style={{ color: titleColor, fontFamily: headingFont }}
          {...getEditableProps((e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'title', title, 'Form Title');
          }, "Click to edit form title")}
        >
          {title}
        </h2>
        <p
          className={`mt-2 text-lg/8 transition-colors duration-200 ${getEditableClasses()}`}
          style={{ color: subtitleColor, fontFamily: bodyFont }}
          {...getEditableProps((e) => {
            e.stopPropagation();
            editWithAI(pageSlug, componentId, 'subtitle', subtitle, 'Form Subtitle');
          }, "Click to edit form subtitle")}
        >
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {fields.map((field: any) => {
            if (!shouldDisplayField(field)) return null;
            const colSpanClass = field.gridCols === 2 ? 'sm:col-span-2' : '';

            // Radio buttons
            if (field.type === 'radio') {
              return (
                <div key={field.name} className={colSpanClass}>
                  <label className="block text-sm/6 font-semibold mb-3" style={{ color: titleColor, fontFamily: headingFont }}>
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
                          className="w-4 h-4 transition-all duration-200"
                          style={{
                            accentColor: buttonBg,
                            '--tw-ring-color': buttonBg
                          } as React.CSSProperties}
                        />
                        <span className="text-sm" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {field.helperText && (
                    <p className="mt-2 text-xs" style={{ color: placeholderColor, fontFamily: bodyFont }}>
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
                  <label htmlFor={field.name} className="block text-sm/6 font-semibold" style={{ color: titleColor, fontFamily: headingFont }}>
                    {field.label}
                  </label>
                  <div className="mt-2.5">
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                      style={{
                        backgroundColor: inputBgColor,
                        color: inputTextColor,
                        borderColor: inputBorderColor,
                        outlineColor: inputBorderColor,
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
                  <label htmlFor={field.name} className="block text-sm/6 font-semibold" style={{ color: titleColor, fontFamily: headingFont }}>
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
                      className="block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                      style={{
                        backgroundColor: inputBgColor,
                        color: inputTextColor,
                        borderColor: inputBorderColor,
                        outlineColor: inputBorderColor,
                        '--tw-ring-color': buttonBg
                      } as React.CSSProperties}
                    />
                  </div>
                  {field.helperText && (
                    <p className="mt-2 text-xs" style={{ color: placeholderColor, fontFamily: bodyFont }}>
                      {field.helperText}
                    </p>
                  )}
                </div>
              );
            }

            // Dynamic group
            if (field.type === 'dynamic-group') {
              const count = parseInt(formValues[field.countField] || '0');
              if (count === 0 || !shouldDisplayField(field)) return null;

              return (
                <div key={field.name} className={colSpanClass}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: titleColor, fontFamily: headingFont }}>
                    {field.label}
                  </h3>
                  {Array.from({ length: count }).map((_, memberIndex) => (
                    <div key={memberIndex} className="mb-6 p-4 rounded-md" style={{ border: `1px solid ${inputBorderColor}` }}>
                      <h4 className="text-sm font-semibold mb-3" style={{ color: titleColor, fontFamily: headingFont }}>
                        {field.groupLabel || 'Member'} {memberIndex + 1}
                      </h4>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        {field.groupFields?.map((groupField: any) => {
                          const fieldName = `${field.name}[${memberIndex}][${groupField.name}]`;
                          const colSpan = groupField.gridCols === 2 ? 'sm:col-span-2' : '';

                          if (groupField.type === 'select') {
                            return (
                              <div key={fieldName} className={colSpan}>
                                <label htmlFor={fieldName} className="block text-sm font-medium mb-1" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                                  {groupField.label}
                                </label>
                                <select
                                  id={fieldName}
                                  name={fieldName}
                                  required={groupField.required}
                                  className="block w-full rounded-md px-3 py-2 text-sm outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                                  style={{
                                    backgroundColor: inputBgColor,
                                    color: inputTextColor,
                                    borderColor: inputBorderColor,
                                    outlineColor: inputBorderColor,
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
                              <label htmlFor={fieldName} className="block text-sm font-medium mb-1" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                                {groupField.label}
                              </label>
                              <input
                                id={fieldName}
                                name={fieldName}
                                type={groupField.type}
                                min={groupField.min}
                                max={groupField.max}
                                required={groupField.required}
                                className="block w-full rounded-md px-3 py-2 text-sm outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                                style={{
                                  backgroundColor: inputBgColor,
                                  color: inputTextColor,
                                  borderColor: inputBorderColor,
                                  outlineColor: inputBorderColor,
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
                  <label htmlFor={field.name} className="block text-sm/6 font-semibold" style={{ color: titleColor, fontFamily: headingFont }}>
                    {field.label}
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={field.rows || 4}
                      required={field.required}
                      className="block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                      style={{
                        backgroundColor: inputBgColor,
                        color: inputTextColor,
                        borderColor: inputBorderColor,
                        outlineColor: inputBorderColor,
                        '--tw-ring-color': buttonBg
                      } as React.CSSProperties}
                      defaultValue={''}
                    />
                  </div>
                  {field.helperText && (
                    <p className="mt-2 text-xs" style={{ color: placeholderColor, fontFamily: bodyFont }}>
                      {field.helperText}
                    </p>
                  )}
                </div>
              );
            }

            // Phone number with country selector
            if (field.type === 'tel' && field.name === 'phone-number') {
              return (
                <div key={field.name} className={colSpanClass}>
                  <label htmlFor={field.name} className="block text-sm/6 font-semibold" style={{ color: titleColor, fontFamily: headingFont }}>
                    {field.label}
                  </label>
                  <div className="mt-2.5">
                    <div
                      className="flex rounded-md outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 transition-all duration-200"
                      style={{
                        backgroundColor: inputBgColor,
                        borderColor: inputBorderColor,
                        outlineColor: inputBorderColor,
                        '--tw-ring-color': buttonBg
                      } as React.CSSProperties}
                    >
                      <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          aria-label="Country"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                          style={{ 
                            backgroundColor: 'transparent',
                            color: inputTextColor,
                            '--tw-ring-color': buttonBg 
                          } as React.CSSProperties}
                        >
                          <option value="US">US (+1)</option>
                          <option value="CA">CA (+1)</option>
                          <option value="GB">GB (+44)</option>
                          <option value="AU">AU (+61)</option>
                          <option value="IN">IN (+91)</option>
                          <option value="AE">AE (+971)</option>
                          <option value="SG">SG (+65)</option>
                          <option value="MY">MY (+60)</option>
                          <option value="PH">PH (+63)</option>
                          <option value="ID">ID (+62)</option>
                          <option value="TH">TH (+66)</option>
                          <option value="VN">VN (+84)</option>
                          <option value="JP">JP (+81)</option>
                          <option value="KR">KR (+82)</option>
                          <option value="CN">CN (+86)</option>
                          <option value="HK">HK (+852)</option>
                          <option value="TW">TW (+886)</option>
                          <option value="NZ">NZ (+64)</option>
                          <option value="DE">DE (+49)</option>
                          <option value="FR">FR (+33)</option>
                          <option value="ES">ES (+34)</option>
                          <option value="IT">IT (+39)</option>
                          <option value="NL">NL (+31)</option>
                          <option value="BE">BE (+32)</option>
                          <option value="CH">CH (+41)</option>
                          <option value="AT">AT (+43)</option>
                          <option value="SE">SE (+46)</option>
                          <option value="NO">NO (+47)</option>
                          <option value="DK">DK (+45)</option>
                          <option value="FI">FI (+358)</option>
                          <option value="IE">IE (+353)</option>
                          <option value="PT">PT (+351)</option>
                          <option value="GR">GR (+30)</option>
                          <option value="PL">PL (+48)</option>
                          <option value="CZ">CZ (+420)</option>
                          <option value="HU">HU (+36)</option>
                          <option value="RO">RO (+40)</option>
                          <option value="BG">BG (+359)</option>
                          <option value="RU">RU (+7)</option>
                          <option value="TR">TR (+90)</option>
                          <option value="IL">IL (+972)</option>
                          <option value="SA">SA (+966)</option>
                          <option value="QA">QA (+974)</option>
                          <option value="KW">KW (+965)</option>
                          <option value="BH">BH (+973)</option>
                          <option value="OM">OM (+968)</option>
                          <option value="JO">JO (+962)</option>
                          <option value="LB">LB (+961)</option>
                          <option value="EG">EG (+20)</option>
                          <option value="ZA">ZA (+27)</option>
                          <option value="NG">NG (+234)</option>
                          <option value="KE">KE (+254)</option>
                          <option value="GH">GH (+233)</option>
                          <option value="MX">MX (+52)</option>
                          <option value="BR">BR (+55)</option>
                          <option value="AR">AR (+54)</option>
                          <option value="CL">CL (+56)</option>
                          <option value="CO">CO (+57)</option>
                          <option value="PE">PE (+51)</option>
                          <option value="VE">VE (+58)</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end sm:size-4"
                          style={{ color: inputTextColor }}
                        />
                      </div>
                      <input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="123-456-7890"
                        required={field.required}
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base focus:outline-none sm:text-sm/6"
                        style={{ 
                          backgroundColor: 'transparent',
                          color: inputTextColor 
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            // Default text/email/tel inputs
            return (
              <div key={field.name} className={colSpanClass}>
                <label htmlFor={field.name} className="block text-sm/6 font-semibold" style={{ color: titleColor, fontFamily: headingFont }}>
                  {field.label}
                </label>
                <div className="mt-2.5">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.name}
                    required={field.required}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="block w-full rounded-md px-3.5 py-2 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 transition-all duration-200"
                    style={{
                      backgroundColor: inputBgColor,
                      color: inputTextColor,
                      borderColor: inputBorderColor,
                      outlineColor: inputBorderColor,
                      '--tw-ring-color': buttonBg
                    } as React.CSSProperties}
                  />
                </div>
                {field.helperText && (
                  <p className="mt-2 text-xs" style={{ color: placeholderColor, fontFamily: bodyFont }}>
                    {field.helperText}
                  </p>
                )}
              </div>
            );
          })}

          {showPrivacyCheckbox && (
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <div
                  className="group relative inline-flex w-8 shrink-0 rounded-full p-px inset-ring transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2"
                  style={{
                    backgroundColor: inputBorderColor,
                    '--checked-bg': buttonBg,
                    '--focus-outline': buttonBg
                  } as React.CSSProperties}
                >
                  <span className="size-4 rounded-full shadow-xs ring-1 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5" style={{ backgroundColor: inputBgColor }} />
                  <input
                    id="agree-to-policies"
                    name="agree-to-policies"
                    type="checkbox"
                    aria-label="Agree to policies"
                    className="absolute inset-0 appearance-none focus:outline-hidden"
                  />
                </div>
              </div>
              <label htmlFor="agree-to-policies" className="text-sm/6" style={{ color: subtitleColor, fontFamily: bodyFont }}>
                {privacyText}{' '}
                <a href={privacyLinkUrl} className="font-semibold whitespace-nowrap" style={{ color: buttonBg }}>
                  {privacyLinkText}
                </a>
                .
              </label>
            </div>
          )}

          {/* Altcha Verification */}
          <div className="sm:col-span-2">
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
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={isSubmitting || !altchaVerified}
            className="block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
