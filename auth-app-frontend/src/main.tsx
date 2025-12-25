import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import About from './pages/About.tsx'
import Signup from './pages/Signup.tsx'
import Services from './pages/Services.tsx'
import RootLayout from './pages/RootLayout.tsx'
import UserLayout from './pages/UserLayout.tsx'
import UserHome from './pages/UserHome.tsx'
import UserProfile from './pages/UserProfile.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<App />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/*  Protect User Routes */}
        <Route path='/dashboard' element={<UserLayout />} >
          <Route index element={<UserHome />} />
          <Route path='profile' element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)