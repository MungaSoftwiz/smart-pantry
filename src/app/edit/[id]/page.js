"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Container, Typography, TextField, Button, Snackbar } from "@mui/material";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function EditItem() {
  const router = useRouter();
  const id = router.query;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push('../auth'); // Redirect to login or another page if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

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
        setLoading(false);
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
      setSnackbarMessage("Item updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      router.push('../../page');
      setTimeout(() => {
        router.push('../../page');
      }, 2000); // Delay to show the snackbar message
    } catch (e) {
      console.error('Error updating document: ', e);
      setSnackbarMessage("Error updating item.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

//   if (loading) {
//    return (
//      <Container>
//        <Typography variant="h6" sx={{ marginTop: 2, color: "#4E342E" }}>
//          Loading...
//        </Typography>
//      </Container>
//    );
//  }

  if (!isLoggedIn) {
    return (
      <Container>
        <Typography variant="h6" sx={{ marginTop: 2, color: "#4E342E" }}>
          Please log in to edit items.
        </Typography>
      </Container>
    );
  }

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
        {/* Add more fields here if necessary */}
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#4E342E", color: "#FFF8E1" }}>
          Update Item
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
}

