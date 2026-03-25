# BTT Back Bay BJJ — Website Design Plan

> Implementation target: Static HTML/CSS site, GitHub Pages, Formspree for contact forms.
> This document is the single source of truth for all visual and structural decisions.

---

## 1. Color Palette

Colors extracted from the BTT Back Bay logo (Brazilian Top Team branding rooted in the Brazilian flag).

### 1.1 Brand Colors (from logo)

| Token                | Hex       | Usage                                        |
|----------------------|-----------|----------------------------------------------|
| `--color-green`      | `#009739` | Primary brand green. CTAs, links, accents.   |
| `--color-yellow`     | `#FEDD00` | Secondary accent. Badges, highlights, hovers.|
| `--color-deep-blue`  | `#002776` | Tertiary / authority. Headers, nav, footer.  |
| `--color-black`      | `#1A1A1A` | Body text, dark sections (softer than pure). |
| `--color-white`      | `#FFFFFF` | Page background, light text on dark.         |

### 1.2 Extended Palette (derived)

| Token                    | Hex       | Usage                                       |
|--------------------------|-----------|----------------------------------------------|
| `--color-green-dark`     | `#007A2E` | Green hover states, pressed buttons.         |
| `--color-green-light`    | `#E6F5EC` | Green tinted backgrounds, subtle sections.   |
| `--color-yellow-dark`    | `#D4B800` | Yellow hover states.                         |
| `--color-yellow-light`   | `#FFF9DB` | Yellow tinted backgrounds.                   |
| `--color-blue-dark`      | `#001B52` | Footer background, darkest sections.         |
| `--color-blue-light`     | `#E8EDF5` | Blue tinted backgrounds.                     |
| `--color-gray-50`        | `#FAFAFA` | Subtle section alternation.                  |
| `--color-gray-100`       | `#F5F5F5` | Card backgrounds, dividers.                  |
| `--color-gray-200`       | `#E5E5E5` | Borders, input borders.                      |
| `--color-gray-400`       | `#A3A3A3` | Placeholder text, muted labels.              |
| `--color-gray-600`       | `#525252` | Secondary body text.                         |
| `--color-gray-800`       | `#262626` | Headings, primary body text.                 |
| `--color-overlay`        | `rgba(0,0,0,0.55)` | Hero image overlay.                    |

### 1.3 CSS Custom Properties

```css
:root {
  /* Brand */
  --color-green: #009739;
  --color-green-dark: #007A2E;
  --color-green-light: #E6F5EC;
  --color-yellow: #FEDD00;
  --color-yellow-dark: #D4B800;
  --color-yellow-light: #FFF9DB;
  --color-deep-blue: #002776;
  --color-blue-dark: #001B52;
  --color-blue-light: #E8EDF5;

  /* Neutrals */
  --color-black: #1A1A1A;
  --color-white: #FFFFFF;
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E5E5E5;
  --color-gray-400: #A3A3A3;
  --color-gray-600: #525252;
  --color-gray-800: #262626;
  --color-overlay: rgba(0,0,0,0.55);

  /* Semantic aliases */
  --color-primary: var(--color-green);
  --color-primary-hover: var(--color-green-dark);
  --color-accent: var(--color-yellow);
  --color-accent-hover: var(--color-yellow-dark);
  --color-nav-bg: var(--color-deep-blue);
  --color-footer-bg: var(--color-blue-dark);
  --color-body-text: var(--color-gray-800);
  --color-heading: var(--color-black);
  --color-link: var(--color-green);
  --color-link-hover: var(--color-green-dark);
}
```

### 1.4 Usage Rules

- **Green** is the primary action color. Every CTA button that drives conversion ("Book a Free Class", "Get Started") uses green.
- **Yellow** is used sparingly — belt rank indicators, "New" badges, price highlights, and hover accents on cards. Never for large backgrounds.
- **Deep blue** anchors the top nav and footer. It conveys authority without being as heavy as pure black.
- **Background alternation**: Sections alternate between `--color-white` and `--color-gray-50`. Never more than two adjacent sections with the same background.

---

## 2. Typography

### 2.1 Font Stack (Google Fonts)

| Role        | Font Family          | Weight(s)    | Load Strategy |
|-------------|----------------------|--------------|---------------|
| Headings    | `Oswald`             | 600, 700     | `display=swap` |
| Body        | `Source Sans 3`      | 400, 600     | `display=swap` |

