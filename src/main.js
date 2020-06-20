const fs = require('fs');
const Ora = require('ora');
const puppeteer = require('puppeteer');

const utils = require('./utils');

// TODO: 
// 3. fix description indentation.

async function main() {
  const { url, questionNumber } = await utils.askQuestions();

  const spinner = Ora('Opening FreeCodeCamp').start();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const info = await page.evaluate(utils.questionInfoSelector);

  fs.appendFile(`${questionNumber}.${info.fnName}.js`, utils.createCodeContent(url, info), (err) => {
    if (err) throw err;
    spinner.succeed('File Saved');
  });

  await browser.close();
}

module.exports = main;