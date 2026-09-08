# LanTech Data Services — e-commerce rebuild

A real e-commerce stack for the Virtual TVET course shop: React (Vite) frontend,
Node/Express + **PostgreSQL** backend, and M-Pesa (Safaricom Daraja) checkout on
**sandbox** credentials — deployable to Vercel (frontend) + Render (backend + DB).

```
lantech-ecommerce/
├── client/     React + Vite + Tailwind frontend     → deploy to Vercel
├── server/     Node + Express + Postgres + M-Pesa    → deploy to Render
└── render.yaml Render blueprint (web service + Postgres database)
```

## What's real vs. what needs your input

- **Design**: clean, institutional look (white background, blue primary, card
  grid) — a deliberate rebuild from the earlier, more editorial-styled version.
  A live interactive preview of this design was shared separately as an
  artifact (mock data, no backend) so you could review it before this full
  build.
- **Catalog**: 6 real Virtual TVET course subscriptions (Automotive & HVAC,
  3/6/12 month tiers), pulled from the live shop at lantechdata.co.ke/shop —
  names, prices (VAT inclusive), and course lists match exactly. The catalog
  lives in `server/src/db/catalog.js` and is seeded into Postgres by the
  migration script — edit that file and re-run `npm run migrate` to change it.
- **Database**: real PostgreSQL, not a flat file. `products`, `orders`,
  `order_items`, `contacts` tables — see `server/src/db/schema.sql`. Orders are
  now safe from being wiped on redeploy (the earlier JSON-file version wasn't).
- **M-Pesa**: wired to Safaricom's Daraja **sandbox**. You need your own free
  sandbox app for the Consumer Key/Secret (see below) — nobody else can
  generate that for you.
- **Product photos**: no real photos are bundled (the ones on the live site
  are licensed stock). Drop files into `client/public/images/products/` per
  that folder's README — `automotive.jpg` and `hvac.jpg` cover all 6 tiers.

## 1. Local development

You need a local Postgres running (or use a free hosted one, e.g. a Render
Postgres instance, for local dev too — either works).

```bash
# Backend
cd server
cp .env.example .env       # fill in DATABASE_URL and MPESA_CONSUMER_KEY/SECRET
npm install
npm run migrate             # creates tables + seeds the 6 courses
npm run dev                 # http://localhost:4000

# Frontend (new terminal)
cd client
cp .env.example .env        # VITE_API_URL=http://localhost:4000
npm install
npm run dev                  # http://localhost:5173
```

## 2. Get Safaricom Daraja sandbox credentials

1. Sign up at https://developer.safaricom.co.ke
2. **My Apps → Add a new App**, enable the **Lipa Na M-Pesa Sandbox** product.
3. Copy the **Consumer Key** and **Consumer Secret** into `server/.env`.
4. Leave `MPESA_SHORTCODE` / `MPESA_PASSKEY` as the defaults — Safaricom's
   shared sandbox values, same for every developer.
5. Test payments with Safaricom's official sandbox number **254708374149**
   (any PIN is accepted in sandbox).

STK push needs a **public HTTPS callback URL** — Safaricom calls
`PUBLIC_SERVER_URL/api/mpesa/callback` with the result. For local testing,
tunnel with `ngrok http 4000` and set `PUBLIC_SERVER_URL` to the ngrok URL.

## 3. Deploy to Render (backend) + Supabase (database)

`render.yaml` provisions the web service only — it does **not** create a
Render Postgres database, so it won't hit Render's one-free-database-per-account
limit. Use a free external Postgres instead (Supabase or Neon both work fine;
these instructions use Supabase):

- Create a free project at **supabase.com** → grab the connection string from
  **Project Settings → Database → Connection string → Connection pooling
  (Session mode)**.
- Push this repo to GitHub, then in Render: **New → Blueprint**, point it at
  the repo.
- In the Render dashboard, set `DATABASE_URL` to the Supabase connection
  string you copied (left blank in `render.yaml` on purpose).
- After the first deploy, run the migration once against the live database —
  easiest way is Render's **Shell** tab on the web service:
  ```bash
  npm run migrate
  ```
- Set the remaining env vars in the Render dashboard (also left blank in
  `render.yaml` so secrets aren't committed):
  `CLIENT_URL` (your Vercel URL), `PUBLIC_SERVER_URL` (this service's own
  Render URL), `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, and optionally
  `CONTACT_TO_EMAIL` + `SMTP_*` for emailed enquiries.

Prefer Render's own managed Postgres instead? Add a `databases:` block back to
`render.yaml` (see Render's Blueprint docs) — the server code already handles
either via the same `DATABASE_URL` variable, no code changes needed.

## 4. Deploy to Vercel (frontend)

- **New Project** → import the repo → **Root Directory**: `client`.
- Add environment variable `VITE_API_URL` = your Render backend URL.
- `client/vercel.json` handles SPA routing.

## 5. Going live for real (production M-Pesa)

Apply for a production Lipa Na M-Pesa shortcode with Safaricom (a separate
business process), then set `MPESA_BASE_URL=https://api.safaricom.co.ke` and
swap in your production shortcode/passkey/credentials. Nothing else changes.
