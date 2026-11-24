# Security

This document describes how CollegeFinder protects its users and data, and what must be set up when deploying it.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Contact the repository owner privately through GitHub instead.

## How the data is protected

- **College data cannot be changed through the website.** There is no admin API: colleges, courses and logos are only loaded from `apps/api/prisma/data/colleges.ts` by `npm run seed`, which needs direct database access. Visitors can only read college data.
- **User data:** passwords are hashed with bcrypt (cost 12) and never returned by the API. Older, weaker hashes are upgraded automatically at the next login. API responses only include a user's id, name, email, phone and login method.
- **Database access** goes only through Prisma's parameterised queries, so search terms and other input can't inject SQL.
- **Secrets** (`.env`, `.env.local`) are git-ignored and have never been committed.

## Protections against attacks

| Attack | Protection |
| --- | --- |
| Password guessing | 10 failed logins per 15 minutes per IP, then blocked |
| OTP guessing (account takeover) | Each OTP allows 5 wrong tries, then it is destroyed. OTPs expire after 5 minutes and are compared in constant time |
| OTP / SMS flooding | 5 OTP requests per hour per phone number and IP |
| Finding out which emails are registered | Login takes the same time whether or not the email exists |
| Forged login tokens | Tokens are signed with HS256 and a pinned issuer; `alg: none` and wrong-key tokens are rejected. The API refuses to start in production with a short or example `JWT_SECRET` |
| Spam reviews / scraping | 60 writes per hour per user; 600 API requests per 15 minutes per IP |
| Oversized or malformed requests | 100 KB body limit; clean 400/413 errors, never stack traces |
| Cross-site scripting (XSS) | React escapes all text; a strict Content-Security-Policy only allows scripts from this site and Google Sign-In |
| Clickjacking | `X-Frame-Options: DENY` and `frame-ancestors 'none'` on the website and API |
| Other sites calling the API | CORS only allows the origins in `CLIENT_URL` |
| Information leaks | No `X-Powered-By` headers; errors are logged on the server only |
| Known vulnerable packages | Patched where a compatible fix exists; Dependabot checks weekly (`.github/dependabot.yml`) |

## Production checklist

Set these on your hosting provider before going live:

- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET`: a random value of at least 32 characters, e.g. the output of `openssl rand -hex 32`. Never reuse the example value.
- [ ] `CLIENT_URL`: only your real website address(es), e.g. `https://your-site.vercel.app`
- [ ] `DATABASE_URL`: a strong, unique password; add `sslmode=require` if your provider supports it; use a database user that only has access to this database
- [ ] `TRUST_PROXY=1` when the API runs behind one proxy (Render, Railway), so rate limits see real visitor IPs
- [ ] `DEMO_OTP` unset or `false` (OTP demo mode must never run in production)
- [ ] Turn on automatic database backups at your provider
- [ ] Serve both the website and the API over **HTTPS** only
- [ ] On GitHub: enable **branch protection** on `main` and **secret scanning** (Settings → Code security)

## Known limitations

- The login token is stored in the browser's `localStorage`. The Content-Security-Policy makes stealing it through injected scripts very difficult; moving it to an `httpOnly` cookie would be stronger still.
- Rate-limit counters and OTPs are kept in memory. That's fine for a single server; with several servers, move them to Redis.
- Two dependency advisories need major upgrades (Next.js 16, Zod 4). Their risky parts are disabled or limited here: the Next.js image optimiser is switched off, and request bodies are capped at 100 KB. Plan these upgrades.
