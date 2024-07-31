//import { Inter } from "next/font/google";
import './globals.css';
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Smart Pantry App",
  description: "Creates an item pantry next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppBar position="static" sx={{ backgroundColor: "#4E342E", width: "100%", top: 0 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#FFF8E1" }}>
              Smart Pantry
            </Typography>
            <Box>
              <Button sx={{ color: "#FFF8E1" }} component={Link} href="/">
                Home
              </Button>
              <Button sx={{ color: "#FFF8E1" }} component={Link} href="/add">
                Add Item
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
