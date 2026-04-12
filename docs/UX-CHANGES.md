# UX Change Log — YH Prep Lab
_För Martin Hammarbergs UX-portfolio. Dokumenterar designbeslut och motiveringar._

---

## 2026-04-12 — Ordlista: kompakta termkort med inline kategori-badge

### Ändrat: kategori-badge på samma rad som termen
**Vad:** `.glossary-entry-cat` lyfts in i en ny `.glossary-entry-header` flex-rad tillsammans med `.glossary-entry-term`. Badge högerställd, förkortade labels (Alm / Py / Nät / UX). Kategorispecifika färger via `data-cat`-attribut: Allmänt=grå (`--surface-highest`), Python=mint (`--accent-soft`), Nätverk=blå-grå (`--surface-high`), UX=honung (`--honey`).
**Varför:** Kategoribadgen låg på en separat rad och slösade en hel radhöjd per kort — i ett grid med 2 kolumner och 40+ termer är det massiv onödig scrollning. Inline-badge + förkortning sparar ~30–40% vertikal yta per kort utan att tappa scannbarhet. Färgkodningen ger omedelbar kategoriskanning utan att läsa texten.
**Designbeslut:** Termen truncerar med `text-overflow: ellipsis` så badgen aldrig trängs bort (`flex-shrink: 0`). Alla färger från befintliga tokens — inga nya hexvärden.
**Stitch-princip:** "Information density should serve the user's scan pattern — not waste vertical rhythm on repeated metadata."

---

## 2026-04-12 — T03 + T04: Senaste-historik och URL-synk

### T03: "Senaste" — 3 senast besökta vyer
**Vad:** `renderNavDropdown()` renderar nu de 3 senaste navigeringarna från `localStorage` (`yh.recent-views`). Varje entry har label, ikon, action och eventuell `data-view`. Vid navigering (`nav-goto`, `nav-start-vr`, `nav-start-ls`) anropas `pushRecentView()` som deduplicerar på label och trimmar till max 3. Tom state visar "Ingen historik ännu".
**Varför:** Återvändande användare navigerar ofta till samma 2–3 vyer. Att visa dem överst i menyn minskar antal klick och stödjer habit-formation. SENASTE-sektionen är alltid synlig överst — den finns redan i T02-strukturen, men var en statisk placeholder.
**Stitch-princip:** "Navigation should reflect user behavior, not just app structure."

### T04: Center-pill med URL-synk (routing-driven)
**Vad:** `history.replaceState()` anropas vid `nav-goto` och uppdaterar URL-parametern `?view=X`. Center-pillen visar redan `pageLabels[page]` för sidor och "Verbal Reasoning"/"Språkliga färdigheter" för tränings-sessioner — det är nu routing-kopplat även på URL-nivå.
**Varför:** Deep linking — användaren kan dela länk till en specifik vy. Webbläsarens bakåt-knapp fungerar bättre. URL som sanningskälla (single source of truth) är grundläggande i webbrouting.
**Stitch-princip:** "URLs are part of the UX — they should always reflect current state."

---

## 2026-04-12 — T02: Ny overlay-navigering

### Ombyggt: Nav-meny med 7 sektioner + scroll
**Vad:** `renderNavDropdown()` ersatt med ny struktur: SENASTE (placeholder) · DAGLIGT · KURSINNEHÅLL · ANTAGNINGSPROV · PROV & TEST · REFERENS · KONTO. Menyn är scrollbar (`max-height: calc(100dvh - 70px); overflow-y: auto`). KONTO-knappen öppnar user-details-panelen programmatiskt.
**Varför:** Gamla nav var platt och kategoriserade inte syftet med varje vy. Den nya strukturen speglar mentala modeller: daglig träning, kursinnehåll, prov och referens är distinkt separerade — vilket minskar kognitiv belastning. Scroll istället för trunkering säkerställer att alla sektioner alltid är nåbara.
**Stitch-princip:** "Navigation should reflect user goals, not app structure."
**Kursinnehåll-poster** länkar temporärt till "Träna"-vyn tills T08 (kursvy per spår) är klar.

