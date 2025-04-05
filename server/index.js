const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);

const noticeRoutes = require('./routes/notice');
app.use('/api/notice', noticeRoutes);

const educationRoutes = require('./routes/major/education');
app.use('/api/major/posts/education', educationRoutes);

const economicsRoutes = require('./routes/major/economics');
app.use('/api/major/posts/economics', economicsRoutes);

const businessRoutes = require('./routes/major/business');
app.use('/api/major/posts/business', businessRoutes);

const es1Routes = require('./routes/major/Engineering/Es1');
app.use('/api/major/Engineering/posts/es1', es1Routes);

const es2Routes = require('./routes/major/Engineering/Es2');
app.use('/api/major/Engineering/posts/es2', es2Routes);

const es3Routes = require('./routes/major/Engineering/Es3');
app.use('/api/major/Engineering/posts/es3', es3Routes);

const us1Routes = require('./routes/major/Urban/Us1');
app.use('/api/major/Urban/posts/us1', us1Routes);

const us2Routes = require('./routes/major/Urban/Us2');
app.use('/api/major/Urban/posts/us2', us2Routes);

const us3Routes = require('./routes/major/Urban/Us3');
app.use('/api/major/Urban/posts/us3', us3Routes);

const us4Routes = require('./routes/major/Urban/Us4');
app.use('/api/major/Urban/posts/us4', us4Routes);

const graduateRoutes = require('./routes/major/graduate');
app.use('/api/major/posts/graduate', graduateRoutes);

// DB 연결
const connectDB = require('./db');
connectDB();

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
