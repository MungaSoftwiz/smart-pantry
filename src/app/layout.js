import { Inter } from "next/font/google";
import Navigation from "@/app/navigation/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Pantry App",
  description: "Cretes an item pantry next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
