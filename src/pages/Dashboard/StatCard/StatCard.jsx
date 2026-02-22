import React, { useState } from 'react';
import { Users, ShoppingCart, ShoppingBag, Star, MoreVertical, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const StatCard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "277",
      change: "+ 95%",
      color: "from-green-500 to-green-600",
      icon: <Users size={20} />,
      bgIcon: <TrendingUp size={120} />,
    },
    {
      title: "Total Orders",
      value: "338",
      change: "+ 30%",
      color: "from-fuchsia-500 to-fuchsia-600",
      icon: <ShoppingCart size={20} />,
      bgIcon: <TrendingDown size={120} />,
    },
    {
      title: "Total Products",
      value: "557",
      change: "+ 25%",
      color: "from-blue-500 to-blue-600",
      icon: <ShoppingBag size={20} />,
      bgIcon: <TrendingDown size={120} />,
    },
    {
      title: "Total Reviews",
      value: "166",
      change: "+ 45%",
      color: "from-amber-500 to-amber-600",
      icon: <Star size={20} />,
      bgIcon: <TrendingUp size={120} />,
    }
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const timeOptions = ["Last Day", "Last Week", "Last Month", "Last Year"];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-50 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 4 Cards Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            /* FIX 1: overflow-hidden remove kora hoyeche jate dropdown dekha jay */
            /* FIX 2: rounded-2xl er bhitor watermark katar jonno wrapper use kora hoyeche */
            <div 
              key={index} 
              className={`relative rounded-2xl p-6 text-white bg-gradient-to-br ${stat.color} shadow-lg h-[180px]`}
            >
              {/* Background Watermark Wrapper (Fixed) */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute right-[-10%] bottom-[-10%] opacity-10 rotate-12">
                  {stat.bgIcon}
                </div>
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.title}</p>
                  <h2 className="text-4xl font-bold mt-2">{stat.value}</h2>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  {stat.icon}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center relative z-20">
                <div className="flex items-center space-x-2">
                  <span className="bg-black/20 px-2 py-0.5 rounded text-xs font-semibold">
                    {stat.change}
                  </span>
                  <span className="text-xs opacity-80 font-medium">Last Month</span>
                </div>

                {/* Dropdown Button Section */}
                <div className="relative">
                  <button 
                    className="opacity-70 hover:opacity-100 transition-opacity p-1"
                    onClick={() => toggleDropdown(index)}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openDropdown === index && (
                    <ul className="absolute right-0 bottom-full mb-2 w-36 bg-white text-gray-800 rounded-lg shadow-xl z-50 py-1 border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      {timeOptions.map((option, i) => (
                        <li 
                          key={i} 
                          className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-sm font-medium transition-colors"
                          onClick={() => {
                            console.log(`${option} selected for ${stat.title}`);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Large Card */}
        <div className="md:col-span-1 relative rounded-2xl p-6 text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <button className="opacity-80 hover:opacity-100">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="mt-4 relative z-10">
            <div className="flex items-baseline space-x-2">
              <h2 className="text-3xl font-bold">$3,787,681.00</h2>
              <span className="text-xs font-medium text-green-300 flex items-center">
                40.63% <TrendingUp size={12} className="ml-1" />
              </span>
            </div>
            <p className="text-sm opacity-70 mt-1">$3,578.90 in last month</p>
          </div>
          <div className="mt-auto pt-10">
            <svg viewBox="0 0 400 150" className="w-full opacity-40">
              <path 
                d="M0,120 C50,140 80,40 130,80 C180,120 220,50 280,100 C340,150 370,50 400,20 L400,150 L0,150 Z" 
                fill="rgba(255,255,255,0.2)"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatCard;