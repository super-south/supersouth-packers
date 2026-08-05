import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NAVI_MUMBAI_LOCATIONS } from '../data/locations';
import {
  MapPin,
  ShieldCheck,
  Truck,
  Star,
  Phone,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Building2,
  Calendar,
  User,
  Send,
  Sparkles,
  ChevronRight,
  Calculator,
  ChevronLeft
} from 'lucide-react';
import CostEstimator from '../components/CostEstimator';
import confetti from 'canvas-confetti';

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

export default function LocationPage({ onOpenQuoteModal }) {
  const { slug } = useParams();
  
  // Find location by slug or fallback to Vashi
  const location = NAVI_MUMBAI_LOCATIONS.find(loc => loc.slug === slug) || NAVI_MUMBAI_LOCATIONS[0];

  const OFFICIAL_PHONE = '+91 93240 95460';
  const TEL_LINK = 'tel:+919324095460';

  // Hero Embedded Multi-Step Quote Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [toCity, setToCity] = useState('Local Shifting');
  const [customToCity, setCustomToCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [moveType, setMoveType] = useState('2bhk');
  const [moveDate, setMoveDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Review Carousel State
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Dynamic Schema Injection
  useEffect(() => {
    document.title = location.metaTitle || location.title;
    
    const existingScript = document.getElementById('jsonld-schema');
    if (existingScript) existingScript.remove();

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MovingCompany",
          "@id": `https://supersouthpackers.com/packers-and-movers-in-${location.slug}#movingcompany`,
          "name": `Super South Packers & Movers - ${location.fullName}`,
          "image": "https://supersouthpackers.com/images/hero_truck.jpg",
          "telephone": OFFICIAL_PHONE,
          "email": "support@supersouthpackers.com",
          "url": `https://supersouthpackers.com/packers-and-movers-in-${location.slug}`,
          "priceRange": "₹3400 - ₹32000",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office No 205, 2nd Floor, Vikrant Complex, Plot No 72/73, Sector 19c, Vashi",
            "addressLocality": location.name,
            "addressRegion": "Navi Mumbai, Maharashtra",
            "postalCode": "400705",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": location.coordinates.lat,
            "longitude": location.coordinates.lng
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": location.fullName
            },
            ...location.subAreas.map(sub => ({
              "@type": "Place",
              "name": `${sub}, ${location.name}`
            }))
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": location.rating,
            "reviewCount": location.reviewsCount,
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Relocation Services",
            "itemListElement": location.pricingTable.map(p => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `${p.type} in ${location.name}`
              },
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": p.localPrice
              }
            }))
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": location.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }
      ]
    };

    const script = document.createElement('script');
    script.id = 'jsonld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('jsonld-schema');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [location]);

  const getEffectiveToCity = () => {
    if (toCity === 'other') {
      return customToCity.trim() ? customToCity.trim() : 'Custom All India Destination';
    }
    return toCity;
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (toCity === 'other' && !customToCity.trim()) {
        setCityError('Please enter your destination city name');
        return;
      }
      setCityError('');
      setCurrentStep(2);
    } else {
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
      
      const effectiveTo = getEffectiveToCity();
      setFormSubmitted(true);
      if (onOpenQuoteModal) {
        onOpenQuoteModal({
          fromCity: `${location.name}, Navi Mumbai`,
          toCity: effectiveTo,
          moveType,
          moveDate,
          name: customerName,
          phone: customerPhone
        });
      }
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hi Super South Packers! I am looking for household / vehicle relocation service in ${location.name}, Navi Mumbai. Please share a quote!`;
    return `https://wa.me/919324095460?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-24 lg:pb-20 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 mb-6 uppercase tracking-wider">
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/" className="hover:text-amber-500 transition-colors">Navi Mumbai</Link>
            <span>/</span>
            <span className="text-[#f59e0b] font-bold">{location.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs shadow-sm">
                <ShieldCheck size={16} /> Verified Packers & Movers in {location.name}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#13345b] dark:text-white tracking-tight leading-tight font-heading">
                {location.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium dark:text-slate-300 leading-relaxed">
                {location.intro}
              </p>

              {/* Trust Cards */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 text-xs font-bold text-[#13345b] dark:text-slate-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" /> Fully Insured Transit
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 text-xs font-bold text-[#13345b] dark:text-slate-200 shadow-sm">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" /> Zero-Damage Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 text-xs font-bold text-[#13345b] dark:text-slate-200 shadow-sm">
                  <Clock size={14} className="text-cyan-600" /> {location.transitTimeSouthIndia}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs">
                  ★ {location.rating} ({location.reviewsCount}+ Local Reviews)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={TEL_LINK}
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 text-decoration-none"
                >
                  <Phone size={18} /> One-Tap Call: {OFFICIAL_PHONE}
                </a>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 text-decoration-none"
                >
                  <MessageSquare size={18} /> Book via WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Multi-Step Quote Wizard Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative">
                
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#f59e0b] text-[#13345b] font-extrabold text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles size={12} /> {location.name} Quote Wizard
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
                      Thank you, <strong className="text-[#f59e0b]">{customerName || 'Valued Customer'}</strong>! Our move coordinator will call you back within 15 minutes to confirm details for moving from <strong>{location.name}</strong> to <strong>{getEffectiveToCity()}</strong>.
                    </p>

                    <a
                      href={TEL_LINK}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md text-decoration-none"
                    >
                      <Phone size={16} /> Call {OFFICIAL_PHONE} Now
                    </a>

                    <button
                      onClick={() => { setFormSubmitted(false); setCurrentStep(1); setToCity('Local Shifting'); setCustomToCity(''); setCityError(''); }}
                      className="text-xs text-slate-700 font-medium hover:text-[#f59e0b] underline cursor-pointer block mx-auto pt-2"
                    >
                      Recalculate Estimate
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Step Bar */}
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
                          2. Contact & Date
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                      {currentStep === 1 ? (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                              <MapPin size={13} className="text-[#f59e0b]" /> Pickup Location
                            </label>
                            <input
                              type="text"
                              disabled
                              value={`${location.name}, Navi Mumbai`}
                              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white text-sm font-bold opacity-90 cursor-not-allowed"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                              <MapPin size={13} className="text-[#f59e0b]" /> Destination City
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
                                className="w-full p-3 rounded-xl bg-amber-500/10 dark:bg-slate-800 border-2 border-amber-500 text-[#13345b] dark:text-white text-sm font-bold focus:outline-none placeholder:font-normal placeholder:text-slate-400"
                              />
                              {cityError && (
                                <p className="text-[11px] font-bold text-red-500">{cityError}</p>
                              )}
                            </div>
                          )}

                          <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                              <Truck size={13} className="text-[#f59e0b]" /> Move Property Type
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
                              <option value="office" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold">Corporate Office Shift</option>
                              <option value="vehicle" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold">Car / Bike Transport</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3.5 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                          >
                            Next Step <ArrowRight size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                              <Calendar size={13} className="text-[#f59e0b]" /> Preferred Shifting Date
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
                              className="flex-1 py-3.5 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                            >
                              Get {location.name} Quote <Send size={16} />
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

      {/* Local Highlights & Office Proximity Badge */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Highlights Box */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs">
                <Building2 size={15} /> Local Hub Proximity & Coverage
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#13345b] dark:text-white font-heading">
                Comprehensive Moving Coverage Across {location.name}
              </h2>

              <p className="text-sm text-slate-700 font-medium dark:text-slate-300 leading-relaxed">
                Our main registered Navi Mumbai headquarters at <strong>Vashi (Sector 19c)</strong> provides rapid response teams to {location.name} within 15 to 20 minutes for packing, survey, and pickup operations.
              </p>

              {/* Proximity Badge Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-300 space-y-1 font-medium">
                <div className="font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <MapPin size={16} /> Regional Hub Office Address:
                </div>
                <div>Office No 205, 2nd Floor, Vikrant Complex, Plot No 72/73, Sector 19c, Vashi, Navi Mumbai, 400705</div>
              </div>

              {/* Landmarks */}
              <div className="space-y-2">
                <span className="block text-xs font-extrabold text-[#13345b] dark:text-white uppercase tracking-wider">
                  📍 Key Landmarks Served in {location.name}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {location.landmarks.map((lm, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 text-xs font-bold text-[#13345b] dark:text-slate-200">
                      {lm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div className="space-y-2">
                <span className="block text-xs font-extrabold text-[#13345b] dark:text-white uppercase tracking-wider">
                  🏠 Covered Sectors & Localities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {location.subAreas.map((sub, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200/80 dark:bg-slate-800 dark:border-slate-700 text-xs font-bold text-[#13345b] dark:text-slate-200">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Localized Pricing Matrix Table */}
            <div className="lg:col-span-5">
              <div className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-950 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-[#13345b] dark:text-white flex items-center gap-2">
                    <Calculator size={18} className="text-[#f59e0b]" /> {location.name} Rate Matrix
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-[11px]">
                    Transparent Pricing
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-extrabold">
                        <th className="pb-2">Move Type</th>
                        <th className="pb-2 text-right">Local Shifting</th>
                        <th className="pb-2 text-right">Interstate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-medium">
                      {location.pricingTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-500/5 transition-colors">
                          <td className="py-2.5 font-bold text-[#13345b] dark:text-slate-200">{row.type}</td>
                          <td className="py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">{row.localPrice}</td>
                          <td className="py-2.5 text-right text-amber-600 dark:text-amber-400 font-bold">{row.interstatePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-[11px] text-slate-700 font-medium dark:text-slate-400 text-center">
                  *Rates include packing material, labor, loading & transit insurance.
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Cost Estimator Component Embedded */}
      <CostEstimator
        prefillData={{ fromCity: `${location.name}, Navi Mumbai` }}
        onBookWithQuote={(quote) => onOpenQuoteModal(quote)}
      />

      {/* Local Customer Reviews Carousel */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div>
            <span className="text-[#f59e0b] dark:text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-2">Verified Local Customer Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#13345b] dark:text-white font-heading">
              What Residents in {location.name} Say
            </h2>
          </div>

          <div className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-950 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 text-left relative space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" />
                ))}
                <span className="ml-2 text-xs font-bold text-[#13345b] dark:text-slate-300">5.0 / 5.0 Rating</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveReviewIdx((prev) => (prev > 0 ? prev - 1 : location.reviews.length - 1))}
                  className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#13345b] dark:text-slate-300 flex items-center justify-center hover:bg-[#f59e0b] cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveReviewIdx((prev) => (prev < location.reviews.length - 1 ? prev + 1 : 0))}
                  className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#13345b] dark:text-slate-300 flex items-center justify-center hover:bg-[#f59e0b] cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <p className="text-base text-slate-700 font-medium dark:text-slate-200 italic leading-relaxed">
              "{location.reviews[activeReviewIdx]?.comment || location.reviews[0].comment}"
            </p>

            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 text-xs text-slate-500">
              <div>
                <strong className="text-[#13345b] dark:text-white text-sm block font-extrabold">
                  {location.reviews[activeReviewIdx]?.author || location.reviews[0].author}
                </strong>
                <span className="text-slate-700 font-medium dark:text-slate-400">Resident, {location.reviews[activeReviewIdx]?.locality || location.reviews[0].locality}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={14} /> Verified {location.name} Customer
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Localized FAQs Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#f59e0b] dark:text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-2">Area Specific Answers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#13345b] dark:text-white font-heading">
              Frequently Asked Questions - {location.name} Moving
            </h2>
          </div>

          <div className="space-y-4">
            {location.faqs.map((faq, i) => (
              <div key={i} className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-5 space-y-2">
                <h3 className="text-base font-extrabold text-[#13345b] dark:text-amber-400 flex items-start gap-2">
                  <HelpCircle size={18} className="mt-0.5 shrink-0 text-[#f59e0b]" />
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-700 font-medium dark:text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interlinking Grid to Other Navi Mumbai Nodes */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#f59e0b] dark:text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-2">Navi Mumbai Regional Network</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#13345b] dark:text-white font-heading">
              Explore Packers & Movers in Nearby Navi Mumbai Nodes
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {NAVI_MUMBAI_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                to={`/packers-and-movers-in-${loc.slug}`}
                className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                  loc.slug === location.slug
                    ? 'bg-[#13345b]/10 border-[#13345b] text-[#13345b] dark:bg-amber-500/20 dark:border-amber-500 dark:text-amber-400 font-bold'
                    : 'bg-white border-slate-300 dark:bg-slate-950 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-[#13345b]'
                }`}
              >
                <MapPin size={14} className="mx-auto mb-1 opacity-70" />
                <span className="text-xs block truncate font-bold">{loc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
