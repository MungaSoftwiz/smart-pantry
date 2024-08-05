'use client';

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'pantry-items'), {
        name,
        quantity,
        description,
      });
      setName('');
      setQuantity('');
      setDescription('');
      onItemAdded();
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: '20px 0',
        padding: 2,
        backgroundColor: '#333',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#fff' }}>
        Add Pantry Item
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Item Name"
            variant="outlined"
            fullWidth
            value={name}
            InputLabelProps={{
              sx: { color: '#FFFFFF' },
            }}
            InputProps={{
              sx: { color: '#FFFFFF' },
            }}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              sx: { color: '#FFFFFF' },
            }}
            InputProps={{
              sx: { color: '#FFFFFF' },
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              sx: { color: '#FFFFFF' },
            }}
            InputProps={{
              sx: { color: '#FFFFFF' },
            }}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Add Item
      </Button>
    </Box>
  );
};

export default AddItemForm;

