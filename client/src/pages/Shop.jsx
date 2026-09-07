import { useState } from 'react'
import { CATEGORIES, SERVICES } from '../data/services'
import ServiceCard from '../components/ServiceCard'

export default function Shop() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? SERVICES : SERVICES.filter((s) => s.category === active)

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <span className="font-mono text-xs text-[var(--brass)]">Virtual TVET (ODeL)</span>
      <h1 className="font-display text-4xl font-semibold mt-3">Course subscriptions</h1>
      <p className="text-[var(--ink-soft)] mt-3 max-w-lg">
        Single-user access to our interactive 3D Virtual TVET courses, powered by Labtech Academy
        International. Pay by M-Pesa — access is granted as soon as payment is confirmed. Prices are
        16% VAT inclusive.
      </p>

      <div className="flex flex-wrap gap-2 mt-8">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="rounded-full border px-4 py-1.5 text-sm transition-colors"
            style={{
              borderColor: active === c ? 'var(--ink)' : 'var(--slate-line)',
              background: active === c ? 'var(--ink)' : 'transparent',
              color: active === c ? 'white' : 'var(--ink)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {filtered.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <p className="text-sm text-[var(--slate)] mt-10">
        Need this for a school, college or institution? Contact us at{' '}
        <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a>{' '}
        for group/volume pricing and a Virtual TVET LMS proposal.
      </p>
    </div>
  )
}
