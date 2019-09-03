// 自动登录掘金并获取cookie

const puppeteer = require('puppeteer');
const timeout = require('../util/index');

;(async function () {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto('https://juejin.im');

  const login = await page.$('.login');
  await login.click();

  await page.type('[name=loginPhoneOrEmail]', 'your phone or email', {delay: 20});
  await page.type('[name=loginPassword]', 'your password', {delay: 20});

  const authLogin = await page.$('.panel .btn');
  await authLogin.click();

  const cookie = await page.evaluate(() => {
    return document.cookie;
  });

  console.log(cookie);

  page.close();
  browser.close();

})();

