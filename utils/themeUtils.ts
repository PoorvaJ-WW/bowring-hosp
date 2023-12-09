/**
 * Complete Theme Utilities for VM-Deployed Sites
 * Combines core theme functions + editing functionality
 * This file gets symlinked to generated sites on VM deployment
 */

// ==========================================
// CORE THEME FUNCTIONS (same as base template)  
// ==========================================

/**
 * Safely get a theme color with fallbacks
 * Core function used by all components for consistent theming
 */
export const getThemeColor = (
  theme: any, 
  colorPath: string, 
  fallback: string = '#000000'
): string => {
  if (!theme || !theme.colors) {
    return fallback;
  }

  const mode = theme.mode || 'light';
  const pathParts = colorPath.split('.');
  
  let current = theme.colors;
  for (const part of pathParts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return fallback;
    }
  }
  
  // Handle mode-specific colors
  if (current && typeof current === 'object' && current[mode]) {
    return current[mode];
  }
  
  // Handle direct color values
  if (typeof current === 'string') {
    return current;
  }
  
  return fallback;
};

/**
 * Get font family from theme with fallback
 * Used by components for consistent typography
 */
export const getFontFamily = (
  theme: any, 
  fontType: 'heading' | 'body' = 'body', 
  fallback: string = 'system-ui, -apple-system, sans-serif'
): string => {
  if (!theme || !theme.fonts) {
    return fallback;
  }
  
  return theme.fonts[fontType] || fallback;
};

/**
 * Standardized image structure validation and normalization
 * Essential for components with images to work properly
 */
export const normalizeImageData = (imageData: any): { src: string; alt: string } => {
  if (!imageData) {
    return { src: '/placeholder.jpg', alt: 'Image' };
  }

  // If it's already in correct format
  if (imageData.src && typeof imageData.src === 'string') {
    return {
      src: imageData.src,
      alt: imageData.alt || 'Image'
    };
  }

  // If it's a string URL
  if (typeof imageData === 'string') {
    return {
      src: imageData,
      alt: 'Image'
    };
  }

  // If it uses different field names
  const src = imageData.src || imageData.url || imageData.imageUrl || '/placeholder.jpg';
  const alt = imageData.alt || imageData.altText || 'Image';

  return { src, alt };
};

/**
 * Standardized CTA data normalization
 * Used by components with buttons and links
 */
export const normalizeCTAData = (ctaData: any): { text: string; link: string } => {
  if (!ctaData) {
    return { text: 'Learn More', link: '#' };
  }

  return {
    text: ctaData.text || ctaData.label || 'Learn More',
    link: ctaData.link || ctaData.url || ctaData.href || '#'
  };
};

/**
 * Standardized content field access
 * Helper for consistent content extraction from different data structures
 */
export const getContentField = (content: any, fieldName: string, fallback: string = ''): string => {
  if (!content) return fallback;
  
  // Direct field access
  if (content[fieldName]) return content[fieldName];
  
  // Handle common field name variations
  const fieldMap: Record<string, string[]> = {
    title: ['title', 'headline', 'name'],
    subtitle: ['subtitle', 'subheadline'],
    description: ['description', 'content', 'text']
  };
  
  const variations = fieldMap[fieldName] || [fieldName];
  for (const variation of variations) {
    if (content[variation]) return content[variation];
  }
  
  return fallback;
};

/**
 * Gets the component background color based on content, theme, and styles
 * Core function for consistent background theming
 */
export const getComponentBackgroundColor = (content: any, theme: any, styles: any = {}): string => {
  // Check if content or theme is undefined
  if (!content) {
    console.error('getComponentBackgroundColor: content is undefined');
    return '#FFFFFF'; // Safe default
  }
  
  if (!theme) {
    console.error('getComponentBackgroundColor: theme is undefined');
    return '#FFFFFF'; // Safe default
  }
  
  const mode = theme.mode || 'light';
  
  // First check if backgroundType is specified
  const backgroundType = content.backgroundType || 'primary';
  
  // Check if there are custom colors defined for this component
  if (styles?.container?.backgroundColor) {
    return styles.container.backgroundColor;
  }
  
  // Get color from theme based on background type
  return getThemeColor(theme, `background.${backgroundType}`, '#FFFFFF');
};

