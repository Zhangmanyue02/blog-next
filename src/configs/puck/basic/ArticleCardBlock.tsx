import type { ComponentConfig } from "@puckeditor/core";

export type ArticleCardBlockProps = {
  title: string;
  excerpt: string;
  cover: string;
  href: string;
  category: string;
  date: string;
  readTime: string;
};

export const ArticleCardBlock: ComponentConfig<ArticleCardBlockProps> = {
  label: "文章卡片",
  fields: {
    title: { type: "text", label: "标题" },
    excerpt: { type: "textarea", label: "摘要" },
    cover: { type: "text", label: "封面图(URL)" },
    href: { type: "text", label: "跳转链接" },
    category: { type: "text", label: "分类" },
    date: { type: "text", label: "日期" },
    readTime: { type: "text", label: "阅读时长" },
  },
  defaultProps: {
    title: "示例文章标题",
    excerpt: "这是一段简短的摘要，用来吸引读者继续阅读。",
    cover: "https://placehold.co/600x360",
    href: "#",
    category: "技术",
    date: "2026-06-01",
    readTime: "5 分钟",
  },
  render: ({ title, excerpt, cover, href, category, date, readTime }) => (
    <a
      href={href}
      className="block group border rounded-lg overflow-hidden hover:shadow-lg transition bg-card"
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {category && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
              {category}
            </span>
          )}
          {date && <span>{date}</span>}
          {readTime && <span>· {readTime}</span>}
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
          {excerpt}
        </p>
      </div>
    </a>
  ),
};
