const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox","--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    isMobile: true,
    width: 375,
    height: 667,
    deviceScaleFactor: 1,
    hasTouch: true,
    isLandscape: true
  });
  await page.goto('https://m.baidu.com', {waitUntil: 'networkidle0'});
  await page.screenshot({path: '../m.baidu.com.png'});

  await browser.close();
})();