import React, { useState } from 'react';
import { Search, MapPin, Truck, CheckCircle2, Phone, AlertCircle, Navigation } from 'lucide-react';

const SAMPLE_SHIPMENTS = {
  'SSP-98241': {
    id: 'SSP-98241',
    customer: 'Anand Viswanathan',
    from: 'Navi Mumbai (Vashi)',
    to: 'Chennai (Adyar)',
    status: 'In Transit',
    currentStage: 3,
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 93240 95460',
    vehicleNo: 'KA-01-MJ-8821 (19ft Closed Container)',
    location: 'Krishnagiri Highway (NH-44)',
    eta: 'Today, 5:30 PM',
    itemsCount: '48 Boxes + Furniture',
    stages: [
      { title: 'Order Confirmed & Crew Assigned', time: 'Yesterday, 9:00 AM', done: true },
      { title: 'Packing & Loading Complete', time: 'Yesterday, 4:30 PM', done: true },
      { title: 'In Transit - GPS Active', time: 'Today, 6:00 AM', done: true, active: true },
      { title: 'Reached Chennai Hub', time: 'Expected Today 3:30 PM', done: false },
      { title: 'Final Delivery & Unpacking', time: 'Expected Today 5:30 PM', done: false }
    ]
  },
  'SSP-77190': {
    id: 'SSP-77190',
    customer: 'Priya Sundaram',
    from: 'Navi Mumbai (Kharghar)',
    to: 'Hyderabad (Gachibowli)',
    status: 'Out for Delivery',
    currentStage: 4,
    driverName: 'Santhosh Nair',
    driverPhone: '+91 93240 95460',
    vehicleNo: 'KL-07-CD-4410',
    location: 'HITEC City Expressway',
    eta: 'Today, 11:45 AM',
    itemsCount: '32 Items + Bike',
    stages: [
      { title: 'Order Confirmed & Crew Assigned', time: '2 Days Ago', done: true },
      { title: 'Packing & Loading Complete', time: '2 Days Ago', done: true },
      { title: 'In Transit - GPS Active', time: 'Yesterday', done: true },
      { title: 'Reached Hyderabad Hub', time: 'Today, 7:00 AM', done: true },
      { title: 'Final Delivery & Unpacking', time: 'Out Now', done: true, active: true }
    ]
  },
  'SSP-55204': {
    id: 'SSP-55204',
    customer: 'Karthik Subramanian',
    from: 'Navi Mumbai (Belapur)',
    to: 'Bangalore (HSR Layout)',
    status: 'Packing Complete',
    currentStage: 1,
    driverName: 'Murugan V.',
    driverPhone: '+91 93240 95460',
    vehicleNo: 'TN-37-BY-9901',
    location: 'Belapur Sector 15 Pickup Point',
    eta: 'Tomorrow, 2:00 PM',
    itemsCount: '55 Boxes',
    stages: [
      { title: 'Order Confirmed & Crew Assigned', time: 'Today, 8:00 AM', done: true },
      { title: 'Packing & Loading Complete', time: 'Today, 1:30 PM', done: true, active: true },
      { title: 'In Transit - GPS Active', time: 'Starting Today 6:00 PM', done: false },
      { title: 'Reached Hub', time: 'Expected Tomorrow 10:00 AM', done: false },
      { title: 'Final Delivery & Unpacking', time: 'Expected Tomorrow 2:00 PM', done: false }
    ]
  }
};

