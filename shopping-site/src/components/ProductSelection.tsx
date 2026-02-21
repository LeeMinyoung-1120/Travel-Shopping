'use client';

import styles from './styles/ProductSelection.module.css';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/ProductContext';

interface ProductSelectionProps {
  title: string;
  items: Product[];
}

export default function ProductSelection({
  title,
  items,
}: ProductSelectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.grid}>
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
