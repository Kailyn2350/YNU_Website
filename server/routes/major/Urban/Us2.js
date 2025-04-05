// routes/major/us2.js
const express = require('express');
const router = express.Router();
const Post = require('../../../models/Post');
const auth = require('../../../middleware/auth');

// [POST] 건축학과 글 등록
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      title,
      content,
      category: 'us2',
      author: req.user.id,
    });
    await post.save();
    res.json({ message: '글 등록 완료' });
  } catch (err) {
    console.error('[ 건축학과 글 등록 오류]', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// [GET] 목록 조회
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const total = await Post.countDocuments({ category: 'us2' });
    const posts = await Post.find({ category: 'us2' })
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
    console.error('[건축학과 글 목록 오류]', err);
    res.status(500).json({ message: '글 목록 불러오기 실패' });
  }
});

// [GET] 상세 보기
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      category: 'us2',
    }).populate('author', 'nickname');
    if (!post) return res.status(404).json({ message: '게시글 없음' });
    res.json(post);
  } catch (err) {
    console.error('[건축학과 상세 글 오류]', err);
    res.status(500).json({ message: '서버 에러' });
  }
});

module.exports = router;
