import { Router } from 'express'
import { query } from '../db/pool.js'
import { stkPush } from '../lib/daraja.js'

const router = Router()

router.post('/stkpush', async (req, res) => {
  const { orderId, phone } = req.body || {}
  const { rows } = await query('SELECT * FROM orders WHERE id = $1', [orderId])
  if (rows.length === 0) return res.status(404).json({ error: 'Order not found' })
  const order = rows[0]
  if (order.status === 'paid') return res.status(400).json({ error: 'Order is already paid' })

  if (!process.env.PUBLIC_SERVER_URL) {
    return res.status(500).json({
      error: 'PUBLIC_SERVER_URL is not configured — Safaricom needs a public HTTPS URL to send the payment result to.',
    })
  }
  const callbackUrl = `${process.env.PUBLIC_SERVER_URL}/api/mpesa/callback`

  try {
    const result = await stkPush({
      phone,
      amount: order.total_kes,
      accountReference: `LT-${order.id}`,
      transactionDesc: 'LanTech Course',
      callbackUrl,
    })

    if (result.ResponseCode !== '0') {
      await query('UPDATE orders SET status = $1, result_desc = $2, updated_at = now() WHERE id = $3', [
        'failed', result.ResponseDescription, order.id,
      ])
      return res.status(400).json({ error: result.ResponseDescription || 'STK push was rejected' })
    }

    await query(
      `UPDATE orders SET status = 'awaiting_mpesa', checkout_request_id = $1, merchant_request_id = $2, updated_at = now() WHERE id = $3`,
      [result.CheckoutRequestID, result.MerchantRequestID, order.id]
    )

    res.json({ checkoutRequestId: result.CheckoutRequestID, customerMessage: result.CustomerMessage })
  } catch (err) {
    const desc = err?.response?.data?.errorMessage || err.message
    await query('UPDATE orders SET status = $1, result_desc = $2, updated_at = now() WHERE id = $3', ['failed', desc, order.id])
    res.status(500).json({ error: desc })
  }
})

// Safaricom calls this URL with the payment result. Must respond fast with 200 + the
// expected ack shape, regardless of whether the payment succeeded.
router.post('/callback', async (req, res) => {
  try {
    const stk = req.body?.Body?.stkCallback
    if (stk) {
      const { rows } = await query('SELECT id FROM orders WHERE checkout_request_id = $1', [stk.CheckoutRequestID])
      if (rows.length > 0) {
        const orderId = rows[0].id
        if (stk.ResultCode === 0) {
          const items = stk.CallbackMetadata?.Item || []
          const get = (name) => items.find((i) => i.Name === name)?.Value
          await query(
            `UPDATE orders SET status = 'paid', mpesa_receipt = $1, paid_amount = $2, payer_phone = $3, result_desc = $4, updated_at = now() WHERE id = $5`,
            [get('MpesaReceiptNumber'), get('Amount'), String(get('PhoneNumber') ?? ''), stk.ResultDesc, orderId]
          )
        } else {
          const status = stk.ResultCode === 1032 ? 'cancelled' : 'failed'
          await query('UPDATE orders SET status = $1, result_desc = $2, updated_at = now() WHERE id = $3', [
            status, stk.ResultDesc, orderId,
          ])
        }
      }
    }
  } catch (err) {
    console.error('mpesa callback processing error:', err.message)
  }

  res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' })
})

export default router
