// lib/arrayUtils.ts - Array manipulation utilities

/**
 * Chunk an array into smaller arrays of specified size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (!arr.length || size <= 0) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten a nested array one level deep
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((acc, val) => {
    return acc.concat(Array.isArray(val) ? val : [val]);
  }, []);
}

/**
 * Get unique values from an array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get the intersection of two arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * Get the difference between two arrays (items in arr1 but not in arr2)
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Pick random items from an array
 */
export function sample<T>(arr: T[], count: number = 1): T[] {
  if (!arr.length) return [];
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * Get the last N items from an array
 */
export function takeLast<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  return arr.slice(-n);
}

/**
 * Get the first N items from an array
 */
export function takeFirst<T>(arr: T[], n: number): T[] {
  if (n <= 0) return [];
  return arr.slice(0, n);
}

/**
 * Find the index of the maximum value in an array
 */
export function maxIndex(arr: number[]): number {
  if (!arr.length) return -1;
  let maxIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIdx]) maxIdx = i;
  }
  return maxIdx;
}

/**
 * Find the index of the minimum value in an array
 */
export function minIndex(arr: number[]): number {
  if (!arr.length) return -1;
  let minIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minIdx]) minIdx = i;
  }
  return minIdx;
}

/**
 * Calculate the sum of an array of numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculate the average of an array of numbers
 */
export function average(arr: number[]): number {
  if (!arr.length) return 0;
  return sum(arr) / arr.length;
}

/**
 * Compact an array by removing falsy values
 */
export function compact<T>(arr: (T | null | undefined | false | 0 | '')[]): T[] {
  return arr.filter(Boolean) as T[];
}

/**
 * Zip multiple arrays together
 */
export function zip<T>(...arrays: T[][]): T[][] {
  if (!arrays.length) return [];
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map(arr => arr[i]));
  }
  return result;
}
