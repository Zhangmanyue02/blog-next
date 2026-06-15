import type { ComponentConfig } from "@puckeditor/core";

export type NewsletterBlockProps = {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  action: string;
  backgroundColor: string;
};

export const NewsletterBlock: ComponentConfig<NewsletterBlockProps> = {
  label: "邮件订阅",
  fields: {
    title: { type: "text", label: "标题" },
    description: { type: "textarea", label: "描述" },
    placeholder: { type: "text", label: "邮箱占位" },
    buttonLabel: { type: "text", label: "按钮文案" },
    action: { type: "text", label: "提交接口" },
    backgroundColor: { type: "text", label: "背景色" },
  },
  defaultProps: {
    title: "订阅周报",
    description: "每周一封，分享我的最新文章与心得。",
    placeholder: "your@email.com",
    buttonLabel: "订阅",
    action: "/api/subscribe",
    backgroundColor: "#f1f5f9",
  },
  render: ({
    title,
    description,
    placeholder,
    buttonLabel,
    action,
    backgroundColor,
  }) => (
    <section
      id="newsletter"
      className="w-full py-16 px-6"
      style={{ backgroundColor }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 whitespace-pre-wrap">
          {description}
        </p>
        <form
          action={action}
          method="post"
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder={placeholder}
            className="flex-1 px-4 py-3 border rounded-md bg-background outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
          >
            {buttonLabel}
          </button>
        </form>
      </div>
    </section>
  ),
};
