import { describe, it, expect, vi } from 'vitest'
import {
  normalizeSearchTerm,
  containsSearchTerm,
  highlightSearchTerm,
  paginateItems,
  debounce,
  groupBy,
  uniqueBy,
  sortByMultiple
} from '../searchUtils'

describe('normalizeSearchTerm', () => {
  it('converts to lowercase', () => {
    expect(normalizeSearchTerm('HELLO')).toBe('hello')
  })

  it('trims whitespace', () => {
    expect(normalizeSearchTerm('  hello  ')).toBe('hello')
  })

  it('handles mixed case and whitespace', () => {
    expect(normalizeSearchTerm('  Hello World  ')).toBe('hello world')
  })
})

describe('containsSearchTerm', () => {
  it('returns false for empty text', () => {
    expect(containsSearchTerm(undefined, 'test')).toBe(false)
    expect(containsSearchTerm('', 'test')).toBe(false)
  })

  it('returns false for empty search term', () => {
    expect(containsSearchTerm('hello', '')).toBe(false)
  })

  it('returns true for matching text', () => {
    expect(containsSearchTerm('Hello World', 'hello')).toBe(true)
    expect(containsSearchTerm('Hello World', 'WORLD')).toBe(true)
  })

  it('returns false for non-matching text', () => {
    expect(containsSearchTerm('Hello World', 'foo')).toBe(false)
  })
})

describe('highlightSearchTerm', () => {
  it('returns original text when search term is empty', () => {
    expect(highlightSearchTerm('Hello', '')).toBe('Hello')
  })

  it('wraps matching text with mark tags', () => {
    expect(highlightSearchTerm('Hello World', 'world')).toBe('Hello <mark>World</mark>')
  })

  it('handles multiple matches', () => {
    expect(highlightSearchTerm('test test test', 'test')).toBe('<mark>test</mark> <mark>test</mark> <mark>test</mark>')
  })

  it('is case-insensitive', () => {
    expect(highlightSearchTerm('HELLO hello Hello', 'hello')).toBe('<mark>HELLO</mark> <mark>hello</mark> <mark>Hello</mark>')
  })
})

describe('paginateItems', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  it('returns correct items for first page', () => {
    const result = paginateItems(items, 1, 3)
    expect(result.items).toEqual([1, 2, 3])
    expect(result.currentPage).toBe(1)
    expect(result.hasNextPage).toBe(true)
    expect(result.hasPreviousPage).toBe(false)
  })

  it('returns correct items for middle page', () => {
    const result = paginateItems(items, 2, 3)
    expect(result.items).toEqual([4, 5, 6])
    expect(result.currentPage).toBe(2)
    expect(result.hasNextPage).toBe(true)
    expect(result.hasPreviousPage).toBe(true)
  })

  it('returns correct items for last page', () => {
    const result = paginateItems(items, 4, 3)
    expect(result.items).toEqual([10])
    expect(result.currentPage).toBe(4)
    expect(result.hasNextPage).toBe(false)
    expect(result.hasPreviousPage).toBe(true)
  })

  it('calculates total pages correctly', () => {
    const result = paginateItems(items, 1, 3)
    expect(result.totalPages).toBe(4)
    expect(result.totalItems).toBe(10)
  })

  it('handles page out of range', () => {
    const result = paginateItems(items, 100, 3)
    expect(result.currentPage).toBe(4) // Should be clamped to last page
  })
})

describe('debounce', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('only calls function once for rapid invocations', async () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    vi.advanceTimersByTime(100)
    expect(mockFn).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})

describe('groupBy', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
    { type: 'vegetable', name: 'broccoli' },
  ]

  it('groups items by key', () => {
    const result = groupBy(items, item => item.type)
    expect(result.get('fruit')).toHaveLength(2)
    expect(result.get('vegetable')).toHaveLength(2)
  })

  it('returns empty map for empty array', () => {
    const result = groupBy([], item => item)
    expect(result.size).toBe(0)
  })
})

describe('uniqueBy', () => {
  const items = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '1', name: 'Alice Duplicate' },
    { id: '3', name: 'Charlie' },
  ]

  it('removes duplicates by key', () => {
    const result = uniqueBy(items, item => item.id)
    expect(result).toHaveLength(3)
    expect(result.map(i => i.id)).toEqual(['1', '2', '3'])
  })

  it('keeps first occurrence', () => {
    const result = uniqueBy(items, item => item.id)
    expect(result.find(i => i.id === '1')?.name).toBe('Alice')
  })

  it('returns empty array for empty input', () => {
    expect(uniqueBy([], i => i)).toEqual([])
  })
})

describe('sortByMultiple', () => {
  const items = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: 25 },
    { name: 'Charlie', age: 30 },
  ]

  it('sorts by first comparator', () => {
    const result = sortByMultiple(items, [
      (a, b) => a.name.localeCompare(b.name)
    ])
    expect(result[0].name).toBe('Alice')
    expect(result[result.length - 1].name).toBe('Charlie')
  })

  it('uses second comparator for ties', () => {
    const result = sortByMultiple(items, [
      (a, b) => a.name.localeCompare(b.name),
      (a, b) => a.age - b.age
    ])
    // Both Alices should be first, sorted by age
    expect(result[0].name).toBe('Alice')
    expect(result[0].age).toBe(25)
    expect(result[1].name).toBe('Alice')
    expect(result[1].age).toBe(30)
  })

  it('does not mutate original array', () => {
    const original = [...items]
    sortByMultiple(items, [(a, b) => a.name.localeCompare(b.name)])
    expect(items).toEqual(original)
  })
})
