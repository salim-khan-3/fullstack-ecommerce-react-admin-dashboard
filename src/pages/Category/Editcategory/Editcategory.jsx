import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  CloudUpload,
  Loader2,
  ArrowLeft,
  Palette,
  ImageIcon,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { getAllCategories, updateCategory } from "../../../api/categoryApi";
import toast from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams(); // URL থেকে category id নেওয়া
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    color: "",
  });

  // ✅ ID দিয়ে category data load করা
  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        const categories = Array.isArray(data) ? data : data.categories || [];
        const found = categories.find((c) => c._id === id);
        if (found) {
          setFormData({
            name: found.name || "",
            imageUrl: Array.isArray(found.images) ? found.images[0] : found.image || "",
            color: found.color || "",
          });
        }
      } catch (err) {
        toast.error("Failed to load category!");
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [id]);

  const handleColorChange = (value) => {
    const formatted = value.startsWith("#") ? value : `#${value}`;
    setFormData({ ...formData, color: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateCategory(id, {
        name: formData.name,
        images: [formData.imageUrl],
        color: formData.color,
      });
      toast.success("Category updated successfully!");
      // ✅ সফল হলে Category List page এ ফিরে যাওয়া
      setTimeout(() => navigate("/category/list"), 1000);
    } catch (err) {
      toast.error(err.message || "Update failed!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-indigo-500" />
          <p className="text-sm font-medium text-slate-400">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans antialiased text-slate-900">

      {/* ── Header / Breadcrumb ── */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
          <div className="flex items-center gap-2">
            {/* Back button */}
            <button
              onClick={() => navigate("/dashboard/categories")}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition mr-1"
              title="Back to Category List"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <LayoutGrid size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Edit Category</h1>
          </div>

          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <Home size={14} className="text-indigo-500" />
            <span className="hover:text-indigo-600 cursor-pointer transition">Dashboard</span>
            <ChevronRight size={12} />
            <span
              className="hover:text-indigo-600 cursor-pointer transition"
              onClick={() => navigate("/dashboard/categories")}
            >
              Categories
            </span>
            <ChevronRight size={12} />
            <span className="text-indigo-600">Edit</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Form */}
        <div className="lg:col-span-7 xl:col-span-5">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative overflow-hidden">
            <div className="relative">
              <h2 className="text-2xl font-extrabold mb-2 text-slate-800">Update Details</h2>
              <p className="text-slate-500 mb-8 text-sm">
                Make changes to the category and save.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Category Name */}
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 group-focus-within:text-indigo-600 transition-colors">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-[6px] focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-slate-400 font-medium"
                    placeholder="Enter category name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 group-focus-within:text-indigo-600 transition-colors">
                    Thumbnail Image URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-[6px] focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 placeholder:text-slate-400"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  </div>
                </div>

                {/* Brand Color */}
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 group-focus-within:text-indigo-600 transition-colors">
                    Brand Color Accent
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-[6px] focus-within:ring-indigo-500/10 transition-all duration-300">
                    <div className="relative w-12 h-10 shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                      <input
                        type="color"
                        className="absolute -inset-2 w-20 h-20 cursor-pointer bg-transparent border-none"
                        value={formData.color || "#6366f1"}
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 flex items-center px-2">
                      <span className="text-slate-400 font-mono font-bold mr-1">#</span>
                      <input
                        type="text"
                        maxLength="7"
                        className="w-full bg-transparent border-none outline-none font-mono text-sm font-bold uppercase tracking-widest text-slate-700 placeholder:text-slate-300"
                        placeholder="6366F1"
                        value={formData.color.replace("#", "")}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9A-Fa-f]*$/.test(val)) handleColorChange(val);
                        }}
                      />
                    </div>
                    <Palette size={18} className="text-slate-300 mr-2" />
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400 ml-1 italic font-medium uppercase tracking-tighter">
                    * Use picker or type your custom hex code
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard/categories")}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span className="tracking-wide text-sm font-bold">UPDATING...</span>
                      </>
                    ) : (
                      <>
                        <CloudUpload size={20} />
                        <span className="tracking-wide text-sm font-bold">SAVE CHANGES</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-7 items-center justify-center p-12">
          <div className="relative group">
            <div
              className="w-72 h-96 rounded-[3rem] shadow-2xl transition-all duration-700 flex flex-col items-center justify-center p-8 overflow-hidden relative"
              style={{ backgroundColor: formData.color || "#6366f1" }}
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Sparkles className="absolute top-10 right-10 text-black" size={120} />
              </div>

              <div className="relative z-10 mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                {formData.imageUrl ? (
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-black/10 shadow-xl">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-black/5 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-black/20">
                    <ImageIcon size={40} className="text-black/20" />
                  </div>
                )}
              </div>

              <div className="relative z-10 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-black/50">
                  Visual Identity
                </p>
                <h3 className="text-2xl font-black truncate max-w-[200px] leading-tight text-slate-900">
                  {formData.name || "Preview Name"}
                </h3>
              </div>
            </div>

            <div className="absolute -inset-6 border-2 border-dashed border-slate-200 rounded-[3.5rem] -z-10 group-hover:rotate-3 transition-transform duration-700 opacity-50" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditCategory;
