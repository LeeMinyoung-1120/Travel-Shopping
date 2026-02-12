"use client";

import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { useOrder } from "@/contexts/OrderContext";
import axios from 'axios';

export default function OrderPage() {
  const { items, totalPrice, createOrder, isOrder } = useOrder();
  const router = useRouter();

  // 주문 버튼 클릭
  const order = async () => {
    try {
      // 버튼 비활성화
      await createOrder();

      // Cart items 기반으로 서버 요청 payload 생성
      const payload = {
        items: items.map((item) => ({
          itemId: Number(item.id), // 서버에서 필요로 하는 id
          quantity: item.quantity,
          option: 0, // 옵션은 필요 시 수정
        })),
        totalPrice: totalPrice,
        userInfo: "test", // 실제 로그인 유저 정보로 교체 가능
      };

      const response = await axios.post('http://localhost:3001/api/order', payload);

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
            <input type="text" className={styles.formInput} placeholder="홍길동" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>이메일</label>
            <input type="email" className={styles.formInput} placeholder="hong@gmail.com" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>휴대전화번호</label>
            <input type="text" className={styles.formInput} placeholder="- 없이 번호를 입력해주세요" />
            <p className={styles.formNotice}>
              예약 정보가 주문자 이메일로 발송됩니다.
            </p>
          </div>
        </div>

        {/* 오른쪽: 주문 요약 */}
        <div className={styles.paymentBox}>
          <h2 className={styles.paymentTitle}>주문 요약</h2>

          {items.map((item) => (
            <div key={item.id} className={styles.summaryItem}>
              <img src={item.imageUrl} alt="상품 이미지" className={styles.summaryImage} />
              <div className={styles.summaryInfo}>
                <p className={styles.summaryTitle}>{item.title}</p>
                <p className={styles.summarySub}>인원 {item.quantity}명</p>
                <p className={styles.summaryPrice}>{item.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}

          <div className={styles.totalPriceBox}>
            <span>총 결제금액</span>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </div>

          <button
            className={styles.payButton}
            onClick={order}
            disabled={isOrder}
          >
            {isOrder ? "결제 중..." : `${totalPrice.toLocaleString()} 결제하기`}
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
