'use strict';

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SFTP_USERNAME, // generated ethereal user
    pass: process.env.SFTP_PASSWORD, // generated ethereal password
  },
});

async function send(data) {
  const info = await transporter.sendMail({
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log(`Message sent: ${info.messageId}`);

  // Preview only available when sending through an Ethereal account
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}

module.exports = {
  send,
};
