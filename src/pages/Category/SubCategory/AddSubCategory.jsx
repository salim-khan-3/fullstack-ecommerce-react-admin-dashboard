import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSubCategory } from "../../../api/subCategoryApi";
import { getAllCategories } from "../../../api/categoryApi";
import toast from "react-hot-toast";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ category: "", subCat: "" });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories(1, 10000);
        setCategories(res.categoryList || []);
      } catch (err) {
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!form.category || !form.subCat) {
      toast.error("All fields are required.");
      return;
    }
    try {
      setSaving(true);
      await createSubCategory({ category: form.category, subCat: form.subCat });
      toast.success("Sub category added successfully!");
      setTimeout(() => navigate("/category/subcategorylist"), 1500);
    } catch (err) {
      toast.error("Failed to add sub category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Add Sub Category</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Fill in the details to add a new sub category
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>🏠 Dashboard</span>
          <span>/</span>
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/category/subcategorylist")}
          >
            Sub Category
          </span>
          <span>/</span>
          <span className="text-gray-600 font-medium">Add Category</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-5">
          {/* Category Dropdown */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              Category
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 transition"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SubCategory Input */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
              Sub Category
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 transition"
              placeholder="e.g. Mobile Phones"
              value={form.subCat}
              onChange={(e) => setForm({ ...form, subCat: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 w-full py-3.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          {saving ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Publishing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Publish and View
            </>
          )}
        </button>
      </div>
    </div>
  );
}
