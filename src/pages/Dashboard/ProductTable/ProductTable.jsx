import TableFilters from "../TableFilters/TableFilters";
import TableRow from "../TableRow/TableRow";


const ProductTable = () => {
  const products = [
    {
      uid: "1",
      name: "Tops and skirt...",
      desc: "Women's exclu...",
      image: "https://via.placeholder.com/50",
      category: "womans",
      brand: "richman",
      oldPrice: "21.00",
      price: "19.00",
      stock: 30,
      rating: 4.9,
      reviews: 16,
      order: 380,
      sales: "38k",
    },
    {
      uid: "2",
      name: "Tops and skirt...",
      desc: "Women's exclu...",
      image: "https://via.placeholder.com/50",
      category: "womans",
      brand: "richman",
      oldPrice: "21.00",
      price: "19.00",
      stock: 30,
      rating: 4.9,
      reviews: 16,
      order: 380,
      sales: "38k",
    },
    {
      uid: "3",
      name: "Tops and skirt...",
      desc: "Women's exclu...",
      image: "https://via.placeholder.com/50",
      category: "womans",
      brand: "richman",
      oldPrice: "21.00",
      price: "19.00",
      stock: 30,
      rating: 4.9,
      reviews: 16,
      order: 380,
      sales: "38k",
    },
    // Add more product objects here...
  ];

  const headers = ["UID", "PRODUCT", "CATEGORY", "BRAND", "PRICE", "STOCK", "RATING", "ORDER", "SALES", "ACTION"];

  return (
    <div className="m-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <TableFilters />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-[11px] font-bold tracking-wider">
              <th className="py-4 px-4 text-center">
                <input type="checkbox" className="rounded border-white/30 bg-transparent" />
              </th>
              {headers.map((head) => (
                <th key={head} className="py-4 px-4 font-bold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <TableRow key={product.uid} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;