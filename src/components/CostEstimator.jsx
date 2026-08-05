import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Sparkles, Info, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

const CITY_DISTANCES = {
  'Navi Mumbai-Local Shifting': 20,
  'Navi Mumbai-Mumbai / MMR': 35,
  'Navi Mumbai-Pune': 140,
  'Navi Mumbai-Bangalore': 980,
  'Navi Mumbai-Hyderabad': 710,
  'Navi Mumbai-Chennai': 1250,
  'Navi Mumbai-Delhi NCR': 1420,
  'Navi Mumbai-Ahmedabad': 530,
  'Navi Mumbai-Kolkata': 1670,
  'Navi Mumbai-Kochi': 1320,
  'Navi Mumbai-Goa': 570,
  'Navi Mumbai-Coimbatore': 1180
};

const TOP_DESTINATION_CITIES = [
  'Local Shifting',
  'Mumbai / MMR',
  'Pune',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Delhi NCR',
  'Ahmedabad',
  'Kolkata',
  'Kochi',
  'Goa',
  'Coimbatore'
];

const MOVE_SIZES = [
  { id: '1bhk', name: '1 BHK Apartment', basePrice: 4500, icon: '🏠' },
  { id: '2bhk', name: '2 BHK Apartment', basePrice: 7800, icon: '🏡' },
  { id: '3bhk', name: '3 BHK / Villa', basePrice: 11500, icon: '🏰' },
  { id: '4bhk', name: '4+ BHK / Luxury Villa', basePrice: 16000, icon: '🏛️' },
  { id: 'office', name: 'Corporate Office', basePrice: 14000, icon: '🏢' },
  { id: 'vehicle', name: 'Car / Bike Transport', basePrice: 3500, icon: '🚗' }
];

