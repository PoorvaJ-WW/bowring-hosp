/**
 * Component Design Registry
 * 
 * This registry maps component types to their design properties and file paths.
 * It's used by the Design Editor to understand what aspects of each component
 * can be modified and where the component code is located.
 */

export interface ComponentProperty {
  name: string;
  type: 'spacing' | 'fontSize' | 'position' | 'layout' | 'color' | 'size' | 'other';
  default: string;
  description?: string;
}

export interface ComponentDesignDefinition {
  properties: ComponentProperty[];
  getFilePath: (componentId: string) => string;
  description?: string;
}

type ComponentRegistry = Record<string, ComponentDesignDefinition>;

export const componentDesignRegistry: ComponentRegistry = {
  // Hero Components
  'HeroSimpleCentered': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-32 sm:py-48 lg:py-56', description: 'Padding for the hero container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl sm:text-6xl', description: 'Font size for the headline' },
      { name: 'subheadingSize', type: 'fontSize', default: 'text-lg', description: 'Font size for the subheadline' },
      { name: 'buttonSize', type: 'size', default: 'px-3.5 py-2.5', description: 'Size of the primary button' },
      { name: 'containerWidth', type: 'size', default: 'max-w-2xl', description: 'Maximum width of the content container' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/hero/${baseId}.tsx`;
    },
    description: 'A centered hero section with headline, subheadline, and call-to-action buttons'
  },
  
  'HeroSplitWithImage': {
    properties: [
      { name: 'imageSize', type: 'size', default: '1/2', description: 'Size of the image portion' },
      { name: 'imagePosition', type: 'position', default: 'right', description: 'Position of the image (left/right)' },
      { name: 'contentPadding', type: 'spacing', default: 'py-12 px-6', description: 'Padding around the content' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl', description: 'Font size for the headline' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/hero/${baseId}.tsx`;
    },
    description: 'A hero section with content on one side and an image on the other'
  },
  
  'HeroWithImage': {
    properties: [
      { name: 'imageHeight', type: 'size', default: 'h-56 sm:h-72 md:h-96', description: 'Height of the image' },
      { name: 'contentPosition', type: 'position', default: 'relative', description: 'Position of the content' },
      { name: 'overlayOpacity', type: 'other', default: '50', description: 'Opacity of the overlay on the image' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/hero/${baseId}.tsx`;
    },
    description: 'A hero section with a full-width image and overlay text'
  },
  
  'HeroAngledImage': {
    properties: [
      { name: 'imageAngle', type: 'other', default: '-5deg', description: 'Angle of the image' },
      { name: 'containerPadding', type: 'spacing', default: 'py-24', description: 'Padding for the container' },
      { name: 'contentWidth', type: 'size', default: 'max-w-xl', description: 'Width of the content section' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/hero/${baseId}.tsx`;
    },
    description: 'A hero section with angled image element'
  },
  
  // Feature Components
  'FeatureSimpleThreeColumn': {
    properties: [
      { name: 'columnGap', type: 'spacing', default: 'gap-8', description: 'Gap between columns' },
      { name: 'iconSize', type: 'size', default: 'h-10 w-10', description: 'Size of the feature icons' },
      { name: 'containerPadding', type: 'spacing', default: 'py-24', description: 'Padding for the container' },
      { name: 'titleSize', type: 'fontSize', default: 'text-lg', description: 'Font size for feature titles' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/features/${baseId}.tsx`;
    },
    description: 'A three-column feature section with icons'
  },
  
  'FeatureImageThreeColumn': {
    properties: [
      { name: 'imageHeight', type: 'size', default: 'h-48', description: 'Height of the feature images' },
      { name: 'columnLayout', type: 'layout', default: 'grid-cols-1 lg:grid-cols-3', description: 'Layout of the columns' },
      { name: 'cardPadding', type: 'spacing', default: 'p-6', description: 'Padding inside each feature card' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/features/${baseId}.tsx`;
    },
    description: 'A three-column feature section with images'
  },
  
  'FeatureCentered2x2Grid': {
    properties: [
      { name: 'gridLayout', type: 'layout', default: 'grid-cols-1 md:grid-cols-2', description: 'Layout of the grid' },
      { name: 'cardPadding', type: 'spacing', default: 'p-8', description: 'Padding inside feature cards' },
      { name: 'iconSize', type: 'size', default: 'h-12 w-12', description: 'Size of the feature icons' },
      { name: 'containerWidth', type: 'size', default: 'max-w-5xl', description: 'Maximum width of the container' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/features/${baseId}.tsx`;
    },
    description: 'A centered 2x2 grid of features'
  },
  
  // Testimonial Components
  'TestimonialsOffWhiteGrid': {
    properties: [
      { name: 'gridLayout', type: 'layout', default: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', description: 'Layout of the testimonials grid' },
      { name: 'cardPadding', type: 'spacing', default: 'p-6', description: 'Padding inside testimonial cards' },
      { name: 'quoteSize', type: 'fontSize', default: 'text-base', description: 'Font size for testimonial quotes' },
      { name: 'backgroundColor', type: 'color', default: 'bg-gray-50', description: 'Background color of the section' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/testimonials/${baseId}.tsx`;
    },
    description: 'A grid of testimonial cards on an off-white background'
  },
  
  // Stats Components
  'StatsSimpleInCard': {
    properties: [
      { name: 'statValueSize', type: 'fontSize', default: 'text-4xl', description: 'Font size for the stat values' },
      { name: 'statLabelSize', type: 'fontSize', default: 'text-base', description: 'Font size for the stat labels' },
      { name: 'cardPadding', type: 'spacing', default: 'p-8', description: 'Padding inside the stats card' },
      { name: 'statLayout', type: 'layout', default: 'grid-cols-1 md:grid-cols-3', description: 'Layout of the stats' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/stats/${baseId}.tsx`;
    },
    description: 'A simple card with statistics'
  },
  
  // CTA Components
  'CTASimpleCentered': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-16', description: 'Padding for the CTA container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl', description: 'Font size for CTA heading' },
      { name: 'contentMaxWidth', type: 'size', default: 'max-w-2xl', description: 'Max width of content' },
      { name: 'buttonSize', type: 'size', default: 'px-4 py-2', description: 'Size of the CTA button' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/cta/${baseId}.tsx`;
    },
    description: 'A centered call-to-action section'
  },
  
  'CTASimpleCenteredOnBrand': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-16', description: 'Padding for the CTA container' },
      { name: 'borderRadius', type: 'size', default: 'rounded-xl', description: 'Border radius of container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl', description: 'Font size for CTA heading' },
      { name: 'buttonSize', type: 'size', default: 'px-4 py-2', description: 'Size of the CTA button' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/cta/${baseId}.tsx`;
    },
    description: 'A centered CTA with brand color background'
  },
  
  // Contact Components
  'ContactSplitWithMap': {
    properties: [
      { name: 'mapHeight', type: 'size', default: 'h-64 lg:h-full', description: 'Height of the map' },
      { name: 'formWidth', type: 'size', default: 'lg:w-1/2', description: 'Width of the form section' },
      { name: 'formPadding', type: 'spacing', default: 'p-8', description: 'Padding around the form' },
      { name: 'inputHeight', type: 'size', default: 'h-12', description: 'Height of input fields' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/contact/${baseId}.tsx`;
    },
    description: 'A contact section split with a map'
  },

  'ContactSimpleTwoColumn': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'px-6 py-16 lg:px-8', description: 'Container padding' },
      { name: 'titleSize', type: 'fontSize', default: 'text-2xl sm:text-3xl', description: 'Font size for section titles' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-lg', description: 'Font size for descriptions' },
      { name: 'contactInfoSize', type: 'fontSize', default: 'text-base', description: 'Font size for contact information' },
      { name: 'columnGap', type: 'spacing', default: 'md:gap-8', description: 'Gap between columns' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/contact/${baseId}.tsx`;
    },
    description: 'A two-column contact section with sales and technical support'
  },

  'ContactSimpleCentered': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'px-6 py-24 sm:py-32 lg:px-8', description: 'Container padding' },
      { name: 'titleSize', type: 'fontSize', default: 'text-4xl sm:text-5xl', description: 'Font size for main title' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-lg', description: 'Font size for description' },
      { name: 'optionTitleSize', type: 'fontSize', default: 'text-base', description: 'Font size for contact option titles' },
      { name: 'optionSpacing', type: 'spacing', default: 'space-y-16', description: 'Spacing between contact options' },
      { name: 'iconSize', type: 'size', default: 'size-10', description: 'Size of contact option icons' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/contact/${baseId}.tsx`;
    },
    description: 'A centered contact section with multiple contact options'
  },
  
  // FAQ Components
  'FaqThreeColumnCenter': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-16 sm:py-24', description: 'Padding for the FAQ container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl sm:text-5xl', description: 'Font size for the FAQ title' },
      { name: 'subtitleSize', type: 'fontSize', default: 'text-base', description: 'Font size for subtitle' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for description' },
      { name: 'questionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for questions' },
      { name: 'answerSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for answers' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/faq/${baseId}.tsx`;
    },
    description: 'A FAQ section with three-column grid layout and centered header'
  },
  
  'FaqTwoColumnsCenter': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-16 sm:py-24', description: 'Padding for the FAQ container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl sm:text-5xl', description: 'Font size for the FAQ title' },
      { name: 'subtitleSize', type: 'fontSize', default: 'text-base', description: 'Font size for subtitle' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for description' },
      { name: 'questionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for questions' },
      { name: 'answerSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for answers' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/faq/${baseId}.tsx`;
    },
    description: 'A FAQ section with two-column grid layout and centered header'
  },
  
  'FaqTwoColumns': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-16 sm:py-24', description: 'Padding for the FAQ container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl sm:text-5xl', description: 'Font size for the FAQ title' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for description' },
      { name: 'questionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for questions' },
      { name: 'answerSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for answers' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/faq/${baseId}.tsx`;
    },
    description: 'A basic FAQ section with two-column grid layout'
  },
  
  'FaqSideBySide': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-24 sm:py-32 lg:py-40', description: 'Padding for the FAQ container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-4xl sm:text-5xl', description: 'Font size for the FAQ title' },
      { name: 'questionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for questions' },
      { name: 'answerSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for answers' },
      { name: 'dividerSpacing', type: 'spacing', default: 'py-8', description: 'Spacing around dividers' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/faq/${baseId}.tsx`;
    },
    description: 'A FAQ section with side-by-side layout for questions and answers'
  },
  
  'FaqOffset': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-24 sm:pt-32 lg:py-40', description: 'Padding for the FAQ container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl sm:text-4xl', description: 'Font size for the FAQ title' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for description' },
      { name: 'questionSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for questions' },
      { name: 'answerSize', type: 'fontSize', default: 'text-base/7', description: 'Font size for answers' },
      { name: 'spacing', type: 'spacing', default: 'space-y-10', description: 'Spacing between FAQ items' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/faq/${baseId}.tsx`;
    },
    description: 'A FAQ section with offset layout - title on left, questions on right'
  },
  
  // Video Components
  'VideoPlayerSingle': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-12 sm:py-16 md:py-24', description: 'Padding for the video container' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl sm:text-4xl md:text-5xl', description: 'Font size for the video title' },
      { name: 'descriptionSize', type: 'fontSize', default: 'text-base sm:text-lg md:text-xl', description: 'Font size for description' },
      { name: 'videoAspectRatio', type: 'layout', default: 'aspect-video', description: 'Aspect ratio of the video player' },
      { name: 'decorativeElements', type: 'other', default: 'blur-3xl', description: 'Background decorative blur effects' },
      { name: 'borderRadius', type: 'size', default: 'rounded-2xl', description: 'Border radius of video player' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/video/${baseId}.tsx`;
    },
    description: 'A single featured video player with YouTube integration and fullscreen modal'
  },
  
  'VideoPlayerBigGallery': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-12 lg:py-16', description: 'Padding for the main container' },
      { name: 'sectionSpacing', type: 'spacing', default: 'mb-12 lg:mb-16', description: 'Spacing between sections' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl lg:text-4xl', description: 'Font size for main title' },
      { name: 'subtitleSize', type: 'fontSize', default: 'text-lg text-gray-600', description: 'Font size for subtitle' },
      { name: 'galleryTitleSize', type: 'fontSize', default: 'text-2xl lg:text-3xl', description: 'Font size for gallery section title' },
      { name: 'featuredVideoSize', type: 'layout', default: 'aspect-video', description: 'Aspect ratio for featured video' },
      { name: 'galleryGridCols', type: 'layout', default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', description: 'Grid columns for video gallery' },
      { name: 'videoCardSpacing', type: 'spacing', default: 'gap-6', description: 'Spacing between video cards in gallery' },
      { name: 'loadMoreButton', type: 'color', default: 'bg-primary-600 hover:bg-primary-700', description: 'Load more button styling' },
      { name: 'modalBackground', type: 'color', default: 'bg-black/80', description: 'Background color for video modal' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/video/${baseId}.tsx`;
    },
    description: 'A comprehensive video gallery with featured video section and expandable grid layout for large video libraries'
  },
  
  'VideoPlayerBigGalleryTwoColumn': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-12 lg:py-16', description: 'Padding for the main container' },
      { name: 'sectionSpacing', type: 'spacing', default: 'mb-12 lg:mb-16', description: 'Spacing between sections' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl lg:text-4xl', description: 'Font size for main title' },
      { name: 'subtitleSize', type: 'fontSize', default: 'text-lg text-gray-600', description: 'Font size for subtitle' },
      { name: 'galleryTitleSize', type: 'fontSize', default: 'text-2xl lg:text-3xl', description: 'Font size for gallery section title' },
      { name: 'featuredVideoSize', type: 'layout', default: 'aspect-video', description: 'Aspect ratio for featured video' },
      { name: 'galleryGridCols', type: 'layout', default: 'grid-cols-1 sm:grid-cols-2', description: 'Two-column grid layout for video gallery' },
      { name: 'videoCardSpacing', type: 'spacing', default: 'gap-8', description: 'Larger spacing for two-column layout' },
      { name: 'videoCardPadding', type: 'spacing', default: 'p-6', description: 'Enhanced padding for spacious two-column cards' },
      { name: 'loadMoreButton', type: 'color', default: 'bg-primary-600 hover:bg-primary-700', description: 'Load more button styling' },
      { name: 'modalBackground', type: 'color', default: 'bg-black/80', description: 'Background color for video modal' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/video/${baseId}.tsx`;
    },
    description: 'A two-column video gallery with featured video section - perfect for balanced, spacious video presentation'
  },
  
  'VideoPlayerBigGalleryThreeColumn': {
    properties: [
      { name: 'containerPadding', type: 'spacing', default: 'py-12 lg:py-16', description: 'Padding for the main container' },
      { name: 'sectionSpacing', type: 'spacing', default: 'mb-12 lg:mb-16', description: 'Spacing between sections' },
      { name: 'headingSize', type: 'fontSize', default: 'text-3xl lg:text-4xl', description: 'Font size for main title' },
      { name: 'subtitleSize', type: 'fontSize', default: 'text-lg text-gray-600', description: 'Font size for subtitle' },
      { name: 'galleryTitleSize', type: 'fontSize', default: 'text-2xl lg:text-3xl', description: 'Font size for gallery section title' },
      { name: 'featuredVideoSize', type: 'layout', default: 'aspect-video', description: 'Aspect ratio for featured video' },
      { name: 'galleryGridCols', type: 'layout', default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', description: 'Three-column grid layout for video gallery' },
      { name: 'videoCardSpacing', type: 'spacing', default: 'gap-6', description: 'Balanced spacing for three-column layout' },
      { name: 'videoCardPadding', type: 'spacing', default: 'p-4', description: 'Standard padding for three-column cards' },
      { name: 'loadMoreButton', type: 'color', default: 'bg-primary-600 hover:bg-primary-700', description: 'Load more button styling' },
      { name: 'modalBackground', type: 'color', default: 'bg-black/80', description: 'Background color for video modal' }
    ],
    getFilePath: (componentId: string) => {
      const baseId = componentId.replace(/Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals/g, '');
      return `/components/video/${baseId}.tsx`;
    },
    description: 'A three-column video gallery with featured video section - perfect for displaying many videos efficiently'
  }
};

/**
 * Get the component design definition by component type
 */
export const getComponentDesignDefinition = (componentType: string): ComponentDesignDefinition | null => {
  if (!componentType) {
    console.error('No component type provided to getComponentDesignDefinition');
    return null;
  }
  
  // Check if the exact component type exists in the registry
  if (componentDesignRegistry[componentType]) {
    return componentDesignRegistry[componentType];
  }
  
  // Try removing page-specific suffixes to get the base component type
  const baseRegex = /^(Hero|Feature|CTA|Testimonials|Stats|Contact)([A-Za-z0-9]+)(Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals)?$/;
  const matches = componentType.match(baseRegex);
  
  if (matches) {
    const category = matches[1]; // Hero, Feature, etc.
    const variant = matches[2]; // Simple, SplitWithImage, etc.
    const baseComponentType = category + variant; // HeroSimple, FeatureImageThreeColumn, etc.
    
    console.log(`Looking for base component type: ${baseComponentType}`);
    
    // Check if the base component type exists in the registry
    if (componentDesignRegistry[baseComponentType]) {
      return componentDesignRegistry[baseComponentType];
    }
  }
  
  // As a fallback, strip all page-specific suffixes and try again
  const strippedType = componentType.replace(/(Home|About|Contact|Resources|PrayerGuides|SpiritualDisciplines|DailyDevotionals)$/g, '');
  
  console.log(`Fallback: looking for stripped component type: ${strippedType}`);
  
  return componentDesignRegistry[strippedType] || null;
};