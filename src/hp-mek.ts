// HP MEK-träning (meningskomplettering): egna korta texter med luckor (inga UHR-texter).
import type { HpLevel } from "./hp-las";

export interface HpMekOption {
  /** Ord för varje lucka i ordning, t.ex. ["dock", "förvånande"]. */
  fills: string[];
  /** Varför alternativet passar eller inte — pekar på ledordet i texten. */
  why: string;
}

export interface HpMekItem {
  id: string;
  /** Texten med luckor markerade som ___ (1–3 luckor). */
  text: string;
  /** Fyra alternativ A–D, som på provet. */
  options: [HpMekOption, HpMekOption, HpMekOption, HpMekOption];
  /** Index (0–3) för rätt alternativ. */
  correct: number;
  /** Ledtråd efter ett fel svar: vilket signalord/samband att titta på, aldrig svaret. */
  hint: string;
  /** Svårighetsgrad; saknas = "latt". */
  level?: HpLevel;
}

export const HP_MEK_ITEMS: HpMekItem[] = [
  {
    id: "mek-01",
    text: "Forskarna väntade sig en tydlig effekt, men resultaten var ___ svaga att de inte gick att skilja från slumpen.",
    options: [
      { fills: ["så"], why: "'Så … att' bildar en följdkonstruktion: graden i första ledet leder till följden efter 'att'." },
      { fills: ["lika"], why: "'Lika' kräver jämförelse med 'som', inte en följd med 'att'." },
      { fills: ["nog"], why: "'Nog' fungerar som förstärkning efter adjektivet ('svaga nog'), men inte före det i en följdkonstruktion." },
      { fills: ["ganska"], why: "'Ganska' graderar bara svagt och kan inte följas av ett följdled med 'att'." },
    ],
    correct: 0,
    hint: "Titta på hur ledet efter luckan inleds med 'att' och vilken konstruktion som kräver det.",
  },
  {
    id: "mek-02",
    text: "Det är inte ovanligt att nya lagar får oavsiktliga ___ som lagstiftarna aldrig förutsåg.",
    options: [
      { fills: ["förutsättningar"], why: "Förutsättningar finns före en lag, de uppstår inte oförutsett efteråt." },
      { fills: ["följder"], why: "'Oavsiktliga följder' är ett fast uttryck: något som uppstår som resultat av lagen." },
      { fills: ["orsaker"], why: "Orsaker ligger bakom lagen, inte efter den; samband vänds fel." },
      { fills: ["villkor"], why: "Villkor sätts avsiktligt, så 'oavsiktliga villkor' är en motsägelse." },
    ],
    correct: 1,
    hint: "Fråga dig vad en lag 'får' i efterhand, och vad som kan vara oförutsett.",
  },
  {
    id: "mek-03",
    text: "Museet har ___ sina öppettider efter kritik från besökare som arbetar dagtid.",
    options: [
      { fills: ["förkortat"], why: "Kortare tider skulle förvärra problemet för dagtidsarbetande." },
      { fills: ["överlåtit"], why: "Man överlåter ansvar eller ägande, inte öppettider." },
      { fills: ["utökat"], why: "Kritik från dem som arbetar dagtid motiveras av att man utökar tiderna, t.ex. på kvällen." },
      { fills: ["återkallat"], why: "Man återkallar beslut eller tillstånd, inte öppettider, och det löser inget." },
    ],
    correct: 2,
    hint: "Ledordet 'efter kritik' pekar på en förändring som svarar mot besökarnas problem.",
  },
  {
    id: "mek-04",
    text: "Han följde formellt reglerna men ___ ändå deras syfte, vilket väckte stark kritik.",
    options: [
      { fills: ["uppfyllde"], why: "Att uppfylla syftet vore ingen motsats och skulle inte väcka kritik." },
      { fills: ["respekterade"], why: "Att respektera syftet strider mot 'men ändå' och mot kritiken." },
      { fills: ["tillgodosåg"], why: "Att tillgodose syftet skulle inte förklara kritiken." },
      { fills: ["kringgick"], why: "'Men … ändå' ger en motsats till att följa reglerna: man kringgår deras syfte." },
    ],
    correct: 3,
    hint: "'Men … ändå' och 'formellt' signalerar att det som sägs efter luckan går emot det första ledet.",
  },
  {
    id: "mek-05",
    text: "Ekonomer är ofta oense om orsakerna till inflation; ___ är de flesta överens om att åtgärder måste vidtas snabbt.",
    options: [
      { fills: ["likväl"], why: "'Likväl' markerar en motsats trots det förra: oenighet om orsaker, men ändå enighet om åtgärder." },
      { fills: ["därför"], why: "'Därför' anger följd, men enigheten följer inte av oenigheten." },
      { fills: ["nämligen"], why: "'Nämligen' förklarar något föregående och står inte först i satsen." },
      { fills: ["exempelvis"], why: "'Exempelvis' inleder ett exempel; andra ledet exemplifierar inte det första." },
    ],
    correct: 0,
    hint: "Första ledet beskriver oenighet, andra enighet: vilket samband binder ihop dem?",
  },
  {
    id: "mek-06",
    text: "Språkforskare menar att dialekter inte försvinner utan snarare ___ när människor från olika landsdelar möts.",
    options: [
      { fills: ["försvinner"], why: "Upprepar det som nekas i 'inte försvinner', så 'utan snarare' tappar mening." },
      { fills: ["omformas"], why: "'Utan snarare' kräver en motsats till försvinner: dialekterna förändras och blandas." },
      { fills: ["avtar"], why: "Att avta är nära att försvinna, alltså ingen motsats." },
      { fills: ["dör ut"], why: "Betyder i praktiken samma sak som 'försvinner'." },
    ],
    correct: 1,
    hint: "'Inte … utan snarare' ställer två alternativ mot varandra.",
  },
  {
    id: "mek-07",
    text: "Reformen kritiserades hårt av oppositionen, ___ den till slut röstades igenom med knapp majoritet.",
    options: [
      { fills: ["eftersom"], why: "Kritiken är inte orsaken till att reformen röstades igenom." },
      { fills: ["om"], why: "'Om' skapar ett villkor som inte stämmer med ett faktiskt utfall." },
      { fills: ["men"], why: "'Men' markerar motsats: hård kritik, men ändå antagen." },
      { fills: ["så"], why: "'Så' anger följd; kritiken ledde inte till att reformen antogs." },
    ],
    correct: 2,
    hint: "Vilken liten konjunktion visar att utfallet går emot förväntan efter hård kritik?",
  },
  {
    id: "mek-08",
    text: "Efter förlusten i Stora nordiska kriget ___ Sverige större delen av sina besittningar på andra sidan Östersjön.",
    options: [
      { fills: ["erövrade"], why: "Efter en förlust erövrar man inte nya områden." },
      { fills: ["utvidgade"], why: "Utvidgning motsäger 'förlusten'." },
      { fills: ["behöll"], why: "'Förlusten' visar att man inte behöll sina besittningar." },
      { fills: ["förlorade"], why: "Förlust leder följdriktigt till att besittningar går förlorade." },
    ],
    correct: 3,
    hint: "'Efter förlusten' avgör riktningen på verbet.",
  },
  {
    id: "mek-09",
    text: "Studien visade ett samband mellan sömnbrist och dåligt minne, men det betyder inte ___ att sömnbristen orsakar minnesproblemen.",
    options: [
      { fills: ["nödvändigtvis"], why: "'Inte nödvändigtvis' är ett fast uttryck: samband bevisar inte orsak." },
      { fills: ["möjligtvis"], why: "'Inte möjligtvis' ger ingen rimlig betydelse här." },
      { fills: ["särskilt"], why: "'Inte särskilt att' är ogrammatiskt och ändrar innebörden." },
      { fills: ["ofelbart"], why: "'Ofelbart' passar inte som förstärkning efter negationen i detta uttryck." },
    ],
    correct: 0,
    hint: "'Samband' kontra 'orsakar' är den logiska skillnaden som luckan ska markera.",
  },
  {
    id: "mek-10",
    text: "Förslaget fick ___ stöd bland ledamöterna, och omröstningen blev därför ovanligt jämn.",
    options: [
      { fills: ["brett"], why: "Brett stöd ger en ensidig, inte jämn, omröstning." },
      { fills: ["delat"], why: "Delat stöd leder följdriktigt till en jämn omröstning ('därför')." },
      { fills: ["enhälligt"], why: "Enhälligt stöd utesluter jämn omröstning." },
      { fills: ["starkt"], why: "Starkt stöd ger inte en jämn omröstning." },
    ],
    correct: 1,
    hint: "'Jämn' omröstning och 'därför' pekar på hur stödet var fördelat.",
  },
  {
    id: "mek-11",
    text: "Det nya systemet sparar tid i det dagliga arbetet, men kräver i gengäld betydligt ___ utbildning av personalen.",
    options: [
      { fills: ["mindre"], why: "Mindre utbildning vore ytterligare en fördel, inte en gengäld." },
      { fills: ["färre"], why: "'Färre' kan inte stå till ett osärbart substantiv som utbildning." },
      { fills: ["mer"], why: "'Men … i gengäld' kräver en nackdel: mer utbildning balanserar tidsvinsten." },
      { fills: ["sämre"], why: "'Sämre utbildning' är en kvalitetsfråga och passar inte som gengäld för tidsvinst." },
    ],
    correct: 2,
    hint: "'Men' och 'i gengäld' ställer en kostnad mot en vinst.",
  },
  {
    id: "mek-12",
    text: "Ju fler kuggar ett urverk har, ___ svårare blir det att tillverka.",
    options: [
      { fills: ["än"], why: "'Än' används vid jämförelse, inte som par till 'ju'." },
      { fills: ["så"], why: "'Så' är inte parordet till 'ju' i skriftspråk." },
      { fills: ["då"], why: "'Då' anger tid och passar inte i konstruktionen." },
      { fills: ["desto"], why: "'Ju … desto' är ett fast par för proportionellt samband." },
    ],
    correct: 3,
    hint: "Meningen börjar med 'ju' och behöver sitt fasta par.",
  },
  {
    id: "mek-13",
    text: "Bilägandet har minskat i storstäderna, ___ det i glesbygden ___ har ökat något.",
    options: [
      { fills: ["medan", "i stället"], why: "'Medan' ställer två utvecklingar mot varandra, och 'i stället' förstärker kontrasten." },
      { fills: ["eftersom", "därför"], why: "Minskningen i städer förklarar inte ökningen på landet, så orsakssamband saknas." },
      { fills: ["fastän", "likaså"], why: "'Likaså' betyder 'också' och motsäger kontrasten." },
      { fills: ["så att", "följaktligen"], why: "Följdkonstruktioner passar inte: ökningen på landet är ingen följd av minskningen i stan." },
    ],
    correct: 0,
    hint: "Ledet efter kommat beskriver motsatt utveckling i en annan miljö.",
  },
  {
    id: "mek-14",
    text: "Dikten är kortfattad och svårtolkad. ___ den är obegriplig för många har den ___ blivit en av landets mest citerade.",
    options: [
      { fills: ["eftersom", "därför"], why: "Att dikten är obegriplig är ingen rimlig orsak till att den blivit citerad." },
      { fills: ["fastän", "ändå"], why: "'Fastän … ändå' är ett medgivande: trots att den är svår har den blivit citerad." },
      { fills: ["om", "dessutom"], why: "'Om' är villkor och 'dessutom' tillägg; ingen motsats uttrycks." },
      { fills: ["så att", "sedan"], why: "'Så att' anger följd och 'sedan' tid; sambandet är medgivande." },
    ],
    correct: 1,
    hint: "Titta på hur första luckan kopplar till 'obegriplig' och andra till 'har blivit'.",
  },
  {
    id: "mek-15",
    text: "Priset på kaffe har stigit kraftigt, ___ efterfrågan har ___ varit stabil.",
    options: [
      { fills: ["eftersom", "följaktligen"], why: "Prisstegringen förklarar inte en stabil efterfrågan." },
      { fills: ["vilket", "dessutom"], why: "'Vilket' förutsätter en följd, och 'dessutom' är tillägg, inte motsats." },
      { fills: ["men", "ändå"], why: "'Men … ändå' markerar att efterfrågan förblev stabil trots prisökningen." },
      { fills: ["medan", "likaså"], why: "'Likaså' passar inte och ordföljden blir fel." },
    ],
    correct: 2,
    hint: "Ett prisfall eller prisökning brukar påverka efterfrågan; här blev det inte så.",
  },
  {
    id: "mek-16",
    text: "Pjäsen fick ___ recensioner när den hade premiär, men har ___ blivit en älskad klassiker.",
    options: [
      { fills: ["lysande", "ännu"], why: "'Lysande' ger ingen motsats och bryter mot 'men'." },
      { fills: ["blandade", "aldrig"], why: "'Aldrig blivit klassiker' ger ingen kontrast till premiären." },
      { fills: ["strålande", "nu"], why: "Strålande recensioner står inte i motsats till 'älskad klassiker'." },
      { fills: ["svala", "senare"], why: "'Svala recensioner … men senare klassiker' ger den motsats som 'men' kräver." },
    ],
    correct: 3,
    hint: "'Men' kräver att första luckan står i kontrast till 'älskad klassiker'.",
  },
  {
    id: "mek-17",
    text: "Företaget ___ en omfattande omorganisation för att ___ kostnaderna och ___ lönsamheten.",
    options: [
      { fills: ["genomför","sänka","stärka"], why: "'För att' anger syfte: man genomför en omorganisation för att sänka kostnader och stärka lönsamhet." },
      { fills: ["genomför","höja","stärka"], why: "Att höja kostnaderna kan inte vara syftet med en omorganisation som ska förbättra lönsamheten." },
      { fills: ["genomför","sänka","urholka"], why: "Att urholka lönsamheten motsäger syftet som 'för att' och 'och' pekar mot." },
      { fills: ["avbryter","öka","försvaga"], why: "En avbruten omorganisation kan inte vara medlet 'för att' nå ett syfte, och både 'öka kostnaderna' och 'försvaga lönsamheten' går åt fel håll." },
    ],
    correct: 0,
    hint: "'För att' inleder syftet: vilka tre ord hänger ihop som mål och medel?",
  },
  {
    id: "mek-18",
    text: "Hans teori ansågs länge vara ___; först efter flera decennier ___ den, när nya mätningar gav stöd åt den.",
    options: [
      { fills: ["omstridd", "avfärdades"], why: "Att avfärdas stämmer inte med att mätningarna gav stöd." },
      { fills: ["orimlig", "bekräftades"], why: "Först orimlig, sedan bekräftad när mätningar stödde den: rätt vändning." },
      { fills: ["självklar", "ifrågasattes"], why: "Stöd från mätningar leder inte till ifrågasättande." },
      { fills: ["självklar", "utvecklades"], why: "'Först efter' kräver att den tidigare bedömningen var negativ, inte självklar." },
    ],
    correct: 1,
    hint: "'Först efter … när … gav stöd' visar åt vilket håll bedömningen vänder.",
  },
  {
    id: "mek-19",
    text: "Inflationen har dämpats, ___ många hushåll har det fortfarande svårt ___ priserna ligger kvar på en hög nivå.",
    options: [
      { fills: ["därför", "trots att"], why: "'Därför' fungerar inte som konjunktion mellan huvudsatser här." },
      { fills: ["så", "eftersom"], why: "'Så' anger följd, men svårigheterna följer inte av dämpad inflation." },
      { fills: ["men", "eftersom"], why: "'Men' markerar kontrasten och 'eftersom' ger orsaken: priserna ligger kvar högt." },
      { fills: ["och", "fastän"], why: "'Fastän' gör att orsaken blir en motsats, vilket är illogiskt." },
    ],
    correct: 2,
    hint: "Första luckan ska markera motsats, andra ska ge orsaken till svårigheterna.",
  },
  {
    id: "mek-20",
    text: "Boktryckarkonsten gjorde böcker billigare, ___ fler människor ___ lära sig läsa.",
    options: [
      { fills: ["trots att", "kunde"], why: "'Trots att' ger motsats, men billigare böcker och ökad läsning hänger ihop." },
      { fills: ["utan att", "kunde"], why: "'Utan att' uttrycker avsaknad av följd, motsatsen till sambandet." },
      { fills: ["men", "ville"], why: "'Men' markerar kontrast, men ingen finns." },
      { fills: ["så att", "kunde"], why: "'Så att' uttrycker följd: billigare böcker gjorde att fler kunde lära sig läsa." },
    ],
    correct: 3,
    hint: "Billigare böcker leder till något: vilken konstruktion uttrycker följd?",
  },
  {
    id: "mek-21",
    text: "Det är ___ att tro att tekniken ensam löser problemet; lösningen kräver ___ förändrade vanor.",
    options: [
      { fills: ["naivt", "också"], why: "Att tro på enbart teknik är naivt, och lösningen kräver också förändrade vanor." },
      { fills: ["rimligt", "endast"], why: "Då skulle texten motsäga sig själv." },
      { fills: ["naivt", "enbart"], why: "'Enbart förändrade vanor' lämnar tekniken helt utanför och stämmer inte med 'ensam'." },
      { fills: ["klokt", "knappast"], why: "'Klokt' kan inte kritisera 'ensam' och 'knappast' ger fel betydelse." },
    ],
    correct: 0,
    hint: "'Ensam' och semikolonet visar att lösningen är bredare än tekniken.",
  },
  {
    id: "mek-22",
    text: "Författaren skriver omständligt och torrt, vilket gör boken ___ att läsa ___ det spännande ämnet.",
    options: [
      { fills: ["lätt", "tack vare"], why: "Torr stil gör inte boken lätt, och 'tack vare' ger fel samband." },
      { fills: ["tung", "trots"], why: "'Trots' markerar att stilen gör boken tung, fastän ämnet är spännande." },
      { fills: ["rolig", "på grund av"], why: "'På grund av' anger orsak, inte kontrast." },
      { fills: ["lättläst", "genom"], why: "'Genom' passar inte och torrheten gör inte boken lättläst." },
    ],
    correct: 1,
    hint: "Titta efter ett ord som markerar medgivande före 'det spännande ämnet'.",
  },
  {
    id: "mek-23",
    text: "Debatten blev hätsk, ___ ingen av parterna ville ge sig, och mötet avbröts ___ utan beslut.",
    options: [
      { fills: ["fastän", "därför"], why: "'Fastän' ger medgivande, men hätskheten orsakades av att ingen gav sig." },
      { fills: ["så", "dock"], why: "'Så' anger följd åt fel håll." },
      { fills: ["eftersom", "till sist"], why: "'Eftersom' ger orsaken: ingen ville ge sig. 'Till sist' fungerar om mötets slut." },
      { fills: ["trots att", "alltså"], why: "'Trots att' motsäger sambandet mellan envishet och hätskhet." },
    ],
    correct: 2,
    hint: "Ett orsakssamband binder ihop hätskheten och att ingen ville ge sig.",
  },
  {
    id: "mek-24",
    text: "Han är ___ en skicklig talare, ___ hans argument brister ofta i logik.",
    options: [
      { fills: ["förvisso", "eftersom"], why: "'Eftersom' gör kritiken till orsak till skickligheten." },
      { fills: ["alltså", "men"], why: "'Alltså' drar en slutsats som saknas här." },
      { fills: ["nämligen", "så"], why: "'Nämligen' och 'så' passar inte ihop med kritiken." },
      { fills: ["visserligen", "men"], why: "'Visserligen … men' är ett klassiskt medgivandepar: beröm, men med reservation." },
    ],
    correct: 3,
    hint: "Första ledet ger beröm och andra kritik; de behöver ett medgivande-par.",
  },
  {
    id: "mek-25",
    text: "Eftersom resurserna var begränsade ___ kommunen att prioritera befintliga bostäder framför ___ parker.",
    options: [
      { fills: ["tvingades", "nya"], why: "Begränsade resurser tvingar fram en prioritering, och 'nya' ställs mot 'befintliga'." },
      { fills: ["vägrade", "nya"], why: "'Vägrade' passar inte som följd av begränsade resurser." },
      { fills: ["hoppades", "befintliga"], why: "'Befintliga parker' upprepar ordet utan kontrast." },
      { fills: ["avstod", "tidigare"], why: "'Avstod' kräver 'från' och ger fel kontrast." },
    ],
    correct: 0,
    hint: "'Eftersom resurserna var begränsade' anger varför kommunen måste välja.",
  },
  {
    id: "mek-26",
    text: "Ordet 'katt' har samma ursprung i många språk, ___ ordet 'hund' ___ skiljer sig åt avsevärt.",
    options: [
      { fills: ["och", "därmed"], why: "'Därmed' anger följd, men 'hund' är ingen följd av 'katt'." },
      { fills: ["medan", "däremot"], why: "'Medan … däremot' ställer de två orden mot varandra." },
      { fills: ["så", "alltså"], why: "'Så' och 'alltså' anger slutsats, som saknas." },
      { fills: ["eftersom", "följaktligen"], why: "Orsak saknas mellan orden." },
    ],
    correct: 1,
    hint: "Två ord ställs mot varandra: ett lika, ett olika.",
  },
  {
    id: "mek-27",
    text: "Hennes uppsats var ___ skriven, men innehöll ___ få egna slutsatser.",
    options: [
      { fills: ["slarvigt", "påfallande"], why: "Slarvigt och få slutsatser är två nackdelar; 'men' passar inte." },
      { fills: ["hastigt", "ganska"], why: "Samma problem: ingen kontrast." },
      { fills: ["elegant", "påfallande"], why: "Elegant skriven, men påfallande få slutsatser ger kontrasten som 'men' kräver." },
      { fills: ["dåligt", "mycket"], why: "Dåligt skriven plus få slutsatser ger ingen motsats." },
    ],
    correct: 2,
    hint: "'Men' kräver ett positivt led först och ett negativt sedan.",
  },
  {
    id: "mek-28",
    text: "Forskaren varnade för att resultaten kunde ___ om urvalet var för litet, ___ bör man tolka dem med försiktighet.",
    options: [
      { fills: ["bekräftas", "därför"], why: "Ett litet urval gör inte resultaten bekräftade." },
      { fills: ["förbättras", "dock"], why: "Ett litet urval förbättrar inte resultaten." },
      { fills: ["vara missvisande", "men"], why: "'Men' passar inte och ger fel ordföljd; här behövs följd." },
      { fills: ["vara missvisande", "därför"], why: "Litet urval ger missvisande resultat, därför bör man vara försiktig." },
    ],
    correct: 3,
    hint: "Efter luckan följer inversion ('bör man'), vilket avslöjar vilket ord som kan stå före.",
  },
  {
    id: "mek-29",
    text: "Rapporten visar att utsläppen ___ har minskat, men att takten är ___ för att målet ska nås.",
    options: [
      { fills: ["visserligen", "för låg"], why: "'Visserligen … men' är ett medgivande: minskat, men för långsamt för målet." },
      { fills: ["knappast", "för låg"], why: "'Knappast har minskat' motsäger 'visar att' och 'men'." },
      { fills: ["visserligen", "tillräckligt hög"], why: "Tillräckligt hög takt skulle inte motsäga det första ledet." },
      { fills: ["knappast", "tillräckligt hög"], why: "Båda luckorna bryter mot sambandet." },
    ],
    correct: 0,
    hint: "'Men' kräver att andra ledet motsäger det första, och 'för att målet ska nås' styr vilken takt som avses.",
  },
  {
    id: "mek-30",
    text: "Trots att kritikerna var enhälligt positiva ___ filmen en ___ publiksiffra.",
    options: [
      { fills: ["fick", "rekordhög"], why: "En rekordhög siffra följer kritikernas beröm och ger ingen motsats." },
      { fills: ["fick", "skral"], why: "'Trots' kräver motsats: positiva kritiker, men dålig publik." },
      { fills: ["gav", "lysande"], why: "Lysande publiksiffra ger ingen kontrast." },
      { fills: ["vann", "svag"], why: "'Vann en svag publiksiffra' är ingen idiomatisk kombination." },
    ],
    correct: 1,
    hint: "'Trots att' kräver att resten går emot det positiva.",
  },
  {
    id: "mek-31",
    text: "Kommunen hade räknat med att projektet skulle bli billigt, ___ det ___ blev nästan dubbelt så dyrt.",
    options: [
      { fills: ["eftersom", "följaktligen"], why: "Det dyra utfallet orsakas inte av förväntan om billighet." },
      { fills: ["så", "därför"], why: "'Så … därför' anger följd som saknas." },
      { fills: ["men", "till slut"], why: "'Men' markerar att förväntan bröts, och 'till slut' anger slutresultatet." },
      { fills: ["samt", "naturligtvis"], why: "'Samt' lägger till, men utfallet är motsatsen; 'naturligtvis' är fel ton." },
    ],
    correct: 2,
    hint: "Förväntan bryts: vilket ord markerar att utfallet går emot den?",
  },
  {
    id: "mek-32",
    text: "Ordet 'fika' låter ___ i ett vardagligt samtal men ___ i en juridisk text.",
    options: [
      { fills: ["malplacerat", "naturligt"], why: "Omvänd ordning: 'fika' är inte malplacerat i samtal." },
      { fills: ["högtidligt", "vardagligt"], why: "'Fika' är inte högtidligt." },
      { fills: ["vardagligt", "naturligt"], why: "Det vardagliga ordet är inte naturligt i en juridisk text." },
      { fills: ["naturligt", "malplacerat"], why: "Vardagsord är naturliga i samtal men malplacerade i juridisk text." },
    ],
    correct: 3,
    hint: "Texten bygger på stilnivå: samma ord, olika sammanhang.",
  },
  {
    id: "mek-33",
    text: "Klimatförändringarna är ___ ett globalt problem; ___ måste lösningarna ___ samordnas mellan länder.",
    options: [
      { fills: ["onekligen", "därför", "internationellt"], why: "Onekligen globalt, därför måste lösningarna samordnas internationellt: följd och logik." },
      { fills: ["knappast", "dock", "lokalt"], why: "'Knappast globalt' strider mot resten av texten." },
      { fills: ["onekligen", "tvärtom", "nationellt"], why: "'Tvärtom' motsäger tidigare påstående och 'nationellt' strider mot samordning mellan länder." },
      { fills: ["möjligen", "följaktligen", "separat"], why: "'Separat samordnas' är en självmotsägelse." },
    ],
    correct: 0,
    hint: "Följer en slutsats av första ledet, och i så fall hur?",
  },
  {
    id: "mek-34",
    text: "Kungen var ___ populär bland folket, ___ han höjde skatterna ___ krigsåren, och till slut bröt ett uppror ut mot honom.",
    options: [
      { fills: ["mycket", "eftersom", "under"], why: "Skattehöjning gör ingen kung mycket populär." },
      { fills: ["föga", "eftersom", "under"], why: "Föga populär eftersom han höjde skatterna under krigsåren, och därför uppror." },
      { fills: ["föga", "fastän", "efter"], why: "'Fastän' ger medgivande som inte passar och 'efter' ändrar tidpunkten." },
      { fills: ["mycket", "trots att", "före"], why: "'Mycket populär' går emot upproret." },
    ],
    correct: 1,
    hint: "Upproret i slutet avslöjar hur populär kungen var.",
  },
  {
    id: "mek-35",
    text: "Studien omfattade bara trettio personer; ___ går det inte att dra några ___ slutsatser av den, ___ resultaten verkar lovande.",
    options: [
      { fills: ["därför", "generella", "eftersom"], why: "'Eftersom' gör lovande resultat till orsak till osäkerheten." },
      { fills: ["tvärtom", "generella", "även om"], why: "'Tvärtom' har ingen motsats att förhålla sig till." },
      { fills: ["därför", "generella", "även om"], why: "Litet urval ger därför inga generella slutsatser, även om resultaten verkar lovande." },
      { fills: ["nämligen", "generella", "även om"], why: "'Nämligen' kan inte stå först i satsen." },
    ],
    correct: 2,
    hint: "Slutsatsen följer av litet urval, men sista ledet går i motsatt riktning.",
  },
  {
    id: "mek-36",
    text: "Oljepriset föll kraftigt, ___ producenterna ___ produktionen för att ___ priset.",
    options: [
      { fills: ["trots att", "ökade", "stödja"], why: "Ökad produktion ger lägre priser, inte stöd åt priset." },
      { fills: ["varför", "ökade", "pressa"], why: "Att öka produktionen och pressa priset förvärrar fallet." },
      { fills: ["eftersom", "drog ned", "pressa"], why: "Orsaken vänds fel och 'pressa priset' motsäger syftet." },
      { fills: ["varför", "drog ned", "stödja"], why: "Prisfall, varför producenterna drog ned produktionen för att stödja priset." },
    ],
    correct: 3,
    hint: "Prisfallet leder till en åtgärd som ska motverka det.",
  },
  {
    id: "mek-37",
    text: "Romanen är ___ uppbyggd, ___ den hoppar mellan tre tidsplan, men läsaren förlorar ___ aldrig tråden.",
    options: [
      { fills: ["komplext", "eftersom", "ändå"], why: "Komplext uppbyggd eftersom den hoppar mellan tidsplan, men läsaren förlorar ändå aldrig tråden." },
      { fills: ["enkelt", "eftersom", "ändå"], why: "Att hoppa mellan tidsplan är inte enkelt." },
      { fills: ["komplext", "fastän", "därför"], why: "'Fastän' ger medgivande som saknas." },
      { fills: ["enkelt", "trots att", "därför"], why: "Enkelt uppbyggd trots att den hoppar mellan tidsplan är orimligt." },
    ],
    correct: 0,
    hint: "'Men' i andra halvan visar att texten medger en svårighet.",
  },
  {
    id: "mek-38",
    text: "Hon blev ___ efter olyckan, ___ hon faktiskt hade klarat sig utan skador.",
    options: [
      { fills: ["lugn", "fastän"], why: "Att vara lugn efter olycka är ingen motsats till att klara sig." },
      { fills: ["chockad", "fastän"], why: "Fastän hon klarat sig utan skador blev hon ändå chockad." },
      { fills: ["chockad", "eftersom"], why: "Att vara oskadd är ingen orsak till chock." },
      { fills: ["glad", "fastän"], why: "Glad efter olycka är inte en motsats till att klara sig." },
    ],
    correct: 1,
    hint: "'Faktiskt' markerar motsats till hur hon reagerade.",
  },
  {
    id: "mek-39",
    text: "Kritikerna menade att satsningen var ___, men resultaten ___ dem; ___ har intresset för projektet ökat.",
    options: [
      { fills: ["förhastad", "bekräftade", "därför"], why: "Bekräftade skulle ge kritikerna rätt, vilket 'men' motsäger." },
      { fills: ["klok", "motbevisade", "sedan dess"], why: "'Klok' passar inte med kritikernas inställning." },
      { fills: ["förhastad", "motbevisade", "sedan dess"], why: "Kritikerna tyckte förhastad, men resultaten motbevisade dem; sedan dess ökat intresse." },
      { fills: ["klok", "bekräftade", "sedan dess"], why: "Klok och bekräftade ger ingen kontrast." },
    ],
    correct: 2,
    hint: "'Men' visar att resultaten gick emot kritikerna.",
  },
  {
    id: "mek-40",
    text: "Ju längre projektet drogs ut, ___ svårare blev det ___ hålla budgeten, ___ kostnaderna steg hela tiden.",
    options: [
      { fills: ["så", "för att", "medan"], why: "'Så' kan inte para med 'ju'." },
      { fills: ["än", "att", "fastän"], why: "'Än' hör till jämförelse." },
      { fills: ["desto", "för att", "eftersom"], why: "'Svårare för att hålla' är ogrammatiskt." },
      { fills: ["desto", "att", "eftersom"], why: "'Ju … desto', 'svårare att hålla' och 'eftersom' ger orsaken." },
    ],
    correct: 3,
    hint: "Meningen inleds med 'ju' och slutar med en orsak.",
  },
];
