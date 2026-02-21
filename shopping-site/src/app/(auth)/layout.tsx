'use client';

import Header from '@/components/header';
import { ProductProvider } from '@/contexts/ProductContext';
import { CartProvider } from '@/contexts/CartContext';
import { OrderProvider } from '@/contexts/OrderContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <Header />
          {children}
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
}
