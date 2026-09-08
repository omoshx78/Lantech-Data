import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { fmt } from '../lib/format'
import ProductImage from '../components/ProductImage'

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
      <button onClick={() => navigate('/shop')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6">
        <ArrowLeft size={15} /> Back to courses
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <ProductImage src={product.image} alt={product.name} className="rounded-2xl border border-slate-100 aspect-[4/3] h-fit" />

        <div>
          <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-2.5 py-1">
            {product.category} · Virtual TVET
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">{product.name}</h1>
          <p className="font-extrabold text-3xl text-slate-900 mt-4">
            {fmt(product.price)}
            <span className="text-sm font-medium text-slate-400 ml-2">16% VAT inclusive</span>
          </p>
          <p className="text-sm text-slate-500 mt-1">{product.unit}</p>

          <p className="text-xs font-bold text-slate-400 tracking-wide mt-8">COURSES INCLUDED</p>
          <ul className="mt-3 space-y-2.5">
            {product.courses.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm text-slate-700">
                <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" /> {c}
              </li>
            ))}
          </ul>

          <p className="text-sm text-slate-400 mt-8">Powered by {product.poweredBy}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { addItem(product.id, 1); setAdded(true) }}
              className="rounded-full bg-[#3E4095] hover:bg-[#33356E] text-white font-semibold px-8 py-3.5 transition-colors"
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            {added && (
              <button onClick={() => navigate('/cart')} className="text-sm font-semibold text-[#3E4095] self-center">
                Go to cart →
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Institutional or group pricing available — contact{' '}
            <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
