# UX Change Log — YH Prep Lab
_För Martin Hammarbergs UX-portfolio. Dokumenterar designbeslut och motiveringar._

---

## 2026-10-10 — DTK-rundor varvar diagram/karta och tabell

**Vad och varför.** En testare (Martins systerson) upplevde att DTK "bara har tabeller". Banken har 60 tabelluppgifter mot 36 med diagram/karta, och grupperna slumpades, så de flesta rundor blev nästan bara tabeller, till skillnad från provet.

**Före.** Slumpad ordning, i praktiken mest tabeller. **Efter.** Efter de osedda uppgifterna på provnivå varvas grupperna: diagram/karta, tabell, diagram/karta … så att varje runda blir ungefär hälften av varje. Övriga delprov påverkas inte.

**Stitch-princip.** Ingen visuell ändring. **UX-teori.** Representativ träning (transfer): övningen ska spegla provets blandning av underlag.

---

## 2026-10-10 — DTK på provnivå: täta underlag, flera frågor per figur

**Vad och varför.** DTK i appen var för lätt: små tabeller där svaret syns direkt. På provet ligger svårigheten i att HITTA rätt uppgift i ett tätt underlag. 12 nya egna uppgifter (3 lätt, 3 medel, 6 svår) på fyra underlag med tre frågor vardera: staplar + linje med två y-axlar (höger axel i tusental, börjar på 40), en tabell med 10 kommuner, 6 kolumner och två fotnoter, en schematisk karta med klassindelad ton, och 100 %-staplar där totalerna bara står under diagrammet.

**Före.** Små tabeller på ca 4 rader, enkla diagram, ingen nivå. **Efter.** Nivåetikett Lätt/Medel/Svår vid rubriken (samma mönster som MEK/LÄS/ELF). De nya underlagen delas ut först, grupp för grupp. Tabellunderlaget har rubrik och fotnoter i en ruta; kommunkolumnen står kvar när tabellen scrollas i sidled på mobilen. Felalternativen bygger på typiska misstag: fel axel, missad fotnot, fel bas för procent, andel i stället för mängd.

**Stitch-princip.** Underlagen ritas med currentColor och palett-tokens (fungerar i mörkt läge), textstorlekar från skalan, inga avdelarlinjer, och tonade ytor i stället för ramar. **UX-teori.** Önskvärda svårigheter (Bjork): träning ska likna provets svårighet. Signaturen ”hitta i underlaget” tränas bara med täta underlag.

---

## 2026-10-10 — Pausknapp i övningarna

**Vad och varför.** Martin pluggar hemma och Juni (8) vill prata ibland. Utan paus räknades avbrottet som tid på frågan, så tempomätningen ("för långsamt") blev missvisande.

**Före.** Ingen paus; avbrott = förstörd tempomätning. **Efter.** En "Paus"-pill i toppbaren (vänster om användarknappen) när en HP-övning pågår. Paus visar en helskärm "Pausad – Tiden står still och frågan är dold" med "Fortsätt". Vid Fortsätt flyttas frågans och passets starttid fram lika länge som pausen, så tempot blir rätt. Frågan döljs så att pausen inte blir betänketid.

**Stitch-princip.** Nav-pill 28 px, text-sm, palett-tokens; helskärmen på bakgrundsytan utan linjer. **UX-teori.** Designa för avbrott i verklig miljö (kontext i hemmet), och mätdata som speglar faktisk prestation.

---

## 2026-10-10 — Mobil: ny fråga börjar högst upp, smalare toppbar

**Vad och varför.** Martin på iPhone: efter "Nästa" hamnade han långt ner (där förra frågans förklaring slutade) och fick scrolla upp. Toppbaren var för fet och tog för mycket höjd, så frågan fick mindre plats.

**Före.** Scrollpositionen behölls mellan frågor. Toppbar 56 px, innehållet började 64 px + marginal ned, kontext-pill 32 px och 0,85 rem i fet stil på mobil. **Efter.** Nästa/Föregående/Hoppa över (alla HP-övningar och formelträningen) scrollar till toppen. Toppbar 44 px, innehållet börjar 48 px ned, kontext-pill 28 px (nav-pillens höjd enligt DESIGN.md), text-sm och vikt 600, hem- och användarknapp 32/28 px.

**Stitch-princip.** Pill-höjd 28 px för nav enligt designsystemet (pillen var 32 px, alltså fel tidigare); textstorlek från skalan. **UX-teori.** Fittsavstånd och fokus: ny uppgift ska börja där blicken är; mer vertikal yta åt innehållet minskar scroll och kognitiv belastning.

---

## 2026-10-10 — Verbalt på provnivå med synlig svårighetsgrad

**Vad och varför.** Martin tyckte att MEK, LÄS och ELF var för korta och lätta jämfört med riktiga provet. Nya egna uppgifter i tre nivåer (ca 3 lätt, 4 medel, 3 svår per delprov), bl.a. en lång LÄS-text på ca 850 ord och MEK med två luckor som måste stämma med varandra.

**Före.** Ingen nivåangivelse; alla uppgifter såg likadana ut. **Efter.** En diskret etikett "Lätt / Medel / Svår" bredvid övningens rubrik. Äldre uppgifter räknas som Lätt. De nya uppgifterna delas ut före de äldre.

**Stitch-princip.** Befintlig `.hp-chip` i neutral ton (samma som "Inte provat"), ingen ny storlek eller färg. **UX-teori.** Kalibrering: att veta svårighetsgraden gör ett fel på en svår uppgift informativt i stället för nedslående (attribution), och liknar provets blandning.

---

## 2026-10-10 — "Kopiera min status för chatten"

**Vad och varför.** Martin pluggar på iPhone men diskuterar nästa steg med Claude på Macen, och progressen ligger bara lokalt i telefonen. Synk via GitHub-nyckel kändes för omständligt mitt i pluggandet.

**Före.** Inget sätt att visa sin progress för chatten utan att beskriva den själv. **Efter.** En liten länkknapp under "X av 8 redo" på HP-hem kopierar en textsammanfattning (status, resultat och tempo per delprov, formler, mattediagnos, senaste tre provpassen, svagaste delprov). Knappen visar "Kopierat ✓ klistra in i chatten" i 2,5 s.

**Stitch-princip.** Befintlig länk-pill (28 px), inga nya tokens eller storlekar. **UX-teori.** Minsta möjliga interaktionskostnad (ett tryck + klistra in) och att externalisera status så att samtalet utgår från data, inte från minnet.

---

## 2026-10-10 — Provpass-logg: ELF får lämnas tomt

**Vad och varför.** Studera.nu publicerar de verbala passen utan ELF (upphovsrätt). Loggen krävde ändå ELF, så Martin hade tvingats skriva 0, och då hade ELF felaktigt pekats ut som svagaste delprov.

**Före.** Alla fyra verbala fält obligatoriska. **Efter.** ELF får lämnas tomt, med texten "lämna tomt om passet saknar ELF" under fältet. Ett tomt ELF påverkar inte utvecklingen eller "lägg mest tid här".

**Stitch-princip.** Ingen ny komponent, samma fält och textstorlek. **UX-teori.** Felförebyggande: designen ska inte tvinga fram data som förvränger feedbacken.

---

## 2026-10-10 — π får egen luft i formler

**Vad och varför.** Martin: π "klistras ihop" med r, gångerpunkten och siffror och är svårt att tyda. Orsak: Public Sans saknar π, så webbläsaren lånar tecknet från ett reservtypsnitt utan sidluft, och formelrutan var extra fet (800).

**Före.** "A = π · r²", "π·3²" och "9π cm²" flöt ihop, särskilt i den feta formelrutan. **Efter.** Varje π läggs automatiskt i en span (`.math-sym`) med 0,12 em luft på sidorna och normal vikt, överallt i appen (formelträning, påminnelsekort, matteövningar). Formelrutan har vikt 700 i stället för 800.

**Stitch-princip.** Fortfarande ett typsnitt och samma textstorlek, inget nytt token. Vi löste avståndet, inte typsnittet: minsta ändring som tar bort problemet.

**UX-teori.** Läsbarhet (legibility): tecken som ska skiljas åt behöver mellanrum. Mindre visuellt brus minskar kognitiv belastning när man räknar i huvudet.

---

## 2026-10-09 — Provpass-logg: se var plugg-tiden gör mest nytta

**Vad och varför.** Martin gör gamla högskoleprov (studera.nu) men fick inte ihop resultaten per delprov, så det var oklart vad han skulle plugga mer på. Nu skriver han in antal rätt per delprov och ser utvecklingen.

**Före.** Inget ställe att samla provresultat. **Efter.** Kortet "Provpass-logg" på HP-hem (sektionen "Gamla prov", samma startkort som övriga). Vyn har: utveckling per delprov (förkortning som rubrik, förklaring under, små staplar, procent rätt) där det svagaste delprovet (lägst snitt de tre senaste passen) har varningsyta och texten "lägg mest tid här"; formulär (typ, prov som fritext, datum, antal rätt med max under varje fält, validering 0..max); senaste passen med "Ta bort" (med bekräftelse). Sparas i localStorage.

**Stitch-princip.** Tonal Layering och No-Line: vita kort med skugga, varningsyta i stället för linje. Tre textstorlekar, pill 36 px, bara palett-tokens (mörkt läge via samma tokens).

**UX-teori.** Feedback som styr handling (resultatet pekar ut nästa steg), recognition over recall (förkortning + förklaring, max synligt vid fältet), felförebyggande (validering mot max, bekräfta borttagning), Gestalt likhet (samma kort som övriga delprov).

---

## 2026-10-09 — HP-hem: en vy med indikatorer i stället för parallella sidor

**Vad och varför.** Martin: "för mycket text på trånga utrymmen" och "för många versioner av samma sak". HP-hem hade tre olika korttyper (mint, vit, halvbredd), åtta delprov spridda i fel ordning, en separat sida "Är jag redo?" som upprepade samma delprov och en versalstatus som skrek. Han hittade inte var man startar Kvantitativa resonemang (NOG).

**Före.** Plan, raden "Är jag redo?" (egen sida), två statkort för ord, LÄS-kort (mint, tre rader text), MEK och ELF halvbredd, två knappar, Formelträning, matteträning som 2 × 2-rutnät (XYZ, KVA, NOG, DTK) långt ned, Guide. Statusrader i VERSALER.

**Efter.**
- Ett startkort för alla delprov: rubrik (förkortningen) + "Starta ›", en rad förklaring, statuschip (○ Inte provat / ▲ Under målet / ✓ Redo) och senaste resultat i kort form ("7/10 · 18 s"). Hela kortet är träffyta (minst 44 px). Statusen kommer från `computeReadiness`, logiken är oförändrad.
- Sektionerna "Matte" (Formelträning, NOG, KVA, DTK, XYZ, Mattediagnos), "Läsning och språk" (LÄS, MEK, ELF), "Ord", "Guide och resurser". Ordningen följer prioriteringen och är fast (sorteras inte efter status) så att positionen går att lära sig.
- Sidan "Är jag redo?" och raden på HP-hem är borta. I stället en enda rad under "I dag": "0 av 8 redo · 8 inte provade" (inte klickbar). `hp-readiness.ts` är kvar.
- Övningar: "Formelträning" som rubrik (tidigare två rader), "Påminn mig ›" i stället för en avklippt titel.

**Stitch-princip.** Tonal Layering och No-Line: alla kort vita med ambient skugga, ingen linje. Bara de tre textstorlekarna, chip i befintliga tokens, mörkt läge via samma tokens.

