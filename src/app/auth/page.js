"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Container, Typography } from '@mui/material';

const AuthPage = ( {setIsLoggedIn} ) => {
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
        router.push('../page'); // Redirect to home or another authenticated route
      } else {
        setUser(null);
        setIsLoggedIn(false);
        router.push('./auth'); // Redirect to login page or another non-authenticated route
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
      router.push('../page'); // Redirect after login
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
      router.push('./auth'); // Redirect after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsLoggedIn(true);
       router.push('../page'); // Redirect after provider login
    } catch (error) {
      console.error('Error with provider login: ', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2 }}>Log In:</Typography>
      {user ? (
        <div>
          <Typography variant="h6">Welcome, {user.displayName || user.email}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          <Button variant="contained" color="primary" fullWidth onClick={() => handleProviderLogin(googleProvider)}>Login with Google</Button>
        </form>
      )}
    </Container>
  );
};

export default AuthPage;
