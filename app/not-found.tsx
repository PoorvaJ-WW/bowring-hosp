'use client';

import { useTheme } from '@/context/ThemeContext';

export default function NotFound() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-[50vh] flex items-center justify-center" 
         style={{ backgroundColor: theme.colors.background.primary[theme.mode] }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4"
            style={{ color: theme.colors.text.primary[theme.mode] }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: theme.colors.text.secondary[theme.mode] }}>
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}