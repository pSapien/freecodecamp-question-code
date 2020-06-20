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

function deriveFunctionName(test) {
  return test.substr(0, test.indexOf(')') + 1);
} 

function questionInfoSelector() {
  const functionNameText = Array.from(document.getElementsByClassName('view-line'))[1].innerText

  return {
    description: document.getElementById('description').innerText,
    tests: Array.from(document.getElementsByClassName('test-output')).map(elem => elem.innerText),
    fnNameWithArgs: deriveFunctionName(functionNameText),
    fnName: functionNameText.substring(0, functionNameText.indexOf('(')),
  }
}


const LINE_BREAK = '\n';

function createDescription(url, description) {
  const startingComments = '/**';
  const endingComments = '*/';

  return `
  ${startingComments} 
  @url ${url}
  ${description}
  ${endingComments}
  `
}

function createConsoleLog(test) {
  const testCaseResult = test
    .split(' ')
    .slice(-1)[0]
    .replace('.', '');

  return `console.log(${deriveFunctionName(test)}) // ${testCaseResult}`
}

function createConsoleLogs(tests) {
  return tests.map(createConsoleLog).join(LINE_BREAK);
}

function createFunctionName(fnNameWithArgs) {
  return 'function ' + fnNameWithArgs + ' {' + LINE_BREAK + LINE_BREAK + '}'
}

function createCodeContent(url, codeContentInfo) {
  return createDescription(url, codeContentInfo.description) 
  + LINE_BREAK 
  + createFunctionName(codeContentInfo.fnNameWithArgs)
  + LINE_BREAK 
  + LINE_BREAK
  + createConsoleLogs(codeContentInfo.tests);
}

module.exports = {
  askQuestions,
  questionInfoSelector,
  createCodeContent,
}