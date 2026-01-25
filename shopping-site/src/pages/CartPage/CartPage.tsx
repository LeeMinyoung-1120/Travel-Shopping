'use client';

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/Cart.module.css';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>예약하기</h2>

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

export default CartPage;
