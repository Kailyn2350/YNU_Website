const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: { type: String, enum: ['free', 'notice', 'education', 'economics', 'business', 'es1', 'es2', 'es3', 'us1', 'us2', 'us3', 'us4', 'graduate' ], default: 'free' }, // ✅ 반드시 default 확인
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
