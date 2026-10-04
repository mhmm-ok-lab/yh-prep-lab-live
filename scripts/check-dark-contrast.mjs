// WCAG-kontrast för mörkt läge. Läser tokens ur html[data-scheme="dark"]-blocken i src/styles.css.
// Kör: node scripts/check-dark-contrast.mjs   (exit 1 om något par underskrider sitt krav)
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const blocks = [...css.matchAll(/html\[data-scheme="dark"\][^{]*\{([^}]*)\}/g)].map((m) => m[1]);
const tokens = {};
for (const b of blocks) for (const m of b.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();

const hex = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const val = (t) => { const v = tokens[t]; if (!v) throw new Error("saknar token " + t); const rgba = v.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/); return rgba ? { rgb: [+rgba[1], +rgba[2], +rgba[3]], a: +rgba[4] } : { rgb: hex(v), a: 1 }; };
const solid = (t, over = "card") => { const c = val(t); if (c.a === 1) return c.rgb; const b = hex(tokens[over]); return c.rgb.map((x, i) => Math.round(x * c.a + b[i] * (1 - c.a))); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [förgrundstoken, bakgrundstoken, krav, användning]
const TEXT = 4.5, UI = 3;
const pairs = [
  ["ink", "bg", TEXT, "Brödtext på sidan"], ["ink", "card", TEXT, "Brödtext på kort"], ["ink", "surface-low", TEXT, "Text på surface-low"],
  ["ink", "surface-container", TEXT, "Text på widget-bakgrund"], ["ink", "surface-highest", TEXT, "Text på surface-highest / Prog-pill"],
  ["ink", "card-bg", TEXT, "Text i fält/pill"], ["ink", "hover-bg", TEXT, "Text vid hover"], ["ink", "field-bg", TEXT, "Inmatningstext"],
  ["text-muted", "bg", TEXT, "Dämpad text på sidan"], ["text-muted", "card", TEXT, "Dämpad text på kort"], ["text-muted", "surface-low", TEXT, "Dämpad text på surface-low"],
  ["text-muted", "surface-highest", TEXT, "Dämpad text på surface-highest"], ["text-muted", "card-bg", TEXT, "Dämpad text på fält"],
  ["text-soft", "card", TEXT, "Extra dämpad text på kort"], ["text-soft", "bg", TEXT, "Extra dämpad text på sidan"], ["text-soft", "card-bg", TEXT, "Extra dämpad text på fält"],
  ["accent", "bg", TEXT, "Accent-text/länk på sidan"], ["accent", "card", TEXT, "Accent-text på kort"], ["accent", "surface-low", TEXT, "Accent-text på surface-low"],
  ["accent", "accent-soft", TEXT, "Accent-text på aktiv mint-yta"], ["accent-soft-ink", "accent-soft", TEXT, "Text på mint (rekommenderad/aktiv)"],
  ["accent-soft-ink", "secondary-fixed", TEXT, "Text på IT-H mint"], ["secondary", "card", TEXT, "Sekundär teal-text på kort"],
  ["on-fill", "fill-start", TEXT, "Knapptext på fylld accent (start)"], ["on-fill", "fill-end", TEXT, "Knapptext på fylld accent (slut)"],
  ["on-fill", "ok-fill", TEXT, "Text på rätt-fylld knapp"], ["on-fill", "danger-fill", TEXT, "Text på fel-fylld knapp"],
  ["honey-ink", "honey", TEXT, "Text på honey (UX-pill)"], ["ink", "honey", TEXT, "Text på markerat LÄS-stycke (honey)"],
  ["text-muted", "honey", TEXT, "Dämpad text på honey"], ["warm", "card", TEXT, "Varm text på kort"], ["warm", "bg", TEXT, "Varm text på sidan"],
  ["track-ux-ink", "track-ux-bg", TEXT, "UX-spårpill"], ["track-it-ink", "track-it-bg", TEXT, "IT-H-spårpill"], ["track-prog-ink", "track-prog-bg", TEXT, "Prog-spårpill"],
  ["danger", "card", TEXT, "Felfärg som text på kort"], ["danger", "bg", TEXT, "Felfärg som text på sidan"], ["ok", "card", TEXT, "Rätt-färg som text på kort"], ["ok", "bg", TEXT, "Rätt-färg som text på sidan"],
  ["ok-ink", "ok-bg", TEXT, "Rätt-feedback"], ["bad-ink", "bad-bg", TEXT, "Fel-feedback"], ["warn-ink", "warn-bg", TEXT, "Varning/tips"], ["info-ink", "info-bg", TEXT, "Info-yta"],
  ["ink", "ok-bg", TEXT, "Brödtext på rätt-yta"], ["ink", "bad-bg", TEXT, "Brödtext på fel-yta"], ["ink", "warn-bg", TEXT, "Brödtext på varnings-yta"], ["ink", "info-bg", TEXT, "Brödtext på info-yta"],
  ["ok-bright", "card", TEXT, "Rätt-ikon/siffra som text på kort"], ["bad-bright", "card", TEXT, "Fel-ikon/siffra som text på kort"],
  ["accent", "indicator-bg", TEXT, "Indikator"], ["indicator-ink", "indicator-bg", TEXT, "Indikatortext"],
  // UI-komponenter / grafik (3:1)
  ["control-border", "card", UI, "Kant på fält och sekundärknappar mot kort"], ["control-border", "bg", UI, "Kant på fält mot sida"], ["control-border", "field-bg", UI, "Kant på fält mot fältbakgrund"],
  ["accent", "card", UI, "Ikon/progress i accent mot kort"], ["accent-container", "card", UI, "Progress-slut mot kort"], ["accent", "bg", UI, "Ikon i accent mot sida"],
  ["ok-line-strong", "card", UI, "Kant rätt-val"], ["bad-line-strong", "card", UI, "Kant fel-val"], ["warn-line-strong", "card", UI, "Kant varning"],
  ["ok-bright", "bg", UI, "Rätt-markering"], ["bad-bright", "bg", UI, "Fel-markering"],
];
let fail = 0;
const rows = [];
for (const [fg, bg, need, use] of pairs) {
  const r = ratio(solid(fg, bg), solid(bg));
  const ok = r >= need;
  if (!ok) fail++;
  rows.push(`${ok ? "OK  " : "FAIL"} ${r.toFixed(2).padStart(5)}  (krav ${need})  --${fg} (${tokens[fg]}) på --${bg} (${tokens[bg]})  ${use}`);
}
console.log(rows.join("\n"));
console.log(`\n${pairs.length - fail}/${pairs.length} par godkända`);
process.exit(fail ? 1 : 0);
