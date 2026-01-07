// lib/validationUtils.ts
// Client-safe validation utility functions
// These can be safely imported in both client and server components

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Check if it's all digits and reasonable length
  return /^\+?\d{10,15}$/.test(cleaned);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field is not empty
 */
export function isNotEmpty(value: string | undefined | null): boolean {
  if (value === undefined || value === null) return false;
  return value.trim().length > 0;
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  if (!value) return false;
  return value.length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  if (!value) return true; // Empty string doesn't exceed max length
  return value.length <= maxLength;
}

/**
 * Validate string contains only alphanumeric characters
 */
export function isAlphanumeric(value: string): boolean {
  if (!value) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validate date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Validate date is in the past
 */
export function isPastDate(dateString: string): boolean {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * Sanitize string by removing HTML tags
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Validate form field and return error message or null
 */
export function validateField(
  value: string,
  rules: {
    required?: boolean;
    email?: boolean;
    phone?: boolean;
    url?: boolean;
    minLength?: number;
    maxLength?: number;
  }
): string | null {
  if (rules.required && !isNotEmpty(value)) {
    return 'This field is required';
  }

  if (rules.email && value && !isValidEmail(value)) {
    return 'Please enter a valid email address';
  }

  if (rules.phone && value && !isValidPhone(value)) {
    return 'Please enter a valid phone number';
  }

  if (rules.url && value && !isValidUrl(value)) {
    return 'Please enter a valid URL';
  }

  if (rules.minLength && value && !hasMinLength(value, rules.minLength)) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value && !hasMaxLength(value, rules.maxLength)) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  return null;
}
