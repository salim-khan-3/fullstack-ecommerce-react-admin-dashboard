import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, totalItems, currentCount, onPageChange }) => {
  // যদি কোনো ডেটা না থাকে বা পেজ ১টিই হয়, তবে পাজিনেশন দেখানোর দরকার নেই (ঐচ্ছিক)
  if (totalPages <= 1 && totalItems > 0) {
      // আপনি চাইলে এখানে কিছু রিটার্ন না করে হাইড রাখতে পারেন
  }

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++)
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white">
      <p className="text-sm text-gray-500">
        Showing <span className="font-bold text-gray-800">{currentCount}</span> of{" "}
        <span className="font-bold text-gray-800">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-1">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
        >
          <ChevronsLeft size={15} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        {getPageNumbers().map((page, i) => (
          <button
            key={i} // '...' এর জন্য ইউনিক কি দরকার তাই i ব্যবহার করা হয়েছে
            onClick={() => typeof page === "number" && onPageChange(page)}
            className="w-9 h-9 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: currentPage === page ? "#2979ff" : "transparent",
              color: currentPage === page ? "#fff" : "#6b7280",
              cursor: page === "..." ? "default" : "pointer",
            }}
          >
            {page}
          </button>
        ))}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={15} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
        >
          <ChevronsRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;





// import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// const Pagination = ({ currentPage, totalPages, totalItems, currentCount, onPageChange }) => {
//   const getPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       if (currentPage > 3) pages.push("...");
//       for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++)
//         pages.push(i);
//       if (currentPage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }
//     return pages;
//   };

//   return (
//     <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white">
//       <p className="text-sm text-gray-500">
//         Showing <span className="font-bold text-gray-800">{currentCount}</span> of{" "}
//         <span className="font-bold text-gray-800">{totalItems}</span> results
//       </p>

//       <div className="flex items-center gap-1">
//         <button
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//           className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
//         >
//           <ChevronsLeft size={15} />
//         </button>

//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
//         >
//           <ChevronLeft size={15} />
//         </button>

//         {getPageNumbers().map((page, i) => (
//           <button
//             key={i}
//             onClick={() => typeof page === "number" && onPageChange(page)}
//             className="w-9 h-9 rounded-lg text-sm font-semibold transition-all"
//             style={{
//               backgroundColor: currentPage === page ? "#2979ff" : "transparent",
//               color: currentPage === page ? "#fff" : "#6b7280",
//               cursor: page === "..." ? "default" : "pointer",
//             }}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
//         >
//           <ChevronRight size={15} />
//         </button>

//         <button
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//           className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
//         >
//           <ChevronsRight size={15} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;