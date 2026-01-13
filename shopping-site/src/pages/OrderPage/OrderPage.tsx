"use client";

import styles from "../../styles/page.module.css";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import axios from 'axios';

export default function OrderPage() {
  const { createOrder, isOrder } = useOrder();
  const router = useRouter();

  const order = async () => {
    try {
      // 1. 버튼 비활성화 (Context 내부 로직)
      await createOrder();

      // 2. Express 서버 호출 (실제 상품 계산해서 적용할 필요)
      // 결제 시의 Success/Error 처리 기준을 어떻게 할지?
      const response = await axios.post('http://localhost:3001/api/pay',
        {
          items: [
            { productId: 1, quantity: 1 },
            { productId: 2, quantity: 1 }
          ],
          totalPrice: 3934000
        }
      );

      // 3. 성공 시 페이지 이동
      if (response.data.success) {
        router.push(`/order/orderResult?orderId=${response.data.orderId}`);
      }
    } catch (error) {
      console.error('주문 실패:', error);
      alert('결제 중 오류가 발생했습니다.');
    }
  };

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