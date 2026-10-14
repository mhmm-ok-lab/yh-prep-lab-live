// Mattetermer (2026-10-14): orden i den kvantitativa delen (XYZ, KVA, NOG, DTK) som man fastnar på
// innan man ens börjat räkna, t.ex. "kvoten", "procentenhet" eller "minst". Urvalet bygger på hur ofta
// orden förekommer i appens egna frågetexter (src/hp-twins*.ts, src/hp-math.ts) plus provets standardord.
// Flöde: snabbskanning (Kan/Osäker) → flipcards på de osäkra → klickbara termer i frågetexten.
// Länkarna går till matteboken.se och är kontrollerade 2026-10-14 (sidan finns och tar upp termen).
// Rena data och funktioner, ingen DOM eller localStorage.

export type TermGroup = "Räknesätt" | "Tal" | "Procent och förhållande" | "Statistik" | "Geometri" | "Algebra och funktioner";

export const TERM_GROUPS: TermGroup[] = ["Räknesätt", "Tal", "Procent och förhållande", "Statistik", "Geometri", "Algebra och funktioner"];

export interface MathTerm {
  id: string;
  /** Visas i listan och på kortet. */
  name: string;
  group: TermGroup;
  /** Ordformer som markeras i frågetext (hela ord, gemener). Längsta formen vinner vid överlapp. */
  forms: string[];
  /** Förklaring på enkel svenska, 1–2 meningar. */
  explain: string;
  /** Mini-exempel med siffror. */
  example: string;
  /** Vanlig förväxling eller fälla. */
  confuse?: string;
  /** Visuell förklaring (matteboken.se), verifierad. */
  url?: string;
}

const MB = "https://www.matteboken.se/lektioner";
const URL = {
  addition: `${MB}/mellanstadiet/skolar-4/de-fyra-raknesatten/addition`,
  subtraktion: `${MB}/mellanstadiet/skolar-4/de-fyra-raknesatten/subtraktion`,
  multiplikation: `${MB}/mellanstadiet/skolar-4/de-fyra-raknesatten/multiplikation`,
  division: `${MB}/mellanstadiet/skolar-4/de-fyra-raknesatten/division`,
  brak: `${MB}/hogstadiet/skolar-7/brak-och-procent/braktal`,
  brakMultDiv: `${MB}/hogstadiet/skolar-8/brak/multiplikation-och-division-av-brak`,
  naturliga: `${MB}/mellanstadiet/skolar-5/tal/naturliga-tal`,
  negativa: `${MB}/hogstadiet/skolar-9/negativa-tal/negativa-tal`,
  delbarhet: `${MB}/gymnasiet/matte-fordjupning-niva-1/kongruensrakning/delbarhet`,
  faktorisering: `${MB}/gymnasiet/matte-niva-1/algebra/faktorisering-och-parenteser`,
  kvadratrot: `${MB}/hogstadiet/skolar-9/potenser-och-kvadratrotter/kvadratrotter`,
  potenser: `${MB}/hogstadiet/skolar-8/tal-och-rakning/potenser`,
  absolutbelopp: `${MB}/gymnasiet/matte-fortsattning-niva-1/algebraiska-uttryck/absolutbelopp`,
  procentenheter: `${MB}/hogstadiet/skolar-9/procent/procent-och-procentenheter`,
  forandringsfaktor: `${MB}/hogstadiet/skolar-9/procent/forandringsfaktor`,
  andel: `${MB}/hogstadiet/skolar-9/procent/andelen-delen-och-det-hela`,
  lagesmatt: `${MB}/gymnasiet/matte-niva-1/statistik-och-sannolikhet/medelvarde-median-och-typvarde`,
  sannolikhet: `${MB}/hogstadiet/skolar-9/sannolikhet-och-statistik/sannolikhet`,
  omkretsArea: `${MB}/gymnasiet/matte-niva-1/geometri/omkrets-och-area`,
  area: `${MB}/mellanstadiet/skolar-6/geometri/area`,
  volym: `${MB}/hogstadiet/skolar-9/geometri/volym-och-volymenheter`,
  cirklar: `${MB}/hogstadiet/skolar-8/geometri-och-enheter/cirklar`,
  pythagoras: `${MB}/gymnasiet/matte-niva-1/geometri/pythagoras-sats`,
  trianglar: `${MB}/hogstadiet/skolar-8/geometri-och-enheter/trianglar`,
  vinklar: `${MB}/hogstadiet/skolar-8/geometri-och-enheter/vinklar`,
  parallellVinkelrat: `${MB}/gymnasiet/matte-niva-1/funktioner/parallella-och-vinkelrata-linjer`,
  variabel: `${MB}/hogstadiet/skolar-9/uttryck-ekvationer-och-funktioner/uttryck-med-variabler`,
  uttryck: `${MB}/hogstadiet/skolar-7/uttryck-och-ekvationer/teckna-och-berakna-uttryck`,
  ekvation: `${MB}/hogstadiet/skolar-7/uttryck-och-ekvationer/vad-ar-en-ekvation`,
  olikhet: `${MB}/gymnasiet/matte-niva-1/funktioner/olikheter-och-linjara-olikheter`,
  ekvationssystem: `${MB}/gymnasiet/matte-niva-2/linjara-ekvationssystem`,
  funktioner: `${MB}/hogstadiet/skolar-9/uttryck-ekvationer-och-funktioner/funktioner`,
  koordinat: `${MB}/gymnasiet/matte-niva-1/funktioner/koordinatsystem`,
  rataLinjen: `${MB}/gymnasiet/matte-niva-1/funktioner/rata-linjens-ekvation`
};

