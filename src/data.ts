import type { GlossaryEntry, MockExamTemplate, Question, ResearchEvidence, Track, VRItem } from "./types";

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
    estimated_minutes: 5,
    prompt:
      "Du arbetar med UX på en hotellbokningssajt. Analyssystem visar att 60 % av besökarna lägger till ett rum i varukorgen men aldrig slutför bokningen. Prisinformationen är spretig – vissa avgifter (t.ex. städavgift) visas först i kassan.\n\nFormulera 2 testbara hypoteser kopplade till problemet. Varje hypotes ska innehålla ett observerbart problem och en förväntad effekt om det åtgärdas.",
    answer_key:
      "H1) Om vi visar totalpriser inklusive avgifter direkt på söksidan förväntar vi oss att andelen avhopp i kassan minskar. H2) Om vi kortar kassaflödet från 4 till 2 steg förväntar vi oss att fler bokningar slutförs.",
    explanation:
      "Bra svar kopplar ett specifikt, observerbart problem till en mätbar förväntad förändring. Svaga svar är vaga ('gör designen bättre') eller saknar kausal länk problem → åtgärd → effekt.",
    scoring_criteria: [
      "Hypotesen har ett specifikt problem som grund (inte en önskelista)",
      "Förväntat resultat är mätbart (ökar X, minskar Y)",
      "Kopplingen problem → åtgärd → effekt är logisk",
      "Båda hypoteserna är tydligt separata och testbara var för sig"
    ],
    strong_answer_example:
      "H1) Om vi visar totalpriser inklusive obligatoriska avgifter redan på listningssidan förväntar vi oss att bounce-rate i kassan sjunker – priset är inte längre en överraskning i sista steget. H2) Om vi tar bort det obligatoriska kontoregistreringssteget och erbjuder gästköp förväntar vi oss att fler genomför betalning utan att avbryta.",
    common_mistakes:
      "Vanliga svagheter: Påståenden utan mätbar effekt ('det skulle förbättra UX'). Att beskriva en lösning utan att motivera med ett problem. Att upprepa samma hypotes med omformulerade ord."
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
    estimated_minutes: 6,
    prompt:
      "Du har tagit fram en klickbar prototyp för en matbeställningsapp. Chefen vill att du testar med riktiga användare inom en vecka – du har ungefär 3 timmar totalt.\n\nSkriv en testplan i tre punkter:\n1. Vad vill du testa? (1–2 konkreta, specifika testmål)\n2. Vilka testdeltagare passar – och varför just de?\n3. Vad observerar du konkret under testet – vad letar du efter?",
    answer_key:
      "1) Mål: Kan användaren hitta 'Ändra order' utan hjälp? Förstår de skillnaden mellan leverans och upphämtning? 2) Deltagare: 3–4 personer som beställer mat online minst 1x/mån – faktisk målgrupp ger jämförbar feedback. 3) Observation: Var tvekar de, var klickar de fel, uttrycker de förvirring högt.",
    explanation:
      "Bra svar är konkret och beteendeorienterat – inte en projektbeskrivning. Fokus på vad användaren gör, inte vad de tycker.",
    scoring_criteria: [
      "Testmålen är specifika och beteendeorienterade (inte 'om det är bra')",
      "Deltagarvalet motiveras med koppling till faktisk målgrupp",
      "Observationerna beskriver konkret beteende – tveka, klicka fel, missförstå",
      "Planen är realistisk och genomförbar inom 3 timmar"
    ],
    strong_answer_example:
      "1) Testmål: Kan användaren slutföra en beställning utan instruktioner? Förstår de att 'varukorg' och 'aktiv order' är olika vyer? 2) Deltagare: 3 personer som beställer mat online regelbundet – de har mental modell av liknande appar, vilket ger meningsfull jämförelsedata. 3) Observation: Var pausar de? Klickar de på fel element? Säger de 'jag förstår inte varför...'? Dessa pauser och misstag visar var gränssnittet är otydligt.",
    common_mistakes:
      "Vanliga svagheter: Testmål som 'testa om appen är intuitiv' – för vagt för att leda till konkreta observationer. Välja deltagare utan motivering. Fokusera på att samla åsikter ('gillade du det?') istället för att observera beteende."
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
    estimated_minutes: 5,
    prompt:
      "Du modererar ett 10-minuters användartest av ett e-handelsföretags checkout-flöde. Prototypen har tre steg: (1) välj leveransmetod, (2) ange adress, (3) bekräfta betalning.\n\nBeskriv två konkreta observationer du aktivt letar efter under testet. Förklara varför just de observationerna är värdefulla att notera.",
    answer_key:
      "Obs 1) Tvekan vid leveransval – om användaren stannar länge utan att välja, tyder det på att alternativen är oklara. Obs 2) Om användaren backar från steg 3 – kan indikera en oväntad kostnad eller oklart betalningssteg.",
    explanation:
      "Bra observationer är beteendebaserade, inte tolkningar. 'Användaren tvekar' är en observation; 'användaren gillar inte designen' är en tolkning.",
    scoring_criteria: [
      "Observationerna är beteendebaserade (vad användaren gör, inte vad de tycker)",
      "Varje observation kopplas till ett potentiellt UX-problem",
      "Observationerna är realistiska och genomförbara under ett kort test",
      "Svaret visar förståelse för skillnaden observation vs tolkning"
    ],
    strong_answer_example:
      "Obs 1: Jag noterar om användaren söker information om extraavgifter eller returpolicy under betalningssteget – det indikerar att flödet inte ger tillräcklig trygghet i rätt ögonblick. Obs 2: Jag noterar om bekräftelsesidan läses noggrant eller stängs snabbt – snabb stängning kan tyda på osäkerhet om ordern gick igenom.",
    common_mistakes:
      "Vanliga svagheter: Skriva tolkningar som observationer ('användaren verkar osäker'). Välja för vaga observationer ('se hur de rör sig') utan koppling till specifika designval. Fokusera på estetisk feedback istället för flödes- eller förståelseproblem."
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
    estimated_minutes: 5,
    prompt:
      "En kollega ska implementera ett realtidsvideomötessystem och är osäker på om hon ska använda TCP eller UDP för videoströmmen.\n\nFörklara:\n1. Vilket protokoll passar bäst för realtidsvideo, och varför?\n2. Vad är den viktigaste egenskapsskillnaden jämfört med det andra alternativet?",
    answer_key:
      "UDP passar bäst – det saknar återöverföring, vilket håller latency lågt. TCP garanterar att varje paket anländer, men fördröjer strömmen vid paketförlust. Skillnad: TCP = tillförlitlighet, UDP = hastighet utan leveransgaranti.",
    explanation:
      "Bra svar visar avvägningen tillförlitlighet vs latency. Att bara namnge UDP räcker inte – resonemang om varför TCP är olämpligt för realtid är det som visar djupförståelse.",
    scoring_criteria: [
      "UDP identifieras som rätt val för realtidsvideo",
      "Förklaring av varför TCP är olämpligt (latency vid paketförlust/återöverföring)",
      "Skillnaden tillförlitlighet vs hastighet/latency nämns tydligt",
      "Svaret är tillämpat på kontexten, inte bara en definition"
    ],
    strong_answer_example:
      "UDP är rätt val. Vid realtidsvideo är ett missat paket acceptabelt – det syns som ett kort hack i bilden, men strömmen fortsätter utan uppehåll. Med TCP måste varje förlorat paket skickas om, vilket skapar oacceptabel fördröjning. Skillnaden: TCP prioriterar att allt kommer fram korrekt; UDP prioriterar att det kommer fram snabbt, med risk för enstaka paketförlust.",
    common_mistakes:
      "Vanliga svagheter: Säga 'TCP är bättre för realtid för att det är säkrare' – blandar ihop krypteringssäkerhet med leveranstillförlitlighet. Definiera protokollen korrekt men missa att tillämpa kunskapen på realtidsproblemet. Inte nämna latency som central avvägningsfaktor."
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
    estimated_minutes: 5,
    prompt:
      "Du är på ett IT-konsultuppdrag på ett litet kontor med 20 datorer. Det finns en switch och en router i nätverket. En junior kollega frågar: 'Kan vi inte ta bort routern? Switcharna verkar räcka.'\n\nFörklara för din kollega:\n1. Vad gör switchen och i vilket OSI-skikt verkar den?\n2. Vad gör routern, och varför går det inte att ta bort den?",
    answer_key:
      "Switchen kopplar enheter inom samma LAN och verkar på lager 2 (MAC-adresser). Routern kopplar samman olika nätverk (t.ex. LAN med internet) och verkar på lager 3 (IP-adresser). Utan routern kan datorerna prata med varandra men inte nå internet.",
    explanation:
      "Bra svar använder rätt OSI-lager och ger ett praktiskt skäl varför routern behövs. Svaga svar blandar ihop lager 2 och 3 eller förklarar funktionen utan att koppla till konkret konsekvens.",
    scoring_criteria: [
      "Switch kopplas till LAN-trafik och lager 2 (MAC-adresser)",
      "Router kopplas till trafik mellan nätverk och lager 3 (IP-adresser)",
      "Praktisk konsekvens av att ta bort routern förklaras",
      "OSI-lager nämns korrekt för respektive enhet"
    ],
    strong_answer_example:
      "Switchen hanterar kommunikation mellan de 20 datorerna på det lokala nätverket – den läser MAC-adresser och skickar trafik rätt. Det är lager 2-arbete. Routern däremot vet hur man hittar vägen till andra nätverk – den sitter mellan kontoret och internet och bestämmer vägen ut. Ta ni bort routern kan datorerna kommunicera med varandra, men ni når inte ett enda externt system – inte ens en webbsida.",
    common_mistakes:
      "Vanliga svagheter: Beskriva switchen som ett modem eller blanda ihop med router. Nämna rätt funktion men fel OSI-lager. Förklara vad enheterna gör utan att svara på varför routern faktiskt behövs i scenariot."
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
    estimated_minutes: 5,
    prompt:
      "Du skriver en kalkylatorapp i Java. Du behöver en metod som tar emot två heltal och returnerar deras summa.\n\nSkriv metodsignaturen (inte hela metodkroppen) och förklara kort vad varje del i signaturen gör: returtyp, metodnamn och parametrar.",
    answer_key:
      "static int sum(int a, int b) – Returtyp: int (returnerar ett heltal). Metodnamn: sum (beskriver syftet). Parametrar: (int a, int b) tar emot två heltal som indata.",
    explanation:
      "Bra svar ger en korrekt signatur och förklarar alla tre delar. Att skriva hela metodkroppen är inte fel men inte det primära – fokus är på att förstå signaturen.",
    scoring_criteria: [
      "Korrekt returtyp (int)",
      "Meningsfullt metodnamn som speglar syftet",
      "Korrekt parameterdeklaration med datatyp och namn",
      "Förklaring av vad respektive del i signaturen gör"
    ],
    strong_answer_example:
      "'static int sum(int a, int b)' – 'int' är returtypen och lovar att metoden skickar tillbaka ett heltal. 'sum' är metodnamnet och beskriver tydligt vad metoden gör. '(int a, int b)' är parametrarna – metoden tar emot två heltalsvärden som indata. 'static' innebär att metoden kan anropas direkt utan att skapa ett objekt.",
    common_mistakes:
      "Vanliga svagheter: Skriva 'void' som returtyp – void returnerar ingenting, men vi vill ha summan tillbaka. Glömma parametrar eller blanda ihop returtyp med parametertyp. Skriva hela metodkroppen utan att förstå att signaturen är kontraktet."
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
    estimated_minutes: 7,
    prompt:
      "Du är UX-konsult anlitad av ett medelstort sportföretag som säljer träningsutrustning online. De har ett kundtjänstproblem: 40 % av alla supportärenden handlar om att kunder inte vet var i processen deras retur befinner sig. Appen har idag ingen statusuppdatering för returer.\n\nBeskriv din UX-lösning i tre delar:\n1. Vem är primär användare – vad behöver de veta och när?\n2. Vilken funktion eller vy skulle du designa (wireframe-tanke räcker)?\n3. Hur motiverar du att lösningen minskar just kundtjänstärendena?",
    answer_key:
      "1) Primär användare: kund som väntar på returbekräftelse, vill veta status: mottagen → behandlad → återbetald. 2) 'Mina returer'-sektion i appen med statusteg och push-notis vid förändring. 3) Självservice på statusfrågor minskar supportkontakt – kunden hittar svaret utan att ringa.",
    explanation:
      "Bedöms på struktur: Målgrupp → Lösningsidé → Motivering. Det finns inget enda rätt svar, men resonemang ska hänga ihop logiskt.",
    scoring_criteria: [
      "Tydlig målgruppsbeskrivning med relevant kontext (inte bara 'kund')",
      "Konkret lösningsidé – minst en specifik funktion eller vy nämns",
      "Motivering kopplar lösningen direkt till problemet (reducerade ärenden)",
      "Logisk kedja: problem → lösning → förväntad effekt"
    ],
    strong_answer_example:
      "Primär användare är kunden som lämnat in en retur och nu väntar på återbetalning – typiskt frustrerad och osäker. De vill ha svar på: 'Har de fått min retur?'. Lösning: en 'Mina returer'-vy i appen med statusteg (Inlämnad / Mottagen / Behandlad / Återbetald) och push-notis vid varje statusförändring. Motivering: Om kunden kan se status direkt behöver de inte ringa – vilket direkt reducerar volymen på 'var är min retur'-ärenden.",
    common_mistakes:
      "Svaga svar: Beskriver en generell förbättring utan att koppla till det specifika problemet. Glömmer motivering – förklarar inte varför lösningen minskar supportärenden. Väljer en teknisk lösning (t.ex. bättre databas) utan att tänka på slutanvändarens upplevelse."
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
    prompt:
      "En nybörjarprogrammerare frågar: 'Varför ska jag dela upp koden i metoder? Det verkar krångligare – jag kan ju skriva allt på rad.'\n\nFörklara med ett konkret, enkelt exempel:\n1. Vad gör en metod rent tekniskt?\n2. Varför är det bättre att bryta ut ett upprepat kodblock till en metod?",
    answer_key:
      "En metod är ett namngivet kodblock som kan anropas flera gånger. Exempel: om du beräknar moms tre gånger i programmet – utan metod skriver du beräkningen tre gånger; med metod skriver du den en gång och anropar den. Fördel: enklare att korrigera (ändrar på ett ställe).",
    explanation:
      "Bra svar visar förståelse för återanvändning och underhållbarhet. Konkret exempel är centralt – en förklaring utan exempel visar inte tillämpning.",
    scoring_criteria: [
      "Teknisk förklaring av vad en metod är (namngivet kodblock, anropsbart)",
      "Tydlig fördel med återanvändning nämns",
      "Konkret och relevant exempel ges",
      "Kopplar till underhåll – ändrar på ett ställe, inte flera"
    ],
    strong_answer_example:
      "En metod är ett namngivet block kod du kan anropa när du behöver det, istället för att skriva om samma sak. Praktiskt: du beräknar moms (pris × 1.25) på tre ställen i koden. Utan metod skriver du det tre gånger. Om momsen ändras till 1.20 måste du hitta och ändra alla tre – och riskerar missa ett. Med en metod 'beraknaTotal(pris)' ändrar du bara på ett ställe. Det kallas DRY – Don't Repeat Yourself.",
    common_mistakes:
      "Vanliga svagheter: Förklara vad en metod är utan att svara på *varför* det är bättre – det är frågan. Ge ett för abstrakt exempel ('metod gör saker'). Blanda ihop metod med klass eller objekt."
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
    estimated_minutes: 5,
    prompt:
      "Du ska lösa ett programmeringsproblem: givet en lista med heltal, räkna hur många av dem som är jämna.\n\nSkriv pseudokod för en funktion som löser det. Din pseudokod ska tydligt visa:\n- Hur du går igenom listan steg för steg\n- Hur du avgör om ett tal är jämnt\n- Hur du håller räkning och vad du returnerar",
    answer_key:
      "FUNKTION raknaJamna(lista): antal = 0; FÖR VARJE tal I lista: OM tal MOD 2 == 0: antal = antal + 1; RETURNERA antal.",
    explanation:
      "Bra pseudokod är språkoberoende men logiskt korrekt. Den ska visa struktur – loop, villkor, räknare och retur – utan att vara riktig Java-syntax.",
    scoring_criteria: [
      "Loopen itererar korrekt över alla element i listan",
      "Villkoret kontrollerar jämnhet med modulo (% 2 == 0 eller liknande)",
      "En räknarvariabel initieras och uppdateras korrekt",
      "Resultatet returneras i slutet av funktionen"
    ],
    strong_answer_example:
      "FUNKTION raknaJamna(lista):\n  sätt antal = 0\n  FÖR VARJE tal I lista:\n    OM tal MOD 2 ÄR 0:\n      öka antal med 1\n  RETURNERA antal\n\nLogiken: vi startar med noll, kollar varje tal mot 'är det delbart med 2 utan rest?', och ökar räknaren vid träff.",
    common_mistakes:
      "Vanliga svagheter: Glömma att initiera räknaren till 0 före loopen – räknaren måste existera innan den kan ökas. Kontrollera fel villkor (t.ex. tal > 2 istället för tal % 2 == 0). Glömma att returnera resultatet – en funktion utan retur är ofullständig."
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
    estimated_minutes: 5,
    prompt:
      "Du ska skriva ett litet program som tar emot tre heltal från användaren och skriver ut vilket av dem som är störst.\n\nSkriv pseudokod som löser det. Visa steg för steg hur du:\n- Tar emot de tre talen\n- Jämför dem för att hitta det största\n- Skriver ut resultatet",
    answer_key:
      "Läs a, b, c; sätt max = a; om b > max: sätt max = b; om c > max: sätt max = c; skriv ut max.",
    explanation:
      "Bra svar visar tydlig stegvis jämförelse med en max-variabel. Lösningen ska fungera oavsett talens ordning.",
    scoring_criteria: [
      "Tre värden läses in",
      "En max-variabel initieras med ett av talen",
      "De övriga två talen jämförs mot max och uppdaterar vid behov",
      "Max skrivs ut i slutet"
    ],
    strong_answer_example:
      "Läs in a, b, c från användaren.\nSätt max = a (vi börjar med att anta att a är störst).\nOM b är större än max: uppdatera max till b.\nOM c är större än max: uppdatera max till c.\nSkriv ut: 'Det största talet är: ' + max.\n\nFunkar oavsett vilken ordning talen angavs.",
    common_mistakes:
      "Vanliga svagheter: Jämföra talen mot varandra parvis utan en max-variabel – logiken blir onödigt komplex. Glömma att initiera max innan jämförelsen. Skriva ut fel variabel i slutet (t.ex. 'a' istället för 'max')."
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
  },

  // ─────────────────────────────────────────────────
  // APTITUDPROV – Nackademin-simulering
  // Del A: Induktiv logik (nack-a1 → nack-a6)
  // Del B: Deduktiv logik (nack-a7 → nack-a12)
  // Del C: Verbal förmåga (nack-a13 → nack-a18)
  // Del D: Svensk språkfärdighet (nack-a19 → nack-a24)
  // ─────────────────────────────────────────────────

  // DEL A – INDUKTIV LOGIK
  {
    id: "nack-a1",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken siffra kommer härnäst i serien?\n2, 4, 6, 8, ___",
    options: [
      { id: "a", text: "9" },
      { id: "b", text: "10" },
      { id: "c", text: "11" },
      { id: "d", text: "12" }
    ],
    answer_key: "b",
    explanation: "Serien ökar med +2 för varje steg: 2, 4, 6, 8, 10."
  },
  {
    id: "nack-a2",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken bokstav saknas i serien?\nA, C, E, G, ___",
    options: [
      { id: "a", text: "H" },
      { id: "b", text: "I" },
      { id: "c", text: "J" },
      { id: "d", text: "K" }
    ],
    answer_key: "b",
    explanation: "Var annan bokstav i alfabetet: A(1), C(3), E(5), G(7), I(9)."
  },
  {
    id: "nack-a3",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal kommer härnäst?\n1, 4, 9, 16, 25, ___",
    options: [
      { id: "a", text: "30" },
      { id: "b", text: "34" },
      { id: "c", text: "36" },
      { id: "d", text: "49" }
    ],
    answer_key: "c",
    explanation: "Serien är heltalens kvadrater: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36."
  },
  {
    id: "nack-a4",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket är nästa par i mönstret?\nRad 1: ○ □ ○ □\nRad 2: □ ○ □ ○\nRad 3: ○ □ ○ □\nRad 4: ___",
    options: [
      { id: "a", text: "○ □ ○ □" },
      { id: "b", text: "□ ○ □ ○" },
      { id: "c", text: "□ □ ○ ○" },
      { id: "d", text: "○ ○ □ □" }
    ],
    answer_key: "b",
    explanation: "Raderna alternerar: udda rader (1,3) börjar med ○; jämna rader (2,4) börjar med □."
  },
  {
    id: "nack-a5",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal saknas?\n2, 3, 5, 8, 13, 21, ___",
    options: [
      { id: "a", text: "29" },
      { id: "b", text: "33" },
      { id: "c", text: "34" },
      { id: "d", text: "42" }
    ],
    answer_key: "c",
    explanation: "Fibonacci-mönster: varje tal är summan av de två föregående. 13+21=34."
  },
  {
    id: "nack-a6",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Serien följer ett mönster. Vilket tal kommer härnäst?\n3, 6, 12, 24, ___",
    options: [
      { id: "a", text: "36" },
      { id: "b", text: "42" },
      { id: "c", text: "48" },
      { id: "d", text: "96" }
    ],
    answer_key: "c",
    explanation: "Varje tal multipliceras med 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48."
  },

  // DEL B – DEDUKTIV LOGIK
  {
    id: "nack-a7",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Alla hundar är djur.\nRex är en hund.\nVad kan vi säkert sluta oss till?",
    options: [
      { id: "a", text: "Alla djur är hundar" },
      { id: "b", text: "Rex är ett djur" },
      { id: "c", text: "Rex är det enda djuret" },
      { id: "d", text: "Alla djur heter Rex" }
    ],
    answer_key: "b",
    explanation: "Direkttillämpning av syllogism: Rex tillhör hundar, hundar är en delmängd av djur → Rex är ett djur."
  },
  {
    id: "nack-a8",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Om det regnar tar Sara alltid med paraply.\nDet regnar idag.\nVad vet vi säkert?",
    options: [
      { id: "a", text: "Sara är ute och går" },
      { id: "b", text: "Sara tar med paraply" },
      { id: "c", text: "Det slutar regna snart" },
      { id: "d", text: "Sara gillar inte regn" }
    ],
    answer_key: "b",
    explanation: "Modus ponens: Om P→Q och P gäller, gäller Q. Regnar=P, Sara tar paraply=Q."
  },
  {
    id: "nack-a9",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Alla studenter på kursen klarade examen.\nMarkus klarade inte examen.\nVad kan vi säkert sluta oss till?",
    options: [
      { id: "a", text: "Markus är inte student på kursen" },
      { id: "b", text: "Kursen var för svår för Markus" },
      { id: "c", text: "Markus studerar ingenstans" },
      { id: "d", text: "Hela gruppen underkändes" }
    ],
    answer_key: "a",
    explanation: "Kontrapositivt resonemang: Om alla på kursen klarade (P→Q) och Markus inte klarade (¬Q), följer att Markus inte är på kursen (¬P)."
  },
  {
    id: "nack-a10",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Inga reptiler är varmblodade.\nKobran är en reptil.\nVad kan vi säkert sluta oss till?",
    options: [
      { id: "a", text: "Kobran är varmblodad" },
      { id: "b", text: "Kobran är inte varmblodad" },
      { id: "c", text: "Alla varmblodade är reptiler" },
      { id: "d", text: "Inga djur är varmblodade" }
    ],
    answer_key: "b",
    explanation: "Kobra tillhör reptiler, och inga reptiler är varmblodade → Kobran är inte varmblodad."
  },
  {
    id: "nack-a11",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Premiss 1: Alla B är C.\nPremiss 2: Inget A är C.\nVad gäller om förhållandet mellan A och B?",
    options: [
      { id: "a", text: "Alla A är B" },
      { id: "b", text: "Inget A är B" },
      { id: "c", text: "Alla B är A" },
      { id: "d", text: "Inget B är C" }
    ],
    answer_key: "b",
    explanation: "Eftersom B⊆C (premiss 1) och A∩C=∅ (premiss 2), kan inget A vara ett B – de har ingen överlappning."
  },
  {
    id: "nack-a12",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Alla framgångsrika företag investerar i marknadsföring.\nBolaget Apex investerar i marknadsföring.\nVad kan vi logiskt sluta oss till?",
    options: [
      { id: "a", text: "Apex är ett framgångsrikt företag" },
      { id: "b", text: "Apex kommer att bli framgångsrikt" },
      { id: "c", text: "Vi kan inte sluta oss till att Apex är framgångsrikt" },
      { id: "d", text: "Apex är det enda företaget som investerar" }
    ],
    answer_key: "c",
    explanation: "Logisk fälla: Om A→B och B gäller, följer INTE nödvändigtvis A (affirming the consequent). Marknadsföring kan göras av icke-framgångsrika företag också."
  },

  // DEL C – VERBAL FÖRMÅGA
  {
    id: "nack-a13",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj det ord som är närmast i betydelse till 'snabb':",
    options: [
      { id: "a", text: "Stor" },
      { id: "b", text: "Rask" },
      { id: "c", text: "Tyst" },
      { id: "d", text: "Hård" }
    ],
    answer_key: "b",
    explanation: "Rask = snabb, kvick. De övriga orden är inte synonyma med 'snabb'."
  },
  {
    id: "nack-a14",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj det ord som är motsats till 'generös':",
    options: [
      { id: "a", text: "Vänlig" },
      { id: "b", text: "Modig" },
      { id: "c", text: "Snål" },
      { id: "d", text: "Nyfiken" }
    ],
    answer_key: "c",
    explanation: "Generös = frikostig. Antonym: snål = girig, petig med pengar."
  },
  {
    id: "nack-a15",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Bok är till bibliotek som konstverk är till ___?",
    options: [
      { id: "a", text: "Penslar" },
      { id: "b", text: "Museum" },
      { id: "c", text: "Färg" },
      { id: "d", text: "Vägg" }
    ],
    answer_key: "b",
    explanation: "Böcker visas/förvaras på bibliotek; konstverk visas på museum. Samma relation: objekt → plats där de samlas och visas."
  },
  {
    id: "nack-a16",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket ord passar bäst i meningen? (välj det med positiv innebörd)\n'Han var ___ för att ta emot kritik.'",
    options: [
      { id: "a", text: "tvungen" },
      { id: "b", text: "ovillig" },
      { id: "c", text: "öppen" },
      { id: "d", text: "pressad" }
    ],
    answer_key: "c",
    explanation: "'Öppen för kritik' signalerar positiv mottaglighet. 'Tvungen', 'ovillig' och 'pressad' har negativ eller motvillig klang."
  },
  {
    id: "nack-a17",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Partitur är till dirigent som ritning är till ___?",
    options: [
      { id: "a", text: "Arkitekt" },
      { id: "b", text: "Byggnad" },
      { id: "c", text: "Hammare" },
      { id: "d", text: "Material" }
    ],
    answer_key: "a",
    explanation: "Partitur = det styrdokument dirigenten arbetar utifrån. Ritning = det styrdokument arkitekten arbetar utifrån. Relation: dokument → yrkesperson som tolkar det."
  },
  {
    id: "nack-a18",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "'Trots sin ___ lyckades laget vinna.' Vilket ord ger mest logisk mening i sammanhanget?",
    options: [
      { id: "a", text: "talang" },
      { id: "b", text: "framgång" },
      { id: "c", text: "förberedelse" },
      { id: "d", text: "oerfarenhet" }
    ],
    answer_key: "d",
    explanation: "'Trots' antyder ett hinder eller en nackdel. 'Oerfarenhet' är ett hinder som gör vinsten anmärkningsvärd. 'Talang' och 'framgång' är fördelar – logiskt inkonsekvent med 'trots'."
  },

  // DEL D – SVENSK SPRÅKFÄRDIGHET
  {
    id: "nack-a19",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket ord stavas korrekt?",
    options: [
      { id: "a", text: "Resturang" },
      { id: "b", text: "Restorang" },
      { id: "c", text: "Restaurang" },
      { id: "d", text: "Restaruang" }
    ],
    answer_key: "c",
    explanation: "Korrekt stavning: Restaurang. Vanligt fel är att byta plats på bokstäverna i mittdelen."
  },
  {
    id: "nack-a20",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj rätt verbform:\n'Hon har ___ boken.'",
    options: [
      { id: "a", text: "läste" },
      { id: "b", text: "läser" },
      { id: "c", text: "läst" },
      { id: "d", text: "läsa" }
    ],
    answer_key: "c",
    explanation: "Med hjälpverbet 'har' används perfektparticip: 'läst'. 'Läste' är preteritum och används utan 'har'."
  },
  {
    id: "nack-a21",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening har korrekt ordföljd?",
    options: [
      { id: "a", text: "Igår jag åkte till jobbet tidigt." },
      { id: "b", text: "Igår åkte jag till jobbet tidigt." },
      { id: "c", text: "Jag igår åkte tidigt till jobbet." },
      { id: "d", text: "Tidigt igår jag åkte till jobbet." }
    ],
    answer_key: "b",
    explanation: "Inversionsregeln: när en adverbial (t.ex. 'Igår') inleder en mening placeras subjektet EFTER det finita verbet. 'Igår åkte jag' är korrekt – inte 'Igår jag åkte'."
  },
  {
    id: "nack-a22",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening är tydligast och undviker syftningsfel?",
    options: [
      { id: "a", text: "Läraren berättade för studenten att han hade fel." },
      { id: "b", text: "Läraren sa till studenten: 'Du har fel.'" },
      { id: "c", text: "Han berättade att han hade fel för honom." },
      { id: "d", text: "Studenten fick höra att han hade fel av läraren." }
    ],
    answer_key: "b",
    explanation: "I alternativen a, c och d är 'han' oklart – syftar det på läraren eller studenten? Direkt anföring (B) är tydligast och eliminerar syftningsfelet."
  },
  {
    id: "nack-a23",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening är grammatiskt korrekt?",
    options: [
      { id: "a", text: "Det är den mest unikaste lösningen vi sett." },
      { id: "b", text: "Det är den mest unika lösningen vi sett." },
      { id: "c", text: "Det är den unikalste lösningen vi sett." },
      { id: "d", text: "Det är den mer unikare lösningen vi sett." }
    ],
    answer_key: "b",
    explanation: "'Unik' är ett graderat adjektiv och kompareras som 'unik – mer unik – mest unik'. 'Mest unikaste' är dubbel superlativ (fel). 'Unikalste' och 'unikare' är inte svenska former."
  },
  {
    id: "nack-a24",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening har samma innebörd som:\n'Det var inte förrän han pratade med chefen som han förstod situationen.'",
    options: [
      { id: "a", text: "Han pratade med chefen men förstod ändå inte." },
      { id: "b", text: "Samtalet med chefen var det som fick honom att förstå." },
      { id: "c", text: "Han förstod situationen innan han pratade med chefen." },
      { id: "d", text: "Chefen förstod inte situationen heller." }
    ],
    answer_key: "b",
    explanation: "'Det var inte förrän X som Y' = Y hände TILL FÖLJD AV X, inte tidigare. Korrekt omformulering: samtalet med chefen var orsaken till förståelsen."
  },

  // ─────────────────────────────────────────────────
  // EXTRA TRÄNINGSFRÅGOR – Aptitudprov (nack-b serien)
  // 3 extra per del, för riktad träning efter fel
  // ─────────────────────────────────────────────────

  // DEL A EXTRA – Induktiv logik
  {
    id: "nack-b1",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal saknas?\n100, 50, 25, ___",
    options: [
      { id: "a", text: "10" },
      { id: "b", text: "12" },
      { id: "c", text: "12.5" },
      { id: "d", text: "15" }
    ],
    answer_key: "c",
    explanation: "Varje tal divideras med 2: 100÷2=50, 50÷2=25, 25÷2=12.5."
  },
  {
    id: "nack-b2",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal kommer härnäst?\n1, 1, 2, 3, 5, 8, ___",
    options: [
      { id: "a", text: "11" },
      { id: "b", text: "12" },
      { id: "c", text: "13" },
      { id: "d", text: "16" }
    ],
    answer_key: "c",
    explanation: "Fibonacci: 5+8=13. Varje tal är summan av de två föregående."
  },
  {
    id: "nack-b3",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket mönster fortsätter?\n2, 6, 12, 20, 30, ___",
    options: [
      { id: "a", text: "36" },
      { id: "b", text: "40" },
      { id: "c", text: "42" },
      { id: "d", text: "44" }
    ],
    answer_key: "c",
    explanation: "Skillnaderna ökar: +4, +6, +8, +10, +12. Alltså 30+12=42."
  },

  // DEL B EXTRA – Deduktiv logik
  {
    id: "nack-b4",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Alla fåglar har vingar.\nPingviner är fåglar.\nPingviner kan inte flyga.\nVad kan vi säkert sluta oss till?",
    options: [
      { id: "a", text: "Alla djur med vingar kan flyga" },
      { id: "b", text: "Pingviner har vingar men kan inte flyga" },
      { id: "c", text: "Fåglar som inte flyger är inte riktiga fåglar" },
      { id: "d", text: "Inga fåglar kan flyga" }
    ],
    answer_key: "b",
    explanation: "Pingviner är fåglar → de har vingar (premiss 1). Men att ha vingar garanterar inte flyg – det framgår av premiss 3."
  },
  {
    id: "nack-b5",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Om det är vardag stänger affären kl 20.\nIdag är det lördag.\nVad vet vi säkert om affären?",
    options: [
      { id: "a", text: "Affären stänger kl 20" },
      { id: "b", text: "Affären stänger inte kl 20" },
      { id: "c", text: "Vi kan inte säga något om stängningstiden" },
      { id: "d", text: "Affären är stängd hela dagen" }
    ],
    answer_key: "c",
    explanation: "Regeln gäller vardagar. Lördag är inte en vardag – men vi vet inte vad som gäller på lördagar. Vi kan inte dra slutsatsen att affären stänger vid annan tid, bara att regeln inte gäller."
  },
  {
    id: "nack-b6",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Premiss 1: Alla X är Y.\nPremiss 2: Alla Y är Z.\nVad kan vi säkert sluta oss till?",
    options: [
      { id: "a", text: "Alla Z är X" },
      { id: "b", text: "Alla X är Z" },
      { id: "c", text: "Inga X är Z" },
      { id: "d", text: "Alla Y är X" }
    ],
    answer_key: "b",
    explanation: "Transitiv slutledning: X⊆Y och Y⊆Z → X⊆Z. Alltså är alla X också Z."
  },

  // DEL C EXTRA – Verbal förmåga
  {
    id: "nack-b7",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj det ord som är närmast i betydelse till 'enigmatisk':",
    options: [
      { id: "a", text: "Tydlig" },
      { id: "b", text: "Gåtfull" },
      { id: "c", text: "Snabb" },
      { id: "d", text: "Generös" }
    ],
    answer_key: "b",
    explanation: "Enigmatisk = svår att förstå, gåtfull, mystisk."
  },
  {
    id: "nack-b8",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Läkare är till patient som lärare är till ___?",
    options: [
      { id: "a", text: "Skola" },
      { id: "b", text: "Kursplan" },
      { id: "c", text: "Elev" },
      { id: "d", text: "Kunskap" }
    ],
    answer_key: "c",
    explanation: "Läkaren hjälper patienten direkt. Läraren arbetar direkt med eleven. Relation: yrkesperson → den de betjänar."
  },
  {
    id: "nack-b9",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "'Hon bemötte kritiken med ___.' Vilket ord ger mest positiv innebörd?",
    options: [
      { id: "a", text: "likgiltighet" },
      { id: "b", text: "ilska" },
      { id: "c", text: "värdighet" },
      { id: "d", text: "förakt" }
    ],
    answer_key: "c",
    explanation: "Värdighet = lugn och respektfull hållning under press. De övriga alternativen har negativ laddning."
  },

  // DEL D EXTRA – Svensk språkfärdighet
  {
    id: "nack-b10",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket ord stavas korrekt?",
    options: [
      { id: "a", text: "Exkursion" },
      { id: "b", text: "Exkurssion" },
      { id: "c", text: "Excursion" },
      { id: "d", text: "Exkursjon" }
    ],
    answer_key: "a",
    explanation: "Korrekt stavning: Exkursion. Låneordet har anpassats till svensk stavning med k (inte c) och -ion (inte -sion eller -jon)."
  },
  {
    id: "nack-b11",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening har korrekt ordföljd?\n(Tidsadverbial inleder meningen)",
    options: [
      { id: "a", text: "Nästa vecka vi ska resa till Stockholm." },
      { id: "b", text: "Nästa vecka ska vi resa till Stockholm." },
      { id: "c", text: "Vi ska resa nästa vecka till Stockholm." },
      { id: "d", text: "Till Stockholm nästa vecka vi reser." }
    ],
    answer_key: "b",
    explanation: "Inversionsregeln: tidsadverbial i inledning → verbet kommer före subjektet. 'Nästa vecka ska vi' är korrekt."
  },
  {
    id: "nack-b12",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening är grammatiskt korrekt?",
    options: [
      { id: "a", text: "Varken Anna eller Björn har inte lämnat in sina uppgifter." },
      { id: "b", text: "Varken Anna eller Björn har lämnat in sina uppgifter." },
      { id: "c", text: "Inte varken Anna eller Björn har lämnat uppgifterna." },
      { id: "d", text: "Anna och Björn har varken inte lämnat sina uppgifter." }
    ],
    answer_key: "b",
    explanation: "'Varken...eller' är redan en negation – man lägger inte till 'inte' också. Dubbel negation är fel på svenska i detta sammanhang."
  },

  // ─────────────────────────────────────────────────
  // APTITUDPROV – Utökat bank (nack-c serien)
  // Fler frågor per del för variation, Medel–Svår
  // ─────────────────────────────────────────────────

  // DEL A EXTRA 2 – Induktiv logik
  {
    id: "nack-c1",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal saknas i serien?\n81, 27, 9, 3, ___",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "0" },
      { id: "d", text: "0.5" }
    ],
    answer_key: "a",
    explanation: "Varje tal divideras med 3: 81÷3=27, 27÷3=9, 9÷3=3, 3÷3=1."
  },
  {
    id: "nack-c2",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket par bokstäver kommer härnäst?\nAZ, BY, CX, DW, ___",
    options: [
      { id: "a", text: "EV" },
      { id: "b", text: "EW" },
      { id: "c", text: "FV" },
      { id: "d", text: "EU" }
    ],
    answer_key: "a",
    explanation: "Första bokstaven går framåt (A,B,C,D,E) och andra bakåt (Z,Y,X,W,V) i alfabetet."
  },
  {
    id: "nack-c3",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal saknas?\n4, 9, 25, 49, 121, ___",
    options: [
      { id: "a", text: "144" },
      { id: "b", text: "169" },
      { id: "c", text: "196" },
      { id: "d", text: "225" }
    ],
    answer_key: "b",
    explanation: "Serien är kvadraterna av primtal: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, 13²=169."
  },
  {
    id: "nack-c4",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vad är nästa tal i serien?\n1, 3, 7, 13, 21, 31, ___",
    options: [
      { id: "a", text: "40" },
      { id: "b", text: "41" },
      { id: "c", text: "43" },
      { id: "d", text: "45" }
    ],
    answer_key: "c",
    explanation: "Skillnaderna ökar jämnt: +2, +4, +6, +8, +10, +12. Alltså 31+12=43."
  },
  {
    id: "nack-c5",
    track_id: "nackademin_ux",
    topic: "Aptitud: Induktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket tal kommer härnäst?\n2, 5, 11, 23, 47, ___",
    options: [
      { id: "a", text: "89" },
      { id: "b", text: "94" },
      { id: "c", text: "95" },
      { id: "d", text: "96" }
    ],
    answer_key: "c",
    explanation: "Varje tal = föregående × 2 + 1: 2×2+1=5, 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95."
  },

  // DEL B EXTRA 2 – Deduktiv logik
  {
    id: "nack-c6",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Om en triangel är liksidig, är alla vinklar 60°.\nDenna triangel har inte alla vinklar 60°.\nVad kan vi sluta oss till?",
    options: [
      { id: "a", text: "Triangeln är liksidig" },
      { id: "b", text: "Triangeln är inte liksidig" },
      { id: "c", text: "Triangeln har inga vinklar alls" },
      { id: "d", text: "Inget kan slutas om triangeln" }
    ],
    answer_key: "b",
    explanation: "Modus tollens: Om P→Q och ¬Q, då ¬P. Liksidig→60°, men inte 60°, alltså inte liksidig."
  },
  {
    id: "nack-c7",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Tre personer: Ali, Bo och Cleo.\nEndast en av dem ljuger alltid.\nAli säger: 'Bo ljuger.'\nBo säger: 'Cleo ljuger.'\nCleo säger: 'Ali och Bo talar sanning.'\nVem ljuger?",
    options: [
      { id: "a", text: "Ali" },
      { id: "b", text: "Bo" },
      { id: "c", text: "Cleo" },
      { id: "d", text: "Det är omöjligt att avgöra" }
    ],
    answer_key: "b",
    explanation: "Om Bo ljuger: Ali talar sanning (rätt), Bos påstående att Cleo ljuger är falskt (Cleo talar sanning), Cleos bekräftelse att båda talar sanning stämmer. Konsistent – Bo ljuger."
  },
  {
    id: "nack-c8",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Alla som tränar 5 dagar/vecka är i bra form.\nIngen i bra form äter fastfood dagligen.\nMaria äter fastfood dagligen.\nVad vet vi om Maria?",
    options: [
      { id: "a", text: "Maria tränar 5 dagar/vecka" },
      { id: "b", text: "Maria är i bra form" },
      { id: "c", text: "Maria tränar inte 5 dagar/vecka" },
      { id: "d", text: "Maria gillar inte träning" }
    ],
    answer_key: "c",
    explanation: "Maria äter fastfood dagligen → Maria är inte i bra form (premiss 2 kontrapositivt) → Maria tränar inte 5 dagar/vecka (premiss 1 kontrapositivt)."
  },
  {
    id: "nack-c9",
    track_id: "nackademin_ux",
    topic: "Aptitud: Deduktiv logik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Antingen är A sant eller B sant (men inte båda).\nA är falskt.\nVad vet vi?",
    options: [
      { id: "a", text: "B är falskt" },
      { id: "b", text: "B är sant" },
      { id: "c", text: "Varken A eller B är sant" },
      { id: "d", text: "Både A och B är sanna" }
    ],
    answer_key: "b",
    explanation: "Exklusiv disjunktion (XOR): exakt ett av A/B är sant. A=falskt → B måste vara sant."
  },

  // DEL C EXTRA 2 – Verbal förmåga
  {
    id: "nack-c10",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj det ord som är närmast i betydelse till 'flegmatisk':",
    options: [
      { id: "a", text: "Upphetsad" },
      { id: "b", text: "Lugn och orörd" },
      { id: "c", text: "Arg" },
      { id: "d", text: "Kvick" }
    ],
    answer_key: "b",
    explanation: "Flegmatisk = avslappnad, sansad, svår att uppröra. En av de fyra temperamentstyper­na i klassisk psykologi."
  },
  {
    id: "nack-c11",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Taktpinne är till orkester som _____ är till kör?",
    options: [
      { id: "a", text: "Notblad" },
      { id: "b", text: "Scen" },
      { id: "c", text: "Körledare" },
      { id: "d", text: "Mikrofon" }
    ],
    answer_key: "c",
    explanation: "Taktpinnen är dirigentens redskap för att leda orkestern. Körledaren är den person som leder kören. Relation: ledarskapsinstrument/person → ensemble."
  },
  {
    id: "nack-c12",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "'Beslutet togs trots _____ om konsekvenserna.' Vilket ord ger mest logisk mening?",
    options: [
      { id: "a", text: "visshet" },
      { id: "b", text: "kunskap" },
      { id: "c", text: "ovetskap" },
      { id: "d", text: "entusiasm" }
    ],
    answer_key: "c",
    explanation: "'Trots' indikerar ett hinder eller en nackdel. 'Ovetskap' (brist på kunskap) är ett rimligt hinder – beslutet togs utan full information. 'Visshet' och 'kunskap' är fördelar."
  },
  {
    id: "nack-c13",
    track_id: "nackademin_ux",
    topic: "Aptitud: Verbal förmåga",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj det ord som INTE passar in bland de andra:",
    options: [
      { id: "a", text: "Melankolisk" },
      { id: "b", text: "Dystert" },
      { id: "c", text: "Vemodigt" },
      { id: "d", text: "Energisk" }
    ],
    answer_key: "d",
    explanation: "Melankolisk, dystert och vemodigt är alla synonymer för nedstämt/sorgset. Energisk är en positiv, aktiv term och hör inte till gruppen."
  },

  // DEL D EXTRA 2 – Svensk språkfärdighet
  {
    id: "nack-c14",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj rätt ordform:\n'Det var en ___ upplevelse.'",
    options: [
      { id: "a", text: "oförglömlig" },
      { id: "b", text: "oförgömlig" },
      { id: "c", text: "oförglömbar" },
      { id: "d", text: "oförglömbar" }
    ],
    answer_key: "a",
    explanation: "Korrekt form: oförglömlig (från 'glömma'). 'Oförgömlig' existerar inte. 'Oförglömbar' används men är ovanligare och delvis omtvistat i modern svenska."
  },
  {
    id: "nack-c15",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Välj den mening som undviker pleonasm (onödig upprepning):",
    options: [
      { id: "a", text: "Han återvände tillbaka hem igen." },
      { id: "b", text: "De samarbetade tillsammans på projektet." },
      { id: "c", text: "Hon planerade mötet noggrant i förväg." },
      { id: "d", text: "Projektet avslutades och är nu färdigt klart." }
    ],
    answer_key: "c",
    explanation: "'Planerade i förväg' är rimligt – planering sker ofta explicit i förväg. De andra har pleonasmfel: 'återvände tillbaka', 'samarbetade tillsammans', 'färdigt klart' är alla dubbleringar."
  },
  {
    id: "nack-c16",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilken mening har korrekt syftning och är tydligast formulerad?",
    options: [
      { id: "a", text: "När Emma träffade Lisa visade hon sin nya bok." },
      { id: "b", text: "Emma visade sin nya bok för Lisa när de träffades." },
      { id: "c", text: "När de träffades visade hon Lisa sin bok." },
      { id: "d", text: "Lisa och Emma träffades och hon visade boken." }
    ],
    answer_key: "b",
    explanation: "I alternativ B är det tydligt att Emma visade boken. I A, C och D är 'hon' tvetydigt – det är oklart vem som visade boken."
  },
  {
    id: "nack-c17",
    track_id: "nackademin_ux",
    topic: "Aptitud: Svensk språkfärdighet",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 1,
    prompt: "Vilket ord passar bäst i meningen för att visa orsakssamband?\n'Projektet misslyckades, _____ teamet saknade tydliga mål.'",
    options: [
      { id: "a", text: "trots att" },
      { id: "b", text: "eftersom" },
      { id: "c", text: "men" },
      { id: "d", text: "fast" }
    ],
    answer_key: "b",
    explanation: "'Eftersom' anger orsak. 'Trots att' och 'fast' anger kontrast/motgång. 'Men' är en svag kontrast utan kausalitet. Frågan efterfrågar orsakssamband."
  },

  // ═══════════════════════════════════════════════════════
  // ⚡ IT-HÖGSKOLAN – Förbättrad frågbank (iths-v2 serien)
  // Del 1: Svenska/Engelska/Matte (iths-d1-*)
  // Del 2: Dator- och nätverksteknik (iths-d2-*)
  // Baserat på verifierade mönster från utbildningens innehåll
  // ═══════════════════════════════════════════════════════

  // ── DEL 1: SVENSKA ──────────────────────────────────
  {
    id: "iths-d1-sv1",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Svenska",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Välj den mening med korrekt syftning:\nEn tekniker tog emot servern och sedan konfigurerade han den.",
    options: [
      { id: "a", text: "En tekniker tog emot servern och sedan konfigurerade han den." },
      { id: "b", text: "En tekniker tog emot servern och sedan konfigurerade den han." },
      { id: "c", text: "En tekniker han tog emot servern och konfigurerade." },
      { id: "d", text: "Servern togs emot och sedan konfigurerade tekniker han den." }
    ],
    answer_key: "a",
    explanation: "'Han' syftar tydligt på teknikern. Alternativ A är grammatiskt korrekt med tydlig ordföljd och syftning."
  },
  {
    id: "iths-d1-sv2",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Svenska",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket ord stavas rätt i en IT-kontext?",
    options: [
      { id: "a", text: "Krypterning" },
      { id: "b", text: "Kryptering" },
      { id: "c", text: "Kryptearing" },
      { id: "d", text: "Kryptring" }
    ],
    answer_key: "b",
    explanation: "Korrekt stavning: kryptering (av kryptera + -ing). Vanliga fel är att lägga in extra 'n' eller utelämna 'e'."
  },
  {
    id: "iths-d1-sv3",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Svenska",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilken mening har korrekt ordföljd med bisatsinversion?\n(Välj den grammatiskt korrekta meningen.)",
    options: [
      { id: "a", text: "Han sa att han inte förstod problemet." },
      { id: "b", text: "Han sa att inte han förstod problemet." },
      { id: "c", text: "Han sa att problemet han förstod inte." },
      { id: "d", text: "Inte han sa att förstod problemet." }
    ],
    answer_key: "a",
    explanation: "I bisatser (efter 'att') placeras negationen 'inte' FÖRE det finita verbet: 'att han inte förstod'. Detta är bisatsordföljd – till skillnad från huvudsats där 'inte' kommer efter verbet."
  },
  {
    id: "iths-d1-sv4",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Svenska",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket alternativ använder korrekt skiljetecken och stor/liten bokstav?",
    options: [
      { id: "a", text: "Systemet kraschade, Och inga loggar sparades." },
      { id: "b", text: "Systemet kraschade och inga loggar sparades." },
      { id: "c", text: "Systemet kraschade. och inga loggar sparades." },
      { id: "d", text: "systemet kraschade och Inga loggar sparades." }
    ],
    answer_key: "b",
    explanation: "Två huvudsatser kopplade med 'och' behöver inte komma före 'och' om de delar subjekt. Stor bokstav används bara efter punkt. Alternativ B är korrekt."
  },

  // ── DEL 1: ENGELSKA ─────────────────────────────────
  {
    id: "iths-d1-en1",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Engelska",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "What does 'bandwidth' mean in a networking context?",
    options: [
      { id: "a", text: "The physical width of a network cable" },
      { id: "b", text: "The maximum rate of data transfer across a network" },
      { id: "c", text: "The number of devices connected to a router" },
      { id: "d", text: "The encryption strength of a connection" }
    ],
    answer_key: "b",
    explanation: "Bandwidth = maximum data transfer rate, measured in bits per second (bps, Mbps, Gbps). Not related to physical dimensions."
  },
  {
    id: "iths-d1-en2",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Engelska",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Choose the correct sentence in a professional IT report:",
    options: [
      { id: "a", text: "The server, it was compromised last Tuesday." },
      { id: "b", text: "The server was compromised last Tuesday." },
      { id: "c", text: "Last Tuesday the server it was compromised." },
      { id: "d", text: "Was the server compromised last Tuesday it was." }
    ],
    answer_key: "b",
    explanation: "Correct English sentence structure: Subject + Verb + Time. Option A has a redundant pronoun 'it', C is garbled, D is question format mixed with statement."
  },
  {
    id: "iths-d1-en3",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Engelska",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "What does 'latency' refer to in networking?",
    options: [
      { id: "a", text: "The total storage capacity of a server" },
      { id: "b", text: "The time delay between sending and receiving data" },
      { id: "c", text: "The number of packets lost during transmission" },
      { id: "d", text: "The speed at which a CPU processes requests" }
    ],
    answer_key: "b",
    explanation: "Latency = the time delay (often measured in milliseconds) it takes for data to travel from source to destination. High latency causes lag in real-time applications."
  },
  {
    id: "iths-d1-en4",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Engelska",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Which sentence correctly uses a conditional structure for an IT scenario?",
    options: [
      { id: "a", text: "If the firewall would have been updated, the breach had been prevented." },
      { id: "b", text: "If the firewall had been updated, the breach would have been prevented." },
      { id: "c", text: "If the firewall was updated, the breach would been prevented." },
      { id: "d", text: "Had the firewall would be updated, the breach was prevented." }
    ],
    answer_key: "b",
    explanation: "Third conditional (past unreal): 'If + had + past participle, would have + past participle'. Option B is the only grammatically correct form."
  },

  // ── DEL 1: MATEMATIK ────────────────────────────────
  {
    id: "iths-d1-ma1",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "En server har 512 GB lagring. 30 % är använt. Hur många GB är ledigt?",
    options: [
      { id: "a", text: "153,6 GB" },
      { id: "b", text: "358,4 GB" },
      { id: "c", text: "182 GB" },
      { id: "d", text: "204,8 GB" }
    ],
    answer_key: "b",
    explanation: "30 % av 512 = 153,6 GB använt. Ledigt = 512 − 153,6 = 358,4 GB."
  },
  {
    id: "iths-d1-ma2",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Omvandla binärtalet 10110 till decimaltal.",
    options: [
      { id: "a", text: "20" },
      { id: "b", text: "22" },
      { id: "c", text: "24" },
      { id: "d", text: "26" }
    ],
    answer_key: "b",
    explanation: "10110 binärt: 1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 16+4+2 = 22."
  },
  {
    id: "iths-d1-ma3",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Hur många IP-adresser ryms i ett /26-nät?",
    options: [
      { id: "a", text: "32" },
      { id: "b", text: "64" },
      { id: "c", text: "128" },
      { id: "d", text: "256" }
    ],
    answer_key: "b",
    explanation: "/26 innebär 32-26=6 hostbitar. 2⁶ = 64 totala adresser (62 användbara värdar + nätverks- och broadcastadress)."
  },
  {
    id: "iths-d1-ma4",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Ett nätverk har adressen 192.168.10.0/25.\nVilket är det högsta användbara värdadressen i detta nät?",
    options: [
      { id: "a", text: "192.168.10.127" },
      { id: "b", text: "192.168.10.126" },
      { id: "c", text: "192.168.10.128" },
      { id: "d", text: "192.168.10.255" }
    ],
    answer_key: "b",
    explanation: "/25 = 128 adresser (0–127). Nätverksadress: .0. Broadcastadress: .127. Högsta värdhosta: .126."
  },

  // ── DEL 1: MATEMATIK – utökad pool (iths-d1-ma5 till iths-d1-ma16) ──
  {
    id: "iths-d1-ma5",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är 2⁸ (2 upphöjt till 8)?",
    options: [
      { id: "a", text: "64" },
      { id: "b", text: "128" },
      { id: "c", text: "256" },
      { id: "d", text: "512" }
    ],
    answer_key: "c",
    explanation: "2⁸ = 2×2×2×2×2×2×2×2 = 256. Potenser av 2 är grundläggande i IT: 2⁸=256 adresser per oktet i IPv4, 2¹⁰=1024 (ett kibibyte), 2¹⁶=65536 (portnummerspann)."
  },
  {
    id: "iths-d1-ma6",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "En kurs kostar 4 500 kr. Du får 20% rabatt. Vad kostar kursen efter rabatten?",
    options: [
      { id: "a", text: "3 500 kr" },
      { id: "b", text: "3 600 kr" },
      { id: "c", text: "4 000 kr" },
      { id: "d", text: "900 kr" }
    ],
    answer_key: "b",
    explanation: "20% av 4 500 = 0,20 × 4 500 = 900 kr i rabatt. 4 500 – 900 = 3 600 kr. Alternativt: 4 500 × 0,80 = 3 600 kr (multiplicera med (1 – rabatt))."
  },
  {
    id: "iths-d1-ma7",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är det hexadecimala talet FF i decimal?",
    options: [
      { id: "a", text: "128" },
      { id: "b", text: "240" },
      { id: "c", text: "255" },
      { id: "d", text: "256" }
    ],
    answer_key: "c",
    explanation: "Hex FF: F=15 i decimal. FF = 15×16 + 15×1 = 240 + 15 = 255. I hexadecimalt är A=10, B=11, C=12, D=13, E=14, F=15. FF är max för ett byte (8 bitar)."
  },
  {
    id: "iths-d1-ma8",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Omvandla det binära talet 1010 till decimal.",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "10" },
      { id: "c", text: "12" },
      { id: "d", text: "14" }
    ],
    answer_key: "b",
    explanation: "1010 i binärt: 1×8 + 0×4 + 1×2 + 0×1 = 8+0+2+0 = 10. Binärt läser man höger till vänster med potenser av 2: position 0=1, 1=2, 2=4, 3=8 osv."
  },
  {
    id: "iths-d1-ma9",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "En server har 32 GB RAM. Hur många megabyte (MB) är det?\n(1 GB = 1 024 MB)",
    options: [
      { id: "a", text: "3 200 MB" },
      { id: "b", text: "32 000 MB" },
      { id: "c", text: "32 768 MB" },
      { id: "d", text: "65 536 MB" }
    ],
    answer_key: "c",
    explanation: "32 GB × 1 024 MB/GB = 32 768 MB. Observera att 1 GiB = 1 024 MiB (binärt), men tillverkare marknadsför ofta 1 GB = 1 000 MB. I IT-sammanhang (OS, nätverk) används nästan alltid binär räkning: 2¹⁰ = 1 024."
  },
  {
    id: "iths-d1-ma10",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Omvandla decimalvärdet 200 till binärt.",
    options: [
      { id: "a", text: "11000100" },
      { id: "b", text: "11001000" },
      { id: "c", text: "10101010" },
      { id: "d", text: "11110000" }
    ],
    answer_key: "b",
    explanation: "200 i binärt: 200 = 128+64+8 = 2⁷+2⁶+2³ = 11001000. Steg: 200÷2=100r0, 100÷2=50r0, 50÷2=25r0, 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1. Läs resterna baklänges: 11001000."
  },
  {
    id: "iths-d1-ma11",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Ett /28-nät har hur många användbara hostar?",
    options: [
      { id: "a", text: "14" },
      { id: "b", text: "16" },
      { id: "c", text: "28" },
      { id: "d", text: "30" }
    ],
    answer_key: "a",
    explanation: "/28 innebär 4 bitar för hostar (32-28=4). 2⁴ = 16 adresser totalt. Minus nätverksadress och broadcast = 14 användbara hostar. Formeln: 2ⁿ – 2 där n = antal hostbitar."
  },
  {
    id: "iths-d1-ma12",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Lökklockan visar 14:45. Hur många minuter är det till 16:00?",
    options: [
      { id: "a", text: "65 minuter" },
      { id: "b", text: "75 minuter" },
      { id: "c", text: "85 minuter" },
      { id: "d", text: "95 minuter" }
    ],
    answer_key: "b",
    explanation: "Från 14:45 till 15:00 = 15 minuter. Från 15:00 till 16:00 = 60 minuter. Totalt: 15 + 60 = 75 minuter. Tidsräkning ingår i antagningsprovets matematikdel."
  },
  {
    id: "iths-d1-ma13",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket är medelvärdet av talen: 12, 18, 24, 6, 30?",
    options: [
      { id: "a", text: "16" },
      { id: "b", text: "18" },
      { id: "c", text: "20" },
      { id: "d", text: "24" }
    ],
    answer_key: "b",
    explanation: "Medelvärde = summan ÷ antal tal. 12+18+24+6+30 = 90. 90 ÷ 5 = 18. Medelvärde (genomsnitt) är en av de vanligaste statistiska beräkningarna."
  },
  {
    id: "iths-d1-ma14",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Priset på en hårddisk höjs med 15% och kostar sedan 575 kr. Vad kostade den före höjningen?",
    options: [
      { id: "a", text: "460 kr" },
      { id: "b", text: "488 kr" },
      { id: "c", text: "500 kr" },
      { id: "d", text: "520 kr" }
    ],
    answer_key: "c",
    explanation: "Om priset är 115% av ursprungspriset: ursprungspris = 575 ÷ 1,15 = 500 kr. Vid procent-baklängesberäkning: dela med (1 + höjningsprocenten som decimal)."
  },
  {
    id: "iths-d1-ma15",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Hur många /30-nät kan man dela upp ett /27-nät i?",
    options: [
      { id: "a", text: "4" },
      { id: "b", text: "6" },
      { id: "c", text: "8" },
      { id: "d", text: "16" }
    ],
    answer_key: "c",
    explanation: "/27 = 32 adresser (2⁵). /30 = 4 adresser vardera (2²). 32 ÷ 4 = 8 stycken /30-nät. Subnetting handlar om att dela upp adressutrymmet i jämna block av 2."
  },
  {
    id: "iths-d1-ma16",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 1: Matematik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "En switch har 24 portar och är 70% belagd. Hur många portar är lediga?",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "6" },
      { id: "c", text: "7" },
      { id: "d", text: "8" }
    ],
    answer_key: "c",
    explanation: "70% belagd = 0,70 × 24 = 16,8 → avrundat 17 portar används. Lediga: 24 – 17 = 7. (Alternativt: 30% ledigt = 0,30 × 24 = 7,2 → 7 lediga.) Kapacitetsplanering är en vanlig uppgiftstyp i antagningsprov."
  },

  // ── DEL 2: DATOR- OCH NÄTVERKSTEKNIK ────────────────
  {
    id: "iths-d2-1",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket protokoll används för att automatiskt tilldela IP-adresser till enheter i ett nätverk?",
    options: [
      { id: "a", text: "DNS" },
      { id: "b", text: "DHCP" },
      { id: "c", text: "FTP" },
      { id: "d", text: "SMTP" }
    ],
    answer_key: "b",
    explanation: "DHCP (Dynamic Host Configuration Protocol) delar automatiskt ut IP-adresser, nätmask, gateway och DNS till klienter i ett nätverk."
  },
  {
    id: "iths-d2-2",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket OSI-lager ansvarar för end-to-end-kommunikation och felkontroll mellan applikationer?",
    options: [
      { id: "a", text: "Lager 2 – Datalänk" },
      { id: "b", text: "Lager 3 – Nätverk" },
      { id: "c", text: "Lager 4 – Transport" },
      { id: "d", text: "Lager 7 – Applikation" }
    ],
    answer_key: "c",
    explanation: "Transportlagret (lager 4) hanterar end-to-end-kommunikation. TCP på detta lager ger felkontroll, flödeskontroll och garanterad leverans."
  },
  {
    id: "iths-d2-3",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan ett hubben och en switch i ett lokalt nätverk?",
    options: [
      { id: "a", text: "En hubb skickar data till alla portar; en switch skickar bara till rätt mottagare" },
      { id: "b", text: "En switch är trådlös; en hubb är kabelbunden" },
      { id: "c", text: "En hubb routar trafik; en switch fungerar som brandvägg" },
      { id: "d", text: "Det finns ingen skillnad, de används synonymt" }
    ],
    answer_key: "a",
    explanation: "En hubb sänder all trafik till alla portar (broadcast). En switch läser MAC-adressen och levererar paketet bara till rätt port – mer effektivt och säkert."
  },
  {
    id: "iths-d2-4",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilken typ av attack försöker överbelasta en server med trafik så att den slutar svara?",
    options: [
      { id: "a", text: "Phishing" },
      { id: "b", text: "Man-in-the-middle" },
      { id: "c", text: "DoS/DDoS" },
      { id: "d", text: "SQL-injektion" }
    ],
    answer_key: "c",
    explanation: "DoS (Denial of Service) och DDoS (Distributed DoS) syftar till att göra en tjänst otillgänglig genom att översvämma den med förfrågningar. DDoS använder många datorer (botnät) simultant."
  },
  {
    id: "iths-d2-5",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad innebär 'kryptering med publik nyckel' (asymmetrisk kryptering)?",
    options: [
      { id: "a", text: "Samma nyckel används för att kryptera och dekryptera" },
      { id: "b", text: "En publik nyckel krypterar, en privat nyckel dekrypterar" },
      { id: "c", text: "Ingen nyckel behövs – krypteringen är automatisk" },
      { id: "d", text: "Den privata nyckeln krypterar och den publika dekrypterar alltid" }
    ],
    answer_key: "b",
    explanation: "Asymmetrisk kryptering använder nyckelpar: publik nyckel (dela fritt) för kryptering och privat nyckel (hemlig) för dekryptering. Används i t.ex. HTTPS och e-postsignering."
  },
  {
    id: "iths-d2-6",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket protokoll används för säker webbkommunikation (HTTPS)?",
    options: [
      { id: "a", text: "FTP" },
      { id: "b", text: "SSH" },
      { id: "c", text: "TLS/SSL" },
      { id: "d", text: "SMTP" }
    ],
    answer_key: "c",
    explanation: "HTTPS = HTTP + TLS (Transport Layer Security). TLS/SSL krypterar kommunikationen mellan webbläsare och server och verifierar serverns identitet via certifikat."
  },
  {
    id: "iths-d2-7",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "En angripare placerar sig mellan klient och server och läser/ändrar trafiken utan att parterna märker det. Vad kallas detta?",
    options: [
      { id: "a", text: "Brute force" },
      { id: "b", text: "Man-in-the-middle (MITM)" },
      { id: "c", text: "Cross-site scripting (XSS)" },
      { id: "d", text: "ARP-spoofing (variant av samma)" }
    ],
    answer_key: "b",
    explanation: "MITM-attack: angriparen avlyssnar och kan manipulera kommunikationen. ARP-spoofing är en vanlig teknik för att genomföra MITM på lokalt nätverk, men attacktypen i frågan är MITM."
  },
  {
    id: "iths-d2-8",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vad är syftet med en DMZ (demilitariserad zon) i ett nätverks­arkitektur?",
    options: [
      { id: "a", text: "Att kryptera all intern trafik" },
      { id: "b", text: "Att isolera publika servrar från det interna nätverket" },
      { id: "c", text: "Att ersätta brandväggen i moderna nätverk" },
      { id: "d", text: "Att tilldela IP-adresser automatiskt" }
    ],
    answer_key: "b",
    explanation: "En DMZ är ett delnätverk som håller publikt exponerade servrar (webb, mail) separerade från det interna nätverket. Om en publik server komprometteras kan angriparen inte nå interna system direkt."
  },
  {
    id: "iths-d2-9",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vilket påstående om IPv6 jämfört med IPv4 är korrekt?",
    options: [
      { id: "a", text: "IPv6 har färre tillgängliga adresser än IPv4" },
      { id: "b", text: "IPv6-adresser är 128 bitar långa mot IPv4:s 32 bitar" },
      { id: "c", text: "IPv6 kräver NAT för att fungera på internet" },
      { id: "d", text: "IPv6 är inkompatibelt med TCP" }
    ],
    answer_key: "b",
    explanation: "IPv6 använder 128-bitarsadresser (≈3,4 × 10³⁸ möjliga adresser) mot IPv4:s 32 bitar (ca 4,3 miljarder). IPv6 eliminerar behovet av NAT och har inbyggt stöd för IPsec."
  },
  {
    id: "iths-d2-10",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vilket lager i OSI-modellen hanterar logisk adressering (IP) och routing av paket mellan nätverk?",
    options: [
      { id: "a", text: "Lager 1 – Fysiskt" },
      { id: "b", text: "Lager 2 – Datalänk" },
      { id: "c", text: "Lager 3 – Nätverk" },
      { id: "d", text: "Lager 5 – Session" }
    ],
    answer_key: "c",
    explanation: "Nätverkslagret (lager 3) hanterar IP-adressering och routing – det bestämmer den bästa vägen för ett paket mellan olika nätverk. Routrar arbetar på detta lager."
  },

  // ── DEL 2: NÄTVERKSTEKNIK – utökad pool (iths-d2-11 till iths-d2-35) ──

  {
    id: "iths-d2-11",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är den viktigaste skillnaden mellan TCP och UDP?",
    options: [
      { id: "a", text: "TCP är snabbare än UDP" },
      { id: "b", text: "TCP garanterar leverans och ordning, UDP gör det inte" },
      { id: "c", text: "UDP används bara för webbsidor" },
      { id: "d", text: "TCP används bara för video-streaming" }
    ],
    answer_key: "b",
    explanation: "TCP (Transmission Control Protocol) är ett tillförlitligt protokoll som bekräftar leverans och ser till att paket kommer i rätt ordning. UDP (User Datagram Protocol) skickar utan bekräftelse – snabbare men utan garanti. UDP används exempelvis för video-streaming och DNS-förfrågningar."
  },
  {
    id: "iths-d2-12",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "På vilket OSI-lager arbetar en MAC-adress?",
    options: [
      { id: "a", text: "Lager 1 – Fysiskt" },
      { id: "b", text: "Lager 2 – Datalänk" },
      { id: "c", text: "Lager 3 – Nätverk" },
      { id: "d", text: "Lager 4 – Transport" }
    ],
    answer_key: "b",
    explanation: "MAC-adresser (Media Access Control) används på datalänklagret (lager 2) för att identifiera enheter inom ett lokalt nätverk (LAN). En switch använder MAC-adresser för att vidarebefordra ramar till rätt port."
  },
  {
    id: "iths-d2-13",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad gör ARP-protokollet (Address Resolution Protocol)?",
    options: [
      { id: "a", text: "Tilldelar IP-adresser till enheter automatiskt" },
      { id: "b", text: "Översätter domännamn till IP-adresser" },
      { id: "c", text: "Översätter IP-adresser till MAC-adresser" },
      { id: "d", text: "Krypterar nätverkstrafik" }
    ],
    answer_key: "c",
    explanation: "ARP översätter en känd IP-adress till motsvarande MAC-adress på det lokala nätverket. Enheten skickar en broadcast ('Vem har IP x.x.x.x?') och den som har den IP:n svarar med sin MAC-adress."
  },
  {
    id: "iths-d2-14",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är DNS primära uppgift?",
    options: [
      { id: "a", text: "Kryptera webbtrafik" },
      { id: "b", text: "Tilldela IP-adresser dynamiskt" },
      { id: "c", text: "Översätta domännamn (t.ex. google.com) till IP-adresser" },
      { id: "d", text: "Blockera obehörig trafik" }
    ],
    answer_key: "c",
    explanation: "DNS (Domain Name System) fungerar som internets 'telefonbok'. Det omvandlar läsbara domännamn (som www.iths.se) till numeriska IP-adresser som datorer förstår (som 93.188.2.4)."
  },
  {
    id: "iths-d2-15",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket portnummer används standardmässigt av HTTPS?",
    options: [
      { id: "a", text: "21" },
      { id: "b", text: "80" },
      { id: "c", text: "443" },
      { id: "d", text: "3389" }
    ],
    answer_key: "c",
    explanation: "HTTPS (HTTP Secure) använder port 443. HTTP använder port 80. Port 21 är FTP och port 3389 är RDP (Remote Desktop Protocol). Portnummer är som 'dörrar' – olika tjänster lyssnar på olika portar."
  },
  {
    id: "iths-d2-16",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilken port använder SSH (Secure Shell) som standard?",
    options: [
      { id: "a", text: "22" },
      { id: "b", text: "23" },
      { id: "c", text: "25" },
      { id: "d", text: "53" }
    ],
    answer_key: "a",
    explanation: "SSH använder port 22. Port 23 är Telnet (osäker föregångare till SSH), port 25 är SMTP (e-post) och port 53 är DNS. SSH krypterar all kommunikation och används för säker fjärrinloggning på servrar."
  },
  {
    id: "iths-d2-17",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är en brandväggs (firewall) primära funktion?",
    options: [
      { id: "a", text: "Öka internethastigheten" },
      { id: "b", text: "Filtrera nätverkstrafik baserat på regler" },
      { id: "c", text: "Tilldela IP-adresser till enheter" },
      { id: "d", text: "Kryptera hårddisken" }
    ],
    answer_key: "b",
    explanation: "En brandvägg kontrollerar inkommande och utgående nätverkstrafik enligt förutbestämda regler. Den kan blockera trafik från specifika IP-adresser, portar eller protokoll. Det är nätverkets 'grindvakt'."
  },
  {
    id: "iths-d2-18",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är den viktigaste säkerhetsfördelen med ett VPN?",
    options: [
      { id: "a", text: "Det gör internetet snabbare" },
      { id: "b", text: "Det krypterar trafiken och döljer din IP-adress" },
      { id: "c", text: "Det blockerar alla virus automatiskt" },
      { id: "d", text: "Det ger dig administratörsrättigheter på distans" }
    ],
    answer_key: "b",
    explanation: "VPN (Virtual Private Network) skapar en krypterad tunnel för din nätverkstrafik och maskerar din faktiska IP-adress. Det skyddar kommunikation på osäkra nätverk (t.ex. offentliga WiFi) och används också för fjärråtkomst till företagsnätverk."
  },
  {
    id: "iths-d2-19",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är syftet med ett VLAN (Virtual LAN)?",
    options: [
      { id: "a", text: "Att öka WiFi-räckvidden" },
      { id: "b", text: "Att logiskt segmentera ett nätverk oberoende av fysisk placering" },
      { id: "c", text: "Att kryptera all nätverkstrafik" },
      { id: "d", text: "Att tilldela dynamiska IP-adresser" }
    ],
    answer_key: "b",
    explanation: "VLAN delar upp ett fysiskt nätverk i flera logiska nätverk. Enheter i olika VLAN kan inte kommunicera direkt med varandra utan att gå via en router. Det förbättrar säkerhet, minskar broadcast-trafik och möjliggör flexibel nätverksdesign."
  },
  {
    id: "iths-d2-20",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad gör NAT (Network Address Translation)?",
    options: [
      { id: "a", text: "Krypterar data som skickas över internet" },
      { id: "b", text: "Översätter privata IP-adresser till en publik IP-adress (och vice versa)" },
      { id: "c", text: "Tilldelar domännamn till IP-adresser" },
      { id: "d", text: "Dirigerar paket baserat på MAC-adresser" }
    ],
    answer_key: "b",
    explanation: "NAT gör att många enheter på ett lokalt nätverk (med privata IP-adresser som 192.168.x.x) kan dela en enda publik IP-adress mot internet. Det sparar IPv4-adresser och lägger till ett lager av anonymitet."
  },
  {
    id: "iths-d2-21",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vilket protokoll används av kommandot 'ping'?",
    options: [
      { id: "a", text: "TCP" },
      { id: "b", text: "UDP" },
      { id: "c", text: "ICMP" },
      { id: "d", text: "HTTP" }
    ],
    answer_key: "c",
    explanation: "Ping använder ICMP (Internet Control Message Protocol) – specifikt 'Echo Request' och 'Echo Reply'. ICMP är ett protokoll för diagnos och felhantering i IP-nätverk, inte för datatransport. Det används för att testa om en enhet är nåbar och mäta svarstid."
  },
  {
    id: "iths-d2-22",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är den huvudsakliga förbättringen i WPA3 jämfört med WPA2?",
    options: [
      { id: "a", text: "Snabbare WiFi-hastighet" },
      { id: "b", text: "Stöd för fler enheter" },
      { id: "c", text: "Skydd mot brute-force-attacker och bättre kryptering (SAE)" },
      { id: "d", text: "Längre räckvidd" }
    ],
    answer_key: "c",
    explanation: "WPA3 introducerade SAE (Simultaneous Authentication of Equals) som ersätter WPA2:s PSK-handskakning. Det skyddar mot offline brute-force-attacker och ger 'forward secrecy' – gamla sessioner kan inte dekrypteras även om lösenordet läcker."
  },
  {
    id: "iths-d2-23",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är phishing?",
    options: [
      { id: "a", text: "En teknik för att överlasta en server med trafik" },
      { id: "b", text: "Ett sätt att knäcka krypteringsnycklar matematiskt" },
      { id: "c", text: "Bedrägliga meddelanden som lurar användare att lämna ut känslig information" },
      { id: "d", text: "En metod för att avlyssna nätverkstrafik" }
    ],
    answer_key: "c",
    explanation: "Phishing är social engineering via e-post, SMS eller falska webbsidor. Angriparen utger sig för att vara en betrodd avsändare (bank, IT-support, chef) för att lura offret att klicka på skadliga länkar eller lämna ut lösenord och kontoinformation."
  },
  {
    id: "iths-d2-24",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad gör ransomware när det infekterar ett system?",
    options: [
      { id: "a", text: "Stänger av internet-anslutningen" },
      { id: "b", text: "Krypterar offrets filer och kräver betalning för dekrypteringsnyckeln" },
      { id: "c", text: "Skickar spam-mail från offrets konto" },
      { id: "d", text: "Spionerar på tangentbordsinmatning" }
    ],
    answer_key: "b",
    explanation: "Ransomware krypterar viktiga filer eller låser hela systemet och kräver sedan en lösensumma (ofta i kryptovaluta) för att återställa åtkomsten. Regelbundna offline-backuper är det bästa skyddet – då kan man återställa utan att betala."
  },
  {
    id: "iths-d2-25",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad utmärker en hashfunktion (t.ex. SHA-256)?",
    options: [
      { id: "a", text: "Den är reversibel – man kan alltid återskapa originaldata" },
      { id: "b", text: "Den producerar en fixt stor output oavsett input-storlek, och är envägs" },
      { id: "c", text: "Den kräver en hemlig nyckel för att fungera" },
      { id: "d", text: "Den komprimerar data för att spara utrymme" }
    ],
    answer_key: "b",
    explanation: "En hashfunktion tar indata av godtycklig storlek och producerar alltid en fast lång output (t.ex. 256 bitar för SHA-256). Det är en envägsfunktion – man kan inte räkna baklänges. Används för att lagra lösenord, verifiera filintegritet och i digitala signaturer."
  },
  {
    id: "iths-d2-26",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är en CA (Certificate Authority) roll i ett PKI-system?",
    options: [
      { id: "a", text: "Att kryptera all webbtrafik direkt" },
      { id: "b", text: "Att utfärda och signera digitala certifikat som styrker identiteter" },
      { id: "c", text: "Att tilldela IP-adresser till domäner" },
      { id: "d", text: "Att blockera skadlig trafik i realtid" }
    ],
    answer_key: "b",
    explanation: "En Certificate Authority är en betrodd tredje part som utfärdar digitala certifikat. Ett certifikat binder en publik nyckel till en identitet (t.ex. en domän). Din webbläsare litar på HTTPS-siter för att CA:n har signerat deras certifikat."
  },
  {
    id: "iths-d2-27",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är en default gateway?",
    options: [
      { id: "a", text: "Den snabbaste DNS-servern på nätverket" },
      { id: "b", text: "Enheten (oftast en router) som trafik skickas till när destinationen är utanför det lokala nätverket" },
      { id: "c", text: "Den primära DNS-servern som tilldelas av DHCP" },
      { id: "d", text: "En säkerhetsenhet som blockerar oönskad trafik" }
    ],
    answer_key: "b",
    explanation: "Default gateway är 'utgångsporten' ur det lokala nätverket. Om din dator vill kommunicera med en IP som inte finns i det lokala subnätet skickas paketet till default gateway (routern), som sedan vidarebefordrar det rätt."
  },
  {
    id: "iths-d2-28",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad anger en nätmask (subnet mask) på /24 (255.255.255.0)?",
    options: [
      { id: "a", text: "Att nätverket har plats för max 24 enheter" },
      { id: "b", text: "Att de tre första oktetterna identifierar nätverket, den sista identifierar hostar" },
      { id: "c", text: "Att 24 routrar är anslutna" },
      { id: "d", text: "Att nätverket använder IPv6" }
    ],
    answer_key: "b",
    explanation: "/24 innebär att 24 bitar används för nätverksdelen och 8 bitar för hostar (256 adresser, varav 254 användbara). Exempelvis är 192.168.1.x ett typiskt /24-nätverk där 192.168.1 är nätverksdelen och de sista siffrorna identifierar enskilda enheter."
  },
  {
    id: "iths-d2-29",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan HTTP och HTTPS?",
    options: [
      { id: "a", text: "HTTPS är snabbare än HTTP" },
      { id: "b", text: "HTTPS krypterar kommunikationen med TLS, HTTP skickar i klartext" },
      { id: "c", text: "HTTP stöder bara text, HTTPS stöder bilder också" },
      { id: "d", text: "HTTPS kräver en inloggning" }
    ],
    answer_key: "b",
    explanation: "HTTPS (HTTP Secure) lägger till TLS-kryptering ovanpå HTTP. Det innebär att kommunikationen mellan webbläsaren och servern är krypterad och skyddad mot avlyssning. HTTP skickar allt i klartext – lösenord, kakor och data kan ses av vem som helst som avlyssnar trafiken."
  },
  {
    id: "iths-d2-30",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan IDS och IPS?",
    options: [
      { id: "a", text: "IDS blockerar attacker, IPS rapporterar dem" },
      { id: "b", text: "IDS upptäcker och rapporterar, IPS kan även aktivt blockera attacker" },
      { id: "c", text: "De är identiska system med olika namn" },
      { id: "d", text: "IPS används bara för trådlösa nätverk" }
    ],
    answer_key: "b",
    explanation: "IDS (Intrusion Detection System) övervakar och larmar vid misstänkt aktivitet – men agerar inte. IPS (Intrusion Prevention System) kan dessutom aktivt blockera skadlig trafik i realtid. IPS är mer aggressivt men riskerar fler falska positiva."
  },
  {
    id: "iths-d2-31",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vad är en zero-day-sårbarhet?",
    options: [
      { id: "a", text: "En bugg som har funnits i ett system i exakt ett dygn" },
      { id: "b", text: "En okänd sårbarhet som utnyttjas innan tillverkaren vet om den och har hunnit patcha" },
      { id: "c", text: "En attack som startar exakt vid midnatt" },
      { id: "d", text: "En sårbarhet som kräver fysisk åtkomst till datorn" }
    ],
    answer_key: "b",
    explanation: "Zero-day refererar till att tillverkaren har haft noll dagar på sig att åtgärda problemet. Angriparen känner till och utnyttjar sårbarheten innan en säkerhetsuppdatering finns. Zero-days är extremt värdefulla för angripare och mycket svåra att försvara sig mot."
  },
  {
    id: "iths-d2-32",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad är en SQL-injection-attack?",
    options: [
      { id: "a", text: "En attack som injicerar virus i SQL Server-programvaran" },
      { id: "b", text: "En attack där skadlig SQL-kod infogas i ett inmatningsfält för att manipulera databasen" },
      { id: "c", text: "En överbelastningsattack mot databasservrar" },
      { id: "d", text: "En metod för att avlyssna databasanslutningar" }
    ],
    answer_key: "b",
    explanation: "SQL injection utnyttjar inmatningsfält (t.ex. sökrutor eller inloggningsformulär) som inte validerar input. Angriparen skriver SQL-kommandon i fältet, och om appen är sårbar körs dessa mot databasen – vilket kan avslöja all data, kringgå inloggning eller radera tabeller."
  },
  {
    id: "iths-d2-33",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Community",
    estimated_minutes: 2,
    prompt: "Vad gör tvåfaktorsautentisering (2FA) säkrare än enbart lösenord?",
    options: [
      { id: "a", text: "Lösenordet krypteras dubbelt" },
      { id: "b", text: "Inloggningen kräver något du vet (lösenord) OCH något du har/är (t.ex. en kod eller fingeravtryck)" },
      { id: "c", text: "Inloggningen tar dubbelt så lång tid" },
      { id: "d", text: "Lösenordet byts automatiskt var 30:e sekund" }
    ],
    answer_key: "b",
    explanation: "2FA kräver två separata faktorer: typiskt 'något du vet' (lösenord) och 'något du har' (t.ex. en engångskod via SMS eller en authenticator-app) eller 'något du är' (biometri). Även om lösenordet läcker kan angriparen inte logga in utan den andra faktorn."
  },
  {
    id: "iths-d2-34",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "En organisation vill separera sin publika webbserver från det interna nätverket men ändå tillåta internetåtkomst till servern. Vilket nätverkskoncept bör de använda?",
    options: [
      { id: "a", text: "VLAN inom det interna nätverket" },
      { id: "b", text: "DMZ (Demilitariserad zon) med brandväggsregler som begränsar åtkomst till interna system" },
      { id: "c", text: "VPN-tunnel direkt till webbservern" },
      { id: "d", text: "NAT-konfiguration utan brandvägg" }
    ],
    answer_key: "b",
    explanation: "DMZ placerar publikt tillgängliga servrar i en separat nätverkszon. Brandväggen tillåter internettrafik till DMZ men blockerar DMZ-trafik till det interna nätverket. Även om webbservern komprometteras kan angriparen inte direkt nå interna system."
  },
  {
    id: "iths-d2-35",
    track_id: "iths_itsec",
    topic: "⚡ IT-H Del 2: Nätverksteknik",
    format: "mcq",
    difficulty: "Svår",
    source_tier: "Community",
    estimated_minutes: 3,
    prompt: "Vilket påstående om symmetrisk kryptering är korrekt?",
    options: [
      { id: "a", text: "Den använder en publik och en privat nyckel" },
      { id: "b", text: "Den är långsammare än asymmetrisk kryptering men säkrare" },
      { id: "c", text: "Samma nyckel används för både kryptering och dekryptering" },
      { id: "d", text: "Den kan inte användas för att kryptera stora datamängder" }
    ],
    answer_key: "c",
    explanation: "Symmetrisk kryptering (t.ex. AES) använder samma nyckel för att kryptera och dekryptera. Det är mycket snabbt och lämpat för stora datamängder – men utmaningen är att säkert dela nyckeln. Asymmetrisk kryptering löser nyckeldelningsproblemet men är långsammare, varför TLS kombinerar båda."
  },

  // ─────────────────────────────────────────────────
  // ⚡ Python-modul v2: Klasser, Fel, Import & Filer
  // py-v2-1 → py-v2-24
  // ─────────────────────────────────────────────────

  // ── Klasser och objekt (py-v2-1 → py-v2-5) ──

  {
    id: "py-v2-1",
    track_id: "prog1a",
    topic: "⚡ Klasser och objekt",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad definierar ett `class`-statement i Python?",
    options: [
      { id: "a", text: "En variabel som lagrar ett nummer" },
      { id: "b", text: "En mall (blueprint) för att skapa objekt" },
      { id: "c", text: "En funktion som körs automatiskt" },
      { id: "d", text: "En loop som repeterar kod" }
    ],
    answer_key: "b",
    explanation: "Ett [[class]] definierar en mall – en blueprint – för hur [[object]]s ska se ut och bete sig. Klassen i sig gör ingenting förrän du skapar en [[instance]] av den."
  },
  {
    id: "py-v2-2",
    track_id: "prog1a",
    topic: "⚡ Klasser och objekt",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad är syftet med `__init__`-metoden i en Python-klass?",
    options: [
      { id: "a", text: "Den skriver ut objektet till konsolen" },
      { id: "b", text: "Den anropas automatiskt när ett nytt objekt skapas och sätter upp dess attribut" },
      { id: "c", text: "Den importerar externa bibliotek" },
      { id: "d", text: "Den avslutar programmet" }
    ],
    answer_key: "b",
    explanation: "[[init]] (konstruktorn) körs automatiskt när du skapar ett nytt [[object]]. Det är här du sätter upp [[attribute]]s med startvärden. Exempel: `user1 = User('Anna')` anropar `__init__` med namnet 'Anna'.",
    strong_answer_example: "__init__ kallas när objektet skapas och sätter dess starttillstånd via self.attribute = value."
  },
  {
    id: "py-v2-3",
    track_id: "prog1a",
    topic: "⚡ Klasser och objekt",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad refererar `self` till i en klassmetod?",
    options: [
      { id: "a", text: "Hela programmet" },
      { id: "b", text: "Det specifika objekt som metoden anropas på" },
      { id: "c", text: "Klassens namn" },
      { id: "d", text: "Den senast importerade modulen" }
    ],
    answer_key: "b",
    explanation: "[[self]] är en referens till det specifika [[object]] ([[instance]]) som [[method]]en anropas på. Om du har `user1.greet()` och `user2.greet()` refererar `self` till `user1` respektive `user2` – de delar kod men håller sin egen data via [[attribute]]s.",
    common_mistakes: "Många tror att self är ett reserverat ord – det är bara en namnkonvention. Du kan kalla det vad du vill, men self är standard."
  },
  {
    id: "py-v2-4",
    track_id: "prog1a",
    topic: "⚡ Klasser och objekt",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Hur läser du attributet `name` från ett objekt `user1`?",
    options: [
      { id: "a", text: "name(user1)" },
      { id: "b", text: "user1->name" },
      { id: "c", text: "user1.name" },
      { id: "d", text: "get(user1, name)" }
    ],
    answer_key: "c",
    explanation: "Punktnotation (`user1.name`) används för att komma åt [[attribute]]s och anropa [[method]]s på ett [[object]]. Det är syntaxen Python använder för att navigera in i ett objekts data.",
    common_mistakes: "Pilen -> används i C/C++, inte Python. Parenteser används för funktionsanrop, inte attributläsning."
  },
  {
    id: "py-v2-5",
    track_id: "prog1a",
    topic: "⚡ Klasser och objekt",
    format: "short",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 4,
    prompt: "Skriv en enkel Python-klass `Dog` med ett [[attribute]] `name` (satt i [[init]]) och en [[method]] `bark()` som returnerar strängen `'Woof!'`. Visa sedan hur du skapar ett [[object]] och anropar metoden.",
    answer_key: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return 'Woof!'\n\ndog1 = Dog('Rex')\nprint(dog1.bark())",
    explanation: "En [[class]] samlar [[attribute]]s (data, t.ex. name) och [[method]]s (beteende, t.ex. bark) i ett paket. [[self]] knyter ihop metoden med det specifika [[object]]et. [[init]] sätter startvärden när [[object]]et skapas.",
    scoring_criteria: [
      "class med korrekt syntax",
      "__init__(self, name) med self.name = name",
      "bark(self) som returnerar 'Woof!'",
      "Skapar ett objekt med Dog('namn')",
      "Anropar bark() med punktnotation"
    ],
    common_mistakes: "Glömma self som första parameter i metoderna, eller använda return istället för print (båda kan vara rätt beroende på frågan)."
  },

  // ── try/except och felhantering (py-v2-6 → py-v2-10) ──

  {
    id: "py-v2-6",
    track_id: "prog1a",
    topic: "⚡ Felhantering: try/except",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad händer om ett program kraschar med ett `ValueError` och det INTE finns något try/except?",
    options: [
      { id: "a", text: "Python ignorerar felet och fortsätter" },
      { id: "b", text: "Programmet avslutas och ett felmeddelande visas" },
      { id: "c", text: "Felet sparas i en variabel automatiskt" },
      { id: "d", text: "Python frågar användaren om de vill fortsätta" }
    ],
    answer_key: "b",
    explanation: "Utan [[try_except]] propagerar ett undantag (exception) uppåt i anropsstacken. Om ingenting fångar det avslutas programmet med en traceback – ett felmeddelande som visar var det gick fel.",
    common_mistakes: "Python hanterar INTE fel tyst – om du inte skriver try/except kraschar programmet."
  },
  {
    id: "py-v2-7",
    track_id: "prog1a",
    topic: "⚡ Felhantering: try/except",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad gör följande kod?\n```python\ntry:\n    x = int(input('Ange ett tal: '))\nexcept ValueError:\n    print('Det är inte ett tal!')\n```",
    options: [
      { id: "a", text: "Kraschar om användaren skriver text" },
      { id: "b", text: "Fångar felet om input inte kan konverteras till int, och skriver ut ett meddelande" },
      { id: "c", text: "Kör except-blocket alltid, oavsett input" },
      { id: "d", text: "Är ogiltig Python-syntax" }
    ],
    answer_key: "b",
    explanation: "[[try_except]] testar koden i `try`-blocket. Om en `ValueError` uppstår (t.ex. om användaren skriver 'hej' istället för en siffra) hoppar Python till `except`-blocket och kör det istället. Programmet kraschar inte.",
    strong_answer_example: "try kör koden, och om ValueError uppstår (fel typ) fångas det av except som hanterar det snyggt."
  },
  {
    id: "py-v2-8",
    track_id: "prog1a",
    topic: "⚡ Felhantering: try/except",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan att fånga `except Exception` vs `except ValueError`?",
    options: [
      { id: "a", text: "Det är ingen skillnad" },
      { id: "b", text: "except Exception fångar alla typer av fel, except ValueError fångar bara typkonverteringsfel" },
      { id: "c", text: "except ValueError fångar alla fel, except Exception fångar ingenting" },
      { id: "d", text: "except Exception används bara i klasser" }
    ],
    answer_key: "b",
    explanation: "`ValueError` är en specifik feltyp – uppstår när ett värde har fel typ eller format (t.ex. `int('abc')`). `Exception` är basklassen för de flesta fel i Python. Att fånga specifika fel är bättre praxis – det undviker att dölja oväntade buggar.",
    common_mistakes: "Att alltid använda 'except Exception' kan dölja buggar du inte visste om. Var specifik när du vet vilken feltyp du förväntar dig."
  },
  {
    id: "py-v2-9",
    track_id: "prog1a",
    topic: "⚡ Felhantering: try/except",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad gör `finally`-blocket i en try/except-konstruktion?",
    options: [
      { id: "a", text: "Körs bara om ett fel uppstår" },
      { id: "b", text: "Körs bara om inget fel uppstår" },
      { id: "c", text: "Körs alltid, oavsett om ett fel uppstod eller inte" },
      { id: "d", text: "Avslutar programmet" }
    ],
    answer_key: "c",
    explanation: "`finally` körs alltid – oavsett om [[try_except]] fångade ett fel eller inte. Det används för städning: stänga filer, frigöra resurser, logga. Du kan se det som: 'oavsett vad som hände, gör alltid detta till sist.'",
    strong_answer_example: "finally är garanterad körning – bra för att stänga en fil eller databasanslutning oavsett utfall."
  },
  {
    id: "py-v2-10",
    track_id: "prog1a",
    topic: "⚡ Felhantering: try/except",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad gör `raise ValueError('Ogiltigt värde')` i Python?",
    options: [
      { id: "a", text: "Skriver ut meddelandet och fortsätter" },
      { id: "b", text: "Skapar och kastar ett ValueError-undantag med det angivna meddelandet" },
      { id: "c", text: "Importerar ValueError från ett bibliotek" },
      { id: "d", text: "Är bara giltig inuti en except-block" }
    ],
    answer_key: "b",
    explanation: "[[raise]] låter dig avsiktligt kasta ett undantag med ett eget meddelande. Det används för att signalera att något gick fel i din kod – t.ex. om en [[function]] får ett orimligt [[parameter]]. Kan användas var som helst, inte bara i except.",
    common_mistakes: "raise avslutar INTE programmet om det fångas av ett try/except högre upp i anropsstacken."
  },

  // ── import och bibliotek (py-v2-11 → py-v2-15) ──

  {
    id: "py-v2-11",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad gör `import math` i Python?",
    options: [
      { id: "a", text: "Installerar math-paketet från internet" },
      { id: "b", text: "Laddar in Pythons inbyggda math-modul så du kan använda dess funktioner" },
      { id: "c", text: "Skapar en ny variabel kallad math" },
      { id: "d", text: "Kör alla funktioner i math-modulen direkt" }
    ],
    answer_key: "b",
    explanation: "[[import_kw]] laddar in en [[module]] (en samling kod) i ditt program. Pythons standardbibliotek innehåller många moduler som `math`, `random` och `os`. Du behöver inte installera dem – de följer med Python.",
    common_mistakes: "import installerar INTE paket. För externa paket används pip. import laddar in redan installerade moduler."
  },
  {
    id: "py-v2-12",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Du har skrivit `import math`. Hur anropar du kvadratrotsfunktionen för att räkna ut roten ur 16?",
    options: [
      { id: "a", text: "sqrt(16)" },
      { id: "b", text: "math.sqrt(16)" },
      { id: "c", text: "math->sqrt(16)" },
      { id: "d", text: "import math.sqrt(16)" }
    ],
    answer_key: "b",
    explanation: "När du importerar en [[module]] med `import math` måste du använda modulnamnet som prefix: `math.sqrt(16)`. Punkten visar att `sqrt` är en [[function]] som tillhör `math`-modulen.",
    common_mistakes: "Om du bara skriver sqrt(16) utan prefix får du NameError – Python vet inte vad sqrt är utan modulnamnet."
  },
  {
    id: "py-v2-13",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan `import math` och `from math import sqrt`?",
    options: [
      { id: "a", text: "Ingen skillnad – de fungerar exakt likadant" },
      { id: "b", text: "Med 'from math import sqrt' kan du skriva sqrt() direkt utan math.-prefix" },
      { id: "c", text: "'from math import sqrt' installerar math-paketet" },
      { id: "d", text: "'import math' importerar bara sqrt, inte hela modulen" }
    ],
    answer_key: "b",
    explanation: "`from math import sqrt` importerar en specifik [[function]] direkt till ditt namnutrymme – du kan skriva `sqrt(16)` utan prefix. `import math` importerar hela [[module]]n och kräver prefix. Båda är korrekta; `from ... import` är kortare men kan skapa namnkonflikter om du har egna funktioner med samma namn.",
    common_mistakes: "from math import * importerar ALLT från math – detta undviks i produktionskod för att det förorenar namnutrymmet."
  },
  {
    id: "py-v2-14",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Sekundär",
    estimated_minutes: 2,
    prompt: "Vad är `pip` och när används det?",
    options: [
      { id: "a", text: "En Python-funktion för att skriva ut data" },
      { id: "b", text: "Ett verktyg för att installera externa Python-paket från internet" },
      { id: "c", text: "Ett sätt att importera moduler i Python-kod" },
      { id: "d", text: "En loop-typ i Python" }
    ],
    answer_key: "b",
    explanation: "[[pip]] är Pythons pakethanterare. Du kör det i terminalen (inte i Python-kod): `pip install pandas` installerar ett externt paket. Standard Pythons inbyggda bibliotek kräver inte pip – det är bara för tredjepartspaket.",
    common_mistakes: "pip används i terminalen/kommandoraden, INTE inuti Python-kod. I koden använder du import för att ladda in redan installerade paket."
  },
  {
    id: "py-v2-15",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad returnerar `random.randint(1, 6)` och vad är det användbart för?",
    options: [
      { id: "a", text: "Alltid siffran 1" },
      { id: "b", text: "Ett slumptal mellan 1 och 6 (inklusive båda gränserna)" },
      { id: "c", text: "En lista av talen 1 till 6" },
      { id: "d", text: "Medelvärdet av 1 och 6, dvs 3.5" }
    ],
    answer_key: "b",
    explanation: "`random.randint(a, b)` ger ett slumpmässigt heltal inklusive både `a` och `b`. Perfekt för att simulera tärningskast, spel, slumpurval. Kräver `import random` först.",
    common_mistakes: "range(1, 6) ger 1-5 (exkluderar 6). random.randint(1, 6) inkluderar 6 – viktigt att hålla isär."
  },

  // ── Filhantering (py-v2-16 → py-v2-20) ──

  {
    id: "py-v2-16",
    track_id: "prog1a",
    topic: "⚡ Filhantering",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad gör `open('data.txt', 'r')` i Python?",
    options: [
      { id: "a", text: "Skapar en ny fil kallad data.txt" },
      { id: "b", text: "Öppnar filen data.txt för läsning" },
      { id: "c", text: "Skriver 'r' till filen data.txt" },
      { id: "d", text: "Raderar filen data.txt" }
    ],
    answer_key: "b",
    explanation: "`open(filnamn, läge)` öppnar en fil. Läge `'r'` = read (läs), `'w'` = write (skriv, skapar/skriver över), `'a'` = append (lägg till). Funktionen returnerar ett filobjekt du sedan kan använda för att läsa eller skriva.",
    common_mistakes: "Om filen inte finns och du öppnar med 'r' får du FileNotFoundError. Med 'w' skapas filen om den inte finns."
  },
  {
    id: "py-v2-17",
    track_id: "prog1a",
    topic: "⚡ Filhantering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad är skillnaden mellan `.read()` och `.readlines()` när du läser en fil?",
    options: [
      { id: "a", text: ".read() läser en rad, .readlines() läser hela filen" },
      { id: "b", text: ".read() returnerar hela filens innehåll som en sträng, .readlines() returnerar en lista med en sträng per rad" },
      { id: "c", text: "De är identiska och fungerar på samma sätt" },
      { id: "d", text: ".readlines() kan bara läsa .csv-filer" }
    ],
    answer_key: "b",
    explanation: "`.read()` ger hela filinnehållet som en lång [[string]]. `.readlines()` ger en [[list]] där varje element är en rad (inklusive radbrytning `\\n`). Välj `.readlines()` när du vill bearbeta fil rad för rad.",
    common_mistakes: "Raderna från readlines() inkluderar \\n i slutet. Använd strip() för att ta bort det: for line in f.readlines(): line = line.strip()"
  },
  {
    id: "py-v2-18",
    track_id: "prog1a",
    topic: "⚡ Filhantering",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Hur skriver du texten 'Hej!' till en fil `output.txt` i Python?",
    options: [
      { id: "a", text: "print('Hej!', file='output.txt')" },
      { id: "b", text: "f = open('output.txt', 'w')\nf.write('Hej!')\nf.close()" },
      { id: "c", text: "write('output.txt', 'Hej!')" },
      { id: "d", text: "output.txt.write('Hej!')" }
    ],
    answer_key: "b",
    explanation: "Du öppnar filen med läge `'w'` (write), anropar `.write()` med texten, och stänger sedan filen med `.close()`. Att glömma `.close()` kan leda till att data inte sparas korrekt – därav rekommendationen att använda `with`-blocket istället.",
    common_mistakes: "Med 'w' raderas allt befintligt innehåll. Om du vill lägga till utan att radera, använd 'a' (append)."
  },
  {
    id: "py-v2-19",
    track_id: "prog1a",
    topic: "⚡ Filhantering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Varför rekommenderas `with open('fil.txt') as f:` framför att manuellt anropa `f.close()`?",
    options: [
      { id: "a", text: "with-blocket är snabbare" },
      { id: "b", text: "with stänger automatiskt filen när blocket är klart, även om ett fel uppstår" },
      { id: "c", text: "with-blocket är obligatoriskt för att öppna filer" },
      { id: "d", text: "f.close() fungerar inte i Python 3" }
    ],
    answer_key: "b",
    explanation: "`with open(...) as f:` är ett context manager-mönster. Det garanterar att filen stängs automatiskt när blocket avslutas – oavsett om ett fel uppstår eller inte. Det är renare kod och eliminerar risken att glömma `f.close()`.",
    strong_answer_example: "with-blocket hanterar stängning automatiskt via __enter__ och __exit__ – säkrare än manuell close()."
  },
  {
    id: "py-v2-20",
    track_id: "prog1a",
    topic: "⚡ Filhantering",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Vad händer om du försöker öppna en fil med `open('saknas.txt', 'r')` när filen inte finns?",
    options: [
      { id: "a", text: "Python skapar en ny tom fil" },
      { id: "b", text: "Programmet ger FileNotFoundError och kraschar om det inte hanteras" },
      { id: "c", text: "open() returnerar None" },
      { id: "d", text: "Ingenting händer – Python ignorerar det" }
    ],
    answer_key: "b",
    explanation: "`FileNotFoundError` uppstår om filen inte existerar vid läsning. Hantera det med [[try_except]]: `try: f = open(...) except FileNotFoundError: print('Filen saknas')`. Med läge `'w'` eller `'a'` skapas filen om den inte finns – det ger inte felet.",
    common_mistakes: "Att öppna med 'w' skapar filen – men det raderar ALLT innehåll om filen redan finns. Var försiktig med 'w' på befintliga filer."
  },

  // ── Integration och praktik (py-v2-21 → py-v2-24) ──

  {
    id: "py-v2-21",
    track_id: "prog1a",
    topic: "⚡ Integration: kod-spårning",
    format: "mcq",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 3,
    prompt: "Vad skriver följande kod ut?\n```python\nclass Counter:\n    def __init__(self):\n        self.count = 0\n    def increment(self):\n        self.count += 1\n        return self.count\n\nc = Counter()\nprint(c.increment())\nprint(c.increment())\nprint(c.count)\n```",
    options: [
      { id: "a", text: "0\n0\n0" },
      { id: "b", text: "1\n2\n2" },
      { id: "c", text: "1\n1\n1" },
      { id: "d", text: "SyntaxError" }
    ],
    answer_key: "b",
    explanation: "[[init]] sätter `count = 0`. Varje anrop till `increment()` ökar [[attribute]]et `self.count` med 1 och returnerar det nya värdet. Första anropet: count = 1, returnerar 1. Andra: count = 2, returnerar 2. `c.count` är då 2. Nyckelinsikten: `self.count` lever kvar mellan anropen eftersom det är ett [[attribute]] på [[object]]et, inte en lokal [[variable]].",
    common_mistakes: "En lokal variabel inuti metoden hade nollställts vid varje anrop. self.count bevaras eftersom det tillhör objektet."
  },
  {
    id: "py-v2-22",
    track_id: "prog1a",
    topic: "⚡ Integration: felsökning",
    format: "short",
    difficulty: "Medel",
    source_tier: "Officiell",
    estimated_minutes: 4,
    prompt: "Följande kod är tänkt att be användaren om ett tal och skriva ut det dubblade. Hitta felet och förklara hur du fixar det.\n```python\ndef double_input():\n    try:\n        x = input('Ange ett tal: ')\n        result = x * 2\n        print('Dubbelt:', result)\n    except:\n        print('Fel!')\n\ndouble_input()\n```",
    answer_key: "Felet är att input() returnerar en sträng. x * 2 dubblar strängen (t.ex. '55'), inte talet. Fix: x = int(input('...'))",
    explanation: "[[print_fn]] av `input()` ger alltid en [[string]], även om användaren skriver en siffra. `'5' * 2` ger `'55'` (strängrepetering), inte 10. Lösning: konvertera med `int(input(...))` eller `float(input(...))`. Dessutom: tom `except:` är dålig praxis – använd `except ValueError:` för att vara specifik.",
    scoring_criteria: [
      "Identifierar att input() returnerar string, inte int",
      "Förklarar att * 2 på en sträng repeterar den",
      "Ger korrekt fix: int(input(...))",
      "Bonus: nämner att except utan typ är för bred"
    ],
    common_mistakes: "Många missar att det faktiskt INTE ger ett fel – koden körs utan krasch, men ger fel svar. Det är ett logikfel, inte ett syntaxfel."
  },
  {
    id: "py-v2-23",
    track_id: "prog1a",
    topic: "⚡ Integration: fil och klass",
    format: "short",
    difficulty: "Svår",
    source_tier: "Officiell",
    estimated_minutes: 5,
    prompt: "Beskriv hur du skulle skriva ett program som:\n1. Läser en textfil `names.txt` (ett namn per rad)\n2. Skapar ett `Person`-objekt för varje namn\n3. Skriver ut varje persons hälsning via en `greet()`-metod\nDu behöver inte skriva fullständig kod – men beskriv strukturen tydligt.",
    answer_key: "1. Definiera class Person med __init__(self, name) och greet() som returnerar f'Hej, {self.name}!'. 2. Öppna filen med with open('names.txt') as f och läs raderna. 3. Loop: for name in f.readlines(): skapa Person(name.strip()) och anropa .greet().",
    explanation: "Detta kombinerar [[class]], [[object]], filhantering och [[loop]]. [[f_string]] är praktisk i greet(). `.strip()` tar bort \\n från raderna. `with open()` hanterar filstängning automatiskt.",
    scoring_criteria: [
      "class Person med __init__(self, name)",
      "greet()-metod med f-sträng eller string-concatenation",
      "with open() as f för filläsning",
      "loop som skapar Person-objekt per rad",
      "strip() eller liknande för att rensa radbrytningar"
    ],
    strong_answer_example: "class Person:\n    def __init__(self, name): self.name = name\n    def greet(self): return f'Hej, {self.name}!'\n\nwith open('names.txt') as f:\n    for line in f:\n        p = Person(line.strip())\n        print(p.greet())"
  },
  {
    id: "py-v2-24",
    track_id: "prog1a",
    topic: "⚡ import och bibliotek",
    format: "mcq",
    difficulty: "Lätt",
    source_tier: "Officiell",
    estimated_minutes: 2,
    prompt: "Du skriver `import random` i toppen av ditt program. Vilka av dessa kan du nu använda?",
    options: [
      { id: "a", text: "random.choice(), random.randint(), random.shuffle()" },
      { id: "b", text: "random.open(), random.read(), random.write()" },
      { id: "c", text: "random.sort(), random.len(), random.print()" },
      { id: "d", text: "Ingenting – du måste installera random med pip" }
    ],
    answer_key: "a",
    explanation: "`random`-[[module]]n är inbyggd i Python och ger verktyg för slumptals-generering. `random.choice(lista)` väljer ett slumpmässigt element, `random.randint(a, b)` ger ett slumptal i intervall, `random.shuffle(lista)` blandar en lista. Ingen pip-installation behövs.",
    common_mistakes: "random är en del av Pythons standardbibliotek – pip behövs bara för externa bibliotek som numpy eller requests."
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
    id: "mock-nack-aptitudprov",
    name: "⚡ APTITUDPROV – Nackademin-simulering (33 min)",
    track_id: "nackademin_ux",
    total_minutes: 33,
    sections: [
      {
        title: "Del A – Induktiv logik (mönsterigenkänning)",
        track_id: "nackademin_ux",
        topics: ["Aptitud: Induktiv logik"],
        question_ids: ["nack-a1", "nack-a2", "nack-a3", "nack-a4", "nack-a5", "nack-a6"],
        minutes: 5,
        weight: 0.25
      },
      {
        title: "Del B – Deduktiv logik (slutledning)",
        track_id: "nackademin_ux",
        topics: ["Aptitud: Deduktiv logik"],
        question_ids: ["nack-a7", "nack-a8", "nack-a9", "nack-a10", "nack-a11", "nack-a12"],
        minutes: 6,
        weight: 0.25
      },
      {
        title: "Del C – Verbal förmåga (synonymer, analogier)",
        track_id: "nackademin_ux",
        topics: ["Aptitud: Verbal förmåga"],
        question_ids: ["nack-a13", "nack-a14", "nack-a15", "nack-a16", "nack-a17", "nack-a18"],
        minutes: 12,
        weight: 0.25
      },
      {
        title: "Del D – Svensk språkfärdighet (stavning, grammatik, ordföljd)",
        track_id: "nackademin_ux",
        topics: ["Aptitud: Svensk språkfärdighet"],
        question_ids: ["nack-a19", "nack-a20", "nack-a21", "nack-a22", "nack-a23", "nack-a24"],
        minutes: 10,
        weight: 0.25
      }
    ],
    scoring_rules: "Aptitudprov baserat på verifierade erfarenheter av Nackademins selektionsprov: induktiv logik, deduktiv logik, verbal förmåga och svensk språkfärdighet. Varje del väger lika (25%). OBS: Nackademins faktiska prov testar INTE UX-kunskaper – detta är träning för själva antagningsprovet."
  },
  {
    id: "mock-nack-v2",
    name: "Eget Nackademin-provförslag 60 min (v2)",
    track_id: "nackademin_ux",
    total_minutes: 60,
    sections: [
      {
        title: "Del A – Analytisk förmåga (MCQ)",
        track_id: "nackademin_ux",
        topics: ["Logik/analys"],
        question_ids: ["ux-1", "ux-4", "ux-9", "ux-12"],
        minutes: 20,
        weight: 0.40
      },
      {
        title: "Del B – Problemlösning och prioritering (MCQ)",
        track_id: "nackademin_ux",
        topics: ["Problemlösning", "Teststrategi", "Informationsarkitektur"],
        question_ids: ["ux-2", "ux-5", "ux-7", "ux-10"],
        minutes: 20,
        weight: 0.35
      },
      {
        title: "Del C – Scenario och resonemang (fritext)",
        track_id: "nackademin_ux",
        topics: ["Scenario-övning", "Teststrategi"],
        question_ids: ["ux-3", "ux-6"],
        minutes: 20,
        weight: 0.25
      }
    ],
    scoring_rules: "Eget provförslag baserat på verifierade mönster: analytisk förmåga (40%), problemlösning (35%), scenarioreasoning (25%). Fritextsvar bedöms mot scoring_criteria – inget enda facit gäller."
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
    id: "mock-iths-cc",
    name: "⚡ IT-H Fullständigt antagningsprov (90 min)",
    track_id: "iths_itsec",
    total_minutes: 90,
    sections: [
      {
        title: "Del 1 Svenska – ordval, grammatik och meningsbyggnad",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Svenska"],
        question_ids: ["iths-d1-sv1", "iths-d1-sv2", "iths-d1-sv3", "iths-d1-sv4"],
        minutes: 10,
        weight: 0.11
      },
      {
        title: "Del 1 Engelska – ordförståelse och grammatik",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Engelska"],
        question_ids: ["iths-d1-en1", "iths-d1-en2", "iths-d1-en3", "iths-d1-en4"],
        minutes: 10,
        weight: 0.11
      },
      {
        title: "Del 1 Matematik – procent, binärt och nätverksräkning",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Matematik"],
        question_ids: ["iths-d1-ma1", "iths-d1-ma2", "iths-d1-ma3", "iths-d1-ma4"],
        question_pool: ["iths-d1-ma1","iths-d1-ma2","iths-d1-ma3","iths-d1-ma4","iths-d1-ma5","iths-d1-ma6","iths-d1-ma7","iths-d1-ma8","iths-d1-ma9","iths-d1-ma10","iths-d1-ma11","iths-d1-ma12","iths-d1-ma13","iths-d1-ma14","iths-d1-ma15","iths-d1-ma16"],
        questions_count: 4,
        minutes: 15,
        weight: 0.11
      },
      {
        title: "Del 2: Dator- och nätverksteknik",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 2: Nätverksteknik"],
        question_ids: ["iths-d2-1", "iths-d2-2", "iths-d2-3", "iths-d2-4", "iths-d2-5", "iths-d2-6", "iths-d2-7", "iths-d2-8", "iths-d2-9", "iths-d2-10"],
        question_pool: ["iths-d2-1","iths-d2-2","iths-d2-3","iths-d2-4","iths-d2-5","iths-d2-6","iths-d2-7","iths-d2-8","iths-d2-9","iths-d2-10","iths-d2-11","iths-d2-12","iths-d2-13","iths-d2-14","iths-d2-15","iths-d2-16","iths-d2-17","iths-d2-18","iths-d2-19","iths-d2-20","iths-d2-21","iths-d2-22","iths-d2-23","iths-d2-24","iths-d2-25","iths-d2-26","iths-d2-27","iths-d2-28","iths-d2-29","iths-d2-30","iths-d2-31","iths-d2-32","iths-d2-33","iths-d2-34","iths-d2-35"],
        questions_count: 10,
        minutes: 45,
        weight: 0.67
      }
    ],
    scoring_rules: "Del 1 Svenska/Engelska/Matematik väger 33% sammanlagt (11% vardera). Del 2 väger 67%. Separat poäng per del med återkoppling."
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
  },

  // ── ⚡ IT-H separata delarna ──────────────────────────
  {
    id: "mock-iths-d1-sv",
    name: "⚡ IT-H Del 1 – Bara Svenska (10 min)",
    track_id: "iths_itsec",
    total_minutes: 10,
    sections: [
      {
        title: "Svenska – ordval, grammatik och meningsbyggnad",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Svenska"],
        question_ids: ["iths-d1-sv1", "iths-d1-sv2", "iths-d1-sv3", "iths-d1-sv4"],
        minutes: 10,
        weight: 1.0
      }
    ],
    scoring_rules: "Fokus på grammatik, syftning och stavning. Varje rätt svar ger lika vikt."
  },
  {
    id: "mock-iths-d1-en",
    name: "⚡ IT-H Del 1 – Bara Engelska (10 min)",
    track_id: "iths_itsec",
    total_minutes: 10,
    sections: [
      {
        title: "Engelska – teknisk ordförståelse och grammatik",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Engelska"],
        question_ids: ["iths-d1-en1", "iths-d1-en2", "iths-d1-en3", "iths-d1-en4"],
        minutes: 10,
        weight: 1.0
      }
    ],
    scoring_rules: "Fokus på teknisk engelska och meningsstruktur. Varje rätt svar ger lika vikt."
  },
  {
    id: "mock-iths-d1-ma",
    name: "⚡ IT-H Del 1 – Bara Matematik (15 min)",
    track_id: "iths_itsec",
    total_minutes: 15,
    sections: [
      {
        title: "Matematik – procent, binärt och nätverksräkning",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Matematik"],
        question_ids: ["iths-d1-ma1", "iths-d1-ma2", "iths-d1-ma3", "iths-d1-ma4"],
        question_pool: ["iths-d1-ma1","iths-d1-ma2","iths-d1-ma3","iths-d1-ma4","iths-d1-ma5","iths-d1-ma6","iths-d1-ma7","iths-d1-ma8","iths-d1-ma9","iths-d1-ma10","iths-d1-ma11","iths-d1-ma12","iths-d1-ma13","iths-d1-ma14","iths-d1-ma15","iths-d1-ma16"],
        questions_count: 4,
        minutes: 15,
        weight: 1.0
      }
    ],
    scoring_rules: "Fokus på grundläggande matematisk förmåga och nätverksräkning. Varje rätt svar ger lika vikt."
  },
  {
    id: "mock-iths-d1-all",
    name: "⚡ IT-H Del 1 komplett – Svenska + Engelska + Matte (35 min)",
    track_id: "iths_itsec",
    total_minutes: 35,
    sections: [
      {
        title: "Del 1 Svenska",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Svenska"],
        question_ids: ["iths-d1-sv1", "iths-d1-sv2", "iths-d1-sv3", "iths-d1-sv4"],
        minutes: 10,
        weight: 0.33
      },
      {
        title: "Del 1 Engelska",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Engelska"],
        question_ids: ["iths-d1-en1", "iths-d1-en2", "iths-d1-en3", "iths-d1-en4"],
        minutes: 10,
        weight: 0.33
      },
      {
        title: "Del 1 Matematik",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 1: Matematik"],
        question_ids: ["iths-d1-ma1", "iths-d1-ma2", "iths-d1-ma3", "iths-d1-ma4"],
        question_pool: ["iths-d1-ma1","iths-d1-ma2","iths-d1-ma3","iths-d1-ma4","iths-d1-ma5","iths-d1-ma6","iths-d1-ma7","iths-d1-ma8","iths-d1-ma9","iths-d1-ma10","iths-d1-ma11","iths-d1-ma12","iths-d1-ma13","iths-d1-ma14","iths-d1-ma15","iths-d1-ma16"],
        questions_count: 4,
        minutes: 15,
        weight: 0.34
      }
    ],
    scoring_rules: "Svenska, Engelska och Matematik väger lika (33/33/34%). Separat återkoppling per ämne."
  },
  {
    id: "mock-iths-d2",
    name: "⚡ IT-H Del 2 – Bara Nätverksteknik (45 min)",
    track_id: "iths_itsec",
    total_minutes: 45,
    sections: [
      {
        title: "Del 2: Dator- och nätverksteknik",
        track_id: "iths_itsec",
        topics: ["⚡ IT-H Del 2: Nätverksteknik"],
        question_ids: ["iths-d2-1", "iths-d2-2", "iths-d2-3", "iths-d2-4", "iths-d2-5", "iths-d2-6", "iths-d2-7", "iths-d2-8", "iths-d2-9", "iths-d2-10"],
        question_pool: ["iths-d2-1","iths-d2-2","iths-d2-3","iths-d2-4","iths-d2-5","iths-d2-6","iths-d2-7","iths-d2-8","iths-d2-9","iths-d2-10","iths-d2-11","iths-d2-12","iths-d2-13","iths-d2-14","iths-d2-15","iths-d2-16","iths-d2-17","iths-d2-18","iths-d2-19","iths-d2-20","iths-d2-21","iths-d2-22","iths-d2-23","iths-d2-24","iths-d2-25","iths-d2-26","iths-d2-27","iths-d2-28","iths-d2-29","iths-d2-30","iths-d2-31","iths-d2-32","iths-d2-33","iths-d2-34","iths-d2-35"],
        questions_count: 10,
        minutes: 45,
        weight: 1.0
      }
    ],
    scoring_rules: "Fokus på nätverksprotokoll, säkerhet och nätverksarkitektur. 10 frågor slumpas ur en pool på 35 – varje körning ger ny variation."
  },
  {
    id: "mock-prog-python-adv",
    name: "⚡ Python-modul: Klasser, fel & filer (25 min)",
    track_id: "prog1a",
    total_minutes: 25,
    sections: [
      {
        title: "Klasser och objekt",
        track_id: "prog1a",
        topics: ["⚡ Klasser och objekt"],
        question_ids: ["py-v2-1", "py-v2-2", "py-v2-3", "py-v2-4", "py-v2-5"],
        minutes: 8,
        weight: 0.25
      },
      {
        title: "Felhantering: try/except",
        track_id: "prog1a",
        topics: ["⚡ Felhantering: try/except"],
        question_ids: ["py-v2-6", "py-v2-7", "py-v2-8", "py-v2-9", "py-v2-10"],
        minutes: 7,
        weight: 0.25
      },
      {
        title: "import och bibliotek",
        track_id: "prog1a",
        topics: ["⚡ import och bibliotek"],
        question_ids: ["py-v2-11", "py-v2-12", "py-v2-13", "py-v2-14", "py-v2-15", "py-v2-24"],
        minutes: 5,
        weight: 0.25
      },
      {
        title: "Filhantering och integration",
        track_id: "prog1a",
        topics: ["⚡ Filhantering", "⚡ Integration: kod-spårning", "⚡ Integration: felsökning", "⚡ Integration: fil och klass"],
        question_ids: ["py-v2-16", "py-v2-17", "py-v2-18", "py-v2-19", "py-v2-20", "py-v2-21", "py-v2-22", "py-v2-23"],
        minutes: 5,
        weight: 0.25
      }
    ],
    scoring_rules: "Lika vikt per sektion. Fritext-svar (py-v2-5, py-v2-22, py-v2-23) bedöms mot scoring_criteria. MCQ-svar rättas automatiskt."
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
  },
  {
    id: "ev-nack-4",
    provider: "Flashback/Community (förstahandserfarenheter)",
    url: "https://www.flashback.org/t3413748",
    claim:
      "Nackademins antagningsprov (aktuell version) består av fyra delar à ca 33 min total: induktivt logiktest (5 min), deduktivt logiktest (6 min), verbalt test (12 min), och svenska språkfärdigheter (10 min). Provet innehåller mönsterigenkänning (sudoku-liknande med figurer), ordförståelse, stavning och ordmatchning – INTE domänspecifika UX-frågor. Viktigt: UX-frågorna i projektet är träning för programinnehåll, inte för selektionsprovet.",
    confidence: "Medel",
    source_tier: "Community",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-nack-5",
    provider: "aminamini.com (förstahandserfarenhet)",
    url: "https://www.aminamini.com/generella-antagningsprovet-ux-designer-nackademin/",
    claim:
      "En äldre version av Nackademins prov innehöll: personlighetstest (30 min, ej tidsbegränsat), emotionell intelligens (16 min, identifiera känslor i ansiktsuttryck) och abstrakt/logiskt resonemang (16 min, mönsterigenkänning med prickarrangemang). Provet kan ha uppdaterats sedan dess – aktuell version verkar mer logik/verbal-fokuserad.",
    confidence: "Låg",
    source_tier: "Community",
    track_id: "nackademin_ux",
    last_verified_date: "2026-04-04"
  },
  {
    id: "ev-iths-5",
    provider: "IT-Högskolan officiell (iths.se/antagningsprovet)",
    url: "https://www.iths.se/antagningsprovet/",
    claim:
      "ITHS antagningsprov är 90 min totalt (2 × 45 min). Del 1 (alla program): Svenska, engelska, matematik. Del 2 (IT-säkerhet): Dator- och nätverksteknik. Tillåtna hjälpmedel: penna, papper, enkel miniräknare, formelblad. Webkamera + legitimation krävs. Provet är digitalt och kan tas hemifrån.",
    confidence: "Hög",
    source_tier: "Officiell",
    track_id: "iths_itsec",
    last_verified_date: "2026-04-04"
  }
];

