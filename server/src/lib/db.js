import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '..', '..', 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const file = path.join(dataDir, 'db.json')
const adapter = new JSONFile(file)
export const db = new Low(adapter, { orders: [], contacts: [] })

export async function initDb() {
  await db.read()
  db.data ||= { orders: [], contacts: [] }
  await db.write()
}

// NOTE: This flat-file store is fine for getting the app running and for demoing
// on Render's free tier. For real production traffic, swap this module for a
// proper database (e.g. Postgres via Render's managed DB) — the rest of the
// app only touches db.data.orders / db.data.contacts, so the swap is localized here.
