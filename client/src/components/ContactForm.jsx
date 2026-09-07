import { useState } from 'react'
import { api } from '../lib/api'
import { ArrowRight, Check } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

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
      <div className="rounded-2xl border p-8 flex items-start gap-4" style={{ borderColor: 'var(--slate-line)', background: 'var(--confirm-dim)' }}>
        <Check size={20} style={{ color: 'var(--confirm)' }} />
        <div>
          <p className="font-medium">Message sent.</p>
          <p className="text-sm text-[var(--ink-soft)] mt-1">We'll get back to you shortly — usually within one business day.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-[var(--slate)]">NAME</label>
          <input required name="name" value={form.name} onChange={onChange}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
        </div>
        <div>
          <label className="text-xs font-mono text-[var(--slate)]">PHONE</label>
          <input name="phone" value={form.phone} onChange={onChange} placeholder="07XX XXX XXX"
            className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
        </div>
      </div>
      <div>
        <label className="text-xs font-mono text-[var(--slate)]">EMAIL</label>
        <input required type="email" name="email" value={form.email} onChange={onChange}
          className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent" style={{ borderColor: 'var(--slate-line)' }} />
      </div>
      <div>
        <label className="text-xs font-mono text-[var(--slate)]">MESSAGE</label>
        <textarea required name="message" value={form.message} onChange={onChange} rows={4}
          placeholder="Tell us about your organisation and what you need."
          className="mt-1 w-full rounded-lg border px-3 py-2.5 bg-transparent resize-none" style={{ borderColor: 'var(--slate-line)' }} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white w-fit disabled:opacity-60"
        style={{ background: 'var(--ink)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
      </button>
      {status === 'error' && <p className="text-sm" style={{ color: '#B3261E' }}>Something went wrong. Please try again or call us directly.</p>}
    </form>
  )
}
