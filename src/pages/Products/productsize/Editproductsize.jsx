import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Home, ChevronRight, Ruler, Save } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../../../api/axiosInstance";

const EditProductSize = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/productSize/${id}`);
        setName(res.data.name || "");
      } catch {
        toast.error("Failed to load Size data");
      } finally {
        setFetching(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Size name is required!");
    setLoading(true);
    try {
      await axiosInstance.put(`/productSize/${id}`, { name });
      toast.success("Size updated successfully!");
      setTimeout(() => navigate("/productsize/list"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center min-h-[300px]">
      <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </div>
  );

  return (
    <div className="p-4 font-sans">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
            <Ruler size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Edit Size</h1>
            <p className="text-xs text-gray-400">Update product Size option</p>
          </div>
        </div>
        <nav className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500"><Home size={12} /><span>Dashboard</span></div>
          <ChevronRight size={12} className="text-gray-300" />
          <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500">Product Size</div>
          <ChevronRight size={12} className="text-gray-300" />
          <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm">Edit Size</div>
        </nav>
      </div>

      {/* Form */}
      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
            <h2 className="text-white font-bold text-base">Update Size</h2>
            <p className="text-blue-200 text-xs mt-0.5">Ex: 4GB, S, M, L, XL, 32GB</p>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Size Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: S, M, L, XL"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 shadow-md"}`}
            >
              {loading ? (
                <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Updating...</>
              ) : (
                <><Save size={16} /> Update Size</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductSize;