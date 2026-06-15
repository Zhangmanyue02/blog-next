import type { ComponentConfig } from "@puckeditor/core";

export type NavbarBlockProps = {
  logo: string;
  links: { label: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
  sticky: boolean;
};

export const NavbarBlock: ComponentConfig<NavbarBlockProps> = {
  label: "导航栏",
  fields: {
    logo: { type: "text", label: "站点名/Logo 文字" },
    links: {
      type: "array",
      label: "导航链接",
      arrayFields: {
        label: { type: "text", label: "名称" },
        href: { type: "text", label: "链接" },
      },
      getItemSummary: (item) => item.label || "链接",
    },
    ctaLabel: { type: "text", label: "按钮文案" },
    ctaHref: { type: "text", label: "按钮链接" },
    sticky: { type: "radio", label: "吸顶", options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ]},
  },
  defaultProps: {
    logo: "My Blog",
    links: [
      { label: "首页", href: "/" },
      { label: "归档", href: "/archives" },
      { label: "关于", href: "/about" },
    ],
    ctaLabel: "订阅",
    ctaHref: "#newsletter",
    sticky: true,
  },
  render: ({ logo, links, ctaLabel, ctaHref, sticky }) => (
    <header
      className={`w-full border-b bg-background z-40 ${
        sticky ? "sticky top-0" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-bold">
          {logo}
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l, idx) => (
            <a
              key={idx}
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition"
            >
              {l.label}
            </a>
          ))}
          {ctaLabel && (
            <a
              href={ctaHref}
              className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
            >
              {ctaLabel}
            </a>
          )}
        </nav>
      </div>
    </header>
  ),
};
