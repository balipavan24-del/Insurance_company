# InsureEase — Backend Developer Guide

**Project:** Insurance comparison & lead capture SPA  
**Frontend:** React 19 + Vite 8 + React Router 7  
**Live:** https://test-1-one-swart.vercel.app  
**Status:** Frontend-only — no API layer yet (forms use validation, alerts, dummy data)

---

## 1. Root folder structure

```
insurance/
├── public/                    # Static assets served as-is
│   ├── favicon.svg
│   ├── .htaccess
│   └── images/
├── src/
│   ├── assets/                # Static media only
│   │   ├── icons/
│   │   ├── images/
│   │   └── videos/
│   ├── components/            # Reusable UI
│   │   ├── Navbar/            # Navbar + mega menus
│   │   ├── Footer/
│   │   ├── Dropdown/          # DropdownChevron
│   │   ├── Animations/        # ScrollReveal, motion.css
│   │   ├── ProductCard/       # Landing insurance category cards
│   │   ├── Faq/               # InsuranceFaqAccordion
│   │   ├── DetailPanel/
│   │   └── ErrorBoundary/
│   ├── pages/                 # Route screens
│   │   ├── Landing/
│   │   ├── Login/ Signup/
│   │   ├── Motor/ Health/ Term/ Business/ Cargo/
│   │   ├── Contact/ InsuranceBasics/
│   ├── data/
│   │   └── productContent/    # FAQ & static copy
│   ├── utils/
│   │   ├── validations/       # leadValidation.js
│   │   ├── media.js
│   │   └── api.js             # apiUrl() helper for VITE_API_BASE_URL
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 2. Key files for backend

| File | Purpose |
|------|---------|
| `src/App.jsx` | Routes, navbar handlers, navigation |
| `src/utils/validations/leadValidation.js` | Mirror validation on API (`validateSignupDetails`, health, term, …) |
| `src/pages/Signup/Signup.jsx` | Create account form → `POST /api/v1/auth/create-account` |
| `src/data/productContent/index.js` | Static FAQ content |
| `src/pages/Motor/GuestDummyData.jsx` | Replace with plan API |
| `src/pages/Motor/MotorPolicyDummyData.jsx` | Replace with vehicle lookup API |

---

## 3. Environment variables

Create `insurance/.env` at project root (not committed):

```env
VITE_API_BASE_URL=https://your-api.example.com
VITE_INSURANCE_VIDEO_01_URL=
```

Restart `npm run dev` after changes.

---

## 4. Suggested API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/send-otp` | Send login OTP |
| POST | `/api/v1/auth/verify-otp` | Verify OTP + session |
| POST | `/api/v1/leads/health` | Health lead |
| POST | `/api/v1/leads/motor` | Motor lead |
| POST | `/api/v1/leads/contact` | Contact form |
| GET | `/api/v1/plans` | Insurance plans |

---

## 5. Quick start

```bash
npm install
npm run dev    # http://localhost:5173/
npm run build
```
