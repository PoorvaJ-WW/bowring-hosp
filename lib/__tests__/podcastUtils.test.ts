import { describe, it, expect } from 'vitest'
import {
  generatePodcastSlug,
  formatDuration,
  formatFileSize
} from '../podcastUtils'

describe('generatePodcastSlug', () => {
  it('converts title to lowercase with hyphens', () => {
    expect(generatePodcastSlug('My Podcast Episode')).toBe('my-podcast-episode')
  })

  it('removes special characters', () => {
    expect(generatePodcastSlug('Episode #1: Amazing!')).toBe('episode-1-amazing')
  })

  it('handles multiple spaces', () => {
    expect(generatePodcastSlug('my   podcast   title')).toBe('my-podcast-title')
  })

  it('handles multiple hyphens', () => {
    expect(generatePodcastSlug('my---podcast---title')).toBe('my-podcast-title')
  })

  it('preserves numbers', () => {
    expect(generatePodcastSlug('Episode 42')).toBe('episode-42')
  })

  it('handles complex titles', () => {
    expect(generatePodcastSlug("What's New in Tech 2024?")).toBe('whats-new-in-tech-2024')
  })
})

describe('formatDuration', () => {
  it('returns 00:00 for NaN', () => {
    expect(formatDuration('invalid')).toBe('00:00')
  })

  it('formats seconds under a minute', () => {
    expect(formatDuration(45)).toBe('0:45')
    expect(formatDuration('30')).toBe('0:30')
  })

  it('formats seconds under an hour', () => {
    expect(formatDuration(125)).toBe('2:05')
    expect(formatDuration('305')).toBe('5:05')
  })

  it('formats seconds over an hour', () => {
    expect(formatDuration(3665)).toBe('1:01:05')
    expect(formatDuration('7320')).toBe('2:02:00')
  })

  it('pads minutes and seconds with zeros', () => {
    expect(formatDuration(62)).toBe('1:02')
    expect(formatDuration(3602)).toBe('1:00:02')
  })

  it('handles string input', () => {
    expect(formatDuration('120')).toBe('2:00')
  })
})

describe('formatFileSize', () => {
  it('returns 0 B for zero', () => {
    expect(formatFileSize(0)).toBe('0 B')
  })

  it('returns 0 B for NaN', () => {
    expect(formatFileSize('invalid')).toBe('0 B')
  })

  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500.00 B')
  })

  it('formats kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB')
    expect(formatFileSize(2560)).toBe('2.50 KB')
  })

  it('formats megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1.00 MB')
    expect(formatFileSize(5242880)).toBe('5.00 MB')
  })

  it('formats gigabytes', () => {
    expect(formatFileSize(1073741824)).toBe('1.00 GB')
  })

  it('handles string input', () => {
    expect(formatFileSize('1024')).toBe('1.00 KB')
  })
})
