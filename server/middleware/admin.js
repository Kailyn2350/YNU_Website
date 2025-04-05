const User = require('../models/User');

const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: '관리자만 접근 가능합니다.' });
  }
  next();
};

module.exports = adminOnly;
