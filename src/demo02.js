/*
  打开网页 创建pdf
  node src/demo02.js
*/

const puppeteer = require('puppeteer');
const pathToExtension = require('path').join(__dirname, '../chrome/chrome-win/chrome.exe')

const options = { 
  // headless: false, // 默认无头模式， false显示浏览器 下载pdf不能设置false
  executablePath: pathToExtension
}

const B = async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'test/demo02.pdf', format: 'A4'});

  await browser.close();
}

B()