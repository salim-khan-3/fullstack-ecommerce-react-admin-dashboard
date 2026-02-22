import React from "react";
import { Eye, Edit2, Trash2, Star } from "lucide-react";

const TableRow = ({ product }) => {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
      <td className="py-4 px-4 text-center">
        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
      </td>
      <td className="py-4 px-2 text-sm text-gray-500 font-medium">#{product.uid}</td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</p>
            <p className="text-[11px] text-gray-400 line-clamp-1">{product.desc}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-500 capitalize">{product.category}</td>
      <td className="py-4 px-4 text-sm text-gray-500 capitalize">{product.brand}</td>
      <td className="py-4 px-4">
        <p className="text-xs text-gray-400 line-through">${product.oldPrice}</p>
        <p className="text-sm font-bold text-rose-500">${product.price}</p>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600 font-medium">{product.stock}</td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">{product.order}</td>
      <td className="py-4 px-4 text-sm font-bold text-gray-700">${product.sales}</td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;