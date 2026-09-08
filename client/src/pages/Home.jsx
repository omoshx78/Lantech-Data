import { Link } from 'react-router-dom'
import { Users, GraduationCap, Award, ShieldCheck, Star, Loader2, ArrowRight, ShieldAlert, DatabaseBackup, Camera, Sparkles } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { fmt } from '../lib/format'
import HeroSlider from '../components/HeroSlider'

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-[#EEEEF9] flex items-center justify-center shrink-0">
        <Icon size={18} className="text-[#3E4095]" />
      </div>
      <div>
        <p className="font-bold text-slate-900 leading-none">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  )
}

const pillars = [
  { icon: ShieldAlert, title: 'Cyber Security', body: "Secure network architectures that evolve to keep up with the latest advanced persistent threats.", to: '/cyber-security', tint: '#EEEEF9', color: '#3E4095' },
  { icon: GraduationCap, title: 'Virtual TVET', body: 'Interactive 3D courses that embed digital content and assessments into traditional teaching.', to: '/virtual-tvet', tint: '#FEF3EB', color: '#F58634' },
  { icon: Sparkles, title: 'EduVR', body: 'Advanced VR/AR teaching method for the digital generation — STEM courses, reimagined.', to: '/virtual-tvet', tint: '#EAF6EF', color: '#1D7A4C' },
  { icon: DatabaseBackup, title: 'Data Protection', body: 'Backup-as-a-Service on cloud storage architecture so losing data never halts your business.', to: '/cyber-security', tint: '#EEEEF9', color: '#3E4095' },
]

const partners = [
  { name: 'BitDefender', line: 'Cyber & endpoint security' },
  { name: 'Labtech Academy', line: 'Virtual TVET · Cyber Security' },
  { name: 'Data Barracks', line: 'BaaS & business continuity · Digital forensics' },
]

export default function Home() {
  const { products, loading } = useProducts()
  const featured = products.slice(0, 2)

  return (
    <>
      <HeroSlider />

      <section className="max-w-6xl mx-auto px-5 -mt-10 relative">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat icon={Users} value="1,200+" label="Students trained" />
          <Stat icon={GraduationCap} value="6" label="Course tracks" />
          <Stat icon={Award} value="17 yrs" label="In operation" />
          <Stat icon={ShieldCheck} value="Labtech" label="Academy powered" />
        </div>
      </section>

      {/* Service pillars */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-3 py-1.5">What we do</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Four ways we help institutions</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {pillars.map((p) => (
            <Link key={p.title} to={p.to} className="group rounded-2xl border border-slate-200 p-6 bg-white hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: p.tint }}>
                <p.icon size={20} style={{ color: p.color }} />
              </div>
              <h3 className="font-bold text-slate-900 mt-4">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{p.body}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: p.color }}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-[#3E4095] font-semibold text-sm">Virtual TVET (ODeL)</p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">Featured courses</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-[#3E4095] flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="animate-spin mr-2" size={18} /> Loading courses…
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((p) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow bg-white">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-[#EEEEF9] text-[#3E4095] text-xs font-semibold px-2.5 py-1">
                      {p.category}
                    </span>
                    <span className="text-xs font-semibold text-[#F58634] flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Popular
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mt-3">{p.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{p.courses.length} modules · {p.unit}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="font-extrabold text-2xl text-slate-900">{fmt(p.price)}</p>
                    <span className="text-sm font-semibold text-[#3E4095]">View →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center rounded-full text-xs font-semibold px-3 py-1.5" style={{ background: '#FEF3EB', color: '#D8762E' }}>Our partners</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Reputable organisations, trustworthy results</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {partners.map((p) => (
              <div key={p.name} className="rounded-2xl border border-slate-200 p-6 text-center bg-white">
                <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                <p className="text-sm text-slate-500 mt-2">{p.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div>
            <p className="text-[#3E4095] font-semibold text-sm">About us</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">We are LanTech<br />Data Services</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Since our inception in 2007, we have been at the forefront in Kenya and the wider Sub-Saharan Africa,
              empowering businesses and communities to achieve their goals.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: '#3E4095' }}>
              More about us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="rounded-3xl overflow-hidden relative px-8 py-14 md:py-16 text-center" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095 60%, #f58634 160%)' }}>
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
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white font-semibold px-7 py-3.5 hover:bg-blue-50 transition-colors"
                style={{ color: '#3E4095' }}
              >
                Talk to us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
