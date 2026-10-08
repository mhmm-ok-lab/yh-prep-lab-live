import { HP_TWINS_XYZ } from "./hp-twins-xyz";
import { HP_TWINS_KVA } from "./hp-twins-kva";
import { HP_TWINS_NOG } from "./hp-twins-nog";
import { HP_TWINS_DTK } from "./hp-twins-dtk";
import { HP_TWINS_FIG } from "./hp-twins-fig";
import { HP_TWINS_GEO } from "./hp-twins-geo";

// HP "tvillinguppgifter": egna uppgifter i högskoleprovets kvantitativa stil,
// inspirerade av riktiga uppgifter ur UHR:s provhäften (studera.nu). Samma
// uppgiftstyp, matematiska idé, upplägg och ungefärliga svårighetsgrad som
// originalet — men egen formulering, nya siffror/storheter och egna
// svarsalternativ. Inga UHR-texter, siffror eller alternativ återges.
//
// Källa (facit och provhäften i PDF, hämtade och extraherade med curl + pypdf):
// https://www.studera.nu/hogskoleprov/om/forbereda/tidigare/

export type HpDelprov = "XYZ" | "KVA" | "NOG" | "DTK";

export interface HpTwin {
  id: string;
  delprov: HpDelprov;
  area: string;
  prompt: string;
  table?: string;
  /** Inline-SVG-figur (diagram, geometrisk figur). Ritas ovanför frågan i full bredd. */
  figure?: string;
  options: string[];
  correct: number;
  solution: string;
  /** Ledtråd som visas via ?-knappen FÖRE svar: metod/första steg, aldrig svaret. */
  hint?: string;
  twinOf: {
    prov: string;
    provpass: number;
    uppgift: number;
    url: string;
  };
}

const KVA_OPTIONS = [
  "I är större än II",
  "II är större än I",
  "I är lika med II",
  "Informationen är otillräcklig"
];

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

