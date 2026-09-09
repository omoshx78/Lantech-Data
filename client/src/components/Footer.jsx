import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-10" style={{ background: 'linear-gradient(180deg, #1e2450, #171a3d)' }}>
      <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="inline-block bg-white rounded-lg px-3 py-2">
            <img src="/images/logo.png" alt="LanTech Data Services" className="h-7 w-auto" />
          </div>
          <p className="text-sm text-blue-200/70 mt-3 max-w-xs leading-relaxed">
            Empowering businesses and institutions across Kenya and East Africa since 2007 — cyber security,
            data protection and Virtual TVET content.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-[#F58634] tracking-wide">COMPANY</p>
          <ul className="mt-3 space-y-2 text-sm text-blue-100/80">
            <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
            <li><Link to="/cyber-security" className="hover:text-white transition-colors">Cyber Security</Link></li>
            <li><Link to="/virtual-tvet" className="hover:text-white transition-colors">Virtual TVET</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-[#F58634] tracking-wide">COURSES</p>
          <ul className="mt-3 space-y-2 text-sm text-blue-100/80">
            <li><Link to="/shop" className="hover:text-white transition-colors">Automotive</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">HVAC &amp; Refrigeration</Link></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-[#F58634] tracking-wide">CONTACT</p>
          <ul className="mt-3 space-y-2 text-sm text-blue-100/80">
            <li>Suite 714, 7th Floor, NSSF Building, Mombasa, Kenya</li>
            <li>sales@lantechdata.co.ke</li>
            <li>+254 (20) 2435477</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-blue-200/50">
        © {new Date().getFullYear()} LanTech Data Services. All rights reserved.
      </div>
    </footer>
  )
}
