import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        <div>
          <img src="/images/logo.png" alt="LanTech Data Services" className="h-9 w-auto" />
          <p className="text-sm text-slate-500 mt-3 max-w-xs leading-relaxed">
            Empowering businesses and institutions across Kenya and East Africa since 2007 — cyber security,
            data protection and Virtual TVET content.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wide">COMPANY</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/about" className="hover:text-[#3E4095]">About us</Link></li>
            <li><Link to="/cyber-security" className="hover:text-[#3E4095]">Cyber Security</Link></li>
            <li><Link to="/virtual-tvet" className="hover:text-[#3E4095]">Virtual TVET</Link></li>
            <li><Link to="/contact" className="hover:text-[#3E4095]">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wide">COURSES</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/shop" className="hover:text-[#3E4095]">Automotive</Link></li>
            <li><Link to="/shop" className="hover:text-[#3E4095]">HVAC &amp; Refrigeration</Link></li>
            <li><Link to="/cart" className="hover:text-[#3E4095]">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wide">CONTACT</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li>Suite 714, 7th Floor, NSSF Building, Mombasa, Kenya</li>
            <li>sales@lantechdata.co.ke</li>
            <li>+254 (20) 2435477</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} LanTech Data Services. All rights reserved.
      </div>
    </footer>
  )
}