**UX-teori.** F-mönster/scannability (rubriker och första orden), visuell hierarki (tre nivåer), Gestalt likhet (samma kort för samma sak) och närhet (status vid kortet, inte på en annan sida), Hicks lag (en vy, ett val), progressive disclosure (detaljer bakom Strategi), signifiers (Starta ›).

## 2026-10-08 — HP: fulla namn, läsförståelsestrategi och prioriterad plan

**Vad och varför.** Martin (skrev provet 1995) känner inte igen förkortningarna ORD, LÄS, MEK, ELF, XYZ, KVA, NOG och DTK och är långsam i läsförståelse. Tre ändringar: (1) fulla namn överallt, (2) en sökläsningsstrategi för svensk och engelsk läsförståelse, (3) en plan som prioriterar poäng per timme.

**Före.** Kort, rubriker, progress ("KVA 1/10"), "Är jag redo?", planens uppgifter, guiden och resurserna använde förkortningar som huvudetikett. Läsförståelsens Strategi-panel hade sju tips och ingen introduktion; tiden syntes bara som en räknare. Planen hade en LÄS-text varje dag, MEK och ELF varannan dag och matte enligt Lär om.

**Efter.**
- Fulla namn från en namnkarta (`src/hp-names.ts`), korta namn där 375 px inte räcker ("Jämförelser 1/10", "Engelska fråga 1/4"). Förkortningen står som liten dämpad text bara i "Är jag redo?"-raden ("Kvantitativa jämförelser · KVA"). Text från datafiler skrivs ut vid rendering.
- "Läs inte texten — leta i den": sex steg plus fokus-rad i Strategi-panelen och i guiden. Introskärmen "Så läser du" visas första gången, påminnelsen "Nyckelord → leta → läs 2–3 meningar" ligger ovanför frågan de tre första passen, och en vänlig honungsfärgad banner visas när frågans tid (2 min, lucka 1 min) passerats. Banner och påminnelse påverkar inte poäng och stänger inget.
- Planen: formelträning och en läsförståelsetext varje dag (växelvis svensk och engelsk, "Använd sökläsning, 2 min/fråga"), matterotation med kvantitativa resonemang och jämförelser oftast, meningskomplettering varannan dag, ingen ordförståelse. Stegen och högst 4 uppgifter per dag är oförändrade.

**Stitch-princip.** No-Line och Tonal Layering: banner och påminnelse är tonade ytor utan linje (honey respektive accent-soft), introskärmen använder kort på `--card` med ambient skugga. Bara de tre textstorlekarna, befintliga tokens och pill-höjderna 28/36 px. Mörkt läge via samma tokens.

**UX-teori.** Nielsens heuristik 6, igenkänning före minne: fulla namn tar bort uppslagningen. Mindre belastning på arbetsminnet (ADHD): ett nyckelord och ett nästa steg i stället för en hel strategi vid frågan. Tidsbannern är ett riktmärke, inte ett straff.

## 2026-10-05 — HP: ELF och MEK i appen (verbala delen komplett)

**Vad:** Två nya övningar. **ELF** (engelsk läsförståelse) återanvänder LÄS-träningen med en annan källa: samma växlare Frågan ⇄ Texten, Strategi, Ledtråd, nytt försök, Visa svar, `why` per alternativ, felanalys, repetitionskö och sammanfattning. Rubrik "ELF – engelsk läsförståelse · [titel]". Tidsbudget 2 min per fråga, i lucktexter ("Gap-fill") 1 min per lucka. I lucktexter ligger stycket med luckan direkt ovanför frågan med aktuell lucka markerad. **MEK** (meningskomplettering) är en ny drill: en uppgift per skärm, luckorna som numrerade rutor, fyra alternativ som "A  ord1 – ord2". Efter ett val sätts de valda orden in i luckorna, rätt i grönt och fel i rött, så man hör hur meningen låter; efter fel visas också meningen med rätt ord. 10 uppgifter per pass, tempomål 50 s per uppgift. På HP-hem ligger MEK och ELF som två kort i en rad under LÄS-kortet, och "Din plan" tar upp "10 MEK" och "En ELF-text" varannan dag (MEK udda dagar, ELF jämna; max 4 uppgifter per dag).

**Varför:** ELF och MEK var de sista delproven som saknades. Martin har provet 18 okt och tränar på mobilen; samma gränssnitt som LÄS betyder att det redan är inlärt och att det inte kostar nya beslut. Texten med de insatta orden gör MEK till ett språkligt "låter det rätt?"-test i stället för en gissning, och Martin ser direkt varför ett samband inte fungerar. Lucktexter kräver omgivningen: därför ligger stycket tätt vid frågan i stället för bakom en växlare.

**Före/efter:** Före: ORD, LÄS och matte. Efter: ORD, LÄS, MEK och ELF samlade (verbala delen), plan med 3–4 rader per dag. Plan ovanför vecket i 375 × 812 (Se hela planen slutar vid ca 600 px), ingen sidledsscroll (scrollWidth 375) i ELF, gap-fill, MEK, sammanfattning och HP-hem, ljust och mörkt läge. Nya färgpar saknas: bara befintliga tokens (`--accent-soft`/`--accent-soft-ink`, `--ok-bg/ok-ink`, `--bad-bg/bad-ink`), kontrollerade med `scripts/check-dark-contrast.mjs` (62 par).

**Stitch-princip:** No-Line (rutor och kort med ton i stället för linjer), 3 fontstorlekar, pill 28/36 px som i LÄS, bara palettens tokens. Teori: se HP-UX-SPEC beslut 28 (Gollwitzer, Mayer, Kornell/Bjork).

---

## 2026-10-05 — HP: "Din plan" (dagens uppgifter överst på HP-hem)

**Vad:** "Rekommenderat nu" är ersatt av "I dag · dag N av 13 · [steg]" direkt under nedräkningen, med 2–5 rader. Varje rad: avbockningsruta (44 px träffyta) · titel (och en rad om vad uppgiften är) · "Varför?" (en mening, öppnas på tryck) · en Starta-knapp (36 px) som startar övningen direkt (ORD, LÄS, mattediagnos, matteträning i rätt delprov, påminnelsekort + pass, Externa resurser, flashcards). Programmet är datumstyrt, 5–17 okt: Mät (diagnosen), Lär om (ett område per dag, svagast först, från senaste diagnosens Lär om och sedan Repetera), Generalrepetition (sön 11 okt, gammalt prov på papper, manuell avbockning), Laga (svagaste delprovet, ny diagnos 14 okt) och Landa (korta pass, flashcards, vila och packa 17 okt). Alla dagar t.o.m. 16 okt har dagens 10 ord och en LÄS-text. Uppgifter bockas av automatiskt när övningen är gjord i dag (≥ 10 ord, en LÄS-text, diagnos, matteträning i rätt delprov); papper och vila bockas manuellt. Ogjorda uppgifter (utom ord och LÄS) flyttas fram som "Från i går" (max 2, bara två dagar bakåt, äldre släpps tyst). När allt är klart står det "Klart för i dag ✓" och en valfri extra-knapp till den gamla rekommendationen. "Se hela planen" listar alla 13 dagar grupperade per steg, dagens markerad ("I dag") och avbockade dagar märkta. Efter 18 okt visas "Provdag klar" och den gamla rekommendationen. Datum, avbockningar och dagens frysta lista sparas i `yh.hp-plan` (try/catch). Logiken är rena funktioner i `src/hp-plan.ts` med tester; `?plandate=YYYY-MM-DD` simulerar ett datum (osynlig för användaren, sparar inget).

**Varför:** Martin har ADHD och tidsblindhet; "vad ska jag göra nu?" är det som kostar mest. En färdig plan flyttar planeringen utanför hans huvud (extern struktur) och en konkret uppgift med knapp gör avsikten till en handling (implementation intentions, Gollwitzer: "om det är dag 3 gör jag Lär om: Algebra"). Inget dåligt samvete: missade uppgifter flyttas fram i stället för att bli röda, och dagliga pass räknas inte som skuld. "Varför?" ger skäl till uppgiften utan att fylla första vyn.

**Före/efter:** Före: en rekommendation (en knapp + skäl) och en lång lista med övningar, ingen känsla av helhet eller dag. Efter: dagens lista och en knapp per rad ovanför vecket i 375 × 812 (5 rader inklusive 2 överförda slutar vid ca 750 px), mörkt och ljust läge, ingen sidledsscroll (scrollWidth 375). Avbockad rad blir fylld teal med bock och dämpad text, aldrig röd.

**Stitch-princip:** No-Line (rader utan avdelarlinjer, luft), pill 36 px för knappar och 28 px-mönstret för etiketter, 3 fontstorlekar, bara palettens tokens (`--card`, `--accent-soft`, `--fill-*`, `--on-fill`, `--text-soft`). Teori: se HP-UX-SPEC beslut 27.

---

## 2026-10-05 — Mörkt läge (hela appen, HP först)

**Vad:** Appen har ett mörkt läge. Standard är Automatiskt (följer telefonens `prefers-color-scheme`). Avatarmenyn (runda bokstaven uppe till höger) har raden "Utseende" med Ljust, Mörkt, Automatiskt; valet sparas på enheten. Bakgrund `#14171a`, kort `#1c2024`, text `#e6e6e6`, dämpad text `#a0a4a8`, accent dämpad teal. Statusfältet på mobilen blir mörkt (`theme-color`, `color-scheme`).

**Varför:** Martin tränar på mobilen i sängen på kvällen utan att väcka sambon. En ljus skärm lyser upp rummet och trötta ögon. Inte ren svart och inte ren vit: vit text på svart ger halation (texten lyser ut och flimrar) och är jobbigare att läsa länge, särskilt LÄS-texterna. Fyllda ytor (knappar, countdown, aktiv flik) är dämpad mörk teal med ljus text i stället för starkt mint, så att stora ytor inte lyser.

**Före/efter:** Före: bara ljust, ca 340 hårdkodade färger i CSS som inte följde teman. Efter: samma tokennamn med mörka värden, ca 340 hårdkodade hex/rgba ersatta med tokens (nya: `--on-fill`, `--fill-start/end`, `--ok/bad/warn/info-bg/line/ink`, `--text-soft`). Alla text/bakgrund-par i paletten ≥ 4,5:1 (UI-kanter ≥ 3:1), kontrollerat med `scripts/check-dark-contrast.mjs` (62 par) och på riktiga element i HP-vyerna (inget under 4,5:1). Ljust läge ser i princip likadant ut (statustoner har enhetliga värden, lite lägre opacity-dämpning på små texter för bättre kontrast).

**Småfixar på vägen:** Mattediagnosens resultat och ordlistan gav sidledsscroll vid 375 px (grid utan `min-width: 0`); select-pilen var en mörk data-URI som försvann i mörkt läge; texter med opacity 0,5–0,75 höjdes till minst 0,85 där de är läsbar text.

**Stitch-princip:** Tonal adjacency (djup via ytans nyans, inte linjer), No-Line, ambient skuggor; palettens tokens även i mörkt läge. Teori: se HP-UX-SPEC beslut 26 (halation, WCAG 1.4.3/1.4.11, Material dark theme).

---

## 2026-10-05 — HP: sidan "Externa resurser"

**Vad:** Den lösa länken "Gamla högskoleprov med facit (studera.nu) ↗" på HP-hem är ersatt av en sekundär knapp "Externa resurser". Sidan har Tillbaka till HP-hem, rubriken "Externa resurser" och raden "Kontrollerade 5 okt 2026". Därunder fyra grupper efter vad man vill göra: Gör gamla prov, Lär dig matten, Strategi och tips, Om provet (18 länkar, varje länk öppnad och kontrollerad; döda och svaga slängdes). Varje länk är en rad: titel som länk med ↗, en rad förklaring i dämpad färg och en liten kostnadsetikett (gratis, gratis med konto, delvis betalt). Data ligger i `src/hp-resources.ts`.

