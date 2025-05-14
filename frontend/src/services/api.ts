import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // ✅ URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// ⏱️ Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;
