# System agentów — rzucamfaje.pl (wersja minimalna)

Status: **MVP, testowane na 1 artykule** (2026-06-16). Pełny plan (11 agentów) jest
w pamięci Claude — to jest okrojony flow do walidacji podejścia, nie finalna architektura.

Opcja A: prompty trzymane jako pliki `.md`, sekwencja odpalana ręcznie w sesji Claude Code
(brak orkiestracji programowej — orchestrator = Ty + Claude czytający kolejne prompty).

## Flow (minimalny — 5 z 11 ról)

```
Brief (Ty) → Research → Copywriter → SEO → Fact-checker → Developer
```

Pominięte na razie: Psycholog, Grafik, Lokalizator, Ads/Monetyzacja, Social Media —
dodajemy je gdy ten szkielet się sprawdzi.

## Jak odpalić ręcznie

1. Daj brief: temat, kluczowe punkty, ton.
2. Wklej `prompts/research.md` + brief → zbierz fakty i źródła.
3. Wklej `prompts/copywriter.md` + research → szkic w blokach `Block[]`.
4. Wklej `prompts/seo.md` + szkic → meta, słowa kluczowe, sugestie linkowania.
5. Wklej `prompts/fact-checker.md` + szkic → lista zastrzeżeń / poprawek.
6. Wklej `prompts/developer.md` + finalna treść → wstawia obiekt `Article` do
   `src/lib/articles.ts`.

Wyniki testowych przebiegów lądują w `agents/output/<slug>/` (do wglądu, nie są
częścią builda — nic stąd nie jest importowane przez `src/`).

## Zasada

Core kodu rzucamfaje.pl (`src/`) nie jest ruszany przez agentów automatycznie —
tylko ostateczny, zatwierdzony tekst trafia do `articles.ts` (krok Developer).
