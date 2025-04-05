// src/pages/EditPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(() => alert('글을 불러오는 데 실패했습니다.'));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
        title,
        content,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('수정 완료!');
      navigate(-1); // 이전 페이지로 돌아가기
    } catch {
      alert('수정 실패');
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>✏️ 글 수정</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '12px', fontSize: '16px' }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          style={{ padding: '12px', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
