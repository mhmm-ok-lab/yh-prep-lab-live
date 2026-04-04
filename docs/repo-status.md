# Repo Status - 2026-04-04

## Nuvarande läge
- Lokalt projekt: `/Users/martinhammarberg/Documents/New project`
- Aktiv branch: `codex/yh-prep-autopilot-night`
- Git remote `origin`: `https://github.com/davidshore/jobbsok.git`

Det betyder:
- Ja, ändringar pushas just nu till `jobbsok`-repo (på vår branch), inte till ett separat GitHub-repo för bara YH Prep.

## Live-länk just nu
- Ingen stabil publicerings-URL är aktiv i repo-inställningarna just nu.
- Därför kan samma länk inte garanteras förrän publiceringsspåret är klart.
- CI/CD-workflow för Pages finns nu i `.github/workflows/deploy-pages.yml` (verify + build + deploy).
- Senaste körning visar att deploy stoppas av behörighet i repo-inställningarna:
  - `Resource not accessible by integration` vid aktivering av Pages.
  - Detta betyder att workflow-token saknar rätt att slå på Pages i detta repo.

## Plan för separering (nästa session)
1. Skapa nytt dedikerat repo (exempel: `yh-prep-lab`).
2. Koppla om `origin` från `jobbsok` till nya repot.
3. Push `main` + arbetsbranch till nya repot.
4. Aktivera GitHub Pages eller annan host med en stabil URL.
5. Dokumentera permanent länk i `README.md`.

## Minsta manuella steg som krävs av repo-admin
1. Öppna repo-inställningar för `davidshore/jobbsok`.
2. Gå till `Settings` -> `Pages`.
3. Sätt build/deploy till `GitHub Actions`.
4. Kör om senaste workflow (`Deploy YH Prep Lab (Pages)`).
