/*
  打开网页 截图保存
  node src/demo01.js
*/

const puppeteer = require('puppeteer')

const pathToExtension = require('path').join(__dirname, '../chrome/chrome-win/chrome.exe')

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

const A = async () => {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')
  await page.screenshot({path: 'test/demo01.png'})

  await browser.close();
}

A()