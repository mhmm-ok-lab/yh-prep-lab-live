import type { HpTwin } from "./hp-twins";

// DTK på provnivå (id "dtkh-…"): fyra täta underlag med tre uppgifter vardera, egna påhittade orter och siffror.
// Svårigheten ligger som på provet i att HITTA rätt uppgift: två y-axlar, tusental, fotnoter, klassindelad karta
// och totaler som står under diagrammet. Genereras och kontrollräknas av ett Python-skript (svaren räknas fram
// från samma siffror som ritas). Nivå: 3 lätta, 3 medel, 6 svåra. Delas ut före de äldre DTK-uppgifterna.

const DTKH_A =
  "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 282\" role=\"img\" aria-label=\"Älvstad. Färdigställda lägenheter (staplar, vänster axel) och folkmängd i tusental (linje, höger axel) 2016–2024\" font-family=\"system-ui, -apple-system, Segoe UI, sans-serif\" font-size=\"11\" fill=\"currentColor\"><text x=\"8\" y=\"16\" font-size=\"12\" font-weight=\"600\">Bostadsbyggande och folkmängd i Älvstad</text><text x=\"8\" y=\"30\" fill-opacity=\"0.8\">Åren 2016–2024</text><rect x=\"8\" y=\"40\" width=\"12\" height=\"10\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"26\" y=\"49\">Färdigställda lägenheter, antal (vänster axel)</text><line x1=\"8\" y1=\"61\" x2=\"20\" y2=\"61\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"14\" cy=\"61\" r=\"3\"/><text x=\"26\" y=\"65\">Folkmängd, tusental (höger axel)</text><line x1=\"42\" y1=\"250.0\" x2=\"302\" y2=\"250.0\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"254.0\" text-anchor=\"end\">0</text><text x=\"306\" y=\"254.0\">40</text><line x1=\"42\" y1=\"234.2\" x2=\"302\" y2=\"234.2\" stroke=\"currentColor\" stroke-opacity=\"0.07\" stroke-width=\"0.7\"/><line x1=\"42\" y1=\"218.4\" x2=\"302\" y2=\"218.4\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"222.4\" text-anchor=\"end\">200</text><text x=\"306\" y=\"222.4\">42</text><line x1=\"42\" y1=\"202.6\" x2=\"302\" y2=\"202.6\" stroke=\"currentColor\" stroke-opacity=\"0.07\" stroke-width=\"0.7\"/><line x1=\"42\" y1=\"186.8\" x2=\"302\" y2=\"186.8\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"190.8\" text-anchor=\"end\">400</text><text x=\"306\" y=\"190.8\">44</text><line x1=\"42\" y1=\"171.0\" x2=\"302\" y2=\"171.0\" stroke=\"currentColor\" stroke-opacity=\"0.07\" stroke-width=\"0.7\"/><line x1=\"42\" y1=\"155.2\" x2=\"302\" y2=\"155.2\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"159.2\" text-anchor=\"end\">600</text><text x=\"306\" y=\"159.2\">46</text><line x1=\"42\" y1=\"139.4\" x2=\"302\" y2=\"139.4\" stroke=\"currentColor\" stroke-opacity=\"0.07\" stroke-width=\"0.7\"/><line x1=\"42\" y1=\"123.6\" x2=\"302\" y2=\"123.6\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"127.6\" text-anchor=\"end\">800</text><text x=\"306\" y=\"127.6\">48</text><line x1=\"42\" y1=\"107.8\" x2=\"302\" y2=\"107.8\" stroke=\"currentColor\" stroke-opacity=\"0.07\" stroke-width=\"0.7\"/><line x1=\"42\" y1=\"92.0\" x2=\"302\" y2=\"92.0\" stroke=\"currentColor\" stroke-opacity=\"0.18\" stroke-width=\"0.7\"/><text x=\"38\" y=\"96.0\" text-anchor=\"end\">1 000</text><text x=\"306\" y=\"96.0\">50</text><rect x=\"48.4\" y=\"186.8\" width=\"16\" height=\"63.2\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"56.4\" y=\"264\" text-anchor=\"middle\">2016</text><rect x=\"77.3\" y=\"171.0\" width=\"16\" height=\"79.0\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"85.3\" y=\"264\" text-anchor=\"middle\">2017</text><rect x=\"106.2\" y=\"139.4\" width=\"16\" height=\"110.6\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"114.2\" y=\"264\" text-anchor=\"middle\">2018</text><rect x=\"135.1\" y=\"123.6\" width=\"16\" height=\"126.4\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"143.1\" y=\"264\" text-anchor=\"middle\">2019</text><rect x=\"164.0\" y=\"155.2\" width=\"16\" height=\"94.8\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"172.0\" y=\"264\" text-anchor=\"middle\">2020</text><rect x=\"192.9\" y=\"186.8\" width=\"16\" height=\"63.2\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"200.9\" y=\"264\" text-anchor=\"middle\">2021</text><rect x=\"221.8\" y=\"155.2\" width=\"16\" height=\"94.8\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"229.8\" y=\"264\" text-anchor=\"middle\">2022</text><rect x=\"250.7\" y=\"107.8\" width=\"16\" height=\"142.2\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"258.7\" y=\"264\" text-anchor=\"middle\">2023</text><rect x=\"279.6\" y=\"202.6\" width=\"16\" height=\"47.4\" fill=\"currentColor\" fill-opacity=\"0.3\"/><text x=\"287.6\" y=\"264\" text-anchor=\"middle\">2024</text><polyline points=\"56.4,218.4 85.3,202.6 114.2,186.8 143.1,171.0 172.0,155.2 200.9,155.2 229.8,139.4 258.7,107.8 287.6,92.0\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"56.4\" cy=\"218.4\" r=\"3\"/><circle cx=\"85.3\" cy=\"202.6\" r=\"3\"/><circle cx=\"114.2\" cy=\"186.8\" r=\"3\"/><circle cx=\"143.1\" cy=\"171.0\" r=\"3\"/><circle cx=\"172.0\" cy=\"155.2\" r=\"3\"/><circle cx=\"200.9\" cy=\"155.2\" r=\"3\"/><circle cx=\"229.8\" cy=\"139.4\" r=\"3\"/><circle cx=\"258.7\" cy=\"107.8\" r=\"3\"/><circle cx=\"287.6\" cy=\"92.0\" r=\"3\"/><line x1=\"42\" y1=\"250\" x2=\"302\" y2=\"250\" stroke=\"currentColor\" stroke-width=\"1\"/><text x=\"8\" y=\"84\" fill-opacity=\"0.8\">Antal</text><text x=\"338\" y=\"84\" text-anchor=\"end\" fill-opacity=\"0.8\">Tusental</text></svg>";