export const MATH_TERMS: MathTerm[] = [
  // ── Räknesätt ──
  {
    id: "summa", name: "summa", group: "Räknesätt", forms: ["summa", "summan", "summor", "summorna"],
    explain: "Svaret när man adderar (plus).",
    example: "Summan av 3 och 5 är 3 + 5 = 8.",
    url: URL.addition
  },
  {
    id: "differens", name: "differens", group: "Räknesätt", forms: ["differens", "differensen", "differenser"],
    explain: "Svaret när man subtraherar (minus). Betyder samma sak som skillnad.",
    example: "Differensen mellan 9 och 4 är 9 − 4 = 5.",
    url: URL.subtraktion
  },
  {
    id: "produkt", name: "produkt", group: "Räknesätt", forms: ["produkt", "produkten"],
    explain: "Svaret när man multiplicerar (gånger).",
    example: "Produkten av 4 och 6 är 4 · 6 = 24.",
    confuse: "Produkt = gånger, summa = plus. ”Produkten av 12 och summan av 2 och 3” = 12 · (2 + 3).",
    url: URL.multiplikation
  },
  {
    id: "kvot", name: "kvot", group: "Räknesätt", forms: ["kvot", "kvoten", "kvoter", "kvoterna"],
    explain: "Svaret när man dividerar (delat med). Kvoten av a och b är a/b, i den ordningen.",
    example: "Kvoten av 12 och 3 är 12/3 = 4.",
    confuse: "Kvot = division, produkt = multiplikation. ”Kvoten mellan A och B” = A/B, inte B/A.",
    url: URL.division
  },
  {
    id: "taljare", name: "täljare", group: "Räknesätt", forms: ["täljare", "täljaren", "täljarna"],
    explain: "Talet ovanför bråkstrecket.",
    example: "I 3/4 är 3 täljaren.",
    confuse: "Täljaren uppe, nämnaren nere. Minnesknep: Nämnaren Nere.",
    url: URL.brak
  },
  {
    id: "namnare", name: "nämnare", group: "Räknesätt", forms: ["nämnare", "nämnaren", "nämnarna"],
    explain: "Talet under bråkstrecket. Det säger i hur många delar det hela är delat.",
    example: "I 3/4 är 4 nämnaren: det hela är delat i fyra delar.",
    confuse: "Större nämnare = mindre bitar: 1/8 är mindre än 1/4.",
    url: URL.brak
  },
  {
    id: "reciprok", name: "reciprokt värde", group: "Räknesätt", forms: ["reciproka värdet", "reciprokt värde", "reciproka", "reciprokt"],
    explain: "Talet vänt upp och ner, alltså 1 delat med talet. Talet gånger sitt reciproka värde blir alltid 1.",
    example: "Reciproka värdet av 4 är 1/4. Av 2/3 är det 3/2.",
    confuse: "Inte samma sak som motsatt tal: −4 är motsatt tal till 4, 1/4 är reciprokt.",
    url: URL.brakMultDiv
  },

  // ── Tal ──
  {
    id: "heltal", name: "heltal", group: "Tal", forms: ["heltal", "heltalet", "heltalen"],
    explain: "Tal utan decimaler eller bråk: … −2, −1, 0, 1, 2 …",
    example: "−3, 0 och 7 är heltal. 2,5 är det inte.",
    confuse: "Heltal kan vara negativa. Naturliga tal kan inte det."
  },
  {
    id: "naturliga", name: "naturliga tal", group: "Tal", forms: ["naturliga tal", "naturligt tal", "naturliga talen"],
    explain: "Talen 0, 1, 2, 3 och uppåt. Inga negativa tal och inga decimaler.",
    example: "5 är ett naturligt tal, −5 och 1,5 är det inte.",
    url: URL.naturliga
  },
  {
    id: "udda-jamna", name: "udda/jämn", group: "Tal", forms: ["udda", "jämn", "jämna", "jämnt"],
    explain: "Jämna tal går att dela med 2 utan rest (2, 4, 6). Udda tal gör det inte (1, 3, 5).",
    example: "Udda + udda = jämnt: 3 + 5 = 8. Udda · udda = udda: 3 · 5 = 15.",
    confuse: "0 är jämnt. Negativa tal är också udda eller jämna: −3 är udda."
  },
  {
    id: "primtal", name: "primtal", group: "Tal", forms: ["primtal", "primtalet", "primtalen"],
    explain: "Ett heltal större än 1 som bara går att dela jämnt med 1 och sig självt.",
    example: "2, 3, 5, 7, 11 och 13 är primtal. 9 är det inte (3 · 3).",
    confuse: "1 är inte ett primtal. 2 är det enda jämna primtalet.",
    url: URL.delbarhet
  },
  {
    id: "delbar", name: "delbar", group: "Tal", forms: ["delbar", "delbart", "delbara", "jämnt delbar", "jämnt delbart", "jämnt delbara"],
    explain: "a är delbart med b om a/b blir ett heltal, alltså utan rest.",
    example: "12 är delbart med 3 (12/3 = 4). 13 är inte det.",
    url: URL.delbarhet
  },
  {
    id: "faktor", name: "faktor", group: "Tal", forms: ["faktor", "faktorn", "faktorer", "faktorerna"],
    explain: "Ett av talen som multipliceras. Också: ett tal som går jämnt upp i ett annat.",
    example: "I 3 · 4 = 12 är 3 och 4 faktorer. 12 har faktorerna 1, 2, 3, 4, 6 och 12.",
    confuse: "Förändringsfaktor är något annat: talet man multiplicerar med vid en procentförändring.",
    url: URL.faktorisering
  },
  {
    id: "kvadratrot", name: "kvadratrot", group: "Tal", forms: ["kvadratrot", "kvadratroten", "kvadratrötter", "roten ur"],
    explain: "Det tal som gånger sig självt blir det givna talet. Skrivs √.",
    example: "√49 = 7, eftersom 7 · 7 = 49.",
    confuse: "√ av ett tal mellan 0 och 1 blir större: √0,25 = 0,5.",
    url: URL.kvadratrot
  },
  {
    id: "potens", name: "potens", group: "Tal", forms: ["potens", "potensen", "potenser", "upphöjt till", "upphöjd till", "upphöjda till"],
    explain: "Ett tal som multipliceras med sig självt flera gånger. Skrivs med en liten siffra uppe till höger.",
    example: "2⁵ = 2 · 2 · 2 · 2 · 2 = 32.",
    confuse: "2⁵ är inte 2 · 5 = 10.",
    url: URL.potenser
  },
  {
    id: "bas", name: "bas", group: "Tal", forms: ["bas", "basen"],
    explain: "I en potens: talet som multipliceras med sig självt (2 i 2⁵). I en triangel: sidan som höjden står vinkelrätt mot.",
    example: "2⁵ har basen 2. Triangelns area = bas · höjd / 2.",
    url: URL.potenser
  },
  {
    id: "exponent", name: "exponent", group: "Tal", forms: ["exponent", "exponenten", "exponenter", "exponenterna"],
    explain: "Den lilla siffran uppe till höger i en potens: hur många gånger basen multipliceras.",
    example: "I 2⁵ är exponenten 5.",
    confuse: "Negativ exponent betyder 1 delat med: 2⁻¹ = 1/2. Exponent 0 ger alltid 1.",
    url: URL.potenser
  },
  {
    id: "absolutbelopp", name: "absolutbelopp", group: "Tal", forms: ["absolutbelopp", "absolutbeloppet"],
    explain: "Avståndet från 0 på tallinjen, alltid positivt eller noll. Skrivs |x|.",
    example: "|−7| = 7 och |7| = 7.",
    url: URL.absolutbelopp
  },
  {
    id: "positiv-negativ", name: "positiv/negativ", group: "Tal", forms: ["positiv", "positivt", "positiva", "negativ", "negativt", "negativa"],
    explain: "Positivt = större än 0. Negativt = mindre än 0. 0 är varken positivt eller negativt.",
    example: "Negativt · negativt = positivt: (−2) · (−3) = 6. Ett negativt tal i kvadrat blir positivt.",
    confuse: "På KVA: står det bara ”x < 0” kan x vara −0,5 eller −100. Testa båda.",
    url: URL.negativa
  },
  {
    id: "minst-hogst", name: "minst/högst", group: "Tal", forms: ["minst", "högst", "som mest", "som minst"],
    explain: "”Minst 5” = 5 eller mer (≥ 5). ”Högst 5” = 5 eller mindre (≤ 5).",
    example: "”Minst 3 av 10 klarade sig” betyder 3, 4, 5 … eller 10.",
    confuse: "”Minst” låter som ”mindre” men sätter en gräns nedåt, talet får vara större. ”Vilket är minst?” betyder däremot ”vilket är minst till värdet?”."
  },

  // ── Procent och förhållande ──
  {
    id: "procentenhet", name: "procentenhet", group: "Procent och förhållande", forms: ["procentenhet", "procentenheter", "procentenheten", "procentenheterna"],
    explain: "Skillnaden mellan två procenttal, räknat som vanligt minus.",
    example: "Räntan går från 2 % till 3 %: det är 1 procentenhet, men en ökning med 50 procent.",
    confuse: "Procentenheter = minus mellan procenttalen. Procent = hur stor ändringen är jämfört med det gamla värdet.",
    url: URL.procentenheter
  },
  {
    id: "forandringsfaktor", name: "förändringsfaktor", group: "Procent och förhållande", forms: ["förändringsfaktor", "förändringsfaktorn"],
    explain: "Talet man multiplicerar med vid en procentförändring. Ökning 20 % → 1,20. Minskning 20 % → 0,80.",
    example: "500 kr ökar med 10 %: 500 · 1,10 = 550 kr.",
    confuse: "+10 % och sedan −10 % blir inte tillbaka: 1,10 · 0,90 = 0,99.",
    url: URL.forandringsfaktor
  },
  {
    id: "andel", name: "andel", group: "Procent och förhållande", forms: ["andel", "andelen", "andelar", "andelarna"],
    explain: "Delen jämfört med det hela, ofta i procent. Andel = delen / det hela.",
    example: "6 av 24 elever cyklar: andelen är 6/24 = 25 %.",
    confuse: "En andel kan öka fast antalet minskar, om det hela minskar ännu mer.",
    url: URL.andel
  },
  {
    id: "forhallande", name: "förhållande", group: "Procent och förhållande", forms: ["förhållande", "förhållandet", "förhållanden", "storleksförhållande", "storleksförhållandet"],
    explain: "Jämför två storheter med division. Skrivs a:b eller a/b.",
    example: "8 tjejer och 4 killar: förhållandet är 8:4 = 2:1.",
    confuse: "”Förhållandet mellan A och B” = A/B. Ordningen spelar roll."
  },
  {
    id: "proportionell", name: "proportionell", group: "Procent och förhållande", forms: ["proportionell", "proportionella", "proportionellt"],
    explain: "Två storheter är proportionella om den ena alltid är ett fast tal gånger den andra (y = k · x). Dubbelt så mycket av det ena ger dubbelt så mycket av det andra.",
    example: "2 kg kostar 40 kr, då kostar 4 kg 80 kr."
  },
  {
    id: "omvant-proportionell", name: "omvänt proportionell", group: "Procent och förhållande", forms: ["omvänt proportionell", "omvänt proportionella", "omvänt proportionellt"],
    explain: "När den ena dubblas halveras den andra. Produkten är alltid densamma (x · y = k).",
    example: "4 målare tar 6 timmar, 8 målare tar 3 timmar (4 · 6 = 8 · 3 = 24).",
    confuse: "Proportionell: båda växer. Omvänt proportionell: den ena växer, den andra krymper."
  },

  // ── Statistik ──
  {
    id: "medelvarde", name: "medelvärde", group: "Statistik", forms: ["medelvärde", "medelvärdet", "medelvärden", "genomsnitt", "genomsnittet", "genomsnittlig", "genomsnittliga", "genomsnittligt"],
    explain: "Summan av alla värden delat med antalet värden. Samma sak som genomsnitt.",
    example: "2, 4 och 9: (2 + 4 + 9)/3 = 5.",
    confuse: "Vet du medelvärdet och antalet, vet du summan: medel 5 för 3 tal → summan är 15.",
    url: URL.lagesmatt
  },
  {
    id: "median", name: "median", group: "Statistik", forms: ["median", "medianen"],
    explain: "Det mittersta värdet när talen står i storleksordning. Vid jämnt antal: medelvärdet av de två mittersta.",
    example: "2, 3, 9 → medianen är 3. 2, 3, 9, 10 → (3 + 9)/2 = 6.",
    confuse: "Median ≠ medelvärde. Ett extremt värde drar iväg medelvärdet men inte medianen.",
    url: URL.lagesmatt
  },
  {
    id: "typvarde", name: "typvärde", group: "Statistik", forms: ["typvärde", "typvärdet"],
    explain: "Det värde som förekommer flest gånger.",
    example: "3, 5, 5, 8 → typvärdet är 5.",
    url: URL.lagesmatt
  },
  {
    id: "sannolikhet", name: "sannolikhet", group: "Statistik", forms: ["sannolikhet", "sannolikheten", "sannolikheter"],
    explain: "Hur troligt något är, ett tal mellan 0 och 1. Gynnsamma utfall delat med möjliga utfall.",
    example: "Slå en sexa med en tärning: 1/6.",
    confuse: "Två saker som båda ska hända: multiplicera. Två sexor i rad = 1/6 · 1/6 = 1/36.",
    url: URL.sannolikhet
  },

  // ── Geometri ──
  {
    id: "omkrets", name: "omkrets", group: "Geometri", forms: ["omkrets", "omkretsen"],
    explain: "Längden runt en figur. Lägg ihop alla sidor.",
    example: "Rektangel 3 × 5: 3 + 5 + 3 + 5 = 16 cm.",
    confuse: "Omkrets är en längd (cm), area är en yta (cm²).",
    url: URL.omkretsArea
  },
  {
    id: "area", name: "area", group: "Geometri", forms: ["area", "arean", "areor", "areorna"],
    explain: "Hur stor yta en figur täcker. Mäts i kvadratenheter, t.ex. cm².",
    example: "Rektangel 3 × 5: 15 cm². Triangel: bas · höjd / 2.",
    confuse: "Dubblar du alla sidor blir arean fyra gånger så stor.",
    url: URL.area
  },
  {
    id: "volym", name: "volym", group: "Geometri", forms: ["volym", "volymen", "volymer"],
    explain: "Hur mycket en kropp rymmer. Mäts i kubikenheter, t.ex. cm³.",
    example: "Låda 2 × 3 × 4 cm: 24 cm³.",
    confuse: "1 liter = 1 dm³ = 1 000 cm³.",
    url: URL.volym
  },
  {
    id: "radie", name: "radie", group: "Geometri", forms: ["radie", "radien", "radier"],
    explain: "Avståndet från cirkelns mittpunkt ut till kanten.",
    example: "Diameter 10 → radie 5. Area = π · r² = π · 25.",
    confuse: "Radien är halva diametern. Areaformeln använder radien.",
    url: URL.cirklar
  },
  {
    id: "diameter", name: "diameter", group: "Geometri", forms: ["diameter", "diametern", "diametrar"],
    explain: "Sträckan tvärs över cirkeln genom mittpunkten. Dubbla radien.",
    example: "Radie 4 → diameter 8. Omkrets = π · d = 8π.",
    url: URL.cirklar
  },
  {
    id: "sektor", name: "sektor", group: "Geometri", forms: ["sektor", "sektorn", "sektorer", "cirkelsektor", "cirkelsektorn"],
    explain: "En tårtbit av en cirkel, mellan två radier.",
    example: "En sektor på 90° är 90/360 = 1/4 av cirkelns area.",
    url: URL.cirklar
  },
  {
    id: "diagonal", name: "diagonal", group: "Geometri", forms: ["diagonal", "diagonalen", "diagonaler", "diagonalerna"],
    explain: "En sträcka mellan två hörn som inte sitter bredvid varandra.",
    example: "Kvadrat med sidan 1: diagonalen är √2 ≈ 1,41 (Pythagoras sats)."
  },
  {
    id: "hypotenusa", name: "hypotenusa", group: "Geometri", forms: ["hypotenusa", "hypotenusan"],
    explain: "Den längsta sidan i en rätvinklig triangel, mitt emot den räta vinkeln.",
    example: "Kateter 3 och 4 → hypotenusa 5, eftersom 3² + 4² = 5².",
    url: URL.pythagoras
  },
  {
    id: "katet", name: "katet", group: "Geometri", forms: ["katet", "kateten", "kateter", "kateterna"],
    explain: "De två kortare sidorna i en rätvinklig triangel, de som bildar den räta vinkeln.",
    example: "a² + b² = c², där a och b är kateterna och c är hypotenusan.",
    url: URL.pythagoras
  },
  {
    id: "ratvinklig", name: "rätvinklig", group: "Geometri", forms: ["rätvinklig", "rätvinkliga", "rätvinkligt", "rät vinkel", "räta vinkeln", "räta vinklar"],
    explain: "Har en vinkel på exakt 90°.",
    example: "En rätvinklig triangel kan räknas med Pythagoras sats.",
    url: URL.trianglar
  },
  {
    id: "likbent", name: "likbent", group: "Geometri", forms: ["likbent", "likbenta"],
    explain: "En triangel där två sidor är lika långa. Då är också två vinklar lika stora.",
    example: "Sidorna 5, 5 och 8: likbent. Vinklarna vid basen är lika.",
    url: URL.trianglar
  },
  {
    id: "liksidig", name: "liksidig", group: "Geometri", forms: ["liksidig", "liksidiga"],
    explain: "En triangel där alla tre sidor är lika långa. Alla vinklar är 60°.",
    example: "Sidan 4: omkretsen är 12.",
    url: URL.trianglar
  },
  {
    id: "vinkel", name: "vinkel", group: "Geometri", forms: ["vinkel", "vinkeln", "vinklar", "vinklarna"],
    explain: "Hur mycket två linjer öppnar sig från varandra, mätt i grader.",
    example: "Vinklarna i en triangel blir alltid 180° tillsammans, i en fyrhörning 360°.",
    url: URL.vinklar
  },
  {
    id: "parallell", name: "parallell", group: "Geometri", forms: ["parallell", "parallella", "parallellt"],
    explain: "Linjer som aldrig möts, de har samma riktning.",
    example: "y = 2x + 1 och y = 2x − 3 är parallella (samma k = 2).",
    url: URL.parallellVinkelrat
  },
  {
    id: "vinkelrat", name: "vinkelrät", group: "Geometri", forms: ["vinkelrät", "vinkelräta", "vinkelrätt"],
    explain: "Möts i 90°.",
    example: "Väggen står vinkelrätt mot golvet. Höjden i en triangel är vinkelrät mot basen.",
    confuse: "Vinkelrät ≠ parallell: parallella linjer möts aldrig.",
    url: URL.parallellVinkelrat
  },

  // ── Algebra och funktioner ──
  {
    id: "variabel", name: "variabel", group: "Algebra och funktioner", forms: ["variabel", "variabeln", "variabler", "variablerna"],
    explain: "En bokstav som står för ett tal man inte vet, eller som kan ändras.",
    example: "I 2x + 3 är x variabeln. Är x = 5 blir uttrycket 13.",
    url: URL.variabel
  },
  {
    id: "uttryck", name: "uttryck", group: "Algebra och funktioner", forms: ["uttryck", "uttrycket", "uttrycken"],
    explain: "En räknekedja med tal, bokstäver och räknesätt, men utan likhetstecken.",
    example: "3x + 2 är ett uttryck. 3x + 2 = 8 är en ekvation.",
    url: URL.uttryck
  },
  {
    id: "ekvation", name: "ekvation", group: "Algebra och funktioner", forms: ["ekvation", "ekvationen", "ekvationer", "ekvationerna"],
    explain: "Två uttryck med likhetstecken emellan. Att lösa den = hitta värdet som gör båda sidor lika.",
    example: "2x + 3 = 11 → 2x = 8 → x = 4.",
    url: URL.ekvation
  },
  {
    id: "olikhet", name: "olikhet", group: "Algebra och funktioner", forms: ["olikhet", "olikheten", "olikheter", "olikheterna"],
    explain: "Som en ekvation men med <, >, ≤ eller ≥ i stället för =.",
    example: "x + 2 > 5 betyder x > 3.",
    confuse: "Multiplicerar eller delar du med ett negativt tal vänds tecknet: −x > 3 → x < −3.",
    url: URL.olikhet
  },
  {
    id: "ekvationssystem", name: "ekvationssystem", group: "Algebra och funktioner", forms: ["ekvationssystem", "ekvationssystemet"],
    explain: "Två eller fler ekvationer som ska stämma samtidigt.",
    example: "x + y = 10 och x − y = 2 → x = 6 och y = 4.",
    url: URL.ekvationssystem
  },
  {
    id: "funktion", name: "funktion, f(x)", group: "Algebra och funktioner", forms: ["f(x)", "funktion", "funktionen", "funktioner", "funktionerna"],
    explain: "En regel som ger ett utvärde för varje invärde. f(x) läses ”f av x”: värdet du får när du stoppar in x.",
    example: "f(x) = 2x + 1 → f(3) = 2 · 3 + 1 = 7.",
    confuse: "f(x) betyder inte f gånger x.",
    url: URL.funktioner
  },
  {
    id: "koordinat", name: "koordinat", group: "Algebra och funktioner", forms: ["koordinat", "koordinaten", "koordinater", "koordinaterna", "koordinatsystem", "koordinatsystemet"],
    explain: "Två tal (x, y) som anger var en punkt ligger: först i sidled, sedan i höjdled.",
    example: "(3, 2) = 3 steg åt höger och 2 steg upp från origo.",
    url: URL.koordinat
  },
  {
    id: "lutning", name: "lutning, k-värde", group: "Algebra och funktioner", forms: ["lutning", "lutningen", "k-värde", "k-värdet", "riktningskoefficient", "riktningskoefficienten"],
    explain: "Hur brant en rät linje är: hur mycket y ändras när x ökar med 1. Det är k i y = kx + m.",
    example: "y = 2x + 1: k = 2, linjen går 2 steg upp för varje steg åt höger.",
    confuse: "Negativt k = linjen lutar nedåt åt höger.",
    url: URL.rataLinjen
  },
  {
    id: "skarning", name: "skärning, m-värde", group: "Algebra och funktioner", forms: ["skärningspunkt", "skärningspunkten", "skärningspunkter", "skär", "m-värde", "m-värdet"],
    explain: "Skärningspunkt = där två linjer, eller en linje och en axel, korsar varandra. m i y = kx + m är där linjen skär y-axeln.",
    example: "y = 2x + 1 skär y-axeln i (0, 1). Två linjers skärningspunkt hittar du genom att sätta dem lika.",
    url: URL.rataLinjen
  }
];

