<div align="center">

# 🍳 FlavourAI API

### Inteligentne API do generowania personalizowanych przepisów kulinarnych

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-6+-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

[Funkcje](#-funkcje) •
[Instalacja](#-instalacja) •
[API Endpoints](#-api-endpoints) •
[Przykłady](#-przykłady-użycia) •
[Architektura](#-architektura)

</div>

---

## 📖 O projekcie

**FlavourAI API** to zaawansowane REST API wykorzystujące sztuczną inteligencję Google Gemini do automatycznego generowania personalizowanych przepisów kulinarnych. System uwzględnia preferencje użytkownika, wymagania zdrowotne, dostępne składniki oraz ograniczenia czasowe, tworząc idealne przepisy dopasowane do indywidualnych potrzeb.

### ✨ Funkcje

- 🤖 **Generowanie przepisów AI** - Dwa tryby: na podstawie intencji lub listy składników
- 👤 **System użytkowników** - Pełna autentykacja JWT z weryfikacją email
- 🏥 **Profil zdrowotny** - Personalizacja przepisów według wymagań dietetycznych
- 🔐 **Bezpieczeństwo** - Hashowanie haseł, JWT tokens, rate limiting
- 📧 **Email verification** - Automatyczna weryfikacja kont przez Nodemailer
- 👨‍💼 **Panel admina** - Zarządzanie użytkownikami przez administratorów
- 📝 **Walidacja danych** - Kompleksowa walidacja z express-validator
- 💾 **Cache Redis** - Optymalizacja wydajności przechowywania danych tymczasowych

---

## 🛠️ Tech Stack

| Technologia | Wersja | Zastosowanie |
|------------|--------|--------------|
| **Node.js** | 18+ | Runtime środowisko |
| **Express.js** | 4.x | Framework HTTP |
| **MongoDB** | 5+ | Baza danych NoSQL |
| **Mongoose** | 8.x | ODM dla MongoDB |
| **Redis** | 6+ | Cache i sesje |
| **JWT** | - | Autentykacja tokenowa |
| **Nodemailer** | - | Wysyłka emaili |
| **Google Gemini 2.5** | Flash | Model AI do generowania |
| **express-validator** | - | Walidacja requestów |
| **bcrypt** | - | Hashowanie haseł |

---

## 📦 Instalacja

### Wymagania wstępne

Upewnij się, że masz zainstalowane:

- **Node.js** (v18 lub wyższy)
- **MongoDB** (v5 lub wyższy) - uruchomiony lokalnie lub zdalnie
- **Redis** (v6 lub wyższy) - uruchomiony lokalnie lub zdalnie
- **Google Cloud Account** - z aktywnym API Key dla Gemini
- **Gmail Account** - dla funkcji wysyłki emaili (z hasłem aplikacji)

### Krok po kroku

1. **Sklonuj repozytorium**

```bash
git clone https://github.com/sebekkkk/FlavourAIAPI.git
cd FlavourAIAPI
```

2. **Zainstaluj zależności**

```bash
npm install
```

3. **Skonfiguruj zmienne środowiskowe**

Utwórz plik `.env` w głównym katalogu projektu:

```env
# Serwer
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/flavouraidb

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=twoj_super_tajny_klucz_jwt_min_32_znaki
JWT_EXPIRE=7d

# Google Gemini AI
GOOGLE_AI_API_KEY=twoj_klucz_api_z_google_cloud_console

# Nodemailer (Gmail)
NODEMAILER_EMAIL=twoj_email@gmail.com
NODEMAILER_PASSWORD=twoje_haslo_aplikacji_gmail

# Frontend URL (dla linków w emailach)
FRONTEND_URL=http://localhost:5173
```

4. **Uruchom MongoDB i Redis**

```bash
# MongoDB (jeśli lokalnie)
mongod

# Redis (jeśli lokalnie)
redis-server
```

5. **Uruchom aplikację**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Serwer będzie dostępny pod adresem: `http://localhost:3000`

---

## 🏗️ Architektura

```
FlavourAIAPI/
├── config/
│   └── config.js              # Centralna konfiguracja zmiennych środowiskowych
│
├── models/
│   ├── user.js                # Model użytkownika (Mongoose Schema)
│   └── recipe.js              # Model przepisu (Mongoose Schema)
│
├── routes/
│   ├── authRoutes.js          # /api/v1/auth/* - Rejestracja, logowanie
│   ├── userRoutes.js          # /api/v1/user/* - Profil użytkownika
│   ├── recipeRoutes.js        # /api/v1/recipe/* - CRUD przepisów
│   └── adminRoutes.js         # /api/v1/admin/* - Panel administratora
│
├── controllers/
│   ├── authController.js      # Logika autentykacji
│   ├── userController.js      # Logika zarządzania użytkownikami
│   ├── recipeController.js    # Logika generowania przepisów
│   └── adminController.js     # Logika panelu admina
│
├── middleware/
│   ├── authMiddleware.js      # Weryfikacja JWT tokenów
│   ├── isAdminMiddleware.js   # Sprawdzanie uprawnień admina
│   └── errorMiddleware.js     # Globalny handler błędów
│
├── services/
│   ├── aiModel.js             # Integracja z Google Gemini AI
│   ├── prompts.js             # Szablony promptów dla AI
│   ├── mongo_connect.js       # Połączenie z MongoDB
│   ├── redis_connect.js       # Połączenie z Redis
│   ├── nodeMailer_setup.js    # Konfiguracja Nodemailer
│   └── utils.js               # Szablony HTML dla emaili
│
└── server.js                  # Punkt wejścia aplikacji
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

---

### 🔐 Autentykacja (`/auth`)

#### Rejestracja użytkownika

```http
POST /api/v1/auth/register
```

**Body:**
```json
{
  "username": "jankowalski",
  "email": "jan.kowalski@example.com",
  "password": "SecurePass123!"
}
```

**Walidacja:**
- Username: minimum 8 znaków
- Email: poprawny format email
- Hasło: min. 8 znaków, zawiera wielką literę, małą literę, cyfrę i znak specjalny (@$!%*?&)

**Response (200):**
```json
{
  "message": "Verification email sent. Please check your inbox.",
  "email": "jan.kowalski@example.com"
}
```

**Proces:**
1. Walidacja danych wejściowych
2. Tymczasowe zapisanie danych w Redis (TTL: 1h)
3. Generowanie JWT tokena weryfikacyjnego
4. Wysłanie emaila z linkiem aktywacyjnym
5. Po kliknięciu linku → utworzenie konta w MongoDB

---

#### Weryfikacja emaila

```http
GET /api/v1/auth/email-verify?token=JWT_TOKEN
```

**Query Params:**
- `token` (string, required) - JWT token z emaila

**Response (200):**
```json
{
  "message": "Email verified successfully. Account created!",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "jankowalski",
    "email": "jan.kowalski@example.com"
  }
}
```

---

#### Logowanie użytkownika

```http
POST /api/v1/auth/login
```

**Body:**
```json
{
  "email": "jan.kowalski@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "jankowalski",
    "email": "jan.kowalski@example.com",
    "isAdmin": false
  }
}
```

---

### 👤 Użytkownik (`/user`) 
*Wymaga autentykacji: Bearer Token*

#### Pobierz dane zalogowanego użytkownika

```http
GET /api/v1/user/me
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "jankowalski",
  "email": "jan.kowalski@example.com",
  "healthRequirements": ["bezglutenowe", "wegetariańskie"],
  "isAdmin": false,
  "createdAt": "2025-11-20T10:30:00.000Z"
}
```

---

#### Edytuj profil użytkownika

```http
PATCH /api/v1/user/me
Authorization: Bearer {JWT_TOKEN}
```

**Body (wszystkie pola opcjonalne):**
```json
{
  "username": "nowa_nazwa",
  "healthRequirements": ["bezlaktozowe", "low-carb"]
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nowa_nazwa",
    "healthRequirements": ["bezlaktozowe", "low-carb"]
  }
}
```

---

#### Usuń konto użytkownika

```http
DELETE /api/v1/user/me
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

**Proces:**
1. Usunięcie wszystkich przepisów użytkownika
2. Usunięcie konta z MongoDB
3. Wysłanie emaila potwierdzającego usunięcie

---

### 🍽️ Przepisy (`/recipe`)
*Wymaga autentykacji: Bearer Token*

#### Generuj przepis z intencji (AI V1)

```http
POST /api/v1/recipe/generateV1
Authorization: Bearer {JWT_TOKEN}
```

**Body:**
```json
{
  "intention": "Szybki i zdrowy obiad z kurczakiem",
  "maxTime": 30,
  "difficultyLevel": 1,
  "numberOfPortions": 4
}
```

**Parametry:**
- `intention` (string, required) - Opis pożądanego dania
- `maxTime` (number, optional) - Maksymalny czas w minutach (default: 60)
- `difficultyLevel` (number, optional) - 1: Łatwy, 2: Średni, 3: Trudny (default: 1)
- `numberOfPortions` (number, optional) - Liczba porcji (default: 2)

**Response (200):**
```json
{
  "message": "Recipe generated successfully",
  "recipe": {
    "id": "507f1f77bcf86cd799439012",
    "tytul": "Kurczak teriyaki z warzywami",
    "opis": "Szybkie i zdrowe danie azjatyckie",
    "porcje": 4,
    "czas_przygotowania_minuty": 15,
    "czas_calkowity_minuty": 30,
    "trudnosc": "Łatwy",
    "skladniki": [
      {
        "nazwa": "Filet z kurczaka",
        "ilosc": "500g",
        "uwagi": "pokrojony w paski"
      },
      {
        "nazwa": "Sos teriyaki",
        "ilosc": "100ml",
        "uwagi": ""
      }
    ],
    "instrukcje": [
      {
        "krok_nr": 1,
        "nazwa_kroku": "Przygotowanie kurczaka",
        "opis": "Pokrój kurczaka w paski i zamarynuj w sosie teriyaki",
        "czas_minuty": 5,
        "temperatura_stopnie_c": null
      }
    ],
    "wartosc_odzywcza": {
      "kalorie": 350,
      "bialko": 35,
      "weglowodany": 25,
      "tluszcze": 10
    },
    "tagi": ["kurczak", "zdrowe", "szybkie", "azjatyckie"],
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2025-11-24T08:15:00.000Z"
  }
}
```

---

#### Generuj przepis z listy składników (AI V2)

```http
POST /api/v1/recipe/generateV2
Authorization: Bearer {JWT_TOKEN}
```

**Body:**
```json
{
  "ingredients": ["kurczak", "ryż", "papryka", "cebula", "czosnek"],
  "maxTime": 45,
  "difficultyLevel": 2,
  "numberOfPortions": 3
}
```

**Parametry:**
- `ingredients` (array of strings, required) - Lista dostępnych składników
- `maxTime` (number, optional) - Maksymalny czas w minutach
- `difficultyLevel` (number, optional) - 1-3
- `numberOfPortions` (number, optional) - Liczba porcji

---

#### Pobierz wszystkie swoje przepisy

```http
GET /api/v1/recipe/
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
{
  "recipes": [
    {
      "id": "507f1f77bcf86cd799439012",
      "tytul": "Kurczak teriyaki z warzywami",
      "opis": "Szybkie i zdrowe danie azjatyckie",
      "porcje": 4,
      "czas_calkowity_minuty": 30,
      "trudnosc": "Łatwy",
      "createdAt": "2025-11-24T08:15:00.000Z"
    }
  ],
  "total": 1
}
```

---

#### Pobierz szczegóły przepisu

```http
GET /api/v1/recipe/:id
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
{
  "recipe": {
    "id": "507f1f77bcf86cd799439012",
    "tytul": "Kurczak teriyaki z warzywami",
    "opis": "...",
    "skladniki": [...],
    "instrukcje": [...]
  }
}
```

---

#### Usuń przepis

```http
DELETE /api/v1/recipe/:id
Authorization: Bearer {JWT_TOKEN}
```

**Response (200):**
```json
{
  "message": "Recipe deleted successfully"
}
```

---

### 👨‍💼 Panel Administratora (`/admin`)
*Wymaga autentykacji + uprawnienia administratora*

#### Pobierz wszystkich użytkowników

```http
GET /api/v1/admin/users
Authorization: Bearer {ADMIN_JWT_TOKEN}
```

**Response (200):**
```json
{
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "username": "jankowalski",
      "email": "jan.kowalski@example.com",
      "isAdmin": false,
      "createdAt": "2025-11-20T10:30:00.000Z"
    }
  ],
  "total": 15
}
```

---

#### Pobierz dane użytkownika po ID

```http
GET /api/v1/admin/user/:id
Authorization: Bearer {ADMIN_JWT_TOKEN}
```

---

#### Edytuj dane użytkownika (admin)

```http
PATCH /api/v1/admin/user/update/:id
Authorization: Bearer {ADMIN_JWT_TOKEN}
```

**Body:**
```json
{
  "username": "nowa_nazwa",
  "isAdmin": true
}
```

---

#### Usuń użytkownika (admin)

```http
DELETE /api/v1/admin/user/delete/:id
Authorization: Bearer {ADMIN_JWT_TOKEN}
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

**Proces:**
1. Usunięcie wszystkich przepisów użytkownika
2. Usunięcie konta z bazy danych
3. Wysłanie emaila z powiadomieniem o usunięciu przez admina

---

## 📋 Przykłady użycia

### JavaScript (Fetch API)

#### Rejestracja i logowanie

```javascript
// Rejestracja
const register = async () => {
  const response = await fetch('http://localhost:3000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'jankowalski',
      email: 'jan.kowalski@example.com',
      password: 'SecurePass123!'
    })
  });

  const data = await response.json();
  console.log(data);
};

