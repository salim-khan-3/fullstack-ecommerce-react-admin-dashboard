import React, { useContext } from "react";
import { Eye, Edit2, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { ProductContext } from "../../../context/ProductContext"; // Update path
import { deleteProduct as deleteProductApi } from "../../../api/productApi"; // Update path

const TableRow = ({ product }) => {
  const { setProducts } = useContext(ProductContext);

  console.log(product);

  // এইভাবে করো
  const categoryName =
    product.category && typeof product.category === "object"
      ? product.category.name
      : product.category || "N/A";

  const brandName =
    product.brand && typeof product.brand === "object"
      ? product.brand.name
      : product.brand || "N/A";

  // const categoryName =
  //   typeof product.category === "object"
  //     ? product.category.name
  //     : product.category;
  // const brandName =
  //   typeof product.brand === "object" ? product.brand.name : product.brand;

  const productImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image || "https://via.placeholder.com/50";

  // Delete Handler Function inside the component
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 1. Call the API to delete from Database
          await deleteProductApi(id);

          // 2. Update the Global Context State to remove it from UI
          setProducts((prev) => prev.filter((item) => item._id !== id));

          // 3. Show Success Message
          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
      <td className="py-4 px-4 text-center">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-blue-600"
        />
      </td>

      <td className="py-4 px-2 text-sm text-gray-500 font-medium">
        #{product.uid || product._id?.slice(-5).toUpperCase()}
      </td>

      <td className="py-4 px-4 min-w-[200px]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 max-w-[180px]">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {product.name}
            </p>
            <p className="text-[11px] text-gray-400 truncate italic">
              {product.description || "No description available"}
            </p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-sm text-gray-500 capitalize">
        {categoryName}
      </td>
      <td className="py-4 px-4 text-sm text-gray-500 capitalize">
        {product.subCat?.subCat || "N/A"}
      </td>
      <td className="py-4 px-4 text-sm text-gray-500 capitalize">
        {brandName}
      </td>

      <td className="py-4 px-4">
        {product.oldPrice && (
          <p className="text-xs text-gray-400 line-through">
            ${product.oldPrice}
          </p>
        )}
        <p className="text-sm font-bold text-rose-500">${product.price}</p>
      </td>

      <td className="py-4 px-4 text-sm text-gray-600 font-medium">
        {product.countInStock || 0}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-1">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-gray-700">
            {product.rating || 0}
          </span>
        </div>
      </td>

      <td className="py-4 px-4 text-sm text-gray-600">{product.order || 0}</td>
      <td className="py-4 px-4 text-sm font-bold text-gray-700">
        ${product.sales || 0}
      </td>

      <td className="py-4 px-4 text-right">
        <div className="flex items-center space-x-2">
          <Link to={`/product/details/${product._id}`} className="">
            <button className="p-1.5 bg-purple-50 cursor-pointer text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
              <Eye size={16} />
            </button>
          </Link>

          <Link
            to={`/product/update/${product._id}`}
            className="cursor-pointer"
          >
            <button className="p-1.5 cursor-pointer bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
              <Edit2 size={16} />
            </button>
          </Link>

          {/* Trigger handleDelete when clicking Trash icon */}
          <button
            onClick={() => handleDelete(product._id)}
            className="p-1.5 cursor-pointer bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all active:scale-90"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
