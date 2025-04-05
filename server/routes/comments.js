// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// 댓글 작성
router.post('/:postId', auth, async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      author: req.user.id,
    });
    await comment.save();
    res.json({ message: '댓글 작성 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '댓글 등록 실패' });
  }
});

// 댓글 목록 가져오기
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('author', 'nickname');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '댓글 불러오기 실패' });
  }
});

// 댓글 삭제
router.delete('/:commentId', auth, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) return res.status(404).json({ message: '댓글 없음' });
  
      // 본인만 삭제 가능
      if (comment.author.toString() !== req.user.id) {
        return res.status(403).json({ message: '권한 없음' });
      }
  
      await comment.deleteOne();
      res.json({ message: '삭제 완료' });
    } catch (err) {
      res.status(500).json({ message: '삭제 실패' });
    }
  });
  

module.exports = router;
