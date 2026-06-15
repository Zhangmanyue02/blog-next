import type { ComponentConfig } from "@puckeditor/core";

export type TagCloudBlockProps = {
  title: string;
  tags: { name: string; href: string; weight: number }[];
};

export const TagCloudBlock: ComponentConfig<TagCloudBlockProps> = {
  label: "标签云",
  fields: {
    title: { type: "text", label: "区块标题" },
    tags: {
      type: "array",
      label: "标签",
      arrayFields: {
        name: { type: "text", label: "标签名" },
        href: { type: "text", label: "链接" },
        weight: { type: "number", label: "权重(1-5)" },
      },
      getItemSummary: (item) => item.name || "标签",
    },
  },
  defaultProps: {
    title: "标签云",
    tags: [
      { name: "React", href: "#", weight: 5 },
      { name: "TypeScript", href: "#", weight: 4 },
      { name: "CSS", href: "#", weight: 3 },
      { name: "Node", href: "#", weight: 3 },
      { name: "设计", href: "#", weight: 2 },
      { name: "工具", href: "#", weight: 2 },
    ],
  },
  render: ({ title, tags }) => (
    <section className="w-full py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        )}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((t, idx) => {
            const size =
              t.weight >= 5
                ? "text-xl"
                : t.weight >= 4
                ? "text-lg"
                : t.weight >= 3
                ? "text-base"
                : "text-sm";
            return (
              <a
                key={idx}
                href={t.href}
                className={`px-3 py-1 border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition ${size}`}
              >
                #{t.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  ),
};
