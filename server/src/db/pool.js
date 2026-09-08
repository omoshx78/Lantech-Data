import pg from 'pg'

const { Pool } = pg

// Render's managed Postgres requires SSL; local Postgres (docker/homebrew) usually doesn't.
// DATABASE_URL is provided automatically by Render when you attach a Postgres instance.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
})

export async function query(text, params) {
  return pool.query(text, params)
}
