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
INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('automotive-3-months', 'Automotive', 'Automotive (Single User) 3 Months', 'Virtual TVET (ODeL) — 3 months access, single user.', 9950, 3, 'Labtech Academy International', '/images/products/automotive.jpg', '["Basic Engine Fundamentals","Automotive Electrical and Electronic Systems","Petrol Fuel Systems","Diesel Fuel Systems","Engine Management Systems","Manual Transmissions","Automatic Transmissions and Transaxles","Wheel Drive Systems","Propeller Shafts and Differential Gear","Brakes Systems","Steering and Suspension Systems","Air Conditioning and Heating Systems","Hybrid Systems"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;

INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('automotive-6-months', 'Automotive', 'Automotive (Single User) 6 Months', 'Virtual TVET (ODeL) — 6 months access, single user.', 16550, 6, 'Labtech Academy International', '/images/products/automotive.jpg', '["Basic Engine Fundamentals","Automotive Electrical and Electronic Systems","Petrol Fuel Systems","Diesel Fuel Systems","Engine Management Systems","Manual Transmissions","Automatic Transmissions and Transaxles","Wheel Drive Systems","Propeller Shafts and Differential Gear","Brakes Systems","Steering and Suspension Systems","Air Conditioning and Heating Systems","Hybrid Systems"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;

INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('automotive-12-months', 'Automotive', 'Automotive (Single User) 12 Months', 'Virtual TVET (ODeL) — 12 months access, single user.', 23250, 12, 'Labtech Academy International', '/images/products/automotive.jpg', '["Basic Engine Fundamentals","Automotive Electrical and Electronic Systems","Petrol Fuel Systems","Diesel Fuel Systems","Engine Management Systems","Manual Transmissions","Automatic Transmissions and Transaxles","Wheel Drive Systems","Propeller Shafts and Differential Gear","Brakes Systems","Steering and Suspension Systems","Air Conditioning and Heating Systems","Hybrid Systems"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;

INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('hvac-3-months', 'HVAC', 'HVAC (Air Conditioning and Refrigeration) 3 Months', 'Virtual TVET (ODeL) — 3 months access, single user.', 7250, 3, 'Labtech Academy International', '/images/products/hvac.jpg', '["HVAC Fundamentals","Electric Circuit and Controls","Electric Motors","Refrigeration and Air Conditioning Compressors","Refrigeration System Components","Refrigeration Systems","Air Conditioning Systems","Automotive Air Conditioning"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;

INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('hvac-6-months', 'HVAC', 'HVAC (Air Conditioning and Refrigeration) 6 Months', 'Virtual TVET (ODeL) — 6 months access, single user.', 13950, 6, 'Labtech Academy International', '/images/products/hvac.jpg', '["HVAC Fundamentals","Electric Circuit and Controls","Electric Motors","Refrigeration and Air Conditioning Compressors","Refrigeration System Components","Refrigeration Systems","Air Conditioning Systems","Automotive Air Conditioning"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;

INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
VALUES ('hvac-12-months', 'HVAC', 'HVAC (Air Conditioning and Refrigeration) 12 Months', 'Virtual TVET (ODeL) — 12 months access, single user.', 19550, 12, 'Labtech Academy International', '/images/products/hvac.jpg', '["HVAC Fundamentals","Electric Circuit and Controls","Electric Motors","Refrigeration and Air Conditioning Compressors","Refrigeration System Components","Refrigeration Systems","Air Conditioning Systems","Automotive Air Conditioning"]'::jsonb)
ON CONFLICT (id) DO UPDATE SET category=EXCLUDED.category, name=EXCLUDED.name, tagline=EXCLUDED.tagline, price_kes=EXCLUDED.price_kes, months=EXCLUDED.months, powered_by=EXCLUDED.powered_by, image_path=EXCLUDED.image_path, courses=EXCLUDED.courses;


