const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = async(email, subject, text) => {
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }

    })
    await transporter.sendMail({
      from: '"yetty fashion institute" <saheedakinade222@gmail.com>',
      to: email,
      subject: subject,
      text: text
    })
    console.log('email sent successfully');
    
  } catch (error) {
    console.log(error, 'email not sent');
    
  }
}
module.exports = sendEmail;