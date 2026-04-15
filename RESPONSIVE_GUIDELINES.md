# Responsive Guidelines

This project follows a mobile-first responsive approach.

## Breakpoints

- `sm`: 480px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Core Rules

- Start styles for small screens first, then enhance with `min-width` breakpoints.
- Use fluid spacing and type with `clamp()` where possible.
- Keep horizontal page gutters consistent with a shared container token.
- Avoid fixed widths for major layout blocks; use `%`, `min()`, `max()`, and grid/flex.
- Never allow horizontal scrolling on standard content pages.

## Navigation Rules

- Desktop: centered nav + hover/focus dropdowns.
- Mobile/tablet: menu button + tap-to-open dropdown sections.
- Keep logo and actions away from edges using responsive inline padding tokens.

## QA Checklist (Must Pass)

- Test widths: 360, 390, 768, 1024, 1280, 1440.
- No text clipping or overlap.
- No horizontal scrollbar.
- Tap targets are easy to press on mobile.
- Dropdowns remain usable and readable across all breakpoints.
