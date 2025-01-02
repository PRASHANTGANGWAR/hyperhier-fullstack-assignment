import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Admin",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* <ToastProvider> */}
      <body className={`${inter.className} min-h-screen`}>
        {children}
        {/* <Toaster /> */}
        <Toaster duration={15000} closeButton richColors />
      </body>
      {/* </ToastProvider> */}
    </html>
  );
}
