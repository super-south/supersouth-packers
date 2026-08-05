import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, PhoneCall, Calendar, MapPin, Truck, Sparkles, Send } from 'lucide-react';
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

export default function QuoteModal({ isOpen, onClose, initialData }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [moveDate, setMoveDate] = useState('');
  const [fromCity] = useState('Navi Mumbai');
  const [toCity, setToCity] = useState('Local Shifting');
  const [customToCity, setCustomToCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [propertySize, setPropertySize] = useState('2 BHK Apartment');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const OFFICIAL_PHONE = '+91 93240 95460';

  useEffect(() => {
    if (initialData) {
      if (initialData.toCity) {
        if (TOP_DESTINATION_CITIES.includes(initialData.toCity)) {
          setToCity(initialData.toCity);
        } else {
          setToCity('other');
          setCustomToCity(initialData.toCity);
        }
      }
      if (initialData.moveType) setPropertySize(initialData.moveType);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const getEffectiveToCity = () => {
    if (toCity === 'other') {
      return customToCity.trim() ? customToCity.trim() : 'Custom All India Destination';
    }
    return toCity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (toCity === 'other' && !customToCity.trim()) {
      setCityError('Please enter your destination city name');
      return;
    }
    setCityError('');
    setSubmitError('');
    setSubmitting(true);

    const formData = {
      name,
      phone,
      email,
      movingFrom: fromCity,
      movingTo: getEffectiveToCity(),
      moveSize: propertySize,
      moveDate,
      notes: specialNotes,
    };

    try {
      const response = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok || response.status === 200 || response.status === 201) {
        const refId = `SSP-RESERV-${Math.floor(100000 + Math.random() * 900000)}`;
        setBookingRef(refId);

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 }
          });
        } catch (err) {}

        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(data.message || 'Failed to submit quote to backend server.');
      }
    } catch (err) {
      console.error('Backend submission error:', err);
      setSubmitError('Unable to reach backend server.');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hi Super South Packers! I would like to book a moving slot:
- *Name:* ${name || 'Valued Customer'}
- *From:* ${fromCity}
- *To:* ${getEffectiveToCity()}
- *Property:* ${propertySize}
- *Preferred Date:* ${moveDate || 'As soon as possible'}
${initialData?.estimatedPriceRange ? `- *Estimated Quote:* ${initialData.estimatedPriceRange}` : ''}
Please send me slot confirmation & booking details!`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/919324095460?text=${encodedText}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content relative bg-white dark:bg-slate-900 text-[#13345b] dark:text-white border-2 border-slate-200 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#13345b] dark:text-slate-300 flex items-center justify-center hover:bg-[#f59e0b] hover:text-[#13345b] transition-colors cursor-pointer z-10 font-bold"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/15 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs">
              <Sparkles size={14} /> Booking Reservation Received
            </span>

            <h3 className="text-2xl font-extrabold text-[#13345b] dark:text-white font-heading">
              You're All Set, {name || 'Friend'}!
            </h3>

            <p className="text-sm text-slate-700 font-medium dark:text-slate-300">
              Your reservation reference ID is <strong className="text-[#f59e0b] font-bold">{bookingRef}</strong>. Our senior move manager will call you within 15 minutes to confirm crew timing and packing materials.
            </p>

            <div className="p-4 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-950 dark:border-slate-800 text-left text-xs space-y-1.5 text-slate-800 dark:text-slate-200 font-medium">
              <div>📍 <strong>Route:</strong> {fromCity} ➔ {getEffectiveToCity()}</div>
              <div>🏠 <strong>Move Type:</strong> {propertySize}</div>
              {moveDate && <div>📅 <strong>Moving Date:</strong> {moveDate}</div>}
              {initialData?.estimatedPriceRange && <div>💰 <strong>Estimated Range:</strong> {initialData.estimatedPriceRange}</div>}
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md text-decoration-none"
              >
                <MessageSquare size={18} /> Connect Instantly on WhatsApp (+91 93240 95460)
              </a>
              <button onClick={onClose} className="w-full py-3 rounded-xl border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs cursor-pointer">
                Close & Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs mb-2">
                <Truck size={14} /> Lock In Your Moving Slot
              </span>
              <h3 className="text-2xl font-extrabold text-[#13345b] dark:text-white font-heading">
                Get Your Official Relocation Quote
              </h3>
              <p className="text-xs text-slate-700 font-medium dark:text-slate-400 mt-1">
                Fill in your pickup details below or talk directly to our move coordinator.
              </p>
            </div>

            {initialData?.estimatedPriceRange && (
              <div className="p-3 rounded-xl bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#13345b] dark:text-amber-400 text-xs font-bold">
                ⚡ Pre-filled Quote Estimate: {initialData.estimatedPriceRange} ({fromCity} ➔ {getEffectiveToCity()})
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 93240 95460"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Clean Pickup City Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Pickup City
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Navi Mumbai"
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white text-xs font-bold opacity-90 cursor-not-allowed"
                  />
                </div>

                {/* Destination Select */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Destination City</label>
                  <select
                    value={toCity}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      if (e.target.value !== 'other') setCityError('');
                    }}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-bold text-xs focus:outline-none"
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
              </div>

              {/* Dynamic Manual Input when "other" is selected */}
              {toCity === 'other' && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200 space-y-1">
                  <label className="block text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
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
                    className="w-full p-3 rounded-xl bg-amber-500/10 dark:bg-slate-800 border-2 border-amber-500 text-[#13345b] dark:text-white text-xs font-bold focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                  />
                  {cityError && (
                    <p className="text-[11px] font-bold text-red-500">{cityError}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Move Property Size</label>
                  <select
                    value={propertySize}
                    onChange={(e) => setPropertySize(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-xs focus:outline-none"
                  >
                    <option value="1 BHK Apartment" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">1 BHK Apartment</option>
                    <option value="2 BHK Apartment" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">2 BHK Apartment</option>
                    <option value="3 BHK / Independent House" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">3 BHK / Independent House</option>
                    <option value="4+ BHK / Villa" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">4+ BHK / Villa</option>
                    <option value="Office Relocation" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Office Relocation</option>
                    <option value="Car / Bike Transport" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Car / Bike Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Shift Date</label>
                  <input
                    type="date"
                    value={moveDate}
                    onChange={(e) => setMoveDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Special Instructions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need glass crating for dining table, piano, or car transport..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium text-xs focus:outline-none resize-y"
                />
              </div>

              {submitError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold">
                  ⚠️ {submitError}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={16} /> {submitting ? 'Submitting to Server...' : 'Confirm & Request Free Callback'}
                </button>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 text-decoration-none shadow-md"
                >
                  <MessageSquare size={16} /> Fast Booking via WhatsApp (+91 93240 95460)
                </a>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
