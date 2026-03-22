import axios from "axios";

const BASE_URL = "http://localhost:4000/api/user";

// ==========================
// SIGN UP
// ==========================
export const signupUser = async (name, email, phone, password) => {
  const res = await axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    phone,
    password,
  });
  return res.data;
};

// ==========================
// SIGN IN
// ==========================
export const signinUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/signin`, { email, password });
  return res.data;
};

// ==========================
// GET ALL USERS
// ==========================
export const getAllUsers = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ==========================
// GET USER BY ID
// ==========================
export const getUserById = async (id, token) => {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ==========================
// UPDATE USER
// ==========================
export const updateUser = async (id, data, token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ==========================
// DELETE USER
// ==========================
export const deleteUser = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ==========================
// GET USER COUNT
// ==========================
export const getUserCount = async (token) => {
  const res = await axios.get(`${BASE_URL}/get/count`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// ==========================
// UPLOAD PROFILE IMAGE
// ==========================
export const uploadProfileImage = async (id, formData, token) => {
  const res = await axios.put(`${BASE_URL}/${id}/image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};