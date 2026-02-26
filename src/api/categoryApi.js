import axiosInstance from './axiosInstance';


export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/category');
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

