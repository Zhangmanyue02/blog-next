# alvin-next 公开 CMS 站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `alvin-next`（一个 `create-next-app` 起的 Next.js 16 骨架）改造成对接 `youlai-nest` 的公开 CMS 展示站，根路径展示已发布页面 nav 列表，任意子路径按 slug 拉取并展示对应内容。

**Architecture:** Next.js 16 App Router，Server Component 直接 fetch 后端（无 Route Handler、无客户端数据获取）。Required catch-all `app/[...slug]/page.tsx` 兜住所有非 `/` 的路径；`/` 由 `app/page.tsx` 独立处理。后端 Puck JSON 先用 `<pre>` dump 展示。环境变量 `NEXT_PUBLIC_API_BASE_URL` 配置后端地址。

> **路由类型说明**：用 `[...slug]`（required catch-all）而不是 `[[...slug]]`（optional catch-all），是 Next.js 16.2.7 的硬约束——`app/page.tsx` 已经声明了根路径 `/`，optional catch-all 也会匹配 `/`，两边 specificity 冲突，构建会报 "You cannot define a route with the same specificity as an optional catch-all route"。Required catch-all 不匹配 `/`，根路径归 `app/page.tsx`，其余归 `app/[...slug]/page.tsx`，是 Next.js 文档推荐的标准模式。`params.slug` 因此是 `string[]`（非可选），代码更简洁。

**Tech Stack:** Next.js 16.2.7, React 19.2.4, TypeScript 5, Tailwind 4, pnpm

**Spec:** `docs/superpowers/specs/2026-06-06-alvin-cms-public-site-design.md`

---

## File Structure

| 路径 | 状态 | 责任 |
|---|---|---|
| `lib/types.ts` | 新建 | 后端响应类型（PageNavItem, PageDetail, PageStatus, ApiError） |
| `lib/api.ts` | 新建 | 后端薄封装（getNavList, getPageBySlug, http 内部函数） |
| `app/page.tsx` | **替换**（原是 create-next-app 样板） | `/` — nav 列表 |
| `app/loading.tsx` | 新建 | `/` 的流式骨架 |
| `app/not-found.tsx` | 新建 | `/` 的 404 |
| `app/error.tsx` | 新建 | 全局 5xx 兜底（必须 Client Component） |
| `app/[...slug]/page.tsx` | 新建 | 内容页（slug 解析 + fetch + JSON dump） |
| `app/[...slug]/loading.tsx` | 新建 | 内容页骨架 |
| `app/[...slug]/not-found.tsx` | 新建 | 内容页 404 |
| `.env.local` | 新建 | `NEXT_PUBLIC_API_BASE_URL`（不入 git） |
| `.env.example` | 新建 | 入 git，供团队参考 |
| `README.md` | **修改** | 补"后端依赖"段落 |
| `app/layout.tsx` | 不动 | 现有根布局 |

---

## Task 1: 创建 `lib/types.ts`

**Files:**
- Create: `lib/types.ts`

- [ ] **Step 1: 创建 `lib/types.ts`**

完整内容：

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
  content: string;
  templateCode?: string;
  sort?: number;
  status: PageStatus;
};
```

- [ ] **Step 2: 提交**

```bash
git add lib/types.ts
git commit -m "feat(types): add PageNavItem and PageDetail types"
```

---

## Task 2: 创建 `lib/api.ts` 后端薄封装

**Files:**
- Create: `lib/api.ts`

- [ ] **Step 1: 创建 `lib/api.ts`**

完整内容：

```ts
import type { PageDetail, PageNavItem } from './types';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public path: string,
  ) {
    super(`${status} ${statusText} (${path})`);
    this.name = 'ApiError';
  }
}

async function http<T>(path: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, path);
  }
  return (await res.json()) as T;
}

export function getNavList(): Promise<PageNavItem[] | null> {
  return http<PageNavItem[]>('/api/v1/pages/nav');
}

