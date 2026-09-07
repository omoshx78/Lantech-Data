import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Glasses, DatabaseBackup, Camera } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import ContactForm from '../components/ContactForm'
import { SERVICES } from '../data/services'

const pillars = [
  { icon: ShieldCheck, title: 'Cyber Security', body: "Secure network architectures need to constantly evolve to keep up with the latest threats. Endpoint, network, cloud, human." },
  { icon: Glasses, title: 'EduVR & Training', body: 'A new concept in educational technology — VR learning with gesture controls, embedded resources and teacher tools.' },
  { icon: DatabaseBackup, title: 'Data Protection', body: 'Backup-as-a-Service on cloud storage architecture, so losing data never brings your business to its knees.' },
  { icon: Camera, title: 'Surveillance', body: 'Your destination for video surveillance and security camera equipment to protect your home or business.' },
]

const partners = [
  { name: 'BitDefender', line: 'Cyber & endpoint security' },
  { name: 'Labtech Academy', line: 'Virtual TVET · Cyber Security' },
  { name: 'Data Barracks', line: 'BaaS & business continuity · Digital forensics' },
]

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <div key={p.title}>
              <p.icon size={22} style={{ color: 'var(--signal)' }} />
              <h3 className="font-display text-lg font-semibold mt-4">{p.title}</h3>
              <p className="text-sm text-[var(--ink-soft)] mt-2 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="border-t py-20" style={{ borderColor: 'var(--slate-line)' }}>
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs text-[var(--brass)]">Our products at a glance</span>
              <h2 className="font-display text-3xl font-semibold mt-3">Start a Virtual TVET course today</h2>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm hover:underline">
              View all courses <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {SERVICES.slice(0, 3).map((s) => (
              <Link
                key={s.id}
                to="/shop"
                className="rounded-2xl border p-6 hover:-translate-y-1 transition-transform"
                style={{ borderColor: 'var(--slate-line)' }}
              >
                <span className="font-mono text-[11px] text-[var(--brass)]">{s.category}</span>
                <h3 className="font-display text-lg font-semibold mt-2">{s.name}</h3>
                <p className="text-sm text-[var(--ink-soft)] mt-2">{s.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / founder message */}
      <section id="about" className="border-t py-20" style={{ borderColor: 'var(--slate-line)' }}>
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <span className="font-mono text-xs text-[var(--brass)]">Message from the founder</span>
            <h2 className="font-display text-3xl font-semibold mt-3">We are LanTech<br />Data Services</h2>
          </div>
          <div className="text-[var(--ink-soft)] leading-relaxed space-y-4">
            <p>
              Since our inception in 2007, we have been at the forefront in Kenya and the wider Sub-Saharan Africa,
              empowering businesses and communities to achieve their goals.
            </p>
            <p>
              Our team draws on a wide range of experience — from local blue-chip companies, government agencies,
              county governments and assemblies, to NGOs, parastatals and multinational companies — giving us a
              strong track record across our full portfolio of projects and products.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t py-20" style={{ borderColor: 'var(--slate-line)' }}>
        <div className="mx-auto max-w-6xl px-5">
          <span className="font-mono text-xs text-[var(--brass)]">Our partners</span>
          <h2 className="font-display text-3xl font-semibold mt-3 max-w-lg">
            Reputable organisations, trustworthy results
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {partners.map((p) => (
              <div key={p.name} className="rounded-2xl border p-6" style={{ borderColor: 'var(--slate-line)' }}>
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-[var(--ink-soft)] mt-2">{p.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section className="border-t py-20" style={{ borderColor: 'var(--slate-line)', background: 'var(--ink)' }}>
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-mono text-xs text-[var(--brass)]">Join the team</span>
            <h2 className="font-display text-3xl font-semibold mt-3 text-white">
              Sales, marketing, or a techie?
            </h2>
            <p className="text-white/70 mt-4 leading-relaxed max-w-md">
              We're always looking for vibrant talent to join us and build impactful solutions for generations to come.
            </p>
          </div>
          <a
            href="mailto:careers@lantechdata.co.ke"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium w-fit md:justify-self-end"
            style={{ background: 'var(--paper)', color: 'var(--ink)' }}
          >
            Get in touch <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <span className="font-mono text-xs text-[var(--brass)]">We're always here listening</span>
            <h2 className="font-display text-3xl font-semibold mt-3">Talk to us</h2>
            <p className="text-[var(--ink-soft)] mt-4 leading-relaxed max-w-sm">
              Need a customised proposal, have a recommendation, or even a complaint? Don't hesitate to reach out.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