**Varför:** Martin vill ha en kort, kurerad lista, inte en länksamling, och inte stökigt. Rubrik över, länkar under med kort förklaring gör att man ser vad man får innan man trycker (information scent) och inte öppnar fliken i onödan. Kostnaden syns i förväg så "gratis med konto" och "delvis betalt" inte kommer som en överraskning.

**Före/efter:** Före: en enda länk i HP-hem. Efter: knapp (36 px, träffyta 44 px) och en sida där raderna är 78 px höga kort med 8 px luft, ingen avdelarlinje, ingen tabell eller tvåkolumn. Hela kortet är träffyta (stretched link). Ingen sidledsscroll i 375 × 812, alla länkar target=_blank + rel=noopener, skärmläsare får "(öppnas i ny flik)".

**Stitch-princip:** No-Line (tonala kort, luft i stället för linjer), 3 fontstorlekar (hero, md, sm, xs-etikett), palettens tokens. Teori: se HP-UX-SPEC beslut 25 (NN/g F-mönster, GOV.UK länkriktlinjer, WCAG 2.5.8).

---

## 2026-10-05 — Mattediagnos: ärliga nivåer och granskning fråga för fråga

**Vad:** (1) Ny nivåregel per område. Lär om: någon fråga slutade med visat svar (eller fel två gånger), eller ingen fråga klarades utan hjälp. Repetera: någon fråga krävde ledtråd eller blev fel en gång, eller snittiden är över målet (90 s). Kan: alla frågor utan hjälp inom tid. (2) Rubriken är nu en räkning, "Lär om: 2 områden · Repetera: 3 · Kan: 6", och texten "Inget område behöver läras om" kan inte längre visas när något område är Lär om eller Repetera. (3) Varje fråga sparas (id, område, utfall, valda svar, rätt svar, tid) och resultatet visar områdena som expanderbara rader (details/summary, samma mönster som guiden) med frågan, ditt svar, rätt svar, utfall, lösningen, "Så skulle du ha tänkt" och "Lär dig"-länken. (4) HP-hem: knappen heter "Se senaste diagnos" och öppnar samma vy i efterhand. Äldre sparade resultat saknar frågedata och visar "Gör om diagnosen för att se dina svar fråga för fråga".

**Varför:** Martin sa "vet inte" på en fråga i två områden och fick 1/2 → "Repetera" och en rubrik som sa att inget behövde läras om. Men "vet inte" betyder att metoden inte sitter. Tidigare räknade nivån bara rätt/fel; nu väger hjälp-utfallet in. Och ett resultat man inte kan granska ger ingen lärdom: man ska kunna se exakt vad man svarade, vad som var rätt och hur man tänker.

**Före/efter:** Före: en poäng per område (1/2) och en lugnande rubrik, inget sätt att se sina svar. Efter: nivå styrd av utfall, räkning i rubriken, och i 375 × 812 syns rubrik, räkning och alla Lär om-rader (44 px) utan scroll; är bara ett område Lär om är det öppet från start. Ingen sidledsscroll (scrollWidth 375; långa områdesnamn bryts).

**Stitch-princip:** progressiv avslöjning (sammanfattning först, detaljer på tryck), No-Line (tonala kort, nivåbricka 28 px), 3 fontstorlekar. Teori: feedback ska vara specifik och åtgärdbar (Hattie & Timperley), och granskning av egna fel stärker inlärning (error analysis); ärlig självbild motverkar illusion of competence.

---

## 2026-10-05 — LÄS-träning: frågan först, texten på knapptryck

**Vad:** Ny övning "LÄS – läsförståelse" i HP: ett pass = en text med 3–4 frågor (10 egna texter, 37 frågor). (1) Frågan och fyra alternativ visas först; texten nås med "Visa texten", stycke för stycke med synligt styckenummer. (2) Tempomätare "1:12 / 6:00" (frågor × 2 min) syns hela tiden. (3) Efter svar visas varför för det alternativ du valde och för rätt alternativ, "Se alla alternativ" visar varför för alla fyra, och "Svaret finns i stycke N" öppnar texten med stycket markerat. (4) Vid fel frågas "Varför blev det fel?" med Missade detalj / Feltolkade / Tidsbrist. (5) Sammanfattning med tid mot budget, felanalys och frågetyper du missade. (6) Repetitionskö per text. (7) LÄS-kort på HP-hem och i "Rekommenderat nu".

**Varför:** LÄS är Martins svåraste delprov: han tar för lång tid och vill förstå varför han väljer fel. Metoden "frågan före texten" tvingas fram av gränssnittet, och att se varför varje alternativ är fel gör felet till lärdom, inte bara ett rött kryss.

**Val: växlare, inte delad panel.** Jag jämförde (a) en panel med scrollbar text under frågan och (b) en växlare Fråga ⇄ Text. På 375 × 812 tar frågan med alternativ ~300 px, så en text i panelen får ~250 px och blir en scroll i scrollen. Växlaren (b) ger hela skärmen åt det man gör och kostar ett tryck. Raden överst (topprad, växlare, i textläget frågans text på en rad) är sticky, så tempot och vägen tillbaka alltid syns. Varje vy minns scrollpositionen, så att man hamnar där man var. Textläget: ett kort per stycke, 14 px, radavstånd 1,65, ca 36–40 tecken per rad.

**Före/efter:** före fanns ingen LÄS-övning, bara sju tips i guiden. Efter: frågans överkant ligger på 194 px i 375 × 812 (under 200, beslut 6), ingen sidledsscroll (scrollWidth 375), feedbacken ligger under alternativen och knuffar inte ner dem. Markerat stycke läggs direkt under den sticky raden.

**Rekommendation:** otränat LÄS rekommenderas direkt efter otränade mattedelprov (prioriterat), och därefter en text om dagen.

**Stitch-princip:** progressiv avslöjning (texten visas först när man bett om den, alla förklaringar bakom en länk), en tydlig primär handling per skärm, No-Line (tonala kort, `--honey` för markerat stycke), 3 fontstorlekar, pill 28 px (växlare, felknappar) och 36 px (Öppna stycke, Nästa) med 44 px träffyta via `::after`. Teori: Desirable difficulties och generation effect (försök först, förklaring sen), cognitive load (en sak åt gången, ingen scroll-i-scroll), Fitts lag och användarkontroll (Föregående, Hoppa över, fritt växla vy).

---

## 2026-10-05 — ?-hjälp: metod före svar, ledtråd efter svar

**Vad:** (1) ?-knappen visar nu bara den allmänna metoden för delprovet (ur HP_GUIDE), aldrig frågans `hint`. (2) Efter svar visas frågespecifik ledtråd: i matte (diagnos + XYZ/KVA/NOG/DTK) under "Så skulle du ha tänkt", i ORD som "Så minns du det: …" (ursprung/ordled) tillsammans med "ord = betydelse" och förklaringen, både vid rätt och fel. (3) ORD auto-nästa vid rätt svar förlängt från 2 till 3 s eftersom mer text ska hinna läsas; "Tryck för att fortsätta" kvar. (4) Mattediagnosen fick "Varför blev det fel?" (Slarv / Kunde inte / Missförstod, samma som matteträningen, räknas i en "Felanalys" i slutsammanfattningen). Knappen "Missförstod frågan" förkortad till "Missförstod" så tre knappar ryms på en rad i 375 px.

**Före:** ?-lagret visade "Ledtråd:" med frågans tips innan man svarat — det tog bort hjärnjobbet. ORD-ledtråden (etymologin) syntes aldrig i feedbacken.

**Efter:** Före svar får man verktyg (metod), efter svar får man förståelse (varför och hur man minns). Hint-text finns inte i DOM före svar (kontrollerat mot samtliga hints i hp-math/hp-twins). Frågan ligger kvar på samma y-position före och efter feedback (beslut 6). Inga nya fontstorlekar, pill-höjder eller färger; ledtråden använder `--honey` / `--honey-ink`.

**Verifiering (375×812):** ORD rätt + fel, KVA, DTK, mattediagnos (rätt, fel, "Vet inte", Varför blev det fel + Felanalys i sammanfattning), ? före och efter svar. `scrollWidth === clientWidth` (375). tsc grönt.

**Stitch-princip:** Progressiv avslöjning (generellt först, specifikt efter försök), önskvärda svårigheter (generation effect — försök först, få förklaring sen), spacing/tonal adjacency utan nya linjer.

---

## 2026-09-26 — HP-guiden: flashcards + lång översiktssida

**Vad:** Guiderna i `docs/HP-GUIDE.md` och `docs/HP-LAS-SPEC.md` (avsnittet "Guide: bli bättre på LÄS") strukturerade som data i ny fil `src/hp-guide.ts` — 53 korta kort (`{ id, kategori, rubrik, gorSaHar, varfor, kalla? }`) fördelade på 13 kategorier (Viktigast, Plan, LÄS, ORD, MEK, ELF, XYZ, KVA, NOG, DTK, ADHD, Provdagen, Misstag). Enligt Martins beslut byggs innehållet på **båda** sätten han bad om:
1. **Flashcards** (`renderHpGuideFlashcards`) — ett kort per skärm, ingen scroll. Framsidan visar kategori (utskriven med full förklaring, t.ex. "ORD (ordförståelse)" — förklarar förkortningen varje gång kortet visas, inte bara första gången) + rubrik; tryck på kortet vänder till baksidan (gör så här + varför + ev. källa). Filter-chips (28px pill, `.hp-guide-chip`, samma mönster som `.hp-twin-tag-btn`) filtrerar per kategori. Föregående/Nästa som helbreddsknappar i nedre halvan (synlig 36px pill, ≥44px träffyta via samma `::after`-teknik som `.hp-cta-btn`), plus enkel horisontell svep-navigering som komplement. "Avbryt" går tillbaka till HP-hem.
2. **Lång sida "Guide — översikt"** (`renderHpGuidePage`) — "De 7 viktigaste råden" öppna överst, övriga 12 kategorier som ihopfällbara `<details>/<summary>`-sektioner (samma mönster som `.course-research-summary`), stängda som standard så det viktigaste syns först utan scroll.

På HP-hem: en ny sekundär rad "Guide" med två knappar ("Flashcards", "Läs hela guiden") längst ner, under tvillingträningen — stör inte "Starta dagens pass" ovanför vecket.

**Före:** Guiderna fanns bara som lång löptext i två md-filer i repot, osynliga för Martin i själva appen på mobilen.

**Efter:** Guiderna nåbara direkt i HP-fliken på två sätt: snabb repetition (flashcards) och överblick (lång sida). Inga nya färger, fontstorlekar eller pill-höjder — enbart återanvända designsystem-tokens och komponentmönster.

**Verifiering (375×812):** HP-hem → Flashcards (vänd kort, bläddra Nästa/Föregående, filtrera på LÄS → 8/8 kort, Avbryt tillbaka till HP-hem) → Läs hela guiden (öppna/stänga en sektion, "De 7 viktigaste råden" öppen från start) — allt testat och fungerar. `document.documentElement.scrollWidth === clientWidth` (375) genom hela flödet — ingen sidled-scroll. Nästa/Föregående-knapparna ligger i nedre halvan av skärmen på flashcards-vyn. `node node_modules/.bin/tsc --noEmit` grönt. Desktop kontrollerat efteråt — samma centrerade layout, inga regressioner.

