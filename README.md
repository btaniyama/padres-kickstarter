# Fake Kickstarter — r/Padres “buy the team” (April Fools parody)

A joke crowdfunding-style page: visitors pledge **fake money** with no login. Totals are stored server-side so everyone sees the same running amount (when Redis is configured).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Upstash env vars, pledges use a **per-process in-memory counter** (resets on server restart). For a **shared total** across visitors and deploys, add Redis (see below).

## Production: Vercel + Upstash

### Option A — GitHub (recommended)

1. Push this repo to GitHub (if it isn’t already).
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and **Import** the repository. Vercel auto-detects Next.js — leave defaults and click **Deploy**.
3. **Environment variables** (so shared pledge totals work in production): **Project → Settings → Environment Variables** → add for **Production** (and Preview if you want):

   - `UPSTASH_REDIS_REST_URL` — from Upstash (REST URL)
   - `UPSTASH_REDIS_REST_TOKEN` — from Upstash (REST token)

4. **Redeploy** after saving env vars: **Deployments → … → Redeploy** (or push a new commit).

### Option B — Vercel CLI

```bash
npm i -g vercel   # or: npx vercel
vercel login
vercel            # link project, then deploy
vercel --prod     # production URL
```

Set the same two env vars in the Vercel dashboard or with `vercel env add`.

### Upstash Redis

Create a database at [Upstash Console](https://console.upstash.com/) and copy the **REST** URL and token (not the TCP URL). Without them, pledge totals reset on serverless cold starts.

### Optional

**Rate limiting** on `POST /api/pledge` uses the same Redis instance (30 pledges per minute per IP).

## API

- `GET /api/stats` — `{ totalCents, backerCount, goalCents, recentPledges }`  
  `recentPledges` is an array of `{ amountCents, comment, createdAt }` (newest first, capped at 500).
- `POST /api/pledge` — body `{ "amountCents": number, "comment": string }`  
  Comment is required (trimmed, max 500 characters). Max $1M fake per request.

## Disclaimer

This is a parody. Not affiliated with MLB, the San Diego Padres, Reddit, or any league or team. No real payments are collected.
