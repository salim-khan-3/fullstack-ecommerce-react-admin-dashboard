import React from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ReviewSection from './ReviewSection';

const ProductDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* Top Bar / Breadcrumb */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-700">Product View</h2>
        <div className="text-xs text-gray-400 flex items-center gap-2">
           <span className="bg-gray-100 px-2 py-1 rounded">🏠 Dashboard</span> / <span>Products</span> / <span>Product View</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProductGallery />
          <ProductInfo />
        </div>
        <ReviewSection />
      </div>
    </div>
  );
};

export default ProductDetails;




// import React from 'react';
// import { ShoppingCart, Star, Tag, Layers, Grid, Palette, Ruler } from 'lucide-react';

// const ProductDetails = () => {
//   const product = {
//     title: "Formal suits for men wedding slim fit 3 piece dress business party jacket",
//     brand: "Ecstasy",
//     category: "Man's",
//     tags: ["SUITE", "PARTY", "DRESS", "SMART", "MAN", "STYLES"],
//     colors: ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE"],
//     sizes: ["SM", "MD", "LG", "XL", "XXL"],
//     price: 37.00,
//     oldPrice: 42.00,
//     stock: 68,
//     reviews: 3,
//     imageUrl: "https://v-p.com.bd/public/uploads/all/M5yM9Nn8Tz5qW6e8z8e8.jpg" // ছবির লিঙ্ক এখানে দিতে পারো
//   };

//   return (
//     <div className="min-h-screen bg-[#000d26] text-white p-4 md:p-10 font-sans">
//       {/* Breadcrumb Section */}
//       <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
//         <h1 className="text-2xl font-bold">Product View</h1>
//         <nav className="text-sm">
//           <span className="text-blue-400">Home</span> ~ 
//           <span className="text-blue-400"> Products</span> ~ 
//           <span className="text-gray-400"> Product View</span>
//         </nav>
//       </div>

//       <div className="max-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#06163a] p-8 rounded-lg shadow-2xl">
        
//         {/* Product Gallery Section */}
//         <div>
//           <h2 className="text-xl mb-6 font-semibold">Product Gallery</h2>
//           <div className="bg-white rounded-lg p-6 flex justify-center items-center">
//              <img 
//               src="https://i.ibb.co/v4m0YvL/suit.png" // তোমার ইমেজের সোর্স এখানে দাও
//               alt="Formal Suit" 
//               className="max-h-[400px] object-contain"
//             />
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div>
//           <h2 className="text-xl mb-6 font-semibold border-b border-gray-700 pb-2">Product Details</h2>
          
//           <h3 className="text-2xl font-medium leading-tight mb-6">
//             {product.title}
//           </h3>

//           <div className="space-y-4">
//             {/* Brand */}
//             <div className="flex items-center gap-4">
//               <Grid size={18} className="text-gray-400" />
//               <span className="w-24 text-gray-300">Brand</span>
//               <span className="text-gray-400">: &nbsp; {product.brand}</span>
//             </div>

//             {/* Category */}
//             <div className="flex items-center gap-4">
//               <Layers size={18} className="text-gray-400" />
//               <span className="w-24 text-gray-300">Category</span>
//               <span className="text-gray-400">: &nbsp; {product.category}</span>
//             </div>

//             {/* Tags */}
//             <div className="flex items-start gap-4">
//               <Tag size={18} className="text-gray-400 mt-1" />
//               <span className="w-24 text-gray-300">Tags</span>
//               <div className="flex flex-wrap gap-2">
//                 <span>:</span>
//                 {product.tags.map(tag => (
//                   <span key={tag} className="bg-[#1a2b4e] px-2 py-1 text-xs rounded text-gray-300 uppercase">
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selection */}
//             <div className="flex items-start gap-4">
//               <Palette size={18} className="text-gray-400 mt-1" />
//               <span className="w-24 text-gray-300">Color</span>
//               <div className="flex flex-wrap gap-2">
//                 <span>:</span>
//                 {product.colors.map(color => (
//                   <span key={color} className="bg-[#1a2b4e] px-2 py-1 text-xs rounded text-gray-300 cursor-pointer hover:bg-blue-600 transition">
//                     {color}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div className="flex items-start gap-4">
//               <Ruler size={18} className="text-gray-400 mt-1" />
//               <span className="w-24 text-gray-300">Size</span>
//               <div className="flex flex-wrap gap-2">
//                 <span>:</span>
//                 {product.sizes.map(size => (
//                   <span key={size} className="bg-[#1a2b4e] px-2 py-1 text-xs rounded text-gray-300 cursor-pointer hover:bg-blue-600 transition">
//                     {size}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-4">
//               <Tag size={18} className="text-gray-400" />
//               <span className="w-24 text-gray-300">Price</span>
//               <span className="text-gray-400 flex items-center gap-2">
//                 : &nbsp; <span className="text-xl text-blue-400">${product.price.toFixed(2)}</span>
//                 <span className="line-through text-red-500 text-sm">${product.oldPrice.toFixed(2)}</span>
//               </span>
//             </div>

//             {/* Stock */}
//             <div className="flex items-center gap-4">
//               <ShoppingCart size={18} className="text-gray-400" />
//               <span className="w-24 text-gray-300">Stock</span>
//               <span className="text-gray-400">: &nbsp; ({product.stock}) Piece</span>
//             </div>

//             {/* Review */}
//             <div className="flex items-center gap-4">
//               <Star size={18} className="text-gray-400" />
//               <span className="w-24 text-gray-300">Review</span>
//               <span className="text-gray-400">: &nbsp; ({product.reviews.toString().padStart(2, '0')}) Review</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;