**Stitch-princip:** Progressiv avslöjning (ihopfällbara sektioner så det viktigaste syns först, ingen väggtext), konsekvent no-line/palett-regel (bara existerande tokens och pill-höjder återanvänds), en tydlig nästa-handling åt gången (flashcards: vänd → nästa, inga parallella vägval).

---

## 2026-09-25 — Mobil UX-granskning i 375×812: sex fixar i HP-delen

**Vad:** En mobil UX-granskning (375×812) av ORD-drillen, tvillingträningen och mattediagnosen hittade sex problem, alla åtgärdade:

1. **Breddbugg (kritisk):** `.hp-home, .hp-drill, .hp-summary` hade `max-width: 560px; margin: 0 auto` — på en grid-item gjorde det att containern krympte till innehållets bredd, så svarsknapparna blev ~125 px breda och hamnade centrerade högst upp i stället för att fylla skärmen. Fixat till `width: 100%` — centreringen sköts redan av `.app` ett steg upp. Gällde alla tre delar (ORD, tvilling, diagnos) eftersom de delar samma tre klasser.
2. **Tumzon:** `.hp-drill` fick `min-height: calc(100dvh - 152px)` och `.hp-options` fick `margin-top: auto`, så frågan/ordet ligger kvar överst medan svarsalternativen (och "Nästa"/"Vet inte") trycks ner mot tumzonen i nedre halvan, utan att sidan scrollar.
3. **44 px tryckyta utan att bryta pill-höjds-regeln:** `.hp-cta-btn`, `.hp-secondary-btn`, `.hp-next-btn`, `.hp-math-dontknow-btn` och `.hp-teaser-btn` behåller sin synliga 36 px-höjd men fick `position: relative` + en osynlig `::after { inset: -4px 0 }` som utökar träffytan till 44 px vertikalt, utan att lägga till en ny pill-storlek i designsystemet. "Nästa" i feedback-kortet är nu även helbredd (`width: 100%`) så den är den enda tydliga handlingen där.
4. **`.hp-drill-top` (progress + tempo):** fick `gap: 0.75rem` så "Ord 1/10" och "19s / 20s mål" aldrig kan hamna dörr i dörr på smala skärmar.
5. **Auto-nästa-hint:** efter rätt svar i ORD (auto-nästa efter ~2 s) visas nu en diskret rad "Tryck för att fortsätta" (`.hp-feedback-hint`, text-xs, dämpad) i det gröna kortet, så tryck-för-att-gå-vidare inte är en dold genväg.
6. **Återväg till HP-hem (kritisk):** det gick inte att komma tillbaka till HP-hem under ett pågående pass — nav-länken och startsidans HP-kort återupptog bara övningen där den var (via `renderHp()` som prioriterade aktiv session över `page`). Fix: (a) en synlig textknapp "Avbryt" i övningens topprad (`hp-cancel`/`hp-math-cancel`/`hp-twin-cancel`) som avslutar passet direkt och går till HP-hem — inget bekräftelsesteg, eftersom repetitionskön redan sparas löpande per svar så inget går förlorat; (b) nav-länken och HP-teaser-kortet på startsidan sätter nu en `hpForceHome`-flagga som tvingar fram HP-hem i stället för att hoppa rakt in i en pågående session, och HP-hem visar då ett `.hp-resume-card` ("Pågående pass: Ord-drillen — fråga 3/10") med knappen "Fortsätt pass" i stället för de vanliga start-knapparna (så man inte råkar skriva över den aktiva sessionen med en ny).

**Före:** Svarsknappar ~125 px breda och uppe i skärmen; svarsalternativ ofta ovanför tumzonen; osynlig 44 px-regel bruten (endast 36 px klickbart); progress/tempo kunde flyta ihop; ingen väg tillbaka till HP-hem under ett pågående pass — man satt fast i övningen tills man stängde fliken.

**Efter:** Helbreddsknappar i tumzonen på alla tre HP-delarna, verifierad ≥44 px träffyta utan ny pill-höjd, tydlig Avbryt-väg med "Fortsätt pass" på HP-hem.

**Verifiering (375×812, `javascript_tool`, inga onödiga skärmdumpar):** svarsknapp-bredd === container-bredd (343 px, tidigare ~125 px); knapp-`top` 487 px > 50 % av `innerHeight` (812/2=406); `elementFromPoint` 3 px ovanför/under `.hp-cta-btn` (36 px synlig höjd) returnerade knappen i båda fallen → ≥44 px träffyta bekräftad utan att mäta `::after` direkt; `document.documentElement.scrollWidth === clientWidth` (375) under hela ORD-/tvilling-/diagnos-flödet — ingen sidled-scroll; Avbryt testat i ORD, KVA (tvilling) och mattediagnos — alla går direkt till HP-hem; nav-länk och HP-teaser-kort under en pågående session visar `.hp-resume-card` ("Fortsätt pass") i stället för att hoppa in i övningen, och "Fortsätt pass" återupptar rätt fråga. Desktop kontrollerat efteråt (1024 px): samma centrerade layout, ingen sidled-scroll, inga regressioner.

**Avvägning:** Avbryt sparar inte ett ofullständigt mattediagnos-/tvillingresultat (de sparas bara vid fullständigt avslutat pass, som innan) — valt som den enkla lösningen (`instruktionen: "spara och avsluta direkt — välj det enklaste som inte tappar data"`) eftersom ORD-drillens repetitionskö redan uppdateras per svar oavsett Avbryt, vilket är den data som faktiskt behöver bevaras mellan pass.

**Stitch-princip:** Fitts lag (tumzon + 44 px träffytor), konsekvent no-line/palett-regeln (inga nya färger eller pill-höjder infördes — `::after`-tricket är osynligt), synlig systemstatus (progress/tempo-gap, "Fortsätt pass"-kort, "Tryck för att fortsätta"-hint) och användarkontroll & frihet (Avbryt-vägen ur en pågående övning).

---

## 2026-09-25 — Tvillingträning per delprov (XYZ/KVA/NOG/DTK) i HP-fliken

**Vad:** Ny sektion "Träna matte som på provet" på HP-hem, med fyra kort (XYZ/KVA/NOG/DTK) som var och en visar delprovets namn, en kort förklaring ("Problemlösning", "Jämför två värden", "Räcker informationen?", "Läs tabeller") och antal uppgifter i banken — samt "senast X/Y" när ett resultat finns sparat. Sektionen ligger under `hp-secondary-btn`/länken på HP-hem, alltså under vecket i 375×812 där så behövs: "Starta dagens pass" (ORD) förblir den enda primärknappen ovanför vecket. Varje kort startar ett träningspass byggt på `src/hp-twins.ts` (40 tvillinguppgifter, oförändrat innehåll). Passet visar en uppgift per skärm: tabellfältet (`table`, markdown) renderas som en riktig HTML-tabell i en egen scrollbar wrapper (`hp-twin-table-wrap`, `overflow-x: auto`) så att breda tabeller aldrig tvingar sidan att scrolla i sidled — bara tabellen själv, om det behövs. Tempomätaren är 60 s för XYZ/KVA och 90 s för NOG/DTK (samma uppräknande mönster som ORD/mattediagnosen). Svarsknappar är helbreddsknappar ≥44 px. Svarsordningen blandas endast för XYZ och DTK (`shuffleTwinOptions`); KVA och NOG behåller sin fasta alternativordning eftersom formatet (kvantitetsjämförelse / I-och-II-resonemang) bygger på att alternativens innebörd är fast, precis som på det riktiga provet. Efter svar visas rätt/fel (samma grönt/rött-mönster som ORD-drillen och mattediagnosen), lösningstext och länken "Se originaluppgiften (prov, provpass, uppgift)" till `twinOf.url` — alltid med explicit "Nästa", ingen auto-advance, av samma skäl som i mattediagnosen (lösningen och källänken ska hinna läsas). Efter ett FEL svar visas tre valfria små tag-knappar (28px pill, i linje med appens enhetliga pill-höjd) — "Slarv", "Kunde inte", "Missförstod frågan" — för felanalys, vilket ORD-drillen medvetet saknar (beslutet i `docs/HP-UX-SPEC.md` reserverar felkategorisering för matte-delproven). Sammanfattningen efter passet visar rätt/fel, felanalys-fördelningen (om några taggar valts) och listan över missade uppgifter. Resultat och en repetitionskö per delprov sparas i `localStorage` (`yh.hp-twin-result`, `yh.hp-twin-repeat`, samma namespacing och try/catch-mönster som övrig HP-progress i `src/storage.ts`); missade uppgifter prioriteras överst i nästa pass för samma delprov, resten av banken slumpas.

**Före:** HP-fliken hade ORD-drillen och mattediagnosen (diagnos, inga riktiga provuppgifter). De 40 tvillinguppgifterna i `src/hp-twins.ts` fanns i datalagret men syntes ingenstans i UI:t.

**Efter:** HP-hem har en tredje, tydligt sekundär ingång: fyra separata delprovs-kort under mattediagnosen. Sessionsstate (`HpTwinSession`) följer samma tillstånds-mönster som `HpWordSession`/`HpMathSession` — inget nytt arkitekturkoncept.

**Beslut jag tog på egen hand (dokumenteras här eftersom Martin sov):** (1) Ett pass = hela delprovets bank (8–12 uppgifter) i stället för ett fast antal — bankerna är redan korta nog för ett sammanhängande pass, och "fel kommer tillbaka nästa gång" täcks av repetitionskön i stället för att blanda in gamla fel mitt i ett nytt pass (som ORD-drillen gör) eftersom varje delprovsbank är för liten för att både rymma en full genomgång och repetitionsord samtidigt utan att tömma banken för snabbt. (2) Ingen auto-advance på rätt svar (till skillnad från ORD) — solution + originallänk är kärnan i värdet här, och auto-advance skulle rusa förbi dem. (3) Felkategori-taggen är single-select per uppgift (tryck igen för att avmarkera), inte flerval, för att hålla UI:t enkelt och matcha "en tydlig kategori per fel" i planen.

**Mobile first — verifierat i 375×812:** Alla fyra delprov körda minst en gång (minst ett rätt och ett fel per delprov), felanalys-knapparna testade och synliga i sammanfattningen, originallänken testad, en DTK-tabell (5 kolumner) verifierad utan sidscroll (`document.documentElement.scrollWidth === window.innerWidth` under hela flödet). HP-hem: sektionen syns under vecket, "Starta dagens pass" förblir enda primärknappen ovanför vecket. Desktop kontrollerat efteråt — samma centrerade layout (max-width 560px), inga ändringar behövda.

---

## 2026-09-24 — Mattediagnos i HP-fliken

**Vad:** Ny datafil `src/hp-math.ts` med 22 egna XYZ-frågor (4 svarsalternativ A–D) i högskoleprovets stil, 2 per område över 11 områden (aritmetik & prioriteringsregler, bråk, procent, potenser, algebra/förenkling, ekvationer, räta linjens ekvation, geometri, sannolikhet, statistik, hastighet/sträcka/tid). Varje fråga har egen lösning i steg och en formel att komma ihåg. Nytt sekundärt ingångsläge på HP-hem: "Mattediagnos (ca 15 min)" under den primära "Starta dagens pass"-knappen, i ghost/pill-stil (samma höjd, lägre visuell vikt) — inte en andra lika stark primärknapp. Diagnosen kör en fråga per skärm utan scroll, helbreddsknappar ≥44 px i tumzonen, en uppräknande tempo-mätare mot ett 90 s-mål, och en "Vet inte"-knapp som räknas som fel utan att straffas visuellt. Efter varje svar visas rätt/fel-feedback (samma mönster som ORD-drillen) plus lösning och formel, med en explicit "Nästa" — ingen auto-advance här, eftersom lösningstexten ska hinna läsas. Resultatet grupperas per område i tre nivåer: "Kan" (2/2 rätt inom tidsmålet), "Repetera" (1/2, eller 2/2 men långsamt) och "Lär om" (0/2), sorterat med "Lär om" först. Varje område har en verifierad "Lär dig"-länk till en lektionssida på matteboken.se (Matte 1/2, gymnasiet). Resultatet sparas i `localStorage` via `saveHpMathResult`/`loadHpMathResult` (`src/storage.ts`, samma try/catch-mönster som övrig HP-progress) och visas som en kompakt rad på HP-hem efteråt, klickbar för att se hela resultatet igen.

