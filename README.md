<h1 align="center">爱拓工具箱</h1>

<div align="center">

[![Stars](https://img.shields.io/github/stars/iLay1678/i-tools?style=flat)](https://github.com/iLay1678/i-tools)
![badge](https://cnb.cool/ilay1678/i-tools/-/badge/git/latest/ci/status/tag_push)

</div>



## 功能列表
1. **阿里云盘TV授权**
   - 获取阿里云盘TV端的授权令牌
2. **挪车码牌生成**
   - 生成挪车码牌，方便他人联系车主
3. **二维码生成**
   - 生成自定义二维码
4. **JSON格式化工具**
   - JSON处理工具，支持格式化、压缩、验证和统计分析
5. **敬请期待**
   - 更多工具正在开发中...

# 部署

## vercel部署
[<img src="https://vercel.com/button" alt="Deploy on vercel" height="30">](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FiLay1678%2Fi-tools&&project-name=i-tools&repository-name=i-tools)

## Docker部署
```
docker run --name=i-tools -d -p 3000:3000 ghcr.io/ilay1678/i-tools:latest 
```
国内机器推荐使用cnb镜像
```
docker run --name=i-tools -d -p 3000:3000 docker.cnb.cool/ilay1678/i-tools:latest 
```


## Cloudflare Pages 部署
### 1. Fork 项目仓库
1. 点击右上角的 "Fork" 按钮创建你自己的副本
### 2. 在 Cloudflare 中部署
#### 2.1 前置准备
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 在左侧菜单找到并点击 "Pages"
3. 点击 "连接到 Git" 按钮
4. 按提示关联你的 GitHub 账号
#### 2.2 创建项目
1. 选择你刚才 fork 的仓库
2. 点击 "开始设置"
3. 在项目配置页面:
   - 框架预设: 选择 `Next.js`
   - 绑定-兼容性标识 nodejs_compat
   - 点击 "保存并部署"

## Stargazers over time
[![Stargazers over time](https://starchart.cc/iLay1678/i-tools.svg?variant=adaptive)](https://starchart.cc/iLay1678/i-tools)