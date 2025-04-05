import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ynuBanner from '../assets/ynu-banner.png';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('아이디와 비밀번호를 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      setTimeout(() => {
        navigate('/');
      }, 50);
      
    } catch (err) {
      setErrorMsg('로그인 실패: 아이디 또는 비밀번호 오류');
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* ✅ 배너 이미지 삽입 */}
      <div style={styles.banner}>
        <img src={ynuBanner} alt="YNU Banner" style={styles.bannerImage} />
      </div>
  
      {/* ✅ 로그인 박스 */}
      <div style={styles.box}>
        <h2 style={styles.title}>YNU Every Time</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>로그인</button>
          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        </form>
        <p style={styles.sub}>
          아직 계정이 없으신가요? <Link to="/register" style={styles.link}>회원가입</Link>
        </p>
      </div>
    </div>
  );  
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column', // ✅ 세로 정렬
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
  },
  banner: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '500px',
    height: 'auto',
    objectFit: 'contain',
  },  
  box: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#0077cc',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0077cc',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  sub: {
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '15px',
    color: '#666',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginPage;
