import { Link } from 'react-router-dom'
import { Plus, Check, Clock } from 'lucide-react'
import { useState } from 'react'
import { fmt } from '../lib/format'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:shadow-slate-200/70 hover:-translate-y-0.5 transition-all">
      <ProductImage src={product.image} alt={product.name} className="h-36 w-full border-b border-slate-100" />
      <div className="p-5">
        <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-2.5 py-1">
          {product.category}
        </span>
        <Link to={`/shop/${product.id}`} className="block mt-3">
          <h3 className="font-bold text-slate-900 leading-snug hover:text-[#3E4095] transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={12} /> {product.unit}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-extrabold text-lg text-slate-900">{fmt(product.price)}</p>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-1.5 rounded-full text-sm font-semibold px-4 py-2 transition-colors ${
              added ? 'bg-emerald-50 text-emerald-700' : 'bg-[#3E4095] hover:bg-[#33356E] text-white'
            }`}
          >
            {added ? <Check size={14} /> : <Plus size={14} />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
