import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;





// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://fulls-stack-ecommerce-mern-server-s.vercel.app/api', 
//   timeout: 10000, //
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// export default axiosInstance;