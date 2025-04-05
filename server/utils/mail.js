// utils/mail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.naver.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: '[YNU Every Time] 이메일 인증 코드',
    text: `당신의 인증 코드는 ${code}입니다.`,
  });
};

module.exports = {
  sendVerificationEmail,
};
