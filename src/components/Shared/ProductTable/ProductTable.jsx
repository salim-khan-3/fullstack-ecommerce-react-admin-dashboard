import TableRow from "../TableRow/TableRow";

const ProductTable = ({ products, loading }) => {
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

  if (loading) {
    return (
      <div className="bg-white p-10 text-center rounded-b-2xl border border-gray-100 shadow-sm">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        <p className="mt-2 text-gray-500 font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-b-2xl shadow-sm border-x border-b border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-[11px] font-bold tracking-wider">
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
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id || product.uid} product={product} />
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