/**
 * Gets the component title color from theme
 * Used by components for consistent title styling
 */
export const getThemePrimaryColor = (theme: any): string => {
  if (!theme) return '#3B82F6'; // Default blue
  
  const mode = theme.mode || 'light';
  return theme.colors?.primary?.[mode] || 
         (mode === 'light' ? '#3B82F6' : '#60A5FA');
};

/**
 * Gets the component secondary color from theme
 * Used by components for secondary text and elements
 */
export const getThemeSecondaryColor = (theme: any): string => {
  if (!theme) return '#6B7280'; // Default gray
  
  const mode = theme.mode || 'light';
  return theme.colors?.secondary?.[mode] || 
         (mode === 'light' ? '#6B7280' : '#9CA3AF');
};

/**
 * Gets the component accent color from theme
 * Used by components for highlights and special elements
 */
export const getThemeAccentColor = (theme: any): string => {
  if (!theme) return '#8B5CF6'; // Default accent purple
  
  const mode = theme.mode || 'light';
  return theme.colors?.accent?.[mode] || 
         (mode === 'light' ? '#8B5CF6' : '#A78BFA');
};

/**
 * Helper to get current background type from content
 * Used for theme switching and background management
 */
export const getCurrentBackgroundType = (content: any): string => {
  return content?.backgroundType || 'primary';
};

/**
 * Helper to get custom background color from content
 * Used when custom background colors are specified
 */
export const getCustomBackgroundColor = (content: any, theme: any): string | null => {
  if (content?.customBackgroundColor) {
    return content.customBackgroundColor;
  }
  
  if (content?.backgroundColor) {
    return content.backgroundColor;
  }
  
  return null;
};

/**
 * Normalize stats data for consistent display
 * Used by stats components
 */
export const normalizeStatsData = (stat: any): { label: string; value: string } => {
  if (!stat || typeof stat !== 'object') {
    return { label: 'Stat', value: '0' };
  }
  
  return {
    label: stat.label || stat.name || 'Stat',
    value: stat.value || stat.number || '0'
  };
};

/**
 * Check if component is in dark mode
 * Helper for conditional styling
 */
export const isDarkMode = (theme: any): boolean => {
  return theme?.mode === 'dark';
};

/**
 * Get text color based on theme mode
 * Ensures proper contrast for readability
 */
export const getTextColor = (theme: any, type: 'primary' | 'secondary' = 'primary'): string => {
  const mode = theme?.mode || 'light';
  
  if (type === 'secondary') {
    return getThemeColor(theme, 'text.secondary', mode === 'light' ? '#6B7280' : '#9CA3AF');
  }
  
  return getThemeColor(theme, 'text.primary', mode === 'light' ? '#111827' : '#F9FAFB');
};

/**
 * Get border color from theme
 * Used for consistent border styling
 */
export const getBorderColor = (theme: any): string => {
  const mode = theme?.mode || 'light';
  return getThemeColor(theme, 'border', mode === 'light' ? '#E5E7EB' : '#374151');
};

/**
 * Utility to check if a value is a valid color
 * Used for color validation in components
 */
export const isValidColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;
  
  // Check for hex colors
  if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) return true;
  
  // Check for rgb/rgba colors
  if (/^rgba?\([\d\s,./]+\)$/.test(color)) return true;
  
  // Check for named colors (basic check)
  const namedColors = ['transparent', 'inherit', 'currentColor'];
  if (namedColors.includes(color)) return true;
  
  return false;
};

/**
 * Safe color getter with validation
 * Ensures colors are valid before applying them
 */
