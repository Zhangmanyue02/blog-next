import type { ComponentConfig } from "@puckeditor/core";

export type TagCloudBlockProps = {
	title: string;
	tags: {
		label: string;
		href: string;
		weight: 1 | 2 | 3;
	}[];
};

const weightClass: Record<TagCloudBlockProps["tags"][number]["weight"], string> = {
	1: "text-xs",
	2: "text-sm",
	3: "text-base font-medium",
};

export const TagCloudBlock: ComponentConfig<TagCloudBlockProps> = {
	label: "标签云",
	fields: {
		title: { type: "text", label: "区块标题" },
		tags: {
			type: "array",
			label: "标签",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
				weight: {
					type: "select",
					label: "权重",
					options: [
						{ label: "小", value: 1 },
						{ label: "中", value: 2 },
						{ label: "大", value: 3 },
					],
				},
			},
			getItemSummary: (item) => item.label || "标签",
		},
	},
	defaultProps: {
		title: "标签",
		tags: [
			{ label: "React", href: "#", weight: 3 },
			{ label: "TypeScript", href: "#", weight: 3 },
			{ label: "Vite", href: "#", weight: 2 },
			{ label: "博客", href: "#", weight: 2 },
			{ label: "工具流", href: "#", weight: 1 },
			{ label: "设计", href: "#", weight: 1 },
			{ label: "读书", href: "#", weight: 2 },
		],
	},
	render: ({ title, tags }) => (
		<section className="w-full px-6 py-10">
			<div className="max-w-3xl mx-auto">
				{title && <h2 className="text-xl font-bold tracking-tight mb-6">{title}</h2>}
				<div className="flex flex-wrap gap-x-4 gap-y-3">
					{tags.map((tag) => (
						<a
							key={`${tag.label}-${tag.href}`}
							href={tag.href}
							className={`text-muted-foreground hover:text-foreground transition ${weightClass[tag.weight]}`}
						>
							#{tag.label}
						</a>
					))}
				</div>
			</div>
		</section>
	),
};
