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

## 2026-04-11 — Mjukare mint + direkta tokenväden

### Fixat: IT-H mint-färg för skarp
**Vad:** `--secondary-fixed` och `--track-it-bg` ändrades från `#93f4e0` (tropisk, vibrant) till `#b8ede8` (mjuk, akademisk).
**Varför:** Den tidigare minten "skär sig" mot den lugna akademiska paletten. Stitch Academic Atelier ska kännas som ett bibliotek, inte en tropisk app.
**Stitch-princip:** Tonal adjacency — ytor ska vara lugna och mjuka, inte vibrerande.
**Tekniskt:** Track-tokens (`--track-ux/it/prog-bg`) ändrades från `var()`-kedjor till direkta hex-värden för att undvika CSS custom property-upplösningsproblem i Vite-dev-miljön. En central ändring = ändring på alla ställen.

### Lagt till: VERSION-fil och SESSION-START.md
**Vad:** `VERSION`-fil (semver + datum), `docs/SESSION-START.md` (startprompt för nya sessioner).
**Varför:** Stöd för multi-agent-arbete — varje agent vet vilket versionsläge och vilka fällgropar som finns. Sessionen kan bytas utan att förlora kontext.

---

## 2026-04-11 — Designsystemaudit: pill-konsistens på alla sidor

### Fixat: Alla pill-knappar enhetligt 28px
**Vad:** Samtliga pill-shaped knappar i appen sätts till `height: 28px; min-height: 28px; border-radius: 999px`. Gäller: nav-pill, STARTA/PROV på hem, Starta X min på Prov-sidan, subject-btns på Träna, bento-cta-varianter.
**Varför:** Användaren upplevde inkonsistenta höjder (28/34/36/38px) som gav ett oprofessionellt intryck. Hem-pillen (28px) sattes som referens för alla övriga.
**Stitch-princip:** Enhetlighet — varje komponenttyp ska ha exakt ett storlekarsbeteende.
**Tekniskt:** Specificitetsproblem löstes via `.inline-controls .btn-lg`-selektor (0,2,0 > 0,1,1 för `.inline-controls button`).

### Fixat: Spår-identitetsfärger på KURSTRÄNING-knappar
**Vad:** Subject-btns fick track-specifika bakgrundsfärger via `[data-track]`-selektorer: UX=honey (`--track-ux-bg`), IT-H=mint (`--track-it-bg`), Prog=grå (`--track-prog-bg`).
**Varför:** Tidigare var alla spårknappar identiska gröna. Spårfärgerna är en core design-signal i Stitch Academic Atelier — de ska förstärka spåridentitet konsekvent.
**Stitch-princip:** Track identity tokens — direkta hex-värden, inga var()-kedjor.

### Fixat: No-Line rule — mock-section-item och subject-card
**Vad:** Tog bort `border: 1px solid var(--border)` från `.mock-section-item` och `.subject-card`. Lade till `background: var(--surface-low)` på mock-section-item.
**Varför:** 1px borders för sektionering bryter mot Stitch No-Line rule. Tonal bakgrund skapar hierarki utan linjer.
**Stitch-princip:** "1px solid borders are strictly prohibited for sectioning."

### Fixat: Service Worker — localhost dev-caching
**Vad:** SW self-unregistrar och rensar alla caches på localhost. `main.ts` hoppar över SW-registrering på localhost.
**Varför:** SW:n fångade alla requests med cache-first, inklusive Vite CSS-moduler — förhindrade CSS-uppdateringar i dev-läge.
**Tekniskt:** `sw.js` fick ett localhost-block i toppen. `registerServiceWorker()` i main.ts fick hostname-check.

### Standardiserat: Knapptext-konsistens
**Vad:** "Starta träning" → "Starta" på alla bento-kort i Träna-sidan.
**Varför:** Tre olika texter (Starta, Starta träning, Öppna) för liknande åtgärder bröt mot konsekvens-principen. Kortare text + pill = bättre fit.

---

## Designprinciper vi håller (sammanfattning)
1. **Stitch Academic Atelier** — teal primär, honey tertiary, neutrala ytor
2. **No-Line rule** — ingen 1px border för sektionering
3. **Superslim nav** — center-pill + dropdown, ingen bottom nav
4. **3 fontstorlekar** — XS/SM/MD, display enbart för hierarki-toppen
5. **Enhetlig pill-höjd** — **28px för alla pill-knappar** (nav och action, inga undantag)
6. **Tonal djup** — bakgrundsskiften skapar hierarki, inte skuggor
