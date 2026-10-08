// Formelträning (beslut 2026-10-08): ca 50 formler på HP:s matte (XYZ/KVA/NOG/DTK), Matte 1–2-nivå.
// Innehållet är genererat och kontrollräknat i Python (varje svar räknas fram från samma tal som står i texten).
// Pass: förfallna repetitioner (flashcards) först, sedan högst 5 nya formler att lära in (Lär in + snabbtest).
// Successive relearning: en formel är klar när den klarats på första försöket i 3 pass på olika dagar.
// Rena funktioner, ingen localStorage eller DOM, så allt går att testa.
import { addDays } from "./hp-plan";

export interface HpFormulaTask {
  /** HP-lik uppgift (1–2 meningar) som kräver formeln. */
  stem: string;
  /** Fyra formelnamn (rätt + 3 rimliga förväxlingar). */
  names: string[];
  nameCorrect: number;
  /** Fyra svarsalternativ, räknebara i huvudet. Felalternativen är typiska misstag. */
  answers: string[];
  answerCorrect: number;
  /** Uträkningen på en rad. */
  calc: string;
}

export interface HpFormula {
  id: string;
  /** T.ex. "Arean av en cirkel". */
  name: string;
  /** Formeln som text, t.ex. "A = π · r²". */
  formula: string;
  /** Matchar påminnelsekortens nycklar (findHpCard). */
  area: string;
  /** En rad: varför den ser ut så. */
  why: string;
  /** Knep för att räkna i huvudet, en rad. */
  headTip: string;
  /** Så ställer man upp den på papper, 3 korta steg. */
  paperSteps: string[];
  tasks: HpFormulaTask[];
}

