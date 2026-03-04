import axiosInstance from './axiosInstance';

// GET all subCategories
export const getAllSubCategories = async () => {
  try {
    const response = await axiosInstance.get('/subCategory');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};


// GET single subCategory by ID
export const getSubCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/subCategory/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};


// CREATE subCategory
export const createSubCategory = async (subCategoryData) => {
  try {
    const response = await axiosInstance.post('/subCategory/create', subCategoryData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};


// UPDATE subCategory
export const updateSubCategory = async (id, subCategoryData) => {
  try {
    const response = await axiosInstance.put(`/subCategory/${id}`, subCategoryData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};



// DELETE subCategory
export const deleteSubCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/subCategory/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};