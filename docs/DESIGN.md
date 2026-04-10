# YH Prep Lab — Design System
_Based on Stitch Academic Atelier. Last updated: 2026-04-10_

---

## 1. Colour Palette

### Primary (Teal)
| Token | Hex | Användning |
|---|---|---|
| `--accent` | `#005c55` | Primary action, filled buttons, text on light |
| `--accent-container` | `#0f766e` | Gradient end, deeper teal |
| `--accent-soft` | `#9cf2e8` | Recommended/active state backgrounds |
| `--accent-soft-border` | `#80d5cb` | Subtle teal borders |
| `--accent-soft-ink` | `#00504a` | Text on mint backgrounds |

### Tertiary / Warm (Honey)
| Token | Hex | Användning |
|---|---|---|
| `--warm` | `#6d5d36` | Tertiary accent, warm labels |
| tertiary-fixed | `#f7e0b0` | Honey tag backgrounds (add as `--honey`) |
| tertiary-fixed-dim | `#dac496` | Hover on honey elements |

### Surfaces
| Token | Hex | Användning |
|---|---|---|
| `--bg` | `#f8f9ff` | Page base |
| `--surface-low` | `#eff4ff` | surface-container-low |
| `--surface-container` | `#e9eef9` | Section / widget bg |
| `--card` | `#ffffff` | Cards (surface-container-lowest) |
| surface-container-high | `#e3e8f4` | Slightly elevated areas |
| surface-container-highest | `#dee2ee` | Highest surface level |

### Text
| Token | Hex | Användning |
|---|---|---|
| `--ink` | `#161c24` | Primary text (on-surface) |
| `--text-muted` | `#3e4947` | Secondary text (on-surface-variant) |
| `--warm` | `#6d5d36` | Warning / warm text |

### Semantic
| Token | Hex | Användning |
|---|---|---|
| `--danger` | `#ba1a1a` | Errors |
| `--ok` | `#166534` | Success |

### Saknade tokens att lägga till (nästa pass)
- `--honey: #f7e0b0` — honey/tertiary-fixed
- `--honey-ink: #4c3e1a` — on-tertiary-container
- `--surface-high: #e3e8f4`
- `--surface-highest: #dee2ee`
- `--outline-variant: #bdc9c6`

---

## 2. Typography

**Ett typsnitt: Public Sans** (400, 500, 600, 700, 800)

### Tre funktionella storlekar
| Nivå | Storlek | Användning |
|---|---|---|
| **XS / Label** | `0.68rem` · 700 · uppercase · tracking 0.08em | Section headers, tags, pill-text, nav-pill |
| **SM / Body** | `0.78rem` · 400/600 | Muted text, sub-labels, sekundär info |
| **MD / UI** | `0.88rem` · 600/700 | Card body, tracknamn, kortbeskrivningar |

### Display (sparas till hierarki-toppen)
| Nivå | Storlek | Användning |
|---|---|---|
| **Card title** | `1rem` · 700 | h3 i kort |
| **Hero** | `1.4rem` · 800 | Prioritets-heading på Hem |
| **Stat** | `2rem` · 800 | Streak/Score siffror |

**Regel:** Liknande element = alltid samma storlek. Inget av "kanske 0.85 istället".

---

## 3. Pill-shapes — Höjdsystem

Två definierade pill-höjder. Inga andra är tillåtna.

| Pill-typ | Höjd | Padding | Font | Exempel |
|---|---|---|---|---|
| **Nav** | `28px` | `0 12px` | 0.68rem · uppercase | Center nav-pill, tags |
| **Action** | `36px` | `0 1rem` | 0.68rem · uppercase | CTA-knappar i kort |

**Regel:** `border-radius: 999px` only when text is short and centered. Never on multi-word buttons.

---

## 4. Grid & Layout

Från Stitch Curated Scholar:

```
max-width: 560px, centrerat, margin: 0 auto
padding horisontellt: 1rem (16px)
section-gap: 1.5rem (space-y-6)
card-gap: 0.75rem (gap-3)
2-kolumns widget-grid: gap 1rem
```

### Card-regler
- `border-radius: 1rem` (var(--radius-card))
- Bakgrund: `var(--card)` (#fff) eller gradient för primärkort
- Ingen 1px border som avdelare (Stitch No-Line rule)
- Ghost border vid tillgänglighetskrav: `outline-variant (#bdc9c6) @ 10% opacity`
- Shadow: ambient — `0 1px 3px rgba(22,28,36,0.06), 0 4px 16px rgba(22,28,36,0.04)`

---

## 5. Komponenter

### Knappar
- **Primary**: gradient `#005c55 → #0f766e` · vit text · `border-radius: var(--radius-btn, 12px)`
- **Secondary**: `var(--card)` bg · `rgba(63,73,71,0.18)` border · mörk text
- **Ghost/Pill**: `rgba(0,92,85,0.08)` bg · `var(--accent)` text · ingen border

### Spår-knappar (track-priority)
- Ej startad / pågår: `var(--surface-low)` — ingen border
- Recommended (★): `var(--accent-soft)` (#9cf2e8) + `var(--accent-soft-ink)` text
- Nära klar: `var(--accent-soft)` tint

### Stat-widgets
- Bakgrund: `var(--card)` · ambient shadow · ingen border
- Label: XS (0.68rem, uppercase)
- Värde: 2rem, 800 weight, `var(--accent)`
- Sub-text: SM (0.78rem), muted

---

## 6. Do's och Don'ts

**DO:**
- Tonal adjacency för djup (light → white kort)
- Ambient shadows, min 24px blur
- Whitespace framför fler element

**DON'T:**
- Inga 1px grå avdelarlinjer
- Inga hårda drop shadows (ser ut som 2010)
- Ingen ren svart text — alltid `var(--ink)` (#161c24)
- Ingen blandad typsnittsstorlek för liknande element
