# YH Prep Lab

Personlig träningsportal för:
- Nackademin UX antagningsprov
- IT-Högskolan IT-säkerhet antagningsprov
- Programmering 1/A-prövning

## Snabb användning på mobil

- Öppna appen i mobilen och börja på startsidan.
- Det viktigaste ligger överst i `Snabbstart idag`.
- Resten av översikten är medvetet hopfälld i utfällbara sektioner för att inte göra vyn för tät.
- Knapparna är kompakta men separerade för att minska feltouch.

## Dokumentation
- [Gemini-plan jämförelse](docs/gemini-gap-analysis.md)
- [MVP-checklista](docs/mvp-checklist.md)
- [Roadmap (stora steg)](docs/ROADMAP.md)
- [Repo-status och separeringsplan](docs/repo-status.md)
- [Claude-intake checklista](docs/claude-intake-checklist.md)
- [UX Notes](docs/UX_NOTES.md)
- [UX Build Log 2026-04-03](docs/ux-build-logs/2026-04-03.md)

## Funktioner i MVP
- Dagens 30-45 min-pass med Sprint A/B-logik
- Nedräkning till första provet (7 april 2026)
- Tre separata spår + gemensam kärna
- Snabbflikar: UX, IT, Prog, Logik
- Ready-o-meter per kategori
- Lägen: Lär, Drill, Tidsprov
- 2-min intervjukort (flerval + fritext) för personlig plan
- Frågebank med filter (spår, ämne, nivå, källnivå)
- Mockprov (60 min UX, 90 min IT-H Del 1+2, 45 min Programmering 1/A)
- Timer, autosparning och poängrapport med svaga områden + sektionsrapport
- Integrerad extern resurs: `public/python-minikurs.html` (öppnas från Prog-spåret)
- UX scenario-generator för case-träning
- Evidence-kort med tydlig märkning: Officiell/Sekundär/Community
- Export/import av progress (JSON-backup)
- PWA-grund med offline-cache

## Research och källor

- Officiella källor ska läsas först när provformat eller krav ska tolkas.
- Community-källor används separat och ska märkas som lägre tillförlitlighet.
- Frågebanken är byggd från mönster och tydligt markerade exempel, inte från påstådda läckta facit.
- Källnivåer i appen:
  - `Officiell`
  - `Sekundär`
  - `Community`

## Backup

- Använd `Exportera backup` på översiktssidan för att spara studiedata som JSON.
- Importera samma fil igen via filväljaren om du vill återställa sessioner och aktiv övning.
- Exporten innehåller studiepassen och eventuell aktiv session.

## Mockprov

- `Mockprov`-vyn låter dig välja prov och starta tidsprov direkt.
- Nackademin-liknande mockprov är 60 minuter.
- IT-Högskolan mockprov är 90 minuter och visar Del 1 + Del 2 separat.
- Programmering 1/A-mockprov är 45 minuter i tre delprov.
- Resultatet sparar poäng och svaga områden automatiskt när du avslutar.

## Kom igång
```bash
npm install
npm run dev
```

Öppna adressen som Vite visar i terminalen.

Om du vill visa sidan på mobilen:
- Använd den lokala nätverksadressen som Vite skriver ut i terminalen.
- Om du kör på samma Wi-Fi kan du öppna den adressen direkt i mobilen.

## Test och build
```bash
npm test
npm run build
npm run verify
```

## Visuell verifiering
```bash
# starta först preview i separat terminal
npm run preview -- --host 127.0.0.1 --port 4173

# kör sedan visuell audit (desktop + mobil screenshots till /tmp)
npm run audit:visual
```

## Verifiering

- `npm test` verifierar frågor, planering och poängräkning.
- `npm run build` verifierar att produktionen kan byggas utan fel.
- Rekommenderad manuell kontroll:
  - mobilvy utan layoutfel
  - tydlig första skärm utan överfulla kort
  - korrekt timer, autosparning och resultatsammanfattning
