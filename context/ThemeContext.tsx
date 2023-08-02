// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { Theme } from '@/types/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onThemeToggle: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children,
  defaultTheme 
}: { 
  children: React.ReactNode;
  defaultTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // Apply initial theme on mount
  useEffect(() => {
    // Apply dark mode class
    document.documentElement.classList.toggle('dark', defaultTheme.mode === 'dark');
    
    // Apply font CSS variables if fonts are defined in theme
    if (defaultTheme.fonts) {
      const root = document.documentElement;
      root.style.setProperty('--font-heading', defaultTheme.fonts.heading || 'Inter, sans-serif');
      root.style.setProperty('--font-body', defaultTheme.fonts.body || 'Inter, sans-serif');
      
      if (defaultTheme.fonts.navigation) {
        root.style.setProperty('--font-nav-header', defaultTheme.fonts.navigation.header || defaultTheme.fonts.heading || 'Inter, sans-serif');
        root.style.setProperty('--font-nav-footer', defaultTheme.fonts.navigation.footer || defaultTheme.fonts.body || 'Inter, sans-serif');
      }
    }
  }, [defaultTheme]);

  const saveTheme = useCallback(async (newTheme: Theme) => {
    try {
      console.log('[ThemeContext] Saving theme to API...');
      const response = await fetch('/api/update-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save theme: ${errorData.details || response.statusText}`);
      }
      
      const result = await response.json();
      console.log('[ThemeContext] Theme saved successfully:', result.message);
    } catch (error) {
      console.error('[ThemeContext] Error saving theme:', error);
      // Still apply the theme in memory even if save fails
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Apply dark mode class
    document.documentElement.classList.toggle('dark', newTheme.mode === 'dark');
    
    // Apply font CSS variables if fonts are defined in theme
    if (newTheme.fonts) {
      const root = document.documentElement;
      root.style.setProperty('--font-heading', newTheme.fonts.heading || 'Inter, sans-serif');
      root.style.setProperty('--font-body', newTheme.fonts.body || 'Inter, sans-serif');
      
      if (newTheme.fonts.navigation) {
        root.style.setProperty('--font-nav-header', newTheme.fonts.navigation.header || newTheme.fonts.heading || 'Inter, sans-serif');
        root.style.setProperty('--font-nav-footer', newTheme.fonts.navigation.footer || newTheme.fonts.body || 'Inter, sans-serif');
      }
    }
    
    // Save theme to API (which updates the file)
    saveTheme(newTheme);
  }, [saveTheme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    onThemeToggle: () => {
      const newMode = theme.mode === 'light' ? 'dark' : 'light';
      const newTheme = {
        ...theme,
        mode: newMode
      };
      setTheme(newTheme);
    }
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}