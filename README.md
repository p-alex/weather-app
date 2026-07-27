# 🌤️ Weather App

A clean, responsive weather app built with React and TypeScript. Search for any location and get real-time current conditions, hourly forecasts, and a multi-day daily outlook — all with support for switching between metric and imperial units.

🔗 **Live Demo:** [weather-app-ten-alpha-64.vercel.app](https://weather-app-ten-alpha-64.vercel.app)

---

## ✨ Features

- 🔍 **Location Search** — Search for any city or location worldwide
- 🌡️ **Current Weather** — Real-time temperature, conditions, wind speed, and precipitation
- 🕐 **Hourly Forecast** — Hour-by-hour breakdown for the current day
- 📅 **Daily Forecast** — Multi-day weather outlook
- ⚖️ **Unit Switching** — Toggle between metric (°C, km/h, mm) and imperial (°F, mph, in) units
- 💾 **Last Searched Location** — Remembers your last searched location between sessions
- ✅ **Tested** — Component and integration tests with Vitest and Testing Library

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [TanStack Query](https://tanstack.com/query) | Data fetching & caching |
| [Zod](https://zod.dev/) | API response validation |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Vitest](https://vitest.dev/) | Unit & component testing |
| [Testing Library](https://testing-library.com/) | DOM testing utilities |
| [MSW](https://mswjs.io/) | API mocking for tests |
| [Prettier](https://prettier.io/) | Code formatting |
| [ESLint](https://eslint.org/) | Linting |

---

## 📁 Project Structure

```
src/
├── api/
│   ├── application/      # Use cases / application services
│   ├── domain/
│   │   └── entities/     # Domain models & types
│   ├── exceptions/       # Custom error types
│   └── infrastructure/   # API clients & data fetching
├── components/
│   ├── DropdownMenu/
│   ├── Header/
│   ├── Layout/
│   ├── Nav/
│   ├── PrimaryButton/
│   ├── TextInput/
│   ├── VisibilityProvider/
│   └── WeatherDisplay/
│       ├── currentWeather/
│       ├── hourlyWeather/
│       ├── dailyWeather/
│       ├── SearchLocationForm.tsx
│       └── WeatherDisplay.tsx
├── context/              # React context providers (units)
├── hooks/                # Custom React hooks
│   ├── useGetWeather.ts
│   ├── useGetLocations.ts
│   ├── useDisplayTemperature.ts
│   ├── useDisplayWindSpeed.ts
│   └── useDisplayPrecipitation.ts
├── utils/                # Utility functions
└── __fixtures__/         # Test fixtures
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/p-alex/weather-app.git
cd weather-app

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

---

## 🎨 Code Quality

```bash
# Lint
npm run lint

# Format with Prettier
npm run format
```

---

## 📄 License

This project is open source and available on [GitHub](https://github.com/p-alex/weather-app).
