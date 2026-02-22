import React from "react";
import { MoreHorizontal, Search, ChevronDown } from "lucide-react";

const TableFilters = () => {
  const filterGroups = [
    { label: "SHOW BY", options: ["12 Row", "24 Row", "50 Row"], defaultValue: "12 Row" },
    { label: "CATEGORY BY", options: ["Mans", "Womans", "Kids"], defaultValue: "Mans" },
    { label: "BRAND BY", options: ["Ecstasy", "Richman", "Lubana"], defaultValue: "Ecstasy" },
  ];

  return (
    <div className="p-6 bg-white rounded-t-2xl border-b border-gray-100 shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Best Selling Products</h2>
          <p className="text-xs text-gray-400 mt-1 font-medium">Manage and filter your top performing products</p>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-all">
          <MoreHorizontal size={22} />
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filterGroups.map((group) => (
          <div key={group.label} className="group">
            <label className="block text-[11px] font-bold text-gray-500 tracking-[0.05em] uppercase mb-2.5 ml-1 transition-colors group-focus-within:text-blue-600">
              {group.label}
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#f8fafc] border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-700 font-medium outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all cursor-pointer">
                {group.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                <ChevronDown size={16} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        ))}

        {/* Search Section */}
        <div className="group">
          <label className="block text-[11px] font-bold text-gray-500 tracking-[0.05em] uppercase mb-2.5 ml-1 group-focus-within:text-blue-600">
            SEARCH BY
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="id / name / category / brand..."
              className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;