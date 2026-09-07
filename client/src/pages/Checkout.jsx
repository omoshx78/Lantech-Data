import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatKES } from '../data/services'
import { api } from '../lib/api'

const PHONE_RE = /^(?:254|0)7\d{8}$|^(?:254|0)1\d{8}$/

function normalizePhone(raw) {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('0')) return '254' + digits.slice(1)
  if (digits.startsWith('254')) return digits
  if (digits.startsWith('7') || digits.startsWith('1')) return '254' + digits
  return digits
}

export default function Checkout() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', organisation: '', phone: '' })
  const [stage, setStage] = useState('form') // form | creating | pending | success | failed
  const [error, setError] = useState('')
  const pollRef = useRef(null)

  useEffect(() => {
    if (items.length === 0 && stage === 'form') navigate('/shop')
  }, [items, stage, navigate])

  useEffect(() => () => clearInterval(pollRef.current), [])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const pollStatus = (orderId) => {
    pollRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/api/orders/${orderId}/status`)
        if (data.status === 'paid') {
          clearInterval(pollRef.current)
          setStage('success')
          clear()
        } else if (data.status === 'failed' || data.status === 'cancelled') {
          clearInterval(pollRef.current)
          setStage('failed')
          setError(data.resultDesc || 'The M-Pesa payment was not completed.')
        }
      } catch {
        // keep polling; transient network errors shouldn't kill the flow
      }
    }, 3000)
    // stop polling after 2 minutes
    setTimeout(() => {
      clearInterval(pollRef.current)
      setStage((s) => (s === 'pending' ? 'failed' : s))
      setError((e) => e || 'Timed out waiting for confirmation. If you approved the prompt, your booking may still go through — we will email you.')
    }, 120000)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!PHONE_RE.test(form.phone.replace(/\s/g, ''))) {
      setError('Enter a valid Safaricom number, e.g. 07XXXXXXXX')
      return
    }

    setStage('creating')
    try {
      const phone = normalizePhone(form.phone)
      const { data: order } = await api.post('/api/orders', {
        customer: { name: form.name, email: form.email, organisation: form.organisation, phone },
        items: items.map((i) => ({ serviceId: i.serviceId, qty: i.qty })),
      })

      setStage('pending')
      await api.post('/api/mpesa/stkpush', { orderId: order.id, phone })
      pollStatus(order.id)
    } catch (err) {
      setStage('failed')
      setError(err?.response?.data?.error || 'Could not start the M-Pesa payment. Please try again.')
    }
  }

  if (stage === 'success') {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <CheckCircle2 size={44} style={{ color: 'var(--confirm)' }} className="mx-auto" />
        <h1 className="font-display text-3xl font-semibold mt-6">Payment received</h1>
        <p className="text-[var(--ink-soft)] mt-3">
          Your payment has been confirmed via M-Pesa. Access details will be sent to your email shortly.
        </p>
        <button onClick={() => navigate('/')} className="mt-8 rounded-full px-6 py-3 text-sm font-medium text-white" style={{ background: 'var(--ink)' }}>
          Back to home
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold">Checkout</h1>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 mt-10">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-[var(--slate)]">FULL NAME</label>
              <input required name="name" value={form.name} onChange={onChange} disabled={stage !== 'form'}
                className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
            </div>
            <div>
              <label className="text-xs font-mono text-[var(--slate)]">ORGANISATION</label>
              <input name="organisation" value={form.organisation} onChange={onChange} disabled={stage !== 'form'}
                className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-[var(--slate)]">EMAIL</label>
            <input required type="email" name="email" value={form.email} onChange={onChange} disabled={stage !== 'form'}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
          </div>
          <div>
            <label className="text-xs font-mono text-[var(--slate)]">M-PESA NUMBER</label>
            <input required name="phone" value={form.phone} onChange={onChange} placeholder="07XX XXX XXX" disabled={stage !== 'form'}
              className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
            <p className="text-xs text-[var(--slate)] mt-1">Sandbox mode — use Safaricom test number 254708374149.</p>
          </div>

          {stage === 'form' && (
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white w-fit" style={{ background: 'var(--ink)' }}>
              <Smartphone size={16} /> Pay with M-Pesa
            </button>
          )}

          {(stage === 'creating' || stage === 'pending') && (
            <div className="flex items-center gap-3 rounded-xl border p-4 mt-2" style={{ borderColor: 'var(--slate-line)', background: 'var(--paper-dim)' }}>
              <Loader2 size={18} className="animate-spin" style={{ color: 'var(--signal)' }} />
              <div>
                <p className="text-sm font-medium">
                  {stage === 'creating' ? 'Setting up your order…' : 'Check your phone for the M-Pesa prompt'}
                </p>
                {stage === 'pending' && <p className="text-xs text-[var(--slate)] mt-0.5">Enter your M-Pesa PIN to confirm payment.</p>}
              </div>
            </div>
          )}

          {stage === 'failed' && (
            <div className="flex items-start gap-3 rounded-xl border p-4 mt-2" style={{ borderColor: '#F0C9C4', background: '#FBEEEC' }}>
              <XCircle size={18} style={{ color: '#B3261E' }} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Payment not completed</p>
                <p className="text-xs text-[var(--ink-soft)] mt-1">{error}</p>
                <button type="button" onClick={() => { setStage('form'); setError('') }} className="text-sm underline mt-2">
                  Try again
                </button>
              </div>
            </div>
          )}

          {error && stage === 'form' && <p className="text-sm" style={{ color: '#B3261E' }}>{error}</p>}
        </form>

        <div className="rounded-2xl border p-6 h-fit" style={{ borderColor: 'var(--slate-line)' }}>
          <h3 className="font-display text-lg font-semibold">Order summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <div key={i.serviceId} className="flex justify-between">
                <span className="text-[var(--ink-soft)]">{i.service.name} × {i.qty}</span>
                <span className="font-mono">{formatKES(i.service.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t my-4" style={{ borderColor: 'var(--slate-line)' }} />
          <div className="flex justify-between font-medium">
            <span>Total due now</span>
            <span className="font-mono">{formatKES(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
