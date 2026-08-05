import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, PhoneCall, Moon, Sun, Menu, X, ShieldCheck, Calculator, ChevronDown, MapPin } from 'lucide-react';
import { NAVI_MUMBAI_LOCATIONS } from '../data/locations';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenQuoteModal, onOpenTracker }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  const OFFICIAL_PHONE = '+91 93240 95460';
  const TEL_LINK = 'tel:+919324095460';

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Top Banner Notice */}
      <div className="bg-[#13345b] text-slate-100 px-4 py-1.5 text-xs text-center flex justify-center items-center gap-4 border-b border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-amber-400" />
          <span>ISO 9001:2015 Certified | 100% Transit Damage Insurance</span>
        </div>
        <span className="hidden sm:inline text-slate-400">•</span>
        <a href={TEL_LINK} className="font-bold text-amber-400 hover:underline flex items-center gap-1">
          <PhoneCall size={13} /> 24/7 Helpline: {OFFICIAL_PHONE}
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
            <Truck size={24} className="text-[#13345b]" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-[#13345b] dark:text-white tracking-tight leading-none block font-heading">
              SUPER SOUTH
            </span>
            <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 tracking-widest uppercase">
              Packers & Movers
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a href="#calculator" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Cost Estimator
          </a>

          {/* Service Areas Dropdown */}
          <div className="relative" onMouseLeave={() => setAreaDropdownOpen(false)}>
            <button
              onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
              onMouseEnter={() => setAreaDropdownOpen(true)}
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-1 py-2 cursor-pointer"
            >
              <MapPin size={15} className="text-amber-500 dark:text-amber-400" />
              <span>Service Areas</span>
              <ChevronDown size={15} className={`transition-transform duration-200 ${areaDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
            </button>

            {areaDropdownOpen && (
              <div className="absolute top-full left-0 w-[480px] bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="col-span-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                  Navi Mumbai Local Hubs & Sectors
                </div>
                {NAVI_MUMBAI_LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/packers-and-movers-in-${loc.slug}`}
                    onClick={() => setAreaDropdownOpen(false)}
                    className="p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-amber-500/10 dark:hover:bg-slate-800 hover:text-amber-500 dark:hover:text-amber-400 flex items-center gap-2 transition-all duration-150"
                  >
                    <MapPin size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>{loc.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="#tracking" onClick={(e) => { e.preventDefault(); onOpenTracker(); }} className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Track Shipment
          </a>
          <a href="#services" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Services
          </a>
          <a href="#reviews" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            Reviews
          </a>
          <a href="#faq" className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* One-Tap Call Button */}
          <a
            href={TEL_LINK}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all duration-200 text-decoration-none"
            aria-label="Call Super South Movers"
          >
            <PhoneCall size={15} />
            <span className="hidden xs:inline sm:inline">{OFFICIAL_PHONE}</span>
            <span className="xs:hidden sm:hidden">Call</span>
          </a>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* Instant Quote Button */}
          <button
            onClick={onOpenQuoteModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-[#13345b] font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Calculator size={16} /> Get Quote
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-700 dark:text-slate-200 hover:text-amber-500 p-2 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 dark:text-slate-200">
            Instant Cost Estimator
          </a>

          <div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Navi Mumbai Service Areas</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              {NAVI_MUMBAI_LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/packers-and-movers-in-${loc.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 py-1"
                >
                  • {loc.name}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }}
            className="block text-sm font-bold text-slate-800 dark:text-slate-200 text-left bg-transparent border-0 p-0 cursor-pointer"
          >
            📦 Track Shipment Status
          </button>

          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 dark:text-slate-200">
            Our Services
          </a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-slate-800 dark:text-slate-200">
            Customer Reviews
          </a>

          <a
            href={TEL_LINK}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm text-decoration-none pt-3 border-t border-slate-200 dark:border-slate-800"
          >
            <PhoneCall size={18} /> Call One-Tap Helpline: {OFFICIAL_PHONE}
          </a>
        </div>
      )}

    </header>
  );
}
