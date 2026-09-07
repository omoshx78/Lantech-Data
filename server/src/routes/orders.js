import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../lib/db.js'
import { findService } from '../data/services.js'

const router = Router()

router.post('/', async (req, res) => {
  const { customer, items } = req.body || {}

  if (!customer?.name || !customer?.email || !customer?.phone) {
    return res.status(400).json({ error: 'customer name, email and phone are required' })
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'cart items are required' })
  }

  const lineItems = []
  for (const { serviceId, qty } of items) {
    const service = findService(serviceId)
    if (!service) return res.status(400).json({ error: `Unknown service: ${serviceId}` })
    const quantity = Math.max(1, Number(qty) || 1)
    lineItems.push({
      serviceId,
      name: service.name,
      qty: quantity,
      unitPrice: service.price,
      lineTotal: service.price * quantity,
    })
  }

  const total = lineItems.reduce((s, i) => s + i.lineTotal, 0)

  const order = {
    id: nanoid(10),
    customer,
    items: lineItems,
    total,
    status: 'pending_payment', // pending_payment -> awaiting_mpesa -> paid | failed | cancelled
    checkoutRequestId: null,
    merchantRequestId: null,
    mpesaReceipt: null,
    resultDesc: null,
    createdAt: new Date().toISOString(),
  }

  db.data.orders.push(order)
  await db.write()

  res.status(201).json({ id: order.id, total, status: order.status })
})

router.get('/:id/status', async (req, res) => {
  const order = db.data.orders.find((o) => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json({
    id: order.id,
    status: order.status,
    resultDesc: order.resultDesc,
    mpesaReceipt: order.mpesaReceipt,
  })
})

router.get('/:id', async (req, res) => {
  const order = db.data.orders.find((o) => o.id === req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

export default router
