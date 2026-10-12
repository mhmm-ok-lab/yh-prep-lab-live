// Ordbyggen (2026-10-12): orddelar för ORD-delen. I stället för fler ord lär man sig förled, slutled och
// stammar, så att man kan gissa ungefär vad ett okänt ord betyder och stryka fel alternativ.
// Urvalet bygger på en analys av 822 riktiga ORD-frågor 2006–2021 (Språkbanken, SweSAT Synonyms,
// CC BY 4.0): latinska slutled (-era, -tion, -ens/-ans, -itet, -ism) och svenska förled/slutled
// (o-, be-, för-, till-, van-, -else, -enhet) är vanligast. Exempel märkta hp: true har förekommit som
// ORD-ord på provet. Svarsalternativen i "Knäck ordet" är egna, inte provets.
// Rena data och funktioner, ingen DOM eller localStorage.

export type OrdPartKind = "förled" | "slutled" | "stam";
export type OrdPartOrigin = "latin" | "grekiska" | "svenska";

export interface OrdExample {
  word: string;
  /** Uppdelning, t.ex. "pseudo (falsk) + nym (namn)". */
  split: string;
  meaning: string;
  /** Har förekommit som ORD-ord på högskoleprovet. */
  hp?: boolean;
}

export interface OrdPart {
  id: string;
  /** Visas, t.ex. "dys-" eller "-era". */
  part: string;
  kind: OrdPartKind;
  origin: OrdPartOrigin;
  meaning: string;
  /** Ordklass, fälla eller minnesknep. */
  note?: string;
  examples: OrdExample[];
}

export interface OrdKnack {
  id: string;
  word: string;
  split: string;
  /** Fyra egna alternativ. */
  options: [string, string, string, string];
  correct: number;
  why: string;
  hp?: boolean;
}

