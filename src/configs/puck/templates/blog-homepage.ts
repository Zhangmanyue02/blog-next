import type { Data } from "@puckeditor/core";

/** 博客首页模板：导航 + 人物首屏 + 文章列表 + 分类 + 标签 + 订阅 + 页脚 */
export const blogHomepageTemplate: Data = {
  root: { props: {} },
  content: [
    { type: "NavbarBlock", props: { id: "NavbarBlock-nav", logo: "My Blog", links: [
      { label: "首页", href: "/" },
      { label: "归档", href: "/archives" },
      { label: "关于", href: "/about" },
    ], ctaLabel: "订阅", ctaHref: "#newsletter", sticky: true } },
    { type: "PortraitHeroBlock", props: { id: "PortraitHeroBlock-1", name: "Alvin", tagline: "前端工程师 / 写作者", description: "热爱代码、设计与分享，喜欢把复杂的事情讲简单。", portrait: "https://placehold.co/300x300", resumeHref: "#" } },
    { type: "ArticleListBlock", props: { id: "ArticleListBlock-1", title: "最新文章", columns: 3, posts: [
      { title: "用 Puck 搭建可视化博客", excerpt: "介绍 Puck 编辑器的基本用法与实战经验。", cover: "https://placehold.co/600x360", href: "#", category: "技术", date: "2026-06-01" },
      { title: "TypeScript 进阶技巧", excerpt: "从类型体操到实际工程实践。", cover: "https://placehold.co/600x360", href: "#", category: "技术", date: "2026-05-20" },
      { title: "我的写作工作流", excerpt: "分享我个人使用的工具与流程。", cover: "https://placehold.co/600x360", href: "#", category: "随笔", date: "2026-05-10" },
    ] } },
    { type: "DividerBlock", props: { id: "DividerBlock-1", color: "#e5e7eb", thickness: 1 } },
    { type: "GridBlock", props: { id: "GridBlock-demo", columns: 2, gap: 24, padding: 24, minHeight: 80, background: "" } },
    { type: "CategoriesBlock", props: { id: "CategoriesBlock-1", title: "文章分类", layout: "grid", categories: [
      { name: "技术", count: 12, href: "#", icon: "💻" },
      { name: "随笔", count: 8, href: "#", icon: "✍️" },
      { name: "生活", count: 5, href: "#", icon: "🌿" },
      { name: "读书", count: 3, href: "#", icon: "📚" },
    ] } },
    { type: "TagCloudBlock", props: { id: "TagCloudBlock-1", title: "标签云", tags: [
      { name: "React", href: "#", weight: 5 },
      { name: "TypeScript", href: "#", weight: 4 },
      { name: "CSS", href: "#", weight: 3 },
      { name: "设计", href: "#", weight: 2 },
    ] } },
    { type: "NewsletterBlock", props: { id: "NewsletterBlock-1", title: "订阅周报", description: "每周一封，分享我的最新文章与心得。", placeholder: "your@email.com", buttonLabel: "订阅", action: "/api/subscribe", backgroundColor: "#f1f5f9" } },
    { type: "FooterBlock", props: { id: "FooterBlock-1", copyright: "© 2026 Alvin. All rights reserved.", description: "用文字记录思考，用代码创造价值。", socials: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ], columns: [
      { title: "导航", links: [{ label: "首页", href: "/" }, { label: "归档", href: "/archives" }] },
      { title: "资源", links: [{ label: "RSS", href: "#" }, { label: "关于", href: "/about" }] },
    ] } },
  ],
  zones: {
    "GridBlock-demo:cells": [
      {
        type: "HeadingBlock",
        props: {
          id: "GridBlock-demo-cell-1",
          text: "📝 最新评论",
          level: "h3",
          align: "left",
          color: "#0f172a",
        },
      },
      {
        type: "HeadingBlock",
        props: {
          id: "GridBlock-demo-cell-2",
          text: "🔥 热门标签",
          level: "h3",
          align: "left",
          color: "#0f172a",
        },
      },
    ],
  },
};
