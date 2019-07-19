'use strict';

const { CronJob } = require('cron');
const { getHeroes } = require('./jira');
const { render } = require('./render');

const TRANSPORT = process.env.TRANSPORT || 'SFTP';
const CRONE_PATTERN = process.env.CRONE_PETTERN || '00 49 9 * * 1-5';

const transportMap = {
  MAILGUN: 'mailgun',
  SFTP: 'nodemailer',
};

function getTransport() {
  const transportName = transportMap[TRANSPORT];

  if (!transportName) {
    throw new Error('Unknown Transtort');
  }

  // eslint-disable-next-line
  return require(`./${transportName}`);
}

const transport = getTransport();


async function sendMail() {
  const heroes = await getHeroes();

  if (heroes.length > 0) {
    const { text, html } = render(heroes);

    await transport.send({
      from: process.env.FROM,
      to: process.env.TO,
      subject: process.env.SUBJECT || 'Tasks closed yesterday',
      text,
      html,
    });
  }
}

// eslint-disable-next-line no-new
new CronJob(CRONE_PATTERN, (() => {
  sendMail();
}), null, true, 'Europe/Minsk');
