const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/mail');
const auth = require('../middleware/auth');


// ✅ 아이디 중복 확인
router.post('/check-username', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  res.json({ available: !user });
});

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  const existing = await User.findOne({ email, username: { $nin: [null, ''] } });

  if (existing) {
    return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
  }

  res.json({ available: true });
});


// ✅ 이메일 인증코드 전송
router.post('/send-verification', async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        verificationCode: code,
        isVerified: false
      }
    },
    { upsert: true, new: true }
  );  
  await sendVerificationEmail(email, code);

  res.json({ message: '인증 코드 전송 완료' });
});

// ✅ 인증코드 확인
router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (user && user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = '';
    await user.save();
    return res.json({ message: '이메일 인증 완료' });
  }

  res.status(400).json({ message: '인증 실패' });
});

// ✅ 회원가입
router.post('/register', async (req, res) => {
  const { username, password, email, nickname } = req.body;

  // ✅ 이미 인증된 유저는 중복 방지
  // ✅ 이메일 중복 체크: 이미 등록(=username이 존재)된 사용자라면 막기
  const existing = await User.findOne({
    email,
    username: { $nin: [null, ''] },
  });
  
  // ✅ 이메일 인증이 된 유저만 진행 가능
  const user = await User.findOne({ email, isVerified: true });

  if (!user) {
    return res.status(400).json({ message: '이메일 인증이 필요합니다.' });
  }

  // ✅ username 중복 방지
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
  }

  // ✅ 등록
  user.username = username;
  user.password = await bcrypt.hash(password, 10);
  user.nickname = nickname;
  await user.save();

  res.json({ message: '회원가입 완료' });
});



// ✅ 로그인
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: '사용자 없음' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: '비밀번호 오류' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// ✅ 유저 정보 확인 (홈페이지에서 사용)
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰
  
    if (!token) return res.status(401).json({ message: '인증 토큰 없음' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password'); // 비번은 빼고 보내기
      if (!user) return res.status(404).json({ message: '사용자 없음' });
  
      res.json({ user });
    } catch (err) {
      res.status(401).json({ message: '유효하지 않은 토큰' });
    }
  });

  // 닉네임 수정
router.put('/me/nickname', auth, async (req, res) => {
  const { nickname } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.nickname = nickname;
    await user.save();
    res.json({ message: '닉네임 변경 완료' });
  } catch {
    res.status(500).json({ message: '닉네임 변경 실패' });
  }
});

// 회원 탈퇴
router.delete('/me', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: '탈퇴 완료' });
  } catch {
    res.status(500).json({ message: '탈퇴 실패' });
  }
});



module.exports = router;
