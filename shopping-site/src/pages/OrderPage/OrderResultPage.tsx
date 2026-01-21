"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import styles from "../../styles/page.module.css";

export default function OrderResultPage() {
  const { isSuccess, totalPrice, clearOrder } = useOrder();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    return <p>잘못된 접근입니다.</p>;
  }

  // OrderPage에서 전달한 orderId
  const rawOrderId = searchParams.get("orderId");

  const handleGoHome = () => {
    clearOrder();
    router.push("/");
  };

  // 잘못된 접근 처리 (TypeScript + 런타임 모두 안전)
  if (!isSuccess || !rawOrderId) {
    return <p>잘못된 접근입니다. 먼저 주문해주세요.</p>;
  }

  // 여기서부터 orderId는 string으로 확정
  const orderId: string = rawOrderId;

  // 주문번호 포맷 (UI용)
  const orderNumber = `TR-${new Date().getFullYear()}-${orderId.padStart(6, "0")}`;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon} />
        </div>

        <h1 className={styles.title}>결제 성공</h1>

        <div className={styles.orderBox}>
          <span className={styles.orderLabel}>주문번호</span>
          <span className={styles.orderNumber}>#{orderNumber}</span>
        </div>

        <div className={styles.orderBox}>
          <span className={styles.orderLabel}>총 결제 금액</span>
          <span className={styles.orderNumber}>
            {totalPrice.toLocaleString()}원
          </span>
        </div>

        <button className={styles.button} onClick={handleGoHome}>
          홈으로 이동하기
        </button>
      </div>
    </div>
  );
}
