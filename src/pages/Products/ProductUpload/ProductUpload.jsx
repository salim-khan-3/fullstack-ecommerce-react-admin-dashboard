



import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CloudLightning, Plus, Info, Upload, X, Home,
  ChevronRight, Package, Tag, DollarSign, MapPin, Layers
} from "lucide-react";
import Swal from "sweetalert2";
import { getAllCategories } from "../../../api/categoryApi";
import { createProduct } from "../../../api/productApi";

const ProductUpload = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: { rating: 0, location: "dhaka" },
  });

  const currentRating = watch("rating");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCategories(1, 100);
        setCategories(res?.categoryList || res?.data || []);
      } catch (err) { console.error("Error loading categories:", err); }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (selectedImages.length === 0) {
      return Swal.fire({ icon: "warning", title: "No Image Selected", text: "Please upload at least one image!", confirmButtonColor: "#2563eb" });
    }
    Swal.fire({ title: "Publishing Product...", text: "Please wait...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    selectedImages.forEach((image) => formData.append("images", image));
    try {
      await createProduct(formData);
      Swal.fire({ icon: "success", title: "Success!", text: "Product Published Successfully! 🚀", timer: 3000, showConfirmButton: false });
      reset(); setSelectedImages([]); setPreviews([]);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops...", text: err.message || "Something went wrong.", confirmButtonColor: "#ef4444" });
    } finally { setLoading(false); }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-6">

        {/* ── Breadcrumb Header ── */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Package size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight">Product Upload</h1>
              <p className="text-xs text-gray-400">Add a new product to your inventory</p>
            </div>
          </div>
          <nav className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">
              <Home size={12} /><span>Dashboard</span>
            </div>
            <ChevronRight size={12} className="text-gray-300" />
            <div className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">Products</div>
            <ChevronRight size={12} className="text-gray-300" />
            <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm">Product Upload</div>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-2">
                <Info size={18} className="text-blue-100" />
                <h2 className="text-white font-bold text-base">Basic Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Product Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Ex: iPhone 15 Pro Max"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-gray-50 outline-none transition-all text-sm font-medium placeholder-gray-300 focus:bg-white focus:border-blue-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-100"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                  <textarea
                    rows="4"
                    {...register("description", { required: true })}
                    placeholder="Write a detailed product description..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm resize-none placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Layers size={11} /> Category</label>
                  <select {...register("category", { required: true })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm text-gray-600">
                    <option value="">Select Category</option>
                    {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Tag size={11} /> Brand Name</label>
                  <input {...register("brand", { required: true })} placeholder="Ex: Apple, Samsung" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><DollarSign size={11} /> Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                    <input type="number" {...register("price", { required: true })} placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Package size={11} /> Stock Count</label>
                  <input type="number" {...register("countInStock", { required: true })} placeholder="0" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-all text-sm placeholder-gray-300" />
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
                <p className="text-xs text-gray-400 mb-4 font-medium">Upload high-quality images. First image will be the cover.</p>
                <div className="flex flex-wrap gap-3">
                  {previews.map((url, index) => (
                    <div key={index} className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm group">
                      <img src={url} alt="preview" className="w-full h-full object-cover" />
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1 text-center">
                          <span className="text-white text-[9px] font-bold uppercase tracking-wider">Cover</span>
                        </div>
                      )}
                      <button type="button" onClick={() => removeImage(index)} className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 cursor-pointer transition-all group">
                    <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition-all">
                      <Plus size={18} />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-center px-2 leading-tight">Add Image</span>
                    <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
                {previews.length === 0 && <p className="text-xs text-amber-500 mt-3 font-medium">⚠ At least one image is required to publish.</p>}
              </div>
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-6">

            {/* Rating */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-80">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z" />
                </svg>
                <h2 className="text-white font-bold text-base">Initial Rating</h2>
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
                <select {...register("location")} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-emerald-400 focus:bg-white transition-all text-sm text-gray-600">
                  <option value="dhaka">📍 Dhaka</option>
                  <option value="chattogram">📍 Chattogram</option>
                </select>
                <p className="text-xs text-gray-400 mt-2">Select primary shipping origin</p>
              </div>
            </div>

            {/* Publish Summary */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="font-bold text-xs mb-4 text-blue-200 uppercase tracking-widest">Publish Summary</h3>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Images</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-lg text-xs ${selectedImages.length > 0 ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}`}>
                    {selectedImages.length} uploaded
                  </span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Rating</span>
                  <span className="font-bold text-amber-300">{currentRating || 0} / 5 ⭐</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Status</span>
                  <span className="font-bold text-green-300 bg-green-400/20 px-2.5 py-0.5 rounded-lg text-xs">Ready</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${loading ? "bg-white/20 cursor-not-allowed text-white/60" : "bg-white text-blue-700 hover:bg-blue-50"}`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    PUBLISHING...
                  </span>
                ) : (
                  <><CloudLightning size={18} fill="currentColor" /> PUBLISH PRODUCT</>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { CloudLightning, Plus, Info, Upload, X, Home } from "lucide-react";
// import Swal from "sweetalert2";
// import { getAllCategories } from "../../../api/categoryApi";
// import { createProduct } from "../../../api/productApi";

// const ProductUpload = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue, // ভ্যালু সেট করার জন্য
//     watch, // ভ্যালু পর্যবেক্ষণ করার জন্য
//   } = useForm({
//     defaultValues: {
//       rating: 0, // ডিফল্ট রেটিং ০
//       location: "dhaka",
//     },
//   });

//   // বর্তমানে রেটিং কত আছে তা ট্র্যাক করার জন্য
//   const currentRating = watch("rating");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllCategories(1, 100);
//         setCategories(res?.categoryList || res?.data || []);
//       } catch (err) {
//         console.error("Error loading categories:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages((prevImages) => [...prevImages, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     setSelectedImages(selectedImages.filter((_, i) => i !== index));
//     setPreviews(previews.filter((_, i) => i !== index));
//   };

//   const onSubmit = async (data) => {
//     if (selectedImages.length === 0) {
//       return Swal.fire({
//         icon: "warning",
//         title: "No Image Selected",
//         text: "Please upload at least one image!",
//         confirmButtonColor: "#2563eb",
//       });
//     }

//     Swal.fire({
//       title: "Publishing Product...",
//       text: "Please wait while we upload your product.",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     setLoading(true);
//     const formData = new FormData();

//     // ডাটা অবজেক্টের সব কিছু (rating সহ) formData তে অ্যাড করা
//     Object.keys(data).forEach((key) => formData.append(key, data[key]));

//     // ইমেজগুলো অ্যাড করা
//     selectedImages.forEach((image) => formData.append("images", image));

//     try {
//       await createProduct(formData);

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Product Published Successfully! 🚀",
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       reset();
//       setSelectedImages([]);
//       setPreviews([]);
//     } catch (err) {
//       console.error("Upload Error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: err.message || "Something went wrong during upload.",
//         confirmButtonColor: "#ef4444",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" bg-gray-50 p-4  flex justify-center font-sans">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full space-y-8"
//       >
//        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
//       {/* বাম দিকের টাইটেল */}
//       <h1 className="text-xl font-semibold text-gray-800">Product Upload</h1>

//       {/* ডান দিকের Breadcrumb */}
//       <nav className="flex items-center space-x-2 text-sm">
//         {/* Dashboard Link */}
//         <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer transition">
//           <Home size={14} className="mr-1.5" />
//           <span>Dashboard</span>
//         </div>

//         <span className="text-gray-400">/</span>

//         {/* Products Link */}
//         <div className="bg-gray-100 px-4 py-1.5 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer transition">
//           <span>Products</span>
//         </div>

//         <span className="text-gray-400">/</span>

//         {/* Current Page */}
//         <div className="bg-gray-100 px-4 py-1.5 rounded-full text-gray-800 font-medium">
//           <span>Product Upload</span>
//         </div>
//       </nav>
//     </div>

//         {/* 1. Basic Information */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//           <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <Info className="text-blue-600" size={20} /> Basic Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Product Name
//               </label>
//               <input
//                 {...register("name", { required: "Name is required" })}
//                 placeholder="Ex: iPhone 15 Pro Max"
//                 className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition-all focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100"}`}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Description
//               </label>
//               <textarea
//                 rows="4"
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Category
//               </label>
//               <select
//                 {...register("category", { required: "Category is required" })}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat._id} value={cat._id}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Brand Name
//               </label>
//               <input
//                 {...register("brand", { required: "Brand is required" })}
//                 placeholder="Ex: Apple, Samsung"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Price ($)
//               </label>
//               <input
//                 type="number"
//                 {...register("price", { required: true })}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Stock Count
//               </label>
//               <input
//                 type="number"
//                 {...register("countInStock", { required: true })}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
//               />
//             </div>

//             {/* Rating Section */}
//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Initial Rating
//               </label>
//               <div className="flex gap-1 bg-gray-50 p-3 rounded-xl border border-gray-200 w-fit">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setValue("rating", star)}
//                     className="transition-transform active:scale-110"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill={star <= currentRating ? "#fbbf24" : "none"}
//                       stroke={star <= currentRating ? "#fbbf24" : "#9ca3af"}
//                       className="w-8 h-8 cursor-pointer"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z"
//                       />
//                     </svg>
//                   </button>
//                 ))}
//                 <span className="ml-2 text-gray-500 font-bold self-center">
//                   ({currentRating || 0})
//                 </span>
//               </div>
//               <input type="hidden" {...register("rating")} />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                 Shipping Location
//               </label>
//               <select
//                 {...register("location")}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
//               >
//                 <option value="dhaka">Dhaka</option>
//                 <option value="chattogram">Chattogram</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* 2. Media Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//           <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <Upload className="text-blue-600" size={20} /> Media And Published
//           </h2>
//           <div className="flex flex-wrap gap-4">
//             {previews.map((url, index) => (
//               <div
//                 key={index}
//                 className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm group"
//               >
//                 <img
//                   src={url}
//                   alt="preview"
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ))}
//             <label className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all bg-gray-50">
//               <Plus size={24} />
//               <span className="text-[10px] uppercase font-bold mt-2 text-center px-2">
//                 Image Upload
//               </span>
//               <input
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleImageChange}
//                 accept="image/*"
//               />
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]`}
//           >
//             {loading ? (
//               "PUBLISHING..."
//             ) : (
//               <>
//                 <CloudLightning size={22} fill="currentColor" /> PUBLISH PRODUCT
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductUpload;
