# Telegram群管理工具后台

*自动与 [v0.dev](https://v0.dev) 部署同步*

[![部署于 Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/myfjdthinks-projects/v0-telegram)
[![使用 v0 构建](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/qwNKHLIA2R5)

## 概述

此仓库将与您在 [v0.dev](https://v0.dev) 上部署的聊天保持同步。
您对已部署应用所做的任何更改都将自动从 [v0.dev](https://v0.dev) 推送到此仓库。

## 工作原理

1. 使用 [v0.dev](https://v0.dev) 创建和修改您的项目
2. 从 v0 界面部署您的聊天
3. 更改会自动推送到此仓库
4. Vercel 从此仓库部署最新版本

## 本地开发设置

### 1. 启动 MongoDB（Docker + replica set）

Prisma 需要 MongoDB replica set 环境。使用 Docker Compose 启动单节点 replica set：

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongo:
    image: mongo:6
    command: [ "mongod", "--replSet", "rs0", "--bind_ip_all" ]
    ports:
      - "27017:27017"
```

启动并初始化 replica set：

```bash
docker-compose up -d
docker exec -it telegram-group-manager-mongo-1 mongosh --eval "rs.initiate()"
```

### 2. 安装并配置 Prisma

安装依赖：
```bash
pnpm add prisma @prisma/client --save-dev
pnpx prisma init --datasource-provider mongodb
```

在 `.env` 中配置数据库连接：
```env
DATABASE_URL="mongodb://localhost:27017/telegram?replicaSet=rs0"
```

### 3. 生成 Prisma Client

定义好 schema 后执行：
```bash
pnpx prisma generate
```

### 4. 使用 Prisma

项目使用 `lib/prisma.ts` 创建持久连接：

```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
```

现在可以在 API 路由或 Server Components 中使用 Prisma 进行数据库操作了！

### 5. 开发流程

1. 确保 Docker 中的 MongoDB replica set 正常运行
2. `pnpm dev` 启动 Next.js 开发服务器
3. 访问 http://localhost:3000 开始开发
