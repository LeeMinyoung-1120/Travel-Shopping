'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number | string;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  reviewCount: number;
  tag?: string;
}

export default function ProductCard({
  id,
  title,
  thumbnail,
  price,
  rating,
  reviewCount,
  tag,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={thumbnail} alt={title} className={styles.image} />
        {tag && <span className={styles.tag}>{tag}</span>}
        <button className={styles.favorite}>🤍</button>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.rating}>
          <span className={styles.star}>⭐</span>
          <span className={styles.score}>{rating}</span>
          <span className={styles.review}>({reviewCount})</span>
        </div>

        <p className={styles.price}>{price.toLocaleString()}원</p>
      </div>
    </Link>
  );
}
