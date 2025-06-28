import {create} from 'zustand';
import axiosInstance from '../lib/axios.js'; // Adjust the path as necessary
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try{
             const response = await axiosInstance.get('/auth/check')
             set({authUser:response.data});
        }
       catch(error) {
        console.log("Error checking authentication:", error);
        set({authUser: null});
       }
         finally {
          set({isCheckingAuth: false});
         }
    },
    signUp: async (data) => {
        set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/SignUp", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
    }
}));


