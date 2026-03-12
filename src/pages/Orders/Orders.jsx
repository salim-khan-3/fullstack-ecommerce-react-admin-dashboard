import { useState } from "react";
import { Home, ChevronRight, Phone, Mail, Calendar, ChevronLeft, ChevronDown, X } from "lucide-react";

const sampleOrders = [
  {
    orderId: "eb89becf49e",
    paymentId: "pay_SNbX6xCFQXLOJ3",
    products: [
      { productId: "6742b9e71b10adfb939ef25e", title: "Kerala Naturals Rose Water 100...", image: "https://via.placeholder.com/50", quantity: 1, price: 450, subTotal: 450 },
    ],
    name: "Atharva Kharche",
    phone: "09765670668",
    address: "Shrinagar, RahataniF",
    pincode: "411017",
    totalAmount: 450,
    email: "arnushed@gmail.com",
    userId: "699880e0ef1b4eb89bda512b",
    orderStatus: "Confirm",
    date: "2026-02-20",
  },
  {
    orderId: "eb89beaf52b",
    paymentId: "pay_SN2jDIXpCe00ED",
    products: [
      { productId: "abc123", title: "Samsung Galaxy Watch", image: "https://via.placeholder.com/50", quantity: 1, price: 1500, subTotal: 1500 },
    ],
    name: "Shreyash Manavadariya",
    phone: "80004538744",
    address: "A1 1103 om regencysds",
    pincode: "395006",
    totalAmount: 1500,
    email: "d25amtics136@gmail.com",
    userId: "69979f5aef1b4eb89bd97c4f",
    orderStatus: "Pending",
    date: "2026-02-20",
  },
  {
    orderId: "b89be302a5",
    paymentId: "pay_SKSBGrsJ2yraag",
    products: [
      { productId: "def456", title: "Levi's Jeans Classic", image: "https://via.placeholder.com/50", quantity: 2, price: 5, subTotal: 10 },
    ],
    name: "Karan Srivastava",
    phone: "0994567852",
    address: "SathaVbbbnkk",
    pincode: "226020",
    totalAmount: 10,
    email: "srivastava.karan00@gmail.com",
    userId: "6991d847ef1b4eb89bd1653e",
    orderStatus: "Pending",
    date: "2026-02-15",
  },
  {
    orderId: "eb89be15a3b",
    paymentId: "pay_SK32Nu7NxV08Dd",
    products: [
      { productId: "ghi789", title: "iPhone 15 Case Premium", image: "https://via.placeholder.com/50", quantity: 1, price: 480, subTotal: 480 },
    ],
    name: "mm",
    phone: "99999999999",
    address: "mmm",
    pincode: "m",
    totalAmount: 480,
    email: "myman143143a@gmail.com",
    userId: "6990c9feef1b4eb89bd05968",
    orderStatus: "Pending",
    date: "2026-02-14",
  },
  {
    orderId: "eb89bdf40c2",
    paymentId: "pay_SJeJvFNxxhlFme",
    products: [
      { productId: "jkl012", title: "Puma Sports Bag XL", image: "https://via.placeholder.com/50", quantity: 1, price: 1200, subTotal: 1200 },
    ],
    name: "xbxjs",
    phone: "4346",
    address: "ssusushahs",
    pincode: "s6aywyaya",
    totalAmount: 1200,
    email: "mranasmirza1@gmail.com",
    userId: "698b174cef1b4eb89bc7be1d",
    orderStatus: "Delivered",
    date: "2026-02-13",
  },
  {
    orderId: "a12cde34f5",
    paymentId: "pay_ABC123XYZ",
    products: [
      { productId: "mno345", title: "Nike Air Max 270", image: "https://via.placeholder.com/50", quantity: 2, price: 10000, subTotal: 20000 },
    ],
    name: "Pratham Bhatnagar",
    phone: "08254698745",
    address: "Sec 7 agra Home no. 2471 floore",
    pincode: "282007",
    totalAmount: 20000,
    email: "bhatnagarpratham236@gmail.com",
    userId: "699880e0ef1b4eb89bda512b",
    orderStatus: "Confirm",
    date: "2026-02-20",
  },
  {
    orderId: "b23def45g6",
    paymentId: "pay_DEF456ABC",
    products: [
      { productId: "pqr678", title: "Adidas Running Shoes", image: "https://via.placeholder.com/50", quantity: 1, price: 17000, subTotal: 17000 },
    ],
    name: "Karan Srivastava",
    phone: "09900009856",
    address: "Mayur vihar sathaSatha mayur vihar",
    pincode: "20300001",
    totalAmount: 17000,
    email: "srivastava.karan00@gmail.com",
    userId: "69979f5aef1b4eb89bd97c4f",
    orderStatus: "Pending",
    date: "2026-02-20",
  },
  {
    orderId: "c34efg56h7",
    paymentId: "pay_GHI789DEF",
    products: [
      { productId: "stu901", title: "Kerala Naturals Rose Water 100ml", image: "https://via.placeholder.com/50", quantity: 1, price: 119, subTotal: 119 },
    ],
    name: "Manindra",
    phone: "4444477777",
    address: "NIRMAL JOTE,RANGAPANI,PHANSIDEWA,2",
    pincode: "734434",
    totalAmount: 119,
    email: "manindra10101@gmail.com",
    userId: "6991d847ef1b4eb89bd1653e",
    orderStatus: "Pending",
    date: "2026-02-15",
  },
  {
    orderId: "d45fgh67i8",
    paymentId: "pay_JKL012GHI",
    products: [
      { productId: "vwx234", title: "Premium Watch Gold", image: "https://via.placeholder.com/50", quantity: 3, price: 8186, subTotal: 24560 },
    ],
    name: "Shariful Islam",
    phone: "12",
    address: "aa",
    pincode: "12",
    totalAmount: 24560,
    email: "sharifulislam246121@gmail.com",
    userId: "6990c9feef1b4eb89bd05968",
    orderStatus: "Pending",
    date: "2026-02-14",
  },
  {
    orderId: "e56ghi78j9",
    paymentId: "pay_MNO345JKL",
    products: [
      { productId: "yza567", title: "Rose Water Toner", image: "https://via.placeholder.com/50", quantity: 1, price: 900, subTotal: 900 },
    ],
    name: "RestroPotoba",
    phone: "9765670668",
    address: "Pimpri PuneTt",
    pincode: "411017",
    totalAmount: 900,
    email: "restropotoba@gmail.com",
    userId: "698b174cef1b4eb89bc7be1d",
    orderStatus: "Delivered",
    date: "2026-02-13",
  },
];

