const { By, until } = require("selenium-webdriver");
const getDriver = require("./getDriver");

module.exports = async (domain) => {
  let response = [];
  let url = `https://www.hostinger.in/domain-checker`;
  let searchbar_path =
    ".dc-2020-header__input.white.w-100.pr-30.text-left.fw-400.hb.hb--h60-xxl.hb--h50.pl-30.border-radius-round.box-shadow.placeholder.text-h-dark.align-self-end.pr-60";
  let searchbar = ".hb.hb--danger.hb--h60-xxl.hb--255.hb--h50.w-100";
  let driver = getDriver();
  await driver.get(url);
  await driver.wait(until.elementLocated(By.css(searchbar_path)), 10000);
  let searchInput = await driver.findElement(By.css(searchbar_path));
  searchInput.sendKeys(domain);
  await driver.findElement(By.css(searchbar)).click();
  await driver.wait(until.elementLocated(By.css("#dc-results")), 10000);
  let resultDiv = await driver.findElement(By.css("#dc-results"));
  let resultBoxs = await resultDiv.findElements(By.css(".dc-result-box"));
  for (result of resultBoxs) {
    response.push({
      name: await getName(result),
      price: await getPrice(result),
    });
  }
  await driver.quit()
  return { total: response.length, result: response };
};

const getName = async (selElm) => {
  return await selElm.findElement(By.css(".word-break-bw")).getText();
};
const getPrice = async (selElm) => {
  return await selElm
    .findElement(By.css(".dc-result-box__old-new-prices .h4"))
    .getText();
};
