"use client"
import { useEffect, useState } from "react";
import {db} from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import Link from "next/link";
import { auth } from "./firebase"; // Import auth from firebase
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import AddItem from "./add/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push('/auth');
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, "pantry-items"));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      };

      fetchItems();
    }
  }, [isLoggedIn]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Container>
      <AddItem isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <>
          <Typography variant="h4" sx={{ marginTop: 2, color: "#4E342E" }}>Pantry Items:</Typography>
          <List>
            {items.map(item => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} />
                <Button component={Link} href={`/edit/${item.id}`} sx={{ color: "#4E342E" }}>Edit</Button>
                <Button onClick={() => handleDelete(item.id)} sx={{ color: "#4E342E" }}>Delete</Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="h6" sx={{ marginTop: 2, color: "#4E342E" }}>Please log in to view pantry items.</Typography>
      )}
    </Container>
  );
}
