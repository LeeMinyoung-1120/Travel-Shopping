'use client';

import { useState } from 'react';
import styles from './styles/FilterChips.module.css';

type Chip = '전체' | '나라별' | 'MBTI별' | '취향별' | '인원수별';

export default function FilterChips() {
  const [active, setActive] = useState<Chip>('전체');

  const chips: Chip[] = ['전체', '나라별', 'MBTI별', '취향별', '인원수별'];

  return (
    <div className={styles.container}>
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => setActive(chip)}
          className={`${styles.chip} ${
            active === chip ? styles.active : styles.inactive
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
