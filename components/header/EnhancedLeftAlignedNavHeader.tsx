// JSON-DRIVEN EnhancedLeftAlignedNavHeader Template - Simple Direct Editing
'use client';

import { useState, Fragment } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, MoonIcon, SunIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getThemeColor, 
  getFontFamily, 
  normalizeImageData,
  getCurrentBackgroundType,
  getCustomBackgroundColor
} from '@/utils/themeUtils';

interface NavigationItem {
  name: string;
  text?: string;
  href: string;
  link?: string;
  children?: NavigationItem[];
  items?: NavigationItem[];
  dropdown?: boolean;
}

interface Props {
  pageSlug?: string;
  componentId?: string;
  onThemeToggle?: () => void;
  theme?: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Helper function to format navigation text
const formatNavText = (text: string) => {
  if (!text) return '';
  
  // If it's already properly formatted (contains spaces or capital letters), return as-is
  if (text.includes(' ') || /[A-Z]/.test(text.slice(1))) {
    return text;
  }
  
  // Convert kebab-case or snake_case to Title Case
  return text
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper function to get header component content from metadata
const getHeaderContent = (pageSlug: string, componentId: string) => {
  // Header is stored in sharedComponents, not in pages
  if (pageSlug === 'header' || pageSlug === 'shared') {
    return metadata.sharedComponents?.header;
  }
  
  // Fallback: look in pages if not found in sharedComponents
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'enhanced-left-aligned-nav-header'
  );
};

export default function EnhancedLeftAlignedNavHeader(props: Props) {
  const { 
    pageSlug = 'home', 
    componentId = 'enhanced-left-aligned-nav-header', 
    onThemeToggle,
    theme
  } = props;
  
  const { theme: contextTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use theme from props (editor) or context
  const currentTheme = theme || contextTheme;
  
  // Get content from JSON metadata
  const componentData = getHeaderContent(pageSlug, componentId);
  const content = componentData?.content || {};

  if (!content || Object.keys(content).length === 0) {
    console.error(`EnhancedLeftAlignedNavHeader: content not found for ${pageSlug}/${componentId}`);
    return null;
  }


  const getCurrentLogo = () => {
    const defaultLogo = {
      src: '/default-logo.png',
      alt: 'Company Logo'
    };

    if (!content?.logo && !content?.logoUrl) {
      return defaultLogo;
    }

    // Handle logoUrl (simple string)
    if (content?.logoUrl) {
      return {
        src: content.logoUrl,
        alt: content?.logo?.text || 'Logo'
      };
    }

    // Handle logo object with theme variations
    try {
      const mode = currentTheme?.mode || 'light';

      // If both darkSrc and lightSrc are present, use theme-based logos
      if (content.logo?.darkSrc && content.logo?.lightSrc) {
        return {
          src: mode === 'dark' ? content.logo.darkSrc : content.logo.lightSrc,
          alt: content.logo.alt || 'Logo'
        };
      }

      // Fallback to just src if theme-based logos aren't available
      if (content.logo?.src) {
        return {
          src: content.logo.src,
          alt: content.logo.alt || content?.logo?.text || 'Logo'
        };
      }

      // Fallback to text logo if no image
      if (content.logo?.text) {
        return {
          src: '',
          alt: content.logo.text
        };
      }
    } catch (error) {
      console.warn('Logo parsing error:', error);
    }

    return defaultLogo;
  };

  const currentLogo = getCurrentLogo();
  const navigation = content?.navigation || [];

  const containerBackgroundColor = getThemeColor(currentTheme, 'background.navigation.header', '#FFFFFF');
  const textColor = getThemeColor(currentTheme, 'text.navigation.header', '#000000');
  const headingFont = getFontFamily(currentTheme, 'heading');
  const bodyFont = getFontFamily(currentTheme, 'navigation.header') || getFontFamily(currentTheme, 'body');

  // Get secondary colors for potential future use
  const secondaryColor = getThemeColor(currentTheme, 'secondary', '#C2A632');
  const accentColor = getThemeColor(currentTheme, 'accent', '#DC2626');
  
  // Get text colors for different states
  const textSecondaryColor = getThemeColor(currentTheme, 'text.secondary', textColor);
  
  // Enhanced styling variables based on theme
  const isDark = currentTheme?.mode === 'dark';
  
  // Calculate dynamic hover and interaction colors based on text color
  const calculateHoverBg = () => {
    // Use text color with low opacity for hover background
    const rgb = textColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (rgb) {
      const r = parseInt(rgb[1], 16);
      const g = parseInt(rgb[2], 16);
      const b = parseInt(rgb[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${isDark ? 0.15 : 0.08})`;
    }
    return isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  };
  
  const calculateActiveBg = () => {
    // Use text color with medium opacity for active states
    const rgb = textColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (rgb) {
      const r = parseInt(rgb[1], 16);
      const g = parseInt(rgb[2], 16);
      const b = parseInt(rgb[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${isDark ? 0.25 : 0.15})`;
    }
    return isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
  };

  // Calculate hover text color (slightly lighter/darker version of text color)
  const calculateHoverTextColor = () => {
    const rgb = textColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (rgb) {
      const r = parseInt(rgb[1], 16);
      const g = parseInt(rgb[2], 16);
      const b = parseInt(rgb[3], 16);
      
      // Make it slightly lighter in dark mode, darker in light mode
      const adjustment = isDark ? 40 : -30;
      const newR = Math.max(0, Math.min(255, r + adjustment));
      const newG = Math.max(0, Math.min(255, g + adjustment));
      const newB = Math.max(0, Math.min(255, b + adjustment));
      
      return `rgb(${newR}, ${newG}, ${newB})`;
    }
    return isDark ? '#E5E7EB' : '#374151'; // Fallback colors
  };
  
  // Calculate border colors based on text color
  const calculateBorderColor = () => {
    const rgb = textColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (rgb) {
      const r = parseInt(rgb[1], 16);
      const g = parseInt(rgb[2], 16);
      const b = parseInt(rgb[3], 16);
      return `rgba(${r}, ${g}, ${b}, 0.15)`;
    }
    return isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
  };
  
  const hoverBgColor = calculateHoverBg();
  const activeBgColor = calculateActiveBg();
  const hoverTextColor = calculateHoverTextColor();
  const borderColor = calculateBorderColor();
  const shadowColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)';
  
  // Dropdown panel background - slightly different from header for visual separation
  const dropdownBgColor = isDark 
    ? getThemeColor(currentTheme, 'background.secondary', containerBackgroundColor)
    : containerBackgroundColor;

  return (
    <>
      {/* Clean header inspired by the reference design */}
      <header 
        className="relative z-50 transition-all duration-300"
        style={{ 
          backgroundColor: containerBackgroundColor,
          boxShadow: `0 1px 3px 0 ${shadowColor}, 0 1px 2px 0 ${shadowColor}`,
          borderBottom: `1px solid ${borderColor}`
        }}
      >
        <nav 
          aria-label="Global" 
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex items-center gap-x-12">
            {/* Logo Section */}
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {currentLogo.src && (
                <Image
                  className="h-12 w-auto"
                  src={currentLogo.src}
                  alt={currentLogo.alt}
                  width={180}
                  height={48}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '180px',
                    maxHeight: '48px'
                  }}
                  priority
                />
              )}
              {content?.logo?.text && !currentLogo.src && (
                <span 
                  className="text-xl font-bold"
                  style={{ 
                    color: textColor,
                    fontFamily: headingFont
                  }}
                >
                  {content.logo.text}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item: NavigationItem) => {
                const hasDropdown = item.children && item.children.length > 0;
                
                if (hasDropdown) {
                  return (
                    <Popover key={item.text || item.name} className="relative">
                      {({ open }: { open: boolean }) => (
                        <>
                          <Popover.Button
                            className="inline-flex items-center gap-x-1 text-base font-semibold leading-6 transition-all duration-200 px-3 py-2 rounded-lg"
                            style={{ 
                              color: open ? hoverTextColor : textColor,
                              fontFamily: bodyFont || headingFont,
                              backgroundColor: open ? activeBgColor : 'transparent'
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                              if (!open) {
                                e.currentTarget.style.color = hoverTextColor;
                                e.currentTarget.style.backgroundColor = hoverBgColor;
                              }
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                              if (!open) {
                                e.currentTarget.style.color = textColor;
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <span>{formatNavText(item.text || item.name)}</span>
                            <ChevronDownIcon
                              className={classNames(
                                open ? 'rotate-180' : '',
                                'h-5 w-5 transition-transform duration-200'
                              )}
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                              <div 
                                className="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-1"
                                style={{ 
                                  backgroundColor: dropdownBgColor,
                                  boxShadow: `0 20px 25px -5px ${shadowColor}, 0 10px 10px -5px ${shadowColor}`,
                                  borderColor: borderColor,
                                  borderWidth: '1px'
                                }}
                              >
                                <div className="p-4">
                                  {item.children?.map((subItem) => (
                                    <div 
                                      key={subItem.name} 
                                      className="group relative flex gap-x-6 rounded-lg p-4 transition-all duration-200"
                                      style={{
                                        cursor: 'pointer'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = hoverBgColor;
                                        const link = e.currentTarget.querySelector('a');
                                        if (link) link.style.color = hoverTextColor;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        const link = e.currentTarget.querySelector('a');
                                        if (link) link.style.color = textColor;
                                      }}
                                    >
                                      <div className="flex-auto">
                                        <Link 
                                          href={subItem.href} 
                                          className="block font-semibold transition-colors duration-200"
                                          style={{ 
                                            color: textColor,
                                            fontFamily: bodyFont
                                          }}
                                        >
                                          {formatNavText(subItem.text || subItem.name)}
                                          <span className="absolute inset-0" />
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  );
                } else {
                  return (
                    <Link
                      key={item.text || item.name}
                      href={item.href}
                      className="text-base font-semibold leading-6 transition-all duration-200 px-3 py-2 rounded-lg"
                      style={{ 
                        color: textColor,
                        fontFamily: bodyFont || headingFont
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverTextColor;
                        e.currentTarget.style.backgroundColor = hoverBgColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {formatNavText(item.text || item.name)}
                    </Link>
                  );
                }
              })}
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex items-center gap-x-6">
            {onThemeToggle && (
              <button
                type="button"
                onClick={onThemeToggle}
                className="p-2 transition-all duration-200 rounded-lg"
                style={{ color: textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBgColor;
                  e.currentTarget.style.color = hoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = textColor;
                }}
              >
                <span className="sr-only">Toggle theme</span>
                {currentTheme?.mode === 'dark' ? (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            )}

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                style={{ color: textColor }}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel 
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          style={{ backgroundColor: containerBackgroundColor }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {currentLogo.src && (
                <Image
                  className="h-12 w-auto"
                  src={currentLogo.src}
                  alt={currentLogo.alt}
                  width={180}
                  height={48}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '180px',
                    maxHeight: '48px'
                  }}
                />
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
              style={{ color: textColor }}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y" style={{ borderColor: borderColor }}>
              <div className="space-y-2 py-6">
                {navigation.map((item: NavigationItem) => {
                  const hasDropdown = item.children && item.children.length > 0;
                  
                  if (hasDropdown) {
                    return (
                      <Disclosure as="div" key={item.text || item.name} className="-mx-3">
                        {({ open }: { open: boolean }) => (
                          <>
                            <Disclosure.Button 
                              className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 transition-all duration-200"
                              style={{ 
                                color: textColor,
                                fontFamily: bodyFont || headingFont
                              }}
                              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.currentTarget.style.backgroundColor = hoverBgColor;
                                e.currentTarget.style.color = hoverTextColor;
                              }}
                              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = textColor;
                              }}
                            >
                              {formatNavText(item.text || item.name)}
                              <ChevronDownIcon
                                className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none transition-transform duration-200')}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {item.children?.map((subItem) => (
                                <Disclosure.Button
                                  key={subItem.name}
                                  as={Link}
                                  href={subItem.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 transition-all duration-200"
                                  onClick={() => setMobileMenuOpen(false)}
                                  style={{ 
                                    color: textColor,
                                    fontFamily: bodyFont || headingFont
                                  }}
                                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.backgroundColor = hoverBgColor;
                                    e.currentTarget.style.color = hoverTextColor;
                                  }}
                                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = textColor;
                                  }}
                                >
                                  {formatNavText(subItem.text || subItem.name)}
                                </Disclosure.Button>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    );
                  } else {
                    return (
                      <Link
                        key={item.text || item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ 
                          color: textColor,
                          fontFamily: bodyFont || headingFont
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = hoverBgColor;
                          e.currentTarget.style.color = hoverTextColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = textColor;
                        }}
                      >
                        {formatNavText(item.text || item.name)}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}