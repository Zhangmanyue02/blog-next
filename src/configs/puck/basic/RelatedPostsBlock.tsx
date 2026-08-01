import type { ComponentConfig } from "@puckeditor/core";

export type RelatedPostsBlockProps = {
	title: string;
	posts: {
		title: string;
		href: string;
		date: string;
	}[];
};

export const RelatedPostsBlock: ComponentConfig<RelatedPostsBlockProps> = {
	label: "相关文章",
	fields: {
		title: { type: "text", label: "区块标题" },
		posts: {
			type: "array",
			label: "文章",
			arrayFields: {
				title: { type: "text", label: "标题" },
				href: { type: "text", label: "链接" },
				date: { type: "text", label: "日期" },
			},
			getItemSummary: (item) => item.title || "文章",
		},
	},
	defaultProps: {
		title: "相关文章",
		posts: [
			{ title: "TypeScript 在业务里的实用边界", href: "#", date: "2026-06-02" },
			{ title: "我的写作工作流", href: "#", date: "2026-05-10" },
			{ title: "前端项目里的信息架构", href: "#", date: "2026-04-22" },
		],
	},
	render: ({ title, posts }) => (
		<section className="w-full px-6 py-10">
			<div className="max-w-3xl mx-auto">
				{title && <h2 className="text-xl font-bold tracking-tight mb-6">{title}</h2>}
				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={`${post.title}-${post.date}`}>
							<a href={post.href} className="group flex items-baseline justify-between gap-4">
								<span className="font-medium group-hover:opacity-70 transition">{post.title}</span>
								{post.date && <span className="text-xs text-muted-foreground shrink-0">{post.date}</span>}
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	),
};
