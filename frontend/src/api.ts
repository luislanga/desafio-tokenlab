import axios from "axios";

// Function to get a cookie by name
const jwt =
  document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1] || null;

// Create the Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get JWT from cookies

    // If JWT exists, add it to the Authorization header
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
