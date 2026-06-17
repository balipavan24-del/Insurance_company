# Motor API (test backend)

Node server for vehicle policy lookup. Lives at the bottom of the insurance project.

## Setup

From project root:

```bash
cd backend
npm install
npm start
```

Runs on **http://localhost:4591**

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/motor/vehicles/:registrationNumber` | Policy card JSON |

## Test numbers

| Number | Result |
|--------|--------|
| `AP09AB1234` | Active |
| `AP09EX1234` | Expired |
| `AP09SO1234` | Expiring soon |
| `AP09AB0000` | 404 — no data |

## Frontend

Root `.env`:

```
VITE_API_BASE_URL=http://localhost:4591
```

Restart `npm run dev` after changing `.env`.

## Run both (two terminals)

**Terminal 1 — frontend** (project root `insurance/`):

```bash
npm run dev
```

Open **http://localhost:5173**

**Terminal 2 — API** (same project):

```bash
npm run api
```

API runs at **http://localhost:4591**

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `EADDRINUSE :::4591` | API is already running. Use the existing terminal, or stop it and run `npm run api` again. |
| Frontend not loading | Run `npm run dev` from **`insurance/`** (project root), not from `backend/` or old `Desktop/insureease-motor-api`. |
| Wrong folder | Backend moved to **`insurance/backend/`**. Ignore the old Desktop `insureease-motor-api` folder. |
