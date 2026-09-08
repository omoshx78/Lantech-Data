import { ShieldCheck, ShieldAlert, Radar, Server, Mail, Check } from 'lucide-react'

const products = [
  {
    name: 'GravityZone Business Security Premium',
    subtitle: 'formerly GravityZone Elite',
    icon: ShieldCheck,
    body: 'Safeguards your organization from sophisticated cyber attacks like advanced persistent threats (APTs) and ransomware with 30+ layers of machine-learning-driven security technologies. Covers physical, virtual, mobile and cloud-based endpoints and email from a single console.',
  },
  {
    name: 'GravityZone Advanced Business Security',
    subtitle: 'Desktops, servers & mailboxes',
    icon: Server,
    body: 'Comprehensive protection for physical and virtual desktops and servers, plus mobile devices, with security and antispam for Exchange mailboxes — all managed from a single console.',
  },
  {
    name: 'GravityZone Ultra Plus',
    subtitle: 'EDR + XDR',
    icon: Radar,
    body: 'Extends endpoint-based threat detection beyond a traditional EDR by incorporating network incidents (XDR), successfully countering advanced threats wherever they emerge — endpoint, network, or cloud.',
  },
]

const stats = [
  { label: 'Layers of ML-driven protection', value: '30+' },
  { label: 'Console for all endpoints', value: '1' },
  { label: 'Years securing institutions', value: '17' },
]

export default function CyberSecurity() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1.5">
            <ShieldAlert size={13} /> Cyber Security
          </span>
          <h1 className="mt-5 text-white font-extrabold text-4xl md:text-5xl tracking-tight max-w-2xl">Be cyber resilient</h1>
          <p className="mt-5 text-blue-100 text-lg max-w-xl leading-relaxed">
            The threat landscape is evolving, and professional attackers work tirelessly to find new ways to
            breach environments and move through organizations undetected. Organisation's network architecture
            needs to evolve constantly to deal with ever increasing security threats — it is core part of our mandate.
          </p>
          <a href="mailto:sales@lantechdata.co.ke" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 hover:bg-blue-50 transition-colors" style={{ color: '#3E4095' }}>
            <Mail size={16} /> Request a proposal
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 -mt-10 relative">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-8 grid grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-extrabold text-2xl md:text-3xl" style={{ color: '#3E4095' }}>{s.value}</p>
              <p className="text-xs md:text-sm text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center rounded-full text-xs font-semibold px-3 py-1.5" style={{ background: '#fef3eb', color: '#d8762e' }}>Our solutions from Bitdefender</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Cyber Security Services at a Glance</h2>
          <p className="text-slate-500 mt-3">
            There are two ways to find out if your solution isn't keeping up — wait for a breach to happen, or run validation tests.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {products.map((p) => (
            <div key={p.name} className="rounded-2xl border border-slate-200 p-7 bg-white hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5 transition-all">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: '#f0f0f7' }}>
                <p.icon size={22} style={{ color: '#3E4095' }} />
              </div>
              <h3 className="font-bold text-slate-900 mt-4 leading-snug">{p.name}</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: '#f58634' }}>{p.subtitle}</p>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-10">
          Please contact <a href="mailto:sales@lantechdata.co.ke" className="underline">sales@lantechdata.co.ke</a> for special group/volume pricing.
        </p>
      </section>

      <section className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center">What's covered</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {[
              'Protection against malware, 0-day and known exploits',
              'Web threats, phishing and ransomware defense',
              'Tamper-proof backups',
              'Attack chain visualization to close security gaps',
              'Application vulnerability & misconfiguration risk assessment',
              'Automated remediation and attack forensics',
            ].map((f) => (
              <div key={f} className="flex gap-3 items-start bg-white rounded-xl border border-slate-200 p-4">
                <Check size={18} style={{ color: '#3E4095' }} className="shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
