import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Login.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 백엔드 API 호출
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      // 로그인 성공 시 localStorage에 저장
      localStorage.setItem(
        'loginUser',
        JSON.stringify({
          userId: data.user.userId,
          name: data.user.name,
          email: data.user.email,
          accessToken: data.accessToken,
        })
      );

      alert(`${data.user.name}님 환영합니다.`);
      router.push('/ProductPage/ProductList');
    } catch (error) {
      alert('서버와 연결할 수 없습니다.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>Logo</div>
        <p className={styles.description}>
          쉽고 간편하게!
          <br />
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
