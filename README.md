# College Discovery Platform

Production-style MVP for the Full Stack Developer Internship demo task — Track B.

## Features implemented

1. College Listing + Search
   - College cards with name, location, fees, rating, course, placement.
   - Search by college name.
   - Filters by location, fees, and course.
   - Pagination.

2. College Detail Page
   - Overview, courses, placements, reviews.
   - Proper routing with Next.js dynamic routes.

3. Compare Colleges
   - Select 2–3 colleges.
   - Compare fees, placement %, rating, location, courses.

4. Simple Predictor Tool
   - Input exam and rank.
   - Rule/database-driven matching using stored college data.

Bonus:
- Auth + Saved Items included using JWT email/password login.
- Login/register page in the frontend.
- PostgreSQL with Prisma ORM.
- REST APIs.
- Tailwind CSS frontend.
- Deployment-ready for Vercel + Render/Railway.

## Tech stack

Frontend: Next.js, React, Tailwind CSS
Backend: Node.js, Express, TypeScript, Prisma
Database: PostgreSQL
Auth: JWT + bcrypt

## Fixes and upgrades in this version

- Fixed backend TypeScript build output so `npm start` runs `dist/index.js` correctly.
- Pinned Express type definitions to the Express 4-compatible version.
- Added `prisma generate` to the API build step.
- Added path aliases to the Next.js TypeScript config so `@/` imports resolve reliably.
- Added a proper login/register page and improved saved-college flows.
- Replaced browser alerts with inline messages on college cards.
- Added better validation for predictor and fee filters.
- Added API 404 handling and safer async route error handling.

## Folder structure

```txt
apps/
  api/      Express + Prisma backend
  web/      Next.js frontend
```

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure backend env

Create `apps/api/.env` from `.env.example`:

```bash
cp apps/api/.env.example apps/api/.env
```

Use a local PostgreSQL database URL, for example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/college_discovery?schema=public"
JWT_SECRET="change-this-secret"
PORT=4000
CLIENT_URL=http://localhost:3000
```

### 3. Configure frontend env

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Migrate and seed DB

```bash
npx prisma migrate dev --schema apps/api/prisma/schema.prisma --name init
npm run seed -w apps/api
```

### 5. Run both apps

```bash
npm run dev
```

Frontend: http://localhost:3000
Backend: http://localhost:4000/api/health

## Demo login

```txt
Email: demo@student.com
Password: password123
```

## Deployment

### Backend on Render/Railway

- Root directory: `apps/api`
- Build command: `npm install && npm run build && npx prisma migrate deploy`
- Start command: `npm start`
- Add env variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `PORT`
  - `CLIENT_URL`

After first deploy, run seed once:

```bash
npm run seed
```

### Frontend on Vercel

- Root directory: `apps/web`
- Env variable:
  - `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`
