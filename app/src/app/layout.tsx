import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/nav/NavBar";




const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight:["400","500", "700", "900"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <NavBar/>
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
