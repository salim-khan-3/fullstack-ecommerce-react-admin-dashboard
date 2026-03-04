import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getSubCategoryById, updateSubCategory } from "../api/subCategoryApi";

import {
  getSubCategoryById,
  updateSubCategory,
} from "../../../api/subCategoryApi";
import { getAllCategories } from "../../../api/categoryApi";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ category: "", subCat: "" });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // GET existing subCategory data and all categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [subCatRes, catRes] = await Promise.all([
          getSubCategoryById(id),
          getAllCategories(1, 1000),
        ]);

        setForm({
          category:
            subCatRes.data?.category?._id || subCatRes.data?.category || "",
          subCat: subCatRes.data?.subCat || "",
        });

        setCategories(catRes.categoryList || catRes);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

const handleSave = async () => {
  if (!form.category || !form.subCat)
    return Swal.fire({
      icon: "warning",
      title: "All fields are required!",
      confirmButtonColor: "#2563eb",
    });

  try {
    setSaving(true);

    await updateSubCategory(id, form);

    // ✅ Success Toast
    await Swal.fire({
      icon: "success",
      title: "Sub Category Updated Successfully!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    // ✅ Redirect after toast
    navigate("/category/subcategorylist");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed to update sub category.",
      confirmButtonColor: "#dc2626",
    });
  } finally {
    setSaving(false);
  }
};

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-400">
        <Loader></Loader>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Edit Sub Category</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>🏠 Dashboard</span>
          <span>/</span>
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/subCategory")}
          >
            Sub Category
          </span>
          <span>/</span>
          <span className="text-gray-700 font-medium">Edit</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
        <div className="flex flex-col gap-5">
          {/* Category Dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Category
            </label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SubCategory Input */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Sub Category
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Mobile Phones"
              value={form.subCat}
              onChange={(e) => setForm({ ...form, subCat: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/category/subcategorylist")}
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
