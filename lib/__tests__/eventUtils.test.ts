import { describe, it, expect } from 'vitest'
import {
  formatEventDate,
  formatEventTime,
  generateEventSlug
} from '../eventUtils'

describe('formatEventDate', () => {
  it('returns empty string for empty input', () => {
    expect(formatEventDate('')).toBe('')
  })

  it('formats a valid date string', () => {
    const result = formatEventDate('2024-01-15')
    expect(result).toContain('January')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats ISO date string', () => {
    const result = formatEventDate('2024-06-20T10:30:00Z')
    expect(result).toContain('June')
    expect(result).toContain('20')
    expect(result).toContain('2024')
  })

  it('handles different months correctly', () => {
    expect(formatEventDate('2024-03-01')).toContain('March')
    expect(formatEventDate('2024-12-25')).toContain('December')
  })
})

describe('formatEventTime', () => {
  it('returns empty string for empty input', () => {
    expect(formatEventTime('')).toBe('')
  })

  it('formats morning time correctly', () => {
    expect(formatEventTime('09:30')).toBe('9:30 AM')
    expect(formatEventTime('10:00')).toBe('10:00 AM')
  })

  it('formats afternoon time correctly', () => {
    expect(formatEventTime('13:30')).toBe('1:30 PM')
    expect(formatEventTime('15:45')).toBe('3:45 PM')
  })

  it('handles noon correctly', () => {
    expect(formatEventTime('12:00')).toBe('12:00 PM')
  })

  it('handles midnight correctly', () => {
    expect(formatEventTime('00:00')).toBe('12:00 AM')
  })

  it('formats evening time correctly', () => {
    expect(formatEventTime('18:30')).toBe('6:30 PM')
    expect(formatEventTime('23:59')).toBe('11:59 PM')
  })
})

describe('generateEventSlug', () => {
  it('converts name to lowercase with hyphens', () => {
    expect(generateEventSlug('Summer Festival')).toBe('summer-festival')
  })

  it('removes special characters', () => {
    expect(generateEventSlug('Event #1: Amazing!')).toBe('event-1-amazing')
  })

  it('handles multiple spaces', () => {
    expect(generateEventSlug('my   event   name')).toBe('my-event-name')
  })

  it('handles multiple hyphens', () => {
    expect(generateEventSlug('my---event---name')).toBe('my-event-name')
  })

  it('preserves numbers', () => {
    expect(generateEventSlug('Event 2024')).toBe('event-2024')
  })

  it('handles complex names', () => {
    expect(generateEventSlug("New Year's Eve Party 2024!")).toBe('new-years-eve-party-2024')
  })
})
