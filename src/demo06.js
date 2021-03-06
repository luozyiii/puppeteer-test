/*
  网站爬取内容
  babel-node src/demo06.js
*/

const puppeteer = require('puppeteer');
const nextLink = `a[rel*="next"]`;
const ARTICLE_ITEM = `.repo-list-item`;
const TITLE_SELECTOR = `div > h3 > a`;
const STAR_SELECTOR = `div > .muted-link`;
const CONTENT_SELECTOR = `div > div > p`;
const mainLink = `https://github.com/search?p=1&q=javascript&type=Repositories&utf8=%E2%9C%93`;
const data = [];

import {
  EXECUTABLEPATH_WIN,
} from './config'

const pathToExtension = require('path').join(__dirname, EXECUTABLEPATH_WIN)

const options = { 
  headless: false, // 默认无头模式， false显示浏览器
  executablePath: pathToExtension // 运行绑定的 Chromium 版本
}

process.setMaxListeners(0);

const E = async() => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    let val = {};
    // 设置浏览器高度
    await page.setViewport({
        width:980,
        height:980
    })
    
    try {
        await page.goto(mainLink);
        val = await page.evaluate((nextLink) => {
            return document.querySelector(nextLink); //主要是审查页面元素  防止进入深渊进入死循环
        }, nextLink);

        while (val !== null && !!val) {
            await page.evaluate((ARTICLE_ITEM, TITLE_SELECTOR, STAR_SELECTOR, CONTENT_SELECTOR) => {
                function searchElement(parent = null) {
                    function getDataWithNull(element, attr, defaultValue) {
                        if ((element !== null) && (element instanceof HTMLElement)) {
                            return element[attr];
                        } else {
                            return defaultValue;
                        }
                    }
                    if (parent === null) {
                        parent = document;
                    }
                    return {
                        title: getDataWithNull(parent.querySelector(TITLE_SELECTOR), 'innerText', ''),
                        star: getDataWithNull(parent.querySelector(STAR_SELECTOR), 'innerText', ''),
                        content: getDataWithNull(parent.querySelector(CONTENT_SELECTOR), 'innerText', '')
                    }
                }
                return Array.from(document.querySelectorAll(ARTICLE_ITEM)).map((val) => {
                    return searchElement(val)
                })
            }, ARTICLE_ITEM, TITLE_SELECTOR, STAR_SELECTOR, CONTENT_SELECTOR).then((v) => {
                data.push(v);
                return v;
            })

            await page.click(nextLink)

            await page.waitForNavigation({timeout:500}).then(()=>{},async (a) => {
                val = await page.evaluate((nextLink) => {
                    return document.querySelector(nextLink);
                }, nextLink);
            })

            await page.screenshot({
                path: 'test/demo06.png',// 拍个照证明我们确实是因为调入深渊了
                fullPage: true
            })
        }

    } catch (e) {
        // 速度太快会进入深渊。这里只是演示所以直接点。
        console.log(`共爬取  ${data.length*10}`)
    } finally {
        await browser.close();
    }
}

E()