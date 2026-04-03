# Claude-intake (snabb)

Använd denna när Claude-filerna är klara lokalt.

## 1) Snabbinventering

- Lista nya filer:
  - `find <claude-mapp> -type f | sort`
- Markera vilka som är:
  - Innehåll/data (frågor, case, JSON)
  - UI-komponenter
  - Konfigurationsfiler

## 2) Säker mergeordning

1. Ta in innehåll/data först.
2. Ta in isolerade komponenter utan att byta global stack.
3. Vänta med stora stackbyten (t.ex. framework-migrering) tills efter antagningsprovet.

## 3) Kompatibilitet mot nuvarande app

- Kontrollera att filerna inte kräver annan byggkedja än Vite + TypeScript.
- Om Claude-filer är React/Next-specifika:
  - plocka ut text, frågor, logik och flöden
  - återanvänd i nuvarande modulstruktur

## 4) Minikrav före accept

- `npm test` ska passera.
- `npm run build` ska passera.
- Mobilvy ska fungera utan overflow.
- Översikt, frågebank, mockprov och logikflik ska fortfarande fungera.

## 5) Beslutstabell

| Fynd från Claude | Ta in nu | Ta in senare | Kommentar |
| --- | --- | --- | --- |
| Innehållsfrågor/case | Ja |  | Låg risk, hög nytta |
| Isolerad UI-förbättring | Ja |  | Om ingen regressionsrisk |
| Stort arkitekturbyte |  | Ja | Efter provperiod |
