// HP LÄS-träning: egna övningstexter i högskoleprovets stil (inga UHR-texter).
// Varje svarsalternativ har en egen förklaring så att man förstår varför man valde fel.

export type HpLasQuestionType = "huvudtanke" | "detalj" | "slutsats" | "syfte" | "ordbetydelse";

export interface HpLasOption {
  text: string;
  /** Varför alternativet är rätt eller fel — kort, pekar på stället i texten. */
  why: string;
}

export interface HpLasQuestion {
  id: string;
  type: HpLasQuestionType;
  prompt: string;
  /** Fyra alternativ A–D, som på provet. */
  options: [HpLasOption, HpLasOption, HpLasOption, HpLasOption];
  /** Index (0–3) för rätt alternativ. */
  correct: number;
  /** Vilket stycke (0-baserat index i paragraphs) svaret främst finns i. */
  paragraph: number;
}

export interface HpLasText {
  id: string;
  title: string;
  /** Ämnesområde, t.ex. "historia", "naturvetenskap", "samhälle", "filosofi", "kultur". */
  topic: string;
  /** Texten i stycken, för att kunna visas ett stycke i taget på mobil. */
  paragraphs: string[];
  questions: HpLasQuestion[];
}

export const HP_LAS_TEXTS: HpLasText[] = [
  {
    "id": "las-somn",
    "title": "Natten som arbetspass",
    "topic": "naturvetenskap",
    "paragraphs": [
      "Länge betraktades sömn som en passiv paus, ett tillstånd där kroppen vilar och hjärnan i princip stänger av. Den bilden har successivt ersatts. Mätningar av hjärnaktivitet visar att hjärnan under natten växlar mellan flera tydligt skilda faser, och att flera av dem kännetecknas av hög aktivitet. Forskare som studerar sömn talar därför numera hellre om natten som en period av underhåll än som en period av frånvaro. Under REM-sömn, drömsömnen, är hjärnans aktivitet till exempel nästan lika hög som i vaket tillstånd. Det är en förändring som borde påverka hur vi värderar nattens timmar.",
      "En av de mest undersökta funktionerna gäller minnet. Under djup sömn tycks sådant vi upplevt under dagen spelas upp på nytt i hjärnan, i komprimerad form, och föras över från ett område som snabbt tar emot nya intryck till områden som lagrar dem långsiktigt. I försök där deltagare lärt sig en uppgift på kvällen har de som fått sova ofta klarat uppgiften bättre dagen efter än de som hållits vakna lika länge, även om skillnaden varierar mellan studier och uppgifter.",
      "Sömnen verkar dessutom ha en rensande roll. Studier på möss har visat att vätskeflödet mellan hjärnans celler ökar under sömn, vilket kan underlätta bortförandet av avfallsämnen som bildas när nervceller arbetar. Huruvida samma mekanism fungerar lika effektivt hos människor är ännu inte klarlagt, eftersom det är svårt att mäta vätskeflöden i en levande människohjärna utan att störa den. Forskarna är därför försiktiga med att dra långtgående slutsatser.",
      "Allt detta betyder inte att man kan ta igen förlorad sömn hur som helst. Några nätters extra vila efter en tung period hjälper kroppen att återhämta sig, men forskningen ger ännu inget entydigt stöd för att långvarig sömnbrist kan repareras fullständigt i efterhand. Det som däremot är väl belagt är att regelbundna sömntider gynnar de processer som beskrivits ovan. Sömn är alltså inte ett avbrott i det som är viktigt, utan en del av det."
    ],
    "questions": [
      {
        "id": "las-somn-1",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Sömnbrist orsakar permanenta skador på minnet.",
            "why": "Finns inte i texten. Texten säger tvärtom att man inte vet om långvarig sömnbrist kan repareras fullständigt, men nämner aldrig permanenta minnesskador. Svaret är för starkt och hittat på."
          },
          {
            "text": "Hjärnan rensas från avfall under sömn, vilket har bevisats hos människor.",
            "why": "Stämmer bara för ett stycke, och dessutom fel: stycke tre säger att det visats hos möss och att det ännu inte är klarlagt hos människor."
          },
          {
            "text": "Sömn är ett aktivt tillstånd med flera funktioner, inte bara vila.",
            "why": "Rätt. Första stycket slår fast att sömn inte är en passiv paus, och stycke två till fyra ger exempel (minne, rensning, regelbundenhet). Det täcker hela texten."
          },
          {
            "text": "Forskare vet numera exakt vad sömnen är till för.",
            "why": "Motsatsen. Texten är full av försiktiga ord som 'tycks', 'kan' och 'ännu inte klarlagt'. Forskarna drar inga långtgående slutsatser."
          }
        ],
        "correct": 2,
        "paragraph": 0
      },
      {
        "id": "las-somn-2",
        "type": "detalj",
        "prompt": "Vad visade försöken där deltagare lärt sig en uppgift på kvällen?",
        "options": [
          {
            "text": "De som fått sova klarade ofta uppgiften bättre än de som hållits vakna lika länge.",
            "why": "Rätt. Andra stycket: de som sovit har 'ofta' klarat uppgiften bättre dagen efter."
          },
          {
            "text": "Alla som fått sova klarade uppgiften bättre än alla som hållits vakna.",
            "why": "För starkt. Texten säger 'ofta' och att skillnaden 'varierar mellan studier och uppgifter', inte att det gällde alla."
          },
          {
            "text": "De som hållits vakna klarade uppgiften bättre eftersom de hade den färskt i minnet.",
            "why": "Motsatsen. Det var de som sovit som klarade sig bättre, och texten ger aldrig något färskhetsargument."
          },
          {
            "text": "Djupsömn fick deltagarna att glömma uppgiften snabbare.",
            "why": "Finns inte i texten. Djupsömn kopplas till att minnen förs över till långtidslagring, inte till att de glöms."
          }
        ],
        "correct": 0,
        "paragraph": 1
      },
      {
        "id": "las-somn-3",
        "type": "slutsats",
        "prompt": "Vilken slutsats kan dras av textens sista stycke?",
        "options": [
          {
            "text": "Förlorad sömn kan aldrig tas igen.",
            "why": "För starkt. Texten säger att det saknas entydigt stöd för att den kan repareras fullständigt, och att några nätters extra vila hjälper kroppen. Det är inte samma sak som 'aldrig'."
          },
          {
            "text": "Extra vila efter en tung period hjälper inte kroppen alls.",
            "why": "Motsatsen. Texten säger uttryckligen att några nätters extra vila hjälper kroppen att återhämta sig."
          },
          {
            "text": "Sömnens längd spelar större roll än när man sover.",
            "why": "Finns inte i texten. Texten framhåller regelbundna sömntider och jämför aldrig längd mot tidpunkt."
          },
          {
            "text": "Det är förmodligen bättre att sova regelbundet än att försöka kompensera sömnbrist i efterhand.",
            "why": "Rätt. Sista stycket: regelbundna tider gynnar processerna, medan det saknas stöd för att långvarig brist kan repareras fullständigt."
          }
        ],
        "correct": 3,
        "paragraph": 3
      }
    ]
  },
  {
    "id": "las-husforhor",
    "title": "Läsandets kyrkliga rötter",
    "topic": "historia",
    "paragraphs": [
      "Sverige hörde under 1700-talet till de länder i Europa där flest vuxna kunde läsa. Det är ett anmärkningsvärt resultat, eftersom landet saknade allmän skolgång: folkskolan infördes först 1842, och även då dröjde det flera decennier innan alla barn gick i den. Läskunnigheten hade i stället byggts upp av en annan institution, nämligen kyrkan, som under lång tid fungerade som något av ett nationellt utbildningsväsen utan att någon kallade den så.",
      "Grunden lades i kyrkolagen från 1686, som föreskrev att alla skulle lära sig läsa i bok, så att de själva kunde ta del av Guds ord. Ansvaret lades inte på skolan utan på hushållet. Föräldrar och husbönder skulle lära barn och tjänstefolk, och prästen kontrollerade resultatet vid de årliga husförhören, där han gick från gård till gård och lät människorna läsa högt och svara på frågor om katekesen. Den som inte kunde det riskerade att få vänta med att gå till nattvarden och med att gifta sig.",
      "Systemet var effektivt men ensidigt. Det som förhördes var förmågan att läsa, och i praktiken innebar det att läsa religiösa texter, ofta högt och ofta utantill. Att skriva var en annan sak. Skrivkunnigheten var betydligt lägre än läskunnigheten, särskilt bland kvinnor, eftersom skrivning inte ingick i kraven och dessutom krävde material som många hushåll saknade. Historiker har därför varnat för att tala om ett läsande folk utan förbehåll: att kunna läsa en välkänd psalm är inte detsamma som att kunna ta till sig en ny text.",
      "Ändå fick husförhören följder som ingen av 1600-talets kyrkopolitiker kan ha förutsett. När folkskolan kom fanns redan en vana av att läsa, och en förväntan i hemmen på att barn skulle lära sig. Under 1800-talet spreds dessutom andra texter än de religiösa genom hushållen, bland annat almanackor och tidningar, som människor nu hade förmåga att ta del av. Kyrkans mål var att förmedla tro, men resultatet blev en befolkning som var redo för ett samhälle byggt på skrivna ord."
    ],
    "questions": [
      {
        "id": "las-husforhor-1",
        "type": "huvudtanke",
        "prompt": "Vilket av följande påståenden sammanfattar texten bäst?",
        "options": [
          {
            "text": "Folkskolan gav Sverige en av Europas högsta läskunnigheter under 1700-talet.",
            "why": "Motsatsen. Texten säger att landet saknade allmän skolgång, och att folkskolan infördes först 1842, alltså efter 1700-talet."
          },
          {
            "text": "Den svenska läskunnigheten byggdes upp av kyrkan och hushållen i religiöst syfte, men fick vidare följder än så.",
            "why": "Rätt. Texten tar upp orsak (stycke 1–2), begränsning (3) och oförutsedda följder (4)."
          },
          {
            "text": "Svenskarna kunde läsa men kunde inte ta till sig nya texter.",
            "why": "För starkt och gäller bara ett stycke. Stycke tre varnar för att generalisera, men stycke fyra visar att man senare läste almanackor och tidningar."
          },
          {
            "text": "Kyrkan införde läsundervisningen för att förbereda folket för tidningar och folkskola.",
            "why": "Finns inte i texten. Sista stycket säger tvärtom att följderna inte kan ha förutsetts, och att kyrkans mål var att förmedla tro."
          }
        ],
        "correct": 1,
        "paragraph": 1
      },
      {
        "id": "las-husforhor-2",
        "type": "detalj",
        "prompt": "Vad kontrollerade prästen vid husförhören?",
        "options": [
          {
            "text": "Att barnen kunde skriva sitt eget namn.",
            "why": "Finns inte i texten. Tredje stycket säger tvärtom att skrivning inte ingick i kraven."
          },
          {
            "text": "Att hushållet ägde en bibel.",
            "why": "Finns inte i texten. Det som kontrollerades var förmågan, inte vad hushållet ägde."
          },
          {
            "text": "Att tjänstefolket hade gått i skolan.",
            "why": "Motsatsen. Texten säger att landet saknade allmän skolgång, och att ansvaret låg på hushållet."
          },
          {
            "text": "Att människor kunde läsa högt och svara på frågor om katekesen.",
            "why": "Rätt. Andra stycket beskriver att människorna lät läsa högt och svara på frågor om katekesen."
          }
        ],
        "correct": 3,
        "paragraph": 1
      },
      {
        "id": "las-husforhor-3",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'ensidigt' i meningen 'Systemet var effektivt men ensidigt'?",
        "options": [
          {
            "text": "Begränsat till en enda sorts förmåga och en enda sorts innehåll.",
            "why": "Rätt. Meningarna efter förklarar: bara läsning förhördes, bara religiösa texter lästes, och skrivning ingick inte."
          },
          {
            "text": "Orättvist fördelat mellan landets olika regioner.",
            "why": "Finns inte i texten. Stycket handlar om vad som kontrollerades, inte om var i landet."
          },
          {
            "text": "Styrt av en enda person.",
            "why": "Förväxling med prästens roll. 'Ensidigt' beskriver här innehållet i kraven, inte vem som ledde dem."
          },
          {
            "text": "Lätt att kringgå.",
            "why": "Motsatsen. Texten kallar systemet 'effektivt' och förbehållet gäller dess omfång, inte att man kunde slippa undan."
          }
        ],
        "correct": 0,
        "paragraph": 2
      }
    ]
  },
  {
    "id": "las-lanord",
    "title": "Ord på resa",
    "topic": "språk",
    "paragraphs": [
      "Då och då återkommer oron att svenskan håller på att trängas undan av engelskan. Orden mejla, streama och scrolla nämns som exempel på ett språk som låter sig översköljas. Oron är förståelig, men den bygger ofta på tanken att ett språk ska vara ett slutet förråd av ord som alltid har funnits. Så har det aldrig varit. Svenskan har under hela sin historia tagit emot ord utifrån, och många av dem känns i dag helt svenska.",
      "Ordet fönster kommer från latinets fenestra och ordet skola från latinets schola, som i sin tur har grekiskt ursprung. Under medeltiden lånades många ord från lågtyskan i samband med handeln i Hansan, och på 1700-talet kom franska ord som frisör och trottoar in i språket när franskan var hovets och societetens språk. Ingen av dessa ord upplevs i dag som utländsk. De har slipats av mun efter mun tills de passar in i svenskans ljudsystem och böjningsmönster.",
      "Det är just anpassningen som är avgörande. Ett lånord blir svenskt när det böjs som ett svenskt ord: man mejlar, mejlade och har mejlat, på samma sätt som man målar, målade och har målat. Det visar att språket inte tar emot lånen passivt, utan arbetar om dem med sina egna verktyg. Språkforskare skiljer därför mellan hur många ord som lånas och hur mycket språkets grammatik påverkas, och det senare förändras sällan snabbt.",
      "Det betyder inte att alla farhågor är obefogade. Inom vissa områden, till exempel högre utbildning och forskning, sker i dag mycket av arbetet på engelska, och där kan svenska facktermer saknas när man behöver dem. Det är en reell risk, men den handlar om var språket används, inte om att orden i sig skulle vara ett hot. Frågan är alltså inte om svenskan ska ta emot ord utifrån, utan om den fortsätter att användas i tillräckligt många sammanhang för att fortsätta utvecklas."
    ],
    "questions": [
      {
        "id": "las-lanord-1",
        "type": "syfte",
        "prompt": "Varför nämns orden fönster och skola i andra stycket?",
        "options": [
          {
            "text": "För att visa att ord som upplevs som svenska ursprungligen är lånord.",
            "why": "Rätt. Stycket går igenom lån från latin, lågtyska och franska och avslutar med att ingen av dem upplevs som utländsk."
          },
          {
            "text": "För att visa att latinet har påverkat svenskan mer än engelskan.",
            "why": "Finns inte i texten. Det görs ingen jämförelse av hur mycket olika språk har påverkat svenskan."
          },
          {
            "text": "För att förklara hur orden ska stavas.",
            "why": "Finns inte i texten. Stavning nämns aldrig, det är ordens ursprung som är poängen."
          },
          {
            "text": "För att visa att svenskan lånat fler ord från latin än från något annat språk.",
            "why": "För starkt. Texten ger bara exempel, och säger inget om vilket språk som bidragit mest."
          }
        ],
        "correct": 0,
        "paragraph": 1
      },
      {
        "id": "las-lanord-2",
        "type": "detalj",
        "prompt": "Enligt texten blir ett lånord svenskt när det",
        "options": [
          {
            "text": "har funnits i språket i minst hundra år.",
            "why": "Finns inte i texten. Ålder nämns inte som villkor, ordet mejla är ett nytt exempel på ett ord som redan böjs svenskt."
          },
          {
            "text": "används av hovet och societeten.",
            "why": "Stämmer bara för ett stycke och gäller något annat. Hovet nämns i stycke två som anledning till att franska ord kom in, inte som villkor för att ett ord ska bli svenskt."
          },
          {
            "text": "böjs på samma sätt som svenska ord.",
            "why": "Rätt. Tredje stycket: 'Ett lånord blir svenskt när det böjs som ett svenskt ord'."
          },
          {
            "text": "har latinskt eller grekiskt ursprung.",
            "why": "Sant men svarar inte på frågan. Några av exemplen har sådant ursprung, men det är inte det som gör ett ord svenskt."
          }
        ],
        "correct": 2,
        "paragraph": 2
      },
      {
        "id": "las-lanord-3",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Engelskan utgör inget som helst hot mot svenskan.",
            "why": "För starkt. Sista stycket säger att det finns en reell risk, främst inom högre utbildning och forskning."
          },
          {
            "text": "Språk har alltid lånat ord, och det avgörande för språkets framtid är att det används i tillräckligt många sammanhang.",
            "why": "Rätt. Det knyter ihop första stycket (språk har alltid lånat), tredje (anpassning) och sista (användningsområden)."
          },
          {
            "text": "Svenskan bör skyddas mot nya lånord.",
            "why": "Motsatsen. Texten säger att frågan inte är om svenskan ska ta emot ord utifrån."
          },
          {
            "text": "Franskan har påverkat svenskan mer än något annat språk.",
            "why": "Finns inte i texten. Franskan nämns bara som ett exempel i andra stycket."
          }
        ],
        "correct": 1,
        "paragraph": 3
      }
    ]
  },
  {
    "id": "las-vagar",
    "title": "Vägen som fylls",
    "topic": "samhälle",
    "paragraphs": [
      "Det verkar självklart: om en motorväg är överfull ska man bygga ytterligare ett körfält. Fler körfält ger plats åt fler bilar, och köerna kortas. Trots det har trafikplanerare i decennier iakttagit ett märkligt mönster. När en trång väg byggs ut blir den ofta full igen efter några år, ibland fullare än förut. Fenomenet kallas inom forskningen för framkallad trafik, och det har studerats i många länder.",
      "Förklaringen ligger i hur människor väljer att resa. Restiden är bara en av flera faktorer, men den väger tungt. När vägen blir snabbare blir bilen mer attraktiv jämfört med tåg och buss, och några som tidigare åkte kollektivt byter. Andra gör resor de tidigare avstod från, eftersom de nu går fortare: ett ärende på andra sidan stan, en längre pendling till ett jobb med högre lön. På längre sikt flyttar dessutom människor, och företag etablerar sig, där tillgängligheten är god. Vägen fylls alltså inte bara av de bilister som fanns redan förut, utan också av nya som vägen själv har skapat. Därmed försvinner den lättnad som utbyggnaden var tänkt att ge.",
      "Det betyder inte att utbyggnader alltid är verkningslösa. I områden där trafiken verkligen hindras av en flaskhals kan en utbyggnad göra nytta, och ibland är den ett nödvändigt komplement till annat. Men forskningen visar att effekten på köerna ofta är mindre och mer kortvarig än vad som utlovas i planeringsunderlag. Den som bedömer ett vägprojekt bör därför fråga inte bara hur många bilar vägen rymmer i dag, utan också hur många fler som kommer.",
      "Ett alternativ som diskuteras är att i stället sätta pris på användningen av vägen, till exempel genom avgifter som är högre när trafiken är som tätast. Då minskar efterfrågan där den är störst, utan att nya körfält behövs. Förslaget är omstritt, eftersom många uppfattar det som orättvist mot dem som inte kan välja en annan tid eller ett annat färdsätt. Erfarenheter från städer som infört avgifter, som Stockholm, visar ändå att trafiken kan minska märkbart. Debatten gäller därför mindre om det fungerar och mer om vem som ska bära kostnaden."
    ],
    "questions": [
      {
        "id": "las-vagar-1",
        "type": "syfte",
        "prompt": "Varför nämns Stockholm i sista stycket?",
        "options": [
          {
            "text": "Som exempel på en stad där utbyggda vägar inte hjälpte.",
            "why": "Finns inte i texten. Stockholm kopplas till avgifter, inte till utbyggnad av vägar."
          },
          {
            "text": "Som bevis för att avgifter är rättvisa.",
            "why": "Motsatsen. Texten säger att förslaget är omstritt just för att många uppfattar det som orättvist, och drar ingen slutsats om rättvisa."
          },
          {
            "text": "Som den svenska stad med flest trafikköer.",
            "why": "Finns inte i texten. Inga jämförelser mellan städers köer görs."
          },
          {
            "text": "Som exempel på att avgifter i praktiken kan minska trafiken.",
            "why": "Rätt. Stockholm nämns i meningen om erfarenheter som 'visar ändå att trafiken kan minska märkbart'."
          }
        ],
        "correct": 3,
        "paragraph": 3
      },
      {
        "id": "las-vagar-2",
        "type": "slutsats",
        "prompt": "Vilken slutsats om en planerad utbyggnad av en trång väg stöds av texten?",
        "options": [
          {
            "text": "Utbyggnader av vägar bör aldrig genomföras.",
            "why": "För starkt. Stycke tre säger uttryckligen att utbyggnader inte alltid är verkningslösa, till exempel vid flaskhalsar."
          },
          {
            "text": "Effekten på köerna kan bli mindre än planerat, eftersom ny trafik kan tillkomma.",
            "why": "Rätt. Tredje stycket: effekten är 'ofta mindre och mer kortvarig än vad som utlovas', och man bör räkna med hur många fler som kommer."
          },
          {
            "text": "Köerna blir alltid längre efter en utbyggnad.",
            "why": "För starkt. Texten säger att vägen 'ofta' blir full igen, 'ibland' fullare än förut. Inget 'alltid'."
          },
          {
            "text": "Kollektivtrafik är alltid ett billigare alternativ än vägutbyggnad.",
            "why": "Finns inte i texten. Kostnader för olika alternativ jämförs aldrig."
          }
        ],
        "correct": 1,
        "paragraph": 2
      },
      {
        "id": "las-vagar-3",
        "type": "detalj",
        "prompt": "Vilket skäl till att en utbyggd väg snart fylls nämns i texten?",
        "options": [
          {
            "text": "Att bilar har blivit större och tar mer plats.",
            "why": "Finns inte i texten. Bilarnas storlek nämns aldrig."
          },
          {
            "text": "Att trafikplanerare underskattar befolkningsökningen.",
            "why": "Finns inte i texten. Förklaringen gäller hur människor ändrar beteende, inte felaktiga prognoser om folkmängd."
          },
          {
            "text": "Att några byter från tåg och buss till bil och att nya resor görs.",
            "why": "Rätt. Andra stycket nämner båda: kollektivtrafikresenärer som byter, och resor som tidigare avstods."
          },
          {
            "text": "Att vägavgifterna har sänkts.",
            "why": "Finns inte i texten. Avgifter nämns bara som ett alternativ i sista stycket."
          }
        ],
        "correct": 2,
        "paragraph": 1
      },
      {
        "id": "las-vagar-4",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'flaskhals' i sammanhanget (tredje stycket)?",
        "options": [
          {
            "text": "En enskild trång punkt som begränsar trafikflödet.",
            "why": "Rätt. 'Trafiken hindras av en flaskhals' ger bilden av en smal passage som all trafik måste igenom."
          },
          {
            "text": "En plats där avgifter tas ut.",
            "why": "Förväxling med sista stycket. Avgifter har inget med ordet att göra här."
          },
          {
            "text": "En väg som saknar avfarter.",
            "why": "Finns inte i texten. Ordet beskriver en trång punkt, inte avsaknad av avfarter."
          },
          {
            "text": "En tillfällig avstängning av en väg.",
            "why": "Fel betydelse. En flaskhals är en trång punkt som finns hela tiden, inte en avstängning, och texten talar om trafik som 'hindras'."
          }
        ],
        "correct": 0,
        "paragraph": 2
      }
    ]
  },
  {
    "id": "las-theseus",
    "title": "Skeppet som byttes ut",
    "topic": "filosofi",
    "paragraphs": [
      "Den grekiske författaren Plutarkhos berättar om det skepp som Theseus, Atens mytiske hjälte, sägs ha seglat hem från Kreta med. Atenarna bevarade skeppet i århundraden som ett minnesmärke. Eftersom träet ruttnade fick man byta ut planka efter planka, och till slut, menade filosoferna, fanns inte en enda del kvar av den ursprungliga konstruktionen. Var det då fortfarande samma skepp? Plutarkhos själv nöjde sig med att notera att filosoferna var oeniga: några hävdade att skeppet var detsamma, andra att det var ett annat. Frågan har sedan sysselsatt tänkare i över tvåtusen år.",
      "Det som gör problemet svårt är att två ganska rimliga intuitioner pekar åt olika håll. Å ena sidan tycks ett skepp som repareras gradvis vara samma skepp hela tiden; ingen skulle säga att bilen man lämnade på verkstad har bytt identitet för att den fick nya bromsar. Å andra sidan består ett skepp av sina delar, och om ingen del finns kvar av den ursprungliga tycks det svårt att säga att något av det gamla finns kvar. Båda uppfattningarna verkar sunda var för sig, men tillsammans leder de till en motsägelse.",
      "På 1600-talet gjorde Thomas Hobbes problemet skarpare. Tänk dig, skrev han i princip, att någon samlade ihop alla de gamla plankorna som kastats och satte ihop dem till ett skepp igen. Då finns två kandidater till att vara Theseus skepp: det som seglat hela tiden och efter hand byggts om, och det som är sammansatt av de ursprungliga delarna. Båda har ett rimligt anspråk, men de kan inte båda vara identiska med originalet, eftersom de är två olika skepp på två olika platser.",
      "Filosofer har föreslagit flera sätt att komma ur knipan. Ett är att säga att identitet följer av en obruten historia: skeppet som seglat hela tiden är originalet, eftersom varje förändring skedde steg för steg. Ett annat är att identiteten ligger i materialet, vilket gör det ihopsatta skeppet till det riktiga. Ett tredje är att frågan saknar ett enda svar, eftersom ordet samma används på olika sätt i olika sammanhang. För ett museum kan det gamla materialet vara det viktiga, för en sjöman att fartyget fortfarande går att segla.",
      "Samma fråga ställs om människor. John Locke menade på 1600-talet att det som gör en person till samma person över tid inte är kroppen eller en själ, utan medvetandet och minnet: jag är samma person som den som gjorde något för tio år sedan om jag kan minnas det. Invändningen är att minnet är bristfälligt, så att en person som glömt sin barndom skulle upphöra att vara samma människa som barnet. Även här visar sig att svaret beror på vad vi vill att begreppet ska fungera till.",
      "Det sista synsättet kan verka som en besvikelse, som om filosoferna gav upp. Men det har praktiska följder. Frågan om identitet över tid dyker upp överallt, från juridiken, där ett företag som bytt alla anställda och ägare ändå förblir samma bolag, till biologin. Det ofta upprepade påståendet att kroppens alla celler byts ut vart sjunde år är visserligen en förenkling, eftersom många av hjärnans nervceller finns kvar hela livet, men även en kropp som delvis förnyas förblir samma person. Tankeexperimentet fyller sin funktion inte genom att ge ett svar, utan genom att tvinga oss att inse att vi använder begreppet utan att veta riktigt vad vi menar."
    ],
    "questions": [
      {
        "id": "las-theseus-1",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Ett skepp är identiskt med sin ursprungliga konstruktion bara om det bevarat sitt material.",
            "why": "Stämmer bara för ett av flera förslag i fjärde stycket. Texten tar inte ställning för något enskilt svar."
          },
          {
            "text": "Theseus skepp visar att begreppet identitet över tid är mindre entydigt än vi tror, och tankeexperimentet är värdefullt just därför.",
            "why": "Rätt. Det sammanfattar första stycket (frågan), tredje och fjärde (svårigheter och lösningsförslag) och slutstycket (värdet av att inse oklarheten)."
          },
          {
            "text": "Filosofer har kommit fram till att identitet bygger på en obruten historia.",
            "why": "För starkt och gäller bara ett stycke. Det är ett av tre förslag, och texten säger inte att filosoferna enats."
          },
          {
            "text": "Hobbes löste problemet genom att visa att det saknar betydelse.",
            "why": "Motsatsen. Tredje stycket säger att Hobbes gjorde problemet skarpare, inte att han löste det."
          }
        ],
        "correct": 1,
        "paragraph": 5
      },
      {
        "id": "las-theseus-2",
        "type": "detalj",
        "prompt": "Vad tillförde Hobbes diskussionen om Theseus skepp?",
        "options": [
          {
            "text": "Att skeppet var identiskt med sitt material och ingenting annat.",
            "why": "Det är ett av lösningsförslagen i fjärde stycket, inte vad Hobbes tillförde. Sant att förslaget finns, men det svarar inte på frågan."
          },
          {
            "text": "Att Aten byggde ett nytt skepp som minnesmärke.",
            "why": "Finns inte i texten. Atenarna bevarade det gamla skeppet, och byggde inget nytt."
          },
          {
            "text": "Tanken att de utbytta delarna sätts ihop till ett andra skepp, så att två skepp kan göra anspråk på att vara originalet.",
            "why": "Rätt. Tredje stycket: Hobbes lät de gamla plankorna sättas ihop igen, vilket gav 'två kandidater'."
          },
          {
            "text": "Att ordet 'samma' används olika i olika sammanhang.",
            "why": "Det är det tredje lösningsförslaget i fjärde stycket och tillskrivs inte Hobbes. Fel person, rätt tanke."
          }
        ],
        "correct": 2,
        "paragraph": 2
      },
      {
        "id": "las-theseus-3",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'komma ur knipan' i fjärde stycket?",
        "options": [
          {
            "text": "Hitta ett sätt att lösa en besvärlig situation.",
            "why": "Rätt. Meningen efter ger tre förslag på hur problemet kan lösas."
          },
          {
            "text": "Ta sig ut ur en trång hamn.",
            "why": "Ordagrann tolkning. Texten handlar om ett tankeproblem, inte om sjöfart."
          },
          {
            "text": "Rätta ett misstag i en tidigare slutsats.",
            "why": "Finns inte i texten. Förslagen är olika sätt att tolka problemet, inte rättelser av fel."
          },
          {
            "text": "Undvika att svara på frågan.",
            "why": "Motsatsen. Filosoferna föreslår svar (eller en omformulering), de undviker inte frågan."
          }
        ],
        "correct": 0,
        "paragraph": 3
      },
      {
        "id": "las-theseus-4",
        "type": "syfte",
        "prompt": "Varför nämns bilen som lämnas på verkstad i andra stycket?",
        "options": [
          {
            "text": "För att visa att bilar och skepp har samma sorts delar.",
            "why": "Finns inte i texten. Exemplet gäller identitet vid reparation, inte likheter i konstruktion."
          },
          {
            "text": "För att visa att nya delar förändrar ett föremåls identitet.",
            "why": "Motsatsen. Bilen är fortfarande samma bil trots nya bromsar."
          },
          {
            "text": "För att kritisera verkstäders arbetssätt.",
            "why": "Finns inte i texten. Verkstaden är bara en vardaglig bakgrund till exemplet."
          },
          {
            "text": "För att illustrera intuitionen att gradvis reparation inte ändrar ett föremåls identitet.",
            "why": "Rätt. Exemplet står efter 'ett skepp som repareras gradvis tycks vara samma skepp hela tiden' och stöder just den tanken."
          }
        ],
        "correct": 3,
        "paragraph": 1
      }
    ]
  },
  {
    "id": "las-foljetong",
    "title": "När romanen kom i delar",
    "topic": "kultur",
    "paragraphs": [
      "Den som sträckkollar en hel tv-serie över en helg gör något som tidigare generationers läsare aldrig kunde. Under stora delar av 1800-talet kom romaner nämligen sällan i en bunt. När Charles Dickens debuterade med Pickwickklubben 1836 utgavs berättelsen i månadshäften, och läsarna fick vänta ungefär en månad på varje ny fortsättning. Formen blev snabbt populär, och under resten av seklet utkom åtskilliga romaner i delar, antingen i häften eller som följetong i tidningar. Utgivningsformen gjorde dessutom litteraturen billigare: ett häfte kostade en bråkdel av vad en inbunden bok gjorde, och berättelserna nådde därmed läsare som aldrig hade köpt en bok.",
      "Formen fick konsekvenser för hur berättelser byggdes. En författare som visste att läsarna skulle behöva vänta kunde inte räkna med att de mindes alla detaljer från förra avsnittet, och påminde därför ofta om viktiga personer och händelser. Varje avsnitt behövde dessutom ha en egen spänning, så att läsaren ville fortsätta. Dickens och hans samtida blev skickliga på att sluta med en olöst fråga eller en överraskande vändning, det vi i dag skulle kalla en cliffhanger. Persongalleriet blev ofta stort och färgstarkt, eftersom en minnesvärd gestalt var en tillgång som kunde bära flera avsnitt.",
      "Följetongen innebar också att författare och publik stod i en ovanligt direkt kontakt. Eftersom berättelsen publicerades medan den ännu skrevs, kunde författaren se hur försäljningen utvecklades och ta del av läsarnas reaktioner. Det finns exempel på författare som förlängde berättelser som sålde bra och som tonade ner figurer som inte föll läsarna i smaken. Det var ett tidigt exempel på det som i dag skulle kallas publikmätning, men det innebar också att berättelsens form inte alltid var planerad från början.",
      "Många kritiker har sett detta som en nackdel. Romaner skrivna för att fylla en viss mängd sidor per månad kan bli långa, förgrenade och ibland ojämna, och författare som fick betalt per avsnitt hade ekonomiska skäl att dra ut på handlingen. Samtidigt är det svårt att bortse från att många av litteraturens mest älskade verk föddes just ur dessa villkor. Det tyder på att begränsningar inte nödvändigtvis hämmar skapande; ibland ger de berättelsen en rytm som en fri författare aldrig skulle ha valt.",
      "Följetongen var dessutom sällan en ensam upplevelse. Vid sidan av hushållens högläsning fanns uppläsare på arbetsplatser: i cigarrfabrikerna på Kuba anställdes under 1800-talet särskilda uppläsare som läste ur romaner och tidningar medan arbetarna rullade cigarrer. Berättelserna blev därmed ett gemensamt samtalsämne, och enligt flera skildringar kunde arbetarna rösta om vilken roman som skulle läsas härnäst. Det visar hur nära kopplingen mellan berättelsen och publiken kunde vara.",
      "I dag har följetongen en sorts renässans. Många streamingtjänster släpper alla avsnitt på en gång, men andra håller fast vid veckovisa premiärer, och de serier som skapar mest samtal tycks ofta vara de som ges en väntan mellan avsnitten. Skälet kan vara detsamma som för Dickens läsare: väntan ger tid att diskutera, spekulera och längta. Samtalen handlar dessutom oftare om vad som ska hända härnäst än om vad som har hänt. Att få allt på en gång är bekvämt, men det gör berättelsen mer av en konsumtionsvara och mindre av en gemensam upplevelse."
    ],
    "questions": [
      {
        "id": "las-foljetong-1",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Följetongsromaner var litterärt sämre än romaner som gavs ut i en bok.",
            "why": "För starkt och bara ett stycke. Fjärde stycket nämner kritiken men säger också att många älskade verk föddes ur villkoren."
          },
          {
            "text": "Streamingtjänsternas utgivning skadar berättelser.",
            "why": "För starkt. Sista stycket säger att att få allt på en gång är 'bekvämt' och att väntan tycks ge mer samtal, inte att berättelser skadas."
          },
          {
            "text": "Dickens uppfann följetongen.",
            "why": "Finns inte i texten. Dickens nämns som exempel på en form som 'blev snabbt populär', inte som dess upphovsman."
          },
          {
            "text": "Utgivning i delar påverkade både hur berättelser byggdes och hur författare och publik förhöll sig till varandra, och liknande mekanismer finns kvar i dag.",
            "why": "Rätt. Det täcker form (stycke 2), kontakt med publiken (3), omdömet om villkoren (4) och nutiden (6)."
          }
        ],
        "correct": 3,
        "paragraph": 1
      },
      {
        "id": "las-foljetong-2",
        "type": "detalj",
        "prompt": "Varför påminde författarna ofta om viktiga personer och händelser?",
        "options": [
          {
            "text": "Läsarna kunde ha glömt detaljer från förra avsnittet under väntetiden.",
            "why": "Rätt. Andra stycket: författaren kunde 'inte räkna med att de mindes alla detaljer'."
          },
          {
            "text": "Författarna fick betalt per person som förekom.",
            "why": "Finns inte i texten. Betalning per avsnitt nämns i fjärde stycket, men inte per person."
          },
          {
            "text": "Kritiker krävde att romanerna skulle vara lättlästa.",
            "why": "Finns inte i texten. Kritikerna nämns bara för sin syn på romanernas längd och ojämnhet."
          },
          {
            "text": "Berättelserna var så korta att de behövde fyllas ut.",
            "why": "Motsatsen. Fjärde stycket säger att romanerna kunde bli långa och förgrenade."
          }
        ],
        "correct": 0,
        "paragraph": 1
      },
      {
        "id": "las-foljetong-3",
        "type": "slutsats",
        "prompt": "Vad antyder författaren med att begränsningar 'inte nödvändigtvis hämmar skapande'?",
        "options": [
          {
            "text": "Att fria författare alltid skriver sämre romaner.",
            "why": "För starkt. Texten säger bara att begränsningar 'ibland' kan ge något särskilt, inte att frihet är sämre."
          },
          {
            "text": "Att villkor som verkar begränsande ibland kan ge verk egenskaper de annars skulle sakna.",
            "why": "Rätt. Meningen fortsätter: begränsningar kan ge berättelsen 'en rytm som en fri författare aldrig skulle ha valt'."
          },
          {
            "text": "Att författare borde få betalt per avsnitt.",
            "why": "Finns inte i texten. Betalning per avsnitt nämns som ett ekonomiskt skäl att dra ut på handlingen, alltså som en risk."
          },
          {
            "text": "Att alla följetongsromaner är mästerverk.",
            "why": "För starkt. Texten säger att 'många' älskade verk föddes ur villkoren, inte alla."
          }
        ],
        "correct": 1,
        "paragraph": 3
      },
      {
        "id": "las-foljetong-4",
        "type": "syfte",
        "prompt": "Vad är syftet med textens sista stycke?",
        "options": [
          {
            "text": "Att förklara varför Dickens blev populär.",
            "why": "Fel stycke. Dickens popularitet nämns i det första stycket, men sista stycket handlar om i dag."
          },
          {
            "text": "Att avråda läsaren från att sträckkolla serier.",
            "why": "För starkt. Författaren kallar det bekvämt och uppmanar inte att låta bli."
          },
          {
            "text": "Att visa att följetongens logik lever kvar i dagens serieformat.",
            "why": "Rätt. Stycket jämför streamingserier med Dickens läsare ('detsamma som för Dickens läsare') och knyter tillbaka till inledningen."
          },
          {
            "text": "Att visa att veckopremiärer är billigare att producera.",
            "why": "Finns inte i texten. Produktionskostnader nämns aldrig."
          }
        ],
        "correct": 2,
        "paragraph": 5
      }
    ]
  },
  {
    "id": "las-gps",
    "title": "Kartan i huvudet",
    "topic": "teknik",
    "paragraphs": [
      "För tjugo år sedan var det rutin att studera en karta innan man gav sig av till en okänd plats. I dag räcker det att skriva in adressen i telefonen och följa en röst som talar om var man ska svänga. Bekvämligheten är uppenbar, och få vill byta tillbaka. Men vissa forskare har ställt frågan om vi, genom att lämna över orienteringen till en apparat, också lämnar ifrån oss en förmåga som tidigare tränades varje gång vi gick vilse.",
      "Det som gör frågan intressant är att hjärnans orienteringsförmåga har studerats ovanligt noga. I början av 2000-talet undersökte en brittisk forskargrupp londonska taxichaufförer som, för att få licens, måste lära sig tusentals gator utantill. Hos dem var en del av hippocampus, ett område som har med minne och rumslig orientering att göra, större än hos jämförbara personer, och ju längre de arbetat, desto större var den delen. En senare jämförelse med londonska busschaufförer, som kör i samma stad men längs fasta rutter, talade i samma riktning. Resultaten tolkades som ett tecken på att hjärnan förändras av det den tränas på.",
      "Att hjärnan formas av användning är i sig inget nytt fynd. Studier av stråkmusiker har visat att den del av hjärnbarken som tar emot signaler från fingrarna på vänster hand är större än hos personer som inte spelar, och förändringen är störst hos dem som började som barn. Slutsatsen att hjärnan anpassar sig efter vad den utsätts för är därför väl underbyggd. Det som är mindre klart är hur långt anpassningen går när vi slutar använda en förmåga.",
      "Om träning stärker orienteringen, kan då bristande träning försvaga den? Några nyare studier tyder på det. I en undersökning där deltagare fick uppge hur ofta de använde GPS och sedan utföra uppgifter som krävde att de byggde upp en mental karta, klarade de som använde GPS mest sig sämst. Men sambandet är inte självklart. Det kan vara så att GPS gör människor sämre, men det kan lika gärna vara så att de som redan har svårt att orientera sig i större utsträckning väljer att använda GPS. Mätningar vid ett enda tillfälle kan inte avgöra vilket.",
      "För att reda ut orsaksordningen krävs studier som följer samma personer över tid, och sådana är ännu få. Några av dem pekar på att de som använde GPS mer fick ett försämrat rumsligt minne, men de omfattar små grupper och bör tolkas med försiktighet. Dessutom mäts rumsligt minne oftast i laboratoriemiljö, vilket inte alltid motsvarar hur orientering fungerar ute i verkligheten. Det vore därför förhastat att dra slutsatsen att tekniken skadar hjärnan.",
      "Det finns också ett motargument. Människor har i alla tider lämnat över tänkande till hjälpmedel: skriften avlastade minnet, och räknemaskinen avlastade huvudräkningen. Redan Sokrates oroade sig enligt Platon för att skriften skulle göra människor glömskare. Frågan är inte om vi förlorar något, utan om det vi förlorar är värt det vi vinner, och om vi kan välja själva när vi vill träna. Den som tycker att orienteringen är värd att behålla kan ju göra det genom att ibland gå utan hjälp. I vardagen har vi redan vant oss vid att inte kunna telefonnummer utantill."
    ],
    "questions": [
      {
        "id": "las-gps-1",
        "type": "slutsats",
        "prompt": "Vilken slutsats stöds av texten?",
        "options": [
          {
            "text": "GPS skadar hjärnans orienteringsförmåga.",
            "why": "För starkt. Femte stycket kallar just den slutsatsen 'förhastad'."
          },
          {
            "text": "Taxichaufförernas stora hippocampus visar att GPS är onödigt.",
            "why": "Finns inte i texten. Taxistudien visar att träning förändrar hjärnan, den säger inget om GPS."
          },
          {
            "text": "Det är oklart om GPS försvagar orienteringsförmågan eller om personer med sämre förmåga oftare väljer GPS.",
            "why": "Rätt. Fjärde stycket pekar ut båda möjligheterna och säger att mätningar vid ett tillfälle inte kan avgöra vilken som stämmer."
          },
          {
            "text": "Forskarna är eniga om att papperskartor var bättre.",
            "why": "Finns inte i texten. Inget sägs om kartor som bättre eller sämre, och forskarna beskrivs som försiktiga."
          }
        ],
        "correct": 2,
        "paragraph": 3
      },
      {
        "id": "las-gps-2",
        "type": "detalj",
        "prompt": "Vad fann forskargruppen hos londonska taxichaufförer?",
        "options": [
          {
            "text": "Hela hjärnan var större än hos andra.",
            "why": "För generellt. Det var 'en del av hippocampus', inte hela hjärnan."
          },
          {
            "text": "En del av hippocampus var mindre än hos jämförbara personer.",
            "why": "Motsatsen. Delen var större."
          },
          {
            "text": "De var bättre på att minnas siffror.",
            "why": "Finns inte i texten. Talminne nämns aldrig."
          },
          {
            "text": "En del av hippocampus var större än hos jämförbara personer, och större ju längre de arbetat.",
            "why": "Rätt. Andra stycket beskriver båda delarna: större område, och samband med antal år."
          }
        ],
        "correct": 3,
        "paragraph": 1
      },
      {
        "id": "las-gps-3",
        "type": "syfte",
        "prompt": "Vilken funktion har stycket om skriften och räknemaskinen?",
        "options": [
          {
            "text": "Att visa att det är gammalt att lämna över tänkande till hjälpmedel, och att frågan handlar om avvägning.",
            "why": "Rätt. Stycket slutar med att frågan är 'om det vi förlorar är värt det vi vinner'."
          },
          {
            "text": "Att visa att GPS är lika nödvändig som en räknemaskin.",
            "why": "Finns inte i texten. Ingen nödvändighet påstås, bara att tekniken liknar tidigare hjälpmedel."
          },
          {
            "text": "Att bevisa att hjälpmedel alltid försvagar minnet.",
            "why": "För starkt. Stycket ställer en fråga om avvägning och bevisar ingenting om minnet."
          },
          {
            "text": "Att förklara hur skriften uppfanns.",
            "why": "Finns inte i texten. Skriften nämns bara som ett exempel på avlastning."
          }
        ],
        "correct": 0,
        "paragraph": 5
      },
      {
        "id": "las-gps-4",
        "type": "huvudtanke",
        "prompt": "Vilken är textens huvudtanke?",
        "options": [
          {
            "text": "Forskare har bevisat att GPS försämrar minnet.",
            "why": "För starkt. Texten pekar flera gånger på att orsakssambandet är oklart."
          },
          {
            "text": "Det finns visst stöd för att orienteringsförmågan påverkas av träning, men om GPS försämrar den är ännu inte klarlagt, och frågan handlar också om avvägning.",
            "why": "Rätt. Det sammanfattar taxistudierna (stycke 2), osäkerheten om GPS (4–5) och motargumentet (6)."
          },
          {
            "text": "Människor bör sluta använda GPS.",
            "why": "Finns inte i texten. Sista stycket antyder att man kan välja när man tränar, men ger ingen sådan uppmaning."
          },
          {
            "text": "Taxichaufförer är bättre på att orientera sig än andra.",
            "why": "Stämmer bara för ett stycke och är en detalj, inte huvudtanke. Studien nämns som bakgrund till frågan om träning."
          }
        ],
        "correct": 1,
        "paragraph": 3
      }
    ]
  },
  {
    "id": "las-allmanning",
    "title": "Allmänningen och dess vårdare",
    "topic": "samhälle",
    "paragraphs": [
      "År 1968 publicerade ekologen Garrett Hardin en artikel som skulle bli en av de mest citerade i samhällsvetenskapernas historia. Titeln var Allmänningens tragedi, och bilden han använde var enkel. Tänk dig en betesmark som alla herdar i en by får använda. Varje herde tjänar på att låta ytterligare ett djur beta, eftersom vinsten går till honom själv medan kostnaden för att marken slits delas av alla. Eftersom samma resonemang gäller för varje herde, kommer betesmarken till slut att vara förstörd.",
      "Argumentet har en brutal logik, och Hardin drog en kraftig slutsats av det: när resurser delas av många går det illa, om inte staten tar över eller marken delas upp i privata tomter. Liknande tankegångar har sedan använts för att förklara problem som överfiske, utsläpp och slöseri med vatten. Bilden fastnade för att den fångar ett verkligt problem: ibland är det som är rationellt för den enskilde skadligt för gruppen. Det bör tilläggas att Hardins egentliga ärende var befolkningstillväxten, där jorden var den allmänning som riskerade att överutnyttjas.",
      "Men Hardins berättelse bygger på ett antagande som sällan prövades, nämligen att herdarna inte kan tala med varandra. Statsvetaren Elinor Ostrom började i slutet av 1980-talet systematiskt studera hur människor i verkligheten förvaltar gemensamma resurser. Hon sammanställde ett stort antal fallstudier, bland annat av bevattningssystem i Spanien och Filippinerna, alpängar i Schweiz och fiskevatten på flera håll. Hon fann att det på många ställen fanns lokala regler som hade hållit i århundraden.",
      "Reglerna var inte identiska, men hade drag gemensamt. Det var tydligt vem som fick använda resursen, och gränserna var kända. De som berördes av reglerna hade i regel också inflytande över dem. Någon övervakade att reglerna följdes, överträdelser straffades i proportion till vad de kostat, och det fanns billiga sätt att lösa konflikter. Där dessa villkor var uppfyllda kunde grupper undvika både förstörelse och statlig styrning. För detta fick Ostrom 2009 ekonomipriset till Alfred Nobels minne, som första kvinna. Ostrom betonade att reglerna ofta vuxit fram nedifrån och över lång tid, i stället för att införas av en myndighet.",
      "Tankegången har även fått ny användning i den digitala världen. Wikipedia, öppen programvara och vetenskapliga arkiv är gemensamma resurser som ingen äger ensam och som ändå underhålls, ofta av frivilliga. Här är problemet delvis det omvända mot Hardins betesmark: det är inte användningen som sliter ut resursen utan bristande bidrag, eftersom var och en kan dra nytta av andras arbete utan att själv bidra. Även i dessa miljöer har reglerna spelat roll: vem som får ändra, hur tvister avgörs och hur missbruk upptäcks.",
      "Ostroms resultat innebär inte att allmänningar alltid sköter sig själva. Hon visade snarare att utfallet beror på villkoren, och att stora, anonyma grupper utan gemensamma regler är särskilt utsatta. Havens fiskbestånd, som delas av många länder och aktörer utan att någon kan övervaka alla, liknar mer Hardins betesmark än en schweizisk alpäng. Lärdomen är därför inte att Hardin hade fel och Ostrom rätt, utan att båda beskriver verkliga mekanismer, och att uppgiften är att veta vilken som verkar."
    ],
    "questions": [
      {
        "id": "las-allmanning-1",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Hardins modell beskriver en verklig mekanism, men Ostrom visade att grupper under vissa villkor kan förvalta gemensamma resurser utan förstörelse.",
            "why": "Rätt. Sista stycket sammanfattar det: båda beskriver verkliga mekanismer, och utfallet beror på villkoren."
          },
          {
            "text": "Hardin hade fel i sin analys av gemensamma resurser.",
            "why": "Motsatsen. Sista stycket säger uttryckligen att lärdomen inte är att Hardin hade fel."
          },
          {
            "text": "Statlig styrning är alltid nödvändig för att skydda gemensamma resurser.",
            "why": "Motsatsen. Ostrom visade att grupper kunde undvika både förstörelse och statlig styrning."
          },
          {
            "text": "Gemensamma resurser sköter sig alltid själva när människor kan prata med varandra.",
            "why": "För starkt. Fjärde och sjätte stycket kräver särskilda villkor, och stora anonyma grupper är särskilt utsatta."
          }
        ],
        "correct": 0,
        "paragraph": 5
      },
      {
        "id": "las-allmanning-2",
        "type": "detalj",
        "prompt": "Vilket antagande i Hardins berättelse ifrågasatte Ostrom?",
        "options": [
          {
            "text": "Att varje herde tjänar på att låta ytterligare ett djur beta.",
            "why": "Ostrom ifrågasatte inte logiken. Texten kallar den 'brutal' och säger att Hardin fångar ett verkligt problem."
          },
          {
            "text": "Att de som använder resursen inte kan komma överens om regler.",
            "why": "Rätt. Tredje stycket: Hardins antagande var 'att herdarna inte kan tala med varandra'."
          },
          {
            "text": "Att en betesmark kan förstöras av överutnyttjande.",
            "why": "Ostrom bestred inte att det kan hända. Hon visade att det inte händer när vissa villkor är uppfyllda."
          },
          {
            "text": "Att privata tomter är dyrare än statlig förvaltning.",
            "why": "Finns inte i texten. Kostnadsjämförelser mellan privat och statlig förvaltning görs aldrig."
          }
        ],
        "correct": 1,
        "paragraph": 2
      },
      {
        "id": "las-allmanning-3",
        "type": "slutsats",
        "prompt": "Vilken av följande resurser skulle, enligt texten, vara mest utsatt för överutnyttjande?",
        "options": [
          {
            "text": "En alpäng som används av några bybor enligt gamla regler.",
            "why": "Motsatsen. Alpängarna i Schweiz nämns som exempel där lokala regler fungerat."
          },
          {
            "text": "Ett bevattningssystem där användarna själva utformat och övervakar reglerna.",
            "why": "Motsatsen. Det motsvarar villkoren i fjärde stycket som gör att förstörelse undviks."
          },
          {
            "text": "Ett fiskevatten där några få fiskare känner varandra och bestämmer tillsammans.",
            "why": "Motsatsen. Små grupper med inflytande över reglerna är inte de som är särskilt utsatta."
          },
          {
            "text": "En resurs som delas av många anonyma användare utan gemensamma regler och utan övervakning.",
            "why": "Rätt. Sista stycket: stora, anonyma grupper utan gemensamma regler är särskilt utsatta, och fiskbestånden har ingen som kan övervaka alla."
          }
        ],
        "correct": 3,
        "paragraph": 5
      },
      {
        "id": "las-allmanning-4",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'brutal' i uttrycket 'en brutal logik' i andra stycket?",
        "options": [
          {
            "text": "Våldsam.",
            "why": "Ordagrann tolkning. Det handlar inte om våld, utan om hur ett resonemang drivs till sin ände."
          },
          {
            "text": "Orättvis.",
            "why": "Texten kallar inte argumentet orättvist. Det som kritiseras är dess antagande, inte dess rättvisa."
          },
          {
            "text": "Obarmhärtigt entydig och svår att komma undan.",
            "why": "Rätt. Resonemanget leder steg för steg till förstörelse, och texten säger att bilden fastnade för att den fångar ett verkligt problem."
          },
          {
            "text": "Ofullständig.",
            "why": "Motsatsen i ton. Ordet beskriver ett argument som verkar vattentätt, inte ett som saknar delar."
          }
        ],
        "correct": 2,
        "paragraph": 1
      }
    ]
  },
  {
    "id": "las-semmelweis",
    "title": "Mannen som bad läkarna tvätta händerna",
    "topic": "naturvetenskap",
    "paragraphs": [
      "I mitten av 1800-talet var barnsängsfeber en av de mest fruktade dödsorsakerna för unga kvinnor. Sjukdomen drabbade kvinnor kort efter förlossningen och kunde döda inom några dagar. På Allgemeines Krankenhaus i Wien, ett av Europas största sjukhus på den tiden, fanns två förlossningskliniker. Den ena sköttes av läkare och läkarstudenter, den andra av barnmorskor och barnmorskeelever. Det som väckte uppmärksamhet var att dödligheten i den första kliniken under flera år var markant högre än i den andra. Enligt samtida berättelser bad kvinnor på knä om att få föda i den andra kliniken.",
      "Den ungerske läkaren Ignaz Semmelweis började 1846 arbeta som assistent på den första kliniken, och han satte sig före att hitta orsaken. Han prövade och förkastade ett antal förklaringar. Överbeläggning kunde inte vara orsaken, eftersom den andra kliniken var minst lika full. Inte heller klimatet eller förlossningsställningen kunde förklara skillnaden. Svaret kom 1847, när hans kollega Jakob Kolletschka dog efter att ha skurit sig under en obduktion, med symtom som liknade barnsängsfeber. Semmelweis drog slutsatsen att något från de döda kropparna kunde överföras till de levande.",
      "Det gav en förklaring till skillnaden mellan klinikerna. Läkare och studenter på den första kliniken utförde obduktioner på morgonen och gick direkt därefter till förlossningsavdelningen för att undersöka kvinnor, medan barnmorskorna inte deltog i obduktionerna. Semmelweis införde våren 1847 ett krav på att alla skulle tvätta händerna i en lösning av klorkalk innan de undersökte en patient. Dödligheten föll kraftigt, från över tio procent till några få procent, ungefär som på barnmorskeavdelningen. Hans iakttagelse var alltså inte en gissning utan stöddes av siffror.",
      "Valet av klorkalk var inte självklart. Semmelweis hade lagt märke till att lukten från de döda kropparna satt kvar på händerna även efter vanlig tvätt med tvål. Enligt vad som brukar berättas resonerade han att det som gav lukten också var det som bar sjukdomen, och att ett medel som tog bort lukten därför borde ta bort smittan. Resonemanget förefaller i dag klumpigt, men åtgärden fungerade. Det är ett exempel på att en användbar metod ibland föregår en riktig förklaring, och att den som hittat metoden därför kan ha svårt att försvara den.",
      "Man skulle kunna tro att resultatet togs emot med lättnad. Så blev det inte. Semmelweis publicerade sig knappt själv, och när han till slut skrev en bok, flera år senare, var den vidlyftig och full av angrepp mot kritiker. Många läkare uppfattade dessutom hans slutsats som en anklagelse: den innebar att läkarna själva burit döden med sig till de sjuka. Det fanns heller ingen accepterad teori om hur smitta fungerade. Den ledande uppfattningen var att sjukdomar spreds genom förgiftad luft, och en lösning med klorkalk passade inte in i den bilden. Semmelweis kunde visa att tvättning hjälpte, men inte förklara varför.",
      "Han förlorade till slut sin tjänst i Wien, flyttade till Budapest och fortsatte sin kamp där. Hans sista år var plågsamma. Han fick allt svårare att kontrollera sitt beteende och lades 1865 in på ett sinnessjukhus, där han avled efter några veckor, troligen av en infektion i ett sår. Först under de följande decennierna fick bakteriologin sitt genombrott genom bland andra Louis Pasteur och Robert Koch, och Joseph Lister införde antiseptik vid operationer. Då fick Semmelweis iakttagelse äntligen en teori att vila på.",
      "Semmelweis var inte helt ensam i sin misstanke. Redan 1795 hade den skotske läkaren Alexander Gordon skrivit att barnsängsfeber spreds av vårdpersonal, och 1843 hade amerikanen Oliver Wendell Holmes gjort ett liknande påstående. Skillnaden var att Semmelweis kunde ställa två kliniker mot varandra och visa effekten av en enda åtgärd. Det var ett tungt argument, men det räckte inte. Insikten spreds långsamt eftersom ingen av dem fick sällskap av en teori som tilltalade kollegorna.",
      "I efterhand har Semmelweis fått upprättelse. Medicinska universitetet i Budapest bär i dag hans namn, och uttrycket Semmelweis-reflexen används för benägenheten att avfärda ny kunskap som strider mot rådande föreställningar, utan att pröva den. Det är en träffande men grov beskrivning, eftersom den också kan användas av den som själv har fel och vill göra sina kritiker till bakåtsträvare.",
      "Berättelsen brukar användas som ett varnande exempel på hur etablerade uppfattningar motstår nya bevis. Det är i någon mån rättvist, men det är också en förenkling. Att läkarna tvekade inför ett resultat som saknade förklaring är inte självklart irrationellt: påståenden som bara vilar på ett samband, utan en mekanism, har ofta visat sig vara felaktiga. Samtidigt visar fallet att det finns en gräns för hur länge man kan avvakta. När en åtgärd uppenbart räddar liv är det rimligt att tillämpa den medan teorin ännu utarbetas. Svårigheten ligger i att veta när den gränsen har passerats, och det är en fråga som varje tid måste ställa på nytt."
    ],
    "questions": [
      {
        "id": "las-semmelweis-1",
        "type": "huvudtanke",
        "prompt": "Vad är textens huvudtanke?",
        "options": [
          {
            "text": "Etablerade läkare avvisade medvetet bevis för att skydda sina egna intressen.",
            "why": "För starkt och bara ett delperspektiv. Sista stycket kallar den tolkningen en förenkling och säger att tveksamheten inte självklart var irrationell."
          },
          {
            "text": "Semmelweis hade en färdig teori om bakterier som läkarna inte ville lyssna på.",
            "why": "Motsatsen. Femte stycket säger att han kunde visa att tvättning hjälpte men inte förklara varför, och att teorin kom decennier senare."
          },
          {
            "text": "Semmelweis visade att handtvätt minskade dödligheten, men hans upptäckt mötte motstånd, delvis för att den saknade förklaring, och fallet visar svårigheten att avgöra när bevis räcker.",
            "why": "Rätt. Det knyter ihop upptäckten (stycke 2–3), motståndet (5–6) och slutstyckets resonemang om när man ska agera."
          },
          {
            "text": "Barnsängsfeber försvann från Wien efter Semmelweis införda tvättkrav.",
            "why": "Finns inte i texten. Dödligheten föll på kliniken, men motståndet och Semmelweis avsked visar att metoden inte slog igenom direkt."
          }
        ],
        "correct": 2,
        "paragraph": 8
      },
      {
        "id": "las-semmelweis-2",
        "type": "detalj",
        "prompt": "Varför kunde överbeläggning avfärdas som orsak till den höga dödligheten?",
        "options": [
          {
            "text": "Den andra kliniken var minst lika full men hade lägre dödlighet.",
            "why": "Rätt. Andra stycket: 'eftersom den andra kliniken var minst lika full'."
          },
          {
            "text": "Den första kliniken hade färre patienter än den andra men högre dödlighet.",
            "why": "Fel jämförelse. Texten säger minst lika full för den andra, inte att den första hade färre patienter."
          },
          {
            "text": "Dödligheten var densamma på båda klinikerna.",
            "why": "Motsatsen. Hela problemet var att dödligheten skilde sig åt."
          },
          {
            "text": "Semmelweis hade inga siffror över antalet patienter.",
            "why": "Finns inte i texten. Avfärdandet bygger på en jämförelse mellan klinikerna."
          }
        ],
        "correct": 0,
        "paragraph": 1
      },
      {
        "id": "las-semmelweis-3",
        "type": "slutsats",
        "prompt": "Vilken slutsats kan dras om varför Semmelweis resultat möttes med motstånd?",
        "options": [
          {
            "text": "Resultatet saknade stöd i siffror.",
            "why": "Motsatsen. Tredje stycket säger att dödligheten föll kraftigt, och femte att han kunde visa att tvättning hjälpte."
          },
          {
            "text": "Resultatet kändes som en anklagelse mot läkarna och stred mot den gängse uppfattningen om hur sjukdom spreds.",
            "why": "Rätt. Femte stycket nämner båda: läkarna 'burit döden med sig', och luftteorin som klorkalk inte passade in i."
          },
          {
            "text": "Klorkalk var för dyrt för att användas på sjukhus.",
            "why": "Finns inte i texten. Kostnader nämns aldrig."
          },
          {
            "text": "Läkarna hade aldrig hört talas om hans resultat.",
            "why": "Finns inte i texten, och motsägs av att de 'uppfattade slutsatsen som en anklagelse'. Det var innehållet som mötte motstånd."
          }
        ],
        "correct": 1,
        "paragraph": 4
      },
      {
        "id": "las-semmelweis-4",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'vidlyftig' i meningen 'den var vidlyftig och full av angrepp mot kritiker'?",
        "options": [
          {
            "text": "Slarvigt skriven.",
            "why": "För starkt och finns inte i texten. Ordet beskriver omfång, inte kvalitet."
          },
          {
            "text": "Mycket kortfattad.",
            "why": "Motsatsen. Vidlyftig betyder långt från kortfattad."
          },
          {
            "text": "Vågad i sin slutsats.",
            "why": "Förväxling. Texten beskriver bokens form och ton, inte hur djärv slutsatsen var."
          },
          {
            "text": "Mycket omfattande och långdragen.",
            "why": "Rätt. 'Vidlyftig' betyder utförlig och mångordig. Det passar tillsammans med 'full av angrepp' i en bok som blev svår att ta till sig."
          }
        ],
        "correct": 3,
        "paragraph": 4
      }
    ]
  },
  {
    "id": "las-munthistoria",
    "title": "Minnet som källa",
    "topic": "historia",
    "paragraphs": [
      "Historikern arbetar traditionellt med dokument: brev, protokoll, domar, räkenskaper. De lämnar spår efter dem som skrev och sparade, och det är en begränsning, eftersom långt ifrån alla har lämnat skriftliga spår. Arbetare, kvinnor, barn, fattiga och människor i avlägsna delar av världen har ofta bara förekommit i andras handlingar, som föremål för beskrivningar eller åtgärder, sällan som röster. Under senare hälften av 1900-talet började därför allt fler historiker göra något annat: de intervjuade människor och spelade in vad de berättade. Metoden kallas muntlig historia.",
      "Tanken är att den som varit med kan berätta om sådant som arkivet tiger om. Inom arbetslivshistoria har intervjuer med tidigare fabriksarbetare visat hur arbetet verkligen gick till, vilka oskrivna regler som fanns på golvet och hur man hanterade cheferna, saker som aldrig skrevs ned i någon arbetsordning. Inom kvinnohistoria har samtal med äldre kvinnor gjort hemarbetet och hushållets ekonomi synliga som historiska fenomen i stället för något som togs för givet. Gemensamt är att intervjun ger tillgång till erfarenhet, inte bara till händelser.",
      "Utvecklingen hängde ihop med tekniken. När bärbara bandspelare blev vanliga under 1950- och 60-talen gick det att spela in samtal i människors hem i stället för att anteckna efteråt, och intervjuerna kunde sparas och lyssnas på av andra. Många länder byggde upp arkiv med inspelade berättelser, och museer och universitet började aktivt samla in minnen om arbetsliv, vardag och migration. Det som en gång var en enskild forskares anteckningar blev ett gemensamt material som kommande generationer kan återvända till.",
      "Metoden har dock mött skepsis. Kritikerna har pekat på att minnet är opålitligt: människor glömmer, blandar ihop årtal och formar med åren sina minnen efter vad som hänt senare. Det är en berättigad invändning, och minnesforskningen bekräftar att återgivningar av händelser är rekonstruktioner snarare än inspelningar. Den som frågar en åttioåring om en strejk på femtiotalet får inte en exakt återgivning, utan en berättelse som präglats av allt som hänt sedan dess.",
      "Ändå menar många historiker att invändningen delvis missar vad intervjuer är bra för. Att en person minns fel om årtalet betyder inte att hon har fel om hur det kändes att stå utanför fabriksgrindarna. Dessutom är skriftliga källor inte felfria: ett protokoll återger det som den som förde det ville eller vågade skriva, och en myndighets rapport speglar myndighetens syn. Ingen källa är en neutral spegel. Det som skiljer är vilka slags fel de är känsliga för, och därför är det klokt att pröva dem mot varandra.",
      "Kanske tydligast har metoden använts för att dokumentera krig och folkmord. Efter andra världskriget har tiotusentals överlevande intervjuats, bland annat i omfattande videoarkiv, och deras berättelser har fyllt luckor som förövarnas handlingar lämnade. Samtidigt har just dessa arkiv visat hur minnet arbetar: två vittnen kan beskriva samma händelse olika utan att någon av dem ljuger, eftersom de stod på olika platser och bär på olika delar av det som hände.",
      "Ett tänkt exempel visar hur det kan gå till. Flera tidigare anställda vid ett bruk berättar att nedläggningen kom som en chock, medan bolagets handlingar visar att den planerats i flera år. Avvikelsen är ingen miss i någon av källorna. Den avslöjar att ledningen höll planerna hemliga för de anställda, något som varken protokollen eller minnena kunde visa var för sig. Det är ofta i skillnaderna mellan källorna som något nytt kommer fram.",
      "Därmed har metoden också förändrat hur forskare ser på minnet självt. I stället för att enbart granska hur väl en berättelse stämmer med vad som verkligen hände, har många börjat fråga varför den berättas just så. Vilka delar framhålls, vilka utelämnas, och vad vill berättaren att lyssnaren ska förstå? Det som tidigare sågs som en felkälla har blivit en källa i sig, en inblick i hur människor skapar mening av sitt liv.",
      "En annan aspekt är intervjuarens egen roll. Frågorna styr vad som berättas, och den som intervjuar bär med sig förväntningar om vad som är viktigt. Därför redovisar noggranna forskare hur intervjun gick till: vem som frågade, vilka frågor som ställdes och i vilken miljö samtalet skedde. Ett samtal vid köksbordet blir ofta annorlunda än ett på ett kontor, och den som talar kan välja att utelämna sådant som känns för privat. På så sätt blir även själva intervjusituationen en del av det material som analyseras.",
      "Det finns också etiska frågor. Den som berättar om sitt liv gör sig sårbar, och forskaren måste överväga vad som får publiceras och hur det påverkar den som berättat och dennes omgivning. Intervjuer med människor som överlevt krig, våld eller övergrepp ställer särskilda krav, och många arkiv har därför regler för hur och när materialet får användas. Metoden ger tillgång till röster som annars skulle ha gått förlorade, men den ställer också krav på ett ansvar som en pärm med protokoll aldrig gör."
    ],
    "questions": [
      {
        "id": "las-munthistoria-1",
        "type": "syfte",
        "prompt": "Varför nämns tidigare fabriksarbetare och äldre kvinnor i andra stycket?",
        "options": [
          {
            "text": "För att visa att dessa grupper är mer pålitliga vittnen än andra.",
            "why": "Finns inte i texten. Pålitlighet diskuteras först i fjärde stycket och gäller minnet i allmänhet."
          },
          {
            "text": "Som exempel på områden där intervjuer synliggjort sådant som arkiven saknar.",
            "why": "Rätt. Stycket inleds med att den som varit med kan berätta det arkivet tiger om, och exemplen illustrerar det."
          },
          {
            "text": "För att visa att muntlig historia bara fungerar inom arbetar- och kvinnohistoria.",
            "why": "För starkt. Det är exempel ('inom ... har ...'), inte en avgränsning av metoden."
          },
          {
            "text": "För att kritisera arkivens tjänstemän.",
            "why": "Finns inte i texten. Arkiven kritiseras inte, de beskrivs som begränsade av vad som skrevs ned."
          }
        ],
        "correct": 1,
        "paragraph": 1
      },
      {
        "id": "las-munthistoria-2",
        "type": "slutsats",
        "prompt": "Vilken slutsats om skriftliga källor ligger närmast texten?",
        "options": [
          {
            "text": "De är mer pålitliga än intervjuer.",
            "why": "Motsatsen. Stycket visar att skriftliga källor inte är felfria."
          },
          {
            "text": "De bör ersättas av intervjuer när det är möjligt.",
            "why": "För starkt. Texten förordar att källorna prövas mot varandra, inte att den ena ersätter den andra."
          },
          {
            "text": "De är oanvändbara eftersom de speglar skribentens syn.",
            "why": "För starkt. Texten säger att de är känsliga för vissa fel, inte att de är oanvändbara."
          },
          {
            "text": "De har, liksom intervjuer, sina egna sorters fel och bör därför prövas mot andra källor.",
            "why": "Rätt. Femte stycket: 'ingen källa är en neutral spegel', och därför bör de prövas mot varandra."
          }
        ],
        "correct": 3,
        "paragraph": 4
      },
      {
        "id": "las-munthistoria-3",
        "type": "detalj",
        "prompt": "Vilken förändring i synen på minnet beskrivs i åttonde stycket?",
        "options": [
          {
            "text": "Man bortser numera från om berättelserna stämmer.",
            "why": "För starkt. Det står 'i stället för att enbart granska', alltså ett tillägg, inte ett byte."
          },
          {
            "text": "Man litar numera fullt ut på människors minnen.",
            "why": "Motsatsen. Fjärde stycket kallar invändningen om opålitligt minne berättigad."
          },
          {
            "text": "Man frågar numera också varför en berättelse berättas på ett visst sätt, inte bara om den stämmer.",
            "why": "Rätt. Åttonde stycket: forskare har börjat fråga varför berättelsen berättas just så, och det sågs tidigare som en felkälla."
          },
          {
            "text": "Man har slutat använda skriftliga källor.",
            "why": "Finns inte i texten. Skriftliga källor ska prövas mot intervjuer, inte överges."
          }
        ],
        "correct": 2,
        "paragraph": 7
      },
      {
        "id": "las-munthistoria-4",
        "type": "ordbetydelse",
        "prompt": "Vad betyder 'berättigad' i meningen 'Det är en berättigad invändning' (fjärde stycket)?",
        "options": [
          {
            "text": "Som har fog för sig.",
            "why": "Rätt. Meningen efter bekräftar invändningen: minnesforskningen visar att återgivningar är rekonstruktioner."
          },
          {
            "text": "Som är tillåten enligt reglerna.",
            "why": "Fel betydelse. Det handlar om att invändningen är rimlig, inte om vad som är tillåtet."
          },
          {
            "text": "Som är helt avgörande för metoden.",
            "why": "För starkt. Femte stycket menar att invändningen 'delvis missar' vad intervjuer är bra för."
          },
          {
            "text": "Som texten tar avstånd ifrån.",
            "why": "Motsatsen. Ordet visar att texten håller med om att invändningen har fog för sig, även om den inte är hela sanningen."
          }
        ],
        "correct": 0,
        "paragraph": 3
      }
    ]
  }
];
