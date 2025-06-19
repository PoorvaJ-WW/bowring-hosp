import { describe, it, expect } from 'vitest'
import {
  formatDate,
  generateExcerpt,
  generatePostSlug,
  getPostCategories,
  filterPostsByCategory
} from '../postUtils'

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

  it('handles different months correctly', () => {
    expect(formatDate('2024-03-01')).toContain('March')
    expect(formatDate('2024-12-25')).toContain('December')
    expect(formatDate('2024-07-04')).toContain('July')
  })
})

describe('generateExcerpt', () => {
  it('returns full text if shorter than maxLength', () => {
    const shortText = 'This is a short text.'
    expect(generateExcerpt(shortText, 150)).toBe(shortText)
  })

  it('truncates long text with ellipsis', () => {
    const longText = 'This is a very long text that should be truncated because it exceeds the maximum length allowed for excerpts in the blog system.'
    const result = generateExcerpt(longText, 50)
    expect(result.length).toBeLessThanOrEqual(53) // 50 + '...'
    expect(result).toContain('...')
  })

  it('removes HTML tags from content', () => {
    const htmlContent = '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>'
    const result = generateExcerpt(htmlContent, 150)
    expect(result).not.toContain('<')
    expect(result).not.toContain('>')
    expect(result).toContain('bold')
    expect(result).toContain('italic')
  })

  it('uses default maxLength of 150', () => {
    const longText = 'A'.repeat(200)
    const result = generateExcerpt(longText)
    expect(result.length).toBeLessThanOrEqual(153)
  })

  it('truncates at word boundary', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = generateExcerpt(text, 15)
    expect(result).toContain('...')
    expect(result).toBe('The quick...')
  })
})

describe('generatePostSlug', () => {
  it('converts title to lowercase', () => {
    expect(generatePostSlug('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(generatePostSlug('my blog post')).toBe('my-blog-post')
  })

  it('removes special characters', () => {
    expect(generatePostSlug('Hello! World?')).toBe('hello-world')
  })

  it('handles multiple spaces', () => {
    expect(generatePostSlug('hello   world')).toBe('hello-world')
  })

  it('handles multiple hyphens', () => {
    expect(generatePostSlug('hello---world')).toBe('hello-world')
  })

  it('handles complex titles', () => {
    expect(generatePostSlug("What's New in 2024?")).toBe('whats-new-in-2024')
  })

  it('preserves numbers', () => {
    expect(generatePostSlug('Top 10 Tips')).toBe('top-10-tips')
  })

  it('handles apostrophes', () => {
    expect(generatePostSlug("John's Blog Post")).toBe('johns-blog-post')
  })
})

describe('getPostCategories', () => {
  const mockPosts = [
    { id: '1', title: 'Post 1', categories: ['tech', 'news'] },
    { id: '2', title: 'Post 2', categories: ['health', 'tech'] },
    { id: '3', title: 'Post 3', categories: ['sports'] },
    { id: '4', title: 'Post 4' },
  ]

  it('returns unique categories sorted alphabetically', () => {
    const result = getPostCategories(mockPosts)
    expect(result).toEqual(['health', 'news', 'sports', 'tech'])
  })

  it('returns empty array for posts without categories', () => {
    const result = getPostCategories([{ id: '1' }, { id: '2' }])
    expect(result).toEqual([])
  })
})

describe('filterPostsByCategory', () => {
  const mockPosts = [
    { id: '1', title: 'Tech Post', categories: ['tech', 'news'] },
    { id: '2', title: 'Health Post', categories: ['health'] },
    { id: '3', title: 'Sports Post', categories: ['sports'] },
  ]

  it('returns all posts when category is empty', () => {
    expect(filterPostsByCategory(mockPosts, '')).toEqual(mockPosts)
  })

  it('filters posts by category', () => {
    const result = filterPostsByCategory(mockPosts, 'tech')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('returns empty array when no matches', () => {
    const result = filterPostsByCategory(mockPosts, 'nonexistent')
    expect(result).toHaveLength(0)
  })
})
