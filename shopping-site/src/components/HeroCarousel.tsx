'use client';

// travel_pick/components/HeroCarousel.jsx
import { useState } from "react";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const banners = [
    {
      img: "/2mg/main banner_1.jpg",
      title: "당신의 여행 성향을 찾고",
      subtitle: "완벽한 일정을 만들어보세요",
    },
    {
      img: "/2mg/main banner_2.jpg",
      title: "MBTI 기반 맞춤 추천",
      subtitle: "당신만의 특별한 여행을 시작하세요",
    },
  ];

  const next = () => setCurrent((current + 1) % banners.length);
  const prev = () => setCurrent((current - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <img
        src={banners[current].img}
        alt={banners[current].title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-2">{banners[current].title}</h1>
        <p className="text-xl mb-6">{banners[current].subtitle}</p>
        <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition">
          더 알아보기
        </button>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
      >
        ▶
      </button>
    </div>
  );
}
