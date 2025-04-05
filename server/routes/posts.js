// routes/posts.js

const express = require('express');
const router = express.Router(); // ✅ 이거 필수
const Post = require('../models/Post');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const post = new Post({
      title,
      content,
      category,
      author: req.user.id,
    });

    await post.save();
    res.json({ message: '글 등록 완료' });
  } catch (err) {
    console.error('[글 등록 오류]', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const total = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'nickname');

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: '글 목록 불러오기 실패' });
  }
});

  // 자유게시판(category: 'free') 글만 가져오기
  router.get('/free', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const total = await Post.countDocuments({ category: 'free' });
      const posts = await Post.find({ category: 'free' })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author', 'nickname');
  
      res.json({
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      });
    } catch (err) {
      res.status(500).json({ message: '자유게시판 불러오기 실패' });
    }
  });
  
  // 내 글 목록 조회
router.get('/my', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
    .sort({ createdAt: -1 })
    .select('title reatedAt category');
    res.json(posts);
  } catch {
    res.status(500).json({ message: '내 글 불러오기 실패' });
  }
});

// 글 삭제
router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    res.json({ message: '삭제 완료' });
  } catch {
    res.status(500).json({ message: '삭제 실패' });
  }
});
  
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'nickname');
    if (!post) return res.status(404).json({ message: '게시글 없음' });
    res.json(post);
  } catch (err) {
    console.error('[상세 글 오류]', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 글 수정
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const updated = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, content },
      { new: true }
    );

    if (!updated) return res.status(403).json({ message: '수정 권한 없음' });

    res.json({ message: '수정 완료' });
  } catch {
    res.status(500).json({ message: '수정 실패' });
  }
});

  

module.exports = router;
