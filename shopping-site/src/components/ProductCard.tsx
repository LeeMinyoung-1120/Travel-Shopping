'use client';

import Link from 'next/link';
import styles from './styles/ProductCard.module.css';
import { Product } from '@/contexts/ProductContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    title,
    thumbnail,
    price,
    rating,
    reviewCount,
    tag,
  } = product;

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

        <p className={styles.price}>
          {price.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
