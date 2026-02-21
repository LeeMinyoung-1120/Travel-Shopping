'use client';

import { useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import { useState } from 'react';
import styles from '@/styles/ProductDetail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const { products, loading, error } = useProducts();

  const id = params?.id ? Number(params.id) : null;
  const product = products.find((p) => p.id === id);

  const [qty, setQty] = useState(1);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const increment = () => {
    if (qty < product.maxQty) setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const totalPrice = product.price * qty;

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.summary}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceLabel}>성인 1인</div>
          <div className={styles.price}>{product.price.toLocaleString()}원</div>

          <h3 className={styles.subtitle}>상품 소개</h3>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>인원선택</h3>

        <div className={styles.qtyWrapper}>
          <div>
            <div className={styles.qtyLabel}>인원(성인/아동)</div>
            <div className={styles.qtyPrice}>{product.price.toLocaleString()}원</div>
          </div>

          <div className={styles.qtyControl}>
            <button
              onClick={decrement}
              className={styles.qtyBtn}
              aria-label="감소"
            >
              –
            </button>
            <div className={styles.qtyCount}>{qty}</div>
            <button
              onClick={increment}
              className={styles.qtyBtn}
              aria-label="증가"
            >
              +
            </button>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      <section className={styles.sectionBottom}>
        <div>
          <div className={styles.totalLabel}>총 금액</div>
          <div className={styles.totalPrice}>{totalPrice.toLocaleString()}원</div>
        </div>

        <div className={styles.btnGroup}>
          <button
            className={styles.reserveBtn}
            onClick={() => alert(`예약되었습니다! 총 금액: ${totalPrice.toLocaleString()}원`)}
          >
            예약하기
          </button>

          <button aria-label="찜하기" className={styles.bookmarkBtn}>
            ♡
          </button>
        </div>
      </section>
    </div>
  );
}
