import type { ComponentConfig } from "@puckeditor/core";

export type NavbarBlockProps = {
	logo: string;
	links: { label: string; href: string }[];
	sticky: boolean;
};

export const NavbarBlock: ComponentConfig<NavbarBlockProps> = {
	label: "导航栏",
	fields: {
		logo: { type: "text", label: "站点名" },
		links: {
			type: "array",
			label: "导航链接",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "链接",
		},
		sticky: {
			type: "radio",
			label: "吸顶",
			options: [
				{ label: "是", value: true },
				{ label: "否", value: false },
			],
		},
	},
	defaultProps: {
		logo: "Alvin's Notes",
		links: [
			{ label: "首页", href: "/" },
			{ label: "归档", href: "/archives" },
			{ label: "关于", href: "/about" },
		],
		sticky: true,
	},
	render: ({ logo, links, sticky }) => (
		<header
			className={`w-full border-b border-border/80 bg-background/95 backdrop-blur z-40 ${sticky ? "sticky top-0" : ""}`}
		>
			<div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
				<a href="/" className="text-base font-semibold tracking-tight">
					{logo}
				</a>
				<nav className="flex items-center gap-5 text-sm">
					{links.map((link) => (
						<a
							key={`${link.label}-${link.href}`}
							href={link.href}
							className="text-muted-foreground hover:text-foreground transition"
						>
							{link.label}
						</a>
					))}
				</nav>
			</div>
		</header>
	),
};