const TERM_BY_ID = new Map(MATH_TERMS.map((t) => [t.id, t]));

export function findTerm(id: string): MathTerm | undefined {
  return TERM_BY_ID.get(id);
}

// ── Matchning i frågetext ──

/** Alla former, längst först, så att "omvänt proportionell" vinner över "proportionell". */
const FORM_TO_ID: [string, string][] = MATH_TERMS.flatMap((t) => t.forms.map((f) => [f.toLowerCase(), t.id] as [string, string])).sort(
  (a, b) => b[0].length - a[0].length
);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Hela ord: ingen bokstav eller siffra direkt före eller efter. */
const FORM_RE_SOURCE = `(?<![\\p{L}\\p{N}])(${FORM_TO_ID.map(([f]) => escapeRe(f).replace(/ /g, "\\s+")).join("|")})(?![\\p{L}\\p{N}])`;

function formToId(match: string): string | undefined {
  const key = match.toLowerCase().replace(/\s+/g, " ");
  return FORM_TO_ID.find(([f]) => f === key)?.[1];
}

export interface TermHit {
  id: string;
  /** Position i texten. */
  index: number;
  text: string;
}

/** Alla träffar i ren text, i ordning. */
export function findTermsInText(text: string): TermHit[] {
  const re = new RegExp(FORM_RE_SOURCE, "giu");
  const hits: TermHit[] = [];
  for (const m of text.matchAll(re)) {
    const id = formToId(m[0]);
    if (id) hits.push({ id, index: m.index ?? 0, text: m[0] });
  }
  return hits;
}

