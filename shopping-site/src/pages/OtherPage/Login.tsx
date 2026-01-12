import React, { useState } from 'react';

const Login: React.FC = () => {
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
    // 여기서 백엔드 API 호출 추가 가능
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Logo</h2>
      <p>쉽고 간편하게! 진짜 나만의 맞춤 여행을 떠나보세요.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='이메일을 입력하세요.'
            value={formData.email}
            onChange={handleChange}
            required
            style={{border:'1px solid #ccc', backgroundColor:'#eeeeee'}}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='비밀번호를 입력하세요.'
            value={formData.password}
            onChange={handleChange}
            required
            style={{border:'1px solid #ccc', backgroundColor:'#eeeeee'}}
          />
        </div>
        <button type="submit" style={{border:'none',backgroundColor:'green', color:'white', padding: '10px 20px'}}>로그인</button>
        <button type="button" style={{border:'1px solid #ccc',backgroundColor:'transparent', padding: '10px 20px'}}>회원가입</button>
      </form>
    </div>
  );
};

export default Login;