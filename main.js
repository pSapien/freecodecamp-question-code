const fs = require('fs');
const Ora = require('ora');
const puppeteer = require('puppeteer');

const askQuestions = require('./questions');
const FreeCodeCampPage = require('./selector');
const createCodeContent = require('./codeContent');

const deriveFunctionName = (test) => test.substring(0, test.indexOf('('));

// TODO: 
// 3. fix description indentation.

async function main() {
  const { url, questionNumber } = await askQuestions();

  const spinner = Ora('Opening FreeCodeCamp').start();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const fromFreeCodeCamp = new FreeCodeCampPage(page);
  const description = await fromFreeCodeCamp.getDescription();
  const tests = await fromFreeCodeCamp.getTests();
  const { fnNameWithArgs, fnName } = await fromFreeCodeCamp.getFunctionNameDescription();

  const fileName = `${questionNumber}.${fnName}.js`

  fs.appendFile(fileName, createCodeContent(url, description, tests, fnNameWithArgs), (err) => {
    if (err) throw err;
    spinner.succeed('File Saved');
  });

  await browser.close();
}

module.exports = main;