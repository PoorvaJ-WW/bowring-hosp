import { ServicesAndFacilitiesView } from '@/views/index';
import { generateMetadata as getPageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

// Dynamic metadata generation from _metadata.json
export async function generateMetadata(): Promise<Metadata> {
  return await getPageMetadata('/services-and-facilities');
}

// Server Component (async to force dynamic rendering)
export default async function Page() {
  return <ServicesAndFacilitiesView />;
}