'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles/header.module.css';
import { useCart } from '@/contexts/CartContext';

interface LoginUser {
  userId: number;
  name: string;
  email: string;
  // 필요 시 추가 속성
}

const Header: React.FC = () => {
  const router = useRouter();
  const { items } = useCart();

  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loginUser');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setLoginUser(userObj);
      } catch {
        setLoginUser(null);
      }
    } else {
      setLoginUser(null);
    }
  }, []);

  const total = items.reduce((sum, item) => sum + item.quantity, 0);
  const badge: string | number = total >= 10 ? '10+' : total;

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
          {!loginUser ? (
            <button
              className={styles.loginBtn}
              onClick={() => router.push('/login')}
            >
              로그인 및 회원가입
            </button>
          ) : (
            <>
              <nav className={styles.navLinks}>
                <Link href="/my-trips" className={styles.navLink}>
                  나의 여행
                </Link>
                <Link href="/favorites" className={styles.navLink}>
                  찜한 목록
                </Link>
                <Link href="/notifications" className={styles.navLink}>
                  알림
                </Link>
              </nav>

              <Link href="/mypage" className={styles.profile}>
                <img
                  src="/2mg/avatar.png"
                  alt={`${loginUser.name} 프로필`}
                  className={styles.profileImage}
                />
              </Link>

              <Link href="/cart" className={styles.cart}>
                🛒
                {total > 0 && <span className={styles.badge}>{badge}</span>}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
