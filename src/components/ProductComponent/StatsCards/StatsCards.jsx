import { useState, useEffect, useRef } from "react";

const cards = [
  {
    title: "Total Users",
    value: 8522,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    ),
    bg: "bg-gradient-to-br from-green-400 to-emerald-500",
    glow: "shadow-green-400/40",
  },
  {
    title: "Total Orders",
    value: 428,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.8 6h14.4l-1.7 8H7.4L5.8 6zM1 1h3l.7 3.5"/>
        <path d="M1 1h3l3.6 11.59c.18.58.72.98 1.34.98h9.1c.6 0 1.13-.38 1.33-.95L21.6 6H5.21"/>
      </svg>
    ),
    bg: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    glow: "shadow-fuchsia-400/40",
  },
  {
    title: "Total Products",
    value: 105,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.4-1.4L12 14.2l7.6-7.6L21 8l-9 9z"/>
        <path d="M6 8h2v8H6zm4-3h2v11h-2zm4 5h2v6h-2z"/>
      </svg>
    ),
    bg: "bg-gradient-to-br from-blue-400 to-indigo-500",
    glow: "shadow-blue-400/40",
  },
  {
    title: "Total Reviews",
    value: 364,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    bg: "bg-gradient-to-br from-yellow-400 to-orange-400",
    glow: "shadow-yellow-400/40",
  },
];

function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}</span>;
}

export default function StatsCards() {
  const scrollRef = useRef(null);

  // Auto-scroll logic for mobile/tablet
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (window.innerWidth < 1024) { // Only scroll on mobile/tablet (less than lg)
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollContainer.scrollBy({ left: 250, behavior: "smooth" });
          }
        }
      }, 3000); // 3 seconds interval
    };

    startAutoScroll();
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full p-0 md:py-8 mt-4 md:mt-0 overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`min-w-[280px] md:min-w-[320px] lg:min-w-full snap-center ${card.bg} rounded-2xl p-6 relative overflow-hidden shadow-xl ${card.glow} transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer`}
          >
            {/* Decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
            <div className="absolute -right-1 -bottom-1 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <div className="text-white/30">{card.icon}</div>
            </div>

            <div className="relative z-10">
              <p className="text-white/90 font-semibold text-sm tracking-wide mb-2 uppercase">
                {card.title}
              </p>
              <p className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                <AnimatedNumber target={card.value} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Indicator (Optional) */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        {cards.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );
}





// import { useState, useEffect } from "react";

// const cards = [
//   {
//     title: "Total Users",
//     value: 8522,
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
//         <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
//       </svg>
//     ),
//     gradient: "from-green-400 to-emerald-500",
//     glow: "shadow-green-400/40",
//     bg: "bg-gradient-to-br from-green-400 to-emerald-500",
//   },
//   {
//     title: "Total Orders",
//     value: 428,
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
//         <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.8 6h14.4l-1.7 8H7.4L5.8 6zM1 1h3l.7 3.5"/>
//         <path d="M1 1h3l3.6 11.59c.18.58.72.98 1.34.98h9.1c.6 0 1.13-.38 1.33-.95L21.6 6H5.21"/>
//       </svg>
//     ),
//     gradient: "from-fuchsia-500 to-pink-500",
//     glow: "shadow-fuchsia-400/40",
//     bg: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
//   },
//   {
//     title: "Total Products",
//     value: 105,
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
//         <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.4-1.4L12 14.2l7.6-7.6L21 8l-9 9z"/>
//         <path d="M6 8h2v8H6zm4-3h2v11h-2zm4 5h2v6h-2z"/>
//       </svg>
//     ),
//     gradient: "from-blue-400 to-indigo-500",
//     glow: "shadow-blue-400/40",
//     bg: "bg-gradient-to-br from-blue-400 to-indigo-500",
//   },
//   {
//     title: "Total Reviews",
//     value: 364,
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
//         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
//       </svg>
//     ),
//     gradient: "from-yellow-400 to-orange-400",
//     glow: "shadow-yellow-400/40",
//     bg: "bg-gradient-to-br from-yellow-400 to-orange-400",
//   },
// ];

// function AnimatedNumber({ target }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 1200;
//     const step = Math.ceil(target / (duration / 16));
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 16);
//     return () => clearInterval(timer);
//   }, [target]);

//   return <span>{count.toLocaleString()}</span>;
// }

// export default function StatsCards() {
//   return (
//     <div className="flex items-center justify-center p-8">
//       <div className="grid lg:grid-cols-4 justify-between gap-5 w-full">
//         {cards.map((card, i) => (
//           <div
//             key={i}
//             className={`${card.bg} rounded-2xl p-6 relative overflow-hidden shadow-xl ${card.glow} shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer`}
//           >
//             {/* Background circle decoration */}
//             <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
//             <div className="absolute -right-1 -bottom-1 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
//               <div className="text-white/30">{card.icon}</div>
//             </div>

//             <div className="relative z-10">
//               <p className="text-white/90 font-semibold text-sm tracking-wide mb-2">
//                 {card.title}
//               </p>
//               <p className="text-white text-4xl font-extrabold tracking-tight">
//                 <AnimatedNumber target={card.value} />
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }