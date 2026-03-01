import axiosInstance from './axiosInstance';
// categoryApi.js
export const getAllCategories = async (page = 1, limit = 6) => { // এখানে limit যোগ করলাম
  try {
    // URL-এ limit প্যারামিটারটি পাঠিয়ে দাও
    const response = await axiosInstance.get(`/category?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// export const getAllCategories = async (page = 1) => {
//   try {
 
//     const response = await axiosInstance.get(`/category?page=${page}`);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Network Error");
//   }
// };

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`);
    // আপনার ব্যাকএন্ড যেহেতু { success: true, data: category } পাঠাচ্ছে
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axiosInstance.put(`/category/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post('/category/create', categoryData);
    return response.data;
  } catch (error) {
 
    throw error.response ? error.response.data : new Error("Network Error");
  }
};


export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/${id}`);
  return response.data;
};
