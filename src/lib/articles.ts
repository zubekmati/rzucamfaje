export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; variant: "tip" | "info" | "warning"; title: string; text: string }
  | { type: "divider" };

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  dateISO: string;
  emoji: string;
  content: Block[];
};

export const CATEGORIES = [
  "Motywacja",
  "Poradnik",
  "Leczenie",
  "Zdrowie",
  "Relacje",
  "Techniki",
  "Historia",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Motywacja: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  Poradnik:  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Leczenie:  "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  Zdrowie:   "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  Relacje:   "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  Techniki:  "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  Historia:  "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

const rawArticles: Article[] = [
  {
    slug: "statystyki-palenia-w-polsce-kto-i-ile-pali",
    category: "Zdrowie",
    title: "Dym po pandemii: kto i ile pali w Polsce?",
    excerpt: "Pandemia odwróciła wieloletni trend spadkowy. W 2022 roku odsetek palaczy osiągnął poziom nienotowany od 14 lat. Sprawdzamy twarde dane.",
    readTime: "6 min",
    date: "15 cze 2026",
    dateISO: "2026-06-15",
    emoji: "📊",
    content: [
      { type: "p", text: "Przez lata liczba palaczy w Polsce malała. Pandemia to zmieniła. Rok 2022 przyniósł najwyższy od 14 lat odsetek codziennych palaczy i wyraźnie pokazał, że izolacja, stres i zamknięte siłownie zostawiły ślad — także w nałogach." },

      { type: "h2", text: "Ilu Polaków pali? Twarde liczby" },
      { type: "p", text: "W 2022 roku 28,8% dorosłych Polaków deklarowało codzienne palenie — to najwyższy wynik od 2008 roku. Wśród mężczyzn: 30,8%. Wśród kobiet: 27,1%." },
      { type: "p", text: "Kolejne lata przyniosły powolną poprawę. W 2023 i 2024 roku Kantar szacował odsetek na ok. 27%. Badanie CBOS z 2025 roku podaje 26% — najniższy wynik w historii ich pomiarów, ok. 8 milionów osób." },
      { type: "callout", variant: "info", title: "A co z danymi WHO?", text: "WHO podaje 21,2% dla osób 15+. Rozbieżność wynika z metodologii — WHO liczy inaczej okazjonalnych palaczy niż codziennych. Obie liczby są prawdziwe, mierzą co innego." },
      { type: "p", text: "Długa perspektywa wygląda lepiej: sprzedaż papierosów spadła z 96 miliardów sztuk rocznie w 1996 roku do 50 miliardów w 2024 roku. Połowa w dół przez 30 lat. Ale część tego ubytku przejmują e-papierosy i podgrzewacze — o tym w części drugiej." },

      { type: "h2", text: "Kto pali? Profil demograficzny" },

      { type: "h3", text: "Wiek: to problem pokolenia 45+" },
      { type: "p", text: "Tradycyjne papierosy to domena ludzi w wieku 45–64 lata. Najmniejszy odsetek palaczy jest wśród 18–24-latków — ta grupa rzadziej sięga po klasycznego fajka, za to przoduje w wapowaniu." },
      { type: "p", text: "Wśród seniorów (65+) statystyki są niższe — nie dlatego, że mniej pali, ale dlatego, że wielu długoletnich palaczy po prostu nie dożywa tego wieku w dobrej kondycji. To efekt selekcji, nie zdrowia." },

      { type: "h3", text: "Płeć: różnica maleje" },
      { type: "ul", items: [
        "Mężczyźni: ok. 31% palaczy, w tym 26% codziennych",
        "Kobiety: ok. 21% palaczy, w tym 17% codziennych",
        "Co trzeci mężczyzna i co piąta kobieta pali papierosy",
        "Wśród nastolatków — e-papierosy częściej używają dziewczęta (dane ESPAD 2024)",
      ]},

      { type: "h3", text: "Wykształcenie i praca: im trudniej, tym więcej dymu" },
      { type: "ul", items: [
        "Wyższe wykształcenie: tylko ok. 17% pali regularnie",
        "Bezrobotni: 34%",
        "Gospodynie domowe: 39% — jeden z najwyższych wskaźników w całym społeczeństwie",
        "Zła sytuacja materialna: 25% nałogowych palaczy",
      ]},
      { type: "p", text: "Im trudniejsza sytuacja życiowa, tym więcej palaczy. To schemat powtarzający się w całej Europie — nikotyna jest tania, działa szybko i przez chwilę redukuje stres. Dla wielu ludzi to jedyne narzędzie radzenia sobie, które jest w zasięgu ręki." },

      { type: "h3", text: "Miejsce zamieszkania" },
      { type: "p", text: "Wskaźniki palenia są wyraźnie wyższe w małych miastach i na wsi — mniejszy dostęp do programów rzucania palenia, więcej czynników stresogennych, słabsza infrastruktura wsparcia." },

      { type: "h2", text: "Polska na tle Europy: jesteśmy wyjątkiem" },
      { type: "p", text: "W większości krajów Europy Zachodniej sprzedaż papierosów od lat spada. W Polsce rynek stabilizuje się, a według danych z 2025 roku nawet nieznacznie rośnie — do 51 miliardów sztuk rocznie. To jeden z najwyższych wyników w UE." },
      { type: "ul", items: [
        "Historycznie niskie ceny papierosów w stosunku do siły nabywczej",
        "Silna szara strefa — przemyt z Ukrainy i Białorusi to kilka procent rynku",
        "Kulturowe przyzwolenie na palenie, szczególnie w starszych pokoleniach",
        "Stres ekonomiczny i społeczny po pandemii",
        "Słabsza egzekucja zakazów palenia w wielu środowiskach",
      ]},
      { type: "p", text: "Raport IPPEZ z 2025 roku prognozuje wprost: przy obecnym tempie zmian osiągnięcie europejskiego celu — poniżej 5% palaczy — zajmie Polsce kilkadziesiąt lat. Jeśli w ogóle nastąpi." },

      { type: "h2", text: "Co z tego wynika?" },
      { type: "p", text: "Pandemia odwróciła trend i ujawniła, że palenie w Polsce wciąż dotyka co czwartego dorosłego. Powolna poprawa od 2022 roku jest realna — ale nie wystarczająca. Nałóg koncentruje się w konkretnych grupach i konkretnych miejscach. Żeby go zrozumieć, trzeba na niego patrzeć dokładnie." },
      { type: "p", text: "A żeby zobaczyć pełny obraz — nie tylko kto pali, ale co pali — warto zajrzeć do części drugiej. Bo rynek nikotynowy w Polsce po pandemii wygląda już zupełnie inaczej niż 10 lat temu." },

      { type: "callout", variant: "tip", title: "Jeśli chcesz rzucić", text: "Twój lekarz rodzinny może wypisać refundowaną terapię NRT (plastry, gumy, tabletki). Wystarczy poprosić. Nie musisz robić tego sam." },

      { type: "divider" },
      { type: "p", text: "Artykuł ma charakter informacyjny i nie zastępuje porady lekarskiej ani konsultacji z lekarzem. Jeśli planujesz rzucić palenie, skonsultuj się z lekarzem — szczególnie jeśli stosujesz leki lub masz choroby przewlekłe." },
    ],
  },
  {
    slug: "co-sie-pali-w-polsce-nowe-produkty-nikotynowe",
    category: "Zdrowie",
    title: "Co się pali w Polsce? E-papierosy, iQOS i woreczki nikotynowe",
    excerpt: "Klasyczny papieros traci grunt. Rynek przejęły jednorazówki, podgrzewacze tytoniu i saszetki nikotynowe. Co mówią liczby — i kto za tym stoi?",
    readTime: "7 min",
    date: "15 cze 2026",
    dateISO: "2026-06-15",
    emoji: "📈",
    content: [
      { type: "p", text: "Liczba palaczy w Polsce powoli spada. Ale popyt na nikotynę nie znika — zmienia tylko formę. Obok tradycyjnych papierosów pojawiły się trzy nowe kategorie: podgrzewacze tytoniu, jednorazowe e-papierosy i woreczki nikotynowe. Każda rządzi się innymi prawami i przyciąga innego użytkownika. Wspólny mianownik jest jeden." },

      { type: "h2", text: "Tradycyjne papierosy: wciąż nr 1" },
      { type: "p", text: "Mimo całej konkurencji klasyczny papieros trzyma pozycję lidera. W 2023 roku sam segment papierosów był wart 40,2 miliarda złotych. Sprzedaż oscyluje wokół 50 miliardów sztuk rocznie i utrzymuje się na tym poziomie od 2022 roku." },
      { type: "p", text: "Na tle Europy wyglądamy pod tym względem wyjątkowo źle. W krajach Europy Zachodniej sprzedaż papierosów od lat spada. W Polsce w 2025 roku nieznacznie rośnie — do 51 miliardów sztuk. To europejski rekord w złą stronę." },

      { type: "h2", text: "Podgrzewacze tytoniu (HNB): rewolucja bez dymu" },
      { type: "p", text: "Urządzenia takie jak iQOS czy lil SOLID to kategoria Heat-Not-Burn — tytoń jest podgrzewany, nie spalany. I ten segment urósł w Polsce szybciej niż cokolwiek innego na rynku nikotynowym." },
      { type: "ul", items: [
        "2019–2023: sprzedaż wkładów wzrosła ponad 8-krotnie",
        "Konsumpcja zwiększyła się od 2019 roku o ok. 500%",
        "W 2023 roku HNB osiągnęły 11,5% udziału w całym rynku nikotynowym",
        "Sprzedano ok. 7 miliardów wkładów (stix/heets) — ponad 10% łącznego rynku",
      ]},
      { type: "p", text: "Wzrost napędziły dwa czynniki: agresywny marketing pozycjonujący HNB jako 'mniej szkodliwą alternatywę' (co eksperci kwestionują) i rzeczywista zmiana zachowań — ludzie szukają produktu bez dymu i bez zapachu. Typowy użytkownik HNB ma 30–50 lat i wcześniej palił tradycyjne papierosy." },
      { type: "callout", variant: "warning", title: "Uwaga na marketing", text: "'Mniej szkodliwy' nie znaczy 'bezpieczny'. Podgrzewacze tytoniu nadal dostarczają nikotynę i inne substancje toksyczne. Eksperci zdrowotni jednoznacznie podkreślają, że nie ma bezpiecznego sposobu palenia tytoniu." },

      { type: "h2", text: "E-papierosy jednorazowe: eksplozja i szara strefa" },
      { type: "p", text: "Jednorazowe e-papierosy (disposables) to kategoria, która rozrosła się w Polsce w tempie, jakiego nie notowała żadna inna kategoria nikotynowa." },
      { type: "ul", items: [
        "2022: ok. 32 miliony jednorazówek sprzedanych w Polsce",
        "2023: ok. 100 milionów — wzrost o 212% w rok",
        "2024: ponad 100 milionów, sprzedaż rośnie dalej",
        "Polacy wydali na e-papierosy w 2024 roku ponad 1,2 miliarda złotych",
      ]},
      { type: "p", text: "Ale to tylko część obrazu. Za tymi liczbami stoi ogromna szara strefa." },
      { type: "ul", items: [
        "37,5% całego rynku e-papierosów funkcjonuje poza legalnym obrotem",
        "Ok. 1/3 jednorazówek w 2023 roku trafiła z nielegalnych źródeł",
        "Produkty głównie z Chin, sprzedawane przez internet bez weryfikacji wieku",
        "Dostawa kurierem lub do automatu paczkowego — bez znaków akcyzy",
        "W 2024–2025 przeprowadzono 1730 kontroli przesyłek — organy celne nie mogą blokować stron internetowych",
      ]},
      { type: "p", text: "Efekt jest łatwy do przewidzenia: nastolatek może zamówić e-papierosa przez internet bez żadnej weryfikacji, dostać go do paczkomatu i nikt tego nie sprawdzi." },

      { type: "h2", text: "Woreczki nikotynowe: cichy wzrost" },
      { type: "p", text: "Saszetki z nikotyną (popularnie: snusy, white snus) to produkt, który jeszcze kilka lat temu był niszowy. Dziś zyskuje dynamicznie — szczególnie wśród młodych." },
      { type: "ul", items: [
        "W Polsce legalny jest wyłącznie snus beztytoniowy (klasyczny snus tytoniowy jest zakazany)",
        "Od 2022 roku objęte ustawą antytytoniową",
        "Od 2023 roku zakaz sprzedaży nieletnim i zakaz sprzedaży przez internet",
        "Od sierpnia 2025 roku objęte akcyzą",
        "Ceny: 17,90–40 zł za opakowanie",
        "Globalnie: 23 miliardy sztuk sprzedanych w 2024 roku (+50% rok do roku)",
      ]},
      { type: "p", text: "Dlaczego rosną? Są całkowicie dyskretne — bez dymu, pary i zapachu. Można ich użyć na spotkaniu, w pracy, w autobusie. Smaki często owocowe lub miętowe. Dla nastolatka to idealny produkt 'niewidoczny' dla rodziców i nauczycieli." },

      { type: "h2", text: "Dramat w szkołach: młodzież i nikotyna" },
      { type: "p", text: "Najbardziej niepokojące dane nie dotyczą dorosłych. Badanie ESPAD 2024 pokazuje skalę e-papierosów wśród nastolatków:" },
      { type: "ul", items: [
        "15–16 lat: 39% używało e-papierosa w ciągu ostatnich 30 dni (poprzednio: 29%)",
        "17–18 lat: ponad 54% (poprzednio: 41%)",
        "Co drugi nastolatek w starszych klasach szkoły średniej wapuje",
        "W obu grupach wiekowych e-papierosy są częstsze wśród dziewcząt niż chłopców",
        "47,6% uczniów w badanej próbie przyznało się do codziennego wapowania",
        "Najczęstszy powód: stres (34% wskazań)",
      ]},
      { type: "p", text: "Rzecznik Praw Dziecka określił e-papierosy 'plagą w polskich szkołach'. Regulacje istnieją, ale dopóki szara strefa działa sprawnie i nikt nie weryfikuje wieku w internecie — ich skuteczność jest ograniczona." },

      { type: "h2", text: "Akcyza: lekarstwo z efektami ubocznymi" },
      { type: "p", text: "W październiku 2024 roku Sejm uchwalił wieloletnie podwyżki akcyzy na wszystkie wyroby nikotynowe. Papierosy: z 345 zł/1000 szt. w 2025 roku do 476 zł w 2027. Podobne wzrosty dotyczą tytoniu do palenia i wyrobów HNB." },
      { type: "p", text: "Wyższe podatki ograniczają legalną sprzedaż. Ale nie konsumpcję. Eksperci IFP wskazują wprost: każda podwyżka akcyzy na e-papierosy przekłada się bezpośrednio na wzrost szarej strefy. Popyt nie znika — przenosi się do nielegalnych kanałów. To strukturalne napięcie, z którym polska polityka zdrowotna jeszcze nie potrafiła sobie poradzić." },

      { type: "h2", text: "Wnioski" },
      { type: "p", text: "Polski rynek nikotynowy po pandemii to kilka równoległych rynków: legalny rynek papierosów i HNB, dynamicznie rosnący (i szarejący) rynek jednorazówek, niszowy ale szybki segment woreczków nikotynowych. Łączy je jedno: nikotyna nie znika, zmienia tylko opakowanie." },
      { type: "p", text: "Regulacje gonią za rynkiem zamiast go wyprzedzać. A nowe produkty trafiają tam, gdzie tradycyjny papieros jeszcze nie dotarł — do nastolatków, do kobiet, do miejsc bez dymu." },

      { type: "callout", variant: "tip", title: "Masz 18 lat i wapujesz?", text: "Nikotyna uzależnia tak samo — niezależnie czy pochodzi z papierosa, vape'a czy woreczka. Twój mózg jest szczególnie podatny na uzależnienie do ok. 25. roku życia. Im wcześniej zaczniesz, tym trudniej skończyć." },

      { type: "divider" },
      { type: "p", text: "Artykuł ma charakter informacyjny i nie zastępuje porady lekarskiej ani konsultacji z lekarzem. Jeśli planujesz rzucić palenie, skonsultuj się z lekarzem — szczególnie jeśli stosujesz leki lub masz choroby przewlekłe." },
    ],
  },
  {
    slug: "co-sie-dzieje-z-twoim-cialem-po-ostatnim-papierosie",
    category: "Zdrowie",
    title: "Co się dzieje z Twoim ciałem 24 godziny po ostatnim papierosie",
    excerpt: "Zegar zaczyna się odliczać od pierwszych 20 minut. Oś czasu regeneracji organizmu – krok po kroku, od godziny zero do roku bez palenia.",
    readTime: "6 min",
    date: "16 cze 2026",
    dateISO: "2026-06-16",
    emoji: "⏱️",
    content: [
      { type: "p", text: "Dobra wiadomość jest taka, że Twoje ciało nie czeka. Już w momencie, gdy gasisz ostatniego papierosa, zaczyna się proces naprawy – i to szybciej, niż myślisz. Nie potrzebujesz miesięcy, żeby poczuć pierwsze efekty. Wystarczy kilkadziesiąt minut." },

      { type: "h2", text: "Pierwsza doba: organizm odzyskuje oddech" },

      { type: "h3", text: "20 minut" },
      { type: "p", text: "Tętno i ciśnienie krwi, podniesione przez nikotynę, zaczynają wracać do normy. Serce nie musi już pracować na zwiększonych obrotach tylko po to, żeby Cię utrzymać na nogach." },

      { type: "h3", text: "12 godzin" },
      { type: "p", text: "Poziom tlenku węgla we krwi spada do normalnego poziomu. To ten gaz z dymu, który zajmuje miejsce, gdzie powinien być tlen. Krócej: krew znowu zaczyna nosić tlen tak, jak powinna." },

      { type: "h3", text: "24 godziny" },
      { type: "p", text: "Ryzyko zawału serca zaczyna spadać. Nie skacze od razu na zero – to proces, który się rozkręca – ale kierunek jest już ustalony, i jest dobry." },

      { type: "callout", variant: "warning", title: "To może być najtrudniejszy dzień", text: "Pierwsza doba bywa najgorsza psychicznie, nie fizycznie. Głód nikotynowy, rozdrażnienie, problemy z koncentracją – to normalne objawy odstawienia, nie znak, że coś idzie nie tak. Mijają." },

      { type: "h2", text: "Pierwsze dni: zmysły wracają" },

      { type: "h3", text: "48 godzin" },
      { type: "p", text: "Zakończenia nerwowe odpowiedzialne za węch i smak zaczynają się regenerować. Jedzenie zaczyna pachnieć i smakować intensywniej – wielu osobom kawa albo obiad smakują inaczej niż pamiętają." },

      { type: "h3", text: "48–72 godziny" },
      { type: "p", text: "To zwykle szczyt objawów odstawienia – i jednocześnie moment, w którym nikotyna jest już praktycznie całkowicie wydalona z organizmu. Jeśli przetrwałeś te trzy dni, najgorsze pod względem fizycznego głodu masz za sobą. Dalej robi się łatwiej." },

      { type: "h2", text: "Tygodnie i miesiące: płuca i krążenie wracają do formy" },

      { type: "h3", text: "2 tygodnie – 3 miesiące" },
      { type: "p", text: "Krążenie krwi poprawia się, a funkcja płuc może wzrosnąć nawet o około 30%. W praktyce: schody, które wcześniej kończyły się zadyszką, przestają być problemem." },

      { type: "h3", text: "1–9 miesięcy" },
      { type: "p", text: "Kaszel i zadyszka spadają. Drobne włoski w płucach (rzęski), które czyszczą drogi oddechowe, odbudowują swoją funkcję. Efekt: rzadsze infekcje, mniej śluzu, łatwiejsze oddychanie." },

      { type: "callout", variant: "info", title: "Dlaczego tempo bywa różne", text: "Jak szybko widać efekty zależy od tego, jak długo i ile paliłeś/paliłaś, oraz od ogólnego stanu zdrowia. Te ramy czasowe to orientacyjny, ogólnie przyjęty wzorzec – nie sztywny harmonogram dla każdego." },

      { type: "h2", text: "Rok później: liczby, które mają znaczenie" },
      { type: "p", text: "Po roku bez papierosa ryzyko choroby niedokrwiennej serca spada o około połowę w porównaniu do osoby, która wciąż pali. To jedna z najczęściej cytowanych liczb w zdrowiu publicznym – i jeden z najlepszych argumentów, żeby wytrwać dłużej niż pierwszy tydzień." },

      { type: "h2", text: "Co to znaczy dla Ciebie" },
      { type: "p", text: "Nie musisz czekać rok, żeby poczuć różnicę. Pierwsze zmiany – tętno, oddech, smak jedzenia – przychodzą w ciągu pierwszej doby. Najtrudniejszy jest początek. Po nim organizm sam zaczyna robić swoją część roboty." },

      { type: "callout", variant: "tip", title: "Jeśli czujesz, że to za dużo na raz", text: "Nie musisz przechodzić przez to sam. Lekarz rodzinny może wypisać refundowaną terapię NRT (plastry, gumy, tabletki), która łagodzi głód nikotynowy. To nie oszukiwanie – to narzędzie." },

      { type: "divider" },
      { type: "p", text: "Artykuł ma charakter informacyjny i nie zastępuje porady lekarskiej. Tempo regeneracji organizmu jest indywidualne. Jeśli masz choroby przewlekłe lub przyjmujesz leki, skonsultuj rzucenie palenia z lekarzem." },
    ],
  },
];

export const articles: Article[] = [...rawArticles].sort(
  (a, b) => b.dateISO.localeCompare(a.dateISO)
);
