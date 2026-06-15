import type { ComponentConfig } from "@puckeditor/core";

export type AuthorBioBlockProps = {
  name: string;
  avatar: string;
  bio: string;
  socials: { label: string; href: string }[];
};

export const AuthorBioBlock: ComponentConfig<AuthorBioBlockProps> = {
  label: "作者简介",
  fields: {
    name: { type: "text", label: "姓名" },
    avatar: { type: "text", label: "头像(URL)" },
    bio: { type: "textarea", label: "个人简介" },
    socials: {
      type: "array",
      label: "社交链接",
      arrayFields: {
        label: { type: "text", label: "名称" },
        href: { type: "text", label: "链接" },
      },
      getItemSummary: (item) => item.label || "链接",
    },
  },
  defaultProps: {
    name: "Alvin",
    avatar: "https://placehold.co/120x120",
    bio: "前端工程师，写作者。喜欢把复杂的事讲简单。",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  render: ({ name, avatar, bio, socials }) => (
    <section className="w-full py-12 px-6">
      <div className="max-w-3xl mx-auto p-6 border rounded-lg flex flex-col md:flex-row items-center gap-6 bg-card">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3 whitespace-pre-wrap">
            {bio}
          </p>
          <div className="flex gap-3 justify-center md:justify-start text-sm">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="text-primary hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
};