export const HP_FORMULAS: HpFormula[] = [
  {
    id: "rektangel-area",
    name: "Arean av en rektangel",
    formula: "A = b · h",
    area: "geometri",
    why: "Rutor i rader: bredd gånger höjd.",
    headTip: "Dela upp: 12 · 5 = 10 · 5 + 2 · 5. Decimaler: 4,5 · 6 = 4 · 6 + 0,5 · 6.",
    paperSteps: ["Rita och skriv in måtten.", "Skriv A = b · h.", "Sätt in och räkna."],
    tasks: [
      {
        stem: "En rektangulär tomt är 12 m lång och 5 m bred. Hur stor är arean?",
        names: ["Omkretsen av en rektangel", "Arean av en triangel", "Arean av en rektangel", "Volymen av ett rätblock"],
        nameCorrect: 2,
        answers: ["34 m²", "60 m²", "30 m²", "17 m²"],
        answerCorrect: 1,
        calc: "A = 12·5 = 60 m²"
      },
      {
        stem: "Ett golv är 4,5 m gånger 6 m. Hur många kvadratmeter golv ska läggas?",
        names: ["Arean av en rektangel", "Omkretsen av en rektangel", "Arean av en triangel", "Arean av ett parallellogram"],
        nameCorrect: 0,
        answers: ["21 m²", "13,5 m²", "10,5 m²", "27 m²"],
        answerCorrect: 3,
        calc: "A = 4,5·6 = 27 m²"
      },
    ]
  },
  {
    id: "rektangel-omkrets",
    name: "Omkretsen av en rektangel",
    formula: "O = 2 · (b + h)",
    area: "geometri",
    why: "Gå ett varv: två bredder och två höjder.",
    headTip: "Räkna ihop b + h först, dubbla sedan. Det är ett varv, inte en yta.",
    paperSteps: ["Rita och skriv in alla fyra sidor.", "Skriv O = 2 · (b + h).", "Sätt in och räkna."],
    tasks: [
      {
        stem: "Ett staket ska gå runt en rektangulär hage som är 9 m × 6 m. Hur långt blir staketet?",
        names: ["Arean av en rektangel", "Omkretsen av en cirkel", "Arean av ett parallellogram", "Omkretsen av en rektangel"],
        nameCorrect: 3,
        answers: ["30 m", "54 m", "15 m", "21 m"],
        answerCorrect: 0,
        calc: "O = 2·(9+6) = 30 m"
      },
      {
        stem: "En bild är 20 cm bred och 15 cm hög. Hur lång list går åt runt hela bilden?",
        names: ["Arean av en rektangel", "Omkretsen av en rektangel", "Arean av en triangel", "Omkretsen av en cirkel"],
        nameCorrect: 1,
        answers: ["300 cm", "70 cm", "35 cm", "55 cm"],
        answerCorrect: 1,
        calc: "O = 2·(20+15) = 70 cm"
      },
    ]
  },
  {
    id: "triangel-area",
    name: "Arean av en triangel",
    formula: "A = b · h / 2",
    area: "geometri",
    why: "En triangel är en halv rektangel.",
    headTip: "Halvera det jämna talet först (basen eller höjden), multiplicera sedan.",
    paperSteps: ["Rita och markera basen och den lodräta höjden.", "Skriv A = b · h / 2.", "Sätt in och räkna."],
    tasks: [
      {
        stem: "En triangel har basen 10 cm och höjden 7 cm. Hur stor är arean?",
        names: ["Arean av en triangel", "Arean av en rektangel", "Arean av ett parallelltrapets", "Omkretsen av en triangel"],
        nameCorrect: 0,
        answers: ["70 cm²", "17 cm²", "140 cm²", "35 cm²"],
        answerCorrect: 3,
        calc: "A = 10·7/2 = 35 cm²"
      },
      {
        stem: "Ett segel är en triangel med basen 6 m och höjden 8 m. Hur stor är seglets area?",
        names: ["Arean av en rektangel", "Arean av ett parallellogram", "Omkretsen av en rektangel", "Arean av en triangel"],
        nameCorrect: 3,
        answers: ["24 m²", "48 m²", "14 m²", "96 m²"],
        answerCorrect: 0,
        calc: "A = 6·8/2 = 24 m²"
      },
    ]
  },
  {
    id: "parallellogram-area",
    name: "Arean av ett parallellogram",
    formula: "A = bas · höjd",
    area: "geometri",
    why: "Luta en rektangel: arean ändras inte. Använd höjden, inte den sneda sidan.",
    headTip: "Samma som rektangel: bas · höjd. Ignorera den sneda sidan.",
    paperSteps: ["Rita och dra den lodräta höjden.", "Skriv A = bas · höjd.", "Sätt in. Sneda sidan används inte."],
    tasks: [
      {
        stem: "Ett parallellogram har basen 8 cm och höjden 5 cm. Den sneda sidan är 6 cm. Hur stor är arean?",
        names: ["Arean av en triangel", "Arean av ett parallellogram", "Arean av ett parallelltrapets", "Omkretsen av en rektangel"],
        nameCorrect: 1,
        answers: ["48 cm²", "40 cm²", "20 cm²", "28 cm²"],
        answerCorrect: 1,
        calc: "A = 8·5 = 40 cm² (inte den sneda sidan)"
      },
      {
        stem: "En fyrkantig yta är ett parallellogram: basen 12 m, höjden 4 m, sneda sidan 5 m. Arean?",
        names: ["Arean av en triangel", "Arean av ett parallelltrapets", "Arean av ett parallellogram", "Arean av en rektangel"],
        nameCorrect: 2,
        answers: ["60 m²", "24 m²", "34 m²", "48 m²"],
        answerCorrect: 3,
        calc: "A = 12·4 = 48 m² (inte den sneda sidan)"
      },
    ]
  },
  {
    id: "trapets-area",
    name: "Arean av ett parallelltrapets",
    formula: "A = (a + b) · h / 2",
    area: "geometri",
    why: "Medelbredden (a + b)/2 gånger höjden.",
    headTip: "Medelvärdet av de parallella sidorna först, gånger höjden. 6 och 10 ger 8.",
    paperSteps: ["Rita och markera de parallella sidorna a och b samt höjden.", "Skriv A = (a + b) · h / 2.", "Räkna parentesen först."],
    tasks: [
      {
        stem: "Ett parallelltrapets har parallella sidor på 6 cm och 10 cm. Höjden är 4 cm. Hur stor är arean?",
        names: ["Arean av ett parallellogram", "Arean av en triangel", "Omkretsen av ett parallelltrapets", "Arean av ett parallelltrapets"],
        nameCorrect: 3,
        answers: ["32 cm²", "64 cm²", "40 cm²", "8 cm²"],
        answerCorrect: 0,
        calc: "A = (6+10)·4/2 = 32 cm²"
      },
      {
        stem: "En tomt är ett parallelltrapets med parallella sidor 20 m och 30 m. Avståndet mellan dem är 8 m. Arean?",
        names: ["Arean av en triangel", "Arean av ett parallelltrapets", "Arean av ett parallellogram", "Arean av en rektangel"],
        nameCorrect: 1,
        answers: ["400 m²", "200 m²", "240 m²", "50 m²"],
        answerCorrect: 1,
        calc: "A = (20+30)·8/2 = 200 m²"
      },
    ]
  },
  {
    id: "cirkel-area",
    name: "Arean av en cirkel",
    formula: "A = π · r²",
    area: "geometri",
    why: "Radien ingår två gånger (r · r), därför r².",
    headTip: "Räkna r² först och lägg π sist. Svaren står ofta i π.",
    paperSteps: ["Skriv ner radien (halvera diametern om den är given).", "Skriv A = π · r².", "Sätt in, räkna r² och behåll π."],
    tasks: [
      {
        stem: "En cirkel har radien 3 cm. Hur stor är arean? (Svara med π.)",
        names: ["Omkretsen av en cirkel", "Arean av en cirkelsektor", "Arean av en cirkel", "Volymen av ett klot"],
        nameCorrect: 2,
        answers: ["6π cm²", "3π cm²", "36π cm²", "9π cm²"],
        answerCorrect: 3,
        calc: "A = π·3² = 9π cm²"
      },
      {
        stem: "En pizza har diametern 20 cm. Hur stor är arean? (Svara med π.)",
        names: ["Arean av en cirkel", "Omkretsen av en cirkel", "Arean av en cirkelsektor", "Arean av en rektangel"],
        nameCorrect: 0,
        answers: ["100π cm²", "400π cm²", "20π cm²", "200π cm²"],
        answerCorrect: 0,
        calc: "r = 20/2 = 10, A = π·10² = 100π cm²"
      },
    ]
  },
  {
    id: "cirkel-omkrets",
    name: "Omkretsen av en cirkel",
    formula: "O = 2 · π · r  (= π · d)",
    area: "geometri",
    why: "Ett varv runt är drygt tre diametrar: π · d.",
    headTip: "Dubbla radien och lägg π sist: r = 5 ger 10π. Svaren står ofta i π.",
    paperSteps: ["Skriv ner radien eller diametern.", "Skriv O = 2 · π · r (eller π · d).", "Sätt in och behåll π."],
    tasks: [
      {
        stem: "Ett hjul har radien 5 dm. Hur lång är hjulets omkrets? (Svara med π.)",
        names: ["Arean av en cirkel", "Omkretsen av en cirkel", "Båglängden av en cirkelsektor", "Omkretsen av en kvadrat"],
        nameCorrect: 1,
        answers: ["25π dm", "10π dm", "5π dm", "20π dm"],
        answerCorrect: 1,
        calc: "O = 2·π·5 = 10π dm"
      },
      {
        stem: "En runddamm har diametern 8 m. Hur långt är det runt dammen? (Svara med π.)",
        names: ["Arean av en cirkel", "Arean av en cirkelsektor", "Omkretsen av en cirkel", "Volymen av en cylinder"],
        nameCorrect: 2,
        answers: ["16π m", "4π m", "64π m", "8π m"],
        answerCorrect: 3,
        calc: "O = π·8 = 8π m"
      },
    ]
  },
  {
    id: "sektor-area",
    name: "Arean av en cirkelsektor",
    formula: "A = (v / 360) · π · r²",
    area: "geometri",
    why: "En del av hela cirkelns area: vinkeln delat med 360°.",
    headTip: "Förenkla vinkeln först: 90/360 = 1/4, 60/360 = 1/6. Ta sedan den delen av π·r².",
    paperSteps: ["Skriv bråket v/360 och förkorta.", "Skriv A = (v / 360) · π · r².", "Sätt in och förenkla."],
    tasks: [
      {
        stem: "En cirkelsektor har vinkeln 90° och radien 4 cm. Hur stor är sektorns area? (Svara med π.)",
        names: ["Arean av en cirkelsektor", "Båglängden av en cirkelsektor", "Arean av en cirkel", "Omkretsen av en cirkel"],
        nameCorrect: 0,
        answers: ["4π cm²", "16π cm²", "2π cm²", "8π cm²"],
        answerCorrect: 0,
        calc: "A = (90/360)·π·4² = 4π cm²"
      },
      {
        stem: "En tårtbit är en cirkelsektor med vinkeln 60° och radien 6 cm. Hur stor är bitens area? (Svara med π.)",
        names: ["Båglängden av en cirkelsektor", "Arean av en cirkel", "Omkretsen av en cirkel", "Arean av en cirkelsektor"],
        nameCorrect: 3,
        answers: ["36π cm²", "6π cm²", "2π cm²", "12π cm²"],
        answerCorrect: 1,
        calc: "A = (60/360)·π·6² = 6π cm²"
      },
    ]
  },
  {
    id: "bagl",
    name: "Båglängden av en cirkelsektor",
    formula: "båge = (v / 360) · 2 · π · r",
    area: "geometri",
    why: "En del av hela omkretsen: vinkeln delat med 360°.",
    headTip: "Förenkla vinkeln först (90° = 1/4, 120° = 1/3) och ta den delen av 2πr.",
    paperSteps: ["Skriv bråket v/360 och förkorta.", "Skriv b = (v / 360) · 2 · π · r.", "Sätt in och förenkla."],
    tasks: [
      {
        stem: "En cirkelbåge hör till vinkeln 90° i en cirkel med radien 6 cm. Hur lång är bågen? (Svara med π.)",
        names: ["Arean av en cirkelsektor", "Omkretsen av en cirkel", "Båglängden av en cirkelsektor", "Arean av en cirkel"],
        nameCorrect: 2,
        answers: ["9π cm", "12π cm", "3π/2 cm", "3π cm"],
        answerCorrect: 3,
        calc: "b = (90/360)·2·π·6 = 3π cm"
      },
      {
        stem: "En båge hör till vinkeln 120° i en cirkel med radien 9 m. Hur lång är bågen? (Svara med π.)",
        names: ["Båglängden av en cirkelsektor", "Arean av en cirkelsektor", "Omkretsen av en cirkel", "Arean av en cirkel"],
        nameCorrect: 0,
        answers: ["6π m", "27π m", "18π m", "3π m"],
        answerCorrect: 0,
        calc: "b = (120/360)·2·π·9 = 6π m"
      },
    ]
  },
  {
    id: "ratblock-volym",
    name: "Volymen av ett rätblock",
    formula: "V = l · b · h",
    area: "geometri",
    why: "Golvarean gånger höjden.",
    headTip: "Multiplicera två mått först, sedan det tredje: 5 · 3 = 15, 15 · 4 = 60.",
    paperSteps: ["Rita och skriv in l, b och h.", "Skriv V = l · b · h.", "Sätt in. Kontrollera enheten."],
    tasks: [
      {
        stem: "Ett akvarium är 5 dm långt, 3 dm brett och 4 dm högt. Hur många liter rymmer det? (1 dm³ = 1 liter)",
        names: ["Begränsningsarean av ett rätblock", "Arean av en rektangel", "Volymen av en cylinder", "Volymen av ett rätblock"],
        nameCorrect: 3,
        answers: ["94 liter", "60 liter", "12 liter", "20 liter"],
        answerCorrect: 1,
        calc: "V = 5·3·4 = 60 dm³ = 60 liter"
      },
      {
        stem: "En kartong är 6 cm lång, 5 cm bred och 2 cm hög. Hur stor är volymen?",
        names: ["Begränsningsarean av ett rätblock", "Volymen av ett rätblock", "Arean av en rektangel", "Volymen av ett prisma"],
        nameCorrect: 1,
        answers: ["104 cm³", "13 cm³", "30 cm³", "60 cm³"],
        answerCorrect: 3,
        calc: "V = 6·5·2 = 60 cm³"
      },
    ]
  },
  {
    id: "prisma-volym",
    name: "Volymen av ett prisma",
    formula: "V = B · h  (basarea · höjd)",
    area: "geometri",
    why: "Basytan staplad lika högt som höjden.",
    headTip: "Hitta basytans area först (den är ofta given), gånger höjden.",
    paperSteps: ["Räkna ut basytans area B.", "Skriv V = B · h.", "Sätt in och räkna."],
    tasks: [
      {
        stem: "Ett prisma har en triangulär basyta med arean 12 cm² och höjden 5 cm. Hur stor är volymen?",
        names: ["Volymen av ett prisma", "Volymen av en pyramid", "Arean av en triangel", "Volymen av en cylinder"],
        nameCorrect: 0,
        answers: ["60 cm³", "20 cm³", "30 cm³", "17 cm³"],
        answerCorrect: 0,
        calc: "V = 12·5 = 60 cm³"
      },
      {
        stem: "En 8 m lång balk har ett tvärsnitt med arean 3 m². Hur stor är balkens volym?",
        names: ["Volymen av en pyramid", "Arean av en rektangel", "Volymen av en kon", "Volymen av ett prisma"],
        nameCorrect: 3,
        answers: ["8 m³", "24 m³", "12 m³", "11 m³"],
        answerCorrect: 1,
        calc: "V = 3·8 = 24 m³"
      },
    ]
  },
  {
    id: "cylinder-volym",
    name: "Volymen av en cylinder",
    formula: "V = π · r² · h",
    area: "geometri",
    why: "En cirkelskiva (π · r²) staplad till höjden h.",
    headTip: "Räkna r² · h först och lägg π sist. Svaret står oftast i π.",
    paperSteps: ["Skriv ner r och h.", "Skriv V = π · r² · h.", "Sätt in, räkna r² · h och behåll π."],
    tasks: [
      {
        stem: "En burk är en cylinder med radien 3 cm och höjden 4 cm. Hur stor är volymen? (Svara med π.)",
        names: ["Volymen av en kon", "Volymen av en cylinder", "Arean av en cirkel", "Volymen av ett klot"],
        nameCorrect: 1,
        answers: ["24π cm³", "12π cm³", "144π cm³", "36π cm³"],
        answerCorrect: 3,
        calc: "V = π·3²·4 = 36π cm³"
      },
      {
        stem: "En tunna är en cylinder med radien 1 m och höjden 4 m. Hur stor är volymen? (Svara med π.)",
        names: ["Volymen av en kon", "Arean av en cirkel", "Volymen av en cylinder", "Volymen av ett klot"],
        nameCorrect: 2,
        answers: ["4π m³", "8π m³", "4π/3 m³", "16π m³"],
        answerCorrect: 0,
        calc: "V = π·1²·4 = 4π m³"
      },
    ]
  },
  {
    id: "kon-volym",
    name: "Volymen av en kon",
    formula: "V = π · r² · h / 3",
    area: "geometri",
    why: "En kon är en tredjedel av cylindern med samma bas och höjd.",
    headTip: "Räkna som cylindern och dela med 3. Välj tal som går jämnt upp: r² · h delas med 3.",
    paperSteps: ["Skriv ner r och h.", "Skriv V = π · r² · h / 3.", "Räkna r² · h, dela med 3 och behåll π."],
    tasks: [
      {
        stem: "En kon har radien 6 cm och höjden 2 cm. Hur stor är volymen? (Svara med π.)",
        names: ["Volymen av en cylinder", "Volymen av ett klot", "Arean av en triangel", "Volymen av en kon"],
        nameCorrect: 3,
        answers: ["72π cm³", "24π cm³", "36π cm³", "4π cm³"],
        answerCorrect: 1,
        calc: "V = π·6²·2/3 = 24π cm³"
      },
      {
        stem: "En glasstrut är en kon med radien 2 dm och höjden 9 dm. Hur stor är volymen? (Svara med π.)",
        names: ["Volymen av en cylinder", "Volymen av en kon", "Volymen av ett klot", "Arean av en cirkel"],
        nameCorrect: 1,
        answers: ["36π dm³", "18π dm³", "6π dm³", "12π dm³"],
        answerCorrect: 3,
        calc: "V = π·2²·9/3 = 12π dm³"
      },
    ]
  },
  {
    id: "klot-volym",
    name: "Volymen av ett klot",
    formula: "V = 4 · π · r³ / 3",
    area: "geometri",
    why: "Fyra tredjedelar av π gånger radien tre gånger.",
    headTip: "Räkna r³ först (3³ = 27, 6³ = 216), dela med 3, gånger 4. π sist.",
    paperSteps: ["Skriv ner radien (halvera diametern).", "Skriv V = 4 · π · r³ / 3.", "Räkna r³, gånger 4, dela med 3."],
    tasks: [
      {
        stem: "Ett klot har radien 6 cm. Hur stor är volymen? (Svara med π.)",
        names: ["Ytan av ett klot", "Volymen av en kon", "Volymen av ett klot", "Volymen av en cylinder"],
        nameCorrect: 2,
        answers: ["288π cm³", "864π cm³", "144π cm³", "48π cm³"],
        answerCorrect: 0,
        calc: "V = 4π·6³/3 = 288π cm³"
      },
      {
        stem: "En boll har diametern 6 dm. Hur stor är volymen? (Svara med π.)",
        names: ["Volymen av ett klot", "Ytan av ett klot", "Volymen av en kon", "Volymen av en cylinder"],
        nameCorrect: 0,
        answers: ["108π dm³", "36π dm³", "288π dm³", "12π dm³"],
        answerCorrect: 1,
        calc: "r = 6/2 = 3, V = 4π·3³/3 = 36π dm³"
      },
    ]
  },
  {
    id: "pythagoras",
    name: "Pythagoras sats",
    formula: "a² + b² = c²  (c = hypotenusan)",
    area: "geometri",
    why: "Kvadraterna på kateterna blir tillsammans kvadraten på hypotenusan. Bara i rätvinkliga trianglar.",
    headTip: "Lär dig trioerna: 3-4-5, 5-12-13, 8-15-17 och deras dubblar (6-8-10).",
    paperSteps: ["Rita triangeln och markera hypotenusan (mittemot räta vinkeln).", "Skriv a² + b² = c².", "Sätt in, räkna kvadraterna och dra roten."],
    tasks: [
      {
        stem: "I en rätvinklig triangel är kateterna 6 cm och 8 cm. Hur lång är hypotenusan?",
        names: ["Arean av en triangel", "Pythagoras sats", "Vinkelsumman i en triangel", "Likformighet"],
        nameCorrect: 1,
        answers: ["14 cm", "100 cm", "48 cm", "10 cm"],
        answerCorrect: 3,
        calc: "c² = 6²+8² = 100, c = 10 cm"
      },
      {
        stem: "En 13 m lång stege står 5 m från en lodrät vägg. Hur högt upp på väggen når den?",
        names: ["Arean av en triangel", "Vinkelsumman i en triangel", "Pythagoras sats", "Likformighet"],
        nameCorrect: 2,
        answers: ["12 m", "8 m", "18 m", "144 m"],
        answerCorrect: 0,
        calc: "5²+h² = 13², h² = 144, h = 12 m"
      },
    ]
  },
  {
    id: "vinkelsumma-triangel",
    name: "Vinkelsumman i en triangel",
    formula: "v₁ + v₂ + v₃ = 180°",
    area: "geometri",
    why: "Hörnen i en triangel tillsammans blir ett halvt varv.",
    headTip: "Lägg ihop de två kända vinklarna och dra från 180°.",
    paperSteps: ["Skriv de kända vinklarna.", "Skriv v₁ + v₂ + v₃ = 180°.", "Lös ut den okända."],
    tasks: [
      {
        stem: "Två vinklar i en triangel är 50° och 70°. Hur stor är den tredje vinkeln?",
        names: ["Vinkelsumman i en triangel", "Vinkelsumman i en fyrhörning", "Yttervinkelsatsen", "Pythagoras sats"],
        nameCorrect: 0,
        answers: ["120°", "60°", "40°", "130°"],
        answerCorrect: 1,
        calc: "180° − 50° − 70° = 60°"
      },
      {
        stem: "I en likbent triangel är toppvinkeln 40°. Hur stor är varje basvinkel?",
        names: ["Vinkelsumman i en fyrhörning", "Yttervinkelsatsen", "Vinkelsumman i en n-hörning", "Vinkelsumman i en triangel"],
        nameCorrect: 3,
        answers: ["140°", "50°", "20°", "70°"],
        answerCorrect: 3,
        calc: "(180° − 40°)/2 = 70°"
      },
    ]
  },
  {
    id: "vinkelsumma-fyrhorning",
    name: "Vinkelsumman i en fyrhörning",
    formula: "v₁ + v₂ + v₃ + v₄ = 360°",
    area: "geometri",
    why: "Två trianglar: 2 · 180° = 360°.",
    headTip: "Lägg ihop de tre kända vinklarna och dra från 360°.",
    paperSteps: ["Skriv de kända vinklarna.", "Skriv summan = 360°.", "Lös ut den okända."],
    tasks: [
      {
        stem: "Tre vinklar i en fyrhörning är 80°, 100° och 90°. Hur stor är den fjärde?",
        names: ["Vinkelsumman i en triangel", "Vinkelsumman i en n-hörning", "Vinkelsumman i en fyrhörning", "Yttervinkelsatsen"],
        nameCorrect: 2,
        answers: ["90°", "100°", "270°", "180°"],
        answerCorrect: 0,
        calc: "360° − 80° − 100° − 90° = 90°"
      },
      {
        stem: "Tre vinklar i en fyrhörning är 100°, 100° och 60°. Hur stor är den fjärde?",
        names: ["Vinkelsumman i en fyrhörning", "Vinkelsumman i en triangel", "Vinkelsumman i en n-hörning", "Yttervinkelsatsen"],
        nameCorrect: 0,
        answers: ["−20°", "100°", "260°", "120°"],
        answerCorrect: 1,
        calc: "360° − 100° − 100° − 60° = 100°"
      },
    ]
  },
  {
    id: "vinkelsumma-n",
    name: "Vinkelsumman i en n-hörning",
    formula: "(n − 2) · 180°",
    area: "geometri",
    why: "Dela upp i (n − 2) trianglar, var och en 180°.",
    headTip: "Räkna n − 2 först: sexhörning → 4 trianglar → 4 · 180° = 720°.",
    paperSteps: ["Räkna hörnen n.", "Skriv (n − 2) · 180°.", "Sätt in och räkna."],
    tasks: [
      {
        stem: "Hur stor är vinkelsumman i en sexhörning?",
        names: ["Vinkelsumman i en fyrhörning", "Vinkelsumman i en triangel", "Yttervinkelsatsen", "Vinkelsumman i en n-hörning"],
        nameCorrect: 3,
        answers: ["1 080°", "540°", "360°", "720°"],
        answerCorrect: 3,
        calc: "(6 − 2)·180° = 720°"
      },
      {
        stem: "Hur stor är vinkelsumman i en femhörning?",
        names: ["Vinkelsumman i en fyrhörning", "Vinkelsumman i en n-hörning", "Vinkelsumman i en triangel", "Yttervinkelsatsen"],
        nameCorrect: 1,
        answers: ["540°", "900°", "720°", "360°"],
        answerCorrect: 0,
        calc: "(5 − 2)·180° = 540°"
      },
    ]
  },
  {
    id: "yttervinkel",
    name: "Yttervinkelsatsen",
    formula: "yttervinkel = summan av de två andra innervinklarna",
    area: "geometri",
    why: "Yttervinkeln och innervinkeln vid hörnet blir tillsammans 180°.",
    headTip: "Addera de två vinklarna som inte ligger bredvid. Eller 180° minus innervinkeln.",
    paperSteps: ["Rita och märk yttervinkeln.", "Skriv yttervinkel = de två andra innervinklarna.", "Sätt in och lös ut."],
    tasks: [
      {
        stem: "I en triangel är två vinklar 45° och 65°. Hur stor är yttervinkeln vid det tredje hörnet?",
        names: ["Yttervinkelsatsen", "Vinkelsumman i en triangel", "Vinkelsumman i en fyrhörning", "Pythagoras sats"],
        nameCorrect: 0,
        answers: ["70°", "110°", "20°", "135°"],
        answerCorrect: 1,
        calc: "yttervinkel = 45° + 65° = 110°"
      },
      {
        stem: "Yttervinkeln vid ett hörn i en triangel är 120°. En av de två andra innervinklarna är 50°. Hur stor är den tredje innervinkeln?",
        names: ["Vinkelsumman i en triangel", "Vinkelsumman i en fyrhörning", "Pythagoras sats", "Yttervinkelsatsen"],
        nameCorrect: 3,
        answers: ["130°", "60°", "170°", "70°"],
        answerCorrect: 3,
        calc: "120° = 50° + v, v = 70°"
      },
    ]
  },
  {
    id: "langdskala",
    name: "Längdskala (k)",
    formula: "k = längd i bilden / längd i verkligheten",
    area: "geometri",
    why: "Alla längder skalas med samma tal k.",
    headTip: "Skala 1:50 000 → 1 cm är 50 000 cm = 500 m. Räkna cm → m → km.",
    paperSteps: ["Skriv skalan som k.", "Skriv längd i bilden = k · längd i verkligheten.", "Sätt in och räkna om enheter."],
    tasks: [
      {
        stem: "På en karta i skala 1:50 000 är en sträcka 4 cm. Hur lång är den i verkligheten?",
        names: ["Areaskala (k²)", "Längdskala (k)", "Volymskala (k³)", "Pythagoras sats"],
        nameCorrect: 1,
        answers: ["2 km", "20 km", "0,2 km", "200 km"],
        answerCorrect: 0,
        calc: "4·50 000 = 200 000 cm = 2 km"
      },
      {
        stem: "Två likformiga trianglar: sidan 6 cm i den lilla motsvarar 15 cm i den stora. Hur lång är den sida i den stora som motsvarar 4 cm i den lilla?",
        names: ["Areaskala (k²)", "Volymskala (k³)", "Längdskala (k)", "Pythagoras sats"],
        nameCorrect: 2,
        answers: ["13 cm", "10 cm", "1,6 cm", "60 cm"],
        answerCorrect: 1,
        calc: "k = 15/6 = 2,5, 4·2,5 = 10 cm"
      },
    ]
  },
  {
    id: "areaskala",
    name: "Areaskala (k²)",
    formula: "areaskala = k²",
    area: "geometri",
    why: "Area är längd · längd, så k · k.",
    headTip: "Räkna k först, kvadrera det: dubbla längder → 2 · 2 = 4 gånger arean.",
    paperSteps: ["Räkna ut längdskalan k.", "Skriv areaskala = k².", "Gånger den kända arean."],
    tasks: [
      {
        stem: "Två likformiga figurer har längdskalan 1:3. Den lilla har arean 5 cm². Hur stor är arean på den stora?",
        names: ["Längdskala (k)", "Volymskala (k³)", "Procentuell förändring", "Areaskala (k²)"],
        nameCorrect: 3,
        answers: ["15 cm²", "135 cm²", "9 cm²", "45 cm²"],
        answerCorrect: 3,
        calc: "a·k² = 5·3² = 45 cm²"
      },
      {
        stem: "Alla längder i en bild fördubblas. Hur många gånger större blir arean?",
        names: ["Längdskala (k)", "Areaskala (k²)", "Volymskala (k³)", "Arean av en rektangel"],
        nameCorrect: 1,
        answers: ["4", "2", "8", "16"],
        answerCorrect: 0,
        calc: "k = 2, k² = 4 gånger"
      },
    ]
  },
  {
    id: "volymskala",
    name: "Volymskala (k³)",
    formula: "volymskala = k³",
    area: "geometri",
    why: "Volym är längd · bredd · höjd, så k · k · k.",
    headTip: "Räkna k först, tre gånger: dubbla längder → 2 · 2 · 2 = 8 gånger volymen.",
    paperSteps: ["Räkna ut längdskalan k.", "Skriv volymskala = k³.", "Gånger den kända volymen."],
    tasks: [
      {
        stem: "En modell är 3 gånger mindre än originalet i alla led (skala 1:3). Modellens volym är 2 dm³. Hur stor är originalets volym?",
        names: ["Areaskala (k²)", "Längdskala (k)", "Volymskala (k³)", "Volymen av ett klot"],
        nameCorrect: 2,
        answers: ["6 dm³", "54 dm³", "18 dm³", "27 dm³"],
        answerCorrect: 1,
        calc: "v·k³ = 2·3³ = 54 dm³"
      },
      {
        stem: "Alla längder hos en kub fördubblas. Hur många gånger större blir volymen?",
        names: ["Volymskala (k³)", "Areaskala (k²)", "Längdskala (k)", "Volymen av ett rätblock"],
        nameCorrect: 0,
        answers: ["2", "4", "16", "8"],
        answerCorrect: 3,
        calc: "k = 2, k³ = 8 gånger"
      },
    ]
  },
  {
    id: "andel",
    name: "Andel (del av helhet)",
    formula: "andel = del / helhet",
    area: "procent",
    why: "Hur stor del av helheten? Dela delen med helheten.",
    headTip: "Förläng nämnaren till 100 (10/25 = 40/100) så får du procenten direkt.",
    paperSteps: ["Skriv delen och helheten.", "Skriv del / helhet.", "Förkorta eller förläng till hundradelar."],
    tasks: [
      {
        stem: "I en klass med 25 elever är 10 flickor. Hur många procent är flickor?",
        names: ["Procent av ett tal", "Andel (del av helhet)", "Procentuell förändring", "Förändringsfaktor"],
        nameCorrect: 1,
        answers: ["40 %", "60 %", "250 %", "10 %"],
        answerCorrect: 0,
        calc: "10/25 = 40 %"
      },
      {
        stem: "Av 80 frågor klarade Anna 60. Hur stor andel klarade hon, som bråk?",
        names: ["Procent av ett tal", "Procentuell förändring", "Andel (del av helhet)", "Upprepad förändring"],
        nameCorrect: 2,
        answers: ["1/4", "3/4", "4/3", "3/5"],
        answerCorrect: 1,
        calc: "60/80 = 3/4"
      },
    ]
  },
  {
    id: "procent-av",
    name: "Procent av ett tal",
    formula: "p % av x = p/100 · x",
    area: "procent",
    why: "Procent betyder hundradelar: 15 % = 15/100.",
    headTip: "10 % = flytta kommat ett steg. 15 % = 10 % + 5 % (hälften av 10 %). 25 % = en fjärdedel.",
    paperSteps: ["Skriv p % som p/100.", "Skriv p/100 · x.", "Räkna."],
    tasks: [
      {
        stem: "Hur mycket är 15 % av 80?",
        names: ["Procent av ett tal", "Andel (del av helhet)", "Procentuell förändring", "Förändringsfaktor"],
        nameCorrect: 0,
        answers: ["1 200", "65", "95", "12"],
        answerCorrect: 3,
        calc: "15/100·80 = 12"
      },
      {
        stem: "En tröja kostar 400 kr. Hur många kronor är 25 % rabatt?",
        names: ["Andel (del av helhet)", "Procentuell förändring", "Förändringsfaktor", "Procent av ett tal"],
        nameCorrect: 3,
        answers: ["100 kr", "300 kr", "375 kr", "10 000 kr"],
        answerCorrect: 0,
        calc: "25/100·400 = 100 kr"
      },
    ]
  },
  {
    id: "procent-forandring",
    name: "Procentuell förändring",
    formula: "förändring = (ny − gammal) / gammal",
    area: "procent",
    why: "Skillnaden jämförs alltid med startvärdet.",
    headTip: "Skillnaden delat med STARTVÄRDET. Förkorta bråket och förläng till hundradelar.",
    paperSteps: ["Skriv gammalt och nytt värde.", "Skriv (ny − gammal) / gammal.", "Förkorta och gör om till procent."],
    tasks: [
      {
        stem: "Ett pris höjs från 200 kr till 250 kr. Hur många procent har priset ökat?",
        names: ["Andel (del av helhet)", "Procent av ett tal", "Procentuell förändring", "Förändringsfaktor"],
        nameCorrect: 2,
        answers: ["20 %", "25 %", "50 %", "125 %"],
        answerCorrect: 1,
        calc: "(250−200)/200 = 50/200 = 25 %"
      },
      {
        stem: "Antalet medlemmar sjönk från 50 till 40. Hur många procent är förändringen?",
        names: ["Procentuell förändring", "Andel (del av helhet)", "Procent av ett tal", "Förändringsfaktor"],
        nameCorrect: 0,
        answers: ["−25 %", "−10 %", "80 %", "−20 %"],
        answerCorrect: 3,
        calc: "(40−50)/50 = −0,2 = −20 %"
      },
    ]
  },
  {
    id: "forandringsfaktor",
    name: "Förändringsfaktor",
    formula: "ny = gammal · förändringsfaktor  (+20 % → 1,20 · −30 % → 0,70)",
    area: "procent",
    why: "Höjning 20 % → 1,20. Sänkning 30 % → 0,70.",
    headTip: "Höj 20 % → gånger 1,2. Sänk 30 % → gånger 0,7. Räkna 10 % först om det är enklare.",
    paperSteps: ["Bestäm faktorn: 1 + p/100 eller 1 − p/100.", "Skriv ny = gammal · faktor.", "Räkna."],
    tasks: [
      {
        stem: "En vara kostar 300 kr. Priset höjs med 20 %. Vad blir det nya priset?",
        names: ["Procent av ett tal", "Procentuell förändring", "Andel (del av helhet)", "Förändringsfaktor"],
        nameCorrect: 3,
        answers: ["360 kr", "320 kr", "60 kr", "306 kr"],
        answerCorrect: 0,
        calc: "300·1,2 = 360 kr"
      },
      {
        stem: "Priset 500 kr sänks med 30 %. Vad blir det nya priset?",
        names: ["Procent av ett tal", "Förändringsfaktor", "Procentuell förändring", "Andel (del av helhet)"],
        nameCorrect: 1,
        answers: ["150 kr", "350 kr", "470 kr", "650 kr"],
        answerCorrect: 1,
        calc: "500·0,7 = 350 kr"
      },
    ]
  },
  {
    id: "upprepad-forandring",
    name: "Upprepad förändring",
    formula: "slut = start · fⁿ  (f = förändringsfaktor, n = antal gånger)",
    area: "procent",
    why: "Samma faktor gång på gång: upphöjt i antalet gånger.",
    headTip: "Räkna ett steg i taget i stället för potens: 100 → 110 → 121.",
    paperSteps: ["Bestäm faktorn f.", "Skriv slut = start · fⁿ.", "Räkna ett steg i taget om n är litet."],
    tasks: [
      {
        stem: "100 kr ökar med 10 % per år i 2 år. Hur mycket är det efter 2 år?",
        names: ["Upprepad förändring", "Förändringsfaktor", "Procentuell förändring", "Procent av ett tal"],
        nameCorrect: 0,
        answers: ["120 kr", "110 kr", "200 kr", "121 kr"],
        answerCorrect: 3,
        calc: "100·1,1² = 121 kr"
      },
      {
        stem: "Ett värde på 200 halveras varje år i 3 år. Vad är värdet efter 3 år?",
        names: ["Förändringsfaktor", "Procentuell förändring", "Procent av ett tal", "Upprepad förändring"],
        nameCorrect: 3,
        answers: ["25", "100", "50", "0"],
        answerCorrect: 0,
        calc: "200·0,5³ = 200/8 = 25"
      },
    ]
  },
  {
    id: "medelvarde",
    name: "Medelvärde",
    formula: "medelvärde = summan / antalet",
    area: "statistik",
    why: "Fördela lika: summan delat med antalet.",
    headTip: "Hitta det tal alla ligger runt och se hur mycket över och under: 2, 3, 3, 4, 13 ligger runt 5.",
    paperSteps: ["Skriv alla tal och addera.", "Dela summan med antalet.", "Kontrollera att svaret ligger mellan minsta och största."],
    tasks: [
      {
        stem: "Vad är medelvärdet av 2, 3, 3, 4, 13?",
        names: ["Median", "Medelvärde", "Typvärde", "Variationsbredd"],
        nameCorrect: 1,
        answers: ["3", "5", "25", "11"],
        answerCorrect: 1,
        calc: "(2+3+3+4+13)/5 = 25/5 = 5"
      },
      {
        stem: "Anna har fått 4, 6 och 8 poäng. Vad måste hon få på fjärde provet för att medelvärdet ska bli 7?",
        names: ["Median", "Typvärde", "Medelvärde", "Variationsbredd"],
        nameCorrect: 2,
        answers: ["7", "28", "6", "10"],
        answerCorrect: 3,
        calc: "4·7 = 28, 28 − 18 = 10"
      },
    ]
  },
  {
    id: "median",
    name: "Median",
    formula: "median = mittersta värdet i storleksordning",
    area: "statistik",
    why: "Ställ i ordning och ta mitten. Jämnt antal: medelvärdet av de två i mitten.",
    headTip: "Stryk talen parvis från ytterkanterna tills ett (eller två) är kvar.",
    paperSteps: ["Ordna talen i storleksordning.", "Ta mittersta (eller medelvärdet av de två mittersta).", "Kontrollera antalet på varje sida."],
    tasks: [
      {
        stem: "Vad är medianen av 7, 2, 9, 4, 5?",
        names: ["Medelvärde", "Typvärde", "Variationsbredd", "Median"],
        nameCorrect: 3,
        answers: ["5", "9", "5,4", "7"],
        answerCorrect: 0,
        calc: "Ordna: 2, 4, 5, 7, 9. Mitten = 5"
      },
      {
        stem: "Vad är medianen av 1, 3, 4, 8, 9, 15?",
        names: ["Medelvärde", "Median", "Typvärde", "Variationsbredd"],
        nameCorrect: 1,
        answers: ["4", "6", "8", "3"],
        answerCorrect: 1,
        calc: "Mittersta: 4 och 8, (4+8)/2 = 6"
      },
    ]
  },
  {
    id: "typvarde",
    name: "Typvärde",
    formula: "typvärde = det värde som förekommer flest gånger",
    area: "statistik",
    why: "Det som förekommer oftast.",
    headTip: "Sätt ett streck per förekomst, eller leta bara efter talet som upprepas.",
    paperSteps: ["Skriv talen i ordning.", "Räkna hur många gånger varje tal förekommer.", "Välj det som förekommer flest gånger."],
    tasks: [
      {
        stem: "Skostorlekar i en grupp: 38, 40, 38, 41, 38, 40. Vad är typvärdet?",
        names: ["Median", "Medelvärde", "Typvärde", "Variationsbredd"],
        nameCorrect: 2,
        answers: ["40", "41", "39", "38"],
        answerCorrect: 3,
        calc: "38 förekommer 3 gånger, flest"
      },
      {
        stem: "Betyg: 3, 5, 4, 5, 2, 5, 4. Vilket är det vanligaste betyget?",
        names: ["Typvärde", "Median", "Medelvärde", "Variationsbredd"],
        nameCorrect: 0,
        answers: ["5", "4", "3", "28"],
        answerCorrect: 0,
        calc: "5 förekommer 3 gånger, flest"
      },
    ]
  },
  {
    id: "sannolikhet",
    name: "Sannolikhet (gynnsamma / möjliga)",
    formula: "P = antal gynnsamma / antal möjliga",
    area: "sannolikhet",
    why: "Hur många lyckas av alla lika möjliga utfall?",
    headTip: "Räkna gynnsamma och möjliga, skriv som bråk, förkorta. Kontrollera att svaret är mellan 0 och 1.",
    paperSteps: ["Räkna de gynnsamma utfallen.", "Räkna alla möjliga utfall.", "Skriv gynnsamma / möjliga och förkorta."],
    tasks: [
      {
        stem: "I en påse ligger 3 röda och 5 blå kulor. Hur stor är sannolikheten att dra en röd?",
        names: ["Sannolikhet för \"och\" (multiplicera)", "Sannolikhet (gynnsamma / möjliga)", "Komplementhändelse", "Andel (del av helhet)"],
        nameCorrect: 1,
        answers: ["3/5", "3/8", "5/8", "1/8"],
        answerCorrect: 1,
        calc: "3/(3+5) = 3/8"
      },
      {
        stem: "En tärning kastas. Hur stor är sannolikheten för ett jämnt tal?",
        names: ["Sannolikhet för \"och\" (multiplicera)", "Komplementhändelse", "Sannolikhet (gynnsamma / möjliga)", "Sannolikhet för \"eller\" (addera)"],
        nameCorrect: 2,
        answers: ["1/6", "1/3", "2/3", "1/2"],
        answerCorrect: 3,
        calc: "Jämna: 2, 4, 6 → 3/6 = 1/2"
      },
    ]
  },
  {
    id: "sannolikhet-och",
    name: "Sannolikhet för \"och\" (multiplicera)",
    formula: "P(A och B) = P(A) · P(B)",
    area: "sannolikhet",
    why: "Båda ska hända: gånger varandra. Det blir mindre.",
    headTip: "Multiplicera täljarna och nämnarna var för sig: 1/3 · 1/2 = 1/6.",
    paperSteps: ["Skriv varje sannolikhet som bråk.", "Skriv P(A) · P(B).", "Multiplicera täljare och nämnare."],
    tasks: [
      {
        stem: "Ett mynt kastas två gånger. Hur stor är sannolikheten för krona båda gångerna?",
        names: ["Sannolikhet för \"och\" (multiplicera)", "Sannolikhet för \"eller\" (addera)", "Sannolikhet (gynnsamma / möjliga)", "Komplementhändelse"],
        nameCorrect: 0,
        answers: ["1/4", "1/2", "1/1", "1/8"],
        answerCorrect: 0,
        calc: "1/2 · 1/2 = 1/4"
      },
      {
        stem: "Sannolikheten för regn är 1/3 i dag och 1/2 i morgon (oberoende). Hur stor är sannolikheten för regn båda dagarna?",
        names: ["Sannolikhet för \"eller\" (addera)", "Sannolikhet (gynnsamma / möjliga)", "Komplementhändelse", "Sannolikhet för \"och\" (multiplicera)"],
        nameCorrect: 3,
        answers: ["5/6", "1/6", "1/2", "2/3"],
        answerCorrect: 1,
        calc: "1/3 · 1/2 = 1/6"
      },
    ]
  },
  {
    id: "komplement",
    name: "Komplementhändelse",
    formula: "P(inte A) = 1 − P(A)",
    area: "sannolikhet",
    why: "Alla utfall tillsammans är 1.",
    headTip: "Dra från 1 som från 10: 1 − 0,3 = 0,7. Bråk: 1 − 1/8 = 7/8.",
    paperSteps: ["Skriv sannolikheten för händelsen.", "Skriv 1 − P(A).", "Räkna."],
    tasks: [
      {
        stem: "Sannolikheten att vinna är 0,3. Hur stor är sannolikheten att inte vinna?",
        names: ["Sannolikhet (gynnsamma / möjliga)", "Sannolikhet för \"och\" (multiplicera)", "Komplementhändelse", "Sannolikhet för \"eller\" (addera)"],
        nameCorrect: 2,
        answers: ["0,3", "0,03", "1,3", "0,7"],
        answerCorrect: 3,
        calc: "1 − 0,3 = 0,7"
      },
      {
        stem: "Sannolikheten att tåget är försenat är 1/8. Hur stor är sannolikheten att det inte är försenat?",
        names: ["Komplementhändelse", "Sannolikhet (gynnsamma / möjliga)", "Sannolikhet för \"och\" (multiplicera)", "Sannolikhet för \"eller\" (addera)"],
        nameCorrect: 0,
        answers: ["7/8", "1/8", "8/7", "9/8"],
        answerCorrect: 0,
        calc: "1 − 1/8 = 7/8"
      },
    ]
  },
  {
    id: "linje-ekvation",
    name: "Räta linjens ekvation (y = kx + m)",
    formula: "y = k · x + m",
    area: "rata-linjen",
    why: "k = ökning per steg i x. m = startvärdet när x = 0.",
    headTip: "Sätt in x i k · x först, lägg till m sist.",
    paperSteps: ["Skriv ner k och m.", "Skriv y = k · x + m.", "Sätt in x och räkna."],
    tasks: [
      {
        stem: "En linje har k = 2 och m = 3. Vad är y när x = 4?",
        names: ["Räta linjens lutning (k)", "Mittpunkt mellan två punkter", "Avståndet mellan två punkter", "Räta linjens ekvation (y = kx + m)"],
        nameCorrect: 3,
        answers: ["20", "11", "24", "14"],
        answerCorrect: 1,
        calc: "y = 2·4 + 3 = 11"
      },
      {
        stem: "En taxi tar 40 kr i startavgift och 15 kr per km. Vad kostar 6 km?",
        names: ["Räta linjens lutning (k)", "Räta linjens ekvation (y = kx + m)", "Mittpunkt mellan två punkter", "Avståndet mellan två punkter"],
        nameCorrect: 1,
        answers: ["330 kr", "55 kr", "600 kr", "130 kr"],
        answerCorrect: 3,
        calc: "y = 15·6 + 40 = 130 kr"
      },
    ]
  },
  {
    id: "linje-lutning",
    name: "Räta linjens lutning (k)",
    formula: "k = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)",
    area: "rata-linjen",
    why: "Hur mycket y ändras när x ökar 1: höjd delat med längd.",
    headTip: "Hur mycket upp (Δy) per steg åt sidan (Δx)? Räkna y-skillnaden först, x-skillnaden sist.",
    paperSteps: ["Skriv de två punkterna.", "Skriv k = (y₂ − y₁) / (x₂ − x₁).", "Sätt in (samma ordning uppe och nere) och räkna."],
    tasks: [
      {
        stem: "En linje går genom (1, 3) och (3, 7). Vilken lutning k har den?",
        names: ["Räta linjens lutning (k)", "Räta linjens ekvation (y = kx + m)", "Mittpunkt mellan två punkter", "Avståndet mellan två punkter"],
        nameCorrect: 0,
        answers: ["2", "0,5", "4", "−2"],
        answerCorrect: 0,
        calc: "k = (7−3)/(3−1) = 4/2 = 2"
      },
      {
        stem: "En linje går genom (0, 5) och (4, 1). Vilken lutning k har den?",
        names: ["Räta linjens ekvation (y = kx + m)", "Mittpunkt mellan två punkter", "Avståndet mellan två punkter", "Räta linjens lutning (k)"],
        nameCorrect: 3,
        answers: ["1", "−1", "−4", "4"],
        answerCorrect: 1,
        calc: "k = (1−5)/(4−0) = −4/4 = −1"
      },
    ]
  },
  {
    id: "mittpunkt",
    name: "Mittpunkt mellan två punkter",
    formula: "mittpunkt = ((x₁ + x₂)/2 , (y₁ + y₂)/2)",
    area: "rata-linjen",
    why: "Medelvärdet av x-värdena och av y-värdena.",
    headTip: "Lägg ihop x-värdena och halvera, gör sedan samma med y-värdena.",
    paperSteps: ["Skriv de två punkterna.", "Skriv ((x₁ + x₂)/2 , (y₁ + y₂)/2).", "Sätt in och räkna x och y var för sig."],
    tasks: [
      {
        stem: "Vilken punkt ligger mitt emellan (2, 4) och (8, 10)?",
        names: ["Avståndet mellan två punkter", "Mittpunkt mellan två punkter", "Räta linjens lutning (k)", "Räta linjens ekvation (y = kx + m)"],
        nameCorrect: 1,
        answers: ["(6, 6)", "(10, 14)", "(3, 3)", "(5, 7)"],
        answerCorrect: 3,
        calc: "((2+8)/2, (4+10)/2) = (5, 7)"
      },
      {
        stem: "Vilken punkt ligger mitt emellan (−2, 6) och (4, −2)?",
        names: ["Avståndet mellan två punkter", "Räta linjens lutning (k)", "Mittpunkt mellan två punkter", "Räta linjens ekvation (y = kx + m)"],
        nameCorrect: 2,
        answers: ["(1, 2)", "(6, −8)", "(2, 4)", "(3, −4)"],
        answerCorrect: 0,
        calc: "((−2+4)/2, (6+(−2))/2) = (1, 2)"
      },
    ]
  },
  {
    id: "avstand",
    name: "Avståndet mellan två punkter",
    formula: "d = √((x₂ − x₁)² + (y₂ − y₁)²)",
    area: "rata-linjen",
    why: "Pythagoras på skillnaden i x och skillnaden i y.",
    headTip: "Det är Pythagoras: ofta 3-4-5 eller 6-8-10 om siffrorna är snälla.",
    paperSteps: ["Räkna Δx = x₂ − x₁ och Δy = y₂ − y₁.", "Skriv d = √(Δx² + Δy²).", "Sätt in och dra roten."],
    tasks: [
      {
        stem: "Hur långt är det mellan punkterna (0, 0) och (6, 8)?",
        names: ["Mittpunkt mellan två punkter", "Räta linjens lutning (k)", "Räta linjens ekvation (y = kx + m)", "Avståndet mellan två punkter"],
        nameCorrect: 3,
        answers: ["14", "10", "100", "2"],
        answerCorrect: 1,
        calc: "√(6²+8²) = √100 = 10"
      },
      {
        stem: "Hur långt är det mellan punkterna (1, 2) och (4, 6)?",
        names: ["Mittpunkt mellan två punkter", "Avståndet mellan två punkter", "Räta linjens lutning (k)", "Räta linjens ekvation (y = kx + m)"],
        nameCorrect: 1,
        answers: ["7", "25", "12", "5"],
        answerCorrect: 3,
        calc: "√(3²+4²) = √25 = 5"
      },
    ]
  },
  {
    id: "potens-mult",
    name: "Multiplicera potenser (samma bas)",
    formula: "aᵐ · aⁿ = aᵐ⁺ⁿ",
    area: "potenser",
    why: "Samma bas: exponenterna adderas.",
    headTip: "Samma bas: addera exponenterna. Basen ändras inte.",
    paperSteps: ["Kontrollera att basen är samma.", "Skriv aᵐ · aⁿ = aᵐ⁺ⁿ.", "Addera exponenterna."],
    tasks: [
      {
        stem: "Förenkla 3² · 3⁴.",
        names: ["Potens av en potens", "Dividera potenser (samma bas)", "Multiplicera potenser (samma bas)", "Potens med exponent noll"],
        nameCorrect: 2,
        answers: ["3⁶", "3⁸", "9⁶", "3²"],
        answerCorrect: 0,
        calc: "3^(2+4) = 3⁶"
      },
      {
        stem: "Förenkla x² · x⁵.",
        names: ["Multiplicera potenser (samma bas)", "Potens av en potens", "Dividera potenser (samma bas)", "Negativ exponent"],
        nameCorrect: 0,
        answers: ["x¹⁰", "x⁷", "x³", "2x⁷"],
        answerCorrect: 1,
        calc: "x^(2+5) = x⁷"
      },
    ]
  },
  {
    id: "potens-potens",
    name: "Potens av en potens",
    formula: "(aᵐ)ⁿ = aᵐ·ⁿ",
    area: "potenser",
    why: "Potens av en potens: exponenterna multipliceras.",
    headTip: "Multiplicera exponenterna: 3 · 2 = 6.",
    paperSteps: ["Skriv basen och de två exponenterna.", "Skriv (aᵐ)ⁿ = aᵐ·ⁿ.", "Multiplicera exponenterna."],
    tasks: [
      {
        stem: "Förenkla (2³)².",
        names: ["Multiplicera potenser (samma bas)", "Potens av en potens", "Dividera potenser (samma bas)", "Negativ exponent"],
        nameCorrect: 1,
        answers: ["2⁵", "2⁹", "2¹", "2⁶"],
        answerCorrect: 3,
        calc: "2^(3·2) = 2⁶"
      },
      {
        stem: "Förenkla (x⁴)³.",
        names: ["Multiplicera potenser (samma bas)", "Dividera potenser (samma bas)", "Potens av en potens", "Negativ exponent"],
        nameCorrect: 2,
        answers: ["x¹²", "x⁷", "x⁶⁴", "x¹"],
        answerCorrect: 0,
        calc: "x^(4·3) = x¹²"
      },
    ]
  },
  {
    id: "potens-div",
    name: "Dividera potenser (samma bas)",
    formula: "aᵐ / aⁿ = aᵐ⁻ⁿ",
    area: "potenser",
    why: "Samma bas vid division: exponenterna subtraheras.",
    headTip: "Samma bas: subtrahera exponenterna, översta minus understa.",
    paperSteps: ["Kontrollera att basen är samma.", "Skriv aᵐ / aⁿ = aᵐ⁻ⁿ.", "Subtrahera exponenterna."],
    tasks: [
      {
        stem: "Förenkla 5⁶ / 5².",
        names: ["Dividera potenser (samma bas)", "Multiplicera potenser (samma bas)", "Potens av en potens", "Negativ exponent"],
        nameCorrect: 0,
        answers: ["5⁸", "5⁴", "5³", "5¹²"],
        answerCorrect: 1,
        calc: "5^(6−2) = 5⁴"
      },
      {
        stem: "Förenkla x⁹ / x³.",
        names: ["Multiplicera potenser (samma bas)", "Potens av en potens", "Potens med exponent noll", "Dividera potenser (samma bas)"],
        nameCorrect: 3,
        answers: ["x¹²", "x³", "x²⁷", "x⁶"],
        answerCorrect: 3,
        calc: "x^(9−3) = x⁶"
      },
    ]
  },
  {
    id: "potens-noll",
    name: "Potens med exponent noll",
    formula: "a⁰ = 1  (a ≠ 0)",
    area: "potenser",
    why: "aⁿ / aⁿ = 1, och samtidigt aⁿ⁻ⁿ = a⁰.",
    headTip: "Allt upphöjt till 0 är 1 (utom 0). 5⁰ + 3⁰ = 1 + 1.",
    paperSteps: ["Kontrollera att basen inte är 0.", "Skriv a⁰ = 1.", "Räkna vidare med 1."],
    tasks: [
      {
        stem: "Vad är 7⁰?",
        names: ["Negativ exponent", "Potens av en potens", "Potens med exponent noll", "Multiplicera potenser (samma bas)"],
        nameCorrect: 2,
        answers: ["1", "0", "7", "70"],
        answerCorrect: 0,
        calc: "a⁰ = 1, alltså 7⁰ = 1"
      },
      {
        stem: "Vad är 5⁰ + 3⁰?",
        names: ["Potens med exponent noll", "Negativ exponent", "Potens av en potens", "Multiplicera potenser (samma bas)"],
        nameCorrect: 0,
        answers: ["0", "2", "8", "1"],
        answerCorrect: 1,
        calc: "1 + 1 = 2"
      },
    ]
  },
  {
    id: "potens-negativ",
    name: "Negativ exponent",
    formula: "a⁻ⁿ = 1 / aⁿ",
    area: "potenser",
    why: "Negativ exponent betyder 1 delat med potensen, inte ett negativt tal.",
    headTip: "Vänd potensen: 2⁻³ = 1/2³. Minustecknet i exponenten ger inget negativt tal.",
    paperSteps: ["Skriv basen och exponenten utan minus.", "Skriv a⁻ⁿ = 1 / aⁿ.", "Räkna potensen och ta 1 delat med den."],
    tasks: [
      {
        stem: "Vad är 2⁻³?",
        names: ["Potens med exponent noll", "Dividera potenser (samma bas)", "Multiplicera potenser (samma bas)", "Negativ exponent"],
        nameCorrect: 3,
        answers: ["−8", "−6", "1/6", "1/8"],
        answerCorrect: 3,
        calc: "2⁻³ = 1/2³ = 1/8"
      },
      {
        stem: "Skriv 10⁻² som decimaltal.",
        names: ["Potens med exponent noll", "Negativ exponent", "Dividera potenser (samma bas)", "Multiplicera potenser (samma bas)"],
        nameCorrect: 1,
        answers: ["0,01", "−100", "−20", "0,1"],
        answerCorrect: 0,
        calc: "10⁻² = 1/10² = 1/100 = 0,01"
      },
    ]
  },
  {
    id: "kvadrering-plus",
    name: "Kvadreringsregeln (a + b)²",
    formula: "(a + b)² = a² + 2ab + b²",
    area: "algebra",
    why: "Glöm inte mittentermen 2ab.",
    headTip: "Kvadrera första, kvadrera sista, och mitten är dubbla produkten. 103² = 10 000 + 600 + 9.",
    paperSteps: ["Identifiera a och b.", "Skriv a² + 2ab + b².", "Sätt in och förenkla."],
    tasks: [
      {
        stem: "Förenkla (x + 3)².",
        names: ["Kvadreringsregeln (a + b)²", "Kvadreringsregeln (a − b)²", "Konjugatregeln", "Distributiva lagen"],
        nameCorrect: 0,
        answers: ["x² + 9", "x² + 6x + 9", "x² + 3x + 9", "x² + 6x + 3"],
        answerCorrect: 1,
        calc: "(x+3)² = x² + 2·x·3 + 3² = x² + 6x + 9"
      },
      {
        stem: "Räkna 103² genom att skriva (100 + 3)².",
        names: ["Kvadreringsregeln (a − b)²", "Konjugatregeln", "Distributiva lagen", "Kvadreringsregeln (a + b)²"],
        nameCorrect: 3,
        answers: ["10 009", "10 309", "9 409", "10 609"],
        answerCorrect: 3,
        calc: "100² + 2·100·3 + 3² = 10 000 + 600 + 9 = 10 609"
      },
    ]
  },
  {
    id: "kvadrering-minus",
    name: "Kvadreringsregeln (a − b)²",
    formula: "(a − b)² = a² − 2ab + b²",
    area: "algebra",
    why: "Mittentermen blir minus, men sista termen är +b².",
    headTip: "Som plus-regeln, men mitten får minus. 98² = 10 000 − 400 + 4.",
    paperSteps: ["Identifiera a och b.", "Skriv a² − 2ab + b².", "Sätt in och förenkla."],
    tasks: [
      {
        stem: "Förenkla (x − 4)².",
        names: ["Kvadreringsregeln (a + b)²", "Kvadreringsregeln (a − b)²", "Konjugatregeln", "Distributiva lagen"],
        nameCorrect: 1,
        answers: ["x² − 8x + 16", "x² − 16", "x² + 8x + 16", "x² − 8x − 16"],
        answerCorrect: 0,
        calc: "(x−4)² = x² − 2·x·4 + 4² = x² − 8x + 16"
      },
      {
        stem: "Räkna 98² genom att skriva (100 − 2)².",
        names: ["Kvadreringsregeln (a + b)²", "Konjugatregeln", "Kvadreringsregeln (a − b)²", "Distributiva lagen"],
        nameCorrect: 2,
        answers: ["9 996", "9 604", "9 800", "10 004"],
        answerCorrect: 1,
        calc: "100² − 2·100·2 + 2² = 10 000 − 400 + 4 = 9 604"
      },
    ]
  },
  {
    id: "konjugat",
    name: "Konjugatregeln",
    formula: "(a + b)(a − b) = a² − b²",
    area: "algebra",
    why: "Mittentermerna tar ut varandra: kvar blir a² − b².",
    headTip: "Mitt emellan: 21 · 19 = 20² − 1². Gör produkter av tal som ligger lika långt från en jämn mitt.",
    paperSteps: ["Kontrollera att parenteserna bara skiljer på + och −.", "Skriv a² − b².", "Sätt in och förenkla."],
    tasks: [
      {
        stem: "Förenkla (x + 5)(x − 5).",
        names: ["Kvadreringsregeln (a + b)²", "Kvadreringsregeln (a − b)²", "Distributiva lagen", "Konjugatregeln"],
        nameCorrect: 3,
        answers: ["x² + 25", "x² − 10x + 25", "x² − 10", "x² − 25"],
        answerCorrect: 3,
        calc: "(x+5)(x−5) = x² − 5² = x² − 25"
      },
      {
        stem: "Räkna 21 · 19 genom att skriva (20 + 1)(20 − 1).",
        names: ["Kvadreringsregeln (a + b)²", "Konjugatregeln", "Kvadreringsregeln (a − b)²", "Distributiva lagen"],
        nameCorrect: 1,
        answers: ["399", "401", "400", "361"],
        answerCorrect: 0,
        calc: "20² − 1² = 400 − 1 = 399"
      },
    ]
  },
  {
    id: "forlanga-forkorta",
    name: "Förlänga och förkorta bråk",
    formula: "a/b = (a·k)/(b·k)",
    area: "brak",
    why: "Gånger eller delat med samma tal uppe och nere ändrar inte värdet.",
    headTip: "Förkorta med största gemensamma delare: 18 och 24 delas med 6.",
    paperSteps: ["Skriv bråket.", "Hitta talet du ska gångra eller dela med (uppe och nere).", "Gör samma sak på båda."],
    tasks: [
      {
        stem: "Vilket bråk är lika med 3/4 och har nämnaren 12?",
        names: ["Dividera med bråk", "Multiplicera bråk", "Förlänga och förkorta bråk", "Addera bråk"],
        nameCorrect: 2,
        answers: ["3/12", "9/12", "6/12", "7/12"],
        answerCorrect: 1,
        calc: "3/4 = (3·3)/(4·3) = 9/12"
      },
      {
        stem: "Förkorta 18/24 så långt det går.",
        names: ["Förlänga och förkorta bråk", "Dividera med bråk", "Multiplicera bråk", "Addera bråk"],
        nameCorrect: 0,
        answers: ["2/3", "1/4", "4/3", "3/4"],
        answerCorrect: 3,
        calc: "18/24 = (18/6)/(24/6) = 3/4"
      },
    ]
  },
  {
    id: "dividera-brak",
    name: "Dividera med bråk",
    formula: "a/b ÷ c/d = a/b · d/c",
    area: "brak",
    why: "Dividera med ett bråk = gånger med bråket upp och ned.",
    headTip: "Vänd på det andra bråket och multiplicera. ÷ 1/4 är samma som · 4.",
    paperSteps: ["Skriv bråken.", "Byt ÷ mot · och vänd på det andra bråket.", "Multiplicera och förkorta."],
    tasks: [
      {
        stem: "Beräkna 1/2 ÷ 1/4.",
        names: ["Multiplicera bråk", "Dividera med bråk", "Förlänga och förkorta bråk", "Addera bråk"],
        nameCorrect: 1,
        answers: ["2", "1/8", "0,5", "4"],
        answerCorrect: 0,
        calc: "1/2 · 4/1 = 4/2 = 2"
      },
      {
        stem: "Hur många glas på 1/3 liter går det på 2 liter?",
        names: ["Multiplicera bråk", "Förlänga och förkorta bråk", "Dividera med bråk", "Addera bråk"],
        nameCorrect: 2,
        answers: ["2/3", "6", "3/2", "1/6"],
        answerCorrect: 1,
        calc: "2 ÷ 1/3 = 2 · 3 = 6"
      },
    ]
  },
  {
    id: "sträcka",
    name: "Sträcka = hastighet · tid",
    formula: "s = v · t   (v = s / t, t = s / v)",
    area: "hastighet",
    why: "Sträcka = fart gånger tid. Kolla att tiden är i timmar om farten är km/h.",
    headTip: "Gör om tiden till timmar först: 90 min = 1,5 h. Räkna sedan fart · tid.",
    paperSteps: ["Skriv fart och tid.", "Gör om så att enheterna stämmer (km/h med timmar).", "Skriv s = v · t, sätt in och räkna."],
    tasks: [
      {
        stem: "En cyklist håller 15 km/h i 2 timmar. Hur långt kommer hen?",
        names: ["Sträcka = hastighet · tid", "Medelhastighet", "Omvandla km/h ↔ m/s", "Andel (del av helhet)"],
        nameCorrect: 0,
        answers: ["7,5 km", "17 km", "60 km", "30 km"],
        answerCorrect: 3,
        calc: "s = 15·2 = 30 km"
      },
      {
        stem: "Ett tåg går 80 km/h i 90 minuter. Hur långt kommer det?",
        names: ["Medelhastighet", "Omvandla km/h ↔ m/s", "Andel (del av helhet)", "Sträcka = hastighet · tid"],
        nameCorrect: 3,
        answers: ["120 km", "7 200 km", "170 km", "80 km"],
        answerCorrect: 0,
        calc: "90 min = 1,5 h, s = 80·1,5 = 120 km"
      },
    ]
  },
  {
    id: "medelhastighet",
    name: "Medelhastighet",
    formula: "medelhastighet = total sträcka / total tid",
    area: "hastighet",
    why: "Total sträcka delat med total tid, inte medelvärdet av farterna.",
    headTip: "Räkna ut hela sträckan och hela tiden först, dela sedan.",
    paperSteps: ["Räkna sträckan och tiden för varje del.", "Addera sträckorna och tiderna.", "Skriv total sträcka / total tid."],
    tasks: [
      {
        stem: "Karin cyklar 60 km i 30 km/h och sedan 60 km i 60 km/h. Vad är medelhastigheten för hela turen?",
        names: ["Sträcka = hastighet · tid", "Medelvärde", "Medelhastighet", "Omvandla km/h ↔ m/s"],
        nameCorrect: 2,
        answers: ["45 km/h", "40 km/h", "90 km/h", "120 km/h"],
        answerCorrect: 1,
        calc: "120 km / (2 h + 1 h) = 120/3 = 40 km/h"
      },
      {
        stem: "Man går 6 km i 3 km/h och sedan 6 km i 6 km/h. Vad är medelhastigheten?",
        names: ["Medelhastighet", "Sträcka = hastighet · tid", "Medelvärde", "Omvandla km/h ↔ m/s"],
        nameCorrect: 0,
        answers: ["4,5 km/h", "9 km/h", "12 km/h", "4 km/h"],
        answerCorrect: 3,
        calc: "12 km / (2 h + 1 h) = 12/3 = 4 km/h"
      },
    ]
  },
  {
    id: "kmh-ms",
    name: "Omvandla km/h ↔ m/s",
    formula: "km/h ÷ 3,6 = m/s   ·   m/s · 3,6 = km/h",
    area: "hastighet",
    why: "1 m/s är 3 600 m per timme, alltså 3,6 km/h.",
    headTip: "Ungefär: m/s · 3,6. 10 m/s = 36 km/h. Åt andra hållet: 36 km/h = 10 m/s.",
    paperSteps: ["Bestäm åt vilket håll du omvandlar.", "km/h → m/s: dela med 3,6. m/s → km/h: gånger 3,6.", "Räkna."],
    tasks: [
      {
        stem: "Hur många m/s är 36 km/h?",
        names: ["Sträcka = hastighet · tid", "Omvandla cm² ↔ m²", "Omvandla liter ↔ dm³", "Omvandla km/h ↔ m/s"],
        nameCorrect: 3,
        answers: ["10 m/s", "129,6 m/s", "0,6 m/s", "1 m/s"],
        answerCorrect: 0,
        calc: "36 km/h = 36/3,6 = 10 m/s"
      },
      {
        stem: "Hur många km/h är 10 m/s?",
        names: ["Sträcka = hastighet · tid", "Omvandla km/h ↔ m/s", "Omvandla cm² ↔ m²", "Omvandla liter ↔ dm³"],
        nameCorrect: 1,
        answers: ["3,6 km/h", "36 km/h", "360 km/h", "600 km/h"],
        answerCorrect: 1,
        calc: "10 m/s = 10·3,6 = 36 km/h"
      },
    ]
  },
  {
    id: "cm2-m2",
    name: "Omvandla cm² ↔ m²",
    formula: "1 m² = 10 000 cm²  (100 · 100)",
    area: "geometri",
    why: "1 m = 100 cm, så en kvadratmeter är 100 · 100 kvadratcentimeter.",
    headTip: "Två gånger 100: lägg på fyra nollor när du går från m² till cm².",
    paperSteps: ["Skriv omvandlingen 1 m² = 10 000 cm².", "m² → cm²: gånger 10 000. cm² → m²: dela med 10 000.", "Räkna."],
    tasks: [
      {
        stem: "En yta är 3 m². Hur många cm² är det?",
        names: ["Omvandla cm² ↔ m²", "Omvandla cm ↔ m", "Omvandla liter ↔ dm³", "Omvandla km/h ↔ m/s"],
        nameCorrect: 0,
        answers: ["300 cm²", "3 000 cm²", "300 000 cm²", "30 000 cm²"],
        answerCorrect: 3,
        calc: "1 m² = 100·100 = 10 000 cm², 3·10 000 = 30 000 cm²"
      },
      {
        stem: "Hur många m² är 50 000 cm²?",
        names: ["Omvandla cm ↔ m", "Omvandla liter ↔ dm³", "Omvandla km/h ↔ m/s", "Omvandla cm² ↔ m²"],
        nameCorrect: 3,
        answers: ["5 m²", "500 m²", "50 m²", "0,5 m²"],
        answerCorrect: 0,
        calc: "50 000 / 10 000 = 5 m²"
      },
    ]
  },
  {
    id: "liter-dm3",
    name: "Omvandla liter ↔ dm³",
    formula: "1 liter = 1 dm³ = 1 000 cm³",
    area: "geometri",
    why: "En kubikdecimeter rymmer exakt en liter.",
    headTip: "Liter och dm³ är samma sak. Lägg på tre nollor till cm³.",
    paperSteps: ["Skriv 1 liter = 1 dm³ = 1 000 cm³.", "Räkna om till rätt enhet.", "Räkna."],
    tasks: [
      {
        stem: "En kub har sidan 2 dm. Hur många liter rymmer den?",
        names: ["Omvandla cm² ↔ m²", "Omvandla liter ↔ dm³", "Omvandla km/h ↔ m/s", "Volymen av ett rätblock"],
        nameCorrect: 1,
        answers: ["4 liter", "8 liter", "6 liter", "8 000 liter"],
        answerCorrect: 1,
        calc: "2³ = 8 dm³ = 8 liter"
      },
      {
        stem: "Hur många cm³ är 2,5 liter?",
        names: ["Omvandla cm² ↔ m²", "Omvandla km/h ↔ m/s", "Omvandla liter ↔ dm³", "Volymen av ett rätblock"],
        nameCorrect: 2,
        answers: ["25 cm³", "250 cm³", "25 000 cm³", "2 500 cm³"],
        answerCorrect: 3,
        calc: "1 liter = 1 dm³ = 1 000 cm³, 2,5·1 000 = 2 500 cm³"
      },
    ]
  },];

