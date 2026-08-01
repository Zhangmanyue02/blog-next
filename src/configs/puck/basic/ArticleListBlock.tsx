import type { ComponentConfig } from "@puckeditor/core";

export type ArticleListBlockProps = {
	title: string;
	posts: {
		title: string;
		excerpt: string;
		href: string;
		category: string;
		date: string;
	}[];
};

export const ArticleListBlock: ComponentConfig<ArticleListBlockProps> = {
	label: "文章列表",
	fields: {
		title: { type: "text", label: "区块标题" },
		posts: {
			type: "array",
			label: "文章",
			arrayFields: {
				title: { type: "text", label: "标题" },
				excerpt: { type: "textarea", label: "摘要" },
				href: { type: "text", label: "链接" },
				category: { type: "text", label: "分类" },
				date: { type: "text", label: "日期" },
			},
			getItemSummary: (item) => item.title || "文章",
		},
	},
	defaultProps: {
		title: "最新文章",
		posts: [
			{
				title: "从零搭建个人技术博客",
				excerpt: "聊聊站点结构、写作节奏，以及可视化页面编辑带来的效率提升。",
				href: "#",
				category: "工程",
				date: "2026-07-18",
			},
			{
				title: "TypeScript 在业务里的实用边界",
				excerpt: "不必追求类型体操，先把可维护性和协作成本压下来。",
				href: "#",
				category: "技术",
				date: "2026-06-02",
			},
			{
				title: "我的写作工作流",
				excerpt: "从草稿到发布：工具、模板与复盘习惯。",
				href: "#",
				category: "随笔",
				date: "2026-05-10",
			},
		],
	},
	render: ({ title, posts }) => (
		<section id="latest" className="w-full py-14 px-6">
			<div className="max-w-3xl mx-auto">
				{title && <h2 className="text-2xl font-bold tracking-tight mb-8">{title}</h2>}
				<ul className="divide-y divide-border/80">
					{posts.map((post) => (
						<li key={`${post.title}-${post.date}`}>
							<a href={post.href} className="block py-6 group">
								<div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
									{post.category && <span className="uppercase tracking-wide">{post.category}</span>}
									{post.date && <span>{post.date}</span>}
								</div>
								<h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:opacity-70 transition">
									{post.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 whitespace-pre-wrap">
									{post.excerpt}
								</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	),
};
