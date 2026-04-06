# Matrix-Resurser Research - 2026-04-05

## Mål
- Hitta gratis resurser för mönsterigenkänning (3x3 / saknad ruta) som kan användas som övning inför antagningsprov.
- Avgöra vilka som går att bädda in i vår app (`iframe`) och vilka som måste öppnas i ny flik.

## Resultatöversikt
| Resurs | Gratis | Relevans (3x3/matrix) | Iframe i vår app | Kommentar |
|---|---|---|---|---|
| IQNIVA Matrix Practice | Ja | Hög | Ja | Har tydliga matrix-set med förklaringar. |
| IQ Pattern Test | Ja (basdel) | Hög | Ja | Fokus på visuella mönster, snabbstart utan konto. |
| OpenPsychometrics FSIQ | Ja | Medel | Ja | Innehåller resonemang men också fler delmoment än bara matrix. |
| Mensa Norway Test | Ja | Hög | Nej | Blockeras av `frame-ancestors` (kan öppnas i ny flik). |
| 123test Abstract Reasoning | Delvis | Medel/Hög | Nej | Blockeras av `frame-ancestors 'none'` och `x-frame-options: deny`. |

## Verifieringsmetod
1. Manuell sidgranskning av innehåll/positionering.
2. HTTP-header-kontroll (`Content-Security-Policy`, `X-Frame-Options`).
3. Praktisk test i headless Chromium (Playwright) med iframe-inladdning.

## Rekommenderad integration (för main app senare)
- Steg 1: kör externa resurser i separat "Matrix Lab"-modul.
- Steg 2: om källa stöder iframe, visa i inbyggd förhandsruta.
- Steg 3: om källan blockerar iframe, visa tydlig fallback-knapp "Öppna i ny flik".
- Steg 4: parallellt bygga intern frågebank med egna matrix-uppgifter för full kontroll.

## Viktig notering
- Vi kan inte bekräfta att just 3x3 Raven-liknande frågor kommer exakt i Nackademins/IT-H:s prov.
- De är dock starkt relevanta som träning för logik, mönsterigenkänning och tidspress.

## Källor
- https://iqniva.com/practice/matrix-reasoning/
- https://iqpatterntest.com/
- https://openpsychometrics.org/tests/FSIQ/
- https://test.mensa.no/Home/Test/en-UK
- https://www.123test.com/abstract-reasoning-test/
- https://www.practiceaptitudetests.com/abstract-reasoning-tests/
