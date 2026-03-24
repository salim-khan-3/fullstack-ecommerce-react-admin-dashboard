import axiosInstance from './axiosInstance';

export const getAllCategories = async (page = 1, limit = 6) => {
  try {
    const response = await axiosInstance.get(`/category?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};



export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`);
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
