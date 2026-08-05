import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, PhoneCall, Mail, MapPin, ShieldCheck, ArrowUp, MessageSquare } from 'lucide-react';
import { NAVI_MUMBAI_LOCATIONS } from '../data/locations';

export default function Footer({ onOpenQuoteModal, onOpenTracker }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const OFFICIAL_PHONE = '+91 93240 95460';
  const OFFICIAL_ADDRESS = 'Office No 205, 2nd Floor, Vikrant Complex, Plot No 72/73, Sector 19c, Vashi, Navi Mumbai, 400705';

  return (
    <footer className="bg-[#13345b] text-slate-200 pt-16 pb-24 md:pb-12 border-t border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <Truck size={22} className="text-[#13345b]" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight leading-none block font-heading">
                  SUPER SOUTH
                </span>
                <span className="text-[11px] font-bold text-amber-400 tracking-widest uppercase">
                  Packers & Movers
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Navi Mumbai's #1 Local & Pan-India Packers & Movers. Specializing in zero-damage local house shifting across all 12 Navi Mumbai nodes and express outstation relocation from Navi Mumbai to Bangalore, Chennai, Hyderabad, Kochi, Coimbatore & 500+ cities in India.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2 pt-1">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Official Registered Office:</strong> {OFFICIAL_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <PhoneCall size={16} className="text-emerald-400 shrink-0" />
                <a href="tel:+919324095460" className="text-white font-bold hover:text-amber-400">
                  Phone / WhatsApp: {OFFICIAL_PHONE}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 pt-2">
              <ShieldCheck size={16} /> ISO 9001:2015 Certified Relocation Partner
            </div>
          </div>

          {/* Customer Tools */}
          <div>
            <h4 className="text-sm font-extrabold text-white mb-4 tracking-wide uppercase">Quick Tools</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#calculator" className="text-slate-300 hover:text-amber-400 transition-colors">Instant Cost Estimator</a></li>
              <li><a href="#tracking" onClick={(e) => { e.preventDefault(); onOpenTracker(); }} className="text-slate-300 hover:text-amber-400 transition-colors">Track Consignment Status</a></li>
              <li><a href="#coverage" className="text-slate-300 hover:text-amber-400 transition-colors">Interstate Routes & Rates</a></li>
              <li><a href="#reviews" className="text-slate-300 hover:text-amber-400 transition-colors">Verified Customer Reviews</a></li>
              <li><a href="#faq" className="text-slate-300 hover:text-amber-400 transition-colors">FAQ & Transit Insurance</a></li>
            </ul>
          </div>

          {/* Navi Mumbai Locations Network Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold text-white mb-4 tracking-wide uppercase">Navi Mumbai 12 Local Hubs</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {NAVI_MUMBAI_LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/packers-and-movers-in-${loc.slug}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <MapPin size={12} className="text-amber-400/80" />
                  <span>{loc.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Support & Hotline Banner */}
        <div className="pt-8 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <PhoneCall size={16} className="text-amber-400" />
            <a href="tel:+919324095460" className="text-white font-bold text-sm hover:underline">
              Helpline / WhatsApp: {OFFICIAL_PHONE}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} className="text-cyan-400" />
            <span>Email: support@supersouthpackers.com</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-amber-400" />
            <span>Vashi, Navi Mumbai Operations HQ</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Super South Packers & Movers Pvt. Ltd. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Insurance Claim Policy</span>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-amber-500 hover:text-[#13345b] transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
