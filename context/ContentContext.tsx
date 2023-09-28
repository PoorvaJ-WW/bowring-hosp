'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define content types
type ContentItem = {
  id: string;
  type: string;
  value: string | Record<string, any>;
  path: string[];
  viewId: string;
};

interface ContentContextType {
  content: Record<string, any>;
  updateContent: (componentId: string, path: string[], value: any) => void;
  saveContent: () => Promise<void>;
  isEditingContent: boolean;
  setIsEditingContent: (value: boolean) => void;
  editingComponent: ContentItem | null;
  setEditingComponent: (component: ContentItem | null) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  // Main content store - this would ideally be loaded from an API or local storage
  const [content, setContent] = useState<Record<string, any>>({});
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingComponent, setEditingComponent] = useState<ContentItem | null>(null);

  // Load initial content
  useEffect(() => {
    // TODO: Load content from local storage or API
    const savedContent = localStorage.getItem('site-content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
  }, []);

  // Update content at a specific path
  const updateContent = (componentId: string, path: string[], value: any) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      
      // Create the componentId entry if it doesn't exist
      if (!newContent[componentId]) {
        newContent[componentId] = {};
      }
      
      // Navigate to the correct position in the object
      let current = newContent[componentId];
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      
      // Set the value at the final path
      current[path[path.length - 1]] = value;
      
      return newContent;
    });
  };

  // Save content to backend or local storage
  const saveContent = async () => {
    try {
      // Save to localStorage for now
      localStorage.setItem('site-content', JSON.stringify(content));
      
      // TODO: Implement API call to save content
      // For example:
      // await fetch('/api/save-content', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(content),
      // });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to save content:', error);
      return Promise.reject(error);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        saveContent,
        isEditingContent,
        setIsEditingContent,
        editingComponent,
        setEditingComponent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextType {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}