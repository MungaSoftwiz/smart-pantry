"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import { db } from "./firebase";
import { collection, getDoc, deleteDoc, doc } from "firebase/firestore";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, Alert } from "@mui/material";
//import { Typography } from "@mui/material";
//import { Box, Container, Typography, List, ListItem, ListItemText, Button, Drawer, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function EditItem({ open, onClose, id }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (e) {
      console.error('Error updating document: ', e);
      setSnackbarMessage("Error updating item.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <TextField
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            required
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#4E342E", color: "#FFF8E1" }}
          >
            Update Item
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

