# alvin-next 公开 CMS 站 — 设计

**日期**：2026-06-06
**状态**：设计中（待用户审阅）

## 目标

把 `alvin-next`（一个 `create-next-app` 起的 Next.js 16 骨架）改造成调用 `youlai-nest` 后端的**公开 CMS 展示站**。能展示已发布页面、构建一个最简可访问的前端，作为后续迭代（接 Puck、接鉴权、加管理）的起点。

## 范围

**做：**

- 一个公开访问的 Next.js App Router 站点
- 根路径 `/` 展示已发布页面的导航列表
- 任意深度的内容路径（catch-all）展示对应 slug 的页面
- 与后端的两个端点对接：`GET /api/v1/pages/nav` 与 `GET /api/v1/pages/slug/{slug}`
- 错误/加载/404 的最小可用处理
- 启动配置（环境变量）

**不做（明确划出去）：**

- Puck 真实渲染（先用 `<pre>` dump JSON）
- `next/image` 远端域名白名单
- ISR / `generateStaticParams` / 任何缓存层
- 鉴权 / 中间件 / 路由守卫
- 单元测试、e2e 测试
- CI、部署脚本
- ESLint / Prettier / tsconfig 配置变更
- 后端改造

## 架构

### 路由

- `app/page.tsx` — `/` 的入口，展示 nav 列表
- `app/[...slug]/page.tsx` — **required** catch-all，匹配除 `/` 之外的所有路径
- `app/loading.tsx`、`app/[...slug]/loading.tsx` — 各自段位的流式骨架
- `app/not-found.tsx`、`app/[...slug]/not-found.tsx` — 各自段位的 404
- `app/error.tsx` — 全局 5xx / 网络错兜底

Next.js 路由匹配规则保证 `/` 优先走 `app/page.tsx`，其他 URL 走 `app/[...slug]/page.tsx`。

> **路由类型说明**：用 `[...slug]`（required catch-all）而不是 `[[...slug]]`（optional catch-all），是 Next.js 16.2.7 的硬约束——`app/page.tsx` 已经声明了根路径 `/`，如果再加一个 optional catch-all 也会匹配 `/`，两边 specificity 冲突，构建会报 "You cannot define a route with the same specificity as an optional catch-all route"。Required catch-all 不匹配 `/`，所以两者可以共存：根路径归 `app/page.tsx`，其余任意深度的子路径归 `app/[...slug]/page.tsx`。这也是 Next.js 文档推荐的 catch-all + 独立 home 的标准模式。

### 数据流

```
浏览器 GET / 或 /<slug...>
  → Next.js RSC (app/page.tsx | app/[...slug]/page.tsx)
    → lib/api.ts (getNavList | getPageBySlug)
      → fetch(NEXT_PUBLIC_API_BASE_URL + /api/v1/...)
        → youlai-nest 后端
  ← JSON
RSC 渲染：首页 = <NavList>；内容页 = <PageRenderer>
```

RSC 直接 fetch 在服务端执行，绕过浏览器 CORS。

### 文件结构

```
app/
  layout.tsx               # 已有，保留
  page.tsx                 # / — nav 列表
  loading.tsx              # / 的骨架
  not-found.tsx            # / 的 404
  error.tsx                # 全局 5xx 兜底
  [...slug]/
    page.tsx               # 内容页
    loading.tsx            # 内容页骨架
    not-found.tsx          # 内容页 404
lib/
  api.ts                   # 后端薄封装
  types.ts                 # PageDetail、PageNavItem
.env.local                 # NEXT_PUBLIC_API_BASE_URL（不入 git）
.env.example               # 入 git
README.md                  # 补一段说明
```

## 组件

### `lib/types.ts`

```ts
export type PageStatus = 0 | 1;

export type PageNavItem = {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  sort?: number;
};

export type PageDetail = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  coverImage?: string;
  content: string;         // Puck JSON 字符串
  templateCode?: string;
  sort?: number;
  status: PageStatus;
};
```

手写最小类型，先不引入 zod / openapi-typescript。

### `lib/api.ts`

```ts
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE) throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');

class ApiError extends Error {
  constructor(public status: number, msg: string, public path: string) {
    super(`${status} ${msg} (${path})`);
  }
}

async function http<T>(path: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new ApiError(res.status, res.statusText, path);
  return res.json() as Promise<T>;
}

export const getNavList = () => http<PageNavItem[]>('/api/v1/pages/nav');
export const getPageBySlug = (slug: string) =>
  http<PageDetail>(`/api/v1/pages/slug/${encodeURIComponent(slug)}`);
```

- 404 → 返回 `null`，由调用方决定 `notFound()`
- 5xx / 网络错 → 抛 `ApiError`，由最近 `error.tsx` 兜底
- `NEXT_PUBLIC_API_BASE_URL` 缺失 → 启动 fail-fast

### `app/page.tsx`（首页）

