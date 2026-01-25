'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  image: string;
  options: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  fetchCartItems: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // 백엔드에서 장바구니 데이터 가져오기
  const fetchCartItems = async () => {
    try {
      const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
      const userId = loginUser.userId || 1;

      const response = await fetch(`http://localhost:3001/api/cart?userId=${userId}`);
      const data = await response.json();

      if (data.success && data.items) {
        const mappedItems = data.items.map((item: { itemId: number; name: string; imageUrl: string; option: string; price: number; quantity: number }) => ({
          id: item.itemId,
          name: item.name,
          image: item.imageUrl,
          options: item.option,
          price: item.price,
          quantity: item.quantity,
        }));
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    void fetchCartItems();
  }, []);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = async (id: number) => {
    try {
      const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
      const userId = loginUser.userId || 1;

      const response = await fetch(`http://localhost:3001/api/cart/${id}?userId=${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      } else {
        alert(data.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      alert('서버와 연결할 수 없습니다.');
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    try {
      const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
      const userId = loginUser.userId || 1;

      const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, quantity }),
      });

      const data = await response.json();

      if (data.success) {
        setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
      } else {
        alert(data.message || '수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('장바구니 수정 실패:', error);
      alert('서버와 연결할 수 없습니다.');
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};