**Före:** HP-fliken hade bara ORD-drillen (ordförståelse). Ingen diagnos av var Martins matematikkunskaper står inför XYZ/KVA/NOG-delarna.

**Efter:** HP-hem har nu två ingångar: primär "Starta dagens pass" (ORD) och sekundär "Mattediagnos". Sessionsstate (`HpMathSession`) följer samma tillstånds-mönster som `HpWordSession`/`VRSession`/`LSSession` — inget nytt arkitekturkoncept.

**Mobile first — verifierat i 375×812:** Hela flödet testat: HP-hem → mattediagnos → 22 frågor (rätt svar, fel svar och "Vet inte" alla testade) → resultatskärm → tillbaka till HP-hem med sparat resultat synligt → öppna sparat resultat igen. Ingen scroll krävs för fråge-skärmarna. På resultatskärmen syns sammanfattning ("Rätt X/22", antal "Lär om"-områden) + prioriterade "Lär om"-kort ovanför vecket; "Övriga områden" (Repetera/Kan) ligger under och kräver scroll, enligt kravet i `docs/HP-UX-SPEC.md`. Desktop kontrollerat efteråt — samma centrerade layout (max-width 560px), inga ändringar behövda.

**Avvikelse från spec/uppgift:** Ingen känd avvikelse. En designrisk upptäcktes och åtgärdades under byggandet: samtliga 22 frågor hade av misstag rätt svar kodat som alternativ A. Det hade gjort mönstret gissningsbart. Löst genom att blanda svarsalternativens ordning (och därmed vilket index som är rätt) varje gång ett pass byggs, i `buildHpMathPass`/`shuffleMathQuestionOptions`.

**Stitch-princip:** Återanvänder `.hp-drill`/`.hp-summary`/`.hp-feedback`/`.hp-option-btn` rakt av från ORD-drillen. Nya klasser (`.hp-math-*`) håller sig strikt till designsystemets tre fontstorlekar och paletten — nivåbadgarna ("Kan"/"Repetera"/"Lär om") återanvänder `--ok`/`--honey`/`--danger` i stället för nya färger, och badge-höjden 28 px matchar den definierade nav-pill-storleken (No new pill height). Inga borders som avdelare (No-Line rule) — kort skiljs med `--card` + ambient shadow.

---

## 2026-09-24 — HP synlig på startsidan

**Vad:** HP är nu nåbar från startsidan (Hem) på två sätt: (1) ett nytt teaser-kort högt upp — "Högskoleprovet — X dagar kvar" + knappen "Öppna HP →" — placerat direkt under stat-widget-raden, före det befintliga "Fortsätt där du slutade"-kortet, så det syns ovanför vecket i 375×812; (2) en ny grupp "Högskoleprovet" överst i "Alla sidor"-listan med länken "🎓 HP — hem". Båda leder direkt till HP-fliken med ett enda tryck.

**Före:** HP-fliken nåddes bara via `.app-nav-ctx`-menyn → `[data-view="hp"]`. Ingen synlighet på startsidan trots att provet är Martins mest tidskritiska mål just nu.

**Efter:** Startsidan kommunicerar nedräkningen direkt (samma "dagar kvar"-logik som HP-hem, `hpDaysLeft()`) och gör HP till ett förstahandsval, inte en gömd menypost.

**Mobile first — verifierat i 375×812:** Teaser-kortet syns direkt vid sidladdning utan scroll, knappen är i tumzonen och minst 36 px hög (action-pill). Ett tryck ("Öppna HP →") tar direkt till HP-hem. "Alla sidor"-länken testad separat. Desktop kontrollerat efteråt — kortet spänner full bredd (`span-12`) och skalar utan problem.

**Stitch-princip:** Samma gradient-mönster som `.hp-countdown-card` (No-Line rule, ambient shadow, `--accent`→`--accent-container`) återanvänds för `.hp-teaser-card` i stället för att uppfinna ett nytt kortmönster. Knappen använder den definierade 36 px action-pill-höjden och `--text-md`, ingen ny fontstorlek.

---

## 2026-09-24 — HP-flik byggd: ORD-drillen (första skärmen från HP-UX-SPEC.md)

**Vad:** Ny toppnivå-flik "HP" i navet (`src/main.ts`, `pageLabels`/`renderNavDropdown`), byggd enligt `docs/HP-UX-SPEC.md`. HP-hem visar dagar kvar till högskoleprovet (18 okt 2026), dagens progress (ord tränade, pass klara) och en primärknapp "Starta dagens pass" — allt ovanför vecket i 375×812. ORD-drillen kör 10 ord/pass från `HP_WORDS` (`src/hp-words.ts`), med en tempomätare som räknar uppåt mot 20 s synlig från fråga 1. Rätt svar: valt alternativ grönt + "ord = betydelse" i ~2 s, sedan auto-nästa (tryck var som helst för att gå direkt). Fel svar: ditt rött, rätt grönt, förklaring, stannar till "Nästa". Missade ord läggs i en repetitionskö (localStorage, try/catch) och prioriteras i nästa pass; rätträttade ord plockas ur kön. Sammanfattning efter passet visar rätt/fel, snitt-tempo mot 20 s-målet och lista över missade ord.

**Före:** Ingen HP-flik existerade. Antagningsprov-träning och HP-förberedelse låg inte separerade i navet.

**Efter:** Egen "HP"-flik i nav-dropdownens "Dagligt"-sektion. Sessionsstate (`HpWordSession`) följer exakt samma mönster som befintliga `VRSession`/`LSSession` i `src/main.ts` — inget nytt arkitekturkoncept, bara ett nytt ordregister och en ny drillskärm.

**Mobile first — verifierat i 375×812:** Hela flödet (hem → fråga → rätt-feedback → fel-feedback → sammanfattning) testat i mobilstorlek. Inget av det viktiga kräver scroll. Svarsknappar är helbreddsknappar i undre halvan av skärmen, min-height 44 px, 8 px mellanrum (tumzon, Fitts lag). Desktop kontrollerat efteråt — layouten centreras (max-width 560px) och fungerar utan ändringar.

**Avvikelse från spec:** §3.1 nämner "4 svarsalternativ", men den parallellt byggda `HpWord`-typen i `src/hp-words.ts` (som denna uppgift inte fick röra) definierar 5 fasta alternativ per ord — samma format som på riktiga högskoleprovet. Datamodellen följdes eftersom den är den faktiska källan att bygga mot; UI:t renderar därför 5 svarsknappar, inte 4.

**Stitch-princip:** Stitch No-Line rule — inga borders som sektionsavdelare i de nya `.hp-*`-klasserna, bara `--card`/ambient shadow. Alla nya CSS-klasser använder enbart designsystemets tokens (`--ok`/`--danger` för feedback, `--accent`/`--accent-container` för CTA-gradient, `--text-xs/sm/md` för de tre fontstorlekarna) — ingen ny färg eller fontstorlek introducerad. Pill-höjder 28 px (nav) / 36 px (action, "Starta dagens pass"/"Nästa") enligt CLAUDE.md.

---

## 2026-09-24 — HP-flik UX-spec skapad

**Vad:** Ny fil `docs/HP-UX-SPEC.md` — UX-spec (ingen kod) för en ny HP-flik (Högskoleprovet, 18 okt 2026). Beskriver mål/principer, informationsarkitektur, ORD-drillen i detalj (start/fråga/rätt/fel/sammanfattning/repetition) samt kortfattat övriga planerade skärmar (nedräkning+dagens pass, formeldrill, NOG-tränare, KVA/DTK, provpass-logg, felanalys, 55-min timer).

**Varför:** Nuvarande design är lappad snarare än ritad från grunden. HP-fliken ska byggas med en ren struktur inom befintligt designsystem, med ORD-drillen som första skärm och testmiljö för HP:s designspråk. Specen är research-driven: tidsbrist är HP:s huvudproblem (tempo ska synas, ~20 s/ORD-uppgift), felanalys ger mest lärandeeffekt, ingen minuspoäng (uppmuntra gissning), kort daglig drill slår långa pass, och ADHD-anpassning kräver en tydlig nästa-handling åt gången med låg friktion.

**Stitch-princip:** Återanvänder befintliga komponenter (nav-pill, action-pill 36px, stat-widget, progress-pips, kort utan border) i stället för att uppfinna nya mönster där systemet redan har svaret — nya komponenter (tempo-indikator, felkategori-tagg, NOG-svarslogik) hålls till ett minimum och motiveras var för sig.

---

## 2026-05-14 — Regelverksatlas: Extern referenssida tillgänglig via nav

**Vad:** En fristående HTML-sida ("Regelverksatlas — NIS2 & AI Act") lagts till som `public/regelverksatlas.html` och länkats in under "Referens" i navigationsmenyn. En `← YH Prep Lab`-länk lades till i sidans header så att användaren kan navigera tillbaka till appen.

**Före:** Ingen direkt åtkomst till regelverksreferensen från appen — filen låg enbart lokalt på datorn.

**Efter:** Länk i nav-dropdown under "Referens" → ⚖️ Regelverksatlas. Öppnas i ny flik (samma pattern som övriga standalone-verktyg). Header på sidan har tillbaka-länk till startsidan.

**Stitch-princip:** Additive, no-disruption — befintlig sida rördes inte, ny nav-länk följer exakt samma mönster som Symbol Sudoku.

---

## 2026-05-04 — Antagningsprov: Dedikerad träningssida för IT-Högskolan

### Ny sida: `iths-antagning` — Träna per ämne inför antagningsprovet

**Vad:** En ny sida "Antagningsprov – välj ämne" tillgänglig från IT-säkerhet kursvyn. Sidan presenterar provet uppdelat i fyra separata 10-minutersquizzer: Svenska, Engelska, Matematik (Del 1) och Nätverk & IT-säkerhet (Del 2). Varje quiz startar i Lär-läge med direkt feedback och förklaring efter varje svar.

**Före:** Träning för antagningsprovet gick via den generiska Prov-sidan med en dropdown. Inga separata ämnesmoduler. Del 1 och Del 2 blandades eller låg inbäddade i listan med alla prov.

**Efter:** Dedikerad sida med tydlig Del 1 / Del 2-struktur. Fyra separata startpunkter — ett ämne åt gången. Poolbaserade frågor slumpas vid varje körning, vilket möjliggör minst 2 rundor utan exakta upprepningar. Direkt feedback och förklaring visas efter varje fel.

**Frågeinnehåll utökat:**
- Svenska: 4 nya frågor (sv5–sv8) tillagda, pool nu 8 frågor — par med sv1–sv4, testar samma grammatikbegrepp (syftning, stavning, bisatsinversion, skiljetecken) från annan vinkel
- Engelska: 4 nya frågor (en5–en8) tillagda, pool nu 8 frågor — par med en1–en4 (ordförståelse, meningsstruktur, konditional)
- Matematik: pool 16 frågor, slumpar 6 per körning (~10 min)
- Nätverk: pool 35 frågor, slumpar 8 per körning (~10 min)

