# LanTech Data Services — website revamp

A clean, modern redesign of lantechdata.co.ke, rebuilt as a React (Vite) frontend
with a Node/Express backend, service-package shop, working contact form, and
M-Pesa (Safaricom Daraja) checkout on **sandbox** credentials.

```
lantechdata-app/
├── client/     React + Vite + Tailwind frontend  → deploy to Vercel
├── server/     Node + Express API + M-Pesa        → deploy to Render
└── render.yaml Render deploy blueprint
```

## What's real vs. what needs your input

- **Design & copy**: rebuilt from the live site's actual content (hero slides,
  services, founder message, partners, etc.) — no lorem ipsum.
- **Shop catalog**: the WooCommerce SQL export had no real products in it
  (only WooCommerce's default demo "headphones" listing). The real catalog —
  6 Virtual TVET (ODeL) course subscriptions (Automotive & HVAC, in 3/6/12
  month single-user tiers) — was pulled from the live shop at
  lantechdata.co.ke/shop instead, matching the real names, prices (VAT
  inclusive), and course lists exactly. Edit `client/src/data/services.js`
  **and** `server/src/data/services.js` (kept in sync manually, server is the
  pricing source of truth) if prices change or you add new courses.
- **Product images**: each course has an `image` field pointing to
  `client/public/images/products/`. No real photos are bundled (the ones on
  the live site are licensed Freepik stock — can't be copied into this repo).
  Drop your own licensed photos in at the filenames listed in
  `client/public/images/products/README.md` (currently `automotive.jpg` and
  `hvac.jpg`, shared across each course's duration tiers) and they appear
  automatically — no code change needed. Until then, the site shows a clean
  placeholder box instead of a broken image.
- **M-Pesa**: fully wired to Safaricom's Daraja **sandbox**. You must create
  your own free sandbox app to get a Consumer Key/Secret (see below) —
  nobody can generate that for you.
- **Contact form**: saves every submission to the server's database and will
  also email you if you set SMTP credentials (optional).

## 1. Local development

```bash
# Backend
cd server
cp .env.example .env   # fill in MPESA_CONSUMER_KEY/SECRET at minimum
npm install
npm run dev             # http://localhost:4000

# Frontend (new terminal)
cd client
cp .env.example .env    # VITE_API_URL=http://localhost:4000
npm install
npm run dev              # http://localhost:5173
```

## 2. Get Safaricom Daraja sandbox credentials

1. Sign up at https://developer.safaricom.co.ke
2. **My Apps → Add a new App**, enable the **Lipa Na M-Pesa Sandbox** product.
3. Copy the **Consumer Key** and **Consumer Secret** into `server/.env`.
4. Leave `MPESA_SHORTCODE` and `MPESA_PASSKEY` as the defaults in
   `.env.example` — those are Safaricom's shared sandbox values, the same for
   every developer.
5. To actually test a payment, use Safaricom's official sandbox test phone
   number: **254708374149** (any PIN is accepted in sandbox). The checkout
   page already shows this hint.

STK push **requires a public HTTPS callback URL** — Safaricom calls
`PUBLIC_SERVER_URL/api/mpesa/callback` with the result. This won't work on
`localhost`; for local testing, tunnel your server with something like
`ngrok http 4000` and set `PUBLIC_SERVER_URL` to the ngrok HTTPS URL. In
production this is just your Render URL.

## 3. Deploy the backend to Render

- Push this repo to GitHub, then in Render: **New → Blueprint**, point it at
  the repo — `render.yaml` configures the `server` service automatically.
  (Or: New → Web Service, root directory `server`, build `npm install`, start
  `npm start`.)
- After the first deploy, set these env vars in the Render dashboard
  (`render.yaml` leaves them blank on purpose so secrets aren't committed):
  - `CLIENT_URL` — your Vercel URL, e.g. `https://lantechdata.vercel.app`
  - `PUBLIC_SERVER_URL` — this Render service's own URL, e.g.
    `https://lantechdata-server.onrender.com` (no trailing slash)
  - `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`
  - `CONTACT_TO_EMAIL` and the `SMTP_*` vars if you want emailed enquiries
- Render's free tier uses a small JSON file as the order/contact database
  (`server/src/lib/db.js`) — it's fine for launch/demo traffic. For real
  volume, swap that module for Render's managed Postgres; every other file
  only calls `db.data.orders` / `db.data.contacts`, so the change is
  localized to that one file.

## 4. Deploy the frontend to Vercel

- **New Project** → import the repo → set **Root Directory** to `client`.
- Framework preset: Vite (auto-detected).
- Add environment variable `VITE_API_URL` = your Render backend URL.
- `client/vercel.json` already handles SPA routing (React Router refreshes).

## 5. Going live for real (production M-Pesa)

When you're ready to take real payments:

1. Apply for a **production** Lipa Na M-Pesa shortcode / paybill with
   Safaricom (this is a business process with Safaricom, separate from the
   developer sandbox).
2. Set `MPESA_BASE_URL=https://api.safaricom.co.ke`, and replace
   `MPESA_SHORTCODE` / `MPESA_PASSKEY` / consumer key & secret with your
   production values.
3. Nothing else in the code changes — sandbox and production use the same
   API shape.

## Notes on the data left out of this build

Your uploaded SQL dump and wp-admin export are from the WordPress/WooCommerce
site and weren't used directly — this is a fresh React/Node stack per your
brief, not a WordPress migration. If you'd like specific text, images, blog
posts, or real product data pulled out of that WordPress export and placed
into the new site, share the specifics (or the media/uploads folder) and I
can wire it in.
