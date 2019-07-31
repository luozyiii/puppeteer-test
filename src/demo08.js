/*
网站时间线追踪
babel-node src/demo08.js
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

const A = async ()=>{
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()

  await page.tracing.start({path: 'test/trace.json'}); // 保存在test文件夹
  await page.goto('https:/www.baidu.com');
  await page.tracing.stop()
  await page.close()
  await browser.close()
}

A()