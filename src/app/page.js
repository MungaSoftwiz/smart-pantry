"use client"
import { useEffect, useState } from "react";
import {db} from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Box, Container, Typography, List, ListItem, ListItemText, Button, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import AddItemForm from "./add/page";
import { useRouter } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import AuthPage from './auth/page';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantry-items', id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const handleItemAdded = () => {
    if (isLoggedIn) {
      const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'pantry-items'));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      };

      fetchItems();
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container>
      {/* Render AuthPage if not logged in */}
      {!isLoggedIn ? (
        <AuthPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          {/* Sidebar */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
            sx={{ width: 250, flexShrink: 0 }}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <List>
                <ListItem button component={Link} href="/">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} href="/add">
                  <ListItemText primary="Add Item" />
                </ListItem>
                <ListItem button component={Link} href="/recipes">
                  <ListItemText primary="Recipe Suggestions" />
                </ListItem>
                <ListItem button component={Link} href="/upload">
                  <ListItemText primary="Upload Image" />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {/* Main Content */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <AddItemForm onItemAdded={handleItemAdded} />
          <Typography variant="h4" sx={{ marginTop: 2, color: "#4E342E" }}>Pantry Items:</Typography>
          <List>
            {items.map(item => (
              <ListItem key={item.id}>
                <ListItemText primary={item.name} secondary={`Num: ${item.quantity} - Desc: ${item.description}`} />
                <Button component={Link} href={`/edit/${item.id}`} sx={{ color: "#4E342E", marginRight: 2 }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(item.id)} sx={{ color: "#4E342E" }}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}
