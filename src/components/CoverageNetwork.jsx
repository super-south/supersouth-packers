import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

const POPULAR_ROUTES = [
  { from: 'Navi Mumbai', to: 'Bangalore', distance: '980 km', duration: '24 Hours Express', startPrice: '₹8,999' },
  { from: 'Navi Mumbai', to: 'Chennai', distance: '1250 km', duration: '36 Hours Express', startPrice: '₹10,500' },
  { from: 'Navi Mumbai', to: 'Hyderabad', distance: '710 km', duration: '24 Hours', startPrice: '₹7,999' },
  { from: 'Navi Mumbai', to: 'Kochi', distance: '1320 km', duration: '40 Hours', startPrice: '₹11,800' },
  { from: 'Bangalore', to: 'Chennai', distance: '340 km', duration: 'Same Day / 12 Hours', startPrice: '₹4,999' },
  { from: 'Chennai', to: 'Coimbatore', distance: '500 km', duration: '18 Hours', startPrice: '₹5,800' },
  { from: 'Hyderabad', to: 'Vizag', distance: '620 km', duration: '24 Hours', startPrice: '₹7,200' },
  { from: 'Kochi', to: 'Trivandrum', distance: '200 km', duration: 'Same Day / 6 Hours', startPrice: '₹3,999' }
];

const MAJOR_HUBS = [
  { city: 'Navi Mumbai Operations HQ', state: 'Maharashtra', branch: 'Office No 205, 2nd Floor, Vikrant Complex, Plot No 72/73, Sector 19c, Vashi, 400705', phone: '+91 93240 95460' },
  { city: 'Bangalore Hub', state: 'Karnataka', branch: 'HSR Layout Sector 1 & Electronic City Phase 1', phone: '+91 93240 95460' },
  { city: 'Chennai Hub', state: 'Tamil Nadu', branch: 'Anna Nagar West & Adyar Main Road', phone: '+91 93240 95460' },
  { city: 'Hyderabad Hub', state: 'Telangana', branch: 'Gachibowli Financial District & HITEC City', phone: '+91 93240 95460' },
  { city: 'Kochi Hub', state: 'Kerala', branch: 'Kakkanad InfoPark Road & MG Road', phone: '+91 93240 95460' },
  { city: 'Coimbatore Hub', state: 'Tamil Nadu', branch: 'RS Puram & Avinashi Road', phone: '+91 93240 95460' }
];

export default function CoverageNetwork({ onSelectRoute }) {
  const [activeTab, setActiveTab] = useState('routes');

  return (
    <section id="coverage" className="relative py-20 bg-gradient-to-br from-[#13345b] via-[#0f172a] to-[#13345b] text-white border-t border-b border-slate-800 overflow-hidden">
      
      {/* Background Image Transparency Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/warehouse.jpg"
          alt="Pan-India Highway Network"
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#13345b]/85 to-[#0f172a]/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-xs shadow-md mb-3">
            <MapPin size={14} /> Extensive South India & Pan-India Footprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-heading text-center">
            Navi Mumbai Hub Network & Outstation Express Corridors
          </h2>
          <p className="text-slate-200 font-medium text-base leading-relaxed text-center">
            Direct container trucks running daily from Navi Mumbai (Vashi HQ) to South India IT hubs, residential capitals, and 500+ cities across India.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('routes')}
            className={`py-3 px-6 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              activeTab === 'routes'
                ? 'bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] shadow-lg'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            Navi Mumbai to Pan-India Express Corridors
          </button>
          <button
            onClick={() => setActiveTab('hubs')}
            className={`py-3 px-6 rounded-full font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              activeTab === 'hubs'
                ? 'bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] shadow-lg'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            Major City Operations Hubs
          </button>
        </div>

        {/* Tab Content: Routes Matrix */}
        {activeTab === 'routes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-extrabold text-[#13345b] dark:text-white">
                      {route.from} ➔ {route.to}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-[11px]">
                      Starts {route.startPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-700 font-medium dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-[#f59e0b]" /> {route.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={13} className="text-cyan-600" /> {route.duration}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectRoute(route)}
                  className="w-full py-2.5 px-3 rounded-xl border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer dark:border-slate-700 dark:text-slate-200"
                >
                  <span>Get Route Rate Card</span> <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Hub Offices */}
        {activeTab === 'hubs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MAJOR_HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-6 shadow-2xl space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-[#13345b] flex items-center justify-center font-bold">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#13345b] dark:text-white">{hub.city}</h3>
                    <p className="text-xs text-slate-700 font-medium dark:text-slate-400">{hub.state}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-700 font-medium dark:text-slate-300">
                  🏢 <strong>Primary Hub Address:</strong> {hub.branch}
                </p>
                <a href="tel:+919324095460" className="text-xs font-bold text-[#f59e0b] dark:text-amber-400 hover:underline block">
                  📞 Helpline / WhatsApp: {hub.phone}
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
