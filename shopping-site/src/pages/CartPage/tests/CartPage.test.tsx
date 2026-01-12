import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartProvider } from '../../../contexts/CartContext';
import CartPage from '../CartPage';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe('CartPage Component', () => {
  test('renders empty cart', () => {
    renderWithProvider(<CartPage />);
    expect(screen.getByText('장바구니')).toBeInTheDocument();
    expect(screen.getByText('장바구니가 비어 있습니다.')).toBeInTheDocument();
  });

});