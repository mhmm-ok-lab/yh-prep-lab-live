# UX Notes - YH Prep Lab

Syfte:
- Spara UX-resonemang och beslut som underlag för senare portfolio.
- Göra beslut spårbara: problem -> val -> varför -> nästa test.

## Canonical portfolio trail

- Den centrala UX-anteckningen för Codex Pulse hålls också i projektets gemensamma dokumentation utanför den här repan.
- Den här lokala filen fungerar som arbetskopian för YH Prep Lab och ska uppdateras när designbeslut påverkar mobil, läsbarhet eller träningsflöde.

## Portfolio-syntes (2026-04-03)

Den viktigaste lärdomen i denna iteration var att "responsiv" inte räcker om mobilen känns trång eller svår att använda. Efter direkt användarfeedback ändrades layouten till verklig mobile-first: kritisk information först, mindre visuellt brus i samma vy och tydligare separering mellan handlingar för att minska feltouch.

## Beslut och språk

- Primärt krav: viktigaste informationen ska kunna ses snabbt utan att användaren först måste tolka stora, täta kort.
- Primärt krav: knappar ska vara tillräckligt små för att inte dominera skärmen, men ändå säkra att trycka på var för sig.
- Rekommendation: detaljer som inte behövs direkt ska ligga bakom utfällbara sektioner.
- Semantik: "Snabbstart idag" används som huvudentrypoint i stället för flera konkurrerande CTA-rutor.
- Layoutprincip: det viktigaste ska få plats på en mobilskärm utan att användaren först behöver scrolla för att förstå vad som är nästa steg.
- Layoutprincip: stora rutnät och breda knappar ersätts av mindre, separata enheter med tydlig luft mellan.

## Observationer från användning

- Problem: knappar upplevdes för breda/långa.
- Problem: för mycket information i samma ruta gjorde det svårare att läsa och skriva.
- Problem: textfält och förklaringar konkurrerade med CTA:er i samma vy.
- Effekt: användaren upplevde liten skillnad trots tidigare justering, vilket pekade på att desktop-struktur fortfarande läckte in i mobilvyn.

## Nästa UX-kontroller

- Validera 390px bred iPhone-vy med fokus på:
  - en tydlig primär handling ovanför fold
  - ingen oavsiktlig feltouch mellan närliggande knappar
  - läsbarhet i korta förklaringar och felmeddelanden
- Validera att hjälptxt och felmeddelanden fortfarande får plats utan att aktiv övning känns trång.
- Validera att ett spår, en fråga och ett nästa steg går att förstå inom ett ögonkast.
- Fortsatt loggning per byggsession i `docs/ux-build-logs/`.

## Senare tillägg samma dag

- Intervjuformat med flervalsalternativ + fritext infördes för att göra onboarding snabb och röstvänlig.
- Resultatkortet för mockprov visar nu sektionsrapport (inklusive viktad poäng) så Del 1/Del 2 kan analyseras separat.

## UI-Iteration (sen kväll 2026-04-03)

- Navigation: Python-kursen fick en kompakt toppremsa med länkar tillbaka till huvudappen (`Till YH Prep`, `Prog-frågebank`, `Mockprov`).
  Why: Växling mellan kurs och huvudapp skulle vara möjlig utan att ta stor yta från innehållet.

- Layoutarkitektur: Bottenmenyn behölls som lokal navigation i huvudappen, medan toppens snabbval används för tvärgående hopp mellan arbetslägen.
  Why: Minskar dubbelnavigation och gör "vad hör hemma var" tydligare.

- CTA-prioritering: Stor Python-knapp togs bort från kritiska ytor och flyttades till kompakt snabbvalsmeny.
  Why: Stora CTA:er tog för mycket fokus från det rekommenderade studieflödet.

- Personlig styrning: En adaptiv rekommendationsmotor lades till med "Rekommendation just nu" (spår, ämne, läge, tid).
  Why: Sprint-label visar fas, men användaren behövde en separat personlig förslagsmarkering.

