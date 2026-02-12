'use client';

import { useState } from 'react';
import styles from './styles/HeroCarousel.module.css';

interface Banner {
  img: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  banners?: Banner[];
  height?: number; // px 단위 높이
}

export default function HeroCarousel({
  banners = [
    {
      img: '/2mg/main banner_1.jpg',
      title: '당신의 여행 성향을 찾고\n완벽한 일정을 만들어보세요',
      subtitle: '당신의 MBTI 여행 유형을 분석하여 맞춤형 여행 상품을 추천합니다.\n검색하고, 계획하고, 에약하세요. 모든 것이 한 곳에서 가능합니다.',
    },
    {
      img: '/2mg/main banner_2.jpg',
      title: 'MBTI 기반 맞춤 추천',
      subtitle: '당신만의 특별한 여행을 시작하세요',
    },
  ],
  height = 500,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div
      className={styles.container}
      style={{ height: `${height}px` }}
    >
      <img
        src={banners[current].img}
        alt={banners[current].title}
        className={styles.image}
      />

      <div className={styles.overlay}>
        <h1 className={styles.title}>{banners[current].title}</h1>
        <p className={styles.subtitle}>{banners[current].subtitle}</p>
        <button className={styles.cta}>더 알아보기</button>
      </div>

      <button className={`${styles.nav} ${styles.left}`} onClick={prev}>
        ◀
      </button>
      <button className={`${styles.nav} ${styles.right}`} onClick={next}>
        ▶
      </button>
    </div>
  );
}