export const GLOSSARY: GlossaryEntry[] = [
  // ── Allmänt / General ────────────────────────────────────────────
  {
    term: "variable",
    category: "general",
    sv: "En namngiven behållare som lagrar ett värde – kan ändras under programmets körning.",
    en: "A named container that stores a value – can be changed while the program runs.",
    story: "Kira hämtade maskeringtejpen kl 00:02. Varje burk, bricka och behållare fick en etikett. 'Salt. 200g.' Hon kunde byta etiketten; burken stannade kvar. Marco stod och stirrade, baffled. Han hade hållit allting i huvudet. Han kom inte ihåg sitt huvud.",
    related: ["string", "integer", "boolean", "scope"]
  },
  {
    term: "function",
    category: "general",
    sv: "Ett namngivet kodblock som utför en uppgift och kan anropas upprepade gånger.",
    en: "A named block of code that performs a task and can be called repeatedly.",
    story: "Kl 01:30 skrev Kira teknik-kort. Inte bara vad man gör — utan hur, som ett upprepningsbart förfarande. 'def glacera: ta ankan, gör så här, returnera resultat.' Marco läste kortet. 'Det där är bara... mitt drag.' 'Ja,' sa Kira. 'Nu existerar det när du glömmer.'",
    related: ["parameter", "return", "def", "method"]
  },
  {
    term: "class",
    category: "general",
    sv: "En mall (blueprint) som beskriver hur ett objekt ska se ut och bete sig.",
    en: "A blueprint that describes how an object should look and behave.",
    story: "Vid midnatt stirrade Marco på det tomma indexkortet Kira räckte honom. 'Här skriver du vad pasta ÄR,' sa hon. 'Inte en specifik skål. Reglerna.' Marco skrev: ingredienser, metod, timing. Inte mat. Inte ännu. Bara reglerna. Hon kallade det en klass. Han kallade det 'ett kort med känslor'.",
    related: ["object", "instance", "method", "attribute", "init"]
  },
  {
    term: "object",
    category: "general",
    sv: "En konkret instans av en klass – skapad från mallen och levande i minnet.",
    en: "A concrete instance of a class – created from the blueprint and alive in memory.",
    story: "Kl 01:10 lagade Kira den första riktiga pastan med Marcos kort. Hon ställde skålen framför honom. 'Det är ett objekt,' sa hon. 'Kortet är papper. Det här är saken.' Marco stirrade på sitt eget recept, tillagat från sina egna regler, med exakt rätt smak. Han grät lite. Bara lite.",
    related: ["class", "instance", "attribute", "method"]
  },
  {
    term: "instance",
    category: "general",
    sv: "Ett specifikt objekt skapat från en klass. Varje instans har sina egna attributvärden.",
    en: "A specific object created from a class. Each instance holds its own attribute values.",
    story: "Kl 01:20 stod tre pastaskålar på disken. Samma kort. Tre olika skålar. 'Varje skål är en instans,' sa Kira. 'Samma ritning, eget liv.' Marco tittade på dem. 'De är lika bra allihop.' 'Det är för att de kom från samma klass.' Han gillade inte hur mycket sense det gav.",
    related: ["class", "object", "self"]
  },
  {
    term: "method",
    category: "general",
    sv: "En funktion som tillhör ett objekt eller en klass och kan använda objektets data.",
    en: "A function that belongs to an object or class and can access the object's data.",
    story: "Marcos flamberingsdrag. Kira försökte skriva det som en funktion men det hörde ihop med dessertklassen — det använde dessertens eget socker, egen konjak. 'Metoder tillhör det de jobbar med,' förklarade hon. Marco nickade långsamt. 'Som hur jag bara gör dramatiken på speciella tillfällen.'",
    related: ["function", "class", "self", "attribute"]
  },
  {
    term: "attribute",
    category: "general",
    sv: "En variabel som tillhör ett objekt och beskriver dess egenskaper.",
    en: "A variable that belongs to an object and describes its properties.",
    story: "'Temperatur. Allergener. Portionsstorlek.' Kira listade pastaskålens egenskaper i sin anteckningsbok. Inte fakta om pasta generellt — de tillhörde den specifika skålen. Attribut. Marco sa: 'Så skålen har... känslor?' 'Egenskaper.' 'Samma sak.'",
    related: ["object", "class", "method", "self"]
  },
  {
    term: "parameter",
    category: "general",
    sv: "En platsmarkör i en funktionsdefinition som tar emot ett värde vid anrop.",
    en: "A placeholder in a function definition that receives a value when called.",
    story: "Kl 01:40 visade Kira Marco hennes glacera-kort. 'Den här platsen? Tillagningsgrad. Det är en parameter. En blank ruta. Funktionen vet inte vilket värde den får förrän du anropar den.' Marco fyllde i 'medium rare'. 'DET,' sa Kira, 'är ett argument.'",
    related: ["argument", "function", "return"]
  },
  {
    term: "argument",
    category: "general",
    sv: "Det faktiska värdet som skickas in till en funktion när den anropas.",
    en: "The actual value passed into a function when it is called.",
    story: "Marco försökte argumentera för att välstekt var ett kulinariskt brott. 'Det är inte vad argument betyder i programmering,' sa Kira. 'Ett argument är det faktiska värdet du skickar in.' Hon tänkte en sekund. 'Men du har rätt om välstekt.'",
    related: ["parameter", "function"]
  },
  {
    term: "return",
    category: "general",
    sv: "Skickar tillbaka ett värde från en funktion till den som anropade den.",
    en: "Sends a value back from a function to whoever called it.",
    story: "Kl 01:50 var första rätten klar. Kira bar den till disken. 'Funktionen är klar. Den returnerar.' 'Returnerar till vem?' 'Till den som anropade den.' 'Gästen?' 'I det här fallet, ja. Gästen anropade funktionen.' Marco tittade på Kira. 'Pratar vi fortfarande om matlagning?'",
    related: ["function", "method"]
  },
  {
    term: "loop",
    category: "general",
    sv: "En struktur som upprepar ett kodblock flera gånger tills ett villkor uppfylls.",
    en: "A structure that repeats a block of code multiple times until a condition is met.",
    story: "'Hur skalar vi alla potatisar?' frågade Marco. Kira tog upp en potatis. Skalade den. La ner den. Tog upp nästa. 'Samma rörelse, upprepas tills påsen är tom.' Marco: 'Så varje gång jag någonsin skalt potatisar—' 'Loop,' sa Kira. Marco satte sig ner ett ögonblick med tyngden av det.",
    related: ["for_loop", "while_loop", "iteration", "range_fn"]
  },
  {
    term: "for_loop",
    category: "general",
    sv: "En loop som itererar över en sekvens (lista, sträng, range) ett känt antal gånger.",
    en: "A loop that iterates over a sequence (list, string, range) a known number of times.",
    story: "Cateringlistan: 50 bord, 8 gäster per bord. Kira ritade en for-loop i luften: för varje bord i listan, förbered 8 kuvert. 'Du går igenom hela listan,' sa hon, 'varje post, uppifrån och ned.' Marco: 'Jag har varit en for-loop i 20 år.'",
    related: ["loop", "while_loop", "iteration", "range_fn", "list"]
  },
  {
    term: "while_loop",
    category: "general",
    sv: "En loop som körs så länge ett villkor är sant – antalet iterationer är inte känt i förväg.",
    en: "A loop that runs as long as a condition is true – the number of iterations is not known in advance.",
    story: "Béarnaisesåsen. Man rör tills den tjocknar. Man vet inte exakt hur länge — man kollar konstant. 'Det är en while-loop,' sa Kira. 'Du fortsätter medan villkoret är sant.' 'Villkoret är: inte tjockt nog?' 'Ja.' Marco rörde. Och rörde. Och rörde.",
    related: ["loop", "for_loop", "conditional", "boolean"]
  },
  {
    term: "conditional",
    category: "general",
    sv: "En if/else-sats som kör olika kod beroende på om ett villkor är sant eller falskt.",
    en: "An if/else statement that runs different code depending on whether a condition is true or false.",
    story: "'Om den har rätt temperatur går den ut. Om inte, tillbaka till spisen.' Marco sa det utan att tänka och frös direkt. 'Åh nej,' sa han. 'Jag sa just ett if/else.' Kira tittade upp långsamt. 'Välkommen till gemenskapen, Marco.'",
    related: ["boolean", "while_loop"]
  },
  {
    term: "boolean",
    category: "general",
    sv: "Ett värde som antingen är True eller False – grunden för all logik i kod.",
    en: "A value that is either True or False – the foundation of all logic in code.",
    story: "Kl 02:30 pekade Kira på ugnslamtan. 'Är den på?' 'Ja.' 'Är den på eller av?' 'På. Uppenbarligen på.' 'Då är booleanen True.' 'Jag känner mig nedlåten.' 'Lite,' sa hon. 'Men det ÄR vad en boolean är.'",
    related: ["conditional", "while_loop"]
  },
  {
    term: "integer",
    category: "general",
    sv: "Ett heltal utan decimaler – t.ex. 3, -7, 100.",
    en: "A whole number without decimals – e.g. 3, -7, 100.",
    story: "50 bord. 400 gäster. 3 rätter. Inga decimaler. 'Tack gud,' sa Marco. 'Jag klarar inte 2,5 bord.' 'Det är integers,' sa Kira. 'Heltal. Inga bråk.' Han skrev upp dem på whiteboardet. 'Heltal: enda siffrorna som inte ljuger för dig.'",
    related: ["float", "variable", "string"]
  },
  {
    term: "float",
    category: "general",
    sv: "Ett decimaltal – t.ex. 3.14, -0.5, 98.6.",
    en: "A decimal number – e.g. 3.14, -0.5, 98.6.",
    story: "63,5°C. Innertemperaturen på ett perfekt kycklingbröst. Inte 63. Inte 64. 63,5. 'Floats,' sa Kira och tittade på termometern. 'Decimaltal. Verkligheten är alltid en float.' Marco nickade. 'Matlagning är en float. Administration är ett heltal. Ingen människa är ett halvt.'",
    related: ["integer", "variable"]
  },
  {
    term: "string",
    category: "general",
    sv: "En sekvens av tecken (text) omsluten av citattecken – t.ex. 'hej' eller \"pasta\".",
    en: "A sequence of characters (text) wrapped in quotes – e.g. 'hej' or \"pasta\".",
    story: "Menyn. 'Tagliatelle al ragù.' 'Tournedos Rossini.' 'Tarte Tatin.' Allt text. Etiketter. Namn. 'Det här är strängar,' sa Kira och fäste dem på tavlan. Marco: 'Hela menyn är en sträng?' 'Nej, varje post är en sträng. Menyn är en lista.'",
    related: ["variable", "f_string", "integer"]
  },
  {
    term: "list",
    category: "general",
    sv: "En ordnad samling av värden. Kan innehålla blandade typer och ändras efteråt.",
    en: "An ordered collection of values. Can hold mixed types and be modified.",
    story: "Kl 02:00 fäste Kira hela ordern på tavlan: [förrätt, varmrätt, dessert, amuse-bouche, bröd]. 'En lista. Ordnad. Ändringsbar.' 'Kan man ta bort saker?' 'Ja.' 'Kan man skicka den till den som lade beställningen?' 'Det är return.' Marco pekade på listan. 'Den där. Jag vill ha den.'",
    related: ["dictionary", "index", "iteration", "append"]
  },
  {
    term: "dictionary",
    category: "general",
    sv: "En samling nyckel-värde-par. Varje värde nås via sin unika nyckel.",
    en: "A collection of key-value pairs. Each value is accessed via its unique key.",
    story: "Kryddskåpet. Inte organiserat efter hyllplats — organiserat efter namn. 'Salt: position 3.' 'Peppar: position 7.' Kira tittade upp: 'Det här är en dictionary.' Marco: 'Jag trodde det var ett kryddskåp.' 'Det ÄR ett kryddskåp. Det ÄR OCKSÅ en dictionary. Datastrukturer är överallt när man väl ser dem.'",
    related: ["list", "string"]
  },
  {
    term: "none",
    category: "general",
    sv: "Pythons sätt att representera 'inget värde' – en tom plats i minnet.",
    en: "Python's way of representing 'no value' – an empty slot in memory.",
    story: "Kl 02:15 öppnade Marco en behållare. Tom. Inte noll portioner. Inte tomrum. Bara... ingenting. Aktivt ingenting. 'None,' sa Kira tyst. 'Stort N.' 'Är det ett programmeringsterm?' 'Ja. Python har ett speciellt ord för när något finns men innehåller ingenting.' Marco stängde behållaren. 'Jag har en kollega som är sådär.'",
    related: ["variable", "none_py"]
  },
  {
    term: "index",
    category: "general",
    sv: "Positionen för ett element i en lista eller sträng – börjar alltid på 0.",
    en: "The position of an element in a list or string – always starts at 0.",
    story: "Kira numrerade rätterna från 0. Marco squintade: 'Varför har den första rätten nummer noll?' 'Så fungerar programmering.' 'Det är fel.' 'Det är konsekvent.' 'FEL.' 'Alla språk är överens.' 'FEL.' De argumenterade om det i fyra minuter medan pastan överkokades.",
    related: ["list", "string", "iteration"]
  },
  {
    term: "iteration",
    category: "general",
    sv: "Att gå igenom en samling element ett i taget – vad en loop gör.",
    en: "Going through a collection of elements one at a time – what a loop does.",
    story: "Kl 02:20 gick Kira igenom hela bordsplaneringslistan, en rad i taget. Samma rörelse. Varje post. 'Det är iteration,' sa hon. Marco tittade på. 'Du gör mänskliga motsvarigheten till en for-loop.' 'Jag vet,' sa han. 'Det har jag gjort i 20 år. Jag hade bara inte ett ord för det.'",
    related: ["loop", "for_loop", "list", "index"]
  },
  {
    term: "algorithm",
    category: "general",
    sv: "En steg-för-steg-instruktion för att lösa ett problem – oberoende av programspråk.",
    en: "A step-by-step instruction for solving a problem – independent of programming language.",
    story: "'Min souffléeteknik är en algoritm,' sa Marco kl 04:00. Han frågade inte. 'Värm pannan, smör, vänta, vik i ägg, kolla temperatur, ta ut exakt här.' Han tappade pappret. 'En exakt, upprepningsbar, steg-för-steg-lösning.' 'Ja,' sa Kira. 'Det är vad en algoritm är.' Lång paus. 'Hela min karriär är algoritmer.' 'Jag vet,' sa hon.",
    related: ["function", "loop", "conditional"]
  },
  {
    term: "debugging",
    category: "general",
    sv: "Processen att hitta och rätta fel i kod.",
    en: "The process of finding and fixing errors in code.",
    story: "Kl 03:30 var såsen fel. Inte dramatiskt fel — subtilt, specifikt fel. Marco smakade tre gånger. Identifierade problemet. Justerade. Smakade igen. 'Du debuggar,' sa Kira. 'Jag LAGAR MAT,' sa Marco. 'Samma process,' sa hon. Han svarade inte. Hon hade rätt.",
    related: ["syntax", "try_except"]
  },
  {
    term: "syntax",
    category: "general",
    sv: "Reglerna för hur kod måste skrivas – stavning, indrag, skiljetecken i ett programspråk.",
    en: "The rules for how code must be written – spelling, indentation, punctuation in a language.",
    story: "Kiras anteckningar var precisa och indragna. Marco tog upp en: 'Om jag skriver det här utan kolonet, kraschar Python?' 'Ja. Direkt. Kolonet är syntax.' 'Men det är ju bara ett skiljetecken.' 'Det är varje regel i fransk matlagning också. Fel steg och hela rätten är inkohärent.'",
    related: ["debugging", "indent"]
  },
  {
    term: "scope",
    category: "general",
    sv: "Det område i koden där en variabel är synlig och tillgänglig.",
    en: "The area in code where a variable is visible and accessible.",
    story: "Kallköket hade sin egen paprika. Varmköket kunde inte använda den. Inte för att det fanns regler — utan för var den stod. 'Scope,' sa Kira. 'En variabel existerar bara där den skapades. Utanför det blocket är den borta.' 'Så paprikan har scope?' 'Paprikan har scope.'",
    related: ["variable", "function"]
  },
  {
    term: "library",
    category: "general",
    sv: "En samling färdigskriven kod som du kan använda i ditt program.",
    en: "A collection of pre-written code you can use in your program.",
    story: "'Tänk om någon redan löst patisserimatematiken?' sa Marco. Kiras ögon tändes. 'Det har de. Det finns i ett bibliotek.' 'Ett bibliotek med... matlagningsmatematik?' 'Kod. Men i princip ja, färdigskrivna lösningar på problem du inte behöver lösa om.' Marco tänkte efter. 'Det är vad kockskolan är.' 'Ja. Fast du kan pip installera det.'",
    related: ["module", "import_kw", "pip"]
  },
  {
    term: "module",
    category: "general",
    sv: "En enstaka Python-fil med återanvändbar kod – kan importeras i andra program.",
    en: "A single Python file with reusable code – can be imported into other programs.",
    story: "Kira öppnade terminalen och importerade pastry-beräkningsmodulen. Den dök upp direkt — egna variabler, egna funktioner, eget tillstånd — som om en liten konditorispecialist precis kommit in i bärbara datorn. 'Varje modul är självständig,' sa hon. Marco tittade på skärmen. 'Den är väldigt liten.'",
    related: ["library", "import_kw"]
  },
  {
    term: "comment",
    category: "general",
    sv: "Text i koden som Python ignorerar – skriven för att förklara koden för människor.",
    en: "Text in code that Python ignores – written to explain the code to humans.",
    story: "Kl 04:15 lade Kira till en anteckning i sin kod: `# Marco skapade den här tekniken, kan inte förklara den, jag översatte så gott jag kunde`. Python ignorerade anteckningen. Kira gjorde inte det. Hon lade till en till: `# om det går sönder är det smöret. Det är alltid smöret.`",
    related: ["syntax", "debugging"]
  },
  {
    term: "operator",
    category: "general",
    sv: "Ett symbol som utför en operation på värden – t.ex. +, -, *, /, ==, >, and, or.",
    en: "A symbol that performs an operation on values – e.g. +, -, *, /, ==, >, and, or.",
    story: "Kl 02:40 kontrollerade Marco temperaturer. Är den över 63? Är den lika med det vi behöver? Under farozonen? 'Operatorer,' sa Kira. 'Större-än, lika-med, mindre-än. Alla lilla symbolerna som omvandlar data till beslut.' Marco riktade termometern mot henne. 'Du tänker göra det här hela natten, eller hur?' '==True,' sa hon.",
    related: ["boolean", "conditional"]
  },

  // ── Python-specifikt ─────────────────────────────────────────────
  {
    term: "def",
    category: "python",
    sv: "Nyckelordet som används för att definiera en funktion i Python.",
    en: "The keyword used to define a function in Python.",
    story: "Kira skrev `def glacera:` överst på kortet, sedan fyra mellanslag av indrag, sedan stegen. Marco: 'Varför börjar det med def?' 'Det berättar för Python att det som följer är en funktion. def är tillkännagivandet.' 'Som en ouvertyr?' 'Exakt som en ouvertyr.' Marco gillade faktiskt det.",
    related: ["function", "return", "parameter", "indent"]
  },
  {
    term: "self",
    category: "python",
    sv: "En referens till det aktuella objektet inuti en klassmetod – alltid första parametern.",
    en: "A reference to the current object inside a class method – always the first parameter.",
    story: "Kl 01:15 förklarade Kira self för Marco med hans eget namnskylt. 'När pasta-klassen kör sin metod behöver den veta att den pratar om DEN HÄR pastan — inte pasta i allmänhet. Self är namnskyltet.' Marco tittade på sitt märke. 'STRÖMBERG, MARCO.' 'Det är self.'",
    related: ["class", "method", "attribute", "instance"]
  },
  {
    term: "init",
    category: "python",
    sv: "Konstruktorn: en speciell metod som körs automatiskt när ett nytt objekt skapas.",
    en: "The constructor: a special method that runs automatically when a new object is created.",
    story: "'Vad är det första du gör när en ny rätt lämnar ritningen?' frågade Kira. Marco tvekade inte: 'Mise en place. Temperatur, tallrik, grundsås.' 'Det är __init__. Körs automatiskt. Innan allt annat. Sätter starttillståndet för varje nytt objekt.' Han stirrade på henne. 'Jag uppfann __init__.'",
    related: ["class", "object", "self", "attribute"]
  },
  {
    term: "print_fn",
    category: "python",
    sv: "Inbyggd funktion som skriver ut ett värde till konsolen.",
    en: "Built-in function that writes a value to the console.",
    story: "Kl 05:00 körde Kira ett skript för att bekräfta menyordern. Terminalen skrev ut: 'Förrätter: 50. Varmrätter: 50. Desserter: 50.' Marco lutade sig över hennes axel. 'Varifrån sa den det?' 'Print-funktionen. Det är hur kod pratar med omvärlden.' 'Så print() är serveringsluckan.' 'Exakt serveringsluckan.'",
    related: ["function", "string", "f_string"]
  },
  {
    term: "len_fn",
    category: "python",
    sv: "Inbyggd funktion som returnerar antalet element i en sekvens (lista, sträng, etc.).",
    en: "Built-in function that returns the number of elements in a sequence (list, string, etc.).",
    story: "Hur många rätter på listan? 'len(orders),' sa Kira och tryckte. Siffran dök upp. Marco: 'Den... räknade dem?' 'Direkt.' Han stirrade på skärmen. 'Jag har räknat för hand i tjugo år.' 'len() är snabbare.' 'Jag vet,' sa han tyst. 'Jag vet.'",
    related: ["list", "string", "integer"]
  },
  {
    term: "append",
    category: "python",
    sv: "Listmetod som lägger till ett element sist i listan.",
    en: "List method that adds an element to the end of the list.",
    story: "Kl 02:05 kom ett sent tillägg: ett veganalternativ. 'Lägg till det på orderlistan,' sa Marco. Kira tryckte: `orders.append('vegan_risotto')`. Listan växte med ett. 'append lägger till sist,' förklarade hon. Marco: 'Och om jag vill ha det i mitten?' 'Det är insert. Men var inte den personen.'",
    related: ["list", "method"]
  },
  {
    term: "try_except",
    category: "python",
    sv: "Felhanteringskonstruktion: try kör koden, except fångar felet om något går fel.",
    en: "Error handling construct: try runs the code, except catches the error if something goes wrong.",
    story: "Kl 03:00. Souffléerna. Kira satte in den första och skrev direkt: `try: bake(soufflé)` — och under: `except: serve_chocolate_mousse()`. 'Jag skrev reservplanen innan jag ens börjat,' sa hon. 'För att testa något riskabelt utan fallback är att hoppas.' Souffléen kollapsade. Moussen var perfekt. Ingen visste.",
    related: ["raise", "debugging", "none_py"]
  },
  {
    term: "raise",
    category: "python",
    sv: "Kastar ett undantag avsiktligt – används för att signalera att något gick fel i logiken.",
    en: "Throws an exception intentionally – used to signal that something went wrong in the logic.",
    story: "Kl 03:15 smakade Marco på något från kylen och spottade ut det direkt. 'NEJ. Stopp. Det här är fel. Inte fel-nog-att-fixa — utan fel-nog-att-stoppa-allt.' 'Det är raise,' sa Kira. 'Kasta ett undantag avsiktligt. Inte hantera det tyst — skrika att det inte kan fortsätta.' 'Jag har kastat undantag hela karriären,' sa Marco. 'Men aldrig hanterat dem elegant.'",
    related: ["try_except", "debugging"]
  },
  {
    term: "indent",
    category: "python",
    sv: "Indraget (4 mellanslag) som Python använder för att markera kodblock – inte valfritt.",
    en: "The indentation (4 spaces) Python uses to mark code blocks – not optional.",
    story: "Kiras kod såg ut som en trappa. Marco: 'Varför är allt skjutet åt höger?' 'Det är hur Python vet vad som hör inuti vad. Fyra mellanslag per nivå. Inte valfritt.' Han tittade på hennes receptkort — organiserade med exakt samma indragningsmönster. 'Du,' sa han långsamt, 'är väldigt konsekvent.'",
    related: ["syntax", "def", "conditional", "loop"]
  },
  {
    term: "f_string",
    category: "python",
    sv: "En formateringssträng (f'...{variabel}...') som bäddar in variabelvärden direkt i text.",
    en: "A formatting string (f'...{variable}...') that embeds variable values directly in text.",
    story: "Kl 06:00 genererade Kira bordskorten: `f'Bord {n}: {course}'`. Varje kort kom ut personaliserat. 'Klamrarna är där variabler bäddas in i texten,' sa hon. Marco tittade på 50 identiska-men-unika kort. 'Det här hade tagit mig en timme.' 'Det tog 0,003 sekunder.' En lång tystnad.",
    related: ["string", "variable", "print_fn"]
  },
  {
    term: "range_fn",
    category: "python",
    sv: "Inbyggd funktion som skapar en sekvens av heltal – vanlig i for-loopar.",
    en: "Built-in function that creates a sequence of integers – common in for loops.",
    story: "Kl 02:25: 50 bord att förbereda. Kira insisterade på att börja från noll. Marco vägrade. De kompromissade med ett för 'gästerna vet inte vad noll är'. `range(1, 51)`. Femtio siffror, direkt, inget papper. Marco muttrade: 'Vi hade kunnat använda det här varje kväll i femton år.'",
    related: ["for_loop", "integer", "iteration"]
  },
  {
    term: "import_kw",
    category: "python",
    sv: "Nyckelordet som laddar in en modul eller bibliotek i ditt Python-program.",
    en: "The keyword that loads a module or library into your Python program.",
    story: "Kl 04:00 öppnade Kira terminalen och skrev `import math`. Ett bibliotek av matematikfunktioner dök upp direkt. 'Det är bara... där? Jag behöver inte bygga det?' 'Någon annan byggde det.' Hon tvekade. 'Ärligt talat är mycket av programmering import-satser och tro på andras kod.'",
    related: ["module", "library", "pip"]
  },
  {
    term: "pip",
    category: "python",
    sv: "Pythons pakethanterare – används i terminalen för att installera externa bibliotek.",
    en: "Python's package manager – used in the terminal to install external libraries.",
    story: "Kira behövde ett bibliotek för mat-och-vin-kombinationer. Hon tryckte `pip install sommelier-py` i terminalen. 30 sekunder senare var det installerat. Marco tittade. 'Det... laddade ner en sommelier?' 'En sommeliers kunskap. Kodad.' Han var tyst ett ögonblick. 'Jag känner mig både lättad och hotad.'",
    related: ["import_kw", "library", "module"]
  },
  {
    term: "none_py",
    category: "python",
    sv: "Pythons tomvärde – None (med stort N) representerar frånvaron av ett värde.",
    en: "Python's empty value – None (capital N) represents the absence of a value.",
    story: "Kl 05:30 visade en kurspost None — datan fanns men värdet var tomt. 'Inte noll,' sa Kira. 'Noll skulle betyda inga portioner. None betyder att fältet aldrig sattes.' Marco squintade. 'Skillnaden mellan en tom tallrik och en tallrik som aldrig dukades.' 'Exakt.' Han nickade. 'Jag har serverat båda. De känns olika.'",
    related: ["none", "variable", "boolean"]
  },
  {
    term: "pass_kw",
    category: "python",
    sv: "Ett nyckelord som gör ingenting – en platshållare för kod som ska skrivas senare.",
    en: "A keyword that does nothing – a placeholder for code to be written later.",
    story: "Kl 05:00 skrev Kira en klass för dessertsektionen men lämnade huvudmetoden tom, la bara in `pass` som platshållare. 'Fungerar det?' frågade Marco. 'Det kompilerar. Gör ingenting. Men strukturen är där tills vi fyller i den.' Han tittade på funktionsskelettet. 'Det är mise en place för kod.' 'Ja. Exakt det.'",
    related: ["syntax", "def", "class"]
  },

  // ── Nätverk / Network ────────────────────────────────────────────
  {
    term: "ip_address",
    category: "network",
    sv: "En unik numerisk adress som identifierar en enhet på ett nätverk.",
    en: "A unique numeric address that identifies a device on a network.",
    story: "Kl 05:03 slocknade kassasystemets skärm. 'Surfplattan hittar inte servern,' sa Kira. 'Vad är serverns IP?' Marco: 'Vad är ett IP?' 'Det är adressen. Varje enhet på nätverket har en. Som en gatuadress, fast för datorer.' Han gav henne en tom blick. 'Skärmen slocknade och nu pratar du om adresser.' 'Ja. Välkommen till nätverk.'",
    related: ["dns", "protocol", "server"]
  },
  {
    term: "dns",
    category: "network",
    sv: "Domain Name System – översätter domännamn (t.ex. google.com) till IP-adresser.",
    en: "Domain Name System – translates domain names (e.g. google.com) to IP addresses.",
    story: "Kl 05:05 tryckte Kira in serverns namn i konfigurationen. Det löste inte upp. 'DNS är nere,' sa hon. Marco: 'Vad är DNS?' 'Det översätter namn till adresser. Som en telefonkatalog.' 'Vi har sådana.' 'Inte digitala tydligen.' Hon tryckte in rå IP-siffran istället. Det fungerade. 'DNS,' sa hon, 'är det man bara märker när det slutar fungera.'",
    related: ["ip_address", "protocol"]
  },
  {
    term: "tcp",
    category: "network",
    sv: "Transmission Control Protocol – tillförlitligt protokoll som garanterar leveransordning.",
    en: "Transmission Control Protocol – reliable protocol that guarantees delivery order.",
    story: "Kl 05:10 satte hon om kassasystemet till TCP. 'Varje order bekräftas som mottagen. Långsammare, men inget tappas.' Marco: 'Som en servitör som upprepar varje beställning för bekräftelse.' 'Exakt.' 'Vi borde göra det ändå.' 'Ja,' sa Kira. 'Det borde ni.'",
    related: ["udp", "protocol", "packet"]
  },
  {
    term: "udp",
    category: "network",
    sv: "User Datagram Protocol – snabbt men otillförlitligt – ingen garanti för leverans.",
    en: "User Datagram Protocol – fast but unreliable – no delivery guarantee.",
    story: "Marco ville veta vad UDP var. 'UDP är som att skrika orders rakt ut i matsalen,' sa Kira. 'Snabbt. Ingen bekräftelse. Vissa missas.' 'När vill man det?' 'Streaming. Live-video. När hastighet är viktigare än precision.' 'För kassaorders?' 'Absolut TCP.' 'Bra. Jag behöver alla bekräftelser jag kan få i natt.'",
    related: ["tcp", "protocol", "packet"]
  },
  {
    term: "port",
    category: "network",
    sv: "Ett nummer (0-65535) som identifierar vilken tjänst eller applikation data är avsedd för.",
    en: "A number (0-65535) that identifies which service or application data is intended for.",
    story: "Kl 05:15 kunde surfplattan nå servern men inte orderappen. 'Fel port,' muttrade Kira. 'Olika appar lyssnar på olika dörrar. Kassasystemet knackar på port 80 men appen är på 8080.' 'Två dörrar på samma byggnad,' sa Marco. 'Ja. Och båda låsta tills jag fixar det.' Hon fixade det.",
    related: ["protocol", "server", "tcp"]
  },
  {
    term: "protocol",
    category: "network",
    sv: "En uppsättning regler som styr hur datorer kommunicerar med varandra.",
    en: "A set of rules that governs how computers communicate with each other.",
    story: "'Hur vet surfplattan hur man pratar med servern?' frågade Marco. 'Protokoll. Regler de båda kommit överens om. Samma språk, samma ordning.' Marco tittade på sitt kök. 'Vi har protokoll. Service! betyder en rätt är klar. Oui, chef! betyder bekräftat.' Kira tittade upp. 'Marco. Du har implementerat protokoll sedan dag ett.'",
    related: ["tcp", "udp", "dns"]
  },
  {
    term: "packet",
    category: "network",
    sv: "En liten dataenhet som skickas över nätverket – stora meddelanden delas upp i paket.",
    en: "A small unit of data sent over a network – large messages are split into packets.",
    story: "Ordern kom igenom i bitar. Varje bit anlände separat och sattes ihop vid andra änden. 'Paket,' sa Kira. 'Stora meddelanden delas upp, skickas och byggs ihop igen.' Marco tänkte på de trerätters han lagat den natten. Förrätt, varmrätt, dessert. Varje ett paket. Gästen byggde ihop meningen vid bordet.",
    related: ["tcp", "udp", "protocol"]
  },
  {
    term: "firewall",
    category: "network",
    sv: "En säkerhetsbarriär som filtrerar nätverkstrafik baserat på regler.",
    en: "A security barrier that filters network traffic based on rules.",
    story: "Kl 05:20 hittade Kira problemet: någon hade uppdaterat brandväggsreglerna och blockerat kassaappen. 'Brandväggen är en checkpoint. Trafik som inte matchar reglerna stoppas.' 'Vem satte reglerna?' 'Din IT-person. Från 2019. Som inte jobbar här längre.' Lång paus. Marco: 'Jag bör anställa Kiras motsvarighet för nätverket.' 'Du har precis gjort det,' sa Kira.",
    related: ["protocol", "port", "server"]
  },
  {
    term: "server",
    category: "network",
    sv: "En dator som tillhandahåller tjänster eller resurser till andra datorer (klienter).",
    en: "A computer that provides services or resources to other computers (clients).",
    story: "Kl 05:25 kopplade kassaterminalen upp igen. I backoffice surrade servern tyst och hanterade varje order, sparade varje kvitto. 'Den jobbar i bakgrunden,' sa Kira. 'Tar emot förfrågningar. Levererar.' Marco tittade på den stängda dörren. 'Som en förberedelseassistent som ingen ser men alla är beroende av.' 'Exakt som det.'",
    related: ["client", "ip_address", "port"]
  },
  {
    term: "client",
    category: "network",
    sv: "En dator eller program som begär tjänster från en server.",
    en: "A computer or program that requests services from a server.",
    story: "Varje surfplatta i matsalen. Varje telefon servitrisen använde. Varje kassaterminal. Alla klienter — skickade förfrågningar till servern och väntade på svar. 'Servern springer inte runt,' sa Kira. 'Klienter kommer till den.' Marco tänkte på gästerna vid borden. 'Alltså är gästerna också klienter.' 'I ordets alla bemärkelser,' sa hon.",
    related: ["server", "protocol", "ip_address"]
  },

  // ── UX ───────────────────────────────────────────────────────────
  {
    term: "user_story",
    category: "ux",
    sv: "En kort beskrivning av ett behov ur användarens perspektiv: 'Som X vill jag Y för att Z.'",
    en: "A short description of a need from the user's perspective: 'As X I want Y so that Z.'",
    story: "Kl 07:30 satt Marco och Kira och åt rester av tarte tatin. Kira öppnade sin anteckningsbok. 'Som gäst med nötallergi vill jag se allergeninformation på menyn för att kunna beställa utan ångest.' Marco läste det. 'Det är inte en teknisk spec.' 'Nej. Det är en user story. Behovet, målet, anledningen — ur användarens perspektiv.' Han tänkte på bordet som skickat tillbaka amuse-bouchen kl 02:00.",
    related: ["persona", "wireframe", "usability"]
  },
  {
    term: "wireframe",
    category: "ux",
    sv: "En grov skiss av ett gränssnitts layout – utan färg eller slutlig design.",
    en: "A rough sketch of an interface's layout – without color or final design.",
    story: "Kira drog upp en anteckningssida täckt av grova rutor och linjer. 'Så här skulle bordslayouten se ut om jag designade den som en app.' Ingen detalj. Inga etiketter. Bara struktur. 'Som ett grovt receptkort utan mängder,' sa Marco. 'Exakt. Formen på saken innan saken.' Han tittade på sina egna skisser från när han ritade köket. 'Jag har gjort UX. Utan att veta om det.'",
    related: ["prototype", "user_story", "affordance"]
  },
  {
    term: "prototype",
    category: "ux",
    sv: "En testbar version av en design – kan vara enkel (papper) eller interaktiv (digital).",
    en: "A testable version of a design – can be simple (paper) or interactive (digital).",
    story: "'Innan det stora cateringkontraktet körde du en testservice för 20 personer,' sa Kira. 'Du ville hitta problemen innan de dök upp inför 400 gäster.' Marco nickade långsamt. 'Det var en prototyp.' 'Du har varit UX-designer hela tiden, Marco.' Han pekade på tarte tatinen. 'Överskrid inte.'",
    related: ["wireframe", "usability", "user_story"]
  },
  {
    term: "usability",
    category: "ux",
    sv: "Hur lätt och effektivt ett system kan användas av sin målgrupp för att nå ett mål.",
    en: "How easily and efficiently a system can be used by its intended users to achieve a goal.",
    story: "'Kan en ny kock navigera ditt kök på sin första kväll utan att fråga?' frågade Kira. 'Är allt märkt? Nåbart? Logiskt?' Marco tittade runt. Märkta behållare. Organiserade stationer. Tydligt flöde från förberedelse till lucka. 'Det är usability,' sa hon. 'Hur enkelt någon kan använda ett system för att nå sitt mål.' Han sa ingenting men tog anteckningar.",
    related: ["heuristic", "accessibility", "persona", "affordance"]
  },
  {
    term: "heuristic",
    category: "ux",
    sv: "En tumregel för god UX – t.ex. Nielsens 10 heuristiker som synlighet, återhämtning, konsistens.",
    en: "A rule of thumb for good UX – e.g. Nielsen's 10 heuristics like visibility, recovery, consistency.",
    story: "'Nielsens regler för gränssnitt,' sa Kira. 'Synlighet, felåterhämtning, konsekvens.' Marco läste listan. 'Synlighet: gästerna ska alltid veta vilken fas i måltiden de är i. Felåterhämtning: om vi tar en order fel finns det en väg tillbaka. Konsekvens: varje bord får samma standard.' 'Du applicerade precis tre heuristiker på restaurangservice.' 'Naturligtvis,' sa han. 'Regler är bra.'",
    related: ["usability", "affordance", "user_story"]
  },
  {
    term: "persona",
    category: "ux",
    sv: "En fiktiv men databaserad representation av en typisk användare i målgruppen.",
    en: "A fictional but data-based representation of a typical user in the target group.",
    story: "'Innan du designade menyn, vem designade du den för?' frågade Kira. Marco beskrev stamgästen: sent 40-tal, jobbar nära, representationskonto, bryr sig om ursprung, hatar gimmicks. 'Det är en persona,' sa Kira. 'En fiktiv men datadrivet typisk användare.' Marco: 'Han är inte fiktiv. Han heter Bertil.' 'Bertil är personan gjord kött. Vilket är ovanligt men effektivt.'",
    related: ["user_story", "usability"]
  },
  {
    term: "affordance",
    category: "ux",
    sv: "Hur ett objekt signalerar sin funktion – en knapp ser ut att tryckas på, ett handtag att dras.",
    en: "How an object signals its function – a button looks like it should be pressed, a handle like it should be pulled.",
    story: "Kökets svängdörr hade ett handtag på varje sida, formade olika: en platt tryckskylt på ena sidan, ett draghandtag på andra. Man förväxlade dem aldrig. 'Det är affordance,' sa Kira. 'Designen talar om vad man ska göra utan ord.' Marco: 'Jag installerade de dörrarna för åtta år sedan.' 'Och ingen har kolliderat med någon som kommer åt andra hållet?' Han tänkte. 'Nej.' 'Det är bra UX.' Han åt upp tarte tatinen i tystnad.",
    related: ["heuristic", "usability", "wireframe"]
  },
  {
    term: "accessibility",
    category: "ux",
    sv: "Hur tillgänglig en tjänst är för alla – inklusive personer med funktionsvariationer.",
    en: "How accessible a service is for everyone – including people with disabilities.",
    story: "'Menyn hade en teckenstorlek,' sa Kira. 'Och bara utskriven — ingen stor-teckens version.' Marco grimacerade. 'Bertils fru har makuladegeneration.' 'Exakt. Tillgänglighet är inte speciallösning. Det är design för alla. Om det fungerar för den som behöver det mest, fungerar det bättre för alla.' Han började skriva. 'Jag har saker att fixa,' sa han. 'Ja,' sa Kira. 'Men inte i natt.'",
    related: ["usability", "heuristic", "persona"]
  }
];