---

## 2026-04-12 — T00 + T00b: Globala micro-interactions + pill-höjd

### Lagt till: button:active tap-feedback (T00)
**Vad:** Global `button:active` regel: `transform: scale(0.97); opacity: 0.85; transition: 80ms`.
**Varför:** Varje knapptryckning saknade taktil återkoppling. Utan scale-effekt känns UI:t "dött" — användaren vet inte om trycket registrerades. 80ms är tillräckligt snabbt för att kännas responsivt utan att vara störande. Gäller alla knappar i appen automatiskt via global selektor.
**Stitch-princip:** Micro-interaction — "tactile feedback on touch/click creates confidence in the system."

### Ändrat: Pill-höjd 28px → 32px (T00b)
**Vad:** Alla pill-knappar (nav-pill, CTA, filter, subject-btns, quit-knappar) ökade från 28px till 32px. DESIGN.md uppdaterat.
**Varför:** 28px är svårtryckt på mobil (under rekommenderat 44px tap target, men 32px ger bättre balance). Visuellt sett gav 28px för komprimerade knappar — texten hade för lite andrum. 32px förbättrar läsbarhet och touch-ergonomi utan att bryta Stitch "superslim"-känslan.
**Påverkade klasser:** `.inline-controls button`, `.roadmap-actions button`, `.overview-cta-main`, `.overview-cta-secondary`, `.glossary-filter-bar button`, `.vr-quit-btn`, `.app-nav-ctx`, `.bento-cta`, `.bento-cta-sm`, `.subject-btn`.
**Stitch-princip:** "Superslim Navigation — pills must be touchable but not bulky."

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

### Fixat: Intern data bort från Roadmap
**Vad:** Tog bort "Stegplan"-sektionen som visade interna byggsteg (Stabil grund, Lugn testmotor etc.).
**Varför:** Innehållet var utvecklarens byggplan, inte användarens studieplan. En användare som ser "Stabil grund — Mobil först, användarbyte" förstår inte varför det är relevant för deras förberedelse. Cognitive noise utan värde.
**Stitch-princip:** Innehållshierarki — visa bara det som är relevant för användarens mål.

---

## 2026-04-11 — Mjukare accent-teal

### Justerat: Primärfärg `--accent` lightened
**Vad:** `--accent` ändrades från `#005c55` till `#1a7a70`. `--accent-container` från `#0f766e` till `#25907f`.
**Varför:** Den gamla primärfärgen associerades med sjukhusmiljöer — en klinisk, steril grön med hög kontrast men låg värme. Forskning om kognitiv belastning och färgtemperatur visar att varmare/mjukare teal ger ett mer inbjudande studieklimat. Stitch Academic Atelier ska kännas som ett bibliotek, inte en vårdcentral.
**Avvägning:** `--accent` används på både knappbakgrund (vit text ovanpå) och som textfärg på ljus bakgrund — kontrasten måste behållas. `#1a7a70` ger WCAG AA-kontrast på vit bakgrund. Vi splittar inte token:en — en token, ett beslut.
**Stitch-princip:** Tonal adjacency — ytor ska vara lugna och inbjudande, inte vibrerande eller kliniska.

---

## Designprinciper vi håller (sammanfattning)
1. **Stitch Academic Atelier** — teal primär, honey tertiary, neutrala ytor
2. **No-Line rule** — ingen 1px border för sektionering
3. **Superslim nav** — center-pill + dropdown, ingen bottom nav
4. **3 fontstorlekar** — XS/SM/MD, display enbart för hierarki-toppen
5. **Enhetlig pill-höjd** — **28px för alla pill-knappar** (nav och action, inga undantag)
6. **Tonal djup** — bakgrundsskiften skapar hierarki, inte skuggor
