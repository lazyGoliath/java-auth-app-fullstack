import useAuth from "@/auth/store";
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

// send access token with every api request
apiClient.interceptors.request.use((config) => {
    // You can add authorization headers or other custom headers here
    const accessToken = useAuth.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default apiClient;