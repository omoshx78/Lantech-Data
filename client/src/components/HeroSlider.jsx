import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    tag: 'Cyber Security · EduVR',
    title: 'Leader in cyber security\nand EduVR content',
    body: 'We help organisations across Kenya and East Africa evolve their network architecture against ever-increasing threats — and help institutions bring STEM to life through virtual reality.',
    cta: { label: 'Explore services', to: '/shop' },
    motif: 'shield',
  },
  {
    tag: 'EduVR & Training',
    title: 'Digitalized welders\ntraining, in AR',
    body: 'A turnkey, scalable welding solution powered by augmented reality — the most realistic training system available outside of real welding.',
    cta: { label: 'View the welding trainer', to: '/shop' },
    motif: 'weld',
  },
  {
    tag: 'Virtual TVET · ODeL',
    title: 'A complete LMS for\nTVET institutions',
    body: 'Interactive digital content and assessments embedded into traditional teaching, designed to teach employable, industry-relevant skills.',
    cta: { label: 'See the platform', to: '/shop' },
    motif: 'grid',
  },
  {
    tag: 'VR Labs in Schools',
    title: '500+ VR modules\nfor STEM & TVET',
    body: 'Gesture-controlled, teacher-managed virtual reality content that lets students feel a whole new way of learning.',
    cta: { label: 'Bring VR to your school', to: '/shop' },
    motif: 'vr',
  },
]

function Motif({ type }) {
  const stroke = 'var(--signal)'
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <path d="M120 20 L200 55 V115 C200 165 165 200 120 220 C75 200 40 165 40 115 V55 Z" fill="none" stroke={stroke} strokeWidth="2" />
        <path d="M85 118 L108 141 L158 88" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="120" cy="120" r="95" fill="none" stroke="var(--slate-line)" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    )
  }
  if (type === 'weld') {
    return (
      <svg viewBox="0 0 240 240" className="w-full h-full">
        <line x1="30" y1="180" x2="210" y2="180" stroke="var(--slate-line)" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${45 + i * 30} 180 Q${55 + i * 30} ${150 - (i % 2) * 20} ${65 + i * 30} 180`} fill="none" stroke={stroke} strokeWidth="2" />
        ))}
        <line x1="120" y1="30" x2="70" y2="150" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <circle cx="120" cy="30" r="6" fill={stroke} />
      </svg>
    )
  }
  if (type === 'grid') {
    return (
      <svg viewBox="0 0 240 240" className="w-full h-full">
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={30 + c * 48} y={30 + r * 48} width="36" height="36" rx="4"
              fill={(r + c) % 3 === 0 ? 'var(--signal-dim)' : 'none'}
              stroke={(r + c) % 3 === 0 ? stroke : 'var(--slate-line)'} strokeWidth="1.5" />
          ))
        )}
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 240 240" className="w-full h-full">
      <rect x="50" y="70" width="140" height="80" rx="18" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="90" cy="110" r="12" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="150" cy="110" r="12" fill="none" stroke={stroke} strokeWidth="2" />
      <path d="M60 160 C60 190 90 210 120 210 C150 210 180 190 180 160" fill="none" stroke="var(--slate-line)" strokeWidth="1.5" />
    </svg>
  )
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(timer.current)
  }, [])

  const go = (i) => {
    clearInterval(timer.current)
    setIndex((i + slides.length) % slides.length)
  }

  const slide = slides[index]

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--slate-line)' }}
      onMouseEnter={() => clearInterval(timer.current)}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div>
          <span className="font-mono text-xs tracking-wide text-[var(--brass)]">{slide.tag}</span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] mt-4 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="mt-6 max-w-md text-[var(--ink-soft)] leading-relaxed">{slide.body}</p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              to={slide.cta.to}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--ink)' }}
            >
              {slide.cta.label} <ArrowRight size={16} />
            </Link>
            <a href="/#contact" className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
              Talk to us <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="aspect-square max-w-[280px] mx-auto md:mx-0 md:justify-self-end w-full">
          <Motif type={slide.motif} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 flex items-center gap-3">
        <button onClick={() => go(index - 1)} aria-label="Previous slide" className="p-2 rounded-full border" style={{ borderColor: 'var(--slate-line)' }}>
          <ArrowLeft size={14} />
        </button>
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 rounded-full transition-all"
            style={{ width: i === index ? 28 : 10, background: i === index ? 'var(--signal)' : 'var(--slate-line)' }}
          />
        ))}
        <button onClick={() => go(index + 1)} aria-label="Next slide" className="p-2 rounded-full border" style={{ borderColor: 'var(--slate-line)' }}>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  )
}
