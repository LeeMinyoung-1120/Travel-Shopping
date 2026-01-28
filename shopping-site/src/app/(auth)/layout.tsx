'use client';

import Header from '@/components/header';
import { CartProvider } from '@/contexts/CartContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
