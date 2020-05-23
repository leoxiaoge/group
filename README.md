# group

**前序准备**

准备VS code，微信开发者工具

**git命令**

```
git pull
git add ./
git commit -m "commit"
git push -u origin master
```

**组织结构**

下面是整个项目的组织结构。

```
┌─components            存放小程序组件的目录，详见
│  └─logo               可复用的组件
├─config                存放业务服务器API地址，详见
│  └─api.js             服务器API文件，详见
├─lib                   存放第三方库目录，详见
│  ├─vant-weapp         第三方库组件目录，详见
│  └─wxParse            第三方库富文本目录，详见
├─pages                 业务页面文件存放的目录（待开发）
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，详见
│  └─images             静态资源images文件，详见
├─utils                 存放公用js的目录，详见
├─.gitignore            git管理文件，详见
├─app.js                初始化入口文件，应用配置，用来配置App全局样式以及监听 应用生命周期
├─app.json              配置页面路由、导航条、选项卡等页面类信息，详见
├─app.wxss              公有样式文件
├─project.config.json   项目配置文件，配置应用名称、appid、版本等打包信息，详见
└─sitemap.json          sitemap 配置，详见
```