// Logowanie
const login = async () => {
  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'jan.kowalski@example.com',
      password: 'SecurePass123!'
    })
  });

  const data = await response.json();
  const token = data.token; // Zapisz token do localStorage/sessionStorage
  return token;
};
```

---

#### Generowanie przepisu z AI

```javascript
const generateRecipe = async (token) => {
  const response = await fetch('http://localhost:3000/api/v1/recipe/generateV1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      intention: 'Zdrowy obiad wegetariański na szybko',
      maxTime: 30,
      difficultyLevel: 1,
      numberOfPortions: 2
    })
  });

  const data = await response.json();
  console.log('Wygenerowany przepis:', data.recipe);
  return data.recipe;
};
```

---

### cURL

```bash
# Rejestracja
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jankowalski",
    "email": "jan.kowalski@example.com",
    "password": "SecurePass123!"
  }'

# Logowanie
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jan.kowalski@example.com",
    "password": "SecurePass123!"
  }'

# Generowanie przepisu (z tokenem)
curl -X POST http://localhost:3000/api/v1/recipe/generateV1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "intention": "Szybki obiad z makaronem",
    "maxTime": 30,
    "difficultyLevel": 1,
    "numberOfPortions": 2
  }'
```

---

## 🔒 Bezpieczeństwo

### Implementowane mechanizmy

- **JWT Authentication** - Bezpieczne tokeny z konfigurow alnym czasem wygaśnięcia
- **Bcrypt** - Hashowanie haseł z saltingiem (rounds: 10)
- **Email Verification** - Potwierdzenie adresu email przed aktywacją konta
- **Input Validation** - Kompleksowa walidacja wszystkich danych wejściowych (express-validator)
- **CORS** - Konfiguracja dozwolonych origin
- **Rate Limiting** - Ochrona przed atakami brute-force
- **Environment Variables** - Wrażliwe dane w .env (nigdy nie commitowane)
- **Helmet.js** - Zabezpieczenie HTTP headers
- **MongoDB Injection Protection** - Mongoose automatycznie sanityzuje queries

### Best practices

```javascript
// Zawsze używaj zmiennych środowiskowych
const jwtSecret = process.env.JWT_SECRET;

