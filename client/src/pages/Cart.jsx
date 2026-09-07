import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatKES } from '../data/services'

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="text-[var(--ink-soft)] mt-3">Browse our course subscriptions and add one to get started.</p>
        <Link to="/shop" className="inline-flex items-center gap-1.5 mt-6 rounded-full px-6 py-3 text-sm font-medium text-white" style={{ background: 'var(--ink)' }}>
          Browse courses <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold">Your cart</h1>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 mt-10">
        <div className="divide-y" style={{ borderColor: 'var(--slate-line)' }}>
          {items.map((i) => (
            <div key={i.serviceId} className="py-5 flex items-start justify-between gap-4 border-b" style={{ borderColor: 'var(--slate-line)' }}>
              <div>
                <span className="font-mono text-[11px] text-[var(--brass)]">{i.service.category}</span>
                <h3 className="font-display text-lg font-semibold mt-1">{i.service.name}</h3>
                <p className="text-sm text-[var(--slate)] mt-1">{formatKES(i.service.price)} · {i.service.unit}</p>

                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQty(i.serviceId, i.qty - 1)} className="p-1.5 rounded-full border" style={{ borderColor: 'var(--slate-line)' }}>
                    <Minus size={13} />
                  </button>
                  <span className="font-mono text-sm w-6 text-center">{i.qty}</span>
                  <button onClick={() => updateQty(i.serviceId, i.qty + 1)} className="p-1.5 rounded-full border" style={{ borderColor: 'var(--slate-line)' }}>
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono font-medium">{formatKES(i.service.price * i.qty)}</p>
                <button onClick={() => removeItem(i.serviceId)} className="mt-3 text-[var(--slate)] hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-6 h-fit" style={{ borderColor: 'var(--slate-line)' }}>
          <h3 className="font-display text-lg font-semibold">Order summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Total (16% VAT inclusive)</span>
              <span className="font-mono font-semibold">{formatKES(total)}</span>
            </div>
          </div>
          <p className="text-xs text-[var(--slate)] mt-3 leading-relaxed">
            Access is granted as soon as your M-Pesa payment is confirmed.
          </p>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-6 w-full rounded-full px-6 py-3 text-sm font-medium text-white"
            style={{ background: 'var(--ink)' }}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
