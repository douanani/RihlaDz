import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Link,
  Button,
  Paper,
  Box,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

function Register() {
  const theme = useTheme();
  const [accountType, setAccountType] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleNext = () => {
    if (activeStep === 0 && !fullName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter your full name!',
      });
      return;
    }

    if (activeStep === 1 && password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const handleRegister = () => {
    setOpenSnackbar(true);
  };

  const steps = ['Basic Info', 'Password', 'Account Type'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
          : 'linear-gradient(135deg, #e0eafc, #cfdef3)',
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
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: 600,
            borderRadius: 4,
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 0, 0.6)'
              : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* Left side */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <LocationOnIcon fontSize="large" sx={{ color: '#0d6efd', mr: 1 }} />
              <Typography variant="h4" fontWeight="bold">RihlaDZ</Typography>
            </Box>

            <Typography variant="h5" mb={3} color="text.secondary">
              Create your account
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
                <TextField
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            )}

            {activeStep === 1 && (
              <>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={password !== confirmPassword && confirmPassword !== ''}
                  helperText={password !== confirmPassword && confirmPassword !== '' ? 'Passwords do not match' : ''}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ ml: 2, borderRadius: 2 }}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}

            {activeStep === 2 && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="account-type-label">Account Type</InputLabel>
                  <Select
                    labelId="account-type-label"
                    label="Account Type"
                    value={accountType}
                    onChange={handleAccountTypeChange}
                    size="small"
                  >
                    <MenuItem value="tourist">Tourist</MenuItem>
                    <MenuItem value="agency">Agency</MenuItem>
                    <MenuItem value="club">Club</MenuItem>
                  </Select>
                </FormControl>

                {(accountType === 'agency' || accountType === 'club') && (
                  <Box mt={2}>
                    <Typography variant="body2" gutterBottom>
                      Upload your agency/club certificate here:
                    </Typography>
                    <input type="file" accept=".pdf" />
                  </Box>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, borderRadius: 2 }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </>
            )}

            <Typography variant="body2" align="center" mt={2}>
              Already have an account? <Link href="/login" underline="hover">Login here</Link>
            </Typography>
          </Box>

          {/* Right side - Image */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'block' },
              backgroundImage: 'url("/assets/img/register.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Paper>
      </motion.div>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Account created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
