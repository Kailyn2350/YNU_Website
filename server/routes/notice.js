const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const User = require('../models/User');

// 공지사항 조회
router.get('/', async (req, res) => {
  try {
    const notices = await Post.find({ category: 'notice' })
      .sort({ createdAt: -1 })
      .populate('author', 'nickname');
    res.json(notices);
  } catch {
    res.status(500).json({ message: '공지사항 불러오기 실패' });
  }
});


// 공지사항 작성
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) return res.status(403).json({ message: '관리자만 작성 가능' });

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      category: 'notice',
      author: user._id,
    });

    await post.save();
    res.json({ message: '공지사항 등록 완료' });
  } catch (err) {
    res.status(500).json({ message: '공지사항 등록 실패' });
  }
});

// 공지사항 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, category: 'notice' }).populate('author', 'nickname');
    if (!post) return res.status(404).json({ message: '공지사항 없음' });
    res.json(post);
  } catch {
    res.status(500).json({ message: '서버 에러' });
  }
});


module.exports = router;
