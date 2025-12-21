import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type LoginData from "@/models/LoginData";
import type LoginResponsetData from "@/models/LoginResponseData";

// resgister user service
export const registerUser = async (signUpData: RegisterData) => {

    // api call to backend server
    const response = await apiClient.post("/auth/register", signUpData)

    return response.data
}

// login user service
export const loginUser = async (loginData: LoginData) => {

    // api call to backend server
    const response = await apiClient.post<LoginResponsetData>(
        "/auth/login",
        loginData)

    return response.data
}

// logout user service
export const logoutUser = async () => {

    const response = await apiClient.post("/auth/logout")
    return response.data
}

// get current user service

// logout user service

// get refresh token service