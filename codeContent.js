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

function deriveFunctionNameFromTest(test) {
  const tillFunctionEnding = test.indexOf(')') + 1;
  return test.substr(0, tillFunctionEnding);
}

function createConsoleLog(test) {
  const testCaseResult = test
    .split(' ')
    .slice(-1)[0]
    .replace('.', '');

  return `console.log(${deriveFunctionNameFromTest(test)}) // ${testCaseResult}`
}

function createConsoleLogs(tests) {
  return tests.map(createConsoleLog).join(LINE_BREAK);
}

function createFunctionName(fnNameWithArgs) {
  return 'function ' + fnNameWithArgs + ' {' + LINE_BREAK + LINE_BREAK + '}'
}

function createCodeContent(url, description, tests, fnNameWithArgs) {
  return createDescription(url, description) 
  + LINE_BREAK 
  + createFunctionName(fnNameWithArgs)
  + LINE_BREAK 
  + LINE_BREAK
  + createConsoleLogs(tests);
}

module.exports = createCodeContent;