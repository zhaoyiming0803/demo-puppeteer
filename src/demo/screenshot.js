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
  await page.goto('https://m.baidu.com/s?word=%E4%B8%8A%E6%B5%B7%E5%A4%A9%E6%B0%94&ts=6608761&t_kt=0&ie=utf-8&rsv_iqid=1799998419&rsv_t=a44fbcTasVKJh9gfYVtRReQ4qeI9v3BTlszeIkwBYY0DMlDcsNFS&sa=ib&rsv_pq=1799998419&rsv_sug4=5784&inputT=2938&ss=100000000001&tj=1', {waitUntil: 'networkidle0'});

  // const top = await page.$('.ms-weather-top');
  // await top.screenshot({
  //   path: 'top.png'
  // });

  // const bottom = await page.$('.ms-weather-days-chart-table-wrap');
  // await bottom.screenshot({
  //   path: 'bottom.png'
  // });

  await page.evaluate(() => {
    window.scrollBy(0, 146);
  });

  await page.screenshot({
    path: './weather.png',
    clip: {
      x: 0,
      y: 146,
      width: 375,
      height: 555
    }
  });
  await page.close();
  await browser.close();
})();