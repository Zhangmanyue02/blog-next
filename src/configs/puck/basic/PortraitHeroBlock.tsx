import type { ComponentConfig } from "@puckeditor/core";

export type PortraitHeroBlockProps = {
  name: string;
  tagline: string;
  description: string;
  portrait: string;
  resumeHref: string;
};

export const PortraitHeroBlock: ComponentConfig<PortraitHeroBlockProps> = {
  label: "人物首屏",
  fields: {
    name: { type: "text", label: "姓名" },
    tagline: { type: "text", label: "一句话定位" },
    description: { type: "textarea", label: "简介" },
    portrait: { type: "text", label: "头像(URL)" },
    resumeHref: { type: "text", label: "简历链接" },
  },
  defaultProps: {
    name: "Alvin",
    tagline: "前端工程师 / 写作者",
    description: "热爱代码、设计与分享，喜欢把复杂的事情讲简单。",
    portrait: "https://placehold.co/300x300",
    resumeHref: "#",
  },
  render: ({ name, tagline, description, portrait, resumeHref }) => (
    <section className="w-full py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <img
          src={portrait}
          alt={name}
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
          <p className="text-primary text-lg mb-4">{tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
            {description}
          </p>
          {resumeHref && (
            <a
              href={resumeHref}
              className="inline-block px-5 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition"
            >
              查看简历
            </a>
          )}
        </div>
      </div>
    </section>
  ),
};
