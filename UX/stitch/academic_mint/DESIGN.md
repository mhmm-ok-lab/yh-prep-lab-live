# Design System Strategy: The Academic Atelier

## 1. Overview & Creative North Star
**Creative North Star: The Curated Scholar**
This design system moves beyond the generic "SaaS dashboard" aesthetic to embrace the quiet confidence of a high-end academic journal or a bespoke learning lab. The goal is a digital experience that feels intentional, breathable, and authoritative. 

We achieve this through **"The Curated Scholar"** approach: prioritizing whitespace over lines, tonal depth over drop shadows, and a "superslim" navigation philosophy that maximizes content focus. By using intentional asymmetry—such as offset headers or varying card heights—we break the rigid "template" feel, creating a layout that feels fluid and premium.

---

## 2. Colors & Surface Philosophy
The palette is rooted in mint greens, warm buttery yellows, and a sophisticated range of cool greys. 

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. 
- A section intended to stand out should use `surface_container_low` sitting atop a `background` or `surface` base. 
- Contrast is achieved through tonal adjacency, not structural outlining.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, tactile layers:
*   **Base Layer:** `surface` (#f8f9ff)
*   **Secondary Content Areas:** `surface_container_low` (#eff4ff)
*   **Primary Cards/Action Areas:** `surface_container_lowest` (#ffffff) for maximum "pop" or `tertiary_fixed` (#f7e0b0) for emphasized academic sections.

### The Glass & Gradient Rule
For floating elements or "superslim" mobile navigation bars, utilize **Glassmorphism**. Apply `surface` with 80% opacity and a `backdrop-blur` of 12px. 
*   **Signature Textures:** For main CTAs, use a subtle linear gradient from `primary` (#005c55) to `primary_container` (#0f766e) at a 135-degree angle. This provides a "jewel-toned" depth that feels more premium than flat fills.

---

## 3. Typography
We use **Public Sans** exclusively, relying on dramatic scale shifts rather than multiple typefaces to establish authority.

*   **Display (Large/Medium):** Used for "Hero" moments or major milestones. The tight tracking and generous leading create an editorial, "poster-like" impact.
*   **Headline (Small/Medium):** Use `headline-sm` for card titles. Pair these with `on_surface_variant` (#3e4947) for sub-headers to create a soft, accessible hierarchy.
*   **Title Scale:** Reserved for navigation elements and section headers. 
*   **Body & Label:** `body-md` is the workhorse. For "superslim" navigation, use `label-sm` with all-caps styling and increased letter-spacing (0.05em) to maintain legibility at small scales.

The hierarchy communicates **Trust**: Large, clear headings imply a curated path, while the smaller, meticulously spaced labels suggest precision and academic rigor.

---

## 4. Elevation & Depth
Depth in this system is a result of light and material, not artificial CSS effects.

### The Layering Principle
Achieve "lift" by stacking color tokens. Place a `surface_container_lowest` card on a `surface_container` background. The slight shift in lightness mimics the way high-quality paper rests on a desk.

### Ambient Shadows
When an element must float (e.g., a mobile bottom sheet or a modal):
*   **Shadow Color:** Use a 6% opacity version of `on_surface` (#161c24).
*   **Blur:** Minimum 24px.
*   **Spread:** -4px to keep the shadow "tucked" under the element, avoiding a muddy look.

### The "Ghost Border" Fallback
If accessibility requirements demand a border, use the **Ghost Border**: `outline_variant` (#bdc9c6) at 20% opacity. This provides a visual hint without breaking the "No-Line" Rule.

---

## 5. Components

### Superslim Navigation (Mobile)
A signature component for this system. A floating, pill-shaped bar using `surface_container_highest` with 70% opacity and a backdrop blur. Icons should be stroke-based (1.5px) using the `primary` color.

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `xl` (1.5rem) rounded corners.
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** Ghost style. `primary` text with no background, becoming `primary_fixed` on hover.

### Cards & Lists
*   **Forbid dividers.** Separate list items using `md` (0.75rem) vertical spacing.
*   **Cards:** Use `surface_container_low` for the card body. If the card contains an "Active" state, shift the background to `primary_fixed` (#9cf2e8).

### Input Fields
*   **Style:** Minimalist. A background fill of `surface_container_high` with a `sm` (0.25rem) bottom-only radius.
*   **Active State:** The bottom edge transforms into a 2px `primary` line.

### Progress Gauges (Academic Context)
Incorporate the "mint and honey" palette. Use `secondary_fixed` (#93f4e0) for progress tracks and `tertiary_fixed` (#f7e0b0) for milestone indicators.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins (e.g., 24px left, 32px right) for header sections to create an editorial feel.
*   **Do** lean heavily on `xl` (1.5rem) corner radii for large containers to soften the "academic" weight.
*   **Do** use `on_surface_variant` for helper text to reduce visual noise.

### Don’t:
*   **Don’t** use pure black (#000000) for text. Always use `on_surface` (#161c24) to maintain the soft, premium palette.
*   **Don’t** use standard 1px grey dividers (`#cccccc`). Use whitespace or a subtle background shift.
*   **Don’t** crowd the "superslim" navigation. Limit it to 4-5 key actions to maintain the minimalist aesthetic.
*   **Don’t** use high-intensity drop shadows. If it looks like a "button" from 2010, it's too heavy. Keep it ambient.