import { Link } from 'react-router-dom'
import { Users, GraduationCap, Award, ShieldCheck, Star, Loader2 } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { fmt } from '../lib/format'
import ContactForm from '../components/ContactForm'
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

      <section className="max-w-6xl mx-auto px-5 py-20">
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
      </section>

      <section id="about" className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <p className="text-[#3E4095] font-semibold text-sm">About us</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">We are LanTech<br />Data Services</h2>
          </div>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>
              Since our inception in 2007, we have been at the forefront in Kenya and the wider Sub-Saharan Africa,
              empowering businesses and communities to achieve their goals.
            </p>
            <p>
              Our team draws on a wide range of experience — from local blue-chip companies, government agencies,
              county governments and assemblies, to NGOs, parastatals and multinational companies.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <p className="text-[#3E4095] font-semibold text-sm">We're always here listening</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">Talk to us</h2>
            <p className="text-slate-500 mt-4 leading-relaxed max-w-sm">
              Need a customised proposal, have a recommendation, or even a complaint? Don't hesitate to reach out.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
