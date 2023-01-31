export const componentPaths: Record<string, string> = {
  // Hero components
  'HeroSplitWithImage': 'components/hero/HeroSplitWithImage.tsx',
  'HeroSimpleCenteredAbout': 'components/hero/HeroSimpleCenteredAbout.tsx',
  'HeroAngledImageDiscernmentResources': 'components/hero/HeroAngledImageDiscernmentResources.tsx',
  'HeroAngledImageResources': 'components/hero/HeroAngledImageResources.tsx',
  'HeroWithImageMarriage': 'components/hero/HeroWithImageMarriage.tsx',
  'HeroWithImagePriesthood': 'components/hero/HeroWithImagePriesthood.tsx',
  'HeroWithImageReligiousLife': 'components/hero/HeroWithImageReligiousLife.tsx',
  'HeroWithImageSingleLife': 'components/hero/HeroWithImageSingleLife.tsx',
  'HeroSimplePrayerGuides': 'components/hero/HeroSimplePrayerGuides.tsx',
  'HeroSimpleBlog': 'components/hero/HeroSimpleBlog.tsx',
  'HeroWithImageEvents': 'components/hero/HeroWithImageEvents.tsx',
  'HeroSimpleCenteredContact': 'components/hero/HeroSimpleCenteredContact.tsx',

  
  // Feature components
  'FeatureSimpleThreeColumn': 'components/features/FeatureSimpleThreeColumn.tsx',
 
  
  // CTA components
  'CTASimpleCenteredOnBrand': 'components/cta/CTASimpleCenteredOnBrand.tsx',
  'CTASimpleCenteredOnBrandHome': 'components/cta/CTASimpleCenteredOnBrandHome.tsx',
  'CTASimpleCenteredOnBrandAbout': 'components/cta/CTASimpleCenteredOnBrandAbout.tsx',
  'CTASimpleCenteredOnBrandVocations': 'components/cta/CTASimpleCenteredOnBrandVocations.tsx',
  'CTASimpleCenteredOnBrandSpiritualDirection': 'components/cta/CTASimpleCenteredOnBrandSpiritualDirection.tsx',
  'CTASimpleCenteredOnBrandDiscernmentResources': 'components/cta/CTASimpleCenteredOnBrandDiscernmentResources.tsx',
  'CTASimpleCenteredOnBrandResources': 'components/cta/CTASimpleCenteredOnBrandResources.tsx',
  'CTASimpleCenteredOnBrandMarriage': 'components/cta/CTASimpleCenteredOnBrandMarriage.tsx',
  'CTASimpleCenteredOnBrandPriesthood': 'components/cta/CTASimpleCenteredOnBrandPriesthood.tsx',
  'CTASimpleCenteredOnBrandReligiousLife': 'components/cta/CTASimpleCenteredOnBrandReligiousLife.tsx',
  'CTASimpleCenteredOnBrandSingleLife': 'components/cta/CTASimpleCenteredOnBrandSingleLife.tsx',
  'CTASimpleCenteredOnBrandSpiritualPractices': 'components/cta/CTASimpleCenteredOnBrandSpiritualPractices.tsx',
  'CTASimpleCenteredOnBrandPrayerGuides': 'components/cta/CTASimpleCenteredOnBrandPrayerGuides.tsx',
  'CTASimpleCenteredOnBrandBlog': 'components/cta/CTASimpleCenteredOnBrandBlog.tsx',
  'CTASimpleCenteredOnBrandEvents': 'components/cta/CTASimpleCenteredOnBrandEvents.tsx',
  'CTASimpleCenteredHome_8c8l': 'components/cta/CTASimpleCenteredHome_8c8l.tsx',

  
  // Stats components
  'StatsSimpleInCardDiscernmentResources': 'components/stats/StatsSimpleInCardDiscernmentResources.tsx',
  'StatsSimpleInCardSpiritualPractices': 'components/stats/StatsSimpleInCardSpiritualPractices.tsx',
  
  // Testimonials components
  'TestimonialsOffWhiteGrid': 'components/testimonials/TestimonialsOffWhiteGrid.tsx',
  'TestimonialsOffWhiteGridHome': 'components/testimonials/TestimonialsOffWhiteGridHome.tsx',
  'TestimonialsOffWhiteGridAbout': 'components/testimonials/TestimonialsOffWhiteGridAbout.tsx',
  'TestimonialsOffWhiteGridResources': 'components/testimonials/TestimonialsOffWhiteGridResources.tsx',
  'TestimonialsOffWhiteGridMarriage': 'components/testimonials/TestimonialsOffWhiteGridMarriage.tsx',
  'TestimonialsOffWhiteGridPriesthood': 'components/testimonials/TestimonialsOffWhiteGridPriesthood.tsx',
  'TestimonialsOffWhiteGridReligiousLife': 'components/testimonials/TestimonialsOffWhiteGridReligiousLife.tsx',
  'TestimonialsOffWhiteGridSingleLife': 'components/testimonials/TestimonialsOffWhiteGridSingleLife.tsx',
  'TestimonialsOffWhiteGridHome_hssl': 'components/testimonials/TestimonialsOffWhiteGridHome_hssl.tsx',
  'TestimonialsOffWhiteGridHome_cc36': 'components/testimonials/TestimonialsOffWhiteGridHome_cc36.tsx',
  
  // Contact components
  'ContactSplitWithMapContact': 'components/contact/ContactSplitWithMapContact.tsx',
  'ContactSplitWithMapHome_pclx': 'components/contact/ContactSplitWithMapHome_pclx.tsx',
  
  // Header & Footer
  'LeftAlignedNavHeader': 'components/header/LeftAlignedNavHeader.tsx',
  'ThreeColumnFooter': 'components/footer/ThreeColumnFooter.tsx',
};

export function getComponentPath(componentType: string): string {
  return componentPaths[componentType] || `components/${componentType}.tsx`;
}

export function getViewPath(viewName: string): string {
  return `views/${viewName}View.tsx`;
}

export function addComponentToRegistry(componentId: string, componentPath: string): void {
  componentPaths[componentId] = componentPath;
}

export function isComponentInRegistry(componentId: string): boolean {
  return componentId in componentPaths;
}

// Function to get the current component paths for persistence
export function getComponentPaths(): Record<string, string> {
  return { ...componentPaths };
}