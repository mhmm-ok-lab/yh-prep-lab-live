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
    hint: "Procent av olika veckopengar går inte att jämföra rakt av. Fråga dig om det som ges verkligen styr vem som lägger mest, och testa två olika veckopengar som passar.",
    delprov: "KVA",
    area: "procent",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nMaja använder 40 procent av sin veckopeng till klistermärken. Leo använder 25 procent av sin veckopeng till klistermärken. Den ena av dem köper klistermärken för 60 kr mer än den andra.\n\nKvantitet I: Summan som Maja köper klistermärken för\nKvantitet II: Summan som Leo köper klistermärken för",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Vi vet bara att beloppen skiljer 60 kr åt, inte vem som lägger mest. Om Majas veckopeng är 100 kr (40 kr på klistermärken) och Leos är 400 kr (100 kr på klistermärken) skiljer det 60 kr och Leo lägger mest. Men om Majas veckopeng istället är 250 kr (100 kr) och Leos 160 kr (40 kr) skiljer det också 60 kr, fast då lägger Maja mest. Båda fallen är möjliga, så informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 13, url: VAREN_2019_URL }
  },
  {
    id: "kva2-02",
    hint: "Ett heltal kan vara positivt, noll eller negativt. Pröva k = 0, k = 1 och ett större k och se om utfallet ändras.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nn är ett positivt heltal.\nk är ett heltal.\n\nKvantitet I: n\nKvantitet II: nk",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa k = 1: nk = n, alltså lika. Testa k = 0: nk = 0 < n, Kvantitet I störst. Testa k = 3: nk = 3n > n, Kvantitet II störst. Eftersom k kan vara vilket heltal som helst går det inte att avgöra vilken kvantitet som är störst. Informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 14, url: VAREN_2019_URL }
  },
  {
    id: "kva2-03",
    hint: "Sätt bara in värdena i funktionen en i taget och jämför talen. Ta hand om minustecknen noga.",
    delprov: "KVA",
    area: "funktioner",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\ng(x) = x² − 4x + 1\n\nKvantitet I: g(0)\nKvantitet II: g(3)",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "g(0) = 0 − 0 + 1 = 1. g(3) = 9 − 12 + 1 = −2. Kvantitet I (1) är större än Kvantitet II (−2).",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 15, url: VAREN_2019_URL }
  },
  {
    id: "kva2-04",
    hint: "Rita parallellogrammen. Vilka vinklar är lika, och vilka ska tillsammans bli 180°? Lista alla möjliga hörnvinklar innan du jämför.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nI en viss parallellogram är vinkeln i ett av hörnen 64°.\n\nKvantitet I: Vinkeln i ett av de andra hörnen i parallellogrammen\nKvantitet II: 120°",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "I en parallellogram är motstående vinklar lika stora och angränsande vinklar summerar till 180°. De andra hörnenas vinklar är alltså antingen 64° eller 180° − 64° = 116°. Båda dessa värden är mindre än 120°, så oavsett vilket hörn som avses är Kvantitet II större.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 16, url: VAREN_2019_URL }
  },
  {
    id: "kva2-05",
    hint: "Tänk på hur tio på varandra följande heltal ser ut: det minsta talet plus 0 till 9. Hitta först det minsta talet via medelvärdet.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nMedelvärdet av tio på varandra följande heltal är 21,5.\n\nKvantitet I: Hälften av det största av de tio heltalen\nKvantitet II: Det minsta av de tio heltalen",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om det minsta talet är a är talen a, a+1, …, a+9, med medelvärde a + 4,5 = 21,5, alltså a = 17. Det största talet är 26, och hälften av det är 13. Kvantitet II (17) är större än Kvantitet I (13).",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 19, url: VAREN_2019_URL }
  },
  {
    id: "kva2-06",
    hint: "Skriv ut vilka tal och vilka primtal som ingår innan du räknar. Kom ihåg att 1 inte är ett primtal och att gränserna är strikta.",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\ns är summan av alla heltal x sådana att 0 < x < 7.\np är produkten av alla primtal y sådana att 2 < y < 8.\n\nKvantitet I: s\nKvantitet II: p",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "s = 1 + 2 + 3 + 4 + 5 + 6 = 21. Primtalen mellan 2 och 8 är 3, 5 och 7, så p = 3 · 5 · 7 = 105. Kvantitet II är större.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 22, url: VAREN_2019_URL }
  },
  {
    id: "kva2-07",
    hint: "Rita punkterna i ett koordinatsystem. Du behöver inte räkna ut avstånden exakt, bara se vilket avstånd som är längre.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nPunkterna A = (1, 2), B = (3, 5) och C = (3, −9) är inritade i ett koordinatsystem.\n\nKvantitet I: Avståndet mellan A och B\nKvantitet II: Avståndet mellan A och C",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Avstånd A–B: √((3−1)² + (5−2)²) = √(4+9) = √13 ≈ 3,6. Avstånd A–C: √((3−1)² + (−9−2)²) = √(4+121) = √125 ≈ 11,2. Kvantitet II är större.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 15, url: VAREN_2019_URL }
  },
  {
    id: "kva2-08",
    hint: "Sortera talen i storleksordning först. Med udda antal tal är medianen mitten, med jämnt antal tar du medelvärdet av de två mittersta.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nMätserie x: 9, 12, 18\nMätserie y: 8, 10, 11, 25\n\nKvantitet I: Medianen i mätserie x\nKvantitet II: Medianen i mätserie y",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Mätserie x har redan tre värden i storleksordning, så medianen är mittenvärdet 12. Mätserie y har fyra värden i storleksordning 8, 10, 11, 25, så medianen är medelvärdet av de två mittersta: (10+11)/2 = 10,5. Kvantitet I är större.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 17, url: VAREN_2019_URL }
  },
  {
    id: "kva2-09",
    hint: "Skriv ut de första potenserna och leta efter ett mönster i entalssiffran. Fråga dig om n spelar roll för mönstret.",
    delprov: "KVA",
    area: "potenser",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nn är ett positivt heltal.\n\nKvantitet I: Entalssiffran i talet 9ⁿ\nKvantitet II: 5",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "9¹ = 9, 9² = 81, 9³ = 729, 9⁴ = 6 561 … Entalssiffran växlar mellan 9 (udda n) och 1 (jämna n) och blir aldrig 5. Är n udda är entalssiffran 9, som är större än 5 (Kvantitet I störst); är n jämnt är entalssiffran 1, som är mindre än 5 (Kvantitet II störst). Informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 18, url: VAREN_2019_URL }
  },
  {
    id: "kva2-10",
    hint: "Du får inte veta hur stora talen är. Testa ett par där a är litet och ett par där a är stort, och glöm inte att kvadrater av negativa tal blir positiva.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\na > b\nb < 0\n\nKvantitet I: a²\nKvantitet II: b²",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa a = 1, b = −5: a² = 1, b² = 25, Kvantitet II störst. Testa a = 10, b = −1: a² = 100, b² = 1, Kvantitet I störst. Båda fallen uppfyller villkoren a > b och b < 0, så informationen är otillräcklig.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 20, url: VAREN_2019_URL }
  },
  {
    id: "kva2-11",
    hint: "Räkna ut hur mycket EN kran hinner med på EN minut. Då kan du skala upp till valfritt antal kranar och volym.",
    delprov: "KVA",
    area: "hastighet",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nDet tar 20 minuter för 8 likadana kranar att tillsammans fylla en bassäng med 4 m³ vatten.\n\nKvantitet I: Den tid det tar för 12 likadana kranar att tillsammans fylla en bassäng med 9 m³ vatten\nKvantitet II: 25 minuter",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "En kran fyller 4/(8·20) = 1/40 m³ per minut. 12 kranar fyller tillsammans 12/40 = 0,3 m³ per minut. Tiden för 9 m³ blir 9/0,3 = 30 minuter. Kvantitet I (30 minuter) är större än Kvantitet II (25 minuter).",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 21, url: VAREN_2019_URL }
  },
  {
    id: "kva2-12",
    hint: "Addera bråken med gemensam nämnare och jämför med talet 1. Slarva inte med att läsa vilka bråk det gäller.",
    delprov: "KVA",
    area: "bråk",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 3/8 + 5/8\nKvantitet II: 1",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "3/8 + 5/8 = 8/8 = 1. Kvantiteterna är lika.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 13, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-13",
    hint: "Lista de utfall som ger exakt det önskade. Räkna sedan hur många sätt de kan ordnas på, eftersom tärningarna är olika.",
    delprov: "KVA",
    area: "sannolikhet",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nTre vanliga sexsidiga tärningar kastas slumpmässigt en gång.\n\nKvantitet I: Sannolikheten att få tre sexor\nKvantitet II: Sannolikheten att summan av det tärningarna visar är 16",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "P(tre sexor) = (1/6)³ = 1/216. Summan 16 kan fås genom kombinationerna 4+6+6 och 5+5+6, som vardera kan ordnas på 3 sätt, alltså 6 utfall av 216, det vill säga 6/216 = 1/36. Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 14, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-14",
    hint: "Gör om allt till samma enhet, till exempel den minsta (nypor), innan du jämför.",
    delprov: "KVA",
    area: "bråk",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\n4 nypor motsvarar 1 tesked.\n3 teskedar motsvarar 1 matsked.\n\nKvantitet I: 5 nypor och 2 matskedar\nKvantitet II: 3 teskedar och 20 nypor",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Omvandla allt till nypor: 1 tesked = 4 nypor och 1 matsked = 3 teskedar = 12 nypor. Kvantitet I: 5 + 2·12 = 29 nypor. Kvantitet II: 3 teskedar (12 nypor) + 20 nypor = 32 nypor. Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 17, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-15",
    hint: "Testa konkreta tal som uppfyller p < q < r. Flytta q närmare p och sedan närmare r och se om svaret ändras.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\np < q < r\n\nKvantitet I: (p + r)/2\nKvantitet II: (p + q + r)/3",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa p=1, q=2, r=3: Kvantitet I = 2, Kvantitet II = 2 — lika. Testa p=1, q=1,9, r=3: Kvantitet I = 2, Kvantitet II ≈ 1,97 — Kvantitet I störst. Testa p=1, q=2,9, r=3: Kvantitet II ≈ 2,30 — Kvantitet II störst. Eftersom resultatet beror på var q ligger mellan p och r är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 18, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-16",
    hint: "Börja med formeln för omkrets och lös ut radien. Jämför sedan med 8 utan att behöva räkna med en miniräknare.",
    delprov: "KVA",
    area: "geometri",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nOmkretsen av en cirkel är 18π cm.\n\nKvantitet I: Cirkelns radie\nKvantitet II: 8 cm",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Omkrets = 2πr, så 18π = 2πr ger r = 9 cm. Kvantitet I (9 cm) är större än Kvantitet II (8 cm).",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 19, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-17",
    hint: "Ett bråk i exponenten betyder en rot. Fråga dig vilket tal som multiplicerat med sig själv tre gånger ger basen.",
    delprov: "KVA",
    area: "potenser",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 64^(1/3)\nKvantitet II: 4",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "64^(1/3) = 4, eftersom 4³ = 64. Kvantiteterna är lika.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 20, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-18",
    hint: "Du behöver inte veta x. Jämför de två uppgifterna med varandra och se hur y och z förhåller sig till varandra.",
    delprov: "KVA",
    area: "procent",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nx, y och z är positiva tal.\nx procent av y är lika med 84.\nx procent av z är lika med 42.\n\nKvantitet I: y\nKvantitet II: z",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Eftersom x procent av y är dubbelt så stort som x procent av z (84 = 2 · 42), måste y = 2z, oavsett vilket värde x har (så länge x > 0). Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 13, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-19",
    hint: "Skriv båda kvantiteterna med sidorna a, b och c. Förenkla och se om de blir samma uttryck.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nT är en triangel.\n\nKvantitet I: Omkretsen av T dividerad med 3\nKvantitet II: Medelvärdet av sidlängderna för T",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Om triangelns sidor är a, b och c är omkretsen a+b+c, och omkretsen dividerad med 3 är (a+b+c)/3 — vilket per definition också är medelvärdet av de tre sidlängderna. Kvantiteterna är alltid lika.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 14, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-20",
    hint: "Division med ett bråk är multiplikation med det inverterade bråket. Förenkla båda och uppskatta storleken, är de nära 1, över eller under?",
    delprov: "KVA",
    area: "bråk",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: (2/9) delat med (9/2)\nKvantitet II: (9/2) delat med (2/9)",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "(2/9) ÷ (9/2) = (2/9) · (2/9) = 4/81 ≈ 0,05. (9/2) ÷ (2/9) = (9/2) · (9/2) = 81/4 = 20,25. Kvantitet II är betydligt större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 15, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-21",
    hint: "Översätt meningen till en formel med Erik och Filip som bokstäver. Testa sedan en mycket ung och en mycket gammal Filip.",
    delprov: "KVA",
    area: "algebra",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nCornelia är dubbelt så gammal som Erik och Filip tillsammans.\n\nKvantitet I: Cornelias ålder\nKvantitet II: Tre gånger Eriks ålder",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Cornelias ålder = 2 · (Eriks ålder + Filips ålder). Om Erik är 10 år och Filip bara 1 år blir Cornelia 22, vilket är mindre än tre gånger Eriks ålder (30) — Kvantitet II störst. Om Filip istället är 50 år blir Cornelia 120, vilket är mer än 30 — Kvantitet I störst. Eftersom Filips ålder är okänd är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 16, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-22",
    hint: "Ytan som överlappar är densamma för båda kvadraterna. Skriv den som procent av K1 och som procent av K2 och sätt dem lika.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvadraterna K1 och K2 överlappar varandra så att 30 procent av arean av K1 täcks av K2, medan 15 procent av arean av K2 täcks av K1.\n\nKvantitet I: Arean av K1\nKvantitet II: Arean av K2",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Den överlappande ytan är densamma oavsett vilken kvadrat man utgår från: 0,30 · A(K1) = 0,15 · A(K2). Det ger A(K1)/A(K2) = 0,15/0,30 = 0,5, det vill säga A(K2) = 2 · A(K1). Kvantitet II är större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 18, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-23",
    hint: "Utnyttja villkoret: uttryck y med x. Förenkla båda kvantiteterna och fråga dig om något av dem alltid är noll eller positivt.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nx + y = 0, där x ≠ 0.\n\nKvantitet I: x² + y²\nKvantitet II: x² + 2xy + y²",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Eftersom y = −x blir xy = −x², så Kvantitet II = x² + y² + 2xy = x² + x² − 2x² = 0. Kvantitet I = x² + y² = 2x², vilket alltid är positivt eftersom x ≠ 0. Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 20, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-24",
    hint: "En rät linje genom origo har formen f(x) = kx. Fråga dig om du vet något om k, och testa en positiv och en negativ lutning.",
    delprov: "KVA",
    area: "funktioner",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nGrafen till funktionen f är en rät linje genom origo.\nb > 0\n\nKvantitet I: f(b)\nKvantitet II: f(−b)",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "En rät linje genom origo har formen f(x) = kx. Om k > 0 är f(b) > 0 > f(−b), så Kvantitet I är störst. Om k < 0 är f(b) < 0 < f(−b), så Kvantitet II är störst. Eftersom riktningskoefficienten k inte anges är informationen otillräcklig.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 21, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-25",
    hint: "Medelvärde gånger antal är summan. Räkna ut vilken summa p och q måste ha tillsammans och jämför sedan med talet.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nEn mätserie består av värdena −8, p, q, 5. Seriens medelvärde är −2.\n\nKvantitet I: p + q\nKvantitet II: −3",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Medelvärdet av fyra tal är −2, så summan av alla fyra är −8. Alltså −8 + p + q + 5 = −8, vilket ger p + q = −5. Kvantitet II (−3) är större än Kvantitet I (−5), eftersom −3 ligger till höger om −5 på tallinjen.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 22, url: HOSTEN_2020_URL }
  },
  {
    id: "kva2-26",
    hint: "Medelvärde gånger antal är summan av alla tre. Dra bort det du redan vet och se vad som blir kvar till x.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nMedelvärdet av de tre talen x, y och z är 15. Summan av y och z är 22.\n\nKvantitet I: x\nKvantitet II: 14",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Summan av alla tre tal är 3 · 15 = 45. Då är x = 45 − 22 = 23. Kvantitet I (23) är större än Kvantitet II (14).",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 13, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-27",
    hint: "Villkoren säger bara tecknen, inte storlekarna. Kvadrater blir positiva, så testa små och stora tal i båda leden.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\na > 0\nb < 0\nc > 0\nd < 0\n\nKvantitet I: a² + b²\nKvantitet II: c² + d²",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Testa a=1, b=−1, c=5, d=−5: Kvantitet I = 2, Kvantitet II = 50 — Kvantitet II störst. Testa a=5, b=−5, c=1, d=−1: Kvantitet I = 50, Kvantitet II = 2 — Kvantitet I störst. Eftersom talens storlekar inte begränsas av villkoren är informationen otillräcklig.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 15, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-28",
    hint: "Räkna ut de två areorna med respektive formel. Kom ihåg att triangelns area är bas gånger höjd delat med 2.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: Arean av en rektangel med sidorna 14 cm och 18 cm\nKvantitet II: Arean av en rätvinklig triangel med kateterna 9 cm och 50 cm",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "Rektangelns area: 14 · 18 = 252 cm². Triangelns area: (9 · 50)/2 = 225 cm². Kvantitet I är större.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 16, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-29",
    hint: "Räkna ut procenten, eller skriv om den som decimaltal, och jämför med det andra talet.",
    delprov: "KVA",
    area: "procent",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 65 procent av 120\nKvantitet II: 78",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "65 % av 120 = 0,65 · 120 = 78. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 19, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-30",
    hint: "Skriv ut vilka tal som ingår i summan för F respektive G. Glöm inte att dela G med 2 innan du jämför.",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nF(n) definieras som summan av alla positiva heltal mindre än n.\nG(n) definieras som summan av alla jämna positiva heltal mindre än n.\n\nKvantitet I: F(9)\nKvantitet II: G(9) delat med 2",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "F(9) = 1+2+3+4+5+6+7+8 = 36. De jämna heltalen mindre än 9 är 2, 4, 6 och 8, så G(9) = 20, och G(9)/2 = 10. Kvantitet I är större.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 20, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-31",
    hint: "Det här är kvoter som alltid blir samma tal för alla cirklar respektive kvadrater. Kom ihåg vad dessa tal är och jämför dem.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: Kvoten mellan en cirkels omkrets och dess diameter\nKvantitet II: Kvoten mellan en kvadrats omkrets och dess sidlängd",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "För vilken cirkel som helst är kvoten mellan omkrets och diameter alltid π ≈ 3,14. För vilken kvadrat som helst är kvoten mellan omkrets och sidlängd alltid 4. Eftersom π < 4 är Kvantitet II alltid större, oavsett storleken på cirkeln eller kvadraten.",
    twinOf: { prov: "2021-10-24", provpass: 1, uppgift: 21, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-32",
    hint: "Tänk först på hur stor del av kvinnorna som är vänsterhänta. Använd det för att få fram antalet kvinnor, sedan männen.",
    delprov: "KVA",
    area: "procent",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nEn grupp med enbart kvinnor och män består av totalt 90 personer. Var och en av personerna är antingen högerhänt eller vänsterhänt. 70 % av kvinnorna är högerhänta. 9 kvinnor är vänsterhänta.\n\nKvantitet I: Antalet kvinnor i gruppen\nKvantitet II: Antalet män i gruppen",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om 70 % av kvinnorna är högerhänta är 30 % vänsterhänta. De 9 vänsterhänta kvinnorna utgör alltså 30 % av alla kvinnor, så antalet kvinnor är 9/0,30 = 30. Då är antalet män 90 − 30 = 60. Kvantitet II är större.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 15, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-33",
    hint: "Byt ut x mot 6y i kvantitet II och förenkla. Jämför sedan med kvantitet I.",
    delprov: "KVA",
    area: "bråk",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\ny > 0\nx = 6y\n\nKvantitet I: y\nKvantitet II: En sjättedel av x",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "En sjättedel av x = x/6 = 6y/6 = y. Kvantiteterna är alltid lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 17, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-34",
    hint: "I skärningspunkten är y lika för båda linjerna. Sätt uttrycken lika med varandra och lös ut x.",
    delprov: "KVA",
    area: "räta linjen",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nLinjen L1 har ekvationen y = 2x + 5\nLinjen L2 har ekvationen y = −3x + 5\n\nKvantitet I: x-koordinaten för skärningspunkten mellan L1 och L2\nKvantitet II: 0",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "Vid skärningspunkten gäller 2x + 5 = −3x + 5, det vill säga 5x = 0, så x = 0. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 18, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-35",
    hint: "Skriv y som x + 1 och använd konjugatregeln för y² − x². Då blir det en enkel ekvation.",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nx och y är två på varandra följande positiva heltal sådana att y² − x² = 15.\n\nKvantitet I: y\nKvantitet II: 8",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Eftersom y = x + 1 kan vi skriva y² − x² = (y−x)(y+x) = 1 · (2x+1) = 15, vilket ger x = 7 och y = 8. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 20, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-36",
    hint: "Ge linjalerna en bokstav och uttryck de andra sakerna med den. Pennorna kan uttryckas på två sätt, sätt dem lika.",
    delprov: "KVA",
    area: "algebra",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nI Sixtens necessär finns det pennor, suddgummin och linjaler. Suddgummin är dubbelt så många som linjalerna. Pennorna är 4 fler än linjalerna och 3 färre än suddgummin.\n\nKvantitet I: Antalet pennor i Sixtens necessär\nKvantitet II: 11",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "Låt antalet linjaler vara r. Då är suddgummin 2r och pennorna både r + 4 och 2r − 3. Alltså r + 4 = 2r − 3, vilket ger r = 7. Antalet pennor är 7 + 4 = 11. Kvantiteterna är lika.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 21, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-37",
    hint: "Med tolv värden är medianen medelvärdet av de två mittersta. Fundera på vad som händer med mitten när du tar bort det minsta, och testa olika serier.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nEn mätserie består av tolv mätvärden. Vart och ett av mätvärdena är ett heltal mellan 1 och 60. Mätseriens median är 30.\n\nKvantitet I: Mätseriens median om det minsta mätvärdet tas bort\nKvantitet II: 30",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Med tolv värden är medianen medelvärdet av det sjätte och sjunde värdet i storleksordning. Serien 1,1,1,1,1,29,31,60,60,60,60,60 har median (29+31)/2 = 30; tas det minsta värdet bort blir de elva kvarvarande 1,1,1,1,29,31,60,60,60,60,60 med median (sjätte värdet) 31 — större än 30. Med serien 1,29,29,29,29,30,30,31,31,31,31,60 är medianen också 30, men tar man bort det minsta värdet (1) blir den nya medianen fortfarande 30. Eftersom resultatet beror på hur värdena är fördelade är informationen otillräcklig.",
    twinOf: { prov: "2021-10-24", provpass: 4, uppgift: 22, url: HOSTEN_2021_URL }
  },
  {
    id: "kva2-38",
    hint: "Räkna ut båda värdena var för sig och jämför. Förenkla procent och bråk till vanliga tal.",
    delprov: "KVA",
    area: "procent",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 5 procent av 240\nKvantitet II: En tredjedel av 36",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "5 % av 240 = 0,05 · 240 = 12. En tredjedel av 36 = 36/3 = 12. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 13, url: VAREN_2022_URL }
  },
  {
    id: "kva2-39",
    hint: "Du behöver inte räkna med hela funktionen. Fundera på hur mycket h ändras när x ändras en viss mängd, och jämför stegen i x.",
    delprov: "KVA",
    area: "funktioner",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nh(x) = 5x − 2\n\nKvantitet I: h(2) − h(6)\nKvantitet II: h(−1) − h(3)",
    options: KVA_OPTIONS,
    correct: 2,
    solution:
      "h(2) − h(6) = (5·2−2) − (5·6−2) = 8 − 28 = −20. h(−1) − h(3) = (5·(−1)−2) − (5·3−2) = −7 − 13 = −20. Kvantiteterna är lika, eftersom skillnaden mellan x-värdena är densamma i båda fallen (2−6 = −4 och −1−3 = −4) och h är en linjär funktion.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 15, url: VAREN_2022_URL }
  },
  {
    id: "kva2-40",
    hint: "Gör om bråken till gemensam nämnare, till exempel tolftedelar, och addera. Jämför sedan med 1/2.",
    delprov: "KVA",
    area: "bråk",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 1/4 + 1/12 + 1/6\nKvantitet II: 1/2",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "Gemensam nämnare 12: 1/4 = 3/12, 1/12 = 1/12, 1/6 = 2/12. Summan blir 3/12+1/12+2/12 = 6/12 = 1/2. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 16, url: VAREN_2022_URL }
  },
  {
    id: "kva2-41",
    hint: "Fundera på tecknet på m² och på vad som händer när du multiplicerar med n. Testa n positivt, noll och negativt.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nm < 0\nn < 1\n\nKvantitet I: m²\nKvantitet II: m² · n",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "m² är alltid positivt eftersom m ≠ 0 (m < 0). Eftersom n < 1 är m² · n alltid mindre än m² · 1 = m², oavsett om n är positivt, noll eller negativt (m²(1−n) > 0 då 1−n > 0). Kvantitet I är alltså alltid större.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 19, url: VAREN_2022_URL }
  },
  {
    id: "kva2-42",
    hint: "Ge de röda kulorna en bokstav och uttryck gröna och totalt med den. Sannolikhet är röda delat med alla.",
    delprov: "KVA",
    area: "sannolikhet",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nEn burk innehåller endast enfärgade röda och gröna kulor. Antalet gröna kulor är sju gånger så stort som antalet röda kulor.\n\nKvantitet I: Sannolikheten att en slumpmässigt vald kula ur burken är röd\nKvantitet II: 1/6",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "Om antalet röda kulor är r är antalet gröna 7r, och totalt finns 8r kulor. Sannolikheten att en slumpmässigt vald kula är röd blir r/8r = 1/8. Eftersom 1/8 < 1/6 är Kvantitet II större.",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 20, url: VAREN_2022_URL }
  },
  {
    id: "kva2-43",
    hint: "Lista alla heltal mellan gränserna och stryk dem som inte uppfyller villkoren för x respektive y. Jämför antalet.",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nx och y är heltal sådana att 20 < x < 30 och 20 < y < 30. x är inte jämnt delbart med vare sig 2 eller 3. y är jämnt delbart med 5.\n\nKvantitet I: Antalet olika tal som x kan vara\nKvantitet II: Antalet olika tal som y kan vara",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Heltalen mellan 20 och 30 är 21–29. De som varken är delbara med 2 eller 3 är 23, 25 och 29 — tre tal. De som är delbara med 5 är bara 25 — ett tal. Kvantitet I (3) är större än Kvantitet II (1).",
    twinOf: { prov: "2022-05-07", provpass: 1, uppgift: 21, url: VAREN_2022_URL }
  },
  {
    id: "kva2-44",
    hint: "Gör om till samma enhet. Kom ihåg hur många cm det är i en meter och hur många meter i en kilometer.",
    delprov: "KVA",
    area: "aritmetik",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 500 000 cm\nKvantitet II: 5 km",
    options: KVA_OPTIONS,
    correct: 2,
    solution: "500 000 cm = 5 000 m = 5 km. Kvantiteterna är lika.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 13, url: VAREN_2022_URL }
  },
  {
    id: "kva2-45",
    hint: "Gör om till gemensam nämnare och subtrahera. Är resultatet positivt, noll eller negativt?",
    delprov: "KVA",
    area: "bråk",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: 1/4 − 1/6\nKvantitet II: 0",
    options: KVA_OPTIONS,
    correct: 0,
    solution: "1/4 − 1/6 = 3/12 − 2/12 = 1/12, vilket är större än 0. Kvantitet I är större.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 14, url: VAREN_2022_URL }
  },
  {
    id: "kva2-46",
    hint: "Sortera de kända talen och fundera på var b kan hamna. Testa ett litet och ett stort b och se hur medianen påverkas.",
    delprov: "KVA",
    area: "statistik",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nEn mätserie består av de fem positiva heltalen 9, 3, b, 11 och 6.\n\nKvantitet I: Mätseriens median\nKvantitet II: 6",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "De fyra kända talen sorterade är 3, 6, 9, 11. Är b ≤ 6 blir medianen (mittenvärdet av fem tal) 6, alltså lika med Kvantitet II. Är b t.ex. 7 blir den sorterade serien 3, 6, 7, 9, 11 och medianen 7, som är större än 6. Eftersom b är okänt kan medianen bli antingen lika med eller större än 6, så informationen är otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 15, url: VAREN_2022_URL }
  },
  {
    id: "kva2-47",
    hint: "Använd triangelolikheten: varje sida måste vara kortare än summan av de två andra. Testa olika sätt att dela upp de 21 cm.",
    delprov: "KVA",
    area: "geometri",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nSumman av två sidor i en triangel är 21 cm.\n\nKvantitet I: Längden av den tredje sidan\nKvantitet II: 19 cm",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Enligt triangelolikheten måste den tredje sidan vara kortare än summan av de andra två sidorna (21 cm), men hur kort beror på hur de 21 cm fördelas mellan de två kända sidorna. Med sidorna 10,5 cm och 10,5 cm kan tredje sidan vara t.ex. 5 cm (mindre än 19). Med sidorna 1 cm och 20 cm måste tredje sidan vara mellan 19 och 21 cm, t.ex. 20 cm (mer än 19). Eftersom tredje sidan kan vara både mindre och större än 19 cm är informationen otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 17, url: VAREN_2022_URL }
  },
  {
    id: "kva2-48",
    hint: "Titta på skillnaden mellan kvantiteterna i stället för på dem var för sig. Testa sedan positivt och negativt q.",
    delprov: "KVA",
    area: "algebra",
    prompt: "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\np < q\n\nKvantitet I: p + q\nKvantitet II: p − q",
    options: KVA_OPTIONS,
    correct: 3,
    solution:
      "Skillnaden mellan kvantiteterna är (p+q) − (p−q) = 2q. Testa p=−3, q=5 (q>0): 2 mot −8, Kvantitet I störst. Testa p=−7, q=−2 (q<0): −9 mot −5, Kvantitet II störst. Eftersom tecknet på q inte är känt är informationen otillräcklig.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 19, url: VAREN_2022_URL }
  },
  {
    id: "kva2-49",
    hint: "Cirklars areor växer med kvadraten på radien. Jämför r² och strunta i π, det är med i båda kvantiteterna.",
    delprov: "KVA",
    area: "geometri",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nFyra cirklar har radierna 6 cm, 9 cm, 12 cm respektive 18 cm.\n\nKvantitet I: Den sammanlagda arean av den minsta och den största cirkeln\nKvantitet II: Den sammanlagda arean av de två mellanstora cirklarna",
    options: KVA_OPTIONS,
    correct: 0,
    solution:
      "Areorna är proportionella mot kvadraten på radien. Minsta + största: 6² + 18² = 36 + 324 = 360. De två mellanstora: 9² + 12² = 81 + 144 = 225. Eftersom 360 > 225 är Kvantitet I större, oavsett vilket tal π multipliceras med.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 20, url: VAREN_2022_URL }
  },
  {
    id: "kva2-50",
    hint: "Primtalsfaktorisera båda talen och addera de olika faktorerna. Börja med att dela med 2, 3 och 5.",
    delprov: "KVA",
    area: "talteori",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nKvantitet I: Summan av de olika primtalsfaktorerna i heltalet 42\nKvantitet II: Summan av de olika primtalsfaktorerna i heltalet 55",
    options: KVA_OPTIONS,
    correct: 1,
    solution:
      "42 = 2 · 3 · 7, så summan av primtalsfaktorerna är 2+3+7 = 12. 55 = 5 · 11, så summan är 5+11 = 16. Kvantitet II är större.",
    twinOf: { prov: "2022-05-07", provpass: 4, uppgift: 22, url: VAREN_2022_URL }
  }
];
