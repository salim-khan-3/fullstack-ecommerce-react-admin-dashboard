import { useEffect, useState } from "react";

import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import { useProducts } from "../../../context/hooks/useProducts";
import PageHeader from "../PageHeader/PageHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatsCards from "../StatsCards/StatsCards";

const Dashboard = () => {
  const {
    products,
    loading,
    fetchProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useProducts();
  const [activeCategoryId, setActiveCategoryId] = useState("");

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

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader />
      <div className="mt-6">
        <StatsCards />
      </div>
      <div className="mt-8">
        <TableFilters onCategoryChange={handleCategoryChange} />
        <ProductTable products={products} loading={loading} />

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="bg-white border-x border-b border-gray-100 rounded-b-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400 font-medium">
              Showing page{" "}
              <span className="text-gray-700 font-bold">{currentPage}</span> of{" "}
              <span className="text-gray-700 font-bold">{totalPages}</span> —{" "}
              <span className="text-gray-700 font-bold">{totalItems}</span>{" "}
              total products
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="px-2 text-gray-400 text-sm"
                  >
                    ...
                  </span>
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
                ),
              )}

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

export default Dashboard;
