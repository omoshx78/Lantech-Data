import { Router } from 'express'
import { db } from '../lib/db.js'
import { stkPush } from '../lib/daraja.js'

const router = Router()

router.post('/stkpush', async (req, res) => {
  const { orderId, phone } = req.body || {}
  const order = db.data.orders.find((o) => o.id === orderId)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  if (order.status === 'paid') return res.status(400).json({ error: 'Order is already paid' })

  const callbackUrl = `${process.env.PUBLIC_SERVER_URL}/api/mpesa/callback`
  if (!process.env.PUBLIC_SERVER_URL) {
    return res.status(500).json({
      error: 'PUBLIC_SERVER_URL is not configured — Safaricom needs a public HTTPS URL to send the payment result to.',
    })
  }

  try {
    const result = await stkPush({
      phone,
      amount: order.total,
      accountReference: `LT-${order.id}`,
      transactionDesc: 'LanTech Course',
      callbackUrl,
    })

    if (result.ResponseCode !== '0') {
      order.status = 'failed'
      order.resultDesc = result.ResponseDescription
      await db.write()
      return res.status(400).json({ error: result.ResponseDescription || 'STK push was rejected' })
    }

    order.status = 'awaiting_mpesa'
    order.checkoutRequestId = result.CheckoutRequestID
    order.merchantRequestId = result.MerchantRequestID
    await db.write()

    res.json({ checkoutRequestId: result.CheckoutRequestID, customerMessage: result.CustomerMessage })
  } catch (err) {
    const desc = err?.response?.data?.errorMessage || err.message
    order.status = 'failed'
    order.resultDesc = desc
    await db.write()
    res.status(500).json({ error: desc })
  }
})

// Safaricom calls this URL with the payment result. Must respond fast with 200 + the
// expected ack shape, regardless of whether the payment succeeded.
router.post('/callback', async (req, res) => {
  try {
    const stk = req.body?.Body?.stkCallback
    if (!stk) return res.status(200).json({ ResultCode: 0, ResultDesc: 'Ignored' })

    const order = db.data.orders.find((o) => o.checkoutRequestId === stk.CheckoutRequestID)
    if (order) {
      if (stk.ResultCode === 0) {
        const items = stk.CallbackMetadata?.Item || []
        const get = (name) => items.find((i) => i.Name === name)?.Value
        order.status = 'paid'
        order.mpesaReceipt = get('MpesaReceiptNumber')
        order.paidAmount = get('Amount')
        order.payerPhone = get('PhoneNumber')
        order.resultDesc = stk.ResultDesc
      } else {
        order.status = stk.ResultCode === 1032 ? 'cancelled' : 'failed'
        order.resultDesc = stk.ResultDesc
      }
      await db.write()
    }
  } catch (err) {
    console.error('mpesa callback processing error:', err.message)
  }

  // Safaricom expects this exact acknowledgement shape regardless of outcome.
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' })
})

export default router
