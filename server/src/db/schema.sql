-- LanTech Data Services — schema
-- Products are seeded from code (see db/seed.js) since the catalog is small and
-- curated; orders/contacts are the actual transactional data that needs a real DB.

CREATE TABLE IF NOT EXISTS products (
  id            TEXT PRIMARY KEY,
  category      TEXT NOT NULL,
  name          TEXT NOT NULL,
  tagline       TEXT NOT NULL,
  price_kes     INTEGER NOT NULL,
  months        INTEGER NOT NULL,
  powered_by    TEXT NOT NULL,
  image_path    TEXT NOT NULL,
  courses       JSONB NOT NULL,
  active        BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id                  TEXT PRIMARY KEY,
  customer_name       TEXT NOT NULL,
  customer_email      TEXT NOT NULL,
  customer_phone      TEXT NOT NULL,
  customer_org        TEXT,
  total_kes           INTEGER NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending_payment',
    -- pending_payment -> awaiting_mpesa -> paid | failed | cancelled
  checkout_request_id TEXT,
  merchant_request_id TEXT,
  mpesa_receipt       TEXT,
  paid_amount         INTEGER,
  payer_phone         TEXT,
  result_desc         TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_checkout_request_id ON orders (checkout_request_id);

CREATE TABLE IF NOT EXISTS order_items (
  id          SERIAL PRIMARY KEY,
  order_id    TEXT NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,
  name        TEXT NOT NULL,
  unit_price  INTEGER NOT NULL,
  qty         INTEGER NOT NULL,
  line_total  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
