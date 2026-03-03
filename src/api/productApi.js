import axiosInstance from "./axiosInstance";

// ১. সব প্রোডাক্ট গেট করা
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ২. নতুন প্রোডাক্ট তৈরি করা (POST)
// export const createProduct = async (formData) => {
//     try {
//         // যেহেতু ইমেজ আছে, তাই headers ম্যানুয়ালি সেট করে দিচ্ছি
//         const response = await axiosInstance.post('/products/create', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error.message;
//     }
// };

// ✅ সমাধান
export const createProduct = async (formData) => {
  try {
    const response = await axiosInstance.post("/products/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    // এটা দিলে actual error message পাবে "Something went wrong" এর বদলে
    throw error.response ? error.response.data : new Error(error.message);
  }
};
// ৩. প্রোডাক্ট ডিলিট করা
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ৪. প্রোডাক্ট আপডেট করা
export const updateProduct = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ৫. নির্দিষ্ট আইডি দিয়ে একটি প্রোডাক্ট গেট করা
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// ৬. ক্যাটাগরি আইডি দিয়ে প্রোডাক্ট ফিল্টার করা
export const getProductsByCategory = async (categoryId) => {
  try {
    // যদি categoryId থাকে তবে ফিল্টার রাউটে যাবে, নাহলে সব প্রোডাক্ট আনবে
    const url = categoryId ? `/products/category/${categoryId}` : "/products";

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Fetch Error:",
      error.response?.data?.message || error.message,
    );
    throw error.response ? error.response.data : error.message;
  }
};
