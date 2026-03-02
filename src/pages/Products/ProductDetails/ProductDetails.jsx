import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ReviewSection from './ReviewSection';
import Loader from '../../../components/Loader/Loader';
import { getProductById } from "../../../api/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        console.log("Fetched Product Data:", data); // এখানে ডাটা আসছে কি না চেক করুন
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="p-10 text-center text-red-500 font-bold">Product not found in database!</div>;

  return (
    <div className="bg-gray-100 px-3 sm:px-4 md:px-8 py-4 md:py-8">
      {/* Top Bar omitted for brevity */}

      <div className="w-full max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* এইখানে প্রপস পাস করা খুবই জরুরি */}
          <ProductGallery images={product.images || [product.image]} />
          <ProductInfo product={product} />
        </div>

        {/* যদি আপনার স্কিমাতে reviews থাকে */}
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