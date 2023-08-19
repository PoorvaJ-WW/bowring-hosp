// src/types/theme.ts

export interface ColorModes {
  light: string;
  dark: string;
}

export interface NavigationColors {
  header: ColorModes;
  footer: ColorModes;
}

export interface BackgroundColors {
  primary: ColorModes;
  secondary: ColorModes;
  navigation: NavigationColors;
}

export interface TextColors {
  primary: ColorModes;
  secondary: ColorModes;
  navigation: NavigationColors;
}

export interface Theme {
  colors: {
    background: BackgroundColors;
    primary: ColorModes;
    secondary: ColorModes;
    accent: ColorModes;
    text: TextColors;
    logo: ColorModes;
  };
  fonts: {
    heading: string;
    body: string;
    navigation: {
      header: string;
      footer: string;
    };
  };
  mode: 'light' | 'dark';
}

// Default theme that matches your data structure
export const defaultTheme: Theme = {
  colors: {
    background: {
      primary: {
        light: "#FCFDF7",
        dark: "#1C1E1B"
      },
      secondary: {
        light: "#F5F7EF",
        dark: "#2A2C28"
      },
      navigation: {
        header: {
          light: "#FFFFFF",
          dark: "#1C1E1B"
        },
        footer: {
          light: "#F5F7EF",
          dark: "#2A2C28"
        }
      }
    },
    primary: {
      light: "#16A34A",
      dark: "#22C55E"
    },
    secondary: {
      light: "#15803D",
      dark: "#16A34A"
    },
    accent: {
      light: "#CA8A04",
      dark: "#FACC15"
    },
    text: {
      primary: {
        light: "#1C1E1B",
        dark: "#FCFDF7"
      },
      secondary: {
        light: "#374151",
        dark: "#E5E7EB"
      },
      navigation: {
        header: {
          light: "#1C1E1B",
          dark: "#FCFDF7"
        },
        footer: {
          light: "#374151",
          dark: "#E5E7EB"
        }
      }
    },
    logo: {
      light: "#16A34A",
      dark: "#22C55E"
    }
  },
  fonts: {
    heading: "'Chronicle Display', serif",
    body: "'Euclid Circular A', sans-serif",
    navigation: {
      header: "'Chronicle Display', serif",
      footer: "'Euclid Circular A', sans-serif"
    }
  },
  mode: 'light'
};

export type PartialColorModes = Partial<ColorModes>;
export type PartialNavigationColors = Partial<{
  header: PartialColorModes;
  footer: PartialColorModes;
}>;

export type PartialTheme = Partial<Theme>;

export function createDefaultTheme(): Theme {
  return defaultTheme;
}

export function mergeTheme(defaultTheme: Theme, customTheme?: Partial<Theme>): Theme {
  if (!customTheme) return defaultTheme;
  
  return {
    colors: {
      background: {
        primary: { ...defaultTheme.colors.background.primary, ...customTheme.colors?.background?.primary },
        secondary: { ...defaultTheme.colors.background.secondary, ...customTheme.colors?.background?.secondary },
        navigation: {
          header: { ...defaultTheme.colors.background.navigation.header, ...customTheme.colors?.background?.navigation?.header },
          footer: { ...defaultTheme.colors.background.navigation.footer, ...customTheme.colors?.background?.navigation?.footer }
        }
      },
      primary: { ...defaultTheme.colors.primary, ...customTheme.colors?.primary },
      secondary: { ...defaultTheme.colors.secondary, ...customTheme.colors?.secondary },
      accent: { ...defaultTheme.colors.accent, ...customTheme.colors?.accent },
      text: {
        primary: { ...defaultTheme.colors.text.primary, ...customTheme.colors?.text?.primary },
        secondary: { ...defaultTheme.colors.text.secondary, ...customTheme.colors?.text?.secondary },
        navigation: {
          header: { ...defaultTheme.colors.text.navigation.header, ...customTheme.colors?.text?.navigation?.header },
          footer: { ...defaultTheme.colors.text.navigation.footer, ...customTheme.colors?.text?.navigation?.footer }
        }
      },
      logo: { ...defaultTheme.colors.logo, ...customTheme.colors?.logo }
    },
    fonts: {
      heading: customTheme.fonts?.heading || defaultTheme.fonts.heading,
      body: customTheme.fonts?.body || defaultTheme.fonts.body,
      navigation: {
        header: customTheme.fonts?.navigation?.header || defaultTheme.fonts.navigation.header,
        footer: customTheme.fonts?.navigation?.footer || defaultTheme.fonts.navigation.footer
      }
    },
    mode: customTheme.mode || defaultTheme.mode
  };
}