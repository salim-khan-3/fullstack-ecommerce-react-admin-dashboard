import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Image as ImageIcon,
  Palette,
  CloudUpload,
  ChevronRight,
  Home,
  Sparkles,
} from "lucide-react";
import { createCategory } from "../../../api/categoryApi";

const AddCategory = () => {
  const navigate = useNavigate(); // ✅ navigate hook
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    color: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = {
      name: formData.name,
      images: [formData.imageUrl],
      color: formData.color,
    };

    try {
      const data = await createCategory(dataToSubmit);
      console.log("Success:", data);
      toast.success("Category added successfully!");

      setTimeout(() => {
        navigate("/category/list");
      }, 1000);
    } catch (error) {
      console.error("Error details:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (value) => {
    const formattedColor = value.startsWith("#") ? value : `#${value}`;
    setFormData({ ...formData, color: formattedColor });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans antialiased text-slate-900">
      {/* Header / Breadcrumb */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <LayoutGrid size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Add New Category</h1>
          </div>

          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <Home size={14} className="text-indigo-500" />
            <span className="hover:text-indigo-600 cursor-pointer transition">Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-indigo-600">Categories</span>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: The Form */}
        <div className="lg:col-span-7 xl:col-span-5">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 relative overflow-hidden transition-all">
            <div className="relative">
              <h2 className="text-2xl font-extrabold mb-2 text-slate-800">Category Details</h2>
              <p className="text-slate-500 mb-8 text-sm">
                Create a unique identity for your new product group.
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
                        value={formData.color}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M21 12a9 9 0 11-6.219-8.56" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="tracking-wide text-sm font-bold">PUBLISHING...</span>
                    </>
                  ) : (
                    <>
                      <CloudUpload size={22} />
                      <span className="tracking-wide text-sm font-bold">PUBLISH CATEGORY</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Preview */}
        <div className="hidden lg:flex lg:col-span-5 xl:col-span-7 items-center justify-center p-12">
          <div className="relative group">
            <div
              className="w-72 h-96 rounded-[3rem] shadow-2xl transition-all duration-700 flex flex-col items-center justify-center p-8 overflow-hidden relative"
              style={{ backgroundColor: formData.color }}
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

export default AddCategory;
