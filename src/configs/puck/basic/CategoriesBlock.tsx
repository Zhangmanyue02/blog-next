import type { ComponentConfig } from "@puckeditor/core";

export type CategoriesBlockProps = {
  title: string;
  categories: { name: string; count: number; href: string; icon: string }[];
  layout: "grid" | "list";
};

export const CategoriesBlock: ComponentConfig<CategoriesBlockProps> = {
  label: "分类列表",
  fields: {
    title: { type: "text", label: "区块标题" },
    layout: {
      type: "radio",
      label: "布局",
      options: [
        { label: "卡片", value: "grid" },
        { label: "列表", value: "list" },
      ],
    },
    categories: {
      type: "array",
      label: "分类",
      arrayFields: {
        name: { type: "text", label: "名称" },
        count: { type: "number", label: "文章数" },
        href: { type: "text", label: "链接" },
        icon: { type: "text", label: "图标" },
      },
      getItemSummary: (item) => item.name || "分类",
    },
  },
  defaultProps: {
    title: "文章分类",
    layout: "grid",
    categories: [
      { name: "技术", count: 12, href: "#", icon: "💻" },
      { name: "随笔", count: 8, href: "#", icon: "✍️" },
      { name: "生活", count: 5, href: "#", icon: "🌿" },
      { name: "读书", count: 3, href: "#", icon: "📚" },
    ],
  },
  render: ({ title, categories, layout }) => (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        )}
        {layout === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c, idx) => (
              <a
                key={idx}
                href={c.href}
                className="block p-6 border rounded-lg text-center hover:border-primary hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {c.count} 篇文章
                </div>
              </a>
            ))}
          </div>
        ) : (
          <ul className="divide-y">
            {categories.map((c, idx) => (
              <li key={idx}>
                <a
                  href={c.href}
                  className="flex items-center justify-between py-4 hover:text-primary transition"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <span className="font-medium">{c.name}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {c.count} 篇
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  ),
};
