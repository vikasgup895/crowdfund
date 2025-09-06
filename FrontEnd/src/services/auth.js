// src/services/auth.js
import api from "../lib/api";

// ✅ FIX: Return user object, not boolean
export async function checkAuth() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null; // No token, return null immediately
    }

    // Try multiple endpoints to find user profile
    const endpoints = [
      "/api/auth/me",
      "/api/auth/profile",
      "/api/user/profile",
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await api.get(endpoint);
        if (response.data) {
          return response.data; // Return user object
        }
      } catch (err) {
        // Try next endpoint
        continue;
      }
    }

    return null; // No valid user found
  } catch (error) {
    console.error("Auth check failed:", error);
    return null; // Return null on error
  }
}

export async function getCurrentProfile() {
  const endpoints = [
    "/api/profile/me",
    "/api/auth/profile",
    "/api/auth/me",
    "/api/user/me",
  ];
  for (const url of endpoints) {
    try {
      const r = await api.get(url);
      return r.data;
    } catch {
      // try next
    }
  }
  return null;
}

export async function login(email, password) {
  try {
    const r = await api.post("/api/auth/login", { email, password });
    if (r.data?.token) {
      localStorage.setItem("token", r.data.token);
    }
    return r.data;
  } catch (err) {
    const msg = err.response?.data?.message || "Login failed";
    throw new Error(msg);
  }
}

export async function register(email, password) {
  try {
    const r = await api.post("/api/auth/register", { email, password });
    if (r.data?.token) {
      localStorage.setItem("token", r.data.token);
    }
    return r.data;
  } catch (err) {
    const msg = err.response?.data?.message || "Register failed";
    throw new Error(msg);
  }
}

export async function logout() {
  try {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to home, not login
  } catch (err) {
    console.error("Logout error:", err);
  }
}
