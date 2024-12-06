
# 使用官方的 Node.js 镜像作为基础镜像
FROM oven/bun:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）到工作目录
COPY package*.json ./

# 安装项目依赖
RUN bun install

# 复制项目文件到工作目录
COPY ./.output/* ./


# 暴露应用运行的端口（假设应用运行在 3000 端口）
EXPOSE 3000

# 启动应用
CMD ["bun","server/index.mjs"]