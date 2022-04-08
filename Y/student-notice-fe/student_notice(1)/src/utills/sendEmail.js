const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/user');

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      // service: process.env.SERVICE,
      // port: 587,
      // secure: true,
      service: 'gmail',
      auth: {
        user:'smithschooluk@gmail.com',
        pass: 'smith12!',
      },
    });

    await transporter.sendMail({
      from: 'smithschooluk@gmail.com',
      to: email,
      subject: subject,
      html: html,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendEmail;
