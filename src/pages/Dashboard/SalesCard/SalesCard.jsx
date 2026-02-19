import React from "react";
import { MoreVertical } from "lucide-react";

const SalesCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-md">
      
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm opacity-90">Total Sales</h4>
          <h2 className="text-2xl font-bold mt-2">
            $3,787,681.00
          </h2>
          <p className="text-sm opacity-90 mt-1">
            $3,578.90 in last month
          </p>
        </div>

        <MoreVertical size={18} className="opacity-80 cursor-pointer" />
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 flex justify-center">
        <div className="w-40 h-40 rounded-full border-8 border-white/30 flex items-center justify-center text-sm">
          Chart
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
