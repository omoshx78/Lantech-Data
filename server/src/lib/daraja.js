import axios from 'axios'

// Safaricom Daraja SANDBOX. Switch BASE_URL to https://api.safaricom.co.ke for production,
// and use your production shortcode/passkey/credentials at that point.
const BASE_URL = process.env.MPESA_BASE_URL || 'https://sandbox.safaricom.co.ke'

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET

// Safaricom's publicly documented sandbox defaults (same for every developer testing
// against the sandbox Lipa Na M-Pesa Online shortcode). Override via env for production.
const SHORTCODE = process.env.MPESA_SHORTCODE || '174379'
const PASSKEY =
  process.env.MPESA_PASSKEY ||
  'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'

function timestamp() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  )
}

function password(ts) {
  return Buffer.from(`${SHORTCODE}${PASSKEY}${ts}`).toString('base64')
}

async function getAccessToken() {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error('MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET are not configured on the server')
  }
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
  const { data } = await axios.get(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  })
  return data.access_token
}

/**
 * Initiates an STK push (Lipa Na M-Pesa Online) prompt on the customer's phone.
 * @param {{ phone: string, amount: number, accountReference: string, transactionDesc: string, callbackUrl: string }} params
 */
export async function stkPush({ phone, amount, accountReference, transactionDesc, callbackUrl }) {
  const token = await getAccessToken()
  const ts = timestamp()

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password(ts),
    Timestamp: ts,
    TransactionType: 'CustomerPayBillOnline',
    Amount: Math.max(1, Math.round(amount)),
    PartyA: phone,
    PartyB: SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: accountReference.slice(0, 12),
    TransactionDesc: transactionDesc.slice(0, 13),
  }

  const { data } = await axios.post(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data // { MerchantRequestID, CheckoutRequestID, ResponseCode, ResponseDescription, CustomerMessage }
}

/** Optional: actively query STK status instead of waiting for the callback. */
export async function stkQuery(checkoutRequestId) {
  const token = await getAccessToken()
  const ts = timestamp()
  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: password(ts),
    Timestamp: ts,
    CheckoutRequestID: checkoutRequestId,
  }
  const { data } = await axios.post(`${BASE_URL}/mpesa/stkpushquery/v1/query`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}
