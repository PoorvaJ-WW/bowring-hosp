import { HistoryAndHeritageView } from '@/views/index';
import { generateMetadata as getPageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { getGalleryImages } from '@/lib/gallery';
import { transformToGalleryItems } from '@/lib/galleryUtils';

// Dynamic metadata generation from _metadata.json
export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata('/history-and-heritage');
}

// Server Component - fetches data before rendering
// NO 'use client' directive - this runs on the server!
export default async function Page() {
  // Pre-fetch gallery images on the server
  const rawGalleryImages = await getGalleryImages(100);
  const galleryImages = transformToGalleryItems(rawGalleryImages);

  // Pass server-fetched data to the view
  // The view will receive data instantly - no loading spinners!
  return <HistoryAndHeritageView galleryImages={galleryImages} />;
}