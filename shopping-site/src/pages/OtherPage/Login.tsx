import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 데이터:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>Logo</div>
        <p className={styles.description}>
          쉽고 간편하게!<br />
          진짜 나만의 맞춤 여행을 떠나보세요.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
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

          <button className={styles.loginButton} type="submit">
            로그인
          </button>

          <button
            type="button"
            className={styles.registerButton}
            onClick={() => router.push('/OtherPage/Register')}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
