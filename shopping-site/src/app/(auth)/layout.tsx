'use client';

import Header from '@/components/header';
import { CartProvider } from '@/contexts/CartContext';
import { OrderProvider } from '@/contexts/OrderContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <OrderProvider>
        <Header />
        {children}
      </OrderProvider>
    </CartProvider>
  );
}
