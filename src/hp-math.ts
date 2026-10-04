// HP Mattediagnos: egna frågor i högskoleprovets XYZ-stil (4 svarsalternativ A–D).
// Nivå Matematik 1–2, ingen miniräknare. Frågor, svarsalternativ och lösningar är
// egna — inga UHR-uppgifter återges.

export type HpMathArea =
  | "aritmetik"
  | "brak"
  | "procent"
  | "potenser"
  | "algebra"
  | "ekvationer"
  | "rata-linjen"
  | "geometri"
  | "sannolikhet"
  | "statistik"
  | "hastighet";

export interface HpMathAreaInfo {
  id: HpMathArea;
  label: string;
  /** Verifierad lektionssida på matteboken.se (Matte 1/2, gymnasiet). */
  learnUrl: string;
}

export const HP_MATH_AREAS: HpMathAreaInfo[] = [
  {
    id: "aritmetik",
    label: "Aritmetik & prioriteringsregler",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/rakneordning"
  },
  {
    id: "brak",
    label: "Bråk",
    learnUrl: "https://www.matteboken.se/lektioner/matte-1/aritmetik/addition-och-subtraktion-av-brak"
  },
  {
    id: "procent",
    label: "Procent",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/delen-av-det-hela"
  },
  {
    id: "potenser",
    label: "Potenser",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/potenser"
  },
  {
    id: "algebra",
    label: "Algebra & förenkling",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/forenkla-uttryck"
  },
  {
    id: "ekvationer",
    label: "Ekvationer",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/ekvationslosning"
  },
  {
    id: "rata-linjen",
    label: "Räta linjens ekvation",
    learnUrl: "https://www.matteboken.se/lektioner/matte-1/funktioner/rata-linjens-ekvation"
  },
  {
    id: "geometri",
    label: "Geometri (area/omkrets/vinklar/Pythagoras)",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/geometri"
  },
  {
    id: "sannolikhet",
    label: "Sannolikhet",
    learnUrl: "https://www.matteboken.se/lektioner/matte-1/statistik-och-sannolikhet/sannolikhet-for-en-handelse"
  },
  {
    id: "statistik",
    label: "Statistik (medel/median)",
    learnUrl: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/statistik-och-sannolikhet/medelvarde-median-och-typvarde"
  },
  {
    id: "hastighet",
    label: "Hastighet, sträcka, tid",
    learnUrl: "https://www.matteboken.se/lektioner/matte-1/aritmetik/decimaltal/exempel/berakna-medelhastigheten"
  }
];

export interface HpMathQuestion {
  id: string;
  area: HpMathArea;
  prompt: string;
  /** Fyra svarsalternativ, A–D. */
  options: [string, string, string, string];
  /** Index (0–3) för rätt alternativ. */
  correct: number;
  /** Egen lösning, steg för steg. */
  solutionSteps: string[];
  /** Formel eller regel att komma ihåg. */
  formula: string;
  /** Ledtråd som visas via ?-knappen FÖRE svar: metod/första steg, aldrig svaret. */
  hint?: string;
}

