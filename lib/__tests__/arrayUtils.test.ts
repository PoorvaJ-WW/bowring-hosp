import { describe, it, expect } from 'vitest'
import {
  chunk,
  flatten,
  unique,
  shuffle,
  intersection,
  difference,
  sample,
  takeLast,
  takeFirst,
  maxIndex,
  minIndex,
  sum,
  average,
  compact,
  zip
} from '../arrayUtils'

describe('chunk', () => {
  it('returns empty array for empty input', () => {
    expect(chunk([], 2)).toEqual([])
  })

  it('splits array into chunks', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('handles exact division', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
  })

  it('handles size larger than array', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]])
  })

  it('handles size of 0', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([])
  })
})

describe('flatten', () => {
  it('flattens nested arrays', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4])
  })

  it('handles mixed arrays', () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
  })

  it('handles empty arrays', () => {
    expect(flatten([])).toEqual([])
  })

  it('handles non-nested arrays', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
  })
})

describe('unique', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
  })

  it('handles empty array', () => {
    expect(unique([])).toEqual([])
  })

  it('handles strings', () => {
    expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b'])
  })

  it('preserves order', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2])
  })
})

describe('shuffle', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle(arr)).toHaveLength(5)
  })

  it('contains same elements', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5]
    shuffle(arr)
    expect(arr).toEqual([1, 2, 3, 4, 5])
  })

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([])
  })
})

describe('intersection', () => {
  it('finds common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })

  it('returns empty for no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([])
  })

  it('handles empty arrays', () => {
    expect(intersection([], [1, 2])).toEqual([])
  })

  it('handles strings', () => {
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c'])
  })
})

describe('difference', () => {
  it('finds elements in first but not second', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1])
  })

  it('returns all elements if no overlap', () => {
    expect(difference([1, 2], [3, 4])).toEqual([1, 2])
  })

  it('returns empty if all overlap', () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([])
  })

  it('handles empty first array', () => {
    expect(difference([], [1, 2])).toEqual([])
  })
})

describe('sample', () => {
  it('returns requested number of items', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(sample(arr, 3)).toHaveLength(3)
  })

  it('returns items from original array', () => {
    const arr = [1, 2, 3, 4, 5]
    const result = sample(arr, 3)
    result.forEach(item => {
      expect(arr).toContain(item)
    })
  })

  it('handles count larger than array', () => {
    expect(sample([1, 2], 5)).toHaveLength(2)
  })

  it('returns empty for empty array', () => {
    expect(sample([])).toEqual([])
  })
})

describe('takeLast', () => {
  it('takes last N items', () => {
    expect(takeLast([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5])
  })

  it('handles N larger than array', () => {
    expect(takeLast([1, 2], 5)).toEqual([1, 2])
  })

  it('handles N of 0', () => {
    expect(takeLast([1, 2, 3], 0)).toEqual([])
  })

  it('handles empty array', () => {
    expect(takeLast([], 3)).toEqual([])
  })
})

describe('takeFirst', () => {
  it('takes first N items', () => {
    expect(takeFirst([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
  })

  it('handles N larger than array', () => {
    expect(takeFirst([1, 2], 5)).toEqual([1, 2])
  })

  it('handles N of 0', () => {
    expect(takeFirst([1, 2, 3], 0)).toEqual([])
  })

  it('handles empty array', () => {
    expect(takeFirst([], 3)).toEqual([])
  })
})

describe('maxIndex', () => {
  it('finds index of max value', () => {
    expect(maxIndex([1, 5, 3, 2])).toBe(1)
  })

  it('returns first index for ties', () => {
    expect(maxIndex([1, 5, 5, 2])).toBe(1)
  })

  it('returns -1 for empty array', () => {
    expect(maxIndex([])).toBe(-1)
  })

  it('handles negative numbers', () => {
    expect(maxIndex([-5, -1, -3])).toBe(1)
  })
})

describe('minIndex', () => {
  it('finds index of min value', () => {
    expect(minIndex([3, 1, 5, 2])).toBe(1)
  })

  it('returns first index for ties', () => {
    expect(minIndex([3, 1, 1, 2])).toBe(1)
  })

  it('returns -1 for empty array', () => {
    expect(minIndex([])).toBe(-1)
  })

  it('handles negative numbers', () => {
    expect(minIndex([-1, -5, -3])).toBe(1)
  })
})

describe('sum', () => {
  it('calculates sum', () => {
    expect(sum([1, 2, 3, 4])).toBe(10)
  })

  it('returns 0 for empty array', () => {
    expect(sum([])).toBe(0)
  })

  it('handles negative numbers', () => {
    expect(sum([1, -2, 3])).toBe(2)
  })

  it('handles decimals', () => {
    expect(sum([0.1, 0.2])).toBeCloseTo(0.3)
  })
})

describe('average', () => {
  it('calculates average', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })

  it('returns 0 for empty array', () => {
    expect(average([])).toBe(0)
  })

  it('handles single element', () => {
    expect(average([5])).toBe(5)
  })
})

describe('compact', () => {
  it('removes falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3])
  })

  it('returns empty for all falsy', () => {
    expect(compact([0, false, '', null, undefined])).toEqual([])
  })

  it('keeps truthy values', () => {
    expect(compact([1, 'hello', true])).toEqual([1, 'hello', true])
  })
})

describe('zip', () => {
  it('zips arrays together', () => {
    expect(zip([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']])
  })

  it('handles different lengths', () => {
    expect(zip([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b'], [3, undefined]])
  })

  it('handles empty input', () => {
    expect(zip()).toEqual([])
  })

  it('handles single array', () => {
    expect(zip([1, 2])).toEqual([[1], [2]])
  })

  it('handles three arrays', () => {
    expect(zip([1], ['a'], [true])).toEqual([[1, 'a', true]])
  })
})
