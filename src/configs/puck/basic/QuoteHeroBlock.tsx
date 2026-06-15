import type { ComponentConfig } from "@puckeditor/core";

export type QuoteHeroBlockProps = {
  quote: string;
  author: string;
  backgroundColor: string;
  textColor: string;
};

export const QuoteHeroBlock: ComponentConfig<QuoteHeroBlockProps> = {
  label: "引言首屏",
  fields: {
    quote: { type: "textarea", label: "引言" },
    author: { type: "text", label: "作者" },
    backgroundColor: { type: "text", label: "背景色" },
    textColor: { type: "text", label: "文字色" },
  },
  defaultProps: {
    quote: "保持好奇，持续创造。",
    author: "— Alvin",
    backgroundColor: "#0f172a",
    textColor: "#f8fafc",
  },
  render: ({ quote, author, backgroundColor, textColor }) => (
    <section
      className="w-full py-28 px-6 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-6 whitespace-pre-wrap">
          “{quote}”
        </p>
        <p className="text-sm md:text-base opacity-80">{author}</p>
      </div>
    </section>
  ),
};
