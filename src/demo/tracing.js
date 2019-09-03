
const puppeteer = require('puppeteer');

;(async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.tracing.start({path: './trace.json'});
  await page.goto('http://www.baidu.com');
  await page.tracing.stop();

  page.close();
  browser.close();
})();