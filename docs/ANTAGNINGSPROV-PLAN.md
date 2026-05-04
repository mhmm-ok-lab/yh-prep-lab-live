# Plan: IT-Högskolans antagningsprov – kortquiz med feedbackloop

> **För agenter:** Den här planen ligger också i projektet på `docs/ANTAGNINGSPROV-PLAN.md`.
> Kryssa av boxarna allt eftersom implementation fortlöper. Commit inte filen – den uppdateras löpande.



## Context

Martin förbereder sig för IT-Högskolans antagningstest. Han vill inte ha ett långt simulerat prov – han vill köra *flera korta quizzes* (max 10 min styck) som tränar ett ämne i taget, med direkt feedback och möjlighet att köra om utan att få exakt samma frågor.

**Kärnkrav:**
1. Ämnen är helt separerade – aldrig blandat Svenska + Nätverk i samma quiz
2. Varje quiz ≤ 10 minuter
3. Minst 2 körningar per ämne utan upprepade frågor
4. Frågepar: om man svarar fel finns det en liknande fråga som testar samma sak men från en annan vinkel
5. Möjlighet att köra en "till fråga" om ett ämne man hade fel på (samma princip som i andra delar)

---

## Vad som redan finns

| Resurs | Antal frågor | Räcker för 2 rundor? |
|---|---|---|
| Del 1 – Svenska (`iths-d1-sv*`) | 4 | **NEJ** – behöver 8 |
| Del 1 – Engelska (`iths-d1-en*`) | 4 | **NEJ** – behöver 8 |
| Del 1 – Matematik (`iths-d1-ma*`) | 16 | **JA** – slumpa 6–7 per runda |
| Del 2 – Nätverk (`iths-d2-*`) | 35 | **JA** – slumpa 8–10 per runda |

---

## Vad som behöver byggas

### Del 0 – Förberedelse (första agenten gör detta)
- [ ] **0** Kopiera planen till `docs/ANTAGNINGSPROV-PLAN.md` i projektet så den är synlig i git och för alla agenter

### Del A – Nytt frågecontent (data.ts)
- [ ] **A1** Lägg till 4 nya Svenska-frågor (`iths-d1-sv5`–`sv8`) som bildar par med sv1–sv4
  - Varje ny fråga testar samma grammatiska/stavnings-koncept som sin partner men formuleras annorlunda
- [ ] **A2** Lägg till 4 nya Engelska-frågor (`iths-d1-en5`–`en8`) på samma sätt

> **Koncept-par-principen:** sv1 testar syftning → sv5 testar syftning från annan vinkel. sv2 testar stavning → sv6 testar stavning av annat IT-ord. Etc.

### Del B – Uppdatera mock-mallar (data.ts)
- [ ] **B1** Uppdatera `mock-iths-d1-sv` att använda `question_pool: [sv1..sv8], questions_count: 4` (samma poolmekanism som Matte/Nätverk)
- [ ] **B2** Uppdatera `mock-iths-d1-en` att använda `question_pool: [en1..en8], questions_count: 4`
- [ ] **B3** Uppdatera `mock-iths-d1-ma` att slumpa 6 frågor (från existerande pool av 16), `questions_count: 6`, `total_minutes: 10`
- [ ] **B4** Uppdatera (eller skapa ny) `mock-iths-d2` att slumpa 8 frågor från pool av 35, `total_minutes: 10`

### Del C – Ny sida `"iths-antagning"` (main.ts)
- [ ] **C1** Lägg till `"iths-antagning"` i `Page`-unionen (`main.ts:17`)
- [ ] **C2** Lägg till label i `pageLabels` (`main.ts` ca rad 131): `"iths-antagning": "Antagningsprov"`
- [ ] **C3** Lägg till `case "iths-antagning": return renderIthsAntagning();` i `renderPage()` (`main.ts:2431`)
- [ ] **C4** Skapa `renderIthsAntagning()` – se skiss nedan

### Del D – Navigation in
- [ ] **D1** Lägg till knapp i `renderCourseView("iths_itsec")` (ca rad 2395):
  ```html
  <button class="primary course-action-btn" data-view="iths-antagning">
    Antagningsprov – Träna ämne för ämne
  </button>
  ```
- [ ] **D2** Wire event i eventdelegation (`main.ts` ca rad 1074):
  ```typescript
  if (target.dataset.view === "iths-antagning") { page = "iths-antagning"; render(); }
  ```

