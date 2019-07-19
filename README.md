# Jira email notification digest

By cron sends an email about tasks you would like to know about

Inspired by [Daily Hero](https://github.com/gdml/daily-hero)


Supports:

* Two transports: SFTP and Mailgun
* Custom JIRA Query
* Custome crone pattern


## Installation

The service requires a Docker, a free mailgun account or working SFTP server and JIRA account with [API Key](https://confluence.atlassian.com/cloud/api-tokens-938839638.html).

There is the ability to group issues by a custom field which is compatible in format with `assignee`. (Default: `assignee`);

```yaml
version: '3.6'

services:
  daily-hero:
    tty: true
    build:
      context: ./
      dockerfile: Dockerfile
    command: [ "npm", "run", "start" ]
    environment:
      TO: person@gmail.com
      FROM: JIRA <developers@company.com>
      TRANSPORT: SFTP
      SFTP_HOST: SFTP_HOST
      SFTP_USERNAME: USERNAM
      SFTP_PASSWORD: PASSWORD
      JIRA_API_KEY: KEY
      JIRA_LOGIN: JIRA_LOGIN
      JQL_QUERY: JQL_QUERY
      JIRA_HOST: JIRA_HOST
      GROUP_BY: customfield_11111
      GROUP_BY_VIEW: Developer

```