const DTKH_B =
  "<div class=\"hp-dtk-sheet\"><p class=\"hp-dtk-sheet-title\">Kommunerna i Norrvik län år 2024</p><div class=\"hp-twin-table-wrap\"><table class=\"hp-twin-table hp-dtk-table\"><thead><tr><th>Kommun</th><th>Folkmängd<br>(tusental)</th><th>Förändring<br>2014–2024 (%)</th><th>Andel 65 år<br>och äldre (%)</th><th>Arbets-<br>löshet¹ (%)</th><th>Nya företag<br>per 1 000 inv.</th></tr></thead><tbody><tr><td>Askeby</td><td>12,4</td><td>+3,3</td><td>24,1</td><td>5,8</td><td>4,2</td></tr><tr><td>Bergvik</td><td>38,5</td><td>+12,0</td><td>18,6</td><td>7,9</td><td>6,1</td></tr><tr><td>Dalsjö</td><td>8,2</td><td>−6,8</td><td>29,4</td><td>6,4</td><td>3,1</td></tr><tr><td>Ekeholm</td><td>21,0</td><td>+5,0</td><td>21,3</td><td>4,6</td><td>5,5</td></tr><tr><td>Fjällnäs</td><td>5,6</td><td>−12,5</td><td>31,2²</td><td>8,8</td><td>2,7</td></tr><tr><td>Grönby</td><td>44,0</td><td>+32,0</td><td>16,9</td><td>6,7</td><td>7,4</td></tr><tr><td>Holmvik</td><td>15,3</td><td>−2,5</td><td>26,0</td><td>5,1</td><td>3,8</td></tr><tr><td>Kvarnby</td><td>27,6</td><td>+15,0</td><td>19,8</td><td>9,4</td><td>4,9</td></tr><tr><td>Lövstad</td><td>9,9</td><td>+1,0</td><td>27,5</td><td>3,9</td><td>3,3</td></tr><tr><td>Mossberga</td><td>32,2</td><td>−8,0</td><td>22,7</td><td>7,2</td><td>4,4</td></tr></tbody></table></div><p class=\"hp-dtk-note\">¹ Andel av befolkningen 16–64 år som är inskriven som arbetslös.<br>² Uppgiften avser år 2022 eftersom 2024 års uppgift saknas.</p></div>";

