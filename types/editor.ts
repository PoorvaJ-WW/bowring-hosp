// types/editor.ts
export interface EditorAPI {
  selectComponent: (component: {
    id: string;
    type: string;
    category: string;
    instanceNumber: number;
  }) => void;
  updateComponent: (componentId: string, newContent: any) => Promise<void>;
  getComponentContent: (componentId: string) => Promise<any>;
}
