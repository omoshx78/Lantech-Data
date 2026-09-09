import { useState } from 'react'
import { api } from '../lib/api'
import { ArrowRight, Check } from 'lucide-react'
import { FloatingInput, FloatingTextarea } from './FloatingField'
import { useRipple, RippleLayer } from './useRipple'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { ripples, onRippleClick } = useRipple()

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.post('/api/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 flex items-start gap-4">
        <Check size={20} className="text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-900">Message sent.</p>
          <p className="text-sm text-slate-500 mt-1">We'll get back to you shortly — usually within one business day.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingInput label="Name" required name="name" value={form.name} onChange={onChange} />
        <FloatingInput label="Phone" name="phone" value={form.phone} onChange={onChange} />
      </div>
      <FloatingInput label="Email" required type="email" name="email" value={form.email} onChange={onChange} />
      <FloatingTextarea label="Message" required name="message" value={form.message} onChange={onChange} rows={4} className="[&_textarea]:resize-none" />

      <button
        type="submit"
        disabled={status === 'sending'}
        onClick={onRippleClick}
        className="relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-6 py-3 w-fit disabled:opacity-60 transition-all hover:shadow-lg hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #3E4095, #33356E)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
        <RippleLayer ripples={ripples} />
      </button>
      {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>}
    </form>
  )
}
