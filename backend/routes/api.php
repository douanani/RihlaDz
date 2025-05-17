// src/pages/Profile/AccountSettings.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Paper,
  useTheme,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Delete, Facebook, Twitter, Visibility, VisibilityOff } from '@mui/icons-material';

export default function AccountSettings() {
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTabChange = (e, newValue) => setTab(newValue);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box sx={{ py: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              />
              <IconButton color="primary" component="label">
                <PhotoCamera />
                <input hidden accept="image/*" type="file" />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Maximum upload size is <strong>1 MB</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Member Since: <strong>29 September 2019</strong>
              </Typography>
            </Paper>
          </Grid>

          {/* Form Area */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Edit Profile
              </Typography>
              <Tabs value={tab} onChange={handleTabChange} textColor="primary">
                <Tab label="User Info" />
                <Tab label="Billing Information" />
              </Tabs>

              {tab === 0 && (
                <Box component="form" sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Full Name" defaultValue="James" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Username" defaultValue="Allan" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        defaultValue="********"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={togglePasswordVisibility}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        defaultValue="********"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={togglePasswordVisibility}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email Address" defaultValue="demomail@mail.com" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Confirm Email Address" defaultValue="demomail@mail.com" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Facebook Username"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Facebook color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Twitter Username"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Twitter sx={{ color: '#1DA1F2' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                    Update Info
                  </Button>
                </Box>
              )}

              {tab === 1 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Billing Information section coming soon...
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
