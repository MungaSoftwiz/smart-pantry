"use client"
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"
import { Container, Typography, TextField, Button } from "@mui/material";

export default function AddItem() {
  const [name, setName] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "pantry-items"), {
        name: name,
      });
      setName("");
      alert("Item added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2, color: "#4E342E" }}>Add New Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#4E342E", color: "#FFF8E1" }}>
          Add Item
        </Button>
      </form>
    </Container>
  );
}
