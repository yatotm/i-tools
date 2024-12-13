
# vercel部署
[<img src="https://vercel.com/button" alt="Deploy on vercel" height="30">](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FiLay1678%2Fi-tools&&project-name=i-tools&repository-name=i-tools)


# Docker部署教程
## 直接部署
```
docker run --name=i-tools -d -p 3000:3000 ilay/i-tools:latest 
```
# Cloudflare Pages 部署教程
## 1. Fork 项目仓库
1. 点击右上角的 "Fork" 按钮创建你自己的副本
## 2. 在 Cloudflare 中部署
### 2.1 前置准备
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 在左侧菜单找到并点击 "Pages"
3. 点击 "连接到 Git" 按钮
4. 按提示关联你的 GitHub 账号
### 2.2 创建项目
1. 选择你刚才 fork 的仓库
2. 点击 "开始设置"
3. 在项目配置页面:
   - 框架预设: 选择 `Nuxt.js`
   - 点击 "保存并部署"
