import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Es3BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/major/Engineering/posts/es3?page=${currentPage}&limit=10`);
      setPosts(res.data.posts || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    };
    fetchPosts();
  }, [currentPage]);

  const handleWrite = () => {
    navigate('/board/major/es3/write');
  };

  const goToPage = (page) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/major/Engineering/posts/es3?page=${page}&limit=10`)
      .then(res => {
        setPosts(res.data.posts || []);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>💻 수・물 전자정보학과 게시판</h2>
        <button onClick={handleWrite} style={styles.writeButton}>글쓰기</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>제목</th>
            <th style={styles.th}>작성자</th>
            <th style={styles.th}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map(post => (
              <tr key={post._id}>
                <td style={styles.td}>
                  <Link to={`/board/major/es3/${post._id}`} style={styles.link}>
                    {post.title}
                  </Link>
                </td>
                <td style={styles.td}>{post.author?.nickname || '익명'}</td>
                <td style={styles.td}>{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.noPost}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {Number.isInteger(totalPages) && totalPages > 0 && Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              padding: '6px 10px',
              margin: '0 5px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: { padding: '30px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  writeButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '10px',
  },
  noPost: {
    textAlign: 'center',
    padding: '20px',
    color: '#999',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: '500',
  },
};

export default Es3BoardPage;
