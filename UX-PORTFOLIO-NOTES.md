# UX Portfolio – Designbeslut och argument
## YH Prep Lab · Studieapp för YH-antagningsprov
*Martin Hammarberg · 2026*

---

## Projektidentifikation

> ⚠️ **OBS för framtida agenter och läsare:**
> Det här dokumentet tillhör projektet **YH Prep Lab**.
>
> - **Rätt projektmapp:** `/Users/martinhammarberg/Documents/yh-prep-lab/`
> - **Git remote (live/produktion):** `https://github.com/mhmm-ok-lab/yh-prep-lab-live.git`
> - **Claude startas ibland från fel mapp:** `/Users/martinhammarberg/code/codex-pulse/` — det är ett *annat projekt* (Codex Pulse) och ska inte blandas ihop med detta.
>
> Alla kodfiler, commits och ändringar för YH Prep Lab ska göras med absoluta sökvägar till `/Users/martinhammarberg/Documents/yh-prep-lab/`.

---

## Projektöversikt

**Vad:** En single-page webb-app för att träna inför antagningsprov till Nackademin UX, IT-Högskolan IT-säkerhet och Gymnasiekurs Programmering 1/A.

**Kontext:** Byggd iterativt med AI-assistenter (Claude). Designbesluten har fattats aktivt av Martin med stöd av Claude som designrådgivare. Appen används på mobil (pendlingstid) och desktop.

**Målgrupp:** Primärt Martin själv – en vuxen person med ADHD som behöver tydlig struktur, korta interaktionsloopar och inga kognitiva fällor i UI:t. Sekundärt andra som förbereder sig för liknande YH-prov.

---

## UX-beslut och motiveringar

> De 10 ursprungliga besluten här är flyttade till den centrala, projektövergripande portfolion: `AgentHQ/UX-PORTFOLIO.md` (avsnitt "YH Prep Lab — UX-beslut"). Nya YH Prep Lab-specifika beslut kan fortsätta loggas här som arbetskopia, men det som ska visas upp i portfolio-syfte hör hemma i den centrala filen.

## Tekniska UX-kompromisser att notera

| Val | Kompromiss | Varför det är OK |
|-----|-----------|------------------|
| Inga animationer | Snabbare, lägre kognitiv last | Studieapp, inte underhållning |
| All data i localStorage | Ingen backend, offline-first | Enkel att använda, ingen inloggning |
| Frågor i TypeScript-filer | Svårt att redigera utan kod | Garerar typsäkerhet, snabb iteration |
| Substring-matchning för fritextsvar | Inexakt bedömning | Markeras tydligt som "manual review" |

---

## Designprinciper vi följt

1. **Tillgänglighet först** — redundant kodning (färg + ikon + text), tap-targets ≥ 40px
2. **Kognitiv last ner** — färre sidor, tydligare hierarki, "göm det sällan-använda"
3. **Motiverande feedback** — synlig progression, rätt/fel-markering, förklaring efter svar
4. **Retrieval practice** — svar visas INTE innan man svarat
5. **Variation** — slumpade frågepoolar mot memoriering av ordning
6. **Kontroll** — navigering aldrig blockerad, alltid möjlighet att byta kontext

---

## Framtida idéer (ej byggda än)

### Bilingval glossary med story-mnemonics
**Idé:** En interaktiv ordlista där varje programmeringsterm förklaras på *både svenska och engelska* simultant — så att användaren bygger kopplingen mellan modersmålet och det engelska fackspråket parallellt. Viktigt för prov som ges på engelska.

**Interaktion:** Termer i förklaringstexter är klickbara (tap på mobil → overlay-kort). Hover-states undvikna medvetet — mobile-first, alla interaktioner ska fungera med tummen.

**Story-mnemonics:** Alla termer förklaras genom *ett och samma berättelseunivers* (ett restaurangkök) för att skapa associativa minneskedjor. Exempel:
- `class` = receptet (mallen för hur rätten ska se ut)
- `object` = den faktiska rätten på tallriken (skapad från receptet)
- `variable` = en märkt ingrediensburk i kylen
- `function` = en kökteknik (tar något in, ger något tillbaka)
- `loop` = rör om tills pastan är klar
- `try/except` = smaka — om det är salt, rädda rätten
- `return` = skicka ut rätten till gästen
- `import` = kalla in en specialistkock från ett annat kök

**Argument (Dual Coding Theory — Paivio, 1971):** Information som kodas i *två* format (verbal + narrativ/visuell) lagras mer robust i långtidsminnet. En historia ger ett andra kodningsspår utöver den rena definitionen.

**Argument (Elaborative Interrogation):** Att koppla ett begrepp till ett konkret scenario ("varför är `class` ett recept?") tvingar aktiv bearbetning, vilket ger djupare inlärning än passiv läsning.

**Kategorier planerade:** Allmänt (universella programmeringskoncept), Python-specifikt, Nätverk/IT, UX.

---

### UX-metodkurs som eget portföljprojekt
Bygg ett eget projekt där varje designbeslut dokumenteras och motiveras med teori (Hick's Law, Fitts, Retrieval Practice, SDT osv). Undervisning + tillämpning i samma projekt = portföljcase som visar att du förstår *varför*, inte bara *hur*. Se de 10 migrerade designbesluten i `AgentHQ/UX-PORTFOLIO.md` som startmaterial.

---

## Källor och forskning som stöd

> Källorna för de 10 ursprungliga designbesluten finns nu samlade i `AgentHQ/UX-PORTFOLIO.md` under "Källor och forskning (samlat)".

---

*Dokumentet är levande — uppdateras när nya designbeslut fattas.*
*Nästa port: högskoleprov-spår, Matte 1–4 kurser med förklaringar.*

---

## Session-notering 2026-04-05 (Matrix Lab prototyp)

### Beslut: extern matrix-träning via separat labb före integration

**Problem:** Vi behöver snabbt testa realistiska matrix/mönster-övningar (3x3 med saknad ruta), men externa källor varierar i kvalitet och vissa blockerar inbäddning.

**Beslut:** Skapa en separat testsida (`public/matrix-lab.html`) utanför huvudflödet, med tydlig status per källa:
- `Embed: Ja` -> visa direkt i inbyggd frame.
- `Embed: Nej` -> visa tydlig fallback-knapp "Öppna i ny flik".

**UX-motiv:**
- Minskar risk för att huvudappen blir instabil eller rörig.
- Ger snabb validering av övningskällor innan vi bygger in dem i ordinarie träningsflöde.
- Tydlig "blocked by source"-feedback minskar frustration när en sida inte visas i appen.

**Dokumenterat i research:** `docs/matrix-resource-research-2026-04-05.md`
