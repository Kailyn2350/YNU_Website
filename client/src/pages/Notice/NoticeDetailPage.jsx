import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NoticeDetailPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/notice/${id}`)
      .then(res => setNotice(res.data))
      .catch(() => navigate('/board/notice')); // 에러 시 목록으로
  }, [id, navigate]);

  if (!notice) return <div style={{ padding: '30px' }}>불러오는 중...</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>{notice.title}</h2>
      <p><strong>작성자:</strong> {notice.author?.nickname || '익명'}</p>
      <p><strong>작성일:</strong> {new Date(notice.createdAt).toLocaleDateString()}</p>
      <hr />
      <p style={{ whiteSpace: 'pre-line' }}>{notice.content}</p>
    </div>
  );
};

export default NoticeDetailPage;
