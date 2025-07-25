import { describe, it, expect } from 'vitest'
import {
  capitalize,
  toTitleCase,
  toKebabCase,
  toCamelCase,
  stripHtml,
  escapeHtml,
  pluralize,
  getInitials,
  extractNumbers,
  isAlphanumeric,
  maskString
} from '../stringUtils'

describe('capitalize', () => {
  it('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('')
  })

  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('world')).toBe('World')
  })

  it('handles already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A')
  })
})

describe('toTitleCase', () => {
  it('returns empty string for empty input', () => {
    expect(toTitleCase('')).toBe('')
  })

  it('converts to title case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
  })

  it('handles uppercase input', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
  })

  it('handles mixed case', () => {
    expect(toTitleCase('hELLO wORLD')).toBe('Hello World')
  })
})

describe('toKebabCase', () => {
  it('returns empty string for empty input', () => {
    expect(toKebabCase('')).toBe('')
  })

  it('converts spaces to hyphens', () => {
    expect(toKebabCase('hello world')).toBe('hello-world')
  })

  it('converts camelCase', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world')
  })

  it('converts underscores', () => {
    expect(toKebabCase('hello_world')).toBe('hello-world')
  })

  it('converts to lowercase', () => {
    expect(toKebabCase('Hello World')).toBe('hello-world')
  })
})

describe('toCamelCase', () => {
  it('returns empty string for empty input', () => {
    expect(toCamelCase('')).toBe('')
  })

  it('converts hyphen-separated', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld')
  })

  it('converts space-separated', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld')
  })

  it('converts underscore-separated', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld')
  })

  it('handles already camelCase', () => {
    expect(toCamelCase('helloWorld')).toBe('helloWorld')
  })
})

describe('stripHtml', () => {
  it('returns empty string for empty input', () => {
    expect(stripHtml('')).toBe('')
  })

  it('removes HTML tags', () => {
    expect(stripHtml('<p>Hello</p>')).toBe('Hello')
  })

  it('removes nested tags', () => {
    expect(stripHtml('<div><p>Hello</p></div>')).toBe('Hello')
  })

  it('handles self-closing tags', () => {
    expect(stripHtml('Hello<br/>World')).toBe('HelloWorld')
  })

  it('handles attributes', () => {
    expect(stripHtml('<a href="test">Link</a>')).toBe('Link')
  })
})

describe('escapeHtml', () => {
  it('returns empty string for empty input', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('escapes ampersand', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
  })

  it('escapes angle brackets', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes quotes', () => {
    expect(escapeHtml('"Hello"')).toBe('&quot;Hello&quot;')
  })

  it('escapes single quotes', () => {
    expect(escapeHtml("It's fine")).toBe("It&#39;s fine")
  })
})

describe('pluralize', () => {
  it('returns singular for count of 1', () => {
    expect(pluralize('item', 1)).toBe('item')
  })

  it('returns plural for count of 0', () => {
    expect(pluralize('item', 0)).toBe('items')
  })

  it('returns plural for count > 1', () => {
    expect(pluralize('item', 5)).toBe('items')
  })

  it('uses custom plural form', () => {
    expect(pluralize('child', 2, 'children')).toBe('children')
  })
})

describe('getInitials', () => {
  it('returns empty string for empty input', () => {
    expect(getInitials('')).toBe('')
  })

  it('returns initials for full name', () => {
    expect(getInitials('John Doe')).toBe('JD')
  })

  it('handles single name', () => {
    expect(getInitials('John')).toBe('J')
  })

  it('respects maxLength', () => {
    expect(getInitials('John Adam Doe', 3)).toBe('JAD')
  })

  it('handles names with more parts than maxLength', () => {
    expect(getInitials('John Adam Doe Smith', 2)).toBe('JA')
  })
})

describe('extractNumbers', () => {
  it('returns empty array for empty input', () => {
    expect(extractNumbers('')).toEqual([])
  })

  it('extracts single number', () => {
    expect(extractNumbers('Test 123')).toEqual([123])
  })

  it('extracts multiple numbers', () => {
    expect(extractNumbers('Price: $19.99 x 2')).toEqual([19, 99, 2])
  })

  it('returns empty array when no numbers', () => {
    expect(extractNumbers('Hello World')).toEqual([])
  })
})

describe('isAlphanumeric', () => {
  it('returns false for empty string', () => {
    expect(isAlphanumeric('')).toBe(false)
  })

  it('returns true for alphanumeric', () => {
    expect(isAlphanumeric('abc123')).toBe(true)
  })

  it('returns false for special characters', () => {
    expect(isAlphanumeric('abc-123')).toBe(false)
  })

  it('returns false for spaces', () => {
    expect(isAlphanumeric('abc 123')).toBe(false)
  })

  it('returns true for letters only', () => {
    expect(isAlphanumeric('abcXYZ')).toBe(true)
  })

  it('returns true for numbers only', () => {
    expect(isAlphanumeric('12345')).toBe(true)
  })
})

describe('maskString', () => {
  it('returns original if too short', () => {
    expect(maskString('abc', 2, 2)).toBe('abc')
  })

  it('masks middle of string', () => {
    expect(maskString('email@test.com')).toBe('em**********om')
  })

  it('respects custom visible lengths', () => {
    expect(maskString('1234567890', 3, 3)).toBe('123****890')
  })

  it('handles empty string', () => {
    expect(maskString('')).toBe('')
  })
})
