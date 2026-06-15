import type { ComponentConfig } from "@puckeditor/core";

export type SearchBarBlockProps = {
  placeholder: string;
  action: string;
  hint: string;
};

export const SearchBarBlock: ComponentConfig<SearchBarBlockProps> = {
  label: "搜索栏",
  fields: {
    placeholder: { type: "text", label: "占位文本" },
    action: { type: "text", label: "搜索接口" },
    hint: { type: "text", label: "提示文案" },
  },
  defaultProps: {
    placeholder: "搜索文章...",
    action: "/search",
    hint: "按 Enter 搜索",
  },
  render: ({ placeholder, action, hint }) => (
    <section className="w-full py-10 px-6">
      <form
        action={action}
        method="get"
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-card focus-within:ring-2 focus-within:ring-primary">
          <span className="text-muted-foreground">🔍</span>
          <input
            type="search"
            name="q"
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            type="submit"
            className="text-sm font-medium text-primary hover:underline"
          >
            搜索
          </button>
        </div>
        {hint && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            {hint}
          </p>
        )}
      </form>
    </section>
  ),
};
