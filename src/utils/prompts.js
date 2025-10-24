export function prompt1(intention, maxTime, userHealthRequirements, difficultyLevel, numberOfPortions) {
  const difficultyMap = {
    1: "Łatwy",
    2: "Średni",
    3: "Trudny"
  };

  const mappedDifficulty = difficultyMap[difficultyLevel] || "Łatwy";

  return `
        Twoim zadaniem jest wygenerowanie przepisu kulinarnego w formacie JSON ściśle zgodnym ze schematem Mongoose podanym poniżej. 
        NIE dodawaj żadnego komentarza, tekstu ani markdowna — tylko czysty JSON.

        Każde pole jest wymagane i musi być zgodne typem z opisem:

        {
        "tytul": "String (np. 'Kurczak curry')",
        "opis": "String - krótki opis przepisu",
        "porcje": ${numberOfPortions}, 
        "czas_przygotowania_minuty": "Number",
        "czas_calkowity_minuty": "Number",
        "trudnosc": "String (do wyboru: 'Łatwy', 'Średni', 'Trudny')",
        "skladniki": [
            { "nazwa": "String", "ilosc": "String", "uwagi": "String" }
        ],
        "instrukcje": [
            { 
            "krok_nr": "Number",
            "nazwa_kroku": "String",
            "opis": "String",
            "czas_minuty": "Number",
            "temperatura_stopnie_c": "Number"
            }
        ],
        "uwagi_dietetyczne": "String",
        "wartosci_odzywcze_na_porcje": {
            "kalorie_kcal": "Number",
            "bialko_g": "Number",
            "weglowodany_g": "Number",
            "tluszcze_g": "Number"
        }
        }

        ZASADY:
        - JSON musi być poprawny składniowo (parsowalny przez JSON.parse).
        - Nie używaj komentarzy, markdown, cudzysłowów wokół kluczy innych niż standardowe JSON.
        - Wszystkie wartości required muszą być obecne.
        - Wartości liczbowe muszą być liczbami, nie stringami.
        - Pole "trudnosc" musi mieć wartość: "${mappedDifficulty}".
        - Całkowity czas przygotowania (czas_calkowity_minuty) <= ${maxTime}.
        - Przepis musi być zgodny z wymaganiami zdrowotnymi użytkownika: ${userHealthRequirements.join(', ') || 'brak szczególnych wymagań'}.
        - "wartosci_odzywcze_na_porcje" muszą mieć realistyczne wartości liczbowe.
        - Składniki muszą być precyzyjnie obliczone dla dokładnie ${numberOfPortions} porcji, zgodnie z polem "porcje". 
        - Jesli trzeba cos ugotowac lub usmazyc to temperature s stopniach celcjusza podaj (Number) jesli jest to cos typu dodaj soli lub pokroj warzywa to zostaw puste (Blank)

        Utwórz przepis odpowiadający intencji:
        "${intention}"

        Zwróć TYLKO czysty JSON, bez żadnych dodatkowych znaków, bez \`\`\`, bez tekstu przed ani po.
        `;
}

export function prompt2(availableIngredientsList, maxTime, userHealthRequirements, difficultyLevel, numberOfPortions) {
  
  const difficultyMap = {
    1: "Łatwy",
    2: "Średni",
    3: "Trudny"
  };

  const mappedDifficulty = difficultyMap[difficultyLevel] || "Łatwy";

  // Generowanie listy składników w formacie klucz: wartość
  const ingredientsList = availableIngredientsList
    .map(item => {
      const key = Object.keys(item)[0];
      const value = item[key];
      return `${key}: ${value}`;
    })
    .join(', ');

  // Formatowanie wymagań zdrowotnych
  const healthRequirements = userHealthRequirements && userHealthRequirements.length > 0
    ? userHealthRequirements.join(', ') 
    : 'brak szczególnych wymagań';

  return `
        **MISJA**: Wygeneruj przepis kulinarny w formacie JSON.
        
        **ZASADA NR 1 (ABSOLUTNE OGRANICZENIE SKŁADNIKÓW)**: 
        PRZEPIS MUSI WYKORZYSTYWAĆ **TYLKO I JEDYNIE** SKŁADNIKI Z PONIŻSZEJ LISTY. NIE WOLNO DODAWAĆ ŻADNYCH INNYCH SKŁADNIKÓW (np. soli, pieprzu, wody, oleju - **niczego, co nie jest na liście**).
        **DOSTĘPNE SKŁADNIKI**: "${ingredientsList}"
        
        **ZASADA NR 2 (BLOK AWARYJNY)**:
        **JEŚLI** NIE JESTEŚ W STANIE STWORZYĆ RACJONALNEGO PRZEPISU, KTÓRY SPEŁNIA WSZYSTKIE PONIŻSZE OGRANICZENIA (ZWŁASZCZA ZASADĘ NR 1), 
        **TO NATYCHMIAST ZWÓRĆ PONIŻSZY JSON BEZ DODATKOWEGO TEKSTU, ZAMIAST PRZEPISU:**
        {"error":"Nie jestem w stanie stworzyc racjonalnego przepisu z tych skladnikow"}
        
        **ZASADA NR 3 (FORMAT)**:
        Zwróć **TYLKO** czysty JSON, zaczynając od **{** i kończąc na **}**, bez żadnego tekstu, markdown, czy \`\`\`. 
        JSON MUSI BYĆ KOMPLETNY I PARSOWALNY.

        
        **SCHEMAT PRZEPISU (Wszystkie pola wymagane i zgodne z typem):**

        {
        "tytul": "String",
        "opis": "String",
        "porcje": ${numberOfPortions}, 
        "czas_przygotowania_minuty": "Number",
        "czas_calkowity_minuty": "Number",
        "trudnosc": "String (musi być: '${mappedDifficulty}')",
        "skladniki": [
            { "nazwa": "String", "ilosc": "String", "uwagi": "String" } // TYLKO I JEDYNIE Z LISTY: "${ingredientsList}"
        ],
        "instrukcje": [
            { 
            "krok_nr": "Number",
            "nazwa_kroku": "String",
            "opis": "String",
            "czas_minuty": "Number",
            "temperatura_stopnie_c": "Number lub null (jeśli nie gotujesz/smażysz)"
            }
        ],
        "uwagi_dietetyczne": "String",
        "wartosci_odzywcze_na_porcje": {
            "kalorie_kcal": "Number",
            "bialko_g": "Number",
            "weglowodany_g": "Number",
            "tluszcze_g": "Number"
        }
        }

        **DODATKOWE WYMOGI:**
        - Przepis musi wykorzystywać dostępne składniki **w jak największym stopniu**.
        - Całkowity czas przygotowania (czas_calkowity_minuty) <= ${maxTime}.
        - Przepis musi być zgodny z wymaganiami zdrowotnymi użytkownika: ${healthRequirements}.
        - Pola numeryczne muszą być liczbami, nie stringami.
        - W instrukcjach, pole "temperatura_stopnie_c" ma być **Number** lub **null**.
        
        Zaczynaj!
        `;
}