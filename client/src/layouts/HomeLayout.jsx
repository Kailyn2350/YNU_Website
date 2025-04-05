import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeLayout = () => {
  const [user, setUser] = useState(null);
  const [isShowMajorBoard, setShowMajorBoard] = useState(false);
  const [showES, setShowES] = useState(false);
  const [showUS, setShowUS] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 헤더 */}
      <header style={{
        background: '#007bff',
        color: '#fff',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          YNU Every Time
        </Link>

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        )}

        {!isMobile && user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/mypage" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold' }}>
              {user.nickname}님
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 12px',
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* 사이드바 */}
        {(!isMobile || isMobileMenuOpen) && (
          <nav style={{
            width: isMobile ? '100%' : '200px',
            background: '#fff',
            padding: '20px',
            borderRight: isMobile ? 'none' : '1px solid #ccc'
          }}>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px' }}>
              <li style={{ marginBottom: '12px' }}><Link to="/board/notice">📌 공지사항</Link></li>
              <li style={{ marginBottom: '12px' }}><Link to="/board/free">📚 자유게시판</Link></li>
              <li
                onMouseEnter={() => !isMobile && setShowMajorBoard(true)}
                onMouseLeave={() => !isMobile && setShowMajorBoard(false)}
              >
                <div
                  onClick={() => isMobile && setShowMajorBoard(!isShowMajorBoard)}
                  style={{ padding: '4px 0px', cursor: 'pointer' }}
                >
                  🎓 전공게시판
                </div>

                {isShowMajorBoard && (
                  <ul style={{ paddingLeft: '20px', fontSize: '17px' }}>
                    <li style={{ marginBottom: '10px' }}><Link to="/board/major/education">교육학부</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/board/major/economics">경제학부</Link></li>
                    <li style={{ marginBottom: '10px' }}><Link to="/board/major/business">경영학부</Link></li>
                    <li onClick={() => setShowES(!showES)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      이공학부
                    </li>
                    {showES && (
                      <ul style={{ marginLeft: '10px' }}>
                        <li><Link to="/board/major/es1">기계・재료・해양</Link></li>
                        <li><Link to="/board/major/es2">화학・생명</Link></li>
                        <li><Link to="/board/major/es3">수・물전자정보</Link></li>
                      </ul>
                    )}
                    <li onClick={() => setShowUS(!showUS)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      도시과학부
                    </li>
                    {showUS && (
                      <ul style={{ marginLeft: '10px' }}>
                        <li><Link to="/board/major/us1">도시사회공생</Link></li>
                        <li><Link to="/board/major/us2">건축학과</Link></li>
                        <li><Link to="/board/major/us3">도시기반</Link></li>
                        <li><Link to="/board/major/us4">환경리스크공생</Link></li>
                      </ul>
                    )}
                    <li><Link to="/board/major/graduate">대학원</Link></li>
                  </ul>
                )}
              </li>

              {isMobile && user && (
                <>
                  <hr />
                  <li><Link to="/mypage">{user.nickname}님</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      style={{
                        marginTop: '10px',
                        padding: '6px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}

        {/* 본문 */}
        <main style={{ flex: 1, padding: '30px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
