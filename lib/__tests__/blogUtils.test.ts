import { describe, it, expect } from 'vitest'
import { formatDate, generateExcerpt, generateBlogSlug, calculateBlogReadingTime, isRecentPost, extractHashtags, getWordCount, getRelativeTime } from '../blogUtils'

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

describe('calculateBlogReadingTime', () => {
  it('returns 0 min read for empty content', () => {
    const result = calculateBlogReadingTime('')
    expect(result.minutes).toBe(0)
    expect(result.text).toBe('0 min read')
  })

  it('returns 1 min read for short content', () => {
    const result = calculateBlogReadingTime('This is a short blog post.')
    expect(result.minutes).toBe(1)
    expect(result.text).toBe('1 min read')
  })

  it('calculates correct reading time for longer content', () => {
    // 400 words should be 2 minutes
    const words = Array(400).fill('word').join(' ')
    const result = calculateBlogReadingTime(words)
    expect(result.minutes).toBe(2)
    expect(result.text).toBe('2 min read')
  })

  it('removes HTML tags before counting', () => {
    const htmlContent = '<p>' + Array(200).fill('word').join(' ') + '</p>'
    const result = calculateBlogReadingTime(htmlContent)
    expect(result.minutes).toBe(1)
  })

  it('handles content with multiple HTML tags', () => {
    const content = '<h1>Title</h1><p>Some <strong>bold</strong> text here.</p>'
    const result = calculateBlogReadingTime(content)
    expect(result.minutes).toBe(1)
    expect(result.text).toBe('1 min read')
  })

  it('rounds up reading time', () => {
    // 250 words = 1.25 minutes, should round to 2
    const words = Array(250).fill('word').join(' ')
    const result = calculateBlogReadingTime(words)
    expect(result.minutes).toBe(2)
  })
})

describe('isRecentPost', () => {
  it('returns false for empty date', () => {
    expect(isRecentPost('')).toBe(false)
  })

  it('returns true for today', () => {
    const today = new Date().toISOString()
    expect(isRecentPost(today)).toBe(true)
  })

  it('returns true for post within threshold', () => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    expect(isRecentPost(threeDaysAgo.toISOString(), 7)).toBe(true)
  })

  it('returns false for post older than threshold', () => {
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)
    expect(isRecentPost(tenDaysAgo.toISOString(), 7)).toBe(false)
  })

  it('returns false for future dates', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    expect(isRecentPost(tomorrow.toISOString())).toBe(false)
  })
})

describe('extractHashtags', () => {
  it('returns empty array for empty content', () => {
    expect(extractHashtags('')).toEqual([])
  })

  it('extracts hashtags from content', () => {
    expect(extractHashtags('Check out #react and #javascript')).toEqual(['#react', '#javascript'])
  })

  it('returns unique hashtags', () => {
    expect(extractHashtags('#react #React #REACT')).toEqual(['#react'])
  })

  it('handles underscores in hashtags', () => {
    expect(extractHashtags('#my_tag')).toEqual(['#my_tag'])
  })
})

describe('getWordCount', () => {
  it('returns 0 for empty content', () => {
    expect(getWordCount('')).toBe(0)
  })

  it('counts words correctly', () => {
    expect(getWordCount('Hello world')).toBe(2)
  })

  it('strips HTML before counting', () => {
    expect(getWordCount('<p>Hello</p> <span>world</span>')).toBe(2)
  })

  it('handles multiple spaces', () => {
    expect(getWordCount('hello    world')).toBe(2)
  })
})

describe('getRelativeTime', () => {
  it('returns empty string for empty input', () => {
    expect(getRelativeTime('')).toBe('')
  })

  it('returns Just now for recent dates', () => {
    const now = new Date().toISOString()
    expect(getRelativeTime(now)).toBe('Just now')
  })

  it('returns days ago', () => {
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    expect(getRelativeTime(twoDaysAgo.toISOString())).toBe('2 days ago')
  })

  it('returns singular for 1 day', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(getRelativeTime(yesterday.toISOString())).toBe('1 day ago')
  })
})
