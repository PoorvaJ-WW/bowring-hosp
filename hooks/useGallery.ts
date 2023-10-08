// hooks/useGallery.ts
// Client-side hook for fetching gallery data via API

import { useState, useEffect } from 'react';
import type { GalleryImage } from '@/types/gallery';

interface UseGalleryOptions {
  categories?: string[];
  limit?: number;
  orderField?: string;
}

interface UseGalleryResult {
  images: GalleryImage[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch gallery images and categories via API
 */
export function useGallery(options: UseGalleryOptions = {}): UseGalleryResult {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.categories) params.append('categories', options.categories.join(','));
      if (options.orderField) params.append('orderField', options.orderField);

      // Fetch images and categories in parallel
      const [imagesResponse, categoriesResponse] = await Promise.all([
        fetch(`/api/gallery?${params.toString()}`),
        fetch('/api/gallery?action=categories')
      ]);

      if (!imagesResponse.ok || !categoriesResponse.ok) {
        throw new Error('Failed to fetch gallery data');
      }

      const imagesData = await imagesResponse.json();
      const categoriesData = await categoriesResponse.json();

      setImages(imagesData.images || []);
      setCategories(categoriesData.categories || []);
    } catch (err) {
      console.error('Error fetching gallery data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [options.categories?.join(','), options.limit, options.orderField]);

  return {
    images,
    categories,
    loading,
    error,
    refetch: fetchData
  };
}

/**
 * Hook to fetch gallery images for specific categories
 */
export function useGalleryByCategories(categories?: string[], limit?: number) {
  return useGallery({
    categories,
    limit
  });
}

/**
 * Hook to fetch gallery categories with counts
 */
export function useGalleryCategoriesWithCounts() {
  const [categories, setCategories] = useState<Array<{ name: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery?action=categoriesWithCounts');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}