import { Link } from 'react-router-dom'
import { Boxes, RotateCw, Layers, GraduationCap, ArrowRight } from 'lucide-react'

const features = [
  { icon: Boxes, title: 'Interactive 3D models', body: 'Realistic 3D models of the technical item under study, constructed layer by layer and "assembled" in animated format.' },
  { icon: RotateCw, title: 'Rotate & explore', body: 'Many of the 3D models can be rotated to view from all sides, featuring all major system and subsystem components.' },
  { icon: Layers, title: 'International standards', body: 'Content designed to meet international training standards and covers all requirements students need to meet those standards.' },
]

export default function VirtualTVET() {
  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f58634, #d8762e)' }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 text-white text-xs font-semibold px-3 py-1.5">
            <GraduationCap size={13} /> Virtual TVET (ODeL)
          </span>
          <h1 className="mt-5 text-white font-extrabold text-4xl md:text-5xl tracking-tight max-w-2xl">
            Transforming TVET with 3D gaming technology
          </h1>
          <p className="mt-5 text-orange-50 text-lg max-w-xl leading-relaxed">
            A comprehensive Learning Management System designed to enrich TVET courses by embedding
            interactive digital content and assessments into traditional teaching and learning.
          </p>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white font-semibold px-6 py-3.5 hover:bg-orange-50 transition-colors" style={{ color: '#d8762e' }}>
            Browse courses <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-blue-50 text-[#3E4095] text-xs font-semibold px-3 py-1.5">About Virtual TVETs (ODeL)</span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">Learning modules built for practice</h2>
          <p className="text-slate-500 mt-3">
            The learning modules contain numerous activities to allow users to practice their understanding
            of the principles involved — developing knowledge and skills leading to more advanced studies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-7 bg-white hover:shadow-lg hover:shadow-slate-200/60 transition-shadow">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: '#fef3eb' }}>
                <f.icon size={22} style={{ color: '#f58634' }} />
              </div>
              <h3 className="font-bold text-slate-900 mt-4">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">For institutions</h2>
          <p className="text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Talk to us for a comprehensive Virtual TVET solution proposal for your institute or college.
            For personal use, contact us at{' '}
            <a href="mailto:sales@lantechdata.co.ke" className="underline font-medium" style={{ color: '#3E4095' }}>sales@lantechdata.co.ke</a>{' '}
            or browse our online shop to enrol directly.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full text-white font-semibold px-6 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: '#3E4095' }}
          >
            View course subscriptions <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
