"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface OrderContextType {
  items: OrderItem[];
  totalPrice: number;
  createOrder: () => Promise<void>;
  clearOrder: () => void;
  isOrder: boolean;
  isSuccess: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  // 주문 아이템 초기값
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      title: "[출발확정] 2026 시드니 마라톤 5일",
      price: 1967000,
      quantity: 2,
    },
  ]);

  const [isOrder, setisOrder] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 총 결제 금액 계산
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 주문 생성 함수 (결제 버튼 클릭 시 호출)
  const createOrder = async () => {
    try {
      setisOrder(true);
      // 모킹용 async 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (error) {
      console.error("주문 실패", error);
    } finally {
      setisOrder(false);
    }
  };

  // 주문 초기화
  const clearOrder = () => {
    setItems([]);     // 아이템 초기화
    setIsSuccess(false); // 주문 성공 상태 초기화
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        totalPrice,
        createOrder,
        clearOrder,
        isOrder,
        isSuccess,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// 커스텀 훅
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
}
