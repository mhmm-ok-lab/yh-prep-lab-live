# YH Prep Lab — Backlog
_Uppdateras löpande. Bocka av när klart. Ny session: läs denna fil först._

---

## INITIATIV: UX Rework (ej påbörjat — kräver plan först)

**Status:** Planering pågår. Koda ingenting förrän planen är godkänd av Martin.

**Mål:** Ta bort komplexitet, ta bort dubbletter, återfå enkelheten. Appen ska kännas som ett verktyg — inte som ett system.

**Fas 1 — Inventering (research-agent):**
- Kartlägg alla sidor och funktioner
- Identifiera dubbletter (t.ex. Logik-drill i Träna + Frågebank + Logik-sida — är de samma?)
- Identifiera funktioner ingen använder
- Skapa ett funktionsträd: vad finns, vad gör det, vem behöver det

**Fas 2 — UX-analys (Martin + Claude):**
- Gå igenom funktionsträdet och avgör: behåll / slå ihop / ta bort
- UX-metoder att lära ut och ta ställning till: Jobs-to-be-done, Occam's razor för UX, Progressive disclosure
- Definiera de 3 kärnflödena användaren faktiskt behöver
- Martin väljer vilka metoder och beslut han håller med om → portfoliomaterial

**Fas 3 — Ny informationsarkitektur:**
- Ny sidstruktur och navigationshierarki
- Wireframes (text-baserade) godkänns av Martin
- Ingenting kodas förrän detta är klart

**Fas 4 — Implementation (kodagenter):**
- En agent per sida/komponent
- Utgår från godkänd plan, inte från nuvarande kod
- Design system (Stitch) gäller fortfarande

**Nästa steg:** Starta med Fas 1 — inventering. Ge agenten i uppdrag att kartlägga alla funktioner och returnera ett funktionsträd.

---

## Prio 1 — Designsystem

- [x] Alla pill-knappar: 28px, border-radius 999px
- [x] Spår-identitetsfärger på kursträning-knappar (honey/mint/grå)
- [x] No-Line rule: inga 1px borders för sektionering
- [x] Starta Drill / logik-drill: pill + kort text
- [x] Roadmap: ta bort intern byggdata (Stegplan), korta knappar
- [x] Ordlista: filter-pills + tonal kortbakgrund
- [x] Accent-färg mjukad: #005c55 → #1a7a70 (less clinical teal)
- [ ] Verbal Reasoning "Avsluta"-knapp: verifiera pill på aktiv session
- [ ] Språkliga färdigheter / Symbol Sudoku: kontrollera knappar

---

## Prio 2 — Innehåll & UX

- [ ] Ordlistan: pizza-box layout (horisontell scroll eller bredare kort) — låg prio
- [ ] Roadmap "Övergripande läge": texten "stora steg-planen" låter intern — omformulera till användarnytta
- [ ] Blandad svenska/engelska: Research, Verbal Reasoning, Symbol Sudoku har engelska rubriker — besluta: konsekvent engelska eller svenska?
- [ ] Frågebank: visa antal minuter på "Starta Drill" på annat sätt (t.ex. under knappen som muted text)

---

## Prio 3 — Features

- [ ] Push till live: `git push live HEAD:main` — gör när stabil
- [ ] Dark mode toggle — uppskjuten av Martin, lägst prio
- [ ] App-rename — lägst prio

---

## Kända tekniska fällgropar

- **Service Worker**: self-unregistrar på localhost — fixa: se `public/sw.js` och `registerServiceWorker()` i main.ts
- **CSS-specificitet**: `.inline-controls button` (0,1,1) > `.btn-lg` (0,1,0) — använd `.inline-controls .btn-lg`
- **Vite cache**: om CSS inte uppdateras, stoppa/starta om preview-servern + rensa `node_modules/.vite`
- **Python-spåret**: standalone design, inga Stitch-tweaks

---

## Språkstrategi (beslutad)

- UI-labels och navigation: **svenska** (Träna, Prov, Frågebank, Ordlista)
- AON-träningsnamn: **engelska** behålls (Verbal Reasoning, Symbol Sudoku — det är vad provet heter)
- Track-namn: originalnamn (Nackademin UX, IT-Högskolan IT-säkerhet)
- Knappar: **svenska** (Starta, Avsluta, Öppna, Återgå)
