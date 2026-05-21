import { Geist } from "next/font/google";
import "./globals.css";
// Import the new Navbar component
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "KeenKeeper - Keep Your Friendships Alive",
  description: "Track and maintain your friendships easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} font-sans antialiased`} 
        suppressHydrationWarning
      >
        {/* Add the Navbar here to display on all pages */}
        <Navbar />
        
        {/* All other page content goes here */}
        <main className="container mx-auto px-4 md:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}