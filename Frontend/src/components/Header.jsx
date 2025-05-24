import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Badge, Avatar, Typography } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationPanel from './NotificationPanel/NotificationPanel';

const notifications = [
  { id: 1, name: "John Doe", time: "10 mins ago", message: "reacted to your post", avatar: "https://randomuser.me/api/portraits/men/11.jpg", image: "https://via.placeholder.com/50x50?text=HOVE" },
  { id: 2, name: "Richard Miles", time: "1 day ago", message: "reacted to your post", avatar: "https://randomuser.me/api/portraits/men/32.jpg", image: "https://via.placeholder.com/50x50?text=HOVE" },
  { id: 3, name: "Brian Cumin", time: "1 day ago", message: "reacted to your post", avatar: "https://randomuser.me/api/portraits/men/55.jpg", image: "https://via.placeholder.com/50x50?text=IMG" },
  { id: 4, name: "Lance Bogrol", time: "1 day ago", message: "reacted to your post", avatar: "https://randomuser.me/api/portraits/women/65.jpg", image: "https://via.placeholder.com/50x50?text=IMG" },
];

function Header({ mode, toggleColorMode }) {
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSettingsClick = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorElSettings(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showNotifications && !e.target.closest(".notification-panel")) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  return (
    <div>
      <div className="container-fluid position-relative p-0">
        <nav className={`navbar navbar-expand-lg ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4 px-lg-5 py-3 py-lg-0`}>
          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-map-marker-alt me-3" color="#86B817" /> RihlaDz
            </h1>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
              <NavLink to="/agency-dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
              <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin Dashboard</NavLink>
              <NavLink to="/Tours" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Tours</NavLink>
              <NavLink to="/Services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
              <NavLink to="/Contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
              <NavLink to="/About" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            </div>

            <div style={{ position: "relative" }}>
              <IconButton color="inherit" onClick={toggleNotifications} style={{ marginRight: '10px' }}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {showNotifications && (
                <div style={{ position: 'absolute', top: '50px', right: 0, zIndex: 1000 }}>
                  <NotificationPanel />
                </div>
              )}
            </div>

            <IconButton onClick={toggleColorMode} color="inherit" sx={{ marginRight: 2 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton onClick={handleSettingsClick} sx={{ p: 0, marginRight: 2 }}>
              <Avatar alt="User Profile" src="/images/profile.jpg" sx={{ width: 40, height: 40, border: '2px solid #86B817' }} />
            </IconButton>

            <Menu anchorEl={anchorElSettings} open={Boolean(anchorElSettings)} onClose={handleSettingsClose}>
              <MenuItem disabled>
                <Typography variant="subtitle2">Hi, Djilali</Typography>
              </MenuItem>
              <MenuItem onClick={handleSettingsClose}>
                <Link to="/account-settings" style={{ textDecoration: 'none', color: 'inherit' }}>Account Settings</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Link to="/login" className="btn btn-outline-primary rounded-pill py-2 px-4 me-3">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
