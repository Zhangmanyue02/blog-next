import type { ComponentConfig } from "@puckeditor/core";

export type NavbarBlockProps = {
	logo: string;
	links: { label: string; href: string }[];
	sticky: boolean;
	borderRadius: number;
	marginX: number;
	marginY: number;
	maxWidth: number;
	height: number;
	paddingX: number;
	justify: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
	align: "flex-start" | "center" | "flex-end";
	gap: number;
	linkGap: number;
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
		borderRadius: { type: "number", label: "圆角(px)" },
		marginX: { type: "number", label: "左右外边距(px)" },
		marginY: { type: "number", label: "上下外边距(px)" },
		maxWidth: { type: "number", label: "内容最大宽(px，0=铺满)" },
		height: { type: "number", label: "高度(px)" },
		paddingX: { type: "number", label: "左右内边距(px)" },
		justify: {
			type: "select",
			label: "主轴对齐",
			options: [
				{ label: "起点", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "终点", value: "flex-end" },
				{ label: "两端", value: "space-between" },
				{ label: "环绕", value: "space-around" },
				{ label: "均分", value: "space-evenly" },
			],
		},
		align: {
			type: "select",
			label: "交叉对齐",
			options: [
				{ label: "起点", value: "flex-start" },
				{ label: "居中", value: "center" },
				{ label: "终点", value: "flex-end" },
			],
		},
		gap: { type: "number", label: "Logo与导航间距(px)" },
		linkGap: { type: "number", label: "链接间距(px)" },
	},
	defaultProps: {
		logo: "Alvin's Notes",
		links: [
			{ label: "首页", href: "/" },
			{ label: "归档", href: "/archives" },
			{ label: "关于", href: "/about" },
		],
		sticky: true,
		borderRadius: 0,
		marginX: 0,
		marginY: 0,
		maxWidth: 768,
		height: 56,
		paddingX: 24,
		justify: "space-between",
		align: "center",
		gap: 16,
		linkGap: 20,
	},
	render: ({
		logo,
		links,
		sticky,
		borderRadius,
		marginX,
		marginY,
		maxWidth,
		height,
		paddingX,
		justify,
		align,
		gap,
		linkGap,
	}) => (
		<header className={`z-40 w-full ${sticky ? "sticky top-0" : ""}`} style={{ padding: `${marginY}px ${marginX}px` }}>
			<div
				className="w-full border border-white/25"
				style={{
					background: "rgba(255, 255, 255, 0.12)",
					backdropFilter: "blur(20px) saturate(180%)",
					WebkitBackdropFilter: "blur(20px) saturate(180%)",
					boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
					borderRadius,
				}}
			>
				<div
					className="mx-auto flex w-full"
					style={{
						maxWidth: maxWidth > 0 ? maxWidth : undefined,
						height,
						paddingLeft: paddingX,
						paddingRight: paddingX,
						justifyContent: justify,
						alignItems: align,
						gap,
					}}
				>
					<a href="/" className="shrink-0 text-base font-semibold tracking-tight">
						{logo}
					</a>
					<nav className="flex items-center text-sm" style={{ gap: linkGap }}>
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
			</div>
		</header>
	),
};