export default function CostEstimator({ prefillData, onBookWithQuote }) {
  const [fromCity] = useState('Navi Mumbai');
  const [toCity, setToCity] = useState(prefillData?.toCity || 'Local Shifting');
  const [customToCity, setCustomToCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [moveType, setMoveType] = useState(prefillData?.moveType || '2bhk');
  const [floorLevel, setFloorLevel] = useState('lift');

  const [addonPremiumPacking, setAddonPremiumPacking] = useState(true);
  const [addonUnpacking, setAddonUnpacking] = useState(true);
  const [addonInsurance, setAddonInsurance] = useState(true);
  const [addonDedicatedTruck, setAddonDedicatedTruck] = useState(false);

  useEffect(() => {
    if (prefillData) {
      if (prefillData.toCity) setToCity(prefillData.toCity);
      if (prefillData.moveType) setMoveType(prefillData.moveType);
    }
  }, [prefillData]);

  const effectiveToCity = toCity === 'other' ? (customToCity.trim() || 'Custom Destination') : toCity;

  const routeKey = `Navi Mumbai-${toCity}`;
  const isLocal = toCity === 'Local Shifting' || toCity === 'Mumbai / MMR';
  const distance = isLocal ? 20 : (CITY_DISTANCES[routeKey] || 750);

  const selectedSizeObj = MOVE_SIZES.find(m => m.id === moveType) || MOVE_SIZES[1];
  const baseRate = selectedSizeObj.basePrice;
  const floorMultiplier = floorLevel === 'no-lift' ? 1.25 : (floorLevel === 'ground' ? 0.95 : 1.0);
  const distanceCost = isLocal ? 900 : Math.round(distance * 11);

  const packingCost = addonPremiumPacking ? (moveType === '1bhk' ? 1500 : moveType === '2bhk' ? 2500 : 3800) : 0;
  const unpackingCost = addonUnpacking ? 1200 : 0;
  const insuranceCost = addonInsurance ? 990 : 0;
  const dedicatedTruckCost = addonDedicatedTruck ? 2800 : 0;

  const totalCalculated = Math.round((baseRate + distanceCost + packingCost + unpackingCost + insuranceCost + dedicatedTruckCost) * floorMultiplier);
  const minEstimate = Math.round(totalCalculated * 0.92);
  const maxEstimate = Math.round(totalCalculated * 1.08);

  const handleBookNow = () => {
    if (toCity === 'other' && !customToCity.trim()) {
      setCityError('Please enter your destination city name');
      return;
    }
    setCityError('');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onBookWithQuote({
      fromCity: 'Navi Mumbai',
      toCity: effectiveToCity,
      moveType: selectedSizeObj.name,
      estimatedPriceRange: `₹${minEstimate.toLocaleString()} - ₹${maxEstimate.toLocaleString()}`,
      distance: `${distance} km`,
      addons: [
        addonPremiumPacking ? 'Multi-layer Waterproof Packing' : '',
        addonUnpacking ? 'Full Unpacking & Assembly' : '',
        addonInsurance ? 'Full Transit Damage Insurance' : '',
        addonDedicatedTruck ? 'Dedicated Truck (Direct Transit)' : ''
      ].filter(Boolean)
    });
  };

  return (
    <section id="calculator" className="py-20 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs shadow-sm mb-3">
            <Calculator size={14} /> Instant Cost Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#13345b] dark:text-white tracking-tight mb-4 font-heading">
            Calculate Relocation Costs From Navi Mumbai
          </h2>
          <p className="text-slate-700 font-medium dark:text-slate-300 text-base leading-relaxed">
            No hidden charges, no surprise fees. Select your destination city and move parameters for an accurate breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Card */}
          <div className="lg:col-span-7 bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Cities */}
            <div>
              <label className="block text-sm font-extrabold text-[#13345b] dark:text-white mb-3 uppercase tracking-wide">
                1. Select Moving Cities
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Clean Pickup City Input */}
                <div>
                  <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    From City
                  </span>
                  <input
                    type="text"
                    disabled
                    value="Navi Mumbai"
                    className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white text-xs font-bold opacity-90 cursor-not-allowed"
                  />
                </div>

                {/* Destination City */}
                <div>
                  <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">To City (Destination)</span>
                  <select
                    value={toCity}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      if (e.target.value !== 'other') setCityError('');
                    }}
                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white text-xs font-bold focus:outline-none focus:border-amber-500"
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

              {/* Dynamic Manual City Input when "other" is selected */}
              {toCity === 'other' && (
                <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200 space-y-1">
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
                    className="w-full p-3 rounded-xl bg-amber-500/10 dark:bg-slate-800 border-2 border-amber-500 text-[#13345b] dark:text-white text-xs font-bold focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                  />
                  {cityError && (
                    <p className="text-[11px] font-bold text-red-500">{cityError}</p>
                  )}
                </div>
              )}

              <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mt-2">
                📍 Route: Navi Mumbai ➔ {effectiveToCity} ({isLocal ? 'Local Shifting' : `~${distance} km Interstate Highway`})
              </div>
            </div>

            {/* Step 2: Move Size */}
            <div>
              <label className="block text-sm font-extrabold text-[#13345b] dark:text-white mb-3 uppercase tracking-wide">
                2. Home / Move Property Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOVE_SIZES.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMoveType(item.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 text-center cursor-pointer ${
                      moveType === item.id
                        ? 'bg-[#13345b]/10 border-[#13345b] text-[#13345b] dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-400 font-bold shadow-md'
                        : 'bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#13345b]'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Floor Level */}
            <div>
              <label className="block text-sm font-extrabold text-[#13345b] dark:text-white mb-3 uppercase tracking-wide">
                3. Floor Level & Elevator Access
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFloorLevel('ground')}
                  className={`p-3 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all duration-200 ${
                    floorLevel === 'ground'
                      ? 'bg-[#13345b]/10 border-[#13345b] text-[#13345b] dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-400'
                      : 'bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  Ground Floor
                </button>
                <button
                  type="button"
                  onClick={() => setFloorLevel('lift')}
                  className={`p-3 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all duration-200 ${
                    floorLevel === 'lift'
                      ? 'bg-[#13345b]/10 border-[#13345b] text-[#13345b] dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-400'
                      : 'bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  Elevator Available
                </button>
                <button
                  type="button"
                  onClick={() => setFloorLevel('no-lift')}
                  className={`p-3 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all duration-200 ${
                    floorLevel === 'no-lift'
                      ? 'bg-[#13345b]/10 border-[#13345b] text-[#13345b] dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-400'
                      : 'bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  Stairs Only (No Lift)
                </button>
              </div>
            </div>

            {/* Step 4: Add-ons */}
            <div>
              <label className="block text-sm font-extrabold text-[#13345b] dark:text-white mb-3 uppercase tracking-wide">
                4. Protection & Value Add-ons
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addonPremiumPacking}
                    onChange={(e) => setAddonPremiumPacking(e.target.checked)}
                    className="mt-1 accent-[#f59e0b]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#13345b] dark:text-white">Multi-Layer Waterproof Packaging</div>
                    <div className="text-[11px] text-slate-700 font-medium dark:text-slate-400">Heavy bubble wrap, corner foam guards & corrugated boxes</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addonUnpacking}
                    onChange={(e) => setAddonUnpacking(e.target.checked)}
                    className="mt-1 accent-[#f59e0b]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#13345b] dark:text-white">Full Destination Unpacking & Re-Assembly</div>
                    <div className="text-[11px] text-slate-700 font-medium dark:text-slate-400">Cot bed frame, dining table, and wardrobe assembly</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addonInsurance}
                    onChange={(e) => setAddonInsurance(e.target.checked)}
                    className="mt-1 accent-[#f59e0b]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#13345b] dark:text-white">100% Comprehensive Transit Damage Guarantee</div>
                    <div className="text-[11px] text-slate-700 font-medium dark:text-slate-400">Zero-deductible full compensation policy</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addonDedicatedTruck}
                    onChange={(e) => setAddonDedicatedTruck(e.target.checked)}
                    className="mt-1 accent-[#f59e0b]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#13345b] dark:text-white">Dedicated Express Container Truck</div>
                    <div className="text-[11px] text-slate-700 font-medium dark:text-slate-400">Direct non-stop delivery without shared co-load</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Live Price Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#13345b] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-500/40">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Estimated Price Range
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-bold border border-[#f59e0b]/30 flex items-center gap-1">
                  <Sparkles size={12} /> Guaranteed Rate
                </span>
              </div>

              <div className="mb-6">
                <div className="text-3xl sm:text-4xl font-black text-[#f59e0b] leading-none">
                  ₹{minEstimate.toLocaleString()} - ₹{maxEstimate.toLocaleString()}
                </div>
                <div className="text-xs text-slate-300 mt-2 font-medium">
                  *All-inclusive estimate for Navi Mumbai ➔ {effectiveToCity} ({selectedSizeObj.name})
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="bg-white/5 rounded-2xl p-4 mb-6 space-y-2 text-xs text-slate-200 font-medium">
                <div className="flex justify-between">
                  <span>Base Loading & Labor:</span>
                  <span className="font-bold">₹{baseRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transit / Shifting Charge:</span>
                  <span className="font-bold">₹{distanceCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Multi-layer Packaging:</span>
                  <span className="font-bold">{packingCost > 0 ? `₹${packingCost}` : 'Basic Included'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unpacking & Re-Assembly:</span>
                  <span className="font-bold">{unpackingCost > 0 ? `₹${unpackingCost}` : 'Excluded'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transit Insurance Protection:</span>
                  <span className="font-bold">{insuranceCost > 0 ? `₹${insuranceCost}` : 'Excluded'}</span>
                </div>
                {addonDedicatedTruck && (
                  <div className="flex justify-between">
                    <span>Dedicated Container Truck:</span>
                    <span className="font-bold">₹{dedicatedTruckCost}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-[#f59e0b] text-sm">
                  <span>Tolls & Taxes:</span>
                  <span>Included</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full py-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mb-3"
              >
                Lock In Quote & Book Now <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 font-medium">
                <Info size={13} /> Free cancellation up to 24 hrs before pickup slot.
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