/** Element vars innehåll aldrig markeras (figurer, tabeller, formler). */
const SKIP_TAGS = new Set(["svg", "table", "sup", "sub", "math", "button", "a", "code"]);

/**
 * Markerar FÖRSTA förekomsten av varje term i en frågetext. Rör bara textnoder utanför <svg>, <table> m.fl.
 * Ett "<" som inte följs av en bokstav eller "/" (t.ex. "b < 0" i KVA) räknas som text, inte som tagg.
 * `skip` = term-id som inte ska markeras (t.ex. de man redan kan).
 */
export function markTermsInHtml(html: string, skip: ReadonlySet<string> = new Set()): string {
  const seen = new Set<string>(skip);
  const parts = html.split(/(<\/?[a-zA-Z][^>]*>)/);
  let skipDepth = 0;
  const out: string[] = [];
  for (const part of parts) {
    const tag = /^<(\/?)([a-zA-Z][\w-]*)/.exec(part);
    if (tag) {
      const name = tag[2].toLowerCase();
      if (SKIP_TAGS.has(name) && !part.endsWith("/>")) skipDepth += tag[1] ? -1 : 1;
      if (skipDepth < 0) skipDepth = 0;
      out.push(part);
      continue;
    }
    if (skipDepth > 0 || !part) {
      out.push(part);
      continue;
    }
    let last = 0;
    let res = "";
    for (const hit of findTermsInText(part)) {
      if (seen.has(hit.id)) continue;
      seen.add(hit.id);
      res += part.slice(last, hit.index) + `<span class="hp-term" data-action="hp-term-open" data-term="${hit.id}" role="button" tabindex="0">${hit.text}</span>`;
      last = hit.index + hit.text.length;
    }
    out.push(res + part.slice(last));
  }
  return out.join("");
}

