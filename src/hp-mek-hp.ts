// HP MEK på provnivå: egna uppgifter (inga UHR-texter). Nivå: 3 lätt, 4 medel, 3 svår.
// Svåra uppgifter har abstrakt ordförråd och två eller tre luckor som måste stämma med varandra.
// Ligger först i HP_MEK_ITEMS, så de delas ut före de äldre.
import type { HpMekItem } from "./hp-mek";

export const HP_MEK_ITEMS_HP: HpMekItem[] = [
  {
    id: "mek-hp-01",
    level: "latt",
    text: "Fladdermöss orienterar sig med hjälp av ekolokalisering. De sänder ut höga ljud och tolkar ekot som studsar tillbaka, vilket gör att de kan jaga insekter även i totalt ___.",
    options: [
      { fills: ["mörker"], why: "Rätt. Poängen med ekolokalisering är att den ersätter synen; 'även i' pekar på ett läge där man inte ser." },
      { fills: ["tystnad"], why: "Fel. Fladdermössen sänder själva ut ljud, så tystnad är inget hinder som 'även i' kan syfta på." },
      { fills: ["oväder"], why: "Fel. Inget i texten handlar om väder; ekot ersätter synen, inte skydd mot vind och regn." },
      { fills: ["ensamhet"], why: "Fel. Ensamhet påverkar inte förmågan att hitta byten; det passar inte med ekolokalisering." },
    ],
    correct: 0,
    hint: "Vad ersätter ekolokaliseringen? 'Även i' pekar på det svåraste läget för det sinnet.",
  },
  {
    id: "mek-hp-02",
    level: "latt",
    text: "Kommunen hade räknat med att den nya cykelbanan skulle minska biltrafiken i centrum. Mätningarna visade ___ att trafiken var i stort sett oförändrad.",
    options: [
      { fills: ["därför"], why: "Fel. 'Därför' anger orsak–följd, men oförändrad trafik är ingen följd av förväntningen." },
      { fills: ["dock"], why: "Rätt. Förväntningen (minskning) och utfallet (oförändrat) står mot varandra, och 'dock' markerar kontrast." },
      { fills: ["dessutom"], why: "Fel. 'Dessutom' lägger till något i samma riktning, men utfallet går emot förväntningen." },
      { fills: ["alltså"], why: "Fel. 'Alltså' drar en slutsats av det föregående, men resultatet motsäger det föregående." },
    ],
    correct: 1,
    hint: "Jämför vad kommunen räknade med och vad mätningarna visade. Stämmer de eller krockar de?",
  },
  {
    id: "mek-hp-03",
    level: "latt",
    text: "Arkeologerna kunde inte ___ fynden förrän proverna hade analyserats i laboratoriet; först då gick det att fastställa att föremålen var omkring 3 000 år gamla.",
    options: [
      { fills: ["lokalisera"], why: "Fel. Fynden var redan hittade; det som återstod enligt semikolonets fortsättning var åldern." },
      { fills: ["restaurera"], why: "Fel. Att restaurera är att laga; texten handlar om att fastställa ålder." },
      { fills: ["datera"], why: "Rätt. Att datera är att bestämma ålder, vilket förklaras efter semikolonet: 'omkring 3 000 år gamla'." },
      { fills: ["exponera"], why: "Fel. Att exponera är att visa upp; det kräver ingen laboratorieanalys." },
    ],
    correct: 2,
    hint: "Läs efter semikolonet: vad var det som gick att fastställa först efter analysen?",
  },
  {
    id: "mek-hp-04",
    level: "medel",
    text: "Den som tror att stora upptäckter alltid sker plötsligt bör läsa vetenskapshistoria. Där framstår genombrotten oftare som resultatet av ett ___ arbete än som en ___ insikt.",
    options: [
      { fills: ["långvarigt", "plötslig"], why: "Rätt. Andra meningen vänder på tron i första: långt arbete i stället för den 'plötsliga' insikten man trodde på." },
      { fills: ["hastigt", "plötslig"], why: "Fel. Ett hastigt arbete är ingen motsats till en plötslig insikt, så 'oftare … än' får ingen kontrast." },
      { fills: ["utdraget", "successiv"], why: "Fel. 'Utdraget' passar, men 'successiv insikt' är ingen motsats till utdraget arbete, och kopplingen till 'plötsligt' försvinner." },
      { fills: ["ensamt", "gemensam"], why: "Fel. Texten ställer plötsligt mot långsamt, inte ensamt mot gemensamt." },
    ],
    correct: 0,
    hint: "Andra meningen ska motsäga tron i första. Vilket ord i första meningen bör ekas i den andra luckan?",
  },
  {
    id: "mek-hp-05",
    level: "medel",
    text: "Utredningen konstaterade att reformen visserligen hade kortat köerna, men att den samtidigt fått ___ konsekvenser för de mindre vårdcentralerna, som tvingats skära ned på personalen.",
    options: [
      { fills: ["marginella"], why: "Fel. Att skära ned på personalen är ingen marginell följd, så slutet av meningen motsäger ordet." },
      { fills: ["gynnsamma"], why: "Fel. 'Visserligen … men' kräver en motsats till det positiva (kortare köer), och nedskärningar är inte gynnsamma." },
      { fills: ["förutsägbara"], why: "Fel. Det är inte förutsägbarheten som står mot de kortare köerna; 'men' kräver något negativt." },
      { fills: ["menliga"], why: "Rätt. 'Menliga' betyder skadliga, vilket ger den motsats som 'visserligen … men' kräver och stämmer med nedskärningarna." },
    ],
    correct: 3,
    hint: "'Visserligen … men' ställer något bra mot något annat. Vad sägs om de mindre vårdcentralerna i slutet?",
  },
  {
    id: "mek-hp-06",
    level: "medel",
    text: "Kritikerna hävdade att projektet var för dyrt. Förespråkarna medgav att kostnaderna var höga, men framhöll ___ att alternativet, att inte göra något alls, på sikt skulle bli ännu dyrare.",
    options: [
      { fills: ["följaktligen"], why: "Fel. 'Följaktligen' anger en slutsats, men förespråkarnas poäng följer inte av att de medger höga kostnader." },
      { fills: ["samtidigt"], why: "Rätt. Förespråkarna medger en sak och lyfter 'samtidigt' fram en annan, som väger upp den." },
      { fills: ["exempelvis"], why: "Fel. Det som följer är inget exempel på något tidigare nämnt, utan ett nytt motargument." },
      { fills: ["dessförinnan"], why: "Fel. Ett tidsord passar inte; det handlar om hur argumenten förhåller sig till varandra, inte om ordningen i tid." },
    ],
    correct: 1,
    hint: "Förespråkarna både medger och invänder. Vilket ord låter två saker gälla på en gång?",
  },
  {
    id: "mek-hp-07",
    level: "medel",
    text: "Länge ansågs fettet i kosten vara den främsta orsaken till hjärtsjukdom. Senare forskning har ___ den bilden; i dag betraktas sambandet som betydligt mer ___ än man tidigare trott.",
    options: [
      { fills: ["bekräftat", "komplext"], why: "Fel. Om bilden bekräftats vore sambandet inte 'mer komplext än man trott'; luckorna motsäger varandra." },
      { fills: ["nyanserat", "entydigt"], why: "Fel. En bild som nyanseras blir inte mer entydig; luckorna drar åt olika håll." },
      { fills: ["nyanserat", "komplext"], why: "Rätt. Bilden av en 'främsta orsak' har nyanserats, och därför ses sambandet som mer komplext. Luckorna stöder varandra." },
      { fills: ["förenklat", "komplext"], why: "Fel. Att förenkla bilden går emot att sambandet i dag ses som mer komplext." },
    ],
    correct: 2,
    hint: "Semikolonet förklarar vad forskningen gjort med bilden. Luckorna måste dra åt samma håll.",
  },
  {
    id: "mek-hp-08",
    level: "svar",
    text: "Filosofen menade att det inte räcker att en handling får goda följder för att den ska vara moraliskt riktig. Avsikten bakom den är minst lika ___; en god gärning som utförs av ren ___ förtjänar enligt hennes synsätt inget beröm.",
    options: [
      { fills: ["irrelevant", "tillfällighet"], why: "Fel. 'Det räcker inte' med följderna betyder att avsikten spelar roll; 'irrelevant' säger motsatsen." },
      { fills: ["väsentlig", "plikt"], why: "Fel. Den som handlar av plikt har en avsikt, så enligt filosofens synsätt borde gärningen förtjäna beröm." },
      { fills: ["avgörande", "övertygelse"], why: "Fel. Första ordet fungerar, men en gärning av övertygelse har en avsikt bakom sig och borde därför förtjäna beröm." },
      { fills: ["väsentlig", "tillfällighet"], why: "Rätt. Avsikten är väsentlig, och därför saknar en gärning som sker av tillfällighet, alltså utan avsikt, moraliskt värde." },
    ],
    correct: 3,
    hint: "Om avsikten är det viktiga, vad måste då saknas i en god gärning som inte förtjänar beröm?",
  },
  {
    id: "mek-hp-09",
    level: "svar",
    text: "Historikern varnade för att läsa medeltida krönikor som ___ redogörelser för vad som hände. Krönikörerna skrev ofta på uppdrag av en furste, och deras texter är därför snarare ___ än dokumenterande.",
    options: [
      { fills: ["objektiva", "legitimerande"], why: "Rätt. Den som skriver på uppdrag av en furste rättfärdigar (legitimerar) hans makt; därför ska texterna inte läsas som objektiva." },
      { fills: ["partiska", "legitimerande"], why: "Fel. Historikern varnar inte för att läsa dem som partiska; poängen är just att de är det. Första luckan vänds." },
      { fills: ["objektiva", "kronologiska"], why: "Fel. Att texterna är kronologiska följer inte av att de skrevs på uppdrag av en furste, och står inte mot 'dokumenterande'." },
      { fills: ["tillförlitliga", "beskrivande"], why: "Fel. 'Beskrivande' betyder ungefär detsamma som 'dokumenterande', så 'snarare … än' får ingen kontrast." },
    ],
    correct: 0,
    hint: "'Snarare … än' kräver en motsats till 'dokumenterande'. Vad gör en text som skrivs på uppdrag av en furste?",
  },
  {
    id: "mek-hp-10",
    level: "svar",
    text: "Att ett drag är ___ betyder inte att det är oföränderligt. Även egenskaper som till stor del styrs av gener påverkas av miljön, och förhållandet mellan arv och miljö bör därför förstås som ett ___ snarare än som en ___.",
    options: [
      { fills: ["förvärvat", "samspel", "motsättning"], why: "Fel. Andra meningen handlar om egenskaper som styrs av gener, så första luckan måste handla om arv, inte om något förvärvat." },
      { fills: ["ärftligt", "motsättning", "samspel"], why: "Fel. Ordningen är vänd: när gener och miljö påverkar samma egenskap är det ett samspel, inte en motsättning." },
      { fills: ["ärftligt", "samspel", "helhet"], why: "Fel. 'Snarare än' kräver en motsats, och ett samspel och en helhet är inga motsatser." },
      { fills: ["ärftligt", "samspel", "motsättning"], why: "Rätt. 'Ärftligt' förbereds av 'styrs av gener', och att gener och miljö verkar tillsammans är ett samspel snarare än en motsättning." },
    ],
    correct: 3,
    hint: "Vilket ord i andra meningen förklarar första luckan? Och vad är motsatsen till att två saker verkar tillsammans?",
  },
];