// ── Successive relearning ──

/** Klar när formeln klarats på första försöket i så här många pass på olika dagar. */
export const HP_FORMULA_GOAL = 3;
/** Högst så här många kort per pass (förfallna repetitioner + nya). */
export const HP_FORMULA_PASS_MAX = 10;
/** Högst så här många nya formler per dag. */
export const HP_FORMULA_NEW_PER_DAY = 5;
/** Grön i "Är jag redo?" när minst så här stor andel är klar (eller på 2 av 3). */
export const HP_FORMULA_GREEN_SHARE = 0.8;

export interface HpFormulaCardState {
  /** Datum då formeln lärdes in. */
  introduced: string;
  /** Antal olika dagar den klarats på första försöket. */
  clean: number;
  /** Senaste dag den räknades som klarad. */
  lastClean: string;
  /** Tidigast när den kommer tillbaka. */
  due: string;
}

export interface HpFormulaState {
  cards: Record<string, HpFormulaCardState>;
  /** Avslutade pass (ISO). */
  passes: { completedAt: string }[];
}

export const EMPTY_HP_FORMULA_STATE: HpFormulaState = { cards: {}, passes: [] };

export function isFormulaDone(card: HpFormulaCardState | undefined): boolean {
  return !!card && card.clean >= HP_FORMULA_GOAL;
}

