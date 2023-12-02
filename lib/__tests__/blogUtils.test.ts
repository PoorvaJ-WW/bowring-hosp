import { describe, it, expect } from 'vitest'
import { formatDate, generateExcerpt, generateBlogSlug } from '../blogUtils'

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
})

describe('generateBlogSlug', () => {
  it('converts title to lowercase', () => {
    expect(generateBlogSlug('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with hyphens', () => {
    expect(generateBlogSlug('my blog post')).toBe('my-blog-post')
  })

  it('removes special characters', () => {
    expect(generateBlogSlug('Hello! World?')).toBe('hello-world')
  })

  it('handles multiple spaces', () => {
    expect(generateBlogSlug('hello   world')).toBe('hello-world')
  })

  it('handles multiple hyphens', () => {
    expect(generateBlogSlug('hello---world')).toBe('hello-world')
  })

  it('handles complex titles', () => {
    expect(generateBlogSlug("What's New in 2024?")).toBe('whats-new-in-2024')
  })

  it('preserves numbers', () => {
    expect(generateBlogSlug('Top 10 Tips')).toBe('top-10-tips')
  })
})
