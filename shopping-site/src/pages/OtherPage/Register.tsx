import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Register.module.css';

const Register: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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
        console.log('회원가입 데이터:', formData);
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
                <label className={styles.label}>verify password</label>
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
            className={styles.loginButton}
            onClick={() => router.push('/OtherPage/Login')}
            >
            로그인하기
            </button>
            </form>
        </div>
        </div>
    );
};

export default Register;
