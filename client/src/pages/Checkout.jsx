import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, Loader2, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { fmt } from '../lib/format'
import { api } from '../lib/api'
import { FloatingInput } from '../components/FloatingField'
import { useRipple, RippleLayer } from '../components/useRipple'

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
  const [stage, setStage] = useState('form')
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
        // transient network errors shouldn't kill the flow
      }
    }, 3000)
    setTimeout(() => {
      clearInterval(pollRef.current)
      setStage((s) => (s === 'pending' ? 'failed' : s))
      setError((e) => e || 'Timed out waiting for confirmation. If you approved the prompt, your booking may still go through.')
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
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
      })

      setStage('pending')
      await api.post('/api/mpesa/stkpush', { orderId: order.id, phone })
      pollStatus(order.id)
    } catch (err) {
      setStage('failed')
      setError(err?.response?.data?.error || 'Could not start the M-Pesa payment. Please try again.')
    }
  }

  const { ripples, onRippleClick } = useRipple()

  if (stage === 'success') {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-6">Payment received</h1>
        <p className="text-slate-500 mt-2">Your payment has been confirmed via M-Pesa. Access details will be sent to your email shortly.</p>
        <button onClick={() => navigate('/')} className="mt-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 transition-colors">
          Back to home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <button onClick={() => navigate('/cart')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={15} /> Back to cart
      </button>
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Checkout</h1>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 mt-8">
        <form onSubmit={onSubmit} className="grid gap-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FloatingInput label="Full name" required name="name" value={form.name} onChange={onChange} disabled={stage !== 'form'} />
            <FloatingInput label="Organisation" name="organisation" value={form.organisation} onChange={onChange} disabled={stage !== 'form'} />
          </div>
          <FloatingInput label="Email" required type="email" name="email" value={form.email} onChange={onChange} disabled={stage !== 'form'} />
          <div>
            <FloatingInput label="M-Pesa number" required name="phone" value={form.phone} onChange={onChange} disabled={stage !== 'form'} />
            <p className="text-xs text-slate-400 mt-1.5">Sandbox mode — use Safaricom test number 254708374149.</p>
          </div>

          {stage === 'form' && (
            <button
              type="submit"
              onClick={onRippleClick}
              className="relative overflow-hidden mt-2 inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-6 py-3.5 w-fit transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #3E4095, #33356E)' }}
            >
              <Smartphone size={16} /> Pay with M-Pesa
              <RippleLayer ripples={ripples} />
            </button>
          )}

          {(stage === 'creating' || stage === 'pending') && (
            <div className="flex items-center gap-3 rounded-xl border border-[#DADAF0] bg-[#EEEEF9] p-4 mt-2">
              <Loader2 size={18} className="animate-spin text-[#3E4095]" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {stage === 'creating' ? 'Setting up your order…' : 'Check your phone for the M-Pesa prompt'}
                </p>
                {stage === 'pending' && <p className="text-xs text-slate-500 mt-0.5">Enter your M-Pesa PIN to confirm payment.</p>}
              </div>
            </div>
          )}

          {stage === 'failed' && (
            <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 mt-2">
              <XCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Payment not completed</p>
                <p className="text-xs text-slate-500 mt-1">{error}</p>
                <button type="button" onClick={() => { setStage('form'); setError('') }} className="text-sm font-semibold text-[#3E4095] mt-2">
                  Try again
                </button>
              </div>
            </div>
          )}

          {error && stage === 'form' && <p className="text-sm text-red-600">{error}</p>}
        </form>

        <div className="rounded-2xl border border-slate-200 p-6 h-fit bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Order summary</h3>
          <div className="mt-4 space-y-2.5">
            {items.map((i) => (
              <div key={i.productId} className="flex justify-between text-sm">
                <span className="text-slate-600">{i.product.name} × {i.qty}</span>
                <span className="font-semibold text-slate-900">{fmt(i.product.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 my-4" />
          <div className="flex justify-between font-bold text-slate-900">
            <span>Total due</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
