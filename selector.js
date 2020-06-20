class FreeCodeCampPage {
  constructor(page) {
    this.page = page;
  }

  async getDescription() {
    return await this.page.evaluate(() => {
      return document.getElementById('description').innerText;
    })
  }

  async getTests() {
    return await this.page.evaluate(() => {
      const testSuiteNodeList = document.getElementsByClassName('test-output');
      return Array.from(testSuiteNodeList).map(elem => elem.innerText);
    })
  }

  async getFunctionNameDescription() {
    return await this.page.evaluate(() => {
      const functionNameText = Array.from(document.getElementsByClassName('view-line'))[1].innerText;

      return {
        fnNameWithArgs: functionNameText.substring(0, functionNameText.indexOf(')') + 1),
        fnName: functionNameText.substring(0, functionNameText.indexOf('(')),
      };
    });
  }
}

module.exports = FreeCodeCampPage;