/** En mening ur frågebanken där termen används, för kortets framsida. Kortas till ca 140 tecken. */
export function findTermUsage(id: string, prompts: string[], max = 140): string | null {
  for (const prompt of prompts) {
    const text = prompt.replace(/<svg[\s\S]*?<\/svg>|<table[\s\S]*?<\/table>/gi, " ").replace(/<\/?[a-zA-Z][^>]*>/g, "");
    const sentences = text.split(/\n+|(?<=[.?!])\s+/);
    for (const s of sentences) {
      const hit = findTermsInText(s).find((h) => h.id === id);
      if (!hit) continue;
      const trimmed = s.trim();
      if (trimmed.length <= max) return trimmed;
      const start = Math.max(0, Math.min(hit.index - 50, trimmed.length - max));
      return `${start > 0 ? "…" : ""}${trimmed.slice(start, start + max).trim()}…`;
    }
  }
  return null;
}

// ── Status och kort ──

export type TermStatus = "kan" | "osaker";

export interface TermCardState {
  status: TermStatus;
  /** Antal olika dagar i rad med "Kunde" på kortet. */
  streak: number;
  /** Senaste dagen med "Kunde". */
  lastKnew?: string;
  /** Senaste dagen kortet visades. */
  last?: string;
  /** Senaste dagen med "Kunde inte". Ett kort man missat räknas inte som kunnat samma dag. */
  lastMiss?: string;
}

