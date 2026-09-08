import { Target, Eye, HeartHandshake, Award, Users, GraduationCap } from 'lucide-react'

const values = [
  { icon: HeartHandshake, title: 'Integrity', body: 'We are each personally accountable for the highest standards of behavior, including honesty and fairness in all aspects of our dealings and interaction with our customers.' },
  { icon: Award, title: 'Excellence', body: 'Our leadership is founded on talented employees effectively applying innovative solution designs and sound business management.' },
  { icon: Users, title: 'Teamwork', body: 'We each lead through our competence, creativity, and teamwork — backed by excellent support from our local team and international partners.' },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #282a61, #3E4095)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 text-white text-xs font-semibold px-3 py-1.5">About Lantech Data Services</span>
          <h1 className="mt-5 text-white font-extrabold text-4xl md:text-5xl tracking-tight max-w-2xl mx-auto">
            Serving Kenya &amp; East Africa since 2007
          </h1>
          <p className="mt-5 text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            A duly registered Kenyan company specializing in Cyber Security and Digital Educational
            Content (AR/VR) for skills development in Engineering Training.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-8 border border-slate-200" style={{ background: 'linear-gradient(160deg, #f0f0f7, white)' }}>
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: '#3E4095' }}>
            <Eye size={22} className="text-white" />
          </div>
          <h2 className="font-bold text-xl text-slate-900 mt-5">Our Vision</h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            To be the preferred provider of Digital Educational Content (AR/VR) for skills development
            in Engineering Training and Cyber Security — and the preferred Cyber Security solution
            provider of world-class SMART technology solutions.
          </p>
        </div>
        <div className="rounded-2xl p-8 border border-slate-200" style={{ background: 'linear-gradient(160deg, #fef3eb, white)' }}>
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: '#f58634' }}>
            <Target size={22} className="text-white" />
          </div>
          <h2 className="font-bold text-xl text-slate-900 mt-5">Our Mission</h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            To proactively provide the latest Cyber Security Solutions and most relevant Digital
            Educational content for skill development, using the best-in-range technologies that meet
            the highest industry and international benchmarks.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-50 text-[#3E4095] text-xs font-semibold px-3 py-1.5">Our values</span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">What drives us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-slate-200/60 transition-shadow">
                <v.icon size={26} style={{ color: '#f58634' }} />
                <h3 className="font-bold text-lg text-slate-900 mt-4">{v.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <GraduationCap size={32} className="mx-auto" style={{ color: '#3E4095' }} />
          <p className="text-slate-600 mt-5 max-w-2xl mx-auto leading-relaxed">
            We have a strong core team of qualified and experienced professionals committed to customer
            satisfaction through quality solutions and services, backed up with excellent support from
            our local team and international partners — serving local blue-chip companies, government
            agencies, county governments and assemblies, NGOs, parastatals and multinational companies.
          </p>
        </div>
      </section>
    </div>
  )
}