// Zawsze hashuj hasła
const hashedPassword = await bcrypt.hash(password, 10);

// Zawsze waliduj dane wejściowe
body('email').isEmail(),
body('password').isLength({ min: 8 }).matches(/[A-Z]/).matches(/[0-9]/)
```

---

## 🗂️ Modele danych

### User Schema

```javascript
{
  username: {
    type: String,
    unique: true,
    maxLength: 20,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true  // Zawsze zahashowane (bcrypt)
  },
  healthRequirements: [{
    type: String
  }],
  isAdmin: {
    type: Boolean,
    default: false
  },
  timestamps: true  // createdAt, updatedAt
}
```

### Recipe Schema (generowany przez AI)

```javascript
{
  tytul: String,
  opis: String,
  porcje: Number,
  czas_przygotowania_minuty: Number,
  czas_calkowity_minuty: Number,
  trudnosc: String,  // "Łatwy" | "Średni" | "Trudny"
  skladniki: [{
    nazwa: String,
    ilosc: String,
    uwagi: String
  }],
  instrukcje: [{
    krok_nr: Number,
    nazwa_kroku: String,
    opis: String,
    czas_minuty: Number,
    temperatura_stopnie_c: Number
  }],
  wartosc_odzywcza: {
    kalorie: Number,
    bialko: Number,
    weglowodany: Number,
    tluszcze: Number
  },
  tagi: [String],
  userId: ObjectId,  // Referencja do User
  timestamps: true
}
```

---

## 🚀 Deployment

### Railway / Render

1. **Utwórz projekt** na Railway.app lub Render.com

2. **Dodaj zmienne środowiskowe** w panelu

3. **Deploy z GitHub**
```bash
# Railway automatycznie wykryje Node.js i uruchomi npm start
```

4. **Skonfiguruj zewnętrzne usługi**
   - MongoDB Atlas (darmowy tier)
   - Redis Cloud (darmowy tier)

---

### Docker (opcjonalne)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# Build
docker build -t flavouraiapi .

# Run
docker run -p 3000:3000 --env-file .env flavouraiapi
```

