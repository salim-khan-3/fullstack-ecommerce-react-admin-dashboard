import { X } from "lucide-react";

const STATUS_OPTIONS = ["processing", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors = {
  delivered:  "bg-green-100 text-green-700 border-green-300",
  confirmed:  "bg-blue-100 text-blue-700 border-blue-300",
  shipped:    "bg-violet-100 text-violet-700 border-violet-300",
  cancelled:  "bg-red-100 text-red-700 border-red-300",
  processing: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

// ── Products Modal ──────────────────────────────────────────
export const ProductsModal = ({ products, onClose }) => {
  if (!products) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(6px)", background: "rgba(255,255,255,0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Order Products</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={15} className="text-gray-500" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[65vh]">
          <table className="w-full text-sm min-w-max">
            <thead className="sticky top-0 bg-blue-600 text-white">
              <tr>
                {["Product Id", "Image", "Title", "Qty", "Price", "Subtotal"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 max-w-[120px] truncate">
                    {p.productId}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={p.image}
                      alt={p.productTitle}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-gray-100"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 max-w-[200px]">
                    <span className="line-clamp-2">{p.productTitle}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{p.quantity}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    ৳{p.price?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">
                    ৳{p.subTotal?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { STATUS_OPTIONS, statusColors };