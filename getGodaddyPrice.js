const { By, until } = require("selenium-webdriver");
const getDriver = require("./getDriver");

module.exports = async (domain) => {
  let response = [];
  let url = `https://in.godaddy.com/domainsearch/find?domainToCheck=${domain}`;
  let resultWrapper = '.spin-results-wrap > div[data-cy="domain-name"]';
  let resultBox = ".spin-results-wrap > .domain-result";
  let driver = getDriver();
  await driver.get(url);
  await driver.wait(until.elementLocated(By.css(resultWrapper)), 10000);
  let results = await driver.findElements(By.css(resultBox));
  for (let result of results) {
    response.push({
      name: await result.findElement(By.css(".domain-name .h4")).getText(),
      price: await result.findElement(By.css(".dpp-price")).getText(),
    });
  }
  await driver.quit();
  return { total: results.length, response };
};
