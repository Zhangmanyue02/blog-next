import type { ComponentConfig } from "@puckeditor/core";

export type CTABlockProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  backgroundColor: string;
  textColor: string;
};

export const CTABlock: ComponentConfig<CTABlockProps> = {
  label: "行动召唤",
  fields: {
    title: { type: "text", label: "标题" },
    description: { type: "textarea", label: "描述" },
    primaryLabel: { type: "text", label: "主按钮文案" },
    primaryHref: { type: "text", label: "主按钮链接" },
    secondaryLabel: { type: "text", label: "次按钮文案" },
    secondaryHref: { type: "text", label: "次按钮链接" },
    backgroundColor: { type: "text", label: "背景色" },
    textColor: { type: "text", label: "文字色" },
  },
  defaultProps: {
    title: "准备好开始了吗？",
    description: "立即注册，开启你的写作之旅。",
    primaryLabel: "立即开始",
    primaryHref: "#",
    secondaryLabel: "了解更多",
    secondaryHref: "#",
    backgroundColor: "#0f172a",
    textColor: "#f8fafc",
  },
  render: ({
    title,
    description,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
    backgroundColor,
    textColor,
  }) => (
    <section
      className="w-full py-20 px-6 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg opacity-90 mb-8 whitespace-pre-wrap">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {primaryLabel && (
            <a
              href={primaryHref}
              className="px-6 py-3 bg-white text-black rounded-md font-medium hover:opacity-90 transition"
            >
              {primaryLabel}
            </a>
          )}
          {secondaryLabel && (
            <a
              href={secondaryHref}
              className="px-6 py-3 border border-white/60 rounded-md font-medium hover:bg-white/10 transition"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  ),
};
