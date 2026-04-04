import type { MockExamTemplate, Question, ResearchEvidence, Track } from "./types";

export const TRACKS: Track[] = [
  {
    id: "nackademin_ux",
    name: "Nackademin UX",
    goal_exam: "Antagningsprov (analys + problemlösning)",
    weight: 70,
    language_mode: "sv"
  },
  {
    id: "iths_itsec",
    name: "IT-Högskolan IT-säkerhet",
    goal_exam: "Antagningsprov Del 1 + Del 2",
    weight: 60,
    language_mode: "sv-en"
  },
  {
    id: "prog1a",
    name: "Programmering 1/A-prövning",
    goal_exam: "Prövning/validering",
    weight: 25,
    language_mode: "sv-en"
  }
];

export const QUESTIONS: Question[] = [
  {
    id: "ux-1",
    track_id: "nackademin_ux",
    topic: "Logik/analys",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt:
      "En app tappar 40% användare i steg 2 av onboarding. Vilket första steg är mest UX-rimligt?",
    options: [
      { id: "a", text: "Lägg till fler funktioner i steg 1" },
      { id: "b", text: "Mät varför avhopp sker med funnel + kort användartest" },
      { id: "c", text: "Byt färgtema" },
      { id: "d", text: "Skippa onboarding helt" }
    ],
    answer_key: "b",
    explanation:
      "Börja med evidens. Mätning och snabb testning ger orsak innan lösning." 
  },
  {
    id: "ux-2",
    track_id: "nackademin_ux",
    topic: "Problemlösning",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "Vilken prioritering är mest rimlig i en MVP?",
    options: [
      { id: "a", text: "Must-have före nice-to-have" },
      { id: "b", text: "Bygg allt samtidigt" },
      { id: "c", text: "Fokusera på animationer" },
      { id: "d", text: "Ingen prioritering behövs" }
    ],
    answer_key: "a",
    explanation: "MVP fokuserar på kärnnytta först." 
  },
  {
    id: "ux-3",
    track_id: "nackademin_ux",
    topic: "Teststrategi",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt:
      "Skriv 2 korta hypoteser du skulle testa om en bokningssida har låg konvertering.",
    answer_key:
      "Exempel: 1) Otydliga priser minskar tillit. 2) För många steg i flödet orsakar avhopp.",
    explanation:
      "Bra svar kopplar observerbart problem till testbar hypotes." 
  },
  {
    id: "ux-4",
    track_id: "nackademin_ux",
    topic: "Logik/analys",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt:
      "Tre designförslag höjer NPS men sänker task success. Vad bör teamet göra först?",
    options: [
      { id: "a", text: "Välj högst NPS direkt" },
      { id: "b", text: "Analysera konflikt mellan upplevd nöjdhet och faktisk användbarhet" },
      { id: "c", text: "Skippa mätdata" },
      { id: "d", text: "Lansera alla tre" }
    ],
    answer_key: "b",
    explanation: "Måtten pekar åt olika håll; orsaksanalys krävs." 
  },
  {
    id: "ux-5",
    track_id: "nackademin_ux",
    topic: "Problemlösning",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vilken data är mest användbar för att utvärdera en ny navigering?",
    options: [
      { id: "a", text: "Antal likes på sociala medier" },
      { id: "b", text: "Task success rate + tid till mål" },
      { id: "c", text: "Utvecklingstid" },
      { id: "d", text: "Färgpalettens trendighet" }
    ],
    answer_key: "b",
    explanation: "Task success och tidsmått följer navigeringens effekt." 
  },
  {
    id: "ux-7",
    track_id: "nackademin_ux",
    topic: "Informationsarkitektur",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vad är det mest rimliga första steget när en tjänst känns otydlig och har många menyer?",
    options: [
      { id: "a", text: "Lägg till fler menyval för att täcka allt" },
      { id: "b", text: "Kartlägg användarnas viktigaste mål och gruppera innehållet efter toppuppgifter" },
      { id: "c", text: "Gör alla sidor lika långa" },
      { id: "d", text: "Byt namn på alla knappar samtidigt" }
    ],
    answer_key: "b",
    explanation: "Informationsarkitektur börjar med användarens viktigaste uppgifter, inte med fler val." 
  },
  {
    id: "ux-8",
    track_id: "nackademin_ux",
    topic: "Scenario-övning",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 5,
    prompt:
      "Skriv en snabb testplan för en prototyp i tre punkter: vad du vill testa, vem du testar på och vad du letar efter.",
    answer_key:
      "Exempel: 1) Testa om användaren förstår flödet. 2) Testa med 3-5 personer från målgruppen. 3) Leta efter avbrott, tvekan och missförstånd.",
    explanation:
      "Bra svar är konkret, kort och kopplar testmål till observerbart beteende." 
  },
  {
    id: "ux-9",
    track_id: "nackademin_ux",
    topic: "Logik/analys",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vilket alternativ beskriver bäst en hypotes som går att testa?",
    options: [
      { id: "a", text: "Användarna gillar bättre design" },
      { id: "b", text: "Om vi kortar formuläret från 8 till 4 fält ökar slutförandegraden med minst 10%" },
      { id: "c", text: "Webbplatsen borde kännas mer modern" },
      { id: "d", text: "Vi behöver tänka mer UX" }
    ],
    answer_key: "b",
    explanation: "En testbar hypotes ska vara mätbar och ha tydlig förändring + förväntad effekt."
  },
  {
    id: "ux-10",
    track_id: "nackademin_ux",
    topic: "Problemlösning",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Tre förbättringar är möjliga. Vilken bör prioriteras först i en pressad sprint?",
    options: [
      { id: "a", text: "Hög effekt, låg implementationstid" },
      { id: "b", text: "Låg effekt, hög implementationstid" },
      { id: "c", text: "Oklar effekt, medelhög implementationstid" },
      { id: "d", text: "Visuellt mest imponerande förändring" }
    ],
    answer_key: "a",
    explanation: "I kort sprint maximerar man värde per tidsenhet."
  },
  {
    id: "ux-11",
    track_id: "nackademin_ux",
    topic: "Teststrategi",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt: "Skriv två observationer du skulle notera i ett 10-min användartest av checkout.",
    answer_key:
      "Exempel: 1) Var användaren tvekar eller backar. 2) Om användaren förstår leverans- och betalningssteg utan hjälp.",
    explanation: "Bra svar fokuserar på observerbart beteende snarare än antaganden."
  },
  {
    id: "ux-12",
    track_id: "nackademin_ux",
    topic: "Informationsarkitektur",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "Vilket mål är mest relevant när du omstrukturerar en komplex meny?",
    options: [
      { id: "a", text: "Fler nivåer i menyn" },
      { id: "b", text: "Kortare väg till användarens vanligaste uppgifter" },
      { id: "c", text: "Exakt samma struktur som konkurrenten" },
      { id: "d", text: "Längre rubriker i varje menyval" }
    ],
    answer_key: "b",
    explanation: "Informationsarkitektur ska minska friktion för de viktigaste uppgifterna."
  },
  {
    id: "it-1",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilket lager i OSI-modellen hanterar IP-adressering?",
    options: [
      { id: "a", text: "Transport" },
      { id: "b", text: "Nätverk" },
      { id: "c", text: "Fysiskt" },
      { id: "d", text: "Session" }
    ],
    answer_key: "b",
    explanation: "IP hör till nätverkslagret." 
  },
  {
    id: "it-2",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt: "Vad gör en brandvägg (firewall) främst?",
    options: [
      { id: "a", text: "Komprimerar filer" },
      { id: "b", text: "Filtrerar trafik enligt regler" },
      { id: "c", text: "Byter IP-klass" },
      { id: "d", text: "Skapar backup" }
    ],
    answer_key: "b",
    explanation: "Brandväggar kontrollerar in/ut-trafik mot policy." 
  },
  {
    id: "it-3",
    track_id: "iths_itsec",
    topic: "Svenska/Engelska/Matte",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "Engelsk term: 'confidentiality' betyder närmast:",
    options: [
      { id: "a", text: "Tillgänglighet" },
      { id: "b", text: "Konfidentialitet" },
      { id: "c", text: "Felsökning" },
      { id: "d", text: "Skalbarhet" }
    ],
    answer_key: "b",
    explanation: "CIA-triaden: confidentiality, integrity, availability." 
  },
  {
    id: "it-4",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt: "Förklara skillnaden mellan TCP och UDP med en mening vardera.",
    answer_key:
      "TCP är anslutningsorienterat och tillförlitligt. UDP är snabbare, utan garanti för leverans.",
    explanation: "Fokus på tillförlitlighet kontra hastighet/överhead." 
  },
  {
    id: "it-5",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Sekundär",
    estimated_minutes: 4,
    prompt: "Vilket påstående om VPN är mest korrekt?",
    options: [
      { id: "a", text: "VPN krypterar aldrig trafik" },
      { id: "b", text: "VPN skapar en krypterad tunnel över osäkert nät" },
      { id: "c", text: "VPN ersätter alla säkerhetskontroller" },
      { id: "d", text: "VPN gör användaren anonym i alla situationer" }
    ],
    answer_key: "b",
    explanation: "VPN minskar risk i transit men ersätter inte helhetsarbete." 
  },
  {
    id: "it-7",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt: "Vad används DNS främst till?",
    options: [
      { id: "a", text: "Att kryptera trafik mellan datorer" },
      { id: "b", text: "Att förvandla domännamn till IP-adresser" },
      { id: "c", text: "Att skapa brandväggsregler" },
      { id: "d", text: "Att komprimera webbsidor" }
    ],
    answer_key: "b",
    explanation: "DNS översätter namn som exempel.se till IP-adresser som nätverket kan routa till." 
  },
  {
    id: "it-8",
    track_id: "iths_itsec",
    topic: "Säkerhet och social engineering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vilket exempel är social engineering?",
    options: [
      { id: "a", text: "Att installera en uppdatering för operativsystemet" },
      { id: "b", text: "Att skicka ett falskt meddelande som försöker få någon att lämna ut lösenord" },
      { id: "c", text: "Att byta till starkare Wi-Fi-kryptering" },
      { id: "d", text: "Att dokumentera en routerkonfiguration" }
    ],
    answer_key: "b",
    explanation: "Social engineering handlar om att manipulera människor, inte system." 
  },
  {
    id: "it-9",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Hur många användbara värdar finns normalt i ett IPv4 /24-nät?",
    options: [
      { id: "a", text: "128" },
      { id: "b", text: "254" },
      { id: "c", text: "256" },
      { id: "d", text: "510" }
    ],
    answer_key: "b",
    explanation: "/24 ger 256 adresser totalt, där nätverks- och broadcastadress inte används som värdar."
  },
  {
    id: "it-10",
    track_id: "iths_itsec",
    topic: "Säkerhet och social engineering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt: "Vilken kontroll är bäst mot phishing i vardagen?",
    options: [
      { id: "a", text: "Öppna bilagor snabbt för att hinna svara" },
      { id: "b", text: "Verifiera avsändare/länk och rapportera misstänkta meddelanden" },
      { id: "c", text: "Stäng av tvåfaktorsautentisering" },
      { id: "d", text: "Dela lösenord inom teamet för snabbare arbete" }
    ],
    answer_key: "b",
    explanation: "Beteende och verifiering är centralt skydd mot social engineering."
  },
  {
    id: "it-11",
    track_id: "iths_itsec",
    topic: "Svenska/Engelska/Matte",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "If availability is low, what is the most direct effect?",
    options: [
      { id: "a", text: "Data integrity increases" },
      { id: "b", text: "Users cannot reliably access the service" },
      { id: "c", text: "Encryption gets stronger" },
      { id: "d", text: "IP addresses are hidden" }
    ],
    answer_key: "b",
    explanation: "Availability handlar om att system och data finns tillgängliga när de behövs."
  },
  {
    id: "it-12",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt: "Förklara kort skillnaden mellan en switch och en router.",
    answer_key:
      "Switch kopplar enheter inom samma lokala nät (främst lager 2). Router kopplar trafik mellan olika nät (lager 3).",
    explanation: "Bra svar nämner lokal trafik kontra trafik mellan nät."
  },
  {
    id: "prog-1",
    track_id: "prog1a",
    topic: "Variabler och datatyper",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilken datatyp passar bäst för heltal i Java?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "String" },
      { id: "c", text: "boolean" },
      { id: "d", text: "double[]" }
    ],
    answer_key: "a",
    explanation: "int används för heltalsvärden." 
  },
  {
    id: "prog-2",
    track_id: "prog1a",
    topic: "Villkor",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilken operator betyder 'lika med' i ett villkor?",
    options: [
      { id: "a", text: "=" },
      { id: "b", text: "==" },
      { id: "c", text: ":=" },
      { id: "d", text: "=>" }
    ],
    answer_key: "b",
    explanation: "`==` jämför värden; `=` tilldelar." 
  },
  {
    id: "prog-3",
    track_id: "prog1a",
    topic: "Loopar",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vad skriver denna kod ut? for(int i=1;i<=3;i++){System.out.print(i);}",
    options: [
      { id: "a", text: "123" },
      { id: "b", text: "012" },
      { id: "c", text: "13" },
      { id: "d", text: "321" }
    ],
    answer_key: "a",
    explanation: "i går från 1 till 3 inklusive." 
  },
  {
    id: "prog-4",
    track_id: "prog1a",
    topic: "Metoder",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt: "Skriv en metodsignatur i Java för att summera två heltal.",
    answer_key: "Exempel: static int sum(int a, int b)",
    explanation: "Metodnamn, returtyp och parametrar ska framgå." 
  },
  {
    id: "prog-5",
    track_id: "prog1a",
    topic: "Felsökning",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Sekundär",
    estimated_minutes: 4,
    prompt: "Vilken buggrisk är störst här: int[] a = new int[3]; System.out.println(a[3]);",
    options: [
      { id: "a", text: "NullPointerException" },
      { id: "b", text: "ArrayIndexOutOfBoundsException" },
      { id: "c", text: "StackOverflowError" },
      { id: "d", text: "Ingen risk" }
    ],
    answer_key: "b",
    explanation: "Index 3 ligger utanför giltiga index 0-2." 
  },
  {
    id: "core-1",
    track_id: "iths_itsec",
    topic: "Svenska/Engelska/Matte",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Om 20% av 150 är korrekt beräknat, vilket svar är rätt?",
    options: [
      { id: "a", text: "20" },
      { id: "b", text: "25" },
      { id: "c", text: "30" },
      { id: "d", text: "35" }
    ],
    answer_key: "c",
    explanation: "0,2 * 150 = 30." 
  },
  {
    id: "ux-6",
    track_id: "nackademin_ux",
    topic: "Scenario-övning",
    format: "short",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 6,
    prompt:
      "Designa en ny returhantering för IKEA där kunden kan boka upphämtning via appen. Beskriv kort: målgrupp, enkel wireframe-idé och motivering.",
    answer_key:
      "Exempel: målgrupp = kunder med stora varor; wireframe = välj order, välj tidsfönster, bekräfta; motivering = minskar friktion och supportärenden.",
    explanation:
      "Bedöm på struktur: målgrupp -> lösning -> motivering. Det finns inget enda facit."
  },
  {
    id: "it-6",
    track_id: "iths_itsec",
    topic: "Dator- och nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "På vilket OSI-lager verkar en router?",
    options: [
      { id: "a", text: "Lager 2 - Datalänk" },
      { id: "b", text: "Lager 3 - Nätverk" },
      { id: "c", text: "Lager 4 - Transport" },
      { id: "d", text: "Lager 7 - Applikation" }
    ],
    answer_key: "b",
    explanation: "Routrar routar IP-trafik på lager 3."
  },
  {
    id: "prog-6",
    track_id: "prog1a",
    topic: "Datatyper",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "Vilken datatyp är bäst för att lagra true/false?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "String" },
      { id: "c", text: "boolean" },
      { id: "d", text: "float" }
    ],
    answer_key: "c",
    explanation: "boolean lagrar sant/falskt-värden."
  },
  {
    id: "prog-7",
    track_id: "prog1a",
    topic: "Code tracing",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt:
      "Vad blir värdet på x?\nlet x = 2;\nfor (let i = 0; i < 3; i++) { x = x + i; }",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "6" }
    ],
    answer_key: "c",
    explanation: "x blir 2+0+1+2 = 5."
  },
  {
    id: "prog-8",
    track_id: "prog1a",
    topic: "Debugging-game",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt:
      "Vilket fel är tydligast i denna kod?\nfor (let i = 0; i <= arr.length; i++) { console.log(arr[i]); }",
    options: [
      { id: "a", text: "Fel variabelnamn i loggen" },
      { id: "b", text: "Loopvillkoret bör vara i < arr.length" },
      { id: "c", text: "for-loop kan inte användas med arrayer" },
      { id: "d", text: "console.log kräver string" }
    ],
    answer_key: "b",
    explanation: "i <= arr.length går ett steg för långt och ger undefined sista varvet."
  },
  {
    id: "prog-9",
    track_id: "prog1a",
    topic: "Villkor och logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt:
      "Vad skrivs ut?\nint score = 7;\nif (score >= 5) {\n  System.out.print(\"Godkänd\");\n} else {\n  System.out.print(\"Underkänd\");\n}",
    options: [
      { id: "a", text: "Godkänd" },
      { id: "b", text: "Underkänd" },
      { id: "c", text: "5" },
      { id: "d", text: "Inget skrivs ut" }
    ],
    answer_key: "a",
    explanation: "7 är större än eller lika med 5, så första grenen körs." 
  },
  {
    id: "prog-10",
    track_id: "prog1a",
    topic: "Metoder",
    format: "short",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 5,
    prompt: "Förklara kort vad en metod gör i Java och ge ett enkelt exempel på vad den kan användas till.",
    answer_key:
      "En metod samlar kod som kan återanvändas. Exempel: en method som tar emot två tal och returnerar summan.",
    explanation:
      "Svar ska visa förståelse för återanvändning, input/return och ett konkret användningsfall." 
  },
  {
    id: "prog-11",
    track_id: "prog1a",
    topic: "Loopar",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vad skrivs ut?\nint i = 0;\nwhile (i < 3) {\n  System.out.print(i);\n  i++;\n}",
    options: [
      { id: "a", text: "012" },
      { id: "b", text: "123" },
      { id: "c", text: "03" },
      { id: "d", text: "Inget" }
    ],
    answer_key: "a",
    explanation: "Loopen skriver ut 0,1,2 innan villkoret blir falskt."
  },
  {
    id: "prog-12",
    track_id: "prog1a",
    topic: "Variabler och datatyper",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilken deklaration är korrekt för en decimal i Java?",
    options: [
      { id: "a", text: "int price = 19.9;" },
      { id: "b", text: "double price = 19.9;" },
      { id: "c", text: "boolean price = 19.9;" },
      { id: "d", text: "String price = 19.9;" }
    ],
    answer_key: "b",
    explanation: "Decimalvärden lagras normalt i double (eller float)."
  },
  {
    id: "prog-13",
    track_id: "prog1a",
    topic: "Felsökning",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vad är det första rimliga debug-steget när programmet kraschar med NullPointerException?",
    options: [
      { id: "a", text: "Ta bort alla if-satser" },
      { id: "b", text: "Identifiera vilken referens som är null och var den ska initieras" },
      { id: "c", text: "Byt språk direkt" },
      { id: "d", text: "Ignorera felet om programmet startar ibland" }
    ],
    answer_key: "b",
    explanation: "Felet beror på null-referens; hitta var objektet saknas och initiera säkert."
  },
  {
    id: "prog-14",
    track_id: "prog1a",
    topic: "Code tracing",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Sekundär",
    estimated_minutes: 3,
    prompt: "Vad returnerar metoden?\nstatic int f(int n){\n  int s = 0;\n  for(int i=1;i<=n;i++){ s += i; }\n  return s;\n}\nAnrop: f(4)",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "6" },
      { id: "c", text: "10" },
      { id: "d", text: "16" }
    ],
    answer_key: "c",
    explanation: "Summan 1+2+3+4 blir 10."
  },
  {
    id: "prog-15",
    track_id: "prog1a",
    topic: "Metoder",
    format: "short",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 4,
    prompt: "Skriv pseudokod för en funktion som räknar antal jämna tal i en lista.",
    answer_key:
      "Exempel: starta count=0, loopa igenom varje tal, om tal % 2 == 0 öka count, returnera count.",
    explanation: "Bra svar visar loop, villkor och returvärde tydligt."
  },
  {
    id: "prog-16",
    track_id: "prog1a",
    topic: "Verktyg och versionshantering",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilket är ett vanligt syfte med versionshantering (t.ex. Git)?",
    options: [
      { id: "a", text: "Att översätta kod automatiskt till alla språk" },
      { id: "b", text: "Att kunna spara, jämföra och återställa kodändringar över tid" },
      { id: "c", text: "Att ersätta all testning av program" },
      { id: "d", text: "Att göra datorn snabbare i spel" }
    ],
    answer_key: "b",
    explanation: "Versionshantering hjälper dig följa historik, samarbeta och backa vid fel."
  },
  {
    id: "prog-17",
    track_id: "prog1a",
    topic: "Undantagshantering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt: "Vad är huvudidén med undantagshantering (try/catch) i programmering?",
    options: [
      { id: "a", text: "Att ignorera alla fel så programmet aldrig stannar" },
      { id: "b", text: "Att fånga och hantera fel på ett kontrollerat sätt" },
      { id: "c", text: "Att förhindra att variabler används" },
      { id: "d", text: "Att automatiskt optimera koden" }
    ],
    answer_key: "b",
    explanation: "Undantagshantering gör fel tydliga och låter programmet hantera dem säkrare."
  },
  {
    id: "prog-18",
    track_id: "prog1a",
    topic: "Problemlösning och pseudokod",
    format: "short",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 4,
    prompt: "Skriv enkel pseudokod för att läsa tre tal och skriva ut det största.",
    answer_key:
      "Exempel: läs a,b,c; sätt max=a; om b>max sätt max=b; om c>max sätt max=c; skriv ut max.",
    explanation: "Bra svar visar tydlig struktur med stegvis jämförelse."
  },
  {
    id: "prog-19",
    track_id: "prog1a",
    topic: "Kodkvalitet och namngivning",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vilken namngivning är mest läsbar i produktionskod?",
    options: [
      { id: "a", text: "int x1 = 0;" },
      { id: "b", text: "int customerAge = 0;" },
      { id: "c", text: "int zz = 0;" },
      { id: "d", text: "int _ = 0;" }
    ],
    answer_key: "b",
    explanation: "Beskrivande namn gör kod lättare att förstå, testa och underhålla."
  }
];

