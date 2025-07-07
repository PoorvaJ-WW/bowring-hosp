// lib/numberUtils.ts - Number manipulation utilities

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

/**
 * Format as currency
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return roundTo((value / total) * 100, 2);
}

/**
 * Check if number is between min and max
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Check if number is even
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}

/**
 * Check if number is odd
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}

/**
 * Get ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Parse string to number, returning default if invalid
 */
export function parseNumber(value: string, defaultValue: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}
