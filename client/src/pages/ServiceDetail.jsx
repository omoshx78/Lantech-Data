import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { findService, formatKES } from '../data/services'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = findService(id)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!service) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p>Course not found.</p>
        <Link to="/shop" className="underline text-sm">Back to courses</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
        <ArrowLeft size={14} /> Back to courses
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-8">
        <ProductImage src={service.image} alt={service.name} className="w-full aspect-[4/3] h-fit" />

        <div>
          <span className="font-mono text-xs text-[var(--brass)]">Virtual TVET (ODeL) · {service.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-3">{service.name}</h1>

          <p className="font-mono text-3xl font-semibold mt-4">
            {formatKES(service.price)}{' '}
            <span className="text-sm font-sans font-normal text-[var(--slate)]">16% VAT inclusive</span>
          </p>
          <p className="text-sm text-[var(--slate)] mt-1">{service.unit}</p>

          <p className="text-xs font-mono text-[var(--slate)] mt-8">COURSES:-</p>
          <ul className="mt-3 space-y-3">
            {service.courses.map((c) => (
              <li key={c} className="flex gap-3 text-sm">
                <Check size={16} style={{ color: 'var(--signal)' }} className="shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>

          <p className="text-sm text-[var(--slate)] mt-8">Powered by {service.poweredBy}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                addItem(service.id, 1)
                setAdded(true)
              }}
              className="rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ background: 'var(--ink)' }}
            >
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            {added && (
              <button onClick={() => navigate('/cart')} className="text-sm underline self-center">
                Go to cart →
              </button>
            )}
          </div>

          <p className="text-xs text-[var(--slate)] mt-4 leading-relaxed">
            Institutional or group pricing available — contact{' '}
            <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
