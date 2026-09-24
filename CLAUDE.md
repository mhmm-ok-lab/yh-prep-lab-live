# Claude Code — Project Rules: YH Prep Lab

## Auto-read these files every session
- `docs/DESIGN.md` — design system, palette, grid, component rules
- `docs/UX-CHANGES.md` — UX change log (for Martin's portfolio)

## HP-prep (högskoleprovet 18 okt 2026)
Gemensam plan + todo (privat Claude Doc, läs med docs-verktygen): https://claude.ai/code/artifact/7e845e17-541d-463e-9676-080866e83f3c
Ta en rad i Byggplanen, sätt Status + Vem innan du börjar.

## Mandatory rules

### After every UX or visual change
Update `docs/UX-CHANGES.md` with:
- Date
- What changed and why (design rationale)
- Before/after description
- Which Stitch principle it follows

### Design system
Always follow `docs/DESIGN.md`. Never introduce:
- A font size not in the 3-size scale
- A pill height different from the two defined sizes (nav: 28px, action: 36px)
- A border on a section separator (Stitch No-Line rule)
- A color not in the defined palette tokens

### Branch & deploy
- Active branch: `claude/content-quality`
- Deploy: `git push live HEAD:main`
- TS check before commit: `node node_modules/.bin/tsc --noEmit --project tsconfig.json`

### Token efficiency
- Keep screenshots to a minimum — use `preview_eval` to check values first
- Read only the lines needed, not entire files
- Commit after logical batches, not every single change
