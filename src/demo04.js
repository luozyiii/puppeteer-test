/*
  import 语法支持

  1.全局安装
  npm install babel-cli -g

  2.本地安装
  npm install babel-cli --save  or yarn add babel-cli

  3.安装babel-preset-es2015
  yarn add babel-preset-es2015

  4. 添加.babelrc 文件
  {
    "presets": [
      "es2015"
    ],
    "plugins": []
  }

  5.运行
  全局babel-cli: babel-node src/demo04.js
  本地babel-cli：在本地package.json 的scripts 添加命令 "babel": "babel-node src/demo04.js"; 然后执行npm run babel

*/

import {
  EXECUTABLEPATH_WIN,
} from './config'

const puppeteer = require('puppeteer')

const pathToExtension = require('path').join(__dirname, EXECUTABLEPATH_WIN)

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

const D = async () => {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')
  await page.screenshot({path: 'test/example.png'})

  await browser.close();
}

D()