export const VR_ITEMS: VRItem[] = [
  // Passage A: Distansarbete
  {
    id: "vr-a1",
    passage: "En undersökning från 2023 visar att 42 procent av svenska kontorsarbetare arbetar på distans minst en dag i veckan. Arbetsgivare inom IT-sektorn erbjuder distansarbete i störst utsträckning, följt av finansbranschen. Studien omfattade drygt 4 000 respondenter och genomfördes av ett oberoende forskningsinstitut. Bland de tillfrågade uppgav 67 procent att möjligheten till distansarbete är viktig när de väljer arbetsgivare. Undersökningen visade inte på några signifikanta skillnader mellan män och kvinnor i frågan om preferenser för distansarbete.",
    statement: "Majoriteten av svenska kontorsarbetare arbetar på distans minst en dag i veckan.",
    answer: "Falskt",
    trap: "Kvantifikatorfällan",
    explanation: "Texten säger att 42 procent arbetar på distans minst en dag i veckan. 42 procent är inte en majoritet (>50 %). Det är en vanlig fälla att läsa 'stor andel' som 'majoritet'.",
    relevant_sentence: "42 procent av svenska kontorsarbetare arbetar på distans minst en dag i veckan."
  },
  {
    id: "vr-a2",
    passage: "En undersökning från 2023 visar att 42 procent av svenska kontorsarbetare arbetar på distans minst en dag i veckan. Arbetsgivare inom IT-sektorn erbjuder distansarbete i störst utsträckning, följt av finansbranschen. Studien omfattade drygt 4 000 respondenter och genomfördes av ett oberoende forskningsinstitut. Bland de tillfrågade uppgav 67 procent att möjligheten till distansarbete är viktig när de väljer arbetsgivare. Undersökningen visade inte på några signifikanta skillnader mellan män och kvinnor i frågan om preferenser för distansarbete.",
    statement: "Möjligheten till distansarbete är en faktor som påverkar hur många väljer arbetsgivare.",
    answer: "Sant",
    explanation: "Texten uppger explicit att 67 procent av de tillfrågade anser möjligheten till distansarbete vara viktig vid val av arbetsgivare. Påståendet stämmer direkt med denna uppgift.",
    relevant_sentence: "Bland de tillfrågade uppgav 67 procent att möjligheten till distansarbete är viktig när de väljer arbetsgivare."
  },
  {
    id: "vr-a3",
    passage: "En undersökning från 2023 visar att 42 procent av svenska kontorsarbetare arbetar på distans minst en dag i veckan. Arbetsgivare inom IT-sektorn erbjuder distansarbete i störst utsträckning, följt av finansbranschen. Studien omfattade drygt 4 000 respondenter och genomfördes av ett oberoende forskningsinstitut. Bland de tillfrågade uppgav 67 procent att möjligheten till distansarbete är viktig när de väljer arbetsgivare. Undersökningen visade inte på några signifikanta skillnader mellan män och kvinnor i frågan om preferenser för distansarbete.",
    statement: "Distansarbete leder till ökad produktivitet.",
    answer: "Kan ej avgöras",
    trap: "Verklighetsknappen",
    explanation: "Texten nämner ingenting om produktivitet. Påståendet kan vara sant i verkligheten, men texten ger inga belägg åt något håll. Svaret måste baseras enbart på vad texten faktiskt säger.",
    relevant_sentence: "— (ingen relevant mening — texten tar inte upp produktivitet)"
  },

  // Passage B: Havsförsurning
  {
    id: "vr-b1",
    passage: "Havets pH-värde har sjunkit med 0,1 enheter sedan den industriella revolutionen, vilket motsvarar en 26-procentig ökning av surhetsgraden. Försurningen beror på att havet absorberar koldioxid från atmosfären. Effekterna drabbar framför allt organismer med kalkskal, som koraller, musslor och vissa planktonarter. Forskning visar att korallrev riskerar att lösas upp om pH-värdet sjunker ytterligare. Havet absorberar i dag ungefär en tredjedel av de koldioxidutsläpp som människor orsakar.",
    statement: "Havet absorberar mer koldioxid än det avger.",
    answer: "Kan ej avgöras",
    trap: "Implikationsfällan",
    explanation: "Texten säger att havet absorberar koldioxid och en tredjedel av mänskliga utsläpp. Men huruvida det absorberar mer än det avger framgår inte. Det känns som om det borde stämma — men det är en implikation, inte ett uttryckligt påstående i texten.",
    relevant_sentence: "Havet absorberar i dag ungefär en tredjedel av de koldioxidutsläpp som människor orsakar."
  },
  {
    id: "vr-b2",
    passage: "Havets pH-värde har sjunkit med 0,1 enheter sedan den industriella revolutionen, vilket motsvarar en 26-procentig ökning av surhetsgraden. Försurningen beror på att havet absorberar koldioxid från atmosfären. Effekterna drabbar framför allt organismer med kalkskal, som koraller, musslor och vissa planktonarter. Forskning visar att korallrev riskerar att lösas upp om pH-värdet sjunker ytterligare. Havet absorberar i dag ungefär en tredjedel av de koldioxidutsläpp som människor orsakar.",
    statement: "Koraller påverkas inte av havsförsurning.",
    answer: "Falskt",
    explanation: "Texten anger att effekterna 'drabbar framför allt organismer med kalkskal, som koraller'. Påståendet att koraller inte påverkas är direkt motsagt av texten.",
    relevant_sentence: "Effekterna drabbar framför allt organismer med kalkskal, som koraller, musslor och vissa planktonarter."
  },
  {
    id: "vr-b3",
    passage: "Havets pH-värde har sjunkit med 0,1 enheter sedan den industriella revolutionen, vilket motsvarar en 26-procentig ökning av surhetsgraden. Försurningen beror på att havet absorberar koldioxid från atmosfären. Effekterna drabbar framför allt organismer med kalkskal, som koraller, musslor och vissa planktonarter. Forskning visar att korallrev riskerar att lösas upp om pH-värdet sjunker ytterligare. Havet absorberar i dag ungefär en tredjedel av de koldioxidutsläpp som människor orsakar.",
    statement: "Havsförsurningen har pågått sedan den industriella revolutionen.",
    answer: "Sant",
    explanation: "Texten anger direkt att pH-värdet 'har sjunkit med 0,1 enheter sedan den industriella revolutionen'. Påståendet stämmer exakt med textens uppgift.",
    relevant_sentence: "Havets pH-värde har sjunkit med 0,1 enheter sedan den industriella revolutionen."
  },

  // Passage C: Läsvanor
  {
    id: "vr-c1",
    passage: "Enligt Nordicom-Sveriges mediebarometer 2023 läste 51 procent av Sveriges befolkning en tryckt bok under den senaste veckan, en minskning från 58 procent år 2018. Ljudbokslyssnandet har däremot ökat kraftigt och nådde 29 procent samma år. Ungdomar mellan 15 och 24 år lyssnar på ljudböcker i störst utsträckning av alla åldersgrupper. Biblioteksbesöken har minskat generellt, men digitala lån via Libby och liknande tjänster har ökat med 45 procent sedan 2020.",
    statement: "Fler svenskar läste tryckta böcker 2023 än 2018.",
    answer: "Falskt",
    explanation: "Texten anger att andelen som läste tryckt bok var 51 procent 2023, ned från 58 procent 2018. Det är en minskning. Påståendet är direkt motsagt av siffrorna.",
    relevant_sentence: "51 procent av Sveriges befolkning läste en tryckt bok under den senaste veckan, en minskning från 58 procent år 2018."
  },
  {
    id: "vr-c2",
    passage: "Enligt Nordicom-Sveriges mediebarometer 2023 läste 51 procent av Sveriges befolkning en tryckt bok under den senaste veckan, en minskning från 58 procent år 2018. Ljudbokslyssnandet har däremot ökat kraftigt och nådde 29 procent samma år. Ungdomar mellan 15 och 24 år lyssnar på ljudböcker i störst utsträckning av alla åldersgrupper. Biblioteksbesöken har minskat generellt, men digitala lån via Libby och liknande tjänster har ökat med 45 procent sedan 2020.",
    statement: "Minskningen av biblioteksbesök beror på att digitala lån blivit populärare.",
    answer: "Kan ej avgöras",
    trap: "Implikationsfällan",
    explanation: "Texten nämner att biblioteksbesöken minskat och att digitala lån ökat. Det är frestande att koppla ihop dem som orsak och verkan — men texten drar inte den slutsatsen explicit. Det kan finnas andra orsaker till minskningen.",
    relevant_sentence: "Biblioteksbesöken har minskat generellt, men digitala lån via Libby och liknande tjänster har ökat med 45 procent sedan 2020."
  },
  {
    id: "vr-c3",
    passage: "Enligt Nordicom-Sveriges mediebarometer 2023 läste 51 procent av Sveriges befolkning en tryckt bok under den senaste veckan, en minskning från 58 procent år 2018. Ljudbokslyssnandet har däremot ökat kraftigt och nådde 29 procent samma år. Ungdomar mellan 15 och 24 år lyssnar på ljudböcker i störst utsträckning av alla åldersgrupper. Biblioteksbesöken har minskat generellt, men digitala lån via Libby och liknande tjänster har ökat med 45 procent sedan 2020.",
    statement: "Yngre vuxna lyssnar på ljudböcker oftare än äldre åldersgrupper.",
    answer: "Sant",
    explanation: "Texten anger att ungdomar 15–24 år lyssnar på ljudböcker 'i störst utsträckning av alla åldersgrupper'. Det innebär att de lyssnar mer än äldre grupper.",
    relevant_sentence: "Ungdomar mellan 15 och 24 år lyssnar på ljudböcker i störst utsträckning av alla åldersgrupper."
  },

  // Passage D: Solenergi
  {
    id: "vr-d1",
    passage: "Installationen av solpaneler i Sverige ökade med 78 procent under 2022 jämfört med föregående år. Den snabba tillväxten drivs av sjunkande priser på solpaneler och ökade statliga bidrag. Svenska hushåll som installerar solpaneler kan sälja överskottsel till elnätet och erhålla skattereduktion. Solenergi stod 2022 för 1,3 procent av Sveriges totala elproduktion. Branschorganisationen Solar Sweden spår att andelen kan nå 10 procent år 2030 om den nuvarande tillväxttakten håller i sig.",
    statement: "Solenergi är i dag den dominerande energikällan i Sverige.",
    answer: "Falskt",
    explanation: "Texten uppger att solenergi stod för 1,3 procent av elproduktionen 2022. Det är långt ifrån dominerande. Påståendet är direkt motsagt av siffran.",
    relevant_sentence: "Solenergi stod 2022 för 1,3 procent av Sveriges totala elproduktion."
  },
  {
    id: "vr-d2",
    passage: "Installationen av solpaneler i Sverige ökade med 78 procent under 2022 jämfört med föregående år. Den snabba tillväxten drivs av sjunkande priser på solpaneler och ökade statliga bidrag. Svenska hushåll som installerar solpaneler kan sälja överskottsel till elnätet och erhålla skattereduktion. Solenergi stod 2022 för 1,3 procent av Sveriges totala elproduktion. Branschorganisationen Solar Sweden spår att andelen kan nå 10 procent år 2030 om den nuvarande tillväxttakten håller i sig.",
    statement: "Svenska hushåll kan få ekonomisk ersättning för el de producerar men inte använder själva.",
    answer: "Sant",
    explanation: "Texten anger att hushåll 'kan sälja överskottsel till elnätet' och 'erhålla skattereduktion'. Båda innebär ekonomisk ersättning för överskottet.",
    relevant_sentence: "Svenska hushåll som installerar solpaneler kan sälja överskottsel till elnätet och erhålla skattereduktion."
  },
  {
    id: "vr-d3",
    passage: "Installationen av solpaneler i Sverige ökade med 78 procent under 2022 jämfört med föregående år. Den snabba tillväxten drivs av sjunkande priser på solpaneler och ökade statliga bidrag. Svenska hushåll som installerar solpaneler kan sälja överskottsel till elnätet och erhålla skattereduktion. Solenergi stod 2022 för 1,3 procent av Sveriges totala elproduktion. Branschorganisationen Solar Sweden spår att andelen kan nå 10 procent år 2030 om den nuvarande tillväxttakten håller i sig.",
    statement: "Solenergi kommer att utgöra 10 procent av Sveriges elproduktion år 2030.",
    answer: "Kan ej avgöras",
    trap: "Implikationsfällan",
    explanation: "Texten återger Solar Swedens spådom att det 'kan nå 10 procent år 2030 om den nuvarande tillväxttakten håller i sig'. Det är en prognos med ett villkor — inte ett konstaterat faktum. Texten slår inte fast att det kommer att hända.",
    relevant_sentence: "Branschorganisationen Solar Sweden spår att andelen kan nå 10 procent år 2030 om den nuvarande tillväxttakten håller i sig."
  },

  // Passage E: Sömn
  {
    id: "vr-e1",
    passage: "En metaanalys av 72 sömnstudier publicerad i Sleep Medicine Reviews 2022 fann att vuxna som regelbundet sover färre än sex timmar per natt löper 27 procent högre risk att drabbas av hjärt-kärlsjukdomar. Rekommenderad sömntid för vuxna är sju till nio timmar per natt enligt Världshälsoorganisationen. I Sverige rapporterar 18 procent av befolkningen att de lider av sömnstörningar. Studien konstaterade också att effekterna av för lite sömn förstärks av stress och oregelbundna arbetstider.",
    statement: "Alla som sover under sex timmar per natt kommer att drabbas av hjärt-kärlsjukdomar.",
    answer: "Falskt",
    trap: "Kvantifikatorfällan",
    explanation: "Texten anger en ökad risk — 27 procent högre — inte att det är ett säkert utfall. 'Löper högre risk' är inte detsamma som 'kommer att drabbas'. Påståendets absoluta formulering ('alla ... kommer att') är direkt felaktig enligt texten.",
    relevant_sentence: "Vuxna som regelbundet sover färre än sex timmar per natt löper 27 procent högre risk att drabbas av hjärt-kärlsjukdomar."
  },
  {
    id: "vr-e2",
    passage: "En metaanalys av 72 sömnstudier publicerad i Sleep Medicine Reviews 2022 fann att vuxna som regelbundet sover färre än sex timmar per natt löper 27 procent högre risk att drabbas av hjärt-kärlsjukdomar. Rekommenderad sömntid för vuxna är sju till nio timmar per natt enligt Världshälsoorganisationen. I Sverige rapporterar 18 procent av befolkningen att de lider av sömnstörningar. Studien konstaterade också att effekterna av för lite sömn förstärks av stress och oregelbundna arbetstider.",
    statement: "WHO rekommenderar att vuxna sover minst sju timmar per natt.",
    answer: "Sant",
    explanation: "Texten anger att 'rekommenderad sömntid för vuxna är sju till nio timmar per natt enligt Världshälsoorganisationen'. Sju timmar är den nedre gränsen — 'minst sju timmar' stämmer.",
    relevant_sentence: "Rekommenderad sömntid för vuxna är sju till nio timmar per natt enligt Världshälsoorganisationen."
  },
  {
    id: "vr-e3",
    passage: "En metaanalys av 72 sömnstudier publicerad i Sleep Medicine Reviews 2022 fann att vuxna som regelbundet sover färre än sex timmar per natt löper 27 procent högre risk att drabbas av hjärt-kärlsjukdomar. Rekommenderad sömntid för vuxna är sju till nio timmar per natt enligt Världshälsoorganisationen. I Sverige rapporterar 18 procent av befolkningen att de lider av sömnstörningar. Studien konstaterade också att effekterna av för lite sömn förstärks av stress och oregelbundna arbetstider.",
    statement: "Stress är den vanligaste orsaken till sömnstörningar i Sverige.",
    answer: "Kan ej avgöras",
    trap: "Verklighetsknappen",
    explanation: "Texten nämner att stress förstärker effekterna av sömnbrist — men säger ingenting om vad som orsakar sömnstörningarna. Att stress förstärker problem är inte samma sak som att stress är den vanligaste orsaken.",
    relevant_sentence: "Studien konstaterade också att effekterna av för lite sömn förstärks av stress och oregelbundna arbetstider."
  },

  // Passage F: Urbanisering
  {
    id: "vr-f1",
    passage: "I Sverige bor i dag drygt 87 procent av befolkningen i tätorter, enligt Statistiska centralbyrån. Urbaniseringstakten har ökat sedan 1960-talet, men den snabbaste tillväxten sker i de tre storstadsregionerna Stockholm, Göteborg och Malmö. Mindre kommuner upplever befolkningsminskning i allt fler fall — 2022 minskade befolkningen i 128 av Sveriges 290 kommuner. Infrastrukturinvesteringar koncentreras i allt högre grad till växande regioner, vilket skapar utmaningar för glesbygdskommuner att upprätthålla servicenivån.",
    statement: "De flesta som lämnar landsbygden väljer att bosätta sig i Stockholm.",
    answer: "Kan ej avgöras",
    trap: "Implikationsfällan",
    explanation: "Texten anger att den snabbaste tillväxten sker i storstadsregionerna, men säger ingenting om vart de som lämnar landsbygden specifikt tar vägen. Det går inte att avgöra om Stockholm är vanligare än Göteborg eller Malmö.",
    relevant_sentence: "Den snabbaste tillväxten sker i de tre storstadsregionerna Stockholm, Göteborg och Malmö."
  },
  {
    id: "vr-f2",
    passage: "I Sverige bor i dag drygt 87 procent av befolkningen i tätorter, enligt Statistiska centralbyrån. Urbaniseringstakten har ökat sedan 1960-talet, men den snabbaste tillväxten sker i de tre storstadsregionerna Stockholm, Göteborg och Malmö. Mindre kommuner upplever befolkningsminskning i allt fler fall — 2022 minskade befolkningen i 128 av Sveriges 290 kommuner. Infrastrukturinvesteringar koncentreras i allt högre grad till växande regioner, vilket skapar utmaningar för glesbygdskommuner att upprätthålla servicenivån.",
    statement: "Mer än hälften av Sveriges kommuner minskade i befolkning under 2022.",
    answer: "Falskt",
    trap: "Kvantifikatorfällan",
    explanation: "128 av 290 kommuner minskade i befolkning. Det är 44 procent — inte mer än hälften. Enkelt att räkna: 128/290 ≈ 0,44.",
    relevant_sentence: "2022 minskade befolkningen i 128 av Sveriges 290 kommuner."
  },
  {
    id: "vr-f3",
    passage: "I Sverige bor i dag drygt 87 procent av befolkningen i tätorter, enligt Statistiska centralbyrån. Urbaniseringstakten har ökat sedan 1960-talet, men den snabbaste tillväxten sker i de tre storstadsregionerna Stockholm, Göteborg och Malmö. Mindre kommuner upplever befolkningsminskning i allt fler fall — 2022 minskade befolkningen i 128 av Sveriges 290 kommuner. Infrastrukturinvesteringar koncentreras i allt högre grad till växande regioner, vilket skapar utmaningar för glesbygdskommuner att upprätthålla servicenivån.",
    statement: "Urbaniseringen i Sverige började öka på 1960-talet.",
    answer: "Sant",
    explanation: "Texten anger att 'urbaniseringstakten har ökat sedan 1960-talet'. Det stämmer direkt med påståendet.",
    relevant_sentence: "Urbaniseringstakten har ökat sedan 1960-talet."
  },
];
