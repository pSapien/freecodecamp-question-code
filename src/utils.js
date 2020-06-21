const inquirer = require('inquirer');

async function askQuestions() {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter the FreeCodeCamp question url: ',
    },
    {
      type: 'input',
      name: 'questionNumber',
      message: 'Enter the question number: ',
    }
  ]);
}

const LINE_BREAK = '\n';
const SPACE = ' ';

function createDescription(url, description) {
  const startingComments = '/**';
  const endingComments = '*/';

  return startingComments
    + LINE_BREAK
    + SPACE
    + `@url ${url}`
    + LINE_BREAK
    + SPACE
    + description
    + LINE_BREAK
    + endingComments;
}

function createFileName(questionNumber, fnBody) {
  const functionName = fnBody.substring(0, fnBody.indexOf('(')).replace('function', '').trim();
  return `${questionNumber}.${functionName}.js`;
}

function createFunctionBodyContent(fnBody) {
  return fnBody.substring(0, fnBody.indexOf('{')).trim()
    + ' {'
    + LINE_BREAK
    + LINE_BREAK
    + '}';
}

function createConsoleLog(test) {
  const functionName = test.substr(0, test.indexOf(')') + 1);
  const testCaseResult = test
    .split(' ')
    .slice(-1)[0]
    .replace('.', '');

  return `console.log(${functionName}) // ${testCaseResult}`
}


function createConsoleLogsContent(tests) {
  return tests.map(createConsoleLog).join(LINE_BREAK);
}

function createCodeContent(url, codeContentInfo) {
  return createDescription(url, codeContentInfo.description)
    + LINE_BREAK
    + createFunctionBodyContent(codeContentInfo.fnBody)
    + LINE_BREAK
    + LINE_BREAK
    + createConsoleLogsContent(codeContentInfo.tests);
}

module.exports = {
  askQuestions,
  createCodeContent,
  createFileName,
}