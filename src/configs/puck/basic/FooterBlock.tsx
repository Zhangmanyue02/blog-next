import type { ComponentConfig } from "@puckeditor/core";

export type FooterBlockProps = {
  copyright: string;
  description: string;
  socials: { label: string; href: string }[];
  columns: { title: string; links: { label: string; href: string }[] }[];
};

export const FooterBlock: ComponentConfig<FooterBlockProps> = {
  label: "页脚",
  fields: {
    copyright: { type: "text", label: "版权信息" },
    description: { type: "textarea", label: "站点描述" },
    socials: {
      type: "array",
      label: "社交链接",
      arrayFields: {
        label: { type: "text", label: "名称" },
        href: { type: "text", label: "链接" },
      },
      getItemSummary: (item) => item.label || "社交",
    },
    columns: {
      type: "array",
      label: "链接分组",
      arrayFields: {
        title: { type: "text", label: "分组标题" },
        links: {
          type: "array",
          label: "链接",
          arrayFields: {
            label: { type: "text", label: "名称" },
            href: { type: "text", label: "链接" },
          },
          getItemSummary: (item) => item.label || "链接",
        },
      },
      getItemSummary: (item) => item.title || "分组",
    },
  },
  defaultProps: {
    copyright: "© 2026 Alvin. All rights reserved.",
    description: "用文字记录思考，用代码创造价值。",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Email", href: "#" },
    ],
    columns: [
      {
        title: "导航",
        links: [
          { label: "首页", href: "/" },
          { label: "归档", href: "/archives" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "RSS", href: "#" },
          { label: "关于", href: "/about" },
        ],
      },
    ],
  },
  render: ({ copyright, description, socials, columns }) => (
    <footer className="w-full border-t bg-muted/30 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">
            {description}
          </p>
          <div className="flex gap-4 text-sm">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="text-muted-foreground hover:text-foreground transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        {columns.map((col, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-3 text-sm">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  ),
};
