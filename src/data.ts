import type { GlossaryEntry, MockExamTemplate, Question, ResearchEvidence, Track } from "./types";

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
    story: "En märkt burk i kylen. 'salt' = 5 gram. Du kan alltid byta innehållet, men etiketten sitter kvar.",
    related: ["string", "integer", "boolean", "scope"]
  },
  {
    term: "function",
    category: "general",
    sv: "Ett namngivet kodblock som utför en uppgift och kan anropas upprepade gånger.",
    en: "A named block of code that performs a task and can be called repeatedly.",
    story: "En kokteknik på köket: 'glacera' – du definierar den en gång och anropar den för varje rätt som behöver den.",
    related: ["parameter", "return", "def", "method"]
  },
  {
    term: "class",
    category: "general",
    sv: "En mall (blueprint) som beskriver hur ett objekt ska se ut och bete sig.",
    en: "A blueprint that describes how an object should look and behave.",
    story: "Receptkortet på köket. Det beskriver vad rätten innehåller och hur den tillagas – men är inte rätten i sig.",
    related: ["object", "instance", "method", "attribute", "init"]
  },
  {
    term: "object",
    category: "general",
    sv: "En konkret instans av en klass – skapad från mallen och levande i minnet.",
    en: "A concrete instance of a class – created from the blueprint and alive in memory.",
    story: "Den färdiga rätten på tallriken. Receptkortet (klassen) är mallen; den faktiska maten framför gästen är objektet.",
    related: ["class", "instance", "attribute", "method"]
  },
  {
    term: "instance",
    category: "general",
    sv: "Ett specifikt objekt skapat från en klass. Varje instans har sina egna attributvärden.",
    en: "A specific object created from a class. Each instance holds its own attribute values.",
    story: "Varje tallrik med pasta är en instans av receptet. Tre gäster = tre instanser – samma mall, men var och en är sin.",
    related: ["class", "object", "self"]
  },
  {
    term: "method",
    category: "general",
    sv: "En funktion som tillhör ett objekt eller en klass och kan använda objektets data.",
    en: "A function that belongs to an object or class and can access the object's data.",
    story: "En teknik som bara kocken för just den rätten behärskar – 'flambera' hör till dessertavdelningen, inte till soppan.",
    related: ["function", "class", "self", "attribute"]
  },
  {
    term: "attribute",
    category: "general",
    sv: "En variabel som tillhör ett objekt och beskriver dess egenskaper.",
    en: "A variable that belongs to an object and describes its properties.",
    story: "Rättens egenskaper: temperatur, portion, allergeninfo. De hör till just den tallriken, inte till hela restaurangen.",
    related: ["object", "class", "method", "self"]
  },
  {
    term: "parameter",
    category: "general",
    sv: "En platsmarkör i en funktionsdefinition som tar emot ett värde vid anrop.",
    en: "A placeholder in a function definition that receives a value when called.",
    story: "Vad du lämnar till kocken: 'tillagningsgrad'. Kocken vet vad de ska göra med det – men det är du som bestämmer värdet.",
    related: ["argument", "function", "return"]
  },
  {
    term: "argument",
    category: "general",
    sv: "Det faktiska värdet som skickas in till en funktion när den anropas.",
    en: "The actual value passed into a function when it is called.",
    story: "Om parametern är 'tillagningsgrad', är argumentet 'medium rare'. Det konkreta värdet du skickar i stunden.",
    related: ["parameter", "function"]
  },
  {
    term: "return",
    category: "general",
    sv: "Skickar tillbaka ett värde från en funktion till den som anropade den.",
    en: "Sends a value back from a function to whoever called it.",
    story: "Rätten skickas ut från köket till gästen. return är servitrisen som bär ut tallriken – utan den stannar maten i köket.",
    related: ["function", "method"]
  },
  {
    term: "loop",
    category: "general",
    sv: "En struktur som upprepar ett kodblock flera gånger tills ett villkor uppfylls.",
    en: "A structure that repeats a block of code multiple times until a condition is met.",
    story: "Skala potatis tills hinken är tom. Kocken upprepar samma rörelse om och om igen – det är en loop.",
    related: ["for_loop", "while_loop", "iteration", "range_fn"]
  },
  {
    term: "for_loop",
    category: "general",
    sv: "En loop som itererar över en sekvens (lista, sträng, range) ett känt antal gånger.",
    en: "A loop that iterates over a sequence (list, string, range) a known number of times.",
    story: "Kocken går igenom hela beställningslistan uppifrån och ned, en rad i taget. Räknebart och förutsägbart.",
    related: ["loop", "while_loop", "iteration", "range_fn", "list"]
  },
  {
    term: "while_loop",
    category: "general",
    sv: "En loop som körs så länge ett villkor är sant – antalet iterationer är inte känt i förväg.",
    en: "A loop that runs as long as a condition is true – the number of iterations is not known in advance.",
    story: "Rör i såsen tills den tjocknar. Kocken vet inte exakt hur länge – de kollar konstant. Fortsätt = villkor sant.",
    related: ["loop", "for_loop", "conditional", "boolean"]
  },
  {
    term: "conditional",
    category: "general",
    sv: "En if/else-sats som kör olika kod beroende på om ett villkor är sant eller falskt.",
    en: "An if/else statement that runs different code depending on whether a condition is true or false.",
    story: "Vid genomgångsfönstret: om rätten är rätt temperatur skickas den ut, annars tillbaka till spisen. Beslutsögonblicket.",
    related: ["boolean", "while_loop"]
  },
  {
    term: "boolean",
    category: "general",
    sv: "Ett värde som antingen är True eller False – grunden för all logik i kod.",
    en: "A value that is either True or False – the foundation of all logic in code.",
    story: "Är ugnen varm? Ja (True) eller nej (False). Inget mittemellan. Köksbeslut kräver klara svar.",
    related: ["conditional", "while_loop"]
  },
  {
    term: "integer",
    category: "general",
    sv: "Ett heltal utan decimaler – t.ex. 3, -7, 100.",
    en: "A whole number without decimals – e.g. 3, -7, 100.",
    story: "Antal portioner på beställningen. Du kan inte beställa 2,5 gäster – det är alltid ett heltal.",
    related: ["float", "variable", "string"]
  },
  {
    term: "float",
    category: "general",
    sv: "Ett decimaltal – t.ex. 3.14, -0.5, 98.6.",
    en: "A decimal number – e.g. 3.14, -0.5, 98.6.",
    story: "Temperaturen på en stek: 63.5°C. Inte ett helt nummer – floats hanterar decimalerna i mätningar.",
    related: ["integer", "variable"]
  },
  {
    term: "string",
    category: "general",
    sv: "En sekvens av tecken (text) omsluten av citattecken – t.ex. 'hej' eller \"pasta\".",
    en: "A sequence of characters (text) wrapped in quotes – e.g. 'hej' or \"pasta\".",
    story: "Rättens namn på menyn. 'Tagliatelle al ragù' – text, inte ett nummer. Strängar är kökets etiketter.",
    related: ["variable", "f_string", "integer"]
  },
  {
    term: "list",
    category: "general",
    sv: "En ordnad samling av värden. Kan innehålla blandade typer och ändras efteråt.",
    en: "An ordered collection of values. Can hold mixed types and be modified.",
    story: "Inköpslistan på kylskåpsdörren: [mjölk, ägg, smör]. Ordnad, ändringsbar, och du kan lägga till mer.",
    related: ["dictionary", "index", "iteration", "append"]
  },
  {
    term: "dictionary",
    category: "general",
    sv: "En samling nyckel-värde-par. Varje värde nås via sin unika nyckel.",
    en: "A collection of key-value pairs. Each value is accessed via its unique key.",
    story: "Kryddskåpet: 'salt': hyllplats 3, 'peppar': hyllplats 7. Du slår upp på namn, inte på position.",
    related: ["list", "string"]
  },
  {
    term: "none",
    category: "general",
    sv: "Pythons sätt att representera 'inget värde' – en tom plats i minnet.",
    en: "Python's way of representing 'no value' – an empty slot in memory.",
    story: "En tom plats på tallriken. Inte noll portioner, inte tomrum – det är aktivt ingenting. Köket vet att den är ledig.",
    related: ["variable", "none_py"]
  },
  {
    term: "index",
    category: "general",
    sv: "Positionen för ett element i en lista eller sträng – börjar alltid på 0.",
    en: "The position of an element in a list or string – always starts at 0.",
    story: "Första rätten på menyn har index 0 – kocken räknar från noll, inte ett. Förvirrande, men konsekvent.",
    related: ["list", "string", "iteration"]
  },
  {
    term: "iteration",
    category: "general",
    sv: "Att gå igenom en samling element ett i taget – vad en loop gör.",
    en: "Going through a collection of elements one at a time – what a loop does.",
    story: "Servicepersonalen checkar av varje bord i ordning under kvällen. En runda = en iteration.",
    related: ["loop", "for_loop", "list", "index"]
  },
  {
    term: "algorithm",
    category: "general",
    sv: "En steg-för-steg-instruktion för att lösa ett problem – oberoende av programspråk.",
    en: "A step-by-step instruction for solving a problem – independent of programming language.",
    story: "Receptet i sig: hetta upp, lägg i, rör om, smaka av. En algoritm är kockens recept – inte koden, utan logiken.",
    related: ["function", "loop", "conditional"]
  },
  {
    term: "debugging",
    category: "general",
    sv: "Processen att hitta och rätta fel i kod.",
    en: "The process of finding and fixing errors in code.",
    story: "Provsmaka, identifiera problemet (för salt), korrigera. Kocken debuggar rätten innan den går ut.",
    related: ["syntax", "try_except"]
  },
  {
    term: "syntax",
    category: "general",
    sv: "Reglerna för hur kod måste skrivas – stavning, indrag, skiljetecken i ett programspråk.",
    en: "The rules for how code must be written – spelling, indentation, punctuation in a language.",
    story: "Receptets format. Om du skriver 'värm' utan att ange temperatur förstår inte kocken – syntaxfel.",
    related: ["debugging", "indent"]
  },
  {
    term: "scope",
    category: "general",
    sv: "Det område i koden där en variabel är synlig och tillgänglig.",
    en: "The area in code where a variable is visible and accessible.",
    story: "Kryddan som bara finns på kallskänken kan inte varmköket använda. Scope avgör vad som är tillgängligt var.",
    related: ["variable", "function"]
  },
  {
    term: "library",
    category: "general",
    sv: "En samling färdigskriven kod som du kan använda i ditt program.",
    en: "A collection of pre-written code you can use in your program.",
    story: "Specialistkockens receptbok, lånad från ett annat kök. Du tar in kunskapen utan att uppfinna hjulet.",
    related: ["module", "import_kw", "pip"]
  },
  {
    term: "module",
    category: "general",
    sv: "En enstaka Python-fil med återanvändbar kod – kan importeras i andra program.",
    en: "A single Python file with reusable code – can be imported into other programs.",
    story: "En specialistkock du kallar in från ett annat kök. De tar med sig sina egna verktyg och tekniker.",
    related: ["library", "import_kw"]
  },
  {
    term: "comment",
    category: "general",
    sv: "Text i koden som Python ignorerar – skriven för att förklara koden för människor.",
    en: "Text in code that Python ignores – written to explain the code to humans.",
    story: "Gula Post-it-lappar i recept-boken: 'detta är salt, inte socker!'. Kocken ser det, ugnen inte.",
    related: ["syntax", "debugging"]
  },
  {
    term: "operator",
    category: "general",
    sv: "Ett symbol som utför en operation på värden – t.ex. +, -, *, /, ==, >, and, or.",
    en: "A symbol that performs an operation on values – e.g. +, -, *, /, ==, >, and, or.",
    story: "Köksutrustning: plusset lägger ihop ingredienser, == kontrollerar om smaken är rätt, > avgör om temperaturen är tillräcklig.",
    related: ["boolean", "conditional"]
  },

  // ── Python-specifikt ─────────────────────────────────────────────
  {
    term: "def",
    category: "python",
    sv: "Nyckelordet som används för att definiera en funktion i Python.",
    en: "The keyword used to define a function in Python.",
    story: "def är skylten på köksdörren: 'Här börjar tekniken'. Allt som följer efter kolonet hör till funktionen.",
    related: ["function", "return", "parameter", "indent"]
  },
  {
    term: "self",
    category: "python",
    sv: "En referens till det aktuella objektet inuti en klassmetod – alltid första parametern.",
    en: "A reference to the current object inside a class method – always the first parameter.",
    story: "Varje kock bär ett namnmärke. self är det märket – det talar om vems tallrik, vems data, vi pratar om just nu.",
    related: ["class", "method", "attribute", "instance"]
  },
  {
    term: "init",
    category: "python",
    sv: "Konstruktorn: en speciell metod som körs automatiskt när ett nytt objekt skapas.",
    en: "The constructor: a special method that runs automatically when a new object is created.",
    story: "Det första kocken gör när en ny tallrik kommer in: lägger grundsåsen. __init__ sätter grundtillståndet.",
    related: ["class", "object", "self", "attribute"]
  },
  {
    term: "print_fn",
    category: "python",
    sv: "Inbyggd funktion som skriver ut ett värde till konsolen.",
    en: "Built-in function that writes a value to the console.",
    story: "Serveringsfönstret: print() är luckan genom vilken resultatet passerar ut till världen.",
    related: ["function", "string", "f_string"]
  },
  {
    term: "len_fn",
    category: "python",
    sv: "Inbyggd funktion som returnerar antalet element i en sekvens (lista, sträng, etc.).",
    en: "Built-in function that returns the number of elements in a sequence (list, string, etc.).",
    story: "Räkna antalet rätter på brickan. len() är kocken som snabbt bedömer hur stor beställningen är.",
    related: ["list", "string", "integer"]
  },
  {
    term: "append",
    category: "python",
    sv: "Listmetod som lägger till ett element sist i listan.",
    en: "List method that adds an element to the end of the list.",
    story: "Lägga till en ny rätt längst ned på beställningslappen. append() skjuter in elementet i kön.",
    related: ["list", "method"]
  },
  {
    term: "try_except",
    category: "python",
    sv: "Felhanteringskonstruktion: try kör koden, except fångar felet om något går fel.",
    en: "Error handling construct: try runs the code, except catches the error if something goes wrong.",
    story: "Smaka på rätten. Om smaken är fel (except), rätta till den. Om den är bra, skicka ut den. Ingen krasch.",
    related: ["raise", "debugging", "none_py"]
  },
  {
    term: "raise",
    category: "python",
    sv: "Kastar ett undantag avsiktligt – används för att signalera att något gick fel i logiken.",
    en: "Throws an exception intentionally – used to signal that something went wrong in the logic.",
    story: "Kocken skickar tillbaka beställningen med en lapp: 'Ogiltigt val – vi serverar inte det'. raise är den lappen.",
    related: ["try_except", "debugging"]
  },
  {
    term: "indent",
    category: "python",
    sv: "Indraget (4 mellanslag) som Python använder för att markera kodblock – inte valfritt.",
    en: "The indentation (4 spaces) Python uses to mark code blocks – not optional.",
    story: "Kökets hierarki på pappret: sous chef-instruktioner är indragna under chefskockens. Indragningen definierar vem som lyder vem.",
    related: ["syntax", "def", "conditional", "loop"]
  },
  {
    term: "f_string",
    category: "python",
    sv: "En formateringssträng (f'...{variabel}...') som bäddar in variabelvärden direkt i text.",
    en: "A formatting string (f'...{variable}...') that embeds variable values directly in text.",
    story: "Menytexten med gästens namn inbakat: f'Välkommen {name}!' – kökset personaliserar tallriken i farten.",
    related: ["string", "variable", "print_fn"]
  },
  {
    term: "range_fn",
    category: "python",
    sv: "Inbyggd funktion som skapar en sekvens av heltal – vanlig i for-loopar.",
    en: "Built-in function that creates a sequence of integers – common in for loops.",
    story: "Numrera borden 1–10. range(1, 11) ger en räknare som kocken loopar igenom – effektivt och precist.",
    related: ["for_loop", "integer", "iteration"]
  },
  {
    term: "import_kw",
    category: "python",
    sv: "Nyckelordet som laddar in en modul eller bibliotek i ditt Python-program.",
    en: "The keyword that loads a module or library into your Python program.",
    story: "Ringa in en specialistkock. import math är telefonsamtalet: 'kom hit, vi behöver dig nu'.",
    related: ["module", "library", "pip"]
  },
  {
    term: "pip",
    category: "python",
    sv: "Pythons pakethanterare – används i terminalen för att installera externa bibliotek.",
    en: "Python's package manager – used in the terminal to install external libraries.",
    story: "Beställa in ingredienser från grossisten. pip install pandas är lastbilen som kör upp paketet till köket.",
    related: ["import_kw", "library", "module"]
  },
  {
    term: "none_py",
    category: "python",
    sv: "Pythons tomvärde – None (med stort N) representerar frånvaron av ett värde.",
    en: "Python's empty value – None (capital N) represents the absence of a value.",
    story: "En tallrik utan mat. Inte 0 portioner – utan aktivt ingenting. Köket noterar platsen som ledig.",
    related: ["none", "variable", "boolean"]
  },
  {
    term: "pass_kw",
    category: "python",
    sv: "Ett nyckelord som gör ingenting – en platshållare för kod som ska skrivas senare.",
    en: "A keyword that does nothing – a placeholder for code to be written later.",
    story: "En tom lucka i receptet med en Post-it: 'att göra'. pass säger: koden är inte klar men syntaxen håller.",
    related: ["syntax", "def", "class"]
  },

  // ── Nätverk / Network ────────────────────────────────────────────
  {
    term: "ip_address",
    category: "network",
    sv: "En unik numerisk adress som identifierar en enhet på ett nätverk.",
    en: "A unique numeric address that identifies a device on a network.",
    story: "Restaurangens gatuadress. Utan den vet leveransen inte vart paketet ska. IP är nätverkets adresslapp.",
    related: ["dns", "protocol", "server"]
  },
  {
    term: "dns",
    category: "network",
    sv: "Domain Name System – översätter domännamn (t.ex. google.com) till IP-adresser.",
    en: "Domain Name System – translates domain names (e.g. google.com) to IP addresses.",
    story: "Telefonkatalogen för internet. Du slår upp 'restaurangen' och får adressen. DNS är uppslaget.",
    related: ["ip_address", "protocol"]
  },
  {
    term: "tcp",
    category: "network",
    sv: "Transmission Control Protocol – tillförlitligt protokoll som garanterar leveransordning.",
    en: "Transmission Control Protocol – reliable protocol that guarantees delivery order.",
    story: "Beställningar med kvittens. Varje rätt bekräftas som levererad. Inget försvinner – men det tar lite längre tid.",
    related: ["udp", "protocol", "packet"]
  },
  {
    term: "udp",
    category: "network",
    sv: "User Datagram Protocol – snabbt men otillförlitligt – ingen garanti för leverans.",
    en: "User Datagram Protocol – fast but unreliable – no delivery guarantee.",
    story: "Kocken skriker rätterna ut i salen och hoppas att servitrisen hör. Snabbt, men vissa rätter kan missas.",
    related: ["tcp", "protocol", "packet"]
  },
  {
    term: "port",
    category: "network",
    sv: "Ett nummer (0-65535) som identifierar vilken tjänst eller applikation data är avsedd för.",
    en: "A number (0-65535) that identifies which service or application data is intended for.",
    story: "Restaurangens bakdörr för leveranser. Port 80 = hovrätten, Port 443 = säkra leveranser. Varje dörr har ett syfte.",
    related: ["protocol", "server", "tcp"]
  },
  {
    term: "protocol",
    category: "network",
    sv: "En uppsättning regler som styr hur datorer kommunicerar med varandra.",
    en: "A set of rules that governs how computers communicate with each other.",
    story: "Kökets kommunikationsregler: kocken säger 'service!' och servitrisen svarar 'oui chef!'. Alla förstår systemet.",
    related: ["tcp", "udp", "dns"]
  },
  {
    term: "packet",
    category: "network",
    sv: "En liten dataenhet som skickas över nätverket – stora meddelanden delas upp i paket.",
    en: "A small unit of data sent over a network – large messages are split into packets.",
    story: "Varje maträtt är ett paket. En stor order delas upp: förrätt, varmrätt, dessert – tre paket, samma slutmål.",
    related: ["tcp", "udp", "protocol"]
  },
  {
    term: "firewall",
    category: "network",
    sv: "En säkerhetsbarriär som filtrerar nätverkstrafik baserat på regler.",
    en: "A security barrier that filters network traffic based on rules.",
    story: "Dörrvakten vid restaurangens ingång. Kontrollerar varje gäst mot gästlistan – otillåten trafik nekas.",
    related: ["protocol", "port", "server"]
  },
  {
    term: "server",
    category: "network",
    sv: "En dator som tillhandahåller tjänster eller resurser till andra datorer (klienter).",
    en: "A computer that provides services or resources to other computers (clients).",
    story: "Köket i restaurangen. Det arbetar i bakgrunden, tar emot beställningar från salen och levererar resultat.",
    related: ["client", "ip_address", "port"]
  },
  {
    term: "client",
    category: "network",
    sv: "En dator eller program som begär tjänster från en server.",
    en: "A computer or program that requests services from a server.",
    story: "Gästen vid bordet. De beställer (skickar en request) och väntar på att köket (servern) levererar.",
    related: ["server", "protocol", "ip_address"]
  },

  // ── UX ───────────────────────────────────────────────────────────
  {
    term: "user_story",
    category: "ux",
    sv: "En kort beskrivning av ett behov ur användarens perspektiv: 'Som X vill jag Y för att Z.'",
    en: "A short description of a need from the user's perspective: 'As X I want Y so that Z.'",
    story: "Gästens önskemål på beställningslappen. Inte tekniska detaljer – bara: vem vill ha vad och varför.",
    related: ["persona", "wireframe", "usability"]
  },
  {
    term: "wireframe",
    category: "ux",
    sv: "En grov skiss av ett gränssnitts layout – utan färg eller slutlig design.",
    en: "A rough sketch of an interface's layout – without color or final design.",
    story: "Köksstaffliets grundritning. Tomma rutor och linjer som visar var ugnar, bänkar och hyllor ska sitta – ingen finish.",
    related: ["prototype", "user_story", "affordance"]
  },
  {
    term: "prototype",
    category: "ux",
    sv: "En testbar version av en design – kan vara enkel (papper) eller interaktiv (digital).",
    en: "A testable version of a design – can be simple (paper) or interactive (digital).",
    story: "Testköket: en labb-version av restaurangen byggd för att prova idéer innan den riktiga köket byggs.",
    related: ["wireframe", "usability", "user_story"]
  },
  {
    term: "usability",
    category: "ux",
    sv: "Hur lätt och effektivt ett system kan användas av sin målgrupp för att nå ett mål.",
    en: "How easily and efficiently a system can be used by its intended users to achieve a goal.",
    story: "Hur intuitivt kökets layout är för en ny kock. Hittar de allt snabbt? Gör de färre misstag? Det är usability.",
    related: ["heuristic", "accessibility", "persona", "affordance"]
  },
  {
    term: "heuristic",
    category: "ux",
    sv: "En tumregel för god UX – t.ex. Nielsens 10 heuristiker som synlighet, återhämtning, konsistens.",
    en: "A rule of thumb for good UX – e.g. Nielsen's 10 heuristics like visibility, recovery, consistency.",
    story: "Kökets gyllene regler på anslagstavlan. Inte lagar – men om du bryter dem märker gästerna alltid av det.",
    related: ["usability", "affordance", "user_story"]
  },
  {
    term: "persona",
    category: "ux",
    sv: "En fiktiv men databaserad representation av en typisk användare i målgruppen.",
    en: "A fictional but data-based representation of a typical user in the target group.",
    story: "Stamgästen du designar menyn för. Inte en verklig person – men byggd på riktiga beteendemönster.",
    related: ["user_story", "usability"]
  },
  {
    term: "affordance",
    category: "ux",
    sv: "Hur ett objekt signalerar sin funktion – en knapp ser ut att tryckas på, ett handtag att dras.",
    en: "How an object signals its function – a button looks like it should be pressed, a handle like it should be pulled.",
    story: "Dörrhandtaget på köket. Om det är runt signalerar det 'vrid', om det är platt signalerar det 'tryck'. Affordance = det uppenbart rätta sättet.",
    related: ["heuristic", "usability", "wireframe"]
  },
  {
    term: "accessibility",
    category: "ux",
    sv: "Hur tillgänglig en tjänst är för alla – inklusive personer med funktionsvariationer.",
    en: "How accessible a service is for everyone – including people with disabilities.",
    story: "Rampen vid köksbacken, punktskrift på menyn, tydliga kontraster. Tillgänglighet är design för alla, inte bara de typiska.",
    related: ["usability", "heuristic", "persona"]
  }
];
