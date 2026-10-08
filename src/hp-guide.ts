// HP-guiden: strategiråd inför högskoleprovet, som data — visas både som
// flashcards (snabb repetition) och som lång översiktssida.
// Innehållet är kortat/omskrivet från docs/HP-GUIDE.md och docs/HP-LAS-SPEC.md
// (avsnittet "Guide: bli bättre på svensk läsförståelse"). Källor finns i respektive md-fil.

import { HP_NAMES } from "./hp-names";

export type HpGuideCategoryId =
  | "viktigast"
  | "plan"
  | "las"
  | "ord"
  | "mek"
  | "elf"
  | "xyz"
  | "kva"
  | "nog"
  | "dtk"
  | "adhd"
  | "provdagen"
  | "misstag";

export interface HpGuideCategoryInfo {
  id: HpGuideCategoryId;
  /** Kort etikett för filter-chips. */
  shortLabel: string;
  /** Fullständigt namn, visas på korten. */
  label: string;
}

/** Ordning styr både filter-chips och sektionsordning på översiktssidan. */
export const HP_GUIDE_CATEGORIES: HpGuideCategoryInfo[] = [
  { id: "viktigast", shortLabel: "Viktigast", label: "De 7 viktigaste råden" },
  { id: "plan", shortLabel: "Plan", label: "Plan — sista 3 veckorna" },
  { id: "las", shortLabel: HP_NAMES.LÄS.short, label: HP_NAMES.LÄS.full },
  { id: "ord", shortLabel: HP_NAMES.ORD.short, label: HP_NAMES.ORD.full },
  { id: "mek", shortLabel: HP_NAMES.MEK.short, label: HP_NAMES.MEK.full },
  { id: "elf", shortLabel: HP_NAMES.ELF.short, label: HP_NAMES.ELF.full },
  { id: "xyz", shortLabel: HP_NAMES.XYZ.short, label: HP_NAMES.XYZ.full },
  { id: "kva", shortLabel: HP_NAMES.KVA.short, label: HP_NAMES.KVA.full },
  { id: "nog", shortLabel: HP_NAMES.NOG.short, label: HP_NAMES.NOG.full },
  { id: "dtk", shortLabel: HP_NAMES.DTK.short, label: HP_NAMES.DTK.full },
  { id: "adhd", shortLabel: "ADHD", label: "ADHD-anpassningar" },
  { id: "provdagen", shortLabel: "Provdagen", label: "Provdagen" },
  { id: "misstag", shortLabel: "Misstag", label: "Vanliga misstag" }
];

/** Läsförståelsestrategin för en långsam läsare (beslut 2026-10-08 (2)). Gäller svensk och engelsk läsförståelse.
 *  Används i Strategi-panelen, introskärmen "Så läser du" och som kort i guiden. */
export const HP_LAS_STRATEGY = {
  title: "Läs inte texten — leta i den.",
  steps: [
    "Läs frågan först och ta ut ETT nyckelord.",
    "Sökläs: låt blicken glida tills du hittar nyckelordet.",
    "Läs bara 2–3 meningar runt stället.",
    "Stryk fel alternativ: för starkt, motsatsen eller står inte i texten.",
    "Detaljfrågor först. \"Vad handlar texten om\" tar du sist: läs då första och sista stycket.",
    "Max 2 minuter per fråga, sedan gissar du och går vidare. Det finns inga minuspoäng."
  ],
  focus: "Följ raden med pennan eller fingret och ha alltid frågan \"vad letar jag efter?\" i huvudet.",
  /** Kort påminnelse ovanför frågan de första passen. */
  nudge: "Nyckelord → leta → läs 2–3 meningar"
} as const;

export interface HpGuideCard {
  id: string;
  kategori: HpGuideCategoryId;
  /** Max ~6 ord. */
  rubrik: string;
  /** 1–2 meningar: så gör du. */
  gorSaHar: string;
  /** 1 mening: varför det funkar. */
  varfor: string;
  /** Kort källhänvisning, valfri. */
  kalla?: string;
}

