# UX Change Log — YH Prep Lab
_För Martin Hammarbergs UX-portfolio. Dokumenterar designbeslut och motiveringar._

---

## 2026-04-10 — Navigation & Stitch Palette Cleanup

### Borttaget: Bottom tab navigation
**Vad:** Tog bort den fyra-tabbarsbottom nav (Hem · Träna · Prov · Bank).
**Varför:** Sidan hade dubbel navigation — både top nav och bottom nav. Stitch "superslim" filosofi handlar om att maximera innehållsyta. Top nav center-pill täcker allt via dropdown.
**Stitch-princip:** "Superslim Navigation — a floating, pill-shaped bar... Limit to 4–5 key actions to maintain the minimalist aesthetic."

### Lagt till: Färgkodad center-pill (reviderat)
**Vad:** Center-pill i top nav visar aktuell sida. Slutlig design: enhetlig ghost teal (`rgba(0,92,85,0.08)`) med accent-text, uppercase, 0.68rem, 28px höjd.
**Varför:** Pillen agerar som location indicator utan att vara brusig. Uppercase + wide tracking ger "academic label"-känsla som matchar Stitch.
**Stitch-princip:** "Label scale — use label-sm with all-caps and 0.05em letter-spacing for superslim navigation."

### Fixat: Spår-knappar (track priority buttons)
**Vad:** Gula (#fff9e8 + #e8ca77 border), orange och röda spår-knappar byttes ut mot neutrala teal-ytor.
**Varför:** Varma färger (gul/orange/röd) finns inte i Stitch Academic Atelier-paletten. De bröt mot den lugna, akademiska estetiken och såg ut som trafikljus.
**Stitch-princip:** "No-Line Rule — boundaries defined through background color shifts, not outlines."
**Resultat:** Recommended = mint (`#9cf2e8`), övriga = `surface-low` (#eff4ff).

### Fixat: Gränser (borders) borttagna från stat-widgets och CTA
**Vad:** Tog bort `1px solid` borders från stat-widgets och secondary CTA-knapp.
**Varför:** Stitch förbjuder 1px borders för sektionering. Djup skapas via tonala bakgrundsskiftningar och ambient shadows.
**Stitch-princip:** "1px solid borders are strictly prohibited for sectioning."

### Fixat: Typsnittssystem standardiserat
**Vad:** Reducerade antalet fontstorlekar. Satte explicit `font-size: 0.78rem` på `.muted`. Standardiserade knappar till 0.82rem → 0.68rem uppercase.
**Varför:** "0 pass genomförda" ärvde ~1rem från body och såg oproportionerlig ut bredvid 0.68rem labels.
**Resultat:** 3 funktionella storlekar: 0.68rem (labels), 0.78rem (muted/body), 0.88rem (UI/korttext).

### Fixat: Pill-höjder (konsistens)
**Vad:** Global `button { min-height: 44px }` åsidosatte explicit `height`-värden. Lade till `min-height` på varje pill-klass.
**Resultat:** Nav-pill = 28px, CTA-pills = 36px. Konsekventa, läsbara, inte "dagis-app"-tjocka.

### Text: "Mockprov" → "Prov" i hela appen
**Vad:** Uppdaterade pageLabel, nav dropdown, Prov-sidans rubrik, roadmap och walkthrough.
**Varför:** Konsekvens — "Mockprov" var halvt utbytt sedan tidigare commit. Engelska termer (Tests, Streak, Score) behålls per språkstrategi.

---

## Designprinciper vi håller (sammanfattning)
1. **Stitch Academic Atelier** — teal primär, honey tertiary, neutrala ytor
2. **No-Line rule** — ingen 1px border för sektionering
3. **Superslim nav** — center-pill + dropdown, ingen bottom nav
4. **3 fontstorlekar** — XS/SM/MD, display enbart för hierarki-toppen
5. **2 pill-höjder** — 28px nav, 36px action
6. **Tonal djup** — bakgrundsskiften skapar hierarki, inte skuggor
