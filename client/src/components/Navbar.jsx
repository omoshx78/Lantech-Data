import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Services' },
  { to: '/#about', label: 'About' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b" style={{ borderColor: 'var(--slate-line)', background: 'var(--paper)' }}>
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">LanTech</span>
          <span className="font-mono text-[11px] text-[var(--slate)]">DATA SERVICES</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-[var(--paper-dim)] transition-colors"
            style={{ borderColor: 'var(--slate-line)' }}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono text-white"
                style={{ background: 'var(--signal)' }}
              >
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t px-5 py-4 flex flex-col gap-4" style={{ borderColor: 'var(--slate-line)' }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm">
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
