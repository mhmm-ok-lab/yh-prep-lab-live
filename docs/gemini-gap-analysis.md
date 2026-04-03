# Gemini-plan jämförelse och beslut

Detta dokument visar vad vi tog med från Gemini-planen, vad som redan finns, och vad vi medvetet väntar med.

## Snabb slutsats

- Gemini-planen var bra som idébank för struktur, innehåll och övningsformat.
- Vi valde att bygga vidare på den nuvarande Vite + TypeScript-MVP:n i stället för att byta stack inför provveckan.
- Mobilupplevelsen prioriteras högre än visuell täthet eller teknisk ombyggnad just nu.

## Status per område

| Område | Gemini-idé | Läget nu | Beslut |
| --- | --- | --- | --- |
| Stack | Next.js + Tailwind + shadcn | Vi kör Vite + TypeScript | Behåll nuvarande stack tills efter antagningsprovet |
| Dashboard | Fyra tydliga spår/flikar | Implementerat som UX, IT, Prog och Logik | Behåll, men håll ytan kompakt på mobil |
| Quizmotor | Återanvändbar QuizEngine | Frågelogik och sessionsflöde finns redan | Räcker för MVP, refaktor senare |
| Ready-o-meter | Progress per kategori | Implementerat i översikt | Behåll som snabb överblick |
| UX-case | Scenario-generator och workflow | Implementerat | Fortsätt bygga på med fler case senare |
| IT-säkerhet | OSI, TCP/UDP, IP, DNS, säkerhet | Implementerat i frågebank och researchkort | Hög prioritet, särskilt Del 2 |
| Programmering 1/A | Variabler, villkor, loopar, metoder, felsökning | Implementerat i frågebank och mockprov | Fortsätt fylla på med fler tracing- och debugginguppgifter |
| Researchmotor | Officiell först, community separat | Implementerat som evidence-kort | Fortsätt tagga källnivå och confidence |
| Mobile-first | Tydlig mobilprioritet | Implementerat med kompakt ovan-fold-layout | Behåll, och justera bara om användning visar problem |

## Vad som redan är implementerat

- Tre huvudspår:
  - `Nackademin UX`
  - `IT-Högskolan IT-säkerhet`
  - `Programmering 1/A`
- Fyra snabblägen:
  - `UX`
  - `IT`
  - `Prog`
  - `Logik`
- Dagens pass med sprintlogik och 30-45 min mål.
- Frågebank med filter på spår, ämne, svårighetsnivå och källnivå.
- Två mockprov:
  - Nackademin-liknande 60 min
  - IT-H Del 1 + Del 2, 90 min
- Researchkort med tydlig märkning:
  - `Officiell`
  - `Sekundär`
  - `Community`
- Backup/export och import av studiedata.
- Mobilanpassad översikt där viktigaste handlingen ligger först.

## Vad som återstår

- Fler frågor som bättre täcker svårare varianter av varje provtyp.
- Mer detaljerad komponentisering av quiz- och mockprovsmotor när läget är lugnare.
- Fler researchkällor och större bevisbank för tidigare provmönster.
- Eventuell senare migrering till en mer komponenttung stack om vi vill skala ut produktens livslängd.

## Vad vi medvetet valde bort just nu

- Vi valde bort stackbyte till Next.js/Tailwind/shadcn inför provet.
- Vi valde bort större visuell yta på mobil eftersom det gjorde läsning och tryck svårare.
- Vi valde bort att lägga allt i ett enda stort kort; små, separata ytor gör fel lättare att förstå och rätta.

## Rekommenderad arbetsordning efter provveckan

1. Komponentisera quizmotorn.
2. Utöka frågebanken med fler svåra och blandade uppgifter.
3. Bedöm om stackbyte faktiskt är värt tiden.
4. Fortsätt samla research och notera vad som är officiellt, antaget och community-baserat.
