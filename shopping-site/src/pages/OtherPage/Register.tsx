'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Register.module.css';

const Register: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //user type 정의
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 기존 유저 목록 불러오기
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // 이메일 중복 체크
    const exists = users.find(
      (user: User) => user.email === formData.email
    );

    if (exists) {
      alert('이미 가입된 이메일입니다.');
      return;
    }

    // 유저 생성
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    //LocalStorage에 저장하였음. DB대신
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다.');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Verify Password</label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className={styles.submitButton} type="submit">
            회원가입
          </button>

          <button
            type="button"
            className={styles.loginButton}
            onClick={() => router.push('/login')}
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
