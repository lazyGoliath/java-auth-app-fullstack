import useAuth from "@/auth/store";
import { getRefreshToken } from "@/services/AuthService";
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

// handle token expired errors and refresh token logic

let isRefreshing = false;  // flag to indicate if token refresh is in progress
let pendingRequests: any[] = [];  // queue for pending requests during token refresh

function queueReqeuest(callback: any) {
    pendingRequests.push(callback);
    console.log("Request queued. Total queued requests:", pendingRequests.length);
}

// resolve all queued requests after token is refreshed
function resolveQueuedRequests(newToken: string) {
    pendingRequests.forEach((callback) => callback(newToken));
    // clear the queue
    pendingRequests = [];
}

// request interceptor
apiClient.interceptors.response.use(
    // successful response handler - 2xx
    (response) => response,
    // unsuccessful response handler - status beyond 2xx
    async (error) => {
        console.log("Interceptor caught an error:", error);
        const is401Error = error.response && error.response.status === 401;
        const originalRequest = error.config;
        console.log("Original request retry:", originalRequest._retry);

        if(is401Error && originalRequest._retry) {
            // add message here
            console.log("Refresh token expired. Logging out user.");
            // Prevent infinite loop
            return Promise.reject(error);
        }

        if(isRefreshing){
            console.log("already refreshing....");
            return new Promise((resolve, reject) => {
                queueReqeuest((newToken: string) => {
                    if(!newToken){
                        reject("Failed to refresh token");
                    }
                    // update the authorization header and retry the request
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    // retry the original request
                    resolve(apiClient(originalRequest));
                });
            });
        }

        // start refresh
        isRefreshing = true;

        try {
            console.log("start refreshing....");
            const loginResponse = await getRefreshToken();
            const newAccessToken = loginResponse.accessToken;

            if(!newAccessToken){
                throw new Error("No access token recieved");
            }

            useAuth.getState()
            .changeLocalLoginData(
                loginResponse.accessToken,
                loginResponse.user,
                true,
                // false
            );

            // update the authorization header and retry the original request
            resolveQueuedRequests(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        } catch (err) {
            // refresh token is also expired - logout user
            resolveQueuedRequests("");
            useAuth.getState().logout(true);
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
);

export default apiClient;