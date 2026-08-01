import type { ComponentConfig } from "@puckeditor/core";

export type ArchiveListBlockProps = {
	title: string;
	groups: {
		year: string;
		posts: {
			title: string;
			href: string;
			date: string;
		}[];
	}[];
};

export const ArchiveListBlock: ComponentConfig<ArchiveListBlockProps> = {
	label: "归档列表",
	fields: {
		title: { type: "text", label: "区块标题" },
		groups: {
			type: "array",
			label: "按年分组",
			arrayFields: {
				year: { type: "text", label: "年份" },
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
			getItemSummary: (item) => item.year || "年份",
		},
	},
	defaultProps: {
		title: "文章归档",
		groups: [
			{
				year: "2026",
				posts: [
					{ title: "从零搭建个人技术博客", href: "#", date: "07-18" },
					{ title: "TypeScript 在业务里的实用边界", href: "#", date: "06-02" },
					{ title: "我的写作工作流", href: "#", date: "05-10" },
				],
			},
			{
				year: "2025",
				posts: [
					{ title: "前端项目里的信息架构", href: "#", date: "11-03" },
					{ title: "一次组件库拆分复盘", href: "#", date: "08-21" },
				],
			},
		],
	},
	render: ({ title, groups }) => (
		<section className="w-full px-6 py-14">
			<div className="max-w-3xl mx-auto">
				{title && <h1 className="text-3xl font-bold tracking-tight mb-10">{title}</h1>}
				<div className="space-y-10">
					{groups.map((group) => (
						<div key={group.year}>
							<h2 className="text-lg font-semibold mb-4 text-muted-foreground">{group.year}</h2>
							<ul className="space-y-3">
								{group.posts.map((post) => (
									<li key={`${post.title}-${post.date}`} className="flex items-baseline gap-4">
										<span className="text-xs text-muted-foreground w-12 shrink-0 tabular-nums">{post.date}</span>
										<a href={post.href} className="font-medium hover:opacity-70 transition">
											{post.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	),
};
