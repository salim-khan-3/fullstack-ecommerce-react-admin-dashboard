import React, { useState } from "react";
import { MoreHorizontal, Search, ChevronDown, Filter, X, Check } from "lucide-react";

const TableFilters = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filterGroups = [
    { id: "show", label: "SHOW BY", options: ["12 Row", "24 Row", "50 Row"], current: "12 Row" },
    { id: "cat", label: "CATEGORY BY", options: ["Mans", "Womans", "Kids"], current: "Mans" },
    { id: "brand", label: "BRAND BY", options: ["Ecstasy", "Richman", "Lubana"], current: "Ecstasy" },
  ];

  return (
    <div className="p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      
      {/* Header with Glassmorphism pill */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Best Selling Products</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2 ml-4 font-medium italic">"Real-time analytics & product tracking"</p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button className="px-4 py-2 bg-white shadow-sm rounded-xl text-xs font-bold text-gray-700 hover:text-blue-600 transition-all uppercase tracking-wider">
            Export Data
          </button>
          <button className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Modern Filter Interface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filterGroups.map((group) => (
          <div key={group.id} className="relative">
            <label className="block text-[10px] font-black text-blue-600/60 tracking-[0.2em] mb-3 ml-1 uppercase">
              {group.label}
            </label>
            
            <button 
              onClick={() => setActiveFilter(activeFilter === group.id ? null : group.id)}
              className="w-full flex items-center justify-between bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-700 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_20px_rgba(0,0,0,0.04)] transition-all group"
            >
              <span className="group-hover:text-blue-600 transition-colors">{group.current}</span>
              <ChevronDown size={16} className={`text-gray-400 group-hover:text-blue-500 transition-transform duration-300 ${activeFilter === group.id ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Dropdown Menu */}
            {activeFilter === group.id && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-50 p-2 z-50 animate-in fade-in zoom-in duration-200">
                {group.options.map((opt) => (
                  <button 
                    key={opt}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl text-sm font-semibold text-gray-600 hover:text-blue-700 transition-all text-left"
                  >
                    {opt}
                    {group.current === opt && <Check size={14} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Dynamic Search Bar */}
        <div className="relative">
          <label className="block text-[10px] font-black text-blue-600/60 tracking-[0.2em] mb-3 ml-1 uppercase">
            Quick Search
          </label>
          <div className="relative group">
            <input
              type="text"
              placeholder="id / name / category..."
              className="w-full bg-gray-900 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm text-white placeholder-gray-500 focus:ring-4 focus:ring-blue-500/20 shadow-lg transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={18} />
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Updates Enabled</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">
            <X size={16} />
            Clear All
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 rounded-2xl text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-none hover:translate-y-0.5 transition-all active:scale-95">
            <Filter size={16} />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;