export function getPageBySlug(slug: string): Promise<PageDetail | null> {
  return http<PageDetail>(
    `/api/v1/pages/slug/${encodeURIComponent(slug)}`,
  );
}
```

- [ ] **Step 2: 验证 TypeScript 编译**

跑 `pnpm tsc --noEmit`（项目没单独 tsc 脚本；这条是手动核对）。

- [ ] **Step 3: 提交**

```bash
git add lib/api.ts
git commit -m "feat(api): add backend client with no-store fetch and 404 -> null"
```

---

## Task 3: 配置环境变量

**Files:**
- Create: `.env.local`
- Create: `.env.example`
- Verify: `.gitignore` 包含 `.env.local`

- [ ] **Step 1: 验证 `.gitignore` 包含 `.env.local`**

`cat .gitignore | grep -E '^\.env'`，预期至少包含 `.env*.local` 或 `.env.local`。

- [ ] **Step 2: 创建 `.env.local`**

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

- [ ] **Step 3: 创建 `.env.example`**

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

- [ ] **Step 4: 提交**

```bash
git add .env.example
git commit -m "chore(env): add NEXT_PUBLIC_API_BASE_URL example"
```

注意：`.env.local` 不入 commit，仅 `.env.example` 入。

---

## Task 4: 替换 `app/page.tsx`（首页 = nav 列表）

**Files:**
- Modify: `app/page.tsx`（删除 create-next-app 样板内容，整文件替换）

- [ ] **Step 1: 替换 `app/page.tsx`**

完整内容：

```tsx
import Link from 'next/link';
import { getNavList } from '@/lib/api';

