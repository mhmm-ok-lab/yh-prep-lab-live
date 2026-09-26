import type { HpTwin } from "./hp-twins";

// Fler XYZ-tvillingar. id-prefix: "xyz2-".
// Källa: UHR:s provhäften (kvantitativ del) på studera.nu, hämtade som PDF med curl
// och extraherade med Python/pypdf. Facit från samma sida. Endast egna
// formuleringar, nya tal och egna svarsalternativ — aldrig originalets text.

const HOSTEN_2018_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/";
const HOSTEN_2019_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/";
const HOSTEN_2021_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2021-24-oktober/";
const VAREN_2022_MAJ_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2022-7-maj/";

export const HP_TWINS_XYZ: HpTwin[] = [
  {
    id: "xyz2-01",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Vilket svarsalternativ betecknar produkten av 12 och summan av 28 och 37?",
    options: [
      "12(28 + 37)",
      "(28 + 37) / 12",
      "12 · 28 + 37",
      "12 / (28 + 37)"
    ],
    correct: 0,
    solution:
      "Produkten av 12 och summan av 28 och 37 skrivs 12(28 + 37).",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 1,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-02",
    delprov: "XYZ",
    area: "procent",
    prompt:
      "Vad är 0,4 % av 250?",
    options: [
      "0,1",
      "1",
      "10",
      "0,01"
    ],
    correct: 1,
    solution:
      "0,4 % = 0,004. 0,004 · 250 = 1.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 2,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-03",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "(p - q)^(-1) · (p - q)^2 = ? Vilket svarsalternativ är korrekt?",
    options: [
      "(p - q)^(-1)",
      "1",
      "p - q",
      "(p - q)^2"
    ],
    correct: 2,
    solution:
      "Vid multiplikation av potenser med samma bas adderas exponenterna: -1 + 2 = 1, alltså (p - q)^1 = p - q.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 4,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-04",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "För funktionen f gäller att f(x) = x^2 - 1 och -2 ≤ x ≤ 2. Vilken värdemängd har funktionen?",
    options: [
      "0 ≤ f(x) ≤ 4",
      "-4 ≤ f(x) ≤ 0",
      "-3 ≤ f(x) ≤ 1",
      "-1 ≤ f(x) ≤ 3"
    ],
    correct: 3,
    solution:
      "Minsta värdet fås vid x = 0: f(0) = -1. Största värdet fås vid x = ±2: f(±2) = 4 - 1 = 3. Värdemängden är -1 ≤ f(x) ≤ 3.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 5,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-05",
    delprov: "XYZ",
    area: "sannolikhet",
    prompt:
      "p och q är två på varandra följande heltal. Hur stor är sannolikheten att p · q är jämnt delbart med 2?",
    options: [
      "1",
      "0,75",
      "0,5",
      "0"
    ],
    correct: 0,
    solution:
      "Av två på varandra följande heltal är alltid exakt ett jämnt, så produkten är alltid jämn. Sannolikheten är därför 1.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 9,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-06",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "En rektangel med längden 3 dm och bredden 8 cm utgör basytan av ett rätblock som har höjden 4 m. Vilken volym har rätblocket?",
    options: [
      "96 cm3",
      "96 dm3",
      "960 cm3",
      "960 dm3"
    ],
    correct: 1,
    solution:
      "Allt i dm: 3 dm × 0,8 dm × 40 dm = 96 dm3.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 10,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-07",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Vilket svarsalternativ ger alla lösningar till olikheten 5x - 7 > 2x + 8?",
    options: [
      "x < -5",
      "x < 5",
      "x > 5",
      "x > -5"
    ],
    correct: 2,
    solution:
      "5x - 7 > 2x + 8 ger 3x > 15, alltså x > 5.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 11,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-08",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Vilket svarsalternativ är ett heltal?",
    options: [
      "√18 + √8",
      "√18 - √8",
      "√18 / √8",
      "√18 · √8"
    ],
    correct: 3,
    solution:
      "√18 · √8 = √144 = 12, vilket är ett heltal. √18 + √8 = 5√2 och √18 - √8 = √2 är irrationella, och √18 / √8 = 1,5 är inte ett heltal.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 2,
      uppgift: 12,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-09",
    delprov: "XYZ",
    area: "potenser",
    prompt:
      "Vilket svarsalternativ motsvarar x · ³√x · √x (x > 0)?",
    options: [
      "x^(11/6)",
      "x^(5/6)",
      "x^(3/2)",
      "x^2"
    ],
    correct: 0,
    solution:
      "x^1 · x^(1/3) · x^(1/2) = x^(1 + 1/3 + 1/2) = x^(11/6).",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 1,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-10",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "1 < a < b < c. Vilket av svarsalternativen är med säkerhet större än 1?",
    options: [
      "(a + b) / (a + c)",
      "(c - a) / (b - a)",
      "(a · c) / (b · c)",
      "(b + c) / (a + c)"
    ],
    correct: 1,
    solution:
      "Eftersom c > b gäller c - a > b - a, och b - a > 0. Därför är (c - a) / (b - a) alltid större än 1, oavsett vilka värden a, b och c har så länge 1 < a < b < c.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 3,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-11",
    delprov: "XYZ",
    area: "bråk",
    prompt:
      "Vad är (2/5) / (8/3)?",
    options: [
      "20/3",
      "16/15",
      "3/20",
      "6/5"
    ],
    correct: 2,
    solution:
      "(2/5) / (8/3) = (2/5) · (3/8) = 6/40 = 3/20.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 5,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-12",
    delprov: "XYZ",
    area: "statistik",
    prompt:
      "De sex talen 9, 13, 16, 20, x och y har medelvärdet 15. Vad är medelvärdet av talen x och y?",
    options: [
      "15",
      "17",
      "18",
      "16"
    ],
    correct: 3,
    solution:
      "Summan av alla sex tal är 6 · 15 = 90. Summan av de fyra kända talen är 9+13+16+20 = 58. Då är x + y = 90 - 58 = 32, och medelvärdet av x och y är 32/2 = 16.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 6,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-13",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "Vilket svarsalternativ är lika med -(x - 2y) + (-x + 2y)?",
    options: [
      "-2x + 4y",
      "2x - 4y",
      "0",
      "4y"
    ],
    correct: 0,
    solution:
      "-(x - 2y) = -x + 2y. Då blir uttrycket (-x + 2y) + (-x + 2y) = -2x + 4y.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 8,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-14",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "Summan av tre på varandra följande heltal är 108. Vad är produkten av det minsta och det största talet?",
    options: [
      "1260",
      "1295",
      "1225",
      "1332"
    ],
    correct: 1,
    solution:
      "Talen är 35, 36 och 37 (35+36+37=108). Produkten av det minsta och det största är 35 · 37 = 1295.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 9,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-15",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "f(x) = 2x + 5k, där k är en konstant. Vad är f(a + 1) - f(a)?",
    options: [
      "5k",
      "a",
      "2",
      "2a + 5k"
    ],
    correct: 2,
    solution:
      "f(a+1) - f(a) = [2(a+1) + 5k] - [2a + 5k] = 2a + 2 + 5k - 2a - 5k = 2.",
    twinOf: {
      prov: "2018-10-21",
      provpass: 4,
      uppgift: 10,
      url: HOSTEN_2018_URL
    }
  },
  {
    id: "xyz2-16",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Vad är 7^2 - 3^3?",
    options: [
      "4",
      "13",
      "40",
      "22"
    ],
    correct: 3,
    solution:
      "7^2 = 49 och 3^3 = 27. 49 - 27 = 22.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 1,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-17",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "Punkterna A = (0, 4), B = (6, 0) och C = (0, 9) är utsatta i ett koordinatsystem. Hur stor är arean av triangeln ABC?",
    options: [
      "15 areaenheter",
      "10 areaenheter",
      "20 areaenheter",
      "27 areaenheter"
    ],
    correct: 0,
    solution:
      "AC ligger på y-axeln och har längden 9 - 4 = 5. Höjden från B till y-axeln är 6. Arean = (5 · 6) / 2 = 15.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 2,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-18",
    delprov: "XYZ",
    area: "procent",
    prompt:
      "45 % av x är ett heltal. Vilket av svarsalternativen är ett möjligt värde på x?",
    options: [
      "28",
      "20",
      "36",
      "50"
    ],
    correct: 1,
    solution:
      "0,45 · 20 = 9, vilket är ett heltal. 0,45 · 28 = 12,6, 0,45 · 36 = 16,2 och 0,45 · 50 = 22,5 är inte heltal.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 3,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-19",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "x är ett positivt heltal större än 50. När x delas med 4 blir resten 1. När x delas med 7 blir resten 3. Vilket är det minsta möjliga värdet på x?",
    options: [
      "59",
      "66",
      "73",
      "80"
    ],
    correct: 2,
    solution:
      "Tal som ger rest 1 vid delning med 4 och rest 3 vid delning med 7 är 17, 45, 73, 101 … Det minsta av dessa som är större än 50 är 73.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 4,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-20",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Vilket värde har x om (x - 3)(x + 2) = (x + 1)^2?",
    options: [
      "-3/7",
      "7/3",
      "3",
      "-7/3"
    ],
    correct: 3,
    solution:
      "Vänsterled: x^2 - x - 6. Högerled: x^2 + 2x + 1. Det ger -x - 6 = 2x + 1, alltså -7 = 3x och x = -7/3.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 7,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-21",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "För de positiva talen A, b och h gäller sambandet A = (1/2)bh. Vad är b?",
    options: [
      "2A / h",
      "Ah / 2",
      "A / (2h)",
      "2h / A"
    ],
    correct: 0,
    solution:
      "Multiplicera båda leden med 2: 2A = bh. Dela med h: b = 2A / h.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 8,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-22",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "Cirkeln A har radien 4 cm, och dess area är 1/9 av arean av cirkeln B. Hur stor radie har cirkeln B?",
    options: [
      "9 cm",
      "12 cm",
      "6 cm",
      "16 cm"
    ],
    correct: 1,
    solution:
      "Om B:s area är 9 gånger A:s area är B:s radie √9 = 3 gånger så stor som A:s. 3 · 4 cm = 12 cm.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 9,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-23",
    delprov: "XYZ",
    area: "algebra",
    prompt:
      "Medelvärdet av x och y är p. Medelvärdet av y och z är q. Vilket värde har x - z?",
    options: [
      "p - q",
      "(p - q) / 2",
      "2(p - q)",
      "2(q - p)"
    ],
    correct: 2,
    solution:
      "x + y = 2p och y + z = 2q. Subtraktion ger x - z = 2p - 2q = 2(p - q).",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 11,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-24",
    delprov: "XYZ",
    area: "sannolikhet",
    prompt:
      "Elias har skrivit 100 olika heltal på ett papper. 38 av dessa heltal är udda. Elias stryker slumpmässigt tal på pappret. Hur många tal måste han stryka för att vara säker på att ha strukit minst hälften av de jämna talen?",
    options: [
      "31",
      "38",
      "62",
      "69"
    ],
    correct: 3,
    solution:
      "Det finns 62 jämna tal, så hälften är 31. Värsta fallet är att han först stryker alla 38 udda tal utan att träffa något jämnt. Därefter behövs 31 sträck till för att vara säker på 31 jämna. Totalt 38 + 31 = 69.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 1,
      uppgift: 12,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-25",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Vilket svarsalternativ motsvarar 6 300 000 mm?",
    options: [
      "6,3 · 10^4 dm",
      "6,3 · 10^3 cm",
      "8,5 km",
      "6,3 mil"
    ],
    correct: 0,
    solution:
      "6 300 000 mm / 100 = 63 000 dm = 6,3 · 10^4 dm.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 1,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-26",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Saras och Leos sammanlagda ålder är 42 år. Sara är 4 år äldre än Leo. Om Leo är x år gammal, vilket svarsalternativ motsvarar då en ekvation för att räkna ut hans ålder?",
    options: [
      "x - 4 = 42",
      "2x + 4 = 42",
      "2x - 4 = 42",
      "x + 4 = 2 · 42"
    ],
    correct: 1,
    solution:
      "Sara är x + 4 år. Summan är x + (x + 4) = 42, det vill säga 2x + 4 = 42.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 4,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-27",
    delprov: "XYZ",
    area: "procent",
    prompt:
      "I en klass är 70 % av eleverna längre än Elin, och 25 % av eleverna är längre än Noa. Ungefär hur stor andel av eleverna är längre än Elin men kortare än Noa?",
    options: [
      "1/4",
      "1/2",
      "9/20",
      "3/5"
    ],
    correct: 2,
    solution:
      "Andelen som är längre än Elin men inte längre än Noa är ungefär 70 % - 25 % = 45 %, det vill säga 9/20.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 5,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-28",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Vilket värde har x om 5 + (3x - 6)/4 = 11?",
    options: [
      "6",
      "8",
      "12",
      "10"
    ],
    correct: 3,
    solution:
      "(3x - 6)/4 = 6, alltså 3x - 6 = 24, 3x = 30 och x = 10.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 6,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-29",
    delprov: "XYZ",
    area: "sannolikhet",
    prompt:
      "På en parkeringsplats finns det fem bilar med fyra hjul vardera och tre motorcyklar med två hjul vardera. Hur stor är sannolikheten att ett slumpmässigt valt hjul på parkeringsplatsen tillhör en motorcykel?",
    options: [
      "3/13",
      "1/4",
      "3/10",
      "2/5"
    ],
    correct: 0,
    solution:
      "Bilarna har 5 · 4 = 20 hjul och motorcyklarna 3 · 2 = 6 hjul, totalt 26 hjul. Sannolikheten är 6/26 = 3/13.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 7,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-30",
    delprov: "XYZ",
    area: "räta linjen",
    prompt:
      "Vilket svarsalternativ motsvarar en punkt på linjen y = 2x - 7?",
    options: [
      "(0, 7)",
      "(3, -1)",
      "(-1, -5)",
      "(5, 2)"
    ],
    correct: 1,
    solution:
      "För x = 3 är y = 2 · 3 - 7 = -1, så (3, -1) ligger på linjen. De övriga punkterna uppfyller inte ekvationen.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 8,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-31",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "Ett rektangulärt kort har sidorna i förhållandet 4:3. Vilket är förhållandet mellan kortets långsida och dess diagonal?",
    options: [
      "3:5",
      "5:4",
      "4:5",
      "4:3"
    ],
    correct: 2,
    solution:
      "Om sidorna är 4 och 3 blir diagonalen √(4^2+3^2) = √25 = 5 (Pythagoras sats). Förhållandet långsida:diagonal är då 4:5.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 9,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-32",
    delprov: "XYZ",
    area: "potenser",
    prompt:
      "10^5 □ 10^2 = A. A □ 10^3 = B. Vad är det största värde B kan få om rutorna var för sig ersätts med antingen multiplikation eller division?",
    options: [
      "10^0",
      "10^4",
      "10^6",
      "10^10"
    ],
    correct: 3,
    solution:
      "Störst blir B om båda rutorna är multiplikation: 10^(5+2) · 10^3 = 10^10.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 10,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-33",
    delprov: "XYZ",
    area: "bråk",
    prompt:
      "Vad är (1/3 + 1/4) / (2 + 1/5)?",
    options: [
      "35/132",
      "7/24",
      "5/12",
      "132/35"
    ],
    correct: 0,
    solution:
      "1/3 + 1/4 = 7/12. 2 + 1/5 = 11/5. (7/12) / (11/5) = (7/12) · (5/11) = 35/132.",
    twinOf: {
      prov: "2019-10-20",
      provpass: 4,
      uppgift: 11,
      url: HOSTEN_2019_URL
    }
  },
  {
    id: "xyz2-34",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Vilket värde har x om x/3 + 1/4 + 1 = 2?",
    options: [
      "3/4",
      "9/4",
      "3",
      "9"
    ],
    correct: 1,
    solution:
      "x/3 = 2 - 1 - 1/4 = 3/4. Då är x = 3 · 3/4 = 9/4.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 1,
      uppgift: 1,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-35",
    delprov: "XYZ",
    area: "aritmetik",
    prompt:
      "Vad är 4 + 2√9 - 5 · 3 + 7^2?",
    options: [
      "32",
      "38",
      "44",
      "50"
    ],
    correct: 2,
    solution:
      "2√9 = 6 och 7^2 = 49. 4 + 6 - 15 + 49 = 44.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 1,
      uppgift: 3,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-36",
    delprov: "XYZ",
    area: "räta linjen",
    prompt:
      "Vilket svarsalternativ motsvarar ekvationen y = 5x - 3?",
    options: [
      "x = 5y + 3",
      "x = 5(y + 3)",
      "x = (y - 3)/5",
      "x = (y + 3)/5"
    ],
    correct: 3,
    solution:
      "y = 5x - 3 ger y + 3 = 5x, alltså x = (y + 3)/5.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 1,
      uppgift: 4,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-37",
    delprov: "XYZ",
    area: "sannolikhet",
    prompt:
      "I en påse finns det 36 enfärgade kulor: 15 röda, 9 vita och 12 svarta. Om man drar en kula slumpmässigt, hur stor är sannolikheten att den inte är röd?",
    options: [
      "7/12",
      "5/12",
      "3/4",
      "5/9"
    ],
    correct: 0,
    solution:
      "Kulor som inte är röda: 36 - 15 = 21. Sannolikheten är 21/36 = 7/12.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 1,
      uppgift: 8,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-38",
    delprov: "XYZ",
    area: "ekvationer",
    prompt:
      "Vilket värde har x om 3x + 11 = 5 - x?",
    options: [
      "-1/2",
      "-3/2",
      "1/2",
      "3/2"
    ],
    correct: 1,
    solution:
      "3x + x = 5 - 11 ger 4x = -6, alltså x = -3/2.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 1,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-39",
    delprov: "XYZ",
    area: "bråk",
    prompt:
      "Vad är 1/6 + 2/3 + 1/4?",
    options: [
      "11/12",
      "7/6",
      "13/12",
      "5/4"
    ],
    correct: 2,
    solution:
      "Gemensam nämnare 12: 2/12 + 8/12 + 3/12 = 13/12.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 2,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-40",
    delprov: "XYZ",
    area: "räta linjen",
    prompt:
      "Grafen till funktionen f är en rät linje som går genom origo, och f(-4) = 10. Vilket svarsalternativ anger f(x)?",
    options: [
      "f(x) = 5/2 x",
      "f(x) = 2/5 x",
      "f(x) = -2/5 x",
      "f(x) = -5/2 x"
    ],
    correct: 3,
    solution:
      "En rät linje genom origo har formen f(x) = kx. f(-4) = -4k = 10 ger k = -5/2, alltså f(x) = -5/2 x.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 4,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-41",
    delprov: "XYZ",
    area: "procent",
    prompt:
      "Vilket är det ursprungliga priset på en vara om en rabatt på 12 procent gör varan 900 kronor billigare?",
    options: [
      "7500 kronor",
      "6300 kronor",
      "7200 kronor",
      "10800 kronor"
    ],
    correct: 0,
    solution:
      "12 % av priset är 900 kr, så priset är 900 / 0,12 = 7500 kr.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 5,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-42",
    delprov: "XYZ",
    area: "hastighet",
    prompt:
      "Nils målar ett staket med konstant hastighet. Efter 3,5 timmar har han målat 2/5 av staketet. Hur lång tid tar det för Nils att måla resten av staketet?",
    options: [
      "4,5 timmar",
      "5,25 timmar",
      "5 timmar",
      "5,5 timmar"
    ],
    correct: 1,
    solution:
      "3,5 timmar motsvarar 2/5 av arbetet, så hela staketet tar 3,5 / (2/5) = 8,75 timmar. Återstående 3/5 tar 8,75 · 3/5 = 5,25 timmar.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 6,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-43",
    delprov: "XYZ",
    area: "statistik",
    prompt:
      "Vilket svarsalternativ är med säkerhet lika med medelvärdet av de fem talen 9, 14, 11, x och 20?",
    options: [
      "(44 + x)/5",
      "54 + x",
      "(54 + x)/5",
      "(x + 5)/54"
    ],
    correct: 2,
    solution:
      "Summan av talen är 9+14+11+20+x = 54+x. Medelvärdet av fem tal är summan delat med 5: (54+x)/5.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 9,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-44",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "En cylinder har volymen 100 liter och diametern 5 dm. Vilket svarsalternativ är närmast cylinderns höjd?",
    options: [
      "4 dm",
      "8 dm",
      "13 dm",
      "5 dm"
    ],
    correct: 3,
    solution:
      "Volym = πr^2h med r = 2,5 dm. h = 100 / (π · 2,5^2) ≈ 5,09 dm, vilket är närmast 5 dm.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 11,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-45",
    delprov: "XYZ",
    area: "potenser",
    prompt:
      "9^(3 - 2m) = 27^2. Vad är m?",
    options: [
      "0",
      "-1",
      "1",
      "2"
    ],
    correct: 0,
    solution:
      "9 = 3^2 och 27 = 3^3, så 3^(2(3-2m)) = 3^6. Då är 2(3-2m) = 6, alltså 3 - 2m = 3 och m = 0.",
    twinOf: {
      prov: "2021-10-24",
      provpass: 4,
      uppgift: 12,
      url: HOSTEN_2021_URL
    }
  },
  {
    id: "xyz2-46",
    delprov: "XYZ",
    area: "bråk",
    prompt:
      "Vad är 5/8 - 1/4 + 5/8?",
    options: [
      "3/4",
      "1",
      "5/4",
      "3/2"
    ],
    correct: 1,
    solution:
      "5/8 - 2/8 + 5/8 = 8/8 = 1.",
    twinOf: {
      prov: "2022-05-07",
      provpass: 1,
      uppgift: 3,
      url: VAREN_2022_MAJ_URL
    }
  },
  {
    id: "xyz2-47",
    delprov: "XYZ",
    area: "statistik",
    prompt:
      "Vad är medelvärdet av 1/4 och 1/6?",
    options: [
      "1/5",
      "1/12",
      "5/24",
      "5/12"
    ],
    correct: 2,
    solution:
      "Medelvärdet är (1/4 + 1/6) / 2 = (3/12 + 2/12) / 2 = (5/12) / 2 = 5/24.",
    twinOf: {
      prov: "2022-05-07",
      provpass: 1,
      uppgift: 6,
      url: VAREN_2022_MAJ_URL
    }
  },
  {
    id: "xyz2-48",
    delprov: "XYZ",
    area: "geometri",
    prompt:
      "En kvadrat har lika stor area som en rektangel med basen y cm och höjden (4/9)y cm. Vilket svarsalternativ motsvarar kvadratens sidlängd?",
    options: [
      "(4/9)y cm",
      "(2/9)y cm",
      "(4/3)y cm",
      "(2/3)y cm"
    ],
    correct: 3,
    solution:
      "Rektangelns area är y · (4/9)y = (4/9)y^2. Kvadratens sida s uppfyller s^2 = (4/9)y^2, alltså s = (2/3)y.",
    twinOf: {
      prov: "2022-05-07",
      provpass: 1,
      uppgift: 7,
      url: VAREN_2022_MAJ_URL
    }
  },
  {
    id: "xyz2-49",
    delprov: "XYZ",
    area: "räta linjen",
    prompt:
      "Linjen L har ekvationen y = (3/4)x - 2. Vilket svarsalternativ anger en punkt på L?",
    options: [
      "(4, 1)",
      "(0, 2)",
      "(-4, -4)",
      "(8, 3)"
    ],
    correct: 0,
    solution:
      "För x = 4 är y = (3/4)·4 - 2 = 3 - 2 = 1, så (4, 1) ligger på L. De övriga punkterna uppfyller inte ekvationen.",
    twinOf: {
      prov: "2022-05-07",
      provpass: 1,
      uppgift: 11,
      url: VAREN_2022_MAJ_URL
    }
  },
  {
    id: "xyz2-50",
    delprov: "XYZ",
    area: "hastighet",
    prompt:
      "Det tar 9 sekunder för Wilma att springa y meter. Hur många sekunder tar det för henne att springa x meter med samma medelhastighet?",
    options: [
      "9y/x",
      "9x/y",
      "x/(9y)",
      "y/(9x)"
    ],
    correct: 1,
    solution:
      "Hastigheten är y/9 meter per sekund. Tiden för x meter är x / (y/9) = 9x/y.",
    twinOf: {
      prov: "2022-05-07",
      provpass: 1,
      uppgift: 12,
      url: VAREN_2022_MAJ_URL
    }
  },
];
