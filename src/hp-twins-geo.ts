import type { HpTwin } from "./hp-twins";

// Tvillingar med geometrisk figur för XYZ och KVA (id "geo-…").
// Källa: UHR:s provhäften (kvantitativ del) på studera.nu, hämtade som PDF med curl och
// lästa med Python (pypdf/PyMuPDF). Figurerna i originalen är bilder; här är varje figur
// ny inline-SVG av samma typ, men med egna mått, vinklar, värden och egen formulering.
// Inga UHR-texter, siffror eller figurer återges.

const HOSTEN_2025_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-facit-och-normering-hosten-2025/";
const VAREN_2025_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2025/";
const VAREN_2024_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2024/";
const HOSTEN_2023_URL =
  "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2023/";

// Fasta KVA-alternativ i exakt ordning (samma som övriga KVA-tvillingar).
const KVA_OPTIONS = [
  "I är större än II",
  "II är större än I",
  "I är lika med II",
  "Informationen är otillräcklig"
];

export const HP_TWINS_GEO: HpTwin[] = [
  {
    id: "geo-01",
    delprov: "XYZ",
    area: "vinklar (parallella linjer)",
    prompt:
      "Linjerna L₁ och L₂ är parallella. Hur stor är vinkeln v?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Två parallella linjer L1 och L2 skärs av två linjer som korsar varandra. Vinklarna 33 grader och 118 grader är markerade, v är sökt." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="50" x2="300" y2="50"/><line x1="20" y1="175" x2="300" y2="175"/><text x="14" y="54" text-anchor="end" font-size="13" fill="currentColor" stroke="none">L₁</text><text x="14" y="179" text-anchor="end" font-size="13" fill="currentColor" stroke="none">L₂</text><line x1="33.4" y1="189" x2="269" y2="36"/><line x1="202.4" y1="189" x2="121.1" y2="36"/><path d="M81 175 A26 26 0 0 0 76.8 160.8"/><text x="99" y="170" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">33°</text><path d="M219 175 A24 24 0 0 0 183.7 153.8"/><text x="233" y="151" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">118°</text><path d="M169.4 126.8 A22 22 0 0 0 177.5 95.4"/><text x="195.1" y="121.4" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">v</text></svg>`,
    options: [
      "118°",
      "147°",
      "95°",
      "85°"
    ],
    correct: 2,
    hint:
      "Titta på triangeln som L₂ och de två korsande linjerna bildar. Du vet två av dess vinklar efter att ha tänkt på nabovinklar. Vad ger vinkelsumman för den tredje, och hur hänger v ihop med den?",
    solution:
      "Triangeln mellan L₂ och de två linjerna har vinkeln 33° vid den vänstra skärningen. Vid den högra skärningen är den inre vinkeln 180° − 118° = 62° (nabovinkel). Tredje vinkeln, vid korsningen, är 180° − 33° − 62° = 85°. Vinkeln v är nabovinkel till den: v = 180° − 85° = 95° (yttervinkel: v = 33° + 62°).",
    twinOf: {
      prov: "2025-10-19",
      provpass: 1,
      uppgift: 2,
      url: HOSTEN_2025_URL
    }
  },
  {
    id: "geo-02",
    delprov: "XYZ",
    area: "cirklar och vinklar (area)",
    prompt:
      "De fyra cirklarna har radien 2 cm. Cirklarnas medelpunkter ligger i fyrhörningens hörn. Hur stor är den sammanlagda arean av de skuggade områdena?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Fyrhörningen ABCD med fyra cirklar med radien 2 cm, medelpunkter i hörnen. De delar av cirklarna som ligger utanför fyrhörningen är skuggade." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M72 60 L97.7 55.9 A26 26 0 1 0 80 84.8 Z" fill="currentColor" fill-opacity="0.2" stroke="none"/><circle cx="72" cy="60" r="26" stroke-width="1.2"/><path d="M236 34 L242.2 59.3 A26 26 0 1 0 210.3 38.1 Z" fill="currentColor" fill-opacity="0.2" stroke="none"/><circle cx="236" cy="34" r="26" stroke-width="1.2"/><path d="M262 140 L236.5 145.3 A26 26 0 1 0 255.8 114.7 Z" fill="currentColor" fill-opacity="0.2" stroke="none"/><circle cx="262" cy="140" r="26" stroke-width="1.2"/><path d="M108 172 L100 147.2 A26 26 0 1 0 133.5 166.7 Z" fill="currentColor" fill-opacity="0.2" stroke="none"/><circle cx="108" cy="172" r="26" stroke-width="1.2"/><path d="M72 60 L236 34 L262 140 L108 172 Z"/><text x="37" y="49.1" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">A</text><text x="262.7" y="10.9" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">B</text><text x="297.1" y="158.6" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">C</text><text x="83" y="204.6" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">D</text><line x1="108" y1="172" x2="108" y2="198" stroke-width="1.2"/><text x="112" y="212" text-anchor="start" font-size="12" fill="currentColor" stroke="none">2 cm</text></svg>`,
    options: [
      "12π cm²",
      "16π cm²",
      "14π cm²",
      "8π cm²"
    ],
    correct: 0,
    hint:
      "Skuggat är hela cirkeln minus den sektor som ligger inuti fyrhörningen. Vad blir summan av de fyra sektorernas vinklar, och hur stor del av en cirkel är det?",
    solution:
      "En cirkel har arean π · 2² = 4π cm², så fyra cirklar ger 16π cm². Sektorerna inuti fyrhörningen har vinklar som tillsammans är fyrhörningens vinkelsumma 360°, alltså lika mycket som en hel cirkel: 4π cm². Skuggad area = 16π − 4π = 12π cm².",
    twinOf: {
      prov: "2025-04-05",
      provpass: 3,
      uppgift: 12,
      url: VAREN_2025_URL
    }
  },
  {
    id: "geo-03",
    delprov: "XYZ",
    area: "räta linjen i koordinatsystem",
    prompt:
      "För linjen L med ekvationen y = kx + m gäller att k är positivt. Linjen L skär y-axeln i punkten (0, 6). Tillsammans med x-axeln och y-axeln avgränsar L en triangel med arean 9 areaenheter.\n\nVilket svarsalternativ anger skärningspunkten mellan linjen L och x-axeln?\n\nKoordinatsystemet kan användas för att lösa uppgiften.",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Koordinatsystem med x-axel och y-axel, skalstreck och rutnät." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="33" x2="17" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="30" y1="33" x2="30" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="43" y1="33" x2="43" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="56" y1="33" x2="56" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="69" y1="33" x2="69" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="82" y1="33" x2="82" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="95" y1="33" x2="95" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="108" y1="33" x2="108" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="121" y1="33" x2="121" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="134" y1="33" x2="134" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="147" y1="33" x2="147" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="173" y1="33" x2="173" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="186" y1="33" x2="186" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="199" y1="33" x2="199" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="212" y1="33" x2="212" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="225" y1="33" x2="225" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="238" y1="33" x2="238" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="251" y1="33" x2="251" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="264" y1="33" x2="264" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="277" y1="33" x2="277" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="290" y1="33" x2="290" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="303" y1="33" x2="303" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="202" x2="303" y2="202" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="189" x2="303" y2="189" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="176" x2="303" y2="176" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="163" x2="303" y2="163" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="137" x2="303" y2="137" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="124" x2="303" y2="124" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="111" x2="303" y2="111" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="98" x2="303" y2="98" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="85" x2="303" y2="85" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="72" x2="303" y2="72" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="59" x2="303" y2="59" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="46" x2="303" y2="46" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="33" x2="303" y2="33" stroke-width="0.6" opacity="0.25"/><line x1="17" y1="150" x2="312.1" y2="150" stroke-width="1.6"/><line x1="160" y1="202" x2="160" y2="23.9" stroke-width="1.6"/><path d="M305.1 146.5 L312.1 150 L305.1 153.5 M156.5 30.9 L160 23.9 L163.5 30.9" stroke-width="1.4"/><text x="310.1" y="166" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><text x="170" y="31.9" text-anchor="start" font-size="13" fill="currentColor" stroke="none" font-style="italic">y</text><line x1="30" y1="147" x2="30" y2="153" stroke-width="1.2"/><text x="30" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">−10</text><line x1="56" y1="147" x2="56" y2="153" stroke-width="1.2"/><text x="56" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">−8</text><line x1="82" y1="147" x2="82" y2="153" stroke-width="1.2"/><text x="82" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">−6</text><line x1="108" y1="147" x2="108" y2="153" stroke-width="1.2"/><text x="108" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">−4</text><line x1="134" y1="147" x2="134" y2="153" stroke-width="1.2"/><text x="134" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">−2</text><line x1="186" y1="147" x2="186" y2="153" stroke-width="1.2"/><text x="186" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">2</text><line x1="212" y1="147" x2="212" y2="153" stroke-width="1.2"/><text x="212" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">4</text><line x1="238" y1="147" x2="238" y2="153" stroke-width="1.2"/><text x="238" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">6</text><line x1="264" y1="147" x2="264" y2="153" stroke-width="1.2"/><text x="264" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">8</text><line x1="290" y1="147" x2="290" y2="153" stroke-width="1.2"/><text x="290" y="166" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">10</text><line x1="157" y1="202" x2="163" y2="202" stroke-width="1.2"/><text x="153" y="206" text-anchor="end" font-size="12" fill="currentColor" stroke="none">−4</text><line x1="157" y1="176" x2="163" y2="176" stroke-width="1.2"/><text x="153" y="180" text-anchor="end" font-size="12" fill="currentColor" stroke="none">−2</text><line x1="157" y1="124" x2="163" y2="124" stroke-width="1.2"/><text x="153" y="128" text-anchor="end" font-size="12" fill="currentColor" stroke="none">2</text><line x1="157" y1="98" x2="163" y2="98" stroke-width="1.2"/><text x="153" y="102" text-anchor="end" font-size="12" fill="currentColor" stroke="none">4</text><line x1="157" y1="72" x2="163" y2="72" stroke-width="1.2"/><text x="153" y="76" text-anchor="end" font-size="12" fill="currentColor" stroke="none">6</text><line x1="157" y1="46" x2="163" y2="46" stroke-width="1.2"/><text x="153" y="50" text-anchor="end" font-size="12" fill="currentColor" stroke="none">8</text><text x="154" y="163" text-anchor="end" font-size="12" fill="currentColor" stroke="none">0</text></svg>`,
    options: [
      "(3, 0)",
      "(−3, 0)",
      "(−6, 0)",
      "(−3/2, 0)"
    ],
    correct: 1,
    hint:
      "Triangelns höjd är avståndet från origo till (0, 6). Använd areaformeln för att få basens längd, och avgör sedan åt vilket håll på x-axeln skärningspunkten ligger när k är positivt.",
    solution:
      "Triangeln har höjden 6 (längs y-axeln) och basen b längs x-axeln. Arean ½ · 6 · b = 9 ger b = 3, så skärningen är (3, 0) eller (−3, 0). Linjen är y = kx + 6 med k > 0, så den stiger åt höger och skär x-axeln där kx + 6 = 0, alltså x = −6/k < 0. Skärningspunkten är (−3, 0), vilket ger k = 2.",
    twinOf: {
      prov: "2025-10-19",
      provpass: 1,
      uppgift: 8,
      url: HOSTEN_2025_URL
    }
  },
  {
    id: "geo-04",
    delprov: "XYZ",
    area: "Pythagoras i rektangel",
    prompt:
      "För rektangeln ABCD gäller att AB = 8 cm och BC = 11 cm. Hur lång är sträckan PQ?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Rektangeln ABCD. P ligger på sidan AD med DP = 9 cm. Q ligger på sidan BC med BQ = 7 cm. Sträckan PQ är dragen." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M110 187 L230 187 L230 22 L110 22 Z"/><line x1="110" y1="157" x2="230" y2="82"/><circle cx="110" cy="157" r="3" fill="currentColor" stroke="none"/><circle cx="230" cy="82" r="3" fill="currentColor" stroke="none"/><text x="104" y="201" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="236" y="201" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="236" y="18" text-anchor="start" font-size="13" fill="currentColor" stroke="none">C</text><text x="104" y="18" text-anchor="end" font-size="13" fill="currentColor" stroke="none">D</text><text x="119" y="161" text-anchor="start" font-size="13" fill="currentColor" stroke="none">P</text><text x="221" y="86" text-anchor="end" font-size="13" fill="currentColor" stroke="none">Q</text><path d="M118 187 L118 179 L110 179" stroke-width="1"/><path d="M222 187 L222 179 L230 179" stroke-width="1"/><path d="M222 22 L222 30 L230 30" stroke-width="1"/><path d="M118 22 L118 30 L110 30" stroke-width="1"/><line x1="76" y1="22" x2="107" y2="22" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="76" y1="157" x2="107" y2="157" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="82" y1="22" x2="82" y2="157" stroke-width="1"/><path d="M79 28 L82 22 L85 28 M79 151 L82 157 L85 151" stroke-width="1"/><text x="76" y="93.5" text-anchor="end" font-size="13" fill="currentColor" stroke="none">9 cm</text><line x1="233" y1="82" x2="264" y2="82" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="233" y1="187" x2="264" y2="187" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="258" y1="82" x2="258" y2="187" stroke-width="1"/><path d="M255 88 L258 82 L261 88 M255 181 L258 187 L261 181" stroke-width="1"/><text x="264" y="138.5" text-anchor="start" font-size="13" fill="currentColor" stroke="none">7 cm</text></svg>`,
    options: [
      "√145 cm",
      "√185 cm",
      "√68 cm",
      "√89 cm"
    ],
    correct: 3,
    hint:
      "Dra en hjälplinje från P parallellt med AB. Då blir PQ hypotenusa i en rätvinklig triangel. Vilken är den ena kateten, och hur stor är höjdskillnaden mellan P och Q?",
    solution:
      "P ligger 9 cm från D, alltså AP = 11 − 9 = 2 cm över A. Q ligger 7 cm över B. Höjdskillnaden mellan P och Q är 7 − 2 = 5 cm, och sidled är avståndet AB = 8 cm. Pythagoras: PQ² = 8² + 5² = 64 + 25 = 89, så PQ = √89 cm.",
    twinOf: {
      prov: "2025-10-19",
      provpass: 4,
      uppgift: 5,
      url: HOSTEN_2025_URL
    }
  },
  {
    id: "geo-05",
    delprov: "XYZ",
    area: "omkrets med cirkelbågar",
    prompt:
      "En figur är konstruerad av sträckor och cirkelbågar. Cirkelbågarna är kvartscirklar.\n\nVilken omkrets har figuren?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Figur med rak överkant, rak nederkant och raka sidor, där övre hörnen är bortskurna med kvartscirklar med radien x. Bredden är 4x och höjden 3x." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M94 78 L162 78 A34 34 0 0 0 196 112 L196 180 L60 180 L60 112 A34 34 0 0 0 94 78 Z" stroke-width="2"/><line x1="94" y1="78" x2="94" y2="194" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="162" y1="78" x2="162" y2="194" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="60" y1="112" x2="60" y2="194" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="196" y1="112" x2="196" y2="194" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="162" y1="78" x2="236" y2="78" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="199" y1="112" x2="236" y2="112" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="199" y1="146" x2="236" y2="146" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="199" y1="180" x2="236" y2="180" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="60" y1="194" x2="94" y2="194" stroke-width="1"/><path d="M66 191 L60 194 L66 197 M88 191 L94 194 L88 197" stroke-width="1"/><text x="77" y="208" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="94" y1="194" x2="128" y2="194" stroke-width="1"/><path d="M100 191 L94 194 L100 197 M122 191 L128 194 L122 197" stroke-width="1"/><text x="111" y="208" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="128" y1="194" x2="162" y2="194" stroke-width="1"/><path d="M134 191 L128 194 L134 197 M156 191 L162 194 L156 197" stroke-width="1"/><text x="145" y="208" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="162" y1="194" x2="196" y2="194" stroke-width="1"/><path d="M168 191 L162 194 L168 197 M190 191 L196 194 L190 197" stroke-width="1"/><text x="179" y="208" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="230" y1="78" x2="230" y2="112" stroke-width="1"/><path d="M227 84 L230 78 L233 84 M227 106 L230 112 L233 106" stroke-width="1"/><text x="240" y="99" text-anchor="start" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="230" y1="112" x2="230" y2="146" stroke-width="1"/><path d="M227 118 L230 112 L233 118 M227 140 L230 146 L233 140" stroke-width="1"/><text x="240" y="133" text-anchor="start" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="230" y1="146" x2="230" y2="180" stroke-width="1"/><path d="M227 152 L230 146 L233 152 M227 174 L230 180 L233 174" stroke-width="1"/><text x="240" y="167" text-anchor="start" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><path d="M68 180 L68 172 L60 172" stroke-width="1"/><path d="M188 180 L188 172 L196 172" stroke-width="1"/><path d="M102 78 L102 86 L94 86" stroke-width="1"/><path d="M154 78 L154 86 L162 86" stroke-width="1"/></svg>`,
    options: [
      "(12 − π)x²",
      "(10 + 2π)x",
      "(10 + π)x",
      "(12 + π)x"
    ],
    correct: 2,
    hint:
      "Gå runt figuren och dela upp omkretsen i raka sträckor och bågar. Ta hänsyn till att kvartscirklarna med radien x \"äter\" upp en del av de raka sidorna.",
    solution:
      "Nederkanten är 4x. Överkanten mellan bågarna är 4x − x − x = 2x. Vänster och höger sida är 3x − x = 2x vardera, alltså 4x tillsammans. Raka delar: 4x + 2x + 4x = 10x. Två kvartscirklar med radien x ger 2 · (2πx / 4) = πx. Omkrets = 10x + πx = (10 + π)x.",
    twinOf: {
      prov: "2025-10-19",
      provpass: 4,
      uppgift: 10,
      url: HOSTEN_2025_URL
    }
  },
  {
    id: "geo-06",
    delprov: "XYZ",
    area: "kvadrat och cirkel (area)",
    prompt:
      "A, B och C är tre av hörnen i en kvadrat med sidlängden 5 cm. Kvadratens fjärde hörn, M, är medelpunkten för en cirkel med radien 3 cm.\n\nHur stor är arean av det skuggade området i figuren?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Kvadraten ABCM med sidlängden 5 cm. En cirkel med radien 3 cm har medelpunkt i M. Den del av kvadraten som ligger utanför cirkeln är skuggad." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M145 72 L105 72 L105 172 L205 172 L205 132 A60 60 0 0 1 145 72 Z" fill="currentColor" fill-opacity="0.2" stroke="none"/><path d="M205 72 L105 72 L105 172 L205 172 Z" stroke-width="1.6"/><circle cx="205" cy="72" r="60"/><text x="175" y="87" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">3 cm</text><circle cx="205" cy="72" r="2.5" fill="currentColor" stroke="none"/><text x="95" y="76" text-anchor="end" font-size="13" fill="currentColor" stroke="none">C</text><text x="95" y="176" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="213" y="176" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="214" y="66" text-anchor="start" font-size="13" fill="currentColor" stroke="none">M</text><path d="M113 172 L113 164 L105 164" stroke-width="1"/><path d="M197 172 L197 164 L205 164" stroke-width="1"/><path d="M113 72 L113 80 L105 80" stroke-width="1"/><text x="155" y="189" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">5 cm</text></svg>`,
    options: [
      "(25 − 9π/2) cm²",
      "(25 − 3π/2) cm²",
      "(25 − 3π) cm²",
      "(25 − 9π/4) cm²"
    ],
    correct: 3,
    hint:
      "Skuggat område = kvadraten minus den del av cirkeln som ligger inuti kvadraten. Hur stor del av cirkeln är det, när medelpunkten är ett hörn?",
    solution:
      "Kvadratens area är 5 · 5 = 25 cm². Medelpunkten M är ett hörn med rät vinkel, och radien 3 cm är kortare än sidan, så den del av cirkeln som ligger i kvadraten är en kvartscirkel: π · 3² / 4 = 9π/4 cm². Skuggad area = 25 − 9π/4 cm².",
    twinOf: {
      prov: "2024-04-13",
      provpass: 5,
      uppgift: 8,
      url: VAREN_2024_URL
    }
  },
  {
    id: "geo-07",
    delprov: "XYZ",
    area: "kvadrat och rätvinklig triangel",
    prompt:
      "En rätvinklig triangel och en kvadrat är placerade enligt figuren. Hur lång är sträckan x?",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="En kvadrat med arean 36 cm² och en rätvinklig triangel med arean 15 cm² placerade så att triangelns ena katet ligger längs kvadratens sida. Sträckan x är kvadratens sida plus triangelns andra katet." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M95 195 L179 195 L179 111 L95 111 Z"/><line x1="95" y1="41" x2="179" y2="111"/><line x1="95" y1="41" x2="95" y2="111"/><path d="M103 195 L103 187 L95 187" stroke-width="1"/><path d="M171 195 L171 187 L179 187" stroke-width="1"/><path d="M171 111 L171 119 L179 119" stroke-width="1"/><path d="M103 111 L103 103 L95 103" stroke-width="1"/><text x="137" y="157" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">36 cm²</text><text x="101" y="97" text-anchor="start" font-size="12" fill="currentColor" stroke="none">15 cm²</text><line x1="63" y1="41" x2="92" y2="41" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="63" y1="195" x2="92" y2="195" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><line x1="69" y1="41" x2="69" y2="195" stroke-width="1"/><path d="M66 47 L69 41 L72 47 M66 189 L69 195 L72 189" stroke-width="1"/><text x="63" y="122" text-anchor="end" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    options: [
      "10 cm",
      "11 cm",
      "12 cm",
      "13 cm"
    ],
    correct: 1,
    hint:
      "Kvadratens area ger dess sida. Den sidan är också triangelns ena katet (basen). Vad säger triangelns area om den andra kateten? Vad är x i förhållande till de två längderna?",
    solution:
      "Kvadratens sida är √36 = 6 cm. Den sidan är triangelns bas. Triangelns area ½ · 6 · h = 15 ger h = 5 cm. Sträckan x är kvadratens sida plus triangelns höjd: x = 6 + 5 = 11 cm.",
    twinOf: {
      prov: "2024-04-13",
      provpass: 2,
      uppgift: 1,
      url: VAREN_2024_URL
    }
  },
  {
    id: "geo-08",
    delprov: "KVA",
    area: "areor i rektangel",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nFyrhörningen ABCD är en rektangel och punkten P ligger på sidan AB. Arean av triangeln APD är 6 cm² och arean av triangeln PBC är 9 cm².\n\nKvantitet I: Arean av triangeln PCD\nKvantitet II: 15 cm²",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Rektangeln ABCD med punkten P på sidan AB. Triangeln APD har arean 6 kvadratcentimeter och triangeln PBC har arean 9 kvadratcentimeter." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M40 160 L280 160 L280 40 L40 40 Z"/><line x1="40" y1="40" x2="136" y2="160"/><line x1="136" y1="160" x2="280" y2="40"/><circle cx="136" cy="160" r="2.5" fill="currentColor" stroke="none"/><text x="31" y="165" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="289" y="165" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="289" y="44" text-anchor="start" font-size="13" fill="currentColor" stroke="none">C</text><text x="31" y="44" text-anchor="end" font-size="13" fill="currentColor" stroke="none">D</text><text x="136" y="178" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">P</text><text x="78" y="125" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">6 cm²</text><text x="222" y="125" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">9 cm²</text><path d="M48 160 L48 152 L40 152" stroke-width="1"/><path d="M272 160 L272 152 L280 152" stroke-width="1"/></svg>`,
    options: KVA_OPTIONS,
    correct: 2,
    hint:
      "Triangeln PCD har sidan DC som bas och samma höjd som rektangeln. Vilken del av rektangelns area är den, oavsett var P ligger?",
    solution:
      "Triangeln PCD har basen DC och höjden lika med rektangelns höjd, så dess area är hälften av rektangelns area. Rektangeln består av de tre trianglarna: R = 6 + 9 + z. Eftersom z = R/2 är 6 + 9 = z, alltså z = 15 cm². Kvantitet I är 15 cm², lika med Kvantitet II.",
    twinOf: {
      prov: "2025-10-19",
      provpass: 4,
      uppgift: 18,
      url: HOSTEN_2025_URL
    }
  },
  {
    id: "geo-09",
    delprov: "KVA",
    area: "rätvinklig triangel och kvadrat (area)",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nTriangeln ABC är rätvinklig med den räta vinkeln i A. Fyrhörningen DEFG är en kvadrat.\n\nKvantitet I: Arean av triangeln ABC\nKvantitet II: Arean av kvadraten DEFG",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="En rätvinklig triangel ABC med räta vinkeln i A, AB = 3 cm och BC = √13 cm, samt en kvadrat DEFG med sidan 1,7 cm." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M30 180 L156 180 L30 96 Z"/><path d="M38 180 L38 172 L30 172" stroke-width="1"/><text x="22" y="185" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="164" y="185" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="22" y="100" text-anchor="end" font-size="13" fill="currentColor" stroke="none">C</text><text x="93" y="198" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">3 cm</text><text x="113" y="132" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">√13 cm</text><path d="M210 180 L281 180 L281 109 L210 109 Z"/><path d="M218 180 L218 172 L210 172" stroke-width="1"/><path d="M273 180 L273 172 L281 172" stroke-width="1"/><path d="M273 109 L273 117 L281 117" stroke-width="1"/><path d="M218 109 L218 117 L210 117" stroke-width="1"/><text x="202" y="185" text-anchor="end" font-size="13" fill="currentColor" stroke="none">D</text><text x="289" y="185" text-anchor="start" font-size="13" fill="currentColor" stroke="none">E</text><text x="289" y="113" text-anchor="start" font-size="13" fill="currentColor" stroke="none">F</text><text x="202" y="113" text-anchor="end" font-size="13" fill="currentColor" stroke="none">G</text><text x="245.5" y="198" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">1,7 cm</text></svg>`,
    options: KVA_OPTIONS,
    correct: 0,
    hint:
      "Triangelns area behöver två kateter, men bara en är given. Använd Pythagoras för att få den andra. Jämför sedan med kvadratens area uträknad som tal.",
    solution:
      "Pythagoras: AC² + 3² = (√13)², så AC² = 13 − 9 = 4 och AC = 2 cm. Triangelns area är ½ · 3 · 2 = 3 cm². Kvadratens area är 1,7² = 2,89 cm². Eftersom 3 > 2,89 är Kvantitet I större.",
    twinOf: {
      prov: "2025-04-05",
      provpass: 3,
      uppgift: 17,
      url: VAREN_2025_URL
    }
  },
  {
    id: "geo-10",
    delprov: "KVA",
    area: "vinklar och parallella linjer i triangel",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nI triangeln ABC är DE parallell med AB.\n\nKvantitet I: x\nKvantitet II: y",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Triangeln ABC där D ligger på CA och E på CB och DE är parallell med AB. Vinkeln ADE är 105 grader, vinkeln DEC är 62 grader. Vinklarna x vid C och y vid B är markerade." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M95 195 L225 195 L138.6 32.4 Z"/><line x1="114.6" y1="121.8" x2="186.1" y2="121.8"/><text x="86" y="200" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="234" y="200" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="135.6" y="24.4" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">C</text><text x="105.6" y="125.8" text-anchor="end" font-size="13" fill="currentColor" stroke="none">D</text><text x="196.1" y="123.8" text-anchor="start" font-size="13" fill="currentColor" stroke="none">E</text><path d="M110.2 138.3 A17 17 0 0 0 131.6 121.8"/><text x="146.6" y="146.8" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">105°</text><path d="M176.7 104.2 A20 20 0 0 0 166.1 121.8"/><text x="156.1" y="109.8" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">62°</text><path d="M131.8 57.5 A26 26 0 0 0 150.8 55.4"/><text x="140.6" y="78.4" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><path d="M213.7 173.8 A24 24 0 0 0 201 195"/><text x="187" y="183" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">y</text></svg>`,
    options: KVA_OPTIONS,
    correct: 1,
    hint:
      "Eftersom DE är parallell med AB är vissa vinklar lika (likbelägna vinklar). Vilken vinkel är lika med y? Använd sedan vinkelsumman i triangeln CDE.",
    solution:
      "DE ∥ AB, så vinkeln DEC och vinkeln ABC är likbelägna: y = 62°. Vinkeln CDE är nabovinkel till ADE: 180° − 105° = 75°. I triangeln CDE gäller x = 180° − 75° − 62° = 43°. Alltså x < y, och Kvantitet II är större.",
    twinOf: {
      prov: "2025-04-05",
      provpass: 3,
      uppgift: 21,
      url: VAREN_2025_URL
    }
  },
  {
    id: "geo-11",
    delprov: "KVA",
    area: "vinklar i rektangel (tangens)",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nFyrhörningen ABCD är en rektangel. Sträckan DQ är kortare än sträckan BP.\n\nKvantitet I: v\nKvantitet II: w",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="Rektangeln ABCD med punkten Q på sidan DC och punkten P på sidan AB. Vinkeln v är vinkeln DQA och vinkeln w är vinkeln BPC." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M40 165 L280 165 L280 45 L40 45 Z"/><line x1="40" y1="165" x2="120" y2="45"/><line x1="165" y1="165" x2="280" y2="45"/><circle cx="120" cy="45" r="2.5" fill="currentColor" stroke="none"/><circle cx="165" cy="165" r="2.5" fill="currentColor" stroke="none"/><text x="31" y="170" text-anchor="end" font-size="13" fill="currentColor" stroke="none">A</text><text x="289" y="170" text-anchor="start" font-size="13" fill="currentColor" stroke="none">B</text><text x="289" y="49" text-anchor="start" font-size="13" fill="currentColor" stroke="none">C</text><text x="31" y="49" text-anchor="end" font-size="13" fill="currentColor" stroke="none">D</text><text x="120" y="36" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">Q</text><text x="165" y="183" text-anchor="middle" font-size="13" fill="currentColor" stroke="none">P</text><path d="M98 45 A22 22 0 0 0 107.8 63.3"/><text x="86" y="67" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">v</text><path d="M189 165 A24 24 0 0 0 181.6 147.7"/><text x="207" y="153" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">w</text><path d="M272 165 L272 157 L280 157" stroke-width="1"/><path d="M48 45 L48 53 L40 53" stroke-width="1"/></svg>`,
    options: KVA_OPTIONS,
    correct: 0,
    hint:
      "Vinkeln v ligger i en rätvinklig triangel med DQ som ena katet, och w i en rätvinklig triangel med BP som ena katet. Vilken katet är gemensam i längd? Fundera på tangens för vinklarna.",
    solution:
      "I den rätvinkliga triangeln ADQ är tan v = AD / DQ, och i triangeln PBC är tan w = BC / BP. Sidorna AD och BC är lika långa (motstående sidor i rektangeln). Eftersom DQ < BP är AD / DQ > BC / BP, alltså tan v > tan w. Båda vinklarna är spetsiga, så v > w. Kvantitet I är större.",
    twinOf: {
      prov: "2025-04-05",
      provpass: 5,
      uppgift: 19,
      url: VAREN_2025_URL
    }
  },
  {
    id: "geo-12",
    delprov: "KVA",
    area: "vinklar vid rät linje",
    prompt:
      "Uppgiften består av två kvantiteter, I och II. Din uppgift är att jämföra dem.\n\nL är en rät linje.\n\nKvantitet I: x + y\nKvantitet II: 75°",
    figure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="En rät linje L med en punkt O och fyra strålar från O. De fem vinklarna mellan strålarna och linjen är markerade x, x, 40 grader, y och y." font-family="system-ui, sans-serif" font-size="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="20" y1="185" x2="300" y2="185"/><text x="14" y="179" text-anchor="end" font-size="13" fill="currentColor" stroke="none">L</text><circle cx="160" cy="185" r="2.5" fill="currentColor" stroke="none"/><line x1="160" y1="185" x2="43.1" y2="117.5"/><line x1="160" y1="185" x2="92.5" y2="68.1"/><line x1="160" y1="185" x2="183.4" y2="52.1"/><line x1="160" y1="185" x2="263.4" y2="98.2"/><path d="M123.6 164 A42 42 0 0 0 118 185" stroke-width="1.2"/><text x="104" y="174" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><path d="M128 129.6 A64 64 0 0 0 104.6 153" stroke-width="1.2"/><text x="103.4" y="132.4" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">x</text><path d="M167.3 143.6 A42 42 0 0 0 139 148.6" stroke-width="1.2"/><text x="149.9" y="131.9" text-anchor="middle" font-size="12" fill="currentColor" stroke="none">40°</text><path d="M209 143.9 A64 64 0 0 0 171.1 122" stroke-width="1.2"/><text x="200" y="119.7" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">y</text><path d="M202 185 A42 42 0 0 0 192.2 158" stroke-width="1.2"/><text x="214.5" y="169.2" text-anchor="middle" font-size="13" fill="currentColor" stroke="none" font-style="italic">y</text></svg>`,
    options: KVA_OPTIONS,
    correct: 1,
    hint:
      "Alla fem markerade vinklar ligger på ena sidan om den räta linjen, så de ger tillsammans en rak vinkel. Teckna en ekvation med vinklarna och lös ut x + y.",
    solution:
      "Vinklarna x, x, 40°, y och y bildar tillsammans en rak vinkel: 2x + 40° + 2y = 180°. Då är 2(x + y) = 140°, alltså x + y = 70°. Eftersom 70° < 75° är Kvantitet II större.",
    twinOf: {
      prov: "2023-10-22",
      provpass: 4,
      uppgift: 16,
      url: HOSTEN_2023_URL
    }
  }
];
