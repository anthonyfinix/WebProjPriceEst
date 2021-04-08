const path = require("path");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

module.exports = async (domain) => {
  let response = [];
  let url = `https://in.godaddy.com/domainsearch/find?domainToCheck=${domain}`;
  let os = process.platform;
  let chrome_path = path.join(__dirname, `./chromedriver_${os}.exe`);
  let service = new chrome.ServiceBuilder(chrome_path).build();
  chrome.setDefaultService(service);
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  await driver.get(url);
  await driver.wait(
    until.elementLocated(By.css(".spin-results-wrap > .domain-result")),
    10000
  );
  let results = await driver.findElements(
    By.css(".spin-results-wrap > .domain-result")
  );
  for (let result of results) {
    response.push({
    //   name: await result.findElement(By.css(".spin-results-wrap-domain-name")).getText(),
      price: await result.findElement(By.css(".dpp-price")).getText(),
    });
  }
  await driver.quit();
  return { total: results.length, response };
};