/** Förfallna repetitioner: inlärda, ej klara, due <= i dag. Äldst förfallna först, sedan de med minst framsteg. */
export function dueFormulaIds(formulas: HpFormula[], state: HpFormulaState, today: string): string[] {
  return formulas
    .map((f) => ({ id: f.id, card: state.cards[f.id] }))
    .filter((x) => x.card && !isFormulaDone(x.card) && x.card.due <= today)
    .sort((a, b) => a.card.due.localeCompare(b.card.due) || a.card.clean - b.card.clean)
    .map((x) => x.id);
}

/** Nya formler att lära in i dag: ej inlärda, i katalogens ordning, högst 5 per dag totalt. */
export function newFormulaIds(formulas: HpFormula[], state: HpFormulaState, today: string): string[] {
  const learnedToday = Object.values(state.cards).filter((c) => c.introduced === today).length;
  const room = Math.max(0, HP_FORMULA_NEW_PER_DAY - learnedToday);
  return formulas.filter((f) => !state.cards[f.id]).slice(0, room).map((f) => f.id);
}

/** Dagens pass: förfallna först (flashcards), sedan nya (Lär in + snabbtest). Högst 10 kort. */
export function planFormulaPass(formulas: HpFormula[], state: HpFormulaState, today: string): { due: string[]; learn: string[] } {
  const learn = newFormulaIds(formulas, state, today);
  const due = dueFormulaIds(formulas, state, today).slice(0, Math.max(0, HP_FORMULA_PASS_MAX - learn.length));
  return { due, learn };
}

