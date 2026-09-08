import { useState } from 'react'
import { api } from '../lib/api'
import { ArrowRight, Check } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

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

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C7C8EC] focus:border-[#3E4095]'

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-400 tracking-wide">NAME</label>
          <input required name="name" value={form.name} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 tracking-wide">PHONE</label>
          <input name="phone" value={form.phone} onChange={onChange} placeholder="07XX XXX XXX" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 tracking-wide">EMAIL</label>
        <input required type="email" name="email" value={form.email} onChange={onChange} className={inputClass} />
      </div>
      <div>
        <label className="text-xs font-bold text-slate-400 tracking-wide">MESSAGE</label>
        <textarea required name="message" value={form.message} onChange={onChange} rows={4}
          placeholder="Tell us about your organisation and what you need." className={`${inputClass} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3E4095] hover:bg-[#33356E] text-white font-semibold px-6 py-3 w-fit disabled:opacity-60 transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
      </button>
      {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>}
    </form>
  )
}
