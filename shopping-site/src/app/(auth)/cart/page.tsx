'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import styles from '@/styles/Cart.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, fetchCartItems } = useCart();

  // 테스트용 장바구니 추가 함수 (나중에 삭제 예정)
  const handleTestAddCart = async () => {
    // 로그인된 유저 정보 가져오기
    const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}');
    if (!loginUser.userId) return alert('로그인 필요!');
    
    // 장바구니에 테스트 상품 추가
    const response = await fetch('http://localhost:3001/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // 테스트용 아이템 정보 + userId 포함
      body: JSON.stringify({
        userId: String(loginUser.userId), // 현재 로그인 중인 userId 전달
        itemId: 2,
        name: '지중해 마나도 스노클링',
        price: 1720000,
        quantity: 1,
        imageUrl: '/2mg/manado.png',
        option: '기본 옵션'
      }),
    });

    // 추가 성공 시 장바구니 아이템 새로고침
    const data = await response.json();
    if (data.success) await fetchCartItems();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>예약하기</h2>

      {/* 테스트 버튼, 삭제 예정 */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button onClick={handleTestAddCart}>
          테스트 상품
        </button>
      </div>

      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div className={styles.layout}>
          <div className={styles.productList}>
            {items.map(item => (
              <div key={item.id} className={styles.productCard}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                />

                <div className={styles.productInfo}>
                  <div className={styles.productTitle}>{item.name}</div>
                  <div className={styles.productSub}>옵션: {item.options}</div>
                  <div className={styles.productPrice}>
                    {item.price.toLocaleString()}원
                  </div>

                <div className={styles.quantityTotalRow}>
                  <div className={styles.quantityBox}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    {item.quantity}명
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                <div className={styles.totalPrice}>
                  총 합계 : {(item.price * item.quantity).toLocaleString()}원
                </div>
                </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    제거
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paymentBox}>
            <div className={styles.paymentTitle}>결제 정보</div>

            {items.map(item => (
              <div key={item.id} className={styles.paymentItem}>
                <span>
                  {item.name} ({item.options})
                </span>
                <span>
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            ))}

            <div className={styles.totalBox}>
              <span>총 결제 금액</span>
              <span>{total.toLocaleString()}원</span>
            </div>

            <button className={styles.payButton}>결제하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