**Varför:** Martin ville känna sig mer trygg inför provet genom korta, fokuserade övningar i ett ämne i taget — inte ett 90-minutersprov. Kortare sessioner ger mer träning per timme och tydligare signal om var luckorna finns. Lär-lägets direktfeedback är kärnan i självbedömningsloopen.

**Stitch-princip:** Stitch #4 — *"Match the mental model."* Provet har två delar med fyra ämnen. Träningsgränssnittet speglar exakt den strukturen. Varje ämne är ett eget block, precis som de upplevs i det verkliga provet.

---

## 2026-04-13 — Symbol Sudoku: Markeringsläge (marking mode)

### Ny funktion: markera tomma rutor som lösningshjälp
**Vad:** En ny toggle-knapp "Markera" i kontrollfältet aktiverar ett markeringsläge. När det är på kan användaren klicka på tomma rutor i gittret — en popup visas med alla tillgängliga symboler att välja från. Den valda symbolen visas dimmad (38% opacity) i rutan som en visuell notering. Klicka igen på symbolen i popupen för att ta bort markeringen. Markeringar rensas vid nytt pussel.

**Före:** Tomma rutor var passiva — ingen interaktion möjlig. Användaren fick hålla all logik i huvudet.
**Efter:** Tomma rutor är klickbara i markeringsläge. En flytande popup positioneras under cellen med klickbara symbolknappar. Markerade rutor visar symbolen halvtransparent. Toggle-knapp i verktygsfältet (lila = på, grå = av) sparas i localStorage.

**Varför:** På det riktiga AON-testet kan man markera tomma rutor med symboler som hjälpminne medan man löser pusslet. Den här funktionen efterliknar det beteendet och gör träningen mer autentisk. Det sänker kognitiv belastning — istället för att hålla "cirkel kan inte vara här" i arbetsminnet, kan man synliggöra det direkt i gittret.

**Stitch-princip:** Stitch #2 — *"Reduce working memory load."* Externaliseringsverktyg (att skriva ner sina tankar i gränssnittet) är ett klassiskt kognitivt avlastningsverktyg inom HCI.

**Knapp-ikon (iteration):** Toggle-knappen byttes från "Markera" → `✏️△□+○`. Pennan är den universella UX-metaforen för "anteckning/pencil marks" (etablerat sudoku-begrepp). De fyra symbolerna är självbeskrivande — de visar exakt vad spelet handlar om och vad funktionen gör. Kombinationen är unik, omedelbart läsbar, och riskerar inte förväxlas med navigation eller andra kontroller.

---

## 2026-04-13 — T13: Ordlista: termkort visuell fix

### T13: Kontrast och läsbarhet på termkorten
**Vad:** Tre ändringar på `.glossary-entry-card`:
1. Bakgrund ändrad från `--surface-low` (blågrå) till `--card` (vit) + explicit `border: 1px solid var(--border)` — korten separeras nu tydligt från sidan
2. Kategori-badge (ALM/Python/Nätverk/UX): font-size höjd från 0.62rem → 0.68rem, padding ökad från 0.1rem → 0.15rem
3. Definitionstexten: font-size 0.82rem → 0.85rem, line-height 1.4 → 1.45

**Före:** Korten flöt ihop med bakgrunden (surface-low på surface-low). ALM-badge var 9.92px — under läsbarhetsgränsen. Definitionen satt trångt.
**Efter:** Korten är tydliga vita kort med border. Badge är läsbar. Definitionen andas mer.

**Stitch-princip:** Stitch #5 — *"Kontrast är inte en estetisk detalj — det är tillgänglighet."* Visuell separation är nödvändig för att hjärnan ska se enheter.

---

## 2026-04-13 — T12: Frågebank: spårfilter som synliga pills

### T12: Spårfilter direkt synliga, sekundära filter bakom "Fler filter ▼"
**Vad:** De fyra spårknapparna `[Alla] [UX] [IT-H] [Prog]` ersätter den gamla spår-`<select>`-dropdownen. Resterande filter (ämne, svårighet, källa) är dolda under `<details>`-elementet "Fler filter ▼". Starta Drill-knappen finns alltid synlig.

**Före:** Fyra `<select>`-dropdowns radades upp och krävde att användaren öppnade varje meny för att se alternativen. Alla filter behandlades som likvärdiga.

**Efter:** Spårfiltret är alltid synligt som färgkodade pill-knappar med `aria-pressed` för aktivt tillstånd. Sekundära filter är progressivt dolda. 65 frågor visas när UX väljs, 72 för IT-H, 180 för Alla.

**Varför:** Progressive disclosure — det vanligaste filtret (spår) ska inte kräva ett extra klick. Färgkodningen knyter ihop pill-knapparna visuellt med spårpillerna på frågekorten. `aria-pressed` ger korrekt semantik för toggle-knappar.

**Stitch-princip:** Stitch #3 — *"Progressive disclosure: visa bara vad användaren behöver just nu."* Spår är primärt val, ämne/svårighet/källa är sekundär fintuning.

---

## 2026-04-13 — T11: Prov-sidan: målspårskola överst

### T11: Provlistan sorteras efter användarens målskola
**Vad:** `<select>` på Prov-sidan grupperar nu proven med målspårets skola alltid överst, markerad med ★. Sorteringen läser `studyProfile.targetPriority` och mappar det till rätt `optgroup`.

**Före:** Proven visades i kodordning — IT-Högskolan kunde hamna före Nackademin oavsett vad användaren siktar på.
**Efter:** Den skola användaren valt i Profil visas alltid som första grupp med ★-prefix.

**Varför:** Progressive disclosure-principen — det viktigaste ska vara det som syns först. Att behöva scrolla förbi "fel" skola för att nå sin egna minskar kognitiv belastning. Wireframe explicit specificerade `★ Nackademin 2024` överst.

**Stitch-princip:** Stitch #4 — *"Show the user's context, not yours."* Listordningen ska spegla användarens mål, inte datafilen.

---

## 2026-04-12 — T08: Kursvy per spår (Programmering 1 / UX-design / IT-säkerhet)

### T08: Tre dedikerade kursvyer nåbara via overlay-menyn
**Vad:** Tre nya sidor i routingen (`course-prog1a`, `course-nackademin_ux`, `course-iths_itsec`) ersätter de gamla genvägsknapparna i "Kursträning" som alla pekade på Träna-sidan. Varje kursvy visar:
- Kursrubrik + subtitle (examen/kursmål)
- Procentprogressbar (från sessiondata)
- Knapp **Genomgång — Grunderna** (startar Lär-läge med 6 frågor)
- Knapp **Öva — N anpassade frågor** (startar Drill med upp till 8 frågor)
- Länk **Se alla [spår]-frågor →** (navigerar till Frågebank filtrerad på spåret)
- **← Tillbaka**-knapp till Hem

**Varför:** Tidigare landade alla tre kursknapparna i overlay-menyn på samma sida (Träna) — det saknades ett tydligt "hem" per kurs. En kursvy löser JTBD "Jag vill snabbt starta träning på mitt specifika spår" och "Jag vill se hur långt jag kommit i Python/UX/IT-H" på ett ställe.

**Designbeslut:**
- `← Tillbaka` navigerar till Hem, inte till en generell "bakåt"-historia, eftersom kursvyer är entry points från overlay — inte steg i ett djupt flöde.
- `goto-track-bank`-handlern sätter `filters.trackId` direkt innan sidbytet så Frågebanken är förfiltrerad när den öppnas — noll extra klick.
- Progress-% återanvänder `buildTrackProgress()` som redan är i use på Hem-sidan — ingen ny logik.
- CSS: `.course-action-btn` är `width: 100%` + `height: 44px` — tap-target >= 44px (a11y-standard) på mobil.

**Stitch-princip:** Progressive disclosure + Jobs-to-be-done. Kursvyn visar exakt vad som behövs för att starta eller djupdyka — inget mer.

---

## 2026-04-12 — T05 + T05b + T05c: Hem context-aware CTA + post-session actions

### T05: "Fortsätt där du slutade" CTA
**Vad:** Hem-sidans huvudkort är nu kontextkänsligt. När studiesessioner finns visas "Fortsätt där du slutade" med senast tränade spår + läge (t.ex. "Programmering 1 · Öva"). Knappen startar ett adaptivt pass via `createAdaptiveSuggestion()` — intelligent val av frågor, rätt spår.
**Varför:** En återvändande användare vill inte behöva orientera sig — de ska se vad de höll på med och direkt kunna fortsätta. Minskar friktionen från "öppna app" till "tränar". JTBD: "Hjälp mig att inte tappa tråden."
**Stitch-princip:** Progressive disclosure — visa det relevanta nu, resten på begäran.

### T05b: Empty state — ny användare
**Vad:** Inga sessioner = annat kort visas: "Välkommen · Välj vad du vill börja med · [Öppna träningsmenyn →]". Knappen öppnar overlay-menyn direkt. Progress-raden visar 0% men är inte dold.
**Varför:** En ny användare möts annars av noll-data som ser trasigt ut. Empty state-designen ger tydlig väg framåt utan att skrika "du har inte gjort något". Progressraden behålls för att sätta förväntningar om vad appen mäter.
**Stitch-princip:** "Design for the first-run experience as carefully as for the power user."

### T05c: Post-session — "Kör en till" + "Gå till Hem"
**Vad:** `renderLastResult()` omstrukturerad med tydlig session-rubrik ("Session klar! ✓"), poäng + svaga ämnen kompakt, sedan två primära CTAs: "▶ Kör en till" (nytt adaptivt pass) och "🏠 Gå till Hem". Detaljerad sektionsrapport + frågegenomgång bevaras under.
**Varför:** Gamla layouten begravde handlingsalternativen under textblock. De flesta användare vill antingen fortsätta träna eller avsluta — dessa val ska vara omedelbart synliga, inte kräva scroll. Informationshierarkin: handling → svag signal → detaljer.
**Stitch-princip:** "Primary action must always be visible without scrolling."

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

## 2026-09-24 — Länk till gamla högskoleprov på HP-startskärmen
- **Vad:** textlänk "Gamla högskoleprov med facit (studera.nu)" under "Starta dagens pass".
- **Varför:** Martin vill kunna bläddra i riktiga prov för att se formatet. Vi länkar till UHR i stället för att lägga upp kopior (upphovsrätt, alltid senaste proven).
- **Före/efter:** före fanns ingen väg till riktiga prov från appen; efter nås de med ett tryck, ovanför vecket i 375 × 812, tryckyta 44 px.
- **Stitch-princip:** sekundär handling som text, inte en andra knapp — en tydlig primär handling per skärm.

## 2026-10-04 — Fråga och svar ihop + "Nästa: matte" efter ORD-passet (Martins test)
- **Vad:** frågan/ordet och svarsalternativen hålls nu ihop som en grupp som ligger nedtill i tumzonen. ORD-sammanfattningen fick primärknappen "Nästa: matte XYZ/KVA/NOG/DTK" och "10 ord till", som föreslår ett otränat delprov och annars det med lägst andel rätt. "Klart för idag" blev sekundär. Rubriken "Träna matte som på provet" bytte namn till "Matteträning – uppgifter byggda på riktiga prov".
- **Varför:** Martins första egna test. Ordet satt överst och svaren nederst, så blicken fick hoppa över hela skärmen (dålig scannability). Han hittade inte heller matteträningen efter ORD-passet, och ordet "tvillingträning" sa honom ingenting.
- **Före/efter:** före var det ~250 px tomrum mellan ordet och svaren, efter 16 px. Före tog sammanfattningen bara slut, efter har den en tydlig nästa handling.
- **Princip:** närhetsprincipen (Gestalt) tillsammans med Fitts lag. Gruppen ankras i tumzonen i stället för att dela upp den. En nästa handling per skärm.

