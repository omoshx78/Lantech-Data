import { MapPin, Phone, Mail, Smartphone } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

const details = [
  { icon: MapPin, label: 'Our location', value: 'Lantech Data Services Ltd, NSSF Building, 7th Floor, Suite 714, Nkrumah Road, Mombasa, Kenya' },
  { icon: Phone, label: 'Telephone', value: '+254 (0)20 2435477' },
  { icon: Smartphone, label: 'Mobile / M-Pesa', value: '+254 733 711 557' },
  { icon: Mail, label: 'Email', value: 'sales@lantechdata.co.ke' },
]

export default function Contact() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24 text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1.5">Get in touch</span>
            <h1 className="mt-5 text-white font-extrabold text-4xl md:text-5xl tracking-tight max-w-2xl mx-auto">Talk to us</h1>
            <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
              Get in touch with us to discuss the best Cyber Security and EduVR solutions for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 -mt-10 relative pb-20">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-6">
          <Reveal>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 h-fit space-y-6">
              {details.map((d) => (
                <div key={d.label} className="group flex gap-3.5">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: '#f0f0f7' }}>
                    <d.icon size={18} style={{ color: '#3E4095' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 tracking-wide">{d.label.toUpperCase()}</p>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7">
              <h2 className="font-bold text-xl text-slate-900">Send us a message</h2>
              <p className="text-sm text-slate-500 mt-1">Contact us if you have any query — we usually reply within one business day.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