export default function ShipmentTracker() {
  const [searchId, setSearchId] = useState('SSP-98241');
  const [activeShipment, setActiveShipment] = useState(SAMPLE_SHIPMENTS['SSP-98241']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (SAMPLE_SHIPMENTS[cleanId]) {
      setActiveShipment(SAMPLE_SHIPMENTS[cleanId]);
      setErrorMsg('');
    } else {
      setErrorMsg(`Tracking ID "${cleanId}" not found. Try one of the sample IDs below!`);
    }
  };

  const loadSample = (id) => {
    setSearchId(id);
    setActiveShipment(SAMPLE_SHIPMENTS[id]);
    setErrorMsg('');
  };

  return (
    <section id="tracking" className="relative py-20 bg-gradient-to-r from-[#0f172a] via-[#13345b] to-[#0f172a] text-white border-t border-b border-slate-800 overflow-hidden">
      
      {/* Background Image Transparency Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/hero_truck.jpg"
          alt="GPS Tracked Consignment Fleet"
          className="w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#13345b]/85 to-[#0f172a]/95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-xs shadow-md mb-3">
            <Navigation size={14} /> Live GPS Consignment Tracking
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-heading text-center">
            Track Your Move In Real Time
          </h2>
          <p className="text-slate-200 font-medium text-base leading-relaxed text-center">
            Enter your Lorry Receipt (LR) tracking number to view real-time location, driver contact, and transit progress for Navi Mumbai & Pan-India moves.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3">
          <form onSubmit={handleSearch} className="bg-white/95 dark:bg-slate-900 border-2 border-white/20 dark:border-slate-800 rounded-full p-2 pl-5 shadow-2xl flex items-center gap-3">
            <Search size={20} className="text-[#f59e0b] shrink-0" />
            <input
              type="text"
              placeholder="Enter LR Number e.g. SSP-98241"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 bg-transparent border-0 text-[#13345b] dark:text-white font-bold text-sm sm:text-base focus:outline-none"
            />
            <button type="submit" className="py-3 px-6 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer">
              Track Now
            </button>
          </form>

          {/* Quick Demo Pickers */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-slate-300 font-medium">Try Demo IDs:</span>
            {Object.keys(SAMPLE_SHIPMENTS).map(id => (
              <button
                key={id}
                type="button"
                onClick={() => loadSample(id)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-colors ${
                  searchId === id
                    ? 'bg-[#f59e0b] text-[#13345b]'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center font-semibold flex items-center justify-center gap-2">
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}
        </div>

        {/* Tracking Details Display Card */}
        {activeShipment && (
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-extrabold text-[#f59e0b] uppercase tracking-wider mb-1">
                  CONSIGNMENT #{activeShipment.id}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#13345b] dark:text-white">
                  {activeShipment.from} ➔ {activeShipment.to}
                </div>
                <div className="text-xs text-slate-700 font-medium dark:text-slate-400 mt-1">
                  Customer: {activeShipment.customer} | Items: {activeShipment.itemsCount}
                </div>
              </div>

              <div className="sm:text-right">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs">
                  ● Status: {activeShipment.status}
                </span>
                <div className="text-xs text-slate-700 font-medium dark:text-slate-400 mt-1.5">
                  Estimated Arrival: <strong className="text-[#13345b] dark:text-white font-bold">{activeShipment.eta}</strong>
                </div>
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {activeShipment.stages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                    stage.active
                      ? 'bg-[#f59e0b] text-[#13345b] shadow-md'
                      : stage.done
                      ? 'bg-[#13345b] text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {stage.done ? <CheckCircle2 size={20} /> : (idx + 1)}
                  </div>
                  <div className={`text-xs font-bold mb-1 ${stage.active ? 'text-[#f59e0b] dark:text-amber-400' : 'text-[#13345b] dark:text-white'}`}>
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium dark:text-slate-500">{stage.time}</div>
                </div>
              ))}
            </div>

            {/* Live GPS & Driver Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border-2 border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 text-xs">
              <div>
                <span className="block font-extrabold text-[#13345b] dark:text-slate-400 uppercase tracking-wider mb-1">📍 Current GPS Location</span>
                <div className="text-sm font-extrabold text-cyan-700 dark:text-cyan-400">{activeShipment.location}</div>
                <div className="text-[11px] text-slate-700 font-medium dark:text-slate-500 mt-1">GPS Signal: Active & Updating live</div>
              </div>

              <div>
                <span className="block font-extrabold text-[#13345b] dark:text-slate-400 uppercase tracking-wider mb-1">🚚 Assigned Vehicle</span>
                <div className="text-sm font-extrabold text-[#13345b] dark:text-white">{activeShipment.vehicleNo}</div>
                <div className="text-[11px] text-slate-700 font-medium dark:text-slate-500 mt-1">Waterproof Air-Suspended Container</div>
              </div>

              <div>
                <span className="block font-extrabold text-[#13345b] dark:text-slate-400 uppercase tracking-wider mb-1">📞 Driver & Move Lead</span>
                <div className="text-sm font-extrabold text-[#13345b] dark:text-white">{activeShipment.driverName}</div>
                <a href="tel:+919324095460" className="inline-flex items-center gap-1 text-[#f59e0b] dark:text-amber-400 font-bold mt-1 hover:underline">
                  <Phone size={13} /> Call Helpline: +91 93240 95460
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
