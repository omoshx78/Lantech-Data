import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowRight, GraduationCap } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { fmt } from '../lib/format'
import ProductImage from '../components/ProductImage'

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your cart is empty</h1>
        <p className="text-slate-500 mt-3">Browse our course subscriptions and add one to get started.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 mt-6 rounded-full bg-[#3E4095] hover:bg-[#33356E] text-white font-semibold px-6 py-3.5 transition-colors">
          Browse courses <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Your cart</h1>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 mt-10">
        <div className="divide-y divide-slate-100">
          {items.map((i) => (
            <div key={i.productId} className="py-5 flex items-start gap-4 border-b border-slate-100">
              <ProductImage src={i.product.image} alt={i.product.name} className="h-16 w-16 rounded-xl shrink-0" />
              <div className="flex-1">
                <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-[11px] font-semibold px-2 py-0.5">
                  {i.product.category}
                </span>
                <h3 className="font-bold text-slate-900 mt-1.5">{i.product.name}</h3>
                <p className="text-sm text-slate-400 mt-0.5">{fmt(i.product.price)} · {i.product.unit}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQty(i.productId, i.qty - 1)} className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{i.qty}</span>
                  <button onClick={() => updateQty(i.productId, i.qty + 1)} className="h-7 w-7 rounded-full border border-slate-200 flex items-center justify-center">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{fmt(i.product.price * i.qty)}</p>
                <button onClick={() => removeItem(i.productId)} className="mt-3 text-slate-300 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 p-6 h-fit bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Order summary</h3>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-slate-600">Total (16% VAT inclusive)</span>
            <span className="font-bold text-slate-900">{fmt(total)}</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Access is granted as soon as your M-Pesa payment is confirmed.
          </p>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full rounded-full bg-[#3E4095] hover:bg-[#33356E] text-white font-semibold py-3.5 transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
