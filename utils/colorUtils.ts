// Color utility functions for components
// Provides standardized color getter functions for various component elements

import { getThemeColor, getCurrentBackgroundType, getCustomBackgroundColor } from './themeUtils';

// Configuration options for color getter functions
interface ColorConfig {
  theme: any;
  content?: any;
}

// Gets the container background color based on content and theme settings
export const getContainerBackgroundColor = ({ theme, content }: ColorConfig): string => {
  return getThemeColor(theme, `background.${content?.backgroundType || 'primary'}`, '#FFFFFF');
};

// Gets the title color from theme
export const getTitleColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'primary', '#3B82F6');
};

// Gets the subtitle color from theme
export const getSubtitleColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'accent', '#F59E0B');
};

// Gets the description text color from theme
export const getDescriptionColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'text.primary', '#111827');
};

// Gets the feature name/title color from theme
export const getFeatureNameColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'text.primary', '#111827');
};

// Gets the feature description color from theme
export const getFeatureDescriptionColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'text.primary', '#111827');
};

// Gets the icon color from theme (typically for icons on colored backgrounds)
export const getIconColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'background.primary', '#FFFFFF');
};

// Gets the icon background color from theme
export const getIconBackgroundColor = ({ theme }: ColorConfig): string => {
  return getTitleColor({ theme }); // Icons typically use the primary/title color as background
};

// Gets the secondary text color from theme
export const getSecondaryTextColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'text.secondary', '#6B7280');
};

// Gets the accent color from theme
export const getAccentColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'accent', '#8B5CF6');
};

// Gets the primary button color from theme
export const getPrimaryButtonColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'primary', '#3B82F6');
};

// Gets the primary button text color from theme
export const getPrimaryButtonTextColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'background.primary', '#FFFFFF');
};

// Gets the secondary button color from theme
export const getSecondaryButtonColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'secondary', '#E5E7EB');
};

// Gets the secondary button text color from theme
export const getSecondaryButtonTextColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'text.primary', '#111827');
};

// Gets the border color from theme
export const getBorderColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'border', '#E5E7EB');
};

// Gets the error color from theme
export const getErrorColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'error', '#EF4444');
};

// Gets the success color from theme
export const getSuccessColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'success', '#10B981');
};

// Gets the warning color from theme
export const getWarningColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'warning', '#F59E0B');
};

// Gets the info color from theme
export const getInfoColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'info', '#3B82F6');
};

// Gets the feature card background color from theme
export const getFeatureCardBackgroundColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'background.secondary', '#FFFFFF');
};

// Gets the secondary background color from theme
export const getSecondaryBackgroundColor = ({ theme }: ColorConfig): string => {
  return getThemeColor(theme, 'background.secondary', '#F9FAFB');
};

// Helper to get all standard component colors at once
export const getComponentColors = ({ theme, content }: ColorConfig) => {
  return {
    container: getContainerBackgroundColor({ theme, content }),
    title: getTitleColor({ theme }),
    subtitle: getSubtitleColor({ theme }),
    description: getDescriptionColor({ theme }),
    featureName: getFeatureNameColor({ theme }),
    featureDescription: getFeatureDescriptionColor({ theme }),
    icon: getIconColor({ theme }),
    iconBackground: getIconBackgroundColor({ theme }),
    secondaryText: getSecondaryTextColor({ theme }),
    accent: getAccentColor({ theme }),
    primaryButton: getPrimaryButtonColor({ theme }),
    primaryButtonText: getPrimaryButtonTextColor({ theme }),
    secondaryButton: getSecondaryButtonColor({ theme }),
    secondaryButtonText: getSecondaryButtonTextColor({ theme }),
    border: getBorderColor({ theme }),
    error: getErrorColor({ theme }),
    success: getSuccessColor({ theme }),
    warning: getWarningColor({ theme }),
    info: getInfoColor({ theme })
  };
};

// Re-export utility functions that are commonly used with colors
export { getCurrentBackgroundType, getCustomBackgroundColor };