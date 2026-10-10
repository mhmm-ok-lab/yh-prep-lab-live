// HP LÄS på provnivå: egna texter (inga UHR-texter) med längd och svårighet som på högskoleprovet.
// En lång text (ca 850 ord, 4 frågor) och tre kortare (2 frågor var). Nivå: 3 lätt, 4 medel, 3 svår.
// Delas ut före de äldre LÄS-texterna (de ligger först i HP_LAS_TEXTS).
import type { HpLasOption, HpLasText } from "./hp-las";

const o = (text: string, why: string): HpLasOption => ({ text, why });

export const HP_LAS_TEXTS_HP: HpLasText[] = [
  {
    id: "las-hp-replikation",
    title: "När vetenskapen granskar sig själv",
    topic: "naturvetenskap",
    paragraphs: [
      "År 2015 redovisades resultatet av ett ovanligt samarbete. Ett par hundra psykologer från flera länder hade gemensamt försökt upprepa hundra experiment som tidigare publicerats i ansedda facktidskrifter. Upprepningarna gjordes så troget som möjligt, ofta i samråd med de ursprungliga forskarna och med större grupper av försökspersoner än i originalen. Utfallet var nedslående: bara ungefär en tredjedel av upprepningarna gav ett lika tydligt resultat som originalstudien, och de effekter som återfanns var i regel betydligt mindre än de först rapporterade. Liknande försök inom ekonomi, medicin och biologi har sedan gett varierande men sällan helt lugnande siffror. Begreppet replikationskrisen, som redan cirkulerat några år, fick därmed ett ansikte.",
      "Förklaringen är inte i första hand fusk, även om sådant förekommer. Viktigare är en rad vardagliga mekanismer som var för sig ter sig harmlösa. Tidskrifter publicerar hellre studier som visar att något har en effekt än studier som inte hittar någon, och forskare vet det. Små försöksgrupper ger slumpen stort spelrum, så att en och annan studie visar en effekt som inte finns. Därtill kommer den frihet som varje analys rymmer: vilka deltagare som ska uteslutas, vilka mått som ska redovisas, när datainsamlingen ska avslutas. Vart och ett av dessa val kan försvaras, men om de görs efter att man sett sina data glider analysen lätt mot det resultat man hoppades på. Det som når offentligheten blir då ett urval, och urvalet är systematiskt skevt.",
      "Reaktionerna inom forskarvärlden gick isär. Somliga talade om en förtroendekris och varnade för att allmänheten skulle börja misstro vetenskap i allmänhet. Andra menade tvärtom att krisen var ett tecken på styrka. Vetenskapen, löd argumentet, skiljer sig från andra sätt att söka kunskap just genom att den granskar sig själv; att felaktiga resultat till slut avslöjas visar att maskineriet fungerar. Ur det perspektivet var upprepningsprojektet inte ett haveri utan ett exempel på hur det är tänkt att gå till.",
      "Den andra hållningen är lockande men glider förbi en obekväm omständighet. Självkorrigering är ingen naturlag; den förutsätter att någon faktiskt tar sig tid att upprepa andras studier. Och det har länge varit ett otacksamt arbete. En upprepning som bekräftar ett känt resultat anses sällan tillräckligt nyskapande för de mest ansedda tidskrifterna, och en som misslyckas kan uppfattas som ett angrepp på kolleger. Den som vill göra karriär har därför goda skäl att lägga sin tid på egna, nya frågor. Att felen till sist uppmärksammades berodde i stor utsträckning på att ett antal forskare valde att göra just det som systemet inte belönade. Det vittnar snarare om deras envishet än om att systemet i sig var friskt.",
      "Sedan dess har flera reformer vunnit mark. Allt fler forskare förregistrerar sina studier, det vill säga lämnar in en beskrivning av hypoteser och analysplan innan några data samlats in. Ett växande antal tidskrifter erbjuder dessutom så kallade registrerade rapporter: tidskriften bedömer frågeställning och metod i förväg och förbinder sig att publicera studien oavsett vad den visar. Effekten syns i statistiken. Bland registrerade rapporter är andelen studier som inte stöder sin huvudhypotes avsevärt högre än i den övriga litteraturen, vilket tyder på att den övriga litteraturen länge gett en alltför gynnsam bild.",
      "Reformerna är dock inte utan risker. En förregistrering kan formuleras så vagt att den i praktiken inte binder forskaren vid något, och om granskarna inte jämför planen med den färdiga studien blir den en stämpel snarare än en spärr. Det finns också forskning som till sin natur är utforskande, där frågan växer fram under arbetets gång, och som riskerar att framstå som mindre seriös om förregistrering blir norm. Ingen av invändningarna talar emellertid för att återgå till hur det var. De påminner snarare om vad krisen egentligen handlade om. Den var mindre en fråga om enskilda forskares moral än om vad forskarsamhället väljer att belöna, och reformerna hjälper bara i den mån de faktiskt ändrar på det och inte reduceras till ännu en blankett att fylla i.",
    ],
    questions: [
      {
        id: "las-hp-replikation-1",
        type: "huvudtanke",
        level: "medel",
        prompt: "Vilket påstående sammanfattar bäst textens huvudtanke?",
        options: [
          o("Replikationskrisen beror främst på att forskare fuskar med sina data.", "Fel. Stycke 2 börjar: 'Förklaringen är inte i första hand fusk'. Det är vardagliga mekanismer som skevar urvalet."),
          o("Krisen visar att vetenskapen fungerar som den ska, eftersom felen till slut upptäcktes.", "Lockande, men det är den hållning som stycke 3 redovisar och som författaren ifrågasätter i stycke 4 ('glider förbi en obekväm omständighet')."),
          o("Vetenskapens förmåga att rätta sina fel är inte självklar utan beror på vad forskarsamhället belönar.", "Rätt. Stycke 4: 'Självkorrigering är ingen naturlag', och slutet av stycke 6: krisen handlade om 'vad forskarsamhället väljer att belöna'."),
          o("Förregistrering har löst de problem som upprepningsprojektet avslöjade.", "För starkt. Stycke 6 tar upp reformernas risker; de hjälper 'bara i den mån' de ändrar belöningarna."),
        ],
        correct: 2,
        paragraph: 3,
      },
      {
        id: "las-hp-replikation-2",
        type: "detalj",
        level: "latt",
        prompt: "Vad kännetecknar enligt texten en registrerad rapport?",
        options: [
          o("Tidskriften lovar att publicera studien innan resultatet är känt.", "Rätt. Stycke 5: tidskriften bedömer frågeställning och metod 'i förväg och förbinder sig att publicera studien oavsett vad den visar'."),
          o("Forskaren publicerar sina rådata öppet när studien är klar.", "Står inte i texten. Öppna data nämns aldrig; stycke 5 handlar om bedömning i förväg."),
          o("Studien upprepas av en oberoende forskargrupp innan den publiceras.", "Förväxling med upprepningsprojektet i stycke 1. Registrerade rapporter handlar om när tidskriften bedömer studien, inte om upprepning."),
          o("Forskaren beskriver hypoteserna i förväg, men tidskriften bedömer studien först när resultaten finns.", "Halvt rätt. Första delen beskriver förregistrering, men poängen med registrerade rapporter är att tidskriften bedömer i förväg, inte efteråt (stycke 5)."),
        ],
        correct: 0,
        paragraph: 4,
      },
      {
        id: "las-hp-replikation-3",
        type: "ordbetydelse",
        level: "medel",
        prompt: "Vad menas i stycke 4 med att upprepningar länge har varit 'ett otacksamt arbete'?",
        options: [
          o("Arbetet har varit tekniskt svårt och tagit lång tid att genomföra.", "Fel betydelse. Texten säger inget om teknisk svårighet; meningarna efter förklarar ordet med tidskrifternas och kollegernas reaktioner."),
          o("Arbetet har gett lite erkännande i förhållande till insatsen.", "Rätt. Meningarna efter: upprepningar anses 'sällan tillräckligt nyskapande' och är det 'som systemet inte belönade'."),
          o("Arbetet har inte väckt något intresse hos allmänheten.", "Fel. Stycke 4 handlar om tidskrifter, kolleger och karriär, inte om allmänheten."),
          o("Arbetet har ofta lett till felaktiga resultat.", "Förvrängning. Det var originalstudierna som visade sig osäkra, inte upprepningarna."),
        ],
        correct: 1,
        paragraph: 3,
      },
      {
        id: "las-hp-replikation-4",
        type: "slutsats",
        level: "svar",
        prompt: "Anta att en forskningsfinansiär kräver förregistrering av alla studier den stöder. Hur skulle textens författare troligen bedöma kravet?",
        options: [
          o("Som en välkommen åtgärd som i sig garanterar tillförlitliga resultat.", "För starkt. Stycke 6: en vag förregistrering kan bli 'en stämpel snarare än en spärr'. Inget garanterar något 'i sig'."),
          o("Som onödigt, eftersom vetenskapen ändå rättar sina fel med tiden.", "Fel. Det är just den hållning författaren avvisar i stycke 4: 'Självkorrigering är ingen naturlag'."),
          o("Som skadligt, eftersom förregistrering hindrar utforskande forskning och därför bör undvikas.", "Nära, men fel. Risken för utforskande forskning nämns, men författaren skriver att invändningarna inte 'talar för att återgå till hur det var' (stycke 6)."),
          o("Som ett steg i rätt riktning, förutsatt att planerna faktiskt granskas och att utforskande studier inte missgynnas.", "Rätt. Stycke 6 väger ihop: reformerna behövs, men bara om de inte blir 'en blankett att fylla i' och inte gör utforskande forskning mindre seriös."),
        ],
        correct: 3,
        paragraph: 5,
      },
    ],
  },
  {
    id: "las-hp-ortnamn",
    title: "Namnen som minns",
    topic: "historia",
    paragraphs: [
      "Ortnamn hör till de mest seglivade språkliga uttryck vi har. Ett namn kan leva kvar i tusen år eller mer, långt efter att språket förändrats så mycket att ingen längre förstår vad det betyder. Det gör namnen till ett slags arkiv. För perioder som saknar skrivna källor kan de ge ledtrådar om hur landskapet såg ut och hur människor använde det.",
      "Ett namn som innehåller ett ord för ö kan till exempel tillhöra en gård mitt på en slätt. Det avslöjar att platsen en gång omgavs av vatten, innan landhöjningen lyfte den ur havet. På samma sätt kan namn som syftar på ek eller lind vittna om skogar som för länge sedan ersatts av åkrar. Namnen bevarar alltså inte bara ord, utan också spår av den natur som en gång gav upphov till dem.",
      "Arkivet är emellertid svårläst. Namn förändras i uttal och stavning, och det som i dag ser ut som ett bekant ord kan ha ett helt annat ursprung. Ett namn som tycks handla om ett djur kan i själva verket gå tillbaka på ett ord för en bäck eller en sluttning. Namnforskaren måste därför leta upp så gamla skrivformer som möjligt och jämföra med liknande namn på andra håll. Den som tolkar ett namn utifrån hur det låter i dag gör det lätt för sig, men drar ofta fel slutsats.",
    ],
    questions: [
      {
        id: "las-hp-ortnamn-1",
        type: "huvudtanke",
        level: "latt",
        prompt: "Vad handlar texten huvudsakligen om?",
        options: [
          o("Hur landhöjningen har förändrat landskapet.", "Bara ett exempel i stycke 2, inte textens ämne."),
          o("Varför ortnamn ändras så ofta att de saknar värde som källa.", "Motsatsen. Texten kallar namnen 'ett slags arkiv' (stycke 1); de är svårlästa, inte värdelösa."),
          o("Att ortnamn kan ge kunskap om det förflutna men måste tolkas med försiktighet.", "Rätt. Stycke 1–2 visar vad namnen kan berätta, stycke 3 ('Arkivet är emellertid svårläst') varnar för förhastade tolkningar."),
          o("Att de flesta ortnamn handlar om djur och växter.", "Står inte i texten. Djur och träd är exempel, och stycke 3 visar att ett 'djurnamn' kan betyda något annat."),
        ],
        correct: 2,
        paragraph: 0,
      },
      {
        id: "las-hp-ortnamn-2",
        type: "detalj",
        level: "latt",
        prompt: "Vad bör man enligt texten göra för att tolka ett ortnamn rätt?",
        options: [
          o("Utgå från hur namnet uttalas i dag.", "Fel. Stycke 3 varnar för just det: den som tolkar 'utifrån hur det låter i dag' drar ofta fel slutsats."),
          o("Leta upp gamla skrivformer av namnet och jämföra med liknande namn.", "Rätt. Stycke 3: 'leta upp så gamla skrivformer som möjligt och jämföra med liknande namn på andra håll'."),
          o("Fråga dem som bor på orten vad namnet betyder.", "Nämns inte någonstans i texten."),
          o("Undersöka om platsen tidigare legat under vatten.", "Förväxling. Vattnet är ett exempel på vad ett namn kan avslöja (stycke 2), inte en metod för att tolka namn."),
        ],
        correct: 1,
        paragraph: 2,
      },
    ],
  },
  {
    id: "las-hp-oversattning",
    title: "Den osynliga översättaren",
    topic: "kultur",
    paragraphs: [
      "En vanlig uppfattning är att en god översättning ska vara osynlig: läsaren ska kunna glömma att boken en gång skrevs på ett annat språk. Förlagen tycks dela synen. Översättarens namn trycks ofta med liten stil, och recensenter nämner det i förbigående, om alls. Idealet låter självklart, men det rymmer ett antagande som förtjänar att granskas.",
      "Osynligheten förutsätter nämligen att en text går att flytta mellan språk utan att något går förlorat eller tillkommer. Så är det sällan. När en roman som utspelar sig i en viss stad översätts måste översättaren ständigt välja: ska maträtter, tilltalsformer och ordlekar ersättas med något som känns hemtamt för den nya läsaren, eller behållas och kanske förklaras? Det första ger en följsam text som läses lätt men flyttar berättelsen närmare läsaren än den egentligen står. Det andra bevarar avståndet men kan göra texten styltig.",
      "Ingen av lösningarna är neutral, och båda är resultat av tolkning. Att kalla en översättning osynlig är därför inte att beskriva den utan att berömma en viss sorts val, nämligen de val som inte märks. Det kan vara ett rimligt ideal för vissa böcker. Men det blir problematiskt när det får dölja att varje översatt bok i praktiken har två upphovspersoner. Den som läser en översatt roman läser alltid också någons läsning av den.",
    ],
    questions: [
      {
        id: "las-hp-oversattning-1",
        type: "syfte",
        level: "medel",
        prompt: "Vad är författarens främsta syfte med texten?",
        options: [
          o("Att ge råd om hur maträtter och ordlekar bör översättas.", "Fel. Maträtter och ordlekar är exempel i stycke 2; texten ger inga råd utan visar att båda valen har nackdelar."),
          o("Att visa att följsamma översättningar alltid är sämre än ordagranna.", "För starkt. Stycke 2 ger båda vägarna nackdelar ('flyttar berättelsen' respektive 'styltig')."),
          o("Att kritisera förlagen för att de betalar översättare dåligt.", "Betalning nämns inte. Förlagen nämns bara för hur de trycker översättarens namn (stycke 1)."),
          o("Att ifrågasätta idealet att en översättning ska vara osynlig.", "Rätt. Stycke 1 slutar med att idealet 'förtjänar att granskas', och resten av texten granskar det."),
        ],
        correct: 3,
        paragraph: 0,
      },
      {
        id: "las-hp-oversattning-2",
        type: "slutsats",
        level: "svar",
        prompt: "Vilken slutsats stämmer bäst med textens resonemang?",
        options: [
          o("Idealet om den osynliga översättningen bör överges helt.", "För starkt. Stycke 3: det 'kan vara ett rimligt ideal för vissa böcker'. Problemet är när det döljer översättarens roll."),
          o("Även en översättning som inte märks har formats av översättarens tolkningar.", "Rätt. Stycke 3: 'Ingen av lösningarna är neutral, och båda är resultat av tolkning', och läsaren läser 'någons läsning'."),
          o("Översättningar bör alltid behålla originalets främmande drag.", "Lockande, men texten förordar ingen av vägarna; att behålla avståndet kan göra texten 'styltig' (stycke 2)."),
          o("Den som läser en översättning får en sämre upplevelse än den som läser originalet.", "Står inte i texten. Den säger att läsningen är en annan (tolkad), inte att den är sämre."),
        ],
        correct: 1,
        paragraph: 2,
      },
    ],
  },
  {
    id: "las-hp-trad",
    title: "Träd i kronor",
    topic: "samhälle",
    paragraphs: [
      "Allt fler kommuner försöker sätta ett pris på sina gatuträd. Med hjälp av modeller räknar man ut hur mycket regnvatten ett träd fångar upp, hur mycket det sänker temperaturen en varm dag och hur mycket luftföroreningar det binder. Summorna blir ofta förvånansvärt höga, och de används allt oftare som argument när ett träd hotas av en byggplan. Ett träd som enligt kalkylen är värt flera hundra tusen kronor är svårare att fälla än ett som bara är ”grönska”.",
      "Det är lätt att förstå varför metoden lockar. I en planeringsprocess där nästan allt annat mäts i pengar har det som saknar prislapp ofta förlorat på förhand. Kalkylen ger trädens försvarare ett språk som beslutsfattarna förstår.",
      "Men prislappen är ett tveeggat svärd. Om ett träd är värt 300 000 kronor följer också att det kan ersättas av något annat som är värt lika mycket, till exempel ett system för att ta hand om dagvatten eller ett antal nya plantor på annan plats. Det som var tänkt som ett skydd blir då en växelkurs. Dessutom fångar kalkylen bara det som går att mäta. Att ett träd har stått på samma plats i hundra år, att det hör till en gatas karaktär eller att människor har minnen knutna till det syns inte i modellerna. Ju mer besluten vilar på siffrorna, desto lättare glöms det bort som aldrig räknades. Kalkylen bör därför användas som ett argument bland flera, inte som det som avgör frågan.",
    ],
    questions: [
      {
        id: "las-hp-trad-1",
        type: "detalj",
        level: "medel",
        prompt: "Vilken nackdel med att prissätta träd tar författaren upp?",
        options: [
          o("Kalkylerna ger ofta för låga värden för att kunna skydda träden.", "Motsatsen. Stycke 1: summorna blir 'förvånansvärt höga'."),
          o("Beslutsfattarna förstår inte de modeller som används.", "Motsatsen. Stycke 2: kalkylen ger 'ett språk som beslutsfattarna förstår'."),
          o("Ett prissatt träd kan framstå som utbytbart mot något annat av samma värde.", "Rätt. Stycke 3: trädet 'kan ersättas av något annat som är värt lika mycket', skyddet blir 'en växelkurs'."),
          o("Det är för dyrt för kommunerna att ta fram kalkylerna.", "Nämns inte. Texten säger inget om vad kalkylerna kostar."),
        ],
        correct: 2,
        paragraph: 2,
      },
      {
        id: "las-hp-trad-2",
        type: "syfte",
        level: "svar",
        prompt: "Vilken hållning till prissättning av träd ger texten uttryck för?",
        options: [
          o("Den är skadlig och bör inte användas, eftersom den gör träden utbytbara.", "Lockande, eftersom stycke 3 är kritiskt. Men sista meningen säger att kalkylen ska användas 'som ett argument bland flera', inte förkastas."),
          o("Den är ett användbart verktyg men bör inte ensam avgöra besluten.", "Rätt. Stycke 2 erkänner nyttan, stycke 3 varnar, och slutmeningen sammanfattar: 'ett argument bland flera, inte ... det som avgör frågan'."),
          o("Den är meningslös, eftersom trädens värde inte går att mäta.", "För starkt. Delar av värdet går att mäta (stycke 1); problemet är det som inte går att mäta (stycke 3)."),
          o("Den är nödvändig, eftersom allt i planeringen ändå mäts i pengar.", "Det är förklaringen till varför metoden lockar (stycke 2), men författaren invänder direkt med 'Men' i stycke 3."),
        ],
        correct: 1,
        paragraph: 2,
      },
    ],
  },
];
