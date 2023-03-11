'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface for the content being edited
interface ContentEditState {
  isOpen: boolean;
  content: string;
  componentType: string;
  fieldType: string;
  element: HTMLElement | null;
  filePath: string;
  onSave: (newContent: string) => void;
}

// Selected component interface
interface SelectedComponent {
  id: string;
  type: string;
  path: string;
  element: HTMLElement | null;
}

interface EditorContextType {
  // Base editor state
  isEditorOpen: boolean;
  setEditorOpen: (isOpen: boolean) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;

  // Content editing state
  contentEditState: ContentEditState;
  openContentEditor: (
    content: string,
    componentType: string,
    fieldType: string,
    element: HTMLElement | null,
    filePath: string,
    onSave: (newContent: string) => void
  ) => void;
  closeContentEditor: () => void;
  setContentEditState: React.Dispatch<React.SetStateAction<ContentEditState>>;

  // Component and page selection state
  selectedComponent: SelectedComponent | null;
  setSelectedComponent: (component: SelectedComponent | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const defaultContentEditState: ContentEditState = {
  isOpen: false,
  content: '',
  componentType: '',
  fieldType: 'text',
  element: null,
  filePath: '',
  onSave: () => {}
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  // Base editor state with default values first for SSR
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Load state from localStorage once on client-side
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('editorState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setIsEditorOpen(parsedState.isOpen || false);
      }
    } catch (e) {
      console.error('Error loading editor state:', e);
    }
  }, []);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Updating theme...');

  // Component and page selection state
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(typeof window !== 'undefined' ? window.location.pathname : '/');

  // Content editing state
  const [contentEditState, setContentEditState] = useState<ContentEditState>(defaultContentEditState);
  
  // Function to open the content editor
  const openContentEditor = (
    content: string, 
    componentType: string, 
    fieldType: string, 
    element: HTMLElement | null,
    filePath: string,
    onSave: (newContent: string) => void
  ) => {
    setContentEditState({
      isOpen: true,
      content,
      componentType,
      fieldType,
      element,
      filePath,
      onSave
    });
  };
  
  // Function to close the content editor
  const closeContentEditor = () => {
    setContentEditState(defaultContentEditState);
  };
  
  // Listen for the custom event to show the edit dialog
  useEffect(() => {
    const handleShowEditDialog = (event: CustomEvent) => {
      const { content, componentType, fieldType, element, filePath } = event.detail;
      
      openContentEditor(
        content, 
        componentType || 'unknown', 
        fieldType || 'text', 
        element || null,
        filePath || '',
        (newContent: string) => {
          console.log('Content updated:', newContent);
          // The actual save handler will be passed when triggering the event
        }
      );
    };
    
    if (typeof window !== 'undefined') {
      document.addEventListener('showEditDialog', handleShowEditDialog as EventListener);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('showEditDialog', handleShowEditDialog as EventListener);
      }
    };
  }, []);
  
  // Update localStorage when editor state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('editorState', JSON.stringify({
          isOpen: isEditorOpen
        }));
      } catch (e) {
        console.error('Error saving editor state to localStorage:', e);
      }
    }
  }, [isEditorOpen]);

  return (
    <EditorContext.Provider
      value={{
        // Base editor state
        isEditorOpen,
        setEditorOpen: setIsEditorOpen,

        // Loading state
        isLoading,
        setIsLoading,
        loadingMessage,
        setLoadingMessage,

        // Content editing state
        contentEditState,
        openContentEditor,
        closeContentEditor,
        setContentEditState,

        // Component and page selection state
        selectedComponent,
        setSelectedComponent,
        currentPage,
        setCurrentPage
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextType {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}

// Additional hook with more descriptive name
export function useEditorContext(): EditorContextType {
  return useEditor();
}