'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles/header.module.css';
// import { useCartStore } from '../hooks/useCart';

const Header: React.FC = () => {
  // const total = useCartStore((s) => s.getTotalCount());
  const total = 10;
  const badge: string | number = total >= 10 ? '10+' : total;
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고 */}
        <Link href="/" className={styles.logo}>
          <img src="/2mg/logo.jpg" alt="Travel Pick" />
        </Link>

        {/* 검색 */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="나의 여행 MBTI 확인하기"
            className={styles.searchInput}
          />
        </div>

        {/* 우측 메뉴 */}
        <div className={styles.right}>
          <button className={styles.loginBtn} onClick={() => router.push('/login')}>
            로그인 및 회원가입
          </button>

          <Link href="/cart" className={styles.cart}>
            🛒
            {total > 0 && (
              <span className={styles.badge}>{badge}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
