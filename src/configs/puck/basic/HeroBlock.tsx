import type { ComponentConfig } from "@puckeditor/core";

export type HeroBlockProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
  overlay: boolean;
};

export const HeroBlock: ComponentConfig<HeroBlockProps> = {
  label: "大图首屏",
  fields: {
    title: { type: "text", label: "主标题" },
    subtitle: { type: "textarea", label: "副标题" },
    ctaLabel: { type: "text", label: "按钮文案" },
    ctaHref: { type: "text", label: "按钮链接" },
    backgroundImage: { type: "text", label: "背景图(URL)" },
    overlay: { type: "radio", label: "暗色蒙层", options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ]},
  },
  defaultProps: {
    title: "用文字记录思考",
    subtitle: "在这里分享你的故事、笔记与灵感。",
    ctaLabel: "开始阅读",
    ctaHref: "#",
    backgroundImage: "https://placehold.co/1600x700",
    overlay: true,
  },
  render: ({ title, subtitle, ctaLabel, ctaHref, backgroundImage, overlay }) => (
    <section
      className="relative w-full py-24 px-6 flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 480,
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 whitespace-pre-wrap">
          {subtitle}
        </p>
        {ctaLabel && (
          <a
            href={ctaHref}
            className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  ),
};
