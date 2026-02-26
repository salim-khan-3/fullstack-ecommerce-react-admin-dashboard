import { useState, useEffect } from "react";
import {
  Home,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight as ChevronR,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";
import { getAllCategories } from "../../../api/categoryApi";

const ITEMS_PER_PAGE = 12;

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);

  // ✅ API থেকে data fetch
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(Array.isArray(data) ? data : data.categories || []);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = categories.slice(start, start + ITEMS_PER_PAGE);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const ids = currentData.map((d) => d._id);
    const allSelected = ids.every((id) => selected.includes(id));
    if (allSelected) setSelected((prev) => prev.filter((x) => !ids.includes(x)));
    else setSelected((prev) => [...new Set([...prev, ...ids])]);
  };

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

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-sm font-medium text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 text-center max-w-sm">
          <p className="text-red-500 font-semibold text-lg mb-2">Something went wrong!</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-100 p-4 md:p-8"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── Breadcrumb Header ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Category List</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} className="text-gray-400" />
          <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">Category</span>
        </nav>
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* ── THEAD ── */}
            <thead>
              <tr style={{ backgroundColor: "#2979ff" }}>
                {/* Checkbox */}
                <th className="px-5 py-4 w-14">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-white"
                    onChange={toggleAll}
                    checked={
                      currentData.length > 0 &&
                      currentData.every((d) => selected.includes(d._id))
                    }
                  />
                </th>
                {/* UID */}
                <th className="px-4 py-4 text-left text-xs font-bold tracking-widest uppercase text-white w-20">
                  UID
                </th>
                {/* IMAGE — wide column like screenshot */}
                <th className="px-4 py-4 text-left text-xs font-bold tracking-widest uppercase text-white w-64">
                  IMAGE
                </th>
                {/* CATEGORY */}
                <th className="px-4 py-4 text-left text-xs font-bold tracking-widest uppercase text-white">
                  CATEGORY
                </th>
                {/* COLOR */}
                <th className="px-4 py-4 text-left text-xs font-bold tracking-widest uppercase text-white w-36">
                  COLOR
                </th>
                {/* ACTION */}
                <th className="px-4 py-4 text-left text-xs font-bold tracking-widest uppercase text-white w-36">
                  ACTION
                </th>
              </tr>
            </thead>

            {/* ── TBODY ── */}
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : (
                currentData.map((row, idx) => (
                  <tr
                    key={row._id}
                    className="border-t border-gray-100 hover:bg-blue-50 transition-colors duration-100"
                    style={{ backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9f9f9" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f7ff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        idx % 2 === 0 ? "#ffffff" : "#f9f9f9")
                    }
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer accent-blue-600"
                        checked={selected.includes(row._id)}
                        onChange={() => toggleSelect(row._id)}
                      />
                    </td>

                    {/* UID */}
                    <td className="px-4 py-4 text-sm text-gray-500 font-medium">
                      #{start + idx + 1}
                    </td>

                    {/* IMAGE — large thumbnail like screenshot */}
                    <td className="px-4 py-3">
                      <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                        <img
                          src={Array.isArray(row.images) ? row.images[0] : row.image}
                          alt={row.name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            e.target.src = "https://img.icons8.com/color/96/t-shirt.png";
                          }}
                        />
                      </div>
                    </td>

                    {/* CATEGORY name */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-gray-700">{row.name}</span>
                    </td>

                    {/* COLOR — hex code text only like screenshot */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 font-mono">
                        {row.color || "—"}
                      </span>
                    </td>

                    {/* ACTION — 👁️ ✏️ 🗑️ like screenshot */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {/* View */}
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                          style={{ backgroundColor: "#fce4ec", color: "#e91e63" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f48fb1")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fce4ec")}
                        >
                          <Eye size={14} />
                        </button>
                        {/* Edit */}
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                          style={{ backgroundColor: "#e8f5e9", color: "#43a047" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a5d6a7")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e8f5e9")}
                        >
                          <Pencil size={14} />
                        </button>
                        {/* Delete */}
                        <button
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                          style={{ backgroundColor: "#ffebee", color: "#e53935" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ef9a9a")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffebee")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-white">
          <p className="text-sm text-gray-500">
            showing{" "}
            <span className="font-bold text-gray-800">
              {Math.min(ITEMS_PER_PAGE, currentData.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-800">{categories.length}</span>{" "}
            results
          </p>

          <div className="flex items-center gap-1">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronsLeft size={15} />
            </button>

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span key={`e-${i}`} className="px-1 text-gray-400 text-sm select-none">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150"
                  style={{
                    backgroundColor: currentPage === page ? "#2979ff" : "transparent",
                    color: currentPage === page ? "#ffffff" : "#6b7280",
                  }}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronR size={15} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-colors"
            >
              <ChevronsRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}