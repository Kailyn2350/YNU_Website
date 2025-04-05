// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  nickname: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  isAdmin: { type: Boolean, default: false },  // ✅ 관리자 여부
});


module.exports = mongoose.model('User', userSchema);
