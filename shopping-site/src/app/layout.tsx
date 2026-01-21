import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";
// app/layout.tsx
import { ReactNode } from "react";
import { OrderProvider } from "@/contexts/OrderContext"; //향후 특정 화면으로 이동하도록 수정

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
