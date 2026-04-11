# YH Prep Lab — Backlog
_Uppdateras löpande. Bocka av när klart. Ny session: läs denna fil först._

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
