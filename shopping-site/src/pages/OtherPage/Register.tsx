import React, { useState } from 'react';

const Register: React.FC = () => {
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
    // 여기서 백엔드 API 호출 추가 가능
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='이름을 입력하세요.'
            value={formData.name}
            onChange={handleChange}
            required
            style={{border:'1px solid #ccc', backgroundColor:'#eeeeee'}}
          />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
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
          <label htmlFor="password">비밀번호:</label>
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
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='비밀번호를 다시 입력하세요.'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{border:'1px solid #ccc', backgroundColor:'#eeeeee'}}
          />
        </div>
        <button type="submit" style={{border:'none',backgroundColor:'green', color:'white', padding: '10px 20px'}}>회원가입</button>
      </form>
    </div>
  );
};

export default Register;