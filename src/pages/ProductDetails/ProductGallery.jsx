import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
// আপনার node_modules পাথ অনুযায়ী CSS ইমপোর্ট করুন
import "react-inner-image-zoom/lib/styles.min.css"; 

const ProductGallery = () => {
  const images = [
    // "https://cdn.pixabay.com/photo/2018/10/23/08/18/sexy-girl-3767278_1280.jpg",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9V7UVVW0rFg4yBpDqYabbPrZE4JVN1CBh0ihCcenIxA&s", // এখানে আপনার অন্য ইমেজের লিঙ্ক দিন
    // "https://cdn.create.vista.com/api/media/small/151878952/stock-photo-beautiful-girl-in-blue-underwear",
  ];

  const [mainImg, setMainImg] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="group relative border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
        <span className="absolute top-4 left-4 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-lg uppercase tracking-wider">
          10% Off
        </span>

        <div className="w-full h-[450px] flex justify-center p-4">
          <InnerImageZoom
            src={mainImg}
            zoomSrc={mainImg}
            zoomType="hover"
            zoomScale={1.2}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImg(img)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl border-2 transition-all duration-300 overflow-hidden 
              ${mainImg === img ? "border-blue-600 ring-2 ring-blue-50" : "border-gray-100 hover:border-gray-300"}`}
          >
            <img src={img} alt="Thumb" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;