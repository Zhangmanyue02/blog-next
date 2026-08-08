import type { ComponentConfig } from "@puckeditor/core";

type YesNo = "yes" | "no";

export type NavbarBlockProps = {
	/** 站点名（无图标时显示文字） */
	siteName: string;
	/** 站点图标 URL（可空） */
	logoUrl: string;
	/** 导航菜单 */
	links: { label: string; href: string }[];
	/** 是否吸顶 */
	sticky: YesNo;
};

const yesNo = {
	type: "radio" as const,
	options: [
		{ label: "开", value: "yes" },
		{ label: "关", value: "no" },
	],
};

export const NavbarBlock: ComponentConfig<NavbarBlockProps> = {
	label: "站点导航",
	fields: {
		siteName: { type: "text", label: "站点名" },
		logoUrl: { type: "text", label: "站点图标 URL（可空）" },
		links: {
			type: "array",
			label: "导航菜单",
			arrayFields: {
				label: { type: "text", label: "名称" },
				href: { type: "text", label: "链接" },
			},
			getItemSummary: (item) => item.label || "链接",
		},
		sticky: { ...yesNo, label: "吸顶" },
	},
	defaultProps: {
		siteName: "Alvin",
		logoUrl: "",
		links: [
			{ label: "首页", href: "/" },
			{ label: "归档", href: "/post" },
			{ label: "关于", href: "/about" },
		],
		sticky: "yes",
	},
	render: ({ siteName, logoUrl, links, sticky }) => {
		const isSticky = sticky === "yes";

		return (
			<header className={`z-40 w-full px-4 pt-3${isSticky ? " sticky top-0" : ""}`}>
				<div
					className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 rounded-2xl border border-white/25 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
					style={{
						background: "rgba(255, 255, 255, 0.12)",
						backdropFilter: "blur(20px) saturate(180%)",
						WebkitBackdropFilter: "blur(20px) saturate(180%)",
					}}
				>
					<a href="/" className="flex min-w-0 items-center gap-2.5 no-underline">
						{logoUrl ? (
							<img src={logoUrl} alt={siteName || "logo"} className="h-7 w-7 shrink-0 object-cover" />
						) : null}
						{siteName ? (
							<span className="truncate text-sm font-semibold tracking-tight text-foreground">
								{siteName}
							</span>
						) : null}
					</a>

					<nav className="flex items-center gap-5 text-sm">
						{links.map((link) => (
							<a
								key={`${link.label}-${link.href}`}
								href={link.href}
								className="text-muted-foreground transition hover:text-foreground"
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>
			</header>
		);
	},
};
