import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './pool.js'
import { CATALOG } from './catalog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  console.log('Running schema.sql ...')
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  await pool.query(schema)
  console.log('Schema OK.')

  console.log(`Seeding ${CATALOG.length} products ...`)
  for (const p of CATALOG) {
    await pool.query(
      `INSERT INTO products (id, category, name, tagline, price_kes, months, powered_by, image_path, courses)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE SET
         category = EXCLUDED.category,
         name = EXCLUDED.name,
         tagline = EXCLUDED.tagline,
         price_kes = EXCLUDED.price_kes,
         months = EXCLUDED.months,
         powered_by = EXCLUDED.powered_by,
         image_path = EXCLUDED.image_path,
         courses = EXCLUDED.courses`,
      [p.id, p.category, p.name, p.tagline, p.price, p.months, p.poweredBy, p.image, JSON.stringify(p.courses)]
    )
  }
  console.log('Seed OK.')
  await pool.end()
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
