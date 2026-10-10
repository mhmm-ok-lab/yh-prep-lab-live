import type { HpCard } from "./hp-cards";

// Matematikkort. Figurer använder currentColor + opacity så de fungerar i ljust och mörkt läge.
const T = `font-family="system-ui, sans-serif" font-size="13" fill="currentColor"`;
const ST = `stroke="currentColor" fill="none"`;

export const HP_CARDS_MATH: HpCard[] = [
  {
    id: "kort-aritmetik",
    title: "Räkneordning",
    matches: ["aritmetik", "Aritmetik"],
    formula: "( )  →  potens  →  × ÷  →  + −",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Räkneordning i fyra steg">
<g ${T}>
<rect x="20" y="8" width="280" height="38" rx="8" fill="currentColor" opacity="0.18"/><text x="34" y="32">1. Parenteser först</text>
<rect x="20" y="54" width="280" height="38" rx="8" fill="currentColor" opacity="0.14"/><text x="34" y="78">2. Potenser och rötter</text>
<rect x="20" y="100" width="280" height="38" rx="8" fill="currentColor" opacity="0.10"/><text x="34" y="124">3. × och ÷, från vänster till höger</text>
<rect x="20" y="146" width="280" height="38" rx="8" fill="currentColor" opacity="0.06"/><text x="34" y="170">4. + och −, från vänster till höger</text>
</g></svg>`,
    why: "Matematiken behöver en gemensam ordning, annars kan samma uttryck ge flera svar. Multiplikation är upprepad addition, så den binder hårdare än plus. Parenteser är ditt sätt att säga 'räkna den här delen först'.",
    example: {
      prompt: "Beräkna 8 + 4 · (6 − 2)² ÷ 8",
      steps: ["Parentesen: 6 − 2 = 4", "Potensen: 4² = 16", "Vänster till höger: 4 · 16 = 64, sedan 64 ÷ 8 = 8", "Sist addition: 8 + 8 = 16"]
    },
    trap: "Att räkna strikt från vänster (8 + 4 först). Också: × och ÷ har samma rang och tas från vänster, så 12 ÷ 3 · 2 är 8, inte 2.",
    link: { label: "Matteboken: Räkneordning (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/rakneordning" }
  },
  {
    id: "kort-brak",
    title: "Bråk",
    matches: ["brak", "bråk", "Bråk"],
    formula: "a/b + c/d = (a·d + c·b) / (b·d)    a/b ÷ c/d = a/b · d/c",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Två staplar delade i tolftedelar: 8/12 och 9/12">
<g ${ST} stroke-width="1.5">
<rect x="40" y="30" width="240" height="30"/><path d="M60 30V60M80 30V60M100 30V60M120 30V60M140 30V60M160 30V60M180 30V60M200 30V60M220 30V60M240 30V60M260 30V60" stroke-width="1" opacity="0.5"/>
<rect x="40" y="110" width="240" height="30"/><path d="M60 110V140M80 110V140M100 110V140M120 110V140M140 110V140M160 110V140M180 110V140M200 110V140M220 110V140M240 110V140M260 110V140" stroke-width="1" opacity="0.5"/>
</g>
<rect x="40" y="30" width="160" height="30" fill="currentColor" opacity="0.3"/>
<rect x="40" y="110" width="180" height="30" fill="currentColor" opacity="0.3"/>
<g ${T}><text x="40" y="24">2/3 = 8/12</text><text x="40" y="104">3/4 = 9/12</text><text x="40" y="170">Samma delar (tolftedelar) går att jämföra och addera.</text></g>
</svg>`,
    why: "Du kan bara addera saker som är delade i lika stora bitar. Därför gör du om till gemensam nämnare först, och lägger sedan ihop antalet bitar. Vid division frågar du 'hur många gånger ryms bråket', och det blir samma sak som att multiplicera med det omvända bråket.",
    example: {
      prompt: "Beräkna 2/3 + 3/4",
      steps: ["Gemensam nämnare: 12", "2/3 = 8/12 och 3/4 = 9/12", "Addera täljarna: 8/12 + 9/12 = 17/12", "Blandad form: 1 5/12"]
    },
    trap: "Att addera täljare med täljare och nämnare med nämnare (2/3 + 3/4 = 5/7). Nämnaren säger bara vilken bitstorlek det är, den adderas aldrig.",
    link: { label: "Matteboken: Addition och subtraktion av bråk (med video)", url: "https://www.matteboken.se/lektioner/matte-1/aritmetik/addition-och-subtraktion-av-brak" }
  },
  {
    id: "kort-procent",
    title: "Procent och förändringsfaktor",
    matches: ["procent", "Procent"],
    formula: "ny = gammal · förändringsfaktor    +20 % → ·1,20    −20 % → ·0,80",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stapel 100 procent blir 120 procent">
<g ${T}><text x="20" y="28">Före</text><text x="20" y="98">Efter +20 %</text></g>
<rect x="20" y="36" width="200" height="30" fill="currentColor" opacity="0.25" stroke="currentColor"/>
<rect x="20" y="106" width="200" height="30" fill="currentColor" opacity="0.25" stroke="currentColor"/>
<rect x="220" y="106" width="40" height="30" fill="currentColor" opacity="0.55" stroke="currentColor"/>
<g ${T}><text x="100" y="56" text-anchor="middle">100 %</text><text x="100" y="126" text-anchor="middle">100 %</text><text x="240" y="126" text-anchor="middle">20</text><text x="20" y="170">Efter = före · 1,20 (hela 120 % av förut)</text></g>
</svg>`,
    why: "Procent betyder 'hundradelar', så 20 % är bara 0,20 av det du utgår från. Förändringsfaktorn samlar 'behåll hela + lägg till 20 %' i ett enda tal (1 + 0,20), och då räcker en multiplikation. Flera förändringar efter varandra blir en multiplikation av faktorerna.",
    example: {
      prompt: "En vara kostar 250 kr, höjs med 20 % och sänks sedan med 20 %. Vad kostar den?",
      steps: ["Höjning: faktor 1,20 → 250 · 1,20 = 300", "Sänkning: faktor 0,80 → 300 · 0,80 = 240", "Totalt: 1,20 · 0,80 = 0,96, alltså −4 %"]
    },
    trap: "Att +20 % följt av −20 % tar ut varandra. Procenten räknas på olika grundvärden, så du hamnar under där du började.",
    link: { label: "Matteboken: Delen av det hela (procent)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/delen-av-det-hela" }
  },
  {
    id: "kort-potenser",
    title: "Potenser",
    matches: ["potenser", "Potenser"],
    formula: "aᵐ·aⁿ = aᵐ⁺ⁿ    aᵐ/aⁿ = aᵐ⁻ⁿ    (aᵐ)ⁿ = aᵐ·ⁿ    a⁰ = 1",
    why: "aᵐ betyder 'm stycken a multiplicerade'. Multiplicerar du aᵐ med aⁿ har du m + n stycken a, därför adderas exponenterna. a⁰ = 1 följer av att aⁿ/aⁿ = aⁿ⁻ⁿ = a⁰, och något delat med sig själv är 1.",
    example: {
      prompt: "Förenkla (2³ · 2⁵) / 2⁶",
      steps: ["Täljaren: 2³ · 2⁵ = 2⁸ (3 + 5)", "Division: 2⁸ / 2⁶ = 2² (8 − 6)", "2² = 4"]
    },
    trap: "−3² är −9 (minus efter potensen), medan (−3)² är 9. Och regeln 'addera exponenter' gäller bara när basen är lika vid multiplikation: 2³ · 3² går inte att slå ihop.",
    link: { label: "Matteboken: Potenser (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/potenser" }
  },
  {
    id: "kort-algebra",
    title: "Förenkling och kvadreringsregler",
    matches: ["algebra", "Algebra"],
    formula: "(a + b)² = a² + 2ab + b²    (a − b)² = a² − 2ab + b²    (a + b)(a − b) = a² − b²",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kvadrat med sidan a plus b delad i a², ab, ab och b²">
<rect x="90" y="30" width="90" height="90" fill="currentColor" opacity="0.28" stroke="currentColor"/>
<rect x="180" y="30" width="50" height="90" fill="currentColor" opacity="0.14" stroke="currentColor"/>
<rect x="90" y="120" width="90" height="50" fill="currentColor" opacity="0.14" stroke="currentColor"/>
<rect x="180" y="120" width="50" height="50" fill="currentColor" opacity="0.4" stroke="currentColor"/>
<g ${T} text-anchor="middle"><text x="135" y="80">a²</text><text x="205" y="80">ab</text><text x="135" y="150">ab</text><text x="205" y="150">b²</text><text x="135" y="22">a</text><text x="205" y="22">b</text><text x="78" y="80">a</text><text x="78" y="150">b</text><text x="160" y="192">(a+b)² = a² + 2ab + b²</text></g>
</svg>`,
    why: "(a + b)² är (a + b)(a + b), och när du multiplicerar ihop varje term med varje får du fyra delar: a², ab, ab och b². Figuren visar att de två ab-bitarna är verkliga ytor, därför blir det 2ab. Mittentermen försvinner bara när tecknen är olika (konjugatregeln).",
    example: {
      prompt: "Förenkla (x + 4)² − (x − 4)²",
      steps: ["(x + 4)² = x² + 8x + 16", "(x − 4)² = x² − 8x + 16", "Subtrahera (byt tecken i hela den andra parentesen): x² + 8x + 16 − x² + 8x − 16", "= 16x"]
    },
    trap: "(a + b)² = a² + b². Du tappar mittentermen 2ab. Och minus framför en parentes ska byta tecken på varje term inuti.",
    link: { label: "Matteboken: Förenkla uttryck (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/forenkla-uttryck" }
  },
  {
    id: "kort-ekvationer",
    title: "Ekvationer och ekvationssystem",
    matches: ["ekvationer", "Ekvationer"],
    formula: "Gör lika på båda sidor.   System: addera eller subtrahera ekvationerna, eller sätt in (substitution)",
    why: "En ekvation är en våg i balans: gör du samma sak på båda sidor förblir den i balans. Du 'flyttar över' bara som genväg för att lägga till eller dra ifrån samma sak på båda sidor. I ett system har du två okända och två krav; adderar du ekvationerna kan en okänd ta ut sig själv.",
    example: {
      prompt: "Lös 2x + y = 11 och x − y = 1",
      steps: ["Addera ekvationerna: y tar ut sig → 3x = 12", "x = 4", "Sätt in i x − y = 1: 4 − y = 1 → y = 3", "Kontroll i första: 2·4 + 3 = 11 ✓"]
    },
    trap: "Att bara svara på en av de okända, eller glömma kontrollen. Tecken blir fel när du drar ifrån en hel ekvation: minus gäller varje term.",
    link: { label: "Matteboken: Ekvationslösning (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/ekvationslosning" }
  },
  {
    id: "kort-rata-linjen",
    title: "Räta linjens ekvation",
    matches: ["rata-linjen", "räta linjen", "Räta linjen", "räta linjen i koordinatsystem"],
    formula: "y = kx + m,   k = Δy / Δx,   m = där linjen skär y-axeln",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linjen y = 2x + 1 med trappsteg Δx = 1 och Δy = 2 samt m = 1">
<g ${ST} stroke-width="1.2"><path d="M20 170H200M60 190V5"/></g>
<path d="M50 170L130 10" ${ST} stroke-width="2.5"/>
<path d="M80 110H100V70" ${ST} stroke-width="2" stroke-dasharray="4 3"/>
<circle cx="60" cy="150" r="4" fill="currentColor"/>
<g ${T}><text x="190" y="186">x</text><text x="66" y="14">y</text>
<text x="54" y="154" text-anchor="end">m = 1</text>
<text x="90" y="128" text-anchor="middle">Δx = 1</text>
<text x="106" y="94">Δy = 2</text>
<text x="140" y="34">y = 2x + 1</text>
<text x="140" y="110">k = Δy / Δx = 2</text></g>
</svg>`,
    why: "k säger hur mycket y ändras när x ökar ett steg, så du kan läsa det som trappsteg: gå Δx åt höger och Δy upp. m är startvärdet, där x = 0, alltså där linjen korsar y-axeln. Hela linjen är 'start + lutning gånger hur långt du gått'.",
    example: {
      prompt: "Linjen går genom (1, 3) och (3, 7). Bestäm ekvationen.",
      steps: ["k = Δy / Δx = (7 − 3) / (3 − 1) = 4/2 = 2", "Sätt in en punkt: 3 = 2·1 + m → m = 1", "y = 2x + 1", "Kontroll med (3, 7): 2·3 + 1 = 7 ✓"]
    },
    trap: "Att vända bråket (Δx/Δy) eller ta x-differensen i fel ordning, så tecknet på k blir fel. Ta samma punkt först i både täljare och nämnare.",
    link: { label: "Matteboken: Räta linjens ekvation (med video)", url: "https://www.matteboken.se/lektioner/matte-1/funktioner/rata-linjens-ekvation" },
    mnemonic: "k = Klättringen: hur många steg upp för varje steg åt höger (upp delat med bort). m = där linjen Möter y-axeln. Räta linjen är en funktion: y = kx + m är samma sak som f(x) = kx + m.",
    extraLinks: [{ label: "Testa själv: välj k och m och se linjen ändras (GeoGebra, Matematik 2, kapitel 1)", url: "https://mat.geogebra.org/m/cebyeeqp" }]
  },
  {
    id: "kort-geometri",
    title: "Geometri: area, Pythagoras, vinklar, cirkel",
    matches: ["geometri", "Geometri"],
    formula: "a² + b² = c²   Triangel: A = b·h/2   Cirkel: A = πr², O = 2πr   Triangelns vinkelsumma 180°",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rätvinklig triangel med kateterna a och b och hypotenusan c">
<path d="M60 160V50L200 160Z" ${ST} stroke-width="2" fill-opacity="0"/>
<path d="M60 160V50L200 160Z" fill="currentColor" opacity="0.1"/>
<path d="M60 144H76V160" ${ST}/>
<g ${T}><text x="48" y="110" text-anchor="end">a</text><text x="130" y="180" text-anchor="middle">b</text><text x="140" y="96">c (hypotenusa)</text><text x="120" y="38">a² + b² = c²</text></g>
</svg>`,
    why: "I en rätvinklig triangel är kvadraten på de två korta sidorna tillsammans lika stor (i area) som kvadraten på den långa sidan. Du får fram en okänd sida ur två kända. Arean av en triangel är hälften av rektangeln runt den, därför b·h/2.",
    example: {
      prompt: "En stege (5 m) står 3 m från en vägg. Hur högt upp når den?",
      steps: ["Stegen är hypotenusa: c = 5, ena kateten b = 3", "a² + 3² = 5² → a² = 25 − 9 = 16", "a = √16 = 4 m"]
    },
    trap: "Att blanda ihop radie och diameter i cirkelformler, eller att sätta c som en katet. Hypotenusan är alltid den längsta sidan, mitt emot den räta vinkeln.",
    link: { label: "Matteboken: Geometri (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/geometri" }
  },
  {
    id: "kort-sannolikhet",
    title: "Sannolikhet",
    matches: ["sannolikhet", "Sannolikhet"],
    formula: "P = gynnsamma / möjliga    och-händelser: multiplicera    eller-händelser (uteslutande): addera",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Trädet för två dragningar ur 2 röda och 3 blå kulor">
<g ${ST} stroke-width="1.3"><path d="M30 100L110 50M30 100L110 150"/><path d="M130 50L220 25" stroke-width="3"/><path d="M130 50L220 75"/></g>
<g ${T}><text x="12" y="104">Start</text>
<text x="112" y="46">Röd</text><text x="112" y="166">Blå</text>
<text x="50" y="62">2/5</text><text x="50" y="144">3/5</text>
<text x="160" y="28">1/4</text><text x="160" y="76">3/4</text>
<text x="226" y="29">Röd, Röd</text><text x="226" y="79">Röd, Blå</text>
<text x="20" y="192">Röd,Röd: 2/5 · 1/4 = 2/20 = 1/10</text></g>
</svg>`,
    why: "Sannolikhet är en andel: hur stor del av alla lika sannolika utfall som är gynnsamma. Varje gren i trädet är en andel av det som återstår, och för att ta dig längs en väg måste alla grenar slå in, därför multiplicerar du längs vägen.",
    example: {
      prompt: "I en påse är 2 röda och 3 blå kulor. Du drar två utan att lägga tillbaka. P(båda röda)?",
      steps: ["Första dragningen: 2/5 röd", "Då är 4 kulor kvar, varav 1 röd: 1/4", "Multiplicera längs grenen: 2/5 · 1/4 = 2/20", "= 1/10"]
    },
    trap: "Att glömma att antalet kulor minskar när man drar utan återläggning (nämnaren går från 5 till 4). Och att addera där du ska multiplicera.",
    link: { label: "Matteboken: Sannolikhet för en händelse (med video)", url: "https://www.matteboken.se/lektioner/matte-1/statistik-och-sannolikhet/sannolikhet-for-en-handelse" }
  },
  {
    id: "kort-statistik",
    title: "Medelvärde, median, typvärde",
    matches: ["statistik", "Statistik", "medelvärde", "Medelvärde"],
    formula: "medel = summa / antal    median = mittenvärdet (sorterat)    typvärde = vanligast",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Talrad med värdena 3, 4, 4, 9, 10 där median 4 och medel 6 är markerade">
<path d="M20 120H300" ${ST} stroke-width="1.5"/>
<g fill="currentColor"><circle cx="30" cy="110" r="9" opacity="0.5"/><circle cx="67" cy="110" r="9" opacity="0.5"/><circle cx="67" cy="90" r="9" opacity="0.5"/><circle cx="252" cy="110" r="9" opacity="0.5"/><circle cx="289" cy="110" r="9" opacity="0.5"/></g>
<path d="M141 124L134 136H148Z" fill="currentColor"/>
<path d="M67 60V74M62 69L67 76L72 69" ${ST} stroke-width="2"/>
<g ${T} text-anchor="middle"><text x="30" y="150">3</text><text x="67" y="150">4</text><text x="252" y="150">9</text><text x="289" y="150">10</text>
<text x="67" y="52">median = 4 = typvärde</text><text x="141" y="162">medel = 6</text>
<text x="160" y="190">Sorterat: 3, 4, 4, 9, 10</text></g>
</svg>`,
    why: "Medelvärdet är 'rättvis delning': alla får lika mycket så att summan blir densamma. Medianen är det som hamnar mitt i en sorterad rad och påverkas inte av en extremt stor siffra. Typvärdet är det som förekommer oftast.",
    example: {
      prompt: "Talen 3, 9, 4, 4, 10. Bestäm medelvärde, median och typvärde.",
      steps: ["Sortera: 3, 4, 4, 9, 10", "Medel: (3+4+4+9+10) / 5 = 30/5 = 6", "Median (mittersta av 5): 4", "Typvärde (vanligast): 4"]
    },
    trap: "Att ta medianen innan du sorterat. Vid jämnt antal tal är medianen medelvärdet av de två mittersta. Och 'medel' ändras av extremvärden, median gör det inte.",
    link: { label: "Matteboken: Medelvärde, median och typvärde (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/statistik-och-sannolikhet/medelvarde-median-och-typvarde" }
  },
  {
    id: "kort-hastighet",
    title: "Hastighet, sträcka och tid",
    matches: ["hastighet", "Hastighet"],
    formula: "s = v · t    v = s / t    t = s / v",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangel med s överst och v och t nederst">
<g ${ST} stroke-width="2"><rect x="30" y="30" width="130" height="120" rx="6"/><path d="M30 85H160M95 85V150"/></g>
<g font-family="system-ui, sans-serif" fill="currentColor" font-size="16" text-anchor="middle"><text x="95" y="65">s</text><text x="62" y="124">v</text><text x="128" y="124">t</text></g>
<g ${T}><text x="185" y="70">s = v · t</text><text x="185" y="95">v = s / t</text><text x="185" y="120">t = s / v</text><text x="30" y="180">Täck det du söker, då ser du formeln.</text></g>
</svg>`,
    why: "Hastighet är 'hur långt per tidsenhet'. 90 km/h betyder 90 km varje timme, så sträckan blir hastighet gånger antal timmar. Enheterna hjälper dig: km/h · h ger km.",
    example: {
      prompt: "Du cyklar 90 km på 1 h 15 min. Vilken medelhastighet?",
      steps: ["Tid i timmar: 15 min = 0,25 h, så 1,25 h", "v = s / t = 90 / 1,25", "= 72 km/h"]
    },
    trap: "Att skriva 1 h 15 min som 1,15 h. Minuter är sextiondelar: 15 min = 0,25 h. Gör alltid om tiden till samma enhet som hastigheten.",
    link: { label: "Matteboken: Beräkna medelhastigheten", url: "https://www.matteboken.se/lektioner/matte-1/aritmetik/decimaltal/exempel/berakna-medelhastigheten" }
  },
  {
    id: "kort-talteori",
    title: "Talteori: delbarhet och primtal",
    matches: ["talteori", "Talteori"],
    formula: "Delbart med 2: jämnt slut. 3: siffersumman delbar med 3. 5: slutar på 0 eller 5. Primtal: bara 1 och sig själv",
    why: "Ett tal är delbart med 3 om siffersumman är det, eftersom 10, 100 och så vidare alltid ger rest 1 vid division med 3. Primtal är byggstenarna: varje heltal går att dela upp i primtal. Därför räcker det att pröva primtalsdelare för att avgöra om ett tal är primtal.",
    example: {
      prompt: "Är 91 ett primtal?",
      steps: ["Inte jämnt, så inte delbart med 2", "Siffersumma 9 + 1 = 10, inte delbart med 3", "Slutar inte på 0/5, så inte med 5", "Pröva 7: 7 · 13 = 91, alltså inte ett primtal"]
    },
    trap: "1 är inte ett primtal, och 2 är det enda jämna primtalet. 91 och 51 ser primtalsaktiga ut men är det inte (7·13 och 3·17).",
    link: { label: "Matteboken: Minsta gemensamma nämnare (primtal och delbarhet, med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/minsta-gemensamma-namnare" }
  },
  {
    id: "kort-funktioner",
    title: "Funktioner",
    matches: ["funktioner", "Funktioner"],
    formula: "f(x) = regel:  x in → ett f(x) ut.   Hitta x: sätt f(x) = värdet och lös",
    svg: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grafen till f(x) = x² − 1 där y = 3 skär vid x = −2 och x = 2">
<g ${ST} stroke-width="1.2"><path d="M60 150H270M160 190V10"/></g>
<polyline points="85,30 98,71 110,105 122,131 135,150 148,161 160,165 172,161 185,150 198,131 210,105 222,71 235,30" ${ST} stroke-width="2.5"/>
<path d="M70 105H255" ${ST} stroke-dasharray="4 3"/>
<path d="M110 105V150M210 105V150" ${ST} stroke-dasharray="2 3" opacity="0.7"/>
<g fill="currentColor"><circle cx="110" cy="105" r="4"/><circle cx="210" cy="105" r="4"/></g>
<g ${T} text-anchor="middle"><text x="160" y="16" dx="70">f(x) = x² − 1</text><text x="110" y="168">x = −2</text><text x="210" y="168">x = 2</text><text x="262" y="100">y = 3</text></g>
</svg>`,
    why: "En funktion är en maskin: samma x ger alltid exakt ett svar f(x), och grafen visar alla par (x, f(x)). Frågan 'när är f(x) = 3?' blir 'var skär grafen linjen y = 3?', och där kan det finnas flera x.",
    example: {
      prompt: "f(x) = x² − 1. Bestäm f(3) och lös f(x) = 3.",
      steps: ["f(3) = 3² − 1 = 8", "f(x) = 3 → x² − 1 = 3 → x² = 4", "x = 2 eller x = −2 (båda ger 3)"]
    },
    trap: "Att bara ge den positiva roten, eller blanda ihop f(x) och x: f(3) betyder 'sätt in x = 3', inte 'f gånger 3'.",
    link: { label: "Matteboken: Funktionsbegreppet (med video)", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/funktioner/funktionsbegreppet" },
    mnemonic: "f(x) är bara ett annat namn för y. f(3) = \"vad blir y när x är 3?\": byt ut varje x mot 3. f(x) = 3 = \"vilket x ger y = 3?\": lös ekvationen. Räta linjen f(x) = kx + m är en funktion som ritar ett rakt streck; har x en exponent (x²) blir grafen böjd.",
    extraLinks: [
      { label: "Matteboken: Räta linjens ekvation (en sorts funktion)", url: "https://www.matteboken.se/lektioner/matte-1/funktioner/rata-linjens-ekvation" },
      { label: "Testa själv: välj k och m och se linjen ändras (GeoGebra, Matematik 2, kapitel 1)", url: "https://mat.geogebra.org/m/cebyeeqp" }
    ]
  }
];
