import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, ArrowRight, MapPin, Calendar, CheckCircle2, Phone, User, Send, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const API_BASE = import.meta.env.VITE_API_URL || '';

const TOP_DESTINATION_CITIES = [
  'Local Shifting',
  'Bangalore',
  'Mumbai / MMR',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Delhi NCR',
  'Ahmedabad',
  'Kolkata',
  'Kochi',
  'Goa',
  'Coimbatore'
];

export default function Hero({ onStartEstimate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromCity] = useState('Navi Mumbai');
  const [toCity, setToCity] = useState('Local Shifting');
  const [customToCity, setCustomToCity] = useState('');
  const [moveType, setMoveType] = useState('2bhk');
  const [moveDate, setMoveDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cityError, setCityError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const getEffectiveToCity = () => {
    if (toCity === 'other') {
      return customToCity.trim() ? customToCity.trim() : 'Custom All India Destination';
    }
    return toCity;
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (toCity === 'other' && !customToCity.trim()) {
        setCityError('Please enter your destination city name');
        return;
      }
      setCityError('');
      setCurrentStep(2);
    } else {
      setSubmitting(true);
      setSubmitError('');
      const effectiveTo = getEffectiveToCity();
      const formData = {
        name: customerName,
        phone: customerPhone,
        movingFrom: fromCity,
        movingTo: effectiveTo,
        moveSize: moveType,
        serviceType: moveType,
        moveDate: moveDate || undefined,
      };

      try {
        const response = await fetch(`${API_BASE}/api/quotes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json().catch(() => ({}));

        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (err) {}

        if (!response.ok && data?.message) {
          setSubmitError(data.message);
        }

        setFormSubmitted(true);
        if (onStartEstimate) {
          onStartEstimate({
            fromCity,
            toCity: effectiveTo,
            moveType,
            moveDate,
            customerName,
            customerPhone
          });
        }
      } catch (err) {
        console.error('Network error submitting quote from Hero:', err);
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
        setFormSubmitted(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setCurrentStep(1);
    setToCity('Local Shifting');
    setCustomToCity('');
    setCityError('');
  };

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#13345b] to-[#0f172a] text-white border-b border-slate-800">
      
      {/* Background Image Transparency Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/hero_truck.jpg"
          alt="Super South Highway Fleet"
          className="w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/90 via-[#13345b]/85 to-[#0f172a]/95" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-16 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Balanced 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold shadow-md">
              <ShieldCheck size={16} /> Navi Mumbai's #1 Local & Pan-India Packers & Movers
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Relocate Anywhere in India <span className="gradient-text">From Navi Mumbai</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed max-w-2xl">
              Specialized local house shifting across Vashi, Kharghar, Panvel, Nerul, Belapur, Airoli & all 12 Navi Mumbai nodes, plus direct outstation express corridors from Navi Mumbai to Bangalore, Chennai, Hyderabad, Kochi & Pan India.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white">Navi Mumbai Local Shifting</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white">Shifting to All India</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white">Zero-Damage & GPS Tracked</span>
              </div>
            </div>

            {/* Micro Stats */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-400 font-extrabold flex items-center justify-center text-sm border border-amber-500/30">
                  ★ 4.9
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">50,000+ Relocations</div>
                  <div className="text-xs text-slate-300 font-medium">Navi Mumbai & Interstate Customers</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
                  <Clock size={22} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">99.4% On-Time</div>
                  <div className="text-xs text-slate-300 font-medium">Direct Highway Container Fleet</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Multi-Step Quote Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 border-2 border-amber-500/50 shadow-2xl rounded-3xl p-6 sm:p-8 relative text-slate-900 dark:text-white">
              
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#f59e0b] text-[#13345b] font-extrabold text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles size={12} /> Instant Quote Wizard
              </div>

              {formSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#13345b] dark:text-white">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-slate-700 font-medium dark:text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-[#f59e0b] font-bold">{customerName || 'Valued Customer'}</strong>! Our move coordinator will call you back within 15 minutes with a custom quote for shifting from <strong>{fromCity}</strong> to <strong>{getEffectiveToCity()}</strong>.
                  </p>

                  <a
                    href="tel:+919324095460"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md text-decoration-none"
                  >
                    <Phone size={16} /> Call Hotline (+91 93240 95460)
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="text-xs text-slate-600 hover:text-[#f59e0b] underline font-medium cursor-pointer block mx-auto pt-2"
                  >
                    Calculate Another Route
                  </button>
                </div>
              ) : (
                <div>
                  {/* Step Indicator */}
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 1 ? 'bg-[#f59e0b] text-[#13345b]' : 'bg-emerald-600 text-white'}`}>
                        {currentStep === 1 ? '1' : '✓'}
                      </span>
                      <span className={`font-bold ${currentStep === 1 ? 'text-[#13345b] dark:text-white' : 'text-slate-500'}`}>
                        1. Move Details
                      </span>
                    </div>

                    <ChevronRight size={14} className="text-slate-400" />

                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 2 ? 'bg-[#f59e0b] text-[#13345b]' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        2
                      </span>
                      <span className={`font-bold ${currentStep === 2 ? 'text-[#13345b] dark:text-white' : 'text-slate-500'}`}>
                        2. Date & Contact
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-4">
                    
                    {currentStep === 1 ? (
                      <>
                        {/* Pickup City Input */}
                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <MapPin size={13} className="text-[#f59e0b]" /> Moving From (Pickup City)
                          </label>
                          <input
                            type="text"
                            disabled
                            value="Navi Mumbai"
                            className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white text-sm font-bold opacity-90 cursor-not-allowed"
                          />
                        </div>

                        {/* Destination City Select - Pre-filled with Local Shifting */}
                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <MapPin size={13} className="text-[#f59e0b]" /> Moving To (Destination City)
                          </label>
                          <select
                            value={toCity}
                            onChange={(e) => {
                              setToCity(e.target.value);
                              if (e.target.value !== 'other') setCityError('');
                            }}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-bold text-sm focus:outline-none"
                          >
                            {TOP_DESTINATION_CITIES.map((city) => (
                              <option key={city} value={city} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                                {city}
                              </option>
                            ))}
                            <option value="other" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-amber-600">
                              ➕ Other All India Destination
                            </option>
                          </select>
                        </div>

                        {/* Dynamic Manual City Input when "other" is selected */}
                        {toCity === 'other' && (
                          <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-1">
                            <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                              Enter Your Destination City Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Jaipur, Lucknow, Chandigarh, Surat, Indore..."
                              value={customToCity}
                              onChange={(e) => {
                                setCustomToCity(e.target.value);
                                if (e.target.value.trim()) setCityError('');
                              }}
                              className="w-full p-3 rounded-xl bg-amber-500/10 dark:bg-slate-800 border-2 border-amber-500 text-[#13345b] dark:text-white text-sm font-bold focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                            />
                            {cityError && (
                              <p className="text-[11px] font-bold text-red-500">{cityError}</p>
                            )}
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <Truck size={13} className="text-[#f59e0b]" /> Property / Shift Type
                          </label>
                          <select
                            value={moveType}
                            onChange={(e) => setMoveType(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-sm focus:outline-none"
                          >
                            <option value="1bhk" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">1 BHK Apartment / Studio</option>
                            <option value="2bhk" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">2 BHK Apartment</option>
                            <option value="3bhk" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">3 BHK / Independent Villa</option>
                            <option value="4bhk" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">4+ BHK Large Villa</option>
                            <option value="office" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Corporate Office Shift</option>
                            <option value="vehicle" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Vehicle Transport (Car/Bike)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                          Continue to Step 2 <ArrowRight size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <Calendar size={13} className="text-[#f59e0b]" /> Preferred Moving Date
                          </label>
                          <input
                            type="date"
                            required
                            value={moveDate}
                            onChange={(e) => setMoveDate(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <User size={13} className="text-[#f59e0b]" /> Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Kumar"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                            <Phone size={13} className="text-[#f59e0b]" /> Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 93240 95460"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-sm focus:outline-none"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="py-3.5 px-4 rounded-xl border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs cursor-pointer transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {submitting ? 'Submitting...' : 'Get Free Quote'} <Send size={16} />
                          </button>
                        </div>
                      </>
                    )}

                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
