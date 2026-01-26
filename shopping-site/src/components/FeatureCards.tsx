'use client';

// travel_pick/components/FeatureCards.jsx
export default function FeatureCards() {
  const features = [
    {
      img: "/2mg/easy.jpg",
      title: "간편한 예약 시스템",
      desc: "클릭 한 번으로 완료되는 예약",
    },
    {
      img: "/2mg/mbti.jpg",
      title: "MBTI 기반 맞춤 추천",
      desc: "나의 성향에 딱 맞는 여행지",
    },
    {
      img: "/2mg/unique.jpg",
      title: "이색 오감 투어",
      desc: "새로운 경험과 감각의 향연",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img src={f.img} alt={f.title} className="w-full h-48 object-cover" />
          <div className="p-5">
            <h3 className="font-bold text-lg mb-1">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}