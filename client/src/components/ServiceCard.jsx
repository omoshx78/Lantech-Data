import { Link } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { formatKES } from '../data/services'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'

export default function ServiceCard({ service }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(service.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="rounded-2xl border overflow-hidden flex flex-col h-full" style={{ borderColor: 'var(--slate-line)' }}>
      <ProductImage src={service.image} alt={service.name} rounded="" className="w-full aspect-[4/3]" />
      <div className="p-6 flex flex-col flex-1">
      <span className="font-mono text-[11px] text-[var(--brass)]">{service.category}</span>
      <h3 className="font-display text-xl font-semibold mt-2">
        <Link to={`/shop/${service.id}`} className="hover:underline">{service.name}</Link>
      </h3>
      <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{service.tagline}</p>

      <ul className="mt-4 space-y-1.5 text-sm text-[var(--ink-soft)]">
        {service.courses.slice(0, 4).map((c) => (
          <li key={c} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: 'var(--slate)' }} />
            {c}
          </li>
        ))}
        {service.courses.length > 4 && (
          <li className="text-[var(--slate)]">+{service.courses.length - 4} more</li>
        )}
      </ul>

      <div className="mt-auto pt-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-lg font-semibold">{formatKES(service.price)}</p>
          <p className="text-xs text-[var(--slate)]">{service.unit} · VAT inclusive</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm hover:bg-[var(--paper-dim)] transition-colors"
          style={{ borderColor: added ? 'var(--confirm)' : 'var(--slate-line)', color: added ? 'var(--confirm)' : 'var(--ink)' }}
        >
          {added ? <Check size={15} /> : <Plus size={15} />}
          {added ? 'Added' : 'Add'}
        </button>
      </div>
      </div>
    </div>
  )
}
