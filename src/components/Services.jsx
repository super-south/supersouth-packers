import React from 'react';
import { Home, Building2, Car, Warehouse, Package, Check, ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'home',
    title: 'Household Relocation',
    subtitle: 'End-to-End Premium House Shifting',
    image: '/images/packing_furniture.jpg',
    icon: Home,
    badge: 'Most Popular',
    description: 'Complete home relocation with zero stress. Our trained crew wraps every item in 5-layer protective materials, labels every box, and re-assembles your furniture at your new home.',
    features: [
      'Multi-layer Bubble & Waterproof Wrapping',
      'Special Wooden Crating for Glass & TV screens',
      'Disassembly & Re-assembly of Furniture & ACs',
      'First-day Essential Box (Toiletries, Cables, Tools)'
    ]
  },
  {
    id: 'office',
    title: 'Corporate & Office Moving',
    subtitle: 'Zero-Downtime Commercial Shifting',
    image: '/images/hero_truck.jpg',
    icon: Building2,
    badge: 'Fast Track',
    description: 'Seamless office and IT infrastructure migration tailored to minimize business downtime. Weekend and overnight shifting operations available with dedicated project managers.',
    features: [
      'Anti-Static Packaging for Servers & Workstations',
      'Systematic Color-Coded Cubicle Labeling',
      'Safe Handling of Conference & Heavy Machinery',
      'Post-Move Setup & Cable Management Support'
    ]
  },
  {
    id: 'vehicle',
    title: 'Car & Bike Transportation',
    subtitle: 'Scratch-Free Vehicle Transit across India',
    image: '/images/hero_truck.jpg',
    icon: Car,
    badge: 'GPS Tracked',
    description: 'Safe door-to-door vehicle transport using specialized hydraulic car trailers and closed car container carriers with wheel chocks and soft-grip tie downs.',
    features: [
      'Enclosed Hydraulic Double-Deck Car Carriers',
      'Pre-Transit Detailed Inspection & Condition Sheet',
      'Full Vehicle Transit Insurance Coverage',
      'Live GPS Tracking from Pickup to Destination'
    ]
  },
  {
    id: 'storage',
    title: 'Secure Warehousing & Storage',
    subtitle: 'Short & Long Term Climate-Controlled Storage',
    image: '/images/warehouse.jpg',
    icon: Warehouse,
    badge: '24/7 Security',
    description: 'State-of-the-art secure warehouse facilities across major South Indian hubs. Ideal for temporary storage during home renovation or delayed possession.',
    features: [
      '24/7 CCTV Surveillance & Bio-metric Entry',
      'Pest-Controlled & Moisture-Proof Palletizing',
      'Flexible Daily / Monthly Storage Plans',
      'Easy Door Delivery whenever you demand'
    ]
  }
];

export default function Services({ onSelectService }) {
  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs shadow-sm mb-3">
            <Package size={14} /> Full Spectrum Relocation Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#13345b] dark:text-white tracking-tight mb-4 font-heading">
            Tailored Moving Services Designed For Peace Of Mind
          </h2>
          <p className="text-slate-700 font-medium dark:text-slate-300 text-base leading-relaxed">
            From high-value household heirlooms to entire corporate IT offices, we handle every consignment with white-glove care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13345b]/80 via-[#13345b]/20 to-transparent" />

                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#f59e0b] text-[#13345b] text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      {service.badge}
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-white">
                      <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-[#13345b] flex items-center justify-center font-bold shrink-0">
                        <IconComp size={22} />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold leading-tight text-white">{service.title}</h3>
                        <p className="text-xs text-slate-200 font-medium">{service.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-700 font-medium dark:text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <Check size={14} className="text-[#f59e0b] shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium dark:text-slate-200">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-3 px-4 rounded-xl border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Request Service Quote</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
