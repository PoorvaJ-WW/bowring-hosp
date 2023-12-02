'use client';
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { EditorProvider } from './EditorContext';
import type { Theme } from '../types/theme';

const defaultTheme: Theme = {
            "businessName": "Bowring and Lady Curzon Hospital",
            "colors": {
                  "background": {
                        "primary": {
                              "light": "#FFFFFF",
                              "dark": "#1B2838"
                        },
                        "secondary": {
                              "light": "#F4F8F7",
                              "dark": "#273847"
                        },
                        "navigation": {
                              "header": {
                                    "light": "#FFFFFF",
                                    "dark": "#1B2838"
                              },
                              "footer": {
                                    "light": "#E8F2F0",
                                    "dark": "#273847"
                              }
                        }
                  },
                  "primary": {
                        "light": "#2C7A7B",
                        "dark": "#4FD1C5"
                  },
                  "secondary": {
                        "light": "#8B4513",
                        "dark": "#CD853F"
                  },
                  "accent": {
                        "light": "#C05621",
                        "dark": "#ED8936"
                  },
                  "text": {
                        "primary": {
                              "light": "#1A365D",
                              "dark": "#E8F2F0"
                        },
                        "secondary": {
                              "light": "#2D5F6F",
                              "dark": "#B2D4DD"
                        },
                        "navigation": {
                              "header": {
                                    "light": "#1A365D",
                                    "dark": "#E8F2F0"
                              },
                              "footer": {
                                    "light": "#2D5F6F",
                                    "dark": "#B2D4DD"
                              }
                        }
                  },
                  "logo": {
                        "src": "/placeholder.svg",
                        "alt": "Image",
                        "isPlaceholder": true,
                        "fallbackReason": "Invalid image URL: empty"
                  }
            },
            "fonts": {
                  "heading": "Crimson Text, serif",
                  "body": "Source Sans Pro, sans-serif",
                  "navigation": {
                        "header": "Source Sans Pro, sans-serif",
                        "footer": "Source Sans Pro, sans-serif"
                  }
            },
            "mode": "light"
      };

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <EditorProvider>
        {children}
      </EditorProvider>
    </ThemeProvider>
  );
}

export { Providers };
