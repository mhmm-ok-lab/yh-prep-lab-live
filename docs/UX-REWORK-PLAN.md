# UX Rework — Godkänd Plan
**Datum:** 2026-04-12 · **Status:** Godkänd av Martin · **Branch:** claude/content-quality

> Läs denna fil i varje session innan du rör appen. Den innehåller alla arkitektur- och UX-beslut Martin fattat. Ingen kod skrivs som strider mot denna plan utan nytt godkännande.

---

## Context
Martin har klarat **Nackademins antagningsprov** (som inkluderade AON — Anlagsövningsprov). Han studerar nu Programmering 1 (Python). Appen omdefinieras som ett generellt studieverktyg — inte bara antagningsprov-verktyg. Framtida scope: Högskoleprov, AI-etik, GDPR.

---

## Fas 1 — Inventering: Vad fanns (10 sidor)

```
1. Hem            Stats + CTA + progress + ranking + inställningar
2. Träna          AON (VR/LS/Sudoku) + Kursträning (3 spår) + Logik + UX-generator
3. Prov           Provväljare + provdetaljer
4. Frågebank      Filter (4 typer) + frågekortet
5. Research       Provteman + evidenskort
6. Logik          ← DUBBLETT (finns i Träna)
7. Genomgång      Lärläge + tidsbegränsad övning
8. Design         ← INTERN (designsystemdokumentation)
9. Roadmap        ← INTERN (projektstatus)
10. Ordlista      Kategorifilter + sökning + modal
```

---

## Fas 2 — Beslut per sida

| Sida | Beslut | Motivering |
|---|---|---|
| Hem | Omstrukturerad | Kärnjobb: daglig CTA + progress |
| Träna | Tas bort ur nav | Ersätts av overlay-meny + per-kurs-vyer |
| Prov | Behåll | Unikt jobb: full provsimulering |
| Frågebank | Förenklad filtervy | Spårfilter synligt, resten bakom "Fler filter" |
| Ordlista | Strukturen OK | Fas 4-fix: termkortens visuella design |
| Research | Flytta → per-kursvy | "Varför det fungerar"-kort, hopvikt |
| Logik | Ta bort som sida | Dubblett — lever i overlay-menyn under Antagningsprov |
| Genomgång | Engångs-onboarding | Visas vid första besöket, aldrig i nav |
| Design | Ta bort ur appen | Tillhör docs/DESIGN.md |
| Roadmap | Ta bort ur appen | Tillhör docs/BACKLOG.md |

---

## Fas 3 — Wireframes

### NAVIGATION: Overlay-meny med "Senaste"
Center-pill visar aktuell vy. Öppnar scrollbar overlay:

```
╔══════════════════════════════╗
║  SENASTE (de 3 senaste)      ║  ← alltid överst
║    Programmering 1 · Öva     ║
║    Hem                       ║
║    Frågebank (Python)        ║
╠══════════════════════════════╣
║  DAGLIGT                     ║
║    Hem                       ║
╠══════════════════════════════╣
║  KURSINNEHÅLL                ║
║    Programmering 1 (Python)  ║
║    UX-design                 ║
║    IT-säkerhet               ║
╠══════════════════════════════╣
║  ANTAGNINGSPROV              ║
║    Verbal Reasoning          ║
║    Language Skills           ║
║    Symbol Sudoku · Logik     ║
╠══════════════════════════════╣
║  PROV & TEST                 ║
║    Fullständiga prov         ║
╠══════════════════════════════╣
║  REFERENS                    ║
║    Frågebank · Ordlista      ║
╠══════════════════════════════╣
║  KONTO                       ║
║    Profil / Inställningar    ║
╚══════════════════════════════╝
↕ scroll vid behov
```

### HEM — återvändande användare
```
┌─────────────────────────────┐
│  [Avatar]  YH Prep Lab  [≡] │
├─────────────────────────────┤
│  FORTSÄTT DÄR DU SLUTADE    │
│  Programmering · Öva        │  ← minnesbaserat, senaste session
│  [Starta]                   │
├─────────────────────────────┤
│  Prog 31%  UX 62%  IT-H 47% │
│  🔥 12 dagar   📊 74%       │
└─────────────────────────────┘
```

### HEM — ny användare (empty state)
```
┌─────────────────────────────┐
│  [Avatar]  YH Prep Lab  [≡] │
├─────────────────────────────┤
│  VÄLKOMMEN                  │
│  Välj vad du vill börja med │
│  [Öppna träningsmenyn →]    │
├─────────────────────────────┤
│  Ingen träning ännu         │  ← progress greyed out
└─────────────────────────────┘
```

### RESULTAT — post-session state
```
┌─────────────────────────────┐
│  Session klar!              │
│  Programmering · Öva · 15 min│
├─────────────────────────────┤
│  Poäng: 7/8 (87%)           │
│  Svagt: Loopar              │
├─────────────────────────────┤
│  [Kör en till]  [Gå till Hem]│
└─────────────────────────────┘
```
*`renderLastResult()` finns — lägg till "Kör en till" + tydlig "Gå till Hem".*

### KURSVY (Prog / UX / IT-H — nås via overlay)
```
┌─────────────────────────────┐
│  ← Tillbaka                 │
│  PROGRAMMERING 1 (Python)   │
│  31% klart                  │
├─────────────────────────────┤
│  [Genomgång — Grunderna]    │
│  [Öva — 8 anpassade frågor] │
│  Se alla Python-frågor →    │
├─────────────────────────────┤
│  VARFÖR DET FUNGERAR [▼]    │  ← Research, hopvikt
└─────────────────────────────┘
```

