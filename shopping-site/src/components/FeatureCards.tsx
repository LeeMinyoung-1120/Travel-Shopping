'use client';

import styles from './styles/FeatureCard.module.css';

interface Feature {
  img: string;
  title: string;
  desc: string;
}

export default function FeatureCards() {
  const features: Feature[] = [
    {
      img: '/2mg/easy.jpg',
      title: '간편한 예약 시스템',
      desc: '클릭 한 번으로 완료되는 예약',
    },
    {
      img: '/2mg/mbti.jpg',
      title: 'MBTI 기반 맞춤 추천',
      desc: '나의 성향에 딱 맞는 여행지',
    },
    {
      img: '/2mg/unique.jpg',
      title: '이색 오감 투어',
      desc: '새로운 경험과 감각의 향연',
    },
  ];

  return (
    <div className={styles.container}>
      {features.map((f, i) => (
        <div key={i} className={styles.card}>
          <img src={f.img} alt={f.title} className={styles.image} />
          <div className={styles.content}>
            <h3 className={styles.title}>{f.title}</h3>
            <p className={styles.desc}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
