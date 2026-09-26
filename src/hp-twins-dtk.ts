import type { HpTwin } from "./hp-twins";

// Fler DTK-tvillingar. id-prefix: "dtk2-".
export const HP_TWINS_DTK: HpTwin[] = [
  {
    id: "dtk2-01",
    delprov: "DTK",
    area: "procent",
    prompt: "Vilken av städerna hade störst procentuell ökning av antalet cykelpendlare mellan 2010 och 2023?",
    table:
      "| Stad | Cykelpendlare 2010 | Cykelpendlare 2023 | Invånare 2023 |\n|---|---|---|---|\n| Almstad | 8 200 | 14 700 | 92 000 |\n| Björkvik | 5 100 | 6 800 | 61 000 |\n| Cedersund | 12 400 | 15 100 | 145 000 |\n| Dalholm | 3 900 | 9 600 | 48 000 |",
    options: ["Almstad", "Björkvik", "Cedersund", "Dalholm"],
    correct: 3,
    solution:
      "Ökning: Almstad 79%, Björkvik 33%, Cedersund 22%, Dalholm 146%. Dalholm hade störst procentuell ökning (146 procent).",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-02",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av invånarna i Cedersund var cykelpendlare 2023?",
    table:
      "| Stad | Cykelpendlare 2010 | Cykelpendlare 2023 | Invånare 2023 |\n|---|---|---|---|\n| Almstad | 8 200 | 14 700 | 92 000 |\n| Björkvik | 5 100 | 6 800 | 61 000 |\n| Cedersund | 12 400 | 15 100 | 145 000 |\n| Dalholm | 3 900 | 9 600 | 48 000 |",
    options: ["10 procent", "6 procent", "18 procent", "25 procent"],
    correct: 0,
    solution:
      "15 100/145 000 ≈ 10,4 procent, vilket avrundas till 10 procent.",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-03",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur många fler cykelpendlare hade Almstad än Dalholm 2023?",
    table:
      "| Stad | Cykelpendlare 2010 | Cykelpendlare 2023 | Invånare 2023 |\n|---|---|---|---|\n| Almstad | 8 200 | 14 700 | 92 000 |\n| Björkvik | 5 100 | 6 800 | 61 000 |\n| Cedersund | 12 400 | 15 100 | 145 000 |\n| Dalholm | 3 900 | 9 600 | 48 000 |",
    options: ["5 100", "3 200", "6 100", "8 800"],
    correct: 0,
    solution:
      "14 700 - 9 600 = 5 100 = 5 100.",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-04",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av utlåningen på biblioteket Öster utgjordes av barnböcker?",
    table:
      "| Bibliotek | Skönlitteratur | Facklitteratur | Barnböcker | Totalt |\n|---|---|---|---|---|\n| Centrum | 24 000 | 9 000 | 17 000 | 50 000 |\n| Väster | 11 000 | 6 500 | 8 500 | 26 000 |\n| Öster | 15 500 | 5 000 | 14 500 | 35 000 |",
    options: ["41 procent", "35 procent", "30 procent", "50 procent"],
    correct: 0,
    solution:
      "14 500/35 000 ≈ 41 procent.",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 38, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-05",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Hur många lån av facklitteratur gjordes sammanlagt på de tre biblioteken?",
    table:
      "| Bibliotek | Skönlitteratur | Facklitteratur | Barnböcker | Totalt |\n|---|---|---|---|---|\n| Centrum | 24 000 | 9 000 | 17 000 | 50 000 |\n| Väster | 11 000 | 6 500 | 8 500 | 26 000 |\n| Öster | 15 500 | 5 000 | 14 500 | 35 000 |",
    options: ["20 500", "19 500", "18 500", "21 500"],
    correct: 0,
    solution:
      "9 000 + 6 500 + 5 000 = 20 500.",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 39, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-06",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Ungefär hur många gånger fler lån av skönlitteratur hade Centrum jämfört med Öster?",
    table:
      "| Bibliotek | Skönlitteratur | Facklitteratur | Barnböcker | Totalt |\n|---|---|---|---|---|\n| Centrum | 24 000 | 9 000 | 17 000 | 50 000 |\n| Väster | 11 000 | 6 500 | 8 500 | 26 000 |\n| Öster | 15 500 | 5 000 | 14 500 | 35 000 |",
    options: ["1,5 gånger", "1,3 gånger", "1,1 gånger", "2 gånger"],
    correct: 0,
    solution:
      "24 000/15 500 ≈ 1,5 gånger.",
    twinOf: { prov: "2018-10-21", provpass: 2, uppgift: 40, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-07",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Vilken landsdel hade störst landareal per nationalpark?",
    table:
      "| Landsdel | Nationalparker | Naturreservat | Landareal nationalparker (ha) |\n|---|---|---|---|\n| Norra Norrland | 9 | 310 | 210 000 |\n| Södra Norrland | 5 | 480 | 95 000 |\n| Svealand | 3 | 620 | 18 000 |\n| Götaland | 2 | 540 | 6 000 |",
    options: ["Norra Norrland", "Södra Norrland", "Svealand", "Götaland"],
    correct: 0,
    solution:
      "Areal/park: Norra Norrland 23333, Södra Norrland 19000, Svealand 6000, Götaland 3000 ha. Norra Norrland hade störst areal per nationalpark.",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-08",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av det totala antalet naturreservat i de fyra landsdelarna fanns i Svealand?",
    table:
      "| Landsdel | Nationalparker | Naturreservat | Landareal nationalparker (ha) |\n|---|---|---|---|\n| Norra Norrland | 9 | 310 | 210 000 |\n| Södra Norrland | 5 | 480 | 95 000 |\n| Svealand | 3 | 620 | 18 000 |\n| Götaland | 2 | 540 | 6 000 |",
    options: ["32 procent", "24 procent", "20 procent", "40 procent"],
    correct: 0,
    solution:
      "Totalt: 310+480+620+540 = 1950. Svealand: 620/1950 ≈ 32 procent.",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-09",
    delprov: "DTK",
    area: "avläsning",
    prompt: "I hur många av de fyra landsdelarna gällde att naturreservaten var färre än 400 och nationalparkerna fler än 5?",
    table:
      "| Landsdel | Nationalparker | Naturreservat | Landareal nationalparker (ha) |\n|---|---|---|---|\n| Norra Norrland | 9 | 310 | 210 000 |\n| Södra Norrland | 5 | 480 | 95 000 |\n| Svealand | 3 | 620 | 18 000 |\n| Götaland | 2 | 540 | 6 000 |",
    options: ["1", "0", "2", "3"],
    correct: 0,
    solution:
      "Endast Norra Norrland hade både färre än 400 naturreservat (310) och fler än 5 nationalparker (9).",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-10",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Studera antalet observationer över havet. Av vilken art gjordes nio gånger så många observationer 2022 jämfört med 2021?",
    table:
      "| Art | Över havet 2021 | Över havet 2022 | På land 2022 |\n|---|---|---|---|\n| Dvärgpipistrell | 12 | 108 | 640 |\n| Vattenfladdermus | 30 | 45 | 210 |\n| Trollfladdermus | 4 | 36 | 95 |\n| Nordisk fladdermus | 60 | 66 | 480 |",
    options: ["Dvärgpipistrell", "Vattenfladdermus", "Trollfladdermus", "Nordisk fladdermus"],
    correct: 0,
    solution:
      "Kvot 2022/2021 över havet: Dvärgpipistrell 9, Vattenfladdermus 1,5, Trollfladdermus 9, Nordisk fladdermus 1,1. Trollfladdermus hade 36/4 = 9 gånger så många.",
    twinOf: { prov: "2015-10-24", provpass: 5, uppgift: 32, url: "https://www.studera.nu/hogskoleprov/fpn/facit-provfragor-och-normering-hosten-2015/" }
  },
  {
    id: "dtk2-11",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av det sammanlagda antalet observationer av Nordisk fladdermus 2022 (över havet och på land) gjordes över havet?",
    table:
      "| Art | Över havet 2021 | Över havet 2022 | På land 2022 |\n|---|---|---|---|\n| Dvärgpipistrell | 12 | 108 | 640 |\n| Vattenfladdermus | 30 | 45 | 210 |\n| Trollfladdermus | 4 | 36 | 95 |\n| Nordisk fladdermus | 60 | 66 | 480 |",
    options: ["12 procent", "8 procent", "18 procent", "24 procent"],
    correct: 0,
    solution:
      "66/(66+480) = 66/546 ≈ 12 procent.",
    twinOf: { prov: "2015-10-24", provpass: 5, uppgift: 33, url: "https://www.studera.nu/hogskoleprov/fpn/facit-provfragor-och-normering-hosten-2015/" }
  },
  {
    id: "dtk2-12",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur många fler observationer på land gjordes av dvärgpipistrell än av nordisk fladdermus 2022?",
    table:
      "| Art | Över havet 2021 | Över havet 2022 | På land 2022 |\n|---|---|---|---|\n| Dvärgpipistrell | 12 | 108 | 640 |\n| Vattenfladdermus | 30 | 45 | 210 |\n| Trollfladdermus | 4 | 36 | 95 |\n| Nordisk fladdermus | 60 | 66 | 480 |",
    options: ["60", "110", "210", "160"],
    correct: 3,
    solution:
      "640 - 480 = 160 = 160.",
    twinOf: { prov: "2015-10-24", provpass: 5, uppgift: 34, url: "https://www.studera.nu/hogskoleprov/fpn/facit-provfragor-och-normering-hosten-2015/" }
  },
  {
    id: "dtk2-13",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Hur stor var skillnaden mellan Sveriges sammanlagda export och sammanlagda import till/från de fyra världsdelarna?",
    table:
      "| Världsdel | Export (mkr) | Import (mkr) |\n|---|---|---|\n| Europa | 172 400 | 168 900 |\n| Asien | 24 300 | 31 600 |\n| Amerika | 18 900 | 15 200 |\n| Afrika | 5 100 | 2 400 |",
    options: ["2 600 miljoner kr", "6 400 miljoner kr", "9 300 miljoner kr", "12 600 miljoner kr"],
    correct: 0,
    solution:
      "Export totalt: 172 400+24 300+18 900+5 100 = 220 700. Import totalt: 168 900+31 600+15 200+2 400 = 218 100. Skillnad: 2 600 miljoner kr.",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 38, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-14",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Jämför importen från Asien med importen från Amerika. Hur stor var skillnaden i miljoner kronor?",
    table:
      "| Världsdel | Export (mkr) | Import (mkr) |\n|---|---|---|\n| Europa | 172 400 | 168 900 |\n| Asien | 24 300 | 31 600 |\n| Amerika | 18 900 | 15 200 |\n| Afrika | 5 100 | 2 400 |",
    options: ["6 400", "9 300", "21 300", "16 400"],
    correct: 3,
    solution:
      "31 600 - 15 200 = 16 400 miljoner kr.",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 40, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-15",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Till vilken världsdel exporterade Sverige varor till ett värde av 18 900 miljoner kronor?",
    table:
      "| Världsdel | Export (mkr) | Import (mkr) |\n|---|---|---|\n| Europa | 172 400 | 168 900 |\n| Asien | 24 300 | 31 600 |\n| Amerika | 18 900 | 15 200 |\n| Afrika | 5 100 | 2 400 |",
    options: ["Europa", "Asien", "Afrika", "Amerika"],
    correct: 3,
    solution:
      "Enligt tabellen var exportvärdet till Amerika 18 900 miljoner kronor.",
    twinOf: { prov: "2018-10-21", provpass: 4, uppgift: 39, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2018/" }
  },
  {
    id: "dtk2-16",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Vilket fartygsfynd avses? Fyndet var bredare än 4 meter och längre än 20 meter, och det daterades till 1520.",
    table:
      "| Fynd | Längd (m) | Bredd (m) | Daterad |\n|---|---|---|---|\n| Fynd 3 | 9 | 3 | 1490 |\n| Fynd 7 | 16 | 4,5 | medeltida |\n| Fynd 12 | 22 | 6 | 1520 |\n| Fynd 18 | 11 | 3 | 1490 |",
    options: ["Fynd 3", "Fynd 7", "Fynd 18", "Fynd 12"],
    correct: 3,
    solution:
      "Fynd 12 var 22 meter långt, 6 meter brett och daterat till 1520 — det enda som uppfyller alla villkor.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 35, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-17",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur mycket längre var Fynd 12 än Fynd 3?",
    table:
      "| Fynd | Längd (m) | Bredd (m) | Daterad |\n|---|---|---|---|\n| Fynd 3 | 9 | 3 | 1490 |\n| Fynd 7 | 16 | 4,5 | medeltida |\n| Fynd 12 | 22 | 6 | 1520 |\n| Fynd 18 | 11 | 3 | 1490 |",
    options: ["9 meter", "22 meter", "16 meter", "13 meter"],
    correct: 3,
    solution:
      "22 - 9 = 13 meter.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 36, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-18",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Vilka två fynd hade tillsammans en sammanlagd bredd på 6 meter?",
    table:
      "| Fynd | Längd (m) | Bredd (m) | Daterad |\n|---|---|---|---|\n| Fynd 3 | 9 | 3 | 1490 |\n| Fynd 7 | 16 | 4,5 | medeltida |\n| Fynd 12 | 22 | 6 | 1520 |\n| Fynd 18 | 11 | 3 | 1490 |",
    options: ["Fynd 3 och Fynd 18", "Fynd 3 och Fynd 7", "Fynd 7 och Fynd 12", "Fynd 12 och Fynd 18"],
    correct: 0,
    solution:
      "Fynd 3 (3 m) och Fynd 18 (3 m) har tillsammans 3 + 3 = 6 meter bredd.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 37, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-19",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av njurtransplantationerna 2013 gjordes från en levande donator?",
    table:
      "| Organ | 2005 | 2013 | Varav levande donator 2013 |\n|---|---|---|---|\n| Njure | 320 | 450 | 300 |\n| Lever | 110 | 160 | 40 |\n| Hjärta | 40 | 45 | 0 |\n| Lunga | 25 | 60 | 0 |",
    options: ["1/3", "2/5", "3/4", "2/3"],
    correct: 3,
    solution:
      "300/450 = 2/3 ≈ 67 procent.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-20",
    delprov: "DTK",
    area: "förändring",
    prompt: "Studera hur antalet transplantationer förändrades från 2005 till 2013. För vilket organ var den procentuella förändringen störst?",
    table:
      "| Organ | 2005 | 2013 | Varav levande donator 2013 |\n|---|---|---|---|\n| Njure | 320 | 450 | 300 |\n| Lever | 110 | 160 | 40 |\n| Hjärta | 40 | 45 | 0 |\n| Lunga | 25 | 60 | 0 |",
    options: ["Njure", "Lever", "Hjärta", "Lunga"],
    correct: 3,
    solution:
      "Procentuell ökning: Njure 41%, Lever 45%, Hjärta 12%, Lunga 140%. Lunga hade störst ökning (140 procent).",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 32, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-21",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Hur många transplantationer av de fyra organen gjordes sammanlagt 2013, i genomsnitt per organ?",
    table:
      "| Organ | 2005 | 2013 | Varav levande donator 2013 |\n|---|---|---|---|\n| Njure | 320 | 450 | 300 |\n| Lever | 110 | 160 | 40 |\n| Hjärta | 40 | 45 | 0 |\n| Lunga | 25 | 60 | 0 |",
    options: ["129", "179", "229", "279"],
    correct: 1,
    solution:
      "(450+160+45+60)/4 = 715/4 = 179.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 33, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-22",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av industrins totala utgifter för miljöskydd 2018 utgjordes av löpande kostnader?",
    table:
      "| År | Investeringar (mkr) | Löpande kostnader (mkr) |\n|---|---|---|\n| 2015 | 3 200 | 5 800 |\n| 2018 | 2 600 | 6 900 |\n| 2021 | 4 100 | 7 400 |",
    options: ["50 procent", "60 procent", "82 procent", "73 procent"],
    correct: 3,
    solution:
      "6 900/(2 600+6 900) = 6 900/9 500 ≈ 73 procent.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-23",
    delprov: "DTK",
    area: "avläsning",
    prompt: "För hur många av de tre redovisade åren gäller att investeringarna var mindre än 4 000 miljoner kronor samtidigt som de löpande kostnaderna var större än 6 000 miljoner kronor?",
    table:
      "| År | Investeringar (mkr) | Löpande kostnader (mkr) |\n|---|---|---|\n| 2015 | 3 200 | 5 800 |\n| 2018 | 2 600 | 6 900 |\n| 2021 | 4 100 | 7 400 |",
    options: ["0", "1", "2", "3"],
    correct: 1,
    solution:
      "Endast 2018 hade investeringar under 4 000 mkr (2 600) samtidigt som löpande kostnader var över 6 000 mkr (6 900).",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 34, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-24",
    delprov: "DTK",
    area: "förändring",
    prompt: "Med hur mycket ökade industrins totala utgifter för miljöskydd (investeringar och löpande kostnader tillsammans) från 2015 till 2021?",
    table:
      "| År | Investeringar (mkr) | Löpande kostnader (mkr) |\n|---|---|---|\n| 2015 | 3 200 | 5 800 |\n| 2018 | 2 600 | 6 900 |\n| 2021 | 4 100 | 7 400 |",
    options: ["1 500 miljoner kr", "2 000 miljoner kr", "3 000 miljoner kr", "2 500 miljoner kr"],
    correct: 3,
    solution:
      "2015: 3 200+5 800=9 000. 2021: 4 100+7 400=11 500. Ökning: 2500 = 2 500 miljoner kr.",
    twinOf: { prov: "2020-10-25", provpass: 5, uppgift: 32, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-25",
    delprov: "DTK",
    area: "procent",
    prompt: "Hur stor var den procentuella minskningen av antalet gymnastikföreningar 2023 jämfört med 1990?",
    table:
      "| Idrott | 1990 | 2023 |\n|---|---|---|\n| Gymnastik | 1 400 | 560 |\n| Ridsport | 900 | 1 350 |\n| Fotboll | 3 200 | 3 100 |\n| Friidrott | 1 100 | 1 240 |",
    options: ["40 procent", "50 procent", "70 procent", "60 procent"],
    correct: 3,
    solution:
      "(1400-560)/1400 = 840/1400 = 60 procent.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-26",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Studera hur antalet fotbollsföreningar och antalet friidrottsföreningar förhöll sig till varandra 2023. Vilket svarsförslag anger storleksförhållandet mellan fotboll och friidrott (avrundat)?",
    table:
      "| Idrott | 1990 | 2023 |\n|---|---|---|\n| Gymnastik | 1 400 | 560 |\n| Ridsport | 900 | 1 350 |\n| Fotboll | 3 200 | 3 100 |\n| Friidrott | 1 100 | 1 240 |",
    options: ["2:1", "3:1", "5:2", "3:2"],
    correct: 1,
    solution:
      "3 100/1 240 ≈ 2,5, dvs ungefär 3:1.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-27",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Hur många ridsportföreningar fanns det i genomsnitt om man räknar snittet av antalet 1990 och antalet 2023?",
    table:
      "| Idrott | 1990 | 2023 |\n|---|---|---|\n| Gymnastik | 1 400 | 560 |\n| Ridsport | 900 | 1 350 |\n| Fotboll | 3 200 | 3 100 |\n| Friidrott | 1 100 | 1 240 |",
    options: ["1 025", "1 125", "1 225", "1 325"],
    correct: 1,
    solution:
      "(900+1350)/2 = 1125.",
    twinOf: { prov: "2019-04-06", provpass: 2, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-28",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur stor var skillnaden i antal landningar mellan inrikes- och utrikesflyg år 2000?",
    table:
      "| År | Landningar utrikes (tusental) | Landningar inrikes (tusental) | Passagerare totalt (miljoner) |\n|---|---|---|---|\n| 1990 | 85 | 140 | 12 |\n| 2000 | 110 | 160 | 19 |\n| 2010 | 95 | 120 | 27 |",
    options: ["30 000", "50 000", "70 000", "90 000"],
    correct: 1,
    solution:
      "160 000 - 110 000 = 50 000.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-29",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Hur stort var antalet passagerare per landning på flygplatserna 2010?",
    table:
      "| År | Landningar utrikes (tusental) | Landningar inrikes (tusental) | Passagerare totalt (miljoner) |\n|---|---|---|---|\n| 1990 | 85 | 140 | 12 |\n| 2000 | 110 | 160 | 19 |\n| 2010 | 95 | 120 | 27 |",
    options: ["70", "126", "175", "220"],
    correct: 1,
    solution:
      "27 000 000/(95 000+120 000) = 27 000 000/215 000 ≈ 126.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-30",
    delprov: "DTK",
    area: "procent",
    prompt: "Med hur många procent hade antalet passagerare ökat 2010 jämfört med 1990?",
    table:
      "| År | Landningar utrikes (tusental) | Landningar inrikes (tusental) | Passagerare totalt (miljoner) |\n|---|---|---|---|\n| 1990 | 85 | 140 | 12 |\n| 2000 | 110 | 160 | 19 |\n| 2010 | 95 | 120 | 27 |",
    options: ["75 procent", "100 procent", "125 procent", "150 procent"],
    correct: 2,
    solution:
      "(27-12)/12 = 15/12 = 125 procent.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-31",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Jämför den totala kostnaden för flerbostadshus i Allmännyttan och i Bostadsrätt 2002. Hur stor var skillnaden?",
    table:
      "| Ägandeform | Kapitalkostnad 2002 (kr/m²) | Driftkostnad 2002 (kr/m²) |\n|---|---|---|\n| Allmännyttan | 260 | 480 |\n| Bostadsrätt | 190 | 410 |\n| Privat ägo | 310 | 450 |",
    options: ["70 kr/m²", "100 kr/m²", "140 kr/m²", "180 kr/m²"],
    correct: 2,
    solution:
      "Allmännyttan: 260+480=740. Bostadsrätt: 190+410=600. Skillnad: 140 = 140 kr/m².",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 35, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-32",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av den totala kostnaden för flerbostadshus i privat ägo 2002 utgjordes av kapitalkostnad?",
    table:
      "| Ägandeform | Kapitalkostnad 2002 (kr/m²) | Driftkostnad 2002 (kr/m²) |\n|---|---|---|\n| Allmännyttan | 260 | 480 |\n| Bostadsrätt | 190 | 410 |\n| Privat ägo | 310 | 450 |",
    options: ["30 procent", "41 procent", "55 procent", "62 procent"],
    correct: 1,
    solution:
      "310/(310+450) = 310/760 ≈ 41 procent.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 36, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-33",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av lärarna vid Uppsala universitet 1945 var professorer?",
    table:
      "| Lärosäte | Studenter 1945 | Lärare 1945 | Professorer 1945 |\n|---|---|---|---|\n| Uppsala universitet | 3 200 | 210 | 60 |\n| Lunds universitet | 2 800 | 180 | 45 |\n| Karolinska institutet | 900 | 95 | 20 |\n| Stockholms högskola | 1 100 | 70 | 18 |",
    options: ["19 procent", "24 procent", "29 procent", "35 procent"],
    correct: 2,
    solution:
      "60/210 ≈ 29 procent.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 39, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-34",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Vilket lärosäte hade minst antal studenter per lärare 1945?",
    table:
      "| Lärosäte | Studenter 1945 | Lärare 1945 | Professorer 1945 |\n|---|---|---|---|\n| Uppsala universitet | 3 200 | 210 | 60 |\n| Lunds universitet | 2 800 | 180 | 45 |\n| Karolinska institutet | 900 | 95 | 20 |\n| Stockholms högskola | 1 100 | 70 | 18 |",
    options: ["Uppsala universitet", "Lunds universitet", "Karolinska institutet", "Stockholms högskola"],
    correct: 2,
    solution:
      "Studenter/lärare: Uppsala 15,2, Lund 15,6, Karolinska 9,5, Stockholm 15,7. Karolinska institutet hade lägst kvot.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 40, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-35",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Hur stort var det sammanlagda antalet studenter vid de fyra lärosätena 1945?",
    table:
      "| Lärosäte | Studenter 1945 | Lärare 1945 | Professorer 1945 |\n|---|---|---|---|\n| Uppsala universitet | 3 200 | 210 | 60 |\n| Lunds universitet | 2 800 | 180 | 45 |\n| Karolinska institutet | 900 | 95 | 20 |\n| Stockholms högskola | 1 100 | 70 | 18 |",
    options: ["6 500", "7 000", "7 500", "8 000"],
    correct: 3,
    solution:
      "3 200+2 800+900+1 100 = 8 000.",
    twinOf: { prov: "2019-04-06", provpass: 5, uppgift: 38, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-varen-2019/" }
  },
  {
    id: "dtk2-36",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur stor var skillnaden mellan det högsta och det lägsta genomsnittliga provbetyget i matematik B under perioden 2005–2009?",
    table:
      "| År | Provbetyg matematik B | Kursbetyg matematik B |\n|---|---|---|\n| 2005 | 11,5 | 12,0 |\n| 2007 | 10,0 | 12,5 |\n| 2009 | 12,0 | 13,0 |",
    options: ["1,0 poäng", "1,5 poäng", "2,0 poäng", "2,5 poäng"],
    correct: 2,
    solution:
      "Högst 12,0 (2009), lägst 10,0 (2007). Skillnad: 2,0 poäng.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 35, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-37",
    delprov: "DTK",
    area: "förändring",
    prompt: "Studera skillnaden i poäng mellan provbetyg och kursbetyg i matematik B. Mellan vilka av de redovisade åren ökade denna skillnad mest?",
    table:
      "| År | Provbetyg matematik B | Kursbetyg matematik B |\n|---|---|---|\n| 2005 | 11,5 | 12,0 |\n| 2007 | 10,0 | 12,5 |\n| 2009 | 12,0 | 13,0 |",
    options: ["2005–2007", "2007–2009", "Skillnaden var oförändrad", "Skillnaden minskade båda perioderna"],
    correct: 0,
    solution:
      "Skillnad kursbetyg-provbetyg: 2005: 0,5, 2007: 2,5, 2009: 1,0. Ökningen var störst 2005–2007 (från 0,5 till 2,5 poäng).",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 37, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-38",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Hur många hushåll bodde i Kommun Norr år 5, om man antar att endast de redovisade inflyttade hushållen tillkommit?",
    table:
      "| Kommun | Hushåll år 0 | Inflyttade hushåll (5 år) | Genomsnittlig årsinkomst (tkr) |\n|---|---|---|---|\n| Kommun Norr | 9 500 | 2 500 | 380 |\n| Kommun Söder | 6 200 | 1 100 | 340 |\n| Kommun Öster | 11 000 | 3 200 | 410 |\n| Kommun Väster | 4 800 | 900 | 355 |",
    options: ["9 500", "11 000", "12 000", "13 000"],
    correct: 2,
    solution:
      "9 500 + 2 500 = 12 000.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 39, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-39",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Jämför hushållens genomsnittliga årsinkomst i den kommun som hade högst genomsnittlig årsinkomst och den som hade lägst. Hur stor var skillnaden?",
    table:
      "| Kommun | Hushåll år 0 | Inflyttade hushåll (5 år) | Genomsnittlig årsinkomst (tkr) |\n|---|---|---|---|\n| Kommun Norr | 9 500 | 2 500 | 380 |\n| Kommun Söder | 6 200 | 1 100 | 340 |\n| Kommun Öster | 11 000 | 3 200 | 410 |\n| Kommun Väster | 4 800 | 900 | 355 |",
    options: ["30 000 kronor", "50 000 kronor", "70 000 kronor", "90 000 kronor"],
    correct: 2,
    solution:
      "Högst: Kommun Öster (410 tkr). Lägst: Kommun Söder (340 tkr). Skillnad: 70 tkr = 70 000 kronor.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 38, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-40",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Till vilket ändamål gick sammanlagt 6,1 miljoner kronor åren 2021–2023?",
    table:
      "| Ändamål | 2021 (tkr) | 2022 (tkr) | 2023 (tkr) |\n|---|---|---|---|\n| Sommarlov | 3 200 | 3 500 | 3 800 |\n| Kläder och skor | 2 100 | 2 400 | 2 600 |\n| Fritidsaktiviteter | 1 800 | 2 000 | 2 300 |\n| Övriga ändamål | 900 | 1 100 | 1 300 |",
    options: ["Sommarlov", "Kläder och skor", "Fritidsaktiviteter", "Övriga ändamål"],
    correct: 2,
    solution:
      "Fritidsaktiviteter: 1 800+2 000+2 300 = 6 100 tkr = 6,1 miljoner kronor.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-41",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av de utbetalda bidragen 2023 gick till sommarlov?",
    table:
      "| Ändamål | 2021 (tkr) | 2022 (tkr) | 2023 (tkr) |\n|---|---|---|---|\n| Sommarlov | 3 200 | 3 500 | 3 800 |\n| Kläder och skor | 2 100 | 2 400 | 2 600 |\n| Fritidsaktiviteter | 1 800 | 2 000 | 2 300 |\n| Övriga ändamål | 900 | 1 100 | 1 300 |",
    options: ["28 procent", "38 procent", "48 procent", "58 procent"],
    correct: 1,
    solution:
      "3 800/(3 800+2 600+2 300+1 300) = 3 800/10 000 = 38 procent.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-42",
    delprov: "DTK",
    area: "andel",
    prompt: "Hur stor andel av det totala antalet fångade fiskar 2011 fångades med bottennät?",
    table:
      "| Art | Bottennät antal 2011 | Pelagiskt nät antal 2011 | Bottennät vikt (g) 2011 |\n|---|---|---|---|\n| Abborre | 140 | 60 | 4 200 |\n| Mört | 90 | 110 | 1 800 |\n| Gädda | 20 | 5 | 3 000 |\n| Sik | 15 | 45 | 900 |",
    options: ["45 procent", "55 procent", "67 procent", "78 procent"],
    correct: 1,
    solution:
      "Bottennät: 265. Pelagiskt: 220. Andel bottennät: 265/485 ≈ 55 procent.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 33, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-43",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Vilken var den genomsnittliga vikten för en fångad abborre i bottennätet 2011?",
    table:
      "| Art | Bottennät antal 2011 | Pelagiskt nät antal 2011 | Bottennät vikt (g) 2011 |\n|---|---|---|---|\n| Abborre | 140 | 60 | 4 200 |\n| Mört | 90 | 110 | 1 800 |\n| Gädda | 20 | 5 | 3 000 |\n| Sik | 15 | 45 | 900 |",
    options: ["20 gram", "30 gram", "40 gram", "50 gram"],
    correct: 1,
    solution:
      "4 200/140 = 30 gram.",
    twinOf: { prov: "2019-10-20", provpass: 1, uppgift: 34, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-44",
    delprov: "DTK",
    area: "andel",
    prompt: "Vilken skademekanism stod för en femtedel av de rapporterade skadefallen?",
    table:
      "| Skademekanism | Flickor | Pojkar | Totalt |\n|---|---|---|---|\n| Fall från låg höjd | 65 | 75 | 140 |\n| Fall från trappa | 30 | 30 | 60 |\n| Kontakt med person | 20 | 40 | 60 |\n| Hugg/skärning mot skarp kant | 15 | 25 | 40 |",
    options: ["Fall från låg höjd", "Fall från trappa", "Kontakt med person", "Hugg/skärning mot skarp kant"],
    correct: 2,
    solution:
      "Totalt: 300. Kontakt med person: 60/300 = 20 procent = en femtedel.",
    twinOf: { prov: "2019-10-20", provpass: 4, uppgift: 33, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-45",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Hur stor andel av skadefallen av typen hugg/skärning mot skarp kant drabbade flickor?",
    table:
      "| Skademekanism | Flickor | Pojkar | Totalt |\n|---|---|---|---|\n| Fall från låg höjd | 65 | 75 | 140 |\n| Fall från trappa | 30 | 30 | 60 |\n| Kontakt med person | 20 | 40 | 60 |\n| Hugg/skärning mot skarp kant | 15 | 25 | 40 |",
    options: ["25 procent", "38 procent", "50 procent", "63 procent"],
    correct: 1,
    solution:
      "15/40 = 38 procent.",
    twinOf: { prov: "2019-10-20", provpass: 4, uppgift: 34, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-46",
    delprov: "DTK",
    area: "jämförelse",
    prompt: "Hur stor är mängden mejeriprodukter som hamnar i avloppet per person och år jämfört med mängden övrigt flytande matavfall?",
    table:
      "| Kategori | Kg/person och år | Ton/år |\n|---|---|---|\n| Mejeriprodukter | 4,5 | 41 000 |\n| Övrigt flytande matavfall | 1,5 | 13 500 |\n| Fast matavfall | 8,0 | 72 000 |\n| Sötsaker | 2,0 | 18 000 |",
    options: ["1,5 gånger så stor", "2 gånger så stor", "3 gånger så stor", "4 gånger så stor"],
    correct: 2,
    solution:
      "4,5/1,5 = 3 gånger så stor.",
    twinOf: { prov: "2019-10-20", provpass: 4, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-47",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Hur stor är den totala mängden av de fyra redovisade kategorierna mat och dryck som hamnar i avloppet per person och år?",
    table:
      "| Kategori | Kg/person och år | Ton/år |\n|---|---|---|\n| Mejeriprodukter | 4,5 | 41 000 |\n| Övrigt flytande matavfall | 1,5 | 13 500 |\n| Fast matavfall | 8,0 | 72 000 |\n| Sötsaker | 2,0 | 18 000 |",
    options: ["12 kg", "14 kg", "16 kg", "18 kg"],
    correct: 2,
    solution:
      "4,5+1,5+8,0+2,0 = 16,0 kg.",
    twinOf: { prov: "2019-10-20", provpass: 4, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-48",
    delprov: "DTK",
    area: "kombinera två kolumner",
    prompt: "Ungefär hur mycket av dessa fyra kategorier mat och dryck hamnar i avloppet under en vecka, sammanlagt i landet?",
    table:
      "| Kategori | Kg/person och år | Ton/år |\n|---|---|---|\n| Mejeriprodukter | 4,5 | 41 000 |\n| Övrigt flytande matavfall | 1,5 | 13 500 |\n| Fast matavfall | 8,0 | 72 000 |\n| Sötsaker | 2,0 | 18 000 |",
    options: ["1 400 ton", "2 200 ton", "2 800 ton", "3 500 ton"],
    correct: 2,
    solution:
      "Totalt per år: 41 000+13 500+72 000+18 000 = 144 500 ton. Per vecka: 144 500/52 ≈ 2779 ton.",
    twinOf: { prov: "2019-10-20", provpass: 4, uppgift: 31, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2019/" }
  },
  {
    id: "dtk2-49",
    delprov: "DTK",
    area: "procent",
    prompt: "Med hur många procent hade medlemsantalet ökat om man jämför 1905 med 1892?",
    table:
      "| År | Medlemmar |\n|---|---|\n| 1885 | 2 400 |\n| 1892 | 3 100 |\n| 1897 | 2 900 |\n| 1905 | 6 200 |",
    options: ["50 procent", "75 procent", "100 procent", "125 procent"],
    correct: 2,
    solution:
      "(6 200-3 100)/3 100 = 3 100/3 100 = 100 procent.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 30, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
  {
    id: "dtk2-50",
    delprov: "DTK",
    area: "avläsning",
    prompt: "Mellan vilka av de redovisade åren minskade antalet medlemmar?",
    table:
      "| År | Medlemmar |\n|---|---|\n| 1885 | 2 400 |\n| 1892 | 3 100 |\n| 1897 | 2 900 |\n| 1905 | 6 200 |",
    options: ["1885–1892", "1892–1897", "1897–1905", "Medlemsantalet minskade aldrig"],
    correct: 1,
    solution:
      "Mellan 1892 (3 100) och 1897 (2 900) minskade medlemsantalet, övriga perioder ökade det.",
    twinOf: { prov: "2020-10-25", provpass: 3, uppgift: 29, url: "https://www.studera.nu/hogskoleprov/fpn/provfragor-och-facit-hosten-2020/" }
  },
];
