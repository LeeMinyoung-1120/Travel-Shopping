'use client';

import styles from './ProductSection.module.css';
import ProductCard from './ProductCard';

interface ProductItem {
  id: number | string;
  [key: string]: any; // ProductCard로 그대로 전달
}

interface ProductSectionProps {
  title: string;
  items: ProductItem[];
}

export default function ProductSection({
  title,
  items,
}: ProductSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.grid}>
          {items.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
