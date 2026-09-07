export default function Footer() {
  return (
    <footer className="border-t mt-24" style={{ borderColor: 'var(--slate-line)' }}>
      <div className="mx-auto max-w-6xl px-5 py-12 grid md:grid-cols-[1.5fr_1fr_1fr] gap-10">
        <div>
          <span className="font-display text-lg font-semibold">LanTech Data Services</span>
          <p className="text-sm text-[var(--ink-soft)] mt-3 max-w-xs leading-relaxed">
            Empowering businesses and institutions across Kenya and East Africa since 2007 — cyber security,
            data protection and EduVR content.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-[var(--slate)]">SERVICES</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>Cyber Security</li>
            <li>EduVR &amp; Training</li>
            <li>Data Protection</li>
            <li>Surveillance</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs text-[var(--slate)]">CONTACT</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>Suite 714, 7th Floor, NSSF Building, Mombasa, Kenya</li>
            <li>sales@lantechdata.co.ke</li>
            <li>+254 (20) 2435477</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-[var(--slate)]" style={{ borderColor: 'var(--slate-line)' }}>
        © {new Date().getFullYear()} LanTech Data Services. All rights reserved.
      </div>
    </footer>
  )
}
