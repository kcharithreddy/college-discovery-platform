# CollegeFinder — College Discovery Platform

A full-stack web app for students to **search, compare, shortlist and predict** engineering colleges in India.

Built with **Next.js + Tailwind** on the frontend and **Express + Prisma + PostgreSQL** on the backend, organised as an npm workspaces monorepo.

---

## Features

| Feature | What it does |
| --- | --- |
| **Search & filter** | Search by college or city. Filter by state, institute type, course and maximum fees. Sort by NIRF rank, fees, placements, package or student rating. Filters stay in the URL, so searches can be shared. |
| **College details** | Overview, NIRF rank, courses & fees, placements, infrastructure, campus life and fests (`/colleges/[slug]`). |
| **Before you join** | Answers to the questions students ask before admission (cutoffs, total cost, scholarships, hostel, real placement numbers, anti-ragging help), built from each college's data, plus a pre-admission checklist. |
| **Student reviews** | Logged-in students rate academics, infrastructure, campus life and placements and write reviews. Each college's rating is the average of real reviews. |
| **Compare** | Pick 2–3 colleges (searchable) and compare NIRF rank, fees, hostel costs, placements, campus size and ratings side by side. |
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
| `npm run seed` | Reset the database and load the college data |
| `npm run seed:if-changed -w apps/api` | Load the college data only if it changed (used on server start) |

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
| GET | `/colleges?q=&state=&type=&course=&exam=&maxFees=&sort=&page=&limit=` | — | Search and filter colleges. `sort`: `nirf` (default), `fees`, `placement`, `package`, `rating`, `name` |
| GET | `/colleges/filters` | — | Distinct states, types, courses and exams |
| GET | `/colleges/compare?ids=a,b,c` | — | Compare 2–3 colleges |
| POST | `/colleges/predict` | — | `{ exam, rank }` → matching colleges |
| GET | `/colleges/:idOrSlug` | — | College with courses and reviews |
| POST | `/colleges/:id/reviews` | Bearer | Create or update your review of a college |
| POST | `/auth/register` | — | `{ name, email, password }` |
| POST | `/auth/login` | — | `{ email, password }` |
| POST | `/auth/google` | — | `{ credential }` (Google ID token) |
| POST | `/auth/mobile/send-otp` | — | `{ phone }` |
| POST | `/auth/mobile/verify-otp` | — | `{ phone, otp }` |
| GET | `/saved` | Bearer | List saved colleges |
| POST | `/saved/:collegeId` | Bearer | Save a college |
| DELETE | `/saved/:collegeId` | Bearer | Remove a saved college |

## Deployment

The website runs on **Vercel**; the API and its PostgreSQL database run on **Render**.

### 1. API + database (Render Blueprint)

[`render.yaml`](render.yaml) describes both, so one step creates them:

1. In Render: **New → Blueprint**, pick this repository (branch `main`).
2. When asked, set `CLIENT_URL` to your Vercel address, e.g. `https://your-site.vercel.app`.
3. Click **Apply**. Render creates the database, generates `JWT_SECRET`, applies the migrations and loads the colleges.

On every start the API applies new migrations and reloads the colleges only if the college data changed (`npm run seed:if-changed`), so restarts keep students' reviews and saved lists.

Check it at `https://<your-api>.onrender.com/api/health`.

### 2. Website (Vercel)

- **Root directory:** `apps/web`
- **Environment:** `NEXT_PUBLIC_API_URL=https://<your-api>.onrender.com/api`, and optionally `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Redeploy** after changing environment variables: the API address is built into the site's Content-Security-Policy.

### Free-plan notes

- Render's free API sleeps after 15 minutes without visitors. The website retries automatically while it wakes up (about a minute). To keep it awake, set the repository variable `API_URL` to `https://<your-api>.onrender.com/api`; the [Keep API awake](.github/workflows/keep-api-awake.yml) workflow then pings it every 10 minutes.
- Render's free PostgreSQL database expires after 30 days. For a permanent free database, create one on [Neon](https://neon.tech) and set the API's `DATABASE_URL` to its connection string.
- Mobile OTP needs an SMS provider, so it is off in production; use email or Google login.

## College data

College data lives in [`apps/api/prisma/data/colleges.ts`](apps/api/prisma/data/colleges.ts). Every number field is optional. Leave it out rather than guessing, and the site shows "Not available". Record where figures came from in `sourceNote` (e.g. NIRF data submission, official website, JoSAA closing ranks) so students know how much to trust them.

> Upgrading an existing database: migration `1_college_details` clears the old sample colleges, their seeded reviews and saved lists, then `npm run seed` reloads them in the new format.

## Security

See [SECURITY.md](SECURITY.md) for how user data is protected, the defences against common attacks, and the checklist to follow before deploying.

## Known limitations

- Mobile OTP codes are stored in memory and no SMS provider is wired up yet. Demo mode is for development only.
- Fee, placement and cutoff figures for the current colleges are sample values that have not been verified. Each college page says so.
