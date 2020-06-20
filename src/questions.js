const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Enter the url: ',
  },
  {
    type: 'input',
    name: 'questionNumber',
    message: 'Enter the question number: ',
  }
];

async function askQuestions() {
  return await inquirer.prompt(questions);
}

module.exports = askQuestions;