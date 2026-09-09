import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'

export default function Shop() {
  const { products, loading, error } = useProducts()
  const [cat, setCat] = useState('All')

  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)

  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-14">
          <Reveal>
            <p className="text-orange-300 font-semibold text-sm">Virtual TVET (ODeL)</p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-1">Course subscriptions</h1>
            <p className="text-blue-100 mt-3 max-w-lg leading-relaxed">
              Single-user access to our interactive 3D Virtual TVET courses, powered by Labtech Academy International.
              Pay by M-Pesa — access is granted as soon as payment is confirmed. Prices are 16% VAT inclusive.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 py-14">
        {loading && (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mr-2" size={18} /> Loading courses…
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-8">Couldn't load courses: {error}</p>}

        {!loading && !error && (
          <>
            <div className="flex flex-wrap gap-2 -mt-24 mb-10 relative z-10">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition-all shadow-md"
                  style={
                    cat === c
                      ? { background: 'linear-gradient(135deg, #F58634, #d8762e)', color: 'white' }
                      : { background: 'white', color: '#334155' }
                  }
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>

            <p className="text-sm text-slate-400 mt-10">
              Need this for a school, college or institution? Contact us at{' '}
              <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a>{' '}
              for group/volume pricing.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
