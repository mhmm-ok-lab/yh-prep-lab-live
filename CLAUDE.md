# Claude Code — Project Rules: YH Prep Lab

## Auto-read these files every session
- `docs/DESIGN.md` — design system, palette, grid, component rules
- `docs/UX-CHANGES.md` — UX change log (for Martin's portfolio)

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