/** Lärs in: markeras som inlärd i dag och kommer tillbaka i morgon. */
export function introduceFormulas(state: HpFormulaState, ids: string[], today: string): HpFormulaState {
  const cards = { ...state.cards };
  for (const id of ids) {
    if (!cards[id]) cards[id] = { introduced: today, clean: 0, lastClean: "", due: addDays(today, 1) };
  }
  return { ...state, cards };
}

/** Utfall på första försöket i ett pass. Klarad = +1 (högst en gång per dag) och tillbaka tidigast i morgon; missad = tillbaka i dag. */
export function recordFirstTry(state: HpFormulaState, id: string, clean: boolean, today: string): HpFormulaState {
  const prev = state.cards[id] ?? { introduced: today, clean: 0, lastClean: "", due: today };
  let next: HpFormulaCardState;
  if (clean) {
    const counts = prev.lastClean !== today;
    next = { ...prev, clean: prev.clean + (counts ? 1 : 0), lastClean: today, due: addDays(today, 1) };
  } else {
    next = { ...prev, due: today };
  }
  return { ...state, cards: { ...state.cards, [id]: next } };
}

export function recordFormulaPass(state: HpFormulaState, completedAtIso: string): HpFormulaState {
  return { ...state, passes: [...state.passes, { completedAt: completedAtIso }].slice(-60) };
}

