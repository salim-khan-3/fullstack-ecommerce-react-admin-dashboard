import axiosInstance from "./axiosInstance";

// GET all orders (admin)
export const getAllOrdersApi = async (token) => {
  const res = await axiosInstance.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// PUT update order status (admin)
export const updateOrderStatusApi = async (orderId, status, token) => {
  const res = await axiosInstance.put(
    `/orders/${orderId}/status`,
    { orderStatus: status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};