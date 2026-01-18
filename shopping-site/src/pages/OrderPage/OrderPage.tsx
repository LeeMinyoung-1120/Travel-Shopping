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
      const response = await axios.post('http://localhost:3001/api/order',
        {
        items: [
          { itemId: 1, quantity: 1, option: 0 },
          { itemId: 2, quantity: 1, option: 0 },
        ],
        totalPrice: 3934000,
        userInfo: "test"
      });

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
        {/* 왼쪽: 주문자 정보 */}
        <div className={styles.orderForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>한글명(필수)</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="홍길동"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>이메일</label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="hong@gmail.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>휴대전화번호</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="- 없이 번호를 입력해주세요"
            />
            <p className={styles.formNotice}>
              예약 정보가 주문자 이메일로 발송됩니다.
            </p>
          </div>
        </div>

        {/* 오른쪽: 주문 요약 */}
        <div className={styles.paymentBox}>
          <h2 className={styles.paymentTitle}>주문 요약</h2>

          {[1, 2].map((item) => (
            <div key={item} className={styles.summaryItem}>
              <img src="./globe.svg" alt="상품 이미지" className={styles.summaryImage} />

              <div className={styles.summaryInfo}>
                <p className={styles.summaryTitle}>
                  [출발확정] 2026 시드니 마라톤
                </p>
                <p className={styles.summarySub}>인원 1명</p>
                <p className={styles.summaryPrice}>1,967,000원</p>
              </div>
            </div>
          ))}

          <div className={styles.totalPriceBox}>
            <span>총 결제금액</span>
            <strong>3,934,000원</strong>
          </div>

          <button
            className={styles.payButton}
            onClick={order}
            disabled={isOrder}
          >
            {isOrder ? "결제 중..." : "3,934,000 결제하기"}
          </button>

          <p className={styles.paymentNotice}>
            약관 및 주문 내용을 확인하였으며,<br />
            정보 제공 등에 동의합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
