import type { ComponentConfig } from "@puckeditor/core";

export type CategoriesBlockProps = {
	title: string;
	categories: {
		name: string;
		count: number;
		href: string;
	}[];
};

export const CategoriesBlock: ComponentConfig<CategoriesBlockProps> = {
	label: "分类",
	fields: {
		title: { type: "text", label: "区块标题" },
		categories: {
			type: "array",
			label: "分类",
			arrayFields: {
				name: { type: "text", label: "名称" },
				count: { type: "number", label: "文章数" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.name || "分类",
		},
	},
	defaultProps: {
		title: "分类",
		categories: [
			{ name: "工程", count: 12, href: "#" },
			{ name: "技术", count: 18, href: "#" },
			{ name: "随笔", count: 7, href: "#" },
			{ name: "读书", count: 5, href: "#" },
		],
	},
	render: ({ title, categories }) => (
		<section className="w-full px-6 py-10">
			<div className="max-w-3xl mx-auto">
				{title && <h2 className="text-xl font-bold tracking-tight mb-6">{title}</h2>}
				<ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{categories.map((category) => (
						<li key={`${category.name}-${category.href}`}>
							<a
								href={category.href}
								className="flex items-baseline justify-between gap-2 border border-border/80 px-3 py-3 text-sm hover:bg-muted/40 transition"
							>
								<span className="font-medium">{category.name}</span>
								<span className="text-muted-foreground tabular-nums">{category.count}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	),
};
