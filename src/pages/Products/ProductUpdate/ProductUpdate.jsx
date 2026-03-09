import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  CloudLightning, Plus, Info, Upload, X, Home,
  ChevronRight, Package, Tag, DollarSign, MapPin, Layers, RefreshCw,
} from "lucide-react";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../api/categoryApi";
import { getAllSubCategories } from "../../../api/subCategoryApi";
import { updateProduct, getProductById } from "../../../api/productApi";
import axiosInstance from "../../../api/axiosInstance";

const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300";
const selectClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm text-gray-600";
const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1";

// Multi-select chip component
const MultiSelectChips = ({ options, selected, onChange, labelKey = "name" }) => {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map((opt) => {
        const isSelected = selected.includes(opt._id);
        return (
          <button
            key={opt._id}
            type="button"
            onClick={() => toggle(opt._id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-150 ${
              isSelected
                ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
            }`}
          >
            {opt[labelKey]}
          </button>
        );
      })}
      {options.length === 0 && <p className="text-xs text-gray-300 italic">No options available</p>}
    </div>
  );
};

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories]       = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ramsList, setRamsList]           = useState([]);
  const [sizeList, setSizeList]           = useState([]);
  const [weightList, setWeightList]       = useState([]);
  const [loading, setLoading]             = useState(false);
  const [fetching, setFetching]           = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews]           = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Multi-select states
  const [selectedRams, setSelectedRams]       = useState([]);
  const [selectedSizes, setSelectedSizes]     = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: { rating: 0, location: "dhaka" },
  });

  const currentRating = watch("rating");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, subCatRes, ramsRes, sizeRes, weightRes, product] = await Promise.all([
          getAllCategories(1, 100),
          getAllSubCategories(),
          axiosInstance.get("/productRams"),
          axiosInstance.get("/productSize"),
          axiosInstance.get("/productWeight"),
          getProductById(id),
        ]);

        setCategories(catRes?.categoryList || catRes?.data || []);
        setSubCategories(subCatRes || []);
        setRamsList(ramsRes.data || []);
        setSizeList(sizeRes.data || []);
        setWeightList(weightRes.data || []);
        setExistingImages(product.images || []);

        // Pre-select existing RAM, Size, Weight (handle both array and single)
        const toIdArray = (val) => {
          if (!val) return [];
          if (Array.isArray(val)) return val.map((v) => v?._id || v).filter(Boolean);
          return [val?._id || val].filter(Boolean);
        };

        setSelectedRams(toIdArray(product.productRam));
        setSelectedSizes(toIdArray(product.productSize));
        setSelectedWeights(toIdArray(product.productWeight));

        reset({
          name: product.name || "",
          description: product.description || "",
          category: product.category?._id || product.category || "",
          subCat: product.subCat?._id || product.subCat || "",
          brand: product.brand || "",
          price: product.price || "",
          oldPrice: product.oldPrice || "",
          discount: product.discount || "",
          countInStock: product.countInStock || "",
          rating: product.rating || 0,
          location: product.location || "dhaka",
          isFeatured: product.isFeatured || false,
        });
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchAll();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (existingImages.length === 0 && selectedImages.length === 0) {
      return Swal.fire({ icon: "warning", title: "No Image", text: "Please keep or upload at least one image!", confirmButtonColor: "#2563eb" });
    }
    Swal.fire({ title: "Updating Product...", text: "Please wait...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    setLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "isFeatured") {
        formData.append(key, data[key] ? "true" : "false");
      } else if (data[key] !== undefined && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    // Append multiple RAM, Size, Weight
    selectedRams.forEach((id) => formData.append("productRam", id));
    selectedSizes.forEach((id) => formData.append("productSize", id));
    selectedWeights.forEach((id) => formData.append("productWeight", id));

    existingImages.forEach((img) => formData.append("existingImages", img));
    selectedImages.forEach((image) => formData.append("images", image));

    try {
      await updateProduct(id, formData);
      Swal.fire({ icon: "success", title: "Updated!", text: "Product updated successfully! ✅", timer: 2500, showConfirmButton: false });
      setTimeout(() => navigate("/products/list"), 2500);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops...", text: err.message || "Something went wrong.", confirmButtonColor: "#ef4444" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-10 w-10 text-emerald-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-gray-400 text-sm font-medium">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <RefreshCw size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight">Product Update</h1>
              <p className="text-xs text-gray-400">Edit and save product changes</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1.5 text-xs">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500"><Home size={12} /><span>Dashboard</span></div>
            <ChevronRight size={12} className="text-gray-300" />
            <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500">Products</div>
            <ChevronRight size={12} className="text-gray-300" />
            <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-sm">Product Update</div>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-2">
                <Info size={18} className="text-blue-100" />
                <h2 className="text-white font-bold text-base">Basic Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <label className={labelClass}>Product Name</label>
                  <input {...register("name", { required: "Name is required" })} placeholder="Ex: iPhone 15 Pro Max"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 outline-none transition-all text-sm font-medium placeholder-gray-300 focus:bg-white focus:border-blue-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-100"}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea rows="4" {...register("description", { required: true })} placeholder="Write a detailed product description..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm resize-none placeholder-gray-300" />
                </div>

                <div>
                  <label className={labelClass}><Layers size={11} /> Category</label>
                  <select {...register("category", { required: true })} className={selectClass}>
                    <option value="">Select Category</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}><Layers size={11} /> Sub Category</label>
                  <select {...register("subCat")} className={selectClass}>
                    <option value="">Select Sub Category</option>
                    {subCategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.subCat}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}><Tag size={11} /> Brand Name</label>
                  <input {...register("brand", { required: true })} placeholder="Ex: Apple, Samsung" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}><DollarSign size={11} /> Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
                    <input type="number" {...register("price", { required: true })} placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}><DollarSign size={11} /> Old Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
                    <input type="number" {...register("oldPrice")} placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Discount (%)</label>
                  <input type="number" {...register("discount")} placeholder="Ex: 20" min="0" max="100" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}><Package size={11} /> Stock Count</label>
                  <input type="number" {...register("countInStock", { required: true })} placeholder="0" className={inputClass} />
                </div>

                {/* RAM — multi select chips */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Product RAM <span className="text-blue-400 normal-case font-medium">(multiple allowed)</span></label>
                  <MultiSelectChips options={ramsList} selected={selectedRams} onChange={setSelectedRams} />
                  {selectedRams.length > 0 && (
                    <p className="text-[11px] text-blue-500 mt-1.5 font-medium">{selectedRams.length} selected</p>
                  )}
                </div>

                {/* Size — multi select chips */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Product Size <span className="text-blue-400 normal-case font-medium">(multiple allowed)</span></label>
                  <MultiSelectChips options={sizeList} selected={selectedSizes} onChange={setSelectedSizes} />
                  {selectedSizes.length > 0 && (
                    <p className="text-[11px] text-blue-500 mt-1.5 font-medium">{selectedSizes.length} selected</p>
                  )}
                </div>

                {/* Weight — multi select chips */}
                <div className="md:col-span-2">
                  <label className={labelClass}>Product Weight <span className="text-blue-400 normal-case font-medium">(multiple allowed)</span></label>
                  <MultiSelectChips options={weightList} selected={selectedWeights} onChange={setSelectedWeights} />
                  {selectedWeights.length > 0 && (
                    <p className="text-[11px] text-blue-500 mt-1.5 font-medium">{selectedWeights.length} selected</p>
                  )}
                </div>

              </div>
            </div>

            {/* Media */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center gap-2">
                <Upload size={18} className="text-violet-100" />
                <h2 className="text-white font-bold text-base">Media & Publishing</h2>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-4 font-medium">Existing images shown below. Remove or add new ones.</p>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-sm group">
                      <img src={url} alt="existing" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-700/80 to-transparent py-1 text-center">
                        <span className="text-white text-[9px] font-bold uppercase tracking-wider">{index === 0 ? "Cover" : "Saved"}</span>
                      </div>
                      <button type="button" onClick={() => removeExistingImage(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {previews.map((url, index) => (
                    <div key={`new-${index}`} className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-sm group">
                      <img src={url} alt="new" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700/80 to-transparent py-1 text-center">
                        <span className="text-white text-[9px] font-bold uppercase tracking-wider">New</span>
                      </div>
                      <button type="button" onClick={() => removeNewImage(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition-all group">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition-all">
                      <Plus size={18} />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-center px-2 leading-tight">Add New</span>
                    <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
                {existingImages.length === 0 && selectedImages.length === 0 && (
                  <p className="text-xs text-amber-500 mt-3 font-medium">⚠ At least one image is required.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-80">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
                </svg>
                <h2 className="text-white font-bold text-base">Update Rating</h2>
              </div>
              <div className="p-6 flex flex-col items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setValue("rating", star)} className="transition-transform hover:scale-110 active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={star <= currentRating ? "#f59e0b" : "none"} stroke={star <= currentRating ? "#f59e0b" : "#d1d5db"} className="w-9 h-9 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-2 text-center">
                  <span className="text-amber-600 font-bold text-2xl">{currentRating || 0}</span>
                  <span className="text-amber-400 text-sm"> / 5</span>
                </div>
                <input type="hidden" {...register("rating")} />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center gap-2">
                <MapPin size={18} className="text-emerald-100" />
                <h2 className="text-white font-bold text-base">Shipping Location</h2>
              </div>
              <div className="p-6">
                <select {...register("location")} className={selectClass}>
                  <option value="dhaka">📍 Dhaka</option>
                  <option value="chattogram">📍 Chattogram</option>
                </select>
                <p className="text-xs text-gray-400 mt-2">Select primary shipping origin</p>
              </div>
            </div>

            {/* Featured */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-80">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <h2 className="text-white font-bold text-base">Featured Product</h2>
              </div>
              <div className="p-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" {...register("isFeatured")} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-pink-500 rounded-full transition-all"></div>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">Mark as Featured</span>
                </label>
                <p className="text-xs text-gray-400 mt-2">Featured products appear on the homepage</p>
              </div>
            </div>

            {/* Update Summary */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="font-bold text-xs mb-4 text-emerald-200 uppercase tracking-widest">Update Summary</h3>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">Existing Images</span>
                  <span className="font-bold bg-white/10 px-2.5 py-0.5 rounded-lg text-xs">{existingImages.length} saved</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">New Images</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-lg text-xs ${selectedImages.length > 0 ? "bg-blue-400/20 text-blue-200" : "bg-white/10 text-white/60"}`}>
                    {selectedImages.length} added
                  </span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">RAM</span>
                  <span className="font-bold text-emerald-200 text-xs">{selectedRams.length} selected</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">Size</span>
                  <span className="font-bold text-emerald-200 text-xs">{selectedSizes.length} selected</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">Weight</span>
                  <span className="font-bold text-emerald-200 text-xs">{selectedWeights.length} selected</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-200">Rating</span>
                  <span className="font-bold text-amber-300">{currentRating || 0} / 5 ⭐</span>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${loading ? "bg-white/20 cursor-not-allowed text-white/60" : "bg-white text-emerald-700 hover:bg-emerald-50"}`}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    UPDATING...
                  </span>
                ) : (
                  <><CloudLightning size={18} fill="currentColor" /> UPDATE PRODUCT</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;















// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   CloudLightning, Plus, Info, Upload, X, Home,
//   ChevronRight, Package, Tag, DollarSign, MapPin, Layers, RefreshCw,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { getAllCategories } from "../../../api/categoryApi";
// import { getAllSubCategories } from "../../../api/subCategoryApi";
// import { updateProduct, getProductById } from "../../../api/productApi";
// import axiosInstance from "../../../api/axiosInstance";

// const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300";
// const selectClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm text-gray-600";
// const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1";

// const ProductUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [ramsList, setRamsList] = useState([]);
//   const [sizeList, setSizeList] = useState([]);
//   const [weightList, setWeightList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);

//   const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
//     defaultValues: { rating: 0, location: "dhaka" },
//   });

//   const currentRating = watch("rating");

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [catRes, subCatRes, ramsRes, sizeRes, weightRes, product] = await Promise.all([
//           getAllCategories(1, 100),
//           getAllSubCategories(),
//           axiosInstance.get("/productRams"),
//           axiosInstance.get("/productSize"),
//           axiosInstance.get("/productWeight"),
//           getProductById(id),
//         ]);

//         setCategories(catRes?.categoryList || catRes?.data || []);
//         setSubCategories(subCatRes || []);
//         setRamsList(ramsRes.data || []);
//         setSizeList(sizeRes.data || []);
//         setWeightList(weightRes.data || []);
//         setExistingImages(product.images || []);

//         reset({
//           name: product.name || "",
//           description: product.description || "",
//           category: product.category?._id || product.category || "",
//           subCat: product.subCat?._id || product.subCat || "",
//           brand: product.brand || "",
//           price: product.price || "",
//           oldPrice: product.oldPrice || "",
//           discount: product.discount || "",
//           countInStock: product.countInStock || "",
//           rating: product.rating || 0,
//           location: product.location || "dhaka",
//           isFeatured: product.isFeatured || false,
//           productRam: product.productRam?._id || product.productRam || "",
//           productSize: product.productSize?._id || product.productSize || "",
//           productWeight: product.productWeight?._id || product.productWeight || "",
//         });
//       } catch (err) {
//         console.error("Error loading data:", err);
//       } finally {
//         setFetching(false);
//       }
//     };
//     fetchAll();
//   }, [id]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages((prev) => [...prev, ...files]);
//     setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
//   };

//   const removeNewImage = (index) => {
//     setSelectedImages(selectedImages.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const removeExistingImage = (index) => {
//     setExistingImages(existingImages.filter((_, i) => i !== index));
//   };

//   const onSubmit = async (data) => {
//     if (existingImages.length === 0 && selectedImages.length === 0) {
//       return Swal.fire({ icon: "warning", title: "No Image", text: "Please keep or upload at least one image!", confirmButtonColor: "#2563eb" });
//     }
//     Swal.fire({ title: "Updating Product...", text: "Please wait...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
//     setLoading(true);

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "isFeatured") {
//         formData.append(key, data[key] ? "true" : "false");
//       } else if (data[key] !== undefined && data[key] !== "") {
//         formData.append(key, data[key]);
//       }
//     });
//     existingImages.forEach((img) => formData.append("existingImages", img));
//     selectedImages.forEach((image) => formData.append("images", image));

//     try {
//       await updateProduct(id, formData);
//       Swal.fire({ icon: "success", title: "Updated!", text: "Product updated successfully! ✅", timer: 2500, showConfirmButton: false });
//       setTimeout(() => navigate("/products/list"), 2500);
//     } catch (err) {
//       Swal.fire({ icon: "error", title: "Oops...", text: err.message || "Something went wrong.", confirmButtonColor: "#ef4444" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex flex-col items-center gap-3">
//           <svg className="animate-spin h-10 w-10 text-emerald-500" viewBox="0 0 24 24" fill="none">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//           </svg>
//           <p className="text-gray-400 text-sm font-medium">Loading product data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
//       <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">

//         {/* Breadcrumb */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
//               <RefreshCw size={18} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-800 leading-tight">Product Update</h1>
//               <p className="text-xs text-gray-400">Edit and save product changes</p>
//             </div>
//           </div>
//           <nav className="flex flex-wrap gap-1.5 text-xs">
//             <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500"><Home size={12} /><span>Dashboard</span></div>
//             <ChevronRight size={12} className="text-gray-300" />
//             <div className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500">Products</div>
//             <ChevronRight size={12} className="text-gray-300" />
//             <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-sm">Product Update</div>
//           </nav>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Basic Info */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-2">
//                 <Info size={18} className="text-blue-100" />
//                 <h2 className="text-white font-bold text-base">Basic Information</h2>
//               </div>
//               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

//                 <div className="md:col-span-2">
//                   <label className={labelClass}>Product Name</label>
//                   <input {...register("name", { required: "Name is required" })} placeholder="Ex: iPhone 15 Pro Max"
//                     className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 outline-none transition-all text-sm font-medium placeholder-gray-300 focus:bg-white focus:border-blue-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-100"}`} />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className={labelClass}>Description</label>
//                   <textarea rows="4" {...register("description", { required: true })} placeholder="Write a detailed product description..."
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm resize-none placeholder-gray-300" />
//                 </div>

//                 <div>
//                   <label className={labelClass}><Layers size={11} /> Category</label>
//                   <select {...register("category", { required: true })} className={selectClass}>
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}><Layers size={11} /> Sub Category</label>
//                   <select {...register("subCat")} className={selectClass}>
//                     <option value="">Select Sub Category</option>
//                     {subCategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.subCat}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelClass}><Tag size={11} /> Brand Name</label>
//                   <input {...register("brand", { required: true })} placeholder="Ex: Apple, Samsung" className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}><DollarSign size={11} /> Price</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
//                     <input type="number" {...register("price", { required: true })} placeholder="0.00"
//                       className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
//                   </div>
//                 </div>

//                 {/* Old Price */}
//                 <div>
//                   <label className={labelClass}><DollarSign size={11} /> Old Price</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">৳</span>
//                     <input type="number" {...register("oldPrice")} placeholder="0.00"
//                       className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
//                   </div>
//                 </div>

//                 {/* Discount */}
//                 <div>
//                   <label className={labelClass}>Discount (%)</label>
//                   <input type="number" {...register("discount")} placeholder="Ex: 20" min="0" max="100" className={inputClass} />
//                 </div>

//                 <div>
//                   <label className={labelClass}><Package size={11} /> Stock Count</label>
//                   <input type="number" {...register("countInStock", { required: true })} placeholder="0" className={inputClass} />
//                 </div>

//                 {/* RAM */}
//                 <div>
//                   <label className={labelClass}>Product RAM</label>
//                   <select {...register("productRam")} className={selectClass}>
//                     <option value="">Select RAM</option>
//                     {ramsList.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
//                   </select>
//                 </div>

//                 {/* Size */}
//                 <div>
//                   <label className={labelClass}>Product Size</label>
//                   <select {...register("productSize")} className={selectClass}>
//                     <option value="">Select Size</option>
//                     {sizeList.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
//                   </select>
//                 </div>

//                 {/* Weight */}
//                 <div>
//                   <label className={labelClass}>Product Weight</label>
//                   <select {...register("productWeight")} className={selectClass}>
//                     <option value="">Select Weight</option>
//                     {weightList.map((w) => <option key={w._id} value={w._id}>{w.name}</option>)}
//                   </select>
//                 </div>

//               </div>
//             </div>

//             {/* Media */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center gap-2">
//                 <Upload size={18} className="text-violet-100" />
//                 <h2 className="text-white font-bold text-base">Media & Publishing</h2>
//               </div>
//               <div className="p-6">
//                 <p className="text-xs text-gray-400 mb-4 font-medium">Existing images shown below. Remove or add new ones.</p>
//                 <div className="flex flex-wrap gap-3">
//                   {existingImages.map((url, index) => (
//                     <div key={`existing-${index}`} className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-sm group">
//                       <img src={url} alt="existing" className="w-full h-full object-cover" />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-700/80 to-transparent py-1 text-center">
//                         <span className="text-white text-[9px] font-bold uppercase tracking-wider">{index === 0 ? "Cover" : "Saved"}</span>
//                       </div>
//                       <button type="button" onClick={() => removeExistingImage(index)}
//                         className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600">
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                   {previews.map((url, index) => (
//                     <div key={`new-${index}`} className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-sm group">
//                       <img src={url} alt="new" className="w-full h-full object-cover" />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700/80 to-transparent py-1 text-center">
//                         <span className="text-white text-[9px] font-bold uppercase tracking-wider">New</span>
//                       </div>
//                       <button type="button" onClick={() => removeNewImage(index)}
//                         className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600">
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                   <label className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition-all group">
//                     <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition-all">
//                       <Plus size={18} />
//                     </div>
//                     <span className="text-[9px] uppercase font-bold tracking-wider text-center px-2 leading-tight">Add New</span>
//                     <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
//                   </label>
//                 </div>
//                 {existingImages.length === 0 && selectedImages.length === 0 && (
//                   <p className="text-xs text-amber-500 mt-3 font-medium">⚠ At least one image is required.</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">

//             {/* Rating */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-80">
//                   <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
//                 </svg>
//                 <h2 className="text-white font-bold text-base">Update Rating</h2>
//               </div>
//               <div className="p-6 flex flex-col items-center gap-3">
//                 <div className="flex gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button key={star} type="button" onClick={() => setValue("rating", star)} className="transition-transform hover:scale-110 active:scale-95">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={star <= currentRating ? "#f59e0b" : "none"} stroke={star <= currentRating ? "#f59e0b" : "#d1d5db"} className="w-9 h-9 cursor-pointer">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
//                       </svg>
//                     </button>
//                   ))}
//                 </div>
//                 <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-2 text-center">
//                   <span className="text-amber-600 font-bold text-2xl">{currentRating || 0}</span>
//                   <span className="text-amber-400 text-sm"> / 5</span>
//                 </div>
//                 <input type="hidden" {...register("rating")} />
//               </div>
//             </div>

//             {/* Location */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center gap-2">
//                 <MapPin size={18} className="text-emerald-100" />
//                 <h2 className="text-white font-bold text-base">Shipping Location</h2>
//               </div>
//               <div className="p-6">
//                 <select {...register("location")} className={selectClass}>
//                   <option value="dhaka">📍 Dhaka</option>
//                   <option value="chattogram">📍 Chattogram</option>
//                 </select>
//                 <p className="text-xs text-gray-400 mt-2">Select primary shipping origin</p>
//               </div>
//             </div>

//             {/* Featured */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-80">
//                   <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                 </svg>
//                 <h2 className="text-white font-bold text-base">Featured Product</h2>
//               </div>
//               <div className="p-6">
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className="relative">
//                     <input type="checkbox" {...register("isFeatured")} className="sr-only peer" />
//                     <div className="w-11 h-6 bg-gray-200 peer-checked:bg-pink-500 rounded-full transition-all"></div>
//                     <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">Mark as Featured</span>
//                 </label>
//                 <p className="text-xs text-gray-400 mt-2">Featured products appear on the homepage</p>
//               </div>
//             </div>

//             {/* Update Summary */}
//             <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 shadow-lg text-white">
//               <h3 className="font-bold text-xs mb-4 text-emerald-200 uppercase tracking-widest">Update Summary</h3>
//               <div className="space-y-3 mb-5">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">Existing Images</span>
//                   <span className="font-bold bg-white/10 px-2.5 py-0.5 rounded-lg text-xs">{existingImages.length} saved</span>
//                 </div>
//                 <div className="w-full h-px bg-white/10" />
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">New Images</span>
//                   <span className={`font-bold px-2.5 py-0.5 rounded-lg text-xs ${selectedImages.length > 0 ? "bg-blue-400/20 text-blue-200" : "bg-white/10 text-white/60"}`}>
//                     {selectedImages.length} added
//                   </span>
//                 </div>
//                 <div className="w-full h-px bg-white/10" />
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">Rating</span>
//                   <span className="font-bold text-amber-300">{currentRating || 0} / 5 ⭐</span>
//                 </div>
//               </div>
//               <button type="submit" disabled={loading}
//                 className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${loading ? "bg-white/20 cursor-not-allowed text-white/60" : "bg-white text-emerald-700 hover:bg-emerald-50"}`}>
//                 {loading ? (
//                   <span className="flex items-center gap-2">
//                     <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     UPDATING...
//                   </span>
//                 ) : (
//                   <><CloudLightning size={18} fill="currentColor" /> UPDATE PRODUCT</>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductUpdate;















// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   CloudLightning,
//   Plus,
//   Info,
//   Upload,
//   X,
//   Home,
//   ChevronRight,
//   Package,
//   Tag,
//   DollarSign,
//   MapPin,
//   Layers,
//   RefreshCw,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { getAllCategories } from "../../../api/categoryApi";
// import { getAllSubCategories } from "../../../api/subCategoryApi";
// import { updateProduct, getProductById } from "../../../api/productApi";

// const ProductUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//     reset,
//   } = useForm({
//     defaultValues: { rating: 0, location: "dhaka" },
//   });

//   const currentRating = watch("rating");

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [catRes, subCatRes, product] = await Promise.all([
//           getAllCategories(1, 100),
//           getAllSubCategories(),
//           getProductById(id),
//         ]);

//         setCategories(catRes?.categoryList || catRes?.data || []);
//         setSubCategories(subCatRes || []);

//         reset({
//           name: product.name || "",
//           description: product.description || "",
//           category: product.category?._id || product.category || "",
//           subCat: product.subCat?._id || product.subCat || "",
//           brand: product.brand || "",
//           price: product.price || "",
//           countInStock: product.countInStock || "",
//           rating: product.rating || 0,
//           location: product.location || "dhaka",
//           isFeatured: product.isFeatured || false,
//         });

//         setExistingImages(product.images || []);
//       } catch (err) {
//         console.error("Error loading data:", err);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchAll();
//   }, [id]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages((prev) => [...prev, ...files]);
//     setPreviews((prev) => [
//       ...prev,
//       ...files.map((f) => URL.createObjectURL(f)),
//     ]);
//   };

//   const removeNewImage = (index) => {
//     setSelectedImages(selectedImages.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const removeExistingImage = (index) => {
//     setExistingImages(existingImages.filter((_, i) => i !== index));
//   };

//   const onSubmit = async (data) => {
//     if (existingImages.length === 0 && selectedImages.length === 0) {
//       return Swal.fire({
//         icon: "warning",
//         title: "No Image",
//         text: "Please keep or upload at least one image!",
//         confirmButtonColor: "#2563eb",
//       });
//     }

//     Swal.fire({
//       title: "Updating Product...",
//       text: "Please wait...",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     setLoading(true);
//     const formData = new FormData();
//     // Object.keys(data).forEach((key) => formData.append(key, data[key]));
//     // ✅ same change করো
//     Object.keys(data).forEach((key) => {
//       if (key === "isFeatured") {
//         formData.append(key, data[key] ? "true" : "false");
//       } else {
//         formData.append(key, data[key]);
//       }
//     });
//     existingImages.forEach((img) => formData.append("existingImages", img));
//     selectedImages.forEach((image) => formData.append("images", image));

//     try {
//       await updateProduct(id, formData);

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Product updated successfully! ✅",
//         timer: 2500,
//         showConfirmButton: false,
//       });

//       setTimeout(() => navigate("/products/list"), 2500);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: err.message || "Something went wrong.",
//         confirmButtonColor: "#ef4444",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="flex flex-col items-center gap-3">
//           <svg
//             className="animate-spin h-10 w-10 text-emerald-500"
//             viewBox="0 0 24 24"
//             fill="none"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             />
//           </svg>
//           <p className="text-gray-400 text-sm font-medium">
//             Loading product data...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
//       <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-6">
//         {/* Breadcrumb */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
//               <RefreshCw size={18} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-800 leading-tight">
//                 Product Update
//               </h1>
//               <p className="text-xs text-gray-400">
//                 Edit and save product changes
//               </p>
//             </div>
//           </div>
//           <nav className="flex flex-wrap gap-1.5 text-xs">
//             <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">
//               <Home size={12} />
//               <span>Dashboard</span>
//             </div>
//             <ChevronRight size={12} className="text-gray-300" />
//             <div className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">
//               Products
//             </div>
//             <ChevronRight size={12} className="text-gray-300" />
//             <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-sm">
//               Product Update
//             </div>
//           </nav>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Basic Info */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-2">
//                 <Info size={18} className="text-blue-100" />
//                 <h2 className="text-white font-bold text-base">
//                   Basic Information
//                 </h2>
//               </div>
//               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="md:col-span-2">
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
//                     Product Name
//                   </label>
//                   <input
//                     {...register("name", { required: "Name is required" })}
//                     placeholder="Ex: iPhone 15 Pro Max"
//                     className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 outline-none transition-all text-sm font-medium placeholder-gray-300 focus:bg-white focus:border-blue-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-100"}`}
//                   />
//                   {errors.name && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
//                     Description
//                   </label>
//                   <textarea
//                     rows="4"
//                     {...register("description", { required: true })}
//                     placeholder="Write a detailed product description..."
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm resize-none placeholder-gray-300"
//                   />
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
//                     <Layers size={11} /> Category
//                   </label>
//                   <select
//                     {...register("category", { required: true })}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm text-gray-600"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Sub Category */}
//                 <div>
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
//                     <Layers size={11} /> Sub Category
//                   </label>
//                   <select
//                     {...register("subCat")}
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm text-gray-600"
//                   >
//                     <option value="">Select Sub Category</option>
//                     {subCategories.map((sub) => (
//                       <option key={sub._id} value={sub._id}>
//                         {sub.subCat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
//                     <Tag size={11} /> Brand Name
//                   </label>
//                   <input
//                     {...register("brand", { required: true })}
//                     placeholder="Ex: Apple, Samsung"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
//                     <DollarSign size={11} /> Price
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
//                       $
//                     </span>
//                     <input
//                       type="number"
//                       {...register("price", { required: true })}
//                       placeholder="0.00"
//                       className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
//                     <Package size={11} /> Stock Count
//                   </label>
//                   <input
//                     type="number"
//                     {...register("countInStock", { required: true })}
//                     placeholder="0"
//                     className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Media */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center gap-2">
//                 <Upload size={18} className="text-violet-100" />
//                 <h2 className="text-white font-bold text-base">
//                   Media & Publishing
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <p className="text-xs text-gray-400 mb-4 font-medium">
//                   Existing images shown below. Remove or add new ones.
//                 </p>
//                 <div className="flex flex-wrap gap-3">
//                   {existingImages.map((url, index) => (
//                     <div
//                       key={`existing-${index}`}
//                       className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-sm group"
//                     >
//                       <img
//                         src={url}
//                         alt="existing"
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-700/80 to-transparent py-1 text-center">
//                         <span className="text-white text-[9px] font-bold uppercase tracking-wider">
//                           {index === 0 ? "Cover" : "Saved"}
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeExistingImage(index)}
//                         className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}

//                   {previews.map((url, index) => (
//                     <div
//                       key={`new-${index}`}
//                       className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-300 shadow-sm group"
//                     >
//                       <img
//                         src={url}
//                         alt="new"
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700/80 to-transparent py-1 text-center">
//                         <span className="text-white text-[9px] font-bold uppercase tracking-wider">
//                           New
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(index)}
//                         className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}

//                   <label className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition-all group">
//                     <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition-all">
//                       <Plus size={18} />
//                     </div>
//                     <span className="text-[9px] uppercase font-bold tracking-wider text-center px-2 leading-tight">
//                       Add New
//                     </span>
//                     <input
//                       type="file"
//                       multiple
//                       className="hidden"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                     />
//                   </label>
//                 </div>
//                 {existingImages.length === 0 && selectedImages.length === 0 && (
//                   <p className="text-xs text-amber-500 mt-3 font-medium">
//                     ⚠ At least one image is required.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             {/* Rating */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="white"
//                   className="w-4 h-4 opacity-80"
//                 >
//                   <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
//                 </svg>
//                 <h2 className="text-white font-bold text-base">
//                   Update Rating
//                 </h2>
//               </div>
//               <div className="p-6 flex flex-col items-center gap-3">
//                 <div className="flex gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setValue("rating", star)}
//                       className="transition-transform hover:scale-110 active:scale-95"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill={star <= currentRating ? "#f59e0b" : "none"}
//                         stroke={star <= currentRating ? "#f59e0b" : "#d1d5db"}
//                         className="w-9 h-9 cursor-pointer"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z"
//                         />
//                       </svg>
//                     </button>
//                   ))}
//                 </div>
//                 <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-2 text-center">
//                   <span className="text-amber-600 font-bold text-2xl">
//                     {currentRating || 0}
//                   </span>
//                   <span className="text-amber-400 text-sm"> / 5</span>
//                 </div>
//                 <input type="hidden" {...register("rating")} />
//               </div>
//             </div>

//             {/* Location */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center gap-2">
//                 <MapPin size={18} className="text-emerald-100" />
//                 <h2 className="text-white font-bold text-base">
//                   Shipping Location
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <select
//                   {...register("location")}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-emerald-400 focus:bg-white transition-all text-sm text-gray-600"
//                 >
//                   <option value="dhaka">📍 Dhaka</option>
//                   <option value="chattogram">📍 Chattogram</option>
//                 </select>
//                 <p className="text-xs text-gray-400 mt-2">
//                   Select primary shipping origin
//                 </p>
//               </div>
//             </div>
//             {/* Location card এর পরে এটা যোগ করো */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="white"
//                   className="w-4 h-4 opacity-80"
//                 >
//                   <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                 </svg>
//                 <h2 className="text-white font-bold text-base">
//                   Featured Product
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <label className="flex items-center gap-3 cursor-pointer group">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       {...register("isFeatured")}
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-checked:bg-pink-500 rounded-full transition-all"></div>
//                     <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5"></div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">
//                     Mark as Featured
//                   </span>
//                 </label>
//                 <p className="text-xs text-gray-400 mt-2">
//                   Featured products appear on the homepage
//                 </p>
//               </div>
//             </div>

//             {/* Update Summary */}
//             <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 shadow-lg text-white">
//               <h3 className="font-bold text-xs mb-4 text-emerald-200 uppercase tracking-widest">
//                 Update Summary
//               </h3>
//               <div className="space-y-3 mb-5">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">Existing Images</span>
//                   <span className="font-bold bg-white/10 px-2.5 py-0.5 rounded-lg text-xs">
//                     {existingImages.length} saved
//                   </span>
//                 </div>
//                 <div className="w-full h-px bg-white/10" />
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">New Images</span>
//                   <span
//                     className={`font-bold px-2.5 py-0.5 rounded-lg text-xs ${selectedImages.length > 0 ? "bg-blue-400/20 text-blue-200" : "bg-white/10 text-white/60"}`}
//                   >
//                     {selectedImages.length} added
//                   </span>
//                 </div>
//                 <div className="w-full h-px bg-white/10" />
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-emerald-200">Rating</span>
//                   <span className="font-bold text-amber-300">
//                     {currentRating || 0} / 5 ⭐
//                   </span>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${loading ? "bg-white/20 cursor-not-allowed text-white/60" : "bg-white text-emerald-700 hover:bg-emerald-50"}`}
//               >
//                 {loading ? (
//                   <span className="flex items-center gap-2">
//                     <svg
//                       className="animate-spin h-4 w-4"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v8z"
//                       />
//                     </svg>
//                     UPDATING...
//                   </span>
//                 ) : (
//                   <>
//                     <CloudLightning size={18} fill="currentColor" /> UPDATE
//                     PRODUCT
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductUpdate;
