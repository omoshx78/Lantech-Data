import { Link } from 'react-router-dom'
import { Users, GraduationCap, Award, ShieldCheck, Star, Loader2, ArrowRight, ShieldAlert, DatabaseBackup, Sparkles } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { fmt } from '../lib/format'
import HeroSlider from '../components/HeroSlider'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import FlipCard from '../components/FlipCard'
import { useRipple, RippleLayer } from '../components/useRipple'

const stats = [
  { icon: Users, value: 1200, suffix: '+', label: 'Students trained' },
  { icon: GraduationCap, value: 6, suffix: '', label: 'Course tracks' },
  { icon: Award, value: 17, suffix: ' yrs', label: 'In operation' },
  { icon: ShieldCheck, value: 500, suffix: '+', label: 'VR/AR modules' },
]

const pillars = [
  { icon: ShieldAlert, title: 'Cyber Security', body: 'Secure network architectures that evolve with the latest threats.', backBody: "Organisation's network architecture needs to evolve constantly to deal with ever increasing security threats — core to our mandate.", to: '/cyber-security', tint: '#EEEEF9', color: '#3E4095' },
  { icon: GraduationCap, title: 'Virtual TVET', body: 'Interactive 3D courses embedding digital content into teaching.', backBody: 'A comprehensive LMS designed to enrich TVET courses with interactive digital content and assessments.', to: '/virtual-tvet', tint: '#FEF3EB', color: '#F58634' },
  { icon: Sparkles, title: 'EduVR', body: 'Advanced VR/AR teaching for the digital generation.', backBody: 'Ever imagined doing your STEM courses in a more interactive way? EduVR is the future of learning, now.', to: '/virtual-tvet', tint: '#EAF6EF', color: '#1D7A4C' },
  { icon: DatabaseBackup, title: 'Data Protection', body: 'Cloud backup architecture so losing data never halts you.', backBody: 'Backup-as-a-Service on cloud storage architecture, with data leak prevention built in from day one.', to: '/cyber-security', tint: '#EEEEF9', color: '#3E4095' },
]

const partners = [
  { name: 'BitDefender', line: 'Cyber & endpoint security' },
  { name: 'Labtech Academy', line: 'Virtual TVET · Cyber Security' },
  { name: 'Data Barracks', line: 'BaaS & business continuity · Digital forensics' },
]

export default function Home() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 2)
  const { ripples, onRippleClick } = useRipple()

  return (
    <>
      <HeroSlider />

      {/* Stats — dark navy band, continuous with hero, animated counters */}
      <section className="relative" style={{ background: 'linear-gradient(180deg, #1e2450, #282a61)' }}>
        <div className="max-w-6xl mx-auto px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="text-center md:text-left">
                <s.icon size={22} className="mx-auto md:mx-0" style={{ color: '#F58634' }} />
                <p className="font-extrabold text-3xl text-white mt-3">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-blue-200/80 mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Service pillars — flip cards */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <Reveal>
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-3 py-1.5">What we do</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Four ways we help institutions</h2>
            <p className="text-slate-400 text-sm mt-2">Hover a card to see more</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <FlipCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured courses — warm tinted band */}
      <section className="border-t border-slate-200 py-20" style={{ background: 'linear-gradient(180deg, #FFF8F2, #FEF3EB)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="font-semibold text-sm" style={{ color: '#D8762E' }}>Virtual TVET (ODeL)</p>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">Featured courses</h2>
              </div>
              <Link to="/shop" className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: '#D8762E' }}>
                View all <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading courses…
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <Link
                    to={`/shop/${p.id}`}
                    className="group block rounded-2xl border border-orange-100 p-6 bg-white hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-2.5 py-1">
                        {p.category}
                      </span>
                      <span className="text-xs font-semibold text-[#F58634] flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> Popular
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mt-3 group-hover:text-[#3E4095] transition-colors">{p.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{p.courses.length} modules · {p.unit}</p>
                    <div className="mt-4 flex items-end justify-between">
                      <p className="font-extrabold text-2xl text-slate-900">{fmt(p.price)}</p>
                      <span className="text-sm font-semibold text-[#3E4095] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        View <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <span className="inline-flex items-center rounded-full text-xs font-semibold px-3 py-1.5" style={{ background: '#EEEEF9', color: '#3E4095' }}>Our partners</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Reputable organisations, trustworthy results</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div className="rounded-2xl border border-slate-200 p-6 text-center bg-white hover:border-[#3E4095] hover:shadow-lg transition-all">
                  <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-2">{p.line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser — indigo tint band */}
      <section className="border-t border-slate-200 py-20" style={{ background: 'linear-gradient(180deg, #F7F7FC, #EEEEF9)' }}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <Reveal>
            <p className="font-semibold text-sm" style={{ color: '#3E4095' }}>About us</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">We are LanTech<br />Data Services</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-slate-600 leading-relaxed space-y-4">
              <p>
                Since our inception in 2007, we have been at the forefront in Kenya and the wider Sub-Saharan Africa,
                empowering businesses and communities to achieve their goals.
              </p>
              <Link to="/about" className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: '#3E4095' }}>
                More about us <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="rounded-3xl overflow-hidden relative px-8 py-14 md:py-16 text-center" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095 55%, #f58634 165%)' }}>
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative">
                <h2 className="text-white font-extrabold text-3xl md:text-4xl tracking-tight max-w-xl mx-auto">
                  Need a customised proposal?
                </h2>
                <p className="text-blue-100 mt-4 max-w-md mx-auto">
                  Have a recommendation, or want to bring Cyber Security and EduVR to your institution? Don't hesitate to reach out.
                </p>
                <Link
                  to="/contact"
                  onClick={onRippleClick}
                  className="relative overflow-hidden mt-8 inline-flex items-center gap-2 rounded-full bg-white font-semibold px-7 py-3.5 hover:bg-blue-50 transition-colors shadow-lg"
                  style={{ color: '#3E4095' }}
                >
                  Talk to us <ArrowRight size={16} />
                  <RippleLayer ripples={ripples} color="rgba(62,64,149,0.25)" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
