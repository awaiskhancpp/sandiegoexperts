# Booking UI & Thank-You Page Redesign

**Date:** 2026-06-03
**Scope:** Appointment booking flow (`components/CTASection.tsx`) + thank-you page (`app/thank-you/page.tsx`). The contact form/tab is intentionally left untouched.

## Goals

1. Redesign the appointment booking UI to match the website's visual language (brand blue).
2. Redesign the thank-you page to read as part of the site.
3. Add proper form validation, including required US phone-number validation with auto-formatting.

## Decisions (confirmed with user)

- **Design direction:** Lean into brand blue (`#3863ff`) + `#ceebff` tones.
- **Phone:** Required, auto-formats to `(555) 123-4567`, must be a valid 10-digit US number.
- **Contact form:** Not in scope — leave its submit and markup as-is.

## Design system reference

- Background `#ceebff`, dark `#05080c`, brand blue `#3863ff` (→ `#2a4fd4` for gradients), success green `#22c55e`.
- Fonts: `font-heading` (Aeonik), `font-body` (Inter). Existing animation keyframes live in `app/globals.css`.

## Work units

### A. Shared form helpers — `lib/forms.ts` (new)
- `isValidEmail(value: string): boolean` — single source of truth for the email regex.
- `formatUSPhone(value: string): string` — strips non-digits, tolerates a leading `1`, progressively formats to `(555) 123-4567`.
- `isValidUSPhone(value: string): boolean` — true when exactly 10 significant digits.

Pure functions, no dependencies. Testable in isolation.

### B. Booking flow redesign — `components/CTASection.tsx`
- Re-skin `CalPicker`, `TimeSlots`, `StepBar`, the form, and `BookingError` to brand blue:
  - Available days: `rgba(56,99,255,0.06)` tint; selected day solid `#3863ff` with blue glow; today gets a subtle blue ring.
  - Selected time slot: blue border + blue fill.
  - Step bar: active step blue, completed steps green ✓, connector fills blue→green.
  - Confirm button: blue gradient with hover lift.
- Validation in `AppointmentFlow`:
  - Name required, email required + regex, **phone required + US 10-digit**.
  - Phone input runs through `formatUSPhone` on change.
  - Inline red errors + red borders, cleared on edit, validated on submit.
- Both render sites (inline "Appointment" tab + floating-button modal) share `AppointmentFlow`, so they update together.

### C. Step + entrance animations
- New `booking-step` keyframe in `app/globals.css`; keyed wrapper animates calendar → time → form transitions.
- Staggered fade/translate entrance for calendar cells, time slots, and form fields.
- All animations gated behind `@media (prefers-reduced-motion: reduce)`.

### D. Server-side guard — `app/api/calcom/book/route.ts`
- Mirror email + US phone validation server-side so malformed data can't bypass the client. Return 400 with a clear message on failure.

### E. Thank-you page — `app/thank-you/page.tsx`
- Keep confetti + animated check/envelope.
- Align accents to brand blue ("What happens next" cards, booking-reference card).
- Add a small brand logo at the top; keep `font-heading`/`font-body` consistent; tighten spacing.

## Error handling

- Client validation blocks submit and surfaces inline messages.
- Booking API failures show the existing `BookingError` state (re-skinned) with a retry.
- Server route returns 400 on invalid email/phone with a human-readable message.

## Out of scope

- Contact form behavior/markup.
- Cal.com slots route changes.
- Backend wiring for the contact form.
