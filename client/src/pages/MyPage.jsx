import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [editing, setEditing] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setUser(res.data.user);
      setNicknameDraft(res.data.user.nickname);
    });

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/my`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setMyPosts(res.data));
  }, [token]);
  const handleDeleteAccount = async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      alert('탈퇴 완료되었습니다.');
      navigate('/login');
    } catch {
      alert('회원 탈퇴 실패');
    }
  };
  const handleNicknameSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/me/nickname`, {
        nickname: nicknameDraft,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('닉네임 변경 완료!');
      setUser({ ...user, nickname: nicknameDraft });
      setEditing(false);
    } catch {
      alert('닉네임 변경 실패');
    }
  };

  const handleCancel = () => {
    setNicknameDraft('');
    setEditing(false);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(myPosts.filter(post => post._id !== postId));
    } catch {
      alert('삭제 실패');
    }
  };



  if (!user) return <div style={{ padding: '30px' }}>불러오는 중...</div>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>👤 마이페이지</h2>
      <p><strong>아이디:</strong> {user.username}</p>
      <p><strong>이메일:</strong> {user.email}</p>
      <p>
        <strong>닉네임:</strong>{' '}
        {editing ? (
          <>
            <input
              type="text"
              value={nicknameDraft}
              onChange={(e) => setNicknameDraft(e.target.value)}
              style={{ padding: '6px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '8px' }}
            />
            <button onClick={handleNicknameSave} style={buttonStyle}>저장</button>
            <button onClick={handleCancel} style={{ ...buttonStyle, backgroundColor: '#aaa' }}>취소</button>
          </>
        ) : (
          <>
            {user.nickname}{' '}
            <button onClick={() => {
              setEditing(true);
              setNicknameDraft(user.nickname);
            }} style={buttonStyle}>변경</button>
          </>
        )}
      </p>
      <button
        onClick={handleDeleteAccount}
        style={{
          marginTop: '30px',
          backgroundColor: '#ff4d4f',
          color: 'white',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        회원 탈퇴
      </button>
      <hr style={{ margin: '30px 0' }} />
      <h3>📝 내가 작성한 글</h3>
      {myPosts.length > 0 ? (
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {myPosts.map(post => (
            <li key={post._id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <strong>{post.title}</strong> <br />
              <middle>
                {new Date(post.createdAt).toLocaleString()} |
                <span style={{ marginLeft: '5px', color: '#888' }}>
                  게시판 :
                  {getBoardName(post.category)}
                </span>
              </middle> <br />
              <button
                style={{ ...miniBtnStyle }}
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                수정
              </button>
              <button
                style={{ ...miniBtnStyle, backgroundColor: '#ff4d4f' }}
                onClick={() => handleDelete(post._id)}
              >
                삭제
              </button>
            </li>
          ))}

        </ul>
      ) : (
        <p>작성한 글이 없습니다.</p>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '4px 10px',
  fontSize: '0.9em',
  marginLeft: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const miniBtnStyle = {
  padding: '5px 10px',
  fontSize: '0.8em',
  marginRight: '10px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

const getBoardName = (category) => {
  switch (category) {
    case 'free': return '자유게시판';
    case 'notice': return '공지사항';
    case 'education': return '교육학부';
    case 'economics': return '경제학부';
    case 'business': return '경영학부';
    case 'es1': return '기계・재료・해양';
    case 'es2': return '화학・생명';
    case 'es3': return '수・물전자정보';
    case 'us1': return '도시사회공생';
    case 'us2': return '건축학과';
    case 'us3': return '도시기반';
    case 'us4': return '환경리스크공생';
    case 'graduate': return '대학원';
    default: return '기타';
  }
};



export default MyPage;
