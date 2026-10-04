import type { HpCard } from "./hp-cards";

// Kort för kvantitativa delprov (KVA, NOG, DTK). Matte-areor ligger i hp-cards-math.ts.

const SVG_KVA = `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tallinje med testtalen minus 1, 0, en halv, 1 och 10">
<text x="160" y="22" text-anchor="middle" font-size="14" fill="currentColor">x² jämfört med x</text>
<line x1="12" y1="80" x2="308" y2="80" stroke="currentColor" stroke-width="2"/>
<line x1="12" y1="80" x2="22" y2="74" stroke="currentColor" stroke-width="2"/>
<line x1="12" y1="80" x2="22" y2="86" stroke="currentColor" stroke-width="2"/>
<line x1="308" y1="80" x2="298" y2="74" stroke="currentColor" stroke-width="2"/>
<line x1="308" y1="80" x2="298" y2="86" stroke="currentColor" stroke-width="2"/>
<circle cx="40" cy="80" r="6" fill="currentColor"/>
<circle cx="95" cy="80" r="6" fill="currentColor"/>
<circle cx="140" cy="80" r="6" fill="currentColor" opacity="0.6"/>
<circle cx="185" cy="80" r="6" fill="currentColor"/>
<circle cx="285" cy="80" r="6" fill="currentColor"/>
<text x="40" y="64" text-anchor="middle" font-size="14" fill="currentColor">−1</text>
<text x="95" y="64" text-anchor="middle" font-size="14" fill="currentColor">0</text>
<text x="140" y="64" text-anchor="middle" font-size="14" fill="currentColor">½</text>
<text x="185" y="64" text-anchor="middle" font-size="14" fill="currentColor">1</text>
<text x="285" y="64" text-anchor="middle" font-size="14" fill="currentColor">10</text>
<text x="40" y="110" text-anchor="middle" font-size="12" fill="currentColor">1 &gt; −1</text>
<text x="95" y="110" text-anchor="middle" font-size="12" fill="currentColor">0 = 0</text>
<text x="140" y="110" text-anchor="middle" font-size="12" fill="currentColor">¼ &lt; ½</text>
<text x="185" y="110" text-anchor="middle" font-size="12" fill="currentColor">1 = 1</text>
<text x="285" y="110" text-anchor="middle" font-size="12" fill="currentColor">100 &gt; 10</text>
<text x="160" y="150" text-anchor="middle" font-size="14" fill="currentColor">Olika ordning ger D</text>
<text x="160" y="170" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">(½ ligger mellan 0 och 1, där x² blir mindre)</text>
</svg>`;

const SVG_NOG = `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flödesschema för NOG">
<rect x="10" y="10" width="140" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="80" y="32" text-anchor="middle" font-size="13" fill="currentColor">1. Räcker (1) ensam?</text>
<rect x="170" y="10" width="140" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="240" y="32" text-anchor="middle" font-size="13" fill="currentColor">2. Räcker (2) ensam?</text>
<line x1="150" y1="27" x2="168" y2="27" stroke="currentColor" stroke-width="2"/>
<polygon points="168,22 168,32 174,27" fill="currentColor"/>
<line x1="80" y1="44" x2="80" y2="74" stroke="currentColor" stroke-width="2"/>
<line x1="240" y1="44" x2="240" y2="74" stroke="currentColor" stroke-width="2"/>
<rect x="10" y="74" width="300" height="34" rx="6" fill="currentColor" opacity="0.12" stroke="currentColor" stroke-width="2"/>
<text x="160" y="96" text-anchor="middle" font-size="13" fill="currentColor">3. Räcker (1) + (2) tillsammans?</text>
<text x="80" y="64" text-anchor="middle" font-size="12" fill="currentColor">ja/nej</text>
<text x="240" y="64" text-anchor="middle" font-size="12" fill="currentColor">ja/nej</text>
<text x="160" y="132" text-anchor="middle" font-size="13" fill="currentColor">Svar enligt (1) och (2) ensamma:</text>
<text x="30" y="154" font-size="12" fill="currentColor">Bara (1) ja: A</text>
<text x="30" y="172" font-size="12" fill="currentColor">Bara (2) ja: B</text>
<text x="30" y="190" font-size="12" fill="currentColor">Båda ja: D</text>
<text x="170" y="154" font-size="12" fill="currentColor">Båda nej, ihop ja: C</text>
<text x="170" y="172" font-size="12" fill="currentColor">Båda nej, ihop nej: E</text>
</svg>`;

