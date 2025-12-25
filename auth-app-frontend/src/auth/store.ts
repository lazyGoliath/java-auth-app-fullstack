import {create} from 'zustand';
import type User from '../models/User';
import type LoginData from '@/models/LoginData';
import type LoginResponsetData from '@/models/LoginResponseData';
import { loginUser } from '@/services/AuthService';
import { logoutUser } from '@/services/AuthService';
import toast from 'react-hot-toast';
import { persist } from 'zustand/middleware';

const LOCAL_KEY = "app_state";


//type AuthStatus = "unauthenticated" | "authenticated" | "authenticating" | "idle";

// global auth state store
type AuthState = {
    user: User | null;
    accessToken: string | null;
    authStatus: boolean;
    authLoading: boolean;
    login: (loginData:LoginData) => Promise<LoginResponsetData | void>;
    logout: (silent:boolean) => Promise<void>;
    checkLogin: () => boolean | undefined;

    changeLocalLoginData : (
        accessToken: string,
        user : User,
        authStatus: boolean,
        // authLoading: boolean
    ) => void;
    // setUser: (user: User | null) => void;
    // setAccessToken: (token: string | null) => void;
    // clearAuth: () => void;
}

// main logic for global state
const useAuth = create<AuthState>()(
    persist(
        ((set, get) => ({
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
        // silently logout from backend -> true
        logout: async (silent=false) => {
            
            try{
                if(!silent){
                    await logoutUser();
                }
                set({authLoading: true});
                toast.success("Logged out successfully");
            } catch (error) {
            } finally {
                set({authLoading: false});
            }
            set({
                    accessToken: null,
                    user: null,
                    authStatus: false,
                    authLoading: false,
            });
        },

        checkLogin: () => {
            //if(localStorage.getItem(LOCAL_KEY)){
            if(get().accessToken && get().authStatus){
                return true;
            } else {
                return false;
            }
        },

        changeLocalLoginData : (
            access: string,
            user : User,
            authStatus: boolean,
            // authLoading: boolean
        ) => {
            set({
                accessToken: access,
                user: user,
                authStatus: authStatus,
                // authLoading: authLoading,
            });
        },
        })),{
            name: LOCAL_KEY,
        } 
    )   
)

export default useAuth;