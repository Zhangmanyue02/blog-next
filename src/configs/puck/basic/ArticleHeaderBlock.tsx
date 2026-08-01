import type { ComponentConfig } from "@puckeditor/core";

export type ArticleHeaderBlockProps = {
	title: string;
	subtitle: string;
	author: string;
	date: string;
	readingTime: string;
	tags: { label: string; href: string }[];
};

export const ArticleHeaderBlock: ComponentConfig<ArticleHeaderBlockProps> = {
	label: "文章头",
	fields: {
		title: { type: "text", label: "标题" },
		subtitle: { type: "textarea", label: "副标题" },
		author: { type: "text", label: "作者" },
		date: { type: "text", label: "发布日期" },
		readingTime: { type: "text", label: "阅读时长" },
		tags: {
			type: "array",
			label: "标签",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "标签",
		},
	},
	defaultProps: {
		title: "从零搭建个人技术博客",
		subtitle: "站点结构、写作节奏，以及可视化页面编辑带来的效率提升。",
		author: "Alvin",
		date: "2026-07-18",
		readingTime: "8 分钟",
		tags: [
			{ label: "博客", href: "#" },
			{ label: "工程", href: "#" },
			{ label: "React", href: "#" },
		],
	},
	render: ({ title, subtitle, author, date, readingTime, tags }) => (
		<header className="w-full px-6 pt-14 pb-8 border-b border-border/80">
			<div className="max-w-3xl mx-auto">
				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-5">
					{author && <span>{author}</span>}
					{date && <span>{date}</span>}
					{readingTime && <span>{readingTime}</span>}
				</div>
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
				{subtitle && (
					<p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-6">{subtitle}</p>
				)}
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<a
								key={`${tag.label}-${tag.href}`}
								href={tag.href}
								className="text-xs px-2.5 py-1 border border-border text-muted-foreground hover:text-foreground transition"
							>
								{tag.label}
							</a>
						))}
					</div>
				)}
			</div>
		</header>
	),
};
