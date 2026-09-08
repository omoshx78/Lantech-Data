import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { products, loading, error } = useProducts()
  const [cat, setCat] = useState('All')

  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filtered = cat === 'All' ? products : products.filter((p) => p.category === cat)

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <p className="text-[#3E4095] font-semibold text-sm">Virtual TVET (ODeL)</p>
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight mt-1">Course subscriptions</h1>
      <p className="text-slate-500 mt-3 max-w-lg">
        Single-user access to our interactive 3D Virtual TVET courses, powered by Labtech Academy International.
        Pay by M-Pesa — access is granted as soon as payment is confirmed. Prices are 16% VAT inclusive.
      </p>

      {loading && (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading courses…
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-8">Couldn't load courses: {error}</p>}

      {!loading && !error && (
        <>
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat === c ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
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
  )
}