export const getSafeColor = (color: string, fallback: string = '#000000'): string => {
  return isValidColor(color) ? color : fallback;
};

// ==========================================
// EDITING SYSTEM FUNCTIONS (for VM deployment)
// ==========================================

export interface BackgroundControls {
  canChangeType: boolean;
  canCustomize: boolean;
  currentType: string;
  customColor?: string | null;
}

export interface EditableOptions {
  currentContent?: any;
  currentStyles?: object;
  validation?: object;
  backgroundControls?: BackgroundControls;
}

export interface EditableConfig {
  componentId?: string;
  componentType: string;
  fieldType: string;
  filePath?: string;
  pageName?: string;
  originalType?: string;
  instanceNumber?: number;
}

/**
 * Creates editable attributes for component elements
 * This is the core function that component templates use
 */
export const createEditableAttributes = (config: {
  componentId?: string;
  componentType?: string;
  fieldName: string;
  contentType: string;
  pageName?: string;
  originalType?: string;
  instanceNumber?: number;
  styleProperties?: string[];
  options?: EditableOptions;
}) => {
  const {
    componentId = 'component',
    componentType = 'unknown',
    fieldName,
    contentType,
    pageName = 'unknown',
    originalType,
    instanceNumber = 1,
    styleProperties = [],
    options = {}
  } = config;

  // Generate unique field ID for targeting
  const fieldId = `${componentId}-${fieldName}`;
  
  // Base editable attributes
  const baseAttributes: Record<string, string> = {
    'data-editable': 'true',
    'data-editable-component-id': componentId,
    'data-editable-component-type': componentType,
    'data-editable-field-name': fieldName,
    'data-editable-field-id': fieldId,
    'data-editable-content-type': contentType,
    'data-editable-page': pageName.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    'data-editable-original-type': originalType || componentType,
    'data-editable-instance-number': instanceNumber.toString()
  };

  // Add style properties if provided
  if (styleProperties.length > 0) {
    baseAttributes['data-editable-style-properties'] = styleProperties.join(',');
  }

  // Add current content for context
  if (options.currentContent) {
    baseAttributes['data-editable-current-content'] = JSON.stringify(options.currentContent);
  }

  // Add current styles for context
  if (options.currentStyles) {
    baseAttributes['data-editable-current-styles'] = JSON.stringify(options.currentStyles);
  }

  // Add validation rules
  if (options.validation) {
    baseAttributes['data-editable-validation'] = JSON.stringify(options.validation);
  }

  // Add background controls for container elements
  if (options.backgroundControls) {
    baseAttributes['data-editable-background-controls'] = JSON.stringify(options.backgroundControls);
  }

  return baseAttributes;
};

/**
 * Generate a component ID from props
 * Used when no explicit ID is provided
 */
export const generateComponentId = (componentProps: any): string => {
  const type = componentProps.componentType || componentProps['data-component-type'] || 'component';
  const page = componentProps.pageName || componentProps['data-page'] || 'page';
  const instance = componentProps.instanceNumber || componentProps['data-instance-number'] || 1;
  
  return `${type}-${page}-${instance}`;
};

/**
 * Infer component type from props
 * Fallback when component type is not explicitly provided
 */
export const inferComponentType = (componentProps: any): string => {
  // Try to get from various prop names
  const possibleTypes = [
    componentProps.componentType,
    componentProps['data-component-type'],
    componentProps.type,
    componentProps['data-original-type']
  ];

  for (const type of possibleTypes) {
    if (type && typeof type === 'string') {
      return type;
    }
  }

  return 'unknown';
};

/**
 * Creates an editable configuration factory for a component
 * This is the main function that component templates use
 */
