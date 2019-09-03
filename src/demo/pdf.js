const puppeteer = require('puppeteer');
const util = require('../util/index');

;(async function () {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  
  await page.goto('http://es6.ruanyifeng.com/#README', {waitUntil: 'networkidle0'});

  const aTags = await page.evaluate(() => {
    return [...document.querySelectorAll('ol li a')].map(a => {
      return {
        href: a.href.trim(),
        name: a.text
      }
    });
  });

  let aTag = aTags.shift();
  await page.pdf({
    path: `../es6-pdf/${aTag.name}.pdf`,
    format: 'A4'
  });
  page.close();

  while (aTag = aTags.shift()) {
    page = await browser.newPage();
    await page.goto(aTag.href, {waitUntil: 'networkidle0'});
    await util.timeout(2000);
    await page.pdf({path: `../es6-pdf/${aTag.name}.pdf`});
    page.close();
  }

  browser.close();
})();

  