export const HP_GUIDE_CARDS: HpGuideCard[] = [
  // ── Viktigast ──
  {
    id: "viktigast-tid",
    kategori: "viktigast",
    rubrik: "Öva på tid, inte teori",
    gorSaHar: "Sitt med klocka på gamla prov i stället för att bara läsa om teori.",
    varfor: "Tidspress är det som skiljer 2,0-resultat från resten.",
    kalla: "Flashback-veteraner"
  },
  {
    id: "viktigast-teknik",
    kategori: "viktigast",
    rubrik: "Provteknik slår kunskap",
    gorSaHar: "Uteslut uppenbart fel alternativ och lär dig när du ska gissa och gå vidare.",
    varfor: "Teknik ger fler poäng än att kunna allt.",
    kalla: "hpguiden.se"
  },
  {
    id: "viktigast-gissa",
    kategori: "viktigast",
    rubrik: "Gissa alltid, aldrig blankt",
    gorSaHar: "Fyll alltid i ett svar, även när du är osäker.",
    varfor: "Inga minuspoäng — ett blankt svar är alltid sämre än en gissning.",
    kalla: "hpguiden.se"
  },
  {
    id: "viktigast-ordning",
    kategori: "viktigast",
    rubrik: "Gör delproven i din ordning",
    gorSaHar: "Börja med det du är snabbast/säkrast på, inte häftets ordning.",
    varfor: "Sparar tid och mental energi till det som är svårast för dig (svensk läsförståelse).",
    kalla: "Flashback, hpspelet.se"
  },
  {
    id: "viktigast-kort-dagligt",
    kategori: "viktigast",
    rubrik: "Kort och dagligt slår långt",
    gorSaHar: "Träna 30–60 min varje dag hellre än ett femtimmarspass en gång i veckan.",
    varfor: "Ger bättre resultat och passar bättre med ADHD.",
    kalla: "hpspelet.se"
  },
  {
    id: "viktigast-svagaste",
    kategori: "viktigast",
    rubrik: "Fokusera på svagaste delproven",
    gorSaHar: "Lägg mest tid på dina svagaste 2–3 delprov, inte jämnt över alla åtta.",
    varfor: "Störst poängvinst kommer där du har mest att vinna.",
    kalla: "hpspelet.se"
  },
  {
    id: "viktigast-somn",
    kategori: "viktigast",
    rubrik: "Sömn räknas över veckor",
    gorSaHar: "Prioritera bra sömn hela sista månaden, inte bara natten innan.",
    varfor: "Total sömn över tid påverkar resultatet mer än en enskild orolig natt.",
    kalla: "forskning, se HP-GUIDE.md"
  },

  // ── Plan (sista 3 veckorna) ──
  {
    id: "plan-v1",
    kategori: "plan",
    rubrik: "Vecka 1: kartlägg och rikta",
    gorSaHar: "Gör ett diagnostiskt prov för att hitta dina 2–3 svagaste delprov. Sätt en fast daglig tid.",
    varfor: "Rutin slår motivation, och du vet var du ska lägga tiden."
  },
  {
    id: "plan-v2",
    kategori: "plan",
    rubrik: "Vecka 2: tidspress och volym",
    gorSaHar: "Kör hela provpass på full tid 3–4 gånger, plus daglig träning i ordförståelse och meningskomplettering.",
    varfor: "Bygger den tempokänsla som avgör resultatet på riktiga provet."
  },
  {
    id: "plan-v3",
    kategori: "plan",
    rubrik: "Vecka 3: trappa ner",
    gorSaHar: "Sista fullständiga passet torsdag 15/10, lätt repetition fredag, ingen ny inlärning lördag 17/10.",
    varfor: "Provdagen kräver en utvilad hjärna, inte sista-minuten-stress."
  },

  // ── Svensk läsförståelse ── (strategin "Läs inte texten, leta i den", se HP_LAS_STRATEGY)
  {
    id: "las-leta",
    kategori: "las",
    rubrik: "Läs inte texten, leta i den",
    gorSaHar: "Du ska inte läsa hela texten. Ha hela tiden frågan \"vad letar jag efter?\" i huvudet.",
    varfor: "Du läser långsamt och tappar lätt fokus, och då är en sökning med ett mål lättare att hålla igång än en läsning utan mål."
  },
  {
    id: "las-nyckelord",
    kategori: "las",
    rubrik: "1. Läs frågan först",
    gorSaHar: "Läs frågan och ta ut ETT nyckelord att leta efter.",
    varfor: "Ett enda ord är lätt att hålla kvar i huvudet medan blicken glider över raderna.",
    kalla: "hpguiden.se"
  },
  {
    id: "las-soklas",
    kategori: "las",
    rubrik: "2. Sökläs",
    gorSaHar: "Låt blicken glida över texten tills du hittar nyckelordet. Följ raden med pennan eller fingret.",
    varfor: "Ögonen hittar ett ord snabbare än hjärnan hinner läsa en mening, och pennan hindrar blicken från att hoppa.",
    kalla: "hv.se"
  },
  {
    id: "las-runt-stallet",
    kategori: "las",
    rubrik: "3. Läs 2–3 meningar runt stället",
    gorSaHar: "När du hittat ordet läser du bara meningarna närmast före och efter, inte hela stycket.",
    varfor: "Svaret ligger nästan alltid i närheten av nyckelordet, och du sparar tid och energi till nästa fråga."
  },
  {
    id: "las-stryk",
    kategori: "las",
    rubrik: "4. Stryk fel alternativ",
    gorSaHar: "Stryk alternativ som är för starka (alltid, aldrig), säger motsatsen eller inte står i texten.",
    varfor: "Klassiska fällor går att känna igen, och varje struket alternativ höjer träffchansen rejält.",
    kalla: "hogskoleprovskurser.se"
  },
  {
    id: "las-detalj-forst",
    kategori: "las",
    rubrik: "5. Detaljfrågor först",
    gorSaHar: "Ta detaljfrågorna först. Frågor som \"vad handlar texten om\" tar du sist: läs då första och sista stycket.",
    varfor: "Efter detaljfrågorna har du redan rört dig i texten, och första och sista stycket brukar bära huvudtanken."
  },
  {
    id: "las-tid",
    kategori: "las",
    rubrik: "6. Max 2 minuter per fråga",
    gorSaHar: "Gå vidare efter 2 minuter: gissa och fortsätt. Det finns inga minuspoäng.",
    varfor: "En fastnad fråga kostar tid från flera andra, medan en gissning kostar ingenting.",
    kalla: "hogskoleprovskurser.se"
  },

  // ── ORD ──
  {
    id: "ord-dagligt",
    kategori: "ord",
    rubrik: "Lär dig 10–15 ord/dag",
    gorSaHar: "Lär dig 10–15 nya ord om dagen med en ordlista.",
    varfor: "Ordförståelse är det delprov som förbättras snabbast rent mekaniskt.",
    kalla: "hpspelet.se"
  },
  {
    id: "ord-uteslut",
    kategori: "ord",
    rubrik: "Uteslut säkert fel alternativ",
    gorSaHar: "Stryk alternativ du är säker på är fel innan du väljer bland resten.",
    varfor: "Höjer träffchansen när du ändå måste gissa."
  },
  {
    id: "ord-ordstam",
    kategori: "ord",
    rubrik: "Gissa på ordstammen",
    gorSaHar: "Känner du igen ett prefix/suffix eller en latinsk/grekisk rot — gissa utifrån den.",
    varfor: "Bättre träffchans än att hoppa över frågan helt."
  },

  // ── MEK ──
  {
    id: "mek-samma-ord",
    kategori: "mek",
    rubrik: "Ordträning hjälper även meningskomplettering",
    gorSaHar: "Samma ordträning som för ordförståelse ger effekt även på meningskomplettering.",
    varfor: "Bredare ordförråd hjälper dig fylla i luckan rätt."
  },
  {
    id: "mek-hela-meningen",
    kategori: "mek",
    rubrik: "Läs hela meningen först",
    gorSaHar: "Läs hela meningen innan du väljer, inte bara fram till luckan.",
    varfor: "Ledtrådar finns ofta efter luckan, inte bara före."
  },
  {
    id: "mek-testa-alternativ",
    kategori: "mek",
    rubrik: "Testa alternativen i meningen",
    gorSaHar: "Sätt in varje alternativ och lyssna efter vad som låter naturligt på svenska.",
    varfor: "Örat fångar ofta fel som ögat missar."
  },

  // ── ELF ──
  {
    id: "elf-samma-metod",
    kategori: "elf",
    rubrik: "Samma metod som svensk läsförståelse",
    gorSaHar: "Läs frågan först, sökläs och läs bara 2–3 meningar runt stället — precis som i svensk läsförståelse.",
    varfor: "Engelsk läsförståelse har samma uppbyggnad: huvudbudskap, detalj, ord-i-sammanhang, slutsats.",
    kalla: "hpbuddy.se"
  },
  {
    id: "elf-lucktext",
    kategori: "elf",
    rubrik: "Lucktexten är ordförståelse",
    gorSaHar: "Den tredje texttypen (lucktext) testar mest engelskt ordförråd, inte läsförståelse.",
    varfor: "Träna engelska ord separat för just den delen."
  },
  {
    id: "elf-klocka",
    kategori: "elf",
    rubrik: "Öva med klocka, 22 min",
    gorSaHar: "Öva på samma tidspress som i svensk läsförståelse: 22 minuters provtid.",
    varfor: "Annars kommer tidspressen som en chock på riktiga provet."
  },

  // ── XYZ ──
  {
    id: "xyz-las-fragan",
    kategori: "xyz",
    rubrik: "Läs frågan innan du räknar",
    gorSaHar: "Identifiera vad frågan faktiskt efterfrågar innan du sätter igång att räkna i matematisk problemlösning.",
    varfor: "Undviker att du snabbt räknar ut fel sak.",
    kalla: "hpguiden.se"
  },
  {
    id: "xyz-formler",
    kategori: "xyz",
    rubrik: "Repetera vanliga formler",
    gorSaHar: "Gå igenom procent, förändringsfaktor och potenslagar.",
    varfor: "Det är de vanligast förekommande formeltyperna i matematisk problemlösning."
  },
  {
    id: "xyz-orimliga-svar",
    kategori: "xyz",
    rubrik: "Uteslut orimliga svar",
    gorSaHar: "Stryk svarsalternativ som är uppenbart för stora eller för små innan du räknar exakt.",
    varfor: "Sparar tid och fångar egna räknefel."
  },

  // ── KVA ──
  {
    id: "kva-jamfor",
    kategori: "kva",
    rubrik: "Jämför, räkna inte ut",
    gorSaHar: "Jämför storleksordning eller tecken i stället för att räkna ut exakta värden i kvantitativa jämförelser.",
    varfor: "Du behöver sällan det exakta talet i kvantitativa jämförelser.",
    kalla: "hpguiden.se"
  },
  {
    id: "kva-forenkla",
    kategori: "kva",
    rubrik: "Förenkla båda sidor först",
    gorSaHar: "Förenkla uttrycken på båda sidor så långt som möjligt innan du jämför.",
    varfor: "Gör själva jämförelsen enklare och snabbare."
  },
  {
    id: "kva-negativa-tal",
    kategori: "kva",
    rubrik: "Se upp för negativa tal och nollor",
    gorSaHar: "Dubbelkolla särskilt negativa tal och nollor.",
    varfor: "Vanligaste fällan i kvantitativa jämförelser."
  },

  // ── NOG ──
  {
    id: "nog-rakna-bara-om",
    kategori: "nog",
    rubrik: "Räkna bara om du måste",
    gorSaHar: "Avgör om informationen räcker för att lösa problemet — i kvantitativa resonemang ska du oftast inte lösa det.",
    varfor: "Kvantitativa resonemang testar om du känner igen tillräcklig information, inte facit.",
    kalla: "hpguiden.se"
  },
  {
    id: "nog-var-for-sig",
    kategori: "nog",
    rubrik: "Testa påstående 1 och 2 var för sig",
    gorSaHar: "Pröva varje påstående separat innan du kombinerar dem.",
    varfor: "Standardmetoden för att inte blanda ihop informationen."
  },
  {
    id: "nog-tidigt",
    kategori: "nog",
    rubrik: "Gör kvantitativa resonemang tidigt om du kan tekniken",
    gorSaHar: "Kvantitativa resonemang brukar vara det snabbaste kvantitativa delprovet när du kan metoden.",
    varfor: "Bra kandidat att göra tidigt i passet för att spara tid."
  },

  // ── DTK ──
  {
    id: "dtk-axlar",
    kategori: "dtk",
    rubrik: "Läs axlar och enheter först",
    gorSaHar: "Läs alltid axlar, enheter och förklaringar innan du läser av värden i diagram, tabeller och kartor.",
    varfor: "Vanligaste felkällan i diagram, tabeller och kartor.",
    kalla: "hpguiden.se"
  },
  {
    id: "dtk-hitta-snabbt",
    kategori: "dtk",
    rubrik: "Träna att hitta rätt cell snabbt",
    gorSaHar: "Öva på att snabbt hitta rätt punkt eller cell i komplexa diagram innan du räknar.",
    varfor: "Sparar tid i ett delprov som ofta tar mest tid av de kvantitativa."
  },
  {
    id: "dtk-tidsbudget",
    kategori: "dtk",
    rubrik: "Planera tidsbudgeten extra",
    gorSaHar: "Räkna med att diagram, tabeller och kartor tar mest tid av de kvantitativa delproven.",
    varfor: "Så du inte blir tidspressad i sista delprovet."
  },

  // ── ADHD ──
  {
    id: "adhd-pomodoro",
    kategori: "adhd",
    rubrik: "Pomodoro: 25 + 5",
    gorSaHar: "Kör 25 min fokus + 5 min rörelsepaus (inte mobilscroll).",
    varfor: "Fungerar bra för många med ADHD — tydlig start och slut.",
    kalla: "studybuddy.se"
  },
  {
    id: "adhd-dopaminmeny",
    kategori: "adhd",
    rubrik: "Ha en dopaminmeny redo",
    gorSaHar: "Skriv en lista med snabba energikickar (te, favoritlåt, tio armhävningar) att välja från vid dipp.",
    varfor: "Sänker tröskeln att ta sig igenom motivationsdippar.",
    kalla: "studybuddy.se"
  },
  {
    id: "adhd-korta-pass",
    kategori: "adhd",
    rubrik: "Fasta korta pass, inte långa",
    gorSaHar: "Korta dagliga pass i fasta tider slår långa oplanerade pass.",
    varfor: "Mindre beroende av att \"känna sig motiverad\".",
    kalla: "riktapsykiatri.se"
  },
  {
    id: "adhd-uhr-deadline",
    kategori: "adhd",
    rubrik: "UHR-anpassning: redan för sent",
    gorSaHar: "Anmälan/intyg för anpassat prov 18 okt stängde 18 augusti 2026 — går inte att ansöka i efterhand.",
    varfor: "Viktigt att veta: du skriver provet med ordinarie tider den 18:e.",
    kalla: "studera.nu"
  },

  // ── Provdagen ──
  {
    id: "provdagen-packa",
    kategori: "provdagen",
    rubrik: "Packa väskan kvällen innan",
    gorSaHar: "Lägg fram legitimation, kallelse, flera pennor, sudd, linjal, överstrykningspenna och fika.",
    varfor: "Minskar morgonstress och risk att glömma något."
  },
  {
    id: "provdagen-frukost",
    kategori: "provdagen",
    rubrik: "Håll frukost och koffein som vanligt",
    gorSaHar: "Ät en jämn frukost och håll din vanliga koffeindos — testa inget nytt.",
    varfor: "Provdagen är fel dag att experimentera med kroppen."
  },
  {
    id: "provdagen-utprovning",
    kategori: "provdagen",
    rubrik: "Utprövningspasset räknas inte",
    gorSaHar: "Ett av de fem passen testar bara framtida frågor — du vet inte vilket.",
    varfor: "Ett ovanligt svårt pass kan vara det, låt det inte sänka ditt självförtroende."
  },
  {
    id: "provdagen-rast",
    kategori: "provdagen",
    rubrik: "Använd rasten till återhämtning",
    gorSaHar: "Ät och koppla av på rasten i stället för att analysera hur föregående pass gick.",
    varfor: "Att älta ett pass låser bara oro inför nästa."
  },
  {
    id: "provdagen-daligt-pass",
    kategori: "provdagen",
    rubrik: "Ett dåligt pass smittar bara om du låter det",
    gorSaHar: "Andas, påminn dig att det kan vara utprövningspasset, och gå in i nästa pass som om det vore det första.",
    varfor: "Ett pass avgör inte hela dagen."
  },

  // ── Misstag ──
  {
    id: "misstag-ordning",
    kategori: "misstag",
    rubrik: "Fel ordning i häftet",
    gorSaHar: "Undvik att göra delproven i den ordning de kommer — börja med ditt starkaste.",
    varfor: "Kostar tid och energi du hellre lägger på svaga delprov.",
    kalla: "Flashback"
  },
  {
    id: "misstag-blankt",
    kategori: "misstag",
    rubrik: "Blankt svar i stället för gissning",
    gorSaHar: "Lämna aldrig ett svar blankt.",
    varfor: "Kostar poäng helt gratis eftersom det inte finns minuspoäng.",
    kalla: "hpguiden.se"
  },
  {
    id: "misstag-utan-klocka",
    kategori: "misstag",
    rubrik: "Träna utan klocka",
    gorSaHar: "Öva alltid med tidtagning, aldrig utan.",
    varfor: "Annars kommer tidspressen som en chock på riktiga provet.",
    kalla: "hpspelet.se"
  },
  {
    id: "misstag-fastna",
    kategori: "misstag",
    rubrik: "Fastna på en svår fråga",
    gorSaHar: "Gör en kvalificerad gissning och gå vidare i stället för att fastna.",
    varfor: "En fråga är inte värd att äta upp tid från flera andra.",
    kalla: "Flashback"
  },
  {
    id: "misstag-fel-ruta",
    kategori: "misstag",
    rubrik: "Markera fel i svarshäftet",
    gorSaHar: "Kontrollera att du fyller i rätt ruta, inte utanför.",
    varfor: "Felmarkeringar ger skanningsfel som kostar poäng du egentligen tog.",
    kalla: "hpguiden.se-forum"
  }
];

export function hpGuideCardsForCategory(categoryId: HpGuideCategoryId | "alla"): HpGuideCard[] {
  if (categoryId === "alla") return HP_GUIDE_CARDS;
  return HP_GUIDE_CARDS.filter((c) => c.kategori === categoryId);
}
