// 打开网页 创建pdf

const puppeteer = require('puppeteer');
const pathToExtension = require('path').join(__dirname, '../chrome/chrome-win/chrome.exe')

const options = { 
  headless: false, // 是否无界面
  executablePath: pathToExtension
}

const B = async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
}

B()