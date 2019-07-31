/*
  在页面上执行脚本
*/

const puppeteer = require('puppeteer');
const pathToExtension = require('path').join(__dirname, '../chrome/chrome-win/chrome.exe')

const options = { 
  executablePath: pathToExtension
}

const C = async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');

  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
}

C()