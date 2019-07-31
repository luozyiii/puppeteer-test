/* 
  爬取SPA生成预渲染页面

  1.安装koa
  yarn add koa
  
  babel-node src/demo05.js

  eg: 运行后 请求  http://127.0.0.1:3000/index.html

*/

const puppeteer = require('puppeteer');
const Koa = require('koa')
const app = new Koa()

import {
  EXECUTABLEPATH_WIN,
} from './config'

const pathToExtension = require('path').join(__dirname, EXECUTABLEPATH_WIN)

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

async function getSpaContent(ctx, next) {
  if(/\.html/.test(ctx.request.url)){
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(`http://www.baidu.com${ctx.request.url}`)
    console.log(`visiting http://www.baidu.com${ctx.request.url}`)

    await page.content().then((v)=>{ //此处返回的是promise  简单地获取即可
        ctx.body = v;
    })
    await browser.close();
  }else{
    ctx.body = {};
  }
  await next();
}

app.use(getSpaContent);
let len = process.argv.length;
let port = `3000`;
for(let i =0;i<len-1;i++){
    if(process.argv[i]==='--port' && i!==len-1){
        port = process.argv[i+1];
    }
}
app.listen(port,()=>{
    console.log(`listening  in port with ${port}`);
})
