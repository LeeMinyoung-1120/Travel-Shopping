"use client";

import styles from "../../styles/page.module.css";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";

export default function OrderPage() {
  const { createOrder, isOrder } = useOrder();
  const router = useRouter();

  const order = async() => {
    await createOrder();
    router.push("/order/orderResult");
  }

  return (
    <div className={styles.reserveContainer}>
      <h1 className={styles.pageTitle}>예약하기</h1>

      <div className={styles.reserveLayout}>
        {/* 왼쪽: 상품 리스트 */}
        <div className={styles.productList}>
          {[1, 2].map((item) => (
            <div key={item} className={styles.productCard}>
              <img src="./globe.svg" alt="상품 이미지" className={styles.productImage} />

              <div className={styles.productInfo}>
                <p className={styles.productTitle}>
                  [출발확정] 2026 시드니 마라톤 5일<br />
                  요즘대세 해외마라톤
                </p>
                <p className={styles.productSub}>인원 1명</p>
              </div>

              <div className={styles.productPrice}>
                1,967,000원
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 결제 정보 */}
        <div className={styles.paymentBox}>
          <h2 className={styles.paymentTitle}>결제 정보</h2>

          <div className={styles.paymentSection}>
            <p className={styles.paymentLabel}>주문 금액</p>
            <p className={styles.paymentItem}>
              [출발확정] 2026 시드니 마라톤 5일 요즘 대세 ...
            </p>
            <p className={styles.paymentItem}>
              [출발확정] 2026 시드니 마라톤 5일 요즘 대세 ...
            </p>
          </div>

          <div className={styles.totalPriceBox}>
            <span>총 결제금액</span>
            <strong>3,934,000원</strong>
          </div>

          <button className={styles.payButton}
          onClick={order}
          disabled={isOrder}
          > { isOrder ? "결제 중..." : "결제하기"}</button>
        </div>
      </div>
    </div>
  );
}