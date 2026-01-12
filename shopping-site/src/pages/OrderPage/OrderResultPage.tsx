"use client";

import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import styles from "../../styles/page.module.css";

export default function OrderResultPage() {
  const { isSuccess, totalPrice, clearOrder } = useOrder();
  const router = useRouter();

  const handleGoHome = () => {
    clearOrder();       // 주문 초기화
    router.push("/");   // 홈으로 이동
  };

  const orderNumber = "TR-2024-00158"; // 실제 주문번호는 API 연동 시 동적 처리 가능

  // 잘못된 접근 처리
  if (!isSuccess) return <p>잘못된 접근입니다. 먼저 주문해주세요.</p>;

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
