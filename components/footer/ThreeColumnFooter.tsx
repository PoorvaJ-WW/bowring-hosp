// JSON-DRIVEN ThreeColumnFooter Template - Simple Direct Editing
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import metadata from '@/_metadata.json';
import { useTheme } from '@/context/ThemeContext';
import { 
  getThemeColor, 
  getFontFamily,
  getCurrentBackgroundType,
  getCustomBackgroundColor
} from '@/utils/themeUtils';

// Define types locally since imports are causing issues
interface Theme {
  colors: {
    background: {
      navigation: {
        footer: {
          light: string;
          dark: string;
        };
      };
    };
    text: {
      navigation: {
        footer: {
          light: string;
          dark: string;
        };
      };
    };
  };
  fonts: {
    navigation?: {
      footer?: string;
    };
    body: string;
    heading?: string;
  };
  mode: 'light' | 'dark';
}

interface NavigationItem {
  name: string;
  text: string;
  href: string;
}

interface Logo {
  src: string;
  alt: string;
}

interface FooterColumn {
  title: string;
  links?: NavigationItem[];
}

interface FooterSocial {
  name: string;
  href: string;
  icon: string;
}

interface FooterLogo {
  light: Logo;
  dark: Logo;
}

interface FooterContent {
  logo?: FooterLogo;
  columns?: FooterColumn[];
  social?: FooterSocial[];
  copyright?: {
    text: string;
  };
  backgroundType?: 'primary' | 'secondary';
  customColors?: {
    primary: { light: string; dark: string };
    secondary: { light: string; dark: string };
  };
}

interface ThreeColumnFooterProps {
  pageSlug?: string;
  componentId?: string;
  content?: FooterContent;
  theme?: Theme;
}

// Helper function to get footer component content from metadata
const getFooterContent = (pageSlug: string, componentId: string) => {
  // Footer is stored in sharedComponents, not in pages
  if (pageSlug === 'footer' || pageSlug === 'shared') {
    return metadata.sharedComponents?.footer;
  }
  
  // Fallback: look in pages if not found in sharedComponents
  const page = metadata.pages?.find((p: any) => p.slug === pageSlug);
  if (!page) return null;
  
  return page.components?.find((c: any) => 
    c.id === componentId || c.type === 'three-column-footer'
  );
};