export interface TermsState {
  terms: Record<string, TermCardState>;
}

export const EMPTY_TERMS_STATE: TermsState = { terms: {} };

/** "Kunde" så här många olika dagar → flyttas till Kan. */
export const TERM_DAYS_TO_KNOW = 2;

export function termCounts(state: TermsState): { kan: number; osaker: number; unmarked: number } {
  let kan = 0;
  let osaker = 0;
  for (const t of MATH_TERMS) {
    const s = state.terms[t.id]?.status;
    if (s === "kan") kan++;
    else if (s === "osaker") osaker++;
  }
  return { kan, osaker, unmarked: MATH_TERMS.length - kan - osaker };
}

/** Snabbskanning: sätter status och nollställer kortets dagsräkning. */
export function markTerm(state: TermsState, id: string, status: TermStatus): TermsState {
  const cur = state.terms[id];
  return { terms: { ...state.terms, [id]: { ...cur, status, streak: 0 } } };
}

/** Kort: "Kunde" räknas en gång per dag, och inte en dag då man missat kortet. Två olika dagar → Kan. "Kunde inte" → börja om. */
export function gradeTerm(state: TermsState, id: string, knew: boolean, today: string): TermsState {
  const cur = state.terms[id] ?? { status: "osaker" as TermStatus, streak: 0 };
  let next: TermCardState;
  if (!knew) {
    next = { ...cur, status: "osaker", streak: 0, last: today, lastMiss: today };
  } else if (cur.lastKnew === today || cur.lastMiss === today) {
    next = { ...cur, last: today };
  } else {
    const streak = cur.streak + 1;
    next = { ...cur, streak, lastKnew: today, last: today, status: streak >= TERM_DAYS_TO_KNOW ? "kan" : "osaker" };
  }
  return { terms: { ...state.terms, [id]: next } };
}

/** Ett pass: osäkra termer, de som inte setts i dag först, sedan lägst dagsräkning. Högst `size` kort. */
export function planTermCards(state: TermsState, today: string, size = 12, rand: () => number = Math.random): string[] {
  return MATH_TERMS.filter((t) => state.terms[t.id]?.status === "osaker")
    .map((t) => {
      const c = state.terms[t.id];
      return { id: t.id, key: (c.last === today ? 10 : 0) + c.streak * 2 + rand() };
    })
    .sort((a, b) => a.key - b.key)
    .slice(0, size)
    .map((x) => x.id);
}
