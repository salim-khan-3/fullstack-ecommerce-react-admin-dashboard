// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { CloudLightning, Plus, Info, Upload, X } from "lucide-react";
// import { getAllCategories } from "../../api/categoryApi";
// import { createProduct } from "../../api/productApi"; // শুধুমাত্র ক্রিয়েট ফাংশন

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
//   } = useForm();

// // load category data on component mount
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

//   // ২. select image and create preview
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages((prevImages) => [...prevImages, ...files]);

//     // create object URLs for previews
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
//   };
//   // ৩. remove selected image
//   const removeImage = (index) => {
//     const updatedImages = selectedImages.filter((_, i) => i !== index);
//     const updatedPreviews = previews.filter((_, i) => i !== index);

//     setSelectedImages(updatedImages);
//     setPreviews(updatedPreviews);
//   };

//   // ৪. form submit logic(API Call)
//   const onSubmit = async (data) => {
//     if (selectedImages.length === 0)
//       return alert("Please upload at least one image");

//     setLoading(true);
//     const formData = new FormData();

//     Object.keys(data).forEach((key) => {
//       formData.append(key, data[key]);
//     });

//     selectedImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     try {
//       await createProduct(formData);

//       alert("Product Published Successfully! 🚀");

//       reset();
//       setSelectedImages([]);
//       setPreviews([]);
//     } catch (err) {
//       console.error("Upload Error:", err);
//       alert(err.message || "Something went wrong during upload.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center font-sans">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-5xl space-y-8"
//       >
//         {/* Header */}
//         <div className="flex flex-col gap-1">
//           <h1 className="text-3xl font-extrabold text-gray-900">
//             Upload New Product
//           </h1>
//           <p className="text-gray-500">
//             Add photos and details about your product.
//           </p>
//         </div>

//         {/* 1. Basic Information Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//           <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <Info className="text-blue-600" size={20} />
//             Basic Information
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
//             <Upload className="text-blue-600" size={20} />
//             Media And Published
//           </h2>

//           <div className="flex flex-wrap gap-4">
//             {/* ইমেজ প্রিভিউ কার্ড */}
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
//           <p className="text-xs text-gray-400 mt-4 italic">
//             * You can upload multiple images.
//           </p>
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
//                 <CloudLightning size={22} fill="currentColor" />
//                 PUBLISH PRODUCT
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductUpload;
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CloudLightning, Plus, Info, Upload, X } from "lucide-react";
import Swal from "sweetalert2";
import { getAllCategories } from "../../api/categoryApi";
import { createProduct } from "../../api/productApi";

const ProductUpload = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // ভ্যালু সেট করার জন্য
    watch,    // ভ্যালু পর্যবেক্ষণ করার জন্য
  } = useForm({
    defaultValues: {
      rating: 0, // ডিফল্ট রেটিং ০
      location: "dhaka"
    }
  });

  // বর্তমানে রেটিং কত আছে তা ট্র্যাক করার জন্য
  const currentRating = watch("rating");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCategories(1, 100);
        setCategories(res?.categoryList || res?.data || []);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (selectedImages.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please upload at least one image!",
        confirmButtonColor: "#2563eb",
      });
    }

    Swal.fire({
      title: "Publishing Product...",
      text: "Please wait while we upload your product.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setLoading(true);
    const formData = new FormData();
    
    // ডাটা অবজেক্টের সব কিছু (rating সহ) formData তে অ্যাড করা
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    
    // ইমেজগুলো অ্যাড করা
    selectedImages.forEach((image) => formData.append("images", image));

    try {
      await createProduct(formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Product Published Successfully! 🚀",
        timer: 3000,
        showConfirmButton: false,
      });

      reset();
      setSelectedImages([]);
      setPreviews([]);
    } catch (err) {
      console.error("Upload Error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong during upload.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-gray-900">Upload New Product</h1>
          <p className="text-gray-500">Add photos and details about your product.</p>
        </div>

        {/* 1. Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Info className="text-blue-600" size={20} /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Product Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Ex: iPhone 15 Pro Max"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition-all focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100"}`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Description</label>
              <textarea
                rows="4"
                {...register("description", { required: "Description is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Brand Name</label>
              <input
                {...register("brand", { required: "Brand is required" })}
                placeholder="Ex: Apple, Samsung"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Price ($)</label>
              <input type="number" {...register("price", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none" />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Stock Count</label>
              <input type="number" {...register("countInStock", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none" />
            </div>

            {/* Rating Section */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Initial Rating</label>
              <div className="flex gap-1 bg-gray-50 p-3 rounded-xl border border-gray-200 w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className="transition-transform active:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={star <= currentRating ? "#fbbf24" : "none"}
                      stroke={star <= currentRating ? "#fbbf24" : "#9ca3af"}
                      className="w-8 h-8 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.323a1 1 0 00.95.69h6.646c.969 0 1.371 1.24.588 1.81l-5.378 3.903a1 1 0 00-.364 1.118l2.07 6.323c.3.921-.755 1.688-1.54 1.118l-5.378-3.903a1 1 0 00-1.175 0l-5.378 3.903c-.785.57-1.838-.197-1.539-1.118l2.07-6.323a1 1 0 00-.364-1.118L2.245 11.75c-.783-.57-.38-1.81.588-1.81h6.646a1 1 0 00.95-.69l2.07-6.323z"
                      />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-gray-500 font-bold self-center">({currentRating || 0})</span>
              </div>
              <input type="hidden" {...register("rating")} />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Shipping Location</label>
              <select {...register("location")} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none">
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Media Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Upload className="text-blue-600" size={20} /> Media And Published
          </h2>
          <div className="flex flex-wrap gap-4">
            {previews.map((url, index) => (
              <div key={index} className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                <img src={url} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <label className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all bg-gray-50">
              <Plus size={24} />
              <span className="text-[10px] uppercase font-bold mt-2 text-center px-2">Image Upload</span>
              <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]`}
          >
            {loading ? "PUBLISHING..." : (
              <><CloudLightning size={22} fill="currentColor" /> PUBLISH PRODUCT</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;