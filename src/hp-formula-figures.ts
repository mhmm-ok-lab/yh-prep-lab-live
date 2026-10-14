// Figurer till formelträningen (2026-10-14): en enkel bild per geometri-/vinkelformel, så att man ser
// vad bokstäverna står för. Inline SVG med currentColor, fungerar i mörkt läge. Ingen DOM här.

const T = `font-family="system-ui, sans-serif" font-size="12" fill="currentColor"`;
const S = `stroke="currentColor" fill="none" stroke-width="2"`;
const FILL = `fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2"`;
const DASH = `stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"`;
const svg = (label: string, body: string) =>
  `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${body}</svg>`;
const rightAngle = (x: number, y: number) => `<path d="M${x} ${y - 8}H${x + 8}V${y}" stroke="currentColor" stroke-width="1.2" fill="none"/>`;

export const FORMULA_FIGURES: Record<string, string> = {
  "rektangel-area": svg(
    "Rektangel med basen b och höjden h",
    `<rect x="40" y="20" width="120" height="70" ${FILL}/><g ${T}><text x="100" y="108" text-anchor="middle">b</text><text x="168" y="59">h</text><text x="100" y="59" text-anchor="middle">A</text></g>`
  ),
  "rektangel-omkrets": svg(
    "Rektangel där alla fyra sidor räknas: b, h, b, h",
    `<rect x="40" y="20" width="120" height="70" ${S} stroke-width="3"/><g ${T}><text x="100" y="14" text-anchor="middle">b</text><text x="100" y="108" text-anchor="middle">b</text><text x="28" y="59">h</text><text x="168" y="59">h</text></g>`
  ),
  "triangel-area": svg(
    "Triangel med basen b och höjden h vinkelrätt mot basen",
    `<polygon points="30,95 170,95 115,20" ${FILL}/><line x1="115" y1="20" x2="115" y2="95" ${DASH}/>${rightAngle(115, 95)}<g ${T}><text x="100" y="112" text-anchor="middle">b</text><text x="120" y="62">h</text></g>`
  ),
  "parallellogram-area": svg(
    "Parallellogram med basen och höjden vinkelrätt mot basen",
    `<polygon points="50,95 170,95 150,25 30,25" ${FILL}/><line x1="70" y1="25" x2="70" y2="95" ${DASH}/>${rightAngle(70, 95)}<g ${T}><text x="110" y="112" text-anchor="middle">bas</text><text x="76" y="64">höjd</text></g>`
  ),
  "trapets-area": svg(
    "Parallelltrapets med parallella sidor a och b och höjden h",
    `<polygon points="25,95 175,95 135,25 65,25" ${FILL}/><line x1="100" y1="25" x2="100" y2="95" ${DASH}/>${rightAngle(100, 95)}<g ${T}><text x="100" y="18" text-anchor="middle">a</text><text x="100" y="112" text-anchor="middle">b</text><text x="106" y="64">h</text></g>`
  ),
  "cirkel-area": svg(
    "Cirkel med radien r från mitten till kanten",
    `<circle cx="100" cy="60" r="42" ${FILL}/><line x1="100" y1="60" x2="142" y2="60" stroke="currentColor" stroke-width="2"/><circle cx="100" cy="60" r="2.5" fill="currentColor"/><g ${T}><text x="118" y="54" text-anchor="middle">r</text></g>`
  ),
  "cirkel-omkrets": svg(
    "Cirkel: omkretsen är kanten runt, diametern d = 2r",
    `<circle cx="100" cy="60" r="42" ${S} stroke-width="3"/><line x1="58" y1="60" x2="142" y2="60" ${DASH}/><circle cx="100" cy="60" r="2.5" fill="currentColor"/><g ${T}><text x="100" y="54" text-anchor="middle">d</text><text x="150" y="28">O</text></g>`
  ),
  "sektor-area": svg(
    "Cirkelsektor med vinkeln v och radien r",
    `<path d="M100 100 L170 100 A70 70 0 0 0 135 39.4 Z" ${FILL}/><g ${T}><text x="118" y="94">v</text><text x="140" y="114" text-anchor="middle">r</text></g>`
  ),
  bagl: svg(
    "Cirkelsektor där bågen är den böjda kanten",
    `<path d="M100 100 L170 100 M100 100 L135 39.4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M170 100 A70 70 0 0 0 135 39.4" ${S} stroke-width="3.5"/><g ${T}><text x="118" y="94">v</text><text x="162" y="58">båge</text></g>`
  ),
  "ratblock-volym": svg(
    "Rätblock med längden l, bredden b och höjden h",
    `<polygon points="30,45 130,45 130,105 30,105" ${FILL}/><polygon points="30,45 60,20 160,20 130,45" ${S} stroke-width="1.5"/><polygon points="130,45 160,20 160,80 130,105" ${S} stroke-width="1.5"/><g ${T}><text x="80" y="118" text-anchor="middle">l</text><text x="150" y="102">b</text><text x="18" y="78">h</text></g>`
  ),
  "prisma-volym": svg(
    "Prisma: basytan B gånger höjden h",
    `<polygon points="30,100 90,100 60,50" ${FILL}/><polygon points="110,80 170,80 140,30" ${S} stroke-width="1.5"/><path d="M30 100L110 80M90 100L170 80M60 50L140 30" ${S} stroke-width="1.5"/><g ${T}><text x="60" y="90" text-anchor="middle">B</text><text x="134" y="104">h</text></g>`
  ),
  "cylinder-volym": svg(
    "Cylinder med radien r och höjden h",
    `<ellipse cx="100" cy="98" rx="45" ry="11" ${FILL}/><path d="M55 25V98M145 25V98" ${S}/><ellipse cx="100" cy="25" rx="45" ry="11" ${S}/><line x1="100" y1="98" x2="145" y2="98" stroke="currentColor" stroke-width="1.5"/><g ${T}><text x="122" y="94" text-anchor="middle">r</text><text x="152" y="66">h</text></g>`
  ),
  "kon-volym": svg(
    "Kon med radien r och höjden h",
    `<ellipse cx="100" cy="98" rx="45" ry="11" ${FILL}/><path d="M55 98L100 15L145 98" ${S}/><line x1="100" y1="15" x2="100" y2="98" ${DASH}/><line x1="100" y1="98" x2="145" y2="98" stroke="currentColor" stroke-width="1.5"/><g ${T}><text x="122" y="94" text-anchor="middle">r</text><text x="106" y="64">h</text></g>`
  ),
  "klot-volym": svg(
    "Klot med radien r",
    `<circle cx="100" cy="60" r="44" ${FILL}/><ellipse cx="100" cy="60" rx="44" ry="11" ${DASH} fill="none"/><line x1="100" y1="60" x2="131" y2="29" stroke="currentColor" stroke-width="2"/><circle cx="100" cy="60" r="2.5" fill="currentColor"/><g ${T}><text x="124" y="52">r</text></g>`
  ),
  pythagoras: svg(
    "Rätvinklig triangel med kateterna a och b och hypotenusan c",
    `<polygon points="45,95 165,95 45,25" ${FILL}/>${rightAngle(45, 95)}<g ${T}><text x="32" y="64">a</text><text x="105" y="112" text-anchor="middle">b</text><text x="112" y="54">c</text></g>`
  ),
  "vinkelsumma-triangel": svg(
    "Triangel med vinklarna v1, v2 och v3 som tillsammans blir 180 grader",
    `<polygon points="30,95 170,95 110,20" ${FILL}/><g ${T}><text x="48" y="90">v₁</text><text x="140" y="90">v₂</text><text x="104" y="42">v₃</text></g>`
  ),
  "vinkelsumma-fyrhorning": svg(
    "Fyrhörning med fyra vinklar som tillsammans blir 360 grader",
    `<polygon points="30,95 165,100 150,25 55,20" ${FILL}/><g ${T}><text x="42" y="88">v₁</text><text x="140" y="92">v₂</text><text x="134" y="40">v₃</text><text x="60" y="36">v₄</text></g>`
  ),
  "vinkelsumma-n": svg(
    "Femhörning: (5 − 2) · 180 grader = 540 grader",
    `<polygon points="100,15 150,50 132,105 68,105 50,50" ${FILL}/><path d="M100 15L68 105M100 15L132 105" ${DASH}/><g ${T}><text x="100" y="118" text-anchor="middle">5 hörn → 3 trianglar</text></g>`
  ),
  yttervinkel: svg(
    "Triangel med förlängd bas: yttervinkeln y är lika med a plus b",
    `<polygon points="30,95 130,95 80,25" ${FILL}/><line x1="130" y1="95" x2="185" y2="95" stroke="currentColor" stroke-width="2"/><path d="M150 95 A20 20 0 0 0 141 79" ${S} stroke-width="1.5"/><g ${T}><text x="48" y="90">a</text><text x="75" y="46">b</text><text x="156" y="84">y</text></g>`
  )
};