## 2026-10-04 — "Rekommenderat nu" på HP-hem
- **Vad:** HP-hem har en primärknapp som väljer nästa övning åt dig, med en rad om varför. Ordningen är: först ett mattedelprov du inte har provat, sedan dagens ord om de inte är gjorda, sedan det mattedelprov där du har lägst andel rätt. "Dagens 10 ord" ligger kvar som sekundär knapp.
- **Varför:** Martin ville öva på det han har mest problem med, eller på det han inte har provat än, utan att själv behöva välja. Det tar bort ett beslut från en ADHD-hjärna.
- **Före/efter:** före var den enda primärknappen "Starta dagens pass" (ORD), och matten låg under vecket. Efter står "Rekommenderat nu: Matte XYZ – problemlösning · Du har inte provat XYZ än" överst, och mattekorten syns utan scroll i 375 × 812.
- **Princip:** en tydlig nästa handling, med synlig motivering (förklarbarhet). Systemet bär beslutet.

## 2026-10-04 — "?"-hjälp på varje fråga (ORD, mattediagnos, matteträning)
- **Vad:** en "?"-knapp i topraden på alla frågevyer. Före svar öppnar den ett kompakt lager under svarsalternativen med frågans ledtråd (`hint`, om den finns) och "Så löser du [delprov]" med 2–3 punkter ur guidekorten, där förkortningen förklaras (t.ex. "NOG (tillräcklig information)"). Efter svar visar den metoden igen, utan ledtråd. Lagret stängs med "Stäng" eller ett nytt tryck på "?". Sammanfattningen visar "X med hjälp" när hjälpen öppnats före svar. Det räknas inte som fel.
- **Varför:** Martin ville ha mer stöd utan att första vyn blir tung. Allt extra ligger bakom en knapp, så frågan och svaren är lika rena som förut. Att man kan få hjälp utan att gissa gör att man vågar försöka (lägre tröskel), och metoden i guiden når fram i stunden den behövs i stället för i en separat guide.
- **Före/efter:** före fanns ingen hjälp i övningen, bara förklaring efter svar. Efter öppnas ett lager på 200–250 px under svarsalternativen. Fråga och svar rör sig inte, och lagret scrollas in i bild. Mätt i 375 × 812: frågans topp 136–163 px, avstånd fråga/tabell till första svaret 13–21 px (beslut 6 håller, inget `margin-top: auto`). "?" är en 28 px pill med 44 px träffyta via `::after`. Jag hittade och rättade också en sidledsförskjutning på DTK: den breda tabellen gjorde frågevyn 504 px bred i en 375 px skärm. Nu krymper vyn och tabellen scrollar för sig.
- **Beslut: tempomätaren pausas inte.** Hjälp kostar tid på provet också, och en mätare som pausar skulle ge en för snäll bild av tempot. Hjälpanvändning visas i stället som egen siffra. Lagret placeras under svaren i stället för under topraden så att frågan aldrig knuffas ner.
- **Stitch-princip:** progressiv avslöjning (hjälpen finns men tar ingen plats), tonal skiktning (`--surface-container` för lagret, `--honey` för ledtråden, ingen border), 3 fontstorlekar, pill-höjd 28 px.

## 2026-10-05 — Rubrik + Föregående/Hoppa över i alla HP-övningar (Martins mobiltest)
- **Vad:** (1) en rubrikrad under topraden i ORD, mattediagnos och matteträning ("ORD – ordförståelse", "Mattediagnos", "Matteträning · NOG – räcker informationen?"). (2) En rad med "← Föregående" och "Hoppa över →" direkt under svarsalternativen. Föregående öppnar föregående fråga i låst granskningsläge med ditt svar och feedbacken, med "Tillbaka till aktuell fråga". Hoppa över flyttar frågan sist i passet ("(överhoppad)" i progress när den återkommer); hoppar man över den när den redan är sist avslutas passet och sammanfattningen visar "Obesvarade: X".
- **Varför:** Martin såg inte vad övningen hette ("ser inte vad den heter") och saknade steg framåt och bakåt. Utan rubrik får man hålla koll på sammanhanget själv; utan Föregående går en slarvig tryckning inte att kolla i efterhand, och utan Hoppa över tvingas man gissa på en fråga man fastnat på, vilket ger fel data och stress. På riktiga HP hoppar man över och tar frågan sist, så övningen tränar samma strategi. Överhoppat räknas inte som fel, för det är ett val och inte ett misstag.
- **Placering:** raden ligger under svarsalternativen, inte i topraden (där Avbryt, progress, tempo och ? redan tar all bredd på 375 px) och inte i botten. Den syns utan scroll och följer beslut 6 (allt viktigt högt upp). Den ligger ändå skild från svarsknapparna med 12 px luft och är sekundär (28 px, dämpad färg), så den inte tas för ett svar.
- **Före/efter:** före fanns bara Avbryt och ett obevekligt framåt, ingen rubrik. Efter har varje övning en rubrik (frågans överkant 162–190 px, under 200 px i 375 × 812) och två sekundära steg. Ingen sidledsscroll.
- **Stitch-princip:** en tydlig primär handling per skärm (svara) med sekundära handlingar som dämpade pills; No-Line (tonal bakgrund `--surface-container`, ingen border); 3 fontstorlekar (text-sm för rubrik och pills, text-xs för "(överhoppad)"); pill-höjd 28 px med 44 px träffyta via `::after`. Teori: Nielsen, användarkontroll och frihet ("nödutgång" och ångra) samt synlighet av systemets status (rubrik, "överhoppad", "Obesvarade").

## 2026-10-05 — Hjälptrappa: Strategi → Ledtråd → nytt försök → Visa svar (mattediagnos, matteträning, LÄS)
- **Vad:** (1) "?" bytte namn till **Strategi** (28 px pill, 44 px träffyta) i alla övningar inklusive ORD; innehållet är oförändrat (allmän metod, inget frågespecifikt). (2) En **Ledtråd**-knapp (36 px, `--honey`) direkt under svarsalternativen, låst tills ett fel svar eller 30 s har gått på frågan; i mattediagnosen ersätter den "Vet inte". Ledtråden är frågans `hint` (matte) eller "Titta i stycke N" med knappen "Öppna stycke N" (LÄS). (3) **Första felet visar inte rätt svar**: valet markeras rött och inaktiveras, ledtråden visas automatiskt och man får försöka igen. Andra felet, eller **Visa svar** (syns först när ledtråden visats), visar rätt svar och full feedback som förut samt "Varför blev det fel?". (4) **Ärlig räkning** per fråga i sammanfattningen: "8 utan hjälp · 2 med ledtråd · 1 visade svar". (5) Frågor som krävde ledtråd eller där svaret visades går till repetitionskön (matteträning per delprov, LÄS per text) och lämnar den först när de klaras utan hjälp.
- **Varför:** ett svar-direkt-fel ger ingen inlärning, men hjälp direkt vid första svårigheten ger det inte heller. Forskningen pekar på en trappa: låt användaren försöka först (Kornell, Hays & Bjork 2009: misslyckade försök före facit förbättrar senare inlärning), ge hjälp när det behövs men inte före (Koedinger & Aleven 2007, "assistance dilemma"), och bromsa genvägen till facit (Aleven m.fl. 2016: att klicka sig till hjälp direkt, "hint abuse", ger sämre inlärning). Låsningen på 30 s eller ett fel är den bromsen. Att "med ledtråd" räknas separat och sparas som "utan hjälp = rätt" håller statistiken ärlig i stället för snäll.
- **Före/efter:** före visade första felsvaret rätt svar direkt, och mattediagnosen hade "Vet inte" som genväg. Efter är första felet ett nytt försök med en ledtråd, och facit kommer först efter andra felet eller Visa svar. Mätt i 375 × 812: frågans överkant 162–194 px (under 200), ledtrådsraden och ledtrådsrutan slutar före 650 px, ingen sidledsscroll. Raden har fast höjd (36 px) och Ledtråd låses upp utan omritning, så ingenting hoppar (beslut 6). Ledtråd byts mot Visa svar på samma plats, så tummen har ett ställe att titta på. Låst knapp förklarar sig själv: "efter ett fel eller 30 s".
- **Stitch-princip:** progressiv avslöjning, tonal skiktning (`--honey` för ledtråd, `--surface-container` för Visa svar, ingen border), 3 fontstorlekar (text-sm, text-md), pill-höjder 28 px (Strategi) och 36 px (Ledtråd, Visa svar) med 44 px träffyta via `::after`. Teori: kontrollerad svårighet (desirable difficulties, Bjork) och synlighet av systemets status.

---

## 2026-10-05 — Påminnelsekort i HP (efter svar)

**Vad:** En kortvy per problemtyp (formel, figur, varför, exempel, fällan på provet, extern länk). Nås via "Påminn mig: [titel]" i feedbacken i matteträning och mattediagnos (max 2), per område i diagnosgranskningen bredvid "Lär dig ↗", och som lista över alla 18 kort i guiden. "← Tillbaka" återvänder till exakt samma vy (feedback, granskning med öppna områden, guide).
**Varför:** Feedbacken sa vad som var rätt men inte hur metoden ser ut i sin helhet. Ett worked example med figur (Sweller; Mayer, split-attention) ger en kompakt repetition. Kortet visas aldrig före svar så att uppgiften inte blir lättare.
**Före:** Efter fel eller "Visa svar" fanns bara lösningen och en länk till Matteboken. **Efter:** Ett tryck ger en hel skärm med formel och figur, ett tryck tillbaka.
**Stitch-princip:** Tonal adjacency (formelruta i `--accent-soft`, fällan i `--honey`, figur på `--card`), No-Line (inga avdelare), tre fontstorlekar plus korttitel 1 rem. Pill 28 px med 44 px träffyta, listrader 44 px.

## 2026-10-05: Figurer i matteträningen (DTK-diagram, geometri i XYZ/KVA)
- **Vad:** tvillinguppgifter med figur ritas ovanför frågan i full bredd. Det gäller 24 DTK-uppgifter på 8 diagram/kartor och 12 XYZ/KVA-uppgifter med geometrisk figur. Tryck på figuren för att förstora den till dubbel bredd. Figuren scrollar då inne i sin egen ruta, och sidan scrollar aldrig i sidled. DTK-frågor som hör till samma figur kommer i följd, som på provet. DTK heter nu "diagram, tabeller, kartor" i rubriken.
- **Varför:** granskningen mot UHR:s format visade att DTK i appen bara hade tabeller, medan de flesta riktiga DTK-uppgifter är diagram och kartor. Uppgifter med figur i XYZ/KVA saknades också. Martin ville inte bli överraskad på provdagen.
- **Före/efter:** före fanns bara tabeller och textuppgifter. Efter finns linje-, stapel- och cirkeldiagram, kombinerade figurer, kartliknande figurer och geometrifigurer. Alla är ritade med currentColor och fungerar i ljust och mörkt läge.
- **Princip:** figuren först, sedan frågan, eftersom frågan inte går att förstå utan figuren (närhet). En tydlig handling för att förstora.

