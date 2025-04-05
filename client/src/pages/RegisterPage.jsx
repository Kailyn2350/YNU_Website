import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const [nickname, setNickname] = useState('');


  // ✅ 아이디 중복 확인
  const checkUsername = async () => {
    if (!username) {
      setErrorMsg('아이디를 입력하세요.');
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/check-username`, { username });
      if (res.data.available) {
        alert('사용 가능한 아이디입니다.');
        setIsUsernameChecked(true);
        setErrorMsg('');
      } else {
        setErrorMsg('이미 존재하는 아이디입니다.');
      }
    } catch {
      setErrorMsg('중복 확인 실패');
    }
  };

  // ✅ 회원가입 처리
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !email) {
      setErrorMsg('모든 항목을 입력하세요.');
      return;
    }
    if (!isUsernameChecked) {
      setErrorMsg('아이디 중복 확인을 먼저 해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isEmailVerified) {
      setErrorMsg('이메일 인증을 완료해주세요.');
      return;
    }
    
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, {
        username,
        password,
        email,
        nickname,
      });
      alert('회원가입 성공! 로그인하세요.');
      navigate('/login');
    } catch {
      setErrorMsg('회원가입 실패: 서버 오류');
    }
  };

  // ✅ 이메일 인증 코드 전송
  const sendVerificationCode = async () => {
    if (!email) {
      setErrorMsg('이메일을 입력하세요.');
      return;
    }
  
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/check-email`, { email });
  
      // ✅ 통과된 경우만 인증 코드 전송
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/send-verification`, { email });
      alert('인증 코드가 전송되었습니다.');
      setErrorMsg('');
    } catch (err) {
      if (err.response?.status === 400) {
        // 💡 이건 오류가 아님. 사용자에게 피드백만 주면 돼.
        setErrorMsg(err.response.data.message);
      } else {
        console.error('서버 오류:', err);
        setErrorMsg('서버 오류로 이메일 확인 실패');
      }
    }
  };  

  // ✅ 인증 코드 확인
  const verifyCode = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/verify-code`, {
        email,
        code: verificationCode,
      });
      if (res.data.message === '이메일 인증 완료') {
        setIsEmailVerified(true);
        alert('이메일 인증 완료!');
      } else {
        setErrorMsg('인증 코드가 올바르지 않습니다.');
      }
    } catch {
      setErrorMsg('이메일 인증 실패');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>회원가입</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          {/* 아이디 */}
          <div style={styles.inline}>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setIsUsernameChecked(false); // 입력 바뀌면 다시 확인 필요
              }}
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              type="button"
              onClick={checkUsername}
              style={{ ...styles.button, marginLeft: '10px', backgroundColor: '#17a2b8' }}
            >
              중복 확인
            </button>
          </div>
          {/* 닉네임 */}
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={styles.input}
          />
          {/* 비밀번호 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {/* 비밀번호 확인 */}
          <input
            type="password"
            placeholder="비밀번호 재확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              ...styles.input,
              borderColor: confirmPassword && password !== confirmPassword ? 'red' : '#ccc',
            }}
          />
          {confirmPassword && password !== confirmPassword && (
            <p style={styles.error}>비밀번호가 일치하지 않습니다.</p>
          )}

  {/* 나머지 이메일 인증 등 */}
          {/* 이메일 */}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button
            type="button"
            onClick={sendVerificationCode}
            style={{ ...styles.button, backgroundColor: '#28a745' }}
          >
            인증 코드 전송
          </button>

          {/* 인증 코드 입력 */}
          <input
            type="text"
            placeholder="인증 코드 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            style={styles.input}
          />
          <button
            type="button"
            onClick={verifyCode}
            style={{ ...styles.button, backgroundColor: '#6c63ff' }}
          >
            인증 확인
          </button>

          {/* 가입 */}
          <button type="submit" style={styles.button}>
            가입하기
          </button>
          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        </form>

        <p style={styles.sub}>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" style={styles.link}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
  },
  box: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
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
  inline: {
    display: 'flex',
    alignItems: 'center',
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

export default RegisterPage;