export const createEditableConfig = (componentProps: any) => {
  // Use the actual ID from props first (from JSON metadata), then fall back to generation
  const componentId = componentProps['data-editable-component-id'] || 
                     componentProps.id || 
                     generateComponentId(componentProps);
  const componentType = componentProps.componentType || inferComponentType(componentProps);
  const pageName = componentProps.pageName || componentProps['data-page'] || 'unknown';
  const originalType = componentProps.originalType || componentProps['data-original-type'];
  const instanceNumber = componentProps.instanceNumber || componentProps['data-instance-number'] || 1;
  
  /**
   * Creates editable attributes for a specific field
   * This matches the signature that component templates expect
   */
  const makeEditable = (
    fieldName: string,
    contentType: string,
    styleProperties: string[] = [],
    options?: EditableOptions
  ) => createEditableAttributes({
    componentId,
    componentType,
    fieldName,
    contentType,
    pageName,
    originalType,
    instanceNumber,
    styleProperties,
    options
  });
  
  return { makeEditable, componentId };
};

/**
 * Check if editing is enabled in the current environment
 * Generated sites can conditionally enable/disable editing
 */
export const isEditingEnabled = (): boolean => {
  // Check for editing environment variables or flags
  if (typeof window !== 'undefined') {
    return !!(window as any).__EDITING_ENABLED__ || 
           localStorage.getItem('editing-enabled') === 'true' ||
           new URLSearchParams(window.location.search).has('edit');
  }
  
  return process.env.EDITING_ENABLED === 'true' || 
         process.env.NODE_ENV === 'development';
};

/**
 * Enhanced version of makeEditable that includes environment checks
 * Returns empty object when editing is disabled for better performance
 */
export const makeEditableSafe = (
  componentId: string,
  componentType: string,
  fieldName: string,
  contentType: string,
  styleProperties: string[] = [],
  options?: EditableOptions
) => {
  if (!isEditingEnabled()) {
    return {};
  }

  return createEditableAttributes({
    componentId,
    componentType,
    fieldName,
    contentType,
    styleProperties,
    options
  });
};

/**
 * Helper to create component-level editable wrapper
 * Used by ComponentWrapper and similar editing containers
 */
export const createComponentEditableWrapper = (componentProps: any) => {
  // Use the actual ID from props first (from JSON metadata), then fall back to generation
  const componentId = componentProps['data-editable-component-id'] || 
                     componentProps.id || 
                     generateComponentId(componentProps);
  const componentType = componentProps.componentType || inferComponentType(componentProps);
  
  return {
    'data-component-wrapper': 'true',
    'data-component-id': componentId,
    'data-component-type': componentType,
    'data-page': componentProps.pageName || componentProps['data-page'] || 'unknown',
    'data-original-type': componentProps.originalType || componentProps['data-original-type'],
    'data-instance-number': (componentProps.instanceNumber || componentProps['data-instance-number'] || 1).toString(),
    'data-editable-container': 'true'
  };
};


// Normalizes icon data to ensure consistent structure
export const normalizeIconData = (iconData: any, fallback: string = 'CheckCircle'): { name: string; style: 'outline' | 'solid' } => {
  if (!iconData) {
    return { name: fallback, style: 'outline' };
  }
  
  // If it's already a string, treat as outline icon
  if (typeof iconData === 'string') {
    return { name: iconData, style: 'outline' };
  }
  
  // If it's an object with name and style
  if (typeof iconData === 'object' && iconData.name) {
    return {
      name: iconData.name,
      style: iconData.style === 'solid' ? 'solid' : 'outline'
    };
  }
  
  return { name: fallback, style: 'outline' };
};

// Resolves icon data to an actual icon component
export const resolveIconComponent = (
  iconData: any, 
  iconLibraries: { outline: any; solid?: any }, 
  fallback: any
): any => {
  const normalizedIcon = normalizeIconData(iconData);
  
  // Choose the appropriate icon set
  const iconSet = normalizedIcon.style === 'solid' && iconLibraries.solid 
    ? iconLibraries.solid 
    : iconLibraries.outline;
  
  // Return the icon component or fallback
  return iconSet[normalizedIcon.name] || fallback;
};