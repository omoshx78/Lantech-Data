import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { fmt } from '../lib/format'
import ProductImage from '../components/ProductImage'
import Reveal from '../components/Reveal'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { findProduct, loading } = useProducts()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="animate-spin mr-2" size={18} /> Loading…
      </div>
    )
  }

  const product = findProduct(id)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p>Course not found.</p>
        <Link to="/shop" className="underline text-sm">Back to courses</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <button onClick={() => navigate('/shop')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to courses
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/40">
            <ProductImage src={product.image} alt={product.name} className="aspect-[4/3] h-fit w-full transition-transform duration-700 hover:scale-105" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-2.5 py-1">
            {product.category} · Virtual TVET
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">{product.name}</h1>
          <p className="font-extrabold text-3xl mt-4" style={{ color: '#3E4095' }}>
            {fmt(product.price)}
            <span className="text-sm font-medium text-slate-400 ml-2">16% VAT inclusive</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">{product.unit}</p>

          <p className="text-xs font-bold text-slate-400 tracking-wide mt-8">COURSES INCLUDED</p>
          <ul className="mt-3 space-y-2.5">
            {product.courses.map((c, i) => (
              <li
                key={c}
                className="flex gap-2.5 text-sm text-slate-700"
                style={{
                  opacity: 0,
                  animation: `fadeSlideIn 0.4s ease ${0.05 * i}s forwards`,
                }}
              >
                <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" /> {c}
              </li>
            ))}
          </ul>

          <p className="text-sm text-slate-400 mt-8">Powered by {product.poweredBy}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { addItem(product.id, 1); setAdded(true) }}
              className="rounded-full text-white font-semibold px-8 py-3.5 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: added ? '#1D7A4C' : 'linear-gradient(135deg, #3E4095, #33356E)' }}
            >
              {added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
            {added && (
              <button onClick={() => navigate('/cart')} className="text-sm font-semibold self-center" style={{ color: '#3E4095' }}>
                Go to cart →
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Institutional or group pricing available — contact{' '}
            <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a>.
          </p>
        </Reveal>
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
