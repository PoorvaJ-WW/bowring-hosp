import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDuration,
  formatDurationHuman,
  generateVideoSlug,
  getVideoSlug,
  extractVideoId,
  getVideoPlatform,
  getVideoThumbnail,
  formatViewCount,
  calculateReadingTime,
  truncateText,
  sortVideos,
  filterVideos,
  groupVideosByCategory
} from '../videoUtils'

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

describe('formatDuration', () => {
  it('returns empty string for undefined', () => {
    expect(formatDuration()).toBe('')
  })

  it('formats seconds under an hour', () => {
    expect(formatDuration('125')).toBe('2:05')
    expect(formatDuration('65')).toBe('1:05')
  })

  it('formats seconds over an hour', () => {
    expect(formatDuration('3665')).toBe('1:01:05')
  })

  it('returns already formatted duration as-is', () => {
    expect(formatDuration('10:30')).toBe('10:30')
  })

  it('handles single digit seconds', () => {
    expect(formatDuration('62')).toBe('1:02')
  })
})

describe('generateVideoSlug', () => {
  it('returns empty string for undefined', () => {
    expect(generateVideoSlug()).toBe('')
  })

  it('converts title to lowercase with hyphens', () => {
    expect(generateVideoSlug('My Video Title')).toBe('my-video-title')
  })

  it('removes special characters', () => {
    expect(generateVideoSlug('Video #1: Amazing!')).toBe('video-1-amazing')
  })

  it('removes leading and trailing hyphens', () => {
    expect(generateVideoSlug('---Hello World---')).toBe('hello-world')
  })
})

describe('getVideoSlug', () => {
  it('returns existing slug if available', () => {
    const video = { id: '123', slug: 'my-slug', title: 'My Title' }
    expect(getVideoSlug(video)).toBe('my-slug')
  })

  it('generates slug from title if no slug', () => {
    const video = { id: '123', title: 'My Video Title' }
    expect(getVideoSlug(video)).toBe('my-video-title')
  })

  it('uses headline as fallback', () => {
    const video = { id: '123', headline: 'My Headline' }
    expect(getVideoSlug(video)).toBe('my-headline')
  })

  it('falls back to ID if no title or headline', () => {
    const video = { id: '123' }
    expect(getVideoSlug(video)).toBe('123')
  })
})

