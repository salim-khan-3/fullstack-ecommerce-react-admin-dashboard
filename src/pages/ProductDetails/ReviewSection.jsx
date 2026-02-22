import React from 'react';
import { User, Star } from 'lucide-react';

const ReviewCard = ({ name, date, comment, stars }) => (
  <div className="bg-[#f3f4f6] p-4 rounded-lg flex justify-between items-start mb-4 shadow-sm">
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
        <User size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-700 text-sm">{name}</h4>
        <p className="text-[10px] text-gray-400">{date}</p>
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          ))}
        </div>
      </div>
    </div>
    <p className="text-xs text-gray-500 italic">"{comment}"</p>
  </div>
);

const ReviewSection = () => {
  const reviews = [
    { name: "somnath barangule", date: "2025-01-25T07:31:56.051Z", comment: "jhvgv", stars: 3 },
    { name: "Alexander R", date: "2025-03-17T14:28:19.561Z", comment: "y7y", stars: 1 },
    { name: "ibrahim pk", date: "2025-09-20T12:39:03.639Z", comment: "Nice", stars: 5 },
  ];

  return (
    <div className="mt-10">
      <h3 className="font-bold text-gray-700 mb-6">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((rev, i) => <ReviewCard key={i} {...rev} />)}
      </div>
    </div>
  );
};

export default ReviewSection;