const STATUS_OPTIONS = ["Pending", "Confirm", "Shipped", "Delivered", "Cancelled"];

const statusColors = {
  Delivered: "bg-green-100 text-green-700 border-green-300",
  Confirm:   "bg-blue-100 text-blue-700 border-blue-300",
  Shipped:   "bg-violet-100 text-violet-700 border-violet-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
  Pending:   "bg-yellow-100 text-yellow-700 border-yellow-300",
};

const ROWS_OPTIONS = [5, 10, 20];

export default function Orders() {
  const [orders, setOrders] = useState(sampleOrders);
  const [productModal, setProductModal] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [rowsDropdown, setRowsDropdown] = useState(false);

  const totalPages = Math.ceil(orders.length / rowsPerPage);
  const paginated = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const from = (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, orders.length);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <h1 className="text-xl font-semibold text-gray-800">Orders List</h1>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Home className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Dashboard</span>
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
                {["Order Id", "Payment Id", "Products", "Name", "Phone Number", "Address", "Pincode", "Total Amount", "Email", "User Id", "Order Status", "Date Created"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((order, idx) => (
                <tr key={order.orderId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                  {/* Order ID */}
                  <td className="px-4 py-3 text-blue-600 font-medium whitespace-nowrap">
                    {order.orderId}
                  </td>

                  {/* Payment ID */}
                  <td className="px-4 py-3 text-blue-600 whitespace-nowrap">
                    {order.paymentId}
                  </td>

                  {/* Products */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setProductModal(order.products)}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium whitespace-nowrap"
                    >
                      Click here to view
                    </button>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{order.name}</td>

                  {/* Phone */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      {order.phone}
                    </div>
                  </td>

                  {/* Address */}
                  <td className="px-4 py-3 text-gray-700 max-w-48">
                    <span className="line-clamp-2">{order.address}</span>
                  </td>

                  {/* Pincode */}
                  <td className="px-4 py-3 text-gray-700">{order.pincode}</td>

                  {/* Total Amount */}
                  <td className="px-4 py-3 text-gray-800 font-medium whitespace-nowrap">
                    ₹ {order.totalAmount.toLocaleString()}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                      <span className="truncate max-w-40">{order.email}</span>
                    </div>
                  </td>

                  {/* User ID */}
                  <td className="px-4 py-3 text-blue-600 font-mono text-xs whitespace-nowrap">
                    <span className="truncate max-w-32 block">{order.userId}</span>
                  </td>

                  {/* Order Status Dropdown */}
                  <td className="px-4 py-3">
                    <div className="relative">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        className={`appearance-none border rounded px-3 py-1.5 pr-7 text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-700 border-gray-300"}`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current" />
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {order.date}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="relative">
              <button
                onClick={() => setRowsDropdown(!rowsDropdown)}
                className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-50"
              >
                {rowsPerPage}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {rowsDropdown && (
                <div className="absolute bottom-8 right-0 bg-white border border-gray-200 rounded shadow-lg z-10">
                  {ROWS_OPTIONS.map(r => (
                    <button
                      key={r}
                      onClick={() => { setRowsPerPage(r); setPage(1); setRowsDropdown(false); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <span>{from}–{to} of {orders.length}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Modal */}
      {productModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
          onClick={() => setProductModal(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Products</h2>
              <button
                onClick={() => setProductModal(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    {["Product Id", "Product Title", "Image", "Quantity", "Price", "SubTotal"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productModal.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{p.productId}</td>
                      <td className="px-4 py-3 text-gray-800">{p.title}</td>
                      <td className="px-4 py-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-700">{p.quantity}</td>
                      <td className="px-4 py-3 text-gray-700">{p.price}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{p.subTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}