// 打开网页 截图保存
const puppeteer = require('puppeteer')

const pathToExtension = require('path').join(__dirname, '../chrome/chrome-win/chrome.exe') // chrome-mac/Chromium.app/Contents/MacOS/Chromium

const options = { 
  headless: false, // 是否无界面
  executablePath: pathToExtension
}

const A = async () => {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')
  await page.screenshot({path: 'example.png'})

  await browser.close();
}

A()