const DTKH_C =
  "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 312\" role=\"img\" aria-label=\"Karta över Västmora län med sex kommuner. Siffran anger antal nyregistrerade personbilar 2025, tonen anger andelen elbilar\" font-family=\"system-ui, -apple-system, Segoe UI, sans-serif\" font-size=\"11\" fill=\"currentColor\"><text x=\"8\" y=\"16\" font-size=\"12\" font-weight=\"600\">Nyregistrerade personbilar i Västmora län 2025</text><text x=\"8\" y=\"30\" fill-opacity=\"0.8\">Siffran = antal nyregistrerade bilar. Ton = andel elbilar.</text><path d=\"M10 50 H58 V240 H10 Z\" fill=\"currentColor\" fill-opacity=\"0.03\"/><path d=\"M16 62 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 76 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 90 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 104 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 118 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 132 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 146 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 160 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 174 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 188 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 202 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 216 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><path d=\"M16 230 q6 -4 12 0 t12 0 t12 0\" fill=\"none\" stroke=\"currentColor\" stroke-opacity=\"0.25\" stroke-width=\"0.8\"/><text x=\"34\" y=\"150\" text-anchor=\"middle\" font-weight=\"600\" fill-opacity=\"0.7\" transform=\"rotate(-90 34 146)\">HAVET</text><polygon points=\"60,50 140,50 200,118 120,132 60,135\" fill=\"currentColor\" fill-opacity=\"0.36\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><polygon points=\"140,50 250,50 240,110 200,118\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><polygon points=\"250,50 330,50 330,160 255,180 240,110\" fill=\"currentColor\" fill-opacity=\"0.06\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><polygon points=\"60,135 120,132 150,240 60,240\" fill=\"currentColor\" fill-opacity=\"0.06\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><polygon points=\"120,132 200,118 240,110 255,180 230,240 150,240\" fill=\"currentColor\" fill-opacity=\"0.55\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><polygon points=\"255,180 330,160 330,240 230,240\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/><rect x=\"77\" y=\"77\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"108\" y=\"89\" text-anchor=\"middle\" font-weight=\"600\">Sjöholm</text><text x=\"108\" y=\"103\" text-anchor=\"middle\">2 400</text><rect x=\"169\" y=\"61\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"200\" y=\"73\" text-anchor=\"middle\" font-weight=\"600\">Norrlida</text><text x=\"200\" y=\"87\" text-anchor=\"middle\">1 600</text><rect x=\"260\" y=\"97\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"291\" y=\"109\" text-anchor=\"middle\" font-weight=\"600\">Tallmo</text><text x=\"291\" y=\"123\" text-anchor=\"middle\">700</text><rect x=\"67\" y=\"175\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"98\" y=\"187\" text-anchor=\"middle\" font-weight=\"600\">Brattby</text><text x=\"98\" y=\"201\" text-anchor=\"middle\">1 100</text><rect x=\"164\" y=\"161\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"195\" y=\"173\" text-anchor=\"middle\" font-weight=\"600\">Holmsta</text><text x=\"195\" y=\"187\" text-anchor=\"middle\">5 800</text><rect x=\"259\" y=\"199\" width=\"62\" height=\"30\" rx=\"4\" style=\"fill:var(--card)\" fill-opacity=\"0.92\"/><text x=\"290\" y=\"211\" text-anchor=\"middle\" font-weight=\"600\">Ekdala</text><text x=\"290\" y=\"225\" text-anchor=\"middle\">900</text><text x=\"8\" y=\"262\" font-weight=\"600\">Andel elbilar av de nyregistrerade bilarna</text><rect x=\"8\" y=\"272\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.06\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"30\" y=\"282\">Under 20 %</text><rect x=\"168\" y=\"272\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.2\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"190\" y=\"282\">20–29 %</text><rect x=\"8\" y=\"292\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.36\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"30\" y=\"302\">30–39 %</text><rect x=\"168\" y=\"292\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.55\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"190\" y=\"302\">40 % eller mer</text></svg>";