export default function ThreeColumnFooter(props: ThreeColumnFooterProps) {
  const { 
    pageSlug = 'shared', 
    componentId = 'three-column-footer',
    theme
  } = props;
  
  const { theme: contextTheme } = useTheme();
  
  // Use theme from props (editor) or context
  const currentTheme = theme || contextTheme || {} as Theme;
  
  // Get content from JSON metadata
  const componentData = getFooterContent(pageSlug, componentId);
  const content = componentData?.content || {};
  
  if (!content || Object.keys(content).length === 0) {
    console.error(`ThreeColumnFooter: content not found for ${pageSlug}/${componentId}`);
    return null;
  }

  // Fix for Next.js 16 prerendering: Initialize with static value, update with dynamic value in useEffect
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const safeContent = content || {};

  const getCurrentLogo = () => {
    const defaultLogo = {
      src: '/default-logo.png',
      alt: 'Company Logo'
    };

    if (!safeContent.logo) {
      return defaultLogo;
    }

    try {
      const mode = currentTheme?.mode || 'light';

      // If both darkSrc and lightSrc are present, use theme-based logos
      if (safeContent.logo.darkSrc && safeContent.logo.lightSrc) {
        return {
          src: mode === 'dark' ? safeContent.logo.darkSrc : safeContent.logo.lightSrc,
          alt: safeContent.logo.alt || 'Logo'
        };
      }

      // Fallback to just src if theme-based logos aren't available
      if (safeContent.logo.src) {
        return {
          src: safeContent.logo.src,
          alt: safeContent.logo.alt || 'Logo'
        };
      }
    } catch (error) {
      console.warn('Logo parsing error:', error);
    }

    return defaultLogo;
  };

  const currentLogo = getCurrentLogo();

  const backgroundColor = getThemeColor(currentTheme, 'background.navigation.footer', '#F3F4F6');
  const textColor = getThemeColor(currentTheme, 'text.navigation.footer', '#4B5563');
  const headingFont = getFontFamily(currentTheme, 'navigation.footer');
  const bodyFont = getFontFamily(currentTheme, 'navigation.footer') || getFontFamily(currentTheme, 'body');
  
  // Enhanced styling variables based on theme
  const isDark = currentTheme?.mode === 'dark';
  
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

  const hoverTextColor = calculateHoverTextColor();

  const iconMap: Record<string, string> = {
    facebook: '/icons/facebook.svg',
    instagram: '/icons/instagram.svg',
    linkedin: '/icons/linkedin.svg',
    youtube: '/icons/youtube.svg',
    twitter: '/icons/twitter.svg',
    x: '/icons/twitter.svg', // X (formerly Twitter)
    tiktok: '/icons/tiktok.svg',
    pinterest: '/icons/pinterest.svg',
    snapchat: '/icons/snapchat.svg',
    whatsapp: '/icons/whatsapp.svg',
    telegram: '/icons/telegram.svg',
    discord: '/icons/discord.svg',
    default: '/icons/default.svg'
  };

  // Read sections from metadata (sharedComponents.footer.content.sections)
  const sections = safeContent.sections || [];
  
  // Convert sections to columns format
  const columns = sections.map((section: any) => ({
    title: section.title || 'Links',
    links: (section.items || []).map((item: any) => ({
      name: item.id || item.name || 'link',
      text: item.label || item.text || 'Link', 
      href: item.href || '#'
    }))
  }));

  // Add Legal column as third column if legalLinks exist
  const legalLinks = safeContent.legalLinks || [];
  if (legalLinks.length > 0) {
    const legalColumn = {
      title: 'Legal',
      links: legalLinks.map((link: any) => ({
        name: link.name || 'legal',
        text: link.text || link.name || 'Legal',
        href: link.href || '#'
      }))
    };
    columns.push(legalColumn);
  }
  
  // Make sure each column has a links array and normalize link formats
  const safeColumns = columns.map((column: any) => {
    // Ensure links exists
    const rawLinks = column.links || [];
    
    // Normalize each link to have name, text, and href properties
    const normalizedLinks = rawLinks.map((link: any) => {
      // Handle case where link might use label/url format instead of name/text/href
      if (typeof link === 'object') {
        return {
          name: link.name || link.label || 'link',
          text: link.text || link.label || link.name || 'Link',
          href: link.href || link.url || '#'
        };
      }
      // Handle string links
      if (typeof link === 'string') {
        return {
          name: link.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
          text: link,
          href: `/${link.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
        };
      }
      // Default case
      return link;
    });
    
    return {
      ...column,
      links: normalizedLinks
    };
  });

  // Normalize social links too
  const rawSocialLinks = safeContent.social || [];
  
  // Add default social links if none are provided (you can customize these URLs)
  // To add social media links, either:
  // 1. Add them to your JSON: "social": [{"name": "facebook", "href": "https://facebook.com/yourpage", "icon": "facebook"}]
  // 2. Or uncomment and customize these default links below:
  const defaultSocialLinks = rawSocialLinks.length === 0 ? [
    // { name: 'facebook', href: 'https://facebook.com/breadoflife', icon: 'facebook' },
    // { name: 'instagram', href: 'https://instagram.com/breadoflife', icon: 'instagram' },
    // { name: 'youtube', href: 'https://youtube.com/@breadoflife', icon: 'youtube' },
  ] : rawSocialLinks;

  const socialLinks = defaultSocialLinks.map((link: any) => {
    if (typeof link === 'object') {
      // If it's already an object but might use different property names
      return {
        name: link.name || link.label || 'social',
        href: link.href || link.url || `https://${link.name || 'example'}.com`,
        icon: link.icon || link.name || 'default'
      };
    }
    // Handle string format
    if (typeof link === 'string') {
      return {
        name: link,
        href: `https://${link.toLowerCase()}.com`,
        icon: link.toLowerCase()
      };
    }
    return link;
  });
  // Handle copyright text - use copyrightText from JSON
  const rawCopyright = safeContent.copyrightText || safeContent.copyright?.text || safeContent.copyright || 'Company Name';
  const copyrightText = rawCopyright.includes('©') || rawCopyright.includes('All rights reserved') 
    ? rawCopyright.replace(/©\s*\d{4}\s*/, '').trim() // Remove any existing year
    : rawCopyright;


  return (
    <footer
      aria-labelledby="footer-heading"
      className="transition-colors duration-200"
      style={{ backgroundColor }}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Logo Column with Company Info */}
          <div className="flex flex-col space-y-4 items-center xl:items-start">
            <div className="relative h-20 w-auto">
              <Image
                alt={currentLogo.alt}
                src={currentLogo.src}
                width={280}
                height={80}
                style={{ 
                  objectFit: 'contain',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '280px',
                  maxHeight: '80px'
                }}
                priority
              />
            </div>
            
            {/* Organization Description */}
            {safeContent.description && (
              <div className="text-center xl:text-left max-w-sm">
                <p 
                  className="text-sm leading-6 opacity-90"
                  style={{ color: textColor, fontFamily: bodyFont }}
                >
                  {safeContent.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Links Columns */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:col-span-3 xl:mt-0">
            {safeColumns.map((column: any) => (
              <div key={column.title} className="text-center xl:text-left">
                <h3
                  className="text-sm font-semibold leading-6 mb-6"
                  style={{ color: textColor, fontFamily: headingFont }}
                >
                  {column.title}
                </h3>
                <ul role="list" className="space-y-4">
                  {column.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 transition-colors duration-200"
                        style={{ color: textColor, fontFamily: bodyFont }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = hoverTextColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textColor;
                        }}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Social and Copyright */}
        <div className="mt-16 border-t pt-8" style={{ borderColor: getThemeColor(currentTheme, 'text.navigation.footer', '#4B5563') + '33' }}>
          {/* Social Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex justify-center space-x-6 mb-8">
              {socialLinks.map((item: any) => {
                const iconSrc = iconMap[item.icon] || '/icons/default.svg';
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="transition-all duration-200 hover:opacity-75 hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <div className="p-2 rounded-full transition-all duration-200" style={{
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hoverTextColor + '20'; // 20% opacity
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}>
                      <Image
                        src={iconSrc}
                        alt={item.name}
                        width={28}
                        height={28}
                        onError={(e) => {
                          // Fallback to a generic social icon if specific icon fails to load
                          e.currentTarget.src = '/icons/default.svg';
                        }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* Bottom row - Copyright left, Wisdom Scribe right */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            {/* Copyright - Left side */}
            <div className="text-center sm:text-left">
              <p
                className="text-xs leading-5"
                style={{ color: textColor, fontFamily: bodyFont }}
              >
                {copyrightText}
              </p>
            </div>
            
            {/* Wisdom Scribe Attribution - Right side */}
            <div className="text-center sm:text-right">
              <p className="text-xs leading-5 opacity-75">
                <span style={{ color: textColor, fontFamily: bodyFont }}>
                  Built on{' '}
                  <a 
                    href="https://wisdomscribe.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-colors duration-200"
                    style={{ 
                      color: textColor, 
                      fontFamily: bodyFont,
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = hoverTextColor;
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textColor;
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Wisdom Scribe
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
