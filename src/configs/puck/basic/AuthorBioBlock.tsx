import type { ComponentConfig } from "@puckeditor/core";

export type AuthorBioBlockProps = {
	name: string;
	role: string;
	bio: string;
	avatar: string;
	links: { label: string; href: string }[];
};

export const AuthorBioBlock: ComponentConfig<AuthorBioBlockProps> = {
	label: "作者简介",
	fields: {
		name: { type: "text", label: "姓名" },
		role: { type: "text", label: "身份" },
		bio: { type: "textarea", label: "简介" },
		avatar: { type: "text", label: "头像 URL" },
		links: {
			type: "array",
			label: "链接",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "链接",
		},
	},
	defaultProps: {
		name: "Alvin",
		role: "前端工程师 / 写作者",
		bio: "热爱代码、设计与分享，喜欢把复杂的事情讲简单。",
		avatar: "https://placehold.co/96x96",
		links: [
			{ label: "关于我", href: "/about" },
			{ label: "GitHub", href: "#" },
		],
	},
	render: ({ name, role, bio, avatar, links }) => (
		<section className="w-full px-6 py-8">
			<div className="max-w-3xl mx-auto border border-border/80 p-6 flex gap-5 items-start">
				<img src={avatar} alt={name} className="w-16 h-16 object-cover shrink-0" />
				<div className="min-w-0">
					<p className="font-semibold tracking-tight">{name}</p>
					{role && <p className="text-sm text-muted-foreground mt-0.5">{role}</p>}
					{bio && <p className="text-sm text-muted-foreground mt-3 leading-relaxed whitespace-pre-wrap">{bio}</p>}
					{links.length > 0 && (
						<div className="flex flex-wrap gap-3 mt-4 text-sm">
							{links.map((link) => (
								<a
									key={`${link.label}-${link.href}`}
									href={link.href}
									className="text-foreground underline-offset-4 hover:underline"
								>
									{link.label}
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	),
};
