import type { ComponentConfig } from "@puckeditor/core";

export type ArticleListBlockProps = {
  title: string;
  columns: 2 | 3;
  posts: {
    title: string;
    excerpt: string;
    cover: string;
    href: string;
    category: string;
    date: string;
  }[];
};

export const ArticleListBlock: ComponentConfig<ArticleListBlockProps> = {
  label: "文章列表",
  fields: {
    title: { type: "text", label: "区块标题" },
    columns: {
      type: "select",
      label: "列数",
      options: [
        { label: "2 列", value: 2 },
        { label: "3 列", value: 3 },
      ],
    },
    posts: {
      type: "array",
      label: "文章",
      arrayFields: {
        title: { type: "text", label: "标题" },
        excerpt: { type: "textarea", label: "摘要" },
        cover: { type: "text", label: "封面" },
        href: { type: "text", label: "链接" },
        category: { type: "text", label: "分类" },
        date: { type: "text", label: "日期" },
      },
      getItemSummary: (item) => item.title || "文章",
    },
  },
  defaultProps: {
    title: "最新文章",
    columns: 3,
    posts: [
      {
        title: "用 Puck 搭建可视化博客",
        excerpt: "介绍 Puck 编辑器的基本用法与实战经验。",
        cover: "https://placehold.co/600x360",
        href: "#",
        category: "技术",
        date: "2026-06-01",
      },
      {
        title: "TypeScript 进阶技巧",
        excerpt: "从类型体操到实际工程实践。",
        cover: "https://placehold.co/600x360",
        href: "#",
        category: "技术",
        date: "2026-05-20",
      },
      {
        title: "我的写作工作流",
        excerpt: "分享我个人使用的工具与流程。",
        cover: "https://placehold.co/600x360",
        href: "#",
        category: "随笔",
        date: "2026-05-10",
      },
    ],
  },
  render: ({ title, columns, posts }) => {
    const gridClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
    return (
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
          )}
          <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
            {posts.map((p, idx) => (
              <a
                key={idx}
                href={p.href}
                className="block group border rounded-lg overflow-hidden hover:shadow-lg transition bg-card"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    {p.category && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                        {p.category}
                      </span>
                    )}
                    {p.date && <span>{p.date}</span>}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                    {p.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
