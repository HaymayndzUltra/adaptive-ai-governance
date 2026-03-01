# Rule: Accessibility Standards

**ID:** 10-accessibility
**Priority:** MEDIUM
**Applies To:** standard, complex
**Domain:** frontend

---

## Non-Negotiable Constraints

1. **Semantic HTML** — Use correct HTML elements for their purpose (`<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<article>`, etc.).

2. **Keyboard Navigation** — All interactive elements must be keyboard-accessible. Focus order must be logical. No keyboard traps.

3. **ARIA Labels** — Interactive elements without visible text must have `aria-label` or `aria-labelledby`. Dynamic content changes must use `aria-live` regions.

4. **Color Contrast** — Text must meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text). Never rely on color alone to convey information.

5. **Alt Text** — All meaningful images must have descriptive `alt` text. Decorative images must have `alt=""`.

6. **Form Accessibility** — All form inputs must have associated `<label>` elements. Error messages must be programmatically associated with their fields.

## Depth Modulation

### MODERATE (Standard pathway)
- Verify semantic HTML in new components
- Check keyboard navigation for new interactive elements
- Verify ARIA labels on new custom components
- Check color contrast on new UI elements

### DEEP (Complex pathway)
- All moderate PLUS:
- Full screen reader testing for new user flows
- Verify WCAG 2.1 AA compliance across all changed views
- Test with assistive technologies (VoiceOver, NVDA)
- Verify responsive design accessibility (touch targets, zoom)
