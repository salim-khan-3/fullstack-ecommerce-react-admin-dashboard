import { useState } from "react";
import { Link } from "react-router-dom";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export default function PageHeader() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex items-center w-full">
      <div className="w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">

          {/* Left - Title */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 shrink-0" />
            <h1 className="text-gray-800 font-bold text-lg tracking-tight">
              Product List
            </h1>
          </div>

          {/* Right - Breadcrumb + Button */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm">
              <a
                href="#"
                className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                <HomeIcon />
                <span>Dashboard</span>
              </a>
              <ChevronIcon />
              <span className="text-gray-800 font-semibold">Products</span>
            </nav>

            {/* Divider - hidden on small screens */}
            <div className="hidden sm:block w-px h-6 bg-gray-200" />

            {/* Add Product Button */}
            <Link to={"/product/upload"}
              onClick={() => setClicked(!clicked)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:shadow-blue-300 transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <PlusIcon />
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}