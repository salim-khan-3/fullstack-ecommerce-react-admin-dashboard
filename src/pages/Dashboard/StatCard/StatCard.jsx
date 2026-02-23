import React, { useState, useEffect, useRef } from 'react';
import { Users, ShoppingCart, ShoppingBag, Star, MoreVertical, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const StatCard = () => {
  const stats = [
    { title: "Total Users", value: "277", change: "+ 95%", color: "from-green-500 to-green-600", icon: <Users size={20} />, bgIcon: <TrendingUp size={120} /> },
    { title: "Total Orders", value: "338", change: "+ 30%", color: "from-fuchsia-500 to-fuchsia-600", icon: <ShoppingCart size={20} />, bgIcon: <TrendingDown size={120} /> },
    { title: "Total Products", value: "557", change: "+ 25%", color: "from-blue-500 to-blue-600", icon: <ShoppingBag size={20} />, bgIcon: <TrendingDown size={120} /> },
    { title: "Total Reviews", value: "166", change: "+ 45%", color: "from-amber-500 to-amber-600", icon: <Star size={20} />, bgIcon: <TrendingUp size={120} /> }
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollRef = useRef(null);

  // --- Auto Scroll Logic ---
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      // যদি স্ক্রল একদম শেষে পৌঁছে যায়, তবে আবার শুরুতে ফিরে আসবে
      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // স্ক্রিনের সাইজ অনুযায়ী কিছুটা ডানে স্ক্রল করবে
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000); // প্রতি ৩ সেকেন্ডে স্ক্রল হবে

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-50 overflow-hidden">
      {/* Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-6 md:pb-0 scroll-smooth no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        
        {/* Left 4 Cards */}
        <div className="flex flex-nowrap md:grid md:grid-cols-2 gap-6 shrink-0 md:col-span-2">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`relative rounded-2xl p-6 text-white bg-gradient-to-br ${stat.color} shadow-lg h-[180px] w-[280px] sm:w-[320px] md:w-auto shrink-0`}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute right-[-10%] bottom-[-10%] opacity-10 rotate-12">{stat.bgIcon}</div>
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.title}</p>
                  <h2 className="text-4xl font-bold mt-2">{stat.value}</h2>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">{stat.icon}</div>
              </div>

              <div className="mt-8 flex justify-between items-center relative z-20">
                <div className="flex items-center space-x-2">
                  <span className="bg-black/20 px-2 py-0.5 rounded text-xs font-semibold">{stat.change}</span>
                  <span className="text-xs opacity-80 font-medium">Last Month</span>
                </div>
                <button className="opacity-70 hover:opacity-100" onClick={() => setOpenDropdown(index === openDropdown ? null : index)}>
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 5th Card (Total Sales) */}
        <div 
          className="relative rounded-2xl p-6 text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl flex flex-col justify-between overflow-hidden w-[280px] sm:w-[320px] md:w-auto shrink-0 h-[180px] md:h-full min-h-[180px]"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <MoreHorizontal size={20} className="opacity-80" />
          </div>
          <div className="mt-4 relative z-10">
            <div className="flex items-baseline space-x-2">
              <h2 className="text-2xl md:text-3xl font-bold">$3,787,681</h2>
              <span className="text-xs font-medium text-green-300 flex items-center">40.63% <TrendingUp size={12} className="ml-1" /></span>
            </div>
            <p className="text-sm opacity-70 mt-1">$3,578.90 last month</p>
          </div>
          <div className="mt-auto hidden md:block pt-10">
            <svg viewBox="0 0 400 150" className="w-full opacity-40">
              <path d="M0,120 C50,140 80,40 130,80 C180,120 220,50 280,100 C340,150 370,50 400,20 L400,150 L0,150 Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default StatCard;