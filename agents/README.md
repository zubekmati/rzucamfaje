# System agentów — rzucamfaje.pl

Status: **wszystkie 11 ról aktywne** (2026-06-16), Opcja A — prompty jako pliki `.md`,
sekwencja odpalana ręcznie w sesji Claude Code (Orchestrator = Ty + Claude czytający
kolejne prompty). Brak orkiestracji programowej — to świadoma decyzja na tym etapie.

## Flow (pełny)

```
Brief (Ty)
  → Research
  → Psycholog        (kąt/hook trafia w potrzeby czytelnika?)
  → Copywriter
  → SEO
  → Fact-checker      [bramka: ❌ → wraca do Copywritera]
  → Grafik            (emoji, struktura, callouty)
  → [Lokalizator]      (nieaktywny — PL-only, patrz prompts/lokalizator.md)
  → Ads/Monetyzacja    (czy i gdzie wpleść affiliate)
  → Developer          (wstawia do articles.ts, odpala build)
  → Social Media       (gotowe posty do akceptacji, nie publikuje sam)
  → Ty                 (czytasz finalny artykuł, masz prawo weta)
```

Najprościej: wklej `prompts/orchestrator.md` na początku sesji + swój brief — on
prowadzi cię przez resztę ról w odpowiedniej kolejności i pyta, gdy trzeba decyzji
redakcyjnej (np. wykryty duplikat tematu).

## Role i pliki

| Rola | Plik | Kiedy działa |
|---|---|---|
| Orchestrator | `prompts/orchestrator.md` | na starcie, prowadzi cały flow |
| Research | `prompts/research.md` | zbiera fakty + źródła |
| Psycholog | `prompts/psycholog.md` | sprawdza kąt/hook przed pisaniem |
| Copywriter | `prompts/copywriter.md` | pisze treść (Block[]) |
| SEO | `prompts/seo.md` | meta, słowa kluczowe, linkowanie, duplikaty |
| Fact-checker | `prompts/fact-checker.md` | bramka merytoryczna — działa samodzielnie |
| Grafik | `prompts/grafik.md` | emoji, struktura, callouty |
| Lokalizator | `prompts/lokalizator.md` | **nieaktywny**, czeka na ekspansję językową |
| Ads/Monetyzacja | `prompts/ads-monetyzacja.md` | affiliate, AdSense — z umiarem |
| Developer | `prompts/developer.md` | wstawia do `articles.ts`, build |
| Social Media | `prompts/social-media.md` | posty FB/X do akceptacji |

Role do dodania później (patrz pamięć projektu): Editor, Legal, Analytics, Scheduler.

## Wyniki

Wyniki przebiegów lądują w `agents/output/<slug>/` — research, draft, seo, fact-check,
social itd. Nie są częścią builda, `src/` ich nie importuje.

## Zasady (niezmienne)

- Core kodu rzucamfaje.pl (`src/`) nie jest ruszany automatycznie — tylko ostateczny,
  zatwierdzony tekst trafia do `articles.ts` (krok Developer).
- Fact-checker działa samodzielnie, nie pyta użytkownika o decyzje merytoryczne.
- Wykryty duplikat tematu z istniejącym artykułem = zawsze pytanie do użytkownika,
  nigdy decyzja agentów.
- Nikt nie publikuje/pushuje na GitHub bez wyraźnej zgody użytkownika.
- Social Media i Ads/Monetyzacja działają tylko na finalnej, zatwierdzonej treści.
