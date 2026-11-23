# CollegeFinder — College Discovery Platform

A full-stack web app for students to **search, compare, shortlist and predict** engineering colleges in India.

Built with **Next.js + Tailwind** on the frontend and **Express + Prisma + PostgreSQL** on the backend, organised as an npm workspaces monorepo.

---

## Features

| Feature | What it does |
| --- | --- |
| **Search & filter** | Case-insensitive search by college name, filter by location, course and maximum fees, with pagination. |
| **College details** | Overview, key stats, courses with fees, and student reviews (`/colleges/[slug]`). |
| **Compare** | Pick 2–3 colleges and compare fees, placement %, rating, average package and courses side by side. |
| **Predictor** | Enter an exam and rank to see colleges whose stored rank range matches. |
| **Saved list** | Logged-in users can shortlist colleges and manage them later. |
| **Authentication** | Email + password, Google sign-in (Google Identity Services) and mobile OTP, all issuing JWTs. |
| **Dark mode** | Light / dark / system theme switcher. |

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, next-themes |
| Backend | Node.js, Express 4, TypeScript, Zod validation |
| Database | PostgreSQL with Prisma ORM |
| Auth | JWT, bcrypt, google-auth-library |
| Tooling | npm workspaces, ESLint, GitHub Actions CI |

## Project structure

```txt
.
├── apps/
│   ├── api/                    # Express REST API
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database models
│   │   │   ├── migrations/     # SQL migrations
│   │   │   └── seed.ts         # Sample colleges + demo user
│   │   └── src/
│   │       ├── config.ts       # Environment variables in one place
│   │       ├── index.ts        # App entry point
│   │       ├── middleware/     # JWT auth guard
│   │       └── routes/         # auth, colleges, saved
│   └── web/                    # Next.js frontend
│       ├── app/                # Pages (home, colleges/[id], compare, predictor, saved, auth)
│       ├── components/         # Shared UI components
│       └── lib/api.ts          # Typed API client + shared types
├── .github/workflows/ci.yml    # Typecheck, lint and build on every push / PR
└── package.json                # Workspace scripts
```

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally (or a hosted database URL)

### 1. Install dependencies

```bash
npm install
```

This also generates the Prisma client.

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Then set `DATABASE_URL` in `apps/api/.env` to point at your database. All variables are documented in the example files.

### 3. Set up the database

```bash
npm run db:deploy
```

```bash
npm run seed
```

### 4. Run the apps

```bash
npm run dev
```

- Frontend: http://localhost:3000
- API health check: http://localhost:4000/api/health

### Demo login

| Method | Credentials |
| --- | --- |
| Email | `demo@student.com` / `password123` |
| Mobile OTP | Any 10-digit number; OTP `123456` (demo mode, development only) |
| Google | Requires `GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to be set |

## Scripts

Run from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start API and web app together in watch mode |
| `npm run build` | Production build of both apps |
| `npm run typecheck` | TypeScript check for both apps |
| `npm run lint` | ESLint for the web app |
| `npm run db:migrate` | Create and apply a new migration (development) |
| `npm run db:deploy` | Apply existing migrations (CI / production) |
| `npm run seed` | Reset the database and load sample data |

## Environment variables

### API (`apps/api/.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | In production | Secret used to sign login tokens |
| `PORT` | No | API port (default `4000`) |
| `CLIENT_URL` | No | Allowed frontend origin(s), comma-separated (default `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID; enables Google sign-in |
| `DEMO_OTP` | No | `true` to use the fixed demo OTP. Defaults to on in development, off in production |

### Web (`apps/web/.env.local`)

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the API, e.g. `http://localhost:4000/api` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Same Google client ID as the API; shows the Google button |

## API reference

Base URL: `/api`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/health` | — | Health check |
| GET | `/colleges?q=&location=&course=&maxFees=&page=&limit=` | — | Search and filter colleges |
| GET | `/colleges/filters` | — | Distinct locations, courses and exams |
| GET | `/colleges/compare?ids=a,b,c` | — | Compare 2–3 colleges |
| POST | `/colleges/predict` | — | `{ exam, rank }` → matching colleges |
| GET | `/colleges/:idOrSlug` | — | College with courses and reviews |
| POST | `/auth/register` | — | `{ name, email, password }` |
| POST | `/auth/login` | — | `{ email, password }` |
| POST | `/auth/google` | — | `{ credential }` (Google ID token) |
| POST | `/auth/mobile/send-otp` | — | `{ phone }` |
| POST | `/auth/mobile/verify-otp` | — | `{ phone, otp }` |
| GET | `/saved` | Bearer | List saved colleges |
| POST | `/saved/:collegeId` | Bearer | Save a college |
| DELETE | `/saved/:collegeId` | Bearer | Remove a saved college |

## Deployment

### Backend (Render / Railway)

- **Root directory:** `apps/api`
- **Build command:** `npm install && npm run build && npx prisma migrate deploy`
- **Start command:** `npm start`
- **Environment:** `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL), and optionally `GOOGLE_CLIENT_ID`, `DEMO_OTP`

Seed the database once after the first deploy with `npm run seed`.

### Frontend (Vercel)

- **Root directory:** `apps/web`
- **Environment:** `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`, and optionally `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

## Known limitations

- Mobile OTP codes are stored in memory and no SMS provider is wired up yet. Demo mode is for development only.
- College data is sample seed data, not official figures.
