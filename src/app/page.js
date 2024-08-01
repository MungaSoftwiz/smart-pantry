"use client"
import { useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const [items, setItems] = useState([
    { id: 1, name: "Rice" },
    { id: 2, name: "Beans" },
  ]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 2, color: "#4E342E" }}>Pantry Items</Typography>
      <List>
        {items.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <Button component={Link} href={`/edit/${item.id}`} sx={{ color: "#4E342E" }}>Edit</Button>
            <Button onClick={() => handleDelete(item.id)} sx={{ color: "#4E342E" }}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
