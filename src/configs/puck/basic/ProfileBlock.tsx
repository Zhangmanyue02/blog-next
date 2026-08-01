import type { ComponentConfig } from "@puckeditor/core";

export type ProfileBlockProps = {
	name: string;
	tagline: string;
	bio: string;
	avatar: string;
	links: { label: string; href: string }[];
};

export const ProfileBlock: ComponentConfig<ProfileBlockProps> = {
	label: "个人简介",
	fields: {
		name: { type: "text", label: "姓名" },
		tagline: { type: "text", label: "一句话介绍" },
		bio: { type: "textarea", label: "详细介绍" },
		avatar: { type: "text", label: "头像 URL" },
		links: {
			type: "array",
			label: "外链",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "链接",
		},
	},
	defaultProps: {
		name: "Alvin",
		tagline: "前端工程师 / 写作者",
		bio: "我在这里记录工程实践、工具选择与偶尔的生活观察。目标很简单：把做过的事写清楚，方便未来的自己，也方便同行。",
		avatar: "https://placehold.co/160x160",
		links: [
			{ label: "GitHub", href: "#" },
			{ label: "Email", href: "mailto:hello@example.com" },
		],
	},
	render: ({ name, tagline, bio, avatar, links }) => (
		<section className="w-full px-6 pt-16 pb-10">
			<div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 items-start">
				<img src={avatar} alt={name} className="w-28 h-28 object-cover shrink-0" />
				<div>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{name}</h1>
					{tagline && <p className="text-muted-foreground mb-5">{tagline}</p>}
					{bio && <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap mb-6">{bio}</p>}
					{links.length > 0 && (
						<div className="flex flex-wrap gap-4 text-sm">
							{links.map((link) => (
								<a
									key={`${link.label}-${link.href}`}
									href={link.href}
									className="border-b border-foreground pb-0.5 hover:opacity-70 transition"
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
