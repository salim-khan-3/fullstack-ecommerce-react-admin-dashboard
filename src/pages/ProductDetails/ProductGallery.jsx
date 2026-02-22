import React from "react";
import InnerImageZoom from "react-inner-image-zoom";

const ProductGallery = () => {
  const images = [
    "https://i.ibb.co/v4m0YvL/suit.png",
    "https://i.ibb.co/v4m0YvL/suit.png",
    "https://i.ibb.co/v4m0YvL/suit.png",
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-gray-500 font-semibold mb-2">Product Gallery</h2>

      {/* Main Image with Zoom */}
      <div className="relative border rounded-lg p-2 bg-white flex justify-center">
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
          10%
        </span>

        <div className="w-full max-w-md">
          <InnerImageZoom
            src={images[0]}
            zoomSrc={images[0]}
            zoomType="hover"
            zoomScale={1.5}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-20 h-20 border rounded-md p-1 cursor-pointer hover:border-blue-500"
          >
            <img
              src={img}
              alt="Thumb"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;