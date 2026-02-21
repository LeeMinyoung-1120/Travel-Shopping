'use client';

import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import FeatureCards from '@/components/FeatureCards';
import FilterChips from '@/components/FilterChips';
import ProductSection from '@/components/ProductSelection';
import { useProducts } from '@/contexts/ProductContext';
import { useEffect, useState } from 'react';
import styles from '@/components/styles/Home.module.css';

export default function Home() {
  const login_status = 'test';
  // const login_status = localStorage.getItem('loginUser');
  const { products, loading, error } = useProducts();
  // const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  // useEffect(() => {
  //   const user = localStorage.getItem('loginUser');
  //   setLoginStatus(user);
  // }, []);

  const popular = products.filter((p) => p.section === "popular");
  const hot = products.filter((p) => p.section === "hot");

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className={styles.page}>
      {/* 히어로 배너 */}
      <HeroCarousel />

      {/* 당신을 위한 여행 (3개 카드) */}
      <section className={styles.featureSection}>
        <h2 className={styles.sectionTitle}>당신을 위한 여행</h2>
        <p className={styles.sectionSubtitle}>
          모든 여행은 당신의 취향에서 시작됩니다
        </p>
        <FeatureCards />
      </section>

      {/* 상세 카테고리 필터 칩 */}
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <p className={styles.filterLabel}>상세 카테고리를 선택하세요</p>
          <FilterChips />
        </div>
      </section>

      {/* 인기 급상승 여행지 */}
      <ProductSection title="인기 급상승 여행지" items={popular} />

      {/* 지금 핫한 투어·티켓 */}
      <ProductSection title="지금 핫한 투어 · 티켓" items={hot} />
    </div>
  );
}
