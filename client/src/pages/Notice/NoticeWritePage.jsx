import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NoticeWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/notice`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('공지사항 등록 완료!');
      navigate('/board/notice');
    } catch (err) {
      alert('공지 등록 실패: 관리자만 작성 가능합니다.');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>✏️ 공지 작성</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          style={{ padding: '10px', fontSize: '16px', resize: 'vertical' }}
        />
        <button type="submit" style={{ padding: '12px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px' }}>
          등록
        </button>
      </form>
    </div>
  );
};

export default NoticeWritePage;
