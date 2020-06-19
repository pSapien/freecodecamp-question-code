const fs = require('fs');
const puppeteer = require('puppeteer');

const askQuestions = require('./questions');
const FreeCodeCampPage = require('./selector');
const createCodeContent = require('./codeContent');

function deriveFunctionName(test) {
  const upUntillOpeningBrace = test.indexOf('(');
  return test.substring(0, upUntillOpeningBrace);
}

(async () => {
  const { url, questionNumber } = await askQuestions();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const fromFreeCodeCamp = new FreeCodeCampPage(page);
  const description = await fromFreeCodeCamp.getDescription();
  const tests = await fromFreeCodeCamp.getTests();

  const fileName = `${questionNumber}.${deriveFunctionName(tests[0])}.js`

  fs.appendFile(fileName, createCodeContent(url, description, tests), (err) => {
    if (err) throw err;
    console.log('File Saved');
  });

  await browser.close();
})();

