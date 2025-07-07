import { describe, it, expect } from 'vitest'
import {
  clamp,
  roundTo,
  formatNumber,
  formatCurrency,
  percentage,
  inRange,
  randomInt,
  formatBytes,
  isEven,
  isOdd,
  ordinal,
  parseNumber
} from '../numberUtils'

describe('clamp', () => {
  it('clamps value to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('clamps value to max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns value when in range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
})

describe('roundTo', () => {
  it('rounds to 2 decimal places by default', () => {
    expect(roundTo(3.14159)).toBe(3.14)
  })

  it('rounds to specified decimals', () => {
    expect(roundTo(3.14159, 3)).toBe(3.142)
  })

  it('rounds to 0 decimals', () => {
    expect(roundTo(3.14159, 0)).toBe(3)
  })
})

describe('formatNumber', () => {
  it('formats with commas', () => {
    expect(formatNumber(1000000)).toBe('1,000,000')
  })

  it('handles small numbers', () => {
    expect(formatNumber(100)).toBe('100')
  })
})

describe('formatCurrency', () => {
  it('formats as USD', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats with specified currency', () => {
    expect(formatCurrency(1234.56, 'EUR')).toContain('1,234.56')
  })
})

describe('percentage', () => {
  it('calculates percentage', () => {
    expect(percentage(25, 100)).toBe(25)
    expect(percentage(1, 3)).toBe(33.33)
  })

  it('returns 0 when total is 0', () => {
    expect(percentage(5, 0)).toBe(0)
  })
})

describe('inRange', () => {
  it('returns true when in range', () => {
    expect(inRange(5, 0, 10)).toBe(true)
  })

  it('includes boundaries', () => {
    expect(inRange(0, 0, 10)).toBe(true)
    expect(inRange(10, 0, 10)).toBe(true)
  })

  it('returns false when out of range', () => {
    expect(inRange(-1, 0, 10)).toBe(false)
    expect(inRange(11, 0, 10)).toBe(false)
  })
})

describe('randomInt', () => {
  it('generates number in range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
    }
  })

  it('returns integer', () => {
    expect(Number.isInteger(randomInt(1, 10))).toBe(true)
  })
})

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 Bytes')
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1048576)).toBe('1 MB')
  })

  it('respects decimal places', () => {
    expect(formatBytes(1536, 1)).toBe('1.5 KB')
  })
})

describe('isEven', () => {
  it('returns true for even numbers', () => {
    expect(isEven(0)).toBe(true)
    expect(isEven(2)).toBe(true)
    expect(isEven(100)).toBe(true)
  })

  it('returns false for odd numbers', () => {
    expect(isEven(1)).toBe(false)
    expect(isEven(3)).toBe(false)
  })
})

describe('isOdd', () => {
  it('returns true for odd numbers', () => {
    expect(isOdd(1)).toBe(true)
    expect(isOdd(3)).toBe(true)
  })

  it('returns false for even numbers', () => {
    expect(isOdd(0)).toBe(false)
    expect(isOdd(2)).toBe(false)
  })
})

describe('ordinal', () => {
  it('handles 1st, 2nd, 3rd', () => {
    expect(ordinal(1)).toBe('1st')
    expect(ordinal(2)).toBe('2nd')
    expect(ordinal(3)).toBe('3rd')
  })

  it('handles 11th, 12th, 13th', () => {
    expect(ordinal(11)).toBe('11th')
    expect(ordinal(12)).toBe('12th')
    expect(ordinal(13)).toBe('13th')
  })

  it('handles 21st, 22nd, 23rd', () => {
    expect(ordinal(21)).toBe('21st')
    expect(ordinal(22)).toBe('22nd')
    expect(ordinal(23)).toBe('23rd')
  })
})

describe('parseNumber', () => {
  it('parses valid number', () => {
    expect(parseNumber('123')).toBe(123)
    expect(parseNumber('3.14')).toBe(3.14)
  })

  it('returns default for invalid', () => {
    expect(parseNumber('abc')).toBe(0)
    expect(parseNumber('abc', 5)).toBe(5)
  })
})
