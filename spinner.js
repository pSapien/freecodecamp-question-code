const ora = require('ora');

class Spinner {
  constructor() {
    this.spinner = ora('Opening FreeCodeCamp').start();
  }

  fetchingChallengeDescription() {
    this.spinner.color = 'magenta';
    this.spinner.text = 'Fetching Question Information';
  }

  creatingFile() {
    this.spinner.color = 'cyan';
    this.spinner.text = 'Creating a file';
  }

  fileSaved() {
    this.spinner.color = 'green';
    this.spinner.succeed('File Saved');
  }
}

module.exports = Spinner;