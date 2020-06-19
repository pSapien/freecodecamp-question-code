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
}

module.exports = FreeCodeCampPage;