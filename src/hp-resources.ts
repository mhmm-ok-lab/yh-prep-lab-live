/** Externa resurser i HP-fliken. Kuraterad lista, varje länk öppnad och kontrollerad 2026-10-05. */

export type HpResourceCost = "gratis" | "gratis med konto" | "delvis betalt" | "betalt";

export interface HpResource {
  group: string;
  title: string;
  url: string;
  /** En rad: vad du FÅR där (max ca 90 tecken). */
  desc: string;
  cost: HpResourceCost;
  checked: string;
}

/** Grupperna i den ordning de visas (efter vad man vill GÖRA). */
export const HP_RESOURCE_GROUPS = ["Gör gamla prov", "Lär dig matten", "Strategi och tips", "Om provet"] as const;

export const HP_RESOURCES_CHECKED = "2026-10-05";
export const HP_RESOURCES_CHECKED_LABEL = "5 okt 2026";

const C = HP_RESOURCES_CHECKED;

export const HP_RESOURCES: HpResource[] = [
  // 1. Gör gamla prov
  { group: "Gör gamla prov", title: "Gamla prov med facit (UHR)", url: "https://www.studera.nu/hogskoleprov/om/forbereda/tidigare/", desc: "Officiella provhäften och facit som PDF, även provet från april 2026.", cost: "gratis", checked: C },
  { group: "Gör gamla prov", title: "Högskoleprovtränaren (HP-guiden)", url: "https://hpguiden.se/gamla-hogskoleprov", desc: "Hela prov 2000–2026 digitalt med automatisk rättning och normerad poäng.", cost: "gratis med konto", checked: C },
  { group: "Gör gamla prov", title: "Gamla matteuppgifter (Matteboken)", url: "https://www.matteboken.se/lektioner/hogskoleprov", desc: "XYZ, KVA, NOG och DTK i webbläsaren med lösningar och direkt svar.", cost: "gratis", checked: C },
  { group: "Gör gamla prov", title: "Gamla prov online (HP-appen)", url: "https://www.hpappen.se/gamla-hogskoleprov", desc: "Prov 1977–2026 som PDF utan konto. Övningsfrågor med förklaring kostar.", cost: "delvis betalt", checked: C },

  // 2. Lär dig matten
  { group: "Lär dig matten", title: "Procent: delen av det hela", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/delen-av-det-hela", desc: "Andel, del och helhet med videolektion och exempel.", cost: "gratis", checked: C },
  { group: "Lär dig matten", title: "Förändringsfaktor", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/forandringsfaktor", desc: "Procentuell ökning och minskning med förändringsfaktorn.", cost: "gratis", checked: C },
  { group: "Lär dig matten", title: "Bråk: addition och subtraktion", url: "https://www.matteboken.se/lektioner/matte-1/aritmetik/addition-och-subtraktion-av-brak", desc: "Gemensam nämnare och blandad form, med videolektion.", cost: "gratis", checked: C },
  { group: "Lär dig matten", title: "Ekvationslösning", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/algebra/ekvationslosning", desc: "Lös ekvationer steg för steg och pröva svaret, med video.", cost: "gratis", checked: C },
  { group: "Lär dig matten", title: "Potenser och potenslagar", url: "https://www.matteboken.se/lektioner/gymnasiet/matte-niva-1/aritmetik/potenser", desc: "Potenslagarna, nollpotens och negativa exponenter med övningar.", cost: "gratis", checked: C },

  // 3. Strategi och tips
  { group: "Strategi och tips", title: "7 tips som höjer resultatet", url: "https://hpguiden.se/allt-om-hogskoleprovet/tips-hogskoleprovet", desc: "Kort om hur du förbereder dig: gamla prov, felanalys och tidsplan.", cost: "gratis", checked: C },
  { group: "Strategi och tips", title: "LÄS: frågetyper och lässtrategier", url: "https://www.hpspelet.se/delprov/las", desc: "De fem frågetyperna och vanliga felval i svarsalternativen.", cost: "gratis", checked: C },
  { group: "Strategi och tips", title: "KVA: testvärden och strategi", url: "https://www.hpspelet.se/delprov/kva", desc: "Sex testvärden och vanliga fel i jämförelseuppgifter.", cost: "gratis", checked: C },
  { group: "Strategi och tips", title: "NOG: de fem svarsalternativen", url: "https://www.hpspelet.se/delprov/nog", desc: "Stegvis metod för att avgöra om informationen räcker.", cost: "gratis", checked: C },
  { group: "Strategi och tips", title: "DTK: diagram, tabeller och kartor", url: "https://www.hpspelet.se/delprov/dtk", desc: "Så läser du av diagram och skalor snabbt och rätt.", cost: "gratis", checked: C },

  // 4. Om provet
  { group: "Om provet", title: "Höstprovet 18 oktober 2026", url: "https://hpguiden.se/hogskoleprovet-hosten-2026", desc: "Datum, anmälan och när resultatet kommer, cirka en månad efter.", cost: "gratis", checked: C },
  { group: "Om provet", title: "Officiella tips för provdagen", url: "https://hpguiden.se/allt-om-hogskoleprovet/officiella-tips-under-hogskoleprovdagen", desc: "UHR:s tio råd: instruktioner, gissa alltid, fastna inte.", cost: "gratis", checked: C },
  { group: "Om provet", title: "Högskoleprovet på studera.nu", url: "https://www.studera.nu/hogskoleprov/", desc: "Officiell info om provet, provdagen och resultat.", cost: "gratis", checked: C },
  { group: "Om provet", title: "Anpassat prov och provmiljö", url: "https://www.studera.nu/hogskoleprov/anmalan/anpassning/", desc: "Vad som finns för dyslexi och andra behov, och vilka intyg som krävs.", cost: "gratis", checked: C }
];

export function hpResourcesForGroup(group: string): HpResource[] {
  return HP_RESOURCES.filter((r) => r.group === group);
}