export const ORD_PARTS: OrdPart[] = [
  // ── Förled: svenska ──
  {
    id: "o", part: "o-", kind: "förled", origin: "svenska", meaning: "inte, motsatsen till",
    note: "Det vanligaste svenska förledet på ORD.",
    examples: [
      { word: "ogin", split: "o (inte) + gin (tillmötesgående)", meaning: "ovänlig, ovillig att hjälpa", hp: true },
      { word: "otillräknelig", split: "o (inte) + tillräknelig (ansvarig)", meaning: "inte ansvarig för sina handlingar", hp: true },
      { word: "osökt", split: "o (inte) + sökt (konstlad)", meaning: "naturlig, inte tillgjord", hp: true }
    ]
  },
  {
    id: "van", part: "van-", kind: "förled", origin: "svenska", meaning: "dålig, fel, brist på",
    examples: [
      { word: "vanmakt", split: "van (brist på) + makt", meaning: "maktlöshet", hp: true },
      { word: "vanställa", split: "van (fel) + ställa", meaning: "förvanska, göra ful", hp: true },
      { word: "vanskötsel", split: "van (dålig) + skötsel", meaning: "dålig skötsel" }
    ]
  },
  {
    id: "miss", part: "miss-", kind: "förled", origin: "svenska", meaning: "fel, dåligt, inte",
    examples: [
      { word: "missunnsam", split: "miss (inte) + unna + sam", meaning: "avundsjuk, som inte unnar andra något", hp: true },
      { word: "misstroende", split: "miss (inte) + troende (tillit)", meaning: "brist på tillit" }
    ]
  },
  {
    id: "be", part: "be-", kind: "förled", origin: "svenska", meaning: "göra till, förse med",
    note: "Gör ofta ett verb eller adjektiv av ett annat ord: rik → berika.",
    examples: [
      { word: "berika", split: "be (göra) + rik", meaning: "göra rikare" },
      { word: "behjälplig", split: "be + hjälp + lig", meaning: "hjälpsam, till hjälp", hp: true },
      { word: "befästa", split: "be (förse med) + fäste", meaning: "stärka, göra säkrare" }
    ]
  },
  {
    id: "for", part: "för-", kind: "förled", origin: "svenska", meaning: "före, eller för mycket / fel",
    note: "Två betydelser: före (föresats) eller något som gått för långt (förlegad).",
    examples: [
      { word: "förlegad", split: "för (för länge) + legad (legat)", meaning: "gammaldags, föråldrad", hp: true },
      { word: "föresats", split: "före + sats (det man satt)", meaning: "avsikt, beslut man tagit", hp: true },
      { word: "förorda", split: "för (för någon) + orda (tala)", meaning: "rekommendera", hp: true }
    ]
  },
  {
    id: "till", part: "till-", kind: "förled", origin: "svenska", meaning: "till, mot, tillägg",
    examples: [
      { word: "tillstå", split: "till + stå (stå för)", meaning: "erkänna", hp: true },
      { word: "tillgodose", split: "till godo + se", meaning: "se till att ett behov uppfylls", hp: true }
    ]
  },
  {
    id: "efter", part: "efter-", kind: "förled", origin: "svenska", meaning: "efteråt, följa",
    examples: [
      { word: "eftermäle", split: "efter + mäle (det som sägs)", meaning: "det eftervärlden säger om någon", hp: true },
      { word: "efterleva", split: "efter + leva (leva efter)", meaning: "följa regler eller löften", hp: true }
    ]
  },
  // ── Förled: grekiska ──
  {
    id: "a", part: "a-, an-", kind: "förled", origin: "grekiska", meaning: "utan, inte",
    examples: [
      { word: "anonym", split: "an (utan) + onym (namn)", meaning: "utan namn" },
      { word: "apati", split: "a (utan) + pati (känsla)", meaning: "likgiltighet, brist på känsla" },
      { word: "asymmetrisk", split: "a (inte) + symmetrisk", meaning: "inte symmetrisk, ojämn", hp: true }
    ]
  },
  {
    id: "anti", part: "anti-", kind: "förled", origin: "grekiska", meaning: "mot",
    examples: [
      { word: "antiseptisk", split: "anti (mot) + septisk (förruttnelse, infektion)", meaning: "som motverkar infektion", hp: true }
    ]
  },
  {
    id: "dys", part: "dys-", kind: "förled", origin: "grekiska", meaning: "dålig, svår, fel",
    examples: [
      { word: "dystopi", split: "dys (dålig) + topi (plats)", meaning: "skräckbild av ett framtida samhälle", hp: true },
      { word: "dyslexi", split: "dys (svår) + lexi (ord, läsning)", meaning: "läs- och skrivsvårigheter" }
    ]
  },
  {
    id: "eu", part: "eu-", kind: "förled", origin: "grekiska", meaning: "god, bra",
    note: "Motsats till dys-.",
    examples: [
      { word: "eutanasi", split: "eu (god) + tanasi (död)", meaning: "dödshjälp", hp: true },
      { word: "eufori", split: "eu (god) + fori (bära, må)", meaning: "stark lyckokänsla" }
    ]
  },
  {
    id: "pseudo", part: "pseudo-", kind: "förled", origin: "grekiska", meaning: "falsk, sken-",
    examples: [
      { word: "pseudonym", split: "pseudo (falsk) + nym (namn)", meaning: "påhittat namn, t.ex. författarnamn", hp: true },
      { word: "pseudointellektuell", split: "pseudo (falsk) + intellektuell", meaning: "som bara låtsas vara intellektuell", hp: true }
    ]
  },
  {
    id: "syn", part: "syn-, sym-", kind: "förled", origin: "grekiska", meaning: "tillsammans, med",
    examples: [
      { word: "sympati", split: "sym (med) + pati (känsla)", meaning: "medkänsla" },
      { word: "sympatisör", split: "sym (med) + pati (känsla) + sör (person)", meaning: "en som stöder en sak utan att vara medlem", hp: true },
      { word: "synkron", split: "syn (samma) + kron (tid)", meaning: "som sker samtidigt" }
    ]
  },
  {
    id: "hyper", part: "hyper-, hypo-", kind: "förled", origin: "grekiska", meaning: "hyper = över, för mycket · hypo = under",
    examples: [
      { word: "hyperkänslig", split: "hyper (för mycket) + känslig", meaning: "överdrivet känslig" },
      { word: "hypofys", split: "hypo (under) + fys (växa)", meaning: "körtel under hjärnan", hp: true }
    ]
  },
  {
    id: "poly", part: "poly-, mono-", kind: "förled", origin: "grekiska", meaning: "poly = många · mono = en",
    examples: [
      { word: "polyglott", split: "poly (många) + glott (tunga, språk)", meaning: "som talar många språk" },
      { word: "monoton", split: "mono (en) + ton", meaning: "enformig" }
    ]
  },
  // ── Förled: latin ──
  {
    id: "kon", part: "kon-, kom-, kol-, kor-", kind: "förled", origin: "latin", meaning: "tillsammans, med",
    note: "Formen anpassas efter nästa bokstav: kom-p, kol-l, kor-r.",
    examples: [
      { word: "kollaboratör", split: "kol (med) + labor (arbete) + atör", meaning: "en som samarbetar, ofta med fienden", hp: true },
      { word: "konferera", split: "kon (tillsammans) + fer (bära) + era", meaning: "överlägga, diskutera tillsammans", hp: true },
      { word: "konnotation", split: "kon (med) + notation (märkning)", meaning: "bibetydelse, det ett ord för med sig", hp: true }
    ]
  },
  {
    id: "re", part: "re-", kind: "förled", origin: "latin", meaning: "igen, tillbaka",
    examples: [
      { word: "replikera", split: "re (tillbaka) + plikera (vika)", meaning: "svara, genmäla", hp: true },
      { word: "remittera", split: "re (tillbaka, vidare) + mitt (skicka) + era", meaning: "skicka vidare, t.ex. till specialist", hp: true },
      { word: "resonans", split: "re (tillbaka) + son (ljud) + ans", meaning: "genklang, gensvar", hp: true }
    ]
  },
  {
    id: "de", part: "de-", kind: "förled", origin: "latin", meaning: "bort, ned, från",
    examples: [
      { word: "delegera", split: "de (bort) + leg (sända) + era", meaning: "lämna över en uppgift till någon annan", hp: true },
      { word: "deklassera", split: "de (ned) + klass + era", meaning: "sänka till en lägre klass eller nivå" }
    ]
  },
  {
    id: "dis", part: "dis-, di-", kind: "förled", origin: "latin", meaning: "isär, olika",
    examples: [
      { word: "dissonans", split: "dis (isär) + son (ljud) + ans", meaning: "disharmoni, oenighet", hp: true },
      { word: "diskrepans", split: "dis (isär) + krepans (spricka)", meaning: "skillnad, motsägelse", hp: true },
      { word: "disposition", split: "dis (isär) + pos (lägga) + ition", meaning: "uppläggning, plan", hp: true }
    ]
  },
  {
    id: "ex", part: "ex-, e-", kind: "förled", origin: "latin", meaning: "ut, ur",
    examples: [
      { word: "exponera", split: "ex (ut) + pon (lägga) + era", meaning: "visa upp, utsätta", hp: true },
      { word: "eminent", split: "e (ut) + minent (skjuta fram)", meaning: "framstående, utmärkt", hp: true }
    ]
  },
  {
    id: "in", part: "in-, im-, il-, ir-", kind: "förled", origin: "latin", meaning: "in ELLER inte",
    note: "Fälla: samma förled betyder två saker. inkvartera = in, illegal = inte. Läs resten av ordet.",
    examples: [
      { word: "inkvartera", split: "in (in) + kvarter (bostad) + a", meaning: "ordna logi åt", hp: true },
      { word: "implicera", split: "im (in) + plic (veckla) + era", meaning: "innebära, antyda", hp: true },
      { word: "illegal", split: "il (inte) + legal (laglig)", meaning: "olaglig" }
    ]
  },
  {
    id: "pro", part: "pro-", kind: "förled", origin: "latin", meaning: "fram, framför, för",
    examples: [
      { word: "provocera", split: "pro (fram) + voc (ropa) + era", meaning: "framkalla, reta upp", hp: true },
      { word: "procession", split: "pro (fram) + cess (gå) + ion", meaning: "högtidligt tåg", hp: true },
      { word: "progressiv", split: "pro (fram) + gress (steg) + iv", meaning: "framåtsträvande, tilltagande", hp: true }
    ]
  },
  {
    id: "pre", part: "pre-", kind: "förled", origin: "latin", meaning: "före",
    examples: [
      { word: "preferens", split: "pre (före) + fer (bära, sätta) + ens", meaning: "det man föredrar" },
      { word: "preliminär", split: "pre (före) + liminär (tröskel)", meaning: "tillfällig, inte slutgiltig" }
    ]
  },
  {
    id: "sub", part: "sub-", kind: "förled", origin: "latin", meaning: "under",
    examples: [
      { word: "subkultur", split: "sub (under) + kultur", meaning: "grupp med egen stil inom en större kultur" },
      { word: "subventionera", split: "sub (under) + vent (komma) + ionera", meaning: "stödja med pengar", hp: true }
    ]
  },
  {
    id: "trans", part: "trans-", kind: "förled", origin: "latin", meaning: "över, genom",
    examples: [
      { word: "transpirera", split: "trans (genom) + spir (andas) + era", meaning: "svettas", hp: true },
      { word: "transformera", split: "trans (över) + form + era", meaning: "omvandla" }
    ]
  },
  {
    id: "per", part: "per-", kind: "förled", origin: "latin", meaning: "genom, helt",
    examples: [
      { word: "perforera", split: "per (genom) + forera (borra)", meaning: "göra hål igenom", hp: true },
      { word: "perplex", split: "per (helt) + plex (flätad, invecklad)", meaning: "förbluffad, rådvill", hp: true }
    ]
  },
  {
    id: "ab", part: "ab-", kind: "förled", origin: "latin", meaning: "bort, från",
    examples: [
      { word: "abdikera", split: "ab (bort) + dik (säga) + era", meaning: "avsäga sig makten, avgå", hp: true },
      { word: "abrupt", split: "ab (av) + rupt (bruten)", meaning: "tvär, plötslig", hp: true }
    ]
  },
  {
    id: "ad", part: "ad-, ak-, al-", kind: "förled", origin: "latin", meaning: "till, mot",
    examples: [
      { word: "adekvat", split: "ad (till) + ekvat (lika)", meaning: "lämplig, som motsvarar behovet", hp: true },
      { word: "ackumulera", split: "ak (till) + kumul (hög) + era", meaning: "samla på hög, hopa" }
    ]
  },
  {
    id: "inter", part: "inter-, intra-", kind: "förled", origin: "latin", meaning: "inter = mellan · intra = inom",
    examples: [
      { word: "internationell", split: "inter (mellan) + nationell", meaning: "mellan länder" },
      { word: "intravenöst", split: "intra (inom) + venös (ven)", meaning: "direkt in i ett blodkärl", hp: true }
    ]
  },
  {
    id: "bi", part: "bi-, ambi-", kind: "förled", origin: "latin", meaning: "bi = två · ambi = båda",
    examples: [
      { word: "bilateral", split: "bi (två) + lateral (sida)", meaning: "tvåsidig, mellan två parter", hp: true },
      { word: "ambivalent", split: "ambi (båda) + valent (stark, värd)", meaning: "kluven, dragen åt två håll", hp: true }
    ]
  },
  {
    id: "ekvi", part: "ekvi-", kind: "förled", origin: "latin", meaning: "lika",
    examples: [
      { word: "ekvivalent", split: "ekvi (lika) + valent (värd)", meaning: "likvärdig", hp: true }
    ]
  },
  {
    id: "kontra", part: "kontra-", kind: "förled", origin: "latin", meaning: "mot",
    examples: [
      { word: "kontrahent", split: "kontra (mot) + hent (dra)", meaning: "motpart i ett avtal", hp: true },
      { word: "kontraproduktiv", split: "kontra (mot) + produktiv", meaning: "som motverkar sitt syfte" }
    ]
  },
  // ── Slutled ──
  {
    id: "era", part: "-era", kind: "slutled", origin: "latin", meaning: "verb: göra, utföra",
    note: "Vanligaste slutledet på ORD (57 av 822 ord). Svaret är då också ett verb.",
    examples: [
      { word: "rendera", split: "rend (ge tillbaka) + era", meaning: "ge, inbringa, framställa", hp: true },
      { word: "vidimera", split: "vid (se) + im + era", meaning: "intyga att en kopia stämmer", hp: true }
    ]
  },
  {
    id: "isera", part: "-isera, -ifiera", kind: "slutled", origin: "latin", meaning: "verb: göra till",
    examples: [
      { word: "popularisera", split: "popular (folklig) + isera (göra)", meaning: "göra lättillgänglig", hp: true },
      { word: "stigmatisera", split: "stigma (brännmärke) + tisera", meaning: "brännmärka, peka ut", hp: true },
      { word: "kvantifiera", split: "kvant (mängd) + ifiera (göra)", meaning: "ange i siffror", hp: true }
    ]
  },
  {
    id: "tion", part: "-tion, -ation", kind: "slutled", origin: "latin", meaning: "substantiv: handling eller resultat",
    examples: [
      { word: "stagnation", split: "stagn (stå still) + ation", meaning: "avstannande", hp: true },
      { word: "alienation", split: "alien (främmande) + ation", meaning: "främlingskap", hp: true }
    ]
  },
  {
    id: "ens", part: "-ens, -ans", kind: "slutled", origin: "latin", meaning: "substantiv: tillstånd, egenskap",
    examples: [
      { word: "indolens", split: "in (inte) + dol (smärta, bry sig) + ens", meaning: "slöhet, likgiltighet", hp: true },
      { word: "relevans", split: "relev + ans", meaning: "betydelse för saken", hp: true }
    ]
  },
  {
    id: "itet", part: "-itet", kind: "slutled", origin: "latin", meaning: "substantiv: egenskap",
    examples: [
      { word: "futilitet", split: "futil (meningslös) + itet", meaning: "meningslöshet, struntsak", hp: true },
      { word: "subtilitet", split: "subtil (fin) + itet", meaning: "finess, hårfin skillnad", hp: true }
    ]
  },
  {
    id: "ism", part: "-ism", kind: "slutled", origin: "grekiska", meaning: "substantiv: lära, hållning, riktning",
    examples: [
      { word: "fatalism", split: "fatal (öde) + ism", meaning: "tron att allt är förutbestämt", hp: true },
      { word: "eskapism", split: "eskap (fly) + ism", meaning: "verklighetsflykt", hp: true },
      { word: "arkaism", split: "arka (gammal) + ism", meaning: "ålderdomligt ord eller uttryck", hp: true }
    ]
  },
  {
    id: "ist", part: "-ist", kind: "slutled", origin: "grekiska", meaning: "substantiv: person som har en viss hållning",
    examples: [
      { word: "nihilist", split: "nihil (ingenting) + ist", meaning: "en som förnekar alla värden", hp: true },
      { word: "idealist", split: "ideal + ist", meaning: "en som drivs av ideal", hp: true }
    ]
  },
  {
    id: "adj", part: "-isk, -iv, -ell, -ent, -ant", kind: "slutled", origin: "latin", meaning: "adjektiv: som har en viss egenskap",
    note: "Ser du dessa är ordet ett adjektiv, och svaret är också ett adjektiv.",
    examples: [
      { word: "figurativ", split: "figur (bild) + ativ", meaning: "bildlig", hp: true },
      { word: "legislativ", split: "legis (lag) + lativ (bära)", meaning: "lagstiftande", hp: true },
      { word: "flagrant", split: "flagr (brinna) + ant", meaning: "uppenbar, skriande", hp: true }
    ]
  },
  {
    id: "else", part: "-else", kind: "slutled", origin: "svenska", meaning: "substantiv: känsla, händelse, handling",
    examples: [
      { word: "ingivelse", split: "ingiva + else", meaning: "plötslig idé, impuls", hp: true },
      { word: "lidelse", split: "lida + else", meaning: "stark känsla, passion", hp: true },
      { word: "förtrytelse", split: "förtryta (förarga) + else", meaning: "förargelse", hp: true }
    ]
  },
  {
    id: "enhet", part: "-het, -enhet", kind: "slutled", origin: "svenska", meaning: "substantiv: egenskap, tillstånd",
    examples: [
      { word: "benägenhet", split: "benägen + het", meaning: "tendens, lust att göra något", hp: true },
      { word: "beskaffenhet", split: "beskaffad (beskaffad) + enhet", meaning: "egenskap, kvalitet", hp: true },
      { word: "fallenhet", split: "fallen (lämpad) + het", meaning: "talang för något", hp: true }
    ]
  },
  {
    id: "adj-sv", part: "-lig, -sam, -bar, -lös", kind: "slutled", origin: "svenska", meaning: "adjektiv: -bar = går att · -lös = utan · -sam/-lig = har egenskapen",
    examples: [
      { word: "kännbar", split: "känna + bar (går att)", meaning: "märkbar", hp: true },
      { word: "trolös", split: "tro (trohet) + lös (utan)", meaning: "otrogen, svekfull", hp: true },
      { word: "samvetsgrann", split: "samvete + grann (noga)", meaning: "noggrann, plikttrogen", hp: true }
    ]
  },
  {
    id: "ad-perf", part: "-(er)ad", kind: "slutled", origin: "svenska", meaning: "adjektiv: som har blivit …",
    examples: [
      { word: "luttrad", split: "luttra (rena, härda) + d", meaning: "härdad av svåra erfarenheter", hp: true },
      { word: "deciderad", split: "decid (avgöra) + erad", meaning: "bestämd, uttalad", hp: true }
    ]
  },
  {
    id: "logi", part: "-logi, -log", kind: "slutled", origin: "grekiska", meaning: "läran om · -log = expert",
    examples: [
      { word: "antropologi", split: "antropo (människa) + logi", meaning: "läran om människan och kulturer", hp: true },
      { word: "kardiolog", split: "kardio (hjärta) + log", meaning: "hjärtläkare", hp: true },
      { word: "hippologi", split: "hippo (häst) + logi", meaning: "läran om hästar", hp: true }
    ]
  },
  {
    id: "grafi", part: "-graf, -grafi", kind: "slutled", origin: "grekiska", meaning: "skriva, beskriva, bild",
    examples: [
      { word: "demografi", split: "demo (folk) + grafi (beskrivning)", meaning: "befolkningsstatistik", hp: true },
      { word: "litografi", split: "lito (sten) + grafi", meaning: "tryck från sten", hp: true },
      { word: "stenografi", split: "steno (tät, smal) + grafi", meaning: "snabbskrift med tecken", hp: true }
    ]
  },
  {
    id: "krati", part: "-krati", kind: "slutled", origin: "grekiska", meaning: "styre, makt",
    examples: [
      { word: "demokrati", split: "demo (folk) + krati (styre)", meaning: "folkstyre" },
      { word: "byråkrati", split: "byrå (kontor) + krati (styre)", meaning: "styre genom ämbetsverk och regler" }
    ]
  },
  {
    id: "fil", part: "-fil, -fob", kind: "slutled", origin: "grekiska", meaning: "-fil = som älskar · -fob = som är rädd för",
    examples: [
      { word: "bibliofil", split: "biblio (bok) + fil (vän)", meaning: "bokälskare" },
      { word: "xenofob", split: "xeno (främling) + fob (rädsla)", meaning: "främlingsfientlig" },
      { word: "filantrop", split: "fil (vän) + antrop (människa)", meaning: "människovän, välgörare", hp: true }
    ]
  },
  // ── Stammar ──
  {
    id: "antrop", part: "antrop", kind: "stam", origin: "grekiska", meaning: "människa",
    examples: [
      { word: "filantrop", split: "fil (vän) + antrop (människa)", meaning: "välgörare", hp: true },
      { word: "antropologi", split: "antropo (människa) + logi (lära)", meaning: "läran om människan", hp: true }
    ]
  },
  {
    id: "demo", part: "demo", kind: "stam", origin: "grekiska", meaning: "folk",
    examples: [
      { word: "demografi", split: "demo (folk) + grafi", meaning: "befolkningsstatistik", hp: true },
      { word: "demagog", split: "dem (folk) + agog (ledare)", meaning: "folkförförare" }
    ]
  },
  {
    id: "kron", part: "kron", kind: "stam", origin: "grekiska", meaning: "tid",
    examples: [
      { word: "kronisk", split: "kron (tid) + isk", meaning: "långvarig" },
      { word: "anakronism", split: "ana (fel) + kron (tid) + ism", meaning: "något som hör till en annan tid" }
    ]
  },
  {
    id: "nym", part: "nym, onym", kind: "stam", origin: "grekiska", meaning: "namn",
    examples: [
      { word: "pseudonym", split: "pseudo (falsk) + nym (namn)", meaning: "påhittat namn", hp: true },
      { word: "synonym", split: "syn (med, samma) + onym (namn)", meaning: "ord med samma betydelse" }
    ]
  },
  {
    id: "top", part: "top", kind: "stam", origin: "grekiska", meaning: "plats",
    examples: [
      { word: "biotop", split: "bio (liv) + top (plats)", meaning: "naturtyp där vissa arter lever", hp: true },
      { word: "utopi", split: "u (ingen) + topi (plats)", meaning: "idealsamhälle som inte finns" }
    ]
  },
  {
    id: "fon", part: "fon", kind: "stam", origin: "grekiska", meaning: "ljud",
    examples: [
      { word: "kakofoni", split: "kako (dålig) + foni (ljud)", meaning: "oljud, missljud", hp: true },
      { word: "fonologi", split: "fono (ljud) + logi", meaning: "läran om språkljud", hp: true }
    ]
  },
  {
    id: "pati", part: "pati, pat", kind: "stam", origin: "grekiska", meaning: "känsla, lidande",
    examples: [
      { word: "apati", split: "a (utan) + pati (känsla)", meaning: "likgiltighet" },
      { word: "empati", split: "em (i) + pati (känsla)", meaning: "inlevelse i andras känslor" }
    ]
  },
  {
    id: "vent", part: "ven, vent", kind: "stam", origin: "latin", meaning: "komma",
    examples: [
      { word: "subventionera", split: "sub (under) + vent (komma) + ionera", meaning: "stödja med pengar", hp: true },
      { word: "konvention", split: "kon (tillsammans) + vent (komma) + ion", meaning: "överenskommelse, sedvänja" }
    ]
  },
  {
    id: "mitt", part: "mitt, miss", kind: "stam", origin: "latin", meaning: "skicka, släppa",
    examples: [
      { word: "remittera", split: "re (vidare) + mitt (skicka) + era", meaning: "skicka vidare", hp: true },
      { word: "kommission", split: "kom (med) + miss (skicka) + ion", meaning: "utsedd grupp med ett uppdrag", hp: true }
    ]
  },
  {
    id: "dik", part: "dik, dikt", kind: "stam", origin: "latin", meaning: "säga",
    examples: [
      { word: "diktera", split: "dikt (säga) + era", meaning: "läsa upp för nedskrivning, bestämma", hp: true },
      { word: "abdikera", split: "ab (bort) + dik (säga) + era", meaning: "avsäga sig makten", hp: true }
    ]
  },
  {
    id: "pon", part: "pon, pos", kind: "stam", origin: "latin", meaning: "lägga, sätta",
    examples: [
      { word: "exponera", split: "ex (ut) + pon (lägga) + era", meaning: "visa upp, utsätta", hp: true },
      { word: "disposition", split: "dis (isär) + pos (lägga) + ition", meaning: "uppläggning", hp: true }
    ]
  },
  {
    id: "fer", part: "fer", kind: "stam", origin: "latin", meaning: "bära",
    examples: [
      { word: "konferera", split: "kon (tillsammans) + fer (bära) + era", meaning: "överlägga", hp: true },
      { word: "preferens", split: "pre (före) + fer (bära) + ens", meaning: "det man föredrar" }
    ]
  },
  {
    id: "son", part: "son", kind: "stam", origin: "latin", meaning: "ljud, ljuda",
    examples: [
      { word: "unison", split: "uni (en) + son (ljud)", meaning: "enstämmig", hp: true },
      { word: "dissonans", split: "dis (isär) + son (ljud) + ans", meaning: "disharmoni", hp: true }
    ]
  },
  {
    id: "val", part: "val", kind: "stam", origin: "latin", meaning: "vara värd, vara stark",
    examples: [
      { word: "ekvivalent", split: "ekvi (lika) + valent (värd)", meaning: "likvärdig", hp: true },
      { word: "ambivalent", split: "ambi (båda) + valent (stark)", meaning: "kluven", hp: true }
    ]
  },
  {
    id: "vid", part: "vid, vis", kind: "stam", origin: "latin", meaning: "se",
    examples: [
      { word: "vidimera", split: "vid (se) + imera", meaning: "intyga att något stämmer", hp: true },
      { word: "visualisera", split: "visual (synlig) + isera (göra)", meaning: "göra synlig, åskådliggöra", hp: true }
    ]
  },
  {
    id: "leg", part: "leg, lex", kind: "stam", origin: "latin", meaning: "lag",
    note: "I delegera betyder leg i stället 'sända'.",
    examples: [
      { word: "legislativ", split: "legis (lag) + lativ", meaning: "lagstiftande", hp: true },
      { word: "legitim", split: "legi (lag) + tim", meaning: "laglig, berättigad" }
    ]
  }
];

