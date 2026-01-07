import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isNotEmpty,
  hasMinLength,
  hasMaxLength,
  isAlphanumeric,
  isFutureDate,
  isPastDate,
  sanitizeHtml,
  validateField
} from '../validationUtils'

describe('isValidEmail', () => {
  it('returns false for empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('returns true for valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
  })

  it('returns false for invalid email', () => {
    expect(isValidEmail('invalid')).toBe(false)
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('returns false for empty string', () => {
    expect(isValidPhone('')).toBe(false)
  })

  it('returns true for valid phone numbers', () => {
    expect(isValidPhone('1234567890')).toBe(true)
    expect(isValidPhone('+1-234-567-8901')).toBe(true)
    expect(isValidPhone('(123) 456-7890')).toBe(true)
  })

  it('returns false for invalid phone numbers', () => {
    expect(isValidPhone('123')).toBe(false)
    expect(isValidPhone('abc')).toBe(false)
  })
})

describe('isValidUrl', () => {
  it('returns false for empty string', () => {
    expect(isValidUrl('')).toBe(false)
  })

  it('returns true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
    expect(isValidUrl('https://example.com/path?query=1')).toBe(true)
  })

  it('returns false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false)
    expect(isValidUrl('example.com')).toBe(false)
  })
})

describe('isNotEmpty', () => {
  it('returns false for null and undefined', () => {
    expect(isNotEmpty(null)).toBe(false)
    expect(isNotEmpty(undefined)).toBe(false)
  })

  it('returns false for empty or whitespace string', () => {
    expect(isNotEmpty('')).toBe(false)
    expect(isNotEmpty('   ')).toBe(false)
  })

  it('returns true for non-empty string', () => {
    expect(isNotEmpty('hello')).toBe(true)
    expect(isNotEmpty('  hello  ')).toBe(true)
  })
})

describe('hasMinLength', () => {
  it('returns false for empty string', () => {
    expect(hasMinLength('', 5)).toBe(false)
  })

  it('returns true when length meets requirement', () => {
    expect(hasMinLength('hello', 5)).toBe(true)
    expect(hasMinLength('hello world', 5)).toBe(true)
  })

  it('returns false when length is too short', () => {
    expect(hasMinLength('hi', 5)).toBe(false)
  })
})

describe('hasMaxLength', () => {
  it('returns true for empty string', () => {
    expect(hasMaxLength('', 5)).toBe(true)
  })

  it('returns true when length is within limit', () => {
    expect(hasMaxLength('hi', 5)).toBe(true)
    expect(hasMaxLength('hello', 5)).toBe(true)
  })

  it('returns false when length exceeds limit', () => {
    expect(hasMaxLength('hello world', 5)).toBe(false)
  })
})

describe('isAlphanumeric', () => {
  it('returns false for empty string', () => {
    expect(isAlphanumeric('')).toBe(false)
  })

  it('returns true for alphanumeric strings', () => {
    expect(isAlphanumeric('abc123')).toBe(true)
    expect(isAlphanumeric('ABC')).toBe(true)
    expect(isAlphanumeric('123')).toBe(true)
  })

  it('returns false for strings with special characters', () => {
    expect(isAlphanumeric('abc-123')).toBe(false)
    expect(isAlphanumeric('hello world')).toBe(false)
    expect(isAlphanumeric('test@email')).toBe(false)
  })
})

describe('isFutureDate', () => {
  it('returns false for empty string', () => {
    expect(isFutureDate('')).toBe(false)
  })

  it('returns true for future date', () => {
    const future = new Date()
    future.setFullYear(future.getFullYear() + 1)
    expect(isFutureDate(future.toISOString())).toBe(true)
  })

  it('returns false for past date', () => {
    const past = new Date()
    past.setFullYear(past.getFullYear() - 1)
    expect(isFutureDate(past.toISOString())).toBe(false)
  })
})

describe('isPastDate', () => {
  it('returns false for empty string', () => {
    expect(isPastDate('')).toBe(false)
  })

  it('returns true for past date', () => {
    const past = new Date()
    past.setFullYear(past.getFullYear() - 1)
    expect(isPastDate(past.toISOString())).toBe(true)
  })

  it('returns false for future date', () => {
    const future = new Date()
    future.setFullYear(future.getFullYear() + 1)
    expect(isPastDate(future.toISOString())).toBe(false)
  })
})

describe('sanitizeHtml', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('')
  })

  it('removes HTML tags', () => {
    expect(sanitizeHtml('<p>Hello</p>')).toBe('Hello')
    expect(sanitizeHtml('<script>alert("xss")</script>')).toBe('alert("xss")')
  })

  it('preserves text content', () => {
    expect(sanitizeHtml('Plain text')).toBe('Plain text')
  })
})

describe('validateField', () => {
  it('returns error for required empty field', () => {
    const result = validateField('', { required: true })
    expect(result).toBe('This field is required')
  })

  it('returns null for valid required field', () => {
    const result = validateField('hello', { required: true })
    expect(result).toBeNull()
  })

  it('validates email format', () => {
    expect(validateField('invalid', { email: true })).toBe('Please enter a valid email address')
    expect(validateField('test@example.com', { email: true })).toBeNull()
  })

  it('validates phone format', () => {
    expect(validateField('abc', { phone: true })).toBe('Please enter a valid phone number')
    expect(validateField('1234567890', { phone: true })).toBeNull()
  })

  it('validates URL format', () => {
    expect(validateField('invalid', { url: true })).toBe('Please enter a valid URL')
    expect(validateField('https://example.com', { url: true })).toBeNull()
  })

  it('validates min length', () => {
    expect(validateField('hi', { minLength: 5 })).toBe('Must be at least 5 characters')
    expect(validateField('hello', { minLength: 5 })).toBeNull()
  })

  it('validates max length', () => {
    expect(validateField('hello world', { maxLength: 5 })).toBe('Must be no more than 5 characters')
    expect(validateField('hi', { maxLength: 5 })).toBeNull()
  })

  it('handles multiple rules', () => {
    expect(validateField('', { required: true, email: true })).toBe('This field is required')
    expect(validateField('test@example.com', { required: true, email: true })).toBeNull()
  })
})
