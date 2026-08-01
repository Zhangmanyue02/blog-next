import type { ComponentConfig } from "@puckeditor/core";

export type FooterBlockProps = {
	copyright: string;
	description: string;
	links: { label: string; href: string }[];
};

export const FooterBlock: ComponentConfig<FooterBlockProps> = {
	label: "页脚",
	fields: {
		copyright: { type: "text", label: "版权信息" },
		description: { type: "textarea", label: "站点描述" },
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
		copyright: "© 2026 Alvin",
		description: "用文字记录思考，用代码创造价值。",
		links: [
			{ label: "GitHub", href: "#" },
			{ label: "RSS", href: "#" },
			{ label: "关于", href: "/about" },
		],
	},
	render: ({ copyright, description, links }) => (
		<footer className="w-full border-t border-border/80 mt-20">
			<div className="max-w-3xl mx-auto px-6 py-10">
				<p className="text-sm text-muted-foreground whitespace-pre-wrap mb-4">{description}</p>
				<div className="flex flex-wrap items-center gap-4 text-sm">
					{links.map((link) => (
						<a
							key={`${link.label}-${link.href}`}
							href={link.href}
							className="text-muted-foreground hover:text-foreground transition"
						>
							{link.label}
						</a>
					))}
				</div>
				<p className="mt-6 text-xs text-muted-foreground">{copyright}</p>
			</div>
		</footer>
	),
};
