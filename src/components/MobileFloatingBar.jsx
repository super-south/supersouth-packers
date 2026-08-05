import React from 'react';
import { PhoneCall, MessageSquare, Calculator } from 'lucide-react';

export default function MobileFloatingBar({ onOpenQuoteModal }) {
  const OFFICIAL_PHONE = '+91 93240 95460';
  const TEL_LINK = 'tel:+919324095460';

  const generateWhatsAppLink = () => {
    const text = `Hi Super South Packers! I am interested in getting a quick shifting quote for my household / vehicle move.`;
    return `https://wa.me/919324095460?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-[#13345b]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700/80 p-2.5 shadow-2xl flex items-center gap-2 transition-colors duration-300">
      <a
        href={TEL_LINK}
        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-500 text-center text-decoration-none shadow-md"
      >
        <PhoneCall size={16} /> Call Now
      </a>

      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 text-center text-decoration-none shadow-md"
      >
        <MessageSquare size={16} /> WhatsApp
      </a>

      <button
        onClick={() => onOpenQuoteModal()}
        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#13345b] font-extrabold text-xs flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20 cursor-pointer"
      >
        <Calculator size={15} /> Quote
      </button>
    </div>
  );
}
