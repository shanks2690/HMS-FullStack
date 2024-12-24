import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { RegisterNewUser } from '../../Networking/APIs';


const roles = ['Admin', 'Doctor', 'Receptionist', 'Patient']; // Available roles

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RegisterNewUser(formData);
      if (response.ok) {
        setSnackbarMessage('User registered successfully!');
        setSnackbarSeverity('success');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          role: '',
        });
      } else {
        setSnackbarMessage('Failed to register user!');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarMessage('An error occurred. Please try again!');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Register a New User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            !formData.firstname ||
            !formData.lastname ||
            !formData.email ||
            !formData.password ||
            !formData.role
          }
        >
          Register
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterUser;
