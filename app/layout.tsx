import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/Providers/StoreProviders";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { BottomNav } from "@/components/shared/Navbar/BottomNav";
import { FloatingActionButton } from "@/components/shared/FloatingButton/FloatingButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "An Nusra Foundation",
  description: "An Nusra Foundation is a non-profit Islamic organization platform designed to support charity-based activities such as Zakat, Sadaqah, Emergency Aid, Education Funds, etc.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <StoreProvider>
            <Navbar />
            <BottomNav />
            <FloatingActionButton />
            {children}
          </StoreProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
