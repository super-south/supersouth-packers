import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How is the final shifting cost calculated by Super South Packers & Movers?',
    a: 'Our quotes are completely transparent and based on four key factors: (1) Total volume of goods / move size (e.g. 2BHK vs 3BHK), (2) Highway distance between pickup and delivery cities, (3) Selected packaging tier (Standard vs Multi-Layer Waterproof Crating), and (4) Floor elevation/lift access. There are zero hidden costs or post-delivery surprises.'
  },
  {
    q: 'What protective packing materials are used for fragile items like TVs and glassware?',
    a: 'We use heavy-duty 5-layer corrugated boxes, multi-density bubble wrap, stretch film wrap, foam corner guards, and customized wooden crates for high-end electronics, marble tops, mirrors, and delicate crockery.'
  },
  {
    q: 'How does your 100% Transit Damage Guarantee work?',
    a: 'We provide full transit insurance coverage with zero deductible. Before loading, our team creates a detailed pre-transit inventory condition report signed by you. In the rare case of any transit damage, our fast-track claims desk reimburses full repair or replacement value within 48 to 72 hours.'
  },
  {
    q: 'Can I track my consignment truck live during transit?',
    a: 'Yes! Every Super South container truck is fitted with dual GPS sensors. Once loaded, you receive a direct Lorry Receipt (LR) tracking ID (e.g., SSP-98241) to monitor live highway location, driver contact, and real-time estimated arrival time.'
  },
  {
    q: 'Do your movers disassemble and re-assemble furniture and appliances?',
    a: 'Yes, our experienced carpenters and technicians handle full disassembly and re-assembly of cot bed frames, dining tables, modular wardrobes, and basic mounting of TVs and washing machines at the destination.'
  },
  {
    q: 'How early should I book my relocation slot?',
    a: 'We recommend booking 3 to 7 days in advance to secure your preferred date and morning pickup slot. However, for urgent requirements, we also offer express same-day / next-day relocation slots.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered FAQ Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs shadow-sm mb-3">
            <HelpCircle size={14} /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#13345b] dark:text-white tracking-tight mb-4 font-heading text-center">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-700 font-medium dark:text-slate-300 text-base leading-relaxed text-center">
            Everything you need to know about our packing procedures, transit safety, insurance, and booking process.
          </p>
        </div>

        {/* Accordion Container centered in max-w-3xl mx-auto */}
        <div className="max-w-3xl mx-auto space-y-4 px-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-2xl overflow-hidden ${
                  isOpen ? 'border-[#f59e0b] dark:border-amber-500' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-base sm:text-lg font-bold text-[#13345b] dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#f59e0b] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-700 font-medium dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