- Statusindikatorer: Färgkodade statuschips infördes (`Ej startad`, `Påbörjad`, `Mycket fel`, `Nära klar`, `Viktigast`).
  Why: Snabb visuellt avläsbar progress/status med fokus på svaga områden och prioritering.

- Stabilitet: Service worker/cacheläge justerades för att stoppa layout-flipp mellan gamla/nya versioner på GitHub Pages.
  Why: Caching gav inkonsekvent UI och sänkte tillit vid test på flera enheter.

## Recommender-UI justering (senare samma kväll)

- Problem: Ett stort rekommendationsfönster tog för mycket yta och konkurrerade med kärnflödet.
- Beslut: Byt från stor rekommendationspanel till lågmäld markering i knappraden.
  Why: Rekommendation ska guida, inte dominera.

- Beslut: Rekommenderat spår markeras med liten `(R)` och ligger först i ordningen vänster-till-höger.
  Why: Prioritering blir tydlig via placering och subtil markör i stället för stor ruta.

- Beslut: Färgkodning flyttades till actionknapparna:
  - gul = ej startad
  - orange = påbörjad
  - röd = mycket fel (öva mer)
  - grön = nära klar
  Why: Status blir direkt synlig där användaren faktiskt klickar.

- Beslut: Separat stor CTA "Lär i prioriterat spår" togs bort från översiktskortet.
  Why: Undvika dublett-CTA som konkurrerar med den nya kompakta prioriteringsraden.

- Beslut: Rekommenderat läge (`Lär`/`Drill`) visas direkt i respektive prioriteringsknapp.
  Why: Träningsläget ska framgå i samma kontroll där användaren väljer spår, utan extra panel eller extra knapp.

- Beslut: Lägg till säker "dra ned för uppdatera" i mobilwebben med autospar innan reload.
  Why: Användaren förväntar sig pull-to-refresh på mobil och ska kunna uppdatera utan oro för att tappa progress.

- Beslut: Harmoniserad visuell stil utifrån `Sprint A`-pillen (färg, rundhet, vikt).
  Why: Den ytan upplevdes mest sammanhållen; resten av UI:t behövde följa samma formspråk för mindre spretig känsla.

- Beslut: Enhetligt huvudtypsnitt (`Space Grotesk`) i både huvudapp och Python-del.
  Why: Blandade rubrik-/brödtypsnitt skapade visuell friktion och en "rörig" helhetskänsla.

- Beslut: Minska instruktionstext i huvudvyn (in-frame copy) och ersätta med kortare etiketter.
  Why: Förklaringar i själva arbetsytan upplevdes som brus och gjorde gränssnittet rörigare.

- Beslut: En (1) plats för användarbyte - avatar-menyn i toppen.
  Why: Dubblett av användarväxlare i översikten skapade onödig komplexitet.

- Beslut: User-avatar fick siluett + initialbadge och högre lagerordning för dropdown.
  Why: Bättre igenkänning av "det här är konto/användare" och säkrare menyvisning ovanpå andra kontroller.

- Beslut: Konsolidera navigation till en topp-dropdown med aktuell platsindikator.
  Why: Tidigare kombination av snabbval + separat knappnav gav funktionsdubbletter och onödig ytåtgång.

- Beslut: Samma nav-princip i Python-delen (Läge-dropdown + returvägar till YH-vyer).
  Why: Konsekvent orientering mellan delar och tydligare väg tillbaka till huvudflödet.

- Beslut: Gör toppmenyer ömsesidigt exklusiva (bara en öppen i taget).
  Why: Överlappande dropdowns skapade visuella krockar och otydligt fokus.

- Beslut: Byt platsindikator från "Läge: X" till bara aktuell vy ("Översikt", "Mockprov" ...).
  Why: Minskar metatext i UI och gör etiketten mer direkt.

- Beslut: Lägg till "Mini-check 5 min (alla spår)" i mockprov.
  Why: Snabb nulägeskoll med små frågor från UX, IT och Programmering 1/A utan att starta ett långt pass.