---

## 🧪 Testowanie

```bash
# Uruchom testy jednostkowe
npm test

# Testy integracyjne
npm run test:integration

# Coverage report
npm run test:coverage
```

---

## 🐛 Znane problemy i rozwiązania

### Problem: Email nie zostaje wysłany

**Rozwiązanie:**
1. Sprawdź czy Gmail pozwala na "mniej bezpieczne aplikacje"
2. Wygeneruj "hasło aplikacji" w ustawieniach Google Account
3. Upewnij się, że `NODEMAILER_EMAIL` i `NODEMAILER_PASSWORD` są poprawne

### Problem: Błąd połączenia z MongoDB

**Rozwiązanie:**
```bash
# Sprawdź czy MongoDB działa
mongod --version
sudo systemctl status mongod

# Sprawdź connection string w .env
MONGO_URI=mongodb://localhost:27017/flavouraidb
```

### Problem: Redis connection refused

**Rozwiązanie:**
```bash
# Uruchom Redis
redis-server

# Sprawdź status
redis-cli ping  # Powinno zwrócić PONG
```

---

## 🤝 Kontrbucja

Zapraszamy do kontrybucji! Aby wnieść swój wkład:

1. **Fork** repozytorium
2. **Stwórz** branch dla swojej funkcji (`git checkout -b feature/AmazingFeature`)
3. **Commit** zmiany (`git commit -m 'Add some AmazingFeature'`)
4. **Push** do brancha (`git push origin feature/AmazingFeature`)
5. **Otwórz** Pull Request

