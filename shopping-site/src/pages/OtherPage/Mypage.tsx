import type { NextPage } from 'next';
import styles from '@/styles/MyPage.module.css';

type Trip = {
  id: number;
  title: string;
  imageUrl: string;
  people: number;
  price: number;
  past?: boolean;
};

const trips: Trip[] = [
  {
    id: 1,
    title: '[출발확정] 2026 시드니 마라톤 5일\n요즘대세 해외마라톤',
    imageUrl: '/images/sydney.jpg',
    people: 1,
    price: 1967000,
  },
  {
    id: 2,
    title: '[출발확정] 2026 시드니 마라톤 5일\n요즘대세 해외마라톤',
    imageUrl: '/images/sydney.jpg',
    people: 1,
    price: 1967000,
  },
  {
    id: 3,
    title: '[출발확정] 2025 서울 야경 버스투어\n시청 앞 출발',
    imageUrl: '/images/seoul.jpg',
    people: 2,
    price: 37000,
    past: true,
  },
];

const MyTripPage: NextPage = () => {
  const upcomingTrips = trips.filter((t) => !t.past);
  const pastTrips = trips.filter((t) => t.past);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>나의 여행</h1>

      <section>
        <h2 className={styles.sectionTitle}>예정된 여행</h2>
        {upcomingTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>

      <section className={styles.sectionGap}>
        <h2 className={styles.sectionTitle}>지난 여행</h2>
        {pastTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </section>
    </div>
  );
};

export default MyTripPage;

type TripCardProps = {
  trip: Trip;
};

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <div className={styles.card}>
      <img src={trip.imageUrl} alt="" className={styles.thumbnail} />

      <div className={styles.info}>
        <p className={styles.title}>
          {trip.title.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <span className={styles.people}>인원 {trip.people}명</span>
      </div>

      <div className={styles.right}>
        <strong className={styles.price}>
          {trip.price.toLocaleString()}원
        </strong>
        <button className={styles.detailBtn}>자세히 보기 &gt;</button>
      </div>
    </div>
  );
};
