
import TableRow from "../TableRow/TableRow";
import Loader from "../../Loader/Loader"; // Marvel-style loader import
import { useProducts } from "../../../context/hooks/useProducts";

const ProductTable = ({products, loading}) => {
const {productDeleteFunc} = useProducts()

  const headers = [
    "UID",
    "PRODUCT",
    "CATEGORY",
    "BRAND",
    "PRICE",
    "STOCK",
    "RATING",
    "ORDER",
    "SALES",
    "ACTION",
  ];

  return (
    <div className="bg-white rounded-b-2xl shadow-sm border-x border-b border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white uppercase text-[11px] font-bold tracking-wider">
              <th className="py-4 px-4 text-center">
                <input
                  type="checkbox"
                  className="rounded border-white/30 bg-transparent cursor-pointer"
                />
              </th>
              {headers.map((head) => (
                <th key={head} className="py-4 px-4 font-bold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* 🔥 Loader দেখানো */}
            {loading ? (
              <tr>
                <td colSpan={headers.length + 1} className="py-20 text-center">
                  <Loader />
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id || product.uid} product={product} onDelete={productDeleteFunc}  />
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="py-10 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;