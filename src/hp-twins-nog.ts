import type { HpTwin } from "./hp-twins";

// Fler NOG-tvillingar (kvantitativa resonemang). id-prefix: "nog2-".
// Samma fem fasta svarsalternativ som i src/hp-twins.ts, i samma ordning.
// Källa (facit och provhäften i PDF, hämtade och extraherade med curl + pypdf):
// https://www.studera.nu/hogskoleprov/om/forbereda/tidigare/

const NOG_OPTIONS = [
  "i (1) men ej i (2)",
  "i (2) men ej i (1)",
  "i (1) tillsammans med (2)",
  "i (1) och (2) var för sig",
  "ej genom de båda påståendena"
];

const HOSTEN_2022_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2022-23-okt/";
const VAREN_2023_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2023/";
const HOSTEN_2023_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2023/";
const VAREN_2024_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/";
const HOSTEN_2024_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2024/";
const VAREN_2025_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2025/";
const HOSTEN_2025_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-facit-och-normering-hosten-2025/";

export const HP_TWINS_NOG: HpTwin[] = [
  // ===================== Källa: 2024-10-20, provpass 1 =====================
  {
    id: "nog2-01",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Nadja samlar på vykort. Hur många vykort har Nadja?\n\n(1) Om Nadja fick 20 procent fler vykort, skulle hon ha 108 vykort.\n(2) En fjärdedel av Nadjas samling utgör 25 procent av hennes vykort.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): 1,2x = 108 ger x = 90 vykort, tillräckligt ensamt. Från (2): 'en fjärdedel av samlingen utgör 25 procent av vykorten' är bara ett omskrivet sätt att säga 1/4 = 25 %, vilket inte ger någon ny information om det faktiska antalet — otillräckligt ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 23, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-02",
    delprov: "NOG",
    area: "bråk",
    prompt:
      "Oskar har bakat sammanlagt 90 muffins: choklad- och citronmuffins. Han har lagt några i skafferiet och resten i frysen. Hur många citronmuffins har Oskar lagt i frysen?\n\n(1) Oskar har lagt 15 chokladmuffins och 10 citronmuffins i skafferiet.\n(2) Två tredjedelar av muffinsen som Oskar har bakat är chokladmuffins.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (2): choklad = 2/3 · 90 = 60, citron = 30 totalt. Från (1): 10 citronmuffins ligger i skafferiet, så 30 - 10 = 20 ligger i frysen. Ingetdera påstående räcker ensamt (utan (2) vet vi inte totalen citron, utan (1) vet vi inte skafferifördelningen), men tillsammans räcker de.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 24, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-03",
    delprov: "NOG",
    area: "medelvärde",
    prompt:
      "En grupp består av tre pojkar och en flicka. Deras medellängd är 165 cm. Hur lång är flickan?\n\n(1) Pojkarnas medellängd är 160 cm.\n(2) Flickan är 8 cm längre än den längsta pojken.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Gruppens totala längd är 4 · 165 = 660 cm. Från (1): pojkarnas totala längd är 3 · 160 = 480 cm, så flickan är 660 - 480 = 180 cm — tillräckligt ensamt. Från (2) vet vi inte den längsta pojkens längd, så det räcker inte ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 26, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-04",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Tre lådor – en röd, en blå och en gul – innehåller varsin sak: en penna, ett suddgummi och en linjal. Vilken sak finns i den röda lådan?\n\n(1) Pennan finns i den blå eller den röda lådan. Suddgummit finns inte i den röda lådan.\n(2) Pennan finns inte i den blå lådan. I den gula lådan finns linjalen.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): pennan är inte i blå, och gul innehåller linjalen, så pennan måste vara i röd — tillräckligt ensamt. Från (1): pennan är i blå eller röd, och suddgummit är inte i röd — det lämnar flera möjliga kombinationer öppna (t.ex. penna i blå med röd = linjal, eller penna i röd), så det räcker inte ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 27, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-05",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Vilket är det positiva heltalet y?\n\n(1) 30 < y < 55\n(2) y är jämnt delbart med 6, men inte med 4.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Multiplar av 6 mellan 30 och 55: 36, 42, 48, 54. De som inte är delbara med 4: 42 och 54 (36 och 48 är delbara med 4). Två möjliga tal återstår även med båda påståendena, så informationen räcker inte.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 28, url: HOSTEN_2024_URL }
  },

  // ===================== Källa: 2024-10-20, provpass 4 =====================
  {
    id: "nog2-06",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Nora har tre olikstora bollar i olika färger: en grön, en orange och en lila. Vilken färg har den minsta bollen?\n\n(1) Den lila bollen är större än den gröna. Den orangea bollen är varken störst eller minst.\n(2) Den orangea bollen är större än den gröna. Den lila bollen är störst.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): lila > grön och orange ligger i mitten. Den enda ordning som stämmer är lila > orange > grön, så grön är minst — tillräckligt ensamt. Från (2): orange > grön och lila är störst, vilket ger ordningen lila > orange > grön, så grön är minst även här — tillräckligt ensamt. Båda påståendena ger var för sig samma svar.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 23, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-07",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Sara köper en väska, en tröja och en scarf. Hur mycket kostar Saras tröja?\n\n(1) Scarfen kostar en åttondel av vad tröjan kostar. Väskan kostar 150 kronor, vilket är 125 procent av vad scarfen kostar.\n(2) Scarfen och väskan kostar tillsammans en femtedel av vad tröjan kostar.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): scarfen kostar 150 / 1,25 = 120 kronor, och tröjan kostar då 8 · 120 = 960 kronor — tillräckligt ensamt. Från (2) får vi bara en enda ekvation med två okända (scarf och väska), vilket inte räcker för att bestämma tröjans pris.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 24, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-08",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Leo har 1 840 kort: fotbollskort och hockeykort. Vart och ett av korten ligger antingen i en pärm eller i en låda på vinden. Hur många av Leos fotbollskort ligger i en pärm?\n\n(1) Leo har 960 fotbollskort. 1 815 kort ligger i en pärm.\n(2) Leo har 880 hockeykort. 25 kort ligger i en låda på vinden.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Båda påståendena ger samma information i olika form: 1 840 - 1 815 = 25 kort på vinden, vilket stämmer med (2):s uppgift om 25 kort på vinden, och 960 + 880 = 1 840, vilket stämmer med totalen. Vi vet alltså att 25 kort ligger på vinden totalt, men inte hur många av dem som är fotbollskort respektive hockeykort — så antalet fotbollskort i pärmen går inte att bestämma, varken var för sig eller tillsammans.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 25, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-09",
    delprov: "NOG",
    area: "hastighet",
    prompt:
      "Björn cyklar 3 km längre än Wilma. Hur långt cyklar Björn?\n\n(1) Björn och Wilma cyklar med samma medelhastighet.\n(2) Björn cyklar i 30 minuter. Wilma cyklar 2/3 av tiden som Björn cyklar.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Wilma cyklar i 2/3 · 30 = 20 minuter. Med gemensam hastighet v gäller 30v - 20v = 3, det vill säga 10v = 3, så v = 0,3 km/min. Björns sträcka blir 30 · 0,3 = 9 km. Ingetdera påstående räcker ensamt (utan (1) vet vi inte att hastigheterna är lika, utan (2) känner vi inte tiderna), men tillsammans räcker de.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 26, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-10",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "a, b och c är tre jämna heltal. Talen är olika och skillnaden mellan det största och det minsta talet är 4. Vad är summan av de tre talen?\n\n(1) a = 24\n(2) c = 26",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Tre olika jämna tal inom ett spann på 4 måste vara {n, n+2, n+4}. Med a = 24 och c = 26 (skillnad 2) finns två möjliga tredje tal: 22 (mängden {22, 24, 26}, summa 72) eller 28 (mängden {24, 26, 28}, summa 78). Även tillsammans räcker påståendena inte för ett entydigt svar.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 27, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-11",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Nadja har tre enfärgade lådor: en blå, en gul och en grön. I en av lådorna ligger en nyckel. De andra lådorna är tomma. I vilken låda ligger nyckeln?\n\n(1) Nyckeln ligger antingen i den blå eller i den gula lådan. Av den gula och den gröna lådan är det bara en som är tom.\n(2) Av den blå och den gröna lådan är det minst en som är tom. Av den blå och den gula lådan är det högst en som är tom.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): eftersom nyckeln ligger i blå eller gul är den gröna lådan alltid tom. Då måste den gula vara den enda av gul/grön som inte är tom (enligt påståendet), så nyckeln ligger i gul — tillräckligt ensamt. Från (2): den gröna lådan kan inte innehålla nyckeln (annars vore både blå och gul tomma, vilket strider mot 'högst en är tom'), men det lämnar blå och gul öppna — otillräckligt ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 28, url: HOSTEN_2024_URL }
  },

  // ===================== Källa: 2022-10-23, provpass 1 =====================
  {
    id: "nog2-12",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Familjerna Ek, Falk, Gren och Holm bor i varsin lägenhet i ett trevåningshus. En av familjerna bor på första våningen, två på andra våningen och en på tredje våningen. Vilken familj bor på tredje våningen?\n\n(1) Familjen Ek bor nedanför familjen Falk.\n(2) Familjen Falk bor nedanför familjen Gren.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) vet vi bara att Ek bor lägre än Falk, vilket lämnar flera möjliga fördelningar öppna. Från (2) vet vi bara att Falk bor lägre än Gren, också det otillräckligt ensamt. Tillsammans ger de en kedja: Ek lägre än Falk, Falk lägre än Gren. Den enda fördelning (1 - 2 - 2 - 3 våningar) som uppfyller båda villkoren har Gren högst upp, så Gren bor på tredje våningen.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 26, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-13",
    delprov: "NOG",
    area: "logik",
    prompt:
      "De fem bokstäverna P, Q, R, S och T är skrivna på rad på ett papper. I vilken ordning från vänster till höger är bokstäverna skrivna?\n\n(1) S står längst till vänster. Q står intill både R och T. P står längst till höger.\n(2) Varken S eller T står längst till höger. R står intill både P och Q. Q står intill både R och T.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2) ensamt går det att härleda en entydig ordning: S, R, Q, T, P. Från (1) ensamt finns det två möjliga ordningar som uppfyller villkoren (Q kan ligga mellan R och T på två olika sätt), så det räcker inte ensamt.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 28, url: HOSTEN_2022_URL }
  },

  // ===================== Källa: 2022-10-23, provpass 4 =====================
  {
    id: "nog2-14",
    delprov: "NOG",
    area: "geometri",
    prompt: "Vilken area har rektangeln Q?\n\n(1) En sida i Q är 7 cm.\n(2) Q har omkretsen 20 cm.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) vet vi bara en sida, inte den andra — otillräckligt ensamt. Från (2) vet vi bara omkretsen — otillräckligt ensamt. Tillsammans: 2(7 + b) = 20 ger b = 3 cm, så arean är 7 · 3 = 21 cm².",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 23, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-15",
    delprov: "NOG",
    area: "logik",
    prompt:
      "I en cykelparkering står tre skotrar: en röd, en blå och en svart. Vilken skoter står längst till höger?\n\n(1) Den svarta skotern står längre till vänster än den röda. Den blå skotern står varken längst till vänster eller längst till höger.\n(2) Den blå skotern står längre till vänster än den röda. Den svarta skotern står längst till vänster.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): svart står till vänster om röd, och blå står i mitten. Den enda ordning som stämmer är svart, blå, röd — röd står längst till höger, tillräckligt ensamt. Från (2): blå står till vänster om röd, och svart står längst till vänster, vilket ger ordningen svart, blå, röd — röd längst till höger, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 23, url: VAREN_2025_URL }
  },
  {
    id: "nog2-16",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Glas C rymmer 60 % av det som ryms i glas D. Hur mycket rymmer glas D?\n\n(1) När glas C är helt fyllt innehåller det 3/5 av det som ryms i glas D.\n(2) Glas C innehåller 9 cl och är fyllt till 75 %. Glas D är fyllt till 40 %.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Påstående (1) upprepar bara det som redan sägs i frågan (60 % = 3/5) och ger ingen ny information — otillräckligt ensamt. Från (2): glas C:s fulla volym är 9 / 0,75 = 12 cl, och eftersom C rymmer 60 % av D blir D:s volym 12 / 0,6 = 20 cl — tillräckligt ensamt (uppgiften om att D är fylld till 40 % behövs inte).",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 26, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-17",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "En dag handlar Nils i en elektronikaffär, en bokhandel och en leksaksaffär. Han handlar för sammanlagt 1 100 kronor. Hur mycket handlar Nils för i elektronikaffären?\n\n(1) I bokhandeln handlar Nils för en sjundedel av det han handlar för i elektronikaffären. I leksaksaffären handlar han för tre gånger så mycket som i bokhandeln.\n(2) Det sammanlagda beloppet som Nils handlar för i bokhandeln och leksaksaffären är mer än en tredjedel av vad han handlar för i elektronikaffären.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Låt E vara beloppet i elektronikaffären. Från (1): bokhandel = E/7, leksaker = 3E/7, så E + E/7 + 3E/7 = 11E/7 = 1 100 ger E = 700 — tillräckligt ensamt. Från (2) får vi bara en olikhet (bokhandel + leksaker > E/3), vilket inte räcker för att bestämma E exakt.",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 27, url: HOSTEN_2022_URL }
  },

  // ===================== Källa: 2023-03-25, provpass 2 =====================
  {
    id: "nog2-18",
    delprov: "NOG",
    area: "algebra",
    prompt: "För talen a, b och c gäller att (a + b)(a + c) = 13. Vilket värde har c?\n\n(1) a + b = 1\n(2) b = -3",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt vet vi bara att a + b = 1, men a är okänt — otillräckligt. Från (2) ensamt vet vi bara b, inte a — otillräckligt. Tillsammans: a + b = 1 och b = -3 ger a = 4. Då är a + c = 13/(a+b) = 13/1 = 13, så c = 13 - 4 = 9.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 24, url: VAREN_2023_URL }
  },
  {
    id: "nog2-19",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "På ett museum finns det tre olika slags föremål: statyer, målningar och skulpturer. Hur många målningar finns det på museet?\n\n(1) På museet finns det 12 statyer, vilket är hälften av antalet skulpturer. Det totala antalet föremål är jämnt delbart med 4.\n(2) På museet finns det fler skulpturer än målningar, och fler målningar än statyer.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1): skulpturer = 24, och totalen 12 + 24 + m = 36 + m ska vara delbar med 4, vilket kräver att m är delbart med 4 (m ∈ {0, 4, 8, ...}) — flera möjligheter, otillräckligt ensamt. Från (2) ensamt: bara en olikhet, otillräckligt. Tillsammans: 12 < m < 24 och m delbart med 4 ger två möjliga värden, m = 16 eller m = 20 — fortfarande inte entydigt.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 25, url: VAREN_2023_URL }
  },
  {
    id: "nog2-20",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Filip, Greta och Hedda befinner sig på olika platser i ett hus. En är i trädgården, en är i garaget och en är på vinden. Var är Hedda?\n\n(1) Filip är i garaget. Greta är inte i trädgården.\n(2) Hedda är inte i garaget. Greta är på vinden.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): Filip är i garaget, och Greta är inte i trädgården, så Greta måste vara på vinden — då återstår trädgården för Hedda, tillräckligt ensamt. Från (2): Hedda är inte i garaget, och Greta är på vinden, så de återstående platserna (garage och trädgård) fördelas mellan Filip och Hedda — eftersom Hedda inte är i garaget måste hon vara i trädgården, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2025-04-05", provpass: 5, uppgift: 24, url: VAREN_2025_URL }
  },
  {
    id: "nog2-21",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Anna, Bertil, Cissi och David sitter vid varsin sida kring ett kvadratiskt bord. Endast en av personerna bär hatt. Vem?\n\n(1) Anna sitter mitt emot David. Det är personen som sitter till höger om Bertil som bär hatt. David bär inte hatt.\n(2) Cissi sitter till höger om Anna och till vänster om David. Varken Cissi eller Bertil bär hatt.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): Anna mitt emot David låser upp bordets fyra platser, och personen till höger om Bertil är den som bär hatt — eftersom David inte bär hatt går det att härleda att det är Anna, oavsett hur Cissi och Bertil sitter i övrigt — tillräckligt ensamt. Från (2) vet vi bara att hatten bärs av Anna eller David, men inte vilken av dem — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 27, url: VAREN_2023_URL }
  },
  {
    id: "nog2-22",
    delprov: "NOG",
    area: "procent",
    prompt:
      "60 liter vatten fördes över från tank C till tank D. Volymen vatten i tank D ökade då med 20 %. Hur mycket vatten fanns det från början i tank C?\n\n(1) Den sammanlagda volymen vatten i tankarna var 540 liter.\n(2) Efter överföringen var det hälften så mycket vatten i tank C som i tank D.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Tank D:s ursprungliga volym ges av att 60 liter motsvarar 20 % av den, så D0 = 60/0,2 = 300 liter (oberoende av påståendena). Från (1): C0 = 540 - 300 = 240 liter — tillräckligt ensamt. Från (2): efter överföringen har D 360 liter, och C har hälften, 180 liter, så C0 = 180 + 60 = 240 liter — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 28, url: VAREN_2023_URL }
  },
  {
    id: "nog2-23",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en hylla ligger fem pärmar på rad: en röd, en gul, en blå, en grön och en lila. Pärmarna är numrerade 1–5 från vänster till höger. Vilket nummer har den röda pärmen?\n\n(1) Den röda pärmen ligger intill den gröna pärmen, den gröna pärmen ligger intill den blå pärmen, och den blå pärmen ligger intill den gula pärmen.\n(2) Den gula pärmen ligger mellan den blå pärmen och den lila pärmen. Den lila pärmen har nummer 5.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt finns det flera ordningar som uppfyller kedjan av 'intill'-villkor. Från (2) ensamt finns det också flera möjliga placeringar. Tillsammans ger de en entydig ordning: röd, grön, blå, gul, lila — så den röda pärmen har nummer 1.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 23, url: VAREN_2023_URL }
  },

  // ===================== Källa: 2023-03-25, provpass 4 =====================
  {
    id: "nog2-24",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en fest finns det 90 personer: musiker och gäster. Var och en av personerna på festen dansar eller sitter ner. Hur många musiker dansar?\n\n(1) Antalet musiker som sitter ner är lika med antalet gäster som dansar.\n(2) Antalet gäster på festen är lika med antalet personer som sitter ner.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Om G är antal gäster och g_s antalet gäster som sitter ner, så säger (2) att G = totalt antal som sitter ner, vilket (efter omskrivning) visar sig vara exakt samma samband som (1) uttrycker: musiker som sitter ner = gäster som dansar. De två påståendena ger alltså bara en enda oberoende ekvation med för många okända, så antalet dansande musiker går inte att bestämma, varken var för sig eller tillsammans.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 23, url: VAREN_2023_URL }
  },
  {
    id: "nog2-25",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Tom och Vera delar förråd. De har varsin hylla där de förvarar burkar och lådor. Hur många lådor finns det på Toms hylla?\n\n(1) Sammanlagt finns det 24 lådor och 58 burkar på hyllorna. På Veras hylla står det 33 burkar.\n(2) På Toms hylla står det sammanlagt 50 burkar och lådor. Det står 30 fler burkar än lådor på Toms hylla.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): burkar - lådor = 30 och burkar + lådor = 50 på Toms hylla, vilket ger burkar = 40 och lådor = 10 — tillräckligt ensamt. Från (1) vet vi att Tom har 58 - 33 = 25 burkar, men de 24 lådorna totalt är inte fördelade mellan Tom och Vera var för sig, så Toms antal lådor går inte att bestämma — otillräckligt ensamt.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 27, url: VAREN_2025_URL }
  },
  {
    id: "nog2-26",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "I en förening finns det y medlemmar, där 40 < y < 90.\n\n(1) Om medlemmarna delas in i grupper om 7 blir det 3 medlemmar över.\n(2) Medlemmarna kan delas in i grupper om 8.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Tal mellan 40 och 90 som ger rest 3 vid division med 7: 45, 52, 59, 66, 73, 80, 87 — flera möjligheter, otillräckligt ensamt. Tal delbara med 8 i samma intervall: 48, 56, 64, 72, 80, 88 — också flera möjligheter, otillräckligt ensamt. Det enda talet som finns i båda listorna är 80, så tillsammans räcker påståendena för ett entydigt svar.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 25, url: VAREN_2023_URL }
  },
  {
    id: "nog2-27",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Tre burkar är märkta X, Y och Z. En av burkarna är tom, en innehåller russin och en innehåller mandlar. I vilken burk finns mandlarna?\n\n(1) Burk Y är inte tom. Mandlarna finns inte i burk X.\n(2) Burk Z är tom. Russinen finns inte i burk Y.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): eftersom Z är den tomma burken kan varken X eller Y vara tom, och eftersom russinen inte finns i Y måste Y innehålla mandlarna — tillräckligt ensamt. Från (1) vet vi bara att Y inte är tom och att mandlarna inte finns i X, vilket lämnar öppet om mandlarna finns i Y eller Z — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 26, url: VAREN_2023_URL }
  },
  {
    id: "nog2-28",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Hur många syskon har Oskar?\n\n(1) Oskar har tre gånger så många bröder som systrar.\n(2) Om Oskar hade haft 4 syskon färre skulle han ha haft en tredjedel så många syskon som han verkligen har.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): om S är totala antalet syskon gäller S - 4 = S/3, vilket ger S = 6 — tillräckligt ensamt. Från (1) vet vi bara förhållandet mellan bröder och systrar (bröder = 3 · systrar), men inte det faktiska antalet systrar, så totalen kan vara 0, 4, 8, ... — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 27, url: VAREN_2023_URL }
  },
  {
    id: "nog2-29",
    delprov: "NOG",
    area: "medelvärde",
    prompt:
      "Vad är medelvärdet av p och q?\n\n(1) Medelvärdet av (p + 3) och (q + 11) är lika med 12.\n(2) Medelvärdet av p, (q - 2) och 4 är lika med 4.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): (p + 3 + q + 11)/2 = 12 ger p + q + 14 = 24, alltså p + q = 10 och medelvärdet är 5 — tillräckligt ensamt. Från (2): (p + q - 2 + 4)/3 = 4 ger p + q + 2 = 12, alltså p + q = 10 och medelvärdet är 5 — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 28, url: VAREN_2023_URL }
  },
  {
    id: "nog2-30",
    delprov: "NOG",
    area: "procent",
    prompt: "En tank innehåller endast vatten. Tanken är fylld till 3/5 av sin volym. Hur stor volym har tanken?\n\n(1) För att tanken ska bli helt full måste man fylla på ytterligare 400 liter vatten.\n(2) Om man tömmer ut 100 liter vatten ur tanken så kommer den att vara fylld till hälften.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Låt V vara tankens totala volym. Från (1): V - (3/5)V = (2/5)V = 400 ger V = 1 000 liter — tillräckligt ensamt. Från (2): (3/5)V - 100 = (1/2)V ger (1/10)V = 100, alltså V = 1 000 liter — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2024-04-13", provpass: 5, uppgift: 25, url: VAREN_2024_URL }
  },

  // ===================== Källa: 2024-04-13, provpass 5 =====================
  {
    id: "nog2-31",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Elin och Fanny leker med kulor. Hur många kulor har Elin?\n\n(1) Om Elin hade ytterligare 60 kulor, så skulle hon ha fyra gånger så många kulor som hon faktiskt har.\n(2) Om Elin hade 10 kulor färre, så skulle Fanny ha tre gånger så många kulor som Elin.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): E + 60 = 4E ger 3E = 60, alltså E = 20 — tillräckligt ensamt. Från (2) får vi bara en ekvation med två okända (Elins och Fannys antal kulor), vilket inte räcker för att bestämma Elins antal.",
    twinOf: { prov: "2024-04-13", provpass: 5, uppgift: 27, url: VAREN_2024_URL }
  },

  // ===================== Källa: 2023-10-22, provpass 2 =====================
  {
    id: "nog2-32",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Nadja har 96 pärlor. Var och en av pärlorna är antingen blå eller vit. Dessutom är var och en av pärlorna antingen rund eller kantig. Hur många runda blå pärlor har Nadja?\n\n(1) Fler än hälften av pärlorna är blå. Fler än hälften av pärlorna är runda.\n(2) Sju av de kantiga pärlorna är blå.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1) vet vi bara att antalet blå är fler än 48, inget exakt antal — otillräckligt. Från (2) vet vi bara antalet kantiga blå — otillräckligt. Tillsammans: antalet runda blå = (antal blå) - 7, men det exakta antalet blå (bara känt som > 48) förblir obestämt, så svaret går inte att bestämma ens med båda påståendena.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 24, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-33",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Ett femsiffrigt tal är skrivet på ett papper. Vilket är det femsiffriga talet?\n\n(1) Den första siffran i talet är dubbelt så stor som den femte siffran. Summan av de två första siffrorna är 9. Den tredje siffran är 6.\n(2) Den fjärde siffran i talet är dubbelt så stor som den första siffran.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1): första siffran d1 = 2 · d5 (d1 ∈ {2,4,6,8}), och d2 = 9 - d1, vilket ger fyra möjliga kombinationer. Från (2): d4 = 2 · d1 måste vara en siffra (0–9), vilket utesluter d1 = 6 och d1 = 8. Kvar blir d1 = 2 (talet 27641) och d1 = 4 (talet 45682) — två möjliga tal återstår, så det går inte att bestämma talet ens med båda påståendena.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 27, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-34",
    delprov: "NOG",
    area: "geometri",
    prompt:
      "Punkterna P, Q, R och N ligger på en linje. Sträckan PR är 3 gånger så lång som sträckan PQ. N är mittpunkten på sträckan PR. Hur lång är sträckan QR?\n\n(1) Sträckan RN är 9 längdenheter.\n(2) Sträckan PQ är 6 längdenheter.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Eftersom N är mittpunkt på PR gäller RN = PR/2 = 1,5 · PQ. Från (1): 1,5 · PQ = 9 ger PQ = 6, PR = 18, och QR = PR - PQ = 12 — tillräckligt ensamt. Från (2): PQ = 6 ger direkt samma resultat, QR = 12 — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 28, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-35",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en biograf med tre salonger visas tre olika filmer: en action, en komedi och ett drama. Vilken film visas i vilken salong?\n\n(1) Komedin visas inte i salong 2. Dramat visas i salong 1 eller salong 3.\n(2) Komedin visas i salong 1. Dramat visas i salong 2 eller salong 3.",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt finns det flera möjliga kombinationer som uppfyller villkoren. Från (2) ensamt finns det också flera möjliga kombinationer. Tillsammans ger de en entydig lösning: komedi i salong 1, action i salong 2 och drama i salong 3.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 23, url: HOSTEN_2023_URL }
  },

  // ===================== Källa: 2023-10-22, provpass 4 =====================
  {
    id: "nog2-36",
    delprov: "NOG",
    area: "logik",
    prompt:
      "I en klass går det 25 elever. Hur många av eleverna läser både franska och tyska?\n\n(1) 15 av eleverna läser franska.\n(2) 12 av eleverna läser tyska.",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Utan uppgift om hur många som läser minst ett av språken (eller inget alls) kan antalet som läser båda variera fritt mellan max(0, 15+12-25) = 2 och min(15, 12) = 12. Ingen av kombinationerna av påståendena ger ett entydigt antal.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 23, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-37",
    delprov: "NOG",
    area: "geometri",
    prompt: "Går linjen L genom punkten (3, 3)?\n\n(1) Linjen L går genom punkten (1, 5).\n(2) Linjen L går genom punkten (5, 1).",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt går oändligt många linjer genom (1, 5), och de flesta går inte genom (3, 3) — otillräckligt. Från (2) ensamt gäller motsvarande resonemang. Tillsammans bestämmer de två punkterna en unik linje: riktningskoefficienten är (1-5)/(5-1) = -1, och linjen y = -x + 6 går genom (3, 3) eftersom -3 + 6 = 3.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 24, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-38",
    delprov: "NOG",
    area: "talteori",
    prompt: "Erik tänker på ett heltal. Är talet jämnt delbart med 4?\n\n(1) Talet är jämnt delbart med 20.\n(2) Talet är jämnt delbart med 28.",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): 20 = 4 · 5, så alla tal delbara med 20 är också delbara med 4 — svaret är alltid ja, tillräckligt ensamt. Från (2): 28 = 4 · 7, så alla tal delbara med 28 är också delbara med 4 — svaret är alltid ja, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 25, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-39",
    delprov: "NOG",
    area: "logik",
    prompt: "En ek, en lind och en asp växer intill varandra. Vilket av träden är högst?\n\n(1) Eken är högre än linden. Aspen är inte högst.\n(2) Både eken och linden är högre än aspen.",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): eken är högre än linden, och aspen är inte högst — då kan bara eken vara högst (linden kan inte vara högst eftersom eken är högre) — tillräckligt ensamt. Från (2) vet vi bara att aspen är kortast av de tre, men inte om eken eller linden är högst — otillräckligt ensamt.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 26, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-40",
    delprov: "NOG",
    area: "logik",
    prompt:
      "En förening ska välja en ordförande, en sekreterare och en kassör. Wilma, Yusuf och Zara blir valda till de olika posterna. Vem av dem väljs till sekreterare?\n\n(1) Varken Wilma eller Yusuf väljs till kassör. Zara väljs inte till sekreterare.\n(2) Varken Wilma eller Zara väljs till ordförande. Zara väljs till kassör.",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): ordförande är varken Wilma eller Zara, så ordförande måste vara Yusuf. Zara är kassör, vilket lämnar Wilma som sekreterare — tillräckligt ensamt. Från (1): kassören är varken Wilma eller Yusuf, så kassören är Zara, men det lämnar öppet om Wilma eller Yusuf är sekreterare — otillräckligt ensamt.",
    twinOf: { prov: "2025-10-19", provpass: 1, uppgift: 27, url: HOSTEN_2025_URL }
  }
];