**Why these fonts:**
- **Oswald**: Condensed, strong sans-serif. Feels athletic and authoritative. Works at large sizes for impact. Not overused in the BJJ space.
- **Source Sans 3**: Clean, highly readable body font. Pairs well with Oswald's narrow proportions. Excellent at small sizes.

**Fallback stacks:**
```css
--font-heading: 'Oswald', 'Arial Narrow', sans-serif;
--font-body: 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif;
```

### 2.2 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

### 2.3 Type Scale

| Element              | Font Family     | Size (desktop) | Size (mobile) | Weight | Line-height | Letter-spacing | Text-transform |
|----------------------|-----------------|----------------|---------------|--------|-------------|----------------|----------------|
| H1 (hero)            | Oswald          | 56px           | 40px          | 700    | 1.1         | -0.02em        | uppercase      |
| H2 (section title)   | Oswald          | 40px           | 30px          | 700    | 1.15        | -0.01em        | uppercase      |
| H3 (card title)      | Oswald          | 24px           | 20px          | 600    | 1.2         | 0              | uppercase      |
| Body large (intro)   | Source Sans 3   | 20px           | 18px          | 400    | 1.6         | 0              | none           |
| Body                 | Source Sans 3   | 16px           | 16px          | 400    | 1.6         | 0              | none           |
| Body small (captions)| Source Sans 3   | 14px           | 14px          | 400    | 1.5         | 0              | none           |
| Button               | Oswald          | 16px           | 15px          | 600    | 1.0         | 0.04em         | uppercase      |
| Nav links            | Oswald          | 14px           | 14px          | 600    | 1.0         | 0.06em         | uppercase      |
| Footer text          | Source Sans 3   | 14px           | 14px          | 400    | 1.6         | 0              | none           |

### 2.4 Heading Decoration

Section headings (H2) get a small accent bar below:

```css
.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: var(--color-yellow);
  margin-top: 12px;
}
```

---

## 3. Section Layouts

All sections use a shared max-width container:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### 3.1 Navigation (sticky)

- **Position**: Sticky top, `z-index: 1000`.
- **Height**: 72px.
- **Background**: `var(--color-deep-blue)`.
- **Layout**: Logo (left) + nav links (right, desktop) + hamburger (right, mobile).
- **Logo**: The BTT Back Bay logo image, max-height 48px.
- **Nav links**: Home, Programs, Schedule, Instructors, About, Contact. White text, yellow underline on hover.
- **CTA button in nav**: "Free Trial" — yellow background, deep-blue text, 8px 20px padding.
- **Mobile**: Hamburger icon (3 lines, white). Menu slides down as full-width panel.

### 3.2 Hero Section

- **Full-width**, height: `min(85vh, 700px)`.
- **Background**: Large photo of BJJ training/mat (placeholder: dark toned image).
- **Overlay**: `var(--color-overlay)` with a subtle gradient from bottom (`rgba(0,0,0,0.7)`) to top (`rgba(0,0,0,0.2)`).
- **Content**: Centered vertically and horizontally.
  - Pre-headline (small): `var(--color-yellow)`, Oswald, 14px, uppercase, letter-spacing 0.1em. Text: "Brazilian Top Team"
  - H1: White, Oswald 700, as per type scale. Example: "Back Bay's Premier Jiu-Jitsu Academy"
  - Subtitle: White, opacity 0.9, Source Sans 3, 20px. One sentence about the school.
  - Two buttons side by side (stacked on mobile):
    - Primary: "Book a Free Class" — green bg, white text.
    - Secondary: "View Schedule" — transparent, white border, white text.
- **Scroll indicator**: Small animated chevron at bottom center.

### 3.3 Programs Section

- **Background**: `var(--color-white)`.
- **Padding**: 100px 0.
- **Heading**: H2 centered — "Our Programs".
- **Layout**: 3-column grid (stacks to single column on mobile).
- **Card specs** (see Section 4.2 for details):
  - Each card: program icon (optional), title (H3), short description, "Learn More" link.
  - Programs: Kids BJJ, Adults BJJ, No-Gi, Competition Team, Self-Defense, Private Lessons.
  - Show first 3 on main page with "View All Programs" button below.

### 3.4 Schedule Section

- **Background**: `var(--color-gray-50)`.
- **Padding**: 100px 0.
- **Heading**: H2 centered — "Class Schedule".
- **Layout**: Responsive table or card-based schedule.
  - Days as columns (Mon–Sat), time slots as rows.
  - Each class entry: class name, instructor, belt-level indicator (colored dot).
  - Table header row: `var(--color-deep-blue)` bg, white text.
  - Alternating row colors: white and `var(--color-gray-50)`.
  - On mobile: switch to accordion/tabs by day.
