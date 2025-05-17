import React, { useMemo, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Tours from './pages/Tours';
import Destination from './pages/Destination';
import Booking from './pages/Booking';
import Team from './pages/Team';
import Testimonial from './pages/Testimonial';
import Error from './pages/Error';
import Contact from './pages/Contact';
import TourPage from './pages/TourPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountSettings from './pages/Profile/AccountSettings';
import AgencyDashboard from './pages/Dashboard/AgencyDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import ResetPassword from './pages/RestPassword';
import ForgotPassword from './pages/ForgotPassword';
export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const savedMode = localStorage.getItem('mode') || 'light';
  const [mode, setMode] = useState(savedMode);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ✅ زر الوضع الداكن */}
      <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 1300 }}>
      <IconButton onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {!isAuthPage && <Header mode={mode} toggleColorMode={toggleColorMode} />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/Tours' element={<Tours />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/team' element={<Team />} />
        <Route path='/testimonial' element={<Testimonial />} />
        <Route path='/error' element={<Error />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/tourDetails' element={<TourPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account-settings' element={<AccountSettings />} />
        <Route path='/agency-dashboard' element={<AgencyDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
        <ToastContainer />


      {!isAuthPage && <Footer />}
    </ThemeProvider>
    
  );
}


