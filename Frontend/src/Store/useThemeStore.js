import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "business",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);  // Save theme to localStorage
    document.documentElement.setAttribute("data-theme", theme); // Apply theme to HTML
    set({ theme });
  },
}));