/** "Knäck ordet": riktiga HP-ord med egna svarsalternativ. */
export const ORD_KNACK: OrdKnack[] = [
  { id: "k-pseudonym", word: "pseudonym", split: "pseudo (falsk) + nym (namn)", options: ["påhittat namn", "smeknamn", "släktnamn", "okänd person"], correct: 0, why: "Ett falskt namn, t.ex. när en författare skriver under annat namn.", hp: true },
  { id: "k-dystopi", word: "dystopi", split: "dys (dålig) + topi (plats)", options: ["drömsamhälle", "skräckvision av framtiden", "historisk roman", "avlägsen plats"], correct: 1, why: "En dålig plats: ett framtida samhälle som gått åt fel håll. Motsats: utopi.", hp: true },
  { id: "k-bilateral", word: "bilateral", split: "bi (två) + lateral (sida)", options: ["ensidig", "mångsidig", "tvåsidig", "jämlik"], correct: 2, why: "Två sidor: ett bilateralt avtal sluts mellan två parter.", hp: true },
  { id: "k-ambivalent", word: "ambivalent", split: "ambi (båda) + valent (stark)", options: ["kluven", "likgiltig", "bestämd", "förvirrad"], correct: 0, why: "Båda känslorna är starka samtidigt, så man dras åt två håll. Likgiltig är fällan: där finns ingen känsla alls.", hp: true },
  { id: "k-ekvivalent", word: "ekvivalent", split: "ekvi (lika) + valent (värd)", options: ["överlägsen", "likvärdig", "jämförbar i storlek", "motsatt"], correct: 1, why: "Lika värd: två saker som motsvarar varandra.", hp: true },
  { id: "k-abdikera", word: "abdikera", split: "ab (bort) + dik (säga) + era", options: ["tillträda", "avsätta någon", "avsäga sig makten", "fly landet"], correct: 2, why: "Säga bort: kungen lämnar själv tronen. Avsätta är när någon annan tar makten ifrån en.", hp: true },
  { id: "k-delegera", word: "delegera", split: "de (bort) + leg (sända) + era", options: ["lämna över uppgifter", "rösta", "förhandla", "utse ledare"], correct: 0, why: "Sända bort en uppgift till någon annan som får ansvaret.", hp: true },
  { id: "k-remittera", word: "remittera", split: "re (vidare) + mitt (skicka) + era", options: ["avvisa", "skicka vidare", "betala tillbaka", "upprepa"], correct: 1, why: "Skicka vidare, t.ex. när en läkare remitterar en patient till specialist.", hp: true },
  { id: "k-transpirera", word: "transpirera", split: "trans (genom) + spir (andas) + era", options: ["andas tungt", "svettas", "läcka ut", "förångas"], correct: 1, why: "Andas genom huden: svettas. Andas tungt är fällan, eftersom spir betyder andas.", hp: true },
  { id: "k-kakofoni", word: "kakofoni", split: "kako (dålig) + foni (ljud)", options: ["välljud", "tystnad", "oljud", "eko"], correct: 2, why: "Dåligt ljud: ett skränigt virrvarr av ljud.", hp: true },
  { id: "k-unison", word: "unison", split: "uni (en) + son (ljud)", options: ["enstämmig", "högljudd", "ensam", "oenig"], correct: 0, why: "Ett ljud: alla sjunger eller säger samma sak, enigt.", hp: true },
  { id: "k-dissonans", word: "dissonans", split: "dis (isär) + son (ljud) + ans", options: ["samklang", "missljud, oenighet", "eko", "tystnad"], correct: 1, why: "Ljud som går isär: disharmoni, och bildligt oenighet.", hp: true },
  { id: "k-eutanasi", word: "eutanasi", split: "eu (god) + tanasi (död)", options: ["dödsstraff", "självmord", "dödshjälp", "sorg"], correct: 2, why: "En god död: att hjälpa en svårt sjuk att dö.", hp: true },
  { id: "k-filantrop", word: "filantrop", split: "fil (vän) + antrop (människa)", options: ["människovän, välgörare", "människoforskare", "eremit", "politiker"], correct: 0, why: "Vän till människan: någon som skänker pengar till goda ändamål. Människoforskare = antropolog.", hp: true },
  { id: "k-antropologi", word: "antropologi", split: "antropo (människa) + logi (lära)", options: ["läran om djur", "läran om människan och kulturer", "läran om sjukdomar", "läran om historien"], correct: 1, why: "Läran om människan.", hp: true },
  { id: "k-demografi", word: "demografi", split: "demo (folk) + grafi (beskrivning)", options: ["befolkningsstatistik", "valsystem", "kartritning", "folkmusik"], correct: 0, why: "Beskrivning av folket: ålder, födslar, flyttar.", hp: true },
  { id: "k-biotop", word: "biotop", split: "bio (liv) + top (plats)", options: ["livsform", "naturtyp där vissa arter lever", "ekologisk odling", "forskningsstation"], correct: 1, why: "En plats för liv: t.ex. en sumpskog eller en sandstrand.", hp: true },
  { id: "k-vanmakt", word: "vanmakt", split: "van (brist på) + makt", options: ["maktmissbruk", "maktlöshet", "övermakt", "vrede"], correct: 1, why: "Brist på makt: känslan av att inte kunna göra något.", hp: true },
  { id: "k-ogin", word: "ogin", split: "o (inte) + gin (tillmötesgående)", options: ["ovänlig, ovillig", "osäker", "ovanlig", "otålig"], correct: 0, why: "Inte gin (tillmötesgående): ovillig att hjälpa.", hp: true },
  { id: "k-missunnsam", word: "missunnsam", split: "miss (inte) + unna + sam", options: ["snål", "avundsjuk", "misstänksam", "ovänlig"], correct: 1, why: "Som inte unnar andra något: avundsjuk. Snål gäller egna pengar, missunnsam gäller andras lycka.", hp: true },
  { id: "k-progressiv", word: "progressiv", split: "pro (fram) + gress (steg) + iv", options: ["konservativ", "framåtsträvande", "aggressiv", "långsam"], correct: 1, why: "Stega framåt: nytänkande, eller som ökar stegvis (progressiv skatt).", hp: true },
  { id: "k-exponera", word: "exponera", split: "ex (ut) + pon (lägga) + era", options: ["gömma", "förklara", "visa upp, utsätta", "överdriva"], correct: 2, why: "Lägga ut: visa upp, eller utsätta för t.ex. solljus.", hp: true },
  { id: "k-preferens", word: "preferens", split: "pre (före) + fer (bära) + ens", options: ["fördom", "det man föredrar", "förberedelse", "förmån"], correct: 1, why: "Det man sätter före annat: det man föredrar." },
  { id: "k-eskapism", word: "eskapism", split: "eskap (fly) + ism", options: ["verklighetsflykt", "rymning", "äventyrslusta", "lättja"], correct: 0, why: "En hållning att fly: fly undan vardagen in i fantasi, spel eller serier.", hp: true }
];