### Standardy kodu

- Używaj ES6+ syntax
- Stosuj się do konwencji nazewnictwa
- Dodaj komentarze dla skomplikowanej logiki
- Waliduj wszystkie dane wejściowe
- Pisz testy dla nowych funkcji

---

## 📝 Changelog

### [1.0.0] - 2025-11-24

#### Added
- ✨ Generowanie przepisów AI (2 tryby)
- 🔐 System autentykacji JWT
- 📧 Weryfikacja email
- 👤 Zarządzanie profilem użytkownika
- 👨‍💼 Panel administratora
- 💾 Integracja z MongoDB i Redis
- 📱 RESTful API endpoints

---

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT License.

```
MIT License

Copyright (c) 2025 sebekkkk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Autor

**sebekkkk**

- GitHub: [@sebekkkk](https://github.com/sebekkkk)
- Repository: [FlavourAIAPI](https://github.com/sebekkkk/FlavourAIAPI)

---

## 🙏 Podziękowania

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) - Model AI do generowania przepisów
- [Express.js Community](https://expressjs.com/) - Świetny framework
- [MongoDB](https://www.mongodb.com/) - Elastyczna baza danych
- [Redis](https://redis.io/) - Wydajny cache
- Wszyscy kontrybutorzy i użytkownicy projektu ❤️

---

<div align="center">

### ⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę!

Made with ❤️ and ☕ by [sebekkkk](https://github.com/sebekkkk)

</div>
