# 使用官方的 Node.js 镜像作为基础镜像
FROM node:22.12.0-alpine3.20

# 设置工作目录
WORKDIR /app

# 复制 Nuxt 构建产物到工作目录
COPY .next/standalone ./
COPY .next/static ./.next/static

# 暴露应用运行的端口（假设应用运行在 3000 端口）
EXPOSE 3000

# 启动 Next 应用
CMD ["node", "server.js"]