import React from 'react'
import Navbar from './Components/Navbar.jsx'
import { Routes , Route , Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {useAuthStore} from './Store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './Store/useThemeStore.js'


const App = () => {
  const { authUser, checkAuth , isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);  

  // Apply theme on app start
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  
  console.log("Auth User:", authUser);
  
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
   <div data-theme={theme}>
    <Navbar />
     <Routes>
      <Route path="/" element={(authUser ? <HomePage /> : <Navigate to="/Login" />)} />
      <Route path="/SignUp" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/Login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/Settings" element={<SettingsPage />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/Login"/>} />
     </Routes>

    <Toaster />
   </div>
  )
}
export default App
