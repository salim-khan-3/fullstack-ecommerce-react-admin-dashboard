import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import axiosInstance from "../../../api/axiosInstance";

const ProductWeightList = () => {
  const [rams, setRams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRams = async () => {
    try {
      const res = await axiosInstance.get("/productWeight");
      setRams(res.data || []);
    } catch {
      toast.error("Failed to load Weight list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRams(); }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Weight option will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/productWeight/${id}`);
          setRams((prev) => prev.filter((r) => r._id !== id));
          Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
        } catch {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  const filtered = rams.filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 font-sans">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
            <Package size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Product Weight List</h1>
            <p className="text-xs text-gray-400">{rams.length} Weight options available</p>
          </div>
        </div>
        <Link to="/productweight/add">
          <button className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-all">
            <Plus size={16} /> Add Weight
          </button>
        </Link>
      </div>

      {/* Search + Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Weight..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-amber-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Weight Name</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={3} className="py-16 text-center text-gray-300">
                  <svg className="animate-spin h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={3} className="py-16 text-center text-gray-400 text-sm">No Weight options found.</td></tr>
              ) : (
                filtered.map((ram, index) => (
                  <tr key={ram._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-400 font-medium">#{index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                          <Package size={14} className="text-amber-500" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{ram.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/productweight/edit/${ram._id}`}>
                          <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                            <Edit2 size={15} />
                          </button>
                        </Link>
                        <button onClick={() => handleDelete(ram._id)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductWeightList;