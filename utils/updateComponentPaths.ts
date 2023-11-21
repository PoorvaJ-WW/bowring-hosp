import fs from 'fs/promises';
import path from 'path';

export async function addComponentToPathsFile(componentId: string, componentPath: string): Promise<void> {
  const filePath = path.join(process.cwd(), 'utils', 'componentPaths.ts');
  
  try {
    // Read the current file
    let fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Find where to insert the new component
    // We'll look for the appropriate section based on the path
    let insertPosition = -1;
    let section = '';
    
    if (componentPath.includes('/hero/')) {
      section = '// Hero components';
    } else if (componentPath.includes('/features/')) {
      section = '// Feature components';
    } else if (componentPath.includes('/cta/')) {
      section = '// CTA components';
    } else if (componentPath.includes('/testimonials/')) {
      section = '// Testimonials components';
    } else if (componentPath.includes('/stats/')) {
      section = '// Stats components';
    } else if (componentPath.includes('/contact/')) {
      section = '// Contact components';
    } else if (componentPath.includes('/content/')) {
      section = '// Content components';
    } else if (componentPath.includes('/faq/')) {
      section = '// FAQ components';
    } else if (componentPath.includes('/team/')) {
      section = '// Team components';
    } else if (componentPath.includes('/gallery/')) {
      section = '// Gallery components';
    }
    
    if (section) {
      // Find the section
      const sectionIndex = fileContent.indexOf(section);
      if (sectionIndex !== -1) {
        // Find the next empty line or next section after this section
        const lines = fileContent.split('\n');
        let lineIndex = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(section)) {
            lineIndex = i;
            break;
          }
        }
        
        // Find the last entry in this section
        let lastEntryIndex = -1;
        for (let i = lineIndex + 1; i < lines.length; i++) {
          if (lines[i].includes("':")) {
            lastEntryIndex = i;
          } else if (lines[i].trim() === '' || lines[i].includes('//')) {
            break;
          }
        }
        
        if (lastEntryIndex !== -1) {
          // Insert after the last entry
          insertPosition = lines.slice(0, lastEntryIndex + 1).join('\n').length + 1;
        }
      }
    }
    
    // If we found a position, insert the new component
    if (insertPosition !== -1) {
      const newEntry = `  '${componentId}': '${componentPath}',\n`;
      fileContent = fileContent.slice(0, insertPosition) + newEntry + fileContent.slice(insertPosition);
    } else {
      // Otherwise, add it before the closing brace of the componentPaths object
      const closingBraceIndex = fileContent.lastIndexOf('};');
      if (closingBraceIndex !== -1) {
        const newEntry = `  '${componentId}': '${componentPath}',\n`;
        fileContent = fileContent.slice(0, closingBraceIndex) + newEntry + fileContent.slice(closingBraceIndex);
      }
    }
    
    // Write the updated content back to the file
    await fs.writeFile(filePath, fileContent, 'utf-8');
    console.log(`Added ${componentId} to componentPaths.ts`);
  } catch (error) {
    console.error('Error updating componentPaths.ts:', error);
    throw error;
  }
}