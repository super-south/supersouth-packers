import React, { useState } from 'react';
import { Star, CheckCircle2, PlusCircle } from 'lucide-react';

const REVIEWS_LIST = [
  {
    id: 1,
    name: 'Suresh & Lakshmi Iyer',
    route: 'Bangalore (HSR) ➔ Chennai (Adyar)',
    moveType: '3 BHK Villa Move',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Super South Packers were outstanding! They brought high-grade heavy bubble wrap for our 65-inch OLED TV and wooden sofa set. Not a single scratch on any item during the 350km transit.',
    verified: true,
    badge: 'Zero-Damage Guarantee'
  },
  {
    id: 2,
    name: 'Dr. Rahul Menon',
    route: 'Navi Mumbai (Kharghar) ➔ Hyderabad',
    moveType: 'Car & 2 BHK Move',
    rating: 5,
    date: '1 month ago',
    comment: 'Relocated both my Honda Creta car and entire household goods from Kharghar. The live GPS tracking link kept me updated throughout the highway journey. Driver Ramesh was polite and prompt.',
    verified: true,
    badge: 'Fully Insured'
  },
  {
    id: 3,
    name: 'Deepika Sundar',
    route: 'Vashi, Navi Mumbai ➔ Coimbatore',
    moveType: '2 BHK Apartment',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The packing team arrived at 8:00 AM sharp in Vashi with custom boxes. Unpacking and assembling our heavy king-size bed at the destination was handled flawlessly.',
    verified: true,
    badge: 'Verified Resident'
  },
  {
    id: 4,
    name: 'Venkatesh Rao (Tech Lead)',
    route: 'Airoli (Mindspace) ➔ Bangalore',
    moveType: 'Office & IT Workstations',
    rating: 5,
    date: 'Just recently',
    comment: 'Shifted our 15-person software office over the weekend from Airoli. All dual monitors, servers, and ergonomic chairs were safely delivered without breaking Monday ops.',
    verified: true,
    badge: 'Corporate Move'
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS_LIST);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRoute, setNewRoute] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newName || !newComment) return;
    
    const newRev = {
      id: Date.now(),
      name: newName,
      route: newRoute || 'Local Shifting',
      moveType: 'Verified Customer Move',
      rating: Number(newRating),
      date: 'Just now',
      comment: newComment,
      verified: true,
      badge: 'Verified Customer'
    };

    setReviews([newRev, ...reviews]);
    setSuccessMsg(true);
    setTimeout(() => {
      setShowForm(false);
      setSuccessMsg(false);
      setNewName('');
      setNewRoute('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-xs shadow-sm mb-3">
              <Star size={14} /> Verified Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#13345b] dark:text-white tracking-tight mb-3 font-heading">
              Trusted By Over <span className="gradient-text">50,000 Families</span>
            </h2>
            <p className="text-slate-700 font-medium dark:text-slate-300 text-base leading-relaxed">
              Read authentic reviews from customers in Navi Mumbai, Bangalore, Chennai, Hyderabad, Kochi, and across South India.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-black text-[#f59e0b] leading-none mb-1 font-heading">
                4.9
              </div>
              <div className="flex justify-center gap-1 text-[#f59e0b] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" />
                ))}
              </div>
              <div className="text-[11px] text-slate-700 font-bold dark:text-slate-400 uppercase tracking-wider">Out of 5 Stars</div>
            </div>

            <div className="flex-1 space-y-2 text-xs border-l border-slate-200 dark:border-slate-800 pl-6 font-medium">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Item Safety & Protection:</span>
                <strong className="text-[#f59e0b] font-bold">5.0 / 5</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>On-Time Arrival:</span>
                <strong className="text-[#f59e0b] font-bold">4.9 / 5</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Staff Courtesy:</span>
                <strong className="text-[#f59e0b] font-bold">4.9 / 5</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span>Price Transparency:</span>
                <strong className="text-[#f59e0b] font-bold">4.8 / 5</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-[#f59e0b]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" />
                    ))}
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-[#13345b]/10 text-[#13345b] font-semibold border border-[#13345b]/20 dark:bg-amber-500/10 dark:text-amber-400 text-[10px]">
                    {rev.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium dark:text-slate-300 italic mb-4 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#13345b] dark:text-white">{rev.name}</h4>
                  <span className="text-[11px] text-[#f59e0b] dark:text-amber-400 block font-semibold">{rev.route}</span>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Trigger */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-full border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <PlusCircle size={16} /> Share Your Moving Experience
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content p-6 bg-white dark:bg-slate-900 text-[#13345b] dark:text-white border-2 border-slate-200 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-[#13345b] dark:text-white mb-2">Write a Customer Review</h3>
              <p className="text-xs text-slate-700 font-medium dark:text-slate-400 mb-4">Your feedback helps families choose safe relocation services!</p>

              {successMsg ? (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-center font-bold text-sm">
                  🎉 Thank you! Your review has been posted.
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium dark:text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium dark:text-slate-300 mb-1">Moving Route (e.g. Vashi to Bangalore)</label>
                    <input
                      type="text"
                      placeholder="e.g. Vashi ➔ Bangalore"
                      value={newRoute}
                      onChange={(e) => setNewRoute(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium dark:text-slate-300 mb-1">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium focus:outline-none"
                    >
                      <option value="5" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">5 Stars - Outstanding</option>
                      <option value="4" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">4 Stars - Very Good</option>
                      <option value="3" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">3 Stars - Average</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium dark:text-slate-300 mb-1">Comments *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share details about packing quality and timeliness..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-[#13345b] dark:text-white focus:border-[#13345b] dark:focus:border-amber-500 font-medium focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#13345b] font-bold shadow-md hover:shadow-lg transition-transform active:scale-95">
                      Submit Review
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="py-3 px-4 rounded-xl border-2 border-[#13345b] text-[#13345b] hover:bg-[#13345b] hover:text-white font-bold dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