export interface OrdledCardState {
  /** 1 = ny/osäker, 2 = på väg, 3 = sitter. */
  box: 1 | 2 | 3;
  last: string;
}

export interface OrdledState {
  cards: Record<string, OrdledCardState>;
}

export const EMPTY_ORDLED_STATE: OrdledState = { cards: {} };

/** Delar som sitter (box 3). */
export function ordledKnownCount(state: OrdledState): number {
  return ORD_PARTS.filter((p) => state.cards[p.id]?.box === 3).length;
}

/** Ett pass flashcards: lägst box först, de som inte setts i dag före de som setts, högst `size` kort. */
export function planOrdledPass(state: OrdledState, today: string, size = 10, rand: () => number = Math.random): string[] {
  const scored = ORD_PARTS.map((p) => {
    const c = state.cards[p.id];
    const box = c?.box ?? 1;
    const seenToday = c?.last === today ? 1 : 0;
    return { id: p.id, key: box * 10 + seenToday * 5 + rand() };
  });
  return scored
    .filter((s) => (state.cards[s.id]?.box ?? 1) < 3)
    .sort((a, b) => a.key - b.key)
    .slice(0, size)
    .map((s) => s.id);
}

/** Leitner: kunde → en låda upp (en gång per dag), kunde inte → låda 1. */
export function gradeOrdled(state: OrdledState, id: string, knew: boolean, today: string): OrdledState {
  const cur = state.cards[id];
  const box = cur?.box ?? 1;
  let next: 1 | 2 | 3;
  if (!knew) next = 1;
  else if (cur?.last === today) next = box;
  else next = (Math.min(3, box + 1) as 1 | 2 | 3);
  return { cards: { ...state.cards, [id]: { box: next, last: today } } };
}

/** Ett pass "Knäck ordet": slumpad ordning och blandade alternativ, högst `size` ord. */
export function planKnackPass(size = 8, rand: () => number = Math.random): OrdKnack[] {
  return [...ORD_KNACK]
    .sort(() => rand() - 0.5)
    .slice(0, size)
    .map((k) => {
      const order = [0, 1, 2, 3].sort(() => rand() - 0.5);
      return { ...k, options: order.map((i) => k.options[i]) as OrdKnack["options"], correct: order.indexOf(k.correct) };
    });
}