const SVG_DTK_READ = `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stapeldiagram över försäljning per år i miljoner kronor, 2021 och 2023 markerade">
<text x="14" y="18" font-size="14" fill="currentColor">Försäljning, miljoner kr</text>
<line x1="40" y1="30" x2="40" y2="150" stroke="currentColor" stroke-width="2"/>
<line x1="40" y1="150" x2="300" y2="150" stroke="currentColor" stroke-width="2"/>
<rect x="70" y="86" width="50" height="64" fill="currentColor" opacity="0.9"/>
<rect x="150" y="62" width="50" height="88" fill="currentColor" opacity="0.3"/>
<rect x="230" y="50" width="50" height="100" fill="currentColor" opacity="0.9"/>
<text x="95" y="80" text-anchor="middle" font-size="14" fill="currentColor">40</text>
<text x="175" y="56" text-anchor="middle" font-size="14" fill="currentColor">55</text>
<text x="255" y="44" text-anchor="middle" font-size="14" fill="currentColor">62</text>
<text x="95" y="170" text-anchor="middle" font-size="14" fill="currentColor">2021</text>
<text x="175" y="170" text-anchor="middle" font-size="14" fill="currentColor">2022</text>
<text x="255" y="170" text-anchor="middle" font-size="14" fill="currentColor">2023</text>
<text x="160" y="186" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">Fråga 2023 − 2021: titta på rubrik och år</text>
</svg>`;

const SVG_DTK_ANDEL = `<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stapel där en del på 9 000 av helheten 45 000 är markerad">
<text x="160" y="22" text-anchor="middle" font-size="14" fill="currentColor">andel = del / helhet</text>
<rect x="20" y="44" width="280" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="20" y="44" width="56" height="40" fill="currentColor" opacity="0.85"/>
<line x1="48" y1="84" x2="48" y2="100" stroke="currentColor" stroke-width="2"/>
<text x="48" y="116" text-anchor="middle" font-size="14" fill="currentColor">del: 9 000</text>
<line x1="160" y1="38" x2="160" y2="44" stroke="currentColor" stroke-width="2"/>
<line x1="20" y1="132" x2="300" y2="132" stroke="currentColor" stroke-width="2"/>
<text x="160" y="152" text-anchor="middle" font-size="14" fill="currentColor">helhet: 45 000</text>
<text x="190" y="70" font-size="14" fill="currentColor">9 000 / 45 000 = 0,20 = 20 %</text>
</svg>`;

const SVG_DTK_FORAND = `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Två staplar, 80 och 100, med pil som visar ökningen 25 procent">
<line x1="20" y1="150" x2="300" y2="150" stroke="currentColor" stroke-width="2"/>
<rect x="50" y="70" width="70" height="80" fill="currentColor" opacity="0.3"/>
<rect x="190" y="50" width="70" height="100" fill="currentColor" opacity="0.85"/>
<text x="85" y="64" text-anchor="middle" font-size="14" fill="currentColor">gammalt: 80</text>
<text x="225" y="44" text-anchor="middle" font-size="14" fill="currentColor">nytt: 100</text>
<line x1="124" y1="110" x2="180" y2="110" stroke="currentColor" stroke-width="2"/>
<polygon points="188,110 178,104 178,116" fill="currentColor"/>
<text x="156" y="100" text-anchor="middle" font-size="14" fill="currentColor">+20</text>
<text x="160" y="176" text-anchor="middle" font-size="14" fill="currentColor">(nytt − gammalt) / gammalt = 20 / 80 = 25 %</text>
</svg>`;

