import {create} from 'zustand';
import axiosInstance from '../lib/axios.js'; // Adjust the path as necessary
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/"; 

export const useAuthStore = create((set , get ) => ({
    authUser: null,
    isSigningIn: false,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    
    checkAuth: async () => {
        try{
             const response = await axiosInstance.get('/auth/check')
             console.log("CheckAuth response:", response.data);
             set({authUser: response.data.user});
             get().connectSocket(); // Connect socket after checking auth
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
          get().connectSocket();
        } catch (error) {
          toast.error(error.response.data.Message);
        } finally {
          set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/SignIn", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully")
          get().connectSocket();;
        } catch (error) {
          toast.error(error.response.data.Message);
        } finally {
          set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/SignOut');
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket(); // Disconnect socket on logout
        } catch (error) {
            toast.error(error.response.data.Message);
        }
    },
    
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          console.log("Profile update response:", res.data);
          set({ authUser: res.data.updatedUser || res.data.user || res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.Message);
        } finally {
          set({ isUpdatingProfile: false });
        }
    } , 
    connectSocket: () => {
       const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    })
    },
    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    }
}));