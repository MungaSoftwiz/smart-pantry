import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Container, Typography } from '@mui/material';

const AuthPage = ( {setIsLoggedIn} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setIsLoggedIn(true);
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
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          <Button variant="contained" color="primary" fullWidth onClick={() => handleProviderLogin(googleProvider)}>Login with Google</Button>
        </form>
      )}
    </Container>
  );
};

export default AuthPage;