const DTKH_D =
  "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 228\" role=\"img\" aria-label=\"Hushållens energianvändning i Ravlunda 2015 och 2025, procentuell fördelning på energislag\" font-family=\"system-ui, -apple-system, Segoe UI, sans-serif\" font-size=\"11\" fill=\"currentColor\"><text x=\"8\" y=\"16\" font-size=\"12\" font-weight=\"600\">Hushållens energianvändning i Ravlunda</text><text x=\"8\" y=\"30\" fill-opacity=\"0.8\">Fördelning på energislag, procent</text><text x=\"44\" y=\"70\" text-anchor=\"end\" font-weight=\"600\">2015</text><rect x=\"50.0\" y=\"48\" width=\"98.4\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.42\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"99.2\" y=\"69\" text-anchor=\"middle\">40 %</text><rect x=\"148.4\" y=\"48\" width=\"73.8\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.26\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"185.3\" y=\"69\" text-anchor=\"middle\">30 %</text><rect x=\"222.2\" y=\"48\" width=\"49.2\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.13\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"246.8\" y=\"69\" text-anchor=\"middle\">20 %</text><rect x=\"271.4\" y=\"48\" width=\"24.6\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.03\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"300\" y=\"69\">10 %</text><text x=\"44\" y=\"122\" text-anchor=\"end\" font-weight=\"600\">2025</text><rect x=\"50.0\" y=\"100\" width=\"110.7\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.42\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"105.3\" y=\"121\" text-anchor=\"middle\">45 %</text><rect x=\"160.7\" y=\"100\" width=\"86.1\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.26\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"203.8\" y=\"121\" text-anchor=\"middle\">35 %</text><rect x=\"246.8\" y=\"100\" width=\"36.9\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.13\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"265.2\" y=\"121\" text-anchor=\"middle\">15 %</text><rect x=\"283.7\" y=\"100\" width=\"12.3\" height=\"34\" fill=\"currentColor\" fill-opacity=\"0.03\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"300\" y=\"121\">5 %</text><rect x=\"8\" y=\"160\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.42\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"30\" y=\"170\">El</text><rect x=\"70\" y=\"160\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.26\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"92\" y=\"170\">Fjärrvärme</text><rect x=\"160\" y=\"160\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.13\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"182\" y=\"170\">Biobränsle</text><rect x=\"250\" y=\"160\" width=\"16\" height=\"12\" fill=\"currentColor\" fill-opacity=\"0.03\" stroke=\"currentColor\" stroke-width=\"0.8\"/><text x=\"272\" y=\"170\">Olja</text><text x=\"8\" y=\"196\" fill-opacity=\"0.8\">Total energianvändning i hushållen:</text><text x=\"8\" y=\"212\" fill-opacity=\"0.8\">2015: 80 GWh · 2025: 64 GWh (GWh = gigawattimmar)</text></svg>";

