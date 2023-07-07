# 使用 Node.js 作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 将整个项目复制到工作目录
COPY ./ ./

# 安装项目依赖
RUN npm install

RUN npm run build
# 暴露应用程序使用的端口（如果需要）
EXPOSE 3000

# 运行应用程序
CMD [ "npm", "start" ]
