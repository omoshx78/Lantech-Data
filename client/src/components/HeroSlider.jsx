import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, ChevronRight, ShieldCheck, Wrench, GraduationCap, Building2, Sparkles, Glasses } from 'lucide-react'
import { useRipple, RippleLayer } from './useRipple'

// Real hero content from https://lantechdata.co.ke/ — themes and copy kept as-is.
const slides = [
  {
    tag: 'LanTech Data Services',
    title: 'Leader in Cyber Security Solutions & EduVR Content Provider.',
    body: 'We provide Cyber Security, Data Protection Solutions, VR/AR Learning Content and Data Leak Protection services to organizations.',
    cta: { label: 'Explore our services', to: '/shop' },
    image: '/images/hero/intro.jpg',
    icon: ShieldCheck,
  },
  {
    tag: 'Cyber Security',
    title: 'Cyber Security',
    body: "Organisation's Network architecture needs to evolve constantly to deal with ever increasing security threats. It is core part of our mandate.",
    cta: { label: 'Learn more', to: '/cyber-security' },
    image: '/images/hero/cyber-security.jpg',
    icon: ShieldCheck,
  },
  {
    tag: 'EduVR & Training',
    title: 'Digitalized Welders Training',
    body: 'State of the art, turnkey, scalable and effective welding solution powered by Augmented Reality. Offers the best, most realistic welding training system aside from real welding.',
    cta: { label: 'View the welding trainer', to: '/shop' },
    image: '/images/hero/welding.jpg',
    icon: Wrench,
  },
  {
    tag: 'Virtual TVET · ODeL',
    title: 'Virtual TVET (ODeL)',
    body: 'A comprehensive Learning Management System (LMS) designed to enrich TVET courses by embedding interactive digital content and assessments into traditional teaching and learning.',
    cta: { label: 'See the platform', to: '/virtual-tvet' },
    image: '/images/hero/virtual-tvet.jpg',
    icon: GraduationCap,
  },
  {
    tag: 'Universities & TVETs',
    title: 'Universities & TVETs System Trainers',
    body: 'Designed to teach students employable skills that are relevant to supporting the development of technology for industrial and consumer use.',
    cta: { label: 'For institutions', to: '/shop' },
    image: '/images/hero/universities.jpg',
    icon: Building2,
  },
  {
    tag: 'EduVR',
    title: 'EduVR — The Future of Learning is now!',
    body: 'Advanced teaching method for the digital generation. Ever imagined how you can do your STEM courses in a more interactive way?',
    cta: { label: 'Discover EduVR', to: '/virtual-tvet' },
    image: '/images/hero/eduvr.jpg',
    icon: Sparkles,
  },
  {
    tag: 'VR Labs in Schools',
    title: 'VR Labs in Schools',
    body: 'Let your students feel a whole new world of VR/AR learning. We provide over 500+ Virtual Reality content in STEM & TVET courses.',
    cta: { label: 'Bring VR to your school', to: '/shop' },
    image: '/images/hero/vr-labs.jpg',
    icon: Glasses,
  },
]

function SlideImage({ src, Icon, active }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#282a61] via-[#3E4095] to-[#1e2450] flex items-center justify-center">
        <Icon size={96} className="text-white/10" />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        transform: active ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 6.5s ease-out',
      }}
    />
  )
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const { ripples, onRippleClick } = useRipple()

  const startAutoplay = () => {
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
  }

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(timer.current)
  }, [])

  const go = (i) => {
    setIndex((i + slides.length) % slides.length)
    startAutoplay() // restart the 6s countdown fresh after manual navigation too
  }

  return (
    <section
      className="relative h-[600px] md:h-[680px] overflow-hidden bg-slate-900"
      onMouseEnter={() => clearInterval(timer.current)}
      onMouseLeave={startAutoplay}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          aria-hidden={i !== index}
        >
          <SlideImage src={slide.image} Icon={slide.icon} active={i === index} />
          {/* Brand-colour wash instead of plain black overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(115deg, rgba(40,42,97,0.92) 0%, rgba(62,64,149,0.75) 38%, rgba(245,134,52,0.28) 100%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="relative h-full max-w-6xl mx-auto px-5 flex flex-col justify-center pb-16">
            <span
              className="inline-flex items-center gap-1.5 rounded-full backdrop-blur text-white text-xs font-semibold px-3 py-1.5 w-fit"
              style={{
                background: 'rgba(245,134,52,0.25)',
                border: '1px solid rgba(245,134,52,0.5)',
                opacity: i === index ? 1 : 0,
                transform: i === index ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
              }}
            >
              <slide.icon size={13} /> {slide.tag}
            </span>
            <h1
              className="mt-5 text-white font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl"
              style={{
                opacity: i === index ? 1 : 0,
                transform: i === index ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s',
              }}
            >
              {slide.title}
            </h1>
            <p
              className="mt-4 text-slate-200 text-base md:text-lg max-w-xl leading-relaxed"
              style={{
                opacity: i === index ? 1 : 0,
                transform: i === index ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s',
              }}
            >
              {slide.body}
            </p>
            <div
              className="mt-7 flex items-center gap-4"
              style={{
                opacity: i === index ? 1 : 0,
                transform: i === index ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s',
              }}
            >
              <Link
                to={slide.cta.to}
                onClick={onRippleClick}
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-full text-white font-semibold px-6 py-3 shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #F58634, #d8762e)', boxShadow: '0 10px 30px -8px rgba(245,134,52,0.6)' }}
              >
                {slide.cta.label} <ArrowRight size={16} />
                <RippleLayer ripples={ripples} color="rgba(255,255,255,0.5)" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white">
                Talk to us <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* controls — solid backdrop bar so they're never lost against content behind */}
      <div className="absolute bottom-7 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-5 flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-black/30 backdrop-blur-md px-3 py-2 border border-white/10">
            <button onClick={() => go(index - 1)} aria-label="Previous slide" className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors">
              <ArrowLeft size={14} />
            </button>
            {slides.map((s, i) => (
              <button
                key={s.title}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === index ? 22 : 7, background: i === index ? '#F58634' : 'rgba(255,255,255,0.4)' }}
              />
            ))}
            <button onClick={() => go(index + 1)} aria-label="Next slide" className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors">
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
