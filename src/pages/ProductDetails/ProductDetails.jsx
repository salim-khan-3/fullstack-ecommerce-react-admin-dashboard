import React from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ReviewSection from './ReviewSection';

const ProductDetails = () => {
  return (
    <div className="bg-gray-100 px-3 sm:px-4 md:px-8 py-4 md:py-8">
      
      {/* Top Bar */}
      <div className="w-full max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-gray-700">Product View</h2>

        <div className="text-xs text-gray-400 flex flex-wrap items-center gap-2">
          <span className="bg-gray-100 px-2 py-1 rounded">🏠 Dashboard</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span>Product View</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
        
        {/* Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <ProductGallery />
          <ProductInfo />
        </div>

        <ReviewSection />
      </div>
    </div>
  );
};

export default ProductDetails;