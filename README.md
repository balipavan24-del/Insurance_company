# InsureEase

Insurance comparison and lead capture SPA (React 19 + Vite 8).

**Live:** https://test-1-one-swart.vercel.app

## Project structure

```
src/
├── assets/          # Static files only (icons, images, videos)
├── components/      # Reusable UI (Navbar, Footer, ProductCard, …)
├── pages/           # Full screens per route (Motor, Health, Landing, …)
├── data/            # Static copy & FAQ content
├── utils/           # validations, media helpers
├── App.jsx          # Routes & navigation
└── main.jsx         # App entry
```

## Commands

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build
```

## Environment

Copy `.env.example` to `.env` when needed.

Frontend validation rules for the backend team: `src/utils/validations/leadValidation.js`
