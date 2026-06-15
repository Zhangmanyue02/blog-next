import type { ComponentConfig } from "@puckeditor/core";

export type LatestPostHeroBlockProps = {
  postTitle: string;
  postExcerpt: string;
  postCover: string;
  postHref: string;
  postDate: string;
  category: string;
};

export const LatestPostHeroBlock: ComponentConfig<LatestPostHeroBlockProps> = {
  label: "最新文章首屏",
  fields: {
    postTitle: { type: "text", label: "文章标题" },
    postExcerpt: { type: "textarea", label: "摘要" },
    postCover: { type: "text", label: "封面图(URL)" },
    postHref: { type: "text", label: "跳转链接" },
    postDate: { type: "text", label: "日期" },
    category: { type: "text", label: "分类" },
  },
  defaultProps: {
    postTitle: "我如何搭建一个属于自己的博客",
    postExcerpt: "从零开始，用 Puck + React 打造一个可视化编辑的现代博客。",
    postCover: "https://placehold.co/1200x600",
    postHref: "#",
    postDate: "2026-06-01",
    category: "随笔",
  },
  render: ({
    postTitle,
    postExcerpt,
    postCover,
    postHref,
    postDate,
    category,
  }) => (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <a href={postHref} className="block overflow-hidden rounded-xl">
          <img
            src={postCover}
            alt={postTitle}
            className="w-full h-72 object-cover hover:scale-105 transition duration-500"
          />
        </a>
        <div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            {category && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded">
                {category}
              </span>
            )}
            {postDate && <span>{postDate}</span>}
          </div>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            <a href={postHref} className="hover:text-primary transition">
              {postTitle}
            </a>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
            {postExcerpt}
          </p>
          <a
            href={postHref}
            className="text-primary font-medium hover:underline"
          >
            阅读全文 →
          </a>
        </div>
      </div>
    </section>
  ),
};
