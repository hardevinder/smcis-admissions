import axios from "axios";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://api-smcis.edubridgeerp.in"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default api;