describe('extractVideoId', () => {
  it('returns null for empty string', () => {
    expect(extractVideoId('')).toBeNull()
  })

  it('extracts YouTube video ID from standard URL', () => {
    expect(extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('extracts YouTube video ID from short URL', () => {
    expect(extractVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('extracts YouTube video ID from embed URL', () => {
    expect(extractVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('extracts Vimeo video ID', () => {
    expect(extractVideoId('https://vimeo.com/123456789')).toBe('123456789')
  })

  it('returns null for unknown URL', () => {
    expect(extractVideoId('https://example.com/video')).toBeNull()
  })
})

describe('getVideoPlatform', () => {
  it('returns unknown for empty string', () => {
    expect(getVideoPlatform('')).toBe('unknown')
  })

  it('identifies YouTube URLs', () => {
    expect(getVideoPlatform('https://www.youtube.com/watch?v=123')).toBe('youtube')
    expect(getVideoPlatform('https://youtu.be/123')).toBe('youtube')
  })

  it('identifies Vimeo URLs', () => {
    expect(getVideoPlatform('https://vimeo.com/123456789')).toBe('vimeo')
  })

  it('returns unknown for other URLs', () => {
    expect(getVideoPlatform('https://example.com/video')).toBe('unknown')
  })
})

describe('getVideoThumbnail', () => {
  it('returns existing thumbnail if provided', () => {
    expect(getVideoThumbnail('123', 'https://youtube.com', 'existing.jpg')).toBe('existing.jpg')
  })

  it('returns YouTube thumbnail URL', () => {
    const result = getVideoThumbnail('dQw4w9WgXcQ', 'https://youtube.com/watch?v=dQw4w9WgXcQ')
    expect(result).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')
  })

  it('returns placeholder for Vimeo', () => {
    const result = getVideoThumbnail('123456', 'https://vimeo.com/123456')
    expect(result).toBe('/images/video-placeholder.jpg')
  })

  it('returns placeholder when no video ID', () => {
    expect(getVideoThumbnail()).toBe('/images/video-placeholder.jpg')
  })
})

describe('formatViewCount', () => {
  it('formats views under 1000', () => {
    expect(formatViewCount(500)).toBe('500')
    expect(formatViewCount(999)).toBe('999')
  })

  it('formats views in thousands', () => {
    expect(formatViewCount(1000)).toBe('1.0K')
    expect(formatViewCount(5500)).toBe('5.5K')
  })

  it('formats views in millions', () => {
    expect(formatViewCount(1000000)).toBe('1.0M')
    expect(formatViewCount(2500000)).toBe('2.5M')
  })
})

describe('calculateReadingTime', () => {
  it('returns 0 for undefined text', () => {
    expect(calculateReadingTime()).toBe(0)
  })

  it('calculates reading time for text', () => {
    const text = 'word '.repeat(200) // 200 words = 1 minute
    expect(calculateReadingTime(text)).toBe(1)
  })

  it('rounds up to nearest minute', () => {
    const text = 'word '.repeat(250) // 250 words = 1.25 minutes -> 2
    expect(calculateReadingTime(text)).toBe(2)
  })
})

describe('truncateText', () => {
  it('returns full text if shorter than maxLength', () => {
    expect(truncateText('Short text', 150)).toBe('Short text')
  })

  it('truncates at last space before maxLength', () => {
    const text = 'This is a very long text that needs to be truncated'
    const result = truncateText(text, 20)
    expect(result.length).toBeLessThanOrEqual(23)
    expect(result).toContain('...')
  })

  it('uses default maxLength of 150', () => {
    const longText = 'word '.repeat(50)
    const result = truncateText(longText)
    expect(result.length).toBeLessThanOrEqual(153)
  })
})

describe('sortVideos', () => {
  const mockVideos = [
    { title: 'Zebra', publishedAt: '2024-01-15', views: 100 },
    { title: 'Apple', publishedAt: '2024-03-20', views: 500 },
    { title: 'Mountain', publishedAt: '2024-02-10', views: 250 },
  ]

  it('sorts by newest first (default)', () => {
    const result = sortVideos(mockVideos, 'newest')
    expect(result[0].title).toBe('Apple')
  })

  it('sorts by oldest first', () => {
    const result = sortVideos(mockVideos, 'oldest')
    expect(result[0].title).toBe('Zebra')
  })

  it('sorts alphabetically', () => {
    const result = sortVideos(mockVideos, 'alphabetical')
    expect(result[0].title).toBe('Apple')
    expect(result[1].title).toBe('Mountain')
    expect(result[2].title).toBe('Zebra')
  })

  it('sorts by popularity', () => {
    const result = sortVideos(mockVideos, 'popular')
    expect(result[0].title).toBe('Apple') // 500 views
    expect(result[2].title).toBe('Zebra') // 100 views
  })

  it('does not mutate original array', () => {
    const original = [...mockVideos]
    sortVideos(mockVideos, 'newest')
    expect(mockVideos).toEqual(original)
  })
})

describe('filterVideos', () => {
  const mockVideos = [
    { title: 'Learn React', description: 'React tutorial', categories: ['tech'], tags: ['react'] },
    { title: 'Cooking Tips', description: 'Kitchen hacks', categories: ['food'], tags: ['cooking'] },
    { title: 'Travel Vlog', description: 'Trip to Paris', categories: ['travel'], tags: ['europe'] },
  ]

  it('returns all videos when search term is empty', () => {
    expect(filterVideos(mockVideos, '')).toEqual(mockVideos)
  })

  it('searches in title', () => {
    const result = filterVideos(mockVideos, 'react')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Learn React')
  })

  it('searches in description', () => {
    const result = filterVideos(mockVideos, 'paris')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Travel Vlog')
  })

  it('searches in categories', () => {
    const result = filterVideos(mockVideos, 'food')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Cooking Tips')
  })

  it('searches in tags', () => {
    const result = filterVideos(mockVideos, 'europe')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Travel Vlog')
  })

  it('is case insensitive', () => {
    const result = filterVideos(mockVideos, 'REACT')
    expect(result).toHaveLength(1)
  })
})

describe('groupVideosByCategory', () => {
  const mockVideos = [
    { title: 'Video 1', categories: ['tech', 'tutorial'] },
    { title: 'Video 2', categories: ['tech'] },
    { title: 'Video 3', category: 'food' },
    { title: 'Video 4' },
  ]

  it('groups videos by categories', () => {
    const result = groupVideosByCategory(mockVideos)
    expect(result.get('tech')).toHaveLength(2)
    expect(result.get('tutorial')).toHaveLength(1)
  })

  it('uses category field as fallback', () => {
    const result = groupVideosByCategory(mockVideos)
    expect(result.get('food')).toHaveLength(1)
  })

  it('adds uncategorized videos to Uncategorized', () => {
    const result = groupVideosByCategory(mockVideos)
    expect(result.get('Uncategorized')).toHaveLength(1)
  })
})

describe('formatDurationHuman', () => {
  it('returns empty string for undefined', () => {
    expect(formatDurationHuman()).toBe('')
  })

  it('formats seconds only', () => {
    expect(formatDurationHuman('45')).toBe('45s')
  })

  it('formats minutes and seconds', () => {
    expect(formatDurationHuman('125')).toBe('2m 5s')
  })

  it('formats minutes without seconds', () => {
    expect(formatDurationHuman('120')).toBe('2m')
  })

  it('formats hours and minutes', () => {
    expect(formatDurationHuman('3720')).toBe('1h 2m')
  })

  it('formats hours without minutes', () => {
    expect(formatDurationHuman('3600')).toBe('1h')
  })

  it('parses MM:SS format', () => {
    expect(formatDurationHuman('10:30')).toBe('10m 30s')
  })

  it('parses HH:MM:SS format', () => {
    expect(formatDurationHuman('1:30:00')).toBe('1h 30m')
  })

  it('returns original string for unknown format', () => {
    expect(formatDurationHuman('invalid')).toBe('invalid')
  })
})
