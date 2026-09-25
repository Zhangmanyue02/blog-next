# blog-next

个人博客体系的 **对外前台**（Next.js），面向访客展示内容。

## 在整体中的位置

```
blog-admin (管理后台)  ──┐
                          ├──►  blog-nest  (/api/v1)  ──►  MySQL / Redis / OSS
blog-next  (博客前台)  ──┘
```

| 仓库 | 角色 | 与本项目关系 |
|------|------|----------------|
| [blog-nest](../blog-nest) | 后端 API | 本站通过 `NEXT_PUBLIC_API_BASE_URL` 调用其 `/api/v1`（文章、页面导航等） |
| [blog-admin](../blog-admin) | 内容管理后台 | 编辑/发布后，本站读取同一后端数据；Puck 字段需与后台配置兼容 |
| **blog-next** | 博客前台 | 本仓库 |

本仓库 **不直连数据库**，不负责写文章或用户管理；展示与路由由 Next.js 完成。

## 当前职责

- 博客文章列表 / 详情（只读公开接口）
- CMS 页面（按 slug / 导航拉取 Puck JSON 并渲染）
- 站点视觉与交互（含 Puck 区块、动效等）

管理端登录、发文、改密等能力在 `blog-admin` + `blog-nest`，不在本仓库。

## 本地协作约定

| 项 | 说明 |
|----|------|
| 默认端口 | Next.js 开发服通常为 `3000` |
| 后端地址 | `.env.local` 中 `NEXT_PUBLIC_API_BASE_URL`（示例：`http://localhost:8000`） |
| API 路径 | `${NEXT_PUBLIC_API_BASE_URL}/api/v1/...` |
| 依赖启动顺序 | 先起 `blog-nest`，再起本项目 |

## 相关文档

- 仓库根目录 [README.md](../README.md)
- 环境变量模板：`.env.example`
