


import { useSearchParams } from "react-router-dom"; // ১. ইম্পোর্ট করা হয়েছে
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Home, Loader2 } from "lucide-react";
import { getAllCategories, deleteCategory } from "../../../api/categoryApi";
import Pagination from "../../../components/CategoryComponent/Pagination/Pagination";
import CategoryTableRow from "../../../components/CategoryComponent/CategoryTableRow/CategoryTableRow";

export default function CategoryList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // ২. সার্চ প্যারামস হুক

  // ৩. URL থেকে কারেন্ট পেজ রিড করা (না থাকলে ডিফল্ট ১)
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selected, setSelected] = useState([]);

  const fetchCategories = useCallback(async (page) => {
    try {
      setLoading(true);
      const data = await getAllCategories(page);
      setCategories(data.categoryList || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage, fetchCategories]);

  // ৪. পেজ পরিবর্তন হলে URL আপডেট করার ফাংশন
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2979ff",
      cancelButtonColor: "#ff5252",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(categoryId);
          Swal.fire({ title: "Deleted!", text: "Category has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
          fetchCategories(currentPage);
        } catch (err) {
          Swal.fire("Error!", err.message || "Failed to delete.", "error");
        }
      }
    });
  };

  const handleEditClick = (categoryId) => {
    navigate(`/dashboard/categories/edit/${categoryId}`);
  };

  const currentData = categories.map((item, idx) => ({
    ...item,
    serialNo: (currentPage - 1) * 3 + idx + 1,
  }));

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () => {
    const ids = currentData.map((d) => d._id);
    const allSelected = ids.every((id) => selected.includes(id));
    if (allSelected) setSelected((prev) => prev.filter((x) => !ids.includes(x)));
    else setSelected((prev) => [...new Set([...prev, ...ids])]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Category List</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} className="text-gray-400" />
          <span>Dashboard / Category</span>
        </nav>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#2979ff" }}>
                <th className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    onChange={toggleAll}
                    checked={currentData.length > 0 && currentData.every((d) => selected.includes(d._id))}
                  />
                </th>
                {["UID", "IMAGE", "CATEGORY", "IMAGE URL", "COLOR", "ACTION"].map((h) => (
                  <th key={h} className="px-3 py-4 text-xs font-bold text-white uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">No categories found.</td></tr>
              ) : (
                currentData.map((row, idx) => (
                  <CategoryTableRow
                    key={row._id}
                    row={row}
                    idx={idx}
                    isSelected={selected.includes(row._id)}
                    onSelect={toggleSelect}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          currentCount={categories.length}
          onPageChange={handlePageChange} // ৫. নতুন ফাংশন ব্যবহার
        />
      </div>
    </div>
  );
}