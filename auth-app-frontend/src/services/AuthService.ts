import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";

// resgister user service
export const registerUser = async (signUpData: RegisterData) => {

    // api call to backend server
    const response = await apiClient.post("/auth/register", signUpData)

    return response.data
}

// login user service

// get current user service

// logout user service

// get refresh token service