```tsx
import Link from 'next/link';
import { getNavList } from '@/lib/api';

export default async function HomePage() {
  const items = (await getNavList()) ?? [];
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">站点页面</h1>
      <p className="mt-2 text-zinc-600">所有已发布页面</p>
      {items.length === 0
        ? <p className="mt-8 text-zinc-500">暂无已发布页面</p>
        : <ul className="mt-8 space-y-3">
            {items.map((it) => (
              <li key={it.id}>
                <Link href={`/${it.slug}`} className="text-blue-600 hover:underline">
                  {it.title}
                </Link>
                {it.coverImage && (
                  <img src={it.coverImage} alt="" className="mt-2 max-w-xs rounded" />
                )}
              </li>
            ))}
          </ul>}
    </main>
  );
}
```

### `app/[...slug]/page.tsx`（内容页）

```tsx
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/api';

type Props = { params: Promise<{ slug: string[] }> };

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  if (!slugStr) notFound();

  const page = await getPageBySlug(slugStr);
  if (!page) notFound();

  let parsed: unknown = null;
  try { parsed = JSON.parse(page.content); } catch { /* 保留 null */ }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      {page.summary && <p className="mt-2 text-zinc-600">{page.summary}</p>}
      <article className="mt-8">
        {parsed
          ? <pre className="overflow-auto rounded bg-zinc-50 p-4 text-sm">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          : <p className="text-zinc-500">（无内容或内容格式异常）</p>}
      </article>
    </main>
  );
}
```

### `app/loading.tsx` 与 `app/[...slug]/loading.tsx`

```tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="h-8 w-1/3 animate-pulse rounded bg-zinc-200" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
    </div>
  );
}
```

### `app/not-found.tsx` 与 `app/[...slug]/not-found.tsx`

```tsx
import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="mt-2 text-zinc-600">页面不存在或未发布</p>
      <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">返回首页</Link>
    </main>
  );
}
```

### `app/error.tsx`（5xx / 网络错兜底）

```tsx
'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">出错了</h1>
      <p className="mt-2 text-zinc-600">后端请求失败，请稍后重试</p>
      <div className="mt-4 flex gap-4">
        <button onClick={() => unstable_retry()} className="text-blue-600 hover:underline">重试</button>
        <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
      </div>
    </main>
  );
}
```

`error.tsx` 必须是 Client Component（`'use client'`），这是 Next.js 约定。

## 关键设计决定

| 决定 | 选项 | 选了什么 | 理由 |
|---|---|---|---|
| 数据获取 | RSC fetch / Route Handler / 客户端 fetch | RSC fetch | 服务端跑，无 CORS，少一层 |
| 404 语义 | `notFound()` / `redirect` | `notFound()` | URL 没东西，语义最准 |
| 图片 | `next/image` / `<img>` | `<img>` | 后端图床域名未知，先不配 `remotePatterns` |
| 内容渲染 | Puck `<Render>` / `<pre>` dump | `<pre>` dump | 用户 Q4 选 C；后端 Puck JSON 实际形态未定，先验证数据流通 |
| 错误模型 | 调用方判 `null` / fetch 内 redirect | 调用方判 `null` | 行为可预测，与 Next.js 习惯一致 |
| 缓存 | `no-store` / `force-cache` / ISR | `no-store` | 内容是"已发布"——拿到最新即可，避免陈旧 |
| Catch-all 类型 | optional `[[...slug]]` / required `[...slug]` | required `[...slug]` | Next.js 16.2.7 拒绝 optional catch-all 与 `app/page.tsx` 共存（同 specificity 冲突）。Required catch-all 不匹配 `/`，根路径归 `app/page.tsx`，其余归 `app/[...slug]/page.tsx`。`params.slug` 因此是 `string[]`（非可选），代码更简洁。 |

## 环境与运行

### `.env.local`（不入 git）

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### `.env.example`（入 git）

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

> 注：本项目 `.gitignore` 起始用 `.env*`（过宽），会顺带忽略 `.env.example`。需要把规则收窄为 `.env*.local`（create-next-app 默认、Next.js 推荐写法），让 `.env.example` 能被正常 commit。

### README 增补

```md
## 后端依赖

复制 `.env.example` → `.env.local`，把 `NEXT_PUBLIC_API_BASE_URL` 改成你后端的实际地址。
```

### 启动检查

1. 后端 `youlai-nest` 在 `${NEXT_PUBLIC_API_BASE_URL}` 上跑着
2. 后端有至少一条 `status=1` 的页面数据
3. `pnpm install`
4. `pnpm dev` → 打开 `http://localhost:3000`

## 测试

本任务为脚手架性质，无业务逻辑可单测。验证方式：

- `pnpm dev` 启动后浏览器访问 `/`，看到 nav 列表
- 点列表项跳到 `/<slug>`，看到页面标题 + JSON dump
- 访问不存在的 slug（如 `/nope`），看到 404
- 故意停掉后端再访问，看到错误兜底页（或 dev 错误页）

## 后续（不属本任务，但留接口）

- Puck 真实渲染：装 `@measured/puck`，替换 `<pre>` 为 `<Render>`
- `next/image` 远端域名白名单
- ISR / `generateStaticParams`（内容稳定后再加）
- `generateMetadata`（动态 `<title>` / OG 图）
- 鉴权 / 管理后台（独立的 `app/admin/`）
