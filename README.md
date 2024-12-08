# 阿里云盘TV版token获取与刷新

## 路由:

- `/` 在线扫码
- `/refresh` 刷新令牌



# Docker部署教程
```
docker run --name=alipan-tv-token -d -p 3000:3000 ghcr.io/ilay1678/alipan-tv-token:latest 
```

# vercel部署
[<img src="https://vercel.com/button" alt="Deploy on vercel" height="30">](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FiLay1678%2Falipan-tv-token&&project-name=alipan-tv-token&repository-name=alipan-tv-token)

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