- **Below schedule**: "Not sure where to start? Book a free intro class." with CTA button.

### 3.5 Instructors Section

- **Background**: `var(--color-white)`.
- **Padding**: 100px 0.
- **Heading**: H2 centered — "Meet Your Instructors".
- **Layout**: 3-column grid (2-col tablet, 1-col mobile).
- **Instructor card**:
  - Photo: 280px × 350px, `object-fit: cover`, rounded corners 8px top.
  - Name: H3 below photo, centered.
  - Title/Rank: `var(--color-green)`, Source Sans 3, 14px, uppercase, letter-spacing 0.05em.
  - Bio: 2–3 lines, `var(--color-gray-600)`, centered, max-width 320px.
  - Hover: subtle lift (translateY -4px), shadow increase.

### 3.6 Why BTT Section (value proposition)

- **Background**: `var(--color-deep-blue)`.
- **Padding**: 100px 0.
- **Text color**: White.
- **Layout**: 2-column — text left, image/graphic right. Stack on mobile (text first, then image).
- **Left column**:
  - Pre-headline: `var(--color-yellow)`, 14px uppercase. "Why Choose BTT Back Bay"
  - H2: White, 40px. "More Than Just Martial Arts"
  - Paragraph: White, opacity 0.85, 18px.
  - 3–4 feature bullets with small icons:
    - "World-class instruction from certified black belts"
    - "Welcoming community for all skill levels"
    - "Competition-proven curriculum"
    - "Convenient Back Bay location"
  - Each bullet: icon (24px, `var(--color-yellow)`) + text in a row.
- **Right column**: Large photo (placeholder), rounded 8px corners, subtle shadow.

### 3.7 Testimonials (optional section)

- **Background**: `var(--color-green-light)`.
- **Padding**: 80px 0.
- **Heading**: H2 centered.
- **Layout**: 3-column grid (1-col mobile).
- **Testimonial card**:
  - Quote text: italic, `var(--color-gray-800)`, 16px, Source Sans 3.
  - Large opening quote mark: `var(--color-green)`, 48px, Oswald.
  - Name + program below quote.
  - Card: white bg, `border-radius: 8px`, `padding: 32px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.06)`.

### 3.8 Contact Section

- **Background**: `var(--color-white)`.
- **Padding**: 100px 0.
- **Heading**: H2 centered — "Get Started Today".
- **Layout**: 2-column — form left, info right. Stack on mobile.
- **Left column (form)**:
  - Formspree action URL.
  - Fields: Name, Email, Phone, Program Interest (select dropdown), Message (textarea).
  - Submit button: green bg, full-width, "Send Message".
  - Field specs: see Section 4.3.
- **Right column (info)**:
  - Address with icon.
  - Phone number with icon.
  - Email with icon.
  - Hours of operation.
  - Google Maps embed (or static map image with link).
  - Social media links (Instagram, Facebook, YouTube) with icon buttons.

### 3.9 Footer

- **Background**: `var(--color-blue-dark)`.
- **Padding**: 48px 0 24px.
- **Layout**: 3-column grid (stacks on mobile).
  - Column 1: Logo + short description + social icons.
  - Column 2: Quick links (Programs, Schedule, Instructors, Contact).
  - Column 3: Contact info (address, phone, email).
- **Bottom bar**: `border-top: 1px solid rgba(255,255,255,0.1)`, copyright text centered, 14px, white, opacity 0.6.

---

## 4. Component Specs

### 4.1 Buttons

#### Primary Button (green CTA)

