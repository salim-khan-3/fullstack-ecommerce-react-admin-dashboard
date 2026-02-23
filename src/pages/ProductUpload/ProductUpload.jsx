import React from "react";
import { Plus, MoreHorizontal, Home, ChevronDown, UploadCloud, X } from "lucide-react";

// --- Reusable Components ---

const FormSection = ({ title, children }) => (
  <div className="bg-white/50 p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

const InputField = ({ label, type = "text", placeholder, isTextArea, rows = 3, selectOptions }) => {
  const labelStyle = "text-xs font-bold text-gray-500 uppercase tracking-wider ml-1";
  const inputStyle = "w-full bg-white border-none rounded-xl p-3 mt-1 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 text-gray-700";

  return (
    <div className="w-full">
      <label className={labelStyle}>{label}</label>
      {isTextArea ? (
        <textarea rows={rows} placeholder={placeholder} className={`${inputStyle} resize-none`} />
      ) : selectOptions ? (
        <select className={inputStyle}>
          {selectOptions.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} className={inputStyle} />
      )}
    </div>
  );
};

// --- Main Component ---

const ProductUpload = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans">
      
      {/* Header Section */}
      <div className="w-full bg-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Product Upload</h2>
        <div className="text-[13px] text-gray-400 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-gray-600 cursor-pointer">
            <Home size={14} /> Dashboard
          </span>
          <span className="text-gray-300">/</span>
          <span>Products</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-blue-600">Upload</span>
        </div>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Basic Information (এখন শুরুতে) */}
          <FormSection title="Basic Information">
            <InputField label="Title" placeholder="Enter product name" />
            <InputField label="Description" placeholder="Write detailed description..." isTextArea rows={5} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Category" selectOptions={["Mans", "Womans", "Kids"]} />
              <InputField label="Brand" selectOptions={["Richman", "Ecstasy", "Apex"]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Regular Price" type="number" placeholder="0.00" />
              <InputField label="Discount Price" type="number" placeholder="0.00" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Shipping Fee" type="number" placeholder="0.00" />
              <InputField label="Tax Rate" type="number" placeholder="0%" />
            </div>
            <InputField label="Tags" placeholder="Enter tags (e.g. fashion, summer)" isTextArea rows={3} />
          </FormSection>

          {/* 2. Media & Published Section (এখন শেষে) */}
          <FormSection title="Media & Published">
            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center bg-white/30 hover:bg-white/50 hover:border-blue-400 transition-all cursor-pointer group">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-gray-700 font-bold text-lg text-center">Click to upload or drag and drop</h3>
              <p className="text-gray-400 text-sm mt-1">PNG, JPG or GIF (Max 1280x720px)</p>
              <input type="file" className="hidden" multiple />
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
               {[1, 2].map((i) => (
                 <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm group animate-in fade-in zoom-in duration-300">
                   <img 
                    src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80`} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button className="bg-rose-500 text-white p-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                       <X size={16} />
                     </button>
                   </div>
                 </div>
               ))}
            </div>
          </FormSection>
        </div>

        {/* Right Column (Organization & Specs) */}
        <div className="space-y-8">
          
          <FormSection title="Organization">
            {["Category", "Brand", "Color", "Size"].map((item) => (
              <div key={item} className="group">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Add {item}</label>
                <div className="flex gap-2 mt-1">
                  <input type="text" placeholder={`New ${item.toLowerCase()}`} className="flex-1 bg-white border-none rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl shadow-md transition-all active:scale-95 font-bold text-[10px] uppercase">Add</button>
                </div>
              </div>
            ))}
          </FormSection>

          <FormSection title="Specification">
            <div className="grid grid-cols-2 gap-4">
              {/* Size Dropdown */}
              <div className="relative group">
                <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Size</label>
                <div className="relative mt-1">
                  <select className="appearance-none w-full bg-white border-none rounded-2xl p-3 shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-700 text-sm cursor-pointer transition-all hover:shadow-md">
                    <option disabled selected>Select Size</option>
                    <option>Small (Sm)</option>
                    <option>Medium (Md)</option>
                    <option>Large (Lg)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Color Dropdown */}
              <div className="relative group">
                <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Color</label>
                <div className="relative mt-1">
                  <select className="appearance-none w-full bg-white border-none rounded-2xl p-3 shadow-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-700 text-sm cursor-pointer transition-all hover:shadow-md">
                    <option disabled selected>Select Color</option>
                    <option>Black</option>
                    <option>Deep Blue</option>
                    <option>White</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <InputField label="Stock" type="number" placeholder="0" />
              <InputField label="Weight" type="text" placeholder="0.5kg" />
            </div>

            <button className="group w-full mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 active:scale-[0.97] flex items-center justify-center gap-2">
              UPLOAD PRODUCT
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </FormSection>

        </div>
      </div>
    </div>
  );
};

export default ProductUpload;