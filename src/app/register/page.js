"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/system';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '70vh',
  padding: 3,
  marginTop: 8,
  borderRadius: 2,
  backgroundColor: '#f5f5f5',
  color: '#E0E0E0'
});

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use.';
          break;
        default:
          errorMessage = 'Failed to register. Please check your details.';
      }
      setError(errorMessage);
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <FormContainer maxWidth="xs">
      <Typography variant="h4" color="#1E1E1E" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
          Register
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default RegisterPage;