## 2026-10-08: "Är jag redo?" (översikt över delproven)
- **Vad:** ny vy från HP-hem, knappen "Är jag redo?" direkt under "I dag"-kortet (en slim 44 px-rad med mini-sammanfattning, "5/8 redo ›"). Vyn har överst "X av 8 redo · Y inte provade" och "Generalrepetition om N dagar" (t.o.m. 11 okt, sedan "Provet om N dagar"), därefter "Nästa enligt planen" (dagens första ej avbockade uppgift med Starta), sedan en rad per delprov (ORD, LÄS, MEK, ELF, XYZ, KVA, NOG, DTK) och mattediagnosen, sorterade grå, gul, grön. Varje rad har namn med förkortning förklarad, statuschip med ikon och text (○ Inte provat, ▲ Under målet, ✓ Redo), orsak när gul ("Under 70 %", "För långsamt"), senaste resultat ("7/10 utan hjälp"), tempo ("18 s/ord" med ✓ eller ✗) och knappen "Kör" som startar ett pass i exakt det delprovet. Länk "Se hela planen" längst ned; Tillbaka därifrån leder tillbaka till översikten.
- **Varför:** planen styr ordningen men visar inte var luckorna är. Utan en samlad bild är det lätt att överskatta sig (att det man tränar mest känns som det man kan). Att se vad man faktiskt klarar, mot ett tydligt mål, ger synlig status (Nielsen #1) och bättre kalibrering (metakognition). Grå först gör att det som saknas syns först; planen går ändå före, därför ligger "Nästa enligt planen" överst.
- **Statuslogik:** redo = minst 70 % utan hjälp i senaste passet (LÄS/ELF: de två senaste texterna ihop) och tempo inom budget (ORD 20 s/ord, MEK 50 s, XYZ/KVA 60 s, NOG/DTK 90 s, LÄS/ELF 2 min per fråga och 1 min per lucka). Mattediagnos: grön utan Lär om-områden, gul med, grå utan diagnos med frågedata. Okänt tempo (äldre matteresultat saknar tid) kan inte bekräftas och blir gult med "Tempo saknas, kör ett pass", i stället för att ge en för snäll grön.
- **Data:** ORD sparar nu resultat per pass (`yh.hp-ord-result`: rätt, antal, snittid) och matteträningen sparar svarstid (`seconds`). Tidigare ORD-pass saknar resultat och visas som "Inte provat" tills ett nytt pass är gjort.
- **Före/efter:** före fanns bara listan med delprov och planen. Efter finns en samlad statusvy; mätt i 375 × 812 ligger knappen i HP-hem på 738–782 px (planens "I dag"-kort oförändrat ovanför) och vyns sammanfattning, nästa-kort och de första raderna syns utan scroll. Ingen sidledsscroll, rad 56 px minst, "Kör" 36 px synlig med 44 px träffyta. Testat i ljust och mörkt.
- **Stitch-princip:** tonal skiktning (kort på `--card`, sammanfattning i fylld accent), No-Line (ingen avdelare), tre fontstorlekar (hero för rubrikraden, text-md, text-sm), färg bär aldrig betydelse ensam (ikon + text), statuschip med befintliga tokenpar (`--ok-ink`/`--ok-bg`, `--warn-ink`/`--warn-bg`, `--text-muted`/`--surface-highest`; kontrollerade av `scripts/check-dark-contrast.mjs`, 62/62).

## 2026-10-08: Formelträning (lär in, flashcards, successive relearning)
- **Vad:** ny vy från HP-hem (kortet "Formelträning" före matteträningskorten) och från Din plan, där "Formelträning, 5 min" ersätter "Dagens 10 ord". Ca 50 formler (areor, volymer, vinklar, likformighet, procent, statistik, sannolikhet, räta linjen, potenser, kvadreringsregler, bråk, hastighet, enheter). Nya formler lärs in fem åt gången (namn, formel stort, varför, knep i huvudet, exempel, "Jag har läst") följt av ett snabbtest. Därefter flashcards: framsidan är en uppgift, Martin tänker och vänder kortet. Baksidan visar namn, formel (stor), "I huvudet", "På papper" (hopfällt), uträkningen, och knapparna "Kunde inte" / "Kunde". "Räkna själv" (fyra svar) och "Påminn mig" är valfria. Missade kort kommer tillbaka tre kort längre bak i samma pass. Passet slutar med "Det här missade du" och "Kör repetitionen (1 min)".
- **Varför:** Martin har glömt formlerna och får ingen formelsamling eller miniräknare på provet. Han ska veta vilken formel, hur den ser ut och hur man räknar med den, i huvudet och på papper. Att plocka fram ur minnet (testing effect, Roediger & Karpicke 2006) fungerar först när något lärts in, därför kommer inlärning före flashcards. Successive relearning (Rawson & Dunlosky 2011, 2022): kriterium 1 per pass och ca tre pass med mellanrum; en formel är klar först när den klarats på första försöket tre olika dagar (Rawson m.fl. 2018: 68 % mot 26 % efter en vecka).
- **Före/efter:** före fanns ingen formelträning och planen hade tio ord om dagen. Efter finns en daglig femminuters-rutin med räknare per formel ("klarad 1 av 3") och totalt ("12 klara · 40 kvar"). "Är jag redo?" har en Formler-rad (grå, gul, grön vid minst 80 % klara eller på 2 av 3), och planraden bockas av automatiskt när passet är klart.
- **Mått (375 × 812, ljust och mörkt):** ett kort per skärm, framsidan har uppgiften överst och knappen direkt under; baksidan ryms utan scroll (de valfria fyra svaren i "Räkna själv" ligger under knapparna så att inget hoppar). Ingen sidledsscroll. Pill 36 px med 44 px träffyta (befintliga knappar), "På papper" 44 px rad.
- **Stitch-princip:** tonal skiktning (formeln i `--accent-soft`, uträkningen i `--honey`, kort på `--card`), No-Line, tre fontstorlekar plus hero för formeln, progressiv avslöjning (På papper och Räkna själv fälls ut först när man trycker), ingen skuld (inga röda markeringar för missade kort). Färg bär aldrig betydelse ensam: texterna "Rätt." och "Fel.".

## 2026-10-09: Fullt namn OCH förkortning tillsammans
- **Vad:** alla delprov visas som "Kvantitativa resonemang (NOG)", "Kvantitativa jämförelser (KVA)" och så vidare, i rubriker, kort, plan, guide och progress ("Resonemang (NOG) 1/6").
- **Varför:** när förkortningarna byttes mot bara fulla namn försvann kopplingen till de förkortningar som används i guiden, på provet och i chatten. Martin: "vafan är NOG nu då? ingenstans?"
- **Före/efter:** före stod bara "Kvantitativa resonemang". Efter står "Kvantitativa resonemang (NOG)".
- **Princip:** igenkänning före minne (Nielsen #6). Användaren ska kunna koppla etiketten till den term han möter på provet utan att behöva komma ihåg översättningen.

## 2026-10-09 (2): Förkortningen som rubrik, förklaringen under
- **Vad:** korten och "Är jag redo?" visar förkortningen stort ("NOG") och det fulla namnet som en rad under ("Kvantitativa resonemang – räcker informationen?"). I löpande text står "NOG – Kvantitativa resonemang", och i progress-texten bara förkortningen ("NOG 1/6"), eftersom rubriken ovanför förklarar den.
- **Varför:** Martin: "Förkortning som huvudrubrik, förklaring som text under … scannable." Förkortningen är det han möter på provet och ska kunna skumma efter. Förklaringen är stödet.
- **Före/efter:** före stod "Kvantitativa resonemang (NOG)" på en rad. Efter står "NOG" som rubrik och "Kvantitativa resonemang" under.
- **Princip:** visuell hierarki för skumläsning (F-mönster), där den korta igenkänningsbara etiketten står först. Igenkänning före minne.

## 2026-10-09 (3): Större text i övningarna
- **Vad:** inne i alla HP-övningar är typskalans tre steg ett snäpp större. Frågor och svar går från ca 14 till 17 px. Övriga sidor är oförändrade.
- **Varför:** Martin: "texten är för liten för att jag ska kunna läsa frågan så här dags".
- **Före/efter:** före 14 px, efter 17 px. Frågan och alla svar ryms fortfarande utan scroll i 375 × 812.
- **Princip:** läsbarhet före täthet där användaren läser mest. Tre storlekar i skalan, så designsystemet hålls.

## 2026-10-09 (4): Frågetext i normal vikt
- **Vad:** frågetexten i matteträningen är inte längre i fetstil (700 → 500) och har radavståndet 1,5.
- **Varför:** långa frågor med påståenden (1) och (2), till exempel i NOG, var tunga att läsa i fetstil på mobilen.
- **Princip:** brödtext läses bäst i normal vikt med luftigt radavstånd. Fetstil används för rubriker, inte för stycken.

## 2026-10-09 (5): Introskärm "Så fungerar NOG" och "Så fungerar KVA"
- **Vad:** första gången man startar ett pass i NOG eller KVA visas en genomgång före första frågan: vad uppgiften går ut på, de fem (NOG) eller fyra (KVA) svarsalternativen i klartext, metoden som tre numrerade steg, ett genomräknat exempel (NOG: kulorna i påsen, svar B. KVA: x² mot x, svar D) och fällorna i en honungsruta. Knappen "Jag fattar – kör" sitter fast längst ned. Genomgången går att öppna igen via Strategi → "Visa genomgången". Flaggor: `hp-nog-intro-seen`, `hp-kva-intro-seen`.
- **Varför:** Martin hade aldrig gjort eller inte mindes NOG och förstod inte formatet. Ett ovanligt format går inte att lära genom att gissa sig fram.
- **Före/efter:** före hamnade man direkt på en NOG-fråga med "(1) … (2) …" och fem svar utan förklaring. Efter får man formatet förklarat en gång, med ett exempel, och sedan aldrig mer om man inte ber om det.
- **Mått (375 × 812, ljust och mörkt):** en skärm och lite scroll, ingen sidledsscroll. Knappen 36 px med 44 px träffyta, fast ovanför flytande navigeringen. Tre nivåer: etikett och rubrik, kortrubrik, innehåll.
- **Princip:** worked example effect (Sweller): ett genomräknat exempel före egna uppgifter minskar den kognitiva belastningen för nybörjare. Progressiv avslöjning (en gång, sedan på begäran), igenkänning före minne, förkortningen som rubrik med förklaringen under. Färg bär inte betydelse ensam: svaret står som text.

## 2026-10-10: Synk mellan enheter (profilmenyn)
- **Vad:** ny sektion "Synk mellan enheter" i profilmenyn: statusrad ("Inte kopplad", "Synkad 13:42", "Kunde inte synka – försöker igen"), en länk som öppnar GitHub med scope `gist` förvald, ett fält för nyckeln och knappen "Koppla" (efter koppling: "Synka nu" och "Koppla från"). Synken sker i bakgrunden: 3 s efter varje ändring, när fliken lämnas och när appen öppnas igen. Exportera/Importera omfattar nu all användardata och importen slår ihop i stället för att skriva över.
- **Varför:** Martin pluggar på både Mac och iPhone och progress i localStorage följde inte med. Kravet var "inget strul, super snabbt och enkelt": en engångskoppling per enhet, sedan inga fler moment.
- **Före/efter:** före fick man ta en backup för hand och progress låg kvar på en enhet. Efter klistrar man in nyckeln en gång per enhet och därefter slås historiken ihop automatiskt. Användare utan nyckel synkas inte, så en gästanvändare påverkar inget.
- **Princip:** minimera användarens minnesbörda (Nielsen #6, igenkänning före minne) och systemstatus syns (Nielsen #1): en enda statusrad, inga popup-fönster. Tre textstorlekar och inga linjer som avdelare, palett-tokens i mörkt och ljust läge.
