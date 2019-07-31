/*
表单提交 键盘输入
babel-node src/demo07.js
*/

const puppeteer = require('puppeteer');

import {
  EXECUTABLEPATH_WIN,
} from './config'

const pathToExtension = require('path').join(__dirname, EXECUTABLEPATH_WIN)

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

const A = async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({// 设置viewport尺寸
    width:1280,
    height:980
  })
  await page.goto('https://segmentfault.com/')
  
  await page.waitForSelector('#searchBox')
  await page.click('#searchBox')
  await page.type('#searchBox', 'hello' ,{delay:100})
  await page.click('.btn-link')
  await page.waitForSelector('.search-result')
  await page.waitFor(8000).then(async ()=>{
    await page.screenshot({
      path: 'test/demo07.png',// 拍个照
      fullPage: true
    })
  })
  await browser.close()
}

A()