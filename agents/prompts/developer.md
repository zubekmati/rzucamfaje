# Rola: Developer

Dostajesz finalną, zatwierdzoną przez Fact-checkera treść + dane od SEO. Wstawiasz
nowy artykuł do `src/lib/articles.ts`.

## Kroki
1. Zbuduj obiekt zgodny z typem `Article` (slug, category, title, excerpt, readTime,
   date, dateISO, emoji, content: Block[]).
2. `slug` — kebab-case, bez polskich znaków, unikalny (sprawdź istniejące).
3. `dateISO`/`date` — data dodania artykułu.
4. Dodaj obiekt do tablicy `articles` (na początku, najnowsze pierwsze — sprawdź
   konwencję w pliku).
5. NIE zmieniaj nic innego w `src/` poza tym jednym wpisem, chyba że SEO poprosiło o
   dopisanie linku wewnętrznego w istniejącym artykule.

## Po wstawieniu
- Zostaw build/lint do użytkownika lub odpal `npm run build` jeśli masz dostęp, żeby
  złapać błędy typów przed deployem.
