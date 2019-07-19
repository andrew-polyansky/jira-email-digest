'use strict';

const Mailgun = require('mailgun-js');

const auth = {
  domain: process.env.MAILGUN_DOMAIN,
  apiKey: process.env.MAILGUN_API_KEY,
};

const mailgun = new Mailgun(auth);

async function send(data) {
  const info = await mailgun.messages()
    .send({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

  console.log(info);
}


module.exports = {
  send,
};
