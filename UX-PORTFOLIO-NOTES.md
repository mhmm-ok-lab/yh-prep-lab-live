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

### 1. Navigation — från 9 till 4 primära sidor

**Problem:** Appen hade 9 sidor i navmenyn: Översikt, Spår, Frågebank, Mockprov, Research, Logik, Genomgång, Design, Roadmap.

**Observation:** Majoriteten av dessa är antingen:
- Utvecklarverktyg (Design/Roadmap) som studenten aldrig behöver
- Subsets av andra sidor (Logik = filtrerat Frågebank)
- Sällan-använt stöd (Research, Genomgång)

**Beslut:** Reducerade primär nav till **4 sidor**: Hem | Träna | Mockprov | Frågebank. Resten samlas under "Mer".

**Argument (Hick's Law):** Fler valalternativ = längre beslutstid. En student som öppnar appen i pendeltåget ska inte behöva scanna 9 alternativ. De 4 primära sidorna täcker 95% av användningsfallen.

**Argument (Jakob Nielsen, F-pattern):** Användare läser webbsidor i ett F-mönster. Det primära handlingsalternativet ska synas omedelbart — inte gömmas i en lista.

---

### 2. Hemskärmens hierarki — progression alltid synlig

**Problem:** Progressionsstaplarna var gömda i ett `<details>`-element ("Visa progression"). Studenten såg aldrig hur långt de kommit utan ett extra klick.

**Beslut:** Progressionsstaplar alltid synliga på hemskärmen, ovanför fold.

**Argument (Motivationspsykologi — Self-Determination Theory):** Synlig progress stärker upplevd kompetens, vilket är en av de tre grundläggande psykologiska behoven (kompetens, autonomi, tillhörighet). En app som döljer dina framsteg missar ett av de mest kraftfulla motivationsinstrumenten.

**Argument (Gamification):** Spel visar alltid XP-bars synliga — inte för att det är snyggt utan för att det driver beteende. Studieappar ska göra detsamma.

---

### 3. Lär-läget — svar + feedback EFTER att man svarat

**Problem:** Lär-läget visade `<details open>` med facit synligt *innan* studenten ens svarat. Hela lärmekaniken var bruten.

**Beslut:** Feedback (rätt/fel, förklaring) visas **först efter** att ett svar valts. Innan: "💡 Välj ett svar ovan — förklaring visas efteråt."

**Argument (Retrieval Practice Effect / Testing Effect):** Forskning (Roediger & Karpicke, 2006) visar att aktiv återhämtning av information – att försöka minnas svaret innan man ser det – ger signifikant bättre långtidsminne än passiv genomläsning. Att visa svaret direkt eliminerar denna effekt helt.

**Argument (Feedbackloop-design):** Effektiv feedback kräver ett gap: handling → respons. Om svaret syns innan handlingen kollapsar loopen.

---

### 4. Visuell rätt/fel-markering i Lär-läget

**Beslut:** Efter svar: korrekt alternativ lyser grönt, felaktigt valt alternativ lyser rött. Tydlig ✅/❌ header-text.

**Argument (Signal Detection Theory):** Färg + ikon + text = redundant kodning. Tre parallella kanaler gör att informationen "sticker" oavsett om du skimmar, läser eller bara ser en blixt av skärmen.

**Argument (Accessibility):** Röd/grön fungerar för de flesta men ska **aldrig vara enda signal** — vi lägger till ikon och text för att täcka färgblindhet (ca 8% av män).

---

### 5. Slumpad frågpool för variation

**Problem:** Provmallarna hade hårdkodade fråge-ID:n. Körde man samma prov tre gånger fick man exakt samma 10 frågor i exakt samma ordning — man memorerade order, inte kunskap.

**Beslut:** Lade in `question_pool` (stor lista) och `questions_count` (hur många slumpas) på MockExamSection. Varje körning drar ett nytt urval.

**Argument (Spacing + Interleaving):** Interleaving — att blanda vilka frågor du möter — är bevisad mer effektivt än blockad träning för långtidsinlärning (Kornell & Bjork, 2008). Slumpning implementerar interleaving automatiskt.

**Argument (Replaybarhet):** En app som ger samma upplevelse varje gång tröttnar man på. Variation håller motivationen uppe och gör att fler pass faktiskt körs.

---

### 6. Navigationsblockering under aktiv session — löst

**Problem:** När en session var aktiv låstes sidan: `showPageContent = !isSessionFocus`. Man kunde inte byta sida, inte ens läsa en annan fråga.

**Lösning:** Sessionskortet visas **ovanpå** sidan, inte **istället för** sidan. Navigationen fungerar alltid. Sessions-card är alltid synlig längst upp som en persistent "floating" komponent.

**Argument (User Control — Nielsen Heuristic #3):** Användaren ska alltid ha känslan av kontroll. En app som låser dig inne i en modal/vy skapar ångest, inte fokus — särskilt för användare med ADHD.

**Argument (Progressive Disclosure):** Sessionsinformationen är viktig men ska inte blockera allt annat. Den ska vara *tillgänglig* men inte *påtvingad*.

---

### 7. Sektionsetikett "Intervju" → "⚙️ Mina inställningar"

**Problem:** Profil-formuläret på hemskärmen var märkt "Intervju" — ett internt begrepp som ingen student förstår.

**Beslut:** Bytt till "⚙️ Mina inställningar" med ett standardiserat kuggjuls-ikon.

**Argument (Mental Models):** Användare har etablerade mentala modeller för ikoner och etiketter. Kugghjul = inställningar är ett av de mest genomsatta konventionerna i digital design (iOS, Android, webben). Att bryta mot det skapar friktion.

---

### 8. Träna-sida — logik-drill integrerad

**Problem:** "Logik" var en separat sida i navmenyn. Den innehöll bara en startknapp och en lista frågor — exakt samma innehåll som Frågebank med ett filter.

**Beslut:** Logik-drillet integrerades som ett eget avsnitt på Träna-sidan.

**Argument (Chunking):** Sidor ska representera mentala kategorier, inte tekniska datastrukturer. "Logik" är ett *träningsläge*, inte en *sida*. Det hör hemma under "Träna".

---

### 9. Mockprov — proven grupperade per skola

**Problem:** Dropdown-menyn med 15+ proven visade alla i en lång ogrupperad lista.

**Beslut:** Proved grupperas med `<optgroup>` per skola (Nackademin UX, IT-H, Programmering).

**Argument (Chunking + Visual Hierarchy):** En lista med 15 osorterade alternativ kräver sekventiell scanning. Grupperade alternativ minskar söktiden kraftigt — hjärnan processerar grupper, inte enskilda element.

---

### 10. Mobilanpassning som primärt scenario

**Kontext:** Appen används på telefon under pendling. Alla interaktiva element har `min-height: 40px` (taptarget). Primära actions (Starta pass) är stora knappar, `btn-lg`, som är lätta att trycka med tummen.

**Argument (Fitts' Law):** Tid att nå ett mål ökar med avstånd och minskar med storlek. Kritiska actions ska ha generöst tryckbara ytor, särskilt för rörlig användning (tunnelbana, pendeltåg).

---

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
Bygg ett eget projekt där varje designbeslut dokumenteras och motiveras med teori (Hick's Law, Fitts, Retrieval Practice, SDT osv). Undervisning + tillämpning i samma projekt = portföljcase som visar att du förstår *varför*, inte bara *hur*. Se befintliga designbeslut i detta dokument som startmaterial.

---

## Källor och forskning som stöd

- **Roediger & Karpicke (2006)** — The Power of Testing Memory: Basic Research and Implications for Educational Practice. *Perspectives on Psychological Science.*
- **Kornell & Bjork (2008)** — Learning, the massed versus interleaved practice of concepts. *Psychological Science.*
- **Deci & Ryan (1985)** — Self-Determination Theory — kompetens, autonomi, tillhörighet som grundläggande motivationsbehov.
- **Nielsen (1994)** — 10 Usability Heuristics for User Interface Design. *Nielsen Norman Group.*
- **Hick (1952)** — On the Rate of Gain of Information. *Quarterly Journal of Experimental Psychology.* (Hick's Law)
- **Fitts (1954)** — The information capacity of the human motor system in controlling the amplitude of movement. *Journal of Experimental Psychology.*

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
