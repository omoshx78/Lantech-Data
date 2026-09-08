import { Router } from 'express'
import { nanoid } from 'nanoid'
import { query, pool } from '../db/pool.js'

const router = Router()

router.post('/', async (req, res) => {
  const { customer, items } = req.body || {}

  if (!customer?.name || !customer?.email || !customer?.phone) {
    return res.status(400).json({ error: 'customer name, email and phone are required' })
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'cart items are required' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const lineItems = []
    for (const { productId, qty } of items) {
      const { rows } = await client.query('SELECT * FROM products WHERE id = $1 AND active = true', [productId])
      if (rows.length === 0) throw Object.assign(new Error(`Unknown product: ${productId}`), { status: 400 })
      const product = rows[0]
      const quantity = Math.max(1, Number(qty) || 1)
      lineItems.push({
        productId,
        name: product.name,
        unitPrice: product.price_kes,
        qty: quantity,
        lineTotal: product.price_kes * quantity,
      })
    }

    const total = lineItems.reduce((s, i) => s + i.lineTotal, 0)
    const orderId = nanoid(10)

    await client.query(
      `INSERT INTO orders (id, customer_name, customer_email, customer_phone, customer_org, total_kes, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending_payment')`,
      [orderId, customer.name, customer.email, customer.phone, customer.organisation || null, total]
    )

    for (const li of lineItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, unit_price, qty, line_total)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, li.productId, li.name, li.unitPrice, li.qty, li.lineTotal]
      )
    }

    await client.query('COMMIT')
    res.status(201).json({ id: orderId, total, status: 'pending_payment' })
  } catch (err) {
    await client.query('ROLLBACK')
    res.status(err.status || 500).json({ error: err.message || 'Could not create order' })
  } finally {
    client.release()
  }
})

router.get('/:id/status', async (req, res) => {
  const { rows } = await query('SELECT id, status, result_desc, mpesa_receipt FROM orders WHERE id = $1', [req.params.id])
  if (rows.length === 0) return res.status(404).json({ error: 'Order not found' })
  const o = rows[0]
  res.json({ id: o.id, status: o.status, resultDesc: o.result_desc, mpesaReceipt: o.mpesa_receipt })
})

router.get('/:id', async (req, res) => {
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [req.params.id])
  if (rows.length === 0) return res.status(404).json({ error: 'Order not found' })
  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id])
  res.json({ ...rows[0], items })
})

export default router