- Beslut: Kanoniskt gäst-id satt till `guest` med migrering från äldre varianter (`gäst`, `gast`, `gst`).
  Why: Säkerställer att progress inte sprids över flera pseudo-användare och att avatar/default blir förutsägbar.

- Beslut: Enhetlig svensk copy i användarmenyer (`användar-id`).
  Why: Minskar språkblandning i en känslig UI-yta (konto/context-byte).

- Beslut: Egen `Genomgång`-vy för onboarding med test.
  Why: Kombinerar orientering (hur sidan används) och diagnostik (vad användaren redan kan) i ett sammanhängande flöde.

- Beslut: Timer ska inte trigga full `render()` varje sekund.
  Why: Full rerender under aktiv session skapar störande UI-flimmer och försämrar kontrollkänslan.

- Beslut: Mjuk tidsindikator (tunn progresslinje) istället för stark varningsfärg.
  Why: Tidshjälp ska vara stödjande, inte stressdrivande.

- Beslut: Följ etablerad radio-layout för single-choice (grupperad kontroll + tydliga labels i vertikal lista).
  Why: Bättre kognitiv stabilitet och färre feltolkningar i provläge.

- Beslut: Resultat ska alltid innehålla fråga-för-fråga-review, inte bara totalpoäng.
  Why: Lärandevärdet kommer från att se exakt vad som var rätt/fel och varför.

- Beslut: Under aktiv session visas endast testkortet (fokusläge).
  Why: Koncentrationskrav i testläge väger tyngre än samtidig överblick av andra moduler.

- Beslut: Ersätt slumpad "skapa user" med explicit input vid skapande + synlig historiklista.
  Why: Bättre kontroll, mindre friktion, och tydlig återgång till tidigare användare.

- Beslut: Ett gemensamt temalager (font + färg + rundhet) ska styra både huvudapp och Python-del.
  Why: Visuell kontinuitet är viktigare än lokala stilavvikelser mellan moduler.

- Beslut: `Byt användare` ska vara ett listval, inte fritext-prompt.
  Why: Minskar felstavningar, minskar risken att skapa oavsiktliga nya id:n och gör återgång till tidigare användare tydlig.

- Beslut: `Skapa ny användare` är enda vägen som öppnar textprompt för nytt id.
  Why: Separerar två olika intentioner (växla vs skapa) och följer etablerad konto-UX.

## Portfolio-syntes (2026-04-04)

Den viktigaste lärdomen i nattens pass var att vi behövde gå från "iterera efter skärmdump" till "egen verifiering i riktig browser". När vi testade själva såg vi tydligt vad som störde koncentrationen: timern gav onödig stresssignal, desktop blev för bred, och svarsalternativen behövde striktare struktur. Därför låstes layouten till en lugn, centrerad mobilram även på desktop, testkortet renades från röd avbryt-yta, och svarsalternativen sattes i en konsekvent vertikal radio-lista.

## Senaste beslut (2026-04-04)

- Beslut: Top-level layout på desktop centreras till mobil-lik bredd i stället för bred dashboard-grid.
  Why: Användaren bad uttryckligen om detta som fallback när desktop-känslan blev för spretig.

- Beslut: Aktivt test använder nu subtil tidsindikator (`Tidspuls` + tunn linje) utan stark röd signal.
  Why: Minska stresspåslag och hålla fokus på frågan.

- Beslut: Stor röd `Avbryt`-knapp ersatt med liten `×` i hörnet.
  Why: Lägre visuell dominans och mindre "hotfull" affordance.

- Beslut: Svarsalternativ i mini-test låstes till en enhetlig vertikal radio-layout med fast kolumn för A/B/C/D.
  Why: Förhindra hoppig placering och skapa jämn avläsning mellan frågor.

- Beslut: Session-timer slutade med återkommande tick-loop och kör nu endast timeout + diskret UI-uppdatering.
  Why: Minimera risken för upplevd omrendering/flimmer i toppsektionen.

- Beslut: Huvudtypsnitt harmoniserat till en konsekvent UI-font (`Public Sans`) i huvudappens visuella bas.
  Why: Minska upplevelsen av blandade typografier i kritiska lägen.
