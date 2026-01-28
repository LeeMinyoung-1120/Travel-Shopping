import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import FeatureCards from '@/components/FeatureCards';
import FilterChips from '@/components/FilterChips';
import ProductSection from '@/components/ProductSelection';
// import { products } from '../data/products';

export default function Home() {
  //const login_status = localStorage.getItem('loginUser');
  // const popular = products.filter((p) => p.section === "popular");
  // const hot = products.filter((p) => p.section === "hot");

  return (
    <div className="bg-gray-50">
      {/* 히어로 배너 */}
      <HeroCarousel />

      {/* 당신을 위한 여행 (3개 카드) */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-2xl font-bold mb-2">당신을 위한 여행</h2>
        <p className="text-center text-gray-500 mb-8">
          모든 여행은 당신의 취향에서 시작됩니다
        </p>
        <FeatureCards />
      </section>

      {/* 상세 카테고리 필터 칩 */}
      <section className="py-6 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-gray-600 mb-3">상세 카테고리를 선택하세요</p>
          <FilterChips />
        </div>
      </section>

      {/* 인기 급상승 여행지 */}
      {/* <ProductSection title="인기 급상승 여행지" items={popular} /> */}

      {/* 지금 핫한 투어·티켓 */}
      {/* <ProductSection title="지금 핫한 투어 · 티켓" items={hot} /> */}
    </div>
  );
}
