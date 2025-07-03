import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance  from "../lib/axios.js";
import { useAuthStore } from "../store/useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
      
      // Check if selectedUser still exists in the updated users list
      const { selectedUser } = get();
      if (selectedUser && res.data.length > 0) {
        const userStillExists = res.data.find(user => user._id === selectedUser._id);
        if (!userStillExists) {
          // Selected user no longer exists, clear it
          localStorage.removeItem("selectedUser");
          set({ selectedUser: null });
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.Message || "Failed to fetch users");
    } finally { 
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.Message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      // Backend returns { success: true, message: "...", data: actualMessageObject }
      const newMessage = res.data.data || res.data;
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.Message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // Remove any existing listeners to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    // Persist selected user to localStorage
    if (selectedUser) {
      localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem("selectedUser");
    }
    set({ selectedUser });
  },
}));