export const HP_CARDS_DELPROV: HpCard[] = [
  {
    id: "kva",
    title: "KVA: testa fem tal",
    matches: ["KVA", "jämförelse"],
    formula:
      "Svar: A = I störst, B = II störst, C = lika, D = går ej avgöra. Innehåller uttrycket ett x: testa −1, 0, ½ och ett stort tal.",
    svg: SVG_KVA,
    why: "Alternativ D finns bara när uttrycken kan ändra ordning beroende på talet. Därför räcker ett enda motexempel för att svaret ska bli D, och därför ska du testa de talen där siffror beter sig konstigt: negativa tal, noll och bråk mellan 0 och 1. Ger alla fem tal samma ordning är A, B eller C troligt.",
    example: {
      prompt: "Kvantitet I: x². Kvantitet II: x. (x är ett reellt tal.) Vilket svar?",
      steps: [
        "Testa x = 2: I = 4, II = 2. Alltså I > II.",
        "Testa x = ½: I = ¼, II = ½. Nu är I < II.",
        "Två olika ordningar betyder att talet avgör.",
        "Svar: D (informationen räcker inte).",
      ],
    },
    trap: "Att bara testa x = 2 och välja A. Positiva heltal är det enda område där de flesta uttryck beter sig snällt, så det är exakt där fällan är gömd.",
    link: { label: "Fördjupa: KVA, testvärden och strategi (HP-spelet)", url: "https://www.hpspelet.se/delprov/kva" },
  },
  {
    id: "nog",
    title: "NOG: tre steg, fem svar",
    matches: ["NOG", "logik"],
    formula:
      "1) Räcker (1) ensamt? 2) Räcker (2) ensamt? 3) Om inte: räcker de ihop? Du ska aldrig räkna ut själva svaret om du ser att det går.",
    svg: SVG_NOG,
    why: "NOG frågar om informationen räcker, inte vad svaret är. Genom att pröva (1) och (2) var för sig, och först sedan ihop, hamnar du alltid på exakt ett av de fem svaren utan att gissa. Låtsas därför att (1) inte finns när du prövar (2), annars blandar du ihop dem.",
    example: {
      prompt: "Hur gammal är Eva? (1) Eva är 4 år äldre än Adam. (2) Adam är 12 år.",
      steps: [
        "Steg 1: (1) ensamt. Vi vet inte Adams ålder, så Evas ålder går inte att få. Räcker inte.",
        "Steg 2: (2) ensamt. Vi vet Adams ålder men inget om Eva. Räcker inte.",
        "Steg 3: Ihop: Adam 12, Eva = 12 + 4 = 16. Det går att svara.",
        "Svar: C (räcker bara tillsammans).",
      ],
    },
    trap: "Att räkna klart och sedan använda (1) när du prövar (2). Då blir C fel svar: (2) måste klara sig helt utan (1). Svara också aldrig utan att ha testat båda var för sig.",
    link: { label: "Fördjupa: NOG och de fem svarsalternativen (HP-spelet)", url: "https://www.hpspelet.se/delprov/nog" },
  },
  {
    id: "dtk-avlasning",
    title: "DTK: läs av rätt",
    matches: ["DTK", "avläsning"],
    formula: "Rubrik, enhet, år/kategori. Läs i den ordningen innan du läser något värde.",
    svg: SVG_DTK_READ,
    why: "De flesta DTK-fel är inte räknefel, utan att du läser av fel rad, år eller enhet. Att kolla rubrik och enhet först tar tre sekunder men tar bort den vanligaste förlusten. Markera i diagrammet exakt det värde frågan efterfrågar innan du räknar.",
    example: {
      prompt: "Se diagrammet. Hur många tusen kronor mer sålde man 2023 än 2021?",
      steps: [
        "Enheten är miljoner kronor (se rubriken).",
        "Läs av 2023 = 62 och 2021 = 40 (inte 2022).",
        "Skillnad: 62 − 40 = 22 miljoner kr.",
        "Frågan vill ha tusental: 22 miljoner = 22 000 tusen kr.",
      ],
    },
    trap: "Rätt siffror men fel enhet: svarar 22 när frågan ville ha tusental, eller läser av närmaste stapel (2022) i stället för 2021.",
    link: { label: "Fördjupa: DTK, enheter och skalor (HP-spelet)", url: "https://www.hpspelet.se/delprov/dtk" },
  },
  {
    id: "dtk-andel",
    title: "DTK: andel och procent",
    matches: ["andel", "kombinera två kolumner"],
    formula: "andel = del / helhet (och procent = andel · 100)",
    svg: SVG_DTK_ANDEL,
    why: "Andel är alltid en del jämfört med en helhet, och det är helheten som kostar poäng. Hittar du de två kolumnerna (del och helhet) och delar rätt, får du andelen direkt. Skriv gärna ordet 'del' och 'helhet' ovanför talen så du inte byter plats på dem.",
    example: {
      prompt: "Region Nord har 45 000 invånare, varav 9 000 är över 65 år. Hur stor andel är över 65?",
      steps: [
        "Del = de över 65 = 9 000.",
        "Helhet = alla invånare = 45 000.",
        "Andel = 9 000 / 45 000 = 0,20.",
        "0,20 = 20 %.",
      ],
    },
    trap: "Fel helhet. Vid 18 flickor och 12 pojkar är flickornas andel 18 / 30 = 60 %, inte 18 / 12. Helheten är alla, inte 'de andra'.",
    link: { label: "Fördjupa: procent, andel, del och helhet (Matteboken)", url: "https://www.matteboken.se/lektioner/skolar-9/procent" },
  },
  {
    id: "dtk-forandring",
    title: "DTK: procentuell förändring",
    matches: ["förändring"],
    formula: "förändring i % = (nytt − gammalt) / gammalt · 100",
    svg: SVG_DTK_FORAND,
    why: "Du jämför ändringen med där du startade, och starten är alltid det gamla värdet. Det är därför samma krona-ändring ger olika procent uppåt och nedåt: basen är olika. Räkna först ut skillnaden i vanliga enheter, dela sedan på gammalt.",
    example: {
      prompt: "Priset går från 80 kr till 100 kr. Hur många procent ökade det? Och hur många procent minskar det om det går tillbaka från 100 till 80?",
      steps: [
        "Ökning: nytt − gammalt = 100 − 80 = 20.",
        "Dela med gammalt: 20 / 80 = 0,25 = 25 %.",
        "Tillbaka: 80 − 100 = −20, gammalt är nu 100.",
        "−20 / 100 = −0,20, alltså minskning med 20 %.",
      ],
    },
    trap: "Att dela med nytt värde i stället för gammalt, eller att blanda ihop procent och procentenheter (från 20 % till 25 % är +5 procentenheter, men +25 % förändring).",
    link: { label: "Fördjupa: förändringsfaktor (Matteboken)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/forandringsfaktor" },
  },
];