export default async function HomePage() {
  const items = (await getNavList()) ?? [];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">站点页面</h1>
      <p className="mt-2 text-zinc-600">所有已发布页面</p>

      {items.length === 0 ? (
        <p className="mt-8 text-zinc-500">暂无已发布页面</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((it) => (
            <li key={it.id}>
              <Link
                href={`/${it.slug}`}
                className="text-blue-600 hover:underline"
              >
                {it.title}
              </Link>
              {it.coverImage && (
                <img
                  src={it.coverImage}
                  alt=""
                  className="mt-2 max-w-xs rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/page.tsx
git commit -m "feat(home): list published pages from /api/v1/pages/nav"
```

---

## Task 5: 创建 `app/loading.tsx`（首页骨架）

**Files:**
- Create: `app/loading.tsx`

- [ ] **Step 1: 创建 `app/loading.tsx`**

完整内容：

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

- [ ] **Step 2: 提交**

```bash
git add app/loading.tsx
git commit -m "feat(loading): add home route streaming skeleton"
```

---

## Task 6: 创建 `app/not-found.tsx`（首页 404）

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: 创建 `app/not-found.tsx`**

完整内容：

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="mt-2 text-zinc-600">页面不存在或未发布</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        返回首页
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/not-found.tsx
git commit -m "feat(not-found): add home route 404 page"
```

---

## Task 7: 创建 `app/error.tsx`（5xx 兜底）

**Files:**
- Create: `app/error.tsx`

- [ ] **Step 1: 创建 `app/error.tsx`**

完整内容：

```tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">出错了</h1>
      <p className="mt-2 text-zinc-600">后端请求失败，请稍后重试</p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => unstable_retry()}
          className="text-blue-600 hover:underline"
        >
          重试
        </button>
        <Link href="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/error.tsx
git commit -m "feat(error): add global 5xx fallback (client component)"
```

---

## Task 8: 创建 `app/[...slug]/page.tsx`（内容页）

**Files:**
- Create: `app/[...slug]/page.tsx`

- [ ] **Step 1: 创建 `app/[...slug]/page.tsx`**

完整内容：

```tsx
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  if (!slugStr) notFound();

  const page = await getPageBySlug(slugStr);
  if (!page) notFound();

  let parsed: unknown = null;
  try {
    parsed = JSON.parse(page.content);
  } catch {
    parsed = null;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{page.title}</h1>
      {page.summary && (
        <p className="mt-2 text-zinc-600">{page.summary}</p>
      )}
      <article className="mt-8">
        {parsed ? (
          <pre className="overflow-auto rounded bg-zinc-50 p-4 text-sm">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        ) : (
          <p className="text-zinc-500">（无内容或内容格式异常）</p>
        )}
      </article>
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add 'app/[...slug]/page.tsx'
git commit -m "feat(content): render any-depth slug page with Puck JSON dump"
```

---

## Task 9: 创建 `app/[...slug]/loading.tsx`（内容页骨架）

**Files:**
- Create: `app/[...slug]/loading.tsx`

- [ ] **Step 1: 创建 `app/[...slug]/loading.tsx`**

完整内容：

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

- [ ] **Step 2: 提交**

```bash
git add 'app/[...slug]/loading.tsx'
git commit -m "feat(loading): add content route streaming skeleton"
```

---

## Task 10: 创建 `app/[...slug]/not-found.tsx`（内容页 404）

**Files:**
- Create: `app/[...slug]/not-found.tsx`

- [ ] **Step 1: 创建 `app/[...slug]/not-found.tsx`**

完整内容：

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="mt-2 text-zinc-600">页面不存在或未发布</p>
      <Link
        href="/"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        返回首页
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add 'app/[...slug]/not-found.tsx'
git commit -m "feat(not-found): add content route 404 page"
```

---

## Task 11: 更新 README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 在 README.md 末尾追加"后端依赖"段落**

在 `## Deploy on Vercel` 段落**之前**插入：

```md
## 后端依赖

本前端默认调用 `${NEXT_PUBLIC_API_BASE_URL}/api/v1/...`。

复制 `.env.example` → `.env.local`，把 `NEXT_PUBLIC_API_BASE_URL` 改成你后端的实际地址。
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs(readme): document NEXT_PUBLIC_API_BASE_URL setup"
```

---

## Task 12: 端到端冒烟（手动）

不是 TDD 测试——本任务无业务逻辑可单测。这一步是工程师按 spec 的"验证方式"逐项跑通。

- [ ] **Step 1: 启动 dev server**

```bash
pnpm dev
```

预期：Next.js 启动，输出 `Ready on http://localhost:3000`。

- [ ] **Step 2: 验证后端可达**

```bash
curl -s http://localhost:3000/api/v1/pages/nav | head -50
```

预期：JSON 数组（结构由后端决定；本任务不假设字段）。

- [ ] **Step 3: 浏览器访问首页**

打开 `http://localhost:3000/`。预期：看到 nav 列表，标题"站点页面"，"所有已发布页面"副标题；后端有数据时列出所有页面，后端无数据时显示"暂无已发布页面"。

- [ ] **Step 4: 浏览器访问内容页**

在 nav 列表里点一项，跳到 `http://localhost:3000/<slug>`。预期：看到页面标题、`summary`（如有）、`<pre>` 格式化的 Puck JSON。

- [ ] **Step 5: 验证 404**

访问 `http://localhost:3000/nope-this-does-not-exist`。预期：404 页面，标题"404"，"返回首页"链接。

- [ ] **Step 6: 验证 5xx 兜底**

停掉后端进程，刷新首页或内容页。预期：浏览器显示错误页（dev 环境显示 Next.js dev 错误页，prod 显示 `app/error.tsx` 的"出错了"兜底）。

- [ ] **Step 7: TypeScript 编译检查**

```bash
pnpm exec tsc --noEmit
```

预期：无错误输出（仅可能的 deprecated 警告，可忽略）。

---

## Self-Review

**1. Spec 覆盖检查：**
- 目标节"做"的 6 项 → Task 1-11 全部覆盖（路由 / nav 列表 / 内容页 / 两个端点对接 / 错误 / 404 / loading / env）
- "不做"的 8 项均未引入（Puck / next/image 白名单 / ISR / 鉴权 / 测试 / CI / lint / 后端改造）
- 文件结构与 spec 一致
- 关键设计决定全部反映在 Task 代码（`no-store`、`notFound()`、`<img>`、`<pre>` dump、`?? []` 容错）

**2. 占位符扫描：** 无 TBD/TODO/"implement later"/"similar to"。所有代码块都是完整可粘贴内容。

**3. 类型一致性：**
- `lib/types.ts` 定义 `PageStatus`、`PageNavItem`、`PageDetail`
- `lib/api.ts` 导入并使用 `PageDetail`、`PageNavItem`
- `app/page.tsx` 用 `getNavList()` 返回 `PageNavItem[] | null`，`?? []` 后用 `.map` 取 `it.id` / `it.slug` / `it.title` / `it.coverImage` — 全部在 `PageNavItem` 上有定义
- `app/[...slug]/page.tsx` 用 `getPageBySlug()` 返回 `PageDetail | null`，使用 `page.content` / `page.title` / `page.summary` — 全部在 `PageDetail` 上有定义
- `app/error.tsx` 用 `Error & { digest?: string }` — 与 Next.js 16 `error.tsx` props 约定一致

无一致性问题。
