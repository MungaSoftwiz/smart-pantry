"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Container, Typography, TextField, Button } from "@mui/material";

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        const docRef = doc(db, 'pantry-items', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'pantry-items', id);
      await updateDoc(docRef, {
        name: name,
      });
      router.push('/');
    } catch (e) {
      console.error('Error updating document: ', e);
    }
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
