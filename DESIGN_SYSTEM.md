# Applause Outbound Engine - Design System

## Creative Direction: "The Editorial Enterprise"

Enterprise data treated as a narrative, not a form. Spacious, authoritative, premium. Large-scale typography paired with "glass and air" layering. No visual clutter.

## Core Principles

1. **No-Line Rule:** Never use 1px solid borders to section UI. Boundaries defined through background color shifts only.
2. **Tonal Depth:** Replace outlines with surface hierarchy shifts.
3. **Editorial Whitespace:** Spacing scale 16 and 20 between major groups. White space is a component.
4. **Intentional Asymmetry:** Primary actions anchored with weight. Secondary info breathes in margins.
5. **Softened Geometry:** Large rounded corners (0.5rem default, 1rem for containers).

---

## Color Tokens

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#00579f` | Core brand, authoritative text, main CTAs |
| `primary-container` | `#2d70bb` | CTA gradient endpoint, active nav states |
| `on-primary` | `#ffffff` | Text on primary backgrounds |
| `on-primary-container` | `#eef3ff` | Text on primary containers |

### Secondary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `secondary` | `#455e8c` | Supporting UI elements, metadata |
| `secondary-container` | `#b0cafd` | Secondary badges, soft highlights |

### Tertiary / Success (The "Applause" color)

| Token | Hex | Usage |
|-------|-----|-------|
| `tertiary` | `#50585d` | Muted tertiary text |
| `tertiary-container` | `#697076` | Status chips (muted/professional) |
| `tertiary-fixed` | `#dce3ea` | Success states, approved badges |

### Surface Hierarchy

| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | `#f9f9ff` | Base canvas background |
| `surface-container-low` | `#f1f3ff` | Secondary grouping, sidebar sections |
| `surface-container` | `#e8eeff` | Deeper sections, input backgrounds |
| `surface-container-high` | `#dfe8ff` | Inset elements |
| `surface-container-highest` | `#d7e3ff` | Deepest depth, hover states |
| `surface-container-lowest` | `#ffffff` | Elevated cards, floating elements |
| `surface-variant` | `#d7e3ff` | Progress bars, divider alternatives |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `on-surface` | `#001b3f` | Primary text (NEVER use #000000) |
| `on-surface-variant` | `#414751` | Secondary text, descriptions |
| `on-background` | `#001b3f` | High-contrast text on backgrounds |
| `outline` | `#727782` | Muted labels, placeholders |
| `outline-variant` | `#c1c6d3` | Ghost borders (15-20% opacity only) |

### Navigation

| Token | Hex | Usage |
|-------|-----|-------|
| `inverse-surface` | `#13305a` | Sidebar background (deep navy) |
| `inverse-on-surface` | `#ecf0ff` | Sidebar text |
| `inverse-primary` | `#a5c8ff` | Sidebar active indicators |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `error` | `#ba1a1a` | Critical failures only |
| `error-container` | `#ffdad6` | Error backgrounds |

---

## Tailwind Config Extension

```typescript
// tailwind.config.ts - extend theme.colors with:
{
  "primary": "#00579f",
  "primary-container": "#2d70bb",
  "on-primary": "#ffffff",
  "on-primary-container": "#eef3ff",
  "secondary": "#455e8c",
  "secondary-container": "#b0cafd",
  "tertiary": "#50585d",
  "tertiary-container": "#697076",
  "tertiary-fixed": "#dce3ea",
  "surface": "#f9f9ff",
  "surface-container-low": "#f1f3ff",
  "surface-container": "#e8eeff",
  "surface-container-high": "#dfe8ff",
  "surface-container-highest": "#d7e3ff",
  "surface-container-lowest": "#ffffff",
  "surface-variant": "#d7e3ff",
  "on-surface": "#001b3f",
  "on-surface-variant": "#414751",
  "on-background": "#001b3f",
  "outline": "#727782",
  "outline-variant": "#c1c6d3",
  "inverse-surface": "#13305a",
  "inverse-on-surface": "#ecf0ff",
  "inverse-primary": "#a5c8ff",
  "error": "#ba1a1a",
  "error-container": "#ffdad6",
  "background": "#f9f9ff"
}
```

---

## Typography

### Font Stack

- **Headlines:** Manrope (Google Fonts), weights 200-800
- **Body/Data:** Inter (or Manrope as fallback)
- **Icons:** Material Symbols Outlined (Google Fonts)

### Type Scale

| Role | Size | Weight | Spacing | Usage |
|------|------|--------|---------|-------|
| Display Large | 3.5rem | 700 | -0.02em | Dashboard hero numbers |
| Display Medium | 2.25rem | 700 | -0.02em | Page titles |
| Headline Large | 2rem | 700 | normal | Section headers |
| Headline Medium | 1.5rem | 600 | normal | Card headings |
| Title Large | 1.375rem | 600 | normal | Sub-sections |
| Title Medium | 1rem | 600 | normal | Table headers |
| Body Large | 1rem | 400 | normal | Intro paragraphs (line-height 1.6) |
| Body Medium | 0.875rem | 400 | normal | Standard text |
| Label Medium | 0.75rem | 500 | 0.05em | ALL-CAPS metadata, status badges |
| Label Small | 0.6875rem | 500 | 0.05em | Timestamps, footnotes |

### Typography Rules

- Left-align body text always. Center only titles and single-line callouts.
- Bold all headers and inline labels.
- Never use #000000 for text. Use `on-surface` (#001b3f).
- Display type uses tight letter-spacing (-0.02em) for editorial feel.

---

## Elevation & Shadows

### The Layering Principle

Place `surface-container-lowest` (white) cards on `surface` (off-white) backgrounds. "Paper-on-desk" effect. No borders needed.

### Ambient Shadows (floating elements only)

```css
/* Ghost Shadow - for modals, dropdowns, floating cards */
box-shadow: 0px 12px 32px rgba(0, 27, 63, 0.04);

/* Subtle lift - for hover states on cards */
box-shadow: 0px 8px 24px rgba(0, 27, 63, 0.06);
```

### Ghost Border Fallback

Only when accessibility requires a stroke:
```css
border: 1px solid rgba(193, 198, 211, 0.15); /* outline-variant at 15% */
```

---

## Component Patterns

### Buttons

**Primary CTA:**
- Gradient: `linear-gradient(135deg, #00579f, #2d70bb)`
- Text: white, Manrope 600
- Border-radius: 0.5rem
- Hover: scale 1.02, subtle shimmer
- Arrow icon on right for navigation actions

**Secondary:**
- Background: `surface-container-highest`
- Text: `primary`
- No border

**Ghost:**
- Background: transparent
- Text: `on-surface-variant`
- Hover: `surface-container-low` background

### Cards

- Background: `surface-container-lowest` (#ffffff)
- No borders. Tonal lift from surface background.
- Border-radius: 0.5rem (DEFAULT) or 1rem (lg) for major containers
- Padding: 1.5rem (24px)

### Input Fields

- Background: `surface-container` (#e8eeff)
- No four-sided border
- On focus: background shifts to `surface-container-lowest`, 2px primary bottom-border glow
- Border-radius: 0.5rem
- Label: `label-md` (0.75rem, uppercase, 0.05em spacing)

### Status Badges

- Semi-transparent background (20% opacity of status color)
- No borders
- Text: high contrast against the badge
- Types: PRIORITY HIGH (primary), ENRICHED (tertiary-fixed), PENDING (secondary), LOW SIGNAL (outline)

### Data Tables

- No traditional divider lines between rows
- Use alternating `surface` / `surface-container-low` backgrounds OR generous vertical spacing
- Header row: `label-md` uppercase, `on-surface-variant` color
- Checkbox column for batch actions

### Progress Indicator (Stage Nav)

- Horizontal node-based layout (not a bar)
- Small circles connected by `surface-variant` line
- Completed: checkmark icon, no heavy container
- Active: primary color with subtle glow
- Upcoming: muted outline

### Sidebar Navigation

- Background: `inverse-surface` (#13305a)
- Active item: `primary-container` (#2d70bb) pill shape
- Inactive text: `inverse-on-surface` (#ecf0ff)
- Icons: Material Symbols Outlined, 20px

### Glassmorphism (floating elements)

```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(20px);
```

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 0.25rem | Inline icon gaps |
| 2 | 0.5rem | Tight element spacing |
| 3 | 0.75rem | Badge padding |
| 4 | 1rem | Card internal spacing |
| 6 | 1.5rem | Card padding, section gaps |
| 8 | 2rem | Between card groups |
| 10 | 2.5rem | Major section dividers |
| 12 | 3rem | Between content blocks |
| 16 | 4rem | Major functional group separation |
| 20 | 5rem | Hero/display spacing |

---

## Dark Mode

Supported. Uses Tailwind `dark:` prefix with `class` strategy. Dark mode swaps surface hierarchy to deep navy tones. See mockups for reference. Implement after light mode is complete.

---

## Do's and Don'ts

### Do

- Use extreme whitespace to separate major groups
- Use `body-lg` for intro paragraphs
- Use surface tiers to create "pockets" of information
- Use gradient CTAs for primary actions
- Use Material Symbols Outlined for all icons

### Don't

- Don't use #000000 for text (use #001b3f)
- Don't use traditional dividers (use background shifts or spacing)
- Don't use "Alert Red" for everything (reserve for critical failures)
- Don't use 1px borders for sections
- Don't mix corner radii (nested elements scale down proportionally)
- Don't use em dashes anywhere in UI copy
