import React from 'react';
import {
  TextField,
  Typography,
  Link,
  Button,
  Paper,
  Box,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

function Login() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0a0f2c, #0f1f4b)'
          : 'linear-gradient(135deg, #d6e4f9, #f0f6ff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 1000 }}
      >
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: 500,
            borderRadius: 6,
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(10, 20, 40, 0.85)'
              : 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 24px rgba(0, 98, 255, 0.2)',
          }}
        >
          {/* Left side */}
          <Box sx={{ flex: 1, p: 5 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <LocationOnIcon fontSize="large" sx={{ color: '#86B817', mr: 0 }} />
              <Typography variant="h4" fontWeight="bold" color="#0d6efd">RihlaDZ</Typography>
            </Box>

            <Typography variant="h5" mb={2} sx={{ color: '#0d6efd', fontWeight: 600 }}>
              Welcome Back!
            </Typography>

            <Typography variant="body1" mb={3} color="text.secondary">
              Log in to access amazing tours and adventures.
            </Typography>

            <TextField
              label="Email address"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                borderRadius: '30px',
                background: '#0d6efd',
                fontWeight: 'bold',
                '&:hover': {
                  background: '#0056d2',
                },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" align="center" mt={3}>
              <Link href="/reset-password" underline="hover" sx={{ color: '#0d6efd' }}>
                Forgot password?
              </Link>
            </Typography>

            <Typography variant="body2" align="center" mt={1}>
              Don’t have an account?{' '}
              <Link href="/register" underline="hover" sx={{ color: '#0d6efd' }}>
                Register here
              </Link>
            </Typography>
          </Box>

          {/* Right side - Image */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'block' },
              backgroundImage: 'url("/assets/img/login.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Paper>
      </motion.div>
    </Box>
  );
}

export default Login;
