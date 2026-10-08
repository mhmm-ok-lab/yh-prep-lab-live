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
    hint: "Pröva (1) ensamt, sedan (2) ensamt, och först om ingen räcker båda tillsammans. Fråga dig för varje påstående om det leder till ett bestämt antal.",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Nadja samlar på vykort. Hur många vykort har Nadja?\n\n(1) Om Nadja fick 20 procent fler vykort, skulle hon ha 108 vykort.\n(2) Om Nadja gav bort 25 procent av sina vykort, skulle hon ha tre fjärdedelar av vykorten kvar.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): 1,2x = 108 ger x = 90 vykort, tillräckligt ensamt. Från (2): att ge bort 25 % och ha 75 % (tre fjärdedelar) kvar gäller för vilket antal som helst, så påståendet säger ingenting om hur många vykort hon har — otillräckligt ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 23, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-02",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda tillsammans. Fråga dig vad du kan räkna ut om hela mängden i (2) och vad (1) säger om delmängden.",
    delprov: "NOG",
    area: "bråk",
    prompt:
      "Oskar har bakat sammanlagt 90 muffins: choklad- och citronmuffins. Han har lagt några i skafferiet och resten i frysen. Hur många citronmuffins har Oskar lagt i frysen?\n\n(1) Oskar har lagt 15 chokladmuffins och 10 citronmuffins i skafferiet.\n(2) Två tredjedelar av muffinsen som Oskar har bakat är chokladmuffins.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (2): choklad = 2/3 · 90 = 60, citron = 30 totalt. Från (1): 10 citronmuffins ligger i skafferiet, så 30 - 10 = 20 ligger i frysen. Ingetdera påstående räcker ensamt (utan (2) vet vi inte totalen citron, utan (1) vet vi inte skafferifördelningen), men tillsammans räcker de.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 24, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-03",
    hint: "Tre steg. Medelvärde gånger antal ger totalsumman. Fråga dig om (1) respektive (2) räcker för att få ut flickans längd.",
    delprov: "NOG",
    area: "medelvärde",
    prompt:
      "En grupp består av tre pojkar och en flicka. Deras medellängd är 165 cm. Hur lång är flickan?\n\n(1) Pojkarnas medellängd är 160 cm.\n(2) Flickan är 8 cm längre än den längsta pojken.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Gruppens totala längd är 4 · 165 = 660 cm. Från (1): pojkarnas totala längd är 3 · 160 = 480 cm, så flickan är 660 - 480 = 180 cm — tillräckligt ensamt. Från (2) vet vi inte den längsta pojkens längd, så det räcker inte ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 26, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-04",
    hint: "Tre steg. För varje påstående, lista vilka placeringar som blir kvar för den röda lådan. Är det bara en kvar?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Tre lådor – en röd, en blå och en gul – innehåller varsin sak: en penna, ett suddgummi och en linjal. Vilken sak finns i den röda lådan?\n\n(1) Pennan finns i den blå eller den röda lådan. Suddgummit finns inte i den röda lådan.\n(2) Pennan finns inte i den blå lådan. I den gula lådan finns linjalen.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): pennan är inte i blå, och gul innehåller linjalen, så pennan måste vara i röd — tillräckligt ensamt. Från (1): pennan är i blå eller röd, och suddgummit är inte i röd — det lämnar flera möjliga kombinationer öppna (t.ex. penna i blå med röd = linjal, eller penna i röd), så det räcker inte ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 27, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-05",
    hint: "Tre steg. Lista vilka tal som uppfyller (1), sedan (2), och till sist båda. Är det exakt ett tal kvar?",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Vilket är det positiva heltalet y?\n\n(1) 30 < y < 55\n(2) y är jämnt delbart med 6, men inte med 4.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Multiplar av 6 mellan 30 och 55: 36, 42, 48, 54. De som inte är delbara med 4: 42 och 54 (36 och 48 är delbara med 4). Två möjliga tal återstår även med båda påståendena, så informationen räcker inte.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 28, url: HOSTEN_2024_URL }
  },

  // ===================== Källa: 2024-10-20, provpass 4 =====================
  {
    id: "nog2-06",
    hint: "Tre steg. Rangordna bollarna efter storlek enligt (1) och sedan enligt (2). Fråga dig om ordningen blir entydig varje gång.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Nora har tre olikstora bollar i olika färger: en grön, en orange och en lila. Vilken färg har den minsta bollen?\n\n(1) Den lila bollen är större än den gröna. Den orangea bollen är varken störst eller minst.\n(2) Den orangea bollen är större än den gröna. Den lila bollen är störst.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): lila > grön och orange ligger i mitten. Den enda ordning som stämmer är lila > orange > grön, så grön är minst — tillräckligt ensamt. Från (2): orange > grön och lila är störst, vilket ger ordningen lila > orange > grön, så grön är minst även här — tillräckligt ensamt. Båda påståendena ger var för sig samma svar.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 23, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-07",
    hint: "Tre steg. Fråga dig om du får en lösbar ekvation med exakt en okänd i (1) och i (2). Räkna okända mot samband.",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Sara köper en väska, en tröja och en scarf. Hur mycket kostar Saras tröja?\n\n(1) Scarfen kostar en åttondel av vad tröjan kostar. Väskan kostar 150 kronor, vilket är 125 procent av vad scarfen kostar.\n(2) Tröjan kostar 690 kronor mer än scarfen och väskan tillsammans.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): scarfen kostar 150 / 1,25 = 120 kronor, och tröjan kostar då 8 · 120 = 960 kronor — tillräckligt ensamt. Från (2) får vi bara tröja = scarf + väska + 690, en ekvation med tre okända priser, vilket inte räcker för att bestämma tröjans pris.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 24, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-08",
    hint: "Tre steg. Sätt upp vad du vet om fördelningen för korten. Fråga dig om (1) respektive (2) handlar om fotbollskort i pärm.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Leo har 1 840 kort: fotbollskort och hockeykort. Vart och ett av korten ligger antingen i en pärm eller i en låda på vinden. Hur många av Leos fotbollskort ligger i en pärm?\n\n(1) Leo har 960 fotbollskort. 1 815 kort ligger i en pärm.\n(2) Leo har 880 hockeykort. 25 kort ligger i en låda på vinden.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Båda påståendena ger samma information i olika form: 1 840 - 1 815 = 25 kort på vinden, vilket stämmer med (2):s uppgift om 25 kort på vinden, och 960 + 880 = 1 840, vilket stämmer med totalen. Vi vet alltså att 25 kort ligger på vinden totalt, men inte hur många av dem som är fotbollskort respektive hockeykort — så antalet fotbollskort i pärmen går inte att bestämma, varken var för sig eller tillsammans.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 25, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-09",
    hint: "Tre steg. Skriv upp vad du vet om sträcka, tid och hastighet för varje person. Fråga dig om (1) och (2) var för sig ger ett tal.",
    delprov: "NOG",
    area: "hastighet",
    prompt:
      "Björn cyklar 3 km längre än Wilma. Hur långt cyklar Björn?\n\n(1) Björn och Wilma cyklar med samma medelhastighet.\n(2) Björn cyklar i 30 minuter. Wilma cyklar 2/3 av tiden som Björn cyklar.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Wilma cyklar i 2/3 · 30 = 20 minuter. Med gemensam hastighet v gäller 30v - 20v = 3, det vill säga 10v = 3, så v = 0,3 km/min. Björns sträcka blir 30 · 0,3 = 9 km. Ingetdera påstående räcker ensamt (utan (1) vet vi inte att hastigheterna är lika, utan (2) känner vi inte tiderna), men tillsammans räcker de.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 26, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-10",
    hint: "Tre steg. Fundera på hur tre olika jämna tal inom ett spann på 4 kan se ut. Räcker (1) eller (2) för att fastställa alla tre?",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "a, b och c är tre jämna heltal. Talen är olika och skillnaden mellan det största och det minsta talet är 4. Vad är summan av de tre talen?\n\n(1) a = 24\n(2) c = 26\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Tre olika jämna tal inom ett spann på 4 måste vara {n, n+2, n+4}. Med a = 24 och c = 26 (skillnad 2) finns två möjliga tredje tal: 22 (mängden {22, 24, 26}, summa 72) eller 28 (mängden {24, 26, 28}, summa 78). Även tillsammans räcker påståendena inte för ett entydigt svar.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 27, url: HOSTEN_2024_URL }
  },
  {
    id: "nog2-11",
    hint: "Tre steg. Utgå från vad som ska gälla för varje låda. För (1) och (2) var för sig, fråga dig hur många lådor nyckeln kan ligga i.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Nadja har tre enfärgade lådor: en blå, en gul och en grön. I en av lådorna ligger en nyckel. De andra lådorna är tomma. I vilken låda ligger nyckeln?\n\n(1) Nyckeln ligger antingen i den blå eller i den gula lådan. Av den gula och den gröna lådan är det bara en som är tom.\n(2) Av den blå och den gröna lådan är det minst en som är tom. Av den blå och den gula lådan är det högst en som är tom.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): eftersom nyckeln ligger i blå eller gul är den gröna lådan alltid tom. Då måste den gula vara den enda av gul/grön som inte är tom (enligt påståendet), så nyckeln ligger i gul — tillräckligt ensamt. Från (2): den gröna lådan kan inte innehålla nyckeln (annars vore både blå och gul tomma, vilket strider mot 'högst en är tom'), men det lämnar blå och gul öppna — otillräckligt ensamt.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 28, url: HOSTEN_2024_URL }
  },

  // ===================== Källa: 2022-10-23, provpass 1 =====================
  {
    id: "nog2-12",
    hint: "Tre steg. Rita våningarna och ställ upp vad (1) och (2) tillåter. Räcker det att placera en familj, eller måste du kombinera?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Familjerna Ek, Falk, Gren och Holm bor i varsin lägenhet i ett trevåningshus. En av familjerna bor på första våningen, två på andra våningen och en på tredje våningen. Vilken familj bor på tredje våningen?\n\n(1) Familjen Ek bor på en lägre våning än familjen Falk.\n(2) Familjen Falk bor på en lägre våning än familjen Gren.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) vet vi bara att Ek bor lägre än Falk, vilket lämnar flera möjliga fördelningar öppna. Från (2) vet vi bara att Falk bor lägre än Gren, också det otillräckligt ensamt. Tillsammans ger de en kedja: Ek lägre än Falk, Falk lägre än Gren. Tre familjer på tre olika våningar måste då bo Ek på våning 1, Falk på våning 2 och Gren på våning 3 (Holm bor också på våning 2). Gren bor alltså på tredje våningen.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 26, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-13",
    hint: "Tre steg. Försök bygga raden för (1), sedan för (2). Fråga dig om det finns mer än en ordning som fungerar.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "De fem bokstäverna P, Q, R, S och T är skrivna på rad på ett papper. I vilken ordning från vänster till höger är bokstäverna skrivna?\n\n(1) S står längst till vänster. Q står intill både R och T. P står längst till höger.\n(2) Varken S eller T står längst till höger. R står intill både P och Q. Q står intill både R och T.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): R står intill P och Q, och Q intill R och T, så P, R, Q, T står i en sammanhängande kedja (P-R-Q-T eller T-Q-R-P). S står då i ena änden. Eftersom varken S eller T får stå längst till höger blir den enda möjliga ordningen S, T, Q, R, P — tillräckligt ensamt. Från (1): S först och P sist, och Q står i mitten med R och T på var sin sida. Det ger två ordningar, S, R, Q, T, P och S, T, Q, R, P — otillräckligt ensamt.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 28, url: HOSTEN_2022_URL }
  },

  // ===================== Källa: 2022-10-23, provpass 4 =====================
  {
    id: "nog2-14",
    hint: "Tre steg. Vad behöver du för att räkna ut en rektangels area? Se vad (1) och (2) var för sig ger, och sedan tillsammans.",
    delprov: "NOG",
    area: "geometri",
    prompt: "Vilken area har rektangeln Q?\n\n(1) En sida i Q är 7 cm.\n(2) Q har omkretsen 20 cm.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) vet vi bara en sida, inte den andra — otillräckligt ensamt. Från (2) vet vi bara omkretsen — otillräckligt ensamt. Tillsammans: 2(7 + b) = 20 ger b = 3 cm, så arean är 7 · 3 = 21 cm².",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 23, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-15",
    hint: "Tre steg. Placera skotrarna efter (1), sedan efter (2). Är det alltid samma skoter som hamnar längst till höger?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "I en cykelparkering står tre skotrar: en röd, en blå och en svart. Vilken skoter står längst till höger?\n\n(1) Den svarta skotern står längre till vänster än den röda. Den blå skotern står varken längst till vänster eller längst till höger.\n(2) Den blå skotern står längre till vänster än den röda. Den svarta skotern står längst till vänster.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): svart står till vänster om röd, och blå står i mitten. Den enda ordning som stämmer är svart, blå, röd — röd står längst till höger, tillräckligt ensamt. Från (2): blå står till vänster om röd, och svart står längst till vänster, vilket ger ordningen svart, blå, röd — röd längst till höger, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 23, url: VAREN_2025_URL }
  },
  {
    id: "nog2-16",
    hint: "Tre steg. Jämför varje påstående med det som redan står i frågan, och fundera på vad du kan räkna ut om glasens volym.",
    delprov: "NOG",
    area: "procent",
    prompt:
      "Glas C rymmer 60 % av det som ryms i glas D. Hur mycket rymmer glas D?\n\n(1) När glas C är helt fyllt innehåller det 3/5 av det som ryms i glas D.\n(2) Glas C innehåller 9 cl och är fyllt till 75 %. Glas D är fyllt till 40 %.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Påstående (1) upprepar bara det som redan sägs i frågan (60 % = 3/5) och ger ingen ny information — otillräckligt ensamt. Från (2): glas C:s fulla volym är 9 / 0,75 = 12 cl, och eftersom C rymmer 60 % av D blir D:s volym 12 / 0,6 = 20 cl — tillräckligt ensamt (uppgiften om att D är fylld till 40 % behövs inte).",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 26, url: HOSTEN_2022_URL }
  },
  {
    id: "nog2-17",
    hint: "Tre steg. Ge elektronikaffären en bokstav och uttryck de andra med den. Fråga dig om (1) respektive (2) ger en ekvation eller en olikhet.",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "En dag handlar Nils i en elektronikaffär, en bokhandel och en leksaksaffär. Han handlar för sammanlagt 1 100 kronor. Hur mycket handlar Nils för i elektronikaffären?\n\n(1) I bokhandeln handlar Nils för en sjundedel av det han handlar för i elektronikaffären. I leksaksaffären handlar han för tre gånger så mycket som i bokhandeln.\n(2) Det sammanlagda beloppet som Nils handlar för i bokhandeln och leksaksaffären är mer än en tredjedel av vad han handlar för i elektronikaffären.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Låt E vara beloppet i elektronikaffären. Från (1): bokhandel = E/7, leksaker = 3E/7, så E + E/7 + 3E/7 = 11E/7 = 1 100 ger E = 700 — tillräckligt ensamt. Från (2) får vi bara en olikhet (bokhandel + leksaker > E/3), vilket inte räcker för att bestämma E exakt.",
    twinOf: { prov: "2022-10-23", provpass: 4, uppgift: 27, url: HOSTEN_2022_URL }
  },

  // ===================== Källa: 2023-03-25, provpass 2 =====================
  {
    id: "nog2-18",
    hint: "Tre steg. Fråga dig vilken del av uttrycket du får veta i (1) och i (2), och vilka okända som återstår när du ska få ut c.",
    delprov: "NOG",
    area: "algebra",
    prompt: "För talen a, b och c gäller att (a + b)(a + c) = 13. Vilket värde har c?\n\n(1) a + b = 1\n(2) b = -3\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt vet vi bara att a + b = 1, men a är okänt — otillräckligt. Från (2) ensamt vet vi bara b, inte a — otillräckligt. Tillsammans: a + b = 1 och b = -3 ger a = 4. Då är a + c = 13/(a+b) = 13/1 = 13, så c = 13 - 4 = 9.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 24, url: VAREN_2023_URL }
  },
  {
    id: "nog2-19",
    hint: "Tre steg. Skriv upp vad du vet om antalet av varje sorts föremål för (1) och (2). Hur många tal blir kvar efter varje steg?",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "På ett museum finns det tre olika slags föremål: statyer, målningar och skulpturer. Hur många målningar finns det på museet?\n\n(1) På museet finns det 12 statyer, vilket är hälften av antalet skulpturer. Det totala antalet föremål är jämnt delbart med 4.\n(2) På museet finns det fler skulpturer än målningar, och fler målningar än statyer.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1): skulpturer = 24, och totalen 12 + 24 + m = 36 + m ska vara delbar med 4, vilket kräver att m är delbart med 4 (m ∈ {0, 4, 8, ...}) — flera möjligheter, otillräckligt ensamt. Från (2) ensamt: bara en olikhet, otillräckligt. Tillsammans: 12 < m < 24 och m delbart med 4 ger två möjliga värden, m = 16 eller m = 20 — fortfarande inte entydigt.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 25, url: VAREN_2023_URL }
  },
  {
    id: "nog2-20",
    hint: "Tre steg. Lista vilka platser som går att tilldela enligt (1), sedan (2). Är Heddas plats alltid densamma?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Filip, Greta och Hedda befinner sig på tre olika ställen hemma: en är i trädgården, en är i garaget och en är på vinden. Var är Hedda?\n\n(1) Filip är i garaget. Greta är inte i trädgården.\n(2) Hedda är inte i garaget. Greta är på vinden.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): Filip är i garaget, och Greta är inte i trädgården, så Greta måste vara på vinden — då återstår trädgården för Hedda, tillräckligt ensamt. Från (2): Hedda är inte i garaget, och Greta är på vinden, så de återstående platserna (garage och trädgård) fördelas mellan Filip och Hedda — eftersom Hedda inte är i garaget måste hon vara i trädgården, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2025-04-05", provpass: 5, uppgift: 24, url: VAREN_2025_URL }
  },
  {
    id: "nog2-21",
    hint: "Tre steg. Rita bordet och placera personerna enligt (1) och sedan (2). Fråga dig om hattbäraren blir entydig.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Anna, Bertil, Cissi och David sitter vid varsin sida av ett kvadratiskt bord, vända mot bordet. ”Till höger om” betyder sett från den person som nämns. Endast en av de fyra bär hatt. Vem bär hatt?\n\n(1) Anna sitter mitt emot David. Det är personen som sitter till höger om Bertil som bär hatt. David bär inte hatt.\n(2) Cissi sitter till höger om Anna och till vänster om David. Varken Cissi eller Bertil bär hatt.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): Anna sitter mitt emot David, så Bertil sitter mitt emot Cissi och har Anna och David som grannar. Personen till höger om Bertil är alltså Anna eller David, och eftersom David inte bär hatt är det Anna — tillräckligt ensamt. Från (2): Cissi sitter mellan Anna och David, och varken Cissi eller Bertil bär hatt, så hatten bärs av Anna eller David, men vi vet inte vem — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 27, url: VAREN_2023_URL }
  },
  {
    id: "nog2-22",
    hint: "Tre steg. Fråga dig först vad uppgiften redan avslöjar om tank D. Därefter, räcker (1) respektive (2) för att få fram C?",
    delprov: "NOG",
    area: "procent",
    prompt:
      "60 liter vatten fördes över från tank C till tank D. Volymen vatten i tank D ökade då med 20 %. Hur mycket vatten fanns det från början i tank C?\n\n(1) Den sammanlagda volymen vatten i tankarna var 540 liter.\n(2) Efter överföringen var det hälften så mycket vatten i tank C som i tank D.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Tank D:s ursprungliga volym ges av att 60 liter motsvarar 20 % av den, så D0 = 60/0,2 = 300 liter (oberoende av påståendena). Från (1): C0 = 540 - 300 = 240 liter — tillräckligt ensamt. Från (2): efter överföringen har D 360 liter, och C har hälften, 180 liter, så C0 = 180 + 60 = 240 liter — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 28, url: VAREN_2023_URL }
  },
  {
    id: "nog2-23",
    hint: "Tre steg. Pröva att placera pärmarna på rad enligt (1) och sedan (2). Finns det mer än ett sätt?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en hylla ligger fem pärmar på rad: en röd, en gul, en blå, en grön och en lila. Pärmarna är numrerade 1–5 från vänster till höger. Vilket nummer har den röda pärmen?\n\n(1) Den röda pärmen ligger intill den gröna pärmen, den gröna pärmen ligger intill den blå pärmen, och den blå pärmen ligger intill den gula pärmen.\n(2) Den gula pärmen ligger mellan den blå pärmen och den lila pärmen. Den lila pärmen har nummer 5.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt finns det flera ordningar som uppfyller kedjan av 'intill'-villkor. Från (2) ensamt finns det också flera möjliga placeringar. Tillsammans ger de en entydig ordning: röd, grön, blå, gul, lila — så den röda pärmen har nummer 1.",
    twinOf: { prov: "2023-03-25", provpass: 2, uppgift: 23, url: VAREN_2023_URL }
  },

  // ===================== Källa: 2023-03-25, provpass 4 =====================
  {
    id: "nog2-24",
    hint: "Tre steg. Skriv varje påstående som ett samband mellan antal. Fråga dig om de säger samma sak, eller om ett är nytt.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en fest finns det 90 personer: musiker och gäster. Var och en av personerna på festen dansar eller sitter ner. Hur många musiker dansar?\n\n(1) Antalet musiker som sitter ner är lika med antalet gäster som dansar.\n(2) Antalet gäster på festen är lika med antalet personer som sitter ner.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "(2) säger: gäster som dansar + gäster som sitter = musiker som sitter + gäster som sitter. Stryk 'gäster som sitter' på båda sidor, så återstår gäster som dansar = musiker som sitter, alltså exakt samma sak som (1). Vi har fyra okända grupper men bara två samband (summan 90 och detta), så antalet dansande musiker går inte att bestämma, varken var för sig eller tillsammans.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 23, url: VAREN_2023_URL }
  },
  {
    id: "nog2-25",
    hint: "Tre steg. Skriv upp vad du vet om Toms hylla. Fråga dig om (1) och (2) var för sig handlar om just den hyllan.",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Tom och Vera delar förråd. De har varsin hylla där de förvarar burkar och lådor. Hur många lådor finns det på Toms hylla?\n\n(1) Sammanlagt finns det 24 lådor och 58 burkar på hyllorna. På Veras hylla står det 18 burkar.\n(2) På Toms hylla står det sammanlagt 50 burkar och lådor. Det står 30 fler burkar än lådor på Toms hylla.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): burkar - lådor = 30 och burkar + lådor = 50 på Toms hylla, vilket ger burkar = 40 och lådor = 10 — tillräckligt ensamt. Från (1) vet vi att Tom har 58 - 18 = 40 burkar, men de 24 lådorna totalt är inte fördelade mellan Tom och Vera var för sig, så Toms antal lådor går inte att bestämma — otillräckligt ensamt.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 27, url: VAREN_2025_URL }
  },
  {
    id: "nog2-26",
    hint: "Tre steg. Lista alla tal i intervallet som passar (1), sedan (2). Vad händer när du jämför listorna?",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "En förening har fler än 40 men färre än 90 medlemmar. Hur många medlemmar har föreningen?\n\n(1) Om medlemmarna delas in i grupper om 7 blir det 3 medlemmar över.\n(2) Medlemmarna kan delas in i grupper om 8.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Tal mellan 40 och 90 som ger rest 3 vid division med 7: 45, 52, 59, 66, 73, 80, 87 — flera möjligheter, otillräckligt ensamt. Tal delbara med 8 i samma intervall: 48, 56, 64, 72, 80, 88 — också flera möjligheter, otillräckligt ensamt. Det enda talet som finns i båda listorna är 80, så tillsammans räcker påståendena för ett entydigt svar.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 25, url: VAREN_2023_URL }
  },
  {
    id: "nog2-27",
    hint: "Tre steg. Gör en liten tabell över burkarna. Vad blir kvar för varje burk enligt (1) respektive (2)?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "Tre burkar är märkta X, Y och Z. En av burkarna är tom, en innehåller russin och en innehåller mandlar. I vilken burk finns mandlarna?\n\n(1) Burk Y är inte tom. Mandlarna finns inte i burk X.\n(2) Burk Z är tom. Russinen finns inte i burk Y.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): eftersom Z är den tomma burken kan varken X eller Y vara tom, och eftersom russinen inte finns i Y måste Y innehålla mandlarna — tillräckligt ensamt. Från (1) vet vi bara att Y inte är tom och att mandlarna inte finns i X, vilket lämnar öppet om mandlarna finns i Y eller Z — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 26, url: VAREN_2023_URL }
  },
  {
    id: "nog2-28",
    hint: "Tre steg. Skriv en ekvation för varje påstående. Fråga dig om du får en enda möjlig lösning eller bara ett förhållande.",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Hur många syskon har Oskar?\n\n(1) Oskar har dubbelt så många bröder som systrar.\n(2) Om Oskar hade haft 4 syskon färre skulle han ha haft en tredjedel så många syskon som han verkligen har.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): om S är totala antalet syskon gäller S - 4 = S/3, vilket ger S = 6 — tillräckligt ensamt. Från (1) vet vi bara förhållandet mellan bröder och systrar (bröder = 2 · systrar), men inte det faktiska antalet systrar, så totalen kan vara 3, 6, 9 ... — otillräckligt ensamt.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 27, url: VAREN_2023_URL }
  },
  {
    id: "nog2-29",
    hint: "Tre steg. Förenkla (1) till ett samband mellan p och q, och gör samma med (2). Fråga dig om du kan få p + q direkt.",
    delprov: "NOG",
    area: "medelvärde",
    prompt:
      "Vad är medelvärdet av p och q?\n\n(1) Medelvärdet av (p + 3) och (q + 11) är lika med 12.\n(2) Medelvärdet av p, (q - 2) och 4 är lika med 4.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): (p + 3 + q + 11)/2 = 12 ger p + q + 14 = 24, alltså p + q = 10 och medelvärdet är 5 — tillräckligt ensamt. Från (2): (p + q - 2 + 4)/3 = 4 ger p + q + 2 = 12, alltså p + q = 10 och medelvärdet är 5 — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 28, url: VAREN_2023_URL }
  },
  {
    id: "nog2-30",
    hint: "Tre steg. Låt V vara volymen och ställ upp en ekvation för varje påstående. Hur många lösningar får V?",
    delprov: "NOG",
    area: "procent",
    prompt: "En tank innehåller endast vatten. Tanken är fylld till 3/5 av sin volym. Hur stor volym har tanken?\n\n(1) För att tanken ska bli helt full måste man fylla på ytterligare 400 liter vatten.\n(2) Om man tömmer ut 100 liter vatten ur tanken så kommer den att vara fylld till hälften.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Låt V vara tankens totala volym. Från (1): V - (3/5)V = (2/5)V = 400 ger V = 1 000 liter — tillräckligt ensamt. Från (2): (3/5)V - 100 = (1/2)V ger (1/10)V = 100, alltså V = 1 000 liter — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2024-04-13", provpass: 5, uppgift: 25, url: VAREN_2024_URL }
  },

  // ===================== Källa: 2024-04-13, provpass 5 =====================
  {
    id: "nog2-31",
    hint: "Tre steg. Ge Elin och Fanny varsin bokstav och ställ upp en ekvation för varje påstående. Hur många okända har du i varje?",
    delprov: "NOG",
    area: "ekvationer",
    prompt:
      "Elin och Fanny leker med kulor. Hur många kulor har Elin?\n\n(1) Om Elin hade ytterligare 60 kulor, så skulle hon ha fyra gånger så många kulor som hon faktiskt har.\n(2) Om Elin hade 10 kulor färre, så skulle Fanny ha tre gånger så många kulor som Elin.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): E + 60 = 4E ger 3E = 60, alltså E = 20 — tillräckligt ensamt. Från (2) får vi bara en ekvation med två okända (Elins och Fannys antal kulor), vilket inte räcker för att bestämma Elins antal.",
    twinOf: { prov: "2024-04-13", provpass: 5, uppgift: 27, url: VAREN_2024_URL }
  },

  // ===================== Källa: 2023-10-22, provpass 2 =====================
  {
    id: "nog2-32",
    hint: "Tre steg. Rita en tabell med rund/kantig mot blå/vit. Fråga dig om (1) och (2) fyller ut den helt.",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Nadja har 96 pärlor. Var och en av pärlorna är antingen blå eller vit. Dessutom är var och en av pärlorna antingen rund eller kantig. Hur många runda blå pärlor har Nadja?\n\n(1) Fler än hälften av pärlorna är blå. Fler än hälften av pärlorna är runda.\n(2) Sju av de kantiga pärlorna är blå.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1) vet vi bara att antalet blå är fler än 48, inget exakt antal — otillräckligt. Från (2) vet vi bara antalet kantiga blå — otillräckligt. Tillsammans: antalet runda blå = (antal blå) - 7, men det exakta antalet blå (bara känt som > 48) förblir obestämt, så svaret går inte att bestämma ens med båda påståendena.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 24, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-33",
    hint: "Tre steg. Lista möjliga siffror för (1), skär bort med (2), och kontrollera om exakt ett tal återstår.",
    delprov: "NOG",
    area: "talteori",
    prompt:
      "Ett femsiffrigt tal är skrivet på ett papper. Vilket är det femsiffriga talet?\n\n(1) Den första siffran i talet är dubbelt så stor som den femte siffran. Summan av de två första siffrorna är 9. Den tredje siffran är 6.\n(2) Den fjärde siffran i talet är dubbelt så stor som den första siffran.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Från (1): första siffran d1 = 2 · d5 (d1 ∈ {2,4,6,8}), och d2 = 9 - d1, vilket ger fyra möjliga kombinationer. Från (2): d4 = 2 · d1 måste vara en siffra (0–9), vilket utesluter d1 = 6 och d1 = 8. Kvar blir d1 = 2 (talet 27641) och d1 = 4 (talet 45682) — två möjliga tal återstår, så det går inte att bestämma talet ens med båda påståendena.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 27, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-34",
    hint: "Tre steg. Rita sträckorna på en linje och uttryck allt med PQ. Räcker ett känt mått i (1) respektive (2)?",
    delprov: "NOG",
    area: "geometri",
    prompt:
      "Punkterna P, Q, N och R ligger i den ordningen på en rät linje. Sträckan PR är 3 gånger så lång som sträckan PQ. N är mittpunkten på sträckan PR. Hur lång är sträckan QR?\n\n(1) Sträckan RN är 9 längdenheter.\n(2) Sträckan PQ är 6 längdenheter.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Eftersom N är mittpunkt på PR gäller RN = PR/2 = 1,5 · PQ. Från (1): 1,5 · PQ = 9 ger PQ = 6, PR = 18, och QR = PR - PQ = 12 — tillräckligt ensamt. Från (2): PQ = 6 ger direkt samma resultat, QR = 12 — tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 28, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-35",
    hint: "Tre steg. Fyll i en tabell över filmer och salonger för (1), sedan (2). Hur många kombinationer återstår?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "På en biograf med tre salonger visas tre olika filmer: en action, en komedi och ett drama. Vilken film visas i vilken salong?\n\n(1) Komedin visas inte i salong 2. Dramat visas i salong 1 eller salong 3.\n(2) Komedin visas i salong 1. Dramat visas i salong 2 eller salong 3.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt finns det flera möjliga kombinationer som uppfyller villkoren. Från (2) ensamt finns det också flera möjliga kombinationer. Tillsammans ger de en entydig lösning: komedi i salong 1, action i salong 2 och drama i salong 3.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 23, url: HOSTEN_2023_URL }
  },

  // ===================== Källa: 2023-10-22, provpass 4 =====================
  {
    id: "nog2-36",
    hint: "Tre steg. Rita en mängddiagram över franska och tyska. Fråga dig om du vet hur många som läser inget eller bara ett av språken.",
    delprov: "NOG",
    area: "logik",
    prompt:
      "I en klass går det 25 elever. Hur många av eleverna läser både franska och tyska?\n\n(1) 15 av eleverna läser franska.\n(2) 12 av eleverna läser tyska.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Utan uppgift om hur många som läser minst ett av språken (eller inget alls) kan antalet som läser båda variera fritt mellan max(0, 15+12-25) = 2 och min(15, 12) = 12. Ingen av kombinationerna av påståendena ger ett entydigt antal.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 23, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-37",
    hint: "Tre steg. Fråga dig hur många linjer som kan gå genom en enda punkt, och vad som händer med två punkter.",
    delprov: "NOG",
    area: "geometri",
    prompt: "Går linjen L genom punkten (3, 3)?\n\n(1) Linjen L går genom punkten (1, 5).\n(2) Linjen L går genom punkten (5, 1).\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1) ensamt går oändligt många linjer genom (1, 5), och de flesta går inte genom (3, 3) — otillräckligt. Från (2) ensamt gäller motsvarande resonemang. Tillsammans bestämmer de två punkterna en unik linje: riktningskoefficienten är (1-5)/(5-1) = -1, och linjen y = -x + 6 går genom (3, 3) eftersom -3 + 6 = 3.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 24, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-38",
    hint: "Tre steg. Fråga dig om talet 4 går att ta ut ur tal som är delbara med 20 respektive 28. Blir svaret ja eller nej varje gång?",
    delprov: "NOG",
    area: "talteori",
    prompt: "Erik tänker på ett heltal. Är talet jämnt delbart med 4?\n\n(1) Talet är jämnt delbart med 20.\n(2) Talet är jämnt delbart med 28.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Från (1): 20 = 4 · 5, så alla tal delbara med 20 är också delbara med 4 — svaret är alltid ja, tillräckligt ensamt. Från (2): 28 = 4 · 7, så alla tal delbara med 28 är också delbara med 4 — svaret är alltid ja, tillräckligt ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 25, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-39",
    hint: "Tre steg. Rangordna träden för varje påstående. Är det alltid samma träd som blir högst?",
    delprov: "NOG",
    area: "logik",
    prompt: "En ek, en lind och en asp växer intill varandra. Vilket av träden är högst?\n\n(1) Eken är högre än linden. Aspen är inte högst.\n(2) Både eken och linden är högre än aspen.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 0,
    solution:
      "Från (1): eken är högre än linden, och aspen är inte högst — då kan bara eken vara högst (linden kan inte vara högst eftersom eken är högre) — tillräckligt ensamt. Från (2) vet vi bara att aspen är kortast av de tre, men inte om eken eller linden är högst — otillräckligt ensamt.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 26, url: HOSTEN_2023_URL }
  },
  {
    id: "nog2-40",
    hint: "Tre steg. Lista vilka poster som är möjliga för varje person under (1) och (2). Är sekreteraren entydig?",
    delprov: "NOG",
    area: "logik",
    prompt:
      "En förening ska välja en ordförande, en sekreterare och en kassör. Wilma, Yusuf och Zara blir valda till de olika posterna. Vem av dem väljs till sekreterare?\n\n(1) Varken Wilma eller Yusuf väljs till kassör. Zara väljs inte till sekreterare.\n(2) Varken Wilma eller Zara väljs till ordförande. Zara väljs till kassör.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): ordförande är varken Wilma eller Zara, så ordförande måste vara Yusuf. Zara är kassör, vilket lämnar Wilma som sekreterare — tillräckligt ensamt. Från (1): kassören är varken Wilma eller Yusuf, så kassören är Zara, men det lämnar öppet om Wilma eller Yusuf är sekreterare — otillräckligt ensamt.",
    twinOf: { prov: "2025-10-19", provpass: 1, uppgift: 27, url: HOSTEN_2025_URL }
  }
];
