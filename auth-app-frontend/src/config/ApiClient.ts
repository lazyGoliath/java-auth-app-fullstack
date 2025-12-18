import axios from "axios";

const apiClient = axios.create({
    // replace with your backend API URL
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8085/api/v1",
    headers: {
    "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000, // 10 seconds timeout
});

export default apiClient;