```css
.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: var(--color-green);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  text-decoration: none;
}
.btn-primary:hover {
  background: var(--color-green-dark);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button (outline)

```css
.btn-secondary {
  display: inline-block;
  padding: 14px 32px;
  background: transparent;
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 2px solid var(--color-white);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  text-decoration: none;
}
.btn-secondary:hover {
  background: var(--color-white);
  color: var(--color-deep-blue);
}
```

#### Accent Button (yellow)

```css
.btn-accent {
  display: inline-block;
  padding: 8px 20px;
  background: var(--color-yellow);
  color: var(--color-deep-blue);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
}
.btn-accent:hover {
  background: var(--color-yellow-dark);
}
```

### 4.2 Cards

#### Program Card

```css
.card {
  background: var(--color-white);
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
```

- **Icon area**: 48px × 48px, `var(--color-green-light)` background circle, `var(--color-green)` icon inside, centered, margin-bottom 20px.
- **Title**: H3, `margin-bottom: 12px`.
- **Description**: `var(--color-gray-600)`, 16px, `line-height: 1.6`, `margin-bottom: 20px`.
- **Link**: `var(--color-green)`, font-weight 600, with arrow icon `→` on hover.

#### Instructor Card

```css
.instructor-card {
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.instructor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.instructor-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.instructor-card .info {
  padding: 24px;
  text-align: center;
}
```

### 4.3 Form Fields

```css
.form-field {
  margin-bottom: 20px;
}
.form-field label {
  display: block;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: 6px;
}
.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-gray-800);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 4px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px var(--color-green-light);
}
.form-field input::placeholder,
.form-field textarea::placeholder {
  color: var(--color-gray-400);
}
.form-field textarea {
  min-height: 120px;
  resize: vertical;
}
.form-field select {
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* chevron icon */
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}
```

- **Form action**: POST to Formspree endpoint.
- **Validation**: HTML5 `required` attributes. Add `aria-invalid` and `aria-describedby` for error states.
- **Error state**: `border-color: #DC2626`, red text below field.
- **Success state**: Replace form with confirmation message in `var(--color-green)`.

### 4.4 Schedule Table

```css
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 14px;
}
.schedule-table thead th {
  background: var(--color-deep-blue);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 12px 8px;
  font-size: 13px;
}
.schedule-table tbody td {
  padding: 10px 8px;
  border-bottom: 1px solid var(--color-gray-200);
  text-align: center;
  vertical-align: middle;
}
.schedule-table tbody tr:nth-child(even) {
  background: var(--color-gray-50);
}
.schedule-table .time-col {
  font-weight: 600;
  color: var(--color-gray-600);
  white-space: nowrap;
  width: 100px;
}
.schedule-table .class-name {
  font-weight: 600;
  color: var(--color-gray-800);
}
.schedule-table .belt-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
  vertical-align: middle;
}
```

---

## 5. Responsive Breakpoints

### 5.1 Breakpoint Definitions

| Name      | Min-width | Target                    |
|-----------|-----------|---------------------------|
| Mobile    | 0px       | Phones (default)          |
| Tablet    | 768px     | iPads, small laptops      |
| Desktop   | 1024px    | Laptops, desktops         |
| Wide      | 1280px    | Large monitors            |

### 5.2 Responsive Behavior by Section

#### Navigation
- **Mobile** (< 768px): Logo left, hamburger right. Nav links hidden. Hamburger opens a full-width dropdown panel with green background, white links, 16px vertical padding each.
- **Tablet** (768px+): Same as mobile but with slightly more padding.
- **Desktop** (1024px+): Logo left, nav links right in a row. Hamburger hidden.

#### Hero
- **Mobile**: H1 40px, subtitle 18px, buttons stacked vertically, 24px padding on sides.
- **Tablet**: H1 48px, subtitle 20px, buttons side by side.
- **Desktop**: H1 56px, full layout as designed.

#### Grid Layouts
- **Mobile** (< 768px): All grids become single column. 16px gap.
- **Tablet** (768px–1023px): 2-column grids. 24px gap.
- **Desktop** (1024px+): 3-column grids (or 2-column for Why BTT/Contact). 32px gap.

#### Schedule Table
- **Mobile** (< 768px): Table replaced by day tabs/accordion. Each day shows its classes in a card list.
- **Tablet** (768px+): Full table with horizontal scroll if needed.
- **Desktop** (1024px+): Full table, no scroll needed.

#### Section Padding
- **Mobile**: `padding: 64px 0`.
- **Tablet**: `padding: 80px 0`.
- **Desktop**: `padding: 100px 0`.

### 5.3 CSS Media Query Pattern

```css
/* Mobile-first approach */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}
```

---

## 6. Accessibility (WCAG 2.1 AA)

### 6.1 Color Contrast

All text/background combinations must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

| Combination                          | Ratio   | Pass? |
|--------------------------------------|---------|-------|
| `#1A1A1A` on `#FFFFFF` (body text)   | 16.2:1  | Yes   |
| `#FFFFFF` on `#002776` (nav)         | 11.4:1  | Yes   |
| `#FFFFFF` on `#009739` (buttons)     | 4.2:1   | No — use `#FFFFFF` with font-weight 700 on green, or darken green to `#007A2E` (5.2:1) |
| `#FFFFFF` on `#001B52` (footer)      | 14.6:1  | Yes   |
| `#1A1A1A` on `#FEDD00` (accent btn) | 12.8:1  | Yes   |
| `#525252` on `#FFFFFF` (secondary)   | 7.5:1   | Yes   |
| `#525252` on `#F5F5F5` (cards)      | 6.7:1   | Yes   |

