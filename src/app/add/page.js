"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function AddItem() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add item to the list (in a real app, you would send a request to the server)
    router.push("/");
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
