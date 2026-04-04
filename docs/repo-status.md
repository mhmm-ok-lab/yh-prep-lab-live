# Repo Status - 2026-04-04

## Nuvarande läge
- Lokalt projekt: `/Users/martinhammarberg/Documents/yh-prep-lab`
- Aktiv branch: `codex/yh-prep-autopilot-night`
- Git remote `origin`: `https://github.com/davidshore/jobbsok.git`
- Git remote `live`: `https://github.com/mhmm-ok-lab/yh-prep-lab-live.git`

Det betyder:
- Ursprunglig samarbetsbranch pushas fortfarande till `jobbsok` via `origin`.
- Live-sidan publiceras via separat repo `yh-prep-lab-live` via `live`.

## Live-länk just nu
- Stabil live-URL är aktiv: `https://mhmm-ok-lab.github.io/yh-prep-lab-live/`
- CI/CD-workflow för Pages finns i `.github/workflows/deploy-pages.yml` (verify + build + deploy).
- Workflow körs i `yh-prep-lab-live` där vi har behörighet att aktivera Pages.

## Plan för separering (nästa session)
1. (Valfritt) Behåll `origin` för samarbete med `jobbsok`.
2. Fortsätt använda `live` för produktion/publicering.
3. Om ni vill: byt standard-flöde så `origin` också pekar mot eget repo senare.
4. Behåll permanent länk i `README.md`.

## Minsta manuella steg som krävs av repo-admin
1. Inga akuta steg krävs nu för live-länken.
2. Endast om `jobbsok` också ska publiceras: aktivera Pages där separat.