export const MOCK_EXAMS: MockExamTemplate[] = [
  {
    id: "mock-mini-5",
    name: "Mini-check 5 min (alla spår)",
    track_id: "nackademin_ux",
    total_minutes: 5,
    sections: [
      {
        title: "UX-snabb",
        track_id: "nackademin_ux",
        topics: ["Logik/analys", "Problemlösning"],
        question_ids: ["ux-1", "ux-9"],
        minutes: 2,
        weight: 0.34
      },
      {
        title: "IT-snabb",
        track_id: "iths_itsec",
        topics: ["Dator- och nätverksteknik", "Svenska/Engelska/Matte"],
        question_ids: ["it-1", "it-11"],
        minutes: 2,
        weight: 0.33
      },
      {
        title: "Prog-snabb",
        track_id: "prog1a",
        topics: ["Variabler och datatyper", "Code tracing"],
        question_ids: ["prog-12", "prog-14"],
        minutes: 1,
        weight: 0.33
      }
    ],
    scoring_rules: "Snabb nulägeskoll. Kort mix av UX, IT och Programmering 1/A."
  },
  {
    id: "mock-mini-10",
    name: "Mini-check 10 min (balanserad mix)",
    track_id: "nackademin_ux",
    total_minutes: 10,
    sections: [
      {
        title: "UX fokus",
        track_id: "nackademin_ux",
        topics: ["Logik/analys", "Problemlösning", "Informationsarkitektur"],
        question_ids: ["ux-1", "ux-10", "ux-12"],
        minutes: 4,
        weight: 0.4
      },
      {
        title: "IT fokus",
        track_id: "iths_itsec",
        topics: ["Dator- och nätverksteknik", "Säkerhet och social engineering"],
        question_ids: ["it-2", "it-9", "it-10"],
        minutes: 3,
        weight: 0.3
      },
      {
        title: "Programmering fokus",
        track_id: "prog1a",
        topics: ["Villkor", "Loopar", "Code tracing"],
        question_ids: ["prog-2", "prog-11", "prog-14"],
        minutes: 3,
        weight: 0.3
      }
    ],
    scoring_rules: "Balanserad snabbdiagnos för att hitta nästa prioritet inom 10 minuter."
  },
  {
    id: "mock-nack-60",
    name: "Nackademin-liknande 60 min",
    track_id: "nackademin_ux",
    total_minutes: 60,
    sections: [
      {
        title: "Analys & logik",
        track_id: "nackademin_ux",
        topics: ["Logik/analys", "Problemlösning", "Teststrategi", "Scenario-övning"],
        question_ids: ["ux-1", "ux-2", "ux-3", "ux-4", "ux-5", "ux-6", "ux-9", "ux-10", "ux-11", "ux-12"],
        minutes: 60,
        weight: 1
      }
    ],
    scoring_rules: "Poäng per korrekt svar. Korta svar bedöms mot modellförslag."
  },
  {
    id: "mock-iths-90",
    name: "IT-H Del 1+2 (90 min)",
    track_id: "iths_itsec",
    total_minutes: 90,
    sections: [
      {
        title: "Del 1: Svenska/Engelska/Matte",
        track_id: "iths_itsec",
        topics: ["Svenska/Engelska/Matte"],
        question_ids: ["it-3", "it-11", "core-1"],
        minutes: 20,
        weight: 0.2
      },
      {
        title: "Del 2: Dator- och nätverksteknik",
        track_id: "iths_itsec",
        topics: ["Dator- och nätverksteknik"],
        question_ids: ["it-1", "it-2", "it-4", "it-5", "it-6", "it-7", "it-8", "it-9", "it-10", "it-12"],
        minutes: 70,
        weight: 0.8
      }
    ],
    scoring_rules: "Separat delpoäng, total viktad poäng enligt 20/80."
  },
  {
    id: "mock-prog-45",
    name: "Programmering 1/A delprov (45 min)",
    track_id: "prog1a",
    total_minutes: 45,
    sections: [
      {
        title: "Del 1: Grunder",
        track_id: "prog1a",
        topics: ["Variabler och datatyper", "Villkor"],
        question_ids: ["prog-1", "prog-2", "prog-6", "prog-12"],
        minutes: 15,
        weight: 0.33
      },
      {
        title: "Del 2: Flöde och läsning",
        track_id: "prog1a",
        topics: ["Loopar", "Code tracing"],
        question_ids: ["prog-3", "prog-7", "prog-9", "prog-11", "prog-14", "prog-18"],
        minutes: 15,
        weight: 0.33
      },
      {
        title: "Del 3: Metoder och felsökning",
        track_id: "prog1a",
        topics: ["Metoder", "Felsökning", "Debugging-game"],
        question_ids: ["prog-4", "prog-5", "prog-8", "prog-10", "prog-13", "prog-15", "prog-16", "prog-17", "prog-19"],
        minutes: 15,
        weight: 0.34
      }
    ],
    scoring_rules: "Separat poäng per del, fokus på grunder först och tydlig återkoppling på feltyper."
  }
];

