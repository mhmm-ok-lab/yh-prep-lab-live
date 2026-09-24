# HP-flik — LÄS-spec (svensk läsförståelse, högskoleprovet 18 okt 2026)

_Skapad: 2026-09-25. Status: förslag, väntar på Martins beslut på öppna frågor (§5)._

Bakgrund: LÄS är Martins svåraste delprov — han tar för lång tid på sig. ADHD gör texttunga uppgifter extra krävande. Denna spec bygger vidare på samma designspråk och principer som `docs/HP-UX-SPEC.md` (tempo som produkt, fel som input, en tydlig nästa-handling, mobile first, 375 px).

---

## 1. LÄS i siffror

- **20 uppgifter totalt** per prov, fördelat på **10 uppgifter per provpass** (två verbala provpass). [hpspelet.se](https://www.hpspelet.se/delprov/las)
- **Rekommenderad provtid: 22 minuter** för LÄS-delen av passet → snittbudget **~2 min 12 s/uppgift**. [hpspelet.se](https://www.hpspelet.se/blog/lasforstaelse-svenska-hogskoleprovet-guide)
- Varje text är **ca en A4-sida**, med **2–4 frågor per text** (alltså ungefär 3–5 texter per pass). [hpspelet.se](https://www.hpspelet.se/delprov/las), [hpguiden.se](https://hpguiden.se/allt-om-hogskoleprovet/las-svensk-lasforstaelse)
- Fyra svarsalternativ per fråga, flervalsformat. [hpguiden.se](https://hpguiden.se/allt-om-hogskoleprovet/las-svensk-lasforstaelse)
- Frågetyper: **huvudtanke/helhetsförståelse**, **detalj/faktalokalisering**, **författarens syfte/attityd**, samt (enligt UHR:s princip) frågor som ska kunna besvaras **enbart med stöd av texten**, utan förkunskaper. [hpspelet.se](https://www.hpspelet.se/blog/lasforstaelse-svenska-hogskoleprovet-guide), [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)
- **Ingen minuspoäng** — fel svar kostar inget, blankt svar är alltid sämre än en gissning. [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)
- Texterna hämtas från varierande ämnen: historia, naturvetenskap, medicin, filosofi m.m. [hpspelet.se](https://www.hpspelet.se/delprov/las)

**ELF (engelsk läsförståelse) — samma metod?**
ELF liknar LÄS i uppbyggnad (10 uppgifter/pass, fyra svarsalternativ, huvudbudskap/detalj/ord-i-sammanhang/slutsats), men har tre undertyper: en längre text (som LÄS), flera korta texter med 1–2 frågor vardera, och en lucktext som mer testar ordförståelse. Rekommenderad tid är **22 minuter**, alltså samma tidspress som LÄS. [hpbuddy.se](https://www.hpbuddy.se/blog/hogskoleprovet/elf) — **Slutsats: samma kärnmetod (§2) funkar på ELF**, men lucktextdelen behöver ett eget litet ordförståelse-grepp senare, inte i v1.

---

## 2. Metoden vi lär ut

Evidensläge: att läsa frågorna innan texten är en etablerad och ofta rekommenderad provstrategi (sparar tid genom att styra vad man läser efter), men det är inte den enda vägen — forskning om lässtrategier i stort (Skolforskningsportalen, RT/CORI-program) stödjer strategianvändning generellt snarare än denna specifika ordning som överlägsen. [sprakforskning.se](https://www.sprakforskning.se/forskningsbloggen2/2015/11/10/strategier), [skolforskningsportalen.se](https://skolforskningsportalen.se/digital-publikation/lasforstaelse-och-undervisning-om-lasstrategier/), [hpguiden.se-forumet](https://hpguiden.se/forumet/topic/tips-angaende-denna-strategi-19565)

**5-stegsteknik ("Skumma → Sikta → Skjut"):**

1. **Skumma frågorna (ej alternativen), 15 s.** Läs bara frågestammarna för texten — vad ska du leta efter? Bygger en sökmall innan du läser.
2. **Skumläs texten, ~60 s.** Snabb orienteringsläsning för att fånga struktur och huvudtanke — inte varje ord. [hv.se](https://www.hv.se/student/studentstod/studieresurser/akademiskt-sprak/guide-till-lasande-skrivande-och-retorik/lasa-akademiska-texter/lasteknik/lasstrategier/)
3. **Besvara detaljfrågor med sökläsning.** Gå tillbaka till texten stycke för stycke, jaga bara det frågan efterfrågar. Uteslut minst 1–2 alternativ innan du väljer — höjer gissningschansen om du är osäker. [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)
4. **Svara på huvudtanke/syfte-frågor sist**, med hela texten i färskt minne.
5. **Fastna aldrig — gissa och gå vidare.** Ingen minuspoäng. Om en fråga tar >25 s extra: kvalificerad gissning (uteslut orimliga alternativ) och vidare. [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)

**Tidsbudget per text** (byggd på 2:12/uppgift-snittet, en text à 3 frågor ≈ 6–7 min):
- Skumma frågor: 15 s
- Skumläs text: 60 s
- Per fråga (sökläsning + svar): ~90 s
- Marginal/kvalificerad gissning: resten

---

## 3. Träningsläge i appen (mobile first, 375 px)

Följer samma principer som ORD-drillen: en primär handling åt gången, tempo synligt, fel som input.

**Skärmflöde:**
1. **Start** — "1 text idag" + ämnesetikett (t.ex. "Historia"), en knapp "Starta". Ingen konfiguration.
2. **Fråga-först-vy** — frågan visas överst, utan text under, med en knapp "Visa text". Tvingar steg 1 i metoden (skumma frågan innan texten syns) — och löser "vägg av text"-problemet genom att aldrig visa fråga + hel text samtidigt på en 375 px-skärm.
3. **Läsvy** — texten i korta stycken (max ~4 rader/skärmblock), med **tempomätare** (uppräknande sekunder, samma mönster som ORD:s 20 s-mål, men här mot textens tidsbudget från §2) synlig men diskret längst upp. En "Till frågan"-knapp längst ner (tumzon) växlar tillbaka.
4. **Växla fråga/text** — en enda flik-liknande toggle (inte scroll) mellan "Fråga" och "Text", så man aldrig behöver scrolla förbi en lång text för att se frågan igen. Textblocket kommer ihåg var man var.
5. **Markering** — tryck-och-håll eller enkel-tryck-markering av en mening i texten (gult, samma honey-ton som repetitionstaggar) som "bevis" för sitt svar — valfritt, men bygger aktiv läsvana. Ingen fritext, bara ett tryck.
6. **Svara** — fullbreddsknappar som i ORD, samma rätt/fel-feedback-mönster (grönt/rött) från HP-UX-SPEC §3.1.
7. **Sammanfattning per text** — rätt/fel, tid använd vs. budget ("6 min 40 s — inom budget ✓" / "9 min 10 s — 2 min över, var fastnade du?"), och **felanalys**:
   - **Missad detalj** — svaret fanns i texten men hittades inte (sökläsning-problem → coacha: "prova sökläsning härnäst")
   - **Feltolkat** — läste rätt ställe men drog fel slutsats (förståelseproblem → coacha: "läs meningen före/efter en gång till")
   - **Tidsbrist** — gissade pga. tidspress (coacha: "öva att skumma snabbare i steg 2")
   - (Automatisk gissning möjlig via svarstid + om markering saknades, men **manuell 1-knapps-taggning** direkt efter varje fråga är säkrare och billigt att bygga — låt Martin bekräfta/ändra taggen med en knapptryckning, inte skriva fritext.)

**Teknik-coachning som tonas ut:** Steg 1–2 visas som en tydlig instruktionsrad ("Skumma frågan → tryck Visa text") de första ~5 texterna. Därefter krymps texten till en liten ikon/påminnelse, och efter t.ex. 15 texter försvinner den helt om användaren konsekvent ligger inom tidsbudget (samma "fading scaffold"-princip som ORD:s tempomätare, fast i motsatt riktning: här introduceras full guidning direkt och tonas ner, i ORD-beslutet syns tempot direkt utan tonING — värt att notera skillnaden till Martin, se §5 fråga 2).

---

## 4. Innehåll — vi får inte kopiera UHR:s texter

UHR:s provtexter är upphovsrättsskyddat material och får inte kopieras eller återpubliceras i appen. Tre lagliga vägar:

1. **Egna texter i HP-stil, AI-skrivna.** Snabbast att skala, full kontroll över ämne/svårighetsgrad/frågetyp. Risk: kan drifta från UHR:s faktiska stil om inte kalibrerat mot riktiga prov regelbundet.
2. **Public domain-texter** (t.ex. Litteraturbanken eller Project Runeberg — svensk skönlitteratur/facktext, upphovsrätt går ut 70 år efter författarens död). [Litteraturbanken/Wikipedia](https://en.wikipedia.org/wiki/Swedish_Literature_Bank), [Project Runeberg](https://runeberg.org/). Fördel: äkta, varierad svenska. Nackdel: äldre språkbruk matchar inte alltid HP:s moderna sakprosa-ton, och egna frågor måste ändå konstrueras för hand.
3. **Länk till riktiga gamla prov på studera.nu + "facit-läge" i appen.** Redan beslutat för ORD-listan (se HP-UX-SPEC §Beslut punkt 5) att UHR:s material är fri att referera men inte kopiera. Samma princip här: appen länkar till PDF:erna på studera.nu, användaren löser texten där (eller printar), matar sedan bara in sina svar (A/B/C/D) i appen för att få tempo-mätning, rättning och felanalys — utan att en enda rad UHR-text lagras eller visas i appen.

**Rekommendation:** Kombinera **väg 3 som huvudspår** (facit-läge på riktiga prov — mest autentiskt, noll copyright-risk, återanvänder Repetitionskö/statistik-infrastrukturen) med **väg 1 som komplement** för dagliga korta drillpass mellan de riktiga proven (kontrollerad svårighetsgrad, kan göras texttyp-specifik för att träna en enda felkategori i taget). Väg 2 (public domain) är intressant men lägre prioritet — språket matchar sämre och ger inte samma frågekvalitet per investerad tid.

---

## 5. Öppna frågor till Martin

1. **Facit-läge på riktiga prov (§4, väg 3):** ska appen bara ta emot dina svar (A/B/C/D) och räkna rätt/tid, eller ska den även visa vilken fråga du var på (fråganummer + kort ämnesetikett) så felanalysen blir mer träffsäker?
   - a) Bara svar in, minimal — snabbast att bygga **(rekommenderas: matchar "kort och dagligt"-principen, ingen risk att av misstag klistra in UHR-text)**
   - b) Svar + fråganummer + ämnesetikett för bättre felanalys

2. **AI-genererade texter (§4, väg 1):** ska de kalibreras mot ett specifikt ämnesspann (historia/naturvetenskap/filosofi som UHR faktiskt använder) från start, eller börja generiskt och förfinas efter att du märkt vilka ämnen du har svårast för?
   - a) Kalibrera från start mot UHR:s ämnesspann **(rekommenderas: mer autentisk träning direkt)**
   - b) Generiskt först, förfina senare baserat på din felstatistik

3. **Markering i texten (§3, steg 5):** vill du ha den här funktionen alls, eller känns det som ett extra steg som bara saktar ner dig?
   - a) Ja, bygg den — aktiv läsning hjälper minnet
   - b) Nej, hoppa över — håll flödet så enkelt som möjligt **(rekommenderas: minsta motstånd för v1, kan läggas till senare om felanalysen visar att "missad detalj" är ditt vanligaste fel)**

4. **Felkategori-taggning (§3, steg 7):** manuell 1-knapps-bekräftelse efter varje fråga, eller helt automatisk gissning (baserat på svarstid) utan att du behöver trycka något extra?
   - a) Manuell 1-knapps-taggning **(rekommenderas: mer träffsäkert, kostar bara en extra knapptryckning per fråga, matchar beslutet ni redan tagit för matte-delproven i HP-UX-SPEC)**
   - b) Helt automatiskt — snabbare men mindre träffsäkert

5. **Fading scaffold (§3):** LÄS-coachningen föreslås tonas ned efter ~15 texter om du ligger inom tidsbudget. Vill du ha den logiken, eller hellre en manuell knapp ("dölj instruktioner") som du styr själv?
   - a) Automatisk nedtoning efter prestation **(rekommenderas: kräver ingen egen handling av dig, minskar valstress)**
   - b) Manuell knapp du styr själv

