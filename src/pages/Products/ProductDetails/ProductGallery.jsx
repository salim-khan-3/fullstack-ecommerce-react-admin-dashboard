import React, { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const ProductGallery = ({ product }) => {
  const images = product?.images || [];
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (images.length > 0) setMainImg(images[0]);
  }, [images]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-[460px] rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-gray-400 text-sm font-medium">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative border border-gray-100 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-xl transition-all duration-300"
        style={{ height: "460px" }}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
          Zoom
        </div>

        {mainImg && (
          <div className="w-full h-full">
            <InnerImageZoom
              src={mainImg}
              zoomSrc={mainImg}
              zoomType="hover"
              zoomScale={1.5}
              zoomPreload={true}
              className="w-full h-full"
              imgAttributes={{
                style: {
                  width: "100%",
                  height: "460px",
                  objectFit: "cover",
                  display: "block",
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImg(img)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-2xl border-2 overflow-hidden transition-all duration-200
              ${mainImg === img
                ? "border-blue-600 ring-4 ring-blue-100 scale-105 shadow-md"
                : "border-gray-100 hover:border-blue-300 hover:scale-105 hover:shadow-sm"
              }`}
          >
            <img
              src={img}
              alt={`Thumbnail-${idx}`}
              className="w-full h-full object-cover"
            />
            {mainImg === img && (
              <div className="absolute inset-0 bg-blue-600/10 rounded-2xl" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;