**Action item**: For green buttons with white text, use `--color-green-dark (#007A2E)` as the button background to ensure 4.5:1+ contrast, or keep `#009739` but ensure button text is `font-weight: 700` (large text threshold of 3:1 is met at 4.2:1 with bold 16px+).

### 6.2 Focus States

```css
/* Global focus outline */
*:focus-visible {
  outline: 3px solid var(--color-yellow);
  outline-offset: 2px;
}

/* Remove outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
```

Yellow focus ring provides strong visibility against both light and dark backgrounds.

### 6.3 Keyboard Navigation

- All interactive elements (links, buttons, form fields) must be keyboard accessible.
- Skip-to-content link: Hidden visually, appears on focus. Placed as first element in `<body>`.

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--color-yellow);
  color: var(--color-deep-blue);
  padding: 8px 16px;
  font-weight: 600;
  z-index: 10000;
  border-radius: 0 0 4px 4px;
}
.skip-link:focus {
  top: 0;
}
```

- Mobile hamburger menu must be operable with Enter/Space keys.
- Dropdown/accordion must trap focus when open.

### 6.4 Semantic HTML

- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Each `<section>` should have an `aria-labelledby` pointing to its heading.
- Form labels must be associated with inputs via `for`/`id`.
- Images must have descriptive `alt` text. Decorative images use `alt=""`.
- Social media links must have `aria-label` (e.g., `aria-label="Follow us on Instagram"`).

### 6.5 Motion & Animation

- Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Hero scroll indicator animation: pause when reduced motion is preferred.

### 6.6 Form Accessibility

- Use `aria-required="true"` on required fields.
- Error messages: `role="alert"` + `aria-describedby` on the input.
- Formspree success/error handling: announce via `aria-live="polite"` region.

### 6.7 Image Handling

- All `<img>` tags: explicit `width` and `height` attributes to prevent layout shift (CLS).
- Hero and section backgrounds: use CSS `background-image` or `<picture>` with `loading="lazy"` for below-fold images.
- Logo: `alt="BTT Back Bay Brazilian Jiu-Jitsu"`.

---

## 7. File Structure

```
/
├── index.html
├── programs.html          (optional: detailed programs page)
├── schedule.html          (optional: full schedule page)
├── css/
│   └── style.css          (single stylesheet, CSS custom properties)
├── js/
│   └── main.js            (mobile nav toggle, form handling, smooth scroll)
├── images/
│   ├── logo.svg           (optimized SVG version of logo)
│   ├── hero-bg.webp       (hero background, WebP with JPEG fallback)
│   ├── instructors/       (instructor photos)
│   └── icons/             (SVG icons for features, social media)
├── favicon.ico
├── favicon.svg
├── robots.txt
└── DESIGN_PLAN.md         (this file)
```

---

## 8. Implementation Notes

### 8.1 Performance
- Single CSS file, no frameworks.
- Minimize external requests: 2 Google Fonts families, 1 Formspree endpoint.
- Use `loading="lazy"` on all images below the fold.
- Target: Lighthouse score 90+ on all categories.

### 8.2 SEO
- Proper `<title>`: "BTT Back Bay | Brazilian Jiu-Jitsu in Back Bay, Boston"
- `<meta name="description">`: School description with keywords.
- Open Graph tags for social sharing.
- Structured data (JSON-LD) for `LocalBusiness` and `MartialArtsSchool`.

### 8.3 Brand Tone in Copy
- **Confident but not arrogant.** "World-class instruction" not "We're the best."
- **Inclusive language.** "All levels welcome" not "Only for the dedicated."
- **Action-oriented.** "Start your journey" not "Learn about us."
- Avoid generic fitness marketing language. This is a martial arts academy with lineage and tradition — the copy should reflect that.

### 8.4 CSS Architecture
- Mobile-first approach (style for mobile, add complexity via `min-width` media queries).
- Use CSS custom properties for all colors and spacing tokens.
- Use `rem` for typography, `px` for fixed elements (borders, shadows, icon sizes).
- No CSS framework. Vanilla CSS only. Keep it under 500 lines if possible.

### 8.5 JavaScript Requirements (minimal)
- Mobile nav toggle (hamburger open/close).
- Smooth scroll for anchor links.
- Formspree form submission with fetch API (no page reload).
- Active nav link highlighting on scroll (IntersectionObserver).
- No build step required.
