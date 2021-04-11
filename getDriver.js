const path = require('path');
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

module.exports = (driverPath, os) => {
  if (!os) os = process.platform;
  if (!driverPath) driverPath = process.env.$GOOGLE_CHROME_BIN || path.join(__dirname, `./chromedriver_${os}.exe`);
  let service = new chrome.ServiceBuilder(driverPath).build();
  chrome.setDefaultService(service);
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  return driver;
};
