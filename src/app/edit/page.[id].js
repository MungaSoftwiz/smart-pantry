"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update item in the list (in a real app, you would send a request to the server)
    router.push("/");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2, color: "#4E342E" }}>Edit Item</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#4E342E", color: "#FFF8E1" }}>
          Update Item
        </Button>
      </form>
    </Container>
  );
}
