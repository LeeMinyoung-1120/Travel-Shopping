"use client";

import OrderPage from "@/app/order/page"; // OrderPage 컴포넌트 직접 import (test용도)

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">OrderPage</h1>

      <p>Order Test</p>

      <div style={{ marginTop: "2rem" }}>
        <OrderPage />
      </div>
    </main>
  );
}
