import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { 
  CloudLightning, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Layers, 
  Info, 
  MapPin, 
  Tag 
} from "lucide-react";
import { getAllCategories } from "../../api/categoryApi";

const ProductUpload = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // useForm Setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      price: "",
      countInStock: "",
      isFeatured: "false",
      location: "",
      images: [""], // শুরুতে একটি খালি লিঙ্ক ইনপুট থাকবে
    },
  });

  // Dynamic Image Links Handler
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories(1, 100);
        if (res?.categoryList) {
          setCategories(res.categoryList);
        } else if (res?.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Form Submit Logic
  const onSubmit = (data) => {
    // Schema অনুযায়ী ডেটা ক্লিন করা
    const finalProductData = {
      name: data.name,
      description: data.description,
      brand: data.brand || "",
      price: Number(data.price) || 0,
      category: data.category,
      countInStock: Number(data.countInStock) || 0,
      isFeatured: data.isFeatured === "true",
      location: data.location,
      images: data.images.filter((img) => img.trim() !== ""), // খালি ইনপুটগুলো রিমুভ করা
    };

    console.log("--- Ready for MongoDB ---", finalProductData);
    alert("Product Data Generated! Check Console. 🚀");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-gray-900">Upload New Product</h1>
          <p className="text-gray-500">Fill in the details below to publish your product.</p>
        </div>

        {/* 1. Basic Information Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Info className="text-blue-600" size={20} />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Product Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Ex: iPhone 15 Pro Max"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition-all focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100"}`}
              />
              {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Description</label>
              <textarea
                rows="4"
                {...register("description", { required: "Description is required" })}
                placeholder="Describe your product features..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
              <div className="relative">
                <select
                  {...register("category", { required: "Select a category" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">{loading ? "Loading..." : "Select Category"}</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <Tag className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Brand</label>
              <input
                {...register("brand")}
                placeholder="Ex: Apple, Samsung"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Price ($)</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Stock Count</label>
              <input
                type="number"
                {...register("countInStock", { required: "Stock is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Is Featured */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Featured Product?</label>
              <select
                {...register("isFeatured")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none cursor-pointer focus:ring-2 focus:ring-blue-100"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Shipping Location</label>
              <div className="relative">
                <select
                  {...register("location")}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Location</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                </select>
                <MapPin className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Media Section (Dynamic Links) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Layers className="text-blue-600" size={20} />
            Product Images (Links)
          </h2>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-center group">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-bold text-xs">{index + 1}</span>
                  <input
                    {...register(`images.${index}`, { required: "Link cannot be empty" })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append("")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition-all"
            >
              <Plus size={18} />
              Add More Image Link
            </button>
          </div>
        </div>

        {/* 3. Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99]"
          >
            <CloudLightning size={22} fill="currentColor" />
            PUBLISH PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;