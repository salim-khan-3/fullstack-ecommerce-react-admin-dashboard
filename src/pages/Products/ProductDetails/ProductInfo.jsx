import React from 'react';
import { Tag, Grid, Maximize, Star, Calendar } from 'lucide-react';

const ProductInfo = () => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-gray-500 font-semibold mb-4">Product Details</h2>
        <h1 className="text-xl font-bold text-gray-800">Glito Black Solid Dry-Fit Regular Fit Sports Wear Jacket/Upper For Men</h1>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <span className="flex items-center gap-2 w-24 text-gray-600 font-medium"><Tag size={16}/> Brand</span>
          <span className="text-gray-500">: &nbsp; V-Mart</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <span className="flex items-center gap-2 w-24 text-gray-600 font-medium"><Grid size={16}/> Category</span>
          <span className="text-gray-500">: &nbsp; Fashion</span>
        </div>
        <div cclassName="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <span className="flex items-center gap-2 w-24 text-gray-600 font-medium"><Maximize size={16}/> SIZE</span>
          <div className="flex gap-2 items-center">
             <span>:</span>
             {['S', 'M', 'L', 'XL', 'XS'].map(size => (
               <button key={size} className="bg-gray-200 px-2 py-0.5 rounded text-[10px] hover:bg-blue-500 hover:text-white transition uppercase font-bold text-gray-600">{size}</button>
             ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <span className="flex items-center gap-2 w-24 text-gray-600 font-medium"><Star size={16}/> Review</span>
          <span className="text-gray-500">: &nbsp; (4) Review</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-10">
          <span className="flex items-center gap-2 w-24 text-gray-600 font-medium"><Calendar size={16}/> Published</span>
          <span className="text-gray-500">: &nbsp; 2024-09-17T02:35:38.759Z</span>
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-gray-700 font-bold mb-2">Product Description</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;