### Del E – Eventhantering för startknapparna
- [ ] **E1** `data-action="start-iths-sv"` → `chosenMockId = "mock-iths-d1-sv"; mode = "Lär"; startSession()`
- [ ] **E2** `data-action="start-iths-en"` → `chosenMockId = "mock-iths-d1-en"; mode = "Lär"; startSession()`
- [ ] **E3** `data-action="start-iths-ma"` → `chosenMockId = "mock-iths-d1-ma"; mode = "Lär"; startSession()`
- [ ] **E4** `data-action="start-iths-d2"` → `chosenMockId = "mock-iths-d2"; mode = "Lär"; startSession()`

> **OBS:** `startSession()` = den befintliga logiken bakom `data-action="start-mock"`. Kontrollera exakt flöde och återanvänd – inga nya session-mekanismer.

### Del F – Verifiering
- [ ] **F1** TypeScript-check: `node node_modules/.bin/tsc --noEmit --project tsconfig.json`
- [ ] **F2** Kör en Svenska-quiz (4 frågor, max 10 min), svara rätt och fel, kontrollera feedback + förklaring
- [ ] **F3** Kör Nätverk-quiz, svara fel, verifiera att förklaring visas korrekt
- [ ] **F4** Kör Svenska 2 gånger – verifiera att man inte får exakt samma 4 frågor i rad (poolmekanismen fungerar)
- [ ] **F5** Uppdatera `docs/UX-CHANGES.md`

---

## Sidskiss: `renderIthsAntagning()`

```typescript
function renderIthsAntagning(): string {
  return `
    <div class="grid">

      <!-- Header -->
      <section class="card span-12">
        <span class="track-pill track-iths_itsec">IT-säkerhet</span>
        <h2 style="font-size: var(--text-hero); margin-top: 0.5rem;">
          Antagningsprov – välj ämne
        </h2>
        <p class="muted">Välj ett ämne. Varje quiz är ≤ 10 min. Kör om för att få andra frågor.</p>
      </section>

      <!-- Del 1 – tre separata ämnen -->
      <div class="span-12">
        <p style="font-size: var(--text-xs); text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
          Del 1 – Allmänna ämnen
        </p>
      </div>

      <article class="card span-4">
        <h3>Svenska</h3>
        <p class="muted" style="font-size: var(--text-sm);">Grammatik, syftning, stavning · 4 frågor · ~8 min</p>
        <button class="primary" data-action="start-iths-sv">Starta →</button>
      </article>

      <article class="card span-4">
        <h3>Engelska</h3>
        <p class="muted" style="font-size: var(--text-sm);">Teknisk ordförståelse · 4 frågor · ~8 min</p>
        <button class="primary" data-action="start-iths-en">Starta →</button>
      </article>

      <article class="card span-4">
        <h3>Matematik</h3>
        <p class="muted" style="font-size: var(--text-sm);">Procent, algebra, ekvationer · 6 frågor · ~10 min</p>
        <button class="primary" data-action="start-iths-ma">Starta →</button>
      </article>

      <!-- Del 2 -->
      <div class="span-12" style="margin-top: 0.5rem;">
        <p style="font-size: var(--text-xs); text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
          Del 2 – Dator- och nätverksteknik
        </p>
      </div>

      <article class="card span-12">
        <h3>Nätverk & IT-säkerhet</h3>
        <p class="muted" style="font-size: var(--text-sm);">
          IP-adressering, OSI, protokoll, VPN, brandväggar · 8 frågor slumpas ur 35 · ~10 min
        </p>
        <button class="primary" data-action="start-iths-d2">Starta →</button>
      </article>

      <div class="span-12">
        <button class="ghost" data-action="course-back">← Tillbaka till IT-säkerhet</button>
      </div>

    </div>
  `;
}
```

---

## Designbeslut

- `span-4` × 3 = tre kolumner på bred skärm, staplat på mobil (existerande grid-pattern)
- Inga nya designtokens
- "Lär"-läget ger direkt feedback + förklaring efter varje svar – det är hela poängen
- Ingen full 90-min-simulering i det här steget – kan komma senare

---

## Kritiska filer

| Fil | Typ av ändring |
|---|---|
| `src/data.ts` | Nya frågor (A1–A2) + uppdaterade mock-mallar (B1–B4) |
| `src/main.ts` | Ny Page-typ (C1–C2), ny renderare (C3–C4), navigation (D1–D2), events (E1–E4) |
| `src/styles.css` | Inga ändringar förväntas |
| `src/types.ts` | Inga ändringar förväntas |
| `docs/UX-CHANGES.md` | Uppdateras efter implementation (F5) |
