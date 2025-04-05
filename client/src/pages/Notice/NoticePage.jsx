// NoticePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/notice`)
      .then(res => setNotices(res.data));

    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        setUser(res.data.user);
      });
    }
  }, []);

  const handleWrite = () => {
    navigate('/board/notice/write');
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>📌 공지사항</h2>
      {user?.isAdmin && (
        <button onClick={handleWrite} style={{ marginBottom: '15px' }}>
          ✏️ 공지 작성
        </button>
      )}
        <ul>
        {notices.map(notice => (
            <li key={notice._id}>
            <Link to={`/board/notice/${notice._id}`} style={{ fontWeight: 'bold', color: '#007bff', textDecoration: 'none' }}>
                {notice.title}
            </Link>{' '}
            - {notice.author.nickname}
            </li>
        ))}
        </ul>
    </div>
  );
};

export default NoticePage;
