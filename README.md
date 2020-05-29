# group

## **前序准备**

准备VS code，微信开发者工具

## **git命令**

```
git pull
git add ./
git commit -m "commit"
git push -u origin master
```

## **组织结构**

下面是整个项目的组织结构。

```
┌─components            存放小程序组件的目录，详见
│  ├─navigationBar      顶部导航组件
│  └─suggestions        意见与反馈组件  
├─config                存放业务服务器API地址，详见
│  └─api.js             服务器API文件，详见
├─lib                   存放第三方库目录，详见
│  ├─vant-weapp         第三方库组件目录，详见
│  └─wxParse            第三方库富文本目录，详见
├─pages                 业务页面文件存放的目录（待开发）
│  ├─index              index页面
│  ├─home               首页分包文件
│  │  └─index           index页面
│  └─cneter             个人中心分包文件
│     └─index           index页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，详见
│  └─images             静态资源images文件，详见
├─utils                 存放公用js的目录，详见
├─.gitignore            git管理文件，详见
├─app.js                初始化入口文件，应用配置，用来配置App全局样式以及监听 应用生命周期
├─app.json              配置页面路由、导航条、选项卡等页面类信息，详见
├─app.wxss              公有样式文件
├─project.config.json   项目配置文件，配置应用名称、appid、版本等打包信息，详见
└─sitemap.json          sitemap 配置
```

## 代码规范

### 1.文件引用规范

JavaScript用例：

使用Common.JS规范，不推荐使用es6规范

```
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
```

## 2.API调用规范

使用Promise进行封装

简化ajax代码

```
let data = {}
util.request(api.GoodsList, data).then((res) => {
  console.log(res)
})
```

完整ajax代码

```
let data = {}
util.request(api.GoodsList, data).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
```

## 3.数组遍历

推荐使用

```
Array.map(item => {
  console.log(item)
}) 
```

或者使用

```
Array.forEach(item => {
  console.log(item)
})
```

不推荐使用

```
for(let i = 0; i < Array.length; i++) {
  console.log(i)
}
```


