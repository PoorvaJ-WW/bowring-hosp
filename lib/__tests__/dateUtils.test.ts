import { describe, it, expect } from 'vitest'
import {
  toISODateString,
  startOfDay,
  endOfDay,
  addDays,
  isBetween,
  diffInDays,
  isToday,
  isPast,
  isFuture,
  getMonthName,
  getDayOfWeek
} from '../dateUtils'

describe('toISODateString', () => {
  it('converts Date to ISO string', () => {
    expect(toISODateString(new Date('2024-01-15'))).toBe('2024-01-15')
  })

  it('handles string input', () => {
    expect(toISODateString('2024-06-20T10:30:00Z')).toBe('2024-06-20')
  })
})

describe('startOfDay', () => {
  it('sets time to start of day', () => {
    const result = startOfDay('2024-01-15T14:30:00')
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
  })

  it('handles Date object', () => {
    const date = new Date('2024-01-15T14:30:00')
    const result = startOfDay(date)
    expect(result.getHours()).toBe(0)
  })
})

describe('endOfDay', () => {
  it('sets time to end of day', () => {
    const result = endOfDay('2024-01-15T14:30:00')
    expect(result.getHours()).toBe(23)
    expect(result.getMinutes()).toBe(59)
    expect(result.getSeconds()).toBe(59)
  })
})

describe('addDays', () => {
  it('adds positive days', () => {
    const result = addDays('2024-01-15', 5)
    expect(result.getDate()).toBe(20)
  })

  it('subtracts negative days', () => {
    const result = addDays('2024-01-15', -5)
    expect(result.getDate()).toBe(10)
  })

  it('handles month overflow', () => {
    const result = addDays('2024-01-30', 5)
    expect(result.getMonth()).toBe(1) // February
  })
})

describe('isBetween', () => {
  it('returns true when date is between', () => {
    expect(isBetween('2024-01-15', '2024-01-01', '2024-01-31')).toBe(true)
  })

  it('returns false when date is before', () => {
    expect(isBetween('2023-12-15', '2024-01-01', '2024-01-31')).toBe(false)
  })

  it('returns false when date is after', () => {
    expect(isBetween('2024-02-15', '2024-01-01', '2024-01-31')).toBe(false)
  })

  it('includes boundaries', () => {
    expect(isBetween('2024-01-01', '2024-01-01', '2024-01-31')).toBe(true)
    expect(isBetween('2024-01-31', '2024-01-01', '2024-01-31')).toBe(true)
  })
})

describe('diffInDays', () => {
  it('calculates difference', () => {
    expect(diffInDays('2024-01-01', '2024-01-15')).toBe(14)
  })

  it('returns absolute difference', () => {
    expect(diffInDays('2024-01-15', '2024-01-01')).toBe(14)
  })

  it('returns 0 for same day', () => {
    expect(diffInDays('2024-01-15', '2024-01-15')).toBe(0)
  })
})

describe('isToday', () => {
  it('returns true for today', () => {
    expect(isToday(new Date())).toBe(true)
  })

  it('returns false for yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isToday(yesterday)).toBe(false)
  })
})

describe('isPast', () => {
  it('returns true for past date', () => {
    expect(isPast('2020-01-01')).toBe(true)
  })

  it('returns false for future date', () => {
    expect(isPast('2030-01-01')).toBe(false)
  })
})

describe('isFuture', () => {
  it('returns true for future date', () => {
    expect(isFuture('2030-01-01')).toBe(true)
  })

  it('returns false for past date', () => {
    expect(isFuture('2020-01-01')).toBe(false)
  })
})

describe('getMonthName', () => {
  it('returns full month name', () => {
    expect(getMonthName('2024-01-15')).toBe('January')
    expect(getMonthName('2024-06-15')).toBe('June')
  })

  it('returns short month name', () => {
    expect(getMonthName('2024-01-15', 'short')).toBe('Jan')
  })
})

describe('getDayOfWeek', () => {
  it('returns full day name', () => {
    expect(getDayOfWeek('2024-01-15')).toBe('Monday')
  })

  it('returns short day name', () => {
    expect(getDayOfWeek('2024-01-15', 'short')).toBe('Mon')
  })
})
