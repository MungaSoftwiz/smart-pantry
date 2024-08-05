"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const DarkBackground = styled('div')({
  backgroundColor: '#121212',
  color: '#ffffff',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const CTAButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#1976d2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
});

const FeatureCard = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  color: '#ffffff',
  backgroundColor: '#424242',
});

const LandingPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/auth');
  };

  const handleGetStartedClick = () => {
    router.push('/register');
  };

  return (
    <DarkBackground>
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          Welcome to Smart Pantry
        </Typography>
        <Typography variant="h5" gutterBottom>
          The ultimate pantry tracker to keep your kitchen organized.
        </Typography>

        <CTAButton variant="contained" onClick={handleGetStartedClick}>
          Get Started
        </CTAButton>

        <Typography variant="h6" gutterBottom>
          Features
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <Typography variant="h6">Feature 1</Typography>
              <Typography>Track your pantry items effortlessly.</Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <Typography variant="h6">Feature 2</Typography>
              <Typography>TBD</Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <Typography variant="h6">Feature 3</Typography>
              <Typography>TBD</Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: '40px' }}>
          Login
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Login with Email
        </Button>
      </Container>
    </DarkBackground>
  );
};

export default LandingPage;