export const RESEARCH_EVIDENCE: ResearchEvidence[] = [
  {
    id: "ev-nack-1",
    provider: "Nackademin",
    url: "https://nackademin.se/antagning/urval-och-antagningsprov/",
    claim:
      "Urvalet omfattar antagningsprov med fokus på analys- och problemlösningsförmåga.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-nack-2",
    provider: "Nackademin (EN)",
    url: "https://nackademin.se/en/admission/selection-entrance-exam/",
    claim:
      "Den engelska antagningssidan bekräftar att provet används för att bedöma lämplighet och förmåga att hantera programmens upplägg.",
    confidence: "Medel",
    source_tier: "Officiell",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-nack-3",
    provider: "Nackademin",
    url: "https://nackademin.se/antagning/urval-och-antagningsprov/",
    claim:
      "Nackademin anger att antagningsprovet mäter analys- och problemlösningsförmåga, tar cirka 60 minuter och att tidigare prov inte delas.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-iths-1",
    provider: "IT-Högskolan",
    url: "https://www.iths.se/antagningsprovet/",
    claim:
      "Antagningsprovet består av två delar: allmän del och programspecifik del.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-iths-4",
    provider: "IT-Högskolan",
    url: "https://www.iths.se/antagningsprovet/",
    claim:
      "IT-Högskolans prov är 90 minuter med Del 1 (svenska, engelska, matematik) och Del 2 som är utbildningsspecifik. För IT-säkerhetsspecialist är Del 2 dator- och nätverksteknik.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-iths-3",
    provider: "IT-Högskolan (FAQ/antagning)",
    url: "https://www.iths.se/vanliga-fragor/",
    claim:
      "IT-Högskolan hänvisar till att antagning och förberedande material kan variera, vilket gör det rimligt att träna både allmän del och programspecifik del separat.",
    confidence: "Medel",
    source_tier: "Officiell",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-iths-2",
    provider: "IT-Högskolan",
    url: "https://www.iths.se/utbildningar/preparandkurs/",
    claim:
      "Förkunskapsspåret för IT-säkerhet lyfter dator- och nätverksteknik.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-prog-1",
    provider: "Linköpings kommun (Komvux-info)",
    url:
      "https://www.linkoping.se/forskola-och-utbildning/vuxenutbildning/komvux/alla-skolor-inom-komvux-i-linkoping/linvux/provning/provning---gymnasiala-kurser",
    claim:
      "Prövning i programmering brukar innehålla praktiska moment, teori och uppgifter i flera delar.",
    confidence: "Medel",
    source_tier: "Sekundär",
    track_id: "prog1a",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-prog-3",
    provider: "Skolverket",
    url: "https://syllabuswebb.skolverket.se/syllabuscw/jsp/subject.htm?date=2025-07-01&subjectCode=PROG&tos=vuxgy",
    claim:
      "Ämnet Programmering nivå 1 (PROG1000X) omfattar bland annat kontrollstrukturer, pseudokod/diagram, enklare felhantering, undantagshantering, namngivning/kommentarer och användning av utvecklingsverktyg.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "prog1a",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-prog-4",
    provider: "Skolverket (relationslista Gy11 -> Gy25)",
    url: "https://www.skolverket.se/download/18.4a4f973719c9357f7ba4a625/1773031732088/Bilaga%2001%20SKOLFS_2024_628-2.pdf",
    claim:
      "Kursen Programmering 1 (PRRPRR01) motsvaras av Programmering nivå 1 (PROG1000X), vilket stödjer att äldre kursbeteckning och ny nivå kan användas parallellt under övergångsperioden.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "prog1a",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-prog-2",
    provider: "Komvux/exempel på prövning",
    url: "https://www.linkoping.se/forskola-och-utbildning/vuxenutbildning/komvux/alla-skolor-inom-komvux-i-linkoping/linvux/provning/provning---gymnasiala-kurser",
    claim:
      "Prövning i gymnasiala kurser brukar kombinera teori med praktiska uppgifter, vilket passar ett programmeringsspår med både kunskapstest och kodläsning.",
    confidence: "Medel",
    source_tier: "Sekundär",
    track_id: "prog1a",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-community-1",
    provider: "Community-sammanställning",
    url: "https://nackademin.se/en/admission/selection-entrance-exam/",
    claim:
      "Tidigare sökande beskriver tidsbrist som huvudutmaning; träningsmönster fokuserar därför på tidsatta övningar.",
    confidence: "Låg",
    source_tier: "Community",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-03"
  },
  {
    id: "ev-community-2",
    provider: "Community-sammanställning",
    url: "https://www.iths.se/antagningsprovet/",
    claim:
      "Tidigare sökande beskriver att del 1 ofta känns bred och att del 2 kräver fokus på nätverk, säkerhet och begrepp som brukar återkomma.",
    confidence: "Låg",
    source_tier: "Community",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-03"
  },
  {
    id: "ev-community-3",
    provider: "Community-sammanställning",
    url: "https://www.linkoping.se/forskola-och-utbildning/vuxenutbildning/komvux/alla-skolor-inom-komvux-i-linkoping/linvux/provning/provning---gymnasiala-kurser",
    claim:
      "I programmeringsprövningar återkommer ofta uppgifter om variabler, villkor, loopar och felsökning snarare än enbart teori.",
    confidence: "Låg",
    source_tier: "Community",
    track_id: "prog1a",
    last_verified_date: "2026-04-03"
  }
];
