"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Box, TextField, Container, Typography } from '@mui/material';

const AuthPage = ({ setIsLoggedIn }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
        router.push('/');
      } else {
        setUser(null);
        setIsLoggedIn(false);
        router.push('/landing');
      }
    });

    return () => unsubscribe();
  }, [router, setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
      router.push('/');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found!';
        break;
      default:
        errorMessage = 'Failed to sign in. Please check your credentials.';
      }
      setError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      router.push('/landing');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsLoggedIn(true);
       router.push('/');
    } catch (error) {
      console.error('Error with provider login: ', error);
    }
  };

  if (user) {
    return null; // or <Redirect to="/" /> if using a library that supports it
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          marginTop: 8,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          color: '#E0E0E0'
        }}
      >
        <Typography variant="h4" color="#1E1E1E" sx={{ marginBottom: 2 }}>
          {user ? 'Welcome Back!' : 'Login'}
        </Typography>
        {!user ? (
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
              InputProps={{
                sx: {
                  borderRadius: 1,
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
              InputProps={{
                sx: {
                  borderRadius: 1,
                },
              }}
            />
            {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => handleProviderLogin(googleProvider)}
            >
              Login with Google
            </Button>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography variant="h6" color="1E1E1E">
              Welcome, {user.displayName || user.email}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ marginTop: 2 }}>
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AuthPage;

