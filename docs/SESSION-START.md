# YH Prep Lab — Session Start Prompt
_Uppdaterad: 2026-04-11. Klistra in detta i början av varje ny Claude Code-session._

---

## Läs in dessa filer direkt
```
docs/DESIGN.md       — designsystem, palette, grid, komponentregler
docs/UX-CHANGES.md   — UX-ändringslogg (Martins portfolio)
src/styles.css       — CSS-tokens och komponentstyles
```

## Projektkontext
- **Stack:** TypeScript + Vite SPA, inga frameworks. All rendering i `src/main.ts` via `render()` → `renderPage()`
- **Designsystem:** Stitch Academic Atelier — teal primär, honey tertiary, mjuk mint sekundär
- **Branch:** `claude/content-quality`
- **Deploy:** `git push live HEAD:main`
- **TS-check:** `node node_modules/.bin/tsc --noEmit --project tsconfig.json`

## Aktuellt versionsläge (uppdatera vid ny session)
- **Senaste commit:** Se `git log --oneline -1`
- **Live/server:** `f414843` — Fix CTA buttons (flera commits bakom — ej pushat)
- **Öppna punkter:** Se nedan

## Öppna punkter
- [ ] Push till server när stabil: `git push live HEAD:main`
- [ ] Dark mode toggle (lägst prio, uppskjuten av Martin)
- [ ] App-rename (lägst prio)

## Kända problem / fallgropar
1. **Service worker cache** — sidladdning visar gammal kod. Fix:
   ```js
   (async()=>{const r=await navigator.serviceWorker.getRegistrations();await Promise.all(r.map(x=>x.unregister()));location.reload(true)})()
   ```
2. **Preview server** — starta alltid via `preview_start` (name: "yh-prep-lab"), aldrig via Bash/npx direkt
3. **CSS-tokens med var()-kedjor** — om `getPropertyValue('--token')` returnerar `""` är det normalt (returnerar rå text). Kontrollera computed background via `getComputedStyle(el).backgroundColor` istället

## Designregler att aldrig bryta
- Inga 1px borders som sektionering (No-Line rule)
- Max 3 textstorlekar: `--text-xs` (0.68rem), `--text-sm` (0.78rem), `--text-md` (0.88rem)
- **Alla pill-knappar: 28px** — nav, action, CTA, subject-btns, allt. Inga undantag.
- Alla färger via CSS-tokens — inga hårdkodade hex i komponenter
- Track-färger: UX=honey (`--track-ux-bg`), IT-H=mint (`--track-it-bg`), Prog=grå (`--track-prog-bg`)
- Specificitetsfälla: `.inline-controls button` (0,1,1) > `.btn-lg` (0,1,0) — använd `.inline-controls .btn-lg` vid konflikt

## Versionshantering (multi-agent)
Se `VERSION` i projektroten. Format: `MAJOR.MINOR.PATCH-YYYYMMDD`
Bumpa PATCH vid varje commit, MINOR vid feature-batch, MAJOR vid strukturella förändringar.
