import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNickname(res.data.user.nickname);
      })
      .catch(() => {
        alert('세션이 만료되었습니다.');
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div style={{ padding: '30px' }}>
      <h2>🎉 {nickname}님, 환영합니다!</h2>
      <p>왼쪽 메뉴에서 게시판을 선택하세요.</p>
    </div>
  );
};

export default HomePage;
