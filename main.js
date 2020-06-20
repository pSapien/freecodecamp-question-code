const fs = require('fs');
const puppeteer = require('puppeteer');

const Loader = require('./spinner');
const askQuestions = require('./questions');
const FreeCodeCampPage = require('./selector');
const createCodeContent = require('./codeContent');

const deriveFunctionName = (test) => test.substring(0, test.indexOf('('));

// TODO: 
// 1. add a spinner. (use ola)
// 2. add : to the end of question.
// 3. fix descrption indentation.
// 4. fix function name arguments.

async function main() {
  const { url, questionNumber } = await askQuestions();

  const Spinner = new Loader();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  Spinner.fetchingChallengeDescription();
  const fromFreeCodeCamp = new FreeCodeCampPage(page);
  const description = await fromFreeCodeCamp.getDescription();
  const tests = await fromFreeCodeCamp.getTests();

  Spinner.creatingFile();
  const fileName = `${questionNumber}.${deriveFunctionName(tests[0])}.js`

  fs.appendFile(fileName, createCodeContent(url, description, tests), (err) => {
    if (err) throw err;
    Spinner.fileSaved();
  });

  await browser.close();
}

module.exports = main;