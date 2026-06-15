import type { ComponentConfig } from "@puckeditor/core";

export type FeaturesBlockProps = {
  title: string;
  columns: 2 | 3 | 4;
  items: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export const FeaturesBlock: ComponentConfig<FeaturesBlockProps> = {
  label: "功能特性",
  fields: {
    title: { type: "text", label: "区块标题" },
    columns: {
      type: "select",
      label: "列数",
      options: [
        { label: "2 列", value: 2 },
        { label: "3 列", value: 3 },
        { label: "4 列", value: 4 },
      ],
    },
    items: {
      type: "array",
      label: "特性列表",
      arrayFields: {
        icon: { type: "text", label: "图标(emoji 或 URL)" },
        title: { type: "text", label: "标题" },
        description: { type: "textarea", label: "描述" },
      },
      getItemSummary: (item) => item.title || "新特性",
    },
  },
  defaultProps: {
    title: "为什么选择我们",
    columns: 3,
    items: [
      { icon: "⚡", title: "极速体验", description: "基于现代框架构建，性能出色。" },
      { icon: "🎨", title: "精美设计", description: "遵循设计规范，开箱即用。" },
      { icon: "🔒", title: "安全可靠", description: "完善权限与数据保护机制。" },
    ],
  },
  render: ({ title, columns, items }) => {
    const gridClass =
      columns === 2
        ? "md:grid-cols-2"
        : columns === 4
        ? "md:grid-cols-4"
        : "md:grid-cols-3";
    return (
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {title && (
            <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
          )}
          <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-lg hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
