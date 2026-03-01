import React from "react";
import { Eye, Edit2, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TableRow = ({ product }) => {
  // ডাটাবেসের ডেটা অনেক সময় অবজেক্ট আকারে থাকে, সেগুলো হ্যান্ডেল করার লজিক:
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const brandName = typeof product.brand === 'object' ? product.brand.name : product.brand;
  
  // ইমেজের ক্ষেত্রে যদি অ্যারে থাকে তবে প্রথম ইমেজটি নিবে
  const productImage = Array.isArray(product.images) ? product.images[0] : (product.image || "https://via.placeholder.com/50");

  return (
    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
      <td className="py-4 px-4 text-center">
        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
      </td>
      
      {/* UID: যদি uid না থাকে তবে Mongo _id এর শেষ ৫ অক্ষর দেখাবে */}
      <td className="py-4 px-2 text-sm text-gray-500 font-medium">
        #{product.uid || product._id?.slice(-5).toUpperCase()}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img src={productImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</p>
            {/* description অবজেক্ট হলে এরর দিবে, তাই string নিশ্চিত করা হয়েছে */}
            <p className="text-[11px] text-gray-400 line-clamp-1">{String(product.desc || "")}</p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-sm text-gray-500 capitalize">{categoryName}</td>
      <td className="py-4 px-4 text-sm text-gray-500 capitalize">{brandName}</td>
      
      <td className="py-4 px-4">
        {product.oldPrice && (
          <p className="text-xs text-gray-400 line-through">${product.oldPrice}</p>
        )}
        <p className="text-sm font-bold text-rose-500">${product.price}</p>
      </td>

      <td className="py-4 px-4 text-sm text-gray-600 font-medium">{product.stock || 0}</td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-700">{product.rating || 0}</span>
          <span className="text-xs text-gray-400">({product.reviews || 0})</span>
        </div>
      </td>

      <td className="py-4 px-4 text-sm text-gray-600">{product.order || 0}</td>
      <td className="py-4 px-4 text-sm font-bold text-gray-700">${product.sales || 0}</td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <Link to={`/product/details/${product._id}`}>
            <button className="p-1.5 cursor-pointer bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              <Eye size={16} />
            </button>
          </Link>
          <button className="p-1.5 cursor-pointer bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 cursor-pointer bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;