import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import { getProductById } from "../../../api/productApi";
import { ArrowLeft, ChevronRight, Home, Package, PlusIcon } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data.data || data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="text-center text-red-500 font-bold p-10">
        Product not found!
      </div>
    );

  return (
    <div>
      {/* ── Breadcrumb Header ── */}
      <div className="bg-white/80 mb-10 backdrop-blur-sm rounded-2xl border border-white shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Icon + Title */}
        <div className="flex items-center gap-3">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:shadow-blue-300 transition-all duration-200 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* Right: Breadcrumb */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs flex-wrap">
          <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">
            <Home size={11} />
            <span>Dashboard</span>
          </div>
          <ChevronRight size={11} className="text-gray-300 flex-shrink-0" />
          <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all text-gray-500">
            Products
          </div>
          <ChevronRight size={11} className="text-gray-300 flex-shrink-0" />
          <div className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm whitespace-nowrap">
            Product View
          </div>
        </nav>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <ReviewSection reviews={product.reviews || []} />
      </div>
    </div>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from 'react';
// import ProductGallery from './ProductGallery';
// import ProductInfo from './ProductInfo';
// import ReviewSection from './ReviewSection';
// import { useParams } from 'react-router-dom';
// import Loader from '../../../components/Loader/Loader';
// import {getProductById} from "../../../api/productApi"

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await getProductById(id);
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);
// console.log(product);
//   if (loading) return <Loader />;
//   if (!product) return <div className="p-10 text-center">Product not found!</div>;
//   return (
//     <div className="bg-gray-100 px-3 sm:px-4 md:px-8 py-4 md:py-8">

//       {/* Top Bar */}
//       <div className="w-full max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
//         <h2 className="text-lg font-bold text-gray-700">Product View</h2>

//         <div className="text-xs text-gray-400 flex flex-wrap items-center gap-2">
//           <span className="bg-gray-100 px-2 py-1 rounded">🏠 Dashboard</span>
//           <span>/</span>
//           <span>Products</span>
//           <span>/</span>
//           <span>Product View</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">

//         {/* Gallery + Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
//           <ProductGallery />
//           <ProductInfo />
//         </div>

//         <ReviewSection />
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