### PROV
```
┌─────────────────────────────┐
│  VÄLJ PROV                  │
│  ★ Nackademin 2024          │  ← målspår-skola överst
│    IT-Högskolan 2024        │
│    Programmering 2024       │
├─────────────────────────────┤
│  [Valt prov: detaljer...]   │
│  [Starta prov]              │
└─────────────────────────────┘
```

### FRÅGEBANK
```
┌─────────────────────────────┐
│  [UX] [IT-H] [Prog] [Alla]  │  ← spårfilter synliga
│  [Fler filter ▼]            │  ← ämne/svårighet/källa dolda
├─────────────────────────────┤
│  Fråga 1  ·  UX  ·  Medel   │
│  [Visa svar ▼]              │
│  [Starta drill med urval]   │
└─────────────────────────────┘
```

### ORDLISTA
```
┌─────────────────────────────┐
│  [🔍 Sök begrepp...]        │
│  [Alla][Allmänt][Python][Nätverk][UX] │
├─────────────────────────────┤
│  TERM · KATEGORI            │  ← termkort: fix kontrast + läsbarhet
│  Kort förklaring…           │
└─────────────────────────────┘
```

### PROFIL (bakom avatar)
```
┌─────────────────────────────┐
│  Hur länge tränar du?       │
│  [30 min] [45 min] [60 min] │
│  Vad är svårast just nu?    │
│  [Tid ▼]                    │
│  Hur säker känner du dig?   │
│  [Medel ▼]                  │
│  Vilken skola siktar du på? │
│  [Nackademin ▼]             │
│  [Exportera] [Importera]    │
└─────────────────────────────┘
```

---

## UX Writing — Alla namnbyten

| Nuvarande | Nytt | Var |
|---|---|---|
| AON-träning | **Antagningsprov** | Overlay-meny, sektionsrubrik |
| Kursträning | **Kursinnehåll** | Sektionsrubrik |
| Bakgrund | **Varför det fungerar** | Research-kort |
| Lär-läge | **Genomgång** | Kursvy-knappar |
| Drillläge | **Öva** | Kursvy-knappar |
| Sessionslängd | **Hur länge tränar du?** | Profil |
| Blockertyp | **Vad är svårast just nu?** | Profil |
| Konfidenssnivå | **Hur säker känner du dig?** | Profil |
| Målprioritet | **Vilken skola siktar du på?** | Profil |
| general (filter) | **Allmänt** | Ordlista |
| network (filter) | **Nätverk** | Ordlista |

---

## Fas 4 — Implementationschecklista

**För agenter:** Markera `[x]` + agent-ID när du startar. `[DONE]` när klar.
Starta aldrig en uppgift vars beroenden inte är DONE.

```
ID    Status    Beroende    Uppgift
──────────────────────────────────────────────────────────────────────────────
T00   [DONE]    —           Global CSS: button:active { transform: scale(0.97); opacity: 0.85; transition: 80ms }
T00b  [DONE]    —           Design system: Pills 28px → 32px. Kontrast-tokens dubbelkollas (inga färgbyten).
T01   [DONE]    —           Ta bort Design + Roadmap ur routing och nav
T02   [DONE]    T01         Nav: Bygg overlay-meny (Senaste + 6 sektioner, scrollbar)
T03   [DONE]    T02         Nav: "Senaste" — 3 senast besökta vyer (localStorage)
T04   [DONE]    T02         Nav: Center-pill visar aktuell vynamn (routing-driven)
T05   [DONE]    T02         Hem: "Fortsätt där du slutade" CTA (senaste session)
T05b  [DONE]    T05         Hem: Empty state — "Välkommen, Öppna träningsmenyn →"
T05c  [DONE]    T05         Post-session: "Kör en till" + "Gå till Hem" i renderLastResult()
T06   [DONE]    T05         Hem: ta bort Spårprioriteringsrankning + Inställningar-sektion
T07   [DONE]    T02         Hem: flytta Inställningar → Profilvy (bakom avatar)
T08   [ ]       T01         Kursvy per spår: titel + Genomgång + Öva + snabblänk till Frågebank
T09   [ ]       T08         Kursvy: Research som "Varför det fungerar"-kort (hopvikt)
T10   [ ]       T08         Kursvy: UX-scenariogenerator gömd under UX-kursvyn
T11   [ ]       T02         Prov: målspår-skola visas överst
T12   [ ]       T02         Frågebank: Spårfilter synligt, resten bakom "Fler filter ▼"
T13   [ ]       T02         Ordlista: visuell fix av termkort (kontrast + läsbarhet)
T14   [ ]       T02         UX Writing: applicera alla labels enligt namnstrategin ovan
T15   [ ]       T07         Genomgång: engångs-onboarding-logik (visas vid första besöket)
T16   [ ]       T13,T14     UX-CHANGES.md: uppdatera med alla beslut + portfolio-motiveringar
```

**Parallella kluster:**
- **Kluster 0** (global CSS): T00, T00b — inga beroenden, kör direkt
- **Kluster A** (nav): T01 → T02 → T03, T04
- **Kluster B** (Hem): T05 → T05b, T05c, T06, T07 (efter T02)
- **Kluster C** (Kursvyer): T08 → T09, T10 (efter T01)
- **Kluster D** (Övriga sidor): T11, T12, T13 (efter T02, parallella)
- **Kluster E** (Text + Docs): T14, T15, T16 (efter resp. beroenden)

---

## Framtida UX-arbete (efter denna plan)

| Område | Metod |
|---|---|
| Micro-interactions | Motion design, animationsbibliotek |
| Accessibility-audit | WCAG AA, screen reader |
| Error states | Nätverk, inga resultat, timeout |
| User testing | Riktiga användare utanför Martin |
| Heuristisk utvärdering | Nielsens 10 heuristiker |
| Analytics | Tracking av var användare fastnar |
| A/B-testning | Alternativa layouter |
