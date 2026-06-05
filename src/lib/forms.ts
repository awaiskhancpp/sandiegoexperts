// Shared form-validation helpers used by the contact + booking flows.

/** Single source of truth for email validation. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Returns just the significant digits of a US phone number — at most 10,
 * with a leading country-code `1` stripped if present.
 */
export function usPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Progressively formats input as a US phone number: `(555) 123-4567`.
 * Safe to call on every keystroke — partial input formats partially.
 */
export function formatUSPhone(value: string): string {
  const d = usPhoneDigits(value);
  if (d.length === 0) return '';
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** True when the value contains exactly 10 significant US digits. */
export function isValidUSPhone(value: string): boolean {
  return usPhoneDigits(value).length === 10;
}

/** E.164 form (`+15551234567`) for API submission, or '' if invalid. */
export function toE164US(value: string): string {
  const d = usPhoneDigits(value);
  return d.length === 10 ? `+1${d}` : '';
}
