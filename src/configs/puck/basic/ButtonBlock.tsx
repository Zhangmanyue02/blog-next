import type { ComponentConfig } from "@puckeditor/core";

export type ButtonBlockProps = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  align: "left" | "center" | "right";
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  label: "按钮",
  fields: {
    label: { type: "text", label: "文案" },
    href: { type: "text", label: "跳转链接" },
    variant: {
      type: "select",
      label: "样式",
      options: [
        { label: "主色", value: "primary" },
        { label: "次色", value: "secondary" },
        { label: "描边", value: "outline" },
      ],
    },
    align: {
      type: "radio",
      label: "对齐",
      options: [
        { label: "左", value: "left" },
        { label: "中", value: "center" },
        { label: "右", value: "right" },
      ],
    },
  },
  defaultProps: {
    label: "了解更多",
    href: "#",
    variant: "primary",
    align: "left",
  },
  render: ({ label, href, variant, align }) => {
    const variantClass =
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:opacity-90"
        : variant === "secondary"
        ? "bg-secondary text-secondary-foreground hover:opacity-90"
        : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground";
    return (
      <div style={{ textAlign: align }}>
        <a
          href={href}
          className={`inline-block px-5 py-2 rounded-md text-sm font-medium transition ${variantClass}`}
        >
          {label}
        </a>
      </div>
    );
  },
};
