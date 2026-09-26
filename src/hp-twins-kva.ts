import type { HpTwin } from "./hp-twins";

// Fler KVA-tvillingar. id-prefix: "kva2-".
// Källa (facit och provhäften i PDF, hämtade och extraherade med curl + pypdf):
// https://www.studera.nu/hogskoleprov/om/forbereda/tidigare/
// Egna uppgifter inspirerade av UHR:s provhäften — samma typ, idé, upplägg och
// ungefärlig svårighetsgrad som originalet, men egen formulering och nya
// siffror/storheter. Inga UHR-texter, siffror eller alternativ återges.

const KVA_OPTIONS = [
  "I är större än II",
  "II är större än I",
  "I är lika med II",
  "Informationen är otillräcklig"
];

const VAREN_2019_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/";
const HOSTEN_2020_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/";
const HOSTEN_2021_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2021-24-oktober/";
const VAREN_2022_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2022-7-maj/";

export const HP_TWINS_KVA: HpTwin[] = [
  {
    id: "kva2-01",
    delprov: "KVA",
    area: "procent",
    prompt:
      "Maja använder 40 procent av sin veckopeng till klistermärken. Leo använder 25 procent av sin veckopeng till klistermärken. Den ena av dem köper klistermärken för 60 kr mer än den andra.\n\nKvantitet I: Summan som Maja köper klistermärken för\nKvantitet II: Summan som Leo köper klistermärken för",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Vi vet bara att beloppen skiljer 60 kr åt, inte vem som lägger mest. Om Majas veckopeng är 100 kr (40 kr på klistermärken) och Leos är 400 kr (100 kr på klistermärken) skiljer det 60 kr och Leo lägger mest. Men om Majas veckopeng istället är 250 kr (100 kr) och Leos 160 kr (40 kr) skiljer det också 60 kr, fast då lägger Maja mest. Båda fallen är möjliga, så informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 13, url: VAREN_2019_URL }
  },
  {
    id: "kva2-02",
    delprov: "KVA",
    area: "algebra",
    prompt: "n är ett positivt heltal.\nk är ett heltal.\n\nKvantitet I: n\nKvantitet II: nk",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa k = 1: nk = n, alltså lika. Testa k = 0: nk = 0 < n, Kvantitet I störst. Testa k = 3: nk = 3n > n, Kvantitet II störst. Eftersom k kan vara vilket heltal som helst går det inte att avgöra vilken kvantitet som är störst. Informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 14, url: VAREN_2019_URL }
  },
  {
    id: "kva2-03",
    delprov: "KVA",
    area: "funktioner",
    prompt: "g(x) = x² − 4x + 1\n\nKvantitet I: g(0)\nKvantitet II: g(3)",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "g(0) = 0 − 0 + 1 = 1. g(3) = 9 − 12 + 1 = −2. Kvantitet I (1) är större än Kvantitet II (−2).",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 15, url: VAREN_2019_URL }
  },
  {
    id: "kva2-04",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "I en viss parallellogram är vinkeln i ett av hörnen 64°.\n\nKvantitet I: Vinkeln i ett av de andra hörnen i parallellogrammen\nKvantitet II: 120°",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "I en parallellogram är motstående vinklar lika stora och angränsande vinklar summerar till 180°. De andra hörnenas vinklar är alltså antingen 64° eller 180° − 64° = 116°. Båda dessa värden är mindre än 120°, så oavsett vilket hörn som avses är Kvantitet II större.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 16, url: VAREN_2019_URL }
  },
  {
    id: "kva2-05",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Medelvärdet av tio på varandra följande heltal är 21,5.\n\nKvantitet I: Hälften av det största av de tio heltalen\nKvantitet II: Det minsta av de tio heltalen",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om det minsta talet är a är talen a, a+1, …, a+9, med medelvärde a + 4,5 = 21,5, alltså a = 17. Det största talet är 26, och hälften av det är 13. Kvantitet II (17) är större än Kvantitet I (13).",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 19, url: VAREN_2019_URL }
  },
  {
    id: "kva2-06",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "s är summan av alla heltal x sådana att 0 < x < 7.\np är produkten av alla primtal y sådana att 2 < y < 8.\n\nKvantitet I: s\nKvantitet II: p",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "s = 1 + 2 + 3 + 4 + 5 + 6 = 21. Primtalen mellan 2 och 8 är 3, 5 och 7, så p = 3 · 5 · 7 = 105. Kvantitet II är större.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 22, url: VAREN_2019_URL }
  },
  {
    id: "kva2-07",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Punkterna A = (1, 2), B = (3, 5) och C = (3, −9) är inritade i ett koordinatsystem.\n\nKvantitet I: Avståndet mellan A och B\nKvantitet II: Avståndet mellan A och C",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Avstånd A–B: √((3−1)² + (5−2)²) = √(4+9) = √13 ≈ 3,6. Avstånd A–C: √((3−1)² + (−9−2)²) = √(4+121) = √125 ≈ 11,2. Kvantitet II är större.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 15, url: VAREN_2019_URL }
  },
  {
    id: "kva2-08",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Mätserie x: 9, 12, 18\nMätserie y: 8, 10, 11, 25\n\nKvantitet I: Medianen i mätserie x\nKvantitet II: Medianen i mätserie y",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Mätserie x har redan tre värden i storleksordning, så medianen är mittenvärdet 12. Mätserie y har fyra värden i storleksordning 8, 10, 11, 25, så medianen är medelvärdet av de två mittersta: (10+11)/2 = 10,5. Kvantitet I är större.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 17, url: VAREN_2019_URL }
  },
  {
    id: "kva2-09",
    delprov: "KVA",
    area: "potenser",
    prompt: "n är ett positivt heltal.\n\nKvantitet I: Entalssiffran i talet 9ⁿ\nKvantitet II: 5",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "9¹ = 9, 9² = 81, 9³ = 729, 9⁴ = 6 561 … Entalssiffran växlar mellan 9 (udda n) och 1 (jämna n) och blir aldrig 5. Är n udda är entalssiffran 9, som är större än 5 (Kvantitet I störst); är n jämnt är entalssiffran 1, som är mindre än 5 (Kvantitet II störst). Informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 18, url: VAREN_2019_URL }
  },
  {
    id: "kva2-10",
    delprov: "KVA",
    area: "algebra",
    prompt: "a > b\nb < 0\n\nKvantitet I: a²\nKvantitet II: b²",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa a = 1, b = −5: a² = 1, b² = 25, Kvantitet II störst. Testa a = 10, b = −1: a² = 100, b² = 1, Kvantitet I störst. Båda fallen uppfyller villkoren a > b och b < 0, så informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 20, url: VAREN_2019_URL }
  },
  {
    id: "kva2-11",
    delprov: "KVA",
    area: "hastighet",
    prompt:
      "Det tar 20 minuter för 8 likadana kranar att tillsammans fylla en bassäng med 4 m³ vatten.\n\nKvantitet I: Den tid det tar för 12 likadana kranar att tillsammans fylla en bassäng med 9 m³ vatten\nKvantitet II: 25 minuter",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "En kran fyller 4/(8·20) = 1/40 m³ per minut. 12 kranar fyller tillsammans 12/40 = 0,3 m³ per minut. Tiden för 9 m³ blir 9/0,3 = 30 minuter. Kvantitet I (30 minuter) är större än Kvantitet II (25 minuter).",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 21, url: VAREN_2019_URL }
  },
  {
    id: "kva2-12",
    delprov: "KVA",
    area: "bråk",
    prompt: "Kvantitet I: 3/8 + 5/8\nKvantitet II: 1",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "3/8 + 5/8 = 8/8 = 1. Kvantiteterna är lika.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 13, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-13",
    delprov: "KVA",
    area: "sannolikhet",
    prompt:
      "Tre vanliga sexsidiga tärningar kastas slumpmässigt en gång.\n\nKvantitet I: Sannolikheten att få tre sexor\nKvantitet II: Sannolikheten att summan av det tärningarna visar är 16",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "P(tre sexor) = (1/6)³ = 1/216. Summan 16 kan fås genom kombinationerna 4+6+6 och 5+5+6, som vardera kan ordnas på 3 sätt, alltså 6 utfall av 216, det vill säga 6/216 = 1/36. Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 14, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-14",
    delprov: "KVA",
    area: "bråk",
    prompt:
      "4 nypor motsvarar 1 tesked.\n3 teskedar motsvarar 1 matsked.\n\nKvantitet I: 5 nypor och 2 matskedar\nKvantitet II: 3 teskedar och 20 nypor",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Omvandla allt till nypor: 1 tesked = 4 nypor och 1 matsked = 3 teskedar = 12 nypor. Kvantitet I: 5 + 2·12 = 29 nypor. Kvantitet II: 3 teskedar (12 nypor) + 20 nypor = 32 nypor. Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 17, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-15",
    delprov: "KVA",
    area: "algebra",
    prompt: "p < q < r\n\nKvantitet I: (p + r)/2\nKvantitet II: (p + q + r)/3",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa p=1, q=2, r=3: Kvantitet I = 2, Kvantitet II = 2 — lika. Testa p=1, q=1,9, r=3: Kvantitet I = 2, Kvantitet II ≈ 1,97 — Kvantitet I störst. Testa p=1, q=2,9, r=3: Kvantitet II ≈ 2,30 — Kvantitet II störst. Eftersom resultatet beror på var q ligger mellan p och r är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 18, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-16",
    delprov: "KVA",
    area: "geometri",
    prompt: "Omkretsen av en cirkel är 18π cm.\n\nKvantitet I: Cirkelns radie\nKvantitet II: 8 cm",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Omkrets = 2πr, så 18π = 2πr ger r = 9 cm. Kvantitet I (9 cm) är större än Kvantitet II (8 cm).",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 19, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-17",
    delprov: "KVA",
    area: "potenser",
    prompt: "Kvantitet I: 64^(1/3)\nKvantitet II: 4",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "64^(1/3) = 4, eftersom 4³ = 64. Kvantiteterna är lika.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 20, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-18",
    delprov: "KVA",
    area: "procent",
    prompt:
      "x, y och z är positiva tal.\nx procent av y är lika med 84.\nx procent av z är lika med 42.\n\nKvantitet I: y\nKvantitet II: z",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Eftersom x procent av y är dubbelt så stort som x procent av z (84 = 2 · 42), måste y = 2z, oavsett vilket värde x har (så länge x > 0). Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 13, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-19",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "T är en triangel.\n\nKvantitet I: Omkretsen av T dividerad med 3\nKvantitet II: Medelvärdet av sidlängderna för T",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Om triangelns sidor är a, b och c är omkretsen a+b+c, och omkretsen dividerad med 3 är (a+b+c)/3 — vilket per definition också är medelvärdet av de tre sidlängderna. Kvantiteterna är alltid lika.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 14, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-20",
    delprov: "KVA",
    area: "bråk",
    prompt: "Kvantitet I: (2/9) delat med (9/2)\nKvantitet II: (9/2) delat med (2/9)",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "(2/9) ÷ (9/2) = (2/9) · (2/9) = 4/81 ≈ 0,05. (9/2) ÷ (2/9) = (9/2) · (9/2) = 81/4 = 20,25. Kvantitet II är betydligt större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 15, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-21",
    delprov: "KVA",
    area: "algebra",
    prompt:
      "Cornelia är dubbelt så gammal som Erik och Filip tillsammans.\n\nKvantitet I: Cornelias ålder\nKvantitet II: Tre gånger Eriks ålder",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Cornelias ålder = 2 · (Eriks ålder + Filips ålder). Om Erik är 10 år och Filip bara 1 år blir Cornelia 22, vilket är mindre än tre gånger Eriks ålder (30) — Kvantitet II störst. Om Filip istället är 50 år blir Cornelia 120, vilket är mer än 30 — Kvantitet I störst. Eftersom Filips ålder är okänd är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 16, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-22",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Kvadraterna K1 och K2 överlappar varandra så att 30 procent av arean av K1 täcks av K2, medan 15 procent av arean av K2 täcks av K1.\n\nKvantitet I: Arean av K1\nKvantitet II: Arean av K2",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Den överlappande ytan är densamma oavsett vilken kvadrat man utgår från: 0,30 · A(K1) = 0,15 · A(K2). Det ger A(K1)/A(K2) = 0,15/0,30 = 0,5, det vill säga A(K2) = 2 · A(K1). Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 18, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-23",
    delprov: "KVA",
    area: "algebra",
    prompt: "x + y = 0, där x ≠ 0.\n\nKvantitet I: x² + y²\nKvantitet II: x² + 2xy + y²",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Eftersom y = −x blir xy = −x², så Kvantitet II = x² + y² + 2xy = x² + x² − 2x² = 0. Kvantitet I = x² + y² = 2x², vilket alltid är positivt eftersom x ≠ 0. Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 20, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-24",
    delprov: "KVA",
    area: "funktioner",
    prompt:
      "Grafen till funktionen f är en rät linje genom origo.\nb > 0\n\nKvantitet I: f(b)\nKvantitet II: f(−b)",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "En rät linje genom origo har formen f(x) = kx. Om k > 0 är f(b) > 0 > f(−b), så Kvantitet I är störst. Om k < 0 är f(b) < 0 < f(−b), så Kvantitet II är störst. Eftersom riktningskoefficienten k inte anges är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 21, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-25",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "En mätserie består av värdena −8, p, q, 5. Seriens medelvärde är −2.\n\nKvantitet I: p + q\nKvantitet II: −3",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Medelvärdet av fyra tal är −2, så summan av alla fyra är −8. Alltså −8 + p + q + 5 = −8, vilket ger p + q = −5. Kvantitet II (−3) är större än Kvantitet I (−5), eftersom −3 ligger till höger om −5 på tallinjen.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 22, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-26",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Medelvärdet av de tre talen x, y och z är 15. Summan av y och z är 22.\n\nKvantitet I: x\nKvantitet II: 14",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Summan av alla tre tal är 3 · 15 = 45. Då är x = 45 − 22 = 23. Kvantitet I (23) är större än Kvantitet II (14).",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 13, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-27",
    delprov: "KVA",
    area: "algebra",
    prompt: "a > 0\nb < 0\nc > 0\nd < 0\n\nKvantitet I: a² + b²\nKvantitet II: c² + d²",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa a=1, b=−1, c=5, d=−5: Kvantitet I = 2, Kvantitet II = 50 — Kvantitet II störst. Testa a=5, b=−5, c=1, d=−1: Kvantitet I = 50, Kvantitet II = 2 — Kvantitet I störst. Eftersom talens storlekar inte begränsas av villkoren är informationen otillräcklig.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 15, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-28",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Kvantitet I: Arean av en rektangel med sidorna 14 cm och 18 cm\nKvantitet II: Arean av en rätvinklig triangel med kateterna 9 cm och 50 cm",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Rektangelns area: 14 · 18 = 252 cm². Triangelns area: (9 · 50)/2 = 225 cm². Kvantitet I är större.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 16, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-29",
    delprov: "KVA",
    area: "procent",
    prompt: "Kvantitet I: 65 procent av 120\nKvantitet II: 78",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "65 % av 120 = 0,65 · 120 = 78. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 19, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-30",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "F(n) definieras som summan av alla positiva heltal mindre än n.\nG(n) definieras som summan av alla jämna positiva heltal mindre än n.\n\nKvantitet I: F(9)\nKvantitet II: G(9) delat med 2",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "F(9) = 1+2+3+4+5+6+7+8 = 36. De jämna heltalen mindre än 9 är 2, 4, 6 och 8, så G(9) = 20, och G(9)/2 = 10. Kvantitet I är större.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 20, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-31",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Kvantitet I: Kvoten mellan en cirkels omkrets och dess diameter\nKvantitet II: Kvoten mellan en kvadrats omkrets och dess sidlängd",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "För vilken cirkel som helst är kvoten mellan omkrets och diameter alltid π ≈ 3,14. För vilken kvadrat som helst är kvoten mellan omkrets och sidlängd alltid 4. Eftersom π < 4 är Kvantitet II alltid större, oavsett storleken på cirkeln eller kvadraten.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 21, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-32",
    delprov: "KVA",
    area: "procent",
    prompt:
      "En grupp med enbart kvinnor och män består av totalt 90 personer. Var och en av personerna är antingen högerhänt eller vänsterhänt. 70 % av kvinnorna är högerhänta. 9 kvinnor är vänsterhänta.\n\nKvantitet I: Antalet kvinnor i gruppen\nKvantitet II: Antalet män i gruppen",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om 70 % av kvinnorna är högerhänta är 30 % vänsterhänta. De 9 vänsterhänta kvinnorna utgör alltså 30 % av alla kvinnor, så antalet kvinnor är 9/0,30 = 30. Då är antalet män 90 − 30 = 60. Kvantitet II är större.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 15, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-33",
    delprov: "KVA",
    area: "bråk",
    prompt: "y > 0\nx = 6y\n\nKvantitet I: y\nKvantitet II: En sjättedel av x",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "En sjättedel av x = x/6 = 6y/6 = y. Kvantiteterna är alltid lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 17, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-34",
    delprov: "KVA",
    area: "räta linjen",
    prompt:
      "Linjen L1 har ekvationen y = 2x + 5\nLinjen L2 har ekvationen y = −3x + 5\n\nKvantitet I: x-koordinaten för skärningspunkten mellan L1 och L2\nKvantitet II: 0",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "Vid skärningspunkten gäller 2x + 5 = −3x + 5, det vill säga 5x = 0, så x = 0. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 18, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-35",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "x och y är två på varandra följande positiva heltal sådana att y² − x² = 15.\n\nKvantitet I: y\nKvantitet II: 8",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Eftersom y = x + 1 kan vi skriva y² − x² = (y−x)(y+x) = 1 · (2x+1) = 15, vilket ger x = 7 och y = 8. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 20, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-36",
    delprov: "KVA",
    area: "algebra",
    prompt:
      "I Sixtens necessär finns det pennor, suddgummin och linjaler. Suddgummin är dubbelt så många som linjalerna. Pennorna är 4 fler än linjalerna och 3 färre än suddgummin.\n\nKvantitet I: Antalet pennor i Sixtens necessär\nKvantitet II: 11",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Låt antalet linjaler vara r. Då är suddgummin 2r och pennorna både r + 4 och 2r − 3. Alltså r + 4 = 2r − 3, vilket ger r = 7. Antalet pennor är 7 + 4 = 11. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 21, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-37",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "En mätserie består av tolv mätvärden. Vart och ett av mätvärdena är ett heltal mellan 1 och 60. Mätseriens median är 30.\n\nKvantitet I: Mätseriens median om det minsta mätvärdet tas bort\nKvantitet II: 30",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Med tolv värden är medianen medelvärdet av det sjätte och sjunde värdet i storleksordning. Serien 1,1,1,1,1,29,31,60,60,60,60,60 har median (29+31)/2 = 30; tas det minsta värdet bort blir de elva kvarvarande 1,1,1,1,29,31,60,60,60,60,60 med median (sjätte värdet) 31 — större än 30. Med serien 1,29,29,29,29,30,30,31,31,31,31,60 är medianen också 30, men tar man bort det minsta värdet (1) blir den nya medianen fortfarande 30. Eftersom resultatet beror på hur värdena är fördelade är informationen otillräcklig.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 22, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-38",
    delprov: "KVA",
    area: "procent",
    prompt: "Kvantitet I: 5 procent av 240\nKvantitet II: En tredjedel av 36",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "5 % av 240 = 0,05 · 240 = 12. En tredjedel av 36 = 36/3 = 12. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 13, url: VAREN_2022_URL }
  },
  {
    id: "kva2-39",
    delprov: "KVA",
    area: "funktioner",
    prompt: "h(x) = 5x − 2\n\nKvantitet I: h(2) − h(6)\nKvantitet II: h(−1) − h(3)",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "h(2) − h(6) = (5·2−2) − (5·6−2) = 8 − 28 = −20. h(−1) − h(3) = (5·(−1)−2) − (5·3−2) = −7 − 13 = −20. Kvantiteterna är lika, eftersom skillnaden mellan x-värdena är densamma i båda fallen (2−6 = −4 och −1−3 = −4) och h är en linjär funktion.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 15, url: VAREN_2022_URL }
  },
  {
    id: "kva2-40",
    delprov: "KVA",
    area: "bråk",
    prompt: "Kvantitet I: 1/4 + 1/12 + 1/6\nKvantitet II: 1/2",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "Gemensam nämnare 12: 1/4 = 3/12, 1/12 = 1/12, 1/6 = 2/12. Summan blir 3/12+1/12+2/12 = 6/12 = 1/2. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 16, url: VAREN_2022_URL }
  },
  {
    id: "kva2-41",
    delprov: "KVA",
    area: "algebra",
    prompt: "m < 0\nn < 1\n\nKvantitet I: m²\nKvantitet II: m² · n",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "m² är alltid positivt eftersom m ≠ 0 (m < 0). Eftersom n < 1 är m² · n alltid mindre än m² · 1 = m², oavsett om n är positivt, noll eller negativt (m²(1−n) > 0 då 1−n > 0). Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 19, url: VAREN_2022_URL }
  },
  {
    id: "kva2-42",
    delprov: "KVA",
    area: "sannolikhet",
    prompt:
      "En burk innehåller endast enfärgade röda och gröna kulor. Antalet gröna kulor är sju gånger så stort som antalet röda kulor.\n\nKvantitet I: Sannolikheten att en slumpmässigt vald kula ur burken är röd\nKvantitet II: 1/6",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om antalet röda kulor är r är antalet gröna 7r, och totalt finns 8r kulor. Sannolikheten att en slumpmässigt vald kula är röd blir r/8r = 1/8. Eftersom 1/8 < 1/6 är Kvantitet II större.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 20, url: VAREN_2022_URL }
  },
  {
    id: "kva2-43",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "x och y är heltal sådana att 20 < x < 30 och 20 < y < 30. x är inte jämnt delbart med vare sig 2 eller 3. y är jämnt delbart med 5.\n\nKvantitet I: Antalet olika tal som x kan vara\nKvantitet II: Antalet olika tal som y kan vara",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Heltalen mellan 20 och 30 är 21–29. De som varken är delbara med 2 eller 3 är 23, 25 och 29 — tre tal. De som är delbara med 5 är bara 25 — ett tal. Kvantitet I (3) är större än Kvantitet II (1).",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 21, url: VAREN_2022_URL }
  },
  {
    id: "kva2-44",
    delprov: "KVA",
    area: "aritmetik",
    prompt: "Kvantitet I: 500 000 cm\nKvantitet II: 5 km",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "500 000 cm = 5 000 m = 5 km. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 13, url: VAREN_2022_URL }
  },
  {
    id: "kva2-45",
    delprov: "KVA",
    area: "bråk",
    prompt: "Kvantitet I: 1/4 − 1/6\nKvantitet II: 0",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "1/4 − 1/6 = 3/12 − 2/12 = 1/12, vilket är större än 0. Kvantitet I är större.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 14, url: VAREN_2022_URL }
  },
  {
    id: "kva2-46",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "En mätserie består av de fem positiva heltalen 9, 3, b, 11 och 6.\n\nKvantitet I: Mätseriens median\nKvantitet II: 6",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "De fyra kända talen sorterade är 3, 6, 9, 11. Är b ≤ 6 blir medianen (mittenvärdet av fem tal) 6, alltså lika med Kvantitet II. Är b t.ex. 7 blir den sorterade serien 3, 6, 7, 9, 11 och medianen 7, som är större än 6. Eftersom b är okänt kan medianen bli antingen lika med eller större än 6, så informationen är otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 15, url: VAREN_2022_URL }
  },
  {
    id: "kva2-47",
    delprov: "KVA",
    area: "geometri",
    prompt: "Summan av två sidor i en triangel är 21 cm.\n\nKvantitet I: Längden av den tredje sidan\nKvantitet II: 19 cm",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Enligt triangelolikheten måste den tredje sidan vara kortare än summan av de andra två sidorna (21 cm), men hur kort beror på hur de 21 cm fördelas mellan de två kända sidorna. Med sidorna 10,5 cm och 10,5 cm kan tredje sidan vara t.ex. 5 cm (mindre än 19). Med sidorna 1 cm och 20 cm måste tredje sidan vara mellan 19 och 21 cm, t.ex. 20 cm (mer än 19). Eftersom tredje sidan kan vara både mindre och större än 19 cm är informationen otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 17, url: VAREN_2022_URL }
  },
  {
    id: "kva2-48",
    delprov: "KVA",
    area: "algebra",
    prompt: "p < q\n\nKvantitet I: p + q\nKvantitet II: p − q",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Skillnaden mellan kvantiteterna är (p+q) − (p−q) = 2q. Testa p=−3, q=5 (q>0): 2 mot −8, Kvantitet I störst. Testa p=−7, q=−2 (q<0): −9 mot −5, Kvantitet II störst. Eftersom tecknet på q inte är känt är informationen otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 19, url: VAREN_2022_URL }
  },
  {
    id: "kva2-49",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Fyra cirklar har radierna 6 cm, 9 cm, 12 cm respektive 18 cm.\n\nKvantitet I: Den sammanlagda arean av den minsta och den största cirkeln\nKvantitet II: Den sammanlagda arean av de två mellanstora cirklarna",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Areorna är proportionella mot kvadraten på radien. Minsta + största: 6² + 18² = 36 + 324 = 360. De två mellanstora: 9² + 12² = 81 + 144 = 225. Eftersom 360 > 225 är Kvantitet I större, oavsett vilket tal π multipliceras med.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 20, url: VAREN_2022_URL }
  },
  {
    id: "kva2-50",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Kvantitet I: Summan av de olika primtalsfaktorerna i heltalet 42\nKvantitet II: Summan av de olika primtalsfaktorerna i heltalet 55",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "42 = 2 · 3 · 7, så summan av primtalsfaktorerna är 2+3+7 = 12. 55 = 5 · 11, så summan är 5+11 = 16. Kvantitet II är större.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 22, url: VAREN_2022_URL }
  }
];