export const HP_MATH_QUESTIONS: HpMathQuestion[] = [
  // ── Aritmetik & prioriteringsregler ──
  {
    id: "arit-1",
    hint: "Räkneordning: vilken räkneoperation ska du göra först, plus eller gånger? Skriv ut mellanresultatet innan du går vidare från vänster till höger.",
    area: "aritmetik",
    prompt: "Beräkna: 12 − 3 × 2 + 4",
    options: ["10", "22", "8", "2"],
    correct: 0,
    solutionSteps: ["Multiplikation före subtraktion/addition: 3 × 2 = 6", "12 − 6 + 4 = 10"],
    formula: "Prioriteringsordning: parentes → potens → multiplikation/division → addition/subtraktion (vänster till höger)"
  },
  {
    id: "arit-2",
    hint: "Börja med parentesen, sedan division/multiplikation, och sist plus och minus. Räkna ut varje del för sig innan du slår ihop dem.",
    area: "aritmetik",
    prompt: "Beräkna: (8 + 4) ÷ 2 − 3 × 1",
    options: ["3", "9", "−3", "6"],
    correct: 0,
    solutionSteps: ["Parentes först: (8 + 4) = 12", "12 ÷ 2 = 6", "3 × 1 = 3", "6 − 3 = 3"],
    formula: "Parentes räknas alltid ut först, sedan multiplikation/division, sist addition/subtraktion"
  },

  // ── Bråk ──
  {
    id: "brak-1",
    hint: "Du kan inte addera bråk med olika nämnare. Hitta först en gemensam nämnare och förläng det bråk som behöver det.",
    area: "brak",
    prompt: "Beräkna: 2/3 + 1/6",
    options: ["5/6", "3/9", "1/2", "5/9"],
    correct: 0,
    solutionSteps: ["Gör gemensam nämnare 6: 2/3 = 4/6", "4/6 + 1/6 = 5/6"],
    formula: "Vid addition/subtraktion av bråk: gör lika nämnare först, addera bara täljarna"
  },
  {
    id: "brak-2",
    hint: "Vid multiplikation behövs ingen gemensam nämnare. Multiplicera täljarna för sig och nämnarna för sig, och förkorta sist.",
    area: "brak",
    prompt: "Beräkna: 3/4 × 2/5",
    options: ["3/10", "6/9", "5/9", "3/20"],
    correct: 0,
    solutionSteps: ["Multiplicera täljare för sig: 3 × 2 = 6", "Multiplicera nämnare för sig: 4 × 5 = 20", "6/20 förkortas till 3/10"],
    formula: "Bråk × bråk = (täljare × täljare) / (nämnare × nämnare), förkorta sist"
  },

  // ── Procent ──
  {
    id: "procent-1",
    hint: "Gör om procenttalet till decimalform (dela med 100) och multiplicera med det hela.",
    area: "procent",
    prompt: "Vad är 15 % av 240?",
    options: ["36", "24", "15", "40"],
    correct: 0,
    solutionSteps: ["15 % = 0,15", "240 × 0,15 = 36"],
    formula: "Del = andel (decimalform) × det hela"
  },
  {
    id: "procent-2",
    hint: "Räkna först ut själva förändringen i kronor. Jämför sedan den med det GAMLA priset, inte det nya.",
    area: "procent",
    prompt: "Ett pris höjs från 800 kr till 920 kr. Hur många procent höjdes priset?",
    options: ["15 %", "12 %", "20 %", "10 %"],
    correct: 0,
    solutionSteps: ["Förändring: 920 − 800 = 120", "120 / 800 = 0,15", "0,15 = 15 %"],
    formula: "Förändring i % = (nytt värde − gammalt värde) / gammalt värde"
  },

  // ── Potenser ──
  {
    id: "pot-1",
    hint: "Titta på baserna: är de lika? Då finns en regel för vad som händer med exponenterna när du multiplicerar.",
    area: "potenser",
    prompt: "Beräkna: 2³ × 2²",
    options: ["32", "16", "64", "8"],
    correct: 0,
    solutionSteps: ["Samma bas: addera exponenterna: 3 + 2 = 5", "2⁵ = 32"],
    formula: "aᵐ × aⁿ = aᵐ⁺ⁿ (samma bas: addera exponenterna)"
  },
  {
    id: "pot-2",
    hint: "Samma bas i täljare och nämnare. Vad händer med exponenterna vid division?",
    area: "potenser",
    prompt: "Förenkla: 3⁴ / 3²",
    options: ["9", "3", "27", "1"],
    correct: 0,
    solutionSteps: ["Samma bas: subtrahera exponenterna: 4 − 2 = 2", "3² = 9"],
    formula: "aᵐ / aⁿ = aᵐ⁻ⁿ (samma bas: subtrahera exponenterna)"
  },

  // ── Algebra / förenkling ──
  {
    id: "alg-1",
    hint: "Sortera termerna i två högar: de med x och de utan. Se upp med tecknet framför varje term, minustecknet hör till termen efter.",
    area: "algebra",
    prompt: "Förenkla: 3x + 5 − x + 2",
    options: ["2x + 7", "3x + 7", "2x + 3", "4x + 7"],
    correct: 0,
    solutionSteps: ["Samla x-termerna: 3x − x = 2x", "Samla konstanterna: 5 + 2 = 7", "Svar: 2x + 7"],
    formula: "Samla lika termer var för sig (x-termer och konstanter)"
  },
  {
    id: "alg-2",
    hint: "Multiplicera in 2:an med BÅDA termerna i parentesen innan du räknar ihop med resten.",
    area: "algebra",
    prompt: "Förenkla: 2(x + 3) − 4",
    options: ["2x + 2", "2x + 6", "x + 2", "2x − 2"],
    correct: 0,
    solutionSteps: ["Multiplicera in parentesen: 2 × x + 2 × 3 = 2x + 6", "2x + 6 − 4 = 2x + 2"],
    formula: "Distributiva lagen: a(b + c) = ab + ac"
  },

  // ── Ekvationer ──
  {
    id: "ekv-1",
    hint: "Balansmetoden: få termen med x ensam först genom att ta bort konstanten, dela sedan med talet framför x. Gör samma sak på båda sidor.",
    area: "ekvationer",
    prompt: "Lös ekvationen: 3x − 5 = 10",
    options: ["x = 5", "x = 3", "x = 15", "x = −5"],
    correct: 0,
    solutionSteps: ["Addera 5 till båda led: 3x = 15", "Dividera med 3: x = 5"],
    formula: "Balansmetoden: gör samma sak i båda leden tills x står ensamt"
  },
  {
    id: "ekv-2",
    hint: "Börja med att flytta bort konstanten på vänster sida (gör samma sak på båda sidor), dela sedan med talet framför x.",
    area: "ekvationer",
    prompt: "Lös ekvationen: 4x + 3 = 19",
    options: ["x = 4", "x = 5", "x = 16", "x = 3,25"],
    correct: 0,
    solutionSteps: ["Subtrahera 3 från båda led: 4x = 16", "Dividera med 4: x = 4"],
    formula: "Balansmetoden: gör samma sak i båda leden tills x står ensamt"
  },

  // ── Räta linjens ekvation ──
  {
    id: "linje-1",
    hint: "Jämför med grundformen y = kx + m. Vilket tal står framför x, och vad heter det?",
    area: "rata-linjen",
    prompt: "Vad är riktningskoefficienten (k) för linjen y = 3x − 2?",
    options: ["3", "−2", "2", "−3"],
    correct: 0,
    solutionSteps: ["Jämför med y = kx + m", "Talet framför x är k, alltså k = 3"],
    formula: "y = kx + m, där k = riktningskoefficient (lutning) och m = skärning med y-axeln"
  },
  {
    id: "linje-2",
    hint: "Använd formeln för lutning: skillnaden i y delat med skillnaden i x. Håll ordningen på punkterna konsekvent i täljare och nämnare.",
    area: "rata-linjen",
    prompt: "En linje går genom punkterna (0, 1) och (2, 5). Vad är k?",
    options: ["2", "4", "1", "0,5"],
    correct: 0,
    solutionSteps: ["k = (y₂ − y₁) / (x₂ − x₁)", "k = (5 − 1) / (2 − 0) = 4 / 2 = 2"],
    formula: "k = (y₂ − y₁) / (x₂ − x₁)"
  },

  // ── Geometri ──
  {
    id: "geo-1",
    hint: "Vilken formel gäller för en rektangels area? Kontrollera att du inte tar omkretsen.",
    area: "geometri",
    prompt: "En rektangel har basen 8 cm och höjden 5 cm. Vad är arean?",
    options: ["40 cm²", "26 cm²", "13 cm²", "45 cm²"],
    correct: 0,
    solutionSteps: ["Area = bas × höjd", "8 × 5 = 40 cm²"],
    formula: "Rektangelns area = bas × höjd"
  },
  {
    id: "geo-2",
    hint: "Rätvinklig triangel betyder Pythagoras. Katetrarna är de korta sidorna, och du söker den längsta.",
    area: "geometri",
    prompt: "En rätvinklig triangel har kateterna 3 cm och 4 cm. Hur lång är hypotenusan?",
    options: ["5 cm", "7 cm", "6 cm", "4,5 cm"],
    correct: 0,
    solutionSteps: ["Pythagoras sats: a² + b² = c²", "3² + 4² = 9 + 16 = 25", "c = √25 = 5 cm"],
    formula: "Pythagoras sats: a² + b² = c² (c = hypotenusan)"
  },

  // ── Sannolikhet ──
  {
    id: "sann-1",
    hint: "Sannolikhet = gynnsamma delat med möjliga. Hur många kort av varje färg finns det i en kortlek?",
    area: "sannolikhet",
    prompt: "Du drar ett kort ur en vanlig kortlek (52 kort). Vad är sannolikheten att dra en hjärter?",
    options: ["1/4", "1/13", "1/2", "1/52"],
    correct: 0,
    solutionSteps: ["Det finns 13 hjärterkort av 52 totalt", "13/52 förkortas till 1/4"],
    formula: "Sannolikhet = gynnsamma utfall / totalt antal utfall"
  },
  {
    id: "sann-2",
    hint: "Är de två kasten beroende av varandra? Om inte: vad gör man med sannolikheterna för var och en?",
    area: "sannolikhet",
    prompt: "Du kastar en vanlig tärning två gånger. Vad är sannolikheten att båda kasten visar 6?",
    options: ["1/36", "1/6", "2/6", "1/12"],
    correct: 0,
    solutionSteps: ["Oberoende händelser: multiplicera sannolikheterna", "1/6 × 1/6 = 1/36"],
    formula: "Oberoende händelser: P(A och B) = P(A) × P(B)"
  },

  // ── Statistik ──
  {
    id: "stat-1",
    hint: "Medelvärde = summan delat med antalet. Räkna först ut summan, sedan hur många tal det är.",
    area: "statistik",
    prompt: "Vad är medelvärdet av 4, 7, 9, 12, 18?",
    options: ["10", "9", "12", "8"],
    correct: 0,
    solutionSteps: ["Summera: 4 + 7 + 9 + 12 + 18 = 50", "Dividera med antalet tal: 50 / 5 = 10"],
    formula: "Medelvärde = summan av alla värden / antal värden"
  },
  {
    id: "stat-2",
    hint: "Det första du måste göra är att sortera talen i storleksordning. Titta sedan på mittenplatsen.",
    area: "statistik",
    prompt: "Vad är medianen av talen 3, 8, 5, 12, 7?",
    options: ["7", "5", "8", "6"],
    correct: 0,
    solutionSteps: ["Sortera talen: 3, 5, 7, 8, 12", "Mittersta värdet (5 tal) är 7"],
    formula: "Median = mittersta värdet i en sorterad talföljd (medelvärdet av de två mittersta om jämnt antal)"
  },

  // ── Hastighet, sträcka, tid ──
  {
    id: "hast-1",
    hint: "Vilken formel kopplar ihop hastighet, sträcka och tid? Kontrollera att enheterna stämmer (km och timmar).",
    area: "hastighet",
    prompt: "En bil kör 240 km på 3 timmar. Vad är medelhastigheten?",
    options: ["80 km/h", "60 km/h", "90 km/h", "100 km/h"],
    correct: 0,
    solutionSteps: ["Hastighet = sträcka / tid", "240 / 3 = 80 km/h"],
    formula: "v = s / t (hastighet = sträcka / tid)"
  },
  {
    id: "hast-2",
    hint: "Tiden är i minuter men hastigheten i km per timme. Gör om minuterna till timmar (bråk går bra) innan du använder s = v · t.",
    area: "hastighet",
    prompt: "Du cyklar med hastigheten 15 km/h i 40 minuter. Hur långt hinner du?",
    options: ["10 km", "15 km", "6 km", "12 km"],
    correct: 0,
    solutionSteps: ["Gör om 40 minuter till timmar: 40/60 = 2/3 h", "Sträcka = hastighet × tid: 15 × 2/3 = 10 km"],
    formula: "s = v × t (sträcka = hastighet × tid)"
  }
];
