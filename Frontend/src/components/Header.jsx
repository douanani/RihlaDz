import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Badge, Avatar } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function Header({ mode, toggleColorMode }) {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElSettings, setAnchorElSettings] = useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleSettingsClick = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorElSettings(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div>
      {/* Navbar & Hero Start */}
      <div className="container-fluid position-relative p-0">
        <nav className={`navbar navbar-expand-lg ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4 px-lg-5 py-3 py-lg-0`}>
          <Link to="/" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-map-marker-alt me-3" color="#86B817" />
              RihlaDz
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/agency-dashboard" className="nav-item nav-link">Dashboard</Link>
              <Link to="/admin-dashboard" className="nav-item nav-link">Admin Dashboard</Link>
              <Link to="/Tours" className="nav-item nav-link">Tours</Link>
              <Link to="/Services" className="nav-item nav-link">Services</Link>
              <Link to="/Contact" className="nav-item nav-link">Contact</Link>
              <Link to="/About" className="nav-item nav-link">About</Link>
            </div>

            {/* Notification Button */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsClick}
              style={{ marginRight: '20px' }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Avatar Button */}
            <IconButton
              onClick={handleSettingsClick}
              sx={{ p: 0, marginRight: 2 }}
            >
              <Avatar
                alt="User Profile"
                src="/images/profile.jpg"
                sx={{ width: 40, height: 40, border: '2px solid #86B817' }}
              />
            </IconButton>

            {/* Settings Menu */}
            <Menu
              anchorEl={anchorElSettings}
              open={Boolean(anchorElSettings)}
              onClose={handleSettingsClose}
            >
              <MenuItem onClick={handleSettingsClose}>
                <Link to="/account-settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Account Settings
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            {/* Notifications Menu */}
            <Menu
              anchorEl={anchorElNotifications}
              open={Boolean(anchorElNotifications)}
              onClose={handleNotificationsClose}
            >
              <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
              <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
              <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
              <MenuItem onClick={handleNotificationsClose}>Notification 4</MenuItem>
            </Menu>

            {/* Dark Mode Toggle    <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>*/}
         

            {/* Login Button */}
            <Link
              to="/login"
              className="btn btn-outline-primary rounded-pill py-2 px-4 me-3"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
      {/* Navbar & Hero End */}
    </div>
  );
}

export default Header;
