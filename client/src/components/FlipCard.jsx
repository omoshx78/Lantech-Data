import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FlipCard({ icon: Icon, title, body, backBody, to, tint, color }) {
  return (
    <Link
      to={to}
      className="group block h-56"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotateY(180deg)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotateY(0deg)' }}
      >
        {/* front */}
        <div
          className="absolute inset-0 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: tint }}>
            <Icon size={22} style={{ color }} />
          </div>
          <h3 className="font-bold text-slate-900 mt-4">{title}</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">{body}</p>
          <span className="mt-auto text-xs font-semibold" style={{ color }}>Hover to learn more</span>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between text-white"
          style={{ background: `linear-gradient(150deg, ${color}, #1e2450)`, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <Icon size={22} className="text-white/90" />
            <h3 className="font-bold mt-3">{title}</h3>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">{backBody}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            Learn more <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
