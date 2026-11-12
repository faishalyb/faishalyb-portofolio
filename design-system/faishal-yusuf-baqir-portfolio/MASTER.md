# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Faishal Yusuf Baqir Portfolio
**Generated:** 2026-11-12 09:40:38
**Category:** Agriculture/Farm Tech (palette and type overridden by the owner, see below)
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 5/10 (Standard) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette

> **Owner override (2026-11-12):** the generated earth-green + harvest-gold palette is replaced by the owner's greens below.
> `#336C01` is the deepest green on the site; nothing darker green is used. No gold.

| Role | Light | Dark | CSS Variable |
|------|-------|------|--------------|
| Deepest green | `#336C01` | `#336C01` | `--green-900` |
| Bright green | `#28A745` | `#28A745` | `--green-500` |
| Green 10% (soft fills) | `rgba(40,167,69,0.10)` | same | `--green-10` / `--color-primary-soft` |
| Primary (links, labels, green text) | `#336C01` | `#28A745` | `--color-primary` |
| On Primary | `#FFFFFF` | `#FFFFFF` | `--color-on-primary` |
| Accent/CTA (filled buttons, chips, badges) | `#336C01` | `#336C01` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `#FFFFFF` | `--color-on-accent` |
| Background | `#F6FAF3` | dark green gradient (`--page-gradient`, base `#061208`) | `--color-background` |
| Foreground | `#1D2419` | `#E9F3E4` | `--color-foreground` |
| Card | `#FFFFFF` | `rgba(16,40,14,0.72)` | `--color-card` |
| Muted Foreground | `#4B5548` | `#A9BCA3` | `--color-muted-foreground` |
| Border | `#D4E6CC` | `rgba(40,167,69,0.22)` | `--color-border` |
| Ring | `#336C01` | `#28A745` | `--color-ring` |

> **Owner override (2026-11-13, branch `scrolltide`):** dark is the default theme; light is the toggle. Every green fill that carries text (buttons, chips, badges, green cards) is `#336C01` with white text in both themes. `#28A745` is for green text and decoration, and at 10% for soft fills.

**Contrast rule:** `#28A745` is only 3.1:1 on white, so in light mode it is used for decoration (status dot, highlight, icons on tiles), never for body text. Green text in light mode is `#336C01` (6.4:1). In dark mode `#28A745` is the text green (5:1+ on the gradient).

### Typography

> **Owner override (2026-11-12):** Poppins is the primary font; Space Grotesk is the secondary.

- **Primary (headings, body, buttons):** Poppins 400 / 500 / 600 / 700, from Fontsource (`@fontsource/poppins`)
- **Secondary (eyebrows, small labels, numbers):** Space Grotesk variable (`@fontsource-variable/space-grotesk`), tabular numbers
- Body 16px, line-height 1.7. Headings 700 with slight negative tracking.

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button (owner palette: deep green) */
.btn-primary {
  background: #336C01;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #336C01;
  border: 2px solid #336C01;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F0FDF4;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #336C01;
  outline: none;
  box-shadow: 0 0 0 3px #336C0120;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Organic Biophilic

**Keywords:** Nature, organic shapes, green, sustainable, rounded, flowing, wellness, earthy, natural textures

**Best For:** Wellness apps, sustainability brands, eco products, health apps, meditation, organic food brands

**Key Effects:** Rounded corners (16-24px), organic curves (border-radius variations), natural shadows, flowing SVG shapes

### Page Pattern

**Pattern Name:** Feature-Rich Showcase

- **Conversion Strategy:** Clear feature hierarchy. One key message per card. Strong CTA repetition.
- **CTA Placement:** Hero (sticky) + After features + Bottom
- **Section Order:** Hero (value prop) > Feature grid/cards (4-6) > Use cases or benefits > Social proof or logos > CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Generic design
- ❌ Ignored accessibility
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
