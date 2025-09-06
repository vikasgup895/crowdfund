// src/lib/api.js
import axios from "axios";

// ✅ Set proper API base URL
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// ✅ Request interceptor: attach token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ FIX: Remove automatic redirect to prevent infinite loops
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't automatically redirect on 401 - let components handle it
    if (error.response?.status === 401) {
      console.log("401 Unauthorized - clearing token");
      localStorage.removeItem("token");
      // ❌ REMOVED: window.location.href = "/login"; // This was causing the loop!
    }
    return Promise.reject(error);
  }
);

export default api;
