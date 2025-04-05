import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const token = localStorage.getItem('token');
const currentUserId = token ? jwtDecode(token).id : null;


const EducationDetatilPage = () => {  
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/major/posts/education/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/board/education'));

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${postId}`)
      .then(res => setComments(res.data));
  }, [postId, navigate, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${postId}`, {
        content: commentInput,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCommentInput('');
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      alert('댓글 등록 실패');
    }
  };
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
  
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 삭제 후 다시 불러오기
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      alert('삭제 실패');
    }
  };
  

  if (!post) return <div style={{ padding: '30px' }}>불러오는 중...</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.author?.nickname || '익명'}</p>
      <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      <hr />
      <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>

      <hr style={{ margin: '30px 0' }} />
      <h3>💬 댓글</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
          {comments.map(comment => (
            <li key={comment._id} style={{ marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div>
                  <strong>{comment.author?.nickname || '익명'}</strong>
                  <span style={{ fontSize: '0.85em', color: '#888', marginLeft: '10px' }}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                {comment.author && comment.author._id === currentUserId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    style={{
                      background: 'none',
                      color: '#ff4d4f',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.85em'
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
              <div>{comment.content}</div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요"
            rows={3}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', resize: 'none' }}
          />
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            등록
          </button>
        </form>
    </div>
  );
};

export default EducationDetatilPage;
