import axiosInstance from "./axiosInstance";

// ১. সব প্রোডাক্ট গেট করা
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};


// ২. নতুন প্রোডাক্ট তৈরি করা (POST)
export const createProduct = async (formData) => {
    try {
        // যেহেতু ইমেজ আছে, তাই headers ম্যানুয়ালি সেট করে দিচ্ছি
        const response = await axiosInstance.post('/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
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
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};