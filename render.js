'use strict';

const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const marked = require('marked');

const template = fs.readFileSync(path.resolve(__dirname, 'template.mustache'), 'utf8');

function render(data) {
  const markdown = mustache.render(template, { heroes: data });
  const html = marked(markdown);

  return {
    html,
    text: markdown,
  };
}

module.exports = {
  render,
};