export interface HpFormulaProgress {
  total: number;
  /** Klara: klarade på första försöket i 3 pass på olika dagar. */
  done: number;
  /** Inlärda (påbörjade). */
  started: number;
  /** Minst 2 av 3. */
  almost: number;
  left: number;
}

export function formulaProgress(formulas: HpFormula[], state: HpFormulaState): HpFormulaProgress {
  let done = 0;
  let started = 0;
  let almost = 0;
  for (const f of formulas) {
    const c = state.cards[f.id];
    if (!c) continue;
    started++;
    if (c.clean >= HP_FORMULA_GOAL) done++;
    if (c.clean >= HP_FORMULA_GOAL - 1) almost++;
  }
  return { total: formulas.length, done, started, almost, left: formulas.length - done };
}

export function findFormula(id: string): HpFormula | undefined {
  return HP_FORMULAS.find((f) => f.id === id);
}

function shuffled<T>(list: T[], rand: () => number): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Uppgift 0 eller 1. Avoid = den som visades senast, så att en återkommande formel får den andra uppgiften. */
export function pickFormulaTaskIndex(avoid: number | null, rand: () => number = Math.random): number {
  return avoid === null ? (rand() < 0.5 ? 0 : 1) : avoid === 0 ? 1 : 0;
}

/** Alternativen blandade, med rätt index omräknat. */
export function shuffleOptions(options: string[], correct: number, rand: () => number = Math.random): { options: string[]; correct: number } {
  const order = shuffled(
    options.map((_, i) => i),
    rand
  );
  return { options: order.map((i) => options[i]), correct: order.indexOf(correct) };
}
