# YH Prep Lab — Design System
_Based on Stitch Academic Atelier. Last updated: 2026-04-10_

---

## 1. Colour Palette

### Primary (Teal)
| Token | Hex | Användning |
|---|---|---|
| `--accent` | `#005c55` | Primary action, filled buttons, text on light |
| `--accent-container` | `#0f766e` | Gradient end, deeper teal |
| `--accent-soft` | `#b8ede8` | Recommended/active state backgrounds — mjuk mint |
| `--accent-soft-border` | `#96d9d2` | Subtle teal borders |
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

### Sekundärfärger (tillagda 2026-04-10)
| Token | Hex | Användning |
|---|---|---|
| `--secondary` | `#006b5d` | Sekundär teal (klarare än primary) |
| `--secondary-container` | `#90f1de` | Mjuk mint-bakgrund |
| `--secondary-fixed` | `#b8ede8` | IT-H track bg, progress pips — mjuk mint |
| `--secondary-fixed-dim` | `#96d9d2` | Hover på sekundära mint-element |
| `--honey` | `#f7e0b0` | Honey/amber — UX-spår pill, tertiary highlights |
| `--honey-dim` | `#dac496` | Hover på honey-element |
| `--honey-ink` | `#4c3e1a` | Mörk text på honey-bakgrund |
| `--surface-high` | `#e3e8f4` | surface-container-high |
| `--surface-highest` | `#dee2ee` | surface-container-highest, Prog-spår pill |
| `--outline-variant` | `#bdc9c6` | Ghost borders vid a11y-behov |

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

**En** definierad pill-höjd. Inga undantag.

| Pill-typ | Höjd | Padding | Font | Exempel |
|---|---|---|---|---|
| **Alla pills** | `32px` | `0 12px` | 0.68rem · uppercase | Nav-pill, CTA, subject-btns, Prov-start |

**Regel:** `border-radius: 999px` when text is short and centered. `height: 32px; min-height: 32px` — no exceptions.
**Obs:** Specificitetsfälla — `.inline-controls button` (0,1,1) slår `.btn-lg` (0,1,0). Använd `.inline-controls .btn-lg` vid behov.

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

---

## 7. Mörkt läge

Gäller alla teman. `<html data-scheme="dark">` sätts av JS (val: Ljust / Mörkt / Automatiskt i avatarmenyn, standard Automatiskt = `prefers-color-scheme`). Samma tokennamn som ljust läge, nya värden. Källan är blocket `html[data-scheme="dark"]` i `src/styles.css`; kontrollen `node scripts/check-dark-contrast.mjs` läser det. Inte `#000`, inte `#fff` på text.

### Mörkt läge — ytor och text
| Token | Hex | Kontrast / användning |
|---|---|---|
| `--bg` / `--surface` / `--bg-top` / `--bg-bottom` | `#14171a` | Text 14,4:1 |
| `--surface-low` | `#1a1e22` | |
| `--surface-container` | `#1f2428` | |
| `--card` / `--surface-2` | `#1c2024` | Kort, något ljusare än bakgrunden |
| `--card-bg` | `#23282d` | Fält, pill |
| `--field-bg` | `#171a1e` | |
| `--hover-bg` | `#292e34` | |
| `--surface-high` / `--surface-highest` | `#262b30` / `#2d3338` | |
| `--ink` / `--text-primary` | `#e6e6e6` | 13,1:1 |
| `--text-muted` | `#a0a4a8` | 6,5:1 |
| `--text-soft` | `#9aa0a6` | 6,2:1 |
| `--outline-variant` | `#4c5459` | Dekorativ kant |
| `--border` | `rgba(160,164,168,.22)` | Dekorativ kant |
| `--control-border` | `#6b7379` | 3,4:1 (fält, sekundärknappar; krav 3:1) |

### Mörkt läge — accent, honey, status
| Token | Hex | Användning |
|---|---|---|
| `--accent` | `#5dc4b8` | Text/länk/ikon (7,9:1 mot kort) |
| `--accent-container` | `#3a9d92` | Progress-slut |
| `--accent-soft` / `--secondary-fixed` / `--secondary-container` | `#1d4743` | Aktiv/rekommenderad yta |
| `--accent-soft-border` / `--secondary-fixed-dim` | `#2d6a63` | |
| `--accent-soft-ink` | `#a6ebe2` | Text på mint (7,7:1) |
| `--secondary` | `#6dd5c6` | |
| `--fill-start` / `--fill-end` | `#1b6f66` / `#15564f` | Fyllda knappar, countdown, aktiv flik |
| `--on-fill` | `#f2f2f2` | Text på fylld yta (5,3:1 / 7,6:1) |
| `--warm` | `#d6bd84` | Varm text |
| `--honey` / `--honey-dim` | `#40371d` / `#54471f` | Markerat LÄS-stycke, UX-pill |
| `--honey-ink` | `#f0dca8` | Text på honey (8,7:1) |
| `--danger` / `--ok` | `#f0847c` / `#6fcf8e` | Fel/rätt som text |
| `--danger-fill` / `--ok-fill` | `#a8332f` / `#2a7544` | Fyllda svarsalternativ (text `--on-fill` 5,9:1 / 5,0:1) |
| `--ok-bg/line/ink` | `#17301f` / `#2c5a3b` / `#8fe0aa` | Rätt-feedback |
| `--bad-bg/line/ink` | `#3a1d1d` / `#6b3434` / `#f4a5a0` | Fel-feedback |
| `--warn-bg/line/ink` | `#3a301a` / `#6a5a2c` / `#f0cf85` | Ledtråd, varning |
| `--info-bg/line/ink` | `#22274a` / `#3d4580` / `#b6bdfb` | Info |
| `--shadow` | svart 30–40 % | Skuggor syns knappt mot mörk yta; djup bärs av tonen |

Statustokens (`--ok-*`, `--bad-*`, `--warn-*`, `--info-*`, `--ok-bright`, `--bad-bright`, `--text-soft`, `--on-fill`, `--fill-*`) finns även i ljust läge (`:root`) och ersätter tidigare hårdkodade hex i komponenterna.

**Regler för nya komponenter:** inga hex/rgb i komponent-CSS, bara tokens. Vit text på fylld yta heter `var(--on-fill)`. Data-URI:er kan inte läsa tokens: ge dem en egen mörk variant under `html[data-scheme="dark"]`. Opacity på text sänker kontrasten, håll ≥ 0,85 på text.

