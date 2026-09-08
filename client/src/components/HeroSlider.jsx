import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, ChevronRight, ShieldCheck, Wrench, GraduationCap, Building2, Sparkles, Glasses } from 'lucide-react'

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
    cta: { label: 'Learn more', to: '/shop' },
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
    cta: { label: 'See the platform', to: '/shop' },
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
    cta: { label: 'Discover EduVR', to: '/shop' },
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

function SlideImage({ src, Icon }) {
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#24265A] via-[#33356E] to-slate-900 flex items-center justify-center">
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
    />
  )
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer.current)
  }, [])

  const go = (i) => {
    clearInterval(timer.current)
    setIndex((i + slides.length) % slides.length)
  }

  return (
    <section
      className="relative h-[560px] md:h-[620px] overflow-hidden bg-slate-900"
      onMouseEnter={() => clearInterval(timer.current)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
          aria-hidden={i !== index}
        >
          <SlideImage src={slide.image} Icon={slide.icon} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30" />
          <div className="relative h-full max-w-6xl mx-auto px-5 flex flex-col justify-end pb-20 md:pb-24">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 w-fit">
              <slide.icon size={13} /> {slide.tag}
            </span>
            <h1 className="mt-5 text-white font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.1] max-w-2xl">
              {slide.title}
            </h1>
            <p className="mt-4 text-slate-200 text-base md:text-lg max-w-xl leading-relaxed">
              {slide.body}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Link
                to={slide.cta.to}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#3E4095] font-semibold px-6 py-3 hover:bg-[#EEEEF9] transition-colors"
              >
                {slide.cta.label} <ArrowRight size={16} />
              </Link>
              <a href="#contact" className="inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white">
                Talk to us <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* controls */}
      <div className="absolute bottom-6 left-0 right-0">
        <div className="max-w-6xl mx-auto px-5 flex items-center gap-3">
          <button onClick={() => go(index - 1)} aria-label="Previous slide" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-colors">
            <ArrowLeft size={14} />
          </button>
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === index ? 24 : 8, background: i === index ? 'white' : 'rgba(255,255,255,0.35)' }}
            />
          ))}
          <button onClick={() => go(index + 1)} aria-label="Next slide" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-colors">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
