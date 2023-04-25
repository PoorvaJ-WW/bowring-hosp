import { describe, it, expect } from 'vitest'
import {
  determineAspectRatio,
  determineColSpan,
  formatDate,
  generateGallerySlug,
  filterByCategories,
  sortGalleryImages,
  searchGalleryImages
} from '../galleryUtils'

describe('determineAspectRatio', () => {
  it('returns wide for index 1, 6, 11, etc', () => {
    expect(determineAspectRatio(1)).toBe('wide')
    expect(determineAspectRatio(6)).toBe('wide')
    expect(determineAspectRatio(11)).toBe('wide')
  })

  it('returns square for other indices', () => {
    expect(determineAspectRatio(0)).toBe('square')
    expect(determineAspectRatio(2)).toBe('square')
    expect(determineAspectRatio(3)).toBe('square')
    expect(determineAspectRatio(4)).toBe('square')
    expect(determineAspectRatio(5)).toBe('square')
  })
})

describe('determineColSpan', () => {
  it('returns 2 for index 1, 6, 11, etc', () => {
    expect(determineColSpan(1)).toBe(2)
    expect(determineColSpan(6)).toBe(2)
    expect(determineColSpan(11)).toBe(2)
  })

  it('returns undefined for other indices', () => {
    expect(determineColSpan(0)).toBeUndefined()
    expect(determineColSpan(2)).toBeUndefined()
    expect(determineColSpan(3)).toBeUndefined()
  })
})

describe('formatDate', () => {
  it('formats a valid date string', () => {
    const result = formatDate('2024-01-15')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats ISO date string', () => {
    const result = formatDate('2024-06-20T10:30:00Z')
    expect(result).toContain('June')
    expect(result).toContain('20')
    expect(result).toContain('2024')
  })
})

describe('generateGallerySlug', () => {
  it('converts title to lowercase with hyphens', () => {
    expect(generateGallerySlug('Beautiful Sunset')).toBe('beautiful-sunset')
  })

  it('removes special characters', () => {
    expect(generateGallerySlug('Photo #1: Amazing!')).toBe('photo-1-amazing')
  })

  it('handles multiple spaces and hyphens', () => {
    expect(generateGallerySlug('my   gallery---image')).toBe('my-gallery-image')
  })
})

describe('filterByCategories', () => {
  const mockImages = [
    { id: '1', title: 'Nature', categories: ['nature', 'outdoor'] },
    { id: '2', title: 'City', categories: ['urban', 'architecture'] },
    { id: '3', title: 'Beach', categories: ['nature', 'water'] },
    { id: '4', title: 'Portrait', categories: ['people'] },
  ]

  it('returns all images when categories is empty', () => {
    expect(filterByCategories(mockImages, [])).toEqual(mockImages)
  })

  it('filters images by single category', () => {
    const result = filterByCategories(mockImages, ['nature'])
    expect(result).toHaveLength(2)
    expect(result.map(i => i.id)).toContain('1')
    expect(result.map(i => i.id)).toContain('3')
  })

  it('filters images by multiple categories', () => {
    const result = filterByCategories(mockImages, ['urban', 'people'])
    expect(result).toHaveLength(2)
    expect(result.map(i => i.id)).toContain('2')
    expect(result.map(i => i.id)).toContain('4')
  })

  it('returns empty array when no matches', () => {
    const result = filterByCategories(mockImages, ['nonexistent'])
    expect(result).toHaveLength(0)
  })
})

describe('sortGalleryImages', () => {
  const mockImages = [
    { id: '1', title: 'Zebra', createdAt: '2024-01-15' },
    { id: '2', title: 'Apple', createdAt: '2024-03-20' },
    { id: '3', title: 'Mountain', createdAt: '2024-02-10' },
  ]

  it('sorts by newest first (default)', () => {
    const result = sortGalleryImages(mockImages, 'newest')
    expect(result[0].id).toBe('2') // March
    expect(result[1].id).toBe('3') // February
    expect(result[2].id).toBe('1') // January
  })

  it('sorts by oldest first', () => {
    const result = sortGalleryImages(mockImages, 'oldest')
    expect(result[0].id).toBe('1') // January
    expect(result[1].id).toBe('3') // February
    expect(result[2].id).toBe('2') // March
  })

  it('sorts alphabetically by title', () => {
    const result = sortGalleryImages(mockImages, 'alphabetical')
    expect(result[0].title).toBe('Apple')
    expect(result[1].title).toBe('Mountain')
    expect(result[2].title).toBe('Zebra')
  })

  it('does not mutate original array', () => {
    const original = [...mockImages]
    sortGalleryImages(mockImages, 'newest')
    expect(mockImages).toEqual(original)
  })
})

describe('searchGalleryImages', () => {
  const mockImages = [
    { id: '1', title: 'Beautiful Sunset', description: 'A sunset over the ocean', tags: ['nature'] },
    { id: '2', title: 'City Lights', description: 'Night cityscape', tags: ['urban', 'night'] },
    { id: '3', title: 'Mountain View', caption: 'Majestic peaks', categories: ['landscape'] },
  ]

  it('returns all images when search term is empty', () => {
    expect(searchGalleryImages(mockImages, '')).toEqual(mockImages)
  })

  it('searches in title', () => {
    const result = searchGalleryImages(mockImages, 'sunset')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('searches in description', () => {
    const result = searchGalleryImages(mockImages, 'ocean')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('searches in tags', () => {
    const result = searchGalleryImages(mockImages, 'urban')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('searches in categories', () => {
    const result = searchGalleryImages(mockImages, 'landscape')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('is case insensitive', () => {
    const result = searchGalleryImages(mockImages, 'SUNSET')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('returns empty array when no matches', () => {
    const result = searchGalleryImages(mockImages, 'nonexistent')
    expect(result).toHaveLength(0)
  })
})
