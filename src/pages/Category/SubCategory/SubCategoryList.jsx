import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSubCategory, getAllSubCategories } from "../../../api/subCategoryApi";

export default function SubCategoryList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllSubCategories();
      setData(response);
    } catch (err) {
      setError("Failed to load sub categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub category?")) return;
    try {
      await deleteSubCategory(id);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete sub category.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Sub Category List</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>🏠 Dashboard</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">Sub Category</span>
          <button
            onClick={() => navigate("/subCategory/add")}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md text-sm"
          >
            + Add Sub Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-400">{error}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="text-left px-6 py-4 font-semibold tracking-wide uppercase text-xs">Image</th>
                <th className="text-left px-6 py-4 font-semibold tracking-wide uppercase text-xs">Category</th>
                <th className="text-left px-6 py-4 font-semibold tracking-wide uppercase text-xs">Sub Category</th>
                <th className="text-left px-6 py-4 font-semibold tracking-wide uppercase text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    No sub categories found.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-t border-gray-100 hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {/* Category Image */}
                    <td className="px-6 py-4">
                      <img
                        src={item.category?.images?.[0]}
                        alt={item.category?.name}
                        className="w-10 h-10 object-contain rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40?text=N/A";
                        }}
                      />
                    </td>

                    {/* Category Name */}
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {item.category?.name || "N/A"}
                    </td>

                    {/* Sub Category Name */}
                    <td className="px-6 py-4 text-gray-600">{item.subCat}</td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/subCategory/edit/${item._id}`, { state: { item } })}
                          className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-lg transition-all duration-150"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-lg transition-all duration-150"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}