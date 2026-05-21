import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <body className={`${geistSans.variable} font-sans antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}