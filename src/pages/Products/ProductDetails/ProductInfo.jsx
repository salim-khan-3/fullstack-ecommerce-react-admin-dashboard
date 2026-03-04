import React from "react";
import { Tag, Grid, Maximize, Star, Calendar } from "lucide-react";

const InfoRow = ({ icon, label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <span className="flex items-center gap-2 min-w-[110px] text-gray-500 text-xs font-bold uppercase tracking-wider">
      {icon}
      {label}
    </span>
    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
      <span className="text-gray-300 hidden sm:inline">│</span>
      {children}
    </div>
  </div>
);

const ProductInfo = ({ product }) => {
  // console.log(product.subCat.subCat);
  if (!product) return null;

  const sizes = product.sizes || ["S", "M", "L", "XL", "XS"];
  const publishedDate = product.dateCreated
    ? new Date(product.dateCreated).toLocaleDateString()
    : "N/A";
  const reviewCount = product.numReviews || 0;
  const rating = product.rating || 0;
  const subCatName =
    product.subCat && typeof product.subCat === "object"
      ? product.subCat.subCat
      : "N/A";
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          Product Details
        </span>
        <h1 className="text-2xl font-extrabold text-gray-900 leading-snug line-clamp-2">
          {product.name}
        </h1>

        {/* Star Rating Row */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={15}
                className={
                  i < Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-4">
        <InfoRow icon={<Tag size={13} />} label="Brand">
          <span className="bg-white border border-gray-200 text-gray-700 px-3 py-0.5 rounded-lg text-xs font-bold shadow-sm">
            {product.brand || "N/A"}
          </span>
        </InfoRow>

        <div className="h-px bg-gray-200" />

        <InfoRow icon={<Grid size={13} />} label="Category">
          <span className="bg-indigo-50 text-indigo-600 px-3 py-0.5 rounded-lg text-xs font-bold">
            {product.category?.name || "N/A"}
          </span>
        </InfoRow>

        <div className="h-px bg-gray-200" />
        <InfoRow icon={<Grid size={13} />} label="Sub Category">
          <span className="bg-purple-50 text-purple-600 px-3 py-0.5 rounded-lg text-xs font-bold">
            {subCatName}
          </span>
        </InfoRow>

        <div className="h-px bg-gray-200" />

        <InfoRow icon={<Maximize size={13} />} label="Size">
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                className="bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 text-gray-600 px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold uppercase transition-all"
              >
                {size}
              </button>
            ))}
          </div>
        </InfoRow>

        <div className="h-px bg-gray-200" />

        <InfoRow icon={<Calendar size={13} />} label="Published">
          <span className="text-gray-500 text-xs">{publishedDate}</span>
        </InfoRow>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Description
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
