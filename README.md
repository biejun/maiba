# maiba
买吧 - 花光马云的3021亿 一个可以模拟首富花💰的游戏   
演示站点： https://maiba.fun   

## Install  
Install using NPM (npm install) or Yarn (yarn install)  

⚠️ ERROR: Failed to download Chromium r686378! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download  
打包时依赖了puppeteer模块，下载这个模块可能会出现上述错误，原因是国内的网络限制，解决方案是切换下载镜像源，如：  
npm config set PUPPETEER_DOWNLOAD_HOST=https://npm.taobao.org/mirrors  
相关Issue: [](https://github.com/puppeteer/puppeteer/issues/1597#issuecomment-351945645)

## Developing   
```
 npm run serve or yarn serve
```
## Deploy
```
 npm run build or yarn build
```

## How to play?   
Local use: run yarn serve command, browser visit http://localhost:8000/ to enter consumption   
Deploy the application: run the yarn build command to deploy the packaged static html to your application server, access it through the domain name, and enter the consumption  

本地使用：运行 yarn serve 命令，浏览器访问http://localhost:8000/进入消费   
部署应用：运行yarn build命令，将打包好的静态html部署到你的应用服务器上，通过域名访问，进入消费  

点击仓库可查看已购买的商品，还可以卖出和打印消费小票。
修改价格，可在 public/store/ 目录下修改商品价格。
