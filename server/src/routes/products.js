import { Router } from 'express'
import { query } from '../db/pool.js'

const router = Router()

router.get('/', async (_req, res) => {
  const { rows } = await query('SELECT * FROM products WHERE active = true ORDER BY category, months')
  res.json(rows.map(serialize))
})

router.get('/:id', async (req, res) => {
  const { rows } = await query('SELECT * FROM products WHERE id = $1 AND active = true', [req.params.id])
  if (rows.length === 0) return res.status(404).json({ error: 'Product not found' })
  res.json(serialize(rows[0]))
})

function serialize(row) {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    tagline: row.tagline,
    price: row.price_kes,
    months: row.months,
    unit: `${row.months} months access`,
    poweredBy: row.powered_by,
    image: row.image_path,
    courses: row.courses,
  }
}

export default router