export const HP_TWINS_DTK_HP: HpTwin[] = [
  {
    id: "dtkh-a1",
    level: "latt",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Vilket år färdigställdes flest lägenheter i Älvstad?",
    figure: DTKH_A,
    options: ["2019", "2023", "2024", "2018"],
    correct: 1,
    solution:
      "Staplarna visar lägenheterna. Den högsta stapeln står vid 2023 och når 900 på vänster axel. 2024 har högst folkmängd (linjen), men där är stapeln lägst, 300.",
    hint:
      "Titta på teckenförklaringen: lägenheterna är staplarna, inte linjen. Leta upp den högsta stapeln."
  },
  {
    id: "dtkh-a2",
    level: "medel",
    delprov: "DTK",
    area: "förändring",
    prompt: "Med ungefär hur många procent ökade folkmängden i Älvstad från 2016 till 2024?",
    figure: DTKH_A,
    options: ["Ca 8 %", "Ca 16 %", "Ca 19 %", "Ca 25 %"],
    correct: 2,
    solution:
      "Folkmängden läses på höger axel (tusental): 42 000 år 2016 och 50 000 år 2024. Ökningen är 8 000, och 8 000/42 000 ≈ 0,19 = 19 %. 16 % får man om man delar med slutvärdet 50 000, och 25 % om man räknar från axelns nollpunkt 40 i stället för 42.",
    hint:
      "Linjen hör till höger axel, som börjar på 40 och inte på 0. Läs av båda åren och dela ökningen med 2016 års värde."
  },
  {
    id: "dtkh-a3",
    level: "svar",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Ungefär hur många lägenheter per 1 000 invånare färdigställdes i Älvstad år 2019?",
    figure: DTKH_A,
    options: ["Ca 1,8", "Ca 18", "Ca 56", "Ca 180"],
    correct: 1,
    solution:
      "2019: stapeln når 800 lägenheter (vänster axel) och linjen 45 på höger axel, alltså 45 000 invånare. 800/45 000 · 1 000 = 800/45 ≈ 17,8 ≈ 18. 1,8 och 180 blir det om man missar att höger axel anges i tusental; 56 får man om man delar invånarna med lägenheterna (45 000/800).",
    hint:
      "Du behöver båda axlarna: lägenheterna från staplarna (vänster) och folkmängden från linjen (höger, i tusental). Per 1 000 invånare = antal ÷ (folkmängd i tusental)."
  },
  {
    id: "dtkh-b1",
    level: "latt",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Vilken kommun hade lägst arbetslöshet år 2024?",
    figure: DTKH_B,
    options: ["Ekeholm", "Lövstad", "Askeby", "Fjällnäs"],
    correct: 1,
    solution:
      "I kolumnen Arbetslöshet är det lägsta värdet 3,9 %, i Lövstad. Ekeholm har 4,6 %. Fjällnäs har lägst värde i kolumnen Nya företag, inte i arbetslöshetskolumnen.",
    hint:
      "Leta bara i kolumnen Arbetslöshet och jämför alla tio raderna."
  },
  {
    id: "dtkh-b2",
    level: "svar",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "I hur många kommuner var mer än var fjärde invånare 65 år eller äldre år 2024? Räkna bara kommuner där uppgiften avser år 2024.",
    figure: DTKH_B,
    options: ["2", "3", "4", "5"],
    correct: 1,
    solution:
      "Var fjärde = 25 %. Över 25 % har Dalsjö (29,4), Fjällnäs (31,2), Holmvik (26,0) och Lövstad (27,5). Men Fjällnäs värde har fotnot ²: det avser 2022. Kvar blir 3 kommuner. 4 får den som missar fotnoten.",
    hint:
      "Översätt ”var fjärde” till procent och leta i kolumnen för 65 år och äldre. Läs sedan fotnoterna under tabellen."
  },
  {
    id: "dtkh-b3",
    level: "svar",
    delprov: "DTK",
    area: "förändring",
    prompt: "Vilken kommun hade flest invånare år 2014?",
    figure: DTKH_B,
    options: ["Grönby", "Bergvik", "Mossberga", "Kvarnby"],
    correct: 2,
    solution:
      "Folkmängden 2014 = folkmängden 2024 delad med (1 + förändringen). Grönby: 44,0/1,32 ≈ 33,3 tusen. Bergvik: 38,5/1,12 ≈ 34,4 tusen. Mossberga: 32,2/0,92 = 35,0 tusen. Kvarnby: 27,6/1,15 = 24,0 tusen. Mossberga hade alltså flest. Grönby är störst 2024 men har vuxit mest.",
    hint:
      "Tabellen visar folkmängden 2024 och hur mycket den har förändrats sedan 2014. Räkna baklänges: värdet 2014 är värdet 2024 delat med (1 + förändringen), inte värdet 2024 minus procenten."
  },
  {
    id: "dtkh-c1",
    level: "latt",
    delprov: "DTK",
    area: "avläsning",
    prompt: "I hur många av länets kommuner var minst 30 procent av de nyregistrerade bilarna elbilar?",
    figure: DTKH_C,
    options: ["1", "2", "3", "4"],
    correct: 1,
    solution:
      "Minst 30 % motsvarar de två mörkaste tonerna (30–39 % och 40 % eller mer). Sjöholm har 30–39 % och Holmsta 40 % eller mer: 2 kommuner.",
    hint:
      "Jämför kommunernas ton med teckenförklaringen under kartan. Siffrorna i kartan är antal bilar, inte procent."
  },
  {
    id: "dtkh-c2",
    level: "medel",
    delprov: "DTK",
    area: "andel",
    prompt: "Ungefär hur stor andel av länets nyregistrerade bilar registrerades i Holmsta?",
    figure: DTKH_C,
    options: ["Ca 40 %", "Ca 46 %", "Ca 54 %", "Ca 87 %"],
    correct: 1,
    solution:
      "Hela länet: 2 400 + 1 600 + 700 + 1 100 + 5 800 + 900 = 12 500 bilar. Holmsta: 5 800/12 500 ≈ 0,46 = 46 %. 87 % får man om man delar med de övriga kommunerna (6 700) i stället för med hela länet; 40 % är Holmstas elbilsandel, inte andelen bilar.",
    hint:
      "Lägg ihop siffrorna i alla sex kommuner. Andelen = Holmstas antal delat med länets totala antal."
  },
  {
    id: "dtkh-c3",
    level: "svar",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Minst hur många av de nyregistrerade bilarna i länet var elbilar år 2025?",
    figure: DTKH_C,
    options: ["2 320", "3 540", "3 900", "5 000"],
    correct: 1,
    solution:
      "Använd varje klass lägsta värde: Holmsta 40 % · 5 800 = 2 320, Sjöholm 30 % · 2 400 = 720, Norrlida 20 % · 1 600 = 320, Ekdala 20 % · 900 = 180. Tallmo och Brattby (under 20 %) kan ha 0. Summa: 3 540. 3 900 blir det om man räknar 20 % även för klassen ”under 20 %”; 5 000 är 40 % av hela länet.",
    hint:
      "”Minst” betyder att du ska räkna med den lägsta procentsatsen i varje kommuns klass. Vad är den lägsta möjliga andelen i klassen ”under 20 %”?"
  },
  {
    id: "dtkh-d1",
    level: "medel",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur många GWh el använde hushållen i Ravlunda år 2025?",
    figure: DTKH_D,
    options: ["Ca 29 GWh", "Ca 32 GWh", "Ca 36 GWh", "Ca 45 GWh"],
    correct: 0,
    solution:
      "El var 45 % år 2025. Den totala användningen 2025 står under diagrammet: 64 GWh. 0,45 · 64 = 28,8 ≈ 29 GWh. 36 GWh får man med 2015 års total (80 GWh), 32 GWh är elen 2015 och 45 är procenttalet.",
    hint:
      "Diagrammet visar bara procent. Den totala mängden för varje år står under teckenförklaringen."
  },
  {
    id: "dtkh-d2",
    level: "svar",
    delprov: "DTK",
    area: "förändring",
    prompt: "Hur förändrades hushållens användning av fjärrvärme, räknat i GWh, från 2015 till 2025?",
    figure: DTKH_D,
    options: ["Den ökade med ca 17 %", "Den ökade med ca 5 %", "Den minskade med ca 7 %", "Den minskade med ca 20 %"],
    correct: 2,
    solution:
      "2015: 30 % av 80 = 24 GWh. 2025: 35 % av 64 = 22,4 GWh. Förändring: −1,6/24 ≈ −0,067, alltså en minskning med ca 7 %. Andelen ökade (30 → 35 %), men totalen minskade så mycket att mängden ändå sjönk. 17 % är andelarnas ökning (35/30), 5 är procentenheter och 20 % är totalens minskning.",
    hint:
      "En större andel av en mindre total kan vara mindre. Räkna om båda åren till GWh med totalerna under diagrammet innan du jämför."
  },
  {
    id: "dtkh-d3",
    level: "svar",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Vilket av följande påståenden stämmer för hushållens energianvändning från 2015 till 2025?",
    figure: DTKH_D,
    options: ["Användningen av el ökade, räknat i GWh.", "Användningen av olja halverades, räknat i GWh.", "Användningen av biobränsle minskade med fler GWh än användningen av olja.", "Användningen av biobränsle minskade med mindre än 30 %."],
    correct: 2,
    solution:
      "Räkna om till GWh. El: 32 → 28,8 (minskade). Olja: 8 → 3,2, en minskning med 60 % (inte en halvering). Biobränsle: 16 → 9,6, en minskning med 6,4 GWh eller 40 %. Olja minskade med 4,8 GWh. Biobränsle minskade alltså med fler GWh än olja.",
    hint:
      "Procentandelarna går inte att jämföra direkt mellan åren eftersom totalen ändras. Gör om varje energislag till GWh för båda åren och pröva påståendena ett i taget."
  }
];
