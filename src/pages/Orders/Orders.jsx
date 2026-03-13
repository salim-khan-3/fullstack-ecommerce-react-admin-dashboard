import { useState, useEffect } from "react";
import { Home, ChevronRight, Phone, Mail, Calendar, ChevronLeft, ChevronDown, Loader2 } from "lucide-react";
import { useAuth } from "../../context/Authcontext";
import { getAllOrdersApi, updateOrderStatusApi } from "../../api/orderApi";
import { ProductsModal, STATUS_OPTIONS, statusColors } from "./Productsmodal";
import toast from "react-hot-toast";

const ROWS_OPTIONS = [5, 10, 20];

export default function AdminOrders() {
  const { token } = useAuth();

  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [productModal, setProductModal] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage]               = useState(1);
  const [rowsDropdown, setRowsDropdown] = useState(false);
  const [updatingId, setUpdatingId]   = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrdersApi(token);
      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatusApi(orderId, newStatus, token);
      setOrders((prev) =>
        prev.map((o) => o._id === orderId ? { ...o, orderStatus: newStatus } : o)
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalPages  = Math.ceil(orders.length / rowsPerPage);
  const paginated   = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const from        = orders.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to          = Math.min(page * rowsPerPage, orders.length);

  // ── Skeleton row ──
  const SkeletonRow = () => (
    <tr>
      {[...Array(12)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-100 rounded-full animate-pulse w-4/5" />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <h1 className="text-xl font-semibold text-gray-800">Orders List</h1>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Home className="w-4 h-4 text-gray-400" />
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">Orders</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="bg-blue-600 text-white">
                {[
                  "Order Id", "Payment Id", "Products", "Name",
                  "Phone Number", "Address", "Pincode",
                  "Total Amount", "Email", "User Id",
                  "Order Status", "Date Created",
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                : paginated.length === 0
                  ? (
                    <tr>
                      <td colSpan={12} className="px-4 py-16 text-center text-gray-400 text-sm">
                        No orders found.
                      </td>
                    </tr>
                  )
                  : paginated.map((order, idx) => (
                    <tr key={order._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                      {/* Order ID */}
                      <td className="px-4 py-3 text-blue-600 font-mono text-xs whitespace-nowrap">
                        {order._id.slice(-11)}
                      </td>

                      {/* Payment ID */}
                      <td className="px-4 py-3 text-blue-600 text-xs whitespace-nowrap">
                        {order.transactionId || "—"}
                      </td>

                      {/* Products */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setProductModal(order.orderItems)}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium whitespace-nowrap text-xs"
                        >
                          Click here to view
                        </button>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 text-gray-800 whitespace-nowrap">
                        {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {order.shippingAddress?.phone}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-4 py-3 text-gray-700 max-w-48">
                        <span className="line-clamp-2 text-xs">
                          {order.shippingAddress?.street1}
                          {order.shippingAddress?.city ? `, ${order.shippingAddress.city}` : ""}
                        </span>
                      </td>

                      {/* Pincode */}
                      <td className="px-4 py-3 text-gray-700 text-xs">
                        {order.shippingAddress?.zipCode}
                      </td>

                      {/* Total Amount */}
                      <td className="px-4 py-3 text-gray-800 font-semibold whitespace-nowrap">
                        ৳{order.totalPrice?.toLocaleString()}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate max-w-40 text-xs">
                            {order.shippingAddress?.email}
                          </span>
                        </div>
                      </td>

                      {/* User ID */}
                      <td className="px-4 py-3 text-blue-600 font-mono text-xs">
                        <span className="truncate max-w-32 block">
                          {typeof order.userId === "object" ? order.userId?._id : order.userId}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3">
                        <div className="relative flex items-center gap-1">
                          {updatingId === order._id && (
                            <Loader2 size={12} className="animate-spin text-blue-500 shrink-0" />
                          )}
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={updatingId === order._id}
                            className={`appearance-none border rounded px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-700 border-gray-300"}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s} className="capitalize">{s}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          {new Date(order.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </div>
                      </td>

                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-xs">Rows per page:</span>
              <div className="relative">
                <button
                  onClick={() => setRowsDropdown(!rowsDropdown)}
                  className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-50"
                >
                  {rowsPerPage}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {rowsDropdown && (
                  <div className="absolute bottom-8 right-0 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {ROWS_OPTIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRowsPerPage(r); setPage(1); setRowsDropdown(false); }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-xs"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs">{from}–{to} of {orders.length}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Modal */}
      <ProductsModal products={productModal} onClose={() => setProductModal(null)} />
    </div>
  );
}