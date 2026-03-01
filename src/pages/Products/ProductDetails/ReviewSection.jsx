import { Star } from "lucide-react";

const ReviewCard = ({ name, date, comment, stars }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col gap-4 transition-all hover:border-blue-100 hover:shadow-sm">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm leading-none">{name}</h4>
          <p className="text-[11px] text-gray-400 mt-1">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < stars ? "text-orange-400 fill-orange-400" : "text-gray-200"} />
        ))}
      </div>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed font-normal bg-gray-50 p-3 rounded-xl italic">
      "{comment}"
    </p>
  </div>
);

export const ReviewSection = () => {
  const reviews = [
    { name: "Somnath Barangule", date: "2025-01-25T07:31:56.051Z", comment: "The quality exceeded my expectations. Fits perfectly!", stars: 4 },
    { name: "Ibrahim Pk", date: "2025-09-20T12:39:03.639Z", comment: "Highly recommended for gym and running. Nice fabric.", stars: 5 },
  ];

  return (
    <div className="mt-12 md:mt-16 max-w-full md:max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-extrabold text-xl text-gray-900">Customer Feedback</h3>
        <span className="text-sm text-blue-600 font-bold underline cursor-pointer">Write a review</span>
      </div>
      <div className="grid gap-6">
        {reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
      </div>
    </div>
  );
};

export default ReviewSection;