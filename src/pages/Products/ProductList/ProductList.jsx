import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/ProductComponent/PageHeader/PageHeader";
import StatsCards from "../../../components/ProductComponent/StatsCards/StatsCards";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import { getAllProducts, getProductsByCategory } from "../../../api/productApi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const fetchProducts = async (categoryId = "", page = 1) => {
    setLoading(true);
    try {
      const data = categoryId
        ? await getProductsByCategory(categoryId)
        : await getAllProducts(page, 6);

      if (categoryId) {
        setProducts(Array.isArray(data.data) ? data.data : []);
        setTotalPages(1);
        setTotalItems(data.count || 0);
      } else {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalItems(data.totalItems || 0);
        setCurrentPage(data.currentPage || 1);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategoryId, currentPage);
  }, [currentPage]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategoryId(categoryId);
    setCurrentPage(1);
    fetchProducts(categoryId, 1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // পেজ নম্বর generate করা
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      <PageHeader />
      <StatsCards />
      <div className="mt-6">
        <TableFilters onCategoryChange={handleCategoryChange} />
        <ProductTable products={products} loading={loading} />

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="bg-white border-x border-b border-gray-100 rounded-b-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Info */}
            <p className="text-xs text-gray-400 font-medium">
              Showing page <span className="text-gray-700 font-bold">{currentPage}</span> of{" "}
              <span className="text-gray-700 font-bold">{totalPages}</span> —{" "}
              <span className="text-gray-700 font-bold">{totalItems}</span> total products
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`dots-${index}`} className="px-2 text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-bold transition-all border ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;