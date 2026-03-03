import { Star, MessageSquare, ThumbsUp } from "lucide-react";

const ReviewCard = ({ name, date, comment, stars }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-md transition-all duration-200 group">
    <div className="flex justify-between items-start gap-3 mb-4">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md flex-shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Stars Badge */}
      <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-xl flex-shrink-0">
        <Star size={12} className="fill-amber-400 text-amber-400" />
        <span className="text-amber-600 font-extrabold text-xs">{stars}.0</span>
      </div>
    </div>

    {/* Stars Row */}
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < stars ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"}
        />
      ))}
    </div>

    {/* Comment */}
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-100">
      <p className="text-sm text-gray-600 leading-relaxed">"{comment}"</p>
    </div>

    {/* Footer */}
    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
      <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 transition-colors font-medium">
        <ThumbsUp size={12} /> Helpful
      </button>
      <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 transition-colors font-medium">
        <MessageSquare size={12} /> Reply
      </button>
    </div>
  </div>
);

export const ReviewSection = () => {
  const reviews = [
    { name: "Somnath Barangule", date: "2025-01-25T07:31:56.051Z", comment: "The quality exceeded my expectations. Fits perfectly!", stars: 4 },
    { name: "Ibrahim Pk", date: "2025-09-20T12:39:03.639Z", comment: "Highly recommended for gym and running. Nice fabric.", stars: 5 },
  ];

  const avgRating = (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1);

  return (
    <div className="mt-12 md:mt-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-extrabold text-xl text-gray-900">Customer Feedback</h3>
          <p className="text-xs text-gray-400 mt-1">{reviews.length} reviews · {avgRating} avg rating</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
          <MessageSquare size={13} />
          Write a Review
        </button>
      </div>

      {/* Average Rating Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 mb-6 flex items-center gap-5 text-white shadow-lg">
        <div className="text-center">
          <div className="text-4xl font-black">{avgRating}</div>
          <div className="flex justify-center gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.round(avgRating) ? "fill-amber-300 text-amber-300" : "fill-white/20 text-white/20"} />
            ))}
          </div>
          <div className="text-[10px] text-blue-200 mt-1 font-medium">out of 5</div>
        </div>
        <div className="h-12 w-px bg-white/20" />
        <div className="text-sm">
          <p className="font-bold text-lg">{reviews.length} Reviews</p>
          <p className="text-blue-200 text-xs">Verified customers</p>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid gap-4 max-w-full md:max-w-2xl">
        {reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
      </div>
    </div>
  );
};

export default ReviewSection;