# puppeteer-test
puppeteer 是 Google Chrome 团队官方的无界面（Headless）Chrome 工具。正因为这个官方声明，许多业内自动化测试库都已经停止维护，包括 PhantomJS。Selenium IDE for Firefox 项目也因为缺乏维护者而终止。
puppetter可以生成页面的截图和PDF，抓取SSR，抓取网站内容，模拟登陆等。

版本要求：Puppeteer 要求使用 Node v6.4.0，但因为文中大量使用 async/await，需要 Node v7.6.0 或以上； 推荐使用yarn

### 1.初始化项目
```
mkdir puppeteer-test
cd puppeteer-test
yarn install
```

### 2.安装puppeteer
```
yarn add puppeter
```

安装时可能会出现以下报错
```
ERROR: Failed to download Chromium r588429! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
```
Chromium浏览器有58M左右，可能会出现安装失败的情况。（翻墙情况下基本不会出现）

解决方法一：忽略安装chromium,然后手动下载
```
yarn add puppeteer --ignore-scripts
```

解决方法二：官方建议设置环境变量 PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 忽略浏览器的下载
```
env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm i puppeteer -D
```

忽略了Chromium浏览器下载后，我们成功下载好了puppeteer。然后去找puppeteer安装包package.json中对应的chrome版本。
(puppeteer/package.json->puppeteer.chromium_revision，具体见lib/Downloader.js)
接着去官网手动下载Chromium文件
下载地址: https://npm.taobao.org/mirrors/chromium-browser-snapshots/

解决方法三: 代理puppeteer下载地址
```
vi .npmrc

type puppeteer_download_host = https://npm.taobao.org/mirrors

yarn add puppeteer -D
```

### 4.运行
```
node src/demo01.js
```