const HP_TWINS_BASE: HpTwin[] = [
  // ===================== XYZ — Matematisk problemlösning (12) =====================
  {
    id: "xyz-01",
    hint: "Räkna ut den enkla parentesen först, och multiplicera sedan in talet med båda termerna i den andra parentesen.",
    delprov: "XYZ",
    area: "algebra",
    prompt: "Vilket svarsalternativ motsvarar uttrycket (7 - 4)(3x - 2y)?",
    options: ["9x - 6y", "3x - 2y", "21x - 8y", "9x + 6y"],
    correct: 0,
    solution:
      "(7 - 4) = 3. Multiplicera in i parentesen: 3 · 3x - 3 · 2y = 9x - 6y.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 1, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-02",
    hint: "Samla alla x-termer på ena sidan och alla vanliga tal på den andra. Räkna noga med decimaler och minustecken.",
    delprov: "XYZ",
    area: "ekvationer",
    prompt: "0,5x + 0,3 = 0,7x + 2,3. Vilket värde har x?",
    options: ["-8", "10", "-10", "8"],
    correct: 2,
    solution:
      "Samla x-termerna: 0,3 - 2,3 = 0,7x - 0,5x, alltså -2 = 0,2x, vilket ger x = -10.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 3, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-03",
    hint: "Räkna ut hur många svarta kulor som finns i varje burk, och hur många kulor det är totalt. Sannolikhet = svarta delat med alla.",
    delprov: "XYZ",
    area: "sannolikhet",
    prompt:
      "I burk A finns det 40 enfärgade kulor: 8 svarta och 32 vita. I burk B finns det 60 kulor. Sannolikheten är 1/2 att en slumpmässigt plockad kula ur burk B är svart. Kulorna i burk A och burk B hälls över i en tom påse. Vad är sannolikheten att en slumpmässigt plockad kula ur påsen är svart?",
    options: ["2/5", "9/25", "3/10", "19/50"],
    correct: 3,
    solution:
      "Svarta kulor i A: 8. Svarta kulor i B: 60 · 1/2 = 30. Totalt svarta: 8 + 30 = 38 av totalt 40 + 60 = 100 kulor, alltså 38/100 = 19/50.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 5, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-04",
    hint: "Inför en variabel för antalet efter henne och uttryck antalet före med den. Glöm inte att räkna med Nadia själv. Vilket mönster får totalen?",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Nadia står i en kö. Antalet personer som står före henne i kön är fyra gånger så stort som antalet personer som står efter henne. Vilket svarsalternativ kan vara det totala antalet personer i kön (Nadia inräknad)?",
    options: ["27", "28", "29", "31"],
    correct: 3,
    solution:
      "Om x personer står efter Nadia står 4x personer före henne. Totalt antal = 4x + x + 1 = 5x + 1, som alltid ger rest 1 vid division med 5. Av alternativen är endast 31 = 5 · 6 + 1 av den formen (x = 6).",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 8, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-05",
    hint: "Använd kvadreringsreglerna för båda parenteserna och subtrahera. Sätt ut parenteser runt den andra när du drar ifrån, så att tecknen blir rätt.",
    delprov: "XYZ",
    area: "algebra",
    prompt: "Vilket svarsalternativ motsvarar uttrycket (x + 5)² - (x - 5)²?",
    options: ["10x", "20x", "x² - 25", "4x"],
    correct: 1,
    solution:
      "(x + 5)² = x² + 10x + 25 och (x - 5)² = x² - 10x + 25. Differensen blir (x² + 10x + 25) - (x² - 10x + 25) = 20x.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 9, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-06",
    hint: "Ritar du upp figuren? Uttryck cirkelns area med radien för att hitta r, och se sedan hur många radier rektangelns sidor består av.",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "Två lika stora cirklar ligger i en rektangel så att cirklarna tangerar varandra, och var och en av cirklarna tangerar dessutom tre av rektangelns sidor. Cirklarnas sammanlagda area är 8π cm². Hur stor area har rektangeln?",
    options: ["24 cm²", "32 cm²", "48 cm²", "64 cm²"],
    correct: 1,
    solution:
      "2·πr² = 8π ger r² = 4, alltså r = 2. Rektangelns bredd är 4r = 8 cm (två diametrar i rad) och höjden är 2r = 4 cm. Arean blir 8 · 4 = 32 cm².",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 10, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-07",
    hint: "Negativ exponent betyder inverterat tal, och bråkexponent innehåller en rot. Förenkla steg för steg, och kvadrera sist.",
    delprov: "XYZ",
    area: "potenser",
    prompt: "x = 4^(-3/2). Vad är x²?",
    options: ["1/16", "1/8", "1/64", "1/4"],
    correct: 2,
    solution:
      "4^(3/2) = (√4)³ = 2³ = 8, så x = 1/8. Då är x² = (1/8)² = 1/64.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 11, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-08",
    hint: "Du behöver inte räkna roten exakt. Kvadrera gränsvärdena i alternativen och se vilka två som √50 hamnar mellan.",
    delprov: "XYZ",
    area: "potenser",
    prompt: "x = √50. I vilket intervall ligger x?",
    options: ["x < 7", "7 ≤ x < 7,5", "7,5 ≤ x < 8", "x ≥ 8"],
    correct: 1,
    solution:
      "7² = 49 och 7,5² = 56,25. Eftersom 49 < 50 < 56,25 ligger √50 mellan 7 och 7,5.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 12, url: HOSTEN_2022_URL }
  },
  {
    id: "xyz-09",
    hint: "Skriv två ekvationer, en för åldersskillnaden och en för summan. Lös ut en variabel och sätt in i den andra. Fråga efter produkten, inte åldern.",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Sara är 5 år äldre än Tom. Tillsammans är Sara och Tom 27 år. Saras ålder är x år och Toms ålder är y år. Vad är produkten xy?",
    options: ["154", "160", "171", "176"],
    correct: 3,
    solution:
      "x = y + 5 och x + y = 27 ger (y + 5) + y = 27, alltså y = 11 och x = 16. Produkten blir 16 · 11 = 176.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 4, url: VAREN_2025_URL }
  },
  {
    id: "xyz-10",
    hint: "Gör om alla mått till samma enhet (cm är praktiskt) innan du multiplicerar. Hur många cm är en meter, en decimeter och en millimeter?",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Ett rätblock är 3 meter långt, 4 decimeter brett och 5 millimeter högt. Hur stor är volymen av rätblocket?",
    options: ["600 cm³", "6 000 cm³", "60 000 cm³", "600 000 cm³"],
    correct: 1,
    solution: "Omvandla till cm: 300 cm · 40 cm · 0,5 cm = 6 000 cm³.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 2, url: VAREN_2025_URL }
  },
  {
    id: "xyz-11",
    hint: "Det går snabbast att pröva några heltal för x och se vilka produkter du får. Testa även negativa heltal om inget passar.",
    delprov: "XYZ",
    area: "aritmetik",
    prompt: "x är ett heltal. Vilket svarsalternativ är ett möjligt värde på x(x + 2)?",
    options: ["34", "35", "36", "38"],
    correct: 1,
    solution: "Prova heltal: x = 5 ger x(x + 2) = 5 · 7 = 35, vilket finns bland alternativen.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 6, url: VAREN_2025_URL }
  },
  {
    id: "xyz-12",
    hint: "Medianen av sex tal är medelvärdet av de två mittersta. Gå igenom vad som händer när det nya talet hamnar före, mellan eller efter de nuvarande.",
    delprov: "XYZ",
    area: "statistik",
    prompt:
      "Mätserien 2, 4, 5, 5, 9 utökas med ett slumpmässigt valt ensiffrigt positivt heltal (1-9). Hur stor är sannolikheten att den nya mätseriens median blir mindre än 5?",
    options: ["1/3", "4/9", "1/2", "5/9"],
    correct: 1,
    solution:
      "Den nya medianen (6 tal) är medelvärdet av det tredje och fjärde värdet i den sorterade serien. Om det tillagda talet är 1, 2, 3 eller 4 blir sorteringen t, 2, 4, 5, 5, 9 med median (4+5)/2 = 4,5 < 5. Är talet 5-9 blir median (5+5)/2 = 5. Det gäller alltså för 4 av 9 möjliga tal, så sannolikheten är 4/9.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 11, url: VAREN_2025_URL }
  },

  // ===================== KVA — Kvantitativa jämförelser (10) =====================
  {
    id: "kva-01",
    hint: "Förenkla bråket på högra sidan först. Lös sedan ut x och jämför med kvantitet II.",
    delprov: "KVA",
    area: "bråk",
    prompt: "x/12 = 9/18\n\nKvantitet I: x\nKvantitet II: 6",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "9/18 = 1/2, alltså x/12 = 1/2, vilket ger x = 6. Kvantitet I och II är båda 6.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 13, url: HOSTEN_2022_URL }
  },
  {
    id: "kva-02",
    hint: "Skriv om båda procentuttrycken som decimal gånger tal och räkna ut dem. Finns det en genväg, vad händer om man byter plats på talen?",
    delprov: "KVA",
    area: "procent",
    prompt: "Kvantitet I: 25 procent av 60\nKvantitet II: 60 procent av 25",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "25 % av 60 = 0,25 · 60 = 15. 60 % av 25 = 0,60 · 25 = 15. Kvantiteterna är lika, eftersom a % av b alltid är lika med b % av a.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 15, url: HOSTEN_2022_URL }
  },
  {
    id: "kva-03",
    hint: "Räkna ut båda medelvärdena (summa delat med antal). Det går också att resonera om vad de extra talen gör med medelvärdet.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Kvantitet I: Medelvärdet av mätserien 2, 5, 11\nKvantitet II: Medelvärdet av mätserien 2, 2, 5, 11, 11",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Medelvärde I: (2 + 5 + 11)/3 = 18/3 = 6. Medelvärde II: (2 + 2 + 5 + 11 + 11)/5 = 31/5 = 6,2. Alltså är II större än I.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 16, url: HOSTEN_2022_URL }
  },
  {
    id: "kva-04",
    hint: "Uttryck varje kvantitet med p och q. Prova sedan olika tal på p och q (inte bara samma) och se om jämförelsen alltid blir lika.",
    delprov: "KVA",
    area: "bråk",
    prompt:
      "Anna har p kulor och Boel har q kulor. Cim har inga kulor. Anna ger en tredjedel av sina kulor till Cim. Boel ger också en tredjedel av sina kulor till Cim.\n\nKvantitet I: Det sammanlagda antalet kulor som Cim får av Anna och Boel\nKvantitet II: Medelvärdet av antalet kulor som Anna och Boel hade innan de gav kulor till Cim",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Cim får p/3 + q/3 = (p + q)/3 kulor sammanlagt (Kvantitet I). Medelvärdet av Annas och Boels ursprungliga antal kulor är (p + q)/2 (Kvantitet II). Eftersom (p + q)/3 alltid är mindre än (p + q)/2 för positiva p och q, är Kvantitet II större.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 17, url: HOSTEN_2024_URL }
  },
  {
    id: "kva-05",
    hint: "Inför variabler för åldrarna och skriv upp sambandet. Testa några olika åldrar för Didrik och se om svaret ändras, eller om det alltid är samma.",
    delprov: "KVA",
    area: "algebra",
    prompt:
      "Bos ålder är en tredjedel av Cias och Didriks sammanlagda ålder.\n\nKvantitet I: Bos ålder\nKvantitet II: Cias ålder",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Bos ålder = (Cias ålder + Didriks ålder)/3. Utan att veta hur åldern fördelar sig mellan Cia och Didrik går det inte att avgöra om Bo är äldre eller yngre än Cia — det beror helt på fördelningen. Informationen är otillräcklig.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 14, url: HOSTEN_2022_URL }
  },
  {
    id: "kva-06",
    hint: "Subtrahera kvantiteterna från varandra och förenkla. Vad vet du om tecknet på resultatet utifrån villkoret?",
    delprov: "KVA",
    area: "algebra",
    prompt: "0 < a < b\n\nKvantitet I: a + 3b\nKvantitet II: 3a + b",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Kvantitet I minus Kvantitet II = (a + 3b) - (3a + b) = 2b - 2a = 2(b - a). Eftersom b > a > 0 är detta positivt, så Kvantitet I är större.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 15, url: HOSTEN_2024_URL }
  },
  {
    id: "kva-07",
    hint: "Rita rektangeln och markera sidorna och diagonalerna. Vilka sträckor i en rektangel är lika långa?",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "PQRS är en rektangel.\n\nKvantitet I: (PS)² + (PR)²\nKvantitet II: (QR)² + (QS)²",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "I en rektangel PQRS är motstående sidor lika långa (PS = QR) och de två diagonalerna är lika långa (PR = QS). Då blir (PS)² + (PR)² = (QR)² + (QS)². Kvantiteterna är lika.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 18, url: HOSTEN_2024_URL }
  },
  {
    id: "kva-08",
    hint: "Vad är det som kännetecknar en punkt på x-axeln respektive y-axeln? Sätt in det i ekvationen för varje kvantitet.",
    delprov: "KVA",
    area: "räta linjen",
    prompt:
      "Linjen L ges av ekvationen y = -3x + 9.\n\nKvantitet I: x-koordinaten för den punkt där L skär x-axeln\nKvantitet II: y-koordinaten för den punkt där L skär y-axeln",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Skärning med x-axeln (y = 0): 0 = -3x + 9, alltså x = 3. Skärning med y-axeln (x = 0): y = 9. Kvantitet II (9) är större än Kvantitet I (3).",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 19, url: HOSTEN_2024_URL }
  },
  {
    id: "kva-09",
    hint: "Fundera på vilka värden de mittersta talen kan ha. Testa ett par olika tänkbara mätserier och se om jämförelsen ändras.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "En mätserie består av åtta positiva heltal. De sex största mätvärdena är större än 20. De sex minsta mätvärdena är mindre än 24.\n\nKvantitet I: Mätseriens median\nKvantitet II: 22",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "De fyra mittersta värdena (plats 3-6 i storleksordning) måste vara heltal mellan 20 och 24, alltså 21, 22 eller 23. Medianen är medelvärdet av plats 4 och 5, som beroende på vilka tal det är kan bli allt mellan 21 och 23 — ibland mindre än 22, ibland lika med 22, ibland större. Informationen är otillräcklig.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 20, url: HOSTEN_2024_URL }
  },
  {
    id: "kva-10",
    hint: "Testa först x = y = 1, och prova sedan helt andra tal som uppfyller xy = 1, till exempel ett stort x och ett litet y. Blir jämförelsen alltid densamma?",
    delprov: "KVA",
    area: "algebra",
    prompt: "xy = 1, där x > 0 och y > 0.\n\nKvantitet I: x + y\nKvantitet II: 2",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Enligt AM-GM-olikheten gäller x + y ≥ 2√(xy) = 2 för positiva x och y med xy = 1, med likhet endast då x = y = 1. Ibland är summan exakt 2 (x = y = 1) och ibland större (t.ex. x = 4, y = 1/4 ger x + y = 4,25). Informationen är otillräcklig.",
    twinOf: { prov: "2024-10-20", provpass: 1, uppgift: 22, url: HOSTEN_2024_URL }
  },

  // ===================== NOG — Kvantitativa resonemang (8) =====================
  {
    id: "nog-01",
    hint: "Tre steg: vad ger (1) ensamt, vad ger (2) ensamt, och vad ger de tillsammans? Du ska inte räkna fram svaret om det inte behövs, bara avgöra om det går.",
    delprov: "NOG",
    area: "aritmetik",
    prompt:
      "Mattias och Nour har varsin påse med russin. Påsarna innehåller bara mörka och gyllene russin. Hur många gyllene russin har Nour i sin påse?\n\n(1) I Mattias påse finns det 12 mörka russin och 18 gyllene russin. Nour har 5 russin fler än Mattias.\n(2) 2/5 av russinen i Nours påse är gyllene.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1): Mattias har 12 + 18 = 30 russin, så Nour har 35. Från (2) vet vi att 2/5 av Nours russin är gyllene, dvs 2/5 · 35 = 14. Ingetdera påstående räcker ensamt, men tillsammans ger de svaret.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 23, url: HOSTEN_2022_URL }
  },
  {
    id: "nog-02",
    hint: "Tre steg: testa (1) ensamt, sedan (2) ensamt, sist båda. Fråga dig om du får fram skillnaden eller bara en delmängd av informationen.",
    delprov: "NOG",
    area: "aritmetik",
    prompt:
      "I en burk finns det bara enfärgade knappar: blå och gula. Hur många fler blå än gula knappar finns det i burken?\n\n(1) Sammanlagt finns det 40 knappar i burken.\n(2) Det finns 25 blå knappar i burken. Antalet gula knappar är 3/5 av antalet blå knappar.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Påstående (1) ger bara totalen och räcker inte för att dela upp i blå och gula. Påstående (2) ger både antalet blå (25) och antalet gula (3/5 · 25 = 15), så skillnaden blir 25 - 15 = 10 — tillräckligt utan (1).",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 24, url: HOSTEN_2022_URL }
  },
  {
    id: "nog-03",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Rita en tidslinje och fundera på vad som behövs för att hitta både starttid och takt.",
    delprov: "NOG",
    area: "hastighet",
    prompt:
      "Elin och Robin ska tapetsera varsin lika stor vägg med samma sorts tapet, som går åt i 6 tapetbanor per vägg. De arbetar utan avbrott, var och en med sin egen konstanta hastighet, och blir färdiga samtidigt. Vilken tid börjar Elin tapetsera?\n\n(1) Klockan 9.10 börjar Robin tapetsera. Det tar honom 90 minuter att tapetsera hela sin vägg.\n(2) När Robin börjar tapetsera har Elin redan satt upp 2 tapetbanor.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Från (1): Robin är klar 90 minuter efter 9.10, det vill säga 10.40 — samma sluttid som Elin, eftersom de blir klara samtidigt. Från (2): Elin har gjort 2 av sina 6 banor när Robin börjar 9.10, så hon har 4 banor kvar mellan 9.10 och 10.40 (90 minuter), vilket ger hennes takt. Med den takten tog de första 2 banorna 45 minuter, så Elin började 8.25. Varken (1) eller (2) räcker ensamt.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 25, url: HOSTEN_2022_URL }
  },
  {
    id: "nog-04",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Testa med konkreta tal som passar påståendena, både jämna och udda.",
    delprov: "NOG",
    area: "algebra",
    prompt: "Är p ett jämnt heltal?\n\n(1) q = 3p\n(2) q är ett heltal.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 4,
    solution:
      "Om q = 3p och q är ett heltal, så är p = q/3, vilket inte alltid är ett heltal (t.ex. q = 1 ger p = 1/3). Även i de fall p råkar bli ett heltal är det inte nödvändigtvis jämnt (t.ex. q = 3 ger p = 1). Frågan går inte att besvara ens med båda påståendena.",
    twinOf: { prov: "2022-10-23", provpass: 1, uppgift: 27, url: HOSTEN_2022_URL }
  },
  {
    id: "nog-05",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Sträcka = hastighet · tid, så fundera på vilka två storheter du måste känna för att räkna ut sträckan.",
    delprov: "NOG",
    area: "hastighet",
    prompt:
      "Vera cyklade från X till Y. Hur långt cyklade Vera?\n\n(1) Veras medelhastighet var 18 km/h.\n(2) Om Vera hade cyklat med dubbla hastigheten, hade hon varit framme vid Y 20 minuter tidigare.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 2,
    solution:
      "Låt v vara hastigheten och d sträckan. Från (2): d/v - d/(2v) = d/(2v) = 20 minuter. Utan v (som ges av (1): 18 km/h) går det inte att lösa ut d. Med v = 18 km/h: d/36 = 1/3 timme, alltså d = 12 km. Båda påståendena behövs tillsammans.",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 25, url: HOSTEN_2023_URL }
  },
  {
    id: "nog-06",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Kolla om påståendet ger dig exakta antal för alla tre färgerna eller bara ett förhållande.",
    delprov: "NOG",
    area: "bråk",
    prompt:
      "I en påse finns det 72 enfärgade russin i tre olika färger: gula, gröna och lila. Hur många lila russin finns det i påsen?\n\n(1) Förhållandet mellan antalet gula och antalet gröna russin i påsen är 4:3.\n(2) 4/9 av russinen i påsen är gula. 1/3 av russinen i påsen är gröna.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 1,
    solution:
      "Från (2): gula = 4/9 · 72 = 32, gröna = 1/3 · 72 = 24, alltså lila = 72 - 32 - 24 = 16 — tillräckligt ensamt. Från (1) vet vi bara förhållandet 4:3 mellan gula och gröna. Gula + gröna kan då vara 7, 14, 21 ... russin, så antalet lila går inte att bestämma — otillräckligt ensamt. Svaret blir alltså: i (2) men ej i (1).",
    twinOf: { prov: "2023-10-22", provpass: 2, uppgift: 26, url: HOSTEN_2023_URL }
  },
  {
    id: "nog-07",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Skriv om första uppgiften som x = något · y och sätt in i varje påstående, se om du får ett enda svar.",
    delprov: "NOG",
    area: "algebra",
    prompt:
      "För de positiva heltalen x och y gäller att x/y = 5. Vad är x - y?\n\n(1) x + y = 30\n(2) xy = 125\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "x = 5y. Från (1): 5y + y = 30 ger y = 5, x = 25, x - y = 20. Från (2): 5y · y = 125 ger y² = 25, alltså y = 5, x = 25, x - y = 20. Båda påståendena ger var för sig samma svar.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 26, url: VAREN_2025_URL }
  },
  {
    id: "nog-08",
    hint: "Tre steg: (1) ensamt, (2) ensamt, båda. Inför en variabel för akrobaterna och uttryck jonglörerna med den, sätt sedan in varje påstående.",
    delprov: "NOG",
    area: "procent",
    prompt:
      "På en festival är antalet jonglörer 75 procent av antalet akrobater. Hur många akrobater finns det på festivalen?\n\n(1) Om det hade funnits dubbelt så många jonglörer och hälften så många akrobater, så hade det funnits 40 fler jonglörer än akrobater.\n(2) Det finns 10 fler akrobater än jonglörer.\n\nTillräcklig information för lösningen erhålls …",
    options: NOG_OPTIONS,
    correct: 3,
    solution:
      "Låt a vara antalet akrobater, så är antalet jonglörer 0,75a. Från (1): 2 · 0,75a - 0,5a = 1,5a - 0,5a = a = 40, tillräckligt ensamt. Från (2): a - 0,75a = 0,25a = 10, alltså a = 40, vilket också räcker ensamt. Båda ger samma svar var för sig.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 28, url: VAREN_2025_URL }
  },

  // ===================== DTK — Diagram, tabeller och kartor (10) =====================
  {
    id: "dtk-01",
    hint: "Ta fram kolumnerna Kvinnor och Totalt. Du ska jämföra andelar (kvinnor delat med totalt) och inte antal.",
    delprov: "DTK",
    area: "statistik",
    prompt: "Inom vilket yrke var andelen kvinnor bland de anställda störst?",
    table:
      "| Yrke | Kvinnor | Män | Totalt |\n|---|---|---|---|\n| Sjuksköterskor | 24 500 | 3 200 | 27 700 |\n| Ingenjörer | 6 800 | 21 400 | 28 200 |\n| Lärare (grundskola) | 18 300 | 7 100 | 25 400 |\n| Poliser | 5 200 | 9 800 | 15 000 |\n| Frisörer | 9 600 | 1 400 | 11 000 |",
    options: ["Ingenjörer", "Poliser", "Lärare (grundskola)", "Sjuksköterskor"],
    correct: 3,
    solution:
      "Andel kvinnor: sjuksköterskor 24 500/27 700 ≈ 88 %, frisörer ≈ 87 %, lärare ≈ 72 %, poliser ≈ 35 %, ingenjörer ≈ 24 %. Sjuksköterskor hade högst andel kvinnor.",
    twinOf: { prov: "2025-04-05", provpass: 5, uppgift: 29, url: VAREN_2025_URL }
  },
  {
    id: "dtk-02",
    hint: "Titta bara på raderna för halvt och en fjärdedels uttag. Addera kvinnor för sig och män för sig, och ta sedan skillnaden.",
    delprov: "DTK",
    area: "statistik",
    prompt:
      "Studera antalet pensionärer med halvt respektive en fjärdedels uttag. Hur många fler var kvinnorna än männen sammanlagt i dessa två grupper?",
    table:
      "| Uttagsandel | Kvinnor | Män |\n|---|---|---|\n| Helt uttag | 612 000 | 580 000 |\n| Tre fjärdedels uttag | 8 400 | 7 100 |\n| Halvt uttag | 22 300 | 19 600 |\n| En fjärdedels uttag | 15 700 | 13 200 |",
    options: ["3 900", "4 600", "5 200", "6 100"],
    correct: 2,
    solution:
      "Kvinnor: 22 300 + 15 700 = 38 000. Män: 19 600 + 13 200 = 32 800. Skillnad: 38 000 - 32 800 = 5 200.",
    twinOf: { prov: "2025-10-19", provpass: 1, uppgift: 30, url: HOSTEN_2025_URL }
  },
  {
    id: "dtk-03",
    hint: "Hitta kolumnen Insats och raden för mindre kommuner. Dela med landets genomsnitt och gör om till procent. Se upp med enheten tkr.",
    delprov: "DTK",
    area: "procent",
    prompt:
      "I hela landet var den genomsnittliga insatsen för en bostadsrättslägenhet 2024 2 000 000 kr. Hur hög var insatsen i kommuner med färre än 75 000 invånare jämfört med landets genomsnitt?",
    table:
      "| Område | Årsavgift bostadsrätt (kr/m²) | Årshyra hyresrätt (kr/m²) | Insats (tkr) |\n|---|---|---|---|\n| Stor-Stockholm | 1 050 | 1 780 | 2 900 |\n| Stor-Göteborg | 980 | 1 620 | 2 100 |\n| Kommuner >75 000 inv. | 890 | 1 340 | 1 600 |\n| Kommuner <75 000 inv. | 760 | 1 190 | 900 |",
    options: ["Dubbelt så hög", "Tre fjärdedelar så hög", "45 procent så hög", "Hälften så hög"],
    correct: 2,
    solution: "900 000/2 000 000 = 0,45 = 45 procent. Insatsen i mindre kommuner var 45 procent av landets genomsnitt.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 34, url: HOSTEN_2023_URL }
  },
  {
    id: "dtk-04",
    hint: "Hitta raden Filmklubben och kolumnen 2023, samt Summa beviljat för samma år. Andel = del delat med helheten.",
    delprov: "DTK",
    area: "procent",
    prompt: "Hur stor andel av de beviljade bidragen 2023 gick till Filmklubben?",
    table:
      "| Förening | 2021 | 2022 | 2023 |\n|---|---|---|---|\n| Körsångarna | 180 | 210 | 240 |\n| Konstnärsgillet | 90 | 95 | 100 |\n| Teaterverkstan | 320 | 300 | 340 |\n| Filmklubben | 60 | 75 | 90 |\n| Musikskolan | 410 | 430 | 450 |\n| **Summa beviljat** | **1 060** | **1 110** | **1 220** |",
    options: ["5 procent", "6 procent", "7 procent", "9 procent"],
    correct: 2,
    solution: "90/1 220 ≈ 0,074, alltså ungefär 7 procent.",
    twinOf: { prov: "2024-10-20", provpass: 4, uppgift: 30, url: HOSTEN_2024_URL }
  },
  {
    id: "dtk-05",
    hint: "Hitta Region C:s totalsumma och radens Riket totalt. Dela del med helhet, avrunda och välj närmaste alternativ.",
    delprov: "DTK",
    area: "statistik",
    prompt: "Hur stor andel av rikets totala kulturkostnader 2023 utgjorde Region Cs kostnader?",
    table:
      "| Region | Teater & musik | Bibliotek | Övrigt | Totalt |\n|---|---|---|---|---|\n| Region A | 45 000 | 12 000 | 18 000 | 75 000 |\n| Region B | 20 000 | 9 000 | 11 000 | 40 000 |\n| Region C | 60 000 | 15 000 | 25 000 | 100 000 |\n| Region D | 15 000 | 6 000 | 9 000 | 30 000 |\n| **Riket totalt** | **140 000** | **42 000** | **63 000** | **245 000** |",
    options: ["30 procent", "35 procent", "41 procent", "48 procent"],
    correct: 2,
    solution: "100 000/245 000 ≈ 0,408, alltså ungefär 41 procent.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 36, url: VAREN_2023_URL }
  },
  {
    id: "dtk-06",
    hint: "Använd kolumnen 2022. Summera hela kolumnen för att få helheten, och dela sedan Spel- och vadhållning med den. Förkorta bråket.",
    delprov: "DTK",
    area: "procent",
    prompt:
      "Hur stor andel av den totala omsättningen inom kultur, nöje och fritid 2022 stod Spel- och vadhållning för?",
    table:
      "| Verksamhet | 2022 | 2023 |\n|---|---|---|\n| Konsertarrangörer | 3 000 | 3 400 |\n| Nöjesparker | 2 000 | 2 100 |\n| Biografer | 1 500 | 1 600 |\n| Spel- och vadhållning | 6 000 | 6 200 |\n| Övrigt | 2 500 | 2 700 |",
    options: ["1/4", "3/10", "1/3", "2/5"],
    correct: 3,
    solution:
      "Total omsättning 2022: 3 000 + 2 000 + 1 500 + 6 000 + 2 500 = 15 000. Andel Spel- och vadhållning: 6 000/15 000 = 2/5.",
    twinOf: { prov: "2025-04-05", provpass: 3, uppgift: 30, url: VAREN_2025_URL }
  },
  {
    id: "dtk-07",
    hint: "Hitta raden för 2021 i kolumnerna Ansökningar och Verkställda. Ett förhållande a:b får du genom att dela så att ena talet blir 1.",
    delprov: "DTK",
    area: "procent",
    prompt: "Hur såg förhållandet ut 2021 mellan antalet ansökningar om avhysning och antalet verkställda avhysningar?",
    table:
      "| År | Ansökningar | Verkställda |\n|---|---|---|\n| 2015 | 9 600 | 3 200 |\n| 2018 | 11 400 | 3 800 |\n| 2021 | 8 200 | 2 050 |\n| 2023 | 10 500 | 3 500 |",
    options: ["2:1", "3:1", "4:1", "5:1"],
    correct: 2,
    solution: "8 200/2 050 = 4, alltså var förhållandet 4:1.",
    twinOf: { prov: "2023-03-25", provpass: 4, uppgift: 29, url: VAREN_2023_URL }
  },
  {
    id: "dtk-08",
    hint: "Du behöver kolumnerna Djurägare och Djur, inte fäbodlag. Räkna ut kvoten för varje område och jämför.",
    delprov: "DTK",
    area: "aritmetik",
    prompt: "I vilket område var antalet djur per djurägare störst 2023?",
    table:
      "| Område | Fäbodlag | Djurägare | Djur |\n|---|---|---|---|\n| Norra området | 14 | 210 | 3 150 |\n| Mellersta området | 9 | 140 | 2 240 |\n| Södra området | 6 | 95 | 1 425 |",
    options: ["Norra området", "Mellersta området", "Södra området", "Alla tre är lika"],
    correct: 1,
    solution:
      "Djur per djurägare: Norra 3 150/210 = 15, Mellersta 2 240/140 = 16, Södra 1 425/95 = 15. Mellersta området hade flest djur per ägare.",
    twinOf: { prov: "2023-10-22", provpass: 4, uppgift: 29, url: HOSTEN_2023_URL }
  },
  {
    id: "dtk-09",
    hint: "Titta bara i kolumnen Import. Hitta det största värdet och dela med totalen som anges i uppgiften. Jämför sedan med bråken i alternativen.",
    delprov: "DTK",
    area: "statistik",
    prompt:
      "Det totala importvärdet för de redovisade varugrupperna 2024 var 394 miljarder kronor. Hur stor andel av detta avsåg varugruppen med störst importvärde?",
    table:
      "| Varugrupp | Export | Import |\n|---|---|---|\n| Fordon | 145 | 98 |\n| Läkemedel | 88 | 42 |\n| Elektronik | 76 | 130 |\n| Livsmedel | 54 | 112 |\n| Skogsprodukter | 160 | 12 |",
    options: ["1/5", "1/4", "1/3", "2/5"],
    correct: 2,
    solution:
      "Störst importvärde har Elektronik med 130 miljarder kr. 130/394 ≈ 0,33, alltså ungefär 1/3.",
    twinOf: { prov: "2025-10-19", provpass: 4, uppgift: 29, url: HOSTEN_2025_URL }
  },
  {
    id: "dtk-10",
    hint: "Titta bara på kolumnen 2023. Dela alla tre med det minsta talet och avrunda till heltal för att få förhållandet.",
    delprov: "DTK",
    area: "statistik",
    prompt:
      "Vilket svarsförslag beskriver bäst förhållandet mellan tekniker, ingenjörer och arkitekter vad gäller det totala antalet certifieringar 2023?",
    table:
      "| Yrkesgrupp | 2021 | 2022 | 2023 |\n|---|---|---|---|\n| Tekniker | 320 | 340 | 365 |\n| Ingenjörer | 210 | 225 | 240 |\n| Arkitekter | 55 | 58 | 60 |",
    options: ["5:3:1", "5:4:1", "6:4:1", "6:5:1"],
    correct: 2,
    solution: "365:240:60, delat med 60, ger ungefär 6:4:1.",
    twinOf: { prov: "2024-04-13", provpass: 2, uppgift: 32, url: VAREN_2024_URL }
  }
];

export const HP_TWINS: HpTwin[] = [
  ...HP_TWINS_BASE,
  ...HP_TWINS_XYZ,
  ...HP_TWINS_KVA,
  ...HP_TWINS_NOG,
  ...HP_TWINS_DTK,
  ...HP_TWINS_FIG,
  ...HP_TWINS_GEO,
];
