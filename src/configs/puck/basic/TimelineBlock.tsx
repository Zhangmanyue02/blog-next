import type { ComponentConfig } from "@puckeditor/core";

export type TimelineBlockProps = {
	title: string;
	items: {
		period: string;
		title: string;
		description: string;
	}[];
};

export const TimelineBlock: ComponentConfig<TimelineBlockProps> = {
	label: "经历时间线",
	fields: {
		title: { type: "text", label: "区块标题" },
		items: {
			type: "array",
			label: "经历",
			arrayFields: {
				period: { type: "text", label: "时间" },
				title: { type: "text", label: "标题" },
				description: { type: "textarea", label: "描述" },
			},
			getItemSummary: (item) => item.title || "经历",
		},
	},
	defaultProps: {
		title: "经历",
		items: [
			{
				period: "2023 — 至今",
				title: "前端工程师",
				description: "负责管理后台与内容站点建设，关注组件体系与可维护性。",
			},
			{
				period: "2021 — 2023",
				title: "全栈开发",
				description: "参与中小型产品从 0 到 1，覆盖接口、页面与部署。",
			},
			{
				period: "更早",
				title: "自学与实践",
				description: "通过开源项目与个人站点积累工程直觉。",
			},
		],
	},
	render: ({ title, items }) => (
		<section className="w-full px-6 py-10">
			<div className="max-w-3xl mx-auto">
				{title && <h2 className="text-2xl font-bold tracking-tight mb-8">{title}</h2>}
				<ol className="space-y-8 border-l border-border/80 pl-6">
					{items.map((item) => (
						<li key={`${item.period}-${item.title}`} className="relative">
							<span className="absolute -left-[1.9rem] top-1.5 w-2 h-2 rounded-full bg-foreground" />
							<p className="text-xs text-muted-foreground mb-1">{item.period}</p>
							<h3 className="font-semibold tracking-tight mb-2">{item.title}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{item.description}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	),
};
