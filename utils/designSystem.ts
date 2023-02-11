/**
 * Centralized Design System for Scalable Text Sizing
 * 
 * This system provides:
 * 1. Semantic text sizing tokens
 * 2. Component-aware sizing rules
 * 3. Consistent scaling across thousands of sites
 * 4. Easy customization per site/brand
 */

export interface DesignTokens {
  typography: {
    // Semantic text sizes for different content types
    display: {
      hero: string;
      section: string;
      card: string;
    };
    heading: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
    };
    body: {
      large: string;
      medium: string;
      small: string;
    };
    label: {
      large: string;
      medium: string;
      small: string;
    };
  };
  spacing: {
    component: {
      padding: string;
      margin: string;
      gap: string;
    };
  };
}

export interface ComponentSizeMap {
  [componentType: string]: {
    [elementType: string]: keyof DesignTokens['typography'][keyof DesignTokens['typography']];
  };
}

// Default design tokens - can be overridden per site
export const defaultDesignTokens: DesignTokens = {
  typography: {
    display: {
      hero: 'text-4xl md:text-5xl lg:text-6xl',
      section: 'text-3xl md:text-4xl',
      card: 'text-2xl md:text-3xl',
    },
    heading: {
      h1: 'text-3xl md:text-4xl',
      h2: 'text-2xl md:text-3xl',
      h3: 'text-xl md:text-2xl',
      h4: 'text-lg md:text-xl',
    },
    body: {
      large: 'text-lg',
      medium: 'text-base',
      small: 'text-sm',
    },
    label: {
      large: 'text-base font-medium',
      medium: 'text-sm font-medium',
      small: 'text-xs font-medium',
    },
  },
  spacing: {
    component: {
      padding: 'p-6 lg:p-8',
      margin: 'mb-8 lg:mb-12',
      gap: 'space-y-6',
    },
  },
};

// Component-specific sizing rules
export const componentSizeMap: ComponentSizeMap = {
  hero: {
    title: 'hero',
    subtitle: 'large',
    description: 'medium',
    button: 'medium',
  },
  feature: {
    sectionTitle: 'section',
    title: 'h2',
    subtitle: 'h3',
    description: 'medium',
    label: 'small',
  },
  cta: {
    title: 'section',
    subtitle: 'large',
    description: 'medium',
    button: 'medium',
  },
  testimonial: {
    quote: 'large',
    author: 'medium',
    role: 'small',
  },
  stats: {
    number: 'card',
    label: 'medium',
    description: 'small',
  },
  header: {
    logo: 'h3',
    navItem: 'medium',
    button: 'small',
  },
  footer: {
    title: 'h4',
    link: 'small',
    copyright: 'small',
  },
};

/**
 * Get the appropriate text size class for a component element
 */
export function getTextSize(
  componentType: string,
  elementType: string,
  tokens: DesignTokens = defaultDesignTokens
): string {
  const componentMap = componentSizeMap[componentType];
  if (!componentMap) {
    return tokens.typography.body.medium; // fallback
  }

  const sizeKey = componentMap[elementType];
  if (!sizeKey) {
    return tokens.typography.body.medium; // fallback
  }

  // Navigate through the typography object to find the size
  for (const category of Object.keys(tokens.typography)) {
    const categoryObj = tokens.typography[category as keyof typeof tokens.typography];
    if (sizeKey in categoryObj) {
      return categoryObj[sizeKey as keyof typeof categoryObj];
    }
  }

  return tokens.typography.body.medium; // fallback
}

/**
 * Validate that a component uses appropriate text sizes
 */
export function validateTextSizes(
  componentCode: string,
  componentType: string
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check for oversized text classes
  const oversizedClasses = ['text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'];
  for (const className of oversizedClasses) {
    if (componentCode.includes(className)) {
      issues.push(`Found oversized text class: ${className}. Consider using semantic sizing instead.`);
    }
  }

  // Check for inconsistent sizing patterns
  const textClasses = componentCode.match(/text-\w+/g) || [];
  const uniqueClasses = [...new Set(textClasses)];
  
  if (uniqueClasses.length > 6) {
    issues.push(`Too many different text sizes (${uniqueClasses.length}). Consider consolidating for consistency.`);
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Auto-fix text sizes in component code
 */
export function normalizeTextSizes(
  componentCode: string,
  componentType: string,
  tokens: DesignTokens = defaultDesignTokens
): string {
  let normalizedCode = componentCode;

  // Replace oversized classes with appropriate semantic sizes
  const replacements: { [key: string]: string } = {
    'text-6xl': getTextSize(componentType, 'title', tokens),
    'text-7xl': getTextSize(componentType, 'title', tokens),
    'text-8xl': getTextSize(componentType, 'title', tokens),
    'text-9xl': getTextSize(componentType, 'title', tokens),
  };

  for (const [oldClass, newClass] of Object.entries(replacements)) {
    normalizedCode = normalizedCode.replace(new RegExp(oldClass, 'g'), newClass);
  }

  return normalizedCode;
}

/**
 * Generate design system CSS custom properties for a site
 */
export function generateDesignSystemCSS(tokens: DesignTokens): string {
  const cssVars: string[] = [];

  // Generate CSS custom properties for each token
  Object.entries(tokens.typography).forEach(([category, sizes]) => {
    Object.entries(sizes).forEach(([size, value]) => {
      cssVars.push(`  --text-${category}-${size}: ${value};`);
    });
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Site-specific design token overrides
 */
export interface SiteDesignConfig {
  siteId: string;
  brandName: string;
  tokens: Partial<DesignTokens>;
  componentOverrides?: Partial<ComponentSizeMap>;
}

/**
 * Merge site-specific tokens with defaults
 */
export function mergeSiteTokens(
  siteConfig: SiteDesignConfig,
  baseTokens: DesignTokens = defaultDesignTokens
): DesignTokens {
  return {
    typography: {
      ...baseTokens.typography,
      ...siteConfig.tokens.typography,
      display: {
        ...baseTokens.typography.display,
        ...siteConfig.tokens.typography?.display,
      },
      heading: {
        ...baseTokens.typography.heading,
        ...siteConfig.tokens.typography?.heading,
      },
      body: {
        ...baseTokens.typography.body,
        ...siteConfig.tokens.typography?.body,
      },
      label: {
        ...baseTokens.typography.label,
        ...siteConfig.tokens.typography?.label,
      },
    },
    spacing: {
      ...baseTokens.spacing,
      ...siteConfig.tokens.spacing,
    },
  };
}