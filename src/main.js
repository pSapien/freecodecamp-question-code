const fs = require('fs');
const Ora = require('ora');
const puppeteer = require('puppeteer');

const utils = require('./utils');

// TODO: 
// 2. answers validation
// 3. fix description indentation.

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const { url, questionNumber } = await utils.askQuestions();
  const spinner = Ora('Opening FreeCodeCamp').start();
  await page.goto(url);

  try {
    const info = await page.evaluate(() => ({
      description: document.getElementById('description').innerText,
      tests: Array.from(document.getElementsByClassName('test-output')).map(elem => elem.textContent),
      fnBody: Array.from(document.getElementsByClassName('monaco-editor-background'))[0].textContent,
    }));

    fs.appendFile(utils.createFileName(questionNumber, info.fnBody), utils.createCodeContent(url, info), (err) => {
      if (err) throw err;
      spinner.succeed('File Saved');
    });
  } catch (err) {
    spinner.fail('Failed');
    console.log(err);
  } finally {
    await browser.close();
  }
}

module.exports = main;