---

## Guide: bli bättre på LÄS (appinnehåll)

Den här guiden är skriven för att klistras in rakt av i appen — varje knep ryms på en mobilskärm.

### Knepen

**1. Läs frågan, inte texten, först**
Så gör du: innan du ens tittar på texten, läs de 2–4 frågorna som hör till den. Du vet nu vad du letar efter.
Varför det funkar: du läser texten med ett syfte i stället för att läsa allt lika noga — sparar tid och energi. [hpguiden.se](https://hpguiden.se/forumet/topic/tips-angaende-denna-strategi-19565)

**2. Skumma innan du fördjupar**
Så gör du: läs texten snabbt en gång för att fånga struktur och huvudtanke — inte varje ord. Fördjupa dig först när du letar efter en detalj.
Varför det funkar: skumläsning ger en helhetsbild snabbt, vilket gör den senare sökläsningen effektivare. [hv.se](https://www.hv.se/student/studentstod/studieresurser/akademiskt-sprak/guide-till-lasande-skrivande-och-retorik/lasa-akademiska-texter/lasteknik/lasstrategier/)

**3. Använd fingret som ankare**
Så gör du: låt fingret (eller pekaren på skärmen) följa raden du läser. När du hoppar tillbaka för att leta detaljer, använd det för att hålla koll på var du är.
Varför det funkar: ett fysiskt ankare minskar risken att tappa platsen och läsa om samma stycke i onödan — särskilt vid koncentrationssvårigheter.

**4. Ett stycke i taget, inte hela texten**
Så gör du: dela texten i sina naturliga stycken. Läs ett stycke, fråga dig snabbt "vad handlade det om?", gå vidare.
Varför det funkar: chunking minskar belastningen på arbetsminnet — du hanterar mindre bitar i taget i stället för att hålla hela texten i huvudet. [Bedrock Learning](https://bedrocklearning.org/literacy-blogs/improving-reading-comprehension-for-students-with-adhd/)

**5. Sätt en tidsruta per text**
Så gör du: bestäm i förväg hur många minuter texten + frågorna får ta (se tidsbudget i §2) och håll koll med en synlig klocka, inte en nedräkning.
Varför det funkar: en tydlig tidsruta motverkar tidsblindhet och hjälper dig fördela tiden jämnt över hela passet, i stället för att en text äter upp resten.

**6. Uteslut innan du väljer**
Så gör du: läs alla fyra alternativ och stryk mentalt (eller peka bort) de som är uppenbart fel innan du väljer bland de kvarvarande.
Varför det funkar: att eliminera 1–2 alternativ höjer din träffchans rejält även när du är osäker. [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)

**7. Fastna aldrig — gissa och gå vidare**
Så gör du: om en fråga tar längre än din tidsruta, gör en kvalificerad gissning och gå direkt vidare. Markera den gärna för att kika på den sist om du hinner.
Varför det funkar: ingen minuspoäng finns på högskoleprovet, så ett fastnat svar kostar bara tid — ett gissat svar kostar ingenting extra. [hogskoleprovskurser.se](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)

**8. Svara på "vad handlar det om"-frågor sist**
Så gör du: spara huvudtanke- och syftesfrågor till efter att du besvarat detaljfrågorna för samma text.
Varför det funkar: du har då läst hela texten mest noggrant och har helhetsbilden färskast i minnet.

### Daglig vana, 10 min

Träna på texttyper som återkommer i LÄS: **populärvetenskap** (t.ex. artiklar om forskning), **debattartiklar** (opinion/argumenterande text) och **samhällstext** (nyhetsanalyser, historia). Läs en kort artikel om dagen från t.ex. en dagstidnings kultur-/debattsida eller en populärvetenskaplig sajt.

Läs aktivt, inte passivt:
- Stanna efter varje stycke och sammanfatta det för dig själv i en mening.
- Fråga dig: "vad är författarens poäng här — och håller jag med?"
- Lägg märke till värdeladdade ord (t.ex. "tyvärr", "tveklöst") — de avslöjar ofta författarens attityd, vilket är precis vad syftesfrågor testar.

10 minuter räcker — målet är repetition av vanan, inte volym.

### På provdagen

- Läs frågorna före texten, varje gång — låt det vara automatiskt, inte ett val du tar ställning till under press.
- Håll din tidsruta per text synlig och lita på den, även om det känns som du "nästan" löst en svår fråga.
- Gissa och gå vidare direkt när tiden är ute på en fråga — kom ihåg: ingen minuspoäng.
- Spara de svåraste texterna till sist om provet tillåter fri navigering inom passet — bygg självförtroende med de lättare först.
- Andas en gång innan du börjar ett nytt pass — en kort paus kostar sekunder men återställer fokus.

---

## Källor

- [hpspelet.se — LÄS på högskoleprovet 2026](https://www.hpspelet.se/delprov/las)
- [hpspelet.se — Läsförståelse högskoleprovet: Komplett guide till LÄS-delen](https://www.hpspelet.se/blog/lasforstaelse-svenska-hogskoleprovet-guide)
- [hpguiden.se — Svensk läsförståelse (LÄS) på högskoleprovet](https://hpguiden.se/allt-om-hogskoleprovet/las-svensk-lasforstaelse)
- [hpguiden.se — forumtråd: Tips angående denna strategi](https://hpguiden.se/forumet/topic/tips-angaende-denna-strategi-19565)
- [hogskoleprovskurser.se — LÄS-strategi](https://www.hogskoleprovskurser.se/besegra-hogskoleprovet/besegra-verbal/las-strategi/)
- [Bedrock Learning — Improving reading comprehension for students with ADHD](https://bedrocklearning.org/literacy-blogs/improving-reading-comprehension-for-students-with-adhd/)
- [hpbuddy.se — ELF högskoleprovet: guide till engelsk läsförståelse](https://www.hpbuddy.se/blog/hogskoleprovet/elf)
- [sprakforskning.se — Strategier för läsförståelse - evidens för alla](https://www.sprakforskning.se/forskningsbloggen2/2015/11/10/strategier)
- [skolforskningsportalen.se — Läsförståelse och undervisning om lässtrategier](https://skolforskningsportalen.se/digital-publikation/lasforstaelse-och-undervisning-om-lasstrategier/)
- [hv.se — Lässtrategier](https://www.hv.se/student/studentstod/studieresurser/akademiskt-sprak/guide-till-lasande-skrivande-och-retorik/lasa-akademiska-texter/lasteknik/lasstrategier/)
- [Wikipedia — Swedish Literature Bank](https://en.wikipedia.org/wiki/Swedish_Literature_Bank)
- [Project Runeberg](https://runeberg.org/)
