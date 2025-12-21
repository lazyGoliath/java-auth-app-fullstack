import {create} from 'zustand';
import type User from '../models/User';
import type LoginData from '@/models/LoginData';
import type LoginResponsetData from '@/models/LoginResponseData';
import { loginUser } from '@/services/AuthService';

const LOCAL_KEY = "app_state";

//type AuthStatus = "unauthenticated" | "authenticated" | "authenticating" | "idle";

// global auth state store
type AuthState = {
    user: User | null;
    accessToken: string | null;
    authStatus: boolean;
    authLoading: boolean;
    login: (loginData:LoginData) => Promise<LoginResponsetData | void>;
    logout: (options?: {silent:boolean}) => Promise<void>;
    checkLogin: () => boolean | undefined;
    // setUser: (user: User | null) => void;
    // setAccessToken: (token: string | null) => void;
    // clearAuth: () => void;
}

// main logic for global state
const useAuth = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    authStatus: false,
    authLoading: false,
    login: async (loginData:LoginData) => {
        console.log("started login");
        set({authLoading: true});
        
        try{
            const loginResponseData = await loginUser(loginData);
            console.log("login response:", loginResponseData);

            set({
                accessToken: loginResponseData.accessToken,
                user: loginResponseData.user,
                authStatus: true,
            });

            // return login response
            return loginResponseData;

        } catch (error) {
            console.error("Login failed:", error);
            throw error;
            //return Promise.reject(error);
        } finally {
            set({authLoading: false});
        }
    },
    logout: async (options?: {silent:boolean}) => {},

    checkLogin: () => {
        //if(localStorage.getItem(LOCAL_KEY)){
        if(get().accessToken && get().authStatus){
            return true;
        } else {
            return false;
        }
    },
}));

export default useAuth;