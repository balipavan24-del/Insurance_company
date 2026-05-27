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
├── utils/           # validations, media, api helpers
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

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` when the backend is ready.

See `BACKEND_DEVELOPER_GUIDE.md` for API integration notes.
