/*
  import 语法支持
*/

import {
  EXECUTABLEPATH_WIN,
} from '@/config'

const puppeteer = require('puppeteer')

const pathToExtension = require('path').join(__dirname, EXECUTABLEPATH_WIN)

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

const A = async () => {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')
  await page.screenshot({path: 'test/example.png'})

  await browser.close();
}

A()