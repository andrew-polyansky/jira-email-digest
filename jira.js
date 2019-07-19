'use strict';

const JiraApi = require('jira-client');
const _ = require('lodash');


const { JIRA_HOST } = process.env;

const jira = new JiraApi({
  protocol: 'https',
  host: JIRA_HOST,
  username: process.env.JIRA_LOGIN,
  password: process.env.JIRA_API_KEY,
  apiVersion: '3',
  strictSSL: true,
});

const QUERY = process.env.JQL_QUERY;
const GROUP_BY = process.env.GROUP_BY || 'assignee';
const GROUP_BY_VIEW = process.env.GROUP_BY_VIEW || 'Assignee';
const FIELDS = [GROUP_BY, 'versions', 'status', 'labels', 'fixVersions', 'components', 'issuetype', 'project', 'summary'];


function toDto(issue) {
  return {
    groupedBy: {
      name: _.get(issue, `fields.${GROUP_BY}.displayName`),
      login: _.get(issue, `fields.${GROUP_BY}.name`),
    },
    fixVersions: _.map(_.get(issue, 'fields.fixVersions'), 'name'),
    affectedVersions: _.map(_.get(issue, 'fields.versions'), 'name'),
    stauts: _.get(issue, 'fields.status.name'),
    title: _.get(issue, 'fields.summary'),
    id: _.get(issue, 'key'),
    url: `https://${JIRA_HOST}/browse/${_.get(issue, 'key')}`,
  };
}

function sortByIssuesCount(a, b) {
  const [aFirst] = a;
  if (!_.get(aFirst, 'groupedBy.name')) {
    return 1;
  }
  return b.length - a.length;
}


async function getHeroes() {
  const { issues } = await jira.searchJira(QUERY, { fields: FIELDS });

  const formatedIssues = issues.map(toDto);

  const issuesGroupedByDevepopers = _(formatedIssues)
    .groupBy('groupedBy.login')
    .values()
    .sort(sortByIssuesCount)
    .map(issuesToMap => ({
      name: _.first(issuesToMap).groupedBy.name || `Orphan Issues. To find a parent you need to specify "${GROUP_BY_VIEW}" field`,
      issues: issuesToMap,
    }))
    .value();


  return issuesGroupedByDevepopers;
}

module.exports = {
  getHeroes,
};
