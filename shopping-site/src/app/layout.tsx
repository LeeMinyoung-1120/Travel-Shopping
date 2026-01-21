// app/layout.tsx
import { ReactNode } from "react";
import { OrderProvider } from "@/contexts/OrderContext"; //향후 특정 화면으로 이동하도록 수정

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* OrderContext로 주문 상태 공유 */}
        <OrderProvider>
          {children}
        </OrderProvider